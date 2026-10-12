'use client';

import { cn } from '@taksu/ui/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

export interface NavItem {
  href: string;
  label: string;
  /** Another site (the product lines). Rendered as a plain link, never marked active. */
  external?: boolean;
}

export function NavLinks({
  items,
  className,
  onNavigate,
}: {
  items: NavItem[];
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
        {items.map((item) => {
          const active =
            !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
          const className = cn(
            'hover:bg-surface-muted block rounded-md px-3 py-2 text-sm font-semibold transition-colors',
            active ? 'text-primary' : 'text-foreground/80',
          );
          if (item.external) {
            return (
              <li key={item.href}>
                <a href={item.href} onClick={onNavigate} className={className}>
                  {item.label}
                </a>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={className}
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
