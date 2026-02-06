import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PostFrontmatter } from "@/types/content";
import { ArticleImage } from "@/components/ArticleImage";

interface ArticleHeroProps {
  frontmatter: PostFrontmatter;
}

/**
 * ArticleHero Component
 *
 * Displays the article header with optional cover image, title, and metadata.
 * Gracefully handles missing cover images with a gradient fallback.
 */
export function ArticleHero({ frontmatter }: ArticleHeroProps) {
  const fallbackImage = frontmatter.cover_fallback || "/assets/hero-bg.jpg";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="w-full">
      {/* Cover Image or Gradient Fallback */}
      <ArticleImage
        src={frontmatter.cover}
        fallbackSrc={fallbackImage}
        alt={frontmatter.title}
        loading="eager"
        decoding="async"
        containerClassName="w-full aspect-[21/9]"
      />

      {/* Article Header */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-background rounded-xl shadow-xl border border-border p-8 max-w-4xl mx-auto">
          {/* Tags/Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="default" className="text-sm px-3 py-1">
              {frontmatter.pillar}
            </Badge>
            {frontmatter.country && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {frontmatter.country}
              </Badge>
            )}
            {frontmatter.tags && frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                {tag}
              </Badge>
            ))}
            {frontmatter.editor_pick && (
              <Badge variant="destructive" className="text-sm px-3 py-1">
                Editor's Pick
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
            {frontmatter.title || "Untitled Article"}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(frontmatter.date)}</time>
            </div>
            {frontmatter.location && (
              <>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{frontmatter.location}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
