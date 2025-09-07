import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PreFooterNewsletter = () => {
  return (
    <section id="newsletter" className="bg-gradient-to-br from-accent/5 to-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Stay ahead of the signal
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the AIropa Dispatch every Sunday. European AI insights, curated and delivered.
          </p>
          
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
            <p className="text-caption mt-3 text-muted-foreground">
              Weekly dispatch • No spam • Unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};