import { demos, type Locale, pick } from '@taksu/content';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { demoUrl } from '@/lib/links';
import { Container } from '../shared/container';
import { ExternalButton } from '../shared/external-button';
import { SectionHeading } from '../shared/section-heading';

/** One demo per kind of product; the demo page lists the rest. */
const featured = demos.filter(
  (demo) => demo.robot === 'snow' || demo.id === 'kiosk-studio' || demo.app === 'sim',
);

export async function DemoShowcase({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([getTranslations('Home.demos'), getTranslations('Common')]);

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t('title')} intro={t('intro')} />
          <Link
            href="/demo"
            className="shrink-0 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            {t('all')}
          </Link>
        </div>
        <ul className="border-border bg-border mt-10 grid gap-px overflow-hidden rounded-lg border sm:grid-cols-2">
          {featured.map((demo) => (
            <li key={demo.id} className="bg-background flex flex-col gap-4 p-6 sm:p-7">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{pick(demo.title, locale)}</h3>
                <p className="text-muted-foreground mt-1 text-[0.9375rem]">
                  {pick(demo.description, locale)}
                </p>
              </div>
              <ExternalButton
                href={demoUrl(demo, locale)}
                variant="outline"
                size="sm"
                className="self-start"
                newTabLabel={common('newTab')}
              >
                {common('openDemo')}
              </ExternalButton>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
