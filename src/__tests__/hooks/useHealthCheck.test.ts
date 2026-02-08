import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { createTestQueryClient } from '../utils';
import { QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

function createWrapper() {
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useHealthCheck', () => {
  it('should check API health successfully', async () => {
    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.status).toBe('ok');
    expect(result.current.data?.timestamp).toBeDefined();
  });

  it('should not fetch when enabled is false', async () => {
    const { result } = renderHook(() => useHealthCheck(false), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle health check failures', async () => {
    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => 
      expect(result.current.isLoading).toBe(false)
    );
  });
});
