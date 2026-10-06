import {
  afterSales,
  competitions,
  educationLevels,
  learningPath,
  pick,
  syllabusMeetings,
  upgradePath,
  type LevelSlug,
} from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { cn } from '@taksu/ui/lib/utils';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { SectionHeading } from '@/components/shared/section-heading';
import { Steps } from '@/components/shared/steps';
import { Link } from '@/i18n/navigation';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

const levelBand: Record<LevelSlug, string> = {
  sd: 'bg-level-sd',
  smp: 'bg-level-smp',
  sma: 'bg-level-sma',
};

const modularParts = ['chassis', 'sensor', 'actuator', 'communication'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Education' });
  return pageMetadata({
    locale,
    path: '/education',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function EducationPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Education');
  const localizeSteps = (steps: typeof learningPath) =>
    steps.map((step) => ({
      id: step.id,
      title: pick(step.title, locale),
      body: pick(step.body, locale),
    }));

  return (
    <>
      <section className="pt-16 pb-8">
        <Container>
          <SectionHeading as="h1" aksara="Robot édukasi" title={t('title')} intro={t('intro')} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <h2 className="sr-only">{t('levelsTitle')}</h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {educationLevels.map((level) => (
              <li
                key={level.slug}
                className="border-border bg-surface flex flex-col overflow-hidden rounded-xl border"
              >
                <div className={cn('h-2', levelBand[level.slug])} />
                <div className="flex flex-1 flex-col p-7">
                  <RobotIllustration kind={level.slug} className="mx-auto max-w-44" />
                  <Badge variant={level.slug} className="mt-6 self-start">
                    {level.short}
                  </Badge>
                  <h3 className="mt-3 text-2xl font-semibold">{pick(level.robotName, locale)}</h3>
                  <p className="text-muted-foreground text-sm font-semibold">
                    {pick(level.name, locale)}, {pick(level.ageRange, locale).toLowerCase()}
                  </p>
                  <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                    {pick(level.summary, locale)}
                  </p>
                  <Button asChild variant="outline" className="mt-6 self-start">
                    <Link href={`/education/${level.slug}`}>
                      {t('viewLevel', { level: level.short })}
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading aksara="Alur belajar" title={t('pathTitle')} intro={t('pathIntro')} />
          <Steps className="mt-12" steps={localizeSteps(learningPath)} />
        </Container>
      </section>

      <section className="border-border bg-surface border-y py-20">
        <Container>
          <SectionHeading
            aksara="Sistém modular"
            title={t('modularTitle')}
            intro={t('modularIntro')}
          />
          <p className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold">
            {modularParts.map((part, index) => (
              <Fragment key={part}>
                {index > 0 ? (
                  <span aria-hidden className="text-primary text-xl">
                    +
                  </span>
                ) : null}
                <span className="border-border bg-background rounded-full border px-4 py-2">
                  {t(`modular.${part}`)}
                </span>
              </Fragment>
            ))}
            <span aria-hidden className="text-primary text-xl">
              =
            </span>
            <span className="bg-primary text-primary-foreground rounded-full px-4 py-2">
              {t('modular.result')}
            </span>
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            aksara="Jalur upgrade"
            title={t('upgradeTitle')}
            intro={t('upgradeIntro')}
          />
          <Steps className="mt-12 lg:grid-cols-3" steps={localizeSteps(upgradePath)} />
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeading
              aksara="Purnajual"
              title={t('supportTitle')}
              intro={t('supportIntro')}
            />
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              {afterSales.map((item) => (
                <div key={item.id}>
                  <dt className="font-semibold">{pick(item.title, locale)}</dt>
                  <dd className="text-muted-foreground mt-1 text-sm">{pick(item.body, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside className="border-border bg-surface self-start rounded-xl border p-8">
            <h2 className="text-2xl font-semibold">{t('syllabusTitle')}</h2>
            <p className="text-muted-foreground mt-3">
              {t('syllabusBody', {
                meetings: syllabusMeetings,
                competitions: competitions.join(', '),
              })}
            </p>
            <ul className="mt-6 flex gap-2">
              {competitions.map((competition) => (
                <li key={competition}>
                  <Badge variant="gold">{competition}</Badge>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
