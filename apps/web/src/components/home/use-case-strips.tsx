import { getRobot, pick, useCases, type Locale, type UseCase } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { Hospital, Hotel, Landmark, Plane, School, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { demoUrl } from '@/lib/links';
import { Container } from '../shared/container';
import { ExternalButton } from '../shared/external-button';
import { SectionHeading } from '../shared/section-heading';

const icons: Record<UseCase['icon'], LucideIcon> = {
  hotel: Hotel,
  office: Landmark,
  hospital: Hospital,
  airport: Plane,
  school: School,
};

/** Use cases drawn as lontar leaves: long palm-leaf strips with a binding hole. */
export async function UseCaseStrips({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([
    getTranslations('Home.useCases'),
    getTranslations('Common'),
  ]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading aksara="Tempat kerja robot" title={t('title')} intro={t('intro')} />
        <ul className="mt-10 flex flex-col gap-3">
          {useCases.map((useCase) => {
            const Icon = icons[useCase.icon];
            const robot = getRobot(useCase.robot);
            return (
              <li
                key={useCase.id}
                className="border-border bg-surface grid items-center gap-4 rounded-[2.5rem] border px-6 py-5 sm:grid-cols-[auto_1fr_auto] sm:px-8"
              >
                <span className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="border-border bg-background size-3 rounded-full border-2"
                  />
                  <Icon className="text-primary size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold">{pick(useCase.title, locale)}</h3>
                  <p className="text-muted-foreground text-sm">{pick(useCase.body, locale)}</p>
                </div>
                {useCase.demoSite ? (
                  <ExternalButton
                    href={demoUrl(
                      { app: 'kiosk', path: `/${useCase.robot}/${useCase.demoSite}` },
                      locale,
                    )}
                    variant="ghost"
                    size="sm"
                    newTabLabel={common('newTab')}
                  >
                    {t('demoLink')}
                  </ExternalButton>
                ) : (
                  <Badge variant="outline">{robot?.name}</Badge>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
