/**
 * React Query Hooks for fetching articles
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/api/client';
import { ArticlesListResponse, ArticleQueryParams, ArticleCategory } from '@/api/types';

/**
 * Hook to fetch articles with filtering and pagination
 */
export function useArticles(params: ArticleQueryParams = {}) {
  return useQuery<ArticlesListResponse, Error>({
    queryKey: ['articles', params],
    queryFn: () => fetchArticles(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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
 * Hook to fetch featured articles (high quality, over-fetch for diversity)
 */
export function useFeaturedArticles(limit = 8) {
  return useArticles({
    limit,
    minQuality: 0.7,
  });
}

/**
 * Hook for paginated article feed with infinite scroll
 */
export function useFeedArticles(category?: ArticleCategory) {
  const pageSize = 10;

  return useInfiniteQuery<ArticlesListResponse, Error>({
    queryKey: ['feed-articles', category],
    queryFn: ({ pageParam }) =>
      fetchArticles({
        limit: pageSize,
        offset: pageParam as number,
        category,
        minQuality: 0.3,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((sum, page) => sum + page.articles.length, 0);
      if (loaded >= lastPage.total) return undefined;
      return loaded;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
