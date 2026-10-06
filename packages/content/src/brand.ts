import type { Localized } from './i18n';

export const brand = {
  name: 'Taksu Tech',
  legalNote: 'Taksu Tech is part of Ezra Robotics.',
  parent: {
    name: 'Ezra Robotics',
    relation: { id: 'Bagian dari Ezra Robotics', en: 'Part of Ezra Robotics' },
  },
  location: { id: 'Bali, Indonesia', en: 'Bali, Indonesia' },
  meaning: {
    id: 'Dalam budaya Bali, taksu adalah daya batin yang membuat sebuah karya terasa hidup di hadapan orang yang menyaksikannya. Kami membawa semangat itu ke robot: bukan sekadar mesin yang bekerja, tetapi kehadiran yang menyambut dengan hangat.',
    en: 'In Balinese culture, taksu is the inner force that makes a work come alive for the people who witness it. We bring that spirit to robots: not just machines that work, but a presence that welcomes people warmly.',
  },
  contact: {
    person: 'Darmawan',
    email: 'darmawandeveloper@gmail.com',
  },
} as const satisfies {
  name: string;
  legalNote: string;
  parent: { name: string; relation: Localized };
  location: Localized;
  meaning: Localized;
  contact: { person: string; email: string };
};

/** Tri Hita Karana: the Balinese philosophy of three sources of harmony, mapped to how we work. */
export const values: ReadonlyArray<{
  id: string;
  name: string;
  title: Localized;
  body: Localized;
}> = [
  {
    id: 'parahyangan',
    name: 'Parahyangan',
    title: { id: 'Teknologi yang tahu tempatnya', en: 'Technology that knows its place' },
    body: {
      id: 'Robot kami menghormati ruang suci, hari raya, dan tata krama setempat. Kalender Pawukon dan salam Bali sudah tertanam di perangkat lunaknya.',
      en: 'Our robots respect sacred spaces, holy days, and local etiquette. The Pawukon calendar and Balinese greetings are built into the software.',
    },
  },
  {
    id: 'pawongan',
    name: 'Pawongan',
    title: { id: 'Membantu orang, bukan menggantikan', en: 'Helping people, not replacing them' },
    body: {
      id: 'Robot menangani pertanyaan berulang dan antrean, sehingga staf punya waktu untuk tamu yang butuh perhatian lebih.',
      en: 'Robots handle repetitive questions and queues so staff have time for the guests who need more attention.',
    },
  },
  {
    id: 'palemahan',
    name: 'Palemahan',
    title: { id: 'Dirawat agar awet', en: 'Maintained to last' },
    body: {
      id: 'Kit edukasi kami modular dan bisa ditingkatkan, jadi tidak perlu membeli ulang setiap naik jenjang. Servis dan suku cadang tersedia di Bali.',
      en: 'Our education kits are modular and upgradeable, so schools do not rebuy at every level. Service and spare parts are available in Bali.',
    },
  },
];
