import Link from 'next/link';
import { ChevronDown, MapPin, ShoppingCart } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import { PromoBanner } from './promo-banner';

export function HeaderLinks() {
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
          <Link href="/register">Crea tu cuenta</Link>
          <Link href="/login">Ingresa</Link>
          <Link href="/orders">Mis compras</Link>
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
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
