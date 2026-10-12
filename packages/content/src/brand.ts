import type { Localized } from './i18n';
import { names } from './names';

export const brand = {
  name: 'Taksu Tech',
  tagline: { id: 'Robot layanan dan robot edukasi', en: 'Service and education robots' },
  parent: {
    name: 'Ezra Robotics',
    relation: { id: 'Bagian dari Ezra Robotics', en: 'Part of Ezra Robotics' },
  },
  location: { id: 'Bali, Indonesia', en: 'Bali, Indonesia' },
  meaning: {
    id: 'Taksu adalah kata dalam bahasa Bali untuk daya yang membuat sebuah karya terasa hidup bagi orang yang melihatnya.',
    en: 'Taksu is a Balinese word for the quality that makes a piece of work feel alive to the people who see it.',
  },
  story: {
    id: 'Taksu Tech adalah unit Ezra Robotics untuk robot layanan dan robot edukasi. Kami menyediakan robot resepsionis dan kios layanan, merancang kit robot untuk sekolah, lalu tetap mendampingi pemakainya setelah robot terpasang: melatih staf dan guru, memperbarui perangkat lunak, dan menyiapkan suku cadang.',
    en: 'Taksu Tech is the Ezra Robotics unit for service and education robots. We supply receptionist robots and service kiosks, design robot kits for schools, and keep supporting customers after installation: training staff and teachers, updating the software, and supplying spare parts.',
  },
  contact: {
    person: 'Darmawan',
    email: 'darmawandeveloper@gmail.com',
  },
} as const satisfies {
  name: string;
  tagline: Localized;
  parent: { name: string; relation: Localized };
  location: Localized;
  meaning: Localized;
  story: Localized;
  contact: { person: string; email: string };
};

interface Division {
  name: string;
  title: Localized;
  summary: Localized;
  /** Short facts listed under the summary on the company profile. */
  points: readonly Localized[];
}

/** The two product lines. Reception has a Bali edition; Edu is for schools anywhere. */
export const divisions = {
  reception: {
    name: names.robot,
    title: {
      id: 'Robot resepsionis dan kios layanan',
      en: 'Receptionist robots and service kiosks',
    },
    summary: {
      id: 'Snow dan Timo, robot resepsionis yang kami sesuaikan, serta Taksu Kiosk yang kami rakit sendiri. Edisi pertamanya dibuat untuk Bali, lengkap dengan Aksara Bali dan salam setempat.',
      en: 'Snow and Timo, receptionist robots we adapt, and Taksu Kiosk, which we assemble ourselves. The first edition is made for Bali, with Aksara Bali and local greetings.',
    },
    points: [
      {
        id: 'Percakapan suara dalam bahasa Indonesia dan bahasa Inggris',
        en: 'Voice conversation in Indonesian and English',
      },
      { id: 'Antrean, buku tamu, dan petunjuk arah', en: 'Queues, a guest book, and directions' },
      {
        id: 'Tiket antrean dan kartu tamu tercetak',
        en: 'Printed queue tickets and visitor passes',
      },
    ],
  },
  education: {
    name: names.edu,
    title: { id: 'Robot edukasi SD sampai SMA', en: 'Education robots for primary to senior high' },
    summary: {
      id: 'Kit robot untuk sekolah, kurikulum 32 sampai 36 pertemuan, panduan guru, dan simulator gratis untuk mencoba sebelum membeli.',
      en: 'Robot kits for schools, a curriculum of 32 to 36 meetings, teacher guides, and a free simulator to try before buying.',
    },
    points: [
      {
        id: 'SD v1 dan SMP v1 untuk program pilot, SMA v1 menyusul',
        en: 'SD v1 and SMP v1 for pilot programmes, SMA v1 to follow',
      },
      {
        id: 'Dipetakan ke mata pelajaran Koding dan Kecerdasan Artifisial',
        en: 'Mapped to the Coding and Artificial Intelligence subject',
      },
      { id: 'Pelatihan guru dan servis purnajual', en: 'Teacher training and after-sales service' },
    ],
  },
} as const satisfies Record<'reception' | 'education', Division>;

/** How we work, across both product lines. */
export const principles: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'support',
    title: { id: 'Robot membantu staf dan guru', en: 'Robots support staff and teachers' },
    body: {
      id: 'Robot menangani pertanyaan yang berulang dan antrean, sehingga staf memiliki waktu untuk tamu yang butuh perhatian lebih. Di kelas, robot menjadi alat bantu guru.',
      en: 'Robots handle repetitive questions and queues, so staff have time for visitors who need more attention. In class, the robot is a tool for the teacher.',
    },
  },
  {
    id: 'honest',
    title: { id: 'Spesifikasi apa adanya', en: 'Honest specifications' },
    body: {
      id: 'Spesifikasi yang belum diuji kami tandai sebagai rancangan, dan angkanya baru kami perbarui setelah ada hasil uji.',
      en: 'Specifications that have not been tested are marked as design targets, and we update the figures only after testing.',
    },
  },
  {
    id: 'lasting',
    title: { id: 'Dirancang untuk dipakai lama', en: 'Designed for long use' },
    body: {
      id: 'Kit edukasi kami modular, sehingga modul yang rusak bisa diganti satu per satu. Servis dan suku cadang kami tangani sendiri.',
      en: 'Our education kits are modular, so a broken module can be replaced on its own. We handle servicing and spare parts ourselves.',
    },
  },
];
