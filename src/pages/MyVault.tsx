import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Eye, Share2 } from "lucide-react";

const MyVault = () => {
  const investments = [
    {
      title: "Girl with a Pearl Earring",
      artist: "Vermeer Archive",
      shares: 234,
      totalShares: 1000,
      value: "6.7 ETH",
      invested: "1.57 ETH",
      return: "+23.4%",
      status: "Active"
    },
    {
      title: "The Great Wave",
      artist: "Hokusai Collection",
      shares: 156,
      totalShares: 1000,
      value: "3.1 ETH",
      invested: "0.48 ETH",
      return: "+12.8%",
      status: "Active"
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
              My Vault
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Track your encrypted art investments and portfolio performance
            </p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.05 ETH</div>
                <p className="text-xs text-muted-foreground">~$4,920</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.48 ETH</div>
                <p className="text-xs text-green-500">+0.43 ETH (+21%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Artworks</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+21%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Investments */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Investments</h2>
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
                            <span className="text-sm text-muted-foreground">
                              {investment.shares}/{investment.totalShares} shares
                            </span>
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
          </div>

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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyVault;