import type * as React from 'react';
import { cn } from '../lib/utils';
import { AksaraText } from './aksara-text';

/**
 * Mark: the two halves of a candi bentar (Balinese split gate) with the taksu spark
 * between them, the threshold where every guest is welcomed.
 */
export function LogoMark({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-8', className)} {...props}>
      <path fill="currentColor" d="M2 30h12V3h-3v4H8v5H5v6H2zM30 30H18V3h3v4h3v5h3v6h3z" />
      <circle cx="16" cy="16.5" r="1.9" fill="var(--accent)" />
    </svg>
  );
}

export interface LogoProps extends React.ComponentProps<'span'> {
  /** Show the Aksara Bali line above the wordmark, as on Balinese signage. */
  withAksara?: boolean;
}

export function Logo({ className, withAksara = true, ...props }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} {...props}>
      <LogoMark className="text-primary" />
      <span className="flex flex-col leading-none">
        {withAksara ? (
          <AksaraText
            latin="Taksu Tech"
            decorative
            className="text-muted-foreground text-[0.7rem] leading-[1.4]"
          />
        ) : null}
        <span className="font-display text-lg font-bold tracking-tight [font-stretch:88%]">
          Taksu Tech
        </span>
      </span>
    </span>
  );
}
