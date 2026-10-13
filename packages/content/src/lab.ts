import type { Localized } from './i18n';
import type { SimRobot } from './sim-missions';

const l = (id: string, en: string): Localized => ({ id, en });

/** Kits a Lab build can be made with. */
export type LabKit = 'sd' | 'smp' | 'sma' | 'other';
export const labKits: readonly LabKit[] = ['sd', 'smp', 'sma', 'other'];

/** Who is posting: shown next to the display name so readers know who is asking. */
export type LabRole = 'teacher' | 'student' | 'parent' | 'other';
export const labRoles: readonly LabRole[] = ['teacher', 'student', 'parent', 'other'];

export interface LabChallenge {
  id: string;
  kit: SimRobot;
  title: Localized;
  brief: Localized;
  /** What has to work before the build counts as done. */
  doneWhen: readonly Localized[];
  /** Simulator mission that practises the same idea. */
  mission?: string;
}

/**
 * Things to change once a module is finished, in the spirit of a hack on a kit build.
 * Each one uses only parts that come in the box.
 */
export const labChallenges: readonly LabChallenge[] = [
  {
    id: 'sd-pengantar-surat',
    kit: 'sd',
    title: l('Robot pengantar surat', 'Letter carrier robot'),
    brief: l(
      'Robot mengikuti lintasan, berhenti di kotak surat berupa garis lebar, membunyikan buzzer, lalu kembali ke awal.',
      'The robot follows the track, stops at a mailbox marked by a wide line, sounds the buzzer, then goes back to the start.',
    ),
    doneWhen: [
      l('Berhenti di kotak surat tanpa disentuh', 'Stops at the mailbox without being touched'),
      l('Buzzer berbunyi dan wajah berubah saat tiba', 'Beeps and changes face on arrival'),
      l('Kembali ke garis awal', 'Returns to the start line'),
    ],
    mission: 'sd-persimpangan',
  },
  {
    id: 'sd-penjaga-meja',
    kit: 'sd',
    title: l('Penjaga meja guru', 'Teacher’s desk guard'),
    brief: l(
      'Robot diam di meja. Saat tangan mendekat, wajahnya waspada dan buzzer berbunyi. Saat tangan menjauh, robot tenang lagi.',
      'The robot sits on the desk. When a hand comes close it looks alert and beeps. When the hand moves away it calms down.',
    ),
    doneWhen: [
      l('Bereaksi pada jarak yang kalian tentukan', 'Reacts at a distance you choose'),
      l('Kembali tenang tanpa ditekan apa pun', 'Calms down again on its own'),
    ],
    mission: 'sd-rintangan',
  },
  {
    id: 'sd-tari',
    kit: 'sd',
    title: l('Tari robot satu menit', 'One-minute robot dance'),
    brief: l(
      'Susun tarian 30 sampai 60 detik dari gerak, bunyi buzzer, dan ekspresi wajah, di dalam area satu meter persegi.',
      'Make a 30 to 60 second dance from moves, buzzer notes, and faces, inside one square metre.',
    ),
    doneWhen: [
      l('Paling sedikit tiga gerakan berbeda', 'At least three different moves'),
      l('Ada bagian yang diulang dengan blok ulangi', 'Part of it repeats with a repeat block'),
      l('Robot tidak keluar area', 'The robot stays inside the area'),
    ],
    mission: 'sd-kotak',
  },
  {
    id: 'smp-radar-pintu',
    kit: 'smp',
    title: l('Radar penjaga pintu', 'Door watch radar'),
    brief: l(
      'Servo memindai pintu kelas dari kiri ke kanan. Sudut benda terdekat tampil di OLED, dan peringatan dikirim ke dasbor Wi-Fi.',
      'The servo sweeps the classroom door from left to right. The angle of the nearest object shows on the OLED, and an alert goes to the Wi-Fi dashboard.',
    ),
    doneWhen: [
      l('Pemindaian penuh tanpa servo tersendat', 'A full sweep without the servo stalling'),
      l(
        'Sudut benda terdekat benar dalam 10 derajat',
        'Nearest-object angle right within 10 degrees',
      ),
      l('Peringatan muncul di dasbor', 'The alert shows on the dashboard'),
    ],
    mission: 'smp-radar',
  },
  {
    id: 'smp-cuaca-kelas',
    kit: 'smp',
    title: l('Stasiun cuaca kelas', 'Classroom weather station'),
    brief: l(
      'Catat suhu dan kelembapan ruang kelas setiap menit selama satu pelajaran, tampilkan grafiknya, dan tandai saat ruangan terlalu panas.',
      'Log the classroom’s temperature and humidity every minute for one lesson, chart it, and flag when the room gets too hot.',
    ),
    doneWhen: [
      l(
        'Data tercatat tanpa celah lebih dari dua menit',
        'No gap in the data longer than two minutes',
      ),
      l('Grafik suhu dan kelembapan terbaca', 'Readable temperature and humidity charts'),
      l('Batas panas dipilih dan dijelaskan', 'A heat threshold chosen and explained'),
    ],
    mission: 'smp-lingkungan',
  },
  {
    id: 'smp-tepuk',
    kit: 'smp',
    title: l('Robot tiga tepukan', 'Three-clap robot'),
    brief: l(
      'Satu tepukan maju, dua tepukan berhenti, tiga tepukan putar balik. Suara orang mengobrol tidak boleh memicu robot.',
      'One clap drives forward, two claps stop, three claps turn around. People talking must not set it off.',
    ),
    doneWhen: [
      l('Membedakan satu, dua, dan tiga tepukan', 'Tells one, two, and three claps apart'),
      l('Tidak bereaksi pada suara bicara biasa', 'Ignores normal conversation'),
    ],
    mission: 'smp-suara',
  },
];

export function getLabChallenge(id: string): LabChallenge | undefined {
  return labChallenges.find((challenge) => challenge.id === id);
}

export type ForumCategory = 'sd' | 'smp' | 'teaching' | 'simulator' | 'competition' | 'other';

export const forumCategories: readonly {
  id: ForumCategory;
  title: Localized;
  summary: Localized;
}[] = [
  {
    id: 'sd',
    title: l('Kit SD v1', 'SD v1 kit'),
    summary: l(
      'Merakit, memprogram, dan merawat SD v1.',
      'Building, programming, and caring for SD v1.',
    ),
  },
  {
    id: 'smp',
    title: l('Kit SMP v1', 'SMP v1 kit'),
    summary: l(
      'Modul, sensor, ESP32, dan C++ di SMP v1.',
      'Modules, sensors, the ESP32, and C++ on SMP v1.',
    ),
  },
  {
    id: 'teaching',
    title: l('Kurikulum dan mengajar', 'Curriculum and teaching'),
    summary: l(
      'Rencana pertemuan, penilaian, dan kelas yang ramai.',
      'Lesson plans, assessment, and busy classrooms.',
    ),
  },
  {
    id: 'simulator',
    title: l('Simulator', 'Simulator'),
    summary: l(
      'Misi, blok, dan kode di simulator.',
      'Missions, blocks, and code in the simulator.',
    ),
  },
  {
    id: 'competition',
    title: l('Lomba dan proyek', 'Competitions and projects'),
    summary: l(
      'Persiapan lomba robotik dan proyek akhir.',
      'Preparing for robotics competitions and final projects.',
    ),
  },
  {
    id: 'other',
    title: l('Lainnya', 'Other'),
    summary: l('Hal lain seputar robotik di sekolah.', 'Anything else about robotics at school.'),
  },
];

export function isForumCategory(value: string): value is ForumCategory {
  return forumCategories.some((category) => category.id === value);
}
