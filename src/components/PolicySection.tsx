import { Scale, FileText, Users } from "lucide-react";
import policyImage from "@/assets/eu-parliament.jpg";

interface PolicyCardProps {
  title: string;
  excerpt: string;
  source: string;
  type: "regulation" | "policy" | "framework";
  icon: React.ReactNode;
}

const PolicyCard = ({ title, excerpt, source, type, icon }: PolicyCardProps) => {
  const getBorderColor = () => {
    switch (type) {
      case "regulation": return "border-l-accent";
      case "policy": return "border-l-teal";
      case "framework": return "border-l-primary";
      default: return "border-l-border";
    }
  };

  return (
    <article className={`card-frosted border-l-4 ${getBorderColor()} group cursor-pointer hover:scale-105 transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 bg-secondary rounded-lg text-primary">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-caption text-muted-foreground mb-2">
              <span className="capitalize">{type}</span>
              <span className="text-border">•</span>
              <span>{source}</span>
            </div>
            
            <h3 className="text-lg font-serif font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-body text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export const PolicySection = () => {
  const policies = [
    {
      title: "AI Act Implementation Timeline Extended to 2026",
      excerpt: "European Commission announces phased rollout approach for AI Act compliance, prioritizing high-risk applications and providing additional guidance for industry adaptation.",
      source: "European Commission",
      type: "regulation" as const,
      icon: <Scale className="w-5 h-5" />
    },
    {
      title: "Digital Services Act: New AI Content Moderation Rules",
      excerpt: "Updated guidelines require large platforms to implement transparent AI-driven content moderation systems with human oversight capabilities.",
      source: "European Parliament",
      type: "policy" as const,
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Cross-Border AI Research Initiative Launched",
      excerpt: "€2.1B funding framework established for collaborative AI research projects between EU member states, focusing on ethical AI development.",
      source: "EU Council",
      type: "framework" as const,
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <section id="policy" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
                Policy & Regulation
                <div className="absolute -bottom-2 left-1/2 lg:left-0 transform lg:transform-none -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
              </h2>
            </div>
            <div className="space-y-6">
              {policies.map((policy, index) => (
                <PolicyCard key={index} {...policy} />
              ))}
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="relative">
            <div className="card-frosted overflow-hidden hover:scale-105 transition-all duration-300">
              <img
                src={policyImage}
                alt="European Parliament AI Policy"
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-serif font-medium text-foreground mb-2">
                  EU AI Act: One Year Later
                </h3>
                <p className="text-body text-muted-foreground">
                  Comprehensive analysis of the AI Act's impact on European tech innovation and regulatory compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};