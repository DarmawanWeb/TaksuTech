'use client';

import { Logo } from '@taksu/ui/brand/logo';
import { Button } from '@taksu/ui/components/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@taksu/ui/components/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { NavLinks, type NavItem } from './nav-links';

export function MobileNav({
  items,
  labels,
}: {
  items: NavItem[];
  labels: { menu: string; close: string; cta: string };
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
            <Logo />
          </div>
        </SheetTitle>
        <NavLinks items={items} onNavigate={close} />
        <Button asChild size="lg" className="mt-auto">
          <Link href="/contact" onClick={close}>
            {labels.cta}
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
