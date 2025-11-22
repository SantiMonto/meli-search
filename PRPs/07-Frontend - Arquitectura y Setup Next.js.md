# PRP-007: Frontend - Arquitectura y Setup Next.js

## 🎯 Objetivo

Configurar la aplicación frontend con Next.js 14+ (App Router), TypeScript, Tailwind CSS, y establecer la arquitectura hexagonal adaptada para frontend. Este PRP establece las bases del proyecto frontend con todas las herramientas, configuraciones y estructura de carpetas necesarias.

## 📋 Contexto

El frontend será una aplicación Next.js que consume la API del backend. Seguirá una arquitectura hexagonal adaptada para frontend, separando la lógica de negocio de la UI y la infraestructura. Usaremos App Router de Next.js 14+, React Server Components, y Tailwind CSS para estilos.

## 🏗️ Arquitectura Hexagonal - Frontend

```
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                        │
│              (UI Components & Pages)                        │
│                                                             │
│  app/                                                       │
│  ├── page.tsx              (Home/Search)                   │
│  ├── items/[id]/page.tsx   (Product Detail)               │
│  └── layout.tsx                                            │
│                                                             │
│  components/                                                │
│  ├── features/             (Feature components)            │
│  └── ui/                   (Reusable UI)                   │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    DOMAIN LAYER                             │
│                 (Business Logic)                            │
│                                                             │
│  core/                                                      │
│  ├── entities/             (Domain models)                 │
│  ├── use-cases/            (Application logic)             │
│  └── repositories/         (Interfaces/Ports)              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                INFRASTRUCTURE LAYER                         │
│                    (Adapters)                               │
│                                                             │
│  infrastructure/                                            │
│  ├── http/                (HTTP Client)                    │
│  ├── repositories/         (API implementations)           │
│  └── config/               (Configuration)                 │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/frontend/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page (search)
│   │   ├── items/
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Product detail page
│   │   ├── globals.css                # Global styles
│   │   └── error.tsx                  # Error boundary
│   │
│   ├── components/                    # React components
│   │   ├── features/                  # Feature-specific components
│   │   │   ├── search/
│   │   │   └── product/
│   │   ├── ui/                        # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── card/
│   │   │   └── spinner/
│   │   └── layout/                    # Layout components
│   │       ├── header/
│   │       └── footer/
│   │
│   ├── core/                          # Domain layer
│   │   ├── entities/
│   │   ├── use-cases/
│   │   └── repositories/
│   │
│   ├── infrastructure/                # Infrastructure layer
│   │   ├── http/
│   │   ├── repositories/
│   │   └── config/
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── use-search.ts
│   │   └── use-product-detail.ts
│   │
│   ├── lib/                           # Utilities
│   │   ├── utils.ts
│   │   └── cn.ts                      # classnames utility
│   │
│   └── types/                         # Additional types
│       └── index.ts
│
├── public/                            # Static assets
│   ├── images/
│   └── favicon.ico
│
├── .env.local.example                 # Environment variables example
├── .env.local                         # Local environment variables
├── next.config.js                     # Next.js configuration
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── postcss.config.js                  # PostCSS configuration
├── .eslintrc.json                     # ESLint configuration
├── .prettierrc                        # Prettier configuration
└── package.json
```

## 🔧 Tecnologías

### Core

- **Next.js**: ^14.2.0 (App Router)
- **React**: ^18.3.0
- **TypeScript**: ^5.3.0
- **@meli/shared-types**: workspace:\* (monorepo package)

### Styling

- **Tailwind CSS**: ^3.4.0
- **PostCSS**: ^8.4.0
- **Autoprefixer**: ^10.4.0
- **clsx**: ^2.1.0 (conditional classes)
- **tailwind-merge**: ^2.2.0 (merge Tailwind classes)

### State Management & Data Fetching

- **React Context**: Built-in (for simple state)
- **SWR** o **TanStack Query**: ^5.0.0 (data fetching & caching)

### Forms & Validation

- **React Hook Form**: ^7.50.0
- **Zod**: ^3.22.0 (schema validation)

### Dev Tools

- **ESLint**: ^8.56.0
- **Prettier**: ^3.2.0
- **@types/react**: ^18.3.0
- **@types/node**: ^20.11.0

### Testing

- **Jest**: ^29.7.0
- **@testing-library/react**: ^14.2.0
- **@testing-library/jest-dom**: ^6.4.0
- **@testing-library/user-event**: ^14.5.0

## ✅ Tareas Específicas

### Fase 1: Inicialización del Proyecto

1. [ ] Crear proyecto Next.js con TypeScript
2. [ ] Configurar App Router
3. [ ] Instalar dependencias base

### Fase 2: Configuración de Herramientas

4. [ ] Configurar Tailwind CSS
5. [ ] Configurar ESLint y Prettier
6. [ ] Configurar path aliases (@/)
7. [ ] Configurar variables de entorno

### Fase 3: Estructura Base

8. [ ] Crear estructura de carpetas
9. [ ] Configurar layout raíz
10. [ ] Crear página principal (placeholder)
11. [ ] Crear página de detalle (placeholder)

### Fase 4: Sistema de Diseño Base

12. [ ] Configurar tema de Tailwind (colores, fonts)
13. [ ] Crear utilidades CSS globales
14. [ ] Crear componentes UI base (Button, Input, Card, Spinner)
15. [ ] Crear componentes de layout (Header, Footer)

### Fase 5: Configuración de Testing

16. [ ] Configurar Jest
17. [ ] Configurar React Testing Library
18. [ ] Crear setup de tests
19. [ ] Crear tests de ejemplo

### Fase 6: Configuración de Next.js

20. [ ] Configurar next.config.js (images, env, etc.)
21. [ ] Configurar metadata y SEO base
22. [ ] Configurar fonts (Google Fonts)
23. [ ] Configurar error boundaries

### Fase 7: Documentación

24. [ ] Crear README.md del frontend
25. [ ] Documentar scripts disponibles
26. [ ] Documentar estructura de carpetas
27. [ ] Crear guía de estilos

## 📝 Implementación Detallada

### 1. Inicialización del Proyecto

```bash
# Desde la raíz del monorepo
cd apps
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir --import-alias "@/*"

# Responder a las preguntas:
# ✔ Would you like to use TypeScript? Yes
# ✔ Would you like to use ESLint? Yes
# ✔ Would you like to use Tailwind CSS? Yes
# ✔ Would you like to use `src/` directory? Yes
# ✔ Would you like to use App Router? Yes
# ✔ Would you like to customize the default import alias? Yes (@/*)
```

### 2. `apps/frontend/package.json`

```json
{
  "name": "@meli/frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@meli/shared-types": "workspace:*",
    "@tanstack/react-query": "^5.28.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.4",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/user-event": "^14.5.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@types/jest": "^29.5.0"
  }
}
```

### 3. `apps/frontend/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mercado Libre brand colors
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#FFE600', // ML Yellow
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3483fa', // ML Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          500: '#00a650', // ML Green
        },
        error: {
          500: '#f23d4f', // ML Red
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'ml-card': '0 1px 2px 0 rgba(0,0,0,.18)',
        'ml-card-hover': '0 2px 8px 0 rgba(0,0,0,.18)',
      },
      borderRadius: {
        ml: '6px',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4. `apps/frontend/next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: [
      'http2.mlstatic.com',
      'http1.mlstatic.com',
      'mla-s1-p.mlstatic.com',
      'mla-s2-p.mlstatic.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['@meli/shared-types'],
  },

  // Transpile packages from monorepo
  transpilePackages: ['@meli/shared-types'],
};

module.exports = nextConfig;
```

### 5. `apps/frontend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@meli/shared-types": ["../../packages/shared-types/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 6. `apps/frontend/.eslintrc.json`

```json
{
  "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 7. `apps/frontend/.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 8. `apps/frontend/.env.local.example`

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

### 9. `apps/frontend/src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### 10. `apps/frontend/src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mercado Libre - Busca productos',
  description: 'Encuentra los mejores productos en Mercado Libre',
  keywords: ['mercado libre', 'productos', 'compras', 'ecommerce'],
  authors: [{ name: 'Tu Nombre' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FFE600',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-gray-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 11. `apps/frontend/src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  /* Custom scrollbar */
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .scrollbar-thin::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-full;
  }

  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400;
  }

  /* Text truncate utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

### 12. `apps/frontend/src/app/page.tsx`

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar productos - Mercado Libre',
  description: 'Busca y encuentra los mejores productos',
};

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Bienvenido a Mercado Libre
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Busca productos y encuentra las mejores ofertas
      </p>
      {/* Search component will go here */}
    </main>
  );
}
```

### 13. `apps/frontend/src/app/items/[id]/page.tsx`

```typescript
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Producto ${params.id} - Mercado Libre`,
    description: 'Detalle del producto',
  };
}

export default function ProductDetailPage({ params }: Props) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Detalle del Producto
      </h1>
      <p className="mt-2 text-gray-600">ID: {params.id}</p>
      {/* Product detail component will go here */}
    </main>
  );
}
```

### 14. `apps/frontend/src/app/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          ¡Algo salió mal!
        </h2>
        <p className="mt-2 text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
```

### 15. `apps/frontend/src/components/ui/button/button.tsx`

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-ml font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary: 'bg-secondary-500 text-white hover:bg-secondary-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline:
        'border border-gray-300 bg-transparent hover:bg-gray-100',
      ghost: 'hover:bg-gray-100',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
```

### 16. `apps/frontend/jest.config.js`

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@meli/shared-types$': '<rootDir>/../../packages/shared-types/src',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### 17. `apps/frontend/jest.setup.js`

```javascript
import '@testing-library/jest-dom';
```

### 18. `apps/frontend/README.md`

````markdown
# Mercado Libre Challenge - Frontend

Frontend application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
```
````

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router (pages & layouts)
├── components/       # React components
│   ├── features/     # Feature-specific components
│   ├── ui/           # Reusable UI components
│   └── layout/       # Layout components
├── core/             # Domain layer (business logic)
├── infrastructure/   # Infrastructure layer (API, config)
├── hooks/            # Custom React hooks
└── lib/              # Utilities
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Styling

This project uses Tailwind CSS with a custom configuration based on Mercado Libre's design system.

### Colors

- Primary (Yellow): `#FFE600`
- Secondary (Blue): `#3483fa`
- Success (Green): `#00a650`
- Error (Red): `#f23d4f`

### Utilities

- `cn()`: Merge Tailwind classes with conditional logic
- Custom scrollbar styles
- Line clamp utilities

## 📝 Scripts

- `dev`: Start development server
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint
- `lint:fix`: Fix ESLint errors
- `format`: Format code with Prettier
- `type-check`: Run TypeScript type checking
- `test`: Run tests
- `test:watch`: Run tests in watch mode
- `test:coverage`: Generate coverage report

## 🏗️ Architecture

This project follows a hexagonal architecture adapted for frontend:

- **Presentation Layer**: UI components and pages
- **Domain Layer**: Business logic and use cases
- **Infrastructure Layer**: API clients and external services

## 🔗 Related Packages

- `@meli/shared-types`: Shared TypeScript types with backend

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

```

## 🧪 Criterios de Aceptación

- [ ] Proyecto Next.js 14+ creado con TypeScript
- [ ] App Router configurado
- [ ] Tailwind CSS instalado y configurado
- [ ] ESLint y Prettier configurados
- [ ] Path aliases (@/) funcionando
- [ ] Variables de entorno configuradas
- [ ] Estructura de carpetas creada
- [ ] Layout raíz con metadata SEO
- [ ] Página principal creada (placeholder)
- [ ] Página de detalle creada (placeholder)
- [ ] Error boundary configurado
- [ ] Tema de Tailwind personalizado (colores ML)
- [ ] Fuentes de Google configuradas
- [ ] Componente Button creado y testeado
- [ ] Utilidades (cn, formatCurrency) creadas
- [ ] Jest configurado
- [ ] React Testing Library configurada
- [ ] next.config.js con optimizaciones
- [ ] README.md completo
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings
- [ ] npm run dev funciona correctamente

## 🔗 Dependencias

- **Depende de**:
  - PRP-001 (Setup del Monorepo)
  - PRP-003 (Shared Types Package)
- **Requerido para**:
  - PRP-008 (Frontend - Core Domain Layer)

## 📚 Referencias

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/react)
- [Mercado Libre Design System](https://ux.mercadolibre.com/)

## 💡 Notas Adicionales

### App Router vs Pages Router

Este proyecto usa **App Router** (Next.js 13+) que ofrece:
- React Server Components por defecto
- Layouts anidados
- Streaming y Suspense
- Mejor performance

### Tailwind CSS Personalización

Los colores están basados en el design system de Mercado Libre:
- Amarillo (#FFE600) como color primario
- Azul (#3483fa) como secundario
- Verde y rojo para success/error

### Monorepo Integration

El frontend importa `@meli/shared-types` del monorepo para compartir tipos con el backend.

### SEO y Metadata

Cada página tiene metadata configurada para SEO:
- Títulos descriptivos
- Descripciones
- Keywords
- Open Graph (futuro)

### Performance

Configuraciones de performance:
- Image optimization con Next.js Image
- Font optimization con next/font
- Transpilación de packages del monorepo

### Testing Strategy

- **Unit Tests**: Componentes UI
- **Integration Tests**: Features completos
- **E2E Tests**: Flujos de usuario (futuro con Playwright)

### Próximos Pasos

Después de este PRP:
1. Implementar la capa de dominio (entities, use cases)
2. Implementar la capa de infraestructura (HTTP client, repositories)
3. Crear componentes de features (search, product detail)
4. Integrar con el backend
```
