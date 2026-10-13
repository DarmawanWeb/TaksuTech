'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@taksu/ui/components/dropdown-menu';
import { cn } from '@taksu/ui/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';

export interface NavLink {
  href: string;
  label: string;
  /** A second line in menus, e.g. the product site's name. */
  note?: string;
  /** Another site (the product lines). Rendered as a plain link, never marked active. */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  /** Links before the separator, then links after it. */
  items: NavLink[];
  after?: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const isGroup = (entry: NavEntry): entry is NavGroup => 'items' in entry;

export function useIsActive() {
  const pathname = usePathname();
  return (link: NavLink) =>
    !link.external && (pathname === link.href || pathname.startsWith(`${link.href}/`));
}

const linkClass = (active: boolean) =>
  cn(
    'block rounded-sm px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap underline-offset-[0.45em] transition-colors',
    active
      ? 'text-foreground decoration-accent underline decoration-2'
      : 'text-muted-foreground hover:text-foreground',
  );

function MenuLink({ link, active }: { link: NavLink; active: boolean }) {
  const body = (
    <span className="flex flex-col">
      <span className="font-medium">{link.label}</span>
      {link.note ? <span className="text-muted-foreground text-xs">{link.note}</span> : null}
    </span>
  );
  return (
    <DropdownMenuItem asChild className={cn('px-3 py-2.5', active && 'bg-surface-muted')}>
      {link.external ? (
        <a href={link.href}>{body}</a>
      ) : (
        <Link href={link.href} aria-current={active ? 'page' : undefined}>
          {body}
        </Link>
      )}
    </DropdownMenuItem>
  );
}

/** The header's links on wide screens; a group opens as a small menu. */
export function NavLinks({ entries, className }: { entries: NavEntry[]; className?: string }) {
  const isActive = useIsActive();
  return (
    <nav className={className}>
      <ul className="flex items-center">
        {entries.map((entry) => {
          if (isGroup(entry)) {
            const links = [...entry.items, ...(entry.after ?? [])];
            const active = links.some(isActive);
            return (
              <li key={entry.label}>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger
                    className={cn(linkClass(active), 'group flex items-center gap-1')}
                  >
                    {entry.label}
                    <ChevronDown
                      aria-hidden
                      className="size-4 transition-transform group-data-[state=open]:rotate-180"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-60">
                    {entry.items.map((link) => (
                      <MenuLink key={link.href} link={link} active={isActive(link)} />
                    ))}
                    {entry.after?.length ? <DropdownMenuSeparator /> : null}
                    {entry.after?.map((link) => (
                      <MenuLink key={link.href} link={link} active={isActive(link)} />
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            );
          }
          const active = isActive(entry);
          return (
            <li key={entry.href}>
              {entry.external ? (
                <a href={entry.href} className={linkClass(false)}>
                  {entry.label}
                </a>
              ) : (
                <Link
                  href={entry.href}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(active)}
                >
                  {entry.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** The same links in the phone menu: a group becomes a labelled list. */
export function NavList({ entries, onNavigate }: { entries: NavEntry[]; onNavigate: () => void }) {
  const isActive = useIsActive();
  const item = (link: NavLink) => {
    const active = isActive(link);
    const className = cn(
      'flex flex-col rounded-sm px-3 py-2 text-base font-medium transition-colors',
      active ? 'bg-surface-muted text-foreground' : 'text-foreground hover:bg-surface-muted',
    );
    const body = (
      <>
        {link.label}
        {link.note ? (
          <span className="text-muted-foreground text-sm font-normal">{link.note}</span>
        ) : null}
      </>
    );
    return (
      <li key={link.href}>
        {link.external ? (
          <a href={link.href} onClick={onNavigate} className={className}>
            {body}
          </a>
        ) : (
          <Link
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={className}
          >
            {body}
          </Link>
        )}
      </li>
    );
  };

  return (
    <nav className="-mx-3 flex flex-col gap-5">
      {entries.some(isGroup)
        ? entries.filter(isGroup).map((group) => (
            <div key={group.label}>
              <p className="text-muted-foreground px-3 pb-1 text-sm font-semibold">{group.label}</p>
              <ul className="flex flex-col">
                {[...group.items, ...(group.after ?? [])].map(item)}
              </ul>
            </div>
          ))
        : null}
      <ul className="border-border flex flex-col border-t pt-4">
        {entries.filter((entry): entry is NavLink => !isGroup(entry)).map(item)}
      </ul>
    </nav>
  );
}
