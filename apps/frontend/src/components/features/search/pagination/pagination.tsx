'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Paging } from '../../../../core/entities/paging.entity';
import { Button } from '../../../ui/button/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  paging: Paging;
  query: string;
}

/**
 * Pagination Component
 * Page navigation controls
 */
export function Pagination({ paging, query }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Navigate to a specific page
   */
  const goToPage = (page: number) => {
    const offset = (page - 1) * paging.limit;
    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Go to previous page
   */
  const goToPrevious = () => {
    const offset = paging.getPreviousPageOffset();
    if (offset === null) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Go to next page
   */
  const goToNext = () => {
    const offset = paging.getNextPageOffset();
    if (offset === null) return;

    const params = new URLSearchParams(searchParams);
    params.set('q', query);
    params.set('offset', offset.toString());

    router.push(`/?${params.toString()}`);
  };

  const currentPage = paging.getCurrentPage();
  const totalPages = paging.getTotalPages();
  const pageRange = paging.getPageRange(5);

  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToPrevious}
        disabled={!paging.hasPreviousPage()}
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pageRange.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => goToPage(page)}
            className={cn(
              'min-w-[40px]',
              page === currentPage && 'pointer-events-none',
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        onClick={goToNext}
        disabled={!paging.hasNextPage()}
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
