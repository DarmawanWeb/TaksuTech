import type { Localized } from './i18n';

export type RobotSlug = 'snow' | 'timo' | 'kiosk';

export interface RobotSpec {
  label: Localized;
  value: Localized;
}

export interface ReceptionRobot {
  slug: RobotSlug;
  name: string;
  edition: Localized;
  kind: 'mobile' | 'static';
  tagline: Localized;
  summary: Localized;
  appearance: Localized;
  persona: {
    greeting: Localized;
    /** Fallback browser voice tuning when the server TTS is not available. */
    voice: { pitch: number; rate: number };
    tone: Localized;
  };
  capabilities: {
    /** Can physically walk a visitor to a room. */
    escort: boolean;
    /** Ticket and pass printing: built into the body, or through a printer station. */
    printer: 'built-in' | 'station';
  };
  /** What Taksu Tech changes or builds for Bali. */
  balinese: Localized[];
  specs: RobotSpec[];
  features: { title: Localized; body: Localized }[];
  idealFor: Localized[];
  /** 1 = most affordable. */
  priceTier: 1 | 2 | 3;
  localContent: Localized;
  demoSite: string;
}

const same = (value: string): Localized => ({ id: value, en: value });

/** Mobile robots are modified OEM platforms; specifications vary by configuration. */
export const specSourceNote: Localized = {
  id: 'Spesifikasi dapat berbeda per konfigurasi. Hubungi kami untuk datasheet lengkap sebelum pemesanan.',
  en: 'Specifications may vary by configuration. Contact us for the full datasheet before ordering.',
};

const balineseEdition: Localized[] = [
  {
    id: 'Busana adat: kamen dan selendang yang dijahit pas di bodi robot',
    en: 'Traditional dress: kamen and sash tailored to the robot body',
  },
  {
    id: 'Salam Om Swastiastu dan suara berbahasa Indonesia, Inggris, dan sapaan Bali',
    en: 'Om Swastiastu greeting with Indonesian, English, and Balinese phrases',
  },
  {
    id: 'Aksara Bali di atas huruf Latin pada setiap layar dan cetakan',
    en: 'Aksara Bali above Latin on every screen and printout',
  },
  {
    id: 'Aplikasi kios Taksu: antrean, buku tamu, petunjuk arah, asisten AI',
    en: 'Taksu kiosk app: queues, guest book, directions, AI assistant',
  },
];

export const robots: readonly ReceptionRobot[] = [
  {
    slug: 'snow',
    name: 'Snow',
    edition: { id: 'Edisi Bali', en: 'Bali Edition' },
    kind: 'mobile',
    tagline: {
      id: 'Resepsionis berkarakter yang disukai keluarga',
      en: 'A character receptionist families love',
    },
    summary: {
      id: 'Snow bertubuh bulat dengan wajah kartun di kepala dan layar sentuh di dada. Edisi Bali mengenakan busana adat, menyapa dengan Om Swastiastu, dan mengantar tamu ke kolam, spa, atau kelas.',
      en: 'Snow has a rounded body, a cartoon face on its head, and a touchscreen on its chest. The Bali Edition wears traditional dress, greets with Om Swastiastu, and walks guests to the pool, spa, or classroom.',
    },
    appearance: {
      id: 'Tubuh putih membulat setinggi 1,12 meter, kepala kubah dengan wajah proyeksi, layar sentuh 13,3 inci di dada.',
      en: 'A rounded white body 1.12 metres tall, a domed head with a projected face, and a 13.3-inch chest touchscreen.',
    },
    persona: {
      greeting: {
        id: 'Om Swastiastu! Aku Snow. Mau aku antar ke mana?',
        en: 'Om Swastiastu! I am Snow. Where shall I take you?',
      },
      voice: { pitch: 1.35, rate: 1.05 },
      tone: { id: 'Ceria dan hangat', en: 'Cheerful and warm' },
    },
    capabilities: { escort: true, printer: 'station' },
    balinese: balineseEdition,
    specs: [
      { label: { id: 'Dimensi', en: 'Dimensions' }, value: same('550 × 600 × 1120 mm') },
      {
        label: { id: 'Layar', en: 'Display' },
        value: { id: '13,3 inci HD, sentuh, di dada', en: '13.3-inch HD touch, chest-mounted' },
      },
      {
        label: { id: 'Wajah', en: 'Face' },
        value: { id: 'Proyeksi pada kepala kubah', en: 'Projected on a domed head' },
      },
      {
        label: { id: 'Navigasi', en: 'Navigation' },
        value: {
          id: 'LiDAR 40 m, akurasi ±50 mm, sensor ultrasonik',
          en: '40 m LiDAR, ±50 mm accuracy, ultrasonic sensor',
        },
      },
      {
        label: { id: 'Kecepatan', en: 'Speed' },
        value: { id: 'Hingga 1,2 m/s', en: 'Up to 1.2 m/s' },
      },
      {
        label: { id: 'Baterai', en: 'Battery' },
        value: { id: '15–20 Ah, isi ulang 3–4 jam', en: '15–20 Ah, 3–4 h recharge' },
      },
    ],
    features: [
      {
        title: { id: 'Wajah ekspresif', en: 'An expressive face' },
        body: {
          id: 'Anak dan tamu nyaman mendekat karena ekspresinya ramah.',
          en: 'Its friendly expression makes children and guests comfortable approaching it.',
        },
      },
      {
        title: { id: 'Mengantar ke tujuan', en: 'Walks guests to rooms' },
        body: {
          id: 'Memetakan area sekali, lalu mengantar ke kolam, spa, atau kelas tujuan.',
          en: 'Maps the venue once, then leads guests to the pool, spa, or classroom.',
        },
      },
      {
        title: { id: 'Bisa diajak bicara', en: 'Holds a conversation' },
        body: {
          id: 'Mendengar pertanyaan dan menjawab dengan suara dalam Bahasa Indonesia atau Inggris.',
          en: 'Listens to questions and answers out loud in Indonesian or English.',
        },
      },
    ],
    idealFor: [
      { id: 'Resor dan vila keluarga', en: 'Family resorts and villas' },
      { id: 'Sekolah dan perpustakaan', en: 'Schools and libraries' },
      { id: 'Pusat perbelanjaan', en: 'Shopping malls' },
    ],
    priceTier: 3,
    localContent: {
      id: 'Unit dasar impor; busana, konten, dan aplikasi dikerjakan di Bali.',
      en: 'Imported base unit; dress, content, and software are made in Bali.',
    },
    demoSite: 'resort',
  },
  {
    slug: 'timo',
    name: 'Timo',
    edition: { id: 'Edisi Bali', en: 'Bali Edition' },
    kind: 'mobile',
    tagline: {
      id: 'Resepsionis setinggi mata tamu',
      en: 'A receptionist at your guests’ eye level',
    },
    summary: {
      id: 'Timo menyambut tamu, menjawab pertanyaan, mengatur antrean, dan mengantar ke ruangan dengan navigasi LiDAR. Edisi Bali tampil berbusana adat dengan layar wajah yang ramah.',
      en: 'Timo greets visitors, answers questions, manages queues, and escorts people with LiDAR navigation. The Bali Edition wears traditional dress and a friendly screen face.',
    },
    appearance: {
      id: 'Humanoid ramping setinggi 1,2 meter dengan layar wajah dan layar sentuh 13,3 inci.',
      en: 'A slim 1.2-metre humanoid with a face screen and a 13.3-inch touchscreen.',
    },
    persona: {
      greeting: {
        id: 'Om Swastiastu, saya Timo. Ada yang bisa saya bantu hari ini?',
        en: 'Om Swastiastu, I am Timo. How can I help you today?',
      },
      voice: { pitch: 1, rate: 1 },
      tone: { id: 'Sopan dan sigap', en: 'Courteous and quick' },
    },
    capabilities: { escort: true, printer: 'station' },
    balinese: balineseEdition,
    specs: [
      { label: { id: 'Dimensi', en: 'Dimensions' }, value: same('460 × 460 × 1200 mm') },
      { label: { id: 'Berat', en: 'Weight' }, value: same('19–20 kg') },
      {
        label: { id: 'Layar', en: 'Display' },
        value: {
          id: '13,3 inci Full HD, sentuh kapasitif',
          en: '13.3-inch Full HD capacitive touch',
        },
      },
      {
        label: { id: 'Navigasi', en: 'Navigation' },
        value: {
          id: 'LiDAR SLAM, hindari rintangan, isi daya otomatis',
          en: 'LiDAR SLAM, obstacle avoidance, auto-charging',
        },
      },
      {
        label: { id: 'Baterai', en: 'Battery' },
        value: { id: 'Litium-ion 15–20 Ah', en: '15–20 Ah lithium-ion' },
      },
    ],
    features: [
      {
        title: { id: 'Mengenali wajah dan suara', en: 'Face and voice recognition' },
        body: {
          id: 'Menyapa tamu langganan dan merespons perintah suara.',
          en: 'Greets returning guests and responds to spoken requests.',
        },
      },
      {
        title: { id: 'Mengantar ke loket', en: 'Escorts to counters' },
        body: {
          id: 'Mengantar ke ruangan mana pun sambil menghindari orang dan barang.',
          en: 'Guides visitors to any room while avoiding people and objects.',
        },
      },
      {
        title: { id: 'Banyak bahasa', en: 'Multilingual' },
        body: {
          id: 'Berganti bahasa dalam satu sentuhan untuk tamu domestik maupun mancanegara.',
          en: 'Switches language in one tap for domestic and international visitors.',
        },
      },
    ],
    idealFor: [
      { id: 'Lobi hotel dan bank', en: 'Hotel and bank lobbies' },
      { id: 'Rumah sakit', en: 'Hospitals' },
      { id: 'Kantor pelayanan publik', en: 'Public-service offices' },
    ],
    priceTier: 2,
    localContent: {
      id: 'Unit dasar impor; busana, konten, dan aplikasi dikerjakan di Bali.',
      en: 'Imported base unit; dress, content, and software are made in Bali.',
    },
    demoSite: 'kantor-layanan',
  },
  {
    slug: 'kiosk',
    name: 'Taksu Kiosk',
    edition: { id: 'Buatan Taksu Tech', en: 'Made by Taksu Tech' },
    kind: 'static',
    tagline: {
      id: 'Kios resepsionis buatan Bali yang mencetak sendiri',
      en: 'A Bali-built reception kiosk with its own printer',
    },
    summary: {
      id: 'Taksu Kiosk adalah totem layar sentuh yang kami rancang dan rakit sendiri. Tidak berjalan, tetapi punya printer termal bawaan untuk tiket antrean, kartu tamu, dan tanda terima, dengan harga paling hemat dan komponen lokal tinggi.',
      en: 'Taksu Kiosk is a touchscreen totem we design and build ourselves. It does not move, but it has a built-in thermal printer for queue tickets, visitor passes, and receipts, at the lowest price and with high local content.',
    },
    appearance: {
      id: 'Totem berdiri dengan mahkota ukir bergaya candi, layar portrait besar, dan papan Aksara Bali di puncaknya.',
      en: 'A standing totem with a temple-style carved crown, a large portrait screen, and an Aksara Bali sign on top.',
    },
    persona: {
      greeting: {
        id: 'Om Swastiastu, selamat datang. Silakan sentuh layar atau langsung bicara.',
        en: 'Om Swastiastu, welcome. Touch the screen or just speak to me.',
      },
      voice: { pitch: 1.05, rate: 1 },
      tone: { id: 'Tenang dan jelas', en: 'Calm and clear' },
    },
    capabilities: { escort: false, printer: 'built-in' },
    balinese: [
      {
        id: 'Panel ukir Bali dan mahkota bergaya candi bentar',
        en: 'Balinese carved panels and a split-gate crown',
      },
      {
        id: 'Papan nama digital Aksara Bali di atas huruf Latin',
        en: 'Digital Aksara Bali signage above Latin',
      },
      {
        id: 'Rangka, casing, perakitan, dan perangkat lunak dikerjakan di Bali',
        en: 'Frame, casing, assembly, and software made in Bali',
      },
      {
        id: 'Cetakan tiket dan kartu tamu dengan kepala Aksara Bali',
        en: 'Tickets and visitor passes printed with an Aksara Bali header',
      },
    ],
    specs: [
      {
        label: { id: 'Bentuk', en: 'Form' },
        value: {
          id: 'Totem berdiri statis, tinggi ±165 cm',
          en: 'Static standing totem, about 165 cm tall',
        },
      },
      {
        label: { id: 'Layar', en: 'Display' },
        value: {
          id: '24 inci sentuh kapasitif, portrait',
          en: '24-inch capacitive touch, portrait',
        },
      },
      {
        label: { id: 'Printer', en: 'Printer' },
        value: {
          id: 'Termal 80 mm dengan pemotong otomatis',
          en: '80 mm thermal with auto-cutter',
        },
      },
      {
        label: { id: 'Suara', en: 'Voice' },
        value: {
          id: 'Mikrofon array dan speaker untuk percakapan',
          en: 'Microphone array and speakers for conversation',
        },
      },
      {
        label: { id: 'Kamera', en: 'Camera' },
        value: {
          id: 'Kamera depan (opsional pengenal wajah)',
          en: 'Front camera (optional face recognition)',
        },
      },
      {
        label: { id: 'Daya', en: 'Power' },
        value: { id: 'Listrik PLN, siap 24 jam', en: 'Mains power, ready 24/7' },
      },
      {
        label: { id: 'Opsi', en: 'Options' },
        value: {
          id: 'Pemindai QR, panel ukir sesuai instansi',
          en: 'QR scanner, carving panels to match the venue',
        },
      },
    ],
    features: [
      {
        title: { id: 'Cetak di tempat', en: 'Prints on the spot' },
        body: {
          id: 'Tiket antrean, kartu tamu dengan QR, slip rute, dan tanda terima keluar langsung dari kios.',
          en: 'Queue tickets, QR visitor passes, route slips, and receipts come straight out of the kiosk.',
        },
      },
      {
        title: { id: 'Komponen lokal tinggi', en: 'High local content' },
        body: {
          id: 'Dirancang, dirakit, dan diprogram di Bali. Disiapkan untuk sertifikasi TKDN agar mudah masuk pengadaan instansi.',
          en: 'Designed, assembled, and programmed in Bali. Prepared for TKDN certification so government procurement is simpler.',
        },
      },
      {
        title: { id: 'Hemat dan tahan lama', en: 'Affordable and durable' },
        body: {
          id: 'Tanpa motor dan baterai besar, jadi lebih murah, minim perawatan, dan siap menyala 24 jam.',
          en: 'No motors or large batteries, so it costs less, needs little maintenance, and runs 24/7.',
        },
      },
    ],
    idealFor: [
      { id: 'Kantor pemerintahan dan desa', en: 'Government and village offices' },
      { id: 'Puskesmas dan rumah sakit', en: 'Clinics and hospitals' },
      { id: 'Bank, kampus, dan objek wisata', en: 'Banks, campuses, and attractions' },
    ],
    priceTier: 1,
    localContent: {
      id: 'Tinggi: rangka, casing, ukiran, perakitan, dan perangkat lunak dari Bali. Persentase TKDN mengikuti hasil sertifikasi.',
      en: 'High: frame, casing, carving, assembly, and software from Bali. The TKDN percentage follows certification.',
    },
    demoSite: 'kantor-layanan',
  },
];

export function getRobot(slug: string): ReceptionRobot | undefined {
  return robots.find((robot) => robot.slug === slug);
}

const yes: Localized = { id: 'Ya', en: 'Yes' };

/** Side-by-side comparison shown on /resepsionis/bandingkan. */
export const comparison: ReadonlyArray<{ label: Localized; values: Record<RobotSlug, Localized> }> =
  [
    {
      label: { id: 'Bentuk', en: 'Form' },
      values: {
        snow: { id: 'Robot bergerak, karakter', en: 'Mobile, character' },
        timo: { id: 'Robot bergerak, humanoid', en: 'Mobile, humanoid' },
        kiosk: { id: 'Kios statis', en: 'Static kiosk' },
      },
    },
    {
      label: { id: 'Mengantar tamu', en: 'Walks guests to rooms' },
      values: {
        snow: yes,
        timo: yes,
        kiosk: { id: 'Cetak slip rute dan QR peta', en: 'Prints a route slip and map QR' },
      },
    },
    {
      label: { id: 'Printer tiket dan kartu tamu', en: 'Ticket and pass printer' },
      values: {
        snow: { id: 'Lewat stasiun printer', en: 'Via printer station' },
        timo: { id: 'Lewat stasiun printer', en: 'Via printer station' },
        kiosk: { id: 'Bawaan, 80 mm', en: 'Built in, 80 mm' },
      },
    },
    {
      label: { id: 'Ukuran layar', en: 'Screen' },
      values: {
        snow: same('13,3"'),
        timo: same('13,3"'),
        kiosk: same('24"'),
      },
    },
    {
      label: { id: 'Percakapan suara (ID/EN)', en: 'Voice conversation (ID/EN)' },
      values: { snow: yes, timo: yes, kiosk: yes },
    },
    {
      label: { id: 'Aksara Bali sesuai Pergub 80/2018', en: 'Aksara Bali per Pergub 80/2018' },
      values: { snow: yes, timo: yes, kiosk: yes },
    },
    {
      label: { id: 'Tampilan Bali', en: 'Balinese look' },
      values: {
        snow: { id: 'Busana adat', en: 'Traditional dress' },
        timo: { id: 'Busana adat', en: 'Traditional dress' },
        kiosk: { id: 'Panel ukir dan mahkota candi', en: 'Carved panels and temple crown' },
      },
    },
    {
      label: { id: 'Daya', en: 'Power' },
      values: {
        snow: { id: 'Baterai, isi otomatis', en: 'Battery, auto-charging' },
        timo: { id: 'Baterai, isi otomatis', en: 'Battery, auto-charging' },
        kiosk: { id: 'Listrik PLN 24 jam', en: 'Mains, 24/7' },
      },
    },
    {
      label: { id: 'Komponen lokal (TKDN)', en: 'Local content (TKDN)' },
      values: {
        snow: { id: 'Rendah, unit dasar impor', en: 'Low, imported base' },
        timo: { id: 'Rendah, unit dasar impor', en: 'Low, imported base' },
        kiosk: { id: 'Tinggi, buatan Bali', en: 'High, built in Bali' },
      },
    },
    {
      label: { id: 'Harga', en: 'Price' },
      values: {
        snow: { id: 'Premium', en: 'Premium' },
        timo: { id: 'Menengah', en: 'Mid-range' },
        kiosk: { id: 'Paling hemat', en: 'Most affordable' },
      },
    },
  ];

export type ReceptionFeatureIcon =
  | 'aksara'
  | 'voice'
  | 'print'
  | 'guestbook'
  | 'route'
  | 'org'
  | 'calendar'
  | 'custom';

/** The Taksu kiosk software that runs on all three. */
export const receptionFeatures: ReadonlyArray<{
  id: ReceptionFeatureIcon;
  title: Localized;
  body: Localized;
}> = [
  {
    id: 'aksara',
    title: { id: 'Aksara Bali sesuai Pergub', en: 'Aksara Bali, as regulated' },
    body: {
      id: 'Nama tempat dan cetakan menampilkan Aksara Bali di atas huruf Latin, sesuai Pergub Bali 80/2018.',
      en: 'Venue names and printouts show Aksara Bali above Latin, following Bali Governor Regulation 80/2018.',
    },
  },
  {
    id: 'voice',
    title: { id: 'Bisa diajak bicara', en: 'Spoken conversation' },
    body: {
      id: 'Pengenalan suara dan suara sintetis berjalan di server Anda sendiri, dengan AI yang hanya menjawab dari data tempat Anda.',
      en: 'Speech recognition and synthesis run on your own server, with an AI that only answers from your venue’s data.',
    },
  },
  {
    id: 'print',
    title: { id: 'Tiket antrean tercetak', en: 'Printed queue tickets' },
    body: {
      id: 'Nomor antrean dengan angka Bali, perkiraan waktu tunggu, dan QR untuk memantau giliran.',
      en: 'Queue numbers in Balinese numerals, an estimated wait, and a QR to follow your turn.',
    },
  },
  {
    id: 'guestbook',
    title: { id: 'Buku tamu dan kartu tamu', en: 'Guest book and visitor pass' },
    body: {
      id: 'Tamu mengisi data di layar, lalu kartu tamu dengan nama Aksara Bali dan QR tercetak otomatis.',
      en: 'Visitors register on screen and get a printed pass with their name in Aksara Bali and a QR code.',
    },
  },
  {
    id: 'route',
    title: { id: 'Petunjuk arah', en: 'Directions' },
    body: {
      id: 'Rute di denah, panduan belokan yang dibacakan, dan robot yang mengantar atau slip rute tercetak.',
      en: 'A route on the floor plan, spoken turn-by-turn guidance, and a robot escort or a printed route slip.',
    },
  },
  {
    id: 'org',
    title: { id: 'Struktur organisasi', en: 'Organisation chart' },
    body: {
      id: 'Siapa bertugas di mana, langsung terhubung ke petunjuk arah ke ruangannya.',
      en: 'Who works where, linked straight to directions to their room.',
    },
  },
  {
    id: 'calendar',
    title: { id: 'Kalender rahinan', en: 'Holy-day calendar' },
    body: {
      id: 'Salam dan informasi menyesuaikan Pawukon: Galungan, Kuningan, Saraswati, dan Tumpek.',
      en: 'Greetings and notices follow the Pawukon: Galungan, Kuningan, Saraswati, and Tumpek.',
    },
  },
  {
    id: 'custom',
    title: { id: 'Aplikasi kustom', en: 'Custom applications' },
    body: {
      id: 'Kami menyesuaikan menu, alur layanan, dan integrasi dengan sistem antrean atau aplikasi instansi Anda.',
      en: 'We tailor menus, service flows, and integrations with your queue system or organisation apps.',
    },
  },
];

/** Bali language regulation the kiosk software is built around. */
export const aksaraRegulation = {
  pergub: 'Peraturan Gubernur Bali Nomor 80 Tahun 2018',
  perda: 'Peraturan Daerah Provinsi Bali Nomor 1 Tahun 2018',
  rule: {
    id: 'Aksara Bali ditempatkan di atas huruf Latin dalam penulisan nama instansi pemerintah, lembaga swasta, layanan publik, dan fasilitas umum di Bali.',
    en: 'Aksara Bali is placed above the Latin script when writing the names of government offices, private organisations, public services, and public facilities in Bali.',
  },
} as const;

export interface UseCase {
  id: string;
  icon: 'hotel' | 'office' | 'hospital' | 'airport' | 'school';
  title: Localized;
  body: Localized;
  robots: RobotSlug[];
  demoSite?: string;
}

export const useCases: readonly UseCase[] = [
  {
    id: 'public-service',
    icon: 'office',
    title: { id: 'Kantor pelayanan publik', en: 'Public-service offices' },
    body: {
      id: 'Antrean tercetak, buku tamu, struktur organisasi, dan papan nama Aksara Bali. Taksu Kiosk cocok untuk pengadaan karena komponen lokalnya tinggi.',
      en: 'Printed queues, a guest book, the organisation chart, and Aksara Bali signage. Taksu Kiosk suits procurement thanks to its high local content.',
    },
    robots: ['kiosk', 'timo'],
    demoSite: 'kantor-layanan',
  },
  {
    id: 'hospitality',
    icon: 'hotel',
    title: { id: 'Hotel, resor, dan vila', en: 'Hotels, resorts, and villas' },
    body: {
      id: 'Menyambut tamu dalam bahasa mereka, menjelaskan fasilitas, mengantar ke spa, dan memberi tips adat Bali.',
      en: 'Welcome guests in their language, explain facilities, walk them to the spa, and share Balinese etiquette.',
    },
    robots: ['snow', 'timo'],
    demoSite: 'resort',
  },
  {
    id: 'healthcare',
    icon: 'hospital',
    title: { id: 'Rumah sakit dan puskesmas', en: 'Hospitals and clinics' },
    body: {
      id: 'Mengarahkan pasien ke poli, mencetak nomor antrean, dan mengurangi kerumunan di meja informasi.',
      en: 'Direct patients to the right clinic, print queue numbers, and ease crowding at the information desk.',
    },
    robots: ['kiosk', 'timo'],
  },
  {
    id: 'transport-retail',
    icon: 'airport',
    title: { id: 'Bandara, pelabuhan, dan mal', en: 'Airports, harbours, and malls' },
    body: {
      id: 'Menjawab pertanyaan wisatawan dan menunjukkan arah ke gerai atau gerbang.',
      en: 'Answer traveller questions and point the way to shops or gates.',
    },
    robots: ['snow', 'kiosk'],
  },
  {
    id: 'campus',
    icon: 'school',
    title: { id: 'Sekolah dan kampus', en: 'Schools and campuses' },
    body: {
      id: 'Menerima tamu sekolah, mencetak kartu tamu, dan mengantar ke ruang kelas.',
      en: 'Receive school visitors, print visitor passes, and lead them to classrooms.',
    },
    robots: ['snow', 'kiosk'],
  },
];

export const receptionProcess: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'survey',
    title: { id: 'Survei lokasi', en: 'Site survey' },
    body: {
      id: 'Kami memetakan alur tamu, titik layanan, jaringan, dan kebutuhan cetak.',
      en: 'We map guest flow, service points, the network, and printing needs.',
    },
  },
  {
    id: 'customise',
    title: { id: 'Kustomisasi', en: 'Customisation' },
    body: {
      id: 'Busana atau panel ukir, Aksara Bali, menu layanan, dan data tempat disiapkan.',
      en: 'Dress or carved panels, Aksara Bali, service menus, and venue data are prepared.',
    },
  },
  {
    id: 'install',
    title: { id: 'Instalasi', en: 'Installation' },
    body: {
      id: 'Robot memetakan gedung atau kios dipasang, lalu AI lokal dan printer diuji.',
      en: 'Robots map the building or the kiosk is installed, then the local AI and printer are tested.',
    },
  },
  {
    id: 'support',
    title: { id: 'Pelatihan dan dukungan', en: 'Training and support' },
    body: {
      id: 'Staf dilatih memperbarui konten. Servis dan pembaruan dari tim kami di Bali.',
      en: 'Staff learn to update content. Service and updates from our team in Bali.',
    },
  },
];
