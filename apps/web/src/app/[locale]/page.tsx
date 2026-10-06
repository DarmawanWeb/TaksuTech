import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DemoShowcase } from '@/components/home/demo-showcase';
import { Divisions } from '@/components/home/divisions';
import { Hero } from '@/components/home/hero';
import { Proof } from '@/components/home/proof';
import { Values } from '@/components/home/values';
import { CtaBand } from '@/components/shared/cta-band';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return pageMetadata({ locale, path: '/', description: t('description') });
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: brand.name,
  url: siteConfig.url,
  email: brand.contact.email,
  areaServed: 'Indonesia',
  parentOrganization: { '@type': 'Organization', name: brand.parent.name },
};

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Home');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <Divisions locale={locale} />
      <Proof />
      <DemoShowcase locale={locale} />
      <Values locale={locale} title={t('values.title')} intro={t('values.intro')} />
      <CtaBand />
    </>
  );
}
