import { curricula } from './curriculum';
import type { Localized } from './i18n';

export type SimRobot = 'sd' | 'smp';

/** Catalogue entry for a simulator mission. Arenas and scoring live in apps/sim. */
export interface SimMissionInfo {
  id: string;
  robot: SimRobot;
  title: Localized;
  brief: Localized;
}

/** Where a mission sits in its kit's syllabus. */
export interface MissionPlace {
  /** Module number, starting at 1. */
  module: number;
  moduleId: string;
  moduleTitle: Localized;
  /** Meeting numbers counted across the whole syllabus, starting at 1. */
  meetings: number[];
}

const l = (id: string, en: string): Localized => ({ id, en });

export const simMissions: readonly SimMissionInfo[] = [
  {
    id: 'sd-kenalan',
    robot: 'sd',
    title: l('Kenalan dengan robot', 'Meet the robot'),
    brief: l(
      'Tampilkan wajah senang, bunyikan bip, lalu maju sedikit.',
      'Show a happy face, beep, then move forward a little.',
    ),
  },
  {
    id: 'sd-finish',
    robot: 'sd',
    title: l('Berhenti di garis finis', 'Stop at the finish'),
    brief: l(
      'Atur lama maju agar robot berhenti di zona finis.',
      'Tune how long to drive so the robot stops in the finish zone.',
    ),
  },
  {
    id: 'sd-belok',
    robot: 'sd',
    title: l('Belok di tikungan', 'Turn at the corner'),
    brief: l(
      'Maju ke tikungan, belok kiri seperempat putaran, lalu berhenti di zona finis.',
      'Drive to the corner, turn left a quarter turn, then stop in the finish zone.',
    ),
  },
  {
    id: 'sd-kotak',
    robot: 'sd',
    title: l('Kotak dan kembali', 'Square and return'),
    brief: l(
      'Lewati keempat sudut lalu kembali ke awal. Coba pakai ulangi.',
      'Pass all four corners and come back. Try a repeat block.',
    ),
  },
  {
    id: 'sd-rintangan',
    robot: 'sd',
    title: l('Berhenti sebelum rintangan', 'Stop before the obstacle'),
    brief: l(
      'Maju sampai sensor jarak melihat kotak, lalu berhenti dengan wajah waspada.',
      'Drive until the distance sensor sees the box, then stop with an alert face.',
    ),
  },
  {
    id: 'sd-hindar',
    robot: 'sd',
    title: l('Putar balik di lorong buntu', 'Turn around in a dead end'),
    brief: l(
      'Robot masuk lorong yang buntu. Pakai jika-tidak: saat dinding dekat, mundur dan putar balik, lalu keluar.',
      'The robot drives into a dead end. Use if-else: when the wall is close, back up and turn around, then drive out.',
    ),
  },
  {
    id: 'sd-garis',
    robot: 'sd',
    title: l('Ikuti garis', 'Follow the line'),
    brief: l(
      'Pakai sensor garis kiri dan kanan untuk menyelesaikan lintasan.',
      'Use the left and right line sensors to finish the track.',
    ),
  },
  {
    id: 'sd-persimpangan',
    robot: 'sd',
    title: l('Berhenti di garis lebar', 'Stop at the wide line'),
    brief: l(
      'Ikuti garis sampai bertemu garis lebar yang melintang, lalu berhenti tepat di situ.',
      'Follow the line until it meets a wide line across the track, then stop right there.',
    ),
  },
  {
    id: 'sd-misi-akhir',
    robot: 'sd',
    title: l('Misi akhir: robot pintar', 'Final mission: smart robot'),
    brief: l(
      'Ikuti garis, berhenti saat ada halangan, tampilkan ekspresi, dan bunyikan bip.',
      'Follow the line, stop at the obstacle, show an expression, and beep.',
    ),
  },
  {
    id: 'smp-pwm',
    robot: 'smp',
    title: l('Kendali gerak PWM', 'PWM motion control'),
    brief: l(
      'Atur kecepatan motor kiri-kanan dan waktu agar berhenti di zona 1 meter.',
      'Set left and right motor speeds and timing to stop in the 1-metre zone.',
    ),
  },
  {
    id: 'smp-garis',
    robot: 'smp',
    title: l('Ikuti garis 5 sensor', '5-sensor line following'),
    brief: l(
      'Selesaikan satu putaran lintasan dengan koreksi berdasarkan posisi garis.',
      'Complete a lap using corrections from the line position.',
    ),
  },
  {
    id: 'smp-radar',
    robot: 'smp',
    title: l('Radar jarak', 'Distance radar'),
    brief: l(
      'Putar servo, bandingkan jarak kiri dan kanan, lalu pilih jalan yang terbuka.',
      'Sweep the servo, compare left and right distances, and take the open path.',
    ),
  },
  {
    id: 'smp-lingkungan',
    robot: 'smp',
    title: l('Stasiun lingkungan', 'Environment station'),
    brief: l(
      'Tampilkan suhu dan kelembapan di OLED dan ikuti perubahannya.',
      'Show temperature and humidity on the OLED and keep it updated.',
    ),
  },
  {
    id: 'smp-suara',
    robot: 'smp',
    title: l('Robot tepuk tangan', 'Clap-controlled robot'),
    brief: l(
      'Tepuk sekali robot jalan, tepuk lagi robot berhenti.',
      'Clap once to go, clap again to stop.',
    ),
  },
  {
    id: 'smp-bebas',
    robot: 'smp',
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

/** The module and meetings that send students to this mission, read from the syllabus. */
export function missionPlace(
  mission: Pick<SimMissionInfo, 'id' | 'robot'>,
): MissionPlace | undefined {
  let meetingNumber = 0;
  let place: MissionPlace | undefined;
  for (const [index, module] of curricula[mission.robot].modules.entries()) {
    for (const meeting of module.meetings) {
      meetingNumber += 1;
      if (meeting.sim !== mission.id) continue;
      place ??= { module: index + 1, moduleId: module.id, moduleTitle: module.title, meetings: [] };
      place.meetings.push(meetingNumber);
    }
  }
  return place;
}
