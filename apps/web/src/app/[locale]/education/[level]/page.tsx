import { educationLevels, getLevel, pick } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { ArrowLeft, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { Link } from '@/i18n/navigation';
import { demoUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; level: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return educationLevels.map((level) => ({ level: level.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [locale, { level: slug }] = await Promise.all([localeFromParams(params), params]);
  const level = getLevel(slug);
  if (!level) return {};
  return pageMetadata({
    locale,
    path: `/education/${level.slug}`,
    title: `${pick(level.robotName, locale)} ${level.short}`,
    description: pick(level.summary, locale),
  });
}

export default async function LevelPage({ params }: Props) {
  const [locale, { level: slug }] = await Promise.all([resolveLocale(params), params]);
  const level = getLevel(slug);
  if (!level) notFound();
  const [t, common] = await Promise.all([getTranslations('Level'), getTranslations('Common')]);
  const others = educationLevels.filter((entry) => entry.slug !== level.slug);

  return (
    <>
      <section className="pt-10 pb-12">
        <Container>
          <Link
            href="/education"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t('back')}
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge variant={level.slug}>{level.short}</Badge>
              <h1 className="mt-4 text-5xl font-bold tracking-tight [font-stretch:85%]">
                {pick(level.robotName, locale)}
              </h1>
              <p className="text-primary mt-2 text-lg font-semibold">
                {pick(level.name, locale)}, {pick(level.ageRange, locale).toLowerCase()}
              </p>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {pick(level.summary, locale)}
              </p>
            </div>
            <div className="border-border bg-surface rounded-xl border p-10">
              <RobotIllustration
                kind={level.slug}
                label={pick(level.robotName, locale)}
                className="mx-auto max-w-72"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{t('highlights')}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {level.highlights.map((highlight) => (
                <li key={highlight.en} className="flex gap-3">
                  <Check className="text-subak mt-0.5 size-5 shrink-0" aria-hidden />
                  {pick(highlight, locale)}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 text-2xl font-semibold">{pick(level.hardware.title, locale)}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {level.hardware.items.map((item) => (
                <li key={item.en}>
                  <Badge variant="outline">{pick(item, locale)}</Badge>
                </li>
              ))}
            </ul>
            <dl className="mt-12 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">{t('programming')}</dt>
                <dd className="text-muted-foreground mt-1 text-sm">
                  {pick(level.programming, locale)}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t('simulation')}</dt>
                <dd className="text-muted-foreground mt-1 text-sm">
                  {pick(level.simulation, locale)}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{t('modules')}</h2>
            <ol className="divide-border border-border mt-5 divide-y border-y">
              {level.modules.map((lesson, index) => (
                <li key={lesson.en} className="flex gap-4 py-3">
                  <span className="font-display text-primary w-6 font-bold tabular-nums">
                    {index + 1}
                  </span>
                  {pick(lesson, locale)}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="dark border-border bg-background text-foreground rounded-xl border p-8 sm:p-12">
            <h2 className="text-3xl font-semibold">{t('demoTitle')}</h2>
            {level.playgroundTrack ? (
              <>
                <p className="text-muted-foreground mt-3 max-w-2xl">{t('demoBody')}</p>
                <ExternalButton
                  className="mt-6"
                  href={demoUrl(
                    { app: 'playground', path: `?track=${level.playgroundTrack}` },
                    locale,
                  )}
                  newTabLabel={common('newTab')}
                >
                  {common('openDemo')}
                </ExternalButton>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mt-3 max-w-2xl">{t('demoSoon')}</p>
                <Button asChild className="mt-6">
                  <Link href="/contact">{common('requestQuote')}</Link>
                </Button>
              </>
            )}
          </div>
          <nav aria-label={t('otherLevels')} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-muted-foreground text-sm font-semibold">{t('otherLevels')}</span>
            {others.map((other) => (
              <Button key={other.slug} asChild variant="outline" size="sm">
                <Link href={`/education/${other.slug}`}>
                  {other.short}: {pick(other.robotName, locale)}
                </Link>
              </Button>
            ))}
          </nav>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
