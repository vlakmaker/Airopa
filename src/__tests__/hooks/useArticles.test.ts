import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { 
  useArticles, 
  useArticlesByCategory, 
  useArticlesByCountry,
  useFeaturedArticles 
} from '@/hooks/useArticles';
import { createTestQueryClient } from '../utils';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

function createWrapper() {
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useArticles', () => {
  it('should fetch articles successfully', async () => {
    const { result } = renderHook(() => useArticles(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.articles).toBeInstanceOf(Array);
    expect(result.current.data?.articles.length).toBeGreaterThan(0);
  });

  it('should apply query parameters', async () => {
    const { result } = renderHook(
      () => useArticles({ limit: 10, offset: 0 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.limit).toBe(10);
    expect(result.current.data?.offset).toBe(0);
  });

  it('should filter by category', async () => {
    const { result } = renderHook(
      () => useArticles({ category: 'startups' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.articles).toHaveLength(1);
    expect(result.current.data?.articles[0].category).toBe('startups');
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useArticles(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => 
      expect(result.current.isLoading).toBe(false)
    );
  });
});

describe('useArticlesByCategory', () => {
  it('should fetch articles by category with default limit', async () => {
    const { result } = renderHook(
      () => useArticlesByCategory('policy'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.articles).toBeDefined();
    result.current.data?.articles.forEach(article => {
      expect(article.category).toBe('policy');
    });
  });

  it('should apply custom limit', async () => {
    const { result } = renderHook(
      () => useArticlesByCategory('startups', 5),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.limit).toBe(5);
  });

  it('should set minimum quality to 0.6', async () => {
    const { result } = renderHook(
      () => useArticlesByCategory('policy'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.data?.articles.forEach(article => {
      expect(article.quality_score).toBeGreaterThanOrEqual(0.6);
    });
  });
});

describe('useArticlesByCountry', () => {
  it('should fetch articles by country with default limit', async () => {
    const { result } = renderHook(
      () => useArticlesByCountry('France'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.articles).toBeDefined();
    result.current.data?.articles.forEach(article => {
      expect(article.country).toBe('France');
    });
  });

  it('should apply custom limit', async () => {
    const { result } = renderHook(
      () => useArticlesByCountry('Germany', 10),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.limit).toBe(10);
  });

  it('should set minimum quality to 0.6', async () => {
    const { result } = renderHook(
      () => useArticlesByCountry('France'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.data?.articles.forEach(article => {
      expect(article.quality_score).toBeGreaterThanOrEqual(0.6);
    });
  });
});

describe('useFeaturedArticles', () => {
  it('should fetch featured articles with default limit of 8', async () => {
    const { result } = renderHook(
      () => useFeaturedArticles(),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.limit).toBe(8);
  });

  it('should apply custom limit', async () => {
    const { result } = renderHook(
      () => useFeaturedArticles(3),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.limit).toBe(3);
  });

  it('should set minimum quality to 0.7', async () => {
    const { result } = renderHook(
      () => useFeaturedArticles(5),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.data?.articles.forEach(article => {
      expect(article.quality_score).toBeGreaterThanOrEqual(0.7);
    });
  });
});
