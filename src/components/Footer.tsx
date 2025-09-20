import { Lock, Shield, Eye, Github, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-vault bg-card/30 backdrop-blur-xl">
      {/* Animated Encrypted Silhouettes */}
      <div className="py-16 px-6 border-b border-vault">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">
            Encrypted Masterpieces Await
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="encrypted-frame aspect-[3/4] rounded-lg group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-full">
                  {/* Encrypted overlay with reveal animation */}
                  <div className="encrypted-overlay transition-opacity duration-700 group-hover:opacity-50">
                    <div className="flex items-center justify-center h-full">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  {/* Pixelated art silhouette */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/60">
                    <div className="grid grid-cols-6 grid-rows-8 h-full w-full">
                      {Array.from({ length: 48 }).map((_, pixelIndex) => (
                        <div 
                          key={pixelIndex}
                          className="bg-primary/20 transition-all duration-500 group-hover:bg-primary/40"
                          style={{
                            opacity: Math.random() * 0.7 + 0.1,
                            animationDelay: `${Math.random() * 2}s`,
                            animation: `shimmer 4s infinite alternate`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary">ArtVault</h4>
              <p className="text-sm text-muted-foreground mb-4">
                The world's first encrypted art investment platform. 
                Collect masterpieces with complete privacy.
              </p>
              <div className="flex space-x-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  Military-grade encryption
                </span>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                <li><Link to="/my-vault" className="hover:text-primary transition-colors">My Vault</Link></li>
                <li><Link to="/auctions" className="hover:text-primary transition-colors">Auctions</Link></li>
                <li><Link to="/invest" className="hover:text-primary transition-colors">Invest</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>12,483 active investors</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-vault mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ArtVault. All investments are encrypted and secured.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                End-to-end encrypted • Zero-knowledge proofs
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};