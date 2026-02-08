import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useArticle } from '@/hooks/useArticle';
import { createTestQueryClient } from '../utils';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

function createWrapper() {
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useArticle', () => {
  it('should fetch a single article successfully', async () => {
    const { result } = renderHook(() => useArticle('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id).toBe('1');
    expect(result.current.data?.title).toBeDefined();
  });

  it('should not fetch when enabled is false', async () => {
    const { result } = renderHook(() => useArticle('1', false), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle 404 errors', async () => {
    const { result } = renderHook(() => useArticle('not-found'), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => expect(result.current.isError).toBe(true),
      { timeout: 5000 }
    );

    expect(result.current.error).toBeDefined();
  });

  it('should refetch article by id', async () => {
    const { result, rerender } = renderHook(
      ({ id }) => useArticle(id),
      {
        wrapper: createWrapper(),
        initialProps: { id: '1' },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe('1');

    rerender({ id: '2' });

    await waitFor(() => expect(result.current.data?.id).toBe('2'));
  });
});
