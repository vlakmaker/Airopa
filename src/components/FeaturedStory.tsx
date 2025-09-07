import { Clock, ArrowRight } from "lucide-react";
import featuredImage from "@/assets/featured-story.jpg";

export const FeaturedStory = () => {
  return (
    <section id="featured-story" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Featured Story
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
        </div>
        
        <article className="card-frosted overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src={featuredImage}
                alt="Featured AI research story"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Research
                </span>
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-caption mb-4">
                <Clock className="w-4 h-4" />
                <span>2 hours ago</span>
                <span className="text-border">•</span>
                <span>Amsterdam, Netherlands</span>
              </div>
              
              <h3 className="text-headline font-serif text-foreground mb-4 group-hover:text-primary transition-colors">
                European AI Labs Form Unprecedented Alliance for Ethical Research
              </h3>
              
              <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                Seven leading European AI research institutions announce collaborative framework 
                for responsible AI development, setting new standards for transparency and 
                cross-border knowledge sharing.
              </p>
              
              <div className="flex items-center text-accent font-medium group-hover:text-teal transition-colors">
                <span>Read full story</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};