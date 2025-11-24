import { useQuery } from '@tanstack/react-query';
import { apiProductRepository } from '../infrastructure/repositories/api-product.repository';
import { queryKeys } from '../infrastructure/config/query-client.config';
import { Product } from '../core/entities/product.entity';
import { useDebounce } from './use-debounce';

/**
 * useSearchSuggestions Hook
 * Custom hook for getting product suggestions with debounce
 *
 * @param query - Search query
 * @param limit - Maximum number of suggestions (default: 6)
 * @param debounceMs - Debounce delay in milliseconds (default: 300)
 */
export function useSearchSuggestions(
  query: string,
  limit: number = 6,
  debounceMs: number = 300,
) {
  // Debounce the query to avoid too many API calls
  const debouncedQuery = useDebounce(query, debounceMs);

  // React Query
  const { data, isLoading, isError, error, isFetching } = useQuery<
    Product[],
    Error
  >({
    queryKey: queryKeys.products.suggestions(debouncedQuery, limit),
    queryFn: async () => {
      return await apiProductRepository.getSuggestions(debouncedQuery, limit);
    },
    enabled:
      !!debouncedQuery &&
      debouncedQuery.trim().length >= 2 &&
      query === debouncedQuery, // Only fetch if query hasn't changed
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    // Data
    suggestions: data ?? [],

    // States
    isLoading: isLoading || (query !== debouncedQuery && query.length >= 2),
    isError,
    error,
    isFetching,
    isEmpty: !isLoading && (data?.length ?? 0) === 0,
    hasSuggestions: !isLoading && (data?.length ?? 0) > 0,
  };
}
