# PRP-010: Frontend - Presentation Layer Base

## 🎯 Objetivo

Implementar la capa de presentación base del frontend con todos los componentes UI reutilizables, componentes de layout, y estados de carga. Esta capa incluirá el sistema de diseño completo basado en Mercado Libre, componentes atómicos (Button, Input, Card, etc.), y componentes de layout (Header, Footer, Container).

## 📋 Contexto

La capa de presentación base proporciona los bloques de construcción fundamentales para la UI. Estos componentes son agnósticos del dominio y pueden ser reutilizados en toda la aplicación. Seguiremos los principios de Atomic Design y el design system de Mercado Libre.

## 🏗️ Arquitectura - Presentation Layer

```
┌─────────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (Base)                      │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │         UI Components (Atoms)                  │        │
│  │  - Button                                      │        │
│  │  - Input                                       │        │
│  │  - Card                                        │        │
│  │  - Badge                                       │        │
│  │  - Spinner                                     │        │
│  │  - Rating                                      │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Loading States (Skeletons)             │        │
│  │  - ProductCardSkeleton                         │        │
│  │  - ProductDetailSkeleton                       │        │
│  │  - SearchResultsSkeleton                       │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Layout Components                      │        │
│  │  - Header                                      │        │
│  │  - Footer                                      │        │
│  │  - Container                                   │        │
│  │  - SearchBar (layout)                          │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/frontend/src/components/
├── ui/                                # UI Components (Atoms)
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   └── index.ts
│   ├── input/
│   │   ├── input.tsx
│   │   ├── input.test.tsx
│   │   └── index.ts
│   ├── card/
│   │   ├── card.tsx
│   │   ├── card.test.tsx
│   │   └── index.ts
│   ├── badge/
│   │   ├── badge.tsx
│   │   ├── badge.test.tsx
│   │   └── index.ts
│   ├── spinner/
│   │   ├── spinner.tsx
│   │   ├── spinner.test.tsx
│   │   └── index.ts
│   ├── rating/
│   │   ├── rating.tsx
│   │   ├── rating.test.tsx
│   │   └── index.ts
│   └── index.ts
│
├── skeletons/                         # Loading skeletons
│   ├── product-card-skeleton.tsx
│   ├── product-detail-skeleton.tsx
│   ├── search-results-skeleton.tsx
│   └── index.ts
│
└── layout/                            # Layout components
    ├── header/
    │   ├── header.tsx
    │   ├── header.test.tsx
    │   └── index.ts
    ├── footer/
    │   ├── footer.tsx
    │   └── index.ts
    ├── container/
    │   ├── container.tsx
    │   └── index.ts
    └── index.ts
```

## 🔧 Tecnologías

### Core

- **React**: ^18.3.0
- **TypeScript**: ^5.3.0
- **Tailwind CSS**: ^3.4.0
- **clsx**: ^2.1.0
- **tailwind-merge**: ^2.2.0

### Icons

- **lucide-react**: ^0.344.0 (iconos modernos)

### Testing

- **@testing-library/react**: ^14.2.0
- **@testing-library/user-event**: ^14.5.0
- **jest**: ^29.7.0

## ✅ Tareas Específicas

### Fase 1: UI Components - Button

1. [ ] Crear componente Button con variantes
2. [ ] Agregar estados (loading, disabled)
3. [ ] Agregar tamaños (sm, md, lg)
4. [ ] Tests del Button

### Fase 2: UI Components - Input

5. [ ] Crear componente Input
6. [ ] Agregar variantes (default, error)
7. [ ] Agregar iconos (left, right)
8. [ ] Tests del Input

### Fase 3: UI Components - Card

9. [ ] Crear componente Card
10. [ ] Agregar variantes (default, hover)
11. [ ] Agregar sombras de ML
12. [ ] Tests del Card

### Fase 4: UI Components - Badge

13. [ ] Crear componente Badge
14. [ ] Agregar variantes (success, warning, info)
15. [ ] Tests del Badge

### Fase 5: UI Components - Spinner & Rating

16. [ ] Crear componente Spinner
17. [ ] Crear componente Rating (estrellas)
18. [ ] Tests de ambos componentes

### Fase 6: Skeletons

19. [ ] Crear ProductCardSkeleton
20. [ ] Crear ProductDetailSkeleton
21. [ ] Crear SearchResultsSkeleton

### Fase 7: Layout - Header

22. [ ] Crear componente Header
23. [ ] Agregar logo de ML
24. [ ] Agregar barra de búsqueda (placeholder)
25. [ ] Tests del Header

### Fase 8: Layout - Footer & Container

26. [ ] Crear componente Footer
27. [ ] Crear componente Container
28. [ ] Tests de layout components

### Fase 9: Documentación

29. [ ] JSDoc en todos los componentes
30. [ ] Crear Storybook stories (opcional)

## 📝 Implementación Detallada

### 1. `components/ui/button/button.tsx`

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-ml font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary:
        'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
      outline:
        'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 active:bg-secondary-100',
      ghost: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700',
      link: 'text-secondary-500 underline-offset-4 hover:underline',
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
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
```

### 2. `components/ui/input/input.tsx`

```typescript
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Input Component
 * Reusable input field with icons and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'h-10 rounded-ml border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 disabled:cursor-not-allowed disabled:opacity-50';

    const errorStyles = error
      ? 'border-error-500 focus-visible:ring-error-500'
      : 'border-gray-300';

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            baseStyles,
            errorStyles,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            fullWidth && 'w-full',
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}

        {error && errorMessage && (
          <p className="mt-1 text-sm text-error-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
```

### 3. `components/ui/card/card.tsx`

```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Component
 * Container with Mercado Libre shadow styles
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-ml shadow-ml-card';

    const hoverStyles = hoverable
      ? 'transition-shadow hover:shadow-ml-card-hover cursor-pointer'
      : '';

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          hoverStyles,
          paddingStyles[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

/**
 * Card Header
 */
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/**
 * Card Title
 */
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/**
 * Card Content
 */
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';
```

### 4. `components/ui/badge/badge.tsx`

```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

/**
 * Badge Component
 * Small status indicator or label
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center rounded-full font-medium transition-colors';

    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-success-500/10 text-success-500',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-error-500/10 text-error-500',
      info: 'bg-secondary-500/10 text-secondary-500',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
```

### 5. `components/ui/spinner/spinner.tsx`

```typescript
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Spinner Component
 * Loading indicator
 */
export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <Loader2 className={cn('animate-spin text-secondary-500', sizes[size])} />
    </div>
  );
}
```

### 6. `components/ui/rating/rating.tsx`

```typescript
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

/**
 * Rating Component
 * Star rating display
 */
export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className,
  ...props
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <Star
              key={index}
              className={cn(
                sizes[size],
                isFilled || isHalf
                  ? 'fill-primary-500 text-primary-500'
                  : 'text-gray-300',
              )}
            />
          );
        })}
      </div>

      {showValue && (
        <span className={cn('font-medium text-gray-700', textSizes[size])}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
```

### 7. `components/skeletons/product-card-skeleton.tsx`

```typescript
import { Card } from '../ui/card';

/**
 * Product Card Skeleton
 * Loading placeholder for product cards
 */
export function ProductCardSkeleton() {
  return (
    <Card hoverable padding="md">
      <div className="flex gap-4">
        {/* Image skeleton */}
        <div className="h-32 w-32 flex-shrink-0 animate-pulse rounded-ml bg-gray-200" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

          {/* Price */}
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />

          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### 8. `components/skeletons/product-detail-skeleton.tsx`

```typescript
/**
 * Product Detail Skeleton
 * Loading placeholder for product detail page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Images skeleton */}
      <div className="space-y-4">
        <div className="aspect-square w-full animate-pulse rounded-ml bg-gray-200" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-ml bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Info skeleton */}
      <div className="space-y-6">
        {/* Condition */}
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

        {/* Price */}
        <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Installments */}
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

        {/* Shipping */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Button */}
        <div className="h-12 w-full animate-pulse rounded-ml bg-gray-200" />

        {/* Attributes */}
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 9. `components/skeletons/search-results-skeleton.tsx`

```typescript
import { ProductCardSkeleton } from './product-card-skeleton';

/**
 * Search Results Skeleton
 * Loading placeholder for search results list
 */
export function SearchResultsSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
```

### 10. `components/layout/header/header.tsx`

```typescript
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from '../container';

/**
 * Header Component
 * Main navigation header with logo and search bar
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-500 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">
              Mercado Libre
            </div>
          </Link>

          {/* Search bar placeholder - will be replaced with actual SearchBox */}
          <div className="flex flex-1 max-w-2xl items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="h-10 w-full rounded-ml border-0 bg-white pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
                disabled
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
```

### 11. `components/layout/footer/footer.tsx`

```typescript
import { Container } from '../container';

/**
 * Footer Component
 * Site footer with links and copyright
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-white">
      <Container>
        <div className="py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* About */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">
                Acerca de
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Sobre Mercado Libre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Investor relations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Tendencias
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">
                Ayuda
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Comprar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Vender
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Resolución de problemas
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">
                Redes sociales
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>
              © {currentYear} Mercado Libre. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

### 12. `components/layout/container/container.tsx`

```typescript
import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Container Component
 * Responsive container with max-width
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[1200px]',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';
```

### 13. `components/ui/button/__tests__/button.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-500');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
  });
});
```

### 14. `app/layout.tsx` (Updated with Header and Footer)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/infrastructure/providers/query-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
      <body className="flex min-h-screen flex-col bg-gray-100 font-sans antialiased">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 15. `components/ui/index.ts`

```typescript
export * from './button';
export * from './input';
export * from './card';
export * from './badge';
export * from './spinner';
export * from './rating';
```

### 16. `components/skeletons/index.ts`

```typescript
export * from './product-card-skeleton';
export * from './product-detail-skeleton';
export * from './search-results-skeleton';
```

### 17. `components/layout/index.ts`

```typescript
export * from './header';
export * from './footer';
export * from './container';
```

## 🧪 Criterios de Aceptación

- [ ] Button component con 5 variantes funcionando
- [ ] Input component con iconos y error states
- [ ] Card component con hover effect
- [ ] Badge component con 5 variantes
- [ ] Spinner component animado
- [ ] Rating component con estrellas
- [ ] ProductCardSkeleton con animación pulse
- [ ] ProductDetailSkeleton completo
- [ ] SearchResultsSkeleton con cantidad configurable
- [ ] Header con logo y search bar placeholder
- [ ] Footer con links y copyright
- [ ] Container con tamaños responsive
- [ ] Tests de Button >= 80% coverage
- [ ] Tests de Input >= 80% coverage
- [ ] Tests de Card >= 80% coverage
- [ ] Todos los componentes con TypeScript strict
- [ ] Todos los componentes con forwardRef
- [ ] JSDoc en todos los componentes
- [ ] Linter sin warnings
- [ ] Componentes responsive

## 🔗 Dependencias

- **Depende de**:
  - PRP-007 (Frontend - Arquitectura y Setup Next.js)
- **Requerido para**:
  - PRP-011 (Frontend - Feature: Search)
  - PRP-012 (Frontend - Feature: Product Detail)

## 📚 Referencias

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React forwardRef](https://react.dev/reference/react/forwardRef)
- [Mercado Libre Design System](https://ux.mercadolibre.com/)

## 💡 Notas Adicionales

### Atomic Design

Seguimos Atomic Design:

- **Atoms**: Button, Input, Badge, Spinner, Rating
- **Molecules**: Card (con Header, Title, Content)
- **Organisms**: Header, Footer (próximos PRPs: SearchBox, ProductCard)

### forwardRef

Todos los componentes usan `forwardRef` para:

- Permitir acceso al DOM element
- Compatibilidad con librerías de terceros
- Mejor composición de componentes

### Tailwind Merge

Usamos `tailwind-merge` con `clsx` para:

- Merge de clases conflictivas
- Clases condicionales
- Override de estilos

### Skeletons

Los skeletons usan:

- `animate-pulse` de Tailwind
- Misma estructura que componentes reales
- Mejoran perceived performance

### Accessibility

Consideraciones de accesibilidad:

- Roles ARIA apropiados
- Focus states visibles
- Keyboard navigation
- Color contrast (WCAG AA)

### Responsive Design

Todos los componentes son responsive:

- Mobile-first approach
- Breakpoints de Tailwind (sm, md, lg, xl)
- Container con padding responsive

### Próximos Pasos

Después de este PRP:

1. Crear hooks personalizados (useSearch, useProductDetail)
2. Implementar SearchBox component (feature)
3. Implementar ProductCard component (feature)
4. Implementar ProductList component (feature)
5. Integrar todo en las páginas
