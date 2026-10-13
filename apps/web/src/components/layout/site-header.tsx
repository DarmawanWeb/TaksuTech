import { divisions } from '@taksu/content';
import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Button } from '@taksu/ui/components/button';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { eduUrl, robotUrl } from '@/lib/links';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { type NavEntry, NavLinks } from './nav-links';

export async function SiteHeader() {
  const [t, locale] = await Promise.all([getTranslations('Nav'), getLocale()]);
  // The two product lines live on their own sites; the menu groups them with the demos.
  const entries: NavEntry[] = [
    {
      label: t('products'),
      items: [
        {
          href: robotUrl(locale),
          label: t('reception'),
          note: divisions.reception.name,
          external: true,
        },
        {
          href: eduUrl(locale),
          label: t('education'),
          note: divisions.education.name,
          external: true,
        },
      ],
      after: [{ href: '/demo', label: t('demoLong') }],
    },
    { href: '/services', label: t('services') },
    { href: '/works', label: t('works') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="border-border bg-background/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:gap-6 sm:px-8">
        <Link href="/" className="shrink-0 rounded-sm" aria-label={`Taksu Tech, ${t('home')}`}>
          <CompanyLogo />
        </Link>
        <NavLinks entries={entries} className="hidden lg:block" />
        <div className="ml-auto flex items-center gap-1">
          <LocaleSwitcher label={t('language')} />
          {/* On phones the theme switch lives in the menu to keep the bar from overflowing. */}
          <ThemeToggle label={t('theme')} className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="ml-2 hidden md:inline-flex">
            <Link href="/contact">{t('cta')}</Link>
          </Button>
          <MobileNav
            entries={entries}
            labels={{ menu: t('menu'), close: t('close'), cta: t('cta'), theme: t('theme') }}
          />
        </div>
      </div>
    </header>
  );
}
