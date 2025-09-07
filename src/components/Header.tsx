import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-[url('/src/assets/hero-bg.jpg')] bg-cover bg-center opacity-5" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Brand */}
          <div className="mb-8">
            <h1 className="text-display font-serif text-primary mb-4">
              AIropa<span className="text-accent">.news</span>
            </h1>
            <p className="text-subhead text-muted-foreground max-w-2xl mx-auto">
              Signals from the European AI frontier
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input flex-1"
              />
              <Button className="btn-frost">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-caption mt-3">
              Weekly dispatch • Curated insights • European focus
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};