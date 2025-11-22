import { ProductCardSkeleton } from './product-card-skeleton';

/**
 * Search Results Skeleton
 * Loading placeholder for search results list
 */
export function SearchResultsSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
