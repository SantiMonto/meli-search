import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Container Component
 * Centered container for content with max width
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full max-w-screen-xl px-4 md:px-6', className)}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';
