/**
 * Product Detail Skeleton
 * Loading placeholder for product detail page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Images skeleton */}
      <div className="space-y-4">
        <div className="aspect-square w-full animate-pulse rounded-ml bg-gray-200" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-ml bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Info skeleton */}
      <div className="space-y-6">
        {/* Condition */}
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Rating */}
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

        {/* Price */}
        <div className="h-10 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Installments */}
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

        {/* Shipping */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Button */}
        <div className="h-12 w-full animate-pulse rounded-ml bg-gray-200" />

        {/* Attributes */}
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 w-full animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
