// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract VaultArtPrivate {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct Artwork {
        euint32 artworkId;
        euint32 price;
        euint32 currentBid;
        euint32 bidCount;
        ebool isForSale;
        ebool isAuctionActive;
        ebool isVerified;
        string title;
        string description;
        string imageHash;
        string metadataHash;
        address owner;
        address artist;
        uint256 createdAt;
        uint256 auctionEndTime;
    }
    
    struct Bid {
        euint32 bidId;
        euint32 amount;
        ebool isActive;
        address bidder;
        uint256 timestamp;
    }
    
    struct Investment {
        euint32 investmentId;
        euint32 amount;
        euint32 shares;
        ebool isActive;
        address investor;
        uint256 timestamp;
    }
    
    struct Vault {
        euint32 vaultId;
        euint32 totalValue;
        euint32 sharePrice;
        euint32 totalShares;
        ebool isActive;
        string name;
        string description;
        address manager;
        uint256 createdAt;
    }
    
    mapping(uint256 => Artwork) public artworks;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => Vault) public vaults;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public artistReputation;
    
    uint256 public artworkCounter;
    uint256 public bidCounter;
    uint256 public investmentCounter;
    uint256 public vaultCounter;
    
    address public owner;
    address public verifier;
    uint256 public platformFee = 250; // 2.5% in basis points
    
    event ArtworkCreated(uint256 indexed artworkId, address indexed artist, string title);
    event BidPlaced(uint256 indexed bidId, uint256 indexed artworkId, address indexed bidder, uint32 amount);
    event InvestmentMade(uint256 indexed investmentId, uint256 indexed vaultId, address indexed investor, uint32 amount);
    event VaultCreated(uint256 indexed vaultId, address indexed manager, string name);
    event ArtworkSold(uint256 indexed artworkId, address indexed buyer, uint32 price);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createArtwork(
        string memory _title,
        string memory _description,
        string memory _imageHash,
        string memory _metadataHash,
        euint32 _price
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_imageHash).length > 0, "Image hash cannot be empty");
        
        uint256 artworkId = artworkCounter++;
        
        artworks[artworkId] = Artwork({
            artworkId: _price, // Will be set properly
            price: _price,
            currentBid: Fhe.asEuint32(0),
            bidCount: Fhe.asEuint32(0),
            isForSale: Fhe.asEbool(true),
            isAuctionActive: Fhe.asEbool(false),
            isVerified: Fhe.asEbool(false),
            title: _title,
            description: _description,
            imageHash: _imageHash,
            metadataHash: _metadataHash,
            owner: msg.sender,
            artist: msg.sender,
            createdAt: block.timestamp,
            auctionEndTime: 0
        });
        
        emit ArtworkCreated(artworkId, msg.sender, _title);
        return artworkId;
    }
    
    function placeBid(
        uint256 artworkId,
        euint32 bidAmount
    ) public payable returns (uint256) {
        require(artworks[artworkId].owner != address(0), "Artwork does not exist");
        require(Fhe.decrypt(artworks[artworkId].isForSale), "Artwork is not for sale");
        require(msg.value >= Fhe.decrypt(bidAmount), "Insufficient payment");
        
        uint256 bidId = bidCounter++;
        
        bids[bidId] = Bid({
            bidId: bidAmount, // Will be set properly
            amount: bidAmount,
            isActive: Fhe.asEbool(true),
            bidder: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update artwork bid info
        artworks[artworkId].currentBid = bidAmount;
        artworks[artworkId].bidCount = artworks[artworkId].bidCount + Fhe.asEuint32(1);
        
        emit BidPlaced(bidId, artworkId, msg.sender, Fhe.decrypt(bidAmount));
        return bidId;
    }
    
    function acceptBid(uint256 artworkId, uint256 bidId) public {
        require(artworks[artworkId].owner == msg.sender, "Only owner can accept bid");
        require(bids[bidId].bidder != address(0), "Bid does not exist");
        require(Fhe.decrypt(bids[bidId].isActive), "Bid is not active");
        
        // Calculate platform fee
        uint256 bidAmount = Fhe.decrypt(bids[bidId].amount);
        uint256 fee = (bidAmount * platformFee) / 10000;
        uint256 artistAmount = bidAmount - fee;
        
        // Transfer ownership
        artworks[artworkId].owner = bids[bidId].bidder;
        artworks[artworkId].isForSale = Fhe.asEbool(false);
        bids[bidId].isActive = Fhe.asEbool(false);
        
        // Transfer funds
        payable(msg.sender).transfer(artistAmount);
        payable(owner).transfer(fee);
        
        emit ArtworkSold(artworkId, bids[bidId].bidder, bidAmount);
    }
    
    function createVault(
        string memory _name,
        string memory _description,
        euint32 _initialSharePrice
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Vault name cannot be empty");
        
        uint256 vaultId = vaultCounter++;
        
        vaults[vaultId] = Vault({
            vaultId: _initialSharePrice, // Will be set properly
            totalValue: Fhe.asEuint32(0),
            sharePrice: _initialSharePrice,
            totalShares: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            name: _name,
            description: _description,
            manager: msg.sender,
            createdAt: block.timestamp
        });
        
        emit VaultCreated(vaultId, msg.sender, _name);
        return vaultId;
    }
    
    function investInVault(
        uint256 vaultId,
        euint32 investmentAmount
    ) public payable returns (uint256) {
        require(vaults[vaultId].manager != address(0), "Vault does not exist");
        require(Fhe.decrypt(vaults[vaultId].isActive), "Vault is not active");
        require(msg.value >= Fhe.decrypt(investmentAmount), "Insufficient payment");
        
        uint256 investmentId = investmentCounter++;
        uint256 sharePrice = Fhe.decrypt(vaults[vaultId].sharePrice);
        uint256 shares = Fhe.decrypt(investmentAmount) / sharePrice;
        
        investments[investmentId] = Investment({
            investmentId: Fhe.asEuint32(shares), // Will be set properly
            amount: investmentAmount,
            shares: Fhe.asEuint32(shares),
            isActive: Fhe.asEbool(true),
            investor: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update vault totals
        vaults[vaultId].totalValue = vaults[vaultId].totalValue + investmentAmount;
        vaults[vaultId].totalShares = vaults[vaultId].totalShares + Fhe.asEuint32(shares);
        
        emit InvestmentMade(investmentId, vaultId, msg.sender, Fhe.decrypt(investmentAmount));
        return investmentId;
    }
    
    function verifyArtwork(uint256 artworkId, ebool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify artworks");
        require(artworks[artworkId].owner != address(0), "Artwork does not exist");
        
        artworks[artworkId].isVerified = isVerified;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is artist or investor based on context
        if (artworks[artworkCounter - 1].artist == user) {
            artistReputation[user] = reputation;
        } else {
            userReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, Fhe.decrypt(reputation));
    }
    
    function getArtworkInfo(uint256 artworkId) public view returns (
        string memory title,
        string memory description,
        uint32 price,
        uint32 currentBid,
        uint32 bidCount,
        bool isForSale,
        bool isVerified,
        address owner,
        address artist,
        uint256 createdAt
    ) {
        Artwork storage artwork = artworks[artworkId];
        return (
            artwork.title,
            artwork.description,
            Fhe.decrypt(artwork.price),
            Fhe.decrypt(artwork.currentBid),
            Fhe.decrypt(artwork.bidCount),
            Fhe.decrypt(artwork.isForSale),
            Fhe.decrypt(artwork.isVerified),
            artwork.owner,
            artwork.artist,
            artwork.createdAt
        );
    }
    
    function getVaultInfo(uint256 vaultId) public view returns (
        string memory name,
        string memory description,
        uint32 totalValue,
        uint32 sharePrice,
        uint32 totalShares,
        bool isActive,
        address manager,
        uint256 createdAt
    ) {
        Vault storage vault = vaults[vaultId];
        return (
            vault.name,
            vault.description,
            Fhe.decrypt(vault.totalValue),
            Fhe.decrypt(vault.sharePrice),
            Fhe.decrypt(vault.totalShares),
            Fhe.decrypt(vault.isActive),
            vault.manager,
            vault.createdAt
        );
    }
    
    function getUserReputation(address user) public view returns (uint32) {
        return Fhe.decrypt(userReputation[user]);
    }
    
    function getArtistReputation(address artist) public view returns (uint32) {
        return Fhe.decrypt(artistReputation[artist]);
    }
    
    function withdrawFromVault(uint256 vaultId, uint256 investmentId) public {
        require(investments[investmentId].investor == msg.sender, "Only investor can withdraw");
        require(Fhe.decrypt(investments[investmentId].isActive), "Investment is not active");
        
        uint256 shares = Fhe.decrypt(investments[investmentId].shares);
        uint256 sharePrice = Fhe.decrypt(vaults[vaultId].sharePrice);
        uint256 withdrawalAmount = shares * sharePrice;
        
        investments[investmentId].isActive = Fhe.asEbool(false);
        vaults[vaultId].totalShares = vaults[vaultId].totalShares - Fhe.asEuint32(shares);
        vaults[vaultId].totalValue = vaults[vaultId].totalValue - Fhe.asEuint32(withdrawalAmount);
        
        payable(msg.sender).transfer(withdrawalAmount);
    }
    
    function setPlatformFee(uint256 newFee) public {
        require(msg.sender == owner, "Only owner can set fee");
        require(newFee <= 1000, "Fee cannot exceed 10%");
        platformFee = newFee;
    }
}
