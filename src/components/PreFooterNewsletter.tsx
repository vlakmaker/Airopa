import { Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <div className="flex flex-col items-center gap-4 py-8">
              <Badge variant="secondary" className="text-base px-6 py-2 gap-2">
                <Clock className="w-4 h-4" />
                Coming Soon
              </Badge>
              <p className="text-sm text-muted-foreground">
                We're preparing something special for you
              </p>
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