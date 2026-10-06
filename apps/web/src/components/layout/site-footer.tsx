import { brand, divisions } from '@taksu/content';
import { Logo } from '@taksu/ui/brand/logo';
import { PolengBand } from '@taksu/ui/brand/ornaments';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { whatsappUrl } from '@/lib/links';
import { Container } from '../shared/container';

export async function SiteFooter() {
  const [t, nav, common, locale] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Nav'),
    getTranslations('Common'),
    getLocale(),
  ]);
  const whatsapp = whatsappUrl('Om Swastiastu, Taksu Tech');
  const explore = [
    { href: '/demo', label: nav('demo') },
    { href: '/about', label: nav('about') },
    { href: '/contact', label: nav('contact') },
  ];
  const lines = [
    {
      href: '/reception',
      label: `${divisions.reception.name}: ${divisions.reception.title[locale]}`,
    },
    {
      href: '/education',
      label: `${divisions.education.name}: ${divisions.education.title[locale]}`,
    },
  ];

  return (
    <footer className="bg-surface mt-24">
      <PolengBand />
      <Container className="grid gap-10 py-14 md:grid-cols-[1.3fr_1.2fr_0.8fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-muted-foreground max-w-sm text-sm">{t('tagline')}</p>
          <p className="text-sm font-semibold">{common('partOf')}</p>
        </div>
        <nav aria-label={t('lines')}>
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{t('lines')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {lines.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t('explore')}>
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{t('explore')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-muted-foreground mb-3 text-sm font-semibold">{t('contact')}</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li>{brand.contact.person}</li>
            <li>
              <a
                href={`mailto:${brand.contact.email}`}
                className="hover:text-primary break-all hover:underline"
              >
                {brand.contact.email}
              </a>
            </li>
            {whatsapp ? (
              <li>
                <a href={whatsapp} className="hover:text-primary hover:underline">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>{brand.location[locale]}</li>
          </ul>
        </div>
      </Container>
      <Container className="border-border text-muted-foreground border-t py-6 text-xs">
        {t('rights', { year: new Date().getFullYear() })}
      </Container>
    </footer>
  );
}
