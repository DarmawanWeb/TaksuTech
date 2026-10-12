import type * as React from 'react';
import { cn } from '../lib/utils';

/**
 * Company mark: a T drawn as a board trace, turning at 45° the way PCB traces are routed
 * and ending in a via. The via takes the accent colour; its hole is cut out, so the mark
 * sits on any background.
 */
export function CompanyMark({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-8 shrink-0', className)} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinejoin="round">
        <path d="M5.5 7.5h21" strokeLinecap="round" />
        <path d="M16 7.5v8l4.74 4.74" />
      </g>
      <path
        fill="var(--accent)"
        fillRule="evenodd"
        d="M23 17.9a4.6 4.6 0 1 1 0 9.2a4.6 4.6 0 1 1 0-9.2zM23 20.7a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 1 0 0-3.6z"
      />
    </svg>
  );
}

/** Mark plus the company name. */
export function CompanyLogo({
  name = 'Taksu Tech',
  className,
  ...props
}: React.ComponentProps<'span'> & { name?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)} {...props}>
      <CompanyMark className="size-7" />
      <span className="font-display text-[1.15rem] leading-none font-semibold tracking-[-0.01em]">
        {name}
      </span>
    </span>
  );
}
