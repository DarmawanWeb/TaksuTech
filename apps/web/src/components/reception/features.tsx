import { type Locale, type ReceptionFeatureIcon, receptionFeatures } from '@taksu/content';
import {
  BookOpen,
  CalendarDays,
  type LucideIcon,
  Mic,
  Network,
  Printer,
  Puzzle,
  Route,
  ScrollText,
} from 'lucide-react';
import { FeatureGrid } from '../shared/feature-grid';

const icons: Record<ReceptionFeatureIcon, LucideIcon> = {
  aksara: ScrollText,
  voice: Mic,
  print: Printer,
  guestbook: BookOpen,
  route: Route,
  org: Network,
  calendar: CalendarDays,
  custom: Puzzle,
};

export function ReceptionFeatures({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <FeatureGrid
      className={className}
      items={receptionFeatures.map((feature) => ({
        id: feature.id,
        icon: icons[feature.id],
        title: feature.title[locale],
        body: feature.body[locale],
      }))}
    />
  );
}
