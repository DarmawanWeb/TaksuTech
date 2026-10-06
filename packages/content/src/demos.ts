import type { Localized } from './i18n';
import { robots, type RobotSlug } from './robots';
import { getSite } from './sites';

export type DemoApp = 'kiosk' | 'playground';

export interface DemoEntry {
  id: string;
  app: DemoApp;
  /** Path inside the demo app, without the locale prefix. */
  path: string;
  title: Localized;
  description: Localized;
  robot?: RobotSlug;
  track?: 'sd' | 'smp';
}

const kioskDemos: DemoEntry[] = robots.flatMap((robot) => {
  const site = getSite(robot.demoSite);
  if (!site) return [];
  return [
    {
      id: `${robot.slug}-${site.slug}`,
      app: 'kiosk' as const,
      path: `/${robot.slug}/${site.slug}`,
      robot: robot.slug,
      title: {
        id: `${robot.name} di ${site.name}`,
        en: `${robot.name} at ${site.name}`,
      },
      description: site.tagline,
    },
  ];
});

const playgroundDemos: DemoEntry[] = [
  {
    id: 'playground-sd',
    app: 'playground',
    path: '?track=sd',
    track: 'sd',
    title: { id: 'Coding blok untuk SD', en: 'Block coding for primary school' },
    description: {
      id: 'Susun blok, jalankan, dan bantu robot mengantar padi ke jineng.',
      en: 'Snap blocks together, run them, and help the robot bring rice to the jineng.',
    },
  },
  {
    id: 'playground-smp',
    app: 'playground',
    path: '?track=smp',
    track: 'smp',
    title: { id: 'Dari blok ke C++ untuk SMP', en: 'From blocks to C++ for junior high' },
    description: {
      id: 'Program yang sama, lengkap dengan kode C++ dan Python yang dihasilkan otomatis.',
      en: 'The same programs, with the C++ and Python generated alongside.',
    },
  },
];

/** Every demo listed on the company profile. New kiosk samples appear here automatically. */
export const demos: readonly DemoEntry[] = [...kioskDemos, ...playgroundDemos];
