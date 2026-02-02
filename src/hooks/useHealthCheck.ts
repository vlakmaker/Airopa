/**
 * React Query Hook for API health check
 */

import { useQuery } from '@tanstack/react-query';
import { checkHealth } from '@/api/client';
import { HealthResponse } from '@/api/types';

/**
 * Hook to check API health status
 *
 * @param enabled - Whether the query should run (default: true)
 * @returns UseQueryResult with health data
 */
export function useHealthCheck(enabled = true) {
  return useQuery<HealthResponse, Error>({
    queryKey: ['health'],
    queryFn: checkHealth,
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    refetchOnWindowFocus: true,
  });
}
