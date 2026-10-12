import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DemoShowcase } from '@/components/home/demo-showcase';
import { Hero } from '@/components/home/hero';
import { InHouse } from '@/components/home/in-house';
import { ProductLines } from '@/components/home/product-lines';
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
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from our own constant data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ProductLines locale={locale} />
      <InHouse />
      <DemoShowcase locale={locale} />
      <CtaBand />
    </>
  );
}
