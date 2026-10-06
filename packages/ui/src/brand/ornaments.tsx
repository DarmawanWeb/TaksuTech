import type * as React from 'react';
import { cn } from '../lib/utils';

/** Thin band of poleng (black-and-white checked cloth). Purely decorative. */
export function PolengBand({ className, ...props }: React.ComponentProps<'div'>) {
  return <div aria-hidden className={cn('bg-poleng h-3 w-full', className)} {...props} />;
}

/**
 * One half of a candi bentar, the split gate at the entrance of Balinese temples and
 * compounds. Use a mirrored pair to frame content as a threshold.
 */
export function CandiBentarHalf({
  side,
  className,
  ...props
}: React.ComponentProps<'svg'> & { side: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 120 400"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      className={cn(side === 'right' && '-scale-x-100', className)}
      {...props}
    >
      <g fill="currentColor">
        <path d="M0 400h120V40h-8v-28h-10v28h-8v32H80v36H64v40H48v44H32v48H16v52H0z" />
        <rect x="0" y="372" width="120" height="10" opacity="0.35" />
        <rect x="16" y="300" width="104" height="6" opacity="0.35" />
        <rect x="48" y="196" width="72" height="6" opacity="0.35" />
        <rect x="80" y="104" width="40" height="6" opacity="0.35" />
      </g>
      <g fill="var(--accent)">
        <rect x="104" y="12" width="10" height="4" />
        <rect x="100" y="372" width="14" height="10" />
      </g>
    </svg>
  );
}
