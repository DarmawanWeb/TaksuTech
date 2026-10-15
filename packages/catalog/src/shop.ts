import type { Locale, Localized } from './i18n';
import type { RobotSlug } from './robots';

const l = (id: string, en: string): Localized => ({ id, en });

/** available: ships now; preorder: built in batches, ships after confirmation; soon: announced. */
export type Availability = 'available' | 'preorder' | 'soon';

export const availabilityLabels: Record<Availability, Localized> = {
  available: l('Tersedia', 'In stock'),
  preorder: l('Pre-order', 'Pre-order'),
  soon: l('Segera', 'Coming soon'),
};

/** Whether the item can go in the cart and be ordered now. */
export function canOrder(availability: Availability): boolean {
  return availability !== 'soon';
}

export const marketplaces = ['tokopedia', 'shopee'] as const;
export type Marketplace = (typeof marketplaces)[number];
export const marketplaceNames: Record<Marketplace, string> = {
  tokopedia: 'Tokopedia',
  shopee: 'Shopee',
};
/** A product's own listing on each marketplace, once it is listed. */
export type MarketplaceLinks = Partial<Record<Marketplace, string>>;

/** Rupiah without decimals: "Rp1.750.000" in Indonesian, "IDR 1,750,000" in English. */
export function formatRupiah(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00a0/g, locale === 'id' ? '' : ' ');
}

export type ProductKind = 'upgrade' | 'arena' | 'aksesori' | 'sekolah';

export const productKindLabels: Record<ProductKind, Localized> = {
  upgrade: l('Upgrade pack', 'Upgrade packs'),
  arena: l('Arena', 'Arenas'),
  aksesori: l('Aksesori dan suku cadang', 'Accessories and spares'),
  sekolah: l('Untuk kelas', 'For the classroom'),
};

export type ProductIcon =
  | 'remote'
  | 'sensor'
  | 'gripper'
  | 'vision'
  | 'trophy'
  | 'arena'
  | 'battery'
  | 'spares'
  | 'charging'
  | 'storage'
  | 'teacher';

/** Everything sold alongside the robots: upgrade packs, arenas, accessories. */
export interface Product {
  slug: string;
  kind: ProductKind;
  name: Localized;
  icon: ProductIcon;
  tagline: Localized;
  body: Localized;
  includes: Localized[];
  /** Projects the product unlocks, for upgrade packs and arenas. */
  projects?: Localized[];
  fits: RobotSlug[];
  price: number | null;
  availability: Availability;
  marketplace?: MarketplaceLinks;
}

export const products: readonly Product[] = [
  {
    slug: 'remote-pack',
    kind: 'upgrade',
    name: l('Remote Pack', 'Remote Pack'),
    icon: 'remote',
    tagline: l('Kendalikan robot dengan stik', 'Drive the robot with a controller'),
    body: l(
      'Modul remote dan stik kendali untuk mode manual: balapan, sepak bola robot, atau menguji gerak sebelum diprogram.',
      'A remote module and controller for manual mode: races, robot football, or testing motion before programming it.',
    ),
    includes: [
      l('Modul penerima remote', 'Remote receiver module'),
      l('Stik kendali nirkabel', 'Wireless controller'),
      l('Blok untuk tombol dan joystik', 'Blocks for buttons and joysticks'),
    ],
    projects: [
      l('Balap lintasan', 'Track races'),
      l('Sepak bola robot', 'Robot football'),
      l('Mode manual dan otomatis dalam satu program', 'Manual and automatic modes in one program'),
    ],
    fits: ['ciko', 'momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'sensor-pack',
    kind: 'upgrade',
    name: l('Sensor Pack', 'Sensor Pack'),
    icon: 'sensor',
    tagline: l('Robot yang melihat warna dan cahaya', 'A robot that sees colour and light'),
    body: l(
      'Sensor warna, sensor cahaya, dan dua tombol untuk proyek memilah warna, mencari cahaya, dan permainan reaksi.',
      'A colour sensor, a light sensor, and two buttons for colour sorting, light seeking, and reaction games.',
    ),
    includes: [
      l('Sensor warna', 'Colour sensor'),
      l('Sensor cahaya', 'Light sensor'),
      l('Dua tombol dengan konektor', 'Two buttons with connectors'),
    ],
    projects: [
      l('Robot pemilah warna', 'Colour-sorting robot'),
      l('Robot pencari cahaya', 'Light-seeking robot'),
      l('Permainan reaksi dan kuis', 'Reaction games and quizzes'),
    ],
    fits: ['ciko', 'momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'gripper-pack',
    kind: 'upgrade',
    name: l('Gripper Pack', 'Gripper Pack'),
    icon: 'gripper',
    tagline: l('Ambil, angkat, antar', 'Pick it up, carry it, drop it off'),
    body: l(
      'Capit servo yang dipasang di depan Momo, lengkap dengan dudukan dan misi ambil-antar.',
      'A servo gripper that mounts on the front of Momo, with its bracket and pick-and-deliver missions.',
    ),
    includes: [
      l('Capit dan servo', 'Gripper and servo'),
      l('Dudukan dan baut', 'Bracket and screws'),
      l('Kartu misi ambil-antar', 'Pick-and-deliver mission cards'),
    ],
    projects: [
      l('Robot kurir', 'Courier robot'),
      l('Memindahkan balok ke zona warna', 'Moving blocks into colour zones'),
    ],
    fits: ['momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'vision-pack',
    kind: 'upgrade',
    name: l('Vision Pack', 'Vision Pack'),
    icon: 'vision',
    tagline: l('Kamera untuk Momo', 'A camera for Momo'),
    body: l(
      'Modul kamera yang mengirim gambar lewat Wi-Fi, untuk mengenali warna, membaca kode QR, dan mulai belajar AI.',
      'A camera module that streams over Wi-Fi, for recognising colours, reading QR codes, and a first step into AI.',
    ),
    includes: [
      l('Modul kamera Wi-Fi', 'Wi-Fi camera module'),
      l('Dudukan kamera', 'Camera mount'),
      l('Contoh program warna dan QR', 'Sample colour and QR programs'),
    ],
    projects: [
      l('Robot pengikut benda berwarna', 'Robot that follows a coloured object'),
      l('Navigasi dengan penanda QR', 'Navigating by QR markers'),
    ],
    fits: ['momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'competition-pack',
    kind: 'upgrade',
    name: l('Competition Pack', 'Competition Pack'),
    icon: 'trophy',
    tagline: l('Persiapan lomba robotik', 'Robotics competition prep'),
    body: l(
      'Komponen tambahan, latihan bertingkat, dan panduan strategi untuk tim yang menuju WRO, MakeX, atau KRI.',
      'Extra parts, graded drills, and a strategy guide for teams heading to WRO, MakeX, or KRI.',
    ),
    includes: [
      l('Komponen tambahan sesuai kategori lomba', 'Extra parts for the competition category'),
      l('Latihan bertingkat', 'Graded drills'),
      l('Panduan strategi tim', 'Team strategy guide'),
    ],
    projects: [
      l('Simulasi babak lomba', 'Mock competition rounds'),
      l('Jurnal desain tim', 'Team design journal'),
    ],
    fits: ['momo', 'garu'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'arena-pack',
    kind: 'arena',
    name: l('Arena Pack', 'Arena Pack'),
    icon: 'arena',
    tagline: l('Lintasan yang sama dengan simulator', 'The same tracks as the simulator'),
    body: l(
      'Matras lintasan, balok rintangan, dan penanda zona yang sama dengan arena di simulator, jadi program yang lulus di layar bisa langsung diuji di lantai.',
      'Track mats, obstacle blocks, and zone markers that match the simulator arenas, so a program that passes on screen can be tested on the floor straight away.',
    ),
    includes: [
      l('Dua matras lintasan', 'Two track mats'),
      l('Balok rintangan', 'Obstacle blocks'),
      l('Penanda start, finis, dan zona', 'Start, finish, and zone markers'),
    ],
    projects: [
      l('Semua misi simulator di robot nyata', 'Every simulator mission on the real robot'),
      l('Lomba kecil di rumah atau di kelas', 'Small contests at home or in class'),
    ],
    fits: ['ciko', 'momo', 'garu'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'baterai-cadangan',
    kind: 'aksesori',
    name: l('Baterai cadangan', 'Spare battery'),
    icon: 'battery',
    tagline: l('Tetap jalan saat satu baterai diisi', 'Keep going while one battery charges'),
    body: l(
      'Paket baterai tertutup dengan proteksi, sama dengan bawaan robot.',
      'An enclosed, protected battery pack, the same as the one in the robot.',
    ),
    includes: [l('Satu paket baterai tertutup', 'One enclosed battery pack')],
    fits: ['ciko', 'momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'suku-cadang',
    kind: 'aksesori',
    name: l('Set suku cadang', 'Spare parts set'),
    icon: 'spares',
    tagline: l('Untuk servis ringan sendiri', 'For small repairs at home'),
    body: l(
      'Roda, ban, roda bebas, baut, dan kabel konektor untuk perbaikan kecil.',
      'Wheels, tyres, casters, screws, and connector cables for small repairs.',
    ),
    includes: [
      l('Roda dan ban', 'Wheels and tyres'),
      l('Roda bebas dan baut', 'Casters and screws'),
      l('Kabel konektor', 'Connector cables'),
    ],
    fits: ['ciko', 'momo', 'garu'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'stasiun-pengisian',
    kind: 'sekolah',
    name: l('Stasiun pengisian', 'Charging station'),
    icon: 'charging',
    tagline: l('Isi banyak baterai sekaligus', 'Charge many batteries at once'),
    body: l(
      'Mengisi beberapa baterai sekaligus di satu meja, dengan indikator penuh per slot.',
      'Charges several batteries at once on one desk, with a full indicator per slot.',
    ),
    includes: [
      l('Stasiun pengisian multi-slot', 'Multi-slot charging station'),
      l('Adaptor daya', 'Power adapter'),
    ],
    fits: ['ciko', 'momo'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'kotak-penyimpanan',
    kind: 'sekolah',
    name: l('Kotak penyimpanan', 'Storage case'),
    icon: 'storage',
    tagline: l('Satu kotak, semua komponen terhitung', 'One case, every part accounted for'),
    body: l(
      'Kotak bersekat untuk robot, baterai, dan komponen, agar mudah dicek setelah dipakai.',
      'A divided case for robots, batteries, and parts, so a quick check after use is easy.',
    ),
    includes: [l('Kotak bersekat dengan label', 'Divided case with labels')],
    fits: ['ciko', 'momo', 'garu'],
    price: null,
    availability: 'soon',
  },
  {
    slug: 'kit-pengajar',
    kind: 'sekolah',
    name: l('Kit pengajar', 'Instructor kit'),
    icon: 'teacher',
    tagline: l('Untuk mengajar di depan kelas', 'For teaching at the front of the class'),
    body: l(
      'Robot demo, panduan pengajar cetak, dan kartu misi untuk kelas, kursus, atau ekstrakurikuler.',
      'A demo robot, a printed instructor guide, and mission cards for classes, courses, or clubs.',
    ),
    includes: [
      l('Robot demo', 'Demo robot'),
      l('Panduan pengajar cetak', 'Printed instructor guide'),
      l('Kartu misi', 'Mission cards'),
    ],
    fits: ['ciko', 'momo', 'garu'],
    price: null,
    availability: 'soon',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function productsFor(robot: RobotSlug): Product[] {
  return products.filter((product) => product.fits.includes(robot));
}
