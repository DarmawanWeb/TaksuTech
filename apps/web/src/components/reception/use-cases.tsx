import { getRobot, type Locale, pick, type UseCase, useCases } from '@taksu/content';
import { Badge } from '@taksu/ui/components/badge';
import { Hospital, Hotel, Landmark, type LucideIcon, Plane, School } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { demoUrl } from '@/lib/links';
import { ExternalButton } from '../shared/external-button';

const icons: Record<UseCase['icon'], LucideIcon> = {
  hotel: Hotel,
  office: Landmark,
  hospital: Hospital,
  airport: Plane,
  school: School,
};

/** Use cases drawn as lontar leaves: long palm-leaf strips with a binding hole. */
export async function UseCases({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([
    getTranslations('Reception.useCases'),
    getTranslations('Common'),
  ]);
  return (
    <ul className="flex flex-col gap-3">
      {useCases.map((useCase) => {
        const Icon = icons[useCase.icon];
        const lead = useCase.robots[0];
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
              <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs">
                {t('recommended')}:
                {useCase.robots.map((slug) => (
                  <Badge key={slug} variant="outline">
                    {getRobot(slug)?.name}
                  </Badge>
                ))}
              </p>
            </div>
            {useCase.demoSite && lead ? (
              <ExternalButton
                href={demoUrl({ app: 'kiosk', path: `/${lead}/${useCase.demoSite}` }, locale)}
                variant="ghost"
                size="sm"
                newTabLabel={common('newTab')}
              >
                {t('demoLink')}
              </ExternalButton>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
