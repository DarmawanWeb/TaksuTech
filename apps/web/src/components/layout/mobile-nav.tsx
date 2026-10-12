'use client';

import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Button } from '@taksu/ui/components/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@taksu/ui/components/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { type NavItem, NavLinks } from './nav-links';

export function MobileNav({
  items,
  labels,
}: {
  items: NavItem[];
  labels: { menu: string; close: string; cta: string; theme: string };
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="min-[1100px]:hidden"
          aria-label={labels.menu}
        >
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={labels.close} aria-describedby={undefined}>
        <SheetTitle asChild>
          <div>
            <CompanyLogo />
          </div>
        </SheetTitle>
        <NavLinks items={items} onNavigate={close} className="-mx-3" />
        <div className="border-border flex items-center justify-between gap-4 border-t pt-4 sm:hidden">
          <span className="text-muted-foreground text-sm">{labels.theme}</span>
          <ThemeToggle label={labels.theme} />
        </div>
        <Button asChild size="lg" className="mt-auto">
          <Link href="/contact" onClick={close}>
            {labels.cta}
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
