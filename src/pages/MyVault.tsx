import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Eye, Share2, BarChart3, Clock, DollarSign } from "lucide-react";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { useGetUserReputation } from '@/hooks/useVaultContract';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MyVault = () => {
  const { isConnected, address } = useAccount();
  const [portfolioData, setPortfolioData] = useState({
    totalInvested: 2.05,
    currentValue: 2.48,
    totalReturn: 21.0,
    activeInvestments: 2
  });
  const [loading, setLoading] = useState(false);

  // Mock user reputation data
  const { userReputation } = useGetUserReputation(address || '0x0000000000000000000000000000000000000000');

  const investments = [
    {
      id: 1,
      title: "Girl with a Pearl Earring",
      artist: "Vermeer Archive",
      shares: 234,
      totalShares: 1000,
      value: "6.7 ETH",
      invested: "1.57 ETH",
      return: "+23.4%",
      status: "Active",
      timeRemaining: "2d 14h",
      isTrending: true
    },
    {
      id: 2,
      title: "The Great Wave",
      artist: "Hokusai Collection",
      shares: 156,
      totalShares: 1000,
      value: "3.1 ETH",
      invested: "0.48 ETH",
      return: "+12.8%",
      status: "Active",
      timeRemaining: "5d 8h",
      isTrending: false
    }
  ];

  const recentActivity = [
    {
      type: "Investment",
      artwork: "Girl with a Pearl Earring",
      amount: "0.5 ETH",
      timestamp: "2 hours ago",
      status: "Completed"
    },
    {
      type: "Bid Placed",
      artwork: "The Scream",
      amount: "5.4 ETH",
      timestamp: "1 day ago",
      status: "Active"
    },
    {
      type: "Investment",
      artwork: "The Great Wave",
      amount: "0.2 ETH",
      timestamp: "3 days ago",
      status: "Completed"
    }
  ];

  const loadPortfolioData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the contract
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update portfolio data
      setPortfolioData(prev => ({
        ...prev,
        // Add some variation to simulate real data
        currentValue: prev.currentValue + (Math.random() - 0.5) * 0.1
      }));
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadPortfolioData();
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My Vault
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Track your encrypted art investments and portfolio performance
            </p>
          </div>

          {/* Wallet Connection Check */}
          {!isConnected && (
            <div className="text-center mb-16 p-8 bg-card/50 rounded-lg border border-vault">
              <h3 className="text-2xl font-semibold mb-4">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to view your encrypted art investment portfolio
              </p>
              <ConnectButton />
            </div>
          )}

          {isConnected && (
            <>

              {/* Portfolio Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{portfolioData.totalInvested.toFixed(2)} ETH</div>
                    <p className="text-xs text-muted-foreground">~${(portfolioData.totalInvested * 2400).toFixed(0)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{portfolioData.currentValue.toFixed(2)} ETH</div>
                    <p className="text-xs text-green-500">
                      +{(portfolioData.currentValue - portfolioData.totalInvested).toFixed(2)} ETH (+{portfolioData.totalReturn.toFixed(1)}%)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Investments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{portfolioData.activeInvestments}</div>
                    <p className="text-xs text-muted-foreground">Artworks</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Return</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">+{portfolioData.totalReturn.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
              </div>

              {/* User Reputation */}
              {userReputation && (
                <Card className="mb-12">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Your Reputation Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-primary">
                        {userReputation.score || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {userReputation.totalBids || 0} bids • {userReputation.successfulBids || 0} successful
                      </div>
                    </div>
                    <Progress value={(userReputation.score || 0) / 100 * 100} className="mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Higher reputation unlocks exclusive investment opportunities
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Portfolio Tabs */}
              <Tabs defaultValue="investments" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="investments">My Investments</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="investments" className="space-y-6">
                  <div className="grid gap-6">
                    {investments.map((investment, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-vault/20 rounded-lg flex items-center justify-center">
                                <div className="w-8 h-8 bg-vault/40 rounded animate-pulse"></div>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{investment.title}</h3>
                                <p className="text-muted-foreground">{investment.artist}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="secondary">{investment.status}</Badge>
                                  {investment.isTrending && (
                                    <Badge variant="default" className="bg-orange-500">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                  <span className="text-sm text-muted-foreground">
                                    {investment.shares}/{investment.totalShares} shares
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{investment.timeRemaining} left</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold">{investment.value}</div>
                              <div className="text-sm text-muted-foreground">Invested: {investment.invested}</div>
                              <div className="text-sm font-semibold text-green-500">{investment.return}</div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4 mr-2" />
                                Trade
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{activity.type}</h4>
                                <p className="text-sm text-muted-foreground">{activity.artwork}</p>
                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{activity.amount}</div>
                              <Badge variant={activity.status === "Completed" ? "default" : "secondary"}>
                                {activity.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Best Performer</span>
                            <span className="font-semibold">Girl with a Pearl Earring</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return</span>
                            <span className="text-green-500 font-semibold">+23.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Worst Performer</span>
                            <span className="font-semibold">The Great Wave</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return</span>
                            <span className="text-green-500 font-semibold">+12.8%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Investment Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Renaissance Art</span>
                            <span className="font-semibold">63%</span>
                          </div>
                          <Progress value={63} className="mb-2" />
                          <div className="flex justify-between">
                            <span>Modern Art</span>
                            <span className="font-semibold">37%</span>
                          </div>
                          <Progress value={37} className="mb-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quick Actions */}
              <div className="text-center mt-16">
                <Button className="vault-button mr-4">
                  <Wallet className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyVault;