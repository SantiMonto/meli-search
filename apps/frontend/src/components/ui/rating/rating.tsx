import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

/**
 * Rating Component
 * Star rating display
 */
export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className,
  ...props
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className={cn('flex items-center gap-1', className)} {...props}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;

          return (
            <Star
              key={index}
              className={cn(
                sizes[size],
                isFilled || isHalf
                  ? 'fill-primary-500 text-primary-500'
                  : 'text-gray-300',
              )}
            />
          );
        })}
      </div>

      {showValue && (
        <span className={cn('font-medium text-gray-700', textSizes[size])}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
