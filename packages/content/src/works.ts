import type { Localized } from './i18n';
import type { ServiceId } from './services';

export type WorkKind = 'hardware' | 'software';

/** Image keys the company site maps to its own assets. */
export type WorkImage =
  | 'taksuKiosk'
  | 'smpBoard'
  | 'sdV1'
  | 'snowTimoBali'
  | 'kioskApp'
  | 'simulator'
  | 'lab';

export interface WorkLink {
  /** Which of our sites the link opens. */
  site: 'robot' | 'edu' | 'kiosk' | 'sim';
  /** Path after the locale, or a query string for the simulator. */
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
    id: 'smp-board',
    kind: 'hardware',
    name: { id: 'Papan kendali SMP v1', en: 'SMP v1 control board' },
    lead: {
      id: 'PCB dua lapis yang menjadi pusat robot SMP v1.',
      en: 'The two-layer PCB at the heart of the SMP v1 robot.',
    },
    body: {
      id: 'Siswa memasang sensor, motor, dan layar lewat konektor, tanpa menyolder. Satu papan bisa dirakit ulang menjadi pengikut garis, penghindar rintangan, robot kendali suara, atau stasiun pemantau suhu.',
      en: 'Students plug in sensors, motors, and the display through connectors, with no soldering. One board can be rebuilt as a line follower, an obstacle avoider, a sound-controlled robot, or a temperature station.',
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
    image: 'smpBoard',
    fit: 'cover',
    imageAlt: {
      id: 'Papan kendali SMP v1 dengan ESP32 dan deretan konektor modul',
      en: 'The SMP v1 control board with its ESP32 and a row of module connectors',
    },
    links: [
      {
        site: 'edu',
        path: '/kits/smp',
        label: { id: 'Lihat kit SMP v1', en: 'See the SMP v1 kit' },
      },
      {
        site: 'sim',
        path: '?robot=smp',
        label: { id: 'Coba di simulator', en: 'Try it in the simulator' },
      },
    ],
    services: ['custom-robots', 'iot'],
  },
  {
    id: 'sd-v1',
    kind: 'hardware',
    name: { id: 'Robot SD v1', en: 'SD v1 robot' },
    lead: {
      id: 'Robot 2WD siap pakai untuk anak sekolah dasar.',
      en: 'A ready-to-use 2WD robot for primary school children.',
    },
    body: {
      id: 'Datang sudah dirakit dan diuji. Anak memprogramnya dengan blok, lalu melihat robot bergerak, membaca garis dan jarak, dan berekspresi lewat wajah OLED-nya. Baterainya tertutup dan berproteksi, jadi aman dipakai di kelas.',
      en: 'It arrives assembled and tested. Children program it with blocks, then watch it move, read lines and distance, and show expressions on its OLED face. The battery is enclosed and protected, so it is safe in a classroom.',
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
    ],
    image: 'sdV1',
    fit: 'cover',
    imageAlt: {
      id: 'Robot SD v1 dengan roda kuning dan wajah OLED',
      en: 'The SD v1 robot with yellow wheels and an OLED face',
    },
    links: [
      { site: 'edu', path: '/kits/sd', label: { id: 'Lihat kit SD v1', en: 'See the SD v1 kit' } },
      {
        site: 'sim',
        path: '?robot=sd',
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
    name: { id: 'Simulator robot edukasi', en: 'Education robot simulator' },
    lead: {
      id: 'Program robot SD v1 dan SMP v1 langsung di browser.',
      en: 'Program the SD v1 and SMP v1 robots right in the browser.',
    },
    body: {
      id: 'Siswa menyusun blok, menjalankannya di arena, lalu melihat robot bergerak dan membaca sensor seperti robot aslinya. Misinya mengikuti urutan kurikulum, dan untuk SMP v1 ada pratinjau kode C++ dari blok yang disusun. Sekolah bisa mencoba sebelum membeli kit.',
      en: 'Students stack blocks, run them in the arena, and watch the robot move and read its sensors like the real one. The missions follow the curriculum, and for SMP v1 there is a C++ preview of the blocks. Schools can try it before buying a kit.',
    },
    facts: [
      {
        label: { id: 'Robot', en: 'Robots' },
        value: { id: 'SD v1 dan SMP v1', en: 'SD v1 and SMP v1' },
      },
      {
        label: { id: 'Pemrograman', en: 'Programming' },
        value: {
          id: 'Blok, dengan pratinjau C++ untuk SMP v1',
          en: 'Blocks, with a C++ preview for SMP v1',
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
      id: 'Simulator dengan blok program di kiri dan arena robot SD v1 di kanan',
      en: 'The simulator with program blocks on the left and the SD v1 arena on the right',
    },
    links: [
      { site: 'sim', path: '?robot=sd', label: { id: 'Buka simulator', en: 'Open the simulator' } },
    ],
    services: ['web'],
  },
  {
    id: 'lab',
    kind: 'software',
    name: { id: 'Lab robot sekolah', en: 'School robot Lab' },
    lead: {
      id: 'Tempat sekolah memamerkan robot buatan kelasnya dan bertanya di forum.',
      en: 'Where schools show the robots their classes built and ask questions in a forum.',
    },
    body: {
      id: 'Guru mengirim foto dan cerita robot yang dirakit atau diubah siswa, mengikuti tantangan, atau bertanya di forum. Semua kiriman kami periksa dulu sebelum tampil. Foto dikecilkan dan data lokasinya dihapus otomatis, karena yang tampil adalah karya anak sekolah.',
      en: 'Teachers send photos and the story of robots their students built or changed, take on challenges, or ask in the forum. We review every post before it appears. Photos are resized and their location data removed automatically, because these are schoolchildren’s work.',
    },
    facts: [
      {
        label: { id: 'Isi', en: 'Inside' },
        value: { id: 'Karya kelas, tantangan, forum', en: 'Class builds, challenges, a forum' },
      },
      {
        label: { id: 'Moderasi', en: 'Moderation' },
        value: {
          id: 'Setiap kiriman diperiksa sebelum tampil',
          en: 'Every post is reviewed before it appears',
        },
      },
      {
        label: { id: 'Foto', en: 'Photos' },
        value: { id: 'Data lokasi dihapus otomatis', en: 'Location data removed automatically' },
      },
    ],
    image: 'lab',
    fit: 'contain',
    imageAlt: {
      id: 'Halaman Lab dengan ajakan memamerkan robot buatan kelas dan tiga langkah ikut serta',
      en: 'The Lab page inviting classes to show their robots, with three steps to take part',
    },
    links: [{ site: 'edu', path: '/lab', label: { id: 'Buka Lab', en: 'Open the Lab' } }],
    services: ['web'],
  },
];

export const workKinds: readonly WorkKind[] = ['hardware', 'software'];
