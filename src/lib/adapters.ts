/**
 * Adapters to convert API data to component data formats
 */

import type { Article } from '@/api/types';
import type { Post, PostFrontmatter, Pillar } from '@/types/content';

/**
 * Strip HTML tags and decode common entities from text
 */
export function stripHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8230;/g, '\u2026')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Map API category to content pillar
 */
function mapCategoryToPillar(category: string): Pillar {
  const mapping: Record<string, Pillar> = {
    startups: 'startups',
    policy: 'policy',
    country: 'country',
    stories: 'research',
    research: 'research',
    industry: 'industry',
  };
  return mapping[category] || 'research';
}

/**
 * Extract a readable source name from a string that may be a URL
 */
function formatSourceName(name: string): string {
  if (!name) return 'Source';
  if (name.includes('://') || name.includes('www.')) {
    try {
      const url = new URL(name.startsWith('http') ? name : `https://${name}`);
      const host = url.hostname.replace(/^www\./, '');
      const parts = host.split('.');
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch {
      return name;
    }
  }
  return name;
}

/**
 * Get category-based cover image
 */
function getCategoryImage(category: string): string {
  const imageMapping: Record<string, string> = {
    startups: '/assets/startup-berlin.jpg',
    policy: '/assets/eu-parliament.jpg',
    country: '/assets/featured-story.jpg',
    stories: '/assets/featured-story.jpg',
    research: '/assets/featured-story.jpg',
    industry: '/assets/featured-story.jpg',
  };
  return imageMapping[category] || '/assets/hero-bg.jpg';
}

/**
 * Convert API Article to Post format for components
 */
export function articleToPost(article: Article): Post {
  const categoryFallback = getCategoryImage(article.category);

  const frontmatter: PostFrontmatter = {
    title: article.title,
    date: article.published_date || article.created_at,
    pillar: mapCategoryToPillar(article.category),
    country: article.country,
    tags: [article.category],
    source: {
      name: formatSourceName(article.source),
      url: article.url,
    },
    canonical: article.url,
    cover: (article.image_url?.trim()) || categoryFallback,
    cover_fallback: categoryFallback,
    summary: article.summary ? stripHtml(article.summary) : '',
    editor_pick: article.quality_score >= 0.8,
    ai_generated: false,
  };

  return {
    slug: article.id,
    html: '',
    data: frontmatter,
  };
}

/**
 * Convert array of API Articles to Posts
 */
export function articlesToPosts(articles: Article[]): Post[] {
  return articles.map(articleToPost);
}
