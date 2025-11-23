'use client';

import { notFound } from 'next/navigation';
import { useProductDetail } from '@/hooks/use-product-detail';
import { ProductDetail } from './product-detail';
import { Spinner } from '@/components/ui/spinner/spinner';

interface ProductDetailContainerProps {
  id: string;
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
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        Error al cargar el producto. Por favor intenta nuevamente.
      </div>
    );
  }

  // TODO: Fetch categories properly or pass them if available
  // For now we can pass an empty array or mock categories
  const categories = ['Electrónica', 'Audio', 'Auriculares'];

  return <ProductDetail product={product} categories={categories} />;
}
