import { StoryCard } from './StoryCard';
import { ErrorDisplay } from './ui/ErrorDisplay';
import { StoryCardSkeleton } from './ui/LoadingSkeleton';
import { useFeaturedArticles } from '@/hooks/useArticles';
import { articleToPost } from '@/lib/adapters';

/**
 * FeaturedStory Component - Displays the featured post with proper error handling
 *
 * @returns React component with loading, error, and success states
 */
export function FeaturedStory() {
  // Use React Query hook for data fetching
  const { data, error, isLoading, refetch } = useFeaturedArticles(1);

  // Convert API article to Post format for StoryCard
  const post = data?.articles?.[0] ? articleToPost(data.articles[0]) : null;

  // Professional state handling with proper fallbacks
  if (isLoading) {
    return (
      <section id="featured-story" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Featured Story
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
            <p className="text-subhead text-muted-foreground">
              Top story from the European AI frontier
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-lg">
            <StoryCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="featured-story" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Featured Story
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

  if (!post) {
    return (
      <section id="featured-story" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
              Featured Story
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
            </h2>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No featured story available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // Success state - the actual content
  return (
    <section id="featured-story" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-primary mb-4 relative inline-block">
            Featured Story
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full" />
          </h2>
          <p className="text-subhead text-muted-foreground">
            Top story from the European AI frontier
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition">
          <StoryCard post={post} />
        </div>
      </div>
    </section>
  );
}