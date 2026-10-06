import { transliterate } from '@taksu/bali';
import type * as React from 'react';
import { cn } from '../lib/utils';

export interface AksaraTextProps extends Omit<React.ComponentProps<'span'>, 'children'> {
  /** Latin text to transliterate. Ignored when `aksara` is given. */
  latin?: string;
  /** Pre-written Aksara Bali, for phrases with an established spelling. */
  aksara?: string;
  /**
   * Decorative lines repeat a Latin label that is already on screen (signage style),
   * so they are hidden from screen readers.
   */
  decorative?: boolean;
}

/** Renders Aksara Bali with the right font, language tag, and line height. */
export function AksaraText({
  latin = '',
  aksara,
  decorative = false,
  className,
  ...props
}: AksaraTextProps) {
  const text = aksara ?? transliterate(latin);
  return (
    <span
      lang="ban-Bali"
      aria-hidden={decorative || undefined}
      title={decorative ? undefined : latin || undefined}
      className={cn('aksara', className)}
      {...props}
    >
      {text}
    </span>
  );
}
