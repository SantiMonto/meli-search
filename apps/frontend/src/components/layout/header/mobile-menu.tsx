'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ShoppingCart, MapPin } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2">
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 shadow-lg">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 mt-4 text-sm font-medium">
            <Link
              href="/locations"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <MapPin className="h-5 w-5" />
              <div className="flex flex-col leading-none">
                <span>Ingresa tu</span>
                <span className="font-bold">ubicación</span>
              </div>
            </Link>

            <div className="h-px bg-gray-200" />

            <div className="flex flex-col gap-4">
              <Link
                href="/categories"
                className="flex items-center justify-between"
                onClick={() => setIsOpen(false)}
              >
                Categorías <ChevronDown className="h-4 w-4" />
              </Link>
              <Link href="/offers" onClick={() => setIsOpen(false)}>
                Ofertas
              </Link>
              <Link href="/coupons" onClick={() => setIsOpen(false)}>
                Cupones
              </Link>
              <Link href="/sell" onClick={() => setIsOpen(false)}>
                Vender
              </Link>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex flex-col gap-4">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                Crea tu cuenta
              </Link>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Ingresa
              </Link>
              <Link href="/orders" onClick={() => setIsOpen(false)}>
                Mis compras
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" /> Carrito
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
