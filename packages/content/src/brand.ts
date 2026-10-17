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
    id: 'Taksu Tech adalah unit Ezra Robotics untuk robot layanan dan robot edukasi. Kami menyediakan robot resepsionis dan kios layanan, merancang robot edukasi bernama dengan jalur belajar gratis, lalu tetap mendampingi pemakainya: melatih staf dan pengajar, memperbarui perangkat lunak, dan menyiapkan suku cadang.',
    en: 'Taksu Tech is the Ezra Robotics unit for service and education robots. We supply receptionist robots and service kiosks, design named education robots with free learning paths, and keep supporting customers afterwards: training staff and instructors, updating the software, and supplying spare parts.',
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

/** The two product lines. Reception has a Bali edition; the education robots sell nationwide. */
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
    title: { id: 'Robot edukasi bernama', en: 'Named education robots' },
    summary: {
      id: 'Ciko, Momo, dan Garu: robot bernama dan bernomor untuk anak, remaja, dan tim lomba. Setiap robot punya jalur belajar online gratis dengan misi di simulator, dan bisa dibeli satuan, partai untuk sekolah, atau sebagai OEM.',
      en: 'Ciko, Momo, and Garu: named, numbered robots for children, teenagers, and competition teams. Each has a free online learning path with simulator missions, and sells singly, in bulk for schools, or as OEM.',
    },
    points: [
      {
        id: 'Ciko mulai 7 tahun, Momo mulai 11 tahun, Garu mulai 15 tahun',
        en: 'Ciko from age 7, Momo from 11, Garu from 15',
      },
      {
        id: 'Jalur belajar gratis: video, panduan, dan misi simulator',
        en: 'Free learning paths: videos, guides, and simulator missions',
      },
      {
        id: 'Pembelian partai dengan pelatihan pengajar, dan OEM dengan merek Anda',
        en: 'Bulk orders with instructor training, and OEM under your brand',
      },
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
      id: 'Robot edukasi kami modular, sehingga bagian yang rusak bisa diganti satu per satu. Servis dan suku cadang kami tangani sendiri.',
      en: 'Our education robots are modular, so a broken part can be replaced on its own. We handle servicing and spare parts ourselves.',
    },
  },
];
