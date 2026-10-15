import type { Localized } from './i18n';
import type { RobotSlug } from './robots';

const l = (id: string, en: string): Localized => ({ id, en });

export interface GuideSection {
  title: Localized;
  steps: Localized[];
  note?: Localized;
}

/** owner: whoever bought the robot; instructor: someone running a class, course, or club. */
export type GuideAudience = 'owner' | 'instructor';

export interface Guide {
  slug: string;
  title: Localized;
  summary: Localized;
  robots: RobotSlug[];
  audience: GuideAudience;
  minutes: number;
  sections: GuideSection[];
}

export const guides: readonly Guide[] = [
  {
    slug: 'mulai-ciko',
    title: l('Mulai dengan Ciko', 'Getting started with Ciko'),
    summary: l(
      'Dari kotak sampai program pertama berjalan di robot.',
      'From the box to the first program running on the robot.',
    ),
    robots: ['ciko'],
    audience: 'owner',
    minutes: 20,
    sections: [
      {
        title: l('Buka kotak', 'Unbox'),
        steps: [
          l(
            'Periksa isinya: Ciko, charger khusus, kabel data USB, matras lintasan, dan kartu tantangan.',
            'Check the contents: Ciko, the dedicated charger, the USB data cable, the track mat, and the challenge cards.',
          ),
          l(
            'Pastikan sakelar utama mati sebelum Ciko diangkat dari kotak.',
            'Make sure the main switch is off before lifting Ciko out of the box.',
          ),
        ],
      },
      {
        title: l('Isi daya', 'Charge'),
        steps: [
          l(
            'Pakai hanya charger yang disertakan, dan isi daya di permukaan yang keras dan rata.',
            'Use only the supplied charger, and charge on a hard, flat surface.',
          ),
          l(
            'Tunggu indikator penuh sebelum mulai bermain.',
            'Wait for the full indicator before you start.',
          ),
        ],
      },
      {
        title: l('Program pertama', 'First program'),
        steps: [
          l(
            'Buka simulator ULIK, pilih Ciko, lalu misi Kenalan dengan robot.',
            'Open the ULIK simulator, choose Ciko, then the Meet the robot mission.',
          ),
          l(
            'Susun blok: tampilkan wajah senang, bunyikan bip, maju 1 detik.',
            'Build it: show the happy face, beep, drive forward for 1 second.',
          ),
          l(
            'Tekan Jalankan dan lihat Ciko virtual bergerak.',
            'Press Run and watch the virtual Ciko move.',
          ),
          l(
            'Pindahkan program yang sama ke robot dengan panduan Dari simulator ke robot.',
            'Move the same program to the robot with the From the simulator to the robot guide.',
          ),
        ],
      },
      {
        title: l('Kalau tidak berjalan', 'If it does not run'),
        steps: [
          l('Cek sakelar dan baterai.', 'Check the switch and the battery.'),
          l(
            'Coba kabel data lain; sebagian kabel USB hanya untuk mengisi daya.',
            'Try another data cable; some USB cables only charge.',
          ),
          l(
            'Uji di simulator dulu untuk memastikan programnya benar.',
            'Test it in the simulator first to make sure the program is right.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'rakit-momo',
    title: l('Merakit Momo', 'Building Momo'),
    summary: l(
      'Langkah rakit tanpa solder, dari sasis sampai uji daya pertama.',
      'A no-solder build, from the chassis to the first power test.',
    ),
    robots: ['momo'],
    audience: 'owner',
    minutes: 90,
    sections: [
      {
        title: l('Persiapan', 'Preparation'),
        steps: [
          l(
            'Kerjakan di meja bersih dengan wadah untuk baut dan komponen kecil.',
            'Work on a clean desk with a tray for screws and small parts.',
          ),
          l(
            'Baterai baru dipasang di langkah terakhir.',
            'The battery goes in at the very last step.',
          ),
        ],
      },
      {
        title: l('Mekanik', 'Mechanics'),
        steps: [
          l(
            'Pasang dua motor ke sasis aluminium, lalu roda dan roda penyeimbang.',
            'Mount both motors on the aluminium chassis, then the wheels and the caster.',
          ),
          l(
            'Pasang PCB dengan spacer; ESP32 dan driver TB6612FNG sudah terpasang di atasnya.',
            'Fit the PCB on its spacers; the ESP32 and the TB6612FNG driver are already on it.',
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
            'Pasang sensor garis 5-in-1 di depan bawah, 3 sampai 8 mm dari lantai.',
            'Mount the 5-in-1 line array at the front underside, 3 to 8 mm above the floor.',
          ),
          l(
            'Pasang servo, lalu dudukkan HC-SR04 di atasnya menghadap depan.',
            'Mount the servo, then seat the HC-SR04 on it facing forward.',
          ),
          l(
            'Colokkan OLED, AHT10, dan mikrofon ke port I2C dan analog berlabel.',
            'Plug the OLED, the AHT10, and the microphone into the labelled I2C and analog ports.',
          ),
        ],
        note: l(
          'Konektor berkunci hanya masuk satu arah. Jangan dipaksa.',
          'Keyed connectors only fit one way. Do not force them.',
        ),
      },
      {
        title: l('Daya dan uji pertama', 'Power and first test'),
        steps: [
          l(
            'Dengan sakelar mati, pasang paket baterai 2S.',
            'With the switch off, fit the 2S battery pack.',
          ),
          l(
            'Angkat Momo dari meja, nyalakan sakelar, lalu jalankan program uji bawaan.',
            'Lift Momo off the desk, switch it on, and run the built-in test program.',
          ),
          l(
            'Periksa: OLED menyala, kedua roda berputar, sensor membaca garis.',
            'Check: the OLED lights up, both wheels turn, and the sensors read the line.',
          ),
        ],
        note: l(
          'Urutan bisa sedikit berbeda mengikuti revisi PCB.',
          'The order may differ slightly between PCB revisions.',
        ),
      },
    ],
  },
  {
    slug: 'memakai-simulator',
    title: l('Memakai simulator ULIK', 'Using the ULIK simulator'),
    summary: l(
      'Pilih robot dan misi, susun blok, baca panel sensor, lalu lihat kode C++-nya.',
      'Pick a robot and a mission, snap blocks together, read the sensor panel, then see the C++.',
    ),
    robots: ['ciko', 'momo'],
    audience: 'owner',
    minutes: 15,
    sections: [
      {
        title: l('Mulai', 'Start'),
        steps: [
          l('Pilih Ciko atau Momo, lalu pilih misi.', 'Choose Ciko or Momo, then pick a mission.'),
          l(
            'Baca tujuan misi di samping arena. Setiap tujuan dicentang saat tercapai.',
            'Read the mission goals beside the arena. Each goal gets a tick when you reach it.',
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
            'Press Run. The block that is running lights up.',
          ),
          l(
            'Pantau panel sensor: garis, jarak, wajah OLED, lampu sein, dan bunyi.',
            'Watch the sensor panel: line, distance, OLED face, turn signals, and sound.',
          ),
        ],
      },
      {
        title: l('Ke robot nyata', 'To the real robot'),
        steps: [
          l(
            'Buka Kode C++ di bawah arena untuk melihat program yang sama dalam C++.',
            'Open the C++ code below the arena to see the same program in C++.',
          ),
          l(
            'Uji di robot nyata dan bandingkan hasilnya dengan simulator.',
            'Test it on the real robot and compare the result with the simulator.',
          ),
        ],
        note: l(
          'Lantai nyata bisa lebih licin atau cahayanya lebih terang; sesuaikan kecepatan dan ambang sensor.',
          'Real floors can be slipperier or brighter; adjust the speed and sensor thresholds.',
        ),
      },
    ],
  },
  {
    slug: 'dari-simulator-ke-robot',
    title: l('Dari simulator ke robot', 'From the simulator to the robot'),
    summary: l(
      'Salin kode C++ dari simulator, lalu unggah ke Ciko atau Momo lewat Arduino IDE.',
      'Copy the C++ from the simulator, then upload it to Ciko or Momo with the Arduino IDE.',
    ),
    robots: ['ciko', 'momo'],
    audience: 'owner',
    minutes: 20,
    sections: [
      {
        title: l('Siapkan komputer', 'Set up the computer'),
        steps: [
          l(
            'Pasang Arduino IDE 2 dari situs resmi Arduino.',
            'Install Arduino IDE 2 from the official Arduino website.',
          ),
          l(
            'Tambahkan pustaka RobotKit yang kami kirim bersama robot: Sketch, Include Library, Add .ZIP Library.',
            'Add the RobotKit library that comes with the robot: Sketch, Include Library, Add .ZIP Library.',
          ),
          l(
            'Untuk Momo, pasang juga paket papan ESP32 dari Boards Manager.',
            'For Momo, also install the ESP32 board package from the Boards Manager.',
          ),
        ],
      },
      {
        title: l('Salin dan unggah', 'Copy and upload'),
        steps: [
          l(
            'Di simulator, buka Kode C++ lalu salin semuanya.',
            'In the simulator, open the C++ code and copy all of it.',
          ),
          l(
            'Tempel ke sketch baru di Arduino IDE.',
            'Paste it into a new sketch in the Arduino IDE.',
          ),
          l(
            'Pilih papan: Arduino Nano untuk Ciko, ESP32 Dev Module untuk Momo. Pilih port USB-nya.',
            'Choose the board: Arduino Nano for Ciko, ESP32 Dev Module for Momo. Choose its USB port.',
          ),
          l(
            'Tekan Upload, lalu lepas kabel dan uji di lantai.',
            'Press Upload, then unplug and test on the floor.',
          ),
        ],
      },
      {
        title: l('Kalau unggah gagal', 'If the upload fails'),
        steps: [
          l(
            'Ciko: coba prosesor ATmega328P (Old Bootloader) di menu Tools.',
            'Ciko: try the ATmega328P (Old Bootloader) processor in the Tools menu.',
          ),
          l(
            'Coba kabel data lain; sebagian kabel USB hanya untuk mengisi daya.',
            'Try another data cable; some USB cables only charge.',
          ),
          l(
            'Tutup Serial Monitor atau aplikasi lain yang memakai port yang sama.',
            'Close the Serial Monitor or any other app that holds the same port.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'keselamatan-baterai',
    title: l('Keselamatan baterai dan pengisian', 'Battery and charging safety'),
    summary: l(
      'Aturan baterai litium untuk di rumah dan di kelas.',
      'Lithium battery rules for home and class.',
    ),
    robots: ['ciko', 'momo', 'garu'],
    audience: 'owner',
    minutes: 10,
    sections: [
      {
        title: l('Aturan utama', 'Core rules'),
        steps: [
          l(
            'Pakai hanya charger yang ditentukan untuk paket baterai tersebut.',
            'Use only the charger specified for that battery pack.',
          ),
          l(
            'Anak tidak memegang sel baterai lepas; baterai tetap di dalam wadahnya.',
            'Children never handle loose cells; the battery stays in its case.',
          ),
          l(
            'Isi daya dengan pengawasan, di permukaan tahan panas.',
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
            'Kalau lama tidak dipakai, simpan dalam keadaan setengah terisi.',
            'If it will sit unused for a while, store it half charged.',
          ),
        ],
      },
      {
        title: l('Baterai rusak', 'Damaged batteries'),
        steps: [
          l(
            'Baterai menggembung, panas, atau berbau: hentikan pemakaian.',
            'A swollen, hot, or smelly battery: stop using it.',
          ),
          l(
            'Pindahkan ke wadah logam berisi pasir, lalu hubungi kami.',
            'Move it into a metal container with sand, then contact us.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'persiapan-garu',
    title: l('Menyiapkan Garu', 'Setting up Garu'),
    summary: l(
      'Komputer onboard, jaringan, dan ROS 2 sebelum Garu bergerak pertama kali.',
      'The onboard computer, the network, and ROS 2 before Garu first moves.',
    ),
    robots: ['garu'],
    audience: 'owner',
    minutes: 45,
    sections: [
      {
        title: l('Komputer onboard', 'Onboard computer'),
        steps: [
          l(
            'Tulis image sistem Garu ke kartu atau SSD sesuai paket.',
            'Write the Garu system image to the card or SSD for your package.',
          ),
          l(
            'Hubungkan ke Wi-Fi dan catat alamat IP robot.',
            'Join the Wi-Fi and note the robot’s IP address.',
          ),
        ],
      },
      {
        title: l('ROS 2', 'ROS 2'),
        steps: [
          l(
            'Masuk lewat SSH, lalu jalankan launch file bringup.',
            'Log in over SSH, then run the bringup launch file.',
          ),
          l('Uji teleoperasi pelan di area kosong.', 'Test slow teleoperation in a clear area.'),
          l(
            'Buka RViz di laptop untuk melihat LiDAR dan kamera.',
            'Open RViz on a laptop to see the LiDAR and camera.',
          ),
        ],
        note: l(
          'Pasang batas kecepatan rendah saat mencoba program baru.',
          'Keep a low speed limit while you try new programs.',
        ),
      },
    ],
  },
  {
    slug: 'mengajar-dengan-ulik',
    title: l('Memakai robot ULIK di kelas', 'Running a class with ULIK robots'),
    summary: l(
      'Untuk pengajar sekolah, kursus, dan ekstrakurikuler: persiapan, alur satu sesi, dan penyimpanan.',
      'For school, course, and club instructors: preparation, the flow of one session, and storage.',
    ),
    robots: ['ciko', 'momo', 'garu'],
    audience: 'instructor',
    minutes: 15,
    sections: [
      {
        title: l('Sebelum sesi', 'Before the session'),
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
        title: l('Alur satu sesi', 'Flow of one session'),
        steps: [
          l(
            'Pembuka 10 menit: tantangan hari ini dan tebakan peserta.',
            'Opening, 10 minutes: today’s challenge and everyone’s guesses.',
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
            'Penutup 10 menit: apa yang berubah dan kenapa.',
            'Wrap-up, 10 minutes: what changed and why.',
          ),
        ],
        note: l(
          'Satu robot untuk dua sampai tiga peserta, dengan peran bergilir: programmer, penguji, pencatat.',
          'One robot for two or three people, with rotating roles: programmer, tester, recorder.',
        ),
      },
      {
        title: l('Setelah sesi', 'After the session'),
        steps: [
          l(
            'Matikan sakelar dan hitung kembali komponen.',
            'Switch off and count the parts back in.',
          ),
          l(
            'Simpan robot dengan baterai di dalam wadahnya.',
            'Store the robots with their batteries in their cases.',
          ),
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function guidesFor(robot: RobotSlug): Guide[] {
  return guides.filter((guide) => guide.robots.includes(robot));
}
