import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * Default options for React Query
 */
const defaultOptions: DefaultOptions = {
  queries: {
    // Stale time: 5 minutes
    staleTime: 5 * 60 * 1000,

    // Cache time: 10 minutes
    gcTime: 10 * 60 * 1000,

    // Retry failed requests
    retry: 2,

    // Retry delay (exponential backoff)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Refetch on window focus
    refetchOnWindowFocus: true,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Don't refetch on mount if data is fresh
    refetchOnMount: false,
  },
  mutations: {
    // Retry mutations once
    retry: 1,
  },
};

/**
 * Create and configure QueryClient
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions,
  });
};

/**
 * Query keys factory
 * Centralized query keys for consistency
 */
export const queryKeys = {
  products: {
    all: ['products'] as const,
    search: (query: string, limit: number, offset: number) =>
      [...queryKeys.products.all, 'search', { query, limit, offset }] as const,
    suggestions: (query: string, limit: number) =>
      [...queryKeys.products.all, 'suggestions', { query, limit }] as const,
    detail: (id: string) => [...queryKeys.products.all, 'detail', id] as const,
  },
} as const;
