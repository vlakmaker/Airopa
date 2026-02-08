import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Article } from '@/api/types';
import { ArticleImage } from '@/components/ArticleImage';
import { ImageFallback } from '@/components/ImageFallback';
import { SourceBadge } from '@/components/SourceBadge';
import { getCategoryMeta } from '@/lib/categories';
import { stripHtml } from '@/lib/adapters';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ArticleCardHorizontalProps {
  article: Article;
}

export function ArticleCardHorizontal({ article }: ArticleCardHorizontalProps) {
  const meta = getCategoryMeta(article.category);
  const hasImage = !!article.image_url?.trim();

  return (
    <Link
      to={`/article/${article.id}`}
      className="group block rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-border/80"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image / Gradient Fallback */}
        <div className="sm:w-48 sm:flex-shrink-0">
          {hasImage ? (
            <ArticleImage
              src={article.image_url!}
              fallbackSrc="/assets/hero-bg.jpg"
              alt={article.title}
              loading="lazy"
              decoding="async"
              containerClassName="aspect-video sm:aspect-auto sm:h-full sm:w-48 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
              imageClassName="group-hover:scale-105"
            />
          ) : (
            <ImageFallback
              category={article.category}
              className="sm:aspect-auto sm:h-full sm:w-48 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 min-w-0">
          <h3 className="font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {article.title}
          </h3>

          {article.summary && (
            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
              {stripHtml(article.summary)}
            </p>
          )}

          <div className="flex items-center gap-3 mt-auto text-xs text-muted-foreground flex-wrap">
            <SourceBadge sourceName={article.source} country={article.country} />
            <span>{formatDate(article.published_date || article.created_at)}</span>
            <span className={cn('px-2 py-0.5 rounded-full border text-xs', meta.chipBg, meta.chipColor)}>
              {meta.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
