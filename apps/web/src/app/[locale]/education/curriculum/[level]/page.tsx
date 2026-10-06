import {
  curricula,
  educationLevels,
  getLevel,
  getSimMission,
  meetingCount,
  pick,
  sdTiers,
} from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { Link } from '@/i18n/navigation';
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
  const t = await getTranslations({ locale, namespace: 'Edu.curriculum' });
  return pageMetadata({
    locale,
    path: `/education/curriculum/${level.slug}`,
    title: t('viewLevel', { level: level.short }),
    description: t('metaDescription'),
  });
}

export default async function LevelCurriculumPage({ params }: Props) {
  const [locale, { level: slug }] = await Promise.all([resolveLocale(params), params]);
  const level = getLevel(slug);
  if (!level) notFound();
  const curriculum = curricula[level.slug];
  const [t, common] = await Promise.all([
    getTranslations('Edu.curriculum'),
    getTranslations('Common'),
  ]);
  const firstMeeting = curriculum.modules.map((_, index) =>
    curriculum.modules.slice(0, index).reduce((total, module) => total + module.meetings.length, 1),
  );

  return (
    <>
      <section className="bg-grid pt-10 pb-10">
        <Container>
          <Link
            href="/education/curriculum"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t('title')}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant={level.slug}>{level.short}</Badge>
            <span className="text-muted-foreground text-sm">
              {common('meetings', { count: meetingCount(curriculum) })},{' '}
              {t('perMeeting', { count: curriculum.minutesPerMeeting })}
            </span>
          </div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight [font-stretch:85%]">
            {t('viewLevel', { level: pick(level.productName, locale) })}
          </h1>
        </Container>
      </section>

      <section className="py-8">
        <Container className={level.slug === 'sd' ? 'grid gap-6 lg:grid-cols-2' : 'grid gap-6'}>
          <div className="border-border bg-surface rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{t('kkaTitle')}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{t('kkaIntro')}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm">
              {curriculum.kka.map((item) => (
                <li key={item.en}>{pick(item, locale)}</li>
              ))}
            </ul>
          </div>
          {level.slug === 'sd' ? (
            <div className="border-border bg-surface rounded-xl border p-6">
              <h2 className="text-xl font-semibold">{t('tiersTitle')}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{t('tiersIntro')}</p>
              <dl className="mt-4 space-y-3 text-sm">
                {sdTiers.map((tier) => (
                  <div key={tier.id}>
                    <dt className="font-semibold">{pick(tier.title, locale)}</dt>
                    <dd className="text-muted-foreground">
                      {pick(tier.approach, locale)} {t('target')}: {pick(tier.target, locale)}.
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="py-8">
        <Container className="flex flex-col gap-8">
          {curriculum.modules.map((module, moduleIndex) => {
            const mission = module.simMission ? getSimMission(module.simMission) : undefined;
            return (
              <article
                key={module.id}
                className="border-border bg-surface overflow-hidden rounded-xl border"
              >
                <header className="border-border grid gap-6 border-b p-6 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <p className="font-display text-primary text-sm font-bold">
                      {moduleIndex + 1} / {curriculum.modules.length}
                    </p>
                    <h2 className="text-2xl font-semibold">{pick(module.title, locale)}</h2>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">{t('goal')}: </span>
                      {pick(module.goal, locale)}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {module.concepts.map((concept) => (
                        <li key={concept.en}>
                          <Badge variant="muted">{pick(concept, locale)}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-semibold">{t('evidence')}: </span>
                      {pick(module.evidence, locale)}
                    </p>
                    {mission ? (
                      <p className="mt-3">
                        <span className="font-semibold">{t('simMission')}: </span>
                        <a
                          href={simulatorUrl(locale, mission.robot, mission.id)}
                          target="_blank"
                          rel="noopener"
                          className="text-primary font-semibold hover:underline"
                        >
                          {pick(mission.title, locale)}
                        </a>
                      </p>
                    ) : null}
                  </div>
                </header>
                <ol className="divide-border divide-y">
                  {module.meetings.map((meeting, meetingIndex) => {
                    const meetingNumber = (firstMeeting[moduleIndex] ?? 1) + meetingIndex;
                    return (
                      <li
                        key={meeting.title.en}
                        className="grid gap-1 px-6 py-3 text-sm sm:grid-cols-[8rem_1fr_1.4fr] sm:gap-4"
                      >
                        <span className="font-display text-primary font-bold tabular-nums">
                          {t('meeting', { n: meetingNumber })}
                        </span>
                        <span className="font-semibold">{pick(meeting.title, locale)}</span>
                        <span className="text-muted-foreground">
                          {pick(meeting.activity, locale)}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </article>
            );
          })}
          <Link
            href="/education/guides/panduan-guru"
            className="text-primary self-start font-semibold hover:underline"
          >
            {t('guideCta')}
          </Link>
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
