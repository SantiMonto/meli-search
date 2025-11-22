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
      {/* Search component will go here in next PRP */}
    </main>
  );
}
