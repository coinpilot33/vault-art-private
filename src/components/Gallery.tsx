import { EncryptedFrame } from "./EncryptedFrame";
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

const mockArtworks = [
  {
    id: 1,
    title: "Starry Night Fragments",
    artist: "Van Gogh Estate",
    value: "2.8 ETH",
    shares: 127,
    totalShares: 1000,
    isRevealed: false,
    currentBid: "2.5 ETH",
    bidCount: 23
  },
  {
    id: 2,
    title: "The Persistence of Memory",
    artist: "Dalí Foundation",
    value: "4.2 ETH",
    shares: 89,
    totalShares: 1000,
    isRevealed: false,
    currentBid: "3.8 ETH",
    bidCount: 45
  },
  {
    id: 3,
    title: "Girl with a Pearl Earring",
    artist: "Vermeer Archive",
    value: "6.7 ETH",
    shares: 234,
    totalShares: 1000,
    isRevealed: true,
    currentBid: "6.2 ETH",
    bidCount: 67
  },
  {
    id: 4,
    title: "The Great Wave",
    artist: "Hokusai Collection",
    value: "3.1 ETH",
    shares: 156,
    totalShares: 1000,
    isRevealed: false,
    currentBid: "2.8 ETH",
    bidCount: 34
  },
  {
    id: 5,
    title: "The Scream",
    artist: "Munch Estate",
    value: "5.9 ETH",
    shares: 67,
    totalShares: 1000,
    isRevealed: false,
    currentBid: "5.4 ETH",
    bidCount: 89
  },
  {
    id: 6,
    title: "Water Lilies Series",
    artist: "Monet Archive",
    value: "7.3 ETH",
    shares: 312,
    totalShares: 1000,
    isRevealed: false,
    currentBid: "6.8 ETH",
    bidCount: 156
  }
];

export const Gallery = () => {
  const { isConnected } = useAccount();
  const [artworks, setArtworks] = useState(mockArtworks);

  return (
    <section id="gallery" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Encrypted Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover masterpieces hidden behind cryptographic veils. Each investment 
            remains completely private until auction completion.
          </p>
        </div>

        {/* Wallet Connection Prompt */}
        {!isConnected && (
          <div className="text-center mb-16 p-8 bg-card/50 rounded-lg border border-vault">
            <h3 className="text-2xl font-semibold mb-4">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view encrypted artworks and place private bids
            </p>
            <ConnectButton />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">847</div>
            <div className="text-sm text-muted-foreground">Artworks Encrypted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">23.7M</div>
            <div className="text-sm text-muted-foreground">Total Value Locked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">12,483</div>
            <div className="text-sm text-muted-foreground">Active Investors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
            <div className="text-sm text-muted-foreground">Privacy Rate</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <div 
              key={artwork.id}
              className="animate-[reveal_0.6s_ease-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EncryptedFrame {...artwork} />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button 
            className="vault-button px-8 py-3 rounded-lg font-semibold"
            onClick={() => {
              // In a real app, this would load more artworks from the contract
              console.log('Loading more artworks...');
            }}
          >
            Load More Artworks
          </Button>
        </div>
      </div>
    </section>
  );
};