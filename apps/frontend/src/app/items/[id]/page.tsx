import { Metadata } from 'next';
import { ProductDetailContainer } from '@/components/features/product/product-detail/product-detail-container';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Producto - Mercado Libre`,
    description: `Comprá el producto con ID ${id} en Mercado Libre. Envíos a todo el país.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetailContainer id={id} />;
}
