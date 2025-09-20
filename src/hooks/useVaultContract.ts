import { useContractWrite, useContractRead, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';

const VAULT_CONTRACT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// FHE-enabled Vault Art Private ABI
const VAULT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_artist", "type": "string"},
      {"internalType": "uint32", "name": "_initialValue", "type": "uint32"},
      {"internalType": "uint32", "name": "_totalShares", "type": "uint32"},
      {"internalType": "uint256", "name": "_auctionDuration", "type": "uint256"}
    ],
    "name": "listArtwork",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_artworkId", "type": "uint256"},
      {"internalType": "uint32", "name": "_amount", "type": "uint32"}
    ],
    "name": "placeBid",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_artworkId", "type": "uint256"},
      {"internalType": "uint32", "name": "_sharesToBuy", "type": "uint32"}
    ],
    "name": "investInArtwork",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_artworkId", "type": "uint256"}
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_artworkId", "type": "uint256"}
    ],
    "name": "getArtworkDetails",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "artist", "type": "string"},
      {"internalType": "uint32", "name": "initialValue", "type": "uint32"},
      {"internalType": "uint32", "name": "currentHighestBid", "type": "uint32"},
      {"internalType": "address", "name": "currentHighestBidder", "type": "address"},
      {"internalType": "uint32", "name": "totalShares", "type": "uint32"},
      {"internalType": "uint32", "name": "availableShares", "type": "uint32"},
      {"internalType": "bool", "name": "isListed", "type": "bool"},
      {"internalType": "bool", "name": "isAuctionActive", "type": "bool"},
      {"internalType": "uint256", "name": "auctionEndTime", "type": "uint256"},
      {"internalType": "address", "name": "owner", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_user", "type": "address"}
    ],
    "name": "getUserReputation",
    "outputs": [
      {"internalType": "uint32", "name": "score", "type": "uint32"},
      {"internalType": "uint32", "name": "totalBids", "type": "uint32"},
      {"internalType": "uint32", "name": "successfulBids", "type": "uint32"},
      {"internalType": "uint32", "name": "totalInvestments", "type": "uint32"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Hook for listing artwork (no payment required)
export const useListArtwork = () => {
  const { writeContract, data: hash, isPending, error } = useContractWrite({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'listArtwork',
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const listArtwork = (
    title: string,
    artist: string,
    initialValue: number,
    totalShares: number,
    auctionDuration: number
  ) => {
    writeContract({
      args: [title, artist, initialValue, totalShares, BigInt(auctionDuration)],
    });
  };

  return {
    listArtwork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

// Hook for placing encrypted bids (payable function)
export const usePlaceBid = () => {
  const { writeContract, data: hash, isPending, error } = useContractWrite({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'placeBid',
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const placeBid = (artworkId: number, amount: number) => {
    // Convert amount to wei for the transaction value
    const valueInWei = parseEther(amount.toString());
    
    writeContract({
      args: [BigInt(artworkId), amount],
      value: valueInWei, // This is the ETH value sent with the transaction
    });
  };

  return {
    placeBid,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

// Hook for investing in artwork (payable function)
export const useInvestInArtwork = () => {
  const { writeContract, data: hash, isPending, error } = useContractWrite({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'investInArtwork',
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const investInArtwork = (artworkId: number, sharesToBuy: number, ethAmount: number) => {
    // Calculate the ETH value needed for the investment
    const valueInWei = parseEther(ethAmount.toString());
    
    writeContract({
      args: [BigInt(artworkId), sharesToBuy],
      value: valueInWei, // This is the ETH value sent with the transaction
    });
  };

  return {
    investInArtwork,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

// Hook for ending auction (no payment required)
export const useEndAuction = () => {
  const { writeContract, data: hash, isPending, error } = useContractWrite({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'endAuction',
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const endAuction = (artworkId: number) => {
    writeContract({
      args: [BigInt(artworkId)],
    });
  };

  return {
    endAuction,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

// Hook to get artwork details (read-only)
export const useGetArtworkDetails = (artworkId: number) => {
  const { data, isLoading, error } = useContractRead({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'getArtworkDetails',
    args: [BigInt(artworkId)],
  });

  return {
    artworkDetails: data,
    isLoading,
    error,
  };
};

// Hook to get user reputation (read-only)
export const useGetUserReputation = (userAddress: `0x${string}`) => {
  const { data, isLoading, error } = useContractRead({
    address: VAULT_CONTRACT_ADDRESS as `0x${string}`,
    abi: VAULT_ABI,
    functionName: 'getUserReputation',
    args: [userAddress],
  });

  return {
    userReputation: data,
    isLoading,
    error,
  };
};

// Utility function to format ETH values
export const formatEthValue = (value: bigint) => {
  return formatEther(value);
};

// Utility function to parse ETH values
export const parseEthValue = (value: string) => {
  return parseEther(value);
};