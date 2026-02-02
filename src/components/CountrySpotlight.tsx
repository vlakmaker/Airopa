import { StoryCard } from './StoryCard';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { StoryCardSkeleton } from './ui/LoadingSkeleton';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { articlesToPosts } from '@/lib/adapters';

export const CountrySpotlight = () => {
  // Use React Query hook for data fetching
  const { data, error, isLoading, refetch } = useArticlesByCategory('country', 3);

  // Convert API articles to Post format
  const posts = data?.articles ? articlesToPosts(data.articles) : [];

  if (isLoading) {
    return (
      <section id="countries" className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Country Spotlights
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
            <p className="text-subhead text-muted-foreground">
              AI developments across European nations
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            <StoryCardSkeleton />
            <StoryCardSkeleton />
            <StoryCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="countries" className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Country Spotlights
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
          </div>
          <ErrorDisplay
            error={error}
            retryCallback={() => refetch()}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="countries" className="container mx-auto px-4 py-16 bg-gradient-to-br from-secondary/20 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Country Spotlights
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground">
            AI developments across European nations
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {posts.map(p => <StoryCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
};