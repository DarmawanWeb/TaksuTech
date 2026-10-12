import { educationLevels, type LevelSlug, type Locale, pick } from '@taksu/content';
import { RobotIllustration } from '@taksu/ui/brand/robot-illustration';
import { Badge } from '@taksu/ui/components/badge';
import { Button } from '@taksu/ui/components/button';
import { cn } from '@taksu/ui/lib/utils';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { levelImages } from '@/lib/images';

export const levelBand: Record<LevelSlug, string> = {
  sd: 'bg-level-sd',
  smp: 'bg-level-smp',
  sma: 'bg-level-sma',
};

export async function LevelCards({ locale }: { locale: Locale }) {
  const [t, common] = await Promise.all([getTranslations('Edu.levels'), getTranslations('Common')]);
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {educationLevels.map((level) => (
        <li
          key={level.slug}
          className="border-border bg-surface flex flex-col overflow-hidden rounded-xl border"
        >
          <div className={cn('h-2', levelBand[level.slug])} />
          {level.image ? (
            <Image
              src={levelImages[level.image]}
              alt={level.kit}
              placeholder="blur"
              sizes="(min-width: 768px) 33vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          ) : (
            <div className="bg-surface-muted flex aspect-[4/3] items-center justify-center p-8">
              <RobotIllustration kind={level.slug} className="max-w-56" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant={level.slug}>{level.short}</Badge>
              <Badge variant="outline">{pick(level.build.label, locale)}</Badge>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">{level.kit}</h3>
            <p className="text-muted-foreground text-sm font-semibold">
              {pick(level.ageRange, locale)}, {common('meetings', { count: level.meetings })}
            </p>
            <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">
              {pick(level.summary, locale)}
            </p>
            <Button asChild variant="outline" className="mt-5 self-start">
              <Link href={`/education/${level.slug}`}>{t('view', { level: level.short })}</Link>
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
