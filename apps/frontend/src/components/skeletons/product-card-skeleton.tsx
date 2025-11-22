import { Card } from '../ui/card/card';

/**
 * Product Card Skeleton
 * Loading placeholder for product cards
 */
export function ProductCardSkeleton() {
  return (
    <Card hoverable padding="md">
      <div className="flex gap-4">
        {/* Image skeleton */}
        <div className="h-32 w-32 flex-shrink-0 animate-pulse rounded-ml bg-gray-200" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

          {/* Price */}
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />

          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </Card>
  );
}
