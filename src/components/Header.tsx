import { Button } from "@/components/ui/button";

export const Header = () => {
  const scrollToFeatured = () => {
    const element = document.getElementById('featured-story');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 pt-20">
      <div className="absolute inset-0 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center opacity-5" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">
            Signals from the European AI frontier
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Curated insight on startups, regulation, and regional shifts in European AI
          </p>
          <Button 
            onClick={scrollToFeatured}
            variant="outline" 
            className="btn-frost-outline"
          >
            Read Latest
          </Button>
        </div>
      </div>
    </header>
  );
};