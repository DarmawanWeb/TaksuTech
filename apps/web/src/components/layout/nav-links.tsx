'use client';

import { EduMark } from '@taksu/ui/brand/edu-wordmark';
import { LogoMark } from '@taksu/ui/brand/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@taksu/ui/components/navigation-menu';
import { cn } from '@taksu/ui/lib/utils';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';

export interface NavLink {
  href: string;
  label: string;
  /** A second line in menus, e.g. the product site's name. */
  note?: string;
  /** What is behind the link, shown on the product cards. */
  description?: string;
  /** Product line, for its mark. */
  brand?: 'reception' | 'edu';
  image?: StaticImageData;
  /** Another site (the product lines). Rendered as a plain link, never marked active. */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  /** Shown as cards with photos, then the `after` links in a row below. */
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

/** The product line's own mark, in its own colour. */
export function BrandMark({
  brand,
  className,
}: {
  brand: 'reception' | 'edu';
  className?: string;
}) {
  return brand === 'reception' ? (
    <span data-brand="reception" className={cn('text-primary inline-flex', className)}>
      <LogoMark className="size-5" />
    </span>
  ) : (
    <span data-brand="edu" className={cn('inline-flex', className)}>
      <EduMark className="size-5" />
    </span>
  );
}

const linkClass = (active: boolean) =>
  cn(
    'block rounded-sm px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap underline-offset-[0.45em] transition-colors',
    active
      ? 'text-foreground decoration-accent underline decoration-2'
      : 'text-muted-foreground hover:text-foreground data-[state=open]:text-foreground',
  );

function ProductCard({ link }: { link: NavLink }) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={link.href}
        className="hover:bg-surface-muted focus-visible:bg-surface-muted flex h-full flex-col rounded-md p-2 transition-colors"
      >
        {link.image ? (
          <span className="bg-surface-muted relative block aspect-[16/9] overflow-hidden rounded-sm">
            <Image src={link.image} alt="" fill sizes="18rem" className="object-cover" />
          </span>
        ) : null}
        <span className="text-muted-foreground mt-3 flex items-center gap-2 text-[0.8125rem] font-semibold">
          {link.brand ? <BrandMark brand={link.brand} /> : null}
          {link.note}
          <ArrowUpRight aria-hidden className="ml-auto size-4" />
        </span>
        <span className="mt-1.5 font-semibold">{link.label}</span>
        {link.description ? (
          <span className="text-muted-foreground mt-0.5 text-sm leading-snug">
            {link.description}
          </span>
        ) : null}
      </a>
    </NavigationMenuLink>
  );
}

/** The header's links on wide screens; the product group opens as a panel with both lines. */
export function NavLinks({ entries, className }: { entries: NavEntry[]; className?: string }) {
  const isActive = useIsActive();
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex items-center">
        {entries.map((entry) => {
          if (isGroup(entry)) {
            const active = [...entry.items, ...(entry.after ?? [])].some(isActive);
            return (
              <NavigationMenuItem key={entry.label}>
                <NavigationMenuTrigger
                  className={cn(linkClass(active), 'group flex items-center gap-1')}
                >
                  {entry.label}
                  <ChevronDown
                    aria-hidden
                    className="size-4 transition-transform group-data-[state=open]:rotate-180"
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-[37rem] p-2">
                  <ul className="grid grid-cols-2 gap-1">
                    {entry.items.map((link) => (
                      <li key={link.href}>
                        <ProductCard link={link} />
                      </li>
                    ))}
                  </ul>
                  {entry.after?.length ? (
                    <ul className="border-border mt-2 border-t pt-2">
                      {entry.after.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild active={isActive(link)}>
                            <Link
                              href={link.href}
                              className="hover:bg-surface-muted focus-visible:bg-surface-muted flex items-baseline justify-between gap-4 rounded-md px-2 py-2.5 transition-colors"
                            >
                              <span className="font-semibold">{link.label}</span>
                              {link.note ? (
                                <span className="text-muted-foreground text-sm">{link.note}</span>
                              ) : null}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          const active = isActive(entry);
          return (
            <NavigationMenuItem key={entry.href}>
              <NavigationMenuLink asChild active={active}>
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
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
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
        <span className="flex items-center gap-2.5">
          {link.brand ? <BrandMark brand={link.brand} /> : null}
          {link.label}
        </span>
        {link.note ? (
          <span
            className={cn(
              'text-muted-foreground text-sm font-normal',
              link.brand && 'pl-[1.875rem]',
            )}
          >
            {link.note}
          </span>
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
