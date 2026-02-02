/**
 * React Query Hook for fetching articles list
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchArticles } from '@/api/client';
import { ArticlesListResponse, ArticleQueryParams } from '@/api/types';

/**
 * Hook to fetch articles with filtering and pagination
 *
 * @param params - Query parameters for filtering
 * @returns UseQueryResult with articles data
 */
export function useArticles(params: ArticleQueryParams = {}) {
  return useQuery<ArticlesListResponse, Error>({
    queryKey: ['articles', params],
    queryFn: () => fetchArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch articles by category
 */
export function useArticlesByCategory(category: ArticleQueryParams['category'], limit = 20) {
  return useArticles({
    category,
    limit,
    minQuality: 0.6,
  });
}

/**
 * Hook to fetch articles by country
 */
export function useArticlesByCountry(country: ArticleQueryParams['country'], limit = 20) {
  return useArticles({
    country,
    limit,
    minQuality: 0.6,
  });
}

/**
 * Hook to fetch featured articles (high quality, limited number)
 */
export function useFeaturedArticles(limit = 1) {
  return useArticles({
    limit,
    minQuality: 0.8,
  });
}
