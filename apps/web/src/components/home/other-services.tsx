import { type Locale, pick, services } from '@taksu/content';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../shared/container';
import { SectionHeading } from '../shared/section-heading';

/** Custom work beyond the two product lines: kept short so the lines stay the main story. */
export async function OtherServices({ locale }: { locale: Locale }) {
  const t = await getTranslations('Home.services');
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t('title')} intro={t('intro')} />
          <Link
            href="/services"
            className="shrink-0 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {t('more')}
          </Link>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="border-border border-t pt-5">
              <h3 className="text-xl font-semibold">{pick(service.title, locale)}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {pick(service.summary, locale)}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 text-[0.9375rem]">
                {service.examples.slice(0, 3).map((example) => (
                  <li key={example.en} className="flex gap-3">
                    <span
                      aria-hidden
                      className="bg-accent mt-[0.6em] size-1.5 shrink-0 rounded-full"
                    />
                    {pick(example, locale)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="border-border bg-background mt-12 flex flex-col gap-5 rounded-lg border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-2xl leading-relaxed">
            <span className="font-semibold">{t('otherTitle')}</span>{' '}
            <span className="text-muted-foreground">{t('otherBody')}</span>
          </p>
          <Button asChild variant="outline" className="shrink-0 self-start sm:self-center">
            <Link href={{ pathname: '/contact', query: { topic: 'custom' } }}>{t('otherCta')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
