import type { LevelSlug } from './education';
import type { Localized } from './i18n';

export interface GuideSection {
  title: Localized;
  steps: Localized[];
  note?: Localized;
}

export interface Guide {
  slug: string;
  title: Localized;
  summary: Localized;
  audience: 'teacher' | 'student' | 'school';
  levels: LevelSlug[];
  minutes: number;
  sections: GuideSection[];
}

const l = (id: string, en: string): Localized => ({ id, en });

export const guides: readonly Guide[] = [
  {
    slug: 'memulai-robot-pintar',
    title: l('Memulai Robot Pintar SD', 'Getting started with Robot Pintar'),
    summary: l(
      'Dari kotak sampai program pertama berjalan di robot.',
      'From the box to the first program running on the robot.',
    ),
    audience: 'teacher',
    levels: ['sd'],
    minutes: 20,
    sections: [
      {
        title: l('Buka kotak', 'Unbox'),
        steps: [
          l(
            'Periksa isi: robot, kabel data, charger khusus, matras lintasan, kartu tantangan.',
            'Check the contents: robot, data cable, dedicated charger, track mat, challenge cards.',
          ),
          l(
            'Pastikan sakelar utama dalam posisi mati sebelum robot diangkat dari kotak.',
            'Make sure the main switch is off before lifting the robot out.',
          ),
        ],
      },
      {
        title: l('Isi daya', 'Charge'),
        steps: [
          l(
            'Gunakan hanya charger yang disertakan. Isi di meja guru, bukan di meja siswa.',
            'Use only the supplied charger. Charge on the teacher’s desk, not at student desks.',
          ),
          l(
            'Tunggu indikator penuh sebelum kelas dimulai.',
            'Wait for the full indicator before class starts.',
          ),
        ],
      },
      {
        title: l('Program pertama', 'First program'),
        steps: [
          l(
            'Buka simulator, pilih Robot SD, lalu misi Kenalan dengan robot.',
            'Open the simulator, choose the SD robot, then the Meet the robot mission.',
          ),
          l(
            'Susun blok: tampilkan wajah senang, bunyikan bip, maju 1 detik.',
            'Build: show happy face, beep, forward for 1 second.',
          ),
          l('Tekan Jalankan dan amati robot virtual.', 'Press Run and watch the virtual robot.'),
          l(
            'Sambungkan robot dengan kabel data dan unggah program yang sama.',
            'Connect the robot with the data cable and upload the same program.',
          ),
        ],
      },
      {
        title: l('Jika tidak berjalan', 'If it does not run'),
        steps: [
          l('Cek sakelar dan baterai.', 'Check the switch and battery.'),
          l(
            'Coba kabel data lain; sebagian kabel hanya untuk mengisi daya.',
            'Try another data cable; some cables only charge.',
          ),
          l(
            'Uji di simulator dulu untuk memastikan programnya benar.',
            'Test in the simulator first to confirm the program is correct.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'panduan-guru',
    title: l('Panduan guru: mengelola kelas robotika', 'Teacher guide: running a robotics class'),
    summary: l(
      'Persiapan, alur pertemuan, penilaian, dan penyimpanan kit.',
      'Preparation, lesson flow, assessment, and kit storage.',
    ),
    audience: 'teacher',
    levels: ['sd', 'smp', 'sma'],
    minutes: 25,
    sections: [
      {
        title: l('Sebelum kelas', 'Before class'),
        steps: [
          l('Isi daya semua robot sehari sebelumnya.', 'Charge every robot the day before.'),
          l(
            'Siapkan matras lintasan dan area uji yang lapang.',
            'Lay out the track mats and a clear test area.',
          ),
          l(
            'Buka misi simulator yang akan dipakai di setiap komputer.',
            'Open the simulator mission on each computer.',
          ),
        ],
      },
      {
        title: l('Alur satu pertemuan', 'Flow of one meeting'),
        steps: [
          l(
            'Pembuka 10 menit: tantangan hari ini dan prediksi.',
            'Opening, 10 minutes: today’s challenge and predictions.',
          ),
          l(
            'Simulator 20 menit: susun dan uji program.',
            'Simulator, 20 minutes: build and test the program.',
          ),
          l(
            'Robot nyata 25 menit: unggah, uji, ukur, perbaiki.',
            'Real robot, 25 minutes: upload, test, measure, fix.',
          ),
          l(
            'Refleksi 10 menit: apa yang berubah dan kenapa.',
            'Reflection, 10 minutes: what changed and why.',
          ),
        ],
        note: l(
          'Kelompok 2–3 siswa dengan peran bergilir: programmer, penguji, pencatat.',
          'Groups of 2–3 with rotating roles: programmer, tester, recorder.',
        ),
      },
      {
        title: l('Penilaian', 'Assessment'),
        steps: [
          l(
            'Nilai proses, bukan hanya apakah program pertama langsung berhasil.',
            'Assess the process, not only whether the first program worked.',
          ),
          l(
            'Gunakan rubrik: prediksi, program, uji coba, penjelasan, kerja sama.',
            'Use the rubric: prediction, program, testing, explanation, teamwork.',
          ),
        ],
      },
      {
        title: l('Setelah kelas', 'After class'),
        steps: [
          l(
            'Matikan sakelar dan hitung kembali komponen.',
            'Switch off and count the components back in.',
          ),
          l(
            'Simpan robot di rak dengan baterai tertutup.',
            'Store robots on the shelf with batteries enclosed.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'rakit-robot-smp',
    title: l('Merakit Robot Modular SMP', 'Assembling the junior high modular robot'),
    summary: l(
      'Langkah rakit tanpa solder, dari sasis sampai uji daya pertama.',
      'A no-solder build, from chassis to first power test.',
    ),
    audience: 'student',
    levels: ['smp'],
    minutes: 90,
    sections: [
      {
        title: l('Persiapan', 'Preparation'),
        steps: [
          l(
            'Kerjakan di meja bersih dengan baki komponen.',
            'Work on a clean desk with a parts tray.',
          ),
          l(
            'Baterai belum dipasang sampai langkah terakhir.',
            'Leave the battery out until the last step.',
          ),
        ],
      },
      {
        title: l('Mekanik', 'Mechanics'),
        steps: [
          l(
            'Pasang dua motor ke sasis aluminium, lalu roda dan roda penyeimbang.',
            'Mount both motors on the aluminium chassis, then the wheels and caster.',
          ),
          l(
            'Pasang PCB dengan spacer; ESP32 dan driver TB6612FNG sudah di tempatnya.',
            'Fit the PCB on spacers; the ESP32 and TB6612FNG driver are already on it.',
          ),
          l(
            'Sambungkan kabel motor kiri dan kanan ke port motor berlabel.',
            'Plug the left and right motor cables into the labelled motor ports.',
          ),
        ],
      },
      {
        title: l('Sensor dan keluaran', 'Sensors and outputs'),
        steps: [
          l(
            'Pasang sensor garis 5-in-1 di depan bawah, 3–8 mm dari lantai.',
            'Mount the 5-in-1 line array at the front underside, 3–8 mm above the floor.',
          ),
          l(
            'Pasang servo, lalu dudukkan HC-SR04 di atasnya menghadap depan.',
            'Mount the servo, then seat the HC-SR04 on it facing forward.',
          ),
          l(
            'Colokkan OLED, AHT10, dan mikrofon ke port I2C dan analog berlabel.',
            'Plug the OLED, AHT10, and microphone into the labelled I2C and analog ports.',
          ),
        ],
        note: l(
          'Konektor berkunci hanya masuk satu arah. Jangan paksa.',
          'Keyed connectors only fit one way. Do not force them.',
        ),
      },
      {
        title: l('Daya dan uji pertama', 'Power and first test'),
        steps: [
          l(
            'Dengan sakelar mati, pasang paket baterai 2S tertutup.',
            'With the switch off, fit the enclosed 2S battery pack.',
          ),
          l(
            'Angkat robot dari meja, nyalakan sakelar, lalu jalankan program uji bawaan.',
            'Lift the robot off the desk, switch on, and run the built-in test program.',
          ),
          l(
            'Periksa: OLED menyala, kedua roda berputar, sensor membaca garis.',
            'Check: the OLED lights up, both wheels turn, sensors read the line.',
          ),
        ],
        note: l(
          'Urutan bisa sedikit berubah mengikuti revisi PCB.',
          'The order may change slightly with PCB revisions.',
        ),
      },
    ],
  },
  {
    slug: 'keselamatan-baterai',
    title: l('Keselamatan baterai dan pengisian', 'Battery and charging safety'),
    summary: l('Aturan baterai litium untuk sekolah.', 'Lithium battery rules for schools.'),
    audience: 'school',
    levels: ['sd', 'smp', 'sma'],
    minutes: 10,
    sections: [
      {
        title: l('Aturan utama', 'Core rules'),
        steps: [
          l(
            'Hanya gunakan charger yang ditentukan untuk paket baterai tersebut.',
            'Only use the charger specified for that battery pack.',
          ),
          l(
            'Jangan berikan sel baterai lepas kepada siswa.',
            'Never hand loose battery cells to students.',
          ),
          l(
            'Isi daya di bawah pengawasan, di permukaan tahan panas.',
            'Charge under supervision on a heat-resistant surface.',
          ),
        ],
      },
      {
        title: l('Penyimpanan', 'Storage'),
        steps: [
          l(
            'Simpan di suhu ruang, jauh dari sinar matahari langsung.',
            'Store at room temperature, away from direct sunlight.',
          ),
          l(
            'Untuk libur panjang, simpan dalam keadaan setengah terisi.',
            'For long holidays, store half charged.',
          ),
        ],
      },
      {
        title: l('Baterai rusak', 'Damaged batteries'),
        steps: [
          l(
            'Baterai menggembung, panas, atau berbau: hentikan pemakaian.',
            'Swollen, hot, or smelly battery: stop using it.',
          ),
          l(
            'Pindahkan ke wadah logam berisi pasir dan hubungi kami.',
            'Move it to a metal container with sand and contact us.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'memakai-simulator',
    title: l('Memakai simulator robot', 'Using the robot simulator'),
    summary: l(
      'Pilih robot dan misi, susun blok, baca panel sensor, lalu pindah ke robot nyata.',
      'Pick a robot and mission, snap blocks, read the sensor panel, then move to the real robot.',
    ),
    audience: 'student',
    levels: ['sd', 'smp'],
    minutes: 15,
    sections: [
      {
        title: l('Mulai', 'Start'),
        steps: [
          l(
            'Pilih Robot SD atau Robot SMP, lalu pilih misi.',
            'Choose the SD or SMP robot, then pick a mission.',
          ),
          l(
            'Baca tujuan misi dan daftar cek di samping lintasan.',
            'Read the mission goal and checklist beside the arena.',
          ),
        ],
      },
      {
        title: l('Susun dan jalankan', 'Build and run'),
        steps: [
          l(
            'Tarik blok dari kategori ke bawah blok saat mulai.',
            'Drag blocks from the categories under the when-started block.',
          ),
          l(
            'Tekan Jalankan. Blok yang sedang berjalan menyala.',
            'Press Run. The running block lights up.',
          ),
          l(
            'Pantau panel sensor: garis, jarak, wajah OLED, dan bunyi.',
            'Watch the sensor panel: line, distance, OLED face, and sound.',
          ),
        ],
      },
      {
        title: l('Ke robot nyata', 'To the real robot'),
        steps: [
          l(
            'Buka tab Kode untuk melihat versi C++ dari program.',
            'Open the Code tab to see the C++ version of the program.',
          ),
          l(
            'Uji di robot nyata dan bandingkan hasilnya dengan simulator.',
            'Test on the real robot and compare with the simulator.',
          ),
        ],
        note: l(
          'Lantai nyata bisa lebih licin atau cahaya lebih terang; sesuaikan ambang dan kecepatan.',
          'Real floors may be slipperier or brighter; adjust thresholds and speed.',
        ),
      },
    ],
  },
  {
    slug: 'persiapan-sma-ros2',
    title: l('Persiapan Robot Advanced SMA', 'Setting up the senior high advanced robot'),
    summary: l(
      'Menyiapkan komputer onboard, jaringan, dan ROS 2.',
      'Preparing the onboard computer, network, and ROS 2.',
    ),
    audience: 'teacher',
    levels: ['sma'],
    minutes: 45,
    sections: [
      {
        title: l('Komputer onboard', 'Onboard computer'),
        steps: [
          l(
            'Flash image sistem Taksu ke kartu atau SSD sesuai paket.',
            'Flash the Taksu system image to the card or SSD for your package.',
          ),
          l(
            'Hubungkan ke Wi-Fi kelas dan catat alamat IP robot.',
            'Join the class Wi-Fi and note the robot’s IP address.',
          ),
        ],
      },
      {
        title: l('ROS 2', 'ROS 2'),
        steps: [
          l(
            'Masuk lewat SSH, jalankan launch file bringup.',
            'Log in over SSH and run the bringup launch file.',
          ),
          l('Uji teleoperasi pelan di area kosong.', 'Test slow teleoperation in a clear area.'),
          l(
            'Buka RViz di laptop guru untuk melihat LiDAR dan kamera.',
            'Open RViz on the teacher laptop to see LiDAR and camera.',
          ),
        ],
        note: l(
          'Tetapkan batas kecepatan rendah selama kelas.',
          'Keep a low speed limit during class.',
        ),
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
