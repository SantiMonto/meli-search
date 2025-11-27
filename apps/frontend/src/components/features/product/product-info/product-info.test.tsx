import { render, screen } from '@testing-library/react';
import { Product } from '@/core/entities/product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => '/products/MLA123'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('@/core/contexts/auth.context', () => ({
  useAuth: jest.fn(() => ({
    isAuthenticated: false,
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/core/contexts/cart.context', () => ({
  useCart: jest.fn(() => ({
    items: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    totalItems: 0,
  })),
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Ahora SÍ importa el componente (después de los mocks)
import { ProductInfo } from './product-info';

describe('ProductInfo', () => {
  const mockProduct = new Product(
    'MLA123',
    'Test Product',
    1000,
    Currency.ARS,
    ProductCondition.NEW,
    'http://example.com/img.jpg',
    1200,
    10,
    5,
    'http://permalink',
    [],
    undefined,
    { freeShipping: true } as {
      freeShipping: boolean;
      mode?: string;
      logisticType?: string;
      storePickUp?: boolean;
    },
    undefined,
    [],
    undefined,
    'Description',
    undefined,
  );

  it('renders product title', () => {
    render(<ProductInfo product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders condition and sold quantity', () => {
    render(<ProductInfo product={mockProduct} />);
    expect(screen.getByText(/Nuevo/)).toBeInTheDocument();
    expect(screen.getByText(/5 vendidos/)).toBeInTheDocument();
  });

  it('renders free shipping badge', () => {
    render(<ProductInfo product={mockProduct} />);
    expect(screen.getByText('Envío gratis')).toBeInTheDocument();
  });
});
