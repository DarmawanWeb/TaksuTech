import { brand, pick } from '@taksu/content';
import { AksaraText } from '@taksu/ui/brand/aksara-text';
import { CandiBentarHalf } from '@taksu/ui/brand/ornaments';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Values } from '@/components/home/values';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { SectionHeading } from '@/components/shared/section-heading';
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
  return (
    <>
      <section className="pt-16 pb-10">
        <Container>
          <SectionHeading as="h1" aksara="Tentang Taksu Tech" title={t('title')} />
        </Container>
      </section>
      <section className="py-10">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-border bg-surface relative flex items-end justify-center gap-6 overflow-hidden rounded-xl border px-6 pt-10">
            <CandiBentarHalf side="left" className="text-primary/25 h-56 w-auto" />
            <AksaraText
              latin="taksu"
              className="text-primary self-center pb-10 text-7xl sm:text-8xl"
            />
            <CandiBentarHalf side="right" className="text-primary/25 h-56 w-auto" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold">{t('meaningTitle')}</h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              {pick(brand.meaning, locale)}
            </p>
            <h2 className="mt-10 text-3xl font-semibold">{t('storyTitle')}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {pick(brand.story, locale)}
            </p>
            <h2 className="mt-10 text-3xl font-semibold">{t('parentTitle')}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{t('parentBody')}</p>
          </div>
        </Container>
      </section>
      <Values locale={locale} title={t('valuesTitle')} intro={t('valuesIntro')} />
      <section className="py-6">
        <Container>
          <div className="border-border bg-surface max-w-3xl rounded-xl border p-8">
            <h2 className="text-xl font-semibold">{t('aksaraTitle')}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t('aksaraBody')}</p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
