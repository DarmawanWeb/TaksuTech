import type { Localized } from './i18n';

const l = (id: string, en: string): Localized => ({ id, en });

export interface Question {
  id: string;
  question: Localized;
  answer: Localized;
}

/** What buyers ask before ordering. Policies here are a starting point; review before launch. */
export const faq: readonly Question[] = [
  {
    id: 'order',
    question: l('Bagaimana cara membeli?', 'How do I buy?'),
    answer: l(
      'Lewat Tokopedia atau Shopee kalau robotnya sudah terdaftar di sana, atau pesan langsung: masukkan ke keranjang, lalu kirim pesanan lewat WhatsApp atau email. Kami balas dengan total, ongkos kirim, dan cara bayar.',
      'Through Tokopedia or Shopee when the robot is listed there, or order directly: add it to the cart, then send the order over WhatsApp or email. We reply with the total, shipping, and how to pay.',
    ),
  },
  {
    id: 'preorder',
    question: l('Apa artinya pre-order?', 'What does pre-order mean?'),
    answer: l(
      'Robot dirakit dan diuji per batch. Saat konfirmasi pesanan, kami sampaikan perkiraan tanggal kirimnya.',
      'Robots are built and tested in batches. When we confirm your order, we tell you the expected shipping date.',
    ),
  },
  {
    id: 'shipping',
    question: l('Bisa kirim ke luar Bali?', 'Do you ship outside Bali?'),
    answer: l(
      'Bisa, ke seluruh Indonesia. Ongkos kirim dan perkiraan waktunya kami hitung saat konfirmasi pesanan.',
      'Yes, anywhere in Indonesia. We work out the shipping cost and time when we confirm the order.',
    ),
  },
  {
    id: 'age',
    question: l('Usia di setiap robot itu wajib?', 'Is the age on each robot a rule?'),
    answer: l(
      'Itu saran. Ciko dirancang untuk mulai dari usia 7 tahun, Momo dari 11, Garu dari 15. Anak yang lebih muda tetap bisa, dengan didampingi.',
      'It is a suggestion. Ciko is designed for ages 7 and up, Momo for 11 and up, Garu for 15 and up. Younger children can still join in with an adult.',
    ),
  },
  {
    id: 'learn',
    question: l('Apakah ada kelas?', 'Are there classes?'),
    answer: l(
      'Kami tidak membuka kelas. Setiap robot datang dengan jalur belajar online gratis: video, panduan langkah demi langkah, dan misi simulator yang bisa diikuti sendiri di rumah.',
      'We do not run classes. Every robot comes with a free online learning path: videos, step-by-step guides, and simulator missions you can follow at home.',
    ),
  },
  {
    id: 'simulator',
    question: l('Simulatornya berbayar?', 'Does the simulator cost anything?'),
    answer: l(
      'Gratis, berjalan di browser, tanpa daftar akun. Bisa dicoba sebelum membeli robot.',
      'It is free, runs in the browser, and needs no account. You can try it before you buy a robot.',
    ),
  },
  {
    id: 'solder',
    question: l('Perlu menyolder?', 'Do I need to solder?'),
    answer: l(
      'Tidak. Ciko datang sudah dirakit. Momo dirakit dari modul dengan konektor berkunci. Garu juga dirakit tanpa solder.',
      'No. Ciko arrives assembled. Momo is built from modules with keyed connectors. Garu goes together without soldering too.',
    ),
  },
  {
    id: 'battery',
    question: l('Baterainya aman untuk anak?', 'Is the battery safe for children?'),
    answer: l(
      'Baterai ada di dalam wadah tertutup dengan proteksi dan hanya diisi dengan charger yang disertakan. Sel baterai tidak pernah dipegang lepas.',
      'The battery sits in an enclosed, protected case and is only charged with the supplied charger. The cells are never handled loose.',
    ),
  },
  {
    id: 'broken',
    question: l('Kalau robot rusak saat tiba?', 'What if the robot arrives broken?'),
    answer: l(
      'Setiap robot diuji sebelum dikirim. Kalau ada yang tidak berfungsi saat tiba, hubungi kami dengan foto atau video, dan kami bantu perbaiki atau ganti.',
      'Every robot is tested before it ships. If something does not work when it arrives, send us a photo or video and we will help repair or replace it.',
    ),
  },
  {
    id: 'bulk',
    question: l(
      'Bisa beli banyak untuk sekolah atau kursus?',
      'Can I buy in bulk for a school or course?',
    ),
    answer: l(
      'Bisa. Pembelian banyak mendapat harga bertingkat dan bisa ditambah pelatihan untuk pengajar. Lihat halaman Bisnis.',
      'Yes. Bulk orders get tiered pricing and can include training for instructors. See the Business page.',
    ),
  },
];
