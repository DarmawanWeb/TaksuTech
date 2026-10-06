import type { Localized } from './i18n';

export type LevelSlug = 'sd' | 'smp' | 'sma';

export interface EducationLevel {
  slug: LevelSlug;
  short: 'SD' | 'SMP' | 'SMA';
  name: Localized;
  ageRange: Localized;
  robotName: Localized;
  summary: Localized;
  highlights: Localized[];
  modules: Localized[];
  programming: Localized;
  hardware: { title: Localized; items: Localized[] };
  simulation: Localized;
  /** Playground track that demonstrates this level, if any. */
  playgroundTrack?: 'sd' | 'smp';
}

export const educationLevels: readonly EducationLevel[] = [
  {
    slug: 'sd',
    short: 'SD',
    name: { id: 'Sekolah Dasar', en: 'Primary school' },
    ageRange: { id: 'Usia 7–12 tahun', en: 'Ages 7–12' },
    robotName: { id: 'Robot Edukasi', en: 'Education Robot' },
    summary: {
      id: 'Robot mungil yang aman dan berwarna ceria. Anak belajar logika dan urutan dengan menyusun blok kode, lalu melihat robotnya bergerak sungguhan.',
      en: 'A small, safe, cheerful robot. Children learn logic and sequencing by snapping code blocks together, then watch the real robot move.',
    },
    highlights: [
      { id: 'Desain aman tanpa sudut tajam', en: 'Safe design with no sharp edges' },
      { id: 'Mudah dirakit di kelas', en: 'Easy to assemble in class' },
      { id: 'Sensor cahaya, sentuh, dan garis', en: 'Light, touch, and line sensors' },
      { id: 'Motor presisi yang senyap', en: 'Precise, quiet motors' },
    ],
    modules: [
      { id: 'Pengenalan robot', en: 'Meet the robot' },
      { id: 'Logika dan urutan', en: 'Logic and sequencing' },
      { id: 'Gerak dan arah', en: 'Motion and direction' },
      { id: 'Sensor dasar', en: 'Basic sensors' },
      { id: 'Mengikuti garis', en: 'Line following' },
      { id: 'Menghindari rintangan', en: 'Obstacle avoidance' },
    ],
    programming: {
      id: 'Pemrograman blok (drag and drop)',
      en: 'Block programming (drag and drop)',
    },
    hardware: {
      title: { id: 'Yang ada di dalam kit', en: 'Inside the kit' },
      items: [
        { id: 'Robot rakit dengan cangkang', en: 'Robot with snap-on shell' },
        { id: 'Baterai isi ulang USB-C', en: 'USB-C rechargeable battery' },
        { id: 'Matras jalur garis', en: 'Line-track mat' },
        { id: 'Kartu tantangan', en: 'Challenge cards' },
      ],
    },
    simulation: {
      id: 'Simulasi interaktif di browser untuk mencoba program sebelum dijalankan di robot.',
      en: 'Interactive browser simulation to try programs before running them on the robot.',
    },
    playgroundTrack: 'sd',
  },
  {
    slug: 'smp',
    short: 'SMP',
    name: { id: 'Sekolah Menengah Pertama', en: 'Junior high school' },
    ageRange: { id: 'Usia 12–15 tahun', en: 'Ages 12–15' },
    robotName: { id: 'Robot Modular', en: 'Modular Robot' },
    summary: {
      id: 'Sasis terbuka berbasis ESP32 dengan port sensor plug-and-play. Siswa mulai dari blok, lalu melihat kode C++ yang dihasilkan dan menulis kodenya sendiri.',
      en: 'An open ESP32 chassis with plug-and-play sensor ports. Students start with blocks, read the generated C++, then write their own code.',
    },
    highlights: [
      { id: 'Modular dan bisa dikembangkan', en: 'Modular and expandable' },
      { id: 'Kompatibel Arduino dan ESP32', en: 'Arduino and ESP32 compatible' },
      { id: 'Banyak pilihan sensor dan aktuator', en: 'Wide choice of sensors and actuators' },
      { id: 'Colok, program, baut, kreasikan', en: 'Plug, program, bolt, create' },
    ],
    modules: [
      { id: 'Dasar mikrokontroler', en: 'Microcontroller basics' },
      { id: 'Input dan output', en: 'Input and output' },
      { id: 'Sensor ultrasonik', en: 'Ultrasonic sensing' },
      { id: 'Line tracking', en: 'Line tracking' },
      { id: 'Motor servo', en: 'Servo motors' },
      { id: 'Robot penghindar rintangan', en: 'Obstacle-avoiding robot' },
      { id: 'Dasar IoT', en: 'IoT basics' },
    ],
    programming: { id: 'Blok, lalu C++ (Arduino)', en: 'Blocks, then C++ (Arduino)' },
    hardware: {
      title: { id: 'Modul sensor plug-and-play', en: 'Plug-and-play sensor modules' },
      items: [
        { id: 'Ultrasonik (jarak)', en: 'Ultrasonic (distance)' },
        { id: 'Line follower (garis)', en: 'Line follower' },
        { id: 'Inframerah (halangan)', en: 'Infrared (obstacle)' },
        { id: 'PIR (gerak)', en: 'PIR (motion)' },
        { id: 'Suara', en: 'Sound' },
        { id: 'Cahaya', en: 'Light' },
        { id: 'Remote IR', en: 'IR remote' },
        { id: 'Buzzer (alarm)', en: 'Buzzer (alarm)' },
      ],
    },
    simulation: {
      id: 'Uji program dan algoritma di simulator sebelum diunggah ke robot.',
      en: 'Test programs and algorithms in the simulator before uploading them to the robot.',
    },
    playgroundTrack: 'smp',
  },
  {
    slug: 'sma',
    short: 'SMA',
    name: { id: 'Sekolah Menengah Atas', en: 'Senior high school' },
    ageRange: { id: 'Usia 15–18 tahun', en: 'Ages 15–18' },
    robotName: { id: 'Robot Advanced', en: 'Advanced Robot' },
    summary: {
      id: 'Rover dengan komputer onboard, kamera, dan lengan robot. Siswa belajar ROS 2, computer vision, pemetaan, dan navigasi otonom seperti di industri.',
      en: 'A rover with an onboard computer, camera, and robotic arm. Students learn ROS 2, computer vision, mapping, and autonomous navigation the way industry does.',
    },
    highlights: [
      {
        id: 'Komputasi tinggi (Raspberry Pi 5 atau Jetson)',
        en: 'High compute (Raspberry Pi 5 or Jetson)',
      },
      { id: 'ROS 2, AI, dan computer vision', en: 'ROS 2, AI, and computer vision' },
      { id: 'Pemetaan, navigasi, dan IoT', en: 'Mapping, navigation, and IoT' },
      { id: 'Lengan robot dan pemrograman drone', en: 'Robotic arm and drone programming' },
    ],
    modules: [
      { id: 'Sistem tertanam (ESP32/STM32)', en: 'Embedded systems (ESP32/STM32)' },
      { id: 'Raspberry Pi dan Jetson', en: 'Raspberry Pi and Jetson' },
      { id: 'ROS 2', en: 'ROS 2' },
      { id: 'Computer vision (OpenCV)', en: 'Computer vision (OpenCV)' },
      { id: 'Deteksi objek (YOLO)', en: 'Object detection (YOLO)' },
      { id: 'SLAM, pemetaan, dan navigasi', en: 'SLAM, mapping, and navigation' },
      { id: 'IoT dengan MQTT', en: 'IoT with MQTT' },
      { id: 'Lengan robot dan drone', en: 'Robotic arm and drones' },
    ],
    programming: { id: 'Python, C++, dan ROS 2', en: 'Python, C++, and ROS 2' },
    hardware: {
      title: { id: 'Dua paket komputasi', en: 'Two compute packages' },
      items: [
        { id: 'Paket A: Raspberry Pi 5', en: 'Package A: Raspberry Pi 5' },
        {
          id: 'Paket B: NVIDIA Jetson Orin Nano Super',
          en: 'Package B: NVIDIA Jetson Orin Nano Super',
        },
      ],
    },
    simulation: {
      id: 'Simulasi 3D dan digital twin di Gazebo dan RViz untuk validasi sebelum uji lapangan.',
      en: '3D simulation and a digital twin in Gazebo and RViz to validate before field tests.',
    },
  },
];

export function getLevel(slug: string): EducationLevel | undefined {
  return educationLevels.find((level) => level.slug === slug);
}

/** The four-step learning flow shared by every level. */
export const learningPath: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'simulate',
    title: { id: 'Simulasi', en: 'Simulate' },
    body: {
      id: 'Latihan logika dan konsep di dunia virtual.',
      en: 'Practise logic and concepts in a virtual world.',
    },
  },
  {
    id: 'build',
    title: { id: 'Rakit', en: 'Build' },
    body: { id: 'Pilih modul, rakit, dan eksplorasi.', en: 'Pick modules, assemble, and explore.' },
  },
  {
    id: 'program',
    title: { id: 'Program', en: 'Program' },
    body: {
      id: 'Menulis kode yang mudah dan menyenangkan.',
      en: 'Write code that is easy and fun.',
    },
  },
  {
    id: 'deploy',
    title: { id: 'Deploy', en: 'Deploy' },
    body: { id: 'Jalankan program di robot sungguhan.', en: 'Run the program on the real robot.' },
  },
];

/** Upgrade journey from starter kit to professional robot. */
export const upgradePath: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'starter',
    title: { id: 'Starter kit', en: 'Starter kit' },
    body: { id: 'Mulai belajar dari dasar.', en: 'Start from the basics.' },
  },
  {
    id: 'sensors',
    title: { id: 'Tambah sensor', en: 'Add sensors' },
    body: { id: 'Ultrasonik, LiDAR, kamera, IMU.', en: 'Ultrasonic, LiDAR, camera, IMU.' },
  },
  {
    id: 'compute',
    title: { id: 'Naikkan komputasi', en: 'Upgrade compute' },
    body: {
      id: 'ESP32, lalu Raspberry Pi, lalu Jetson.',
      en: 'ESP32, then Raspberry Pi, then Jetson.',
    },
  },
  {
    id: 'vision',
    title: { id: 'AI dan vision', en: 'AI and vision' },
    body: { id: 'YOLO dan kamera kedalaman.', en: 'YOLO and depth cameras.' },
  },
  {
    id: 'integration',
    title: { id: 'Integrasi sistem', en: 'System integration' },
    body: { id: 'AI, IoT, cloud, dan sistem lanjut.', en: 'AI, IoT, cloud, and advanced systems.' },
  },
  {
    id: 'pro',
    title: { id: 'Robot profesional', en: 'Professional robot' },
    body: { id: 'Siap untuk proyek nyata dan riset.', en: 'Ready for real projects and research.' },
  },
];

export const afterSales: ReadonlyArray<{ id: string; title: Localized; body: Localized }> = [
  {
    id: 'onboarding',
    title: { id: 'Onboarding', en: 'Onboarding' },
    body: {
      id: 'Panduan awal dan pendampingan penggunaan.',
      en: 'Getting-started guides and hands-on assistance.',
    },
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
    body: { id: 'Perbaikan perangkat di Bali.', en: 'Hardware repair in Bali.' },
  },
  {
    id: 'updates',
    title: { id: 'Konten baru', en: 'New content' },
    body: { id: 'Pembaruan modul dan materi pembelajaran.', en: 'Module and curriculum updates.' },
  },
];

export const competitions = ['WRO', 'MakeX', 'KRI'] as const;

/** Course length offered per level, in meetings. */
export const syllabusMeetings = '30–36';
