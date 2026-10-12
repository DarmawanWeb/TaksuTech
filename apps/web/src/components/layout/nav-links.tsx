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
      <ul className="flex flex-col gap-1 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:gap-0">
        {items.map((item) => {
          const active =
            !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
          const className = cn(
            'block rounded-sm px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap underline-offset-[0.45em] transition-colors',
            active
              ? 'text-foreground decoration-accent underline decoration-2'
              : 'text-muted-foreground hover:text-foreground',
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
