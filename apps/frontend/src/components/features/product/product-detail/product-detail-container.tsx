'use client';

import { notFound } from 'next/navigation';
import { useProductDetail } from '@/hooks/use-product-detail';
import { ProductDetail } from './product-detail';
import { Spinner } from '@/components/ui/spinner/spinner';

import Script from 'next/script';

import { Product } from '@/core/entities/product.entity';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { Info } from 'lucide-react';

interface ProductDetailContainerProps {
  id: string;
}

function generateStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.getMainImageUrl(),
    description: product.description || product.title,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currencyId,
      price: product.price,
      availability: product.isAvailable()
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Mercado Libre',
      },
    },
    condition: product.isNew()
      ? 'https://schema.org/NewCondition'
      : 'https://schema.org/UsedCondition',
  };
}

export function ProductDetailContainer({ id }: ProductDetailContainerProps) {
  const { product, isLoading, isError, isNotFound } = useProductDetail(id);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isNotFound) {
    notFound();
  }

  if (isError || !product) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <Info className="h-12 w-12 text-red-600" />
        <p className="text-lg font-semibold text-red-500">
          Hubo un error al cargar el producto.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    );
  }

  const structuredData = generateStructuredData(product);

  return (
    <>
      <Script
        id="product-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
