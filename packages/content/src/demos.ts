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
  /** The education robot a simulator demo opens. */
  track?: 'ciko' | 'momo';
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
    id: 'sim-ciko',
    app: 'sim',
    path: '?robot=ciko',
    track: 'ciko',
    title: { id: 'Ciko di simulator', en: 'Ciko in the simulator' },
    description: {
      id: 'Maju, belok dengan lampu sein, hindari rintangan, dan ikuti garis dengan blok berbahasa anak.',
      en: 'Drive, turn with the signal on, dodge obstacles, and follow a line with child-friendly blocks.',
    },
  },
  {
    id: 'sim-momo',
    app: 'sim',
    path: '?robot=momo',
    track: 'momo',
    title: { id: 'Momo di simulator', en: 'Momo in the simulator' },
    description: {
      id: 'Sensor garis 5-in-1, radar servo, suhu, suara, telemetri Wi-Fi, dan kode Arduino C++ dari blok.',
      en: '5-in-1 line array, servo radar, temperature, sound, Wi-Fi telemetry, and the Arduino C++ behind the blocks.',
    },
  },
];

/** Every demo listed on the company profile. New kiosk samples appear automatically. */
export const demos: readonly DemoEntry[] = [...kioskDemos, ...extraDemos];
