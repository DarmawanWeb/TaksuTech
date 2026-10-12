import { type DemoEntry, demos, type Locale, pick } from '@taksu/content';
import { RobotIllustration, type RobotIllustrationKind } from '@taksu/ui/brand/robot-illustration';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/shared/container';
import { ExternalButton } from '@/components/shared/external-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { demoUrl, kioskLauncherUrl } from '@/lib/links';
import { localeFromParams, resolveLocale } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await localeFromParams(params);
  const t = await getTranslations({ locale, namespace: 'Demo' });
  return pageMetadata({
    locale,
    path: '/demo',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

function illustrationFor(demo: DemoEntry): RobotIllustrationKind {
  return demo.robot ?? demo.track ?? 'kiosk';
}

async function DemoList({ items, locale }: { items: DemoEntry[]; locale: Locale }) {
  const common = await getTranslations('Common');
  return (
    <ul className="mt-10 grid gap-6 md:grid-cols-2">
      {items.map((demo) => (
        <li key={demo.id} className="border-border bg-surface flex gap-6 rounded-xl border p-6">
          <RobotIllustration kind={illustrationFor(demo)} className="w-24 shrink-0" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{pick(demo.title, locale)}</h3>
            <p className="text-muted-foreground mt-1 flex-1 text-sm">
              {pick(demo.description, locale)}
            </p>
            <ExternalButton
              href={demoUrl(demo, locale)}
              variant="outline"
              size="sm"
              className="mt-4 self-start"
              newTabLabel={common('newTab')}
            >
              {common('openDemo')}
            </ExternalButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function DemoPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const [t, common] = await Promise.all([getTranslations('Demo'), getTranslations('Common')]);

  return (
    <>
      <section className="pt-16 pb-6">
        <Container>
          <SectionHeading as="h1" aksara="Démo" title={t('title')} intro={t('intro')} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <SectionHeading title={t('kioskTitle')} intro={t('kioskIntro')} />
          <DemoList items={demos.filter((demo) => demo.app === 'kiosk')} locale={locale} />
          <div className="dark border-border bg-background text-foreground mt-8 flex flex-col gap-4 rounded-xl border p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">{t('launcherTitle')}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{t('launcherBody')}</p>
            </div>
            <ExternalButton href={kioskLauncherUrl(locale)} newTabLabel={common('newTab')}>
              {t('launcherCta')}
            </ExternalButton>
          </div>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <SectionHeading title={t('simTitle')} intro={t('simIntro')} />
          <DemoList items={demos.filter((demo) => demo.app === 'sim')} locale={locale} />
          <p className="text-muted-foreground mt-10 text-sm">{t('tip')}</p>
        </Container>
      </section>
    </>
  );
}
