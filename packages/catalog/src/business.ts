import type { Question } from './faq';
import type { Localized } from './i18n';

const l = (id: string, en: string): Localized => ({ id, en });

interface Offer {
  id: string;
  title: Localized;
  body: Localized;
}

/** Who buys in bulk, and what comes with a bulk order. */
export const bulkBuyers: readonly Offer[] = [
  {
    id: 'school',
    title: l('Sekolah', 'Schools'),
    body: l(
      'Untuk mapel pilihan Koding dan Kecerdasan Artifisial, ekstrakurikuler, atau laboratorium.',
      'For the Coding and Artificial Intelligence elective, clubs, or labs.',
    ),
  },
  {
    id: 'course',
    title: l('Kursus dan lembaga', 'Courses and training centres'),
    body: l(
      'Robot yang sama untuk semua peserta, dengan suku cadang dan dukungan yang jelas.',
      'The same robot for every student, with clear spare parts and support.',
    ),
  },
  {
    id: 'team',
    title: l('Tim dan komunitas lomba', 'Competition teams and clubs'),
    body: l(
      'Beberapa unit untuk latihan, plus Competition Pack saat tersedia.',
      'Several units for practice, plus the Competition Pack when it is available.',
    ),
  },
];

export const bulkIncludes: readonly Offer[] = [
  {
    id: 'pricing',
    title: l('Harga bertingkat', 'Tiered pricing'),
    body: l(
      'Makin banyak unit, makin rendah harga per unit. Penawaran dikirim sesuai jumlah dan paket.',
      'The more units, the lower the unit price. We send a quote for your quantity and packages.',
    ),
  },
  {
    id: 'training',
    title: l('Pelatihan untuk pengajar', 'Training for instructors'),
    body: l(
      'Sesi online atau tatap muka agar pengajar paham robotnya sebelum dipakai di kelas.',
      'Online or in-person sessions so instructors know the robot before it reaches the class.',
    ),
  },
  {
    id: 'materials',
    title: l('Materi untuk kelas', 'Classroom materials'),
    body: l(
      'Jalur belajar online yang sama, ditambah kartu misi dan rencana sesi untuk pengajar.',
      'The same online learning paths, plus mission cards and session plans for instructors.',
    ),
  },
  {
    id: 'support',
    title: l('Dukungan dan suku cadang', 'Support and spare parts'),
    body: l(
      'Tanya lewat WhatsApp atau email saat ada kendala, dan suku cadang yang siap dikirim.',
      'Ask over WhatsApp or email when something goes wrong, with spare parts ready to ship.',
    ),
  },
];

/** OEM: our robots under your brand, at three depths of change. */
export interface OemLevel {
  id: 'rebrand' | 'custom' | 'design';
  title: Localized;
  summary: Localized;
  changes: Localized[];
  fits: Localized;
}

export const oemLevels: readonly OemLevel[] = [
  {
    id: 'rebrand',
    title: l('Rebrand', 'Rebrand'),
    summary: l(
      'Robot yang sama, dengan nama dan merek Anda.',
      'The same robot, with your name and brand.',
    ),
    changes: [
      l('Logo dan warna bodi', 'Logo and body colours'),
      l('Kemasan dan buku panduan', 'Packaging and manual'),
      l('Nama produk Anda', 'Your product name'),
    ],
    fits: l(
      'Kursus robotik dan distributor yang ingin punya robot sendiri dengan cepat.',
      'Robotics courses and distributors who want their own robot quickly.',
    ),
  },
  {
    id: 'custom',
    title: l('Custom ringan', 'Light custom'),
    summary: l(
      'Bentuk dan isi robot disesuaikan dengan program Anda.',
      'The robot’s shape and parts tuned to your programme.',
    ),
    changes: [
      l('Bentuk casing', 'Casing shape'),
      l('Pilihan sensor dan modul', 'Choice of sensors and modules'),
      l('Wajah OLED, suara, dan firmware', 'OLED faces, sounds, and firmware'),
    ],
    fits: l(
      'Lembaga dengan kurikulum sendiri atau kategori lomba tertentu.',
      'Organisations with their own curriculum or a particular competition category.',
    ),
  },
  {
    id: 'design',
    title: l('Custom penuh', 'Full custom'),
    summary: l(
      'Robot baru yang kami rancang dari kebutuhan Anda.',
      'A new robot we design around your needs.',
    ),
    changes: [
      l('PCB dan rangka baru', 'A new PCB and frame'),
      l('Pemilihan komponen dan uji ketahanan', 'Component selection and durability testing'),
      l('Dokumentasi produksi', 'Production documentation'),
    ],
    fits: l(
      'Brand edukasi, pameran, dan proyek dengan kebutuhan khusus.',
      'Education brands, exhibitions, and projects with special requirements.',
    ),
  },
];

/** Software that can carry the client's brand too. */
export const oemSoftware: readonly Offer[] = [
  {
    id: 'simulator',
    title: l('Simulator dengan merek Anda', 'A simulator under your brand'),
    body: l(
      'Simulator blok yang sama dengan logo, nama robot, dan misi Anda.',
      'The same block simulator with your logo, robot names, and missions.',
    ),
  },
  {
    id: 'learn',
    title: l('Jalur belajar dengan merek Anda', 'Learning paths under your brand'),
    body: l(
      'Langkah, panduan, dan video yang bisa Anda bagikan ke pembeli.',
      'Steps, guides, and videos you can share with your customers.',
    ),
  },
];

/** The order an OEM project runs in. */
export const oemProcess: readonly Offer[] = [
  {
    id: 'consult',
    title: l('Konsultasi', 'Consultation'),
    body: l(
      'Kita bahas tujuan, jumlah, anggaran, dan jadwal.',
      'We talk through your goals, quantity, budget, and timeline.',
    ),
  },
  {
    id: 'prototype',
    title: l('Prototipe', 'Prototype'),
    body: l(
      'Anda menerima contoh untuk diuji dan diberi masukan.',
      'You get a sample to test and give feedback on.',
    ),
  },
  {
    id: 'production',
    title: l('Produksi', 'Production'),
    body: l(
      'Setelah contoh disetujui, kami produksi dan uji setiap unit.',
      'Once the sample is approved, we build and test every unit.',
    ),
  },
  {
    id: 'support',
    title: l('Kirim dan dukungan', 'Delivery and support'),
    body: l(
      'Unit dikirim lengkap dengan dokumentasi, lalu kami siapkan suku cadang dan bantuan teknis.',
      'Units ship with documentation, and we keep spare parts and technical help ready.',
    ),
  },
];

export const businessFaq: readonly Question[] = [
  {
    id: 'moq',
    question: l('Berapa minimal pemesanan?', 'What is the minimum order?'),
    answer: l(
      'Tergantung tingkat custom. Rebrand bisa mulai dari jumlah kecil; ceritakan kebutuhan Anda dan kami kirim angkanya.',
      'It depends on how much changes. A rebrand can start small; tell us what you need and we will send the numbers.',
    ),
  },
  {
    id: 'ip',
    question: l('Siapa pemilik desain custom?', 'Who owns a custom design?'),
    answer: l(
      'Kepemilikan desain, merek, dan kerahasiaan diatur dalam perjanjian sebelum produksi.',
      'Ownership of the design, the brand, and confidentiality are set out in an agreement before production.',
    ),
  },
  {
    id: 'support',
    question: l('Siapa yang melayani pembeli akhir?', 'Who supports the end customers?'),
    answer: l(
      'Bisa Anda, bisa kami. Kami menyiapkan dokumentasi dan suku cadang untuk tim Anda, atau melayani langsung atas nama merek Anda.',
      'Either you or us. We prepare documentation and spare parts for your team, or support customers directly on behalf of your brand.',
    ),
  },
  {
    id: 'time',
    question: l('Berapa lama prosesnya?', 'How long does it take?'),
    answer: l(
      'Rebrand paling cepat karena robotnya sudah ada. Custom ringan dan penuh butuh waktu tambahan untuk prototipe dan uji. Jadwalnya kami tulis di penawaran.',
      'A rebrand is quickest because the robot already exists. Light and full custom need extra time for prototyping and testing. The timeline goes in the quote.',
    ),
  },
];
