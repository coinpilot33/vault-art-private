import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose ArtVault?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the future of art investment with complete privacy and security
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Complete Privacy</h3>
                  <p className="text-muted-foreground">
                    Your investments remain encrypted and private until auction completion, ensuring maximum security.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">High Returns</h3>
                  <p className="text-muted-foreground">
                    Access exclusive art investments with potential returns of 12-35% on masterpiece auctions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Fractional Ownership</h3>
                  <p className="text-muted-foreground">
                    Own shares of world-renowned artworks starting from as little as 0.01 ETH.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-card/50">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your Encrypted Art Journey
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of investors who trust ArtVault for private, secure art investments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="vault-button" asChild>
                  <Link to="/gallery">Explore Gallery</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/invest">Start Investing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
