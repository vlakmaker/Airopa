import { TrendingUp, MapPin, Euro } from "lucide-react";
import startupImage from "@/assets/startup-berlin.jpg";

interface StartupCardProps {
  title: string;
  location: string;
  funding: string;
  category: string;
  image?: string;
  description: string;
}

const StartupCard = ({ title, location, funding, category, image, description }: StartupCardProps) => (
  <article className="card-frosted overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
    <div className="relative h-48 overflow-hidden bg-secondary">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute top-3 left-3">
        <span className="bg-teal text-teal-foreground px-3 py-1 rounded-full text-xs font-medium">
          {category}
        </span>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-2 text-caption text-muted-foreground mb-3">
        <MapPin className="w-3 h-3" />
        <span>{location}</span>
      </div>
      
      <h3 className="text-lg font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <p className="text-body text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-accent font-medium">
          <Euro className="w-4 h-4" />
          <span className="text-sm">{funding}</span>
        </div>
        <TrendingUp className="w-4 h-4 text-teal" />
      </div>
    </div>
  </article>
);

export const StartupGrid = () => {
  const startups = [
    {
      title: "NeuralFlow AI",
      location: "Berlin, Germany",
      funding: "€12M Series A",
      category: "Computer Vision",
      image: startupImage,
      description: "Revolutionary edge computing platform for real-time industrial AI applications."
    },
    {
      title: "Cognitive Robotics",
      location: "Paris, France", 
      funding: "€8.5M Seed",
      category: "Robotics",
      description: "Advanced AI-powered robotic systems for European manufacturing automation."
    },
    {
      title: "DataMind Labs",
      location: "Stockholm, Sweden",
      funding: "€15M Series B",
      category: "Enterprise AI",
      description: "Privacy-first AI analytics platform serving Fortune 500 companies across Europe."
    }
  ];

  return (
    <section id="startups" className="container mx-auto px-4 py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            European Startup Spotlight
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground max-w-2xl mx-auto">
            Latest funding rounds and breakthrough innovations from Europe's AI ecosystem
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {startups.map((startup, index) => (
            <StartupCard key={index} {...startup} />
          ))}
        </div>
      </div>
    </section>
  );
};