import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CompactHeader } from "@/components/CompactHeader";
import { Footer } from "@/components/Footer";
import { ArticleHero } from "@/components/ArticleHero";
import { SourceAttribution } from "@/components/SourceAttribution";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useArticle } from "@/hooks/useArticle";
import { articleToPost } from "@/lib/adapters";
import { ChevronLeft, InfoIcon } from "lucide-react";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: article, isLoading, error, refetch } = useArticle(id || '');

  if (!id) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CompactHeader />
        <div className="pt-20">
          <Skeleton className="w-full aspect-[21/9]" />
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <CompactHeader />
        <div className="container mx-auto px-4 py-24 max-w-2xl">
          <ErrorDisplay
            title="Failed to Load Article"
            message={error instanceof Error ? error.message : "Could not load the article. It may not exist or there was a network error."}
            onRetry={refetch}
          />
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return <NotFound />;
  }

  const post = articleToPost(article);
  const { data: frontmatter } = post;

  return (
    <div className="min-h-screen bg-background">
      <CompactHeader />

      <main className="pt-16">
        <ArticleHero frontmatter={frontmatter} />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">{frontmatter.pillar}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8">
            <SourceAttribution
              sourceName={frontmatter.source.name}
              sourceUrl={frontmatter.source.url}
              publishedDate={frontmatter.date}
            />
          </div>

          <div className="prose prose-slate max-w-none mb-8">
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <div className="flex items-start gap-3 mb-4">
                <InfoIcon className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold mb-2 mt-0">Full Article Content</h2>
                  <p className="text-muted-foreground text-sm mb-0">
                    The full article content is available at the original source. Click the button above to read the complete story
                    from {frontmatter.source.name}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {frontmatter.country && (
            <div className="bg-card rounded-lg p-6 border border-border mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Article Information
              </h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground mb-1">Category</dt>
                  <dd className="font-medium capitalize">{frontmatter.pillar}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1">Country Focus</dt>
                  <dd className="font-medium">{frontmatter.country}</dd>
                </div>
                {frontmatter.location && (
                  <div className="col-span-2">
                    <dt className="text-muted-foreground mb-1">Location</dt>
                    <dd className="font-medium">{frontmatter.location}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="text-center py-8 border-t border-border">
            <Button asChild size="lg" variant="outline">
              <a
                href={frontmatter.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Continue Reading at {frontmatter.source.name}
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </a>
            </Button>
          </div>

          <div className="text-center pt-8 border-t border-border">
            <Button asChild variant="ghost">
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
