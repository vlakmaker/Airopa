import { StoryCard } from '@/components/StoryCard';
import { StoryCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { useArticlesByCategory } from '@/hooks/useArticles';
import { articlesToPosts } from '@/lib/adapters';
import { getCategoryMeta } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import type { ArticleCategory } from '@/api/types';

interface CategorySpotlightProps {
  category: ArticleCategory;
  excludeIds: Set<string>;
  onSeeAll: (category: ArticleCategory) => void;
}

export function CategorySpotlight({ category, excludeIds, onSeeAll }: CategorySpotlightProps) {
  const { data, error, isLoading, refetch } = useArticlesByCategory(category, 6);
  const meta = getCategoryMeta(category);

  const filtered = data?.articles?.filter((a) => !excludeIds.has(a.id)) || [];
  const posts = articlesToPosts(filtered.slice(0, 3));

  if (isLoading) {
    return (
      <section id={`spotlight-${category}`} className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-primary">{meta.sectionTitle}</h2>
            <p className="text-sm text-muted-foreground">{meta.sectionSubtitle}</p>
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
      <section id={`spotlight-${category}`} className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-primary">{meta.sectionTitle}</h2>
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

  if (posts.length < 2) return null;

  return (
    <section id={`spotlight-${category}`} className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif text-primary">{meta.sectionTitle}</h2>
            <p className="text-sm text-muted-foreground">{meta.sectionSubtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSeeAll(category)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            See all &rarr;
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {posts.map((p) => (
            <StoryCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
