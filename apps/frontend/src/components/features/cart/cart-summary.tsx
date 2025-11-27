'use client';

import { useCart } from '@/core/contexts/cart.context';
import { Button } from '@/components/ui';

export const CartSummary = () => {
  const { totalAmount, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS', // Assuming ARS for total
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm h-fit sticky top-4">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Resumen de compra
      </h2>

      <div className="space-y-4 border-b border-gray-200 pb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Productos ({totalItems})</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Envío</span>
          <span className="text-green-500 font-medium">Gratis</span>
        </div>
      </div>

      <div className="mt-4 mb-6 flex justify-between text-xl font-medium text-gray-900">
        <span>Total</span>
        <span>{formatPrice(totalAmount)}</span>
      </div>

      <Button size="lg" fullWidth>
        Continuar compra
      </Button>
    </div>
  );
};
