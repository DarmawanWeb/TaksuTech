import type { LevelSlug } from './education';
import type { Localized } from './i18n';

const l = (id: string, en: string): Localized => ({ id, en });

/** soon: announced and in development; available: can be ordered with a kit. */
export type AddOnStatus = 'available' | 'soon';

export type UpgradeIcon = 'remote' | 'sensor' | 'gripper' | 'vision' | 'arena' | 'trophy';

/** An upgrade pack adds new abilities, and new projects, to a base kit. */
export interface UpgradePack {
  id: string;
  /** Pack name on the box. Placeholder-friendly, like the kit names. */
  name: string;
  icon: UpgradeIcon;
  tagline: Localized;
  body: Localized;
  includes: Localized[];
  projects: Localized[];
  fits: LevelSlug[];
  status: AddOnStatus;
}

export interface Accessory {
  id: string;
  name: Localized;
  body: Localized;
  fits: LevelSlug[];
  status: AddOnStatus;
}

export const upgradePacks: readonly UpgradePack[] = [
  {
    id: 'remote',
    name: 'Remote Pack',
    icon: 'remote',
    tagline: l('Kendalikan robot dengan stik', 'Drive the robot with a controller'),
    body: l(
      'Modul remote dan stik kendali untuk mode manual: balapan, sepak bola robot, atau menguji gerak sebelum diprogram.',
      'A remote module and controller for manual mode: races, robot football, or testing motion before programming it.',
    ),
    includes: [
      l('Modul penerima remote', 'Remote receiver module'),
      l('Stik kendali nirkabel', 'Wireless controller'),
      l('Blok pemrograman tombol dan joystik', 'Programming blocks for buttons and joysticks'),
    ],
    projects: [
      l('Balap lintasan antarkelompok', 'Team track races'),
      l('Sepak bola robot', 'Robot football'),
      l('Mode manual-otomatis dalam satu program', 'Manual and automatic modes in one program'),
    ],
    fits: ['sd', 'smp'],
    status: 'soon',
  },
  {
    id: 'sensor',
    name: 'Sensor Pack',
    icon: 'sensor',
    tagline: l('Robot yang melihat warna dan cahaya', 'A robot that sees colour and light'),
    body: l(
      'Sensor warna, sensor cahaya, dan tombol tambahan untuk proyek memilah, mencari cahaya, dan permainan reaksi.',
      'A colour sensor, a light sensor, and extra buttons for sorting, light-seeking, and reaction-game projects.',
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
    fits: ['sd', 'smp'],
    status: 'soon',
  },
  {
    id: 'gripper',
    name: 'Gripper Pack',
    icon: 'gripper',
    tagline: l('Ambil, angkat, antar', 'Pick it up, carry it, drop it off'),
    body: l(
      'Capit servo yang dipasang di depan robot, lengkap dengan dudukan dan misi ambil-antar.',
      'A servo gripper that mounts on the front of the robot, with its bracket and pick-and-deliver missions.',
    ),
    includes: [
      l('Capit dan servo', 'Gripper and servo'),
      l('Dudukan dan baut', 'Bracket and screws'),
      l('Kartu misi ambil-antar', 'Pick-and-deliver mission cards'),
    ],
    projects: [
      l('Robot kurir kelas', 'Classroom courier robot'),
      l('Memindahkan balok ke zona warna', 'Moving blocks into colour zones'),
    ],
    fits: ['smp'],
    status: 'soon',
  },
  {
    id: 'vision',
    name: 'Vision Pack',
    icon: 'vision',
    tagline: l('Kamera untuk robot SMP', 'A camera for the junior high robot'),
    body: l(
      'Modul kamera yang mengirim gambar lewat Wi-Fi, untuk mengenali warna, membaca kode QR, dan memulai belajar AI.',
      'A camera module that streams over Wi-Fi, for recognising colours, reading QR codes, and a first step into AI.',
    ),
    includes: [
      l('Modul kamera Wi-Fi', 'Wi-Fi camera module'),
      l('Dudukan kamera', 'Camera mount'),
      l('Contoh program pengenalan warna dan QR', 'Sample colour and QR recognition programs'),
    ],
    projects: [
      l('Robot pengikut objek berwarna', 'Robot that follows a coloured object'),
      l('Navigasi dengan penanda QR', 'Navigating by QR markers'),
    ],
    fits: ['smp'],
    status: 'soon',
  },
  {
    id: 'arena',
    name: 'Arena Pack',
    icon: 'arena',
    tagline: l('Lintasan siap pakai untuk kelas', 'A ready-made track for class'),
    body: l(
      'Matras lintasan, rintangan, dan penanda zona yang sama dengan arena di simulator, jadi program bisa langsung diuji.',
      'Track mats, obstacles, and zone markers that match the simulator arenas, so programs can be tested straight away.',
    ),
    includes: [
      l('Dua matras lintasan', 'Two track mats'),
      l('Balok rintangan', 'Obstacle blocks'),
      l('Penanda start, finis, dan zona', 'Start, finish, and zone markers'),
    ],
    projects: [
      l('Semua misi kurikulum di robot nyata', 'Every curriculum mission on the real robot'),
      l('Lomba antarkelompok di kelas', 'Team competitions in class'),
    ],
    fits: ['sd', 'smp', 'sma'],
    status: 'soon',
  },
  {
    id: 'competition',
    name: 'Competition Pack',
    icon: 'trophy',
    tagline: l('Persiapan lomba robotik', 'Robotics competition prep'),
    body: l(
      'Komponen tambahan, latihan, dan panduan strategi untuk tim yang menuju lomba WRO, MakeX, atau KRI.',
      'Extra parts, drills, and strategy guides for teams heading to WRO, MakeX, or KRI.',
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
    fits: ['smp', 'sma'],
    status: 'soon',
  },
];

export const accessories: readonly Accessory[] = [
  {
    id: 'battery',
    name: l('Baterai cadangan', 'Spare battery'),
    body: l(
      'Paket baterai tertutup dengan proteksi, agar kelas tidak berhenti saat robot diisi.',
      'An enclosed, protected battery pack so class carries on while robots charge.',
    ),
    fits: ['sd', 'smp'],
    status: 'soon',
  },
  {
    id: 'charging',
    name: l('Stasiun pengisian kelas', 'Classroom charging station'),
    body: l(
      'Mengisi beberapa baterai sekaligus di meja guru, dengan indikator penuh per slot.',
      'Charges several batteries at once on the teacher’s desk, with a full indicator per slot.',
    ),
    fits: ['sd', 'smp'],
    status: 'soon',
  },
  {
    id: 'spares',
    name: l('Set suku cadang', 'Spare parts set'),
    body: l(
      'Roda, ban, roda bebas, baut, dan kabel konektor untuk servis ringan di sekolah.',
      'Wheels, tyres, casters, screws, and connector cables for small repairs at school.',
    ),
    fits: ['sd', 'smp', 'sma'],
    status: 'soon',
  },
  {
    id: 'storage',
    name: l('Kotak penyimpanan kelas', 'Classroom storage case'),
    body: l(
      'Kotak bersekat untuk robot, baterai, dan komponen, agar inventaris mudah dicek.',
      'A divided case for robots, batteries, and parts, so stocktakes are quick.',
    ),
    fits: ['sd', 'smp', 'sma'],
    status: 'soon',
  },
  {
    id: 'teacher',
    name: l('Kit guru', 'Teacher kit'),
    body: l(
      'Robot demo, panduan guru cetak, dan kartu misi untuk mengajar di depan kelas.',
      'A demo robot, a printed teacher guide, and mission cards for teaching at the front of the class.',
    ),
    fits: ['sd', 'smp', 'sma'],
    status: 'soon',
  },
];

export function addOnsFor(level: LevelSlug) {
  return {
    packs: upgradePacks.filter((pack) => pack.fits.includes(level)),
    accessories: accessories.filter((item) => item.fits.includes(level)),
  };
}

/** Questions schools ask before buying. */
export const eduFaq: ReadonlyArray<{ id: string; question: Localized; answer: Localized }> = [
  {
    id: 'experience',
    question: l(
      'Guru kami belum pernah mengajar robotik. Bisa?',
      'Our teachers have never taught robotics. Can they?',
    ),
    answer: l(
      'Bisa. Setiap pertemuan punya tujuan, langkah kegiatan, dan bukti belajar. Kami memberi pelatihan guru di awal dan mendampingi selama program pilot.',
      'Yes. Every meeting has a goal, activity steps, and evidence of learning. We train teachers at the start and support them through the pilot.',
    ),
  },
  {
    id: 'solder',
    question: l('Apakah siswa perlu menyolder?', 'Do students need to solder?'),
    answer: l(
      'Tidak. SD v1 datang sudah dirakit. SMP v1 dirakit dari modul dengan konektor berkunci. SMA v1 dirakit penuh, tetap tanpa solder untuk kegiatan inti.',
      'No. SD v1 arrives assembled. SMP v1 is built from modules with keyed connectors. SMA v1 is fully assembled by students, still without soldering for core activities.',
    ),
  },
  {
    id: 'internet',
    question: l('Apakah butuh internet?', 'Do we need internet?'),
    answer: l(
      'Simulator berjalan di browser. Pemrograman dan kegiatan inti robot tetap bisa dilakukan luring; hanya proyek telemetri Wi-Fi yang butuh jaringan kelas.',
      'The simulator runs in the browser. Programming and core robot activities work offline; only the Wi-Fi telemetry projects need a class network.',
    ),
  },
  {
    id: 'curriculum',
    question: l('Apakah sesuai kurikulum sekolah?', 'Does it fit the school curriculum?'),
    answer: l(
      'Materi dipetakan ke elemen mata pelajaran pilihan Koding dan Kecerdasan Artifisial, dan jumlah pertemuan bisa disesuaikan dengan jam pelajaran Anda.',
      'Lessons map to the elements of the elective Coding and Artificial Intelligence subject, and the number of meetings can be fitted to your timetable.',
    ),
  },
  {
    id: 'group',
    question: l('Berapa robot untuk satu kelas?', 'How many robots does a class need?'),
    answer: l(
      'Kami menyarankan satu robot untuk dua sampai tiga siswa, dengan peran bergilir: programmer, penguji, dan pencatat.',
      'We suggest one robot for two to three students, rotating roles: programmer, tester, and recorder.',
    ),
  },
  {
    id: 'battery',
    question: l('Bagaimana keamanan baterainya?', 'How safe are the batteries?'),
    answer: l(
      'Baterai tertutup dengan proteksi dan hanya diisi dengan charger yang ditentukan. Sel baterai tidak pernah diberikan lepas kepada siswa.',
      'Batteries are enclosed and protected, and only charged with the specified charger. Loose cells are never handed to students.',
    ),
  },
  {
    id: 'upgrade',
    question: l(
      'Kalau naik jenjang, apakah harus beli robot baru?',
      'Do we need new robots when students move up a level?',
    ),
    answer: l(
      'Tidak selalu. Upgrade pack menambah kemampuan robot yang sudah ada, dan semua jenjang memakai cara belajar yang sama: simulasi, rakit, program, uji.',
      'Not always. Upgrade packs add abilities to the robots you have, and every level shares the same way of learning: simulate, build, program, test.',
    ),
  },
  {
    id: 'price',
    question: l('Berapa harganya?', 'How much does it cost?'),
    answer: l(
      'Harga menyesuaikan jumlah robot, paket, dan pelatihan. Minta proposal sekolah dan kami kirim rinciannya.',
      'Pricing depends on the number of robots, packs, and training. Request a school proposal and we will send the details.',
    ),
  },
];
