import type { Article } from '@/api/types';

export function selectFeaturedArticles(
  articles: Article[],
  count: number,
  maxPerCategory = 2,
): Article[] {
  const sorted = [...articles].sort((a, b) => {
    const qualityDiff = b.quality_score - a.quality_score;
    if (Math.abs(qualityDiff) > 0.05) return qualityDiff;
    return new Date(b.published_date || b.created_at).getTime() -
      new Date(a.published_date || a.created_at).getTime();
  });

  const selected: Article[] = [];
  const categoryCounts: Record<string, number> = {};

  for (const article of sorted) {
    if (selected.length >= count) break;
    const cat = article.category;
    const currentCount = categoryCounts[cat] || 0;
    if (currentCount >= maxPerCategory) continue;
    selected.push(article);
    categoryCounts[cat] = currentCount + 1;
  }

  // Fallback: if diversity constraint left us short, fill remaining slots
  // ignoring the per-category limit
  if (selected.length < count) {
    const selectedIds = new Set(selected.map((a) => a.id));
    for (const article of sorted) {
      if (selected.length >= count) break;
      if (selectedIds.has(article.id)) continue;
      selected.push(article);
    }
  }

  return selected;
}
