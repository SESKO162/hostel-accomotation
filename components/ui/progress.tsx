'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number | null;
  max?: number;
  getValueLabel?: (value: number, max: number) => string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  max: maxProp = 100,
  getValueLabel = (value, max) => `${Math.round((value / max) * 100)}%`,
  ...props 
}, ref) => {
  // Ensure max is a valid number greater than 0
  const max = Math.max(Number(maxProp), 0);
  
  // Ensure value is a valid number between 0 and max
  const safeValue = React.useMemo(() => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) return 0;
    return Math.min(max, Math.max(0, parsedValue));
  }, [value, max]);
  
  // Calculate percentage for the indicator
  const percentage = React.useMemo(() => {
    return max > 0 ? (safeValue / max) * 100 : 0;
  }, [safeValue, max]);
  
  // Generate accessible label
  const label = React.useMemo(() => {
    return getValueLabel(safeValue, max);
  }, [safeValue, max, getValueLabel]);
  
  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          className
        )}
        value={safeValue}
        max={max}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={label}
        aria-label={props['aria-label'] || 'Progress'}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
          style={{
            transform: `translateX(calc(${percentage}% - 100%))`,
            width: `${percentage}%`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});

Progress.displayName = 'Progress';

export { Progress };
export type { ProgressProps };
