import { educationLevels, guides, pick } from '@taksu/content';
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
  const t = await getTranslations({ locale, namespace: 'Edu.guides' });
  return pageMetadata({
    locale,
    path: '/education/guides',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const shortOf = (slug: string) =>
  educationLevels.find((level) => level.slug === slug)?.short ?? slug;

export default async function GuidesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Edu.guides'), getTranslations('Common')]);
  return (
    <>
      <section className="bg-grid pt-16 pb-10">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/education/guides/${guide.slug}`}
                  className="border-border bg-surface hover:border-primary flex h-full flex-col rounded-xl border p-6"
                >
                  <span className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t(`audience.${guide.audience}`)}</Badge>
                    {guide.levels.map((level) => (
                      <Badge key={level} variant={level}>
                        {shortOf(level)}
                      </Badge>
                    ))}
                  </span>
                  <span className="mt-4 text-xl font-semibold">{pick(guide.title, locale)}</span>
                  <span className="text-muted-foreground mt-2 flex-1 text-sm">
                    {pick(guide.summary, locale)}
                  </span>
                  <span className="text-primary mt-4 text-sm font-semibold">
                    {t('read')} ({common('minutes', { count: guide.minutes })})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
