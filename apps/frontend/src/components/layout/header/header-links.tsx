'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { MobileMenu } from './mobile-menu';
import { PromoBanner } from './promo-banner';
import { NavigationLinks } from './navigation-links';
import { AccountSection } from './account-section';

/**
 * Header Links Component
 * Secondary navigation bar with location, categories, and account links
 * Orchestrates layout of header sub-components
 */
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
            <NavigationLinks />
          </div>
        </div>

        {/* Column 3: Account links (aligned with promo banner) */}
        <AccountSection />
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="flex xl:hidden items-center justify-between text-xs py-2">
        <PromoBanner className="ml-auto mr-4" />
        <MobileMenu />
      </div>
    </>
  );
}
