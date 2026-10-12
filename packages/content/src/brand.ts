import type { Localized } from './i18n';
import { names } from './names';

export const brand = {
  name: 'Taksu Tech',
  tagline: { id: 'Robotika karya anak Bali', en: 'Robotics built by young Balinese engineers' },
  parent: {
    name: 'Ezra Robotics',
    relation: { id: 'Bagian dari Ezra Robotics', en: 'Part of Ezra Robotics' },
  },
  location: { id: 'Bali, Indonesia', en: 'Bali, Indonesia' },
  meaning: {
    id: 'Dalam budaya Bali, taksu adalah daya batin yang membuat sebuah karya terasa hidup di hadapan orang yang menyaksikannya. Kami membawa semangat itu ke robot: bukan sekadar mesin yang bekerja, tetapi kehadiran yang menyambut dan mengajak belajar.',
    en: 'In Balinese culture, taksu is the inner force that makes a work come alive for the people who witness it. We bring that spirit to robots: not just machines that work, but a presence that welcomes people and invites them to learn.',
  },
  story: {
    id: 'Taksu Tech lahir dari anak-anak muda Bali yang tumbuh di antara upacara, pariwisata, dan teknologi. Di bawah Ezra Robotics, kami merancang robot resepsionis yang paham adat Bali dan kit robot edukasi yang bisa dipakai sekolah di seluruh Indonesia.',
    en: 'Taksu Tech was started by young Balinese engineers who grew up between ceremonies, tourism, and technology. Under Ezra Robotics, we design receptionist robots that understand Balinese custom and education robot kits that schools anywhere in Indonesia can use.',
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

/** The two product lines. Reception is Bali-first; Edu is for schools anywhere. */
export const divisions = {
  reception: {
    name: names.robot,
    title: { id: 'Robot resepsionis Bali', en: 'Bali receptionist robots' },
    summary: {
      id: 'Snow dan Timo edisi Bali, plus Taksu Kiosk buatan kami sendiri. Menyapa dengan Om Swastiastu, menampilkan Aksara Bali, mencetak tiket dan kartu tamu, dan bisa diajak bicara.',
      en: 'Bali editions of Snow and Timo, plus our own Taksu Kiosk. They greet with Om Swastiastu, show Aksara Bali, print tickets and visitor passes, and hold a spoken conversation.',
    },
  },
  education: {
    name: names.edu,
    title: { id: 'Robot edukasi SD sampai SMA', en: 'Education robots for primary to senior high' },
    summary: {
      id: 'Kit robot yang bisa dikustom, simulator gratis untuk mencoba sebelum membeli, kurikulum 32–36 pertemuan, dan panduan guru yang siap dipakai di kelas.',
      en: 'Customisable robot kits, a free simulator to try before buying, a 32–36 meeting curriculum, and teacher guides ready for the classroom.',
    },
  },
} as const;

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
      id: 'Robot menangani pertanyaan berulang dan antrean, sehingga staf punya waktu untuk tamu yang butuh perhatian lebih. Di kelas, robot membantu guru, bukan menggantikannya.',
      en: 'Robots handle repetitive questions and queues so staff have time for guests who need more attention. In class, robots support teachers rather than replace them.',
    },
  },
  {
    id: 'palemahan',
    name: 'Palemahan',
    title: { id: 'Dirawat agar awet', en: 'Maintained to last' },
    body: {
      id: 'Kit edukasi kami modular dan bisa ditingkatkan, jadi sekolah tidak membeli ulang setiap naik jenjang. Servis dan suku cadang tersedia di Bali.',
      en: 'Our education kits are modular and upgradeable, so schools do not rebuy at every level. Service and spare parts are available in Bali.',
    },
  },
];
