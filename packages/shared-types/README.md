# @meli/shared-types

Shared TypeScript types, interfaces, enums, and utilities for the Mercado Libre monorepo.

## 📦 Installation

This package is part of the monorepo and is automatically available to all workspaces.

```typescript
import { ProductCondition, Currency, Product } from '@meli/shared-types';
```

## 📁 Structure

```
src/
├── enums/          # Enumerations (ProductCondition, Currency, etc.)
├── domain/         # Domain types (Product, Shipping, etc.)
├── api/            # API contracts (requests/responses)
├── constants/      # Constants (endpoints, validation rules, pagination)
├── utils/          # Utilities (type guards, formatters, validators)
└── index.ts        # Main export
```

## 🔧 Usage

### Enums

```typescript
import { ProductCondition, Currency, ShippingMode } from '@meli/shared-types';

const condition: ProductCondition = ProductCondition.NEW;
const currency: Currency = Currency.ARS;
```

### Domain Types

```typescript
import { Product, Shipping } from '@meli/shared-types';

const product: Product = {
  id: 'MLA123',
  title: 'iPhone 13',
  price: 1000,
  currencyId: Currency.ARS,
  condition: ProductCondition.NEW,
};
```

### API Contracts

```typescript
import { SearchProductsRequest, SearchResultResponse } from '@meli/shared-types';

const request: SearchProductsRequest = {
  q: 'iphone',
  limit: 10,
  offset: 0,
};
```

### Constants

```typescript
import { API_ENDPOINTS, PAGINATION } from '@meli/shared-types';

const searchUrl = API_ENDPOINTS.PRODUCTS.SEARCH;
const defaultLimit = PAGINATION.DEFAULT_LIMIT;
```

### Utilities

```typescript
import { formatCurrency, isValidPrice, isProductCondition } from '@meli/shared-types';

const formatted = formatCurrency(1000, Currency.ARS); // "$1.000"
const valid = isValidPrice(100); // true
const isCondition = isProductCondition('new'); // true
```

## 📝 Type Safety

All types are strictly typed and provide full IntelliSense support in VS Code and other TypeScript-aware editors.

## 🤝 Contributing

This package is shared between frontend and backend. Any changes should be coordinated to avoid breaking changes.

## 📄 License

MIT
