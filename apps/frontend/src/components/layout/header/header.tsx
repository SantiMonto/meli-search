import Link from 'next/link';
import { Search } from 'lucide-react';
import { Container } from '../container/container';

/**
 * Header Component
 * Main navigation header with logo and search bar
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-500 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">
              Mercado Libre
            </div>
          </Link>

          {/* Search bar placeholder - will be replaced with actual SearchBox */}
          <div className="flex flex-1 max-w-2xl items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="h-10 w-full rounded-ml border-0 bg-white pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500"
                disabled
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
