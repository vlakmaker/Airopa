/**
 * React Query Hook for fetching a single article
 */

import { useQuery } from '@tanstack/react-query';
import { fetchArticleById } from '@/api/client';
import { ArticleResponse } from '@/api/types';

/**
 * Hook to fetch a single article by ID
 *
 * @param articleId - The article ID
 * @param enabled - Whether the query should run (default: true)
 * @returns UseQueryResult with article data
 */
export function useArticle(articleId: string, enabled = true) {
  return useQuery<ArticleResponse, Error>({
    queryKey: ['article', articleId],
    queryFn: () => fetchArticleById(articleId),
    enabled: enabled && !!articleId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
