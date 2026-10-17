import type { Localized } from './i18n';
import type { ServiceId } from './services';

export type WorkKind = 'hardware' | 'software';

/** Image keys the company site maps to its own assets. */
export type WorkImage =
  | 'taksuKiosk'
  | 'momoBoard'
  | 'ciko'
  | 'snowTimoBali'
  | 'kioskApp'
  | 'simulator'
  | 'store';

export interface WorkLink {
  /** Which of our sites the link opens. */
  site: 'robot' | 'edu' | 'kiosk' | 'sim';
  /** Path after the locale (the store's routes for `edu`), or a query string for the simulator. */
  path: string;
  label: Localized;
}

export interface Work {
  id: string;
  kind: WorkKind;
  name: Localized;
  /** One sentence: what it is. */
  lead: Localized;
  body: Localized;
  facts: readonly { label: Localized; value: Localized }[];
  image: WorkImage;
  /** Photos fill their frame; screenshots and the totem sit whole on a plain panel. */
  fit: 'cover' | 'contain';
  imageAlt: Localized;
  links: readonly WorkLink[];
  /** The services this work shows we can do for others. */
  services: readonly ServiceId[];
}

/**
 * Products Taksu Tech designed and built, shown on the company site's work page. Client
 * projects are not listed here; every line below describes something we make ourselves.
 */
export const works: readonly Work[] = [
  {
    id: 'taksu-kiosk',
    kind: 'hardware',
    name: { id: 'Taksu Kiosk', en: 'Taksu Kiosk' },
    lead: {
      id: 'Totem resepsionis yang kami rancang dan rakit di Bali.',
      en: 'A reception totem we design and assemble in Bali.',
    },
    body: {
      id: 'Layar sentuh 24 inci tegak, printer termal, mikrofon, dan speaker dalam satu rangka berdiri. Tidak berjalan seperti robot, jadi lebih hemat dan sanggup menyala sepanjang hari. Mahkota dan panel ukirnya bisa disesuaikan dengan instansi.',
      en: 'A 24-inch portrait touchscreen, a thermal printer, a microphone, and speakers in one standing frame. It does not move like a robot, so it costs less and can stay on all day. The crown and carved panels can be matched to the venue.',
    },
    facts: [
      {
        label: { id: 'Layar', en: 'Screen' },
        value: { id: '24 inci, sentuh kapasitif, tegak', en: '24-inch capacitive touch, portrait' },
      },
      {
        label: { id: 'Printer', en: 'Printer' },
        value: { id: 'Termal 80 mm, pemotong otomatis', en: '80 mm thermal, auto-cutter' },
      },
      {
        label: { id: 'Dibuat di Bali', en: 'Made in Bali' },
        value: {
          id: 'Rangka, casing, ukiran, perakitan, perangkat lunak',
          en: 'Frame, casing, carving, assembly, software',
        },
      },
    ],
    image: 'taksuKiosk',
    fit: 'contain',
    imageAlt: {
      id: 'Taksu Kiosk dengan mahkota bertingkat, layarnya menampilkan menu layanan',
      en: 'Taksu Kiosk with its tiered crown, the screen showing the service menu',
    },
    links: [
      {
        site: 'kiosk',
        path: '/kiosk/kantor-layanan/preview',
        label: { id: 'Coba di totem', en: 'Try it on the totem' },
      },
      { site: 'robot', path: '/kiosk', label: { id: 'Lihat produk', en: 'See the product' } },
    ],
    services: ['custom-robots', 'web'],
  },
  {
    id: 'momo-board',
    kind: 'hardware',
    name: { id: 'Papan kendali Momo', en: 'Momo’s control board' },
    lead: {
      id: 'PCB dua lapis yang menjadi pusat Momo, robot nomor 02.',
      en: 'The two-layer PCB at the heart of Momo, robot number 02.',
    },
    body: {
      id: 'Sensor, motor, dan layar dipasang lewat konektor, tanpa menyolder. Satu papan bisa dirakit ulang menjadi pengikut garis, penghindar rintangan, robot kendali suara, atau stasiun pemantau suhu.',
      en: 'Sensors, motors, and the display plug in through connectors, with no soldering. One board can be rebuilt as a line follower, an obstacle avoider, a sound-controlled robot, or a temperature station.',
    },
    facts: [
      {
        label: { id: 'Pengendali', en: 'Controller' },
        value: { id: 'ESP32-WROOM, Wi-Fi dan Bluetooth', en: 'ESP32-WROOM, Wi-Fi and Bluetooth' },
      },
      {
        label: { id: 'Penggerak motor', en: 'Motor driver' },
        value: { id: 'TB6612FNG', en: 'TB6612FNG' },
      },
      {
        label: { id: 'Daya', en: 'Power' },
        value: {
          id: 'Baterai 2S 18650, BMS, charger, regulator',
          en: '2S 18650 battery, BMS, charger, regulators',
        },
      },
    ],
    image: 'momoBoard',
    fit: 'cover',
    imageAlt: {
      id: 'Papan kendali Momo dengan ESP32 dan deretan konektor modul',
      en: 'Momo’s control board with its ESP32 and a row of module connectors',
    },
    links: [
      { site: 'edu', path: '/robot/momo', label: { id: 'Lihat Momo', en: 'See Momo' } },
      {
        site: 'sim',
        path: '?robot=momo',
        label: { id: 'Coba di simulator', en: 'Try it in the simulator' },
      },
    ],
    services: ['custom-robots', 'iot'],
  },
  {
    id: 'ciko',
    kind: 'hardware',
    name: { id: 'Ciko', en: 'Ciko' },
    lead: {
      id: 'Robot nomor 01: mobil robot 2WD siap pakai untuk anak mulai 7 tahun.',
      en: 'Robot number 01: a ready-to-use 2WD robot car for children from age 7.',
    },
    body: {
      id: 'Datang sudah dirakit dan diuji. Anak memprogramnya dengan blok, lalu melihat robot bergerak, membaca garis dan jarak, berekspresi lewat wajah OLED-nya, dan menyalakan lampu sein sebelum berbelok. Baterainya tertutup dan berproteksi, jadi aman dipakai di rumah maupun di kelas.',
      en: 'It arrives assembled and tested. Children program it with blocks, then watch it move, read lines and distance, show expressions on its OLED face, and switch on a turn signal before it turns. The battery is enclosed and protected, so it is safe at home and in class.',
    },
    facts: [
      {
        label: { id: 'Pengendali', en: 'Controller' },
        value: { id: 'Arduino Nano', en: 'Arduino Nano' },
      },
      {
        label: { id: 'Sensor', en: 'Sensors' },
        value: {
          id: 'Dua sensor garis IR, ultrasonik di depan',
          en: 'Two IR line sensors, a front ultrasonic',
        },
      },
      {
        label: { id: 'Wajah', en: 'Face' },
        value: { id: 'OLED 128×64 dengan ekspresi', en: '128×64 OLED with expressions' },
      },
      {
        label: { id: 'Lampu dan bunyi', en: 'Lights and sound' },
        value: { id: 'Dua lampu sein LED, buzzer', en: 'Two LED turn signals, a buzzer' },
      },
    ],
    image: 'ciko',
    fit: 'cover',
    imageAlt: {
      id: 'Ciko, robot merah bergaris putih dengan wajah OLED dan dua lampu sein',
      en: 'Ciko, the red, white-striped robot with an OLED face and two turn signals',
    },
    links: [
      { site: 'edu', path: '/robot/ciko', label: { id: 'Lihat Ciko', en: 'See Ciko' } },
      {
        site: 'sim',
        path: '?robot=ciko',
        label: { id: 'Coba di simulator', en: 'Try it in the simulator' },
      },
    ],
    services: ['custom-robots'],
  },
  {
    id: 'snow-timo',
    kind: 'hardware',
    name: { id: 'Snow dan Timo Edisi Bali', en: 'Snow and Timo, Bali Edition' },
    lead: {
      id: 'Robot resepsionis impor yang kami sesuaikan untuk Bali.',
      en: 'Imported receptionist robots we adapt for Bali.',
    },
    body: {
      id: 'Unit dasarnya datang dari pabrikan, sisanya kami kerjakan di sini: busana adat yang dijahit pas di bodi, aplikasi layar kami, suara berbahasa Indonesia dan Inggris, dan salam Om Swastiastu.',
      en: 'The base units come from the manufacturer; the rest we do here: traditional dress tailored to the body, our screen app, Indonesian and English voice, and the Om Swastiastu greeting.',
    },
    facts: [
      {
        label: { id: 'Busana', en: 'Dress' },
        value: { id: 'Kamen dan selendang, dijahit pas', en: 'Kamen and sash, tailored to fit' },
      },
      {
        label: { id: 'Navigasi', en: 'Navigation' },
        value: { id: 'LiDAR, mengantar tamu ke ruangan', en: 'LiDAR, walks guests to rooms' },
      },
      {
        label: { id: 'Layar', en: 'Screen' },
        value: { id: '13,3 inci sentuh, aplikasi Taksu', en: '13.3-inch touch, the Taksu app' },
      },
    ],
    image: 'snowTimoBali',
    fit: 'cover',
    imageAlt: {
      id: 'Snow dan Timo berbusana adat Bali di lobi',
      en: 'Snow and Timo in Balinese dress in a lobby',
    },
    links: [
      { site: 'robot', path: '/snow', label: { id: 'Lihat Snow', en: 'See Snow' } },
      { site: 'robot', path: '/timo', label: { id: 'Lihat Timo', en: 'See Timo' } },
    ],
    services: ['web'],
  },
  {
    id: 'kiosk-app',
    kind: 'software',
    name: { id: 'Aplikasi layar resepsionis', en: 'Reception screen app' },
    lead: {
      id: 'Satu aplikasi untuk Snow, Timo, dan Taksu Kiosk.',
      en: 'One app for Snow, Timo, and Taksu Kiosk.',
    },
    body: {
      id: 'Tamu bisa bertanya dengan suara, mengambil nomor antrean, mengisi buku tamu, dan melihat rute ke ruangan. Tiket dan kartu tamu langsung tercetak dengan nama tempat dalam Aksara Bali. Tata letaknya menyesuaikan layar 13,3 inci mendatar maupun 24 inci tegak.',
      en: 'Visitors can ask questions by voice, take a queue number, sign the guest book, and see the route to a room. Tickets and visitor passes print straight away, with the venue’s name in Aksara Bali. The layout fits both the 13.3-inch landscape screen and the 24-inch portrait one.',
    },
    facts: [
      {
        label: { id: 'Suara', en: 'Voice' },
        value: {
          id: 'Indonesia dan Inggris, diproses di server lokal',
          en: 'Indonesian and English, processed on a local server',
        },
      },
      {
        label: { id: 'Tanpa internet', en: 'Offline' },
        value: {
          id: 'Tetap menjawab dari data tempat itu',
          en: 'Still answers from the venue’s own data',
        },
      },
      {
        label: { id: 'Cetak', en: 'Printing' },
        value: {
          id: 'Tiket antrean, kartu tamu, slip rute',
          en: 'Queue tickets, visitor passes, route slips',
        },
      },
    ],
    image: 'kioskApp',
    fit: 'contain',
    imageAlt: {
      id: 'Layar Timo setelah mengambil antrean, tiket B-001 keluar dari printer',
      en: 'Timo’s screen after taking a number, ticket B-001 coming out of the printer',
    },
    links: [
      { site: 'kiosk', path: '', label: { id: 'Buka demo kios', en: 'Open the kiosk demos' } },
      {
        site: 'kiosk',
        path: '/studio',
        label: { id: 'Rakit kios di Studio', en: 'Build a kiosk in the Studio' },
      },
    ],
    services: ['web'],
  },
  {
    id: 'simulator',
    kind: 'software',
    name: { id: 'Simulator blok', en: 'Block simulator' },
    lead: {
      id: 'Program Ciko dan Momo langsung di browser.',
      en: 'Program Ciko and Momo right in the browser.',
    },
    body: {
      id: 'Susun blok, jalankan di arena, lalu lihat robot bergerak dan membaca sensor seperti robot aslinya. Tiap misi adalah satu langkah di jalur belajar robotnya, dan setiap program juga tampil sebagai kode Arduino C++. Bisa dicoba sebelum robotnya datang, atau sebelum membeli.',
      en: 'Stack blocks, run them in the arena, and watch the robot move and read its sensors like the real one. Every mission is a step on the robot’s learning path, and every program also shows as Arduino C++. Try it before the robot arrives, or before buying.',
    },
    facts: [
      {
        label: { id: 'Robot', en: 'Robots' },
        value: { id: 'Ciko dan Momo, 18 misi', en: 'Ciko and Momo, 18 missions' },
      },
      {
        label: { id: 'Pemrograman', en: 'Programming' },
        value: {
          id: 'Blok, dengan kode Arduino C++',
          en: 'Blocks, with the Arduino C++',
        },
      },
      {
        label: { id: 'Akses', en: 'Access' },
        value: { id: 'Gratis, tanpa daftar', en: 'Free, no sign-up' },
      },
    ],
    image: 'simulator',
    fit: 'contain',
    imageAlt: {
      id: 'Simulator dengan blok program dan arena tempat Ciko mengikuti garis',
      en: 'The simulator with the program blocks and the arena where Ciko follows a line',
    },
    links: [
      {
        site: 'sim',
        path: '?robot=ciko',
        label: { id: 'Buka simulator', en: 'Open the simulator' },
      },
    ],
    services: ['web'],
  },
  {
    id: 'store',
    kind: 'software',
    name: { id: 'Toko robot edukasi', en: 'Education robot store' },
    lead: {
      id: 'Tempat memilih robot, memahami jalur belajarnya, dan memesan lewat WhatsApp.',
      en: 'Where people choose a robot, see its learning path, and order over WhatsApp.',
    },
    body: {
      id: 'Robot dipilih menurut usia dan tujuan, lengkap dengan paket, aksesori, upgrade pack, dan arena. Keranjangnya mengubah pesanan dan alamat menjadi satu pesan WhatsApp atau email, tanpa pembayaran di situs. Setiap robot punya jalur belajar gratis, dan sekolah bisa meminta penawaran partai atau OEM.',
      en: 'Robots are chosen by age and goal, with packages, accessories, upgrade packs, and arenas. The cart turns the order and the address into one WhatsApp message or email, with no payment on the site. Every robot has a free learning path, and schools can ask for a bulk or OEM quote.',
    },
    facts: [
      {
        label: { id: 'Robot', en: 'Robots' },
        value: { id: 'Ciko, Momo, Garu, dan Drop', en: 'Ciko, Momo, Garu, and the Drops' },
      },
      {
        label: { id: 'Pesan', en: 'Ordering' },
        value: { id: 'WhatsApp atau email', en: 'WhatsApp or email' },
      },
      {
        label: { id: 'Belajar', en: 'Learning' },
        value: { id: 'Jalur belajar gratis per robot', en: 'A free learning path per robot' },
      },
    ],
    image: 'store',
    fit: 'contain',
    imageAlt: {
      id: 'Beranda toko dengan Ciko, Momo, dan Garu berjajar dengan nomornya',
      en: 'The store home with Ciko, Momo, and Garu lined up with their numbers',
    },
    links: [
      { site: 'edu', path: '', label: { id: 'Buka toko', en: 'Open the store' } },
      {
        site: 'edu',
        path: '/belajar',
        label: { id: 'Lihat jalur belajar', en: 'See the learning paths' },
      },
    ],
    services: ['web'],
  },
];

export const workKinds: readonly WorkKind[] = ['hardware', 'software'];
