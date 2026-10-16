import { getGuide } from './guides';
import type { Localized } from './i18n';
import type { RobotSlug } from './robots';
import { getSimMission } from './sim-missions';

const l = (id: string, en: string): Localized => ({ id, en });

/** A video by someone else that explains the idea behind a step well. */
export interface LearnVideo {
  youtube: string;
  title: string;
  channel: string;
  language: 'id' | 'en';
  note: Localized;
}

/**
 * One step on a robot's learning path. A step either opens a simulator mission or points to a
 * guide; its title comes from that mission or guide unless it sets its own.
 */
export interface LearnStep {
  id: string;
  title?: Localized;
  /** The idea the step is about, in a sentence or two. */
  understand: Localized;
  mission?: string;
  guide?: string;
  video?: LearnVideo;
}

/** How an owner gets from the box to understanding the robot: free, online, at their own pace. */
export interface LearnPath {
  robot: RobotSlug;
  intro: Localized;
  steps: LearnStep[];
}

const en = (youtube: string, title: string, channel: string, note: Localized): LearnVideo => ({
  youtube,
  title,
  channel,
  language: 'en',
  note,
});

export const learnPaths: readonly LearnPath[] = [
  {
    robot: 'ciko',
    intro: l(
      'Dua belas langkah dari buka kotak sampai Ciko mengikuti garis dan memilih jalannya sendiri. Setiap langkah bisa dicoba dulu di simulator, lalu di robot.',
      'Twelve steps from unboxing to Ciko following a line and choosing its own way. Try every step in the simulator first, then on the robot.',
    ),
    steps: [
      {
        id: 'buka-kotak',
        title: l('Buka kotak dan isi daya', 'Unbox and charge'),
        understand: l(
          'Isi kotak, cara mengisi daya, dan letak sakelar Ciko.',
          'What is in the box, how to charge, and where Ciko’s switch is.',
        ),
        guide: 'mulai-ciko',
      },
      {
        id: 'kenalan',
        understand: l(
          'Program adalah daftar perintah yang dijalankan berurutan. Ciko menjawab dengan wajah dan bunyi.',
          'A program is a list of commands that run in order. Ciko answers with its face and sound.',
        ),
        mission: 'ciko-kenalan',
        video: en(
          '8wHJjLMnikU',
          'Real-Life Robots',
          'SciShow Kids',
          l(
            'Tonton dulu, lalu tebak: tiap robot di video merasakan apa, dan apa yang ia lakukan sesudahnya?',
            'Watch it first, then guess: what does each robot sense, and what does it do next?',
          ),
        ),
      },
      {
        id: 'maju',
        understand: l(
          'Kecepatan dan lama waktu menentukan seberapa jauh Ciko melaju.',
          'Speed and time decide how far Ciko goes.',
        ),
        mission: 'ciko-finish',
        video: en(
          'Y_paSrH2ffw',
          'Unplugged - Graph Paper Programming',
          'Code.org',
          l(
            'Coba tanpa robot dulu: satu orang jadi robot, yang lain menulis urutan panah.',
            'Try it without a robot first: one person plays the robot while another writes the arrows.',
          ),
        ),
      },
      {
        id: 'belok',
        understand: l(
          'Belok di tempat terjadi saat satu roda maju dan roda lain mundur. Seperempat putaran itu 90 derajat.',
          'A spin turn happens when one wheel goes forward and the other goes back. A quarter turn is 90 degrees.',
        ),
        mission: 'ciko-belok',
      },
      {
        id: 'sein',
        understand: l(
          'Urutan itu penting: nyalakan sein, tunggu sebentar, baru belok, lalu matikan lagi.',
          'Order matters: signal, wait a moment, turn, then switch it off again.',
        ),
        mission: 'ciko-sein',
      },
      {
        id: 'ulangi',
        understand: l(
          'Blok ulangi membuat program tetap pendek saat gerakannya berulang.',
          'A repeat block keeps the program short when the moves repeat.',
        ),
        mission: 'ciko-kotak',
        video: en(
          'JoKTqHCni0M',
          'Unplugged - Getting Loopy',
          'Code.org',
          l(
            'Menari mengikuti pola, lalu tuliskan polanya dengan blok ulangi.',
            'Dance a pattern, then write it down with a repeat block.',
          ),
        ),
      },
      {
        id: 'jarak',
        understand: l(
          'Sensor ultrasonik mengukur jarak dari pantulan suara. Program bisa menunggu sampai jaraknya cukup dekat.',
          'The ultrasonic sensor measures distance from a sound echo. A program can wait until the distance is close enough.',
        ),
        mission: 'ciko-rintangan',
        video: en(
          'q64T_lxw_bs',
          'How do bats see in the dark?',
          'SciShow Kids',
          l(
            'Kelelawar mengukur jarak dari pantulan suara, sama seperti sensor di bumper Ciko.',
            'Bats measure distance from echoes, just like the sensor in Ciko’s bumper.',
          ),
        ),
      },
      {
        id: 'jika',
        understand: l(
          'Jika-tidak membuat robot memilih: kalau dinding dekat, putar balik; kalau tidak, terus maju.',
          'If-else lets the robot choose: if the wall is close, turn around; otherwise, keep going.',
        ),
        mission: 'ciko-hindar',
      },
      {
        id: 'garis',
        understand: l(
          'Dua sensor IR melihat garis hitam. Saat satu sensor menyentuh garis, Ciko berbelok ke arah itu.',
          'Two IR sensors see the black line. When one sensor touches the line, Ciko turns that way.',
        ),
        mission: 'ciko-garis',
        video: en(
          'S6Z8rJB30M4',
          'Line Follower: A Zippy Robot That Senses Where to Go',
          'Science Buddies',
          l(
            'Bandingkan sensor robot di video dengan dua sensor garis Ciko.',
            'Compare the robot’s sensors in the video with Ciko’s two line sensors.',
          ),
        ),
      },
      {
        id: 'garis-lebar',
        understand: l(
          'Kalau kedua sensor melihat hitam bersamaan, itu tanda garis lebar: saatnya berhenti.',
          'When both sensors see black at once, that marks a wide line: time to stop.',
        ),
        mission: 'ciko-persimpangan',
      },
      {
        id: 'misi-akhir',
        understand: l(
          'Gabungkan semuanya: ikuti garis, berhenti saat ada halangan, tampilkan wajah, dan bunyikan bip.',
          'Put it all together: follow the line, stop at the obstacle, show a face, and beep.',
        ),
        mission: 'ciko-misi-akhir',
        video: en(
          '9vJRopau0g0',
          'The Super Mario Effect - Tricking Your Brain into Learning More',
          'TEDx Talks',
          l(
            'Untuk sebelum uji coba besar: kenapa gagal saat mencoba itu bagian dari belajar.',
            'For before a big test run: why failing while you try is part of learning.',
          ),
        ),
      },
      {
        id: 'ke-robot',
        understand: l(
          'Program blok yang sama punya versi C++. Unggah ke Ciko, lalu bandingkan hasilnya dengan simulator.',
          'The same block program has a C++ version. Upload it to Ciko, then compare the result with the simulator.',
        ),
        guide: 'dari-simulator-ke-robot',
      },
    ],
  },
  {
    robot: 'momo',
    intro: l(
      'Sepuluh langkah dari merakit modul sampai proyek buatanmu sendiri: kendali motor, garis 5 sensor, radar, data lingkungan, dan Wi-Fi.',
      'Ten steps from building the modules to a project of your own: motor control, a 5-sensor line array, radar, environment data, and Wi-Fi.',
    ),
    steps: [
      {
        id: 'rakit',
        understand: l(
          'Setiap modul punya tugas: otak, gerak, sensor, layar, dan daya.',
          'Every module has a job: brain, motion, sensors, screen, and power.',
        ),
        guide: 'rakit-momo',
      },
      {
        id: 'sistem',
        understand: l(
          'Input, proses, output: sensor membaca, ESP32 memutuskan, layar dan buzzer menjawab.',
          'Input, process, output: the sensor reads, the ESP32 decides, the screen and buzzer answer.',
        ),
        mission: 'momo-sistem',
        video: en(
          'DKGZlaPlVLY',
          'How Computers Work: CPU, Memory, Input & Output',
          'Code.org',
          l(
            'Setelah menonton, petakan sensor, ESP32, dan aktuator Momo ke input, proses, dan output.',
            'After watching, map Momo’s sensors, ESP32, and actuators to input, process, and output.',
          ),
        ),
      },
      {
        id: 'pwm',
        understand: l(
          'PWM mengatur kecepatan tiap motor. Dua motor tidak pernah benar-benar sama, jadi perlu dikalibrasi.',
          'PWM sets each motor’s speed. Two motors are never quite the same, so you calibrate them.',
        ),
        mission: 'momo-pwm',
        video: en(
          'YU17L650k3s',
          'DC Motor Control with an H-Bridge and Arduino (Lesson #17)',
          'Science Buddies',
          l(
            'Video memakai L293D, Momo memakai TB6612FNG. Cara kerjanya sama: dua pin arah dan satu pin PWM.',
            'The video uses an L293D; Momo uses a TB6612FNG. They work the same way: two direction pins and one PWM pin.',
          ),
        ),
      },
      {
        id: 'garis',
        understand: l(
          'Lima sensor memberi posisi garis, bukan hanya kiri atau kanan. Koreksi yang sebanding dengan posisi itu membuat belok lebih halus.',
          'Five sensors give the line’s position, not just left or right. A correction proportional to that position makes smoother turns.',
        ),
        mission: 'momo-garis',
        video: en(
          'wkfEZmsQqiA',
          'What Is PID Control?',
          'MATLAB',
          l(
            'Bagian P sudah cukup untuk misi ini; I dan D bisa jadi tantangan tambahan.',
            'The P part is enough for this mission; I and D make a good extra challenge.',
          ),
        ),
      },
      {
        id: 'radar',
        understand: l(
          'Servo memutar sensor jarak ke kiri dan kanan, jadi robot bisa membandingkan dua arah sebelum memilih.',
          'The servo turns the distance sensor left and right, so the robot can compare two ways before it chooses.',
        ),
        mission: 'momo-radar',
        video: en(
          'n-gJ00GTsNg',
          'HC-SR04 Ultrasonic Distance Sensor and Arduino (Lesson #9)',
          'Science Buddies',
          l(
            'Perhatikan bagian pin Echo. Di ESP32, sinyal itu harus diturunkan dulu ke 3,3 V.',
            'Watch the part about the Echo pin. On an ESP32, that signal must be brought down to 3.3 V first.',
          ),
        ),
      },
      {
        id: 'lingkungan',
        understand: l(
          'AHT10 mengukur suhu dan kelembapan. OLED dan AHT10 berbagi dua kabel I2C yang sama.',
          'The AHT10 measures temperature and humidity. The OLED and the AHT10 share the same two I2C wires.',
        ),
        mission: 'momo-lingkungan',
        video: en(
          '6IAkYpmA1DQ',
          'How I2C Communication Works and How To Use It with Arduino',
          'How To Mechatronics',
          l(
            'Menjelaskan kenapa banyak modul bisa memakai dua kabel yang sama.',
            'Explains how many modules can share the same two wires.',
          ),
        ),
      },
      {
        id: 'suara',
        understand: l(
          'Mikrofon memberi angka tingkat suara. Ambang menentukan kapan sebuah tepukan dihitung.',
          'The microphone gives a sound level. A threshold decides when a clap counts.',
        ),
        mission: 'momo-suara',
        video: en(
          'bMs5J4bJOD0',
          'How to Use a Microphone with Arduino (Lesson #12)',
          'Science Buddies',
          l(
            'Ukur tingkat suara ruangan saat tenang dan saat ramai, lalu tentukan ambangnya.',
            'Measure the room when it is quiet and when it is noisy, then pick the threshold.',
          ),
        ),
      },
      {
        id: 'telemetri',
        understand: l(
          'ESP32 mengirim data lewat Wi-Fi. Program yang baik tetap jalan saat jaringan putus.',
          'The ESP32 sends data over Wi-Fi. A good program keeps working when the network drops.',
        ),
        mission: 'momo-telemetri',
        video: en(
          'ZhEf7e4kopM',
          'The Internet: Wires, Cables & Wifi',
          'Code.org',
          l(
            'Pengantar sebelum Momo disambungkan ke jaringan.',
            'An introduction before Momo joins a network.',
          ),
        ),
      },
      {
        id: 'bebas',
        understand: l(
          'Rancang proyekmu sendiri: tentukan masalahnya, rakit bentuk yang cocok, uji, lalu perbaiki.',
          'Design your own project: pick a problem, build the right shape, test it, then improve it.',
        ),
        mission: 'momo-bebas',
        video: en(
          'hFZFjoX2cGg',
          'Building the Perfect Squirrel Proof Bird Feeder',
          'Mark Rober',
          l(
            'Contoh rancang, uji, lalu rancang ulang. Ada bagian sponsor di tengah video yang bisa dilewati.',
            'An example of design, test, redesign. There is a sponsor segment in the middle you can skip.',
          ),
        ),
      },
      {
        id: 'ke-robot',
        understand: l(
          'Program yang sama berjalan di ESP32 Momo. Bandingkan hasilnya dengan simulator.',
          'The same program runs on Momo’s ESP32. Compare the result with the simulator.',
        ),
        guide: 'dari-simulator-ke-robot',
      },
    ],
  },
  {
    robot: 'garu',
    intro: l(
      'Jalur belajar Garu terbit bersama robotnya. Sambil menunggu, siapkan ROS 2 dengan panduan di bawah.',
      'Garu’s learning path launches with the robot. Meanwhile, get ROS 2 ready with the guide below.',
    ),
    steps: [
      {
        id: 'persiapan',
        understand: l(
          'Komputer onboard, jaringan, dan ROS 2 sebelum Garu bergerak pertama kali.',
          'The onboard computer, the network, and ROS 2 before Garu first moves.',
        ),
        guide: 'persiapan-garu',
      },
    ],
  },
];

export function learnPath(robot: RobotSlug): LearnPath | undefined {
  return learnPaths.find((path) => path.robot === robot);
}

/** A step's title: its own, or the title of the mission or guide it opens. */
export function stepTitle(step: LearnStep): Localized {
  if (step.title) return step.title;
  const mission = step.mission ? getSimMission(step.mission) : undefined;
  if (mission) return mission.title;
  const guide = step.guide ? getGuide(step.guide) : undefined;
  if (guide) return guide.title;
  return { id: step.id, en: step.id };
}

/** Where a simulator mission sits on its robot's learning path, counting from 1. */
export function missionStep(
  missionId: string,
): { robot: RobotSlug; number: number; total: number; step: LearnStep } | undefined {
  for (const path of learnPaths) {
    const index = path.steps.findIndex((step) => step.mission === missionId);
    const step = path.steps[index];
    if (step) return { robot: path.robot, number: index + 1, total: path.steps.length, step };
  }
  return undefined;
}
