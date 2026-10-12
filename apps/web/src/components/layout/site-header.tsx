import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Button } from '@taksu/ui/components/button';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { eduUrl, robotUrl } from '@/lib/links';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

export async function SiteHeader() {
  const [t, locale] = await Promise.all([getTranslations('Nav'), getLocale()]);
  const items = [
    { href: robotUrl(locale), label: t('reception'), external: true },
    { href: eduUrl(locale), label: t('education'), external: true },
    { href: '/demo', label: t('demo') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0 rounded-sm" aria-label={`Taksu Tech, ${t('home')}`}>
          <CompanyLogo />
        </Link>
        {/* Product names are long; below 1100px they move into the menu. */}
        <NavLinks items={items} className="hidden min-[1100px]:block" />
        <div className="ml-auto flex items-center gap-1">
          <LocaleSwitcher label={t('language')} />
          <ThemeToggle label={t('theme')} />
          <Button asChild size="sm" className="ml-2 hidden md:inline-flex">
            <Link href="/contact">{t('cta')}</Link>
          </Button>
          <MobileNav items={items} labels={{ menu: t('menu'), close: t('close'), cta: t('cta') }} />
        </div>
      </div>
    </header>
  );
}
