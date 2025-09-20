import { Button } from "@/components/ui/button";
import { Lock, Eye, TrendingUp } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-24 px-6 text-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ background: 'var(--gradient-vault)' }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main headline */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Collect Art,{" "}
            <span className="text-primary glitch" data-text="Privately">
              Privately
            </span>
            .
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Invest in fractionalized masterpieces with complete privacy. 
            Your holdings remain encrypted until auction settlement.
          </p>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Fractionalized Ownership</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Private Bidding</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="vault-button text-lg px-8 py-6">
              Enter the Vault
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};