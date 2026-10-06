import { educationLevels, getGuide, guides, pick } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { Link } from '@/i18n/navigation';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([localeFromParams(params), params]);
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    locale,
    path: `/education/guides/${guide.slug}`,
    title: pick(guide.title, locale),
    description: pick(guide.summary, locale),
  });
}

export default async function GuidePage({ params }: Props) {
  const [locale, { slug }] = await Promise.all([resolveLocale(params), params]);
  const guide = getGuide(slug);
  if (!guide) notFound();
  const [t, common] = await Promise.all([getTranslations('Edu.guides'), getTranslations('Common')]);

  return (
    <>
      <section className="bg-grid pt-10 pb-10">
        <Container className="max-w-3xl">
          <Link
            href="/education/guides"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t('back')}
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline">{t(`audience.${guide.audience}`)}</Badge>
            {guide.levels.map((level) => (
              <Badge key={level} variant={level}>
                {educationLevels.find((entry) => entry.slug === level)?.short}
              </Badge>
            ))}
            <Badge variant="muted">{common('minutes', { count: guide.minutes })}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight [font-stretch:88%] sm:text-5xl">
            {pick(guide.title, locale)}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">{pick(guide.summary, locale)}</p>
        </Container>
      </section>
      <section className="py-8">
        <Container className="flex max-w-3xl flex-col gap-10">
          {guide.sections.map((section, sectionIndex) => (
            <article key={section.title.en}>
              <h2 className="flex items-baseline gap-3 text-2xl font-semibold">
                <span className="font-display text-primary tabular-nums">{sectionIndex + 1}</span>
                {pick(section.title, locale)}
              </h2>
              <ol className="marker:text-primary mt-4 list-decimal space-y-2 pl-6 leading-relaxed marker:font-semibold">
                {section.steps.map((step) => (
                  <li key={step.en}>{pick(step, locale)}</li>
                ))}
              </ol>
              {section.note ? (
                <p className="border-accent bg-accent-soft/60 mt-4 rounded-lg border-l-4 p-4 text-sm">
                  <span className="font-semibold">{t('note')}: </span>
                  {pick(section.note, locale)}
                </p>
              ) : null}
            </article>
          ))}
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
