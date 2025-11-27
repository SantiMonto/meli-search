'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/core/contexts/auth.context';
import { UserMenu } from '@/components/features/auth/user-menu';
import { CartBadge } from '@/components/features/cart/cart-badge';

/**
 * Account Section Component
 * Displays user authentication status and cart
 * Shows login link for guests, user menu for authenticated users
 */
export function AccountSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="flex items-center justify-end gap-3">
      {!isAuthenticated ? <Link href="/login">Ingresa</Link> : <UserMenu />}
      <Link href="/orders">Mis compras</Link>
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        <CartBadge />
      </Link>
    </section>
  );
}
