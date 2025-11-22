# PRP-003: Shared Types Package

## 🎯 Objetivo

Crear un package compartido de tipos TypeScript, interfaces y utilidades que puedan ser utilizados tanto por el frontend como por el backend, garantizando consistencia en los contratos de datos y evitando duplicación de código.

## 📋 Contexto

El package `@meli/shared-types` actuará como una librería interna del monorepo que contiene definiciones de tipos, interfaces, enums y constantes compartidas. Esto asegura que frontend y backend siempre estén sincronizados en cuanto a la estructura de datos, reduce errores y facilita el mantenimiento.

## 🏗️ Propósito del Package

```
┌─────────────────────────────────────────────┐
│          @meli/shared-types                 │
│  ┌────────────────────────────────────┐    │
│  │  Types & Interfaces                │    │
│  │  - API Contracts                   │    │
│  │  - Domain Types                    │    │
│  │  - Common Interfaces               │    │
│  └────────────────────────────────────┘    │
│  ┌────────────────────────────────────┐    │
│  │  Enums & Constants                 │    │
│  │  - Product Conditions              │    │
│  │  - API Endpoints                   │    │
│  │  - Error Codes                     │    │
│  └────────────────────────────────────┘    │
│  ┌────────────────────────────────────┐    │
│  │  Validators & Utils                │    │
│  │  - Type Guards                     │    │
│  │  - Formatters                      │    │
│  │  - Validators                      │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
            ▲                    ▲
            │                    │
    ┌───────┴────────┐   ┌──────┴──────┐
    │    Frontend    │   │   Backend   │
    │   (Next.js)    │   │  (NestJS)   │
    └────────────────┘   └─────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
packages/shared-types/
├── src/
│   ├── api/                           # Contratos de API
│   │   ├── requests/
│   │   │   ├── search-products.interface.ts
│   │   │   └── index.ts
│   │   ├── responses/
│   │   │   ├── product.interface.ts
│   │   │   ├── search-result.interface.ts
│   │   │   ├── error.interface.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── domain/                        # Tipos de dominio
│   │   ├── product.types.ts
│   │   ├── shipping.types.ts
│   │   ├── installment.types.ts
│   │   ├── review.types.ts
│   │   ├── price.types.ts
│   │   └── index.ts
│   │
│   ├── enums/                         # Enumeraciones
│   │   ├── product-condition.enum.ts
│   │   ├── shipping-mode.enum.ts
│   │   ├── currency.enum.ts
│   │   ├── error-code.enum.ts
│   │   └── index.ts
│   │
│   ├── constants/                     # Constantes
│   │   ├── api-endpoints.ts
│   │   ├── validation-rules.ts
│   │   ├── pagination.ts
│   │   └── index.ts
│   │
│   ├── utils/                         # Utilidades
│   │   ├── type-guards.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   │
│   └── index.ts                       # Export principal
│
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Tecnologías

### Core

- **TypeScript**: ^5.3.0

### Dev Dependencies (para validación)

- **typescript**: ^5.3.0

## ✅ Tareas Específicas

### Fase 1: Setup Base

1. [ ] Actualizar package.json con metadata correcta
2. [ ] Configurar tsconfig.json
3. [ ] Crear estructura de carpetas

### Fase 2: API Contracts (Requests)

4. [ ] Crear interfaces de requests
5. [ ] Documentar con JSDoc

### Fase 3: API Contracts (Responses)

6. [ ] Crear interfaces de productos
7. [ ] Crear interfaces de resultados de búsqueda
8. [ ] Crear interfaces de errores
9. [ ] Crear interfaces auxiliares (shipping, installments, reviews)

### Fase 4: Domain Types

10. [ ] Crear tipos de dominio
11. [ ] Crear types auxiliares
12. [ ] Documentar propósito de cada tipo

### Fase 5: Enums

13. [ ] Crear enums de condición de producto
14. [ ] Crear enums de envío
15. [ ] Crear enums de moneda
16. [ ] Crear enums de códigos de error

### Fase 6: Constants

17. [ ] Definir endpoints de API
18. [ ] Definir reglas de validación
19. [ ] Definir constantes de paginación

### Fase 7: Utilities

20. [ ] Implementar type guards
21. [ ] Implementar formatters (precio, fecha, etc)
22. [ ] Implementar validators

### Fase 8: Exports & Documentation

23. [ ] Configurar exports en index.ts
24. [ ] Crear README.md del package
25. [ ] Documentar uso e integración

## 📝 Implementación Detallada

### 1. `packages/shared-types/package.json`

```json
{
  "name": "@meli/shared-types",
  "version": "1.0.0",
  "description": "Shared TypeScript types, interfaces and utilities for Mercado Libre Challenge",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "type-check": "tsc --noEmit",
    "build": "tsc"
  },
  "keywords": ["typescript", "types", "shared", "mercadolibre"],
  "author": "Tu Nombre",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

### 2. `packages/shared-types/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. `src/enums/product-condition.enum.ts`

```typescript
/**
 * Product condition enumeration
 * Represents the state of a product (new or used)
 */
export enum ProductCondition {
  NEW = 'new',
  USED = 'used',
}

/**
 * Type guard to check if a value is a valid ProductCondition
 */
export function isProductCondition(value: unknown): value is ProductCondition {
  return (
    typeof value === 'string' && Object.values(ProductCondition).includes(value as ProductCondition)
  );
}
```

### 4. `src/enums/currency.enum.ts`

```typescript
/**
 * Currency codes enumeration
 * ISO 4217 currency codes used in the application
 */
export enum Currency {
  ARS = 'ARS', // Argentine Peso
  USD = 'USD', // US Dollar
  BRL = 'BRL', // Brazilian Real
  CLP = 'CLP', // Chilean Peso
  COP = 'COP', // Colombian Peso
  MXN = 'MXN', // Mexican Peso
}

/**
 * Currency symbols mapping
 */
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  [Currency.ARS]: '$',
  [Currency.USD]: 'US$',
  [Currency.BRL]: 'R$',
  [Currency.CLP]: '$',
  [Currency.COP]: '$',
  [Currency.MXN]: '$',
};

/**
 * Type guard to check if a value is a valid Currency
 */
export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && Object.values(Currency).includes(value as Currency);
}
```

### 5. `src/enums/shipping-mode.enum.ts`

```typescript
/**
 * Shipping mode enumeration
 */
export enum ShippingMode {
  ME1 = 'me1', // Mercado Envíos 1
  ME2 = 'me2', // Mercado Envíos 2
  CUSTOM = 'custom', // Custom shipping
}

/**
 * Logistic type enumeration
 */
export enum LogisticType {
  FULFILLMENT = 'fulfillment',
  CROSS_DOCKING = 'cross_docking',
  DROP_OFF = 'drop_off',
  SELF_SERVICE = 'self_service',
}
```

### 6. `src/enums/error-code.enum.ts`

```typescript
/**
 * Application error codes
 */
export enum ErrorCode {
  // General errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',

  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_QUERY = 'INVALID_QUERY',
  INVALID_PRODUCT_ID = 'INVALID_PRODUCT_ID',
  INVALID_PAGINATION = 'INVALID_PAGINATION',

  // Business logic errors
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  SEARCH_FAILED = 'SEARCH_FAILED',
  NO_RESULTS_FOUND = 'NO_RESULTS_FOUND',

  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

/**
 * Error messages mapping
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'An internal server error occurred',
  [ErrorCode.BAD_REQUEST]: 'The request is invalid',
  [ErrorCode.UNAUTHORIZED]: 'Authentication is required',
  [ErrorCode.FORBIDDEN]: 'You do not have permission to access this resource',
  [ErrorCode.NOT_FOUND]: 'The requested resource was not found',
  [ErrorCode.VALIDATION_ERROR]: 'Validation failed',
  [ErrorCode.INVALID_QUERY]: 'The search query is invalid',
  [ErrorCode.INVALID_PRODUCT_ID]: 'The product ID format is invalid',
  [ErrorCode.INVALID_PAGINATION]: 'Invalid pagination parameters',
  [ErrorCode.PRODUCT_NOT_FOUND]: 'Product not found',
  [ErrorCode.SEARCH_FAILED]: 'Search operation failed',
  [ErrorCode.NO_RESULTS_FOUND]: 'No results found for your search',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later',
};
```

### 7. `src/enums/index.ts`

```typescript
export * from './product-condition.enum';
export * from './currency.enum';
export * from './shipping-mode.enum';
export * from './error-code.enum';
```

### 8. `src/domain/product.types.ts`

```typescript
import { ProductCondition } from '../enums/product-condition.enum';
import { Currency } from '../enums/currency.enum';

/**
 * Product ID type
 * Format: MLA followed by numbers (e.g., MLA123456789)
 */
export type ProductId = string;

/**
 * Base product information
 */
export interface IProduct {
  id: ProductId;
  title: string;
  price: number;
  currencyId: Currency;
  condition: ProductCondition;
  thumbnail?: string;
}

/**
 * Product picture
 */
export interface IProductPicture {
  id: string;
  url: string;
}

/**
 * Product attribute
 */
export interface IProductAttribute {
  id: string;
  name: string;
  valueName: string;
}

/**
 * Seller address information
 */
export interface ISellerAddress {
  city: {
    name: string;
  };
  state: {
    name: string;
  };
}
```

### 9. `src/domain/shipping.types.ts`

```typescript
import { ShippingMode, LogisticType } from '../enums/shipping-mode.enum';

/**
 * Shipping information
 */
export interface IShipping {
  freeShipping: boolean;
  mode?: ShippingMode;
  logisticType?: LogisticType;
  storePickUp?: boolean;
}
```

### 10. `src/domain/installment.types.ts`

```typescript
import { Currency } from '../enums/currency.enum';

/**
 * Installment payment information
 */
export interface IInstallment {
  quantity: number;
  amount: number;
  rate?: number;
  currencyId?: Currency;
}
```

### 11. `src/domain/review.types.ts`

```typescript
/**
 * Product review information
 */
export interface IReview {
  ratingAverage: number;
  total: number;
}
```

### 12. `src/domain/price.types.ts`

```typescript
import { Currency } from '../enums/currency.enum';

/**
 * Price information
 */
export interface IPrice {
  amount: number;
  currency: Currency;
}

/**
 * Price range for filters
 */
export interface IPriceRange {
  min: number;
  max: number;
  currency: Currency;
}
```

### 13. `src/domain/index.ts`

```typescript
export * from './product.types';
export * from './shipping.types';
export * from './installment.types';
export * from './review.types';
export * from './price.types';
```

### 14. `src/api/requests/search-products.interface.ts`

```typescript
/**
 * Search products request parameters
 */
export interface ISearchProductsRequest {
  /**
   * Search query term
   * @example "iphone"
   */
  query: string;

  /**
   * Number of results per page
   * @minimum 1
   * @maximum 50
   * @default 10
   */
  limit?: number;

  /**
   * Pagination offset
   * @minimum 0
   * @default 0
   */
  offset?: number;
}

/**
 * Validation constraints for search requests
 */
export const SEARCH_VALIDATION = {
  QUERY_MIN_LENGTH: 1,
  QUERY_MAX_LENGTH: 200,
  LIMIT_MIN: 1,
  LIMIT_MAX: 50,
  LIMIT_DEFAULT: 10,
  OFFSET_MIN: 0,
  OFFSET_DEFAULT: 0,
} as const;
```

### 15. `src/api/requests/index.ts`

```typescript
export * from './search-products.interface';
```

### 16. `src/api/responses/product.interface.ts`

```typescript
import { ProductCondition } from '../../enums/product-condition.enum';
import { Currency } from '../../enums/currency.enum';
import {
  IProductPicture,
  IProductAttribute,
  ISellerAddress,
  ProductId,
} from '../../domain/product.types';
import { IShipping } from '../../domain/shipping.types';
import { IInstallment } from '../../domain/installment.types';
import { IReview } from '../../domain/review.types';

/**
 * Product list item (summary) response
 */
export interface IProductListItem {
  id: ProductId;
  title: string;
  price: number;
  currencyId: Currency;
  condition: ProductCondition;
  thumbnail?: string;
  shipping?: IShipping;
  installments?: IInstallment;
  reviews?: IReview;
}

/**
 * Product detail (full) response
 */
export interface IProductDetail {
  id: ProductId;
  title: string;
  price: number;
  originalPrice?: number;
  currencyId: Currency;
  availableQuantity?: number;
  soldQuantity?: number;
  condition: ProductCondition;
  permalink?: string;
  pictures?: IProductPicture[];
  installments?: IInstallment;
  shipping?: IShipping;
  sellerAddress?: ISellerAddress;
  attributes?: IProductAttribute[];
  warranty?: string;
  description?: string;
  reviews?: IReview;
}
```

### 17. `src/api/responses/search-result.interface.ts`

```typescript
import { IProductListItem } from './product.interface';

/**
 * Pagination information
 */
export interface IPaging {
  total: number;
  offset: number;
  limit: number;
}

/**
 * Search results response
 */
export interface ISearchResultResponse {
  query: string;
  results: IProductListItem[];
  paging: IPaging;
}
```

### 18. `src/api/responses/error.interface.ts`

```typescript
import { ErrorCode } from '../../enums/error-code.enum';

/**
 * API error response
 */
export interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error?: string;
  code?: ErrorCode;
  details?: Record<string, unknown>;
}

/**
 * Validation error detail
 */
export interface IValidationError {
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Validation error response
 */
export interface IValidationErrorResponse extends IErrorResponse {
  code: ErrorCode.VALIDATION_ERROR;
  details: {
    errors: IValidationError[];
  };
}
```

### 19. `src/api/responses/index.ts`

```typescript
export * from './product.interface';
export * from './search-result.interface';
export * from './error.interface';
```

### 20. `src/api/index.ts`

```typescript
export * from './requests';
export * from './responses';
```

### 21. `src/constants/api-endpoints.ts`

```typescript
/**
 * API version
 */
export const API_VERSION = 'v1' as const;

/**
 * API base paths
 */
export const API_BASE_PATH = `/api/${API_VERSION}` as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  PRODUCTS: {
    SEARCH: `${API_BASE_PATH}/products/search`,
    DETAIL: (id: string) => `${API_BASE_PATH}/products/${id}`,
  },
  HEALTH: `${API_BASE_PATH}/health`,
} as const;

/**
 * Default API URL (can be overridden by environment variables)
 */
export const DEFAULT_API_URL = 'http://localhost:3001' as const;
```

### 22. `src/constants/validation-rules.ts`

```typescript
/**
 * Product ID validation
 */
export const PRODUCT_ID_PATTERN = /^MLA\d+$/;

/**
 * Search query validation
 */
export const SEARCH_QUERY = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 200,
} as const;

/**
 * Pagination limits
 */
export const PAGINATION = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 50,
  DEFAULT_LIMIT: 10,
  MIN_OFFSET: 0,
  DEFAULT_OFFSET: 0,
} as const;

/**
 * Price validation
 */
export const PRICE = {
  MIN: 0,
  MAX: Number.MAX_SAFE_INTEGER,
} as const;

/**
 * Rating validation
 */
export const RATING = {
  MIN: 0,
  MAX: 5,
} as const;
```

### 23. `src/constants/pagination.ts`

```typescript
/**
 * Default pagination values
 */
export const DEFAULT_PAGINATION = {
  LIMIT: 10,
  OFFSET: 0,
  MAX_LIMIT: 50,
} as const;

/**
 * Pagination query parameter names
 */
export const PAGINATION_PARAMS = {
  LIMIT: 'limit',
  OFFSET: 'offset',
  PAGE: 'page',
} as const;
```

### 24. `src/constants/index.ts`

```typescript
export * from './api-endpoints';
export * from './validation-rules';
export * from './pagination';
```

### 25. `src/utils/type-guards.ts`

```typescript
import { IProduct, IProductPicture } from '../domain/product.types';
import { IShipping } from '../domain/shipping.types';
import { IInstallment } from '../domain/installment.types';
import { IReview } from '../domain/review.types';
import { ISearchResultResponse } from '../api/responses/search-result.interface';
import { IProductDetail } from '../api/responses/product.interface';

/**
 * Type guard to check if an object is an IProduct
 */
export function isProduct(obj: unknown): obj is IProduct {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'price' in obj &&
    'currencyId' in obj &&
    'condition' in obj
  );
}

/**
 * Type guard to check if an object is an IShipping
 */
export function isShipping(obj: unknown): obj is IShipping {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'freeShipping' in obj &&
    typeof (obj as IShipping).freeShipping === 'boolean'
  );
}

/**
 * Type guard to check if an object is an IInstallment
 */
export function isInstallment(obj: unknown): obj is IInstallment {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'quantity' in obj &&
    'amount' in obj &&
    typeof (obj as IInstallment).quantity === 'number' &&
    typeof (obj as IInstallment).amount === 'number'
  );
}

/**
 * Type guard to check if an object is an IReview
 */
export function isReview(obj: unknown): obj is IReview {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'ratingAverage' in obj &&
    'total' in obj &&
    typeof (obj as IReview).ratingAverage === 'number' &&
    typeof (obj as IReview).total === 'number'
  );
}

/**
 * Type guard to check if an object is a search result response
 */
export function isSearchResultResponse(obj: unknown): obj is ISearchResultResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'query' in obj &&
    'results' in obj &&
    'paging' in obj &&
    Array.isArray((obj as ISearchResultResponse).results)
  );
}

/**
 * Type guard to check if an object is a product detail
 */
export function isProductDetail(obj: unknown): obj is IProductDetail {
  return isProduct(obj) && typeof obj === 'object' && obj !== null;
}

/**
 * Type guard to check if a value is a valid product ID
 */
export function isValidProductId(value: unknown): value is string {
  return typeof value === 'string' && /^MLA\d+$/.test(value);
}
```

### 26. `src/utils/formatters.ts`

```typescript
import { Currency, CURRENCY_SYMBOLS } from '../enums/currency.enum';

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const formattedAmount = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${symbol} ${formattedAmount}`;
}

/**
 * Format price with full currency (e.g., "ARS 1.234,56")
 */
export function formatPriceWithCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Format discount percentage
 */
export function formatDiscount(percentage: number): string {
  return `${percentage}% OFF`;
}

/**
 * Format rating (e.g., "4.5" or "5.0")
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Format quantity (e.g., "1.234" for thousands)
 */
export function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat('es-AR').format(quantity);
}

/**
 * Format installments (e.g., "12x $113.999")
 */
export function formatInstallments(quantity: number, amount: number, currency: Currency): string {
  const formattedAmount = formatPrice(amount, currency);
  return `${quantity}x ${formattedAmount}`;
}

/**
 * Truncate text to specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Format product condition
 */
export function formatCondition(condition: string): string {
  return condition === 'new' ? 'Nuevo' : 'Usado';
}
```

### 27. `src/utils/validators.ts`

```typescript
import {
  PRODUCT_ID_PATTERN,
  SEARCH_QUERY,
  PAGINATION,
  PRICE,
  RATING,
} from '../constants/validation-rules';

/**
 * Validate product ID format
 */
export function validateProductId(id: string): boolean {
  return PRODUCT_ID_PATTERN.test(id);
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): {
  valid: boolean;
  error?: string;
} {
  if (!query || query.trim().length === 0) {
    return { valid: false, error: 'Query cannot be empty' };
  }

  if (query.length < SEARCH_QUERY.MIN_LENGTH) {
    return {
      valid: false,
      error: `Query must be at least ${SEARCH_QUERY.MIN_LENGTH} character(s)`,
    };
  }

  if (query.length > SEARCH_QUERY.MAX_LENGTH) {
    return {
      valid: false,
      error: `Query cannot exceed ${SEARCH_QUERY.MAX_LENGTH} characters`,
    };
  }

  return { valid: true };
}

/**
 * Validate pagination limit
 */
export function validateLimit(limit: number): {
  valid: boolean;
  error?: string;
} {
  if (limit < PAGINATION.MIN_LIMIT) {
    return {
      valid: false,
      error: `Limit must be at least ${PAGINATION.MIN_LIMIT}`,
    };
  }

  if (limit > PAGINATION.MAX_LIMIT) {
    return {
      valid: false,
      error: `Limit cannot exceed ${PAGINATION.MAX_LIMIT}`,
    };
  }

  return { valid: true };
}

/**
 * Validate pagination offset
 */
export function validateOffset(offset: number): {
  valid: boolean;
  error?: string;
} {
  if (offset < PAGINATION.MIN_OFFSET) {
    return {
      valid: false,
      error: `Offset must be at least ${PAGINATION.MIN_OFFSET}`,
    };
  }

  return { valid: true };
}

/**
 * Validate price
 */
export function validatePrice(price: number): {
  valid: boolean;
  error?: string;
} {
  if (price < PRICE.MIN) {
    return { valid: false, error: 'Price cannot be negative' };
  }

  if (price > PRICE.MAX) {
    return { valid: false, error: 'Price exceeds maximum allowed value' };
  }

  return { valid: true };
}

/**
 * Validate rating
 */
export function validateRating(rating: number): {
  valid: boolean;
  error?: string;
} {
  if (rating < RATING.MIN || rating > RATING.MAX) {
    return {
      valid: false,
      error: `Rating must be between ${RATING.MIN} and ${RATING.MAX}`,
    };
  }

  return { valid: true };
}

/**
 * Sanitize search query (remove special characters, trim, etc.)
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}
```

### 28. `src/utils/index.ts`

```typescript
export * from './type-guards';
export * from './formatters';
export * from './validators';
```

### 29. `src/index.ts`

```typescript
/**
 * @meli/shared-types
 * Shared TypeScript types, interfaces, and utilities for Mercado Libre Challenge
 *
 * @packageDocumentation
 */

// API contracts
export * from './api';

// Domain types
export * from './domain';

// Enumerations
export * from './enums';

// Constants
export * from './constants';

// Utilities
export * from './utils';
```

### 30. `packages/shared-types/README.md`

```markdown
# @meli/shared-types

Shared TypeScript types, interfaces, and utilities for the Mercado Libre Challenge monorepo.

## 📦 Purpose

This package provides a centralized location for all shared type definitions, interfaces, enums, constants, and utility functions used across both frontend (Next.js) and backend (NestJS) applications.

## 🎯 Benefits

- **Type Safety**: Ensures type consistency between frontend and backend
- **Single Source of Truth**: Prevents duplication and drift of type definitions
- **Better DX**: Autocomplete and IntelliSense support across the monorepo
- **Easier Refactoring**: Changes to types are reflected everywhere
- **Reduced Bugs**: Compile-time type checking catches errors early

## 📁 Structure
```

src/
├── api/ # API request/response contracts
├── domain/ # Domain entity types
├── enums/ # Enumerations
├── constants/ # Shared constants
└── utils/ # Type guards, validators, formatters

````

## 🚀 Usage

### In Backend (NestJS)

```typescript
import {
  ISearchProductsRequest,
  ISearchResultResponse,
  IProductDetail,
  ErrorCode,
  validateSearchQuery,
} from '@meli/shared-types';

// Use in DTOs
export class SearchProductsDto implements ISearchProductsRequest {
  query: string;
  limit?: number;
  offset?: number;
}

// Use in services
async searchProducts(dto: ISearchProductsRequest): Promise<ISearchResultResponse> {
  const validation = validateSearchQuery(dto.query);
  if (!validation.valid) {
    throw new BadRequestException(validation.error);
  }
  // ...
}
````

### In Frontend (Next.js)

```typescript
import {
  IProductListItem,
  IProductDetail,
  formatPrice,
  formatInstallments,
  Currency,
} from '@meli/shared-types';

// Use in components
interface ProductCardProps {
  product: IProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{formatPrice(product.price, product.currencyId)}</p>
      {product.installments && (
        <p>
          {formatInstallments(
            product.installments.quantity,
            product.installments.amount,
            product.currencyId
          )}
        </p>
      )}
    </div>
  );
}
```

## 📚 Main Exports

### API Contracts

- `ISearchProductsRequest` - Search request parameters
- `ISearchResultResponse` - Search results response
- `IProductListItem` - Product summary for lists
- `IProductDetail` - Full product details
- `IErrorResponse` - Error response structure

### Domain Types

- `ProductId` - Product identifier type
- `IProduct` - Base product interface
- `IShipping` - Shipping information
- `IInstallment` - Installment payment info
- `IReview` - Product reviews

### Enums

- `ProductCondition` - NEW | USED
- `Currency` - ARS | USD | BRL | etc.
- `ShippingMode` - ME1 | ME2 | CUSTOM
- `ErrorCode` - Application error codes

### Constants

- `API_ENDPOINTS` - API route definitions
- `PAGINATION` - Pagination limits and defaults
- `PRODUCT_ID_PATTERN` - Product ID regex

### Utilities

- `formatPrice()` - Format currency
- `formatInstallments()` - Format payment info
- `validateSearchQuery()` - Validate search input
- `validateProductId()` - Validate product ID
- `isProduct()` - Type guard for products

## 🔧 Development

```bash
# Type check
npm run type-check

# Build
npm run build
```

## 📝 Adding New Types

1. Create the type/interface in the appropriate directory
2. Export it from the directory's `index.ts`
3. Ensure it's re-exported from `src/index.ts`
4. Add JSDoc comments for documentation
5. Run `npm run type-check` to verify

## 🤝 Contributing

When adding new types:

- Use clear, descriptive names with `I` prefix for interfaces
- Add JSDoc comments explaining the purpose
- Include examples in comments when helpful
- Create type guards for runtime validation when needed
- Add formatters/validators if the type requires special handling

## 📄 License

MIT

```

## 🧪 Criterios de Aceptación

- [ ] Package.json configurado correctamente con metadata
- [ ] tsconfig.json extendiendo del base del monorepo
- [ ] Estructura de carpetas completa creada
- [ ] Todos los enums definidos con type guards
- [ ] Todas las interfaces de dominio creadas
- [ ] Contratos de API (requests y responses) definidos
- [ ] Constantes de validación y endpoints configuradas
- [ ] Type guards implementados para validación en runtime
- [ ] Formatters implementados para presentación de datos
- [ ] Validators implementados para validación de entrada
- [ ] Exports correctamente configurados en todos los index.ts
- [ ] README.md completo con ejemplos de uso
- [ ] TypeScript compila sin errores (`npm run type-check`)
- [ ] Documentación JSDoc en todas las interfaces y funciones públicas
- [ ] Package puede ser importado desde apps/frontend y apps/backend

## 🔗 Dependencias

- **Depende de**: PRP-001 (Setup del Monorepo)
- **Requerido para**:
  - PRP-004 (Backend - Domain Layer)
  - PRP-007 (Frontend - Core Domain Layer)

## 📚 Referencias

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [Monorepo Best Practices](https://monorepo.tools/)
- [API de Mercado Libre - Documentación](https://developers.mercadolibre.com.ar/es_ar/api-docs-es)

## 💡 Notas Adicionales

### Convenciones de Nombres

- **Interfaces**: Prefijo `I` (e.g., `IProduct`, `ISearchRequest`)
- **Types**: Sin prefijo (e.g., `ProductId`, `Currency`)
- **Enums**: PascalCase (e.g., `ProductCondition`, `ErrorCode`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_VERSION`, `DEFAULT_PAGINATION`)
- **Functions**: camelCase (e.g., `formatPrice`, `validateQuery`)

### Type Guards vs Validators

- **Type Guards** (`is*`): Para narrowing de tipos en TypeScript (compile-time + runtime)
- **Validators** (`validate*`): Para validación de negocio con mensajes de error (runtime)

### Formatters

Los formatters usan `Intl.NumberFormat` con locale `es-AR` para mantener consistencia con el mercado argentino de Mercado Libre.

### Extensibilidad

Este package está diseñado para crecer. Cuando agregues nuevos features:
1. Crea nuevos archivos en las carpetas apropiadas
2. Exporta desde el `index.ts` de la carpeta
3. Asegúrate de que se re-exporte desde `src/index.ts`
4. Actualiza el README con ejemplos si es relevante
```
