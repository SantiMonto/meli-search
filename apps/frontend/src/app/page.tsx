'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/container/container';
import { ProductList } from '@/components/features/search/product-list';
import { useSearch } from '@/hooks/use-search';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search Page Content
 * Separated to use useSearchParams inside Suspense
 */
function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const limit = PAGINATION.DEFAULT_LIMIT;

  // Use search hook
  const { products, paging, isLoading, isError, error } = useSearch(
    query,
    limit,
    offset,
  );

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Results */}
        {query ? (
          <div>
            <ProductList
              products={products}
              paging={paging}
              query={query}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido a Mercado Libre
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Busca productos, marcas y más...
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

/**
 * Home Page
 * Main search page
 */
export default function HomePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
