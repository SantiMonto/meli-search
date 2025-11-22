# Frontend - Mercado Libre Search

Aplicación frontend con Next.js 16 para búsqueda y detalle de productos de Mercado Libre.

## 🚀 Tecnologías

- **Next.js** 16 - App Router
- **React** 18.3.0
- **TypeScript** 5.3.0
- **Tailwind CSS** 3.4.0 - Estilos
- **@meli/shared-types** - Tipos compartidos del monorepo

## 📁 Arquitectura

El proyecto sigue **Arquitectura Hexagonal adaptada para frontend**:

```
src/
├── app/                 # Next.js App Router (Presentation)
│   ├── layout.tsx       # Root layout con Header
│   ├── page.tsx         # Home/Search page
│   └── items/[id]/      # Product detail page
│
├── components/          # React components
│   ├── ui/              # Base UI components (Button, Input, Card, Spinner)
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components (Header)
│
├── core/                # Domain layer (business logic)
│   ├── entities/        # Domain entities
│   ├── use-cases/       # Application use cases
│   └── repositories/    # Repository interfaces (ports)
│
├── infrastructure/      # Infrastructure layer (adapters)
│   ├── http/            # HTTP client
│   ├── repositories/    # API implementations
│   └── config/          # Configuration
│
├── hooks/               # Custom React hooks
└── lib/                 # Utilities (cn, formatCurrency, debounce)
```

## 🎨 Sistema de Diseño

### Colores Mercado Libre

- **Primary (Amarillo)**: `#FFE600`
- **Secondary (Azul)**: `#3483fa`
- **Success (Verde)**: `#00a650`
- **Error (Rojo)**: `#f23d4f`

### Componentes UI Base

- **Button**: 4 variants (primary, secondary, outline, ghost), 3 sizes, loading state
- **Input**: Con error state
- **Card**: Con ML shadows y hover effect
- **Spinner**: 3 tamaños (sm, md, lg)

## 📦 Instalación

Desde la raíz del monorepo:

```bash
npm install
```

## 🏃 Ejecución

### Desarrollo (con hot-reload)

```bash
npm run dev --workspace=apps/frontend
```

Visita: http://localhost:3000

### Producción

```bash
npm run build --workspace=apps/frontend
npm run start --workspace=apps/frontend
```

## 🔧 Variables de Entorno

Crea un archivo `.env.local` basado en `.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Unit tests
npm run test --workspace=apps/frontend

# Test watch mode
npm run test:watch --workspace=apps/frontend

# Test coverage
npm run test:coverage --workspace=apps/frontend
```

## 🔍 Linting y Type-checking

```bash
# Lint
npm run lint --workspace=apps/frontend

# Lint fix
npm run lint:fix --workspace=apps/frontend

# Type check
npm run type-check --workspace=apps/frontend

# Format with Prettier
npm run format --workspace=apps/frontend
```

## 📝 Utilidades

### `cn()` - Merge Tailwind classes

```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class')} />
```

### `formatCurrency()` - Format ARS currency

```typescript
import { formatCurrency } from '@/lib/utils';

formatCurrency(1234567); // "$1.234.567"
```

### `debounce()` - Debounce function

```typescript
import { debounce } from '@/lib/utils';

const debouncedSearch = debounce(searchFunction, 300);
```

## 🗂️ Estructura de Rutas

- `/` - Home/Search page
- `/items/:id` - Product detail page

## 📚 Próximos PRPs

- **PRP-008**: Core Domain Layer (entities, use cases, repositories)
- **PRP-009**: Infrastructure Layer (HTTP client, API repository)
- **PRP-010**: Presentation Layer Base (UI components library)
- **PRP-011**: Feature Search (search functionality)
- **PRP-012**: Feature Product Detail (product detail)
- **PRP-013**: Testing, Extras y Deploy

## 🎯 Notas de Implementación

- **App Router**: Uso de Next.js 14+ App Router con Server Components
- **Tailwind CSS**: Configurado con colores y utilidades de Mercado Libre
- **TypeScript**: Strict mode habilitado
- **Path Aliases**: `@/*` apunta a `src/*`
- **Monorepo**: Integrado con `@meli/shared-types` package
