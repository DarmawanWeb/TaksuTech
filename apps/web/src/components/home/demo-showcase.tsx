import { demos, type Locale, pick } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { getTranslations } from 'next-intl/server';
import { demoUrl, kioskLauncherUrl } from '@/lib/links';
import { Container } from '../shared/container';
import { ExternalButton } from '../shared/external-button';
import { SectionHeading } from '../shared/section-heading';

export async function DemoShowcase({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([getTranslations('Home.demos'), getTranslations('Common')]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={t('title')} intro={t('intro')} />
        <ul className="divide-border border-border mt-10 divide-y border-y">
          {demos.map((demo) => (
            <li
              key={demo.id}
              className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6"
            >
              <Badge
                variant={demo.app === 'kiosk' ? 'gold' : 'muted'}
                className="self-start sm:self-center"
              >
                {demo.app === 'kiosk' ? t('kiosk') : t('sim')}
              </Badge>
              <div>
                <h3 className="text-lg font-semibold">{pick(demo.title, locale)}</h3>
                <p className="text-muted-foreground text-sm">{pick(demo.description, locale)}</p>
              </div>
              <ExternalButton
                href={demoUrl(demo, locale)}
                variant="outline"
                newTabLabel={common('newTab')}
              >
                {common('openDemo')}
              </ExternalButton>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <a
            href={kioskLauncherUrl(locale)}
            target="_blank"
            rel="noopener"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            {t('launcher')}
            <span className="sr-only"> {common('newTab')}</span>
          </a>
        </p>
      </Container>
    </section>
  );
}
