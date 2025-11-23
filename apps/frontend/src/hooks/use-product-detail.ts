import { useQuery } from '@tanstack/react-query';
import { GetProductDetailUseCase } from '../core/use-cases/get-product-detail/get-product-detail.usecase';
import { apiProductRepository } from '../infrastructure/repositories/api-product.repository';
import { queryKeys } from '../infrastructure/config/query-client.config';
import { Product } from '../core/entities/product.entity';
import { ProductNotFoundException } from '../core/exceptions/product-not-found.exception';

/**
 * useProductDetail Hook
 * Custom hook for fetching product details with React Query
 *
 * @param id - Product ID
 */
export function useProductDetail(id: string) {
  // Create use case instance
  const getProductDetailUseCase = new GetProductDetailUseCase(
    apiProductRepository,
  );

  // React Query
  const {
    data: product,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<Product, Error>({
    queryKey: queryKeys.products.detail(id),
    queryFn: async () => {
      return await getProductDetailUseCase.execute({ id });
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 404
      if (error instanceof ProductNotFoundException) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    // Data
    product,

    // States
    isLoading,
    isError,
    error,
    isFetching,
    isNotFound: error instanceof ProductNotFoundException,

    // Actions
    refetch,
  };
}
