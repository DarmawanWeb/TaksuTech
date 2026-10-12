import { getTranslations } from 'next-intl/server';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

const areas = ['hardware', 'software', 'content', 'service'] as const;

/** What the team makes itself, set out like the rows of a spec sheet. */
export async function InHouse() {
  const t = await getTranslations('Home.inHouse');
  return (
    <section className="bg-surface-muted py-20">
      <Container className="grid gap-10 lg:grid-cols-12">
        <SectionHeading title={t('title')} intro={t('intro')} className="lg:col-span-5" />
        <dl className="lg:col-span-7">
          {areas.map((area) => (
            <div
              key={area}
              className="border-border grid gap-1 border-t py-5 first:border-t-0 first:pt-0 sm:grid-cols-[13rem_1fr] sm:gap-6 lg:first:pt-2"
            >
              <dt className="font-display text-lg font-semibold">{t(`areas.${area}.title`)}</dt>
              <dd className="text-muted-foreground leading-relaxed">{t(`areas.${area}.body`)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
