import { customOptions, customPrograms, pick } from '@taksu/content';
import { Button } from '@taksu/ui/components/button';
import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { FramedImage } from '@/components/shared/framed-image';
import { SectionHeading } from '@/components/shared/section-heading';
import { Link } from '@/i18n/navigation';
import { images } from '@/lib/images';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Edu.custom' });
  return pageMetadata({
    locale,
    path: '/education/custom',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function CustomPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Edu.custom');
  return (
    <>
      <section className="bg-grid pt-16 pb-10">
        <Container>
          <SectionHeading as="h1" title={t('title')} intro={t('intro')} />
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <h2 className="text-2xl font-semibold">{t('programsTitle')}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {customPrograms.map((program) => (
              <li key={program.id} className="border-border bg-surface rounded-xl border p-6">
                <h3 className="text-lg font-semibold">{pick(program.title, locale)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {pick(program.body, locale)}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-10">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{t('optionsTitle')}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {customOptions.map((option) => (
                <li key={option.en} className="flex gap-3">
                  <Check className="text-primary mt-0.5 size-5 shrink-0" aria-hidden />
                  {pick(option, locale)}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">{t('cta')}</Link>
            </Button>
          </div>
          <FramedImage src={images.pcbKustom} alt={t('pcbAlt')} caption={t('pcbCaption')} />
        </Container>
      </section>
      <CtaBand ornament={false} />
    </>
  );
}
