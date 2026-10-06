import { Logo } from '@taksu/ui/brand/logo';
import { ThemeToggle } from '@taksu/ui/brand/theme-toggle';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';

export async function SiteHeader() {
  const t = await getTranslations('Nav');
  const items = [
    { href: '/reception', label: t('reception') },
    { href: '/education', label: t('education') },
    { href: '/demo', label: t('demo') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="border-border/70 bg-background/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0 rounded-md" aria-label={`Taksu Tech, ${t('home')}`}>
          <Logo />
        </Link>
        <NavLinks items={items} className="hidden lg:block" />
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
