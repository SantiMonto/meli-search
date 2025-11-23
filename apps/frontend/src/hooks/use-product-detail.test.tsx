import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductDetail } from './use-product-detail';
import { GetProductDetailUseCase } from '../core/use-cases/get-product-detail/get-product-detail.usecase';
import { Product } from '../core/entities/product.entity';
import { ProductNotFoundException } from '../core/exceptions/product-not-found.exception';

// Mock API config
jest.mock('../infrastructure/config/api.config', () => ({
  API_CONFIG: {
    BASE_URL: 'http://localhost:3000',
    TIMEOUT: 1000,
  },
  REQUEST_CONFIG: {
    HEADERS: {},
  },
}));

// Mock the use case
jest.mock('../core/use-cases/get-product-detail/get-product-detail.usecase');

const mockExecute = jest.fn();
(GetProductDetailUseCase as jest.Mock).mockImplementation(() => ({
  execute: mockExecute,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
};

describe('useProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch product detail successfully', async () => {
    const mockProduct = { id: 'MLA123', title: 'Test Product' } as Product;
    mockExecute.mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProductDetail('MLA123'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.product).toBeDefined());

    expect(result.current.product).toEqual(mockProduct);
    expect(mockExecute).toHaveBeenCalledWith({ id: 'MLA123' });
  });

  it('should handle not found error', async () => {
    mockExecute.mockRejectedValue(new ProductNotFoundException('Not found'));

    const { result } = renderHook(() => useProductDetail('MLA123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.isNotFound).toBe(true);
  });
});
