import type { WorkImage } from '@taksu/content';
import type { StaticImageData } from 'next/image';
import smpBoard from '@/assets/company/smp-board.webp';
import sdV1 from '@/assets/education/sd-v1.webp';
import snowTimoBali from '@/assets/reception/snow-timo-bali.webp';
import kioskApp from '@/assets/works/kiosk-app.webp';
import lab from '@/assets/works/lab.webp';
import simulator from '@/assets/works/simulator.webp';
import taksuKiosk from '@/assets/works/taksu-kiosk.webp';

/** Product imagery supplied by Taksu Tech. Components import from here, not from assets. */
export const images = {
  sdV1,
  smpBoard,
  snowTimoBali,
} as const;

/** Photos and screenshots for the work page, keyed like the content entries. */
export const workImages: Record<WorkImage, StaticImageData> = {
  taksuKiosk,
  smpBoard,
  sdV1,
  snowTimoBali,
  kioskApp,
  simulator,
  lab,
};
