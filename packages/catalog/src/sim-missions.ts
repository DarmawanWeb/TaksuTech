import type { Localized } from './i18n';
import type { SimRobot } from './robots';

/** Catalogue entry for a simulator mission. Arenas and scoring live in apps/sim. */
export interface SimMissionInfo {
  id: string;
  robot: SimRobot;
  title: Localized;
  brief: Localized;
}

const l = (id: string, en: string): Localized => ({ id, en });

/** Listed in the order each robot's learning path reaches them. */
export const simMissions: readonly SimMissionInfo[] = [
  {
    id: 'ciko-kenalan',
    robot: 'ciko',
    title: l('Kenalan dengan robot', 'Meet the robot'),
    brief: l(
      'Tampilkan wajah senang, bunyikan bip, lalu maju sedikit.',
      'Show a happy face, beep, then move forward a little.',
    ),
  },
  {
    id: 'ciko-finish',
    robot: 'ciko',
    title: l('Berhenti di garis finis', 'Stop at the finish'),
    brief: l(
      'Atur lama maju agar robot berhenti di zona finis.',
      'Tune how long to drive so the robot stops in the finish zone.',
    ),
  },
  {
    id: 'ciko-belok',
    robot: 'ciko',
    title: l('Belok di tikungan', 'Turn at the corner'),
    brief: l(
      'Maju ke tikungan, belok kiri seperempat putaran, lalu berhenti di zona finis.',
      'Drive to the corner, turn left a quarter turn, then stop in the finish zone.',
    ),
  },
  {
    id: 'ciko-sein',
    robot: 'ciko',
    title: l('Sein sebelum belok', 'Signal before you turn'),
    brief: l(
      'Nyalakan sein kiri, tunggu sebentar, belok di tikungan, lalu matikan sein dan berhenti di finis.',
      'Switch the left signal on, wait a moment, turn at the corner, then switch it off and stop at the finish.',
    ),
  },
  {
    id: 'ciko-kotak',
    robot: 'ciko',
    title: l('Kotak dan kembali', 'Square and return'),
    brief: l(
      'Lewati keempat sudut lalu kembali ke awal. Coba pakai ulangi.',
      'Pass all four corners and come back. Try a repeat block.',
    ),
  },
  {
    id: 'ciko-rintangan',
    robot: 'ciko',
    title: l('Berhenti sebelum rintangan', 'Stop before the obstacle'),
    brief: l(
      'Maju sampai sensor jarak melihat kotak, lalu berhenti dengan wajah waspada.',
      'Drive until the distance sensor sees the box, then stop with an alert face.',
    ),
  },
  {
    id: 'ciko-hindar',
    robot: 'ciko',
    title: l('Putar balik di lorong buntu', 'Turn around in a dead end'),
    brief: l(
      'Robot masuk lorong yang buntu. Pakai jika-tidak: saat dinding dekat, mundur dan putar balik, lalu keluar.',
      'The robot drives into a dead end. Use if-else: when the wall is close, back up and turn around, then drive out.',
    ),
  },
  {
    id: 'ciko-garis',
    robot: 'ciko',
    title: l('Ikuti garis', 'Follow the line'),
    brief: l(
      'Pakai sensor garis kiri dan kanan untuk menyelesaikan lintasan.',
      'Use the left and right line sensors to finish the track.',
    ),
  },
  {
    id: 'ciko-persimpangan',
    robot: 'ciko',
    title: l('Berhenti di garis lebar', 'Stop at the wide line'),
    brief: l(
      'Ikuti garis sampai bertemu garis lebar yang melintang, lalu berhenti tepat di situ.',
      'Follow the line until it meets a wide line across the track, then stop right there.',
    ),
  },
  {
    id: 'ciko-misi-akhir',
    robot: 'ciko',
    title: l('Misi akhir: robot pintar', 'Final mission: smart robot'),
    brief: l(
      'Ikuti garis, berhenti saat ada halangan, tampilkan ekspresi, dan bunyikan bip.',
      'Follow the line, stop at the obstacle, show an expression, and beep.',
    ),
  },
  {
    id: 'momo-sistem',
    robot: 'momo',
    title: l('Satu sensor, satu aksi', 'One sensor, one action'),
    brief: l(
      'Input, proses, output dalam satu program. Baca jarak tangan, tulis di OLED, lalu bunyikan nada saat tangan sudah dekat.',
      'Input, process, output in one program. Read how far the hand is, write it on the OLED, and play a tone once the hand is close.',
    ),
  },
  {
    id: 'momo-pwm',
    robot: 'momo',
    title: l('Kendali gerak PWM', 'PWM motion control'),
    brief: l(
      'Atur kecepatan motor kiri-kanan dan waktu agar berhenti di zona 1 meter.',
      'Set left and right motor speeds and timing to stop in the 1-metre zone.',
    ),
  },
  {
    id: 'momo-garis',
    robot: 'momo',
    title: l('Ikuti garis 5 sensor', '5-sensor line following'),
    brief: l(
      'Selesaikan satu putaran lintasan dengan koreksi berdasarkan posisi garis.',
      'Complete a lap using corrections from the line position.',
    ),
  },
  {
    id: 'momo-radar',
    robot: 'momo',
    title: l('Radar jarak', 'Distance radar'),
    brief: l(
      'Putar servo, bandingkan jarak kiri dan kanan, lalu pilih jalan yang terbuka.',
      'Sweep the servo, compare left and right distances, and take the open path.',
    ),
  },
  {
    id: 'momo-lingkungan',
    robot: 'momo',
    title: l('Stasiun lingkungan', 'Environment station'),
    brief: l(
      'Tampilkan suhu dan kelembapan di OLED dan ikuti perubahannya.',
      'Show temperature and humidity on the OLED and keep it updated.',
    ),
  },
  {
    id: 'momo-suara',
    robot: 'momo',
    title: l('Robot tepuk tangan', 'Clap-controlled robot'),
    brief: l(
      'Tepuk sekali robot jalan, tepuk lagi robot berhenti.',
      'Clap once to go, clap again to stop.',
    ),
  },
  {
    id: 'momo-telemetri',
    robot: 'momo',
    title: l('Dasbor dan mode luring', 'Dashboard and offline mode'),
    brief: l(
      'Kirim suhu ke dasbor lokal lewat Wi-Fi. Di tengah misi Wi-Fi putus: robot tetap menampilkan suhu di OLED dan menulis LURING sampai Wi-Fi kembali.',
      'Send the temperature to a local dashboard over Wi-Fi. Halfway through, the Wi-Fi drops: the robot keeps showing the temperature on its OLED and writes OFFLINE until the Wi-Fi is back.',
    ),
  },
  {
    id: 'momo-bebas',
    robot: 'momo',
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
