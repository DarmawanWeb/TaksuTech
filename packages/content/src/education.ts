import type { Localized } from './i18n';

export type LevelSlug = 'sd' | 'smp' | 'sma';

/** pilot: ready for school pilot programmes; development: still being engineered. */
export type KitStatus = 'pilot' | 'development';

export interface EducationLevel {
  slug: LevelSlug;
  short: 'SD' | 'SMP' | 'SMA';
  name: Localized;
  ageRange: Localized;
  grades: Localized;
  /** Product name shown on the box, e.g. "SD v1". Placeholder until the line is named. */
  kit: string;
  version: string;
  status: KitStatus;
  tagline: Localized;
  summary: Localized;
  /** How the kit reaches students: ready-made, modular build, or full integration. */
  build: { label: Localized; body: Localized };
  controller: string;
  highlights: Localized[];
  components: { group: Localized; items: Localized[] }[];
  programming: Localized;
  simulator: Localized;
  meetings: number;
  /** Key of the product image in the web app, if one exists. */
  image?: 'kit-sd' | 'kit-smp';
  simTrack?: 'sd' | 'smp';
}

export const educationLevels: readonly EducationLevel[] = [
  {
    slug: 'sd',
    short: 'SD',
    name: { id: 'Sekolah Dasar', en: 'Primary school' },
    ageRange: { id: 'Usia 7–12 tahun', en: 'Ages 7–12' },
    grades: { id: 'Kelas 1–6', en: 'Grades 1–6' },
    kit: 'SD v1',
    version: 'v1',
    status: 'pilot',
    tagline: {
      id: 'Tebak, susun, jalankan, amati, ulangi',
      en: 'Predict, build the program, run, observe, repeat',
    },
    summary: {
      id: 'Robot 2WD yang sudah dirakit dan diuji. Anak memprogram lewat blok, lalu melihat robot bergerak, membaca garis dan jarak, berekspresi lewat wajah OLED, dan berbunyi.',
      en: 'A 2WD robot that arrives assembled and tested. Children program it with blocks, then watch it move, read lines and distance, show expressions on its OLED face, and beep.',
    },
    build: {
      label: { id: 'Siap pakai', en: 'Ready to use' },
      body: {
        id: 'Tidak perlu menyolder, menyambung kabel motor, atau memilih pin. Semua komponen terpasang kuat di dalam bodi.',
        en: 'No soldering, motor wiring, or pin choices. Every part is mounted firmly inside the body.',
      },
    },
    controller: 'Arduino Nano',
    highlights: [
      {
        id: 'Wajah OLED dengan ekspresi senang, bingung, waspada, dan berhasil',
        en: 'OLED face with happy, puzzled, alert, and success expressions',
      },
      {
        id: 'Sensor garis kiri-kanan dan sensor jarak depan',
        en: 'Left and right line sensors plus a front distance sensor',
      },
      {
        id: 'Blok berbahasa anak, unggah program tanpa urusan pin',
        en: 'Child-friendly blocks; uploading hides pins and ports',
      },
      {
        id: 'Tantangan bertingkat: pemula, menengah, lanjutan',
        en: 'Tiered challenges: beginner, intermediate, advanced',
      },
    ],
    components: [
      {
        group: { id: 'Gerak', en: 'Motion' },
        items: [
          {
            id: 'Sasis 2WD, dua motor gearbox, roda, roda penyeimbang',
            en: '2WD chassis, two gear motors, wheels, caster',
          },
          { id: 'Driver motor sesuai arus motor', en: 'Motor driver sized to the motors' },
        ],
      },
      {
        group: { id: 'Otak dan sensor', en: 'Brain and sensors' },
        items: [
          { id: 'Arduino Nano pada carrier terlindung', en: 'Arduino Nano on a protected carrier' },
          { id: 'Sepasang sensor garis IR', en: 'A pair of IR line sensors' },
          { id: 'Sensor jarak ultrasonik', en: 'Ultrasonic distance sensor' },
        ],
      },
      {
        group: { id: 'Umpan balik', en: 'Feedback' },
        items: [
          { id: 'OLED 128×64 untuk wajah', en: '128×64 OLED face' },
          { id: 'Buzzer aktif', en: 'Active buzzer' },
        ],
      },
      {
        group: { id: 'Daya', en: 'Power' },
        items: [
          {
            id: 'Baterai tertutup dengan proteksi dan charger khusus',
            en: 'Enclosed battery with protection and a dedicated charger',
          },
        ],
      },
    ],
    programming: { id: 'Pemrograman blok berbahasa anak', en: 'Child-friendly block programming' },
    simulator: {
      id: 'Semua misi bisa dicoba di simulator sebelum dijalankan di robot.',
      en: 'Every mission can be tried in the simulator before running it on the robot.',
    },
    meetings: 32,
    image: 'kit-sd',
    simTrack: 'sd',
  },
  {
    slug: 'smp',
    short: 'SMP',
    name: { id: 'Sekolah Menengah Pertama', en: 'Junior high school' },
    ageRange: { id: 'Usia 12–15 tahun', en: 'Ages 12–15' },
    grades: { id: 'Kelas 7–9', en: 'Grades 7–9' },
    kit: 'SMP v1',
    version: 'v1',
    status: 'pilot',
    tagline: {
      id: 'Dari memakai robot menjadi merancang sistem',
      en: 'From using a robot to designing a system',
    },
    summary: {
      id: 'Robot 2WD berbasis ESP32 yang dirakit siswa dari modul. Siswa membaca data sensor, menyusun aturan, mengukur hasil, dan menjelaskan keterbatasan rancangannya.',
      en: 'An ESP32 2WD robot that students assemble from modules. They read sensor data, write rules, measure results, and explain the limits of their design.',
    },
    build: {
      label: { id: 'Rakit modular', en: 'Modular build' },
      body: {
        id: 'Modul dipasang lewat PCB dan konektor tanpa menyolder. Konfigurasi bisa diubah: line follower, penghindar rintangan, kendali suara, atau stasiun pemantau.',
        en: 'Modules connect through a PCB and connectors without soldering. Reconfigure it as a line follower, obstacle avoider, sound-controlled robot, or monitoring station.',
      },
    },
    controller: 'ESP32-WROOM',
    highlights: [
      {
        id: 'Sensor garis 5-in-1 untuk kendali proporsional',
        en: '5-in-1 line array for proportional control',
      },
      {
        id: 'Radar jarak: ultrasonik di atas servo',
        en: 'Distance radar: ultrasonic sensor on a servo',
      },
      {
        id: 'Suhu, kelembapan, dan suara sebagai data',
        en: 'Temperature, humidity, and sound as data',
      },
      { id: 'Blok lalu C++, plus telemetri Wi-Fi', en: 'Blocks, then C++, plus Wi-Fi telemetry' },
    ],
    components: [
      {
        group: { id: 'Gerak', en: 'Motion' },
        items: [
          {
            id: 'Sasis aluminium 2WD, dua motor DC dan roda',
            en: 'Aluminium 2WD chassis, two DC motors and wheels',
          },
          { id: 'Driver motor TB6612FNG', en: 'TB6612FNG motor driver' },
          { id: 'Servo untuk gerak tambahan', en: 'Servo for an extra axis' },
        ],
      },
      {
        group: { id: 'Otak dan sensor', en: 'Brain and sensors' },
        items: [
          {
            id: 'ESP32-WROOM dengan Wi-Fi dan Bluetooth',
            en: 'ESP32-WROOM with Wi-Fi and Bluetooth',
          },
          { id: 'Sensor garis IR 5-in-1', en: '5-in-1 IR line array' },
          { id: 'Ultrasonik HC-SR04', en: 'HC-SR04 ultrasonic' },
          { id: 'Sensor suhu dan kelembapan AHT10', en: 'AHT10 temperature and humidity' },
          { id: 'Mikrofon', en: 'Microphone' },
        ],
      },
      {
        group: { id: 'Umpan balik', en: 'Feedback' },
        items: [
          { id: 'OLED SSD1306 128×64', en: 'SSD1306 128×64 OLED' },
          { id: 'Buzzer pasif untuk nada', en: 'Passive buzzer for tones' },
        ],
      },
      {
        group: { id: 'Integrasi dan daya', en: 'Integration and power' },
        items: [
          {
            id: 'PCB kustom dua lapis dan konektor modular',
            en: 'Two-layer custom PCB and modular connectors',
          },
          {
            id: 'Baterai 2S 18650, BMS, charger, regulator, sakelar',
            en: '2S 18650 battery, BMS, charger, regulators, switch',
          },
          { id: 'Casing cetak 3D', en: '3D-printed casing' },
        ],
      },
    ],
    programming: {
      id: 'Blok visual, lalu C++ di Arduino IDE',
      en: 'Visual blocks, then C++ in the Arduino IDE',
    },
    simulator: {
      id: 'Simulator meniru sensor garis 5-in-1, radar servo, suhu, dan suara, lengkap dengan pratinjau kode C++.',
      en: 'The simulator mimics the 5-in-1 line array, servo radar, temperature, and sound, with a C++ code preview.',
    },
    meetings: 36,
    image: 'kit-smp',
    simTrack: 'smp',
  },
  {
    slug: 'sma',
    short: 'SMA',
    name: { id: 'Sekolah Menengah Atas', en: 'Senior high school' },
    ageRange: { id: 'Usia 15–18 tahun', en: 'Ages 15–18' },
    grades: { id: 'Kelas 10–12', en: 'Grades 10–12' },
    kit: 'SMA v1',
    version: 'v1',
    status: 'development',
    tagline: { id: 'Robotika seperti di industri', en: 'Robotics the way industry does it' },
    summary: {
      id: 'Rover dengan komputer onboard, kamera, LiDAR, dan lengan robot. Siswa merakit, mengintegrasikan, dan memprogram ROS 2, computer vision, pemetaan, dan navigasi otonom.',
      en: 'A rover with an onboard computer, camera, LiDAR, and robotic arm. Students assemble, integrate, and program ROS 2, computer vision, mapping, and autonomous navigation.',
    },
    build: {
      label: { id: 'Rakit dan integrasi', en: 'Build and integrate' },
      body: {
        id: 'Siswa merakit mekanik, menghubungkan komputer dengan mikrokontroler, lalu menyatukan sensor dalam sistem ROS 2.',
        en: 'Students build the mechanics, connect the computer to the microcontroller, then bring sensors together in ROS 2.',
      },
    },
    controller: 'Raspberry Pi 5 / NVIDIA Jetson Orin Nano Super',
    highlights: [
      {
        id: 'Dua paket komputasi: Raspberry Pi 5 atau Jetson',
        en: 'Two compute packages: Raspberry Pi 5 or Jetson',
      },
      {
        id: 'ROS 2, OpenCV, dan deteksi objek YOLO',
        en: 'ROS 2, OpenCV, and YOLO object detection',
      },
      { id: 'SLAM, navigasi, dan IoT dengan MQTT', en: 'SLAM, navigation, and IoT with MQTT' },
      { id: 'Lengan robot dan jalur lomba', en: 'Robotic arm and competition tracks' },
    ],
    components: [
      {
        group: { id: 'Komputasi', en: 'Compute' },
        items: [
          { id: 'Paket A: Raspberry Pi 5', en: 'Package A: Raspberry Pi 5' },
          {
            id: 'Paket B: NVIDIA Jetson Orin Nano Super',
            en: 'Package B: NVIDIA Jetson Orin Nano Super',
          },
          {
            id: 'Mikrokontroler ESP32 atau STM32 untuk motor',
            en: 'ESP32 or STM32 microcontroller for motors',
          },
        ],
      },
      {
        group: { id: 'Persepsi', en: 'Perception' },
        items: [
          { id: 'Kamera dan LiDAR 2D', en: 'Camera and 2D LiDAR' },
          { id: 'IMU dan encoder roda', en: 'IMU and wheel encoders' },
        ],
      },
      {
        group: { id: 'Aktuator', en: 'Actuators' },
        items: [
          { id: 'Sasis rover dan motor', en: 'Rover chassis and motors' },
          { id: 'Lengan robot dengan capit', en: 'Robotic arm with gripper' },
        ],
      },
    ],
    programming: { id: 'Python, C++, dan ROS 2', en: 'Python, C++, and ROS 2' },
    simulator: {
      id: 'Simulasi 3D dan digital twin di Gazebo dan RViz sebelum uji lapangan.',
      en: '3D simulation and a digital twin in Gazebo and RViz before field tests.',
    },
    meetings: 36,
  },
];

export function getLevel(slug: string): EducationLevel | undefined {
  return educationLevels.find((level) => level.slug === slug);
}

export type EduAdvantageIcon = 'custom' | 'simulator' | 'build' | 'curriculum' | 'kka' | 'support';

/** Why schools choose the education line. */
export const eduAdvantages: ReadonlyArray<{
  id: EduAdvantageIcon;
  title: Localized;
  body: Localized;
}> = [
  {
    id: 'simulator',
    title: { id: 'Coba gratis di simulator', en: 'Try it free in the simulator' },
    body: {
      id: 'Guru dan siswa bisa mencoba misi sungguhan di browser sebelum sekolah membeli satu robot pun.',
      en: 'Teachers and students can try real missions in the browser before the school buys a single robot.',
    },
  },
  {
    id: 'custom',
    title: { id: 'Bisa dikustom', en: 'Customisable' },
    body: {
      id: 'Pilih modul sensor, komputasi, warna casing, dan logo sekolah. Kurikulum menyesuaikan jam pelajaran Anda.',
      en: 'Choose sensor modules, compute, casing colour, and school logo. The curriculum fits your timetable.',
    },
  },
  {
    id: 'build',
    title: {
      id: 'Dirakit sendiri di SMP dan SMA',
      en: 'Built by students in junior and senior high',
    },
    body: {
      id: 'SD siap pakai. SMP dirakit modular tanpa solder. SMA dirakit dan diintegrasikan penuh.',
      en: 'Primary arrives ready. Junior high builds modularly without soldering. Senior high builds and integrates fully.',
    },
  },
  {
    id: 'curriculum',
    title: { id: 'Kurikulum dan panduan lengkap', en: 'Complete curriculum and guides' },
    body: {
      id: 'Silabus 32–36 pertemuan per jenjang, rubrik penilaian, panduan guru, panduan perakitan, dan panduan keselamatan.',
      en: 'A 32–36 meeting syllabus per level, assessment rubrics, teacher guides, assembly guides, and safety guides.',
    },
  },
  {
    id: 'kka',
    title: { id: 'Mendukung mapel KKA', en: 'Supports the KKA subject' },
    body: {
      id: 'Materi dipetakan ke elemen mata pelajaran pilihan Koding dan Kecerdasan Artifisial (Permendikdasmen 13/2025).',
      en: 'Lessons map to the elements of the elective Coding and Artificial Intelligence subject (Permendikdasmen 13/2025).',
    },
  },
  {
    id: 'support',
    title: { id: 'Didampingi setelah membeli', en: 'Support after purchase' },
    body: {
      id: 'Onboarding, pelatihan guru, dukungan teknis, servis, dan pembaruan materi.',
      en: 'Onboarding, teacher training, technical support, repairs, and content updates.',
    },
  },
];

/** The four-step learning flow shared by every level. */
export const learningPath: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'simulate',
    title: { id: 'Simulasi', en: 'Simulate' },
    body: { id: 'Latihan logika di simulator.', en: 'Practise logic in the simulator.' },
  },
  {
    id: 'build',
    title: { id: 'Rakit', en: 'Build' },
    body: { id: 'Pilih modul, rakit, dan eksplorasi.', en: 'Pick modules, assemble, and explore.' },
  },
  {
    id: 'program',
    title: { id: 'Program', en: 'Program' },
    body: { id: 'Blok dulu, lalu kode.', en: 'Blocks first, then code.' },
  },
  {
    id: 'deploy',
    title: { id: 'Deploy', en: 'Deploy' },
    body: {
      id: 'Jalankan di robot sungguhan dan ukur hasilnya.',
      en: 'Run it on the real robot and measure the result.',
    },
  },
];

/** Upgrade journey from starter kit to professional robot. */
export const upgradePath: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'starter',
    title: { id: 'Starter kit', en: 'Starter kit' },
    body: { id: 'Mulai dari SD v1.', en: 'Start with SD v1.' },
  },
  {
    id: 'sensors',
    title: { id: 'Tambah sensor', en: 'Add sensors' },
    body: {
      id: 'Garis 5-in-1, suhu, suara, servo.',
      en: '5-in-1 line, temperature, sound, servo.',
    },
  },
  {
    id: 'compute',
    title: { id: 'Naikkan komputasi', en: 'Upgrade compute' },
    body: {
      id: 'Nano, lalu ESP32, lalu Raspberry Pi atau Jetson.',
      en: 'Nano, then ESP32, then Raspberry Pi or Jetson.',
    },
  },
  {
    id: 'vision',
    title: { id: 'AI dan vision', en: 'AI and vision' },
    body: { id: 'Kamera, YOLO, dan LiDAR.', en: 'Camera, YOLO, and LiDAR.' },
  },
  {
    id: 'integration',
    title: { id: 'Integrasi sistem', en: 'System integration' },
    body: { id: 'ROS 2, IoT, dan dasbor.', en: 'ROS 2, IoT, and dashboards.' },
  },
  {
    id: 'pro',
    title: { id: 'Robot profesional', en: 'Professional robot' },
    body: {
      id: 'Proyek nyata, riset, dan lomba.',
      en: 'Real projects, research, and competitions.',
    },
  },
];

export const afterSales: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'onboarding',
    title: { id: 'Onboarding', en: 'Onboarding' },
    body: { id: 'Panduan awal dan pendampingan.', en: 'Getting-started guides and hands-on help.' },
  },
  {
    id: 'training',
    title: { id: 'Pelatihan guru', en: 'Teacher training' },
    body: { id: 'Workshop untuk guru dan siswa.', en: 'Workshops for teachers and students.' },
  },
  {
    id: 'support',
    title: { id: 'Dukungan teknis', en: 'Technical support' },
    body: { id: 'Bantuan cepat dan responsif.', en: 'Fast, responsive help.' },
  },
  {
    id: 'docs',
    title: { id: 'Dokumentasi', en: 'Documentation' },
    body: { id: 'Modul, video, dan contoh program.', en: 'Modules, videos, and sample programs.' },
  },
  {
    id: 'repair',
    title: { id: 'Perawatan dan servis', en: 'Maintenance and repair' },
    body: { id: 'Perbaikan dan suku cadang.', en: 'Repairs and spare parts.' },
  },
  {
    id: 'updates',
    title: { id: 'Konten baru', en: 'New content' },
    body: { id: 'Misi dan materi terus diperbarui.', en: 'Missions and lessons keep coming.' },
  },
];

/** Custom-by-request programmes. */
export const customPrograms: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'school',
    title: { id: 'Sekolah', en: 'Schools' },
    body: {
      id: 'Kit, warna, dan logo sekolah, dengan kurikulum yang menyesuaikan jam pelajaran.',
      en: 'Kits in school colours and logo, with a curriculum that fits the timetable.',
    },
  },
  {
    id: 'research',
    title: { id: 'Riset dan kampus', en: 'Research and campuses' },
    body: {
      id: 'Platform robot untuk penelitian, tugas akhir, dan laboratorium.',
      en: 'Robot platforms for research, theses, and labs.',
    },
  },
  {
    id: 'industry',
    title: { id: 'Industri', en: 'Industry' },
    body: {
      id: 'Prototipe dan otomasi untuk kebutuhan produksi atau inspeksi.',
      en: 'Prototypes and automation for production or inspection.',
    },
  },
  {
    id: 'special',
    title: { id: 'Proyek khusus', en: 'Special projects' },
    body: {
      id: 'Robot lomba, pameran, dan instalasi interaktif.',
      en: 'Competition robots, exhibitions, and interactive installations.',
    },
  },
];

/** What a school can tailor. */
export const customOptions: Localized[] = [
  {
    id: 'Pilih modul sensor dan aktuator per kelas',
    en: 'Choose sensor and actuator modules per class',
  },
  {
    id: 'Pilih komputasi: Nano, ESP32, Raspberry Pi, atau Jetson',
    en: 'Choose compute: Nano, ESP32, Raspberry Pi, or Jetson',
  },
  { id: 'Warna casing dan logo sekolah', en: 'Casing colour and school logo' },
  {
    id: 'Silabus disesuaikan jumlah pertemuan dan jam pelajaran',
    en: 'Syllabus fitted to your meetings and lesson length',
  },
  {
    id: 'Paket persiapan lomba WRO, MakeX, dan KRI',
    en: 'Preparation packs for WRO, MakeX, and KRI',
  },
  {
    id: 'Misi simulator khusus untuk materi sekolah',
    en: 'Custom simulator missions for your lessons',
  },
];

export const competitions = ['WRO', 'MakeX', 'KRI'] as const;
