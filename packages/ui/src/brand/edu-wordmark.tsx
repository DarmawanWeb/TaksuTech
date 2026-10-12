import type * as React from 'react';
import { cn } from '../lib/utils';

/** Education line mark: a robot (the dot) riding a stretch of line-follower track. */
export function EduMark({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-8 shrink-0', className)} {...props}>
      <rect width="32" height="32" rx="6" fill="var(--primary)" />
      <path
        d="M4 22c6 0 6-12 12-12s6 12 12 12"
        fill="none"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="10" r="3.2" fill="#fff" stroke="#000" strokeWidth="1.6" />
    </svg>
  );
}

/** Mark plus the line's name, set in the wide display face like a kit box label. */
export function EduWordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <EduMark />
      <span className="type-label text-[1.15rem] leading-none">{name}</span>
    </span>
  );
}
