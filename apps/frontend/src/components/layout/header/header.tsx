import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '../container/container';
import { SearchBox } from '@/components/features/search';
import Image from 'next/image';
import { HeaderLinks } from './header-links';
import { PromoBanner } from './promo-banner';

/**
 * Header Component
 * Main navigation header with logo and search bar
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-500 shadow-sm">
      <Container>
        {/* Desktop Grid Layout */}
        <div className="hidden xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-4">
          {/* Row 1: Logo, Search, Promo */}
          <Link href="/" className="flex items-center gap-2 h-16">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center justify-center h-16">
            <div className="relative w-full max-w-2xl">
              <Suspense
                fallback={
                  <div className="h-10 w-full rounded-md bg-white/20" />
                }
              >
                <SearchBox />
              </Suspense>
            </div>
          </div>

          <div className="flex items-center justify-end h-16">
            <PromoBanner />
          </div>

          {/* Row 2: HeaderLinks spans all columns */}
          <div className="col-span-3">
            <HeaderLinks />
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="xl:hidden px-4">
          <div className="flex h-16 items-center justify-between gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2 min-w-fit">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="h-8 w-auto"
              />
            </Link>

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
          <HeaderLinks />
        </div>
      </Container>
    </header>
  );
}
