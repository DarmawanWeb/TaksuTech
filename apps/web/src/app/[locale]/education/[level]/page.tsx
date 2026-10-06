import { educationLevels, getLevel, guides, pick } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { ArrowLeft, Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { Link } from '@/i18n/navigation';
import { levelImages } from '@/lib/images';
import { simulatorUrl } from '@/lib/links';
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
    title: `${pick(level.productName, locale)} ${level.short}`,
    description: pick(level.summary, locale),
  });
}

export default async function LevelPage({ params }: Props) {
  const [locale, { level: slug }] = await Promise.all([resolveLocale(params), params]);
  const level = getLevel(slug);
  if (!level) notFound();
  const [t, common] = await Promise.all([getTranslations('Edu.level'), getTranslations('Common')]);
  const levelGuides = guides.filter((guide) => guide.levels.includes(level.slug));
  const others = educationLevels.filter((entry) => entry.slug !== level.slug);
  const name = pick(level.productName, locale);

  return (
    <>
      <section className="bg-grid pt-10 pb-14">
        <Container>
          <Link
            href="/education"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t('back')}
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge variant={level.slug}>{level.short}</Badge>
              <h1 className="mt-4 text-5xl font-bold tracking-tight [font-stretch:85%]">{name}</h1>
              <p className="text-primary mt-2 text-lg font-semibold">
                {pick(level.name, locale)}, {pick(level.ageRange, locale).toLowerCase()}
              </p>
              <p className="mt-2 font-semibold">{pick(level.tagline, locale)}</p>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {pick(level.summary, locale)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/education/curriculum/${level.slug}`}>
                    {t('curriculumCta', { count: level.meetings })}
                  </Link>
                </Button>
                {level.simTrack ? (
                  <ExternalButton
                    href={simulatorUrl(locale, level.simTrack)}
                    size="lg"
                    variant="outline"
                    newTabLabel={common('newTab')}
                  >
                    {t('simCta')}
                  </ExternalButton>
                ) : null}
              </div>
            </div>
            <div className="border-border bg-surface overflow-hidden rounded-xl border">
              {level.image ? (
                <Image
                  src={levelImages[level.image]}
                  alt={t('imageAlt', { name })}
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="h-auto w-full"
                />
              ) : (
                <div className="p-10">
                  <RobotIllustration kind={level.slug} label={name} className="mx-auto max-w-72" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <div className="border-border bg-surface rounded-xl border p-6">
              <h2 className="text-muted-foreground text-sm font-semibold">{t('build')}</h2>
              <p className="mt-1 text-xl font-semibold">{pick(level.build.label, locale)}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {pick(level.build.body, locale)}
              </p>
              <p className="mt-4 text-sm">
                <span className="font-semibold">{t('controller')}: </span>
                {level.controller}
              </p>
            </div>
            <h2 className="mt-10 text-2xl font-semibold">{t('highlights')}</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {level.highlights.map((highlight) => (
                <li key={highlight.en} className="flex gap-3">
                  <Check className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
                  {pick(highlight, locale)}
                </li>
              ))}
            </ul>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">{t('programming')}</dt>
                <dd className="text-muted-foreground mt-1 text-sm">
                  {pick(level.programming, locale)}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">{t('simulator')}</dt>
                <dd className="text-muted-foreground mt-1 text-sm">
                  {pick(level.simulator, locale)}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{t('components')}</h2>
            <div className="mt-5 flex flex-col gap-6">
              {level.components.map((group) => (
                <div key={group.group.en}>
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {pick(group.group, locale)}
                  </h3>
                  <ul className="divide-border border-border mt-2 divide-y border-y">
                    {group.items.map((item) => (
                      <li key={item.en} className="py-2.5 text-sm">
                        {pick(item, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {levelGuides.length > 0 ? (
        <section className="py-10">
          <Container>
            <h2 className="text-2xl font-semibold">{t('guides')}</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {levelGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/education/guides/${guide.slug}`}
                    className="border-border bg-surface hover:border-primary block h-full rounded-xl border p-5"
                  >
                    <span className="font-semibold">{pick(guide.title, locale)}</span>
                    <span className="text-muted-foreground mt-1 block text-sm">
                      {pick(guide.summary, locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <nav aria-label={t('otherLevels')} className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground text-sm font-semibold">
                {t('otherLevels')}
              </span>
              {others.map((other) => (
                <Button key={other.slug} asChild variant="outline" size="sm">
                  <Link href={`/education/${other.slug}`}>
                    {other.short}: {pick(other.productName, locale)}
                  </Link>
                </Button>
              ))}
            </nav>
          </Container>
        </section>
      ) : null}

      <CtaBand ornament={false} />
    </>
  );
}
