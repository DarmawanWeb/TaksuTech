import { getRobot, getSite, pick, robots, specSourceNote } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { SpecList } from '@/components/shared/spec-list';
import { Link } from '@/i18n/navigation';
import { demoUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return robots.map((robot) => ({ slug: robot.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([localeFromParams(params), params]);
  const robot = getRobot(slug);
  if (!robot) return {};
  return pageMetadata({
    locale,
    path: `/robots/${robot.slug}`,
    title: robot.name,
    description: pick(robot.summary, locale),
  });
}

export default async function RobotPage({ params }: Props) {
  const [locale, { slug }] = await Promise.all([resolveLocale(params), params]);
  const robot = getRobot(slug);
  if (!robot) notFound();
  const site = getSite(robot.demoSite);
  const [t, common] = await Promise.all([
    getTranslations('RobotDetail'),
    getTranslations('Common'),
  ]);

  return (
    <>
      <section className="pt-10 pb-16">
        <Container>
          <Link
            href="/robots"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t('back')}
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border-border bg-surface rounded-xl border p-10">
              <RobotIllustration
                kind={robot.slug}
                label={robot.name}
                className="mx-auto max-w-64"
              />
            </div>
            <div>
              <h1 className="text-6xl font-bold tracking-tight [font-stretch:82%]">{robot.name}</h1>
              <p className="text-primary mt-3 text-2xl font-semibold">
                {pick(robot.tagline, locale)}
              </p>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {pick(robot.summary, locale)}
              </p>
              <p className="text-muted-foreground mt-3">{pick(robot.appearance, locale)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">{common('requestQuote')}</Link>
                </Button>
                <ExternalButton
                  size="lg"
                  variant="outline"
                  href={demoUrl({ app: 'kiosk', path: `/${robot.slug}/${robot.demoSite}` }, locale)}
                  newTabLabel={common('newTab')}
                >
                  {common('tryDemo')}
                </ExternalButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-semibold">{t('specs')}</h2>
            <SpecList specs={robot.specs} locale={locale} />
            <p className="text-muted-foreground mt-4 text-xs">
              <span className="font-semibold">{t('sourceTitle')}: </span>
              {pick(specSourceNote, locale)}
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-semibold">{t('features', { name: robot.name })}</h2>
            <ul className="flex flex-col gap-6">
              {robot.features.map((feature) => (
                <li key={feature.title.en} className="border-primary border-l-2 pl-4">
                  <h3 className="font-semibold">{pick(feature.title, locale)}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {pick(feature.body, locale)}
                  </p>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 mb-3 text-lg font-semibold">{t('idealFor')}</h2>
            <ul className="flex flex-wrap gap-2">
              {robot.idealFor.map((place) => (
                <li key={place.en}>
                  <Badge variant="outline">{pick(place, locale)}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {site ? (
        <section className="py-12">
          <Container>
            <div className="dark border-border bg-background text-foreground rounded-xl border p-8 sm:p-12">
              <h2 className="text-3xl font-semibold">{t('demoTitle', { name: robot.name })}</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl">
                {t('demoBody', { name: robot.name, site: site.name })}
              </p>
              <ExternalButton
                className="mt-6"
                href={demoUrl({ app: 'kiosk', path: `/${robot.slug}/${site.slug}` }, locale)}
                newTabLabel={common('newTab')}
              >
                {common('openDemo')}
              </ExternalButton>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
