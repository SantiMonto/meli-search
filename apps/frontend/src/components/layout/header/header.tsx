import { Suspense } from 'react';
import Link from 'next/link';
import { Container } from '../container/container';
import { SearchBox } from '@/components/features/search';
import Image from 'next/image';

/**
 * Header Component
 * Main navigation header with logo and search bar
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-500 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-center gap-16">
          <Link href="/" className="flex items-center gap-2">
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
      </Container>
    </header>
  );
}
