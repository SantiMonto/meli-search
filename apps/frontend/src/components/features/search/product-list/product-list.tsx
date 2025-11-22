import { Product } from '../../../../core/entities/product.entity';
import { Paging } from '../../../../core/entities/paging.entity';
import { ProductCard } from '../product-card/product-card';
import { Pagination } from '../pagination/pagination';
import { EmptyState } from '../empty-state/empty-state';
import { SearchResultsSkeleton } from '../../../skeletons';

export interface ProductListProps {
  products: Product[];
  paging?: Paging;
  query: string;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
}

/**
 * ProductList Component
 * Displays list of products with pagination
 */
export function ProductList({
  products,
  paging,
  query,
  isLoading,
  isError,
  error,
}: ProductListProps) {
  // Loading state
  if (isLoading) {
    return <SearchResultsSkeleton count={10} />;
  }

  // Error state
  if (isError) {
    return (
      <div className="rounded-ml bg-error-500/10 p-6 text-center">
        <p className="text-lg font-semibold text-error-500">
          Error al cargar los productos
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {error?.message || 'Ocurrió un error inesperado'}
        </p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      {paging && (
        <div className="text-sm text-gray-600">
          {paging.getResultsRangeText()}
        </div>
      )}

      {/* Product list */}
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {paging && <Pagination paging={paging} query={query} />}
    </div>
  );
}
