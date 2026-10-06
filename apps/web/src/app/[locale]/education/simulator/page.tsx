import { pick, simMissions, type SimRobot } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { Activity, Code2, Monitor, Radar, ScanLine, Thermometer } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { FeatureGrid } from '@/components/shared/feature-grid';
import { SectionHeading } from '@/components/shared/section-heading';
import { Link } from '@/i18n/navigation';
import { simulatorUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Edu.simulator' });
  return pageMetadata({
    locale,
    path: '/education/simulator',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const featureIcons = [
  { key: 'physics', icon: Activity },
  { key: 'line', icon: ScanLine },
  { key: 'distance', icon: Radar },
  { key: 'outputs', icon: Monitor },
  { key: 'env', icon: Thermometer },
  { key: 'code', icon: Code2 },
] as const;

export default async function SimulatorPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([
    getTranslations('Edu.simulator'),
    getTranslations('Common'),
  ]);
  const robotsList: { id: SimRobot; label: string }[] = [
    { id: 'sd', label: t('robotSd') },
    { id: 'smp', label: t('robotSmp') },
  ];
  return (
    <>
      <section className="bg-grid pt-16 pb-12">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
          <ExternalButton
            href={simulatorUrl(locale)}
            size="lg"
            className="mt-8"
            newTabLabel={common('newTab')}
          >
            {t('cta')}
          </ExternalButton>
        </Container>
      </section>
      <section className="py-14">
        <Container>
          <SectionHeading title={t('featuresTitle')} />
          <FeatureGrid
            className="mt-10"
            items={featureIcons.map(({ key, icon }) => ({
              id: key,
              icon,
              title: t(`features.${key}`),
              body: '',
            }))}
          />
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <SectionHeading title={t('missionsTitle')} />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {robotsList.map((robot) => (
              <div key={robot.id}>
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <Badge variant={robot.id}>{robot.id.toUpperCase()}</Badge>
                  {robot.label}
                </h3>
                <ol className="divide-border border-border bg-surface mt-4 divide-y rounded-xl border">
                  {simMissions
                    .filter((mission) => mission.robot === robot.id)
                    .map((mission) => (
                      <li key={mission.id}>
                        <a
                          href={simulatorUrl(locale, mission.robot, mission.id)}
                          target="_blank"
                          rel="noopener"
                          className="hover:bg-surface-muted flex flex-col gap-1 p-4"
                        >
                          <span className="text-muted-foreground text-xs font-semibold">
                            {t('module', { n: mission.module })}
                          </span>
                          <span className="font-semibold">{pick(mission.title, locale)}</span>
                          <span className="text-muted-foreground text-sm">
                            {pick(mission.brief, locale)}
                          </span>
                        </a>
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <div className="border-border bg-surface rounded-xl border p-8">
            <h2 className="text-2xl font-semibold">{t('trialTitle')}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t('trialBody')}</p>
            <Button asChild className="mt-6">
              <Link href="/contact">{t('trialCta')}</Link>
            </Button>
          </div>
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
