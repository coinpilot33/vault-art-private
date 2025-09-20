import { Button } from "@/components/ui/button";
import { Wallet, BarChart3, User } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import monaLisaLogo from "@/assets/mona-lisa-crypto-logo.png";

export const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-vault bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={monaLisaLogo} 
              alt="Encrypted Art Vault" 
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-primary">ArtVault</h1>
              <p className="text-xs text-muted-foreground">Encrypted Investments</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/gallery" className="text-foreground hover:text-primary transition-colors">
              Gallery
            </a>
            <a href="/my-vault" className="text-foreground hover:text-primary transition-colors">
              My Vault
            </a>
            <a href="/auctions" className="text-foreground hover:text-primary transition-colors">
              Auctions
            </a>
            <a href="/invest" className="text-foreground hover:text-primary transition-colors">
              Invest
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected && (
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <BarChart3 className="w-4 h-4 mr-2" />
                Portfolio
              </Button>
            )}
            <ConnectButton 
              chainStatus="icon"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};