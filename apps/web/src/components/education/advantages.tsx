import { eduAdvantages, type EduAdvantageIcon, type Locale } from '@taksu/content';
import { BookOpen, Cpu, LifeBuoy, Monitor, Puzzle, Wrench, type LucideIcon } from 'lucide-react';
import { FeatureGrid } from '../shared/feature-grid';

const icons: Record<EduAdvantageIcon, LucideIcon> = {
  simulator: Monitor,
  custom: Puzzle,
  build: Wrench,
  curriculum: BookOpen,
  kka: Cpu,
  support: LifeBuoy,
};

export function EduAdvantages({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <FeatureGrid
      className={className}
      items={eduAdvantages.map((item) => ({
        id: item.id,
        icon: icons[item.id],
        title: item.title[locale],
        body: item.body[locale],
      }))}
    />
  );
}
