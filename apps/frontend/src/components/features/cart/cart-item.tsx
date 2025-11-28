'use client';

import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '@/core/types/cart.types';
import { useCart } from '@/core/contexts/cart.context';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: item.currency_id,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-4 border-b border-gray-200 py-6 last:border-0">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2"
          loading="eager"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {item.title}
            </h3>
            {item.free_shipping && (
              <span className="mt-1 inline-block text-xs font-medium text-green-500">
                Envío gratis
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-light text-gray-900">
              {formatPrice(item.price * item.quantity)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                {formatPrice(item.price)} c/u
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-md border border-gray-200">
              <button
                className="p-1 hover:bg-gray-50 disabled:opacity-50"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4 text-blue-500" />
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                className="p-1 hover:bg-gray-50"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4 text-blue-500" />
              </button>
            </div>
            <button
              className="text-xs font-medium text-blue-500 hover:text-blue-700"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
