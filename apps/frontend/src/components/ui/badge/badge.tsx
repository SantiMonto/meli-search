import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

/**
 * Badge Component
 * Small status indicator or label
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center rounded-full font-medium transition-colors';

    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-success-500/10 text-success-500',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-error-500/10 text-error-500',
      info: 'bg-secondary-500/10 text-secondary-500',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
