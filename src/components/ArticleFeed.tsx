import { useFeedArticles } from '@/hooks/useArticles';
import { ArticleCardHorizontal } from '@/components/ArticleCardHorizontal';
import { CategoryChip } from '@/components/CategoryChip';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { SPOTLIGHT_CATEGORIES } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import type { ArticleCategory } from '@/api/types';

interface ArticleFeedProps {
  activeCategory: ArticleCategory | undefined;
  onCategoryChange: (category: ArticleCategory | undefined) => void;
  excludeIds: Set<string>;
}

export function ArticleFeed({ activeCategory, onCategoryChange, excludeIds }: ArticleFeedProps) {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFeedArticles(activeCategory);

  const allArticles = data?.pages.flatMap((page) => page.articles) || [];
  const filtered = allArticles.filter((a) => !excludeIds.has(a.id));

  return (
    <section id="article-feed" className="container mx-auto px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <CategoryChip
            category="all"
            label="All"
            active={!activeCategory}
            onClick={() => onCategoryChange(undefined)}
          />
          {SPOTLIGHT_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              category={cat}
              active={activeCategory === cat}
              onClick={() => onCategoryChange(cat)}
            />
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse border border-border rounded-lg p-4 h-24" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorDisplay
            error={error}
            retryCallback={() => refetch()}
            className="max-w-2xl mx-auto"
          />
        )}

        {/* Article List */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {filtered.map((article) => (
              <ArticleCardHorizontal key={article.id} article={article} />
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No articles found for this category.
              </p>
            )}

            {/* Load More */}
            {hasNextPage && (
              <div className="text-center pt-6">
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
