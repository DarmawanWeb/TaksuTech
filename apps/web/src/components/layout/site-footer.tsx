import { brand, divisions } from '@taksu/content';
import { CompanyLogo } from '@taksu/ui/brand/company-logo';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { eduUrl, robotUrl, whatsappUrl } from '@/lib/links';
import { Container } from '../shared/container';

export async function SiteFooter() {
  const [t, nav, common, locale] = await Promise.all([
    getTranslations('Footer'),
    getTranslations('Nav'),
    getTranslations('Common'),
    getLocale(),
  ]);
  const whatsapp = whatsappUrl(common('whatsappGreeting'));
  const explore = [
    { href: '/services', label: nav('services') },
    { href: '/works', label: nav('works') },
    { href: '/blog', label: nav('blog') },
    { href: '/demo', label: nav('demo') },
    { href: '/about', label: nav('about') },
    { href: '/contact', label: nav('contact') },
  ];
  const lines = [
    { href: robotUrl(locale), name: divisions.reception.name, title: divisions.reception.title },
    { href: eduUrl(locale), name: divisions.education.name, title: divisions.education.title },
  ];
  const heading = 'text-foreground mb-3 text-sm font-semibold';

  return (
    <footer className="bg-surface-muted mt-24">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.3fr_0.7fr_1fr]">
        <div className="flex flex-col gap-3">
          <CompanyLogo />
          <p className="text-muted-foreground max-w-xs text-sm">{t('tagline')}</p>
          <p className="text-muted-foreground text-sm">{common('partOf')}</p>
        </div>
        <nav aria-label={t('lines')}>
          <h2 className={heading}>{t('lines')}</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {lines.map((line) => (
              <li key={line.href}>
                <a href={line.href} className="group block">
                  <span className="font-semibold group-hover:underline">{line.name}</span>
                  <span className="text-muted-foreground block">{line.title[locale]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t('explore')}>
          <h2 className={heading}>{t('explore')}</h2>
          <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={heading}>{t('contact')}</h2>
          <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
            <li>{brand.contact.person}</li>
            <li>
              <a
                href={`mailto:${brand.contact.email}`}
                className="hover:text-foreground break-all hover:underline"
              >
                {brand.contact.email}
              </a>
            </li>
            {whatsapp ? (
              <li>
                <a href={whatsapp} className="hover:text-foreground hover:underline">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>{brand.location[locale]}</li>
          </ul>
        </div>
      </Container>
      <Container>
        <p className="border-border text-muted-foreground border-t py-6 text-xs">
          {t('rights', { year: new Date().getFullYear() })}
        </p>
      </Container>
    </footer>
  );
}
