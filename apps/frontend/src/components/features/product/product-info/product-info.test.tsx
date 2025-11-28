import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from '@/core/entities/product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';
import { ProductInfo } from './product-info';

// --- Mocks Setup ---

// 1. Mock Next.js Navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/products/MLA123',
  useSearchParams: () => new URLSearchParams(),
}));

// 2. Mock Auth Context
const mockUseAuth = jest.fn();
jest.mock('@/core/contexts/auth.context', () => ({
  useAuth: () => mockUseAuth(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// 3. Mock Cart Context
const mockAddToCart = jest.fn();
jest.mock('@/core/contexts/cart.context', () => ({
  useCart: () => ({
    items: [],
    addToCart: mockAddToCart,
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    totalItems: 0,
  }),
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// 4. Mock Custom Hooks
jest.mock('@/hooks/use-product-auto-cart', () => ({
  useProductAutoCart: jest.fn(),
}));

describe('ProductInfo', () => {
  // Setup default mock return values
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });
  });

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
    { freeShipping: true },
    undefined,
    [],
    undefined,
    'Description',
    { ratingAverage: 4.5, total: 10 },
  );

  describe('Rendering', () => {
    it('renders product details correctly', () => {
      render(<ProductInfo product={mockProduct} />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText(/Nuevo/)).toBeInTheDocument();
      expect(screen.getByText(/5 vendidos/)).toBeInTheDocument();
      expect(screen.getByText('Envío gratis')).toBeInTheDocument();
      expect(screen.getByText('(10 opiniones)')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    describe('When User is NOT Authenticated', () => {
      beforeEach(() => {
        mockUseAuth.mockReturnValue({ isAuthenticated: false });
      });

      it('redirects to login when clicking "Agregar al carrito"', () => {
        render(<ProductInfo product={mockProduct} />);

        const addButton = screen.getByText('Agregar al carrito');
        fireEvent.click(addButton);

        expect(mockAddToCart).not.toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining('/login?returnUrl='),
        );
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining('add_to_cart%3Dtrue'),
        );
      });

      it('redirects to login when clicking "Comprar ahora"', () => {
        render(<ProductInfo product={mockProduct} />);

        const buyButton = screen.getByText('Comprar ahora');
        fireEvent.click(buyButton);

        expect(mockAddToCart).not.toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining('/login?returnUrl='),
        );
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining('buy_now%3Dtrue'),
        );
      });
    });

    describe('When User IS Authenticated', () => {
      beforeEach(() => {
        mockUseAuth.mockReturnValue({ isAuthenticated: true });
      });

      it('adds to cart when clicking "Agregar al carrito"', () => {
        render(<ProductInfo product={mockProduct} />);

        const addButton = screen.getByText('Agregar al carrito');
        fireEvent.click(addButton);

        expect(mockAddToCart).toHaveBeenCalledWith(
          expect.objectContaining({
            id: mockProduct.id,
            title: mockProduct.title,
            price: mockProduct.price,
          }),
        );
        // Should NOT redirect to cart
        expect(mockPush).not.toHaveBeenCalled();
      });

      it('adds to cart AND redirects when clicking "Comprar ahora"', () => {
        render(<ProductInfo product={mockProduct} />);

        const buyButton = screen.getByText('Comprar ahora');
        fireEvent.click(buyButton);

        expect(mockAddToCart).toHaveBeenCalledWith(
          expect.objectContaining({
            id: mockProduct.id,
          }),
        );
        expect(mockPush).toHaveBeenCalledWith('/cart');
      });
    });
  });
});
