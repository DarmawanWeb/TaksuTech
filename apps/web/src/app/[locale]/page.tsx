import { brand } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DemoShowcase } from '@/components/home/demo-showcase';
import { Hero } from '@/components/home/hero';
import { LatestPosts } from '@/components/home/latest-posts';
import { OtherServices } from '@/components/home/other-services';
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

function organizationJsonLd(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon.svg`,
    email: brand.contact.email,
    address: { '@type': 'PostalAddress', addressRegion: 'Bali', addressCountry: 'ID' },
    areaServed: 'Indonesia',
    parentOrganization: { '@type': 'Organization', name: brand.parent.name },
  };
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const meta = await getTranslations('Meta');
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from our own constant data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(meta('description'))),
        }}
      />
      <Hero />
      <ProductLines locale={locale} />
      <OtherServices locale={locale} />
      <DemoShowcase locale={locale} />
      <LatestPosts locale={locale} />
      <CtaBand />
    </>
  );
}
