import type { Localized } from './i18n';

export type RobotSlug = 'timo' | 'snow';

export interface RobotSpec {
  label: Localized;
  value: Localized;
}

export interface CommercialRobot {
  slug: RobotSlug;
  name: string;
  tagline: Localized;
  summary: Localized;
  appearance: Localized;
  persona: {
    greeting: Localized;
    /** Web Speech API voice tuning for the kiosk demo. */
    voice: { pitch: number; rate: number };
    tone: Localized;
  };
  specs: RobotSpec[];
  features: { title: Localized; body: Localized }[];
  idealFor: Localized[];
  /** Pairing used for the featured kiosk demo. */
  demoSite: string;
}

const same = (value: string): Localized => ({ id: value, en: value });

/**
 * Specifications are compiled from OEM distributor listings. Public material carries the
 * Taksu Tech label only. Confirm against the OEM datasheet before quoting them in a contract.
 */
export const specSourceNote: Localized = {
  id: 'Spesifikasi dapat berbeda per konfigurasi. Hubungi kami untuk datasheet lengkap sebelum pemesanan.',
  en: 'Specifications may vary by configuration. Contact us for the full datasheet before ordering.',
};

export const robots: readonly CommercialRobot[] = [
  {
    slug: 'timo',
    name: 'Timo',
    tagline: {
      id: 'Resepsionis yang berdiri setinggi tamu Anda',
      en: 'A receptionist that stands at your guests’ eye level',
    },
    summary: {
      id: 'Timo menyambut tamu, menjawab pertanyaan, mengatur antrean, dan mengantar ke ruangan tujuan dengan navigasi LiDAR. Cocok untuk lobi kantor pelayanan, bank, dan hotel.',
      en: 'Timo greets visitors, answers questions, manages queues, and escorts people to their destination with LiDAR navigation. Built for public-service lobbies, banks, and hotels.',
    },
    appearance: {
      id: 'Humanoid ramping setinggi 1,2 meter dengan layar sentuh 13,3 inci.',
      en: 'A slim 1.2-metre humanoid with a 13.3-inch touchscreen.',
    },
    persona: {
      greeting: {
        id: 'Om Swastiastu, saya Timo. Ada yang bisa saya bantu hari ini?',
        en: 'Om Swastiastu, I am Timo. How can I help you today?',
      },
      voice: { pitch: 1, rate: 1 },
      tone: { id: 'Sopan dan sigap', en: 'Courteous and quick' },
    },
    specs: [
      {
        label: { id: 'Dimensi', en: 'Dimensions' },
        value: same('460 × 460 × 1200 mm'),
      },
      { label: { id: 'Berat', en: 'Weight' }, value: same('19–20 kg') },
      {
        label: { id: 'Layar', en: 'Display' },
        value: {
          id: '13,3 inci Full HD, sentuh kapasitif (1920 × 1080)',
          en: '13.3-inch Full HD capacitive touch (1920 × 1080)',
        },
      },
      {
        label: { id: 'Navigasi', en: 'Navigation' },
        value: {
          id: 'LiDAR SLAM, penghindaran rintangan, pengisian daya otomatis',
          en: 'LiDAR SLAM, obstacle avoidance, automatic charging',
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
          id: 'Menyapa tamu langganan dengan nama dan merespons perintah suara.',
          en: 'Greets returning guests by name and responds to spoken requests.',
        },
      },
      {
        title: { id: 'Mengantar ke tujuan', en: 'Escorts to destinations' },
        body: {
          id: 'Memetakan gedung sekali, lalu mengantar tamu ke ruangan mana pun sambil menghindari orang dan barang.',
          en: 'Maps the building once, then guides guests to any room while avoiding people and objects.',
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
      { id: 'Kantor pelayanan publik', en: 'Public-service offices' },
      { id: 'Bank dan asuransi', en: 'Banks and insurers' },
      { id: 'Lobi hotel', en: 'Hotel lobbies' },
      { id: 'Rumah sakit', en: 'Hospitals' },
    ],
    demoSite: 'kantor-layanan',
  },
  {
    slug: 'snow',
    name: 'Snow',
    tagline: {
      id: 'Resepsionis berkarakter yang disukai anak-anak',
      en: 'A character receptionist that children love',
    },
    summary: {
      id: 'Snow bertubuh bulat dengan wajah kartun yang diproyeksikan di kepala. Ia menyambut, bercerita, dan mengantar tamu. Pas untuk resor keluarga, sekolah, dan pusat perbelanjaan.',
      en: 'Snow has a rounded body and a cartoon face projected on its head. It welcomes, tells stories, and guides visitors. A natural fit for family resorts, schools, and malls.',
    },
    appearance: {
      id: 'Tubuh putih membulat setinggi 1,12 meter, lengan pendek, layar sentuh 13,3 inci di dada.',
      en: 'A rounded white body, 1.12 metres tall, short arms, and a 13.3-inch touchscreen on its chest.',
    },
    persona: {
      greeting: {
        id: 'Om Swastiastu! Aku Snow. Mau aku antar ke mana?',
        en: 'Om Swastiastu! I am Snow. Where shall I take you?',
      },
      voice: { pitch: 1.35, rate: 1.05 },
      tone: { id: 'Ceria dan hangat', en: 'Cheerful and warm' },
    },
    specs: [
      {
        label: { id: 'Dimensi', en: 'Dimensions' },
        value: same('550 × 600 × 1120 mm'),
      },
      {
        label: { id: 'Layar', en: 'Display' },
        value: {
          id: '13,3 inci HD, sentuh, di dada (1920 × 1080)',
          en: '13.3-inch HD touch, chest-mounted (1920 × 1080)',
        },
      },
      {
        label: { id: 'Wajah', en: 'Face' },
        value: { id: 'Proyeksi DLP pada kepala kubah', en: 'DLP projection on a domed head' },
      },
      {
        label: { id: 'Navigasi', en: 'Navigation' },
        value: {
          id: 'LiDAR 40 m, akurasi ±50 mm, sensor ultrasonik jarak dekat',
          en: '40 m LiDAR, ±50 mm accuracy, close-range ultrasonic sensor',
        },
      },
      {
        label: { id: 'Kecepatan', en: 'Speed' },
        value: { id: 'Hingga 1,2 m/s', en: 'Up to 1.2 m/s' },
      },
      {
        label: { id: 'Baterai', en: 'Battery' },
        value: {
          id: '15–20 Ah, isi ulang 3–4 jam (tergantung konfigurasi)',
          en: '15–20 Ah, 3–4 h recharge (depends on configuration)',
        },
      },
      {
        label: { id: 'Pengembangan', en: 'Development' },
        value: { id: 'Android, SDK dan API terbuka', en: 'Android, open SDK and API' },
      },
    ],
    features: [
      {
        title: { id: 'Wajah yang ekspresif', en: 'An expressive face' },
        body: {
          id: 'Ekspresi kartun di kepala membuat anak dan tamu nyaman mendekat.',
          en: 'A cartoon expression on its head makes children and guests comfortable approaching it.',
        },
      },
      {
        title: { id: 'Pemandu berbasis LiDAR', en: 'LiDAR-guided tours' },
        body: {
          id: 'Mengantar ke kolam, spa, atau kelas tujuan dengan rute yang menghindari keramaian.',
          en: 'Leads guests to the pool, spa, or classroom on routes that avoid crowds.',
        },
      },
      {
        title: { id: 'Bisa dikembangkan', en: 'Extensible' },
        body: {
          id: 'SDK terbuka memungkinkan kami menambah fitur khusus untuk tempat Anda, seperti antrean dan kalender rahinan.',
          en: 'The open SDK lets us add venue-specific features such as queues and the holy-day calendar.',
        },
      },
    ],
    idealFor: [
      { id: 'Resor dan vila keluarga', en: 'Family resorts and villas' },
      { id: 'Sekolah dan perpustakaan', en: 'Schools and libraries' },
      { id: 'Pusat perbelanjaan', en: 'Shopping malls' },
      { id: 'Klinik anak', en: 'Children’s clinics' },
    ],
    demoSite: 'resort',
  },
];

export function getRobot(slug: string): CommercialRobot | undefined {
  return robots.find((robot) => robot.slug === slug);
}
