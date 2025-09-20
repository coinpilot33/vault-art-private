import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Wallet, Shield, TrendingUp, Users, Clock, Lock } from "lucide-react";
import { useState } from "react";
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useInvestInArtwork } from '@/hooks/useVaultContract';

const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const { isConnected } = useAccount();
  const { investInArtwork, isPending: isInvesting } = useInvestInArtwork();
  
  const featuredInvestments = [
    {
      title: "Renaissance Collection",
      artist: "Multiple Masters",
      targetRaise: "50 ETH",
      currentRaise: "32.4 ETH",
      progress: 65,
      minInvestment: "0.1 ETH",
      investors: 234,
      timeLeft: "14 days",
      riskLevel: "Medium",
      expectedReturn: "12-18%",
      isEncrypted: true
    },
    {
      title: "Modern Abstract Series",
      artist: "Contemporary Artists",
      targetRaise: "25 ETH",
      currentRaise: "18.7 ETH",
      progress: 75,
      minInvestment: "0.05 ETH",
      investors: 187,
      timeLeft: "8 days",
      riskLevel: "High",
      expectedReturn: "20-35%",
      isEncrypted: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20 px-6">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Invest in Art
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover and invest in fractionalized masterpieces with complete privacy until auction settlement
            </p>
          </div>

          {/* Wallet Connection Prompt */}
          {!isConnected && (
            <div className="text-center mb-16 p-8 bg-card/50 rounded-lg border border-vault">
              <h3 className="text-2xl font-semibold mb-4">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to start investing in encrypted art collections
              </p>
              <ConnectButton />
            </div>
          )}

          {/* Investment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$127M</div>
              <div className="text-sm text-muted-foreground">Total Invested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">18.4%</div>
              <div className="text-sm text-muted-foreground">Avg. Returns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Privacy Protection</div>
            </div>
          </div>

          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
              <TabsTrigger value="calculator">Investment Calculator</TabsTrigger>
              <TabsTrigger value="guide">Investment Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredInvestments.map((investment, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-video bg-vault/20 rounded-lg mb-4 flex items-center justify-center relative">
                        <Lock className="w-12 h-12 text-vault animate-pulse" />
                        {investment.isEncrypted && (
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            <Shield className="w-3 h-3 mr-1" />
                            Encrypted
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{investment.title}</CardTitle>
                      <p className="text-muted-foreground">{investment.artist}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Target Raise</Label>
                          <div className="font-semibold">{investment.targetRaise}</div>
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">Current Raise</Label>
                          <div className="font-semibold">{investment.currentRaise}</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Funding Progress</span>
                          <span>{investment.progress}%</span>
                        </div>
                        <Progress value={investment.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {investment.investors} investors
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {investment.timeLeft} left
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-muted-foreground">Min. Investment</div>
                          <div className="font-semibold">{investment.minInvestment}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Expected Return</div>
                          <div className="font-semibold text-green-500">{investment.expectedReturn}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant={investment.riskLevel === "High" ? "destructive" : "default"}>
                          {investment.riskLevel} Risk
                        </Badge>
                        <Button 
                          className="vault-button"
                          disabled={!isConnected || isInvesting}
                          onClick={() => {
                            if (isConnected && !isInvesting) {
                              // Call the smart contract to invest
                              investInArtwork(investment.id, 1, 0.1); // 1 share for 0.1 ETH
                            }
                          }}
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          {isInvesting ? 'Investing...' : 'Invest Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calculator" className="space-y-8">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Investment Calculator</CardTitle>
                  <p className="text-muted-foreground">
                    Calculate potential returns on your art investments
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount (ETH)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.0"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">
                          {investmentAmount ? (parseFloat(investmentAmount) * 1.12).toFixed(2) : "0.00"} ETH
                        </div>
                        <div className="text-sm text-muted-foreground">Conservative (12%)</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {investmentAmount ? (parseFloat(investmentAmount) * 1.18).toFixed(2) : "0.00"} ETH
                        </div>
                        <div className="text-sm text-muted-foreground">Moderate (18%)</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-500">
                          {investmentAmount ? (parseFloat(investmentAmount) * 1.35).toFixed(2) : "0.00"} ETH
                        </div>
                        <div className="text-sm text-muted-foreground">Aggressive (35%)</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button className="vault-button w-full">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Start Investing
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guide" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>How Art Investment Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">1. Encrypted Investment</h3>
                      <p className="text-sm text-muted-foreground">
                        Your investments remain completely private and encrypted until auction completion
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">2. Fractional Ownership</h3>
                      <p className="text-sm text-muted-foreground">
                        Own shares of masterpieces starting from as little as 0.01 ETH
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">3. Returns on Settlement</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive returns when artworks are sold at auction, with complete transparency
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Invest;