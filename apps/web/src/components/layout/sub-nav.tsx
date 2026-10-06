'use client';

import { cn } from '@taksu/ui/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

/** Secondary navigation for an area (education or reception). */
export function SubNav({
  label,
  items,
  rootHref,
}: {
  label: string;
  items: { href: string; label: string }[];
  rootHref: string;
}) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="border-border bg-surface/70 border-b backdrop-blur">
      <ul className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-5 sm:px-8">
        {items.map((item) => {
          const active =
            item.href === rootHref
              ? pathname === rootHref
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'block border-b-2 px-3 py-3 text-sm font-semibold transition-colors',
                  active
                    ? 'border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground border-transparent',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
