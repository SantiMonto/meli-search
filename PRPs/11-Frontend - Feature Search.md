# PRP-011: Frontend - Feature: Search

## 🎯 Objetivo

Implementar la funcionalidad completa de búsqueda de productos en el frontend. Esta feature incluirá el hook personalizado con React Query, el componente de búsqueda (SearchBox), la lista de productos (ProductList), las tarjetas de producto (ProductCard), la paginación, y la integración completa en la página principal con manejo de estados (loading, error, empty).

## 📋 Contexto

La feature de búsqueda es el corazón de la aplicación. Permite a los usuarios buscar productos, ver resultados paginados, y navegar al detalle de cada producto. Usaremos React Query para manejo de estado asíncrono, debouncing para optimizar requests, y URL search params para mantener el estado en la URL.

## 🏗️ Arquitectura - Search Feature

```
┌─────────────────────────────────────────────────────────────┐
│                    SEARCH FEATURE                           │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │         Page (app/page.tsx)                    │        │
│  │  - Maneja URL params                           │        │
│  │  - Renderiza SearchBox                         │        │
│  │  - Renderiza ProductList                       │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         useSearch Hook                         │        │
│  │  - React Query integration                     │        │
│  │  - Debouncing                                  │        │
│  │  - Pagination logic                            │        │
│  │  - Error handling                              │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Components                             │        │
│  │  - SearchBox (input + submit)                  │        │
│  │  - ProductList (results + pagination)          │        │
│  │  - ProductCard (individual product)            │        │
│  │  - Pagination (page controls)                  │        │
│  │  - EmptyState (no results)                     │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Domain Layer        │
              │   (Use Cases)         │
              └───────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Infrastructure      │
              │   (API Repository)    │
              └───────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/frontend/src/
├── hooks/                             # Custom hooks
│   ├── use-search.ts
│   ├── use-debounce.ts
│   └── index.ts
│
├── components/
│   └── features/
│       └── search/
│           ├── search-box/
│           │   ├── search-box.tsx
│           │   ├── search-box.test.tsx
│           │   └── index.ts
│           ├── product-card/
│           │   ├── product-card.tsx
│           │   ├── product-card.test.tsx
│           │   └── index.ts
│           ├── product-list/
│           │   ├── product-list.tsx
│           │   ├── product-list.test.tsx
│           │   └── index.ts
│           ├── pagination/
│           │   ├── pagination.tsx
│           │   ├── pagination.test.tsx
│           │   └── index.ts
│           ├── empty-state/
│           │   ├── empty-state.tsx
│           │   └── index.ts
│           └── index.ts
│
└── app/
    └── page.tsx                       # Home page with search
```

## 🔧 Tecnologías

### Core

- **React**: ^18.3.0
- **Next.js**: ^14.2.0
- **TypeScript**: ^5.3.0
- **@tanstack/react-query**: ^5.28.0

### Utilities

- **next/navigation**: useRouter, useSearchParams
- **lucide-react**: Icons

## ✅ Tareas Específicas

### Fase 1: Custom Hooks

1. [ ] Crear `useDebounce` hook
2. [ ] Crear `useSearch` hook con React Query
3. [ ] Implementar lógica de paginación
4. [ ] Manejar estados (loading, error, success)

### Fase 2: SearchBox Component

5. [ ] Crear componente SearchBox
6. [ ] Implementar input con debounce
7. [ ] Manejar submit del formulario
8. [ ] Actualizar URL params
9. [ ] Tests de SearchBox

### Fase 3: ProductCard Component

10. [ ] Crear componente ProductCard
11. [ ] Mostrar imagen, título, precio
12. [ ] Mostrar badges (nuevo, envío gratis)
13. [ ] Mostrar rating
14. [ ] Mostrar cuotas
15. [ ] Link a detalle
16. [ ] Tests de ProductCard

### Fase 4: ProductList Component

17. [ ] Crear componente ProductList
18. [ ] Renderizar lista de ProductCards
19. [ ] Mostrar skeleton mientras carga
20. [ ] Mostrar error state
21. [ ] Mostrar empty state
22. [ ] Tests de ProductList

### Fase 5: Pagination Component

23. [ ] Crear componente Pagination
24. [ ] Mostrar números de página
25. [ ] Botones prev/next
26. [ ] Actualizar URL params
27. [ ] Tests de Pagination

### Fase 6: Empty State

28. [ ] Crear componente EmptyState
29. [ ] Mensaje para sin resultados
30. [ ] Sugerencias de búsqueda

### Fase 7: Page Integration

31. [ ] Integrar todo en app/page.tsx
32. [ ] Leer query params de URL
33. [ ] Renderizar SearchBox
34. [ ] Renderizar ProductList
35. [ ] Renderizar Pagination

### Fase 8: Testing

36. [ ] Tests de useSearch hook
37. [ ] Tests de integración de la página
38. [ ] Tests E2E (opcional)

## 📝 Implementación Detallada

### 1. `hooks/use-debounce.ts`

```typescript
import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 * Debounces a value by a specified delay
 *
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timeout on value change or unmount
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 2. `hooks/use-search.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { SearchProductsUseCase } from '@/core/use-cases/search-products';
import { apiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { queryKeys } from '@/infrastructure/config/query-client.config';
import { SearchResult } from '@/core/entities/search-result.entity';
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
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<SearchResult, Error>({
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
```

### 3. `components/features/search/search-box/search-box.tsx`

```typescript
'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * SearchBox Component
 * Search input with submit functionality
 */
export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);

  /**
   * Handle form submit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', query.trim());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Handle clear button
   */
  const handleClear = () => {
    setQuery('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            rightIcon={
              query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )
            }
            fullWidth
          />
        </div>
        <Button type="submit" disabled={!query.trim()}>
          Buscar
        </Button>
      </div>
    </form>
  );
}
```

### 4. `components/features/search/product-card/product-card.tsx`

```typescript
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/core/entities/product.entity';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { formatCurrency } from '@/lib/utils';
import { Truck } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * Displays product information in a card format
 */
export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.getMainImageUrl();
  const installmentText = product.getInstallmentText();
  const rating = product.getAverageRating();

  return (
    <Link href={`/items/${product.id}`}>
      <Card hoverable padding="md">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-ml bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                sizes="128px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-1 flex-col justify-between">
            {/* Title */}
            <div>
              <h3 className="line-clamp-2 text-base font-normal text-gray-900">
                {product.title}
              </h3>
            </div>

            {/* Price */}
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.hasDiscount() && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </div>

              {/* Installments */}
              {installmentText && (
                <p className="mt-1 text-sm text-success-500">
                  {installmentText} sin interés
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {product.hasFreeShipping() && (
                <Badge variant="success" size="sm">
                  <Truck className="mr-1 h-3 w-3" />
                  Envío gratis
                </Badge>
              )}

              {product.isNew() && (
                <Badge variant="info" size="sm">
                  Nuevo
                </Badge>
              )}

              {product.hasDiscount() && (
                <Badge variant="warning" size="sm">
                  {product.getDiscountPercentage()}% OFF
                </Badge>
              )}
            </div>

            {/* Rating */}
            {rating && (
              <div className="mt-2">
                <Rating value={rating} size="sm" showValue />
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

### 5. `components/features/search/empty-state/empty-state.tsx`

```typescript
import { SearchX } from 'lucide-react';

export interface EmptyStateProps {
  query: string;
}

/**
 * EmptyState Component
 * Displayed when no search results are found
 */
export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="h-16 w-16 text-gray-400" />

      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        No hay publicaciones que coincidan con tu búsqueda
      </h2>

      <p className="mt-2 text-gray-600">
        No se encontraron resultados para &quot;{query}&quot;
      </p>

      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <p className="font-medium">Sugerencias:</p>
        <ul className="list-inside list-disc space-y-1 text-left">
          <li>Revisá la ortografía de la palabra</li>
          <li>Utilizá palabras más genéricas o menos palabras</li>
          <li>Navegá por las categorías para encontrar un producto similar</li>
        </ul>
      </div>
    </div>
  );
}
```

### 6. `components/features/search/pagination/pagination.tsx`

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Paging } from '@/core/entities/paging.entity';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  paging: Paging;
  query: string;
}

/**
 * Pagination Component
 * Page navigation controls
 */
export function Pagination({ paging, query }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Navigate to a specific page
   */
  const goToPage = (page: number) => {
    const offset = (page - 1) * paging.limit;
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Go to previous page
   */
  const goToPrevious = () => {
    const offset = paging.getPreviousPageOffset();
    if (offset === null) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Go to next page
   */
  const goToNext = () => {
    const offset = paging.getNextPageOffset();
    if (offset === null) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  const currentPage = paging.getCurrentPage();
  const totalPages = paging.getTotalPages();
  const pageRange = paging.getPageRange(5);

  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToPrevious}
        disabled={!paging.hasPreviousPage()}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pageRange.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => goToPage(page)}
            className={cn(
              'min-w-[40px]',
              page === currentPage && 'pointer-events-none',
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToNext}
        disabled={!paging.hasNextPage()}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### 7. `components/features/search/product-list/product-list.tsx`

```typescript
import { Product } from '@/core/entities/product.entity';
import { Paging } from '@/core/entities/paging.entity';
import { ProductCard } from '../product-card';
import { Pagination } from '../pagination';
import { EmptyState } from '../empty-state';
import { SearchResultsSkeleton } from '@/components/skeletons';

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
```

### 8. `app/page.tsx` (Updated with Search Feature)

```typescript
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { SearchBox } from '@/components/features/search/search-box';
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
  const {
    products,
    paging,
    isLoading,
    isError,
    error,
    isEmpty,
  } = useSearch(query, limit, offset);

  return (
    <Container size="lg" className="py-8">
      <div className="space-y-8">
        {/* Search Box */}
        <div className="mx-auto max-w-2xl">
          <SearchBox />
        </div>

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
```

### 9. `hooks/__tests__/use-search.test.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearch } from '../use-search';
import { apiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { SearchResult } from '@/core/entities/search-result.entity';
import { Paging } from '@/core/entities/paging.entity';

// Mock repository
jest.mock('@/infrastructure/repositories/api-product.repository');

describe('useSearch', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should fetch search results successfully', async () => {
    const mockSearchResult = new SearchResult(
      'iphone',
      [],
      new Paging(100, 0, 10),
    );

    (apiProductRepository.search as jest.Mock).mockResolvedValue(
      mockSearchResult,
    );

    const { result } = renderHook(() => useSearch('iphone', 10, 0), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.searchResult).toEqual(mockSearchResult);
    expect(result.current.hasResults).toBe(false);
  });

  it('should not fetch if query is empty', () => {
    const { result } = renderHook(() => useSearch('', 10, 0), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.searchResult).toBeUndefined();
  });
});
```

### 10. `components/features/search/product-card/__tests__/product-card.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../product-card';
import { Product } from '@/core/entities/product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';

describe('ProductCard', () => {
  const mockProduct = new Product(
    'MLA123',
    'iPhone 13',
    1000,
    Currency.ARS,
    ProductCondition.NEW,
    'http://example.com/image.jpg',
    1200,
    10,
    5,
    undefined,
    undefined,
    { quantity: 12, amount: 100 },
    { freeShipping: true },
    undefined,
    undefined,
    undefined,
    undefined,
    { ratingAverage: 4.5, total: 100 },
  );

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText(/\$1\.000/)).toBeInTheDocument();
  });

  it('shows free shipping badge', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });

  it('shows new badge for new products', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  it('shows discount badge when product has discount', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/17% OFF/)).toBeInTheDocument();
  });

  it('shows installment information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/12x \$100/)).toBeInTheDocument();
  });

  it('shows rating', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
```

## 🧪 Criterios de Aceptación

- [ ] `useDebounce` hook funcionando correctamente
- [ ] `useSearch` hook integrado con React Query
- [ ] SearchBox actualiza URL params
- [ ] SearchBox con debounce en input
- [ ] ProductCard muestra toda la información
- [ ] ProductCard con badges apropiados
- [ ] ProductCard linkea a detalle
- [ ] ProductList muestra skeleton mientras carga
- [ ] ProductList muestra error state
- [ ] ProductList muestra empty state
- [ ] Pagination con prev/next funcionando
- [ ] Pagination con números de página
- [ ] Pagination actualiza URL params
- [ ] EmptyState con sugerencias
- [ ] Página principal integrada
- [ ] URL params mantienen estado
- [ ] Tests de useSearch >= 80% coverage
- [ ] Tests de ProductCard >= 80% coverage
- [ ] Tests de ProductList >= 80% coverage
- [ ] TypeScript sin errores
- [ ] Linter sin warnings
- [ ] Responsive en mobile y desktop

## 🔗 Dependencias

- **Depende de**:
  - PRP-007 (Frontend - Arquitectura y Setup Next.js)
  - PRP-008 (Frontend - Core Domain Layer)
  - PRP-009 (Frontend - Infrastructure Layer)
  - PRP-010 (Frontend - Presentation Layer Base)
- **Requerido para**:
  - PRP-012 (Frontend - Feature: Product Detail)

## 📚 Referencias

- [React Query - useQuery](https://tanstack.com/query/latest/docs/react/reference/useQuery)
- [Next.js - useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [Next.js - useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [Debouncing in React](https://www.developerway.com/posts/debouncing-in-react)

## 💡 Notas Adicionales

### URL State Management

Usamos URL search params para mantener el estado:

```typescript
// URL: /?q=iphone&offset=10
const query = searchParams.get('q'); // 'iphone'
const offset = searchParams.get('offset'); // '10'
```

**Beneficios**:

- ✅ Estado compartible (copiar URL)
- ✅ Navegación con back/forward
- ✅ SEO friendly
- ✅ Bookmarkeable

### Debouncing Strategy

Debouncing en el input evita requests innecesarios:

```typescript
// Usuario escribe: "i" "p" "h" "o" "n" "e"
// Sin debounce: 6 requests
// Con debounce (500ms): 1 request
```

### React Query Benefits

React Query proporciona:

- ✅ Caching automático
- ✅ Background refetching
- ✅ Retry logic
- ✅ Loading/error states
- ✅ Deduplicación de requests

### Suspense Boundary

Usamos Suspense para `useSearchParams`:

```typescript
<Suspense fallback={<div>Cargando...</div>}>
  <SearchPageContent />
</Suspense>
```

Requerido por Next.js App Router para hooks de navegación.

### Image Optimization

Next.js Image component:

- ✅ Lazy loading automático
- ✅ Responsive images
- ✅ WebP/AVIF automático
- ✅ Blur placeholder

### Accessibility

- ✅ Semantic HTML (form, button, link)
- ✅ Alt text en imágenes
- ✅ Focus states visibles
- ✅ Keyboard navigation
- ✅ ARIA labels donde necesario

### Performance

Optimizaciones implementadas:

- ✅ Debouncing de búsqueda
- ✅ React Query caching
- ✅ Image lazy loading
- ✅ Skeleton screens
- ✅ Pagination (no infinite scroll)

### Error Handling

Tres niveles de error handling:

1. **Network errors**: Capturados por HttpClient
2. **Domain errors**: Manejados por use case
3. **UI errors**: Mostrados en ProductList

### Testing Strategy

- **Unit Tests**: Hooks, componentes individuales
- **Integration Tests**: ProductList con estados
- **E2E Tests**: Flujo completo de búsqueda (opcional)

### Próximos Pasos

Después de este PRP:

1. Implementar feature de Product Detail
2. Agregar filtros de búsqueda (opcional)
3. Agregar ordenamiento (opcional)
4. Mejorar SEO con metadata dinámica
