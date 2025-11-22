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
      <h1 className="text-3xl font-bold text-gray-900">Detalle del Producto</h1>
      <p className="mt-2 text-gray-600">ID: {params.id}</p>
      {/* Product detail component will go here in next PRP */}
    </main>
  );
}
