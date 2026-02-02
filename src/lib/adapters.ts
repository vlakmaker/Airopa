/**
 * Adapters to convert API data to component data formats
 */

import type { Article } from '@/api/types';
import type { Post, PostFrontmatter, Pillar } from '@/types/content';

/**
 * Map API category to content pillar
 */
function mapCategoryToPillar(category: string): Pillar {
  const mapping: Record<string, Pillar> = {
    startups: 'startups',
    policy: 'policy',
    country: 'country',
    stories: 'research', // Map 'stories' to 'research' pillar
  };
  return mapping[category] || 'research';
}

/**
 * Convert API Article to Post format for components
 *
 * @param article - Article from API
 * @returns Post object compatible with existing components
 */
export function articleToPost(article: Article): Post {
  const frontmatter: PostFrontmatter = {
    title: article.title,
    date: article.published_date || article.created_at,
    pillar: mapCategoryToPillar(article.category),
    country: article.country,
    tags: [article.category], // Use category as a tag
    source: {
      name: article.source,
      url: article.url,
    },
    canonical: article.url,
    summary: `Quality Score: ${(article.quality_score * 100).toFixed(0)}%`, // Placeholder summary
    editor_pick: article.quality_score >= 0.8,
    ai_generated: false,
  };

  return {
    slug: article.id,
    html: '', // API doesn't provide HTML content
    data: frontmatter,
  };
}

/**
 * Convert array of API Articles to Posts
 *
 * @param articles - Array of articles from API
 * @returns Array of Post objects
 */
export function articlesToPosts(articles: Article[]): Post[] {
  return articles.map(articleToPost);
}
