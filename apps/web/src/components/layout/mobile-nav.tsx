'use client';

import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Button } from '@taksu/ui/components/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@taksu/ui/components/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { type NavEntry, NavList } from './nav-links';

export function MobileNav({
  entries,
  labels,
}: {
  entries: NavEntry[];
  labels: { menu: string; close: string; cta: string; theme: string };
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={labels.menu}>
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent closeLabel={labels.close} aria-describedby={undefined}>
        <SheetTitle asChild>
          <div>
            <CompanyLogo />
          </div>
        </SheetTitle>
        <div className="-mr-2 min-h-0 flex-1 overflow-y-auto pr-2">
          <NavList entries={entries} onNavigate={close} />
        </div>
        <div className="border-border flex items-center justify-between gap-4 border-t pt-4 sm:hidden">
          <span className="text-muted-foreground text-sm">{labels.theme}</span>
          <ThemeToggle label={labels.theme} />
        </div>
        <Button asChild size="lg">
          <Link href="/contact" onClick={close}>
            {labels.cta}
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
