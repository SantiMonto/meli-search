import { render, screen } from '@testing-library/react';
import { ProductInfo } from './product-info';
import { Product } from '@/core/entities/product.entity';
import { ProductCondition, Currency } from '@meli/shared-types';

describe('ProductInfo', () => {
  const mockProduct = new Product(
    'MLA123',
    'Test Product',
    1000,
    Currency.ARS,
    ProductCondition.NEW,
    'http://example.com/img.jpg',
    1200, // originalPrice
    10, // availableQuantity
    5, // soldQuantity
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
