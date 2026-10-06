import jenjang from '@/assets/edu/jenjang-sd-smp-sma.webp';
import pcbKustom from '@/assets/edu/pcb-kustom.webp';
import posterBelajar from '@/assets/edu/poster-belajar-robotika.webp';
import robotModularSmp from '@/assets/edu/robot-modular-smp.webp';
import robotPintarSd from '@/assets/edu/robot-pintar-sd.webp';
import snowTimoBali from '@/assets/reception/snow-timo-bali.webp';

/** Product imagery supplied by Taksu Tech. Components import from here, not from assets. */
export const images = {
  snowTimoBali,
  posterBelajar,
  jenjang,
  pcbKustom,
} as const;

export const levelImages = {
  'robot-pintar-sd': robotPintarSd,
  'robot-modular-smp': robotModularSmp,
} as const;
