import type { Localized } from './i18n';

const l = (id: string, en: string): Localized => ({ id, en });

/**
 * The brand. Every site and the simulator read the name from here, so renaming is a one-line
 * change plus `python3 packages/ui/scripts/wordmark.py <name>` for the logo.
 */
export const brand = {
  name: 'ULIK',
  /** From "mengulik": to tinker with something until you understand how it works. */
  meaning: l(
    'ULIK berasal dari kata mengulik: mengutak-atik sesuatu sampai paham cara kerjanya.',
    'ULIK comes from the Indonesian mengulik: to tinker with something until you understand how it works.',
  ),
  tagline: l('Robot untuk diulik.', 'Robots made for tinkering.'),
  promise: l(
    'Robot bernama dan bernomor, lengkap dengan jalur belajar online gratis.',
    'Named, numbered robots, each with a free online learning path.',
  ),
  story: l(
    'ULIK merancang dan merakit robot di Indonesia. Setiap robot punya nama, nomor, dan jalur belajarnya sendiri: video, panduan, dan misi simulator yang bisa diikuti dari rumah. Kami menjual satuan, menyiapkan pembelian dalam jumlah banyak untuk sekolah dan kursus, dan membuat versi OEM dengan merek Anda.',
    'ULIK designs and builds robots in Indonesia. Every robot has a name, a number, and its own learning path: videos, guides, and simulator missions you can follow at home. We sell single units, handle bulk orders for schools and courses, and make OEM versions under your brand.',
  ),
  location: l('Bali, Indonesia', 'Bali, Indonesia'),
  contact: {
    person: 'Darmawan',
    email: 'darmawandeveloper@gmail.com',
  },
} as const;
