'use client';

import { useCart } from '@/core/contexts/cart.context';
import { CartItem } from '@/components/features/cart/cart-item';
import { CartSummary } from '@/components/features/cart/cart-summary';
import { EmptyCart } from '@/components/features/cart/empty-cart';

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-xl font-semibold text-gray-900">
            Carrito ({items.length})
          </h1>
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <CartSummary />
      </div>
    </main>
  );
}
