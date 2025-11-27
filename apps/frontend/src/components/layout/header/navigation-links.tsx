'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

/**
 * Navigation Links Component
 * Main navigation links displayed in the header
 * Pure UI component with no business logic
 */
export function NavigationLinks() {
  return (
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
  );
}
