import { ExternalLink, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SourceAttributionProps {
  sourceName: string;
  sourceUrl: string;
  publishedDate?: string;
}

/**
 * SourceAttribution Component
 *
 * Displays prominent, ethical attribution to the original article source.
 * This component is CRITICAL for maintaining ethical journalism standards.
 */
export function SourceAttribution({ sourceName, sourceUrl, publishedDate }: SourceAttributionProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Card className="border-accent bg-accent/5 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="w-5 h-5 text-accent" />
          Originally Published By
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{sourceName}</span>
          </div>
          {publishedDate && (
            <p className="text-sm text-muted-foreground">
              Published on {formatDate(publishedDate)}
            </p>
          )}
          <p className="text-sm text-muted-foreground italic">
            AIropa.news aggregates and curates articles. All content rights belong to the original publisher.
          </p>
        </div>

        <Button asChild className="w-full" size="lg">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            Read Full Article at {sourceName}
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
