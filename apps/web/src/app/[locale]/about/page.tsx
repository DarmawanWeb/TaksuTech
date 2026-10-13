import { brand, divisions, pick } from '@taksu/content';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { InHouse } from '@/components/about/in-house';
import { Principles } from '@/components/about/principles';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'About' });
  return pageMetadata({
    locale,
    path: '/about',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('About');
  const facts: { label: string; value: string; href?: string }[] = [
    { label: t('facts.parent'), value: brand.parent.name },
    { label: t('facts.lines'), value: `${divisions.reception.name}, ${divisions.education.name}` },
    { label: t('facts.office'), value: pick(brand.location, locale) },
    { label: t('facts.person'), value: brand.contact.person },
    { label: t('facts.email'), value: brand.contact.email, href: `mailto:${brand.contact.email}` },
  ];

  return (
    <>
      <section className="pt-14 pb-12 lg:pt-20">
        <Container>
          <h1 className="text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl">{t('title')}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
            {pick(brand.story, locale)}
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="max-w-2xl lg:col-span-7">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t('parentTitle')}</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">{t('parentBody')}</p>
            <h2 className="mt-10 text-2xl font-semibold sm:text-3xl">{t('nameTitle')}</h2>
            <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
              {pick(brand.meaning, locale)}
            </p>
          </div>
          {/* Company details, set out like the title block of a drawing. */}
          <aside className="lg:col-span-5">
            <h2 className="sr-only">{t('facts.title')}</h2>
            <dl className="border-border divide-border divide-y rounded-lg border text-[0.9375rem]">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7rem_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[8.5rem_1fr]"
                >
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="min-w-0 font-semibold [overflow-wrap:anywhere]">
                    {fact.href ? (
                      <a href={fact.href} className="hover:underline">
                        {fact.value}
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      <div className="mt-10">
        <InHouse />
      </div>
      <Principles locale={locale} title={t('principlesTitle')} />
      <CtaBand />
    </>
  );
}
