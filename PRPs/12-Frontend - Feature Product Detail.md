# PRP-012: Frontend - Feature: Product Detail

## 🎯 Objetivo

Implementar la funcionalidad completa de visualización de detalle de producto en el frontend. Esta feature incluirá el hook personalizado para obtener el producto, la galería de imágenes, la información detallada del producto, breadcrumbs para navegación, y la integración completa en la página de detalle con manejo de estados (loading, error, not found).

## 📋 Contexto

La página de detalle del producto es donde el usuario ve toda la información completa de un producto específico: imágenes, precio, descripción, atributos, envío, garantía, etc. Es una página crítica para la conversión y debe mostrar toda la información de manera clara y organizada.

## 🏗️ Arquitectura - Product Detail Feature

```
┌─────────────────────────────────────────────────────────────┐
│               PRODUCT DETAIL FEATURE                        │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │    Page (app/items/[id]/page.tsx)              │        │
│  │  - Extrae ID de params                         │        │
│  │  - Genera metadata dinámica                    │        │
│  │  - Renderiza ProductDetail                     │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │      useProductDetail Hook                     │        │
│  │  - React Query integration                     │        │
│  │  - Error handling                              │        │
│  │  - Loading state                               │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Components                             │        │
│  │  - ProductDetail (container)                   │        │
│  │  - ImageGallery (images)                       │        │
│  │  - ProductInfo (details)                       │        │
│  │  - Breadcrumbs (navigation)                    │        │
│  │  - ProductAttributes (specs)                   │        │
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
├── hooks/
│   ├── use-product-detail.ts
│   └── index.ts
│
├── components/
│   └── features/
│       └── product/
│           ├── product-detail/
│           │   ├── product-detail.tsx
│           │   ├── product-detail.test.tsx
│           │   └── index.ts
│           ├── image-gallery/
│           │   ├── image-gallery.tsx
│           │   ├── image-gallery.test.tsx
│           │   └── index.ts
│           ├── product-info/
│           │   ├── product-info.tsx
│           │   ├── product-info.test.tsx
│           │   └── index.ts
│           ├── product-attributes/
│           │   ├── product-attributes.tsx
│           │   └── index.ts
│           ├── breadcrumbs/
│           │   ├── breadcrumbs.tsx
│           │   └── index.ts
│           └── index.ts
│
└── app/
    └── items/
        └── [id]/
            └── page.tsx
```

## 🔧 Tecnologías

### Core

- **React**: ^18.3.0
- **Next.js**: ^14.2.0
- **TypeScript**: ^5.3.0
- **@tanstack/react-query**: ^5.28.0

### UI

- **next/image**: Image optimization
- **lucide-react**: Icons

## ✅ Tareas Específicas

### Fase 1: Custom Hook

1. [ ] Crear `useProductDetail` hook con React Query
2. [ ] Manejar estados (loading, error, not found)
3. [ ] Tests del hook

### Fase 2: Breadcrumbs Component

4. [ ] Crear componente Breadcrumbs
5. [ ] Navegación a home y búsqueda
6. [ ] Tests de Breadcrumbs

### Fase 3: ImageGallery Component

7. [ ] Crear componente ImageGallery
8. [ ] Imagen principal grande
9. [ ] Thumbnails seleccionables
10. [ ] Navegación entre imágenes
11. [ ] Tests de ImageGallery

### Fase 4: ProductAttributes Component

12. [ ] Crear componente ProductAttributes
13. [ ] Mostrar atributos en tabla
14. [ ] Destacar atributos importantes

### Fase 5: ProductInfo Component

15. [ ] Crear componente ProductInfo
16. [ ] Mostrar condición y stock
17. [ ] Mostrar título y rating
18. [ ] Mostrar precio y descuento
19. [ ] Mostrar cuotas
20. [ ] Mostrar envío
21. [ ] Mostrar garantía
22. [ ] Botón de compra (placeholder)
23. [ ] Tests de ProductInfo

### Fase 6: ProductDetail Container

24. [ ] Crear componente ProductDetail
25. [ ] Layout de 2 columnas (imágenes + info)
26. [ ] Integrar todos los subcomponentes
27. [ ] Mostrar descripción
28. [ ] Tests de ProductDetail

### Fase 7: Page Integration

29. [ ] Crear página dinámica [id]
30. [ ] Generar metadata dinámica
31. [ ] Manejar loading state
32. [ ] Manejar error state
33. [ ] Manejar not found (404)

### Fase 8: Testing

34. [ ] Tests de useProductDetail
35. [ ] Tests de componentes
36. [ ] Tests de integración de página

## 📝 Implementación Detallada

### 1. `hooks/use-product-detail.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { GetProductDetailUseCase } from '@/core/use-cases/get-product-detail';
import { apiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { queryKeys } from '@/infrastructure/config/query-client.config';
import { Product } from '@/core/entities/product.entity';
import { ProductNotFoundException } from '@/core/exceptions/product-not-found.exception';

/**
 * useProductDetail Hook
 * Custom hook for fetching product details with React Query
 *
 * @param id - Product ID
 */
export function useProductDetail(id: string) {
  // Create use case instance
  const getProductDetailUseCase = new GetProductDetailUseCase(apiProductRepository);

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
```

### 2. `components/features/product/breadcrumbs/breadcrumbs.tsx`

```typescript
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbsProps {
  productTitle?: string;
}

/**
 * Breadcrumbs Component
 * Navigation breadcrumbs
 */
export function Breadcrumbs({ productTitle }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-secondary-500"
      >
        <Home className="h-4 w-4" />
        Inicio
      </Link>

      {productTitle && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="line-clamp-1 text-gray-900">{productTitle}</span>
        </>
      )}
    </nav>
  );
}
```

### 3. `components/features/product/image-gallery/image-gallery.tsx`

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageGalleryProps {
  images: Array<{ id: string; url: string }>;
  alt: string;
}

/**
 * ImageGallery Component
 * Product image gallery with thumbnails
 */
export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-ml bg-gray-100">
        <span className="text-gray-400">Sin imágenes</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-ml bg-gray-100">
        <Image
          src={selectedImage.url}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-ml border-2 transition-all',
                index === selectedIndex
                  ? 'border-secondary-500'
                  : 'border-transparent hover:border-gray-300',
              )}
            >
              <Image
                src={image.url}
                alt={`${alt} - ${index + 1}`}
                fill
                className="object-contain"
                sizes="128px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 4. `components/features/product/product-attributes/product-attributes.tsx`

```typescript
export interface ProductAttributesProps {
  attributes: Array<{
    id: string;
    name: string;
    valueName: string;
  }>;
}

/**
 * ProductAttributes Component
 * Displays product specifications
 */
export function ProductAttributes({ attributes }: ProductAttributesProps) {
  if (attributes.length === 0) return null;

  return (
    <div className="rounded-ml bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Características
      </h2>

      <dl className="space-y-3">
        {attributes.map((attr) => (
          <div
            key={attr.id}
            className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-3 last:border-0"
          >
            <dt className="text-sm font-medium text-gray-600">{attr.name}</dt>
            <dd className="text-sm text-gray-900">{attr.valueName}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
```

### 5. `components/features/product/product-info/product-info.tsx`

```typescript
import { Product } from '@/core/entities/product.entity';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Truck, Shield, MapPin } from 'lucide-react';

export interface ProductInfoProps {
  product: Product;
}

/**
 * ProductInfo Component
 * Displays detailed product information
 */
export function ProductInfo({ product }: ProductInfoProps) {
  const rating = product.getAverageRating();
  const installmentText = product.getInstallmentText();
  const sellerLocation = product.getSellerLocation();

  return (
    <div className="space-y-6">
      {/* Condition and Stock */}
      <div className="flex items-center gap-2">
        <Badge variant={product.isNew() ? 'info' : 'default'}>
          {product.isNew() ? 'Nuevo' : 'Usado'}
        </Badge>
        <span className="text-sm text-gray-600">
          {product.getAvailabilityStatus()}
        </span>
        {product.soldQuantity && (
          <span className="text-sm text-gray-600">
            | {product.soldQuantity} vendidos
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-normal text-gray-900">{product.title}</h1>

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-2">
          <Rating value={rating} size="md" showValue />
          {product.reviews && (
            <span className="text-sm text-gray-600">
              ({product.reviews.total} opiniones)
            </span>
          )}
        </div>
      )}

      {/* Price */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-light text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.hasDiscount() && (
            <>
              <span className="text-lg text-gray-500 line-through">
                {formatCurrency(product.originalPrice!)}
              </span>
              <Badge variant="success">
                {product.getDiscountPercentage()}% OFF
              </Badge>
            </>
          )}
        </div>

        {/* Installments */}
        {installmentText && (
          <p className="mt-2 text-base text-success-500">
            en {installmentText} sin interés
          </p>
        )}
      </div>

      {/* Shipping */}
      {product.shipping && (
        <div className="space-y-2 rounded-ml bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-success-500" />
            <div>
              <p className="font-medium text-gray-900">
                {product.hasFreeShipping() ? 'Envío gratis' : 'Envío'}
              </p>
              {sellerLocation && (
                <p className="text-sm text-gray-600">
                  <MapPin className="inline h-4 w-4" /> {sellerLocation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Warranty */}
      {product.warranty && (
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Shield className="h-5 w-5 flex-shrink-0" />
          <span>{product.warranty}</span>
        </div>
      )}

      {/* Buy Button */}
      <div className="space-y-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!product.isAvailable()}
        >
          {product.isAvailable() ? 'Comprar ahora' : 'Sin stock'}
        </Button>
        <Button variant="secondary" size="lg" fullWidth>
          Agregar al carrito
        </Button>
      </div>

      {/* Additional Info */}
      <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
        <p>
          <strong>Vendedor:</strong> Mercado Libre
        </p>
        {product.availableQuantity && (
          <p className="mt-1">
            <strong>Stock disponible:</strong> {product.availableQuantity}{' '}
            unidades
          </p>
        )}
      </div>
    </div>
  );
}
```

### 6. `components/features/product/product-detail/product-detail.tsx`

```typescript
import { Product } from '@/core/entities/product.entity';
import { ImageGallery } from '../image-gallery';
import { ProductInfo } from '../product-info';
import { ProductAttributes } from '../product-attributes';
import { Breadcrumbs } from '../breadcrumbs';

export interface ProductDetailProps {
  product: Product;
}

/**
 * ProductDetail Component
 * Main product detail container
 */
export function ProductDetail({ product }: ProductDetailProps) {
  const images = product.getImageUrls().map((url, index) => ({
    id: `image-${index}`,
    url,
  }));

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs productTitle={product.title} />

      {/* Main Content: Images + Info */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div>
          <ImageGallery images={images} alt={product.title} />
        </div>

        {/* Info */}
        <div>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="rounded-ml bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Descripción
          </h2>
          <p className="whitespace-pre-line text-gray-700">
            {product.description}
          </p>
        </div>
      )}

      {/* Attributes */}
      {product.attributes && product.attributes.length > 0 && (
        <ProductAttributes attributes={product.attributes} />
      )}
    </div>
  );
}
```

### 7. `app/items/[id]/page.tsx`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { ProductDetail } from '@/components/features/product/product-detail';
import { ProductDetailSkeleton } from '@/components/skeletons';
import { useProductDetail } from '@/hooks/use-product-detail';

type Props = {
  params: { id: string };
};

/**
 * Generate metadata for product detail page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you might fetch product data here for SSR
  // For now, we'll use a generic title
  return {
    title: `Producto ${params.id} - Mercado Libre`,
    description: 'Detalle del producto en Mercado Libre',
  };
}

/**
 * Product Detail Page Content
 */
function ProductDetailPageContent({ id }: { id: string }) {
  const { product, isLoading, isError, error, isNotFound } =
    useProductDetail(id);

  // Loading state
  if (isLoading) {
    return (
      <Container size="lg" className="py-8">
        <ProductDetailSkeleton />
      </Container>
    );
  }

  // Not found (404)
  if (isNotFound) {
    notFound();
  }

  // Error state
  if (isError) {
    return (
      <Container size="lg" className="py-8">
        <div className="rounded-ml bg-error-500/10 p-6 text-center">
          <p className="text-lg font-semibold text-error-500">
            Error al cargar el producto
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {error?.message || 'Ocurrió un error inesperado'}
          </p>
        </div>
      </Container>
    );
  }

  // Success state
  if (!product) return null;

  return (
    <Container size="lg" className="py-8">
      <ProductDetail product={product} />
    </Container>
  );
}

/**
 * Product Detail Page
 */
export default function ProductDetailPage({ params }: Props) {
  return <ProductDetailPageContent id={params.id} />;
}
```

### 8. `app/items/[id]/not-found.tsx`

```typescript
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { PackageX } from 'lucide-react';

/**
 * Not Found Page
 * Displayed when product is not found (404)
 */
export default function NotFound() {
  return (
    <Container size="lg" className="py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <PackageX className="h-24 w-24 text-gray-400" />

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Producto no encontrado
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          El producto que buscas no existe o ya no está disponible.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/">
            <Button variant="primary">Volver al inicio</Button>
          </Link>
          <Link href="/?q=iphone">
            <Button variant="outline">Buscar productos</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
```

### 9. `hooks/__tests__/use-product-detail.test.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductDetail } from '../use-product-detail';
import { apiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { Product } from '@/core/entities/product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';
import { ProductNotFoundException } from '@/core/exceptions/product-not-found.exception';

// Mock repository
jest.mock('@/infrastructure/repositories/api-product.repository');

describe('useProductDetail', () => {
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

  it('should fetch product detail successfully', async () => {
    const mockProduct = new Product(
      'MLA123',
      'iPhone 13',
      1000,
      Currency.ARS,
      ProductCondition.NEW,
    );

    (apiProductRepository.getById as jest.Mock).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProductDetail('MLA123'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.isNotFound).toBe(false);
  });

  it('should handle not found error', async () => {
    const error = new ProductNotFoundException('MLA999');
    (apiProductRepository.getById as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useProductDetail('MLA999'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isNotFound).toBe(true);
    expect(result.current.product).toBeUndefined();
  });

  it('should not fetch if id is empty', () => {
    const { result } = renderHook(() => useProductDetail(''), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.product).toBeUndefined();
  });
});
```

### 10. `components/features/product/image-gallery/__tests__/image-gallery.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageGallery } from '../image-gallery';

describe('ImageGallery', () => {
  const mockImages = [
    { id: '1', url: 'http://example.com/1.jpg' },
    { id: '2', url: 'http://example.com/2.jpg' },
    { id: '3', url: 'http://example.com/3.jpg' },
  ];

  it('renders main image', () => {
    render(<ImageGallery images={mockImages} alt="Test Product" />);

    const mainImage = screen.getByAltText('Test Product');
    expect(mainImage).toBeInTheDocument();
  });

  it('renders thumbnails', () => {
    render(<ImageGallery images={mockImages} alt="Test Product" />);

    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(3);
  });

  it('changes main image when thumbnail is clicked', async () => {
    render(<ImageGallery images={mockImages} alt="Test Product" />);

    const thumbnails = screen.getAllByRole('button');
    await userEvent.click(thumbnails[1]);

    const mainImage = screen.getByAltText('Test Product');
    expect(mainImage).toHaveAttribute('src', expect.stringContaining('2.jpg'));
  });

  it('shows placeholder when no images', () => {
    render(<ImageGallery images={[]} alt="Test Product" />);

    expect(screen.getByText('Sin imágenes')).toBeInTheDocument();
  });
});
```

## 🧪 Criterios de Aceptación

- [ ] `useProductDetail` hook funcionando con React Query
- [ ] Hook maneja estados (loading, error, not found)
- [ ] Breadcrumbs con navegación a home
- [ ] ImageGallery con imagen principal y thumbnails
- [ ] ImageGallery permite seleccionar imágenes
- [ ] ProductAttributes muestra especificaciones
- [ ] ProductInfo muestra toda la información
- [ ] ProductInfo con badges apropiados
- [ ] ProductInfo con botones de compra
- [ ] ProductDetail integra todos los componentes
- [ ] ProductDetail con layout responsive
- [ ] Página dinámica [id] funcionando
- [ ] Metadata dinámica generada
- [ ] Not found page (404) personalizada
- [ ] Loading state con skeleton
- [ ] Error state con mensaje
- [ ] Tests de useProductDetail >= 80% coverage
- [ ] Tests de ImageGallery >= 80% coverage
- [ ] Tests de ProductInfo >= 80% coverage
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
  - PRP-013 (Frontend - Testing y Extras)

## 📚 Referencias

- [Next.js - Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Next.js - generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js - notFound](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [Next.js - Image](https://nextjs.org/docs/app/api-reference/components/image)

## 💡 Notas Adicionales

### Dynamic Routes

Next.js App Router usa carpetas con `[param]`:

```
app/items/[id]/page.tsx → /items/MLA123
```

El parámetro se recibe en `params`:

```typescript
export default function Page({ params }: { params: { id: string } }) {
  return <div>Product: {params.id}</div>
}
```

### Metadata Generation

Metadata dinámica para SEO:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  // Fetch product data
  const product = await fetchProduct(params.id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

### Not Found Handling

Next.js proporciona `notFound()` y `not-found.tsx`:

```typescript
// page.tsx
if (!product) {
  notFound() // Throws error
}

// not-found.tsx
export default function NotFound() {
  return <div>404</div>
}
```

### Image Optimization

Next.js Image component:

- ✅ Lazy loading automático
- ✅ Responsive images
- ✅ WebP/AVIF automático
- ✅ Blur placeholder
- ✅ Priority para above-the-fold

```typescript
<Image
  src={url}
  alt={alt}
  fill              // Llena el contenedor
  priority          // Carga inmediata
  sizes="50vw"      // Hint de tamaño
/>
```

### React Query Retry Logic

No reintentar en 404:

```typescript
retry: (failureCount, error) => {
  if (error instanceof ProductNotFoundException) {
    return false; // No retry
  }
  return failureCount < 2; // Retry 2 veces
};
```

### Layout Responsive

Grid de 2 columnas en desktop:

```typescript
<div className="grid gap-8 lg:grid-cols-2">
  <div>Images</div>
  <div>Info</div>
</div>
```

Mobile: 1 columna (stack vertical)
Desktop: 2 columnas (lado a lado)

### Accessibility

- ✅ Semantic HTML (nav, h1, dl/dt/dd)
- ✅ Alt text en imágenes
- ✅ Focus states en thumbnails
- ✅ Keyboard navigation
- ✅ ARIA labels donde necesario

### Performance

Optimizaciones:

- ✅ React Query caching (10 min)
- ✅ Image lazy loading
- ✅ Priority en imagen principal
- ✅ Skeleton screens
- ✅ No fetch si ID vacío

### SEO

Mejoras de SEO:

- ✅ Metadata dinámica
- ✅ Structured data (futuro)
- ✅ Breadcrumbs para navegación
- ✅ Semantic HTML
- ✅ Alt text descriptivo

### Error Handling

Tres tipos de errores:

1. **Not Found (404)**: `notFound()` → `not-found.tsx`
2. **Network Error**: Mensaje de error genérico
3. **Unknown Error**: Fallback con mensaje

### Testing Strategy

- **Unit Tests**: Hooks, componentes individuales
- **Integration Tests**: ProductDetail completo
- **Visual Tests**: Snapshots (opcional)

### Próximos Pasos

Después de este PRP:

1. Testing completo (E2E, accesibilidad)
2. Optimizaciones de performance
3. Mejoras de SEO (structured data)
4. Features adicionales (relacionados, reviews)
5. Deploy y documentación final
