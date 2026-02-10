import { Link } from 'react-router-dom';
import type { Article } from '@/api/types';
import { StoryCard } from '@/components/StoryCard';
import { StoryCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { articleToPost, stripHtml } from '@/lib/adapters';
import { ArticleImage } from '@/components/ArticleImage';
import { SourceBadge } from '@/components/SourceBadge';
import { getCategoryMeta } from '@/lib/categories';
import { cn } from '@/lib/utils';

interface FeaturedStoriesProps {
  articles: Article[];
  isLoading: boolean;
}

function HeroCard({ article }: { article: Article }) {
  const meta = getCategoryMeta(article.category);
  const coverImage = article.image_url?.trim() || '/assets/hero-bg.jpg';
  const summary = article.summary ? stripHtml(article.summary) : '';

  return (
    <Link
      to={`/article/${article.id}`}
      className="group relative block w-full rounded-xl overflow-hidden"
      style={{ minHeight: '35vh' }}
    >
      {/* Background image */}
      <ArticleImage
        src={coverImage}
        fallbackSrc="/assets/hero-bg.jpg"
        alt={article.title}
        loading="eager"
        decoding="async"
        containerClassName="absolute inset-0"
        imageClassName="group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-10" style={{ minHeight: '35vh' }}>
        <div className="max-w-3xl">
          <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium mb-3', meta.chipBg, meta.chipColor)}>
            {meta.label}
          </span>

          <h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight mb-3 group-hover:underline decoration-2 underline-offset-4">
            {article.title}
          </h3>

          {summary && (
            <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-2xl">
              {summary}
            </p>
          )}

          <div className="flex items-center gap-3 text-white/70 text-sm">
            <SourceBadge sourceName={article.source} country={article.country} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedStories({ articles, isLoading }: FeaturedStoriesProps) {
  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-primary">Top Stories</h2>
            <p className="text-sm text-muted-foreground">Handpicked from today's European AI landscape</p>
          </div>
          <div className="rounded-xl bg-muted animate-pulse" style={{ minHeight: '35vh' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <StoryCardSkeleton />
            <StoryCardSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  const [heroArticle, ...restArticles] = articles;
  const restPosts = restArticles.map(articleToPost);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-serif text-primary">Top Stories</h2>
          <p className="text-sm text-muted-foreground">Handpicked from today's European AI landscape</p>
        </div>

        {/* Hero: first featured article */}
        <HeroCard article={heroArticle} />

        {/* Remaining featured articles */}
        {restPosts.length > 0 && (
          <div className={cn(
            'grid grid-cols-1 gap-6 mt-6',
            restPosts.length >= 2 && 'md:grid-cols-2',
          )}>
            {restPosts.map((post) => (
              <StoryCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
