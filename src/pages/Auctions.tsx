import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, TrendingUp, Gavel, Eye, AlertCircle } from "lucide-react";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { usePlaceBid, useGetArtworkDetails } from '@/hooks/useVaultContract';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Auctions = () => {
  const { isConnected } = useAccount();
  const [bidAmount, setBidAmount] = useState("");
  const [selectedAuction, setSelectedAuction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { placeBid, isPending: isPlacingBid } = usePlaceBid();

  const activeAuctions = [
    {
      id: 1,
      title: "The Persistence of Memory",
      artist: "Dalí Foundation",
      currentBid: "4.8 ETH",
      timeLeft: "2d 14h 32m",
      bidders: 23,
      progress: 68,
      status: "Active",
      minimumBid: "4.9 ETH",
      isEndingSoon: false
    },
    {
      id: 2,
      title: "Starry Night Fragments",
      artist: "Van Gogh Estate",
      currentBid: "3.2 ETH",
      timeLeft: "5d 8h 15m",
      bidders: 17,
      progress: 45,
      status: "Active",
      minimumBid: "3.3 ETH",
      isEndingSoon: false
    },
    {
      id: 3,
      title: "The Scream",
      artist: "Munch Estate",
      currentBid: "6.1 ETH",
      timeLeft: "12h 45m",
      bidders: 31,
      progress: 89,
      status: "Ending Soon",
      minimumBid: "6.2 ETH",
      isEndingSoon: true
    }
  ];

  const completedAuctions = [
    {
      title: "Girl with a Pearl Earring",
      artist: "Vermeer Archive",
      finalBid: "6.7 ETH",
      winner: "0x1234...5678",
      completedAt: "3 days ago",
      participants: 45
    }
  ];

  const handlePlaceBid = async (auctionId: number) => {
    if (!bidAmount || !isConnected) return;
    
    try {
      setLoading(true);
      await placeBid(auctionId, parseFloat(bidAmount));
      setBidAmount("");
      setSelectedAuction(null);
    } catch (error) {
      console.error('Error placing bid:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Art Auctions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Participate in encrypted art auctions and reveal masterpieces upon completion
            </p>
          </div>

          {/* Wallet Connection Check */}
          {!isConnected && (
            <div className="text-center mb-16 p-8 bg-card/50 rounded-lg border border-vault">
              <h3 className="text-2xl font-semibold mb-4">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to participate in encrypted art auctions
              </p>
              <ConnectButton />
            </div>
          )}

          {/* Auction Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-muted-foreground">Active Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">127</div>
              <div className="text-sm text-muted-foreground">Total Bidders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">34.2</div>
              <div className="text-sm text-muted-foreground">ETH in Bids</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>

          {/* Active Auctions */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Active Auctions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAuctions.map((auction, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-square bg-vault/20 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-vault/40 rounded animate-pulse"></div>
                    </div>
                    <CardTitle className="text-lg">{auction.title}</CardTitle>
                    <p className="text-muted-foreground">{auction.artist}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Bid</span>
                        <span className="font-semibold">{auction.currentBid}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Time Left</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{auction.timeLeft}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Bidders</span>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="font-semibold">{auction.bidders}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Auction Progress</span>
                          <span>{auction.progress}%</span>
                        </div>
                        <Progress value={auction.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant={auction.status === "Ending Soon" ? "destructive" : "default"}>
                          {auction.status}
                        </Badge>
                        {isConnected ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="vault-button" size="sm">
                                <Gavel className="w-4 h-4 mr-2" />
                                Place Bid
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Place Bid on {auction.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="text-sm text-muted-foreground">
                                  Current bid: {auction.currentBid} • Minimum: {auction.minimumBid}
                                </div>
                                <div>
                                  <Label htmlFor="bidAmount">Bid Amount (ETH)</Label>
                                  <Input
                                    id="bidAmount"
                                    type="number"
                                    step="0.01"
                                    placeholder={auction.minimumBid}
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    className="vault-button flex-1"
                                    onClick={() => handlePlaceBid(auction.id)}
                                    disabled={!bidAmount || isPlacingBid || loading}
                                  >
                                    {isPlacingBid ? 'Placing Bid...' : 'Place Bid'}
                                  </Button>
                                  <Button variant="outline" onClick={() => setBidAmount(auction.minimumBid)}>
                                    Min Bid
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <ConnectButton />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Completed Auctions */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Recently Completed</h2>
            <div className="space-y-4">
              {completedAuctions.map((auction, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{auction.title}</h3>
                          <p className="text-muted-foreground">{auction.artist}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline">Completed</Badge>
                            <span className="text-sm text-muted-foreground">
                              {auction.participants} participants
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">{auction.finalBid}</div>
                        <div className="text-sm text-muted-foreground">Winner: {auction.winner}</div>
                        <div className="text-sm text-muted-foreground">{auction.completedAt}</div>
                      </div>
                      <Button variant="outline">
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auctions;