import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui';

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-12 text-center shadow-sm">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Tu carrito está vacío
      </h2>
      <p className="mb-8 text-gray-500">
        ¿No sabes qué comprar? ¡Miles de productos te esperan!
      </p>
      <Link href="/">
        <Button size="lg">Descubrir productos</Button>
      </Link>
    </div>
  );
};
