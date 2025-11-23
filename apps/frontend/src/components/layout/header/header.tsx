import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '../container/container';
import { SearchBox } from '@/components/features/search';

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
              <Suspense
                fallback={
                  <div className="h-10 w-full rounded-md bg-white/20" />
                }
              >
                <SearchBox />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
