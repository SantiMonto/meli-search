'use client';

import { useCart } from '@/core/contexts/cart.context';

/**
 * Cart Badge Component
 * Displays the number of items in the shopping cart
 * Shows nothing when cart is empty
 * Shows "99+" when count exceeds 99
 */
export function CartBadge() {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
      {totalItems > 99 ? '99+' : totalItems}
    </span>
  );
}
