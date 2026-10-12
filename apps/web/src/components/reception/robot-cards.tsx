import { type Locale, pick, type ReceptionRobot, robots } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { demoUrl } from '@/lib/links';
import { ExternalButton } from '../shared/external-button';

export const priceKey = (robot: ReceptionRobot) =>
  robot.priceTier === 1 ? 'low' : robot.priceTier === 2 ? 'mid' : 'high';

export async function RobotCards({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([
    getTranslations('Reception.robots'),
    getTranslations('Common'),
  ]);
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {robots.map((robot) => (
        <li
          key={robot.slug}
          className="border-border bg-surface flex flex-col rounded-xl border p-6"
        >
          <div className="bg-surface-muted rounded-lg px-10 pt-6">
            <RobotIllustration kind={robot.slug} label={robot.name} className="mx-auto max-w-44" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="gold">{pick(robot.edition, locale)}</Badge>
            <Badge variant="outline">{robot.kind === 'static' ? t('static') : t('mobile')}</Badge>
          </div>
          <h3 className="mt-3 text-3xl font-bold [font-stretch:85%]">{robot.name}</h3>
          <p className="text-primary mt-1 font-semibold">{pick(robot.tagline, locale)}</p>
          <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
            {pick(robot.summary, locale)}
          </p>
          <ul className="mt-5 flex flex-col gap-1.5 text-sm">
            {robot.capabilities.escort ? <li>{t('escort')}</li> : null}
            <li>
              {robot.capabilities.printer === 'built-in'
                ? t('printerBuiltIn')
                : t('printerStation')}
            </li>
            <li className="font-semibold">{t('price', { tier: priceKey(robot) })}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href={`/reception/${robot.slug}`}>{common('viewDetails')}</Link>
            </Button>
            <ExternalButton
              size="sm"
              variant="outline"
              href={demoUrl({ app: 'kiosk', path: `/${robot.slug}/${robot.demoSite}` }, locale)}
              newTabLabel={common('newTab')}
            >
              {common('tryDemo')}
            </ExternalButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
