import { aksaraRegulation, type Locale, pick, receptionProcess } from '@taksu/content';
import { RobotFace } from '@taksu/ui/brand/robot-face';
import { Button } from '@taksu/ui/components/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ReceptionFeatures } from '@/components/reception/features';
import { RobotCards } from '@/components/reception/robot-cards';
import { UseCases } from '@/components/reception/use-cases';
import { Container } from '@/components/shared/container';
import { CtaBand } from '@/components/shared/cta-band';
import { ExternalButton } from '@/components/shared/external-button';
import { PawukonToday } from '@/components/shared/pawukon-today';
import { SectionHeading } from '@/components/shared/section-heading';
import { Steps } from '@/components/shared/steps';
import { Link } from '@/i18n/navigation';
import { images } from '@/lib/images';
import { demoUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Reception' });
  return pageMetadata({
    locale,
    path: '/reception',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

function localizeSteps(locale: Locale) {
  return receptionProcess.map((step) => ({
    id: step.id,
    title: pick(step.title, locale),
    body: pick(step.body, locale),
  }));
}

export default async function ReceptionPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Reception'), getTranslations('Common')]);
  const voiceDemo = demoUrl({ app: 'kiosk', path: '/snow/resort' }, locale);

  return (
    <>
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <div>
            <h1 className="text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.03] font-bold tracking-tight [font-stretch:82%]">
              {t('hero.title')}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {t('hero.body')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={voiceDemo} size="lg" newTabLabel={common('newTab')}>
                {t('hero.ctaDemo')}
              </ExternalButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/reception/compare">{t('hero.ctaCompare')}</Link>
              </Button>
            </div>
          </div>
          <div className="border-border overflow-hidden rounded-xl border shadow-2xl">
            <Image
              src={images.snowTimoBali}
              alt={t('hero.imageAlt')}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            aksara="Pilih résépsionis"
            title={t('robots.title')}
            intro={t('robots.intro')}
          />
          <div className="mt-10">
            <RobotCards locale={locale} />
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <div className="dark border-border bg-background text-foreground grid items-center gap-10 overflow-hidden rounded-xl border p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <RobotFace
              variant="kiosk"
              mood="speaking"
              label={t('voice.title')}
              className="mx-auto max-w-72"
            />
            <div>
              <h2 className="text-3xl font-semibold [font-stretch:90%] sm:text-4xl">
                {t('voice.title')}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                {t('voice.body')}
              </p>
              <ExternalButton href={voiceDemo} className="mt-6" newTabLabel={common('newTab')}>
                {t('voice.cta')}
              </ExternalButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            aksara="Aplikasi kios"
            title={t('features.title')}
            intro={t('features.intro')}
          />
          <ReceptionFeatures locale={locale} className="mt-12" />
        </Container>
      </section>

      <section className="border-border bg-surface border-y py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              aksara="Aksara Bali"
              title={t('aksara.title')}
              intro={t('aksara.intro')}
            />
            <blockquote className="border-primary mt-8 border-l-4 pl-5">
              <p className="leading-relaxed">{aksaraRegulation.rule[locale]}</p>
              <footer className="text-muted-foreground mt-2 text-sm font-semibold">
                {aksaraRegulation.pergub}
              </footer>
            </blockquote>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/reception/aksara-bali">{t('aksara.signageTitle')}</Link>
            </Button>
          </div>
          <div>
            <SectionHeading title={t('bali.title')} intro={t('bali.intro')} />
            <PawukonToday />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            aksara="Tempat kerja robot"
            title={t('useCases.title')}
            intro={t('useCases.intro')}
          />
          <div className="mt-10">
            <UseCases locale={locale} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            aksara="Cara masang"
            title={t('process.title')}
            intro={t('process.intro')}
          />
          <Steps className="mt-12" steps={localizeSteps(locale)} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
