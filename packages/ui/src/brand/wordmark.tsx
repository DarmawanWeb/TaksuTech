import { cn } from '../lib/utils';
import { wordmarkDot, wordmarkName, wordmarkPath, wordmarkViewBox } from './wordmark-path';

export interface WordmarkProps {
  className?: string;
  /** Accessible name; leave empty when visible text next to it already names the brand. */
  title?: string;
}

/**
 * The brand name in Anybody, drawn as outlines. The dot on the i is an amber turn signal that
 * flashes three times when the logo's link is hovered or focused (a `group` on the link).
 */
export function Wordmark({ className, title = wordmarkName.toUpperCase() }: WordmarkProps) {
  return (
    <svg
      viewBox={wordmarkViewBox}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn('h-7 w-auto', className)}
    >
      <path d={wordmarkPath} fill="currentColor" />
      <circle
        {...wordmarkDot}
        fill="#ffb020"
        className="motion-safe:group-hover:animate-signal motion-safe:group-focus-visible:animate-signal"
      />
    </svg>
  );
}
