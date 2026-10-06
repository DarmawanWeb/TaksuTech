import type { Localized } from './i18n';

export type SimRobot = 'sd' | 'smp';

/** Catalogue entry for a simulator mission. Arenas and scoring live in apps/sim. */
export interface SimMissionInfo {
  id: string;
  robot: SimRobot;
  /** Curriculum module number this mission practises. */
  module: number;
  title: Localized;
  brief: Localized;
}

const l = (id: string, en: string): Localized => ({ id, en });

export const simMissions: readonly SimMissionInfo[] = [
  {
    id: 'sd-kenalan',
    robot: 'sd',
    module: 1,
    title: l('Kenalan dengan robot', 'Meet the robot'),
    brief: l(
      'Tampilkan wajah senang, bunyikan bip, lalu maju sedikit.',
      'Show a happy face, beep, then move forward a little.',
    ),
  },
  {
    id: 'sd-finish',
    robot: 'sd',
    module: 2,
    title: l('Berhenti di garis finis', 'Stop at the finish'),
    brief: l(
      'Atur lama maju agar robot berhenti di zona finis.',
      'Tune how long to drive so the robot stops in the finish zone.',
    ),
  },
  {
    id: 'sd-kotak',
    robot: 'sd',
    module: 3,
    title: l('Kotak dan kembali', 'Square and return'),
    brief: l(
      'Lewati keempat sudut lalu kembali ke awal. Coba pakai ulangi.',
      'Pass all four corners and come back. Try a repeat block.',
    ),
  },
  {
    id: 'sd-rintangan',
    robot: 'sd',
    module: 4,
    title: l('Berhenti sebelum rintangan', 'Stop before the obstacle'),
    brief: l(
      'Maju sampai sensor jarak melihat kotak, lalu berhenti dengan wajah waspada.',
      'Drive until the distance sensor sees the box, then stop with an alert face.',
    ),
  },
  {
    id: 'sd-garis',
    robot: 'sd',
    module: 5,
    title: l('Ikuti garis', 'Follow the line'),
    brief: l(
      'Pakai sensor garis kiri dan kanan untuk menyelesaikan lintasan.',
      'Use the left and right line sensors to finish the track.',
    ),
  },
  {
    id: 'sd-misi-akhir',
    robot: 'sd',
    module: 6,
    title: l('Misi akhir: robot pintar', 'Final mission: smart robot'),
    brief: l(
      'Ikuti garis, berhenti saat ada halangan, tampilkan ekspresi, dan bunyikan bip.',
      'Follow the line, stop at the obstacle, show an expression, and beep.',
    ),
  },
  {
    id: 'smp-pwm',
    robot: 'smp',
    module: 2,
    title: l('Kendali gerak PWM', 'PWM motion control'),
    brief: l(
      'Atur kecepatan motor kiri-kanan dan waktu agar berhenti di zona 1 meter.',
      'Set left and right motor speeds and timing to stop in the 1-metre zone.',
    ),
  },
  {
    id: 'smp-garis',
    robot: 'smp',
    module: 3,
    title: l('Ikuti garis 5 sensor', '5-sensor line following'),
    brief: l(
      'Selesaikan satu putaran lintasan dengan koreksi berdasarkan posisi garis.',
      'Complete a lap using corrections from the line position.',
    ),
  },
  {
    id: 'smp-radar',
    robot: 'smp',
    module: 4,
    title: l('Radar jarak', 'Distance radar'),
    brief: l(
      'Putar servo, bandingkan jarak kiri dan kanan, lalu pilih jalan yang terbuka.',
      'Sweep the servo, compare left and right distances, and take the open path.',
    ),
  },
  {
    id: 'smp-lingkungan',
    robot: 'smp',
    module: 5,
    title: l('Stasiun lingkungan', 'Environment station'),
    brief: l(
      'Tampilkan suhu dan kelembapan di OLED dan ikuti perubahannya.',
      'Show temperature and humidity on the OLED and keep it updated.',
    ),
  },
  {
    id: 'smp-suara',
    robot: 'smp',
    module: 6,
    title: l('Robot tepuk tangan', 'Clap-controlled robot'),
    brief: l(
      'Tepuk sekali robot jalan, tepuk lagi robot berhenti.',
      'Clap once to go, clap again to stop.',
    ),
  },
  {
    id: 'smp-bebas',
    robot: 'smp',
    module: 8,
    title: l('Proyek bebas', 'Free project'),
    brief: l(
      'Arena terbuka dengan garis dan rintangan untuk proyek akhir.',
      'An open arena with lines and obstacles for your final project.',
    ),
  },
];

export function getSimMission(id: string): SimMissionInfo | undefined {
  return simMissions.find((mission) => mission.id === id);
}
