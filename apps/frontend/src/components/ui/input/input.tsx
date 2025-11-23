import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

/**
 * Input Component
 * Reusable input field with icons and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error = false,
      errorMessage,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'h-10 border bg-white px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 disabled:cursor-not-allowed disabled:opacity-50';

    const errorStyles = error
      ? 'border-error-500 focus-visible:ring-error-500'
      : 'border-gray-300';

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            baseStyles,
            errorStyles,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            fullWidth && 'w-full',
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}

        {error && errorMessage && (
          <p className="mt-1 text-sm text-error-500">{errorMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
