import { Lock, Eye, Share2, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { usePlaceBid, useInvestInArtwork } from '@/hooks/useVaultContract';

interface EncryptedFrameProps {
  id: number;
  title: string;
  artist: string;
  value: string;
  shares: number;
  totalShares: number;
  isRevealed?: boolean;
  image?: string;
  currentBid?: string;
  bidCount?: number;
}

export const EncryptedFrame = ({ 
  id,
  title, 
  artist, 
  value, 
  shares, 
  totalShares, 
  isRevealed = false,
  image,
  currentBid,
  bidCount
}: EncryptedFrameProps) => {
  const { isConnected } = useAccount();
  const [isBidding, setIsBidding] = useState(false);
  const { placeBid, isPending: isPlacingBid } = usePlaceBid();
  const { investInArtwork, isPending: isInvesting } = useInvestInArtwork();
  return (
    <div className="encrypted-frame rounded-xl p-1 gallery-item">
      <div className="bg-card rounded-lg overflow-hidden">
        {/* Image Area */}
        <div className="relative aspect-[4/5] bg-secondary">
          {isRevealed && image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Encrypted overlay */}
              <div className="encrypted-overlay flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium">ENCRYPTED</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Revealed at auction
                  </p>
                </div>
              </div>
              
              {/* Pixelated silhouette */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40">
                <div className="grid grid-cols-8 grid-rows-10 h-full w-full opacity-30">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div 
                      key={i}
                      className="bg-primary/20"
                      style={{
                        opacity: Math.random() * 0.6 + 0.2,
                        animationDelay: `${Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
              {isRevealed ? 'REVEALED' : 'ENCRYPTED'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">by {artist}</p>
          
          {/* Investment details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Value</span>
              <span className="font-semibold">{value}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Your Shares</span>
              <span className="font-semibold">{shares}/{totalShares}</span>
            </div>
            {currentBid && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Bid</span>
                <span className="font-semibold text-primary">{currentBid}</span>
              </div>
            )}
            {bidCount && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bids</span>
                <span className="font-semibold">{bidCount}</span>
              </div>
            )}
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(shares / totalShares) * 100}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          {!isConnected ? (
            <div className="space-y-2">
              <ConnectButton />
              <p className="text-xs text-muted-foreground text-center">
                Connect wallet to interact with artworks
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 vault-button"
                onClick={() => {
                  if (!isPlacingBid) {
                    placeBid(id, 0.1); // Place bid for 0.1 ETH
                  }
                }}
                disabled={isPlacingBid}
              >
                <Gavel className="w-4 h-4 mr-2" />
                {isPlacingBid ? 'Bidding...' : 'Place Bid'}
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                variant="outline"
                onClick={() => {
                  if (!isInvesting) {
                    investInArtwork(id, 1, 0.1); // Invest 1 share for 0.1 ETH
                  }
                }}
                disabled={isInvesting}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isInvesting ? 'Investing...' : 'Invest'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};