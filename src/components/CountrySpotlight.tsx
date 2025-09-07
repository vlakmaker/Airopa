import { ChevronLeft, ChevronRight, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CountryData {
  name: string;
  flag: string;
  headline: string;
  summary: string;
  metric: string;
  trend: string;
  color: string;
}

const countries: CountryData[] = [
  {
    name: "Germany",
    flag: "🇩🇪",
    headline: "Berlin Becomes Europe's AI Capital with €500M Investment Hub",
    summary: "Government announces massive AI infrastructure program targeting autonomous vehicles and industrial automation.",
    metric: "€2.1B AI Investment",
    trend: "+47% YoY",
    color: "from-amber-500/20 to-red-500/20"
  },
  {
    name: "France",
    flag: "🇫🇷", 
    headline: "France's AI Strategy Focuses on Scientific Research Excellence",
    summary: "New national AI plan allocates funding for 12 research institutes and public-private partnerships.",
    metric: "€1.8B Public Funding",
    trend: "+32% YoY",
    color: "from-blue-500/20 to-red-500/20"
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    headline: "Dutch AI Ethics Board Sets New Global Standards",
    summary: "Comprehensive framework for responsible AI development adopted by tech companies across Europe.",
    metric: "156 AI Startups",
    trend: "+28% YoY", 
    color: "from-orange-500/20 to-blue-500/20"
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    headline: "Stockholm's Green AI Initiative Leads Sustainability Efforts",
    summary: "Carbon-neutral AI computing centers powered by renewable energy attract major tech investments.",
    metric: "85% Green AI",
    trend: "+61% YoY",
    color: "from-blue-500/20 to-yellow-500/20"
  }
];

export const CountrySpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % countries.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + countries.length) % countries.length);

  const currentCountry = countries[currentIndex];

  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-headline font-serif text-primary mb-4">
            Country Spotlights
          </h2>
          <p className="text-subhead text-muted-foreground">
            AI developments across European nations
          </p>
        </div>

        {/* Main Spotlight */}
        <div className={`card-frosted overflow-hidden mb-8 bg-gradient-to-br ${currentCountry.color}`}>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{currentCountry.flag}</div>
              <div>
                <h3 className="text-2xl font-serif font-medium text-foreground flex items-center gap-3">
                  AI in {currentCountry.name}
                  <MapPin className="w-5 h-5 text-accent" />
                </h3>
              </div>
            </div>

            <h4 className="text-xl font-serif font-medium text-foreground mb-4">
              {currentCountry.headline}
            </h4>

            <p className="text-body text-muted-foreground mb-8 leading-relaxed max-w-3xl">
              {currentCountry.summary}
            </p>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal" />
                <span className="font-medium text-foreground">{currentCountry.metric}</span>
                <span className="text-teal text-sm">({currentCountry.trend})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prev} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {/* Country Indicators */}
          <div className="flex gap-3">
            {countries.map((country, index) => (
              <button
                key={country.name}
                onClick={() => setCurrentIndex(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">{country.name}</span>
              </button>
            ))}
          </div>

          <Button variant="outline" onClick={next} className="flex items-center gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};