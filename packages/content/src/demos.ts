import type { Localized } from './i18n';
import { type RobotSlug, robots } from './reception';
import { getSite } from './sites';

export type DemoApp = 'kiosk' | 'sim';

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
      // The totem opens standing in its frame, so a laptop shows its real portrait layout.
      path: `/${robot.slug}/${site.slug}${robot.kind === 'static' ? '/preview' : ''}`,
      robot: robot.slug,
      title: { id: `${robot.name} di ${site.name}`, en: `${robot.name} at ${site.name}` },
      description: site.tagline,
    },
  ];
});

const extraDemos: DemoEntry[] = [
  {
    id: 'kiosk-studio',
    app: 'kiosk',
    path: '/studio',
    title: { id: 'Studio: rakit kios Anda sendiri', en: 'Studio: build your own kiosk' },
    description: {
      id: 'Ketik nama instansi, lihat papan Aksara Bali-nya, pilih fitur, lalu buka kios kustom.',
      en: 'Type your organisation’s name, see its Aksara Bali sign, choose features, and open a custom kiosk.',
    },
  },
  {
    id: 'sim-sd',
    app: 'sim',
    path: '?robot=sd',
    track: 'sd',
    title: { id: 'Simulator SD v1', en: 'SD v1 simulator' },
    description: {
      id: 'Misi gerak, rintangan, dan ikuti garis dengan blok berbahasa anak.',
      en: 'Motion, obstacle, and line-following missions with child-friendly blocks.',
    },
  },
  {
    id: 'sim-smp',
    app: 'sim',
    path: '?robot=smp',
    track: 'smp',
    title: { id: 'Simulator SMP v1', en: 'SMP v1 simulator' },
    description: {
      id: 'Sensor garis 5-in-1, radar servo, suhu, suara, dan pratinjau kode C++.',
      en: '5-in-1 line array, servo radar, temperature, sound, and a C++ code preview.',
    },
  },
];

/** Every demo listed on the company profile. New kiosk samples appear automatically. */
export const demos: readonly DemoEntry[] = [...kioskDemos, ...extraDemos];
