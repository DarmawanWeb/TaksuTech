export interface BalineseGreeting {
  /** Latin spelling as used on signage. */
  latin: string;
  /** Aksara Bali form, only provided where the spelling is well established. */
  aksara?: string;
  meaning: { id: string; en: string };
}

/** Standard Balinese Hindu greeting, conventionally written ᬒᬁᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ. */
export const OM_SWASTIASTU: BalineseGreeting = {
  latin: 'Om Swastiastu',
  aksara: '\u1B12\u1B01\u1B32\u1B44\u1B2F\u1B32\u1B44\u1B22\u1B44\u1B2C\u1B32\u1B44\u1B22\u1B38',
  meaning: {
    id: 'Semoga dalam keadaan baik atas karunia Hyang Widhi',
    en: 'May you be well, by the grace of God',
  },
};

export const SUKSMA: BalineseGreeting = {
  latin: 'Suksma',
  meaning: { id: 'Terima kasih', en: 'Thank you' },
};

export const RAHAJENG_RAUH: BalineseGreeting = {
  latin: 'Rahajeng rauh',
  meaning: { id: 'Selamat datang', en: 'Welcome' },
};

export const OM_SANTIH: BalineseGreeting = {
  latin: 'Om Santih, Santih, Santih, Om',
  meaning: {
    id: 'Semoga damai di hati, di dunia, dan selamanya',
    en: 'Peace within, peace around, peace always',
  },
};
