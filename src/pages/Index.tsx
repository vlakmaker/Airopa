import { useMemo, useState, useCallback } from 'react';
import { CompactHeader } from '@/components/CompactHeader';
import { FeaturedStories } from '@/components/FeaturedStories';
import { CategorySpotlight } from '@/components/CategorySpotlight';
import { ArticleFeed } from '@/components/ArticleFeed';
import { Footer } from '@/components/Footer';
import { useFeaturedArticles } from '@/hooks/useArticles';
import { selectFeaturedArticles } from '@/lib/articleSelection';
import { SPOTLIGHT_CATEGORIES } from '@/lib/categories';
import type { ArticleCategory } from '@/api/types';

const Index = () => {
  const [feedCategory, setFeedCategory] = useState<ArticleCategory | undefined>(undefined);
  const { data, isLoading } = useFeaturedArticles(8);

  const featured = useMemo(() => {
    if (!data?.articles) return [];
    return selectFeaturedArticles(data.articles, 3);
  }, [data]);

  const featuredIds = useMemo(
    () => new Set(featured.map((a) => a.id)),
    [featured],
  );

  const handleSeeAll = useCallback((category: ArticleCategory) => {
    setFeedCategory(category);
    const feedEl = document.getElementById('article-feed');
    feedEl?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <CompactHeader />

      <main className="pt-20">
        {/* Featured Stories: Top 3 */}
        <FeaturedStories articles={featured} isLoading={isLoading} />

        {/* Category Spotlights: Dynamic, skip empty */}
        {SPOTLIGHT_CATEGORIES.map((cat) => (
          <CategorySpotlight
            key={cat}
            category={cat}
            excludeIds={featuredIds}
            onSeeAll={handleSeeAll}
          />
        ))}

        {/* Paginated Feed */}
        <ArticleFeed
          activeCategory={feedCategory}
          onCategoryChange={setFeedCategory}
          excludeIds={featuredIds}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
