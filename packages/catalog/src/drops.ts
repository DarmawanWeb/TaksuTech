import type { Localized } from './i18n';
import { robots } from './robots';

const l = (id: string, en: string): Localized => ({ id, en });

/**
 * Drops are small robots from our R&D bench, released one at a time. They continue the
 * robots' number series, so the first Drop after Garu (#03) is #04.
 */
export interface Drop {
  number: number;
  slug: string;
  /** Hidden until launch; the site shows a question mark and a teaser instead. */
  name: string | null;
  teaser: Localized;
  status: 'soon' | 'available' | 'sold-out';
}

export const drops: readonly Drop[] = [
  {
    number: 4,
    slug: 'drop-04',
    name: null,
    teaser: l(
      'Rilisan R&D berikutnya sedang diuji di meja kami. Nama dan bentuknya kami buka saat siap dijual.',
      'The next R&D release is being tested on our bench. We reveal its name and shape when it is ready to sell.',
    ),
    status: 'soon',
  },
];

/** How a Drop works, in the order a buyer meets it. */
export const dropSteps: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'bench',
    title: l('Diuji di meja R&D', 'Tested on the R&D bench'),
    body: l(
      'Setiap Drop berawal dari prototipe yang kami uji sendiri: sumo mini, robot pelempar, robot penggambar, dan ide lain.',
      'Every Drop starts as a prototype we test ourselves: mini sumo, launchers, drawing robots, and other ideas.',
    ),
  },
  {
    id: 'reveal',
    title: l('Dibuka dengan nomor', 'Revealed with a number'),
    body: l(
      'Saat siap, robotnya dapat nama dan nomor berikutnya di seri ULIK, lengkap dengan jalur belajar dan misi simulator.',
      'When it is ready, it gets a name and the next number in the ULIK series, with a learning path and simulator missions.',
    ),
  },
  {
    id: 'batch',
    title: l('Dijual per batch', 'Sold in batches'),
    body: l(
      'Drop dibuat dalam jumlah terbatas. Yang mendaftar lebih dulu kami kabari pertama lewat WhatsApp.',
      'Drops are made in limited runs. People who sign up first hear from us first on WhatsApp.',
    ),
  },
];

/** The next free number in the series, after every robot and Drop so far. */
export function nextReleaseNumber(): number {
  return Math.max(...robots.map((robot) => robot.number), ...drops.map((drop) => drop.number)) + 1;
}
