import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DemoShowcase } from '@/components/home/demo-showcase';
import { Hero } from '@/components/home/hero';
import { LearningPathSection } from '@/components/home/learning-path';
import { MadeForBali } from '@/components/home/made-for-bali';
import { ProductLines } from '@/components/home/product-lines';
import { UseCaseStrips } from '@/components/home/use-case-strips';
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
  areaServed: 'Bali, Indonesia',
  parentOrganization: { '@type': 'Organization', name: brand.parent.name },
};

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <ProductLines />
      <DemoShowcase locale={locale} />
      <UseCaseStrips locale={locale} />
      <MadeForBali />
      <LearningPathSection locale={locale} />
      <CtaBand />
    </>
  );
}
