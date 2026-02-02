import { Mail, CheckCircle, Zap, Globe, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const NewsletterSignup = () => {
  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Weekly AI signals from 27 countries"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Policy updates & regulatory insights"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Startup spotlights & funding news"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-teal opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,200,255,0.1)_0%,transparent_70%)]" />

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-display font-serif text-primary-foreground mb-4">
              Stay Ahead of the Signal
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Join 12,000+ European AI professionals receiving our weekly dispatch.
              Get the insights that matter, delivered every Thursday.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-primary-foreground/90">
                <div className="text-accent">
                  {benefit.icon}
                </div>
                <span className="text-sm font-medium">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Coming Soon Badge */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col items-center gap-4 py-8">
              <Badge variant="secondary" className="text-lg px-8 py-3 gap-2 bg-white/95 text-foreground">
                <Clock className="w-5 h-5" />
                Coming Soon
              </Badge>
              <p className="text-primary-foreground/70 text-sm">
                We're preparing something special for you
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-primary-foreground/70 text-sm">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Free • No spam • Unsubscribe anytime</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60 text-sm">
              Trusted by teams at DeepMind, Spotify, SAP, and 200+ European AI companies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};