import { pick, serviceProcess, services } from '@taksu/content';
import { Button } from '@taksu/ui/components/button';
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
  const t = await getTranslations({ locale, namespace: 'Services' });
  return pageMetadata({
    locale,
    path: '/services',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

const contactCustom = { pathname: '/contact', query: { topic: 'custom' } } as const;

export default async function ServicesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Services');

  return (
    <>
      <section className="pt-14 pb-8 lg:pt-20">
        <Container>
          <h1 className="max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-3xl text-xl leading-relaxed">
            {t('intro')}
          </p>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="border-border divide-border divide-y border-y">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="grid scroll-mt-20 gap-6 py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <h2 className="text-2xl leading-tight font-semibold sm:text-3xl">
                    {pick(service.title, locale)}
                  </h2>
                  <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                    {pick(service.summary, locale)}
                  </p>
                </div>
                <div className="lg:col-span-7 lg:pt-1.5">
                  <h3 className="text-muted-foreground text-sm font-semibold">
                    {t('examplesTitle')}
                  </h3>
                  <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {service.examples.map((example) => (
                      <li key={example.en} className="flex gap-3">
                        <span
                          aria-hidden
                          className="bg-accent mt-[0.6em] size-1.5 shrink-0 rounded-full"
                        />
                        {pick(example, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="bg-surface-muted mt-10 flex flex-col gap-5 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold">{t('otherTitle')}</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">{t('otherBody')}</p>
            </div>
            <Button asChild variant="outline" className="shrink-0 self-start sm:self-center">
              <Link href={contactCustom}>{t('otherCta')}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading title={t('processTitle')} />
          <ol className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {serviceProcess.map((step, index) => (
              <li key={step.id} className="border-border border-t pt-5">
                <span
                  aria-hidden
                  className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-sm font-semibold"
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{pick(step.title, locale)}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {pick(step.body, locale)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title={t('cta.title')}
        body={t('cta.body')}
        button={t('cta.button')}
        href={contactCustom}
      />
    </>
  );
}
