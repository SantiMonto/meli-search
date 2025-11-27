'use client';

import Link from 'next/link';
import { ChevronDown, MapPin, ShoppingCart } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import { PromoBanner } from './promo-banner';
import { useCart } from '@/core/contexts/cart.context';
import { useAuth } from '@/core/contexts/auth.context';

const CartBadge = () => {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
      {totalItems > 99 ? '99+' : totalItems}
    </span>
  );
};

// ... imports

export function HeaderLinks() {
  const { isAuthenticated, user, logout } = useAuth();
  const { clearCart } = useCart();

  return (
    <>
      {/* Desktop Grid Layout - matches header columns */}
      <div className="hidden xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-4 text-xs py-2">
        {/* Column 1: Location (aligned with logo) */}
        <div className="flex items-center gap-1 leading-none">
          <Link href="/locations" className="flex items-center gap-1">
            <MapPin />
            <div className="flex flex-col">
              <span>Ingresa tu</span>
              <span className="font-bold">ubicación</span>
            </div>
          </Link>
        </div>

        {/* Column 2: Main links (aligned with search bar) */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl pl-8">
            <section className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Link href="/categories">Categorías</Link>
                <ChevronDown className="h-3 w-3" />
              </div>
              <Link href="/offers">Ofertas</Link>
              <Link href="/coupons">Cupones</Link>
              <Link href="/supermarket">Supermercado</Link>
              <Link href="/fashion">Moda</Link>
              <Link href="/sell">Vender</Link>
              <Link href="/help">Ayuda/PQR</Link>
            </section>
          </div>
        </div>

        {/* Column 3: Account links (aligned with promo banner) */}
        <section className="flex items-center justify-end gap-3">
          {!isAuthenticated ? (
            <Link href="/login">Ingresa</Link>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-blue-600">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                  {user?.firstName?.[0]?.toUpperCase()}
                  {user?.lastName?.[0]?.toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate text-sm">
                  {user?.firstName}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full hidden pt-2 group-hover:block z-50 min-w-[200px]">
                <div className="rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-3 text-gray-700 border-b border-gray-100">
                    <p className="font-bold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.identifier}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearCart();
                      logout();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          )}
          <Link href="/orders">Mis compras</Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <CartBadge />
          </Link>
        </section>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="flex xl:hidden items-center justify-between text-xs py-2">
        <PromoBanner className="ml-auto mr-4" />
        <MobileMenu />
      </div>
    </>
  );
}
