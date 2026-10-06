import { pick, robots } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { cn } from '@taksu/ui/lib/utils';
import { CalendarDays, MessagesSquare, Network, Route, ScrollText, Ticket } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpecList } from '@/components/shared/spec-list';
import { Steps } from '@/components/shared/steps';
import { Link } from '@/i18n/navigation';
import { demoUrl, kioskLauncherUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

const processSteps = ['survey', 'mapping', 'install', 'support'] as const;
const softwareItems = [
  { key: 'queue', icon: Ticket },
  { key: 'wayfinding', icon: Route },
  { key: 'organization', icon: Network },
  { key: 'assistant', icon: MessagesSquare },
  { key: 'aksara', icon: ScrollText },
  { key: 'calendar', icon: CalendarDays },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Robots' });
  return pageMetadata({
    locale,
    path: '/robots',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function RobotsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Robots'), getTranslations('Common')]);

  return (
    <>
      <section className="pt-16 pb-8">
        <Container>
          <SectionHeading
            as="h1"
            aksara="Robot résépsionis"
            title={t('title')}
            intro={t('intro')}
          />
        </Container>
      </section>

      {robots.map((robot, index) => (
        <section key={robot.slug} className="py-10">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className={cn(
                'border-border bg-surface rounded-xl border p-10',
                index % 2 === 1 && 'lg:order-2',
              )}
            >
              <RobotIllustration
                kind={robot.slug}
                label={robot.name}
                className="mx-auto max-w-64"
              />
            </div>
            <div>
              <h2 className="text-5xl font-bold tracking-tight [font-stretch:85%]">{robot.name}</h2>
              <p className="text-primary mt-2 text-xl font-semibold">
                {pick(robot.tagline, locale)}
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {pick(robot.summary, locale)}
              </p>
              <h3 className="text-muted-foreground mt-8 mb-2 text-sm font-semibold">
                {t('specsTitle')}
              </h3>
              <SpecList specs={robot.specs.slice(0, 4)} locale={locale} />
              <p className="text-muted-foreground mt-6 mb-2 text-sm font-semibold">
                {t('idealFor')}
              </p>
              <ul className="flex flex-wrap gap-2">
                {robot.idealFor.map((place) => (
                  <li key={place.en}>
                    <Badge variant="outline">{pick(place, locale)}</Badge>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/robots/${robot.slug}`}>{common('viewDetails')}</Link>
                </Button>
                <ExternalButton
                  href={demoUrl({ app: 'kiosk', path: `/${robot.slug}/${robot.demoSite}` }, locale)}
                  variant="outline"
                  newTabLabel={common('newTab')}
                >
                  {common('tryDemo')}
                </ExternalButton>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="py-20">
        <Container>
          <SectionHeading
            aksara="Cara masang robot"
            title={t('process.title')}
            intro={t('process.intro')}
          />
          <Steps
            className="mt-12"
            steps={processSteps.map((key) => ({
              id: key,
              title: t(`process.steps.${key}.title`),
              body: t(`process.steps.${key}.body`),
            }))}
          />
        </Container>
      </section>

      <section className="border-border bg-surface border-y py-20">
        <Container>
          <SectionHeading
            aksara="Piranti lunak kios"
            title={t('software.title')}
            intro={t('software.intro')}
          />
          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {softwareItems.map(({ key, icon: Icon }) => (
              <div key={key}>
                <dt className="flex items-center gap-3 font-semibold">
                  <Icon className="text-primary size-5" aria-hidden />
                  {t(`software.items.${key}.title`)}
                </dt>
                <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`software.items.${key}.body`)}
                </dd>
              </div>
            ))}
          </dl>
          <ExternalButton
            href={kioskLauncherUrl(locale)}
            className="mt-12"
            newTabLabel={common('newTab')}
          >
            {t('softwareCta')}
          </ExternalButton>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
