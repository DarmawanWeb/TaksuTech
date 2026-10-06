import {
  afterSales,
  competitions,
  curricula,
  educationLevels,
  learningPath,
  meetingCount,
  pick,
  simMissions,
  upgradePath,
  type Locale,
} from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { EduAdvantages } from '@/components/education/advantages';
import { LevelCards } from '@/components/education/level-cards';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { Steps } from '@/components/shared/steps';
import { Link } from '@/i18n/navigation';
import { images } from '@/lib/images';
import { simulatorUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Edu' });
  return pageMetadata({
    locale,
    path: '/education',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const localize = (steps: typeof learningPath, locale: Locale) =>
  steps.map((step) => ({
    id: step.id,
    title: pick(step.title, locale),
    body: pick(step.body, locale),
  }));

export default async function EducationPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Edu'), getTranslations('Common')]);

  return (
    <>
      <section className="bg-grid overflow-hidden">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <h1 className="text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.03] font-bold tracking-tight [font-stretch:82%]">
              {t('hero.title')}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {t('hero.body')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={simulatorUrl(locale)} size="lg" newTabLabel={common('newTab')}>
                {t('hero.ctaSim')}
              </ExternalButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">{t('hero.ctaProposal')}</Link>
              </Button>
            </div>
            <ul className="mt-8 flex gap-2">
              {educationLevels.map((level) => (
                <li key={level.slug}>
                  <Badge variant={level.slug}>{level.short}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-border mx-auto max-w-md overflow-hidden rounded-xl border shadow-2xl">
            <Image
              src={images.posterBelajar}
              alt={t('hero.imageAlt')}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t('advantages.title')} intro={t('advantages.intro')} />
          <EduAdvantages locale={locale} className="mt-12" />
        </Container>
      </section>

      <section className="border-border bg-surface border-y py-20">
        <Container>
          <SectionHeading title={t('levels.title')} intro={t('levels.intro')} />
          <div className="mt-10">
            <LevelCards locale={locale} />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t('path.title')} intro={t('path.intro')} />
          <Steps className="mt-12" steps={localize(learningPath, locale)} />
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="border-border bg-surface rounded-xl border p-8">
            <h2 className="text-2xl font-semibold">{t('curriculum.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('curriculum.intro')}</p>
            <ul className="divide-border border-border mt-6 divide-y border-y">
              {educationLevels.map((level) => (
                <li key={level.slug} className="flex items-center justify-between gap-4 py-3">
                  <span className="flex items-center gap-3">
                    <Badge variant={level.slug}>{level.short}</Badge>
                    <span className="text-sm">
                      {common('meetings', { count: meetingCount(curricula[level.slug]) })}
                    </span>
                  </span>
                  <Link
                    href={`/education/curriculum/${level.slug}`}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    {t('curriculum.viewLevel', { level: level.short })}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-border bg-surface rounded-xl border p-8">
            <h2 className="text-2xl font-semibold">{t('simulator.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('simulator.intro')}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {simMissions.slice(0, 6).map((mission) => (
                <li key={mission.id}>
                  <a
                    href={simulatorUrl(locale, mission.robot, mission.id)}
                    target="_blank"
                    rel="noopener"
                    className="border-border bg-background hover:border-primary inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold"
                  >
                    {pick(mission.title, locale)}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/education/simulator">{common('viewAll')}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t('upgrade.title')} intro={t('upgrade.intro')} />
          <Steps className="mt-12 lg:grid-cols-3" steps={localize(upgradePath, locale)} />
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionHeading title={t('support.title')} intro={t('support.intro')} />
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
            <h2 className="text-2xl font-semibold">{t('competitions.title')}</h2>
            <p className="text-muted-foreground mt-3">
              {t('competitions.body', { list: competitions.join(', ') })}
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

      <CtaBand ornament={false} />
    </>
  );
}
