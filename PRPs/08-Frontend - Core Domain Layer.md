# PRP-008: Frontend - Core Domain Layer

## 🎯 Objetivo

Implementar la capa de dominio del frontend siguiendo los principios de arquitectura hexagonal. Esta capa contendrá las entidades del dominio, los casos de uso (lógica de negocio del cliente), y las interfaces de los repositorios (puertos), sin depender de frameworks de UI o detalles de infraestructura.

## 📋 Contexto

La capa de dominio del frontend es similar a la del backend pero adaptada para el cliente. Contiene la lógica de negocio que debe ejecutarse en el navegador, como validaciones de formularios, transformaciones de datos para la UI, y orquestación de llamadas a la API. Esta capa es independiente de React, Next.js o cualquier librería de UI.

## 🏗️ Arquitectura Hexagonal - Capa de Dominio Frontend

```
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE DOMINIO (Frontend)                 │
│                  (Lógica de Negocio del Cliente)            │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │              ENTITIES (Entidades)                │      │
│  │  - Product.entity.ts                             │      │
│  │  - SearchResult.entity.ts                        │      │
│  │  - Paging.entity.ts                              │      │
│  └──────────────────────────────────────────────────┘      │
│                         │                                   │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────┐      │
│  │          USE CASES (Casos de Uso)                │      │
│  │  - SearchProducts.usecase.ts                     │      │
│  │  - GetProductDetail.usecase.ts                   │      │
│  └──────────────────────────────────────────────────┘      │
│                         │                                   │
│                         ▼                                   │
│  ┌──────────────────────────────────────────────────┐      │
│  │    REPOSITORIES (Puertos/Interfaces)             │      │
│  │  - IProductRepository.interface.ts               │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │   INFRASTRUCTURE LAYER              │
        │   (HTTP Client, API Repository)     │
        └─────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/frontend/src/core/
├── entities/                          # Entidades del dominio
│   ├── product.entity.ts
│   ├── search-result.entity.ts
│   ├── paging.entity.ts
│   └── index.ts
│
├── repositories/                      # Interfaces (Puertos)
│   ├── product.repository.interface.ts
│   └── index.ts
│
├── use-cases/                         # Casos de uso
│   ├── search-products/
│   │   ├── search-products.usecase.ts
│   │   ├── search-products.input.ts
│   │   └── index.ts
│   ├── get-product-detail/
│   │   ├── get-product-detail.usecase.ts
│   │   ├── get-product-detail.input.ts
│   │   └── index.ts
│   └── index.ts
│
├── exceptions/                        # Excepciones del dominio
│   ├── domain.exception.ts
│   ├── product-not-found.exception.ts
│   ├── network.exception.ts
│   └── index.ts
│
└── value-objects/                     # Value Objects
    ├── product-id.vo.ts
    ├── search-query.vo.ts
    └── index.ts
```

## 🔧 Tecnologías

### Core

- **TypeScript**: ^5.3.0
- **@meli/shared-types**: workspace:\* (tipos compartidos)

### Utilities

- **zod**: ^3.22.0 (validación de schemas)

## ✅ Tareas Específicas

### Fase 1: Entidades del Dominio

1. [ ] Crear entidad `Product` con métodos de dominio
2. [ ] Crear entidad `SearchResult` para encapsular resultados
3. [ ] Crear entidad `Paging` para paginación
4. [ ] Exportar todas las entidades

### Fase 2: Value Objects

5. [ ] Crear `ProductId` value object con validación
6. [ ] Crear `SearchQuery` value object con sanitización
7. [ ] Exportar value objects

### Fase 3: Excepciones del Dominio

8. [ ] Crear excepción base `DomainException`
9. [ ] Crear `ProductNotFoundException`
10. [ ] Crear `NetworkException`
11. [ ] Exportar excepciones

### Fase 4: Interfaces de Repositorios (Puertos)

12. [ ] Crear interface `IProductRepository`
13. [ ] Definir métodos: `search()`, `getById()`
14. [ ] Documentar contratos con JSDoc

### Fase 5: Inputs de Casos de Uso

15. [ ] Crear input para `SearchProducts` con validación Zod
16. [ ] Crear input para `GetProductDetail` con validación Zod

### Fase 6: Casos de Uso

17. [ ] Implementar `SearchProductsUseCase`
18. [ ] Implementar `GetProductDetailUseCase`
19. [ ] Manejar excepciones del dominio

### Fase 7: Testing

20. [ ] Tests unitarios de entidades
21. [ ] Tests unitarios de value objects
22. [ ] Tests unitarios de casos de uso (con mocks)

### Fase 8: Documentación

23. [ ] JSDoc en todas las clases y métodos públicos
24. [ ] Ejemplos de uso en comentarios

## 📝 Implementación Detallada

### 1. `core/entities/product.entity.ts`

```typescript
import { IProductDetail, IProductListItem, ProductCondition, Currency } from '@meli/shared-types';

/**
 * Product domain entity (Frontend)
 * Represents a product with business logic for UI
 */
export class Product {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currencyId: Currency,
    public readonly condition: ProductCondition,
    public readonly thumbnail?: string,
    public readonly originalPrice?: number,
    public readonly availableQuantity?: number,
    public readonly soldQuantity?: number,
    public readonly permalink?: string,
    public readonly pictures?: Array<{ id: string; url: string }>,
    public readonly installments?: {
      quantity: number;
      amount: number;
      rate?: number;
      currencyId?: Currency;
    },
    public readonly shipping?: {
      freeShipping: boolean;
      mode?: string;
      logisticType?: string;
      storePickUp?: boolean;
    },
    public readonly sellerAddress?: {
      city: { name: string };
      state: { name: string };
    },
    public readonly attributes?: Array<{
      id: string;
      name: string;
      valueName: string;
    }>,
    public readonly warranty?: string,
    public readonly description?: string,
    public readonly reviews?: {
      ratingAverage: number;
      total: number;
    },
  ) {}

  /**
   * Check if product has discount
   */
  hasDiscount(): boolean {
    return !!this.originalPrice && this.originalPrice > this.price;
  }

  /**
   * Calculate discount percentage
   */
  getDiscountPercentage(): number {
    if (!this.hasDiscount()) return 0;
    return Math.round(((this.originalPrice! - this.price) / this.originalPrice!) * 100);
  }

  /**
   * Get discount amount
   */
  getDiscountAmount(): number {
    if (!this.hasDiscount()) return 0;
    return this.originalPrice! - this.price;
  }

  /**
   * Check if product has free shipping
   */
  hasFreeShipping(): boolean {
    return this.shipping?.freeShipping ?? false;
  }

  /**
   * Check if product is new
   */
  isNew(): boolean {
    return this.condition === ProductCondition.NEW;
  }

  /**
   * Check if product is available
   */
  isAvailable(): boolean {
    return (this.availableQuantity ?? 0) > 0;
  }

  /**
   * Get availability status text
   */
  getAvailabilityStatus(): string {
    if (!this.isAvailable()) return 'Sin stock';
    if (this.availableQuantity === 1) return 'Último disponible';
    if (this.availableQuantity! < 5) return 'Pocas unidades';
    return 'Disponible';
  }

  /**
   * Get average rating
   */
  getAverageRating(): number | null {
    return this.reviews?.ratingAverage ?? null;
  }

  /**
   * Check if product has good rating (>= 4.0)
   */
  hasGoodRating(): boolean {
    const rating = this.getAverageRating();
    return rating !== null && rating >= 4.0;
  }

  /**
   * Get rating stars (for UI)
   */
  getRatingStars(): number {
    const rating = this.getAverageRating();
    return rating ? Math.round(rating) : 0;
  }

  /**
   * Get main image URL
   */
  getMainImageUrl(): string {
    return this.pictures?.[0]?.url || this.thumbnail || '';
  }

  /**
   * Get all image URLs
   */
  getImageUrls(): string[] {
    if (this.pictures && this.pictures.length > 0) {
      return this.pictures.map((p) => p.url);
    }
    return this.thumbnail ? [this.thumbnail] : [];
  }

  /**
   * Get installment text for UI
   */
  getInstallmentText(): string | null {
    if (!this.installments) return null;
    const { quantity, amount } = this.installments;
    return `${quantity}x $${amount.toLocaleString('es-AR')}`;
  }

  /**
   * Get seller location text
   */
  getSellerLocation(): string | null {
    if (!this.sellerAddress) return null;
    const { city, state } = this.sellerAddress;
    return `${city.name}, ${state.name}`;
  }

  /**
   * Find attribute by ID
   */
  getAttribute(attributeId: string): string | null {
    const attr = this.attributes?.find((a) => a.id === attributeId);
    return attr?.valueName ?? null;
  }

  /**
   * Get brand
   */
  getBrand(): string | null {
    return this.getAttribute('BRAND');
  }

  /**
   * Get model
   */
  getModel(): string | null {
    return this.getAttribute('MODEL');
  }

  /**
   * Create Product from API list item
   */
  static fromListItem(data: IProductListItem): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.thumbnail,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      data.installments,
      data.shipping,
      undefined,
      undefined,
      undefined,
      undefined,
      data.reviews,
    );
  }

  /**
   * Create Product from API detail
   */
  static fromDetail(data: IProductDetail): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.pictures?.[0]?.url,
      data.originalPrice,
      data.availableQuantity,
      data.soldQuantity,
      data.permalink,
      data.pictures,
      data.installments,
      data.shipping,
      data.sellerAddress,
      data.attributes,
      data.warranty,
      data.description,
      data.reviews,
    );
  }
}
```

### 2. `core/entities/paging.entity.ts`

```typescript
import { IPaging } from '@meli/shared-types';

/**
 * Paging domain entity (Frontend)
 * Encapsulates pagination logic for UI
 */
export class Paging {
  constructor(
    public readonly total: number,
    public readonly offset: number,
    public readonly limit: number,
  ) {
    this.validatePaging();
  }

  /**
   * Validate paging parameters
   */
  private validatePaging(): void {
    if (this.total < 0) {
      throw new Error('Total cannot be negative');
    }
    if (this.offset < 0) {
      throw new Error('Offset cannot be negative');
    }
    if (this.limit <= 0) {
      throw new Error('Limit must be greater than 0');
    }
  }

  /**
   * Calculate current page (1-indexed)
   */
  getCurrentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  /**
   * Calculate total pages
   */
  getTotalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  /**
   * Check if there's a next page
   */
  hasNextPage(): boolean {
    return this.offset + this.limit < this.total;
  }

  /**
   * Check if there's a previous page
   */
  hasPreviousPage(): boolean {
    return this.offset > 0;
  }

  /**
   * Get next page offset
   */
  getNextPageOffset(): number | null {
    return this.hasNextPage() ? this.offset + this.limit : null;
  }

  /**
   * Get previous page offset
   */
  getPreviousPageOffset(): number | null {
    return this.hasPreviousPage() ? Math.max(0, this.offset - this.limit) : null;
  }

  /**
   * Get page range for pagination UI
   * Returns array of page numbers to display
   */
  getPageRange(maxPages: number = 5): number[] {
    const totalPages = this.getTotalPages();
    const currentPage = this.getCurrentPage();

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxPages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  /**
   * Get results range text (e.g., "1-10 de 100")
   */
  getResultsRangeText(): string {
    const from = this.offset + 1;
    const to = Math.min(this.offset + this.limit, this.total);
    return `${from}-${to} de ${this.total}`;
  }

  /**
   * Create from API response
   */
  static fromObject(data: IPaging): Paging {
    return new Paging(data.total, data.offset, data.limit);
  }
}
```

### 3. `core/entities/search-result.entity.ts`

```typescript
import { ISearchResultResponse } from '@meli/shared-types';
import { Product } from './product.entity';
import { Paging } from './paging.entity';

/**
 * SearchResult domain entity (Frontend)
 * Encapsulates search results with products and pagination
 */
export class SearchResult {
  constructor(
    public readonly query: string,
    public readonly products: Product[],
    public readonly paging: Paging,
  ) {
    this.validateQuery();
  }

  /**
   * Validate search query
   */
  private validateQuery(): void {
    if (!this.query || this.query.trim().length === 0) {
      throw new Error('Query cannot be empty');
    }
  }

  /**
   * Check if there are results
   */
  hasResults(): boolean {
    return this.products.length > 0;
  }

  /**
   * Get number of results in current page
   */
  getResultCount(): number {
    return this.products.length;
  }

  /**
   * Get total results count
   */
  getTotalResults(): number {
    return this.paging.total;
  }

  /**
   * Get results summary text
   */
  getResultsSummary(): string {
    const total = this.getTotalResults();
    if (total === 0) return 'No se encontraron resultados';
    if (total === 1) return '1 resultado';
    return `${total.toLocaleString('es-AR')} resultados`;
  }

  /**
   * Filter products by condition
   */
  filterByCondition(condition: string): Product[] {
    return this.products.filter((p) => p.condition === condition);
  }

  /**
   * Get new products count
   */
  getNewProductsCount(): number {
    return this.products.filter((p) => p.isNew()).length;
  }

  /**
   * Get used products count
   */
  getUsedProductsCount(): number {
    return this.products.filter((p) => !p.isNew()).length;
  }

  /**
   * Filter products with free shipping
   */
  filterByFreeShipping(): Product[] {
    return this.products.filter((p) => p.hasFreeShipping());
  }

  /**
   * Get free shipping products count
   */
  getFreeShippingCount(): number {
    return this.products.filter((p) => p.hasFreeShipping()).length;
  }

  /**
   * Filter products with discount
   */
  filterByDiscount(): Product[] {
    return this.products.filter((p) => p.hasDiscount());
  }

  /**
   * Get products with discount count
   */
  getDiscountProductsCount(): number {
    return this.products.filter((p) => p.hasDiscount()).length;
  }

  /**
   * Get price range
   */
  getPriceRange(): { min: number; max: number } | null {
    if (this.products.length === 0) return null;

    const prices = this.products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  /**
   * Sort products by price (ascending)
   */
  sortByPriceAsc(): Product[] {
    return [...this.products].sort((a, b) => a.price - b.price);
  }

  /**
   * Sort products by price (descending)
   */
  sortByPriceDesc(): Product[] {
    return [...this.products].sort((a, b) => b.price - a.price);
  }

  /**
   * Sort products by relevance (default API order)
   */
  sortByRelevance(): Product[] {
    return [...this.products];
  }

  /**
   * Create from API response
   */
  static fromResponse(data: ISearchResultResponse): SearchResult {
    const products = data.results.map((item) => Product.fromListItem(item));
    const paging = Paging.fromObject(data.paging);
    return new SearchResult(data.query, products, paging);
  }
}
```

### 4. `core/entities/index.ts`

```typescript
export * from './product.entity';
export * from './paging.entity';
export * from './search-result.entity';
```

### 5. `core/value-objects/product-id.vo.ts`

```typescript
import { PRODUCT_ID_PATTERN } from '@meli/shared-types';

/**
 * ProductId Value Object (Frontend)
 * Ensures product ID is always valid
 */
export class ProductId {
  private readonly value: string;

  constructor(id: string) {
    this.validate(id);
    this.value = id;
  }

  /**
   * Validate product ID format
   */
  private validate(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }

    if (!PRODUCT_ID_PATTERN.test(id)) {
      throw new Error(`Invalid product ID format: ${id}. Expected format: MLA followed by numbers`);
    }
  }

  /**
   * Get the value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Check equality
   */
  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  /**
   * Convert to string
   */
  toString(): string {
    return this.value;
  }

  /**
   * Create from string (factory method)
   */
  static from(id: string): ProductId {
    return new ProductId(id);
  }

  /**
   * Try to create from string, returns null if invalid
   */
  static tryFrom(id: string): ProductId | null {
    try {
      return new ProductId(id);
    } catch {
      return null;
    }
  }
}
```

### 6. `core/value-objects/search-query.vo.ts`

```typescript
import { SEARCH_QUERY } from '@meli/shared-types';

/**
 * SearchQuery Value Object (Frontend)
 * Ensures search query is always valid and sanitized
 */
export class SearchQuery {
  private readonly value: string;

  constructor(query: string) {
    this.validate(query);
    this.value = this.sanitize(query);
  }

  /**
   * Validate search query
   */
  private validate(query: string): void {
    if (!query || query.trim().length === 0) {
      throw new Error('Search query cannot be empty');
    }

    if (query.length < SEARCH_QUERY.MIN_LENGTH) {
      throw new Error(`Search query must be at least ${SEARCH_QUERY.MIN_LENGTH} character(s)`);
    }

    if (query.length > SEARCH_QUERY.MAX_LENGTH) {
      throw new Error(`Search query cannot exceed ${SEARCH_QUERY.MAX_LENGTH} characters`);
    }
  }

  /**
   * Sanitize search query
   */
  private sanitize(query: string): string {
    return query.trim().toLowerCase();
  }

  /**
   * Get the value
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Get original (non-sanitized) value for display
   */
  getDisplayValue(): string {
    return this.value;
  }

  /**
   * Check equality
   */
  equals(other: SearchQuery): boolean {
    return this.value === other.value;
  }

  /**
   * Convert to string
   */
  toString(): string {
    return this.value;
  }

  /**
   * Create from string (factory method)
   */
  static from(query: string): SearchQuery {
    return new SearchQuery(query);
  }

  /**
   * Try to create from string, returns null if invalid
   */
  static tryFrom(query: string): SearchQuery | null {
    try {
      return new SearchQuery(query);
    } catch {
      return null;
    }
  }
}
```

### 7. `core/value-objects/index.ts`

```typescript
export * from './product-id.vo';
export * from './search-query.vo';
```

### 8. `core/exceptions/domain.exception.ts`

```typescript
/**
 * Base domain exception (Frontend)
 * All domain exceptions should extend this class
 */
export abstract class DomainException extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### 9. `core/exceptions/product-not-found.exception.ts`

```typescript
import { DomainException } from './domain.exception';

/**
 * Exception thrown when a product is not found
 */
export class ProductNotFoundException extends DomainException {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found`, 'PRODUCT_NOT_FOUND');
  }
}
```

### 10. `core/exceptions/network.exception.ts`

```typescript
import { DomainException } from './domain.exception';

/**
 * Exception thrown when a network error occurs
 */
export class NetworkException extends DomainException {
  constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message, 'NETWORK_ERROR');
  }
}
```

### 11. `core/exceptions/index.ts`

```typescript
export * from './domain.exception';
export * from './product-not-found.exception';
export * from './network.exception';
```

### 12. `core/repositories/product.repository.interface.ts`

```typescript
import { Product } from '../entities/product.entity';
import { SearchResult } from '../entities/search-result.entity';

/**
 * Product repository interface (Port) - Frontend
 * Defines the contract for product data access
 * Implementations will be in the infrastructure layer
 */
export interface IProductRepository {
  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Maximum number of results
   * @param offset - Pagination offset
   * @returns SearchResult with products and pagination
   * @throws NetworkException if request fails
   */
  search(query: string, limit: number, offset: number): Promise<SearchResult>;

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product entity
   * @throws ProductNotFoundException if product not found
   * @throws NetworkException if request fails
   */
  getById(id: string): Promise<Product>;
}
```

### 13. `core/repositories/index.ts`

```typescript
export * from './product.repository.interface';
```

### 14. `core/use-cases/search-products/search-products.input.ts`

```typescript
import { z } from 'zod';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search products input schema
 */
export const SearchProductsInputSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty').max(200, 'Search query is too long'),
  limit: z
    .number()
    .int()
    .min(PAGINATION.MIN_LIMIT)
    .max(PAGINATION.MAX_LIMIT)
    .default(PAGINATION.DEFAULT_LIMIT),
  offset: z.number().int().min(PAGINATION.MIN_OFFSET).default(PAGINATION.DEFAULT_OFFSET),
});

/**
 * Search products input type
 */
export type SearchProductsInput = z.infer<typeof SearchProductsInputSchema>;
```

### 15. `core/use-cases/search-products/search-products.usecase.ts`

```typescript
import { IProductRepository } from '../../repositories/product.repository.interface';
import { SearchResult } from '../../entities/search-result.entity';
import { SearchQuery } from '../../value-objects/search-query.vo';
import { SearchProductsInput, SearchProductsInputSchema } from './search-products.input';

/**
 * Search Products Use Case (Frontend)
 * Business logic for searching products
 */
export class SearchProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Execute search products use case
   * @param input - Search parameters
   * @returns SearchResult with products and pagination
   */
  async execute(input: SearchProductsInput): Promise<SearchResult> {
    // Validate input
    const validatedInput = SearchProductsInputSchema.parse(input);

    // Create value object for query (validates and sanitizes)
    const searchQuery = SearchQuery.from(validatedInput.query);

    // Execute search through repository
    const result = await this.productRepository.search(
      searchQuery.getValue(),
      validatedInput.limit,
      validatedInput.offset,
    );

    return result;
  }
}
```

### 16. `core/use-cases/search-products/index.ts`

```typescript
export * from './search-products.input';
export * from './search-products.usecase';
```

### 17. `core/use-cases/get-product-detail/get-product-detail.input.ts`

```typescript
import { z } from 'zod';
import { PRODUCT_ID_PATTERN } from '@meli/shared-types';

/**
 * Get product detail input schema
 */
export const GetProductDetailInputSchema = z.object({
  id: z
    .string()
    .regex(
      PRODUCT_ID_PATTERN,
      'Invalid product ID format. Expected format: MLA followed by numbers',
    ),
});

/**
 * Get product detail input type
 */
export type GetProductDetailInput = z.infer<typeof GetProductDetailInputSchema>;
```

### 18. `core/use-cases/get-product-detail/get-product-detail.usecase.ts`

```typescript
import { IProductRepository } from '../../repositories/product.repository.interface';
import { Product } from '../../entities/product.entity';
import { ProductId } from '../../value-objects/product-id.vo';
import { GetProductDetailInput, GetProductDetailInputSchema } from './get-product-detail.input';

/**
 * Get Product Detail Use Case (Frontend)
 * Business logic for retrieving product details
 */
export class GetProductDetailUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Execute get product detail use case
   * @param input - Product ID
   * @returns Product entity with full details
   */
  async execute(input: GetProductDetailInput): Promise<Product> {
    // Validate input
    const validatedInput = GetProductDetailInputSchema.parse(input);

    // Create value object for product ID (validates format)
    const productId = ProductId.from(validatedInput.id);

    // Retrieve product through repository
    const product = await this.productRepository.getById(productId.getValue());

    return product;
  }
}
```

### 19. `core/use-cases/get-product-detail/index.ts`

```typescript
export * from './get-product-detail.input';
export * from './get-product-detail.usecase';
```

### 20. `core/use-cases/index.ts`

```typescript
export * from './search-products';
export * from './get-product-detail';
```

### 21. `core/entities/__tests__/product.entity.test.ts`

```typescript
import { Product } from '../product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';

describe('Product Entity', () => {
  const mockProduct = new Product(
    'MLA123456789',
    'iPhone 13',
    1000,
    Currency.ARS,
    ProductCondition.NEW,
    'http://example.com/thumb.jpg',
    1200,
    10,
    5,
    'http://example.com/product',
    [
      { id: '1', url: 'http://example.com/pic1.jpg' },
      { id: '2', url: 'http://example.com/pic2.jpg' },
    ],
    { quantity: 12, amount: 100, rate: 0 },
    { freeShipping: true },
    { city: { name: 'CABA' }, state: { name: 'Buenos Aires' } },
    [{ id: 'BRAND', name: 'Marca', valueName: 'Apple' }],
    'Garantía 1 año',
    'Descripción del producto',
    { ratingAverage: 4.5, total: 100 },
  );

  describe('hasDiscount', () => {
    it('should return true when original price is higher', () => {
      expect(mockProduct.hasDiscount()).toBe(true);
    });

    it('should return false when no original price', () => {
      const product = new Product('MLA123', 'Test', 1000, Currency.ARS, ProductCondition.NEW);
      expect(product.hasDiscount()).toBe(false);
    });
  });

  describe('getDiscountPercentage', () => {
    it('should calculate correct discount percentage', () => {
      expect(mockProduct.getDiscountPercentage()).toBe(17);
    });
  });

  describe('getAvailabilityStatus', () => {
    it('should return "Sin stock" when not available', () => {
      const product = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        undefined,
        undefined,
        0,
      );
      expect(product.getAvailabilityStatus()).toBe('Sin stock');
    });

    it('should return "Último disponible" when only 1 unit', () => {
      const product = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        undefined,
        undefined,
        1,
      );
      expect(product.getAvailabilityStatus()).toBe('Último disponible');
    });

    it('should return "Pocas unidades" when less than 5', () => {
      const product = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        undefined,
        undefined,
        3,
      );
      expect(product.getAvailabilityStatus()).toBe('Pocas unidades');
    });

    it('should return "Disponible" when 5 or more', () => {
      expect(mockProduct.getAvailabilityStatus()).toBe('Disponible');
    });
  });

  describe('getMainImageUrl', () => {
    it('should return first picture URL', () => {
      expect(mockProduct.getMainImageUrl()).toBe('http://example.com/pic1.jpg');
    });

    it('should return thumbnail if no pictures', () => {
      const product = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        'http://example.com/thumb.jpg',
      );
      expect(product.getMainImageUrl()).toBe('http://example.com/thumb.jpg');
    });
  });

  describe('getInstallmentText', () => {
    it('should format installment text', () => {
      expect(mockProduct.getInstallmentText()).toBe('12x $100');
    });

    it('should return null if no installments', () => {
      const product = new Product('MLA123', 'Test', 1000, Currency.ARS, ProductCondition.NEW);
      expect(product.getInstallmentText()).toBeNull();
    });
  });

  describe('getBrand', () => {
    it('should return brand attribute', () => {
      expect(mockProduct.getBrand()).toBe('Apple');
    });
  });
});
```

### 22. `core/use-cases/search-products/__tests__/search-products.usecase.test.ts`

```typescript
import { SearchProductsUseCase } from '../search-products.usecase';
import { IProductRepository } from '../../../repositories/product.repository.interface';
import { SearchResult } from '../../../entities/search-result.entity';
import { Paging } from '../../../entities/paging.entity';

describe('SearchProductsUseCase', () => {
  let useCase: SearchProductsUseCase;
  let mockRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockRepository = {
      search: jest.fn(),
      getById: jest.fn(),
    };

    useCase = new SearchProductsUseCase(mockRepository);
  });

  it('should search products successfully', async () => {
    const mockSearchResult = new SearchResult('iphone', [], new Paging(100, 0, 10));

    mockRepository.search.mockResolvedValue(mockSearchResult);

    const result = await useCase.execute({
      query: 'iphone',
      limit: 10,
      offset: 0,
    });

    expect(result).toBe(mockSearchResult);
    expect(mockRepository.search).toHaveBeenCalledWith('iphone', 10, 0);
  });

  it('should throw error for empty query', async () => {
    await expect(
      useCase.execute({
        query: '',
        limit: 10,
        offset: 0,
      }),
    ).rejects.toThrow();
  });

  it('should sanitize query before searching', async () => {
    const mockSearchResult = new SearchResult('iphone', [], new Paging(100, 0, 10));

    mockRepository.search.mockResolvedValue(mockSearchResult);

    await useCase.execute({
      query: '  IPHONE  ',
      limit: 10,
      offset: 0,
    });

    expect(mockRepository.search).toHaveBeenCalledWith('iphone', 10, 0);
  });
});
```

## 🧪 Criterios de Aceptación

- [ ] Todas las entidades creadas con métodos de dominio para UI
- [ ] Value Objects implementados con validación
- [ ] Excepciones del dominio definidas
- [ ] Interface `IProductRepository` con contratos claros
- [ ] Inputs con validación Zod
- [ ] Casos de uso implementados
- [ ] Tests unitarios con cobertura >= 80%
- [ ] JSDoc completo en clases y métodos públicos
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings
- [ ] No dependencias de React o Next.js en capa de dominio
- [ ] Casos de uso son testables con mocks

## 🔗 Dependencias

- **Depende de**:
  - PRP-003 (Shared Types Package)
  - PRP-007 (Frontend - Arquitectura y Setup Next.js)
- **Requerido para**:
  - PRP-009 (Frontend - Infrastructure Layer)

## 📚 Referencias

- [Clean Architecture - Frontend](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Zod Documentation](https://zod.dev/)
- [Value Objects Pattern](https://martinfowler.com/bliki/ValueObject.html)

## 💡 Notas Adicionales

### Diferencias con Backend Domain Layer

El dominio del frontend tiene algunas diferencias clave:

1. **Métodos orientados a UI**: `getAvailabilityStatus()`, `getInstallmentText()`, etc.
2. **Formateo de datos**: Métodos para preparar datos para mostrar
3. **Sin persistencia**: No hay lógica de guardado, solo lectura
4. **Validación con Zod**: Más apropiado para frontend que class-validator

### Value Objects en Frontend

Los Value Objects son especialmente útiles en frontend para:

- Validar inputs de formularios
- Sanitizar datos del usuario
- Encapsular lógica de validación reutilizable

### Testing Strategy

- **Unit Tests**: Entidades y value objects
- **Use Case Tests**: Con mocks de repositorios
- **No tests de UI**: Eso va en la capa de presentación

### Próximos Pasos

Después de este PRP:

1. Implementar la capa de infraestructura (HTTP client, API repository)
2. Crear hooks de React que usen estos casos de uso
3. Conectar con componentes de UI
