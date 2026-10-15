import { cn } from '../lib/utils';

/**
 * Ciko's face from the front, squared up as the app icon: the red shell, the white racing
 * stripe, and the black visor with two cyan OLED eyes.
 */
export function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('size-8', className)}
    >
      <rect width="64" height="64" rx="16" fill="#e3262d" />
      <rect x="25" width="14" height="64" fill="#ffffff" />
      <rect x="8" y="21" width="48" height="22" rx="7" fill="#1f2228" />
      <rect x="18.5" y="26.5" width="9" height="11" rx="2.5" fill="#44ddeb" />
      <rect x="36.5" y="26.5" width="9" height="11" rx="2.5" fill="#44ddeb" />
    </svg>
  );
}
