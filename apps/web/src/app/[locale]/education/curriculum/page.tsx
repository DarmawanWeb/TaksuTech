import { curricula, educationLevels, meetingCount, pick, rubric } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { SectionHeading } from '@/components/shared/section-heading';
import { Link } from '@/i18n/navigation';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Edu.curriculum' });
  return pageMetadata({
    locale,
    path: '/education/curriculum',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function CurriculumPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([
    getTranslations('Edu.curriculum'),
    getTranslations('Common'),
  ]);
  return (
    <>
      <section className="bg-grid pt-16 pb-10">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {educationLevels.map((level) => {
              const curriculum = curricula[level.slug];
              return (
                <li
                  key={level.slug}
                  className="border-border bg-surface flex flex-col rounded-xl border p-6"
                >
                  <Badge variant={level.slug} className="self-start">
                    {level.short}
                  </Badge>
                  <h2 className="mt-3 text-2xl font-semibold">{level.kit}</h2>
                  <p className="text-muted-foreground text-sm">
                    {common('meetings', { count: meetingCount(curriculum) })},{' '}
                    {t('perMeeting', { count: curriculum.minutesPerMeeting })}
                  </p>
                  <ol className="mt-5 flex-1 space-y-1.5 text-sm">
                    {curriculum.modules.map((module, index) => (
                      <li key={module.id} className="flex gap-2">
                        <span className="font-display text-primary w-5 font-bold tabular-nums">
                          {index + 1}
                        </span>
                        {pick(module.title, locale)}
                      </li>
                    ))}
                  </ol>
                  <Link
                    href={`/education/curriculum/${level.slug}`}
                    className="text-primary mt-6 font-semibold hover:underline"
                  >
                    {t('viewLevel', { level: level.short })}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
      <section className="py-14">
        <Container>
          <SectionHeading title={t('rubricTitle')} intro={t('rubricIntro')} />
          <div className="border-border bg-surface mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-border border-b">
                  <th scope="col" className="p-4 font-semibold">
                    {t('criteria')}
                  </th>
                  {rubric.levels.map((band, index) => (
                    <th
                      key={band.en}
                      scope="col"
                      className="text-muted-foreground p-4 font-semibold"
                    >
                      {index + 1}. {pick(band, locale)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rubric.criteria.map((criterion) => (
                  <tr key={criterion.en} className="border-border border-b last:border-0">
                    <th scope="row" className="p-4 font-semibold">
                      {pick(criterion, locale)}
                    </th>
                    {rubric.levels.map((band) => (
                      <td key={band.en} className="p-4">
                        <span aria-hidden className="bg-primary/15 block h-1.5 rounded-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
