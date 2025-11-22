# PRP-004: Backend - Implementación de Dominio y Casos de Uso

## 🎯 Objetivo

Implementar la capa de dominio del backend siguiendo los principios de arquitectura hexagonal (Clean Architecture). Esta capa contendrá las entidades del dominio, los casos de uso (lógica de negocio) y las interfaces de los repositorios (puertos), sin depender de frameworks o detalles de infraestructura.

## 📋 Contexto

La capa de dominio es el corazón de la aplicación. Contiene la lógica de negocio pura, independiente de cualquier framework o tecnología externa. Esta capa define QUÉ hace la aplicación, no CÓMO lo hace (eso es responsabilidad de la capa de infraestructura).

## 🏗️ Arquitectura Hexagonal - Capa de Dominio

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE DOMINIO                          │
│                  (Lógica de Negocio Pura)                   │
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
        │   (Implementaciones concretas)      │
        │   - MockProductRepository           │
        │   - RealApiProductRepository        │
        └─────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/backend/src/
├── domain/                                    # Capa de dominio
│   ├── entities/                              # Entidades del dominio
│   │   ├── product.entity.ts
│   │   ├── search-result.entity.ts
│   │   ├── paging.entity.ts
│   │   └── index.ts
│   │
│   ├── repositories/                          # Interfaces (Puertos)
│   │   ├── product.repository.interface.ts
│   │   └── index.ts
│   │
│   ├── use-cases/                             # Casos de uso
│   │   ├── search-products/
│   │   │   ├── search-products.usecase.ts
│   │   │   ├── search-products.dto.ts
│   │   │   └── index.ts
│   │   ├── get-product-detail/
│   │   │   ├── get-product-detail.usecase.ts
│   │   │   ├── get-product-detail.dto.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── exceptions/                            # Excepciones del dominio
│   │   ├── domain.exception.ts
│   │   ├── product-not-found.exception.ts
│   │   ├── invalid-search-query.exception.ts
│   │   └── index.ts
│   │
│   └── value-objects/                         # Value Objects (opcional)
│       ├── product-id.vo.ts
│       ├── price.vo.ts
│       └── index.ts
```

## 🔧 Tecnologías

### Core

- **NestJS**: Framework base (solo decoradores para DI)
- **@meli/shared-types**: Tipos compartidos del monorepo
- **class-validator**: Para validación de DTOs
- **class-transformer**: Para transformación de datos

### Dev Dependencies

- **@nestjs/testing**: Para testing de casos de uso
- **jest**: Framework de testing

## ✅ Tareas Específicas

### Fase 1: Entidades del Dominio

1. [ ] Crear entidad `Product` con métodos de dominio
2. [ ] Crear entidad `SearchResult` para encapsular resultados
3. [ ] Crear entidad `Paging` para paginación
4. [ ] Exportar todas las entidades

### Fase 2: Value Objects (Opcional pero Recomendado)

5. [ ] Crear `ProductId` value object con validación
6. [ ] Crear `Price` value object con lógica de descuento
7. [ ] Exportar value objects

### Fase 3: Excepciones del Dominio

8. [ ] Crear excepción base `DomainException`
9. [ ] Crear `ProductNotFoundException`
10. [ ] Crear `InvalidSearchQueryException`
11. [ ] Exportar excepciones

### Fase 4: Interfaces de Repositorios (Puertos)

12. [ ] Crear interface `IProductRepository`
13. [ ] Definir métodos: `search()`, `findById()`
14. [ ] Documentar contratos con JSDoc

### Fase 5: DTOs de Casos de Uso

15. [ ] Crear DTOs para `SearchProducts` con validaciones
16. [ ] Crear DTOs para `GetProductDetail` con validaciones
17. [ ] Aplicar decoradores de `class-validator`

### Fase 6: Casos de Uso

18. [ ] Implementar `SearchProductsUseCase`
19. [ ] Implementar `GetProductDetailUseCase`
20. [ ] Inyectar dependencias de repositorios
21. [ ] Manejar excepciones del dominio

### Fase 7: Testing

22. [ ] Tests unitarios de entidades
23. [ ] Tests unitarios de value objects
24. [ ] Tests unitarios de casos de uso (con mocks)
25. [ ] Configurar coverage mínimo 80%

### Fase 8: Documentación

26. [ ] JSDoc en todas las clases y métodos públicos
27. [ ] Ejemplos de uso en comentarios
28. [ ] Actualizar README del backend

## 📝 Implementación Detallada

### 1. `domain/entities/product.entity.ts`

```typescript
import { IProductDetail, IProductListItem, ProductCondition, Currency } from '@meli/shared-types';

/**
 * Product domain entity
 * Represents a product with business logic
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
   * Convert to list item representation (summary)
   */
  toListItem(): IProductListItem {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      currencyId: this.currencyId,
      condition: this.condition,
      thumbnail: this.thumbnail,
      shipping: this.shipping,
      installments: this.installments,
      reviews: this.reviews,
    };
  }

  /**
   * Convert to detail representation (full)
   */
  toDetail(): IProductDetail {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      originalPrice: this.originalPrice,
      currencyId: this.currencyId,
      availableQuantity: this.availableQuantity,
      soldQuantity: this.soldQuantity,
      condition: this.condition,
      permalink: this.permalink,
      pictures: this.pictures,
      installments: this.installments,
      shipping: this.shipping,
      sellerAddress: this.sellerAddress,
      attributes: this.attributes,
      warranty: this.warranty,
      description: this.description,
      reviews: this.reviews,
    };
  }

  /**
   * Create Product from detail data
   */
  static fromDetail(data: IProductDetail): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.pictures?.[0]?.url, // Use first picture as thumbnail
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

  /**
   * Create Product from list item data
   */
  static fromListItem(data: IProductListItem): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currencyId,
      data.condition,
      data.thumbnail,
      undefined, // No originalPrice in list item
      undefined, // No availableQuantity in list item
      undefined, // No soldQuantity in list item
      undefined, // No permalink in list item
      undefined, // No pictures in list item
      data.installments,
      data.shipping,
      undefined, // No sellerAddress in list item
      undefined, // No attributes in list item
      undefined, // No warranty in list item
      undefined, // No description in list item
      data.reviews,
    );
  }
}
```

### 2. `domain/entities/paging.entity.ts`

```typescript
import { IPaging } from '@meli/shared-types';

/**
 * Paging domain entity
 * Encapsulates pagination logic
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
   * Convert to plain object
   */
  toObject(): IPaging {
    return {
      total: this.total,
      offset: this.offset,
      limit: this.limit,
    };
  }

  /**
   * Create from plain object
   */
  static fromObject(data: IPaging): Paging {
    return new Paging(data.total, data.offset, data.limit);
  }
}
```

### 3. `domain/entities/search-result.entity.ts`

```typescript
import { ISearchResultResponse } from '@meli/shared-types';
import { Product } from './product.entity';
import { Paging } from './paging.entity';

/**
 * SearchResult domain entity
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
   * Filter products by condition
   */
  filterByCondition(condition: string): Product[] {
    return this.products.filter((p) => p.condition === condition);
  }

  /**
   * Filter products with free shipping
   */
  filterByFreeShipping(): Product[] {
    return this.products.filter((p) => p.hasFreeShipping());
  }

  /**
   * Filter products with discount
   */
  filterByDiscount(): Product[] {
    return this.products.filter((p) => p.hasDiscount());
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
   * Convert to response format
   */
  toResponse(): ISearchResultResponse {
    return {
      query: this.query,
      results: this.products.map((p) => p.toListItem()),
      paging: this.paging.toObject(),
    };
  }

  /**
   * Create from response data
   */
  static fromResponse(data: ISearchResultResponse): SearchResult {
    const products = data.results.map((item) => Product.fromListItem(item));
    const paging = Paging.fromObject(data.paging);
    return new SearchResult(data.query, products, paging);
  }
}
```

### 4. `domain/entities/index.ts`

```typescript
export * from './product.entity';
export * from './paging.entity';
export * from './search-result.entity';
```

### 5. `domain/value-objects/product-id.vo.ts`

```typescript
import { PRODUCT_ID_PATTERN } from '@meli/shared-types';

/**
 * ProductId Value Object
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
   * Create from string
   */
  static from(id: string): ProductId {
    return new ProductId(id);
  }
}
```

### 6. `domain/value-objects/price.vo.ts`

```typescript
import { Currency } from '@meli/shared-types';

/**
 * Price Value Object
 * Encapsulates price with currency and discount logic
 */
export class Price {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency,
    public readonly originalAmount?: number,
  ) {
    this.validate();
  }

  /**
   * Validate price
   */
  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Price amount cannot be negative');
    }

    if (this.originalAmount !== undefined && this.originalAmount < 0) {
      throw new Error('Original price amount cannot be negative');
    }

    if (this.originalAmount !== undefined && this.originalAmount < this.amount) {
      throw new Error('Original price cannot be less than current price');
    }
  }

  /**
   * Check if has discount
   */
  hasDiscount(): boolean {
    return !!this.originalAmount && this.originalAmount > this.amount;
  }

  /**
   * Get discount amount
   */
  getDiscountAmount(): number {
    if (!this.hasDiscount()) return 0;
    return this.originalAmount! - this.amount;
  }

  /**
   * Get discount percentage
   */
  getDiscountPercentage(): number {
    if (!this.hasDiscount()) return 0;
    return Math.round((this.getDiscountAmount() / this.originalAmount!) * 100);
  }

  /**
   * Compare with another price (same currency)
   */
  isGreaterThan(other: Price): boolean {
    this.ensureSameCurrency(other);
    return this.amount > other.amount;
  }

  /**
   * Compare with another price (same currency)
   */
  isLessThan(other: Price): boolean {
    this.ensureSameCurrency(other);
    return this.amount < other.amount;
  }

  /**
   * Ensure same currency for comparison
   */
  private ensureSameCurrency(other: Price): void {
    if (this.currency !== other.currency) {
      throw new Error('Cannot compare prices with different currencies');
    }
  }

  /**
   * Check equality
   */
  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
```

### 7. `domain/value-objects/index.ts`

```typescript
export * from './product-id.vo';
export * from './price.vo';
```

### 8. `domain/exceptions/domain.exception.ts`

```typescript
/**
 * Base domain exception
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

### 9. `domain/exceptions/product-not-found.exception.ts`

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

### 10. `domain/exceptions/invalid-search-query.exception.ts`

```typescript
import { DomainException } from './domain.exception';

/**
 * Exception thrown when search query is invalid
 */
export class InvalidSearchQueryException extends DomainException {
  constructor(reason: string) {
    super(`Invalid search query: ${reason}`, 'INVALID_SEARCH_QUERY');
  }
}
```

### 11. `domain/exceptions/index.ts`

```typescript
export * from './domain.exception';
export * from './product-not-found.exception';
export * from './invalid-search-query.exception';
```

### 12. `domain/repositories/product.repository.interface.ts`

```typescript
import { Product } from '../entities/product.entity';
import { SearchResult } from '../entities/search-result.entity';

/**
 * Product repository interface (Port)
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
   * @throws InvalidSearchQueryException if query is invalid
   * @throws Error if search fails
   */
  search(query: string, limit: number, offset: number): Promise<SearchResult>;

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product entity
   * @throws ProductNotFoundException if product not found
   * @throws Error if retrieval fails
   */
  findById(id: string): Promise<Product>;
}

/**
 * Token for dependency injection
 */
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
```

### 13. `domain/repositories/index.ts`

```typescript
export * from './product.repository.interface';
```

### 14. `domain/use-cases/search-products/search-products.dto.ts`

```typescript
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search products input DTO
 */
export class SearchProductsDto {
  @IsString()
  query: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_LIMIT)
  @Max(PAGINATION.MAX_LIMIT)
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_OFFSET)
  offset?: number = PAGINATION.DEFAULT_OFFSET;
}
```

### 15. `domain/use-cases/search-products/search-products.usecase.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { validateSearchQuery } from '@meli/shared-types';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product.repository.interface';
import { SearchResult } from '../../entities/search-result.entity';
import { InvalidSearchQueryException } from '../../exceptions/invalid-search-query.exception';
import { SearchProductsDto } from './search-products.dto';

/**
 * Search Products Use Case
 * Business logic for searching products
 */
@Injectable()
export class SearchProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Execute search products use case
   * @param dto - Search parameters
   * @returns SearchResult with products and pagination
   * @throws InvalidSearchQueryException if query is invalid
   */
  async execute(dto: SearchProductsDto): Promise<SearchResult> {
    // Validate query
    const validation = validateSearchQuery(dto.query);
    if (!validation.valid) {
      throw new InvalidSearchQueryException(validation.error!);
    }

    // Sanitize query
    const sanitizedQuery = dto.query.trim().toLowerCase();

    // Execute search through repository
    const result = await this.productRepository.search(sanitizedQuery, dto.limit!, dto.offset!);

    return result;
  }
}
```

### 16. `domain/use-cases/search-products/index.ts`

```typescript
export * from './search-products.dto';
export * from './search-products.usecase';
```

### 17. `domain/use-cases/get-product-detail/get-product-detail.dto.ts`

```typescript
import { IsString, Matches } from 'class-validator';
import { PRODUCT_ID_PATTERN } from '@meli/shared-types';

/**
 * Get product detail input DTO
 */
export class GetProductDetailDto {
  @IsString()
  @Matches(PRODUCT_ID_PATTERN, {
    message: 'Invalid product ID format. Expected format: MLA followed by numbers',
  })
  id: string;
}
```

### 18. `domain/use-cases/get-product-detail/get-product-detail.usecase.ts`

```typescript
import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product.repository.interface';
import { Product } from '../../entities/product.entity';
import { ProductId } from '../../value-objects/product-id.vo';
import { GetProductDetailDto } from './get-product-detail.dto';

/**
 * Get Product Detail Use Case
 * Business logic for retrieving product details
 */
@Injectable()
export class GetProductDetailUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  /**
   * Execute get product detail use case
   * @param dto - Product ID
   * @returns Product entity with full details
   * @throws ProductNotFoundException if product not found
   */
  async execute(dto: GetProductDetailDto): Promise<Product> {
    // Validate product ID using value object
    const productId = ProductId.from(dto.id);

    // Retrieve product through repository
    const product = await this.productRepository.findById(productId.getValue());

    return product;
  }
}
```

### 19. `domain/use-cases/get-product-detail/index.ts`

```typescript
export * from './get-product-detail.dto';
export * from './get-product-detail.usecase';
```

### 20. `domain/use-cases/index.ts`

```typescript
export * from './search-products';
export * from './get-product-detail';
```

### 21. `domain/entities/__tests__/product.entity.spec.ts`

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
    1200, // originalPrice
    10, // availableQuantity
    5, // soldQuantity
    'http://example.com/product',
    [{ id: '1', url: 'http://example.com/pic1.jpg' }],
    { quantity: 12, amount: 100, rate: 0 },
    { freeShipping: true },
    { city: { name: 'CABA' }, state: { name: 'Buenos Aires' } },
    [{ id: 'BRAND', name: 'Marca', valueName: 'Apple' }],
    'Garantía 1 año',
    'Descripción del producto',
    { ratingAverage: 4.5, total: 100 },
  );

  describe('hasDiscount', () => {
    it('should return true when original price is higher than current price', () => {
      expect(mockProduct.hasDiscount()).toBe(true);
    });

    it('should return false when no original price', () => {
      const productNoDiscount = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
      );
      expect(productNoDiscount.hasDiscount()).toBe(false);
    });
  });

  describe('getDiscountPercentage', () => {
    it('should calculate correct discount percentage', () => {
      // (1200 - 1000) / 1200 * 100 = 16.67 -> 17
      expect(mockProduct.getDiscountPercentage()).toBe(17);
    });

    it('should return 0 when no discount', () => {
      const productNoDiscount = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
      );
      expect(productNoDiscount.getDiscountPercentage()).toBe(0);
    });
  });

  describe('hasFreeShipping', () => {
    it('should return true when shipping is free', () => {
      expect(mockProduct.hasFreeShipping()).toBe(true);
    });

    it('should return false when no shipping info', () => {
      const productNoShipping = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
      );
      expect(productNoShipping.hasFreeShipping()).toBe(false);
    });
  });

  describe('isNew', () => {
    it('should return true for new products', () => {
      expect(mockProduct.isNew()).toBe(true);
    });

    it('should return false for used products', () => {
      const usedProduct = new Product('MLA123', 'Test', 1000, Currency.ARS, ProductCondition.USED);
      expect(usedProduct.isNew()).toBe(false);
    });
  });

  describe('isAvailable', () => {
    it('should return true when available quantity > 0', () => {
      expect(mockProduct.isAvailable()).toBe(true);
    });

    it('should return false when no available quantity', () => {
      const unavailableProduct = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        undefined,
        undefined,
        0, // availableQuantity = 0
      );
      expect(unavailableProduct.isAvailable()).toBe(false);
    });
  });

  describe('hasGoodRating', () => {
    it('should return true for rating >= 4.0', () => {
      expect(mockProduct.hasGoodRating()).toBe(true);
    });

    it('should return false for rating < 4.0', () => {
      const lowRatedProduct = new Product(
        'MLA123',
        'Test',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        { ratingAverage: 3.5, total: 10 },
      );
      expect(lowRatedProduct.hasGoodRating()).toBe(false);
    });
  });

  describe('toListItem', () => {
    it('should convert to list item format', () => {
      const listItem = mockProduct.toListItem();
      expect(listItem).toEqual({
        id: 'MLA123456789',
        title: 'iPhone 13',
        price: 1000,
        currencyId: Currency.ARS,
        condition: ProductCondition.NEW,
        thumbnail: 'http://example.com/thumb.jpg',
        shipping: { freeShipping: true },
        installments: { quantity: 12, amount: 100, rate: 0 },
        reviews: { ratingAverage: 4.5, total: 100 },
      });
    });
  });

  describe('toDetail', () => {
    it('should convert to detail format', () => {
      const detail = mockProduct.toDetail();
      expect(detail.id).toBe('MLA123456789');
      expect(detail.title).toBe('iPhone 13');
      expect(detail.originalPrice).toBe(1200);
      expect(detail.attributes).toHaveLength(1);
    });
  });
});
```

### 22. `domain/use-cases/search-products/__tests__/search-products.usecase.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductsUseCase } from '../search-products.usecase';
import { SearchProductsDto } from '../search-products.dto';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../../repositories/product.repository.interface';
import { SearchResult } from '../../../entities/search-result.entity';
import { Paging } from '../../../entities/paging.entity';
import { InvalidSearchQueryException } from '../../../exceptions/invalid-search-query.exception';

describe('SearchProductsUseCase', () => {
  let useCase: SearchProductsUseCase;
  let mockRepository: jest.Mocked<IProductRepository>;

  beforeEach(async () => {
    mockRepository = {
      search: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchProductsUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<SearchProductsUseCase>(SearchProductsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should search products successfully', async () => {
      const dto: SearchProductsDto = {
        query: 'iphone',
        limit: 10,
        offset: 0,
      };

      const mockSearchResult = new SearchResult('iphone', [], new Paging(100, 0, 10));

      mockRepository.search.mockResolvedValue(mockSearchResult);

      const result = await useCase.execute(dto);

      expect(result).toBe(mockSearchResult);
      expect(mockRepository.search).toHaveBeenCalledWith('iphone', 10, 0);
    });

    it('should throw InvalidSearchQueryException for empty query', async () => {
      const dto: SearchProductsDto = {
        query: '',
        limit: 10,
        offset: 0,
      };

      await expect(useCase.execute(dto)).rejects.toThrow(InvalidSearchQueryException);
    });

    it('should sanitize query before searching', async () => {
      const dto: SearchProductsDto = {
        query: '  IPHONE  ',
        limit: 10,
        offset: 0,
      };

      const mockSearchResult = new SearchResult('iphone', [], new Paging(100, 0, 10));

      mockRepository.search.mockResolvedValue(mockSearchResult);

      await useCase.execute(dto);

      expect(mockRepository.search).toHaveBeenCalledWith('iphone', 10, 0);
    });
  });
});
```

## 🧪 Criterios de Aceptación

- [ ] Todas las entidades creadas con métodos de dominio
- [ ] Value Objects implementados con validación
- [ ] Excepciones del dominio definidas
- [ ] Interface `IProductRepository` con contratos claros
- [ ] DTOs con validaciones de `class-validator`
- [ ] Casos de uso implementados con inyección de dependencias
- [ ] Tests unitarios con cobertura >= 80%
- [ ] JSDoc completo en clases y métodos públicos
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings
- [ ] No dependencias de infraestructura en capa de dominio
- [ ] Casos de uso son testables con mocks

## 🔗 Dependencias

- **Depende de**:
  - PRP-002 (Backend - Arquitectura y Setup NestJS)
  - PRP-003 (Shared Types Package)
- **Requerido para**:
  - PRP-005 (Backend - Infraestructura y Mock Data)

## 📚 Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [NestJS - Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
- [class-validator Documentation](https://github.com/typestack/class-validator)

## 💡 Notas Adicionales

### Principios de Clean Architecture

1. **Independencia de Frameworks**: La lógica de dominio no depende de NestJS (solo usa decoradores para DI)
2. **Testabilidad**: Todo es testable con mocks
3. **Independencia de UI**: El dominio no sabe nada del HTTP
4. **Independencia de BD**: El dominio usa interfaces, no implementaciones
5. **Regla de Dependencia**: Las dependencias apuntan hacia adentro (hacia el dominio)

### Value Objects vs Entities

- **Entities**: Tienen identidad (Product tiene ID)
- **Value Objects**: Se definen por sus valores (ProductId, Price)
- Los Value Objects son inmutables

### Excepciones del Dominio

Las excepciones del dominio NO son HTTP exceptions. La capa de presentación (controllers) las convertirá en respuestas HTTP apropiadas.

### Testing Strategy

- **Unit Tests**: Para entidades, value objects y casos de uso
- **Mocks**: Para repositorios en tests de casos de uso
- **Coverage**: Mínimo 80% en capa de dominio

### Próximos Pasos

Después de este PRP, implementaremos:

1. La capa de infraestructura con `MockProductRepository`
2. La capa de presentación con controllers
3. Los módulos de NestJS para conectar todo
