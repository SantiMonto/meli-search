import { useQuery } from '@tanstack/react-query';
import { SearchProductsUseCase } from '../core/use-cases/search-products/search-products.usecase';
import { apiProductRepository } from '../infrastructure/repositories/api-product.repository';
import { queryKeys } from '../infrastructure/config/query-client.config';
import { SearchResult } from '../core/entities/search-result.entity';
import { PAGINATION } from '@meli/shared-types';

/**
 * useSearch Hook
 * Custom hook for searching products with React Query
 *
 * @param query - Search query
 * @param limit - Results per page
 * @param offset - Pagination offset
 */
export function useSearch(
  query: string,
  limit: number = PAGINATION.DEFAULT_LIMIT,
  offset: number = PAGINATION.DEFAULT_OFFSET,
) {
  // Create use case instance
  const searchUseCase = new SearchProductsUseCase(apiProductRepository);

  // React Query
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    SearchResult,
    Error
  >({
    queryKey: queryKeys.products.search(query, limit, offset),
    queryFn: async () => {
      return await searchUseCase.execute({ query, limit, offset });
    },
    enabled: !!query && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    // Data
    searchResult: data,
    products: data?.products ?? [],
    paging: data?.paging,

    // States
    isLoading,
    isError,
    error,
    isFetching,
    isEmpty: !isLoading && data?.products.length === 0,
    hasResults: !isLoading && (data?.products.length ?? 0) > 0,

    // Actions
    refetch,
  };
}
