import type { Localized } from './i18n';
import type { Availability, MarketplaceLinks } from './shop';

const l = (id: string, en: string): Localized => ({ id, en });

export type RobotSlug = 'ciko' | 'momo' | 'garu';
/** Robots the browser simulator can drive. */
export type SimRobot = 'ciko' | 'momo';
export type Level = 'pemula' | 'menengah' | 'lanjut';
/** What a buyer wants the robot for; used to filter the catalogue. */
export type Goal = 'mulai' | 'lomba' | 'iot' | 'ai';

export const levelLabels: Record<Level, Localized> = {
  pemula: l('Pemula', 'Beginner'),
  menengah: l('Menengah', 'Intermediate'),
  lanjut: l('Lanjut', 'Advanced'),
};

export const goalLabels: Record<Goal, Localized> = {
  mulai: l('Mulai dari nol', 'Starting from zero'),
  lomba: l('Persiapan lomba', 'Competition prep'),
  iot: l('IoT dan data', 'IoT and data'),
  ai: l('AI dan ROS 2', 'AI and ROS 2'),
};

/** A robot sold in more than one package, such as Garu with a Raspberry Pi or a Jetson. */
export interface PriceOption {
  id: string;
  label: Localized;
  price: number;
}

export interface Robot {
  slug: RobotSlug;
  /** Release number. Robots and Drops share one series, so the next release continues it. */
  number: number;
  name: string;
  tagline: Localized;
  summary: Localized;
  /** Suggested minimum age. */
  age: number;
  level: Level;
  goals: Goal[];
  /** Which contests it prepares for, in one line. */
  competition: Localized;
  abilities: Localized[];
  build: { label: Localized; body: Localized };
  controller: string;
  programming: Localized;
  /** What the buyer finds in the box. */
  inBox: Localized[];
  /** The parts that make up the robot, grouped. */
  parts: { group: Localized; items: Localized[] }[];
  specs: { label: Localized; value: Localized }[];
  /** Rupiah for one unit, or null while the price is not set. */
  price: number | null;
  options?: PriceOption[];
  /** Shown next to an estimated price, e.g. while a robot is still in development. */
  priceNote?: Localized;
  availability: Availability;
  marketplace?: MarketplaceLinks;
  sim?: SimRobot;
}

export const robots: readonly Robot[] = [
  {
    slug: 'ciko',
    number: 1,
    name: 'Ciko',
    tagline: l(
      'Mobil robot pertama: siap pakai, tinggal diprogram',
      'A first robot car: ready to go, just program it',
    ),
    summary: l(
      'Ciko datang sudah dirakit dan diuji. Anak memprogramnya dengan blok, lalu melihatnya maju, belok dengan lampu sein menyala, mengikuti garis hitam, dan berhenti sebelum menabrak. Wajah OLED-nya ikut berekspresi.',
      'Ciko arrives assembled and tested. Children program it with blocks, then watch it drive, turn with its signal on, follow a black line, and stop before it bumps into things. Its OLED face reacts as it goes.',
    ),
    age: 7,
    level: 'pemula',
    goals: ['mulai', 'lomba'],
    competition: l(
      'Latihan lomba line follower tingkat pemula',
      'Practice for beginner line-follower contests',
    ),
    abilities: [
      l('Mengikuti garis hitam dengan dua sensor IR', 'Follows a black line with two IR sensors'),
      l(
        'Mengukur jarak dan berhenti sebelum menabrak',
        'Measures distance and stops before it bumps into things',
      ),
      l(
        'Wajah OLED: senang, bingung, waspada, berhasil',
        'OLED face: happy, puzzled, alert, success',
      ),
      l('Lampu sein kiri dan kanan dengan bunyi tik', 'Left and right turn signals that tick'),
      l('Bip dan nada dari buzzer', 'Beeps and tones from its buzzer'),
    ],
    build: {
      label: l('Siap pakai', 'Ready to use'),
      body: l(
        'Tidak perlu menyolder atau menyambung kabel. Keluarkan dari kotak, isi daya, lalu program.',
        'No soldering, no wiring. Take it out of the box, charge it, and program it.',
      ),
    },
    controller: 'Arduino Nano',
    programming: l(
      'Blok di simulator Taksu, lalu Arduino C++ saat sudah siap',
      'Blocks in the Taksu simulator, then Arduino C++ when you are ready',
    ),
    inBox: [
      l('Robot Ciko, sudah dirakit dan diuji', 'Ciko, assembled and tested'),
      l('Charger khusus', 'Dedicated charger'),
      l('Kabel data USB', 'USB data cable'),
      l('Matras lintasan latihan', 'Practice track mat'),
      l('Kartu tantangan', 'Challenge cards'),
    ],
    parts: [
      {
        group: l('Gerak', 'Motion'),
        items: [
          l(
            'Sasis 2WD, dua motor gearbox, roda penyeimbang',
            '2WD chassis, two gear motors, caster',
          ),
          l('Driver motor sesuai arus motor', 'Motor driver sized to the motors'),
        ],
      },
      {
        group: l('Otak dan sensor', 'Brain and sensors'),
        items: [
          l('Arduino Nano pada carrier terlindung', 'Arduino Nano on a protected carrier'),
          l('Sepasang sensor garis IR', 'A pair of IR line sensors'),
          l('Sensor jarak ultrasonik di bumper', 'Ultrasonic distance sensor in the bumper'),
        ],
      },
      {
        group: l('Umpan balik', 'Feedback'),
        items: [
          l('OLED 128×64 untuk wajah', '128×64 OLED face'),
          l('Dua lampu sein LED oranye di depan', 'Two orange LED turn signals at the front'),
          l('Buzzer aktif', 'Active buzzer'),
        ],
      },
      {
        group: l('Daya', 'Power'),
        items: [
          l(
            'Baterai tertutup dengan proteksi dan charger khusus',
            'Enclosed battery with protection and a dedicated charger',
          ),
        ],
      },
    ],
    specs: [
      { label: l('Pengendali', 'Controller'), value: l('Arduino Nano', 'Arduino Nano') },
      {
        label: l('Sensor', 'Sensors'),
        value: l('2 sensor garis IR, ultrasonik', '2 IR line sensors, ultrasonic'),
      },
      {
        label: l('Keluaran', 'Outputs'),
        value: l(
          'OLED 128×64, 2 lampu sein LED, buzzer',
          '128×64 OLED, 2 LED turn signals, buzzer',
        ),
      },
      { label: l('Gerak', 'Drive'), value: l('2WD, motor gearbox', '2WD, gear motors') },
      {
        label: l('Daya', 'Power'),
        value: l('Baterai tertutup berproteksi', 'Enclosed, protected battery'),
      },
      {
        label: l('Pemrograman', 'Programming'),
        value: l('Blok, Arduino C++', 'Blocks, Arduino C++'),
      },
    ],
    price: 1_750_000,
    availability: 'preorder',
    sim: 'ciko',
  },
  {
    slug: 'momo',
    number: 2,
    name: 'Momo',
    tagline: l(
      'Robot modular yang bisa dirakit ulang jadi apa saja',
      'A modular robot you can rebuild into anything',
    ),
    summary: l(
      'Momo dirakit dari modul tanpa solder. Pasang sensor garis 5-in-1 untuk lomba line follower, radar ultrasonik di atas servo untuk menghindari rintangan, atau sensor suhu dan mikrofon untuk proyek IoT. Otaknya ESP32 dengan Wi-Fi.',
      'Momo is built from modules without soldering. Fit the 5-in-1 line array for line-follower contests, the ultrasonic radar on its servo to dodge obstacles, or the temperature sensor and microphone for IoT projects. Its brain is an ESP32 with Wi-Fi.',
    ),
    age: 11,
    level: 'menengah',
    goals: ['lomba', 'iot'],
    competition: l(
      'Line follower dengan kendali proporsional, lomba IoT',
      'Line following with proportional control, IoT contests',
    ),
    abilities: [
      l('Sensor garis 5-in-1 untuk belok yang halus', '5-in-1 line array for smooth corrections'),
      l(
        'Radar jarak: ultrasonik yang diputar servo',
        'Distance radar: an ultrasonic sensor on a servo',
      ),
      l('Suhu, kelembapan, dan suara sebagai data', 'Temperature, humidity, and sound as data'),
      l('Kirim data ke dasbor lewat Wi-Fi', 'Sends data to a dashboard over Wi-Fi'),
      l(
        'Empat bentuk: pengikut garis, penghindar rintangan, kendali suara, stasiun pemantau',
        'Four builds: line follower, obstacle avoider, sound control, monitoring station',
      ),
    ],
    build: {
      label: l('Rakit modular', 'Modular build'),
      body: l(
        'Modul dipasang lewat PCB dan konektor berkunci, tanpa solder. Bongkar dan rakit lagi dalam bentuk lain kapan saja.',
        'Modules connect through a PCB and keyed connectors, with no soldering. Take it apart and rebuild it another way whenever you like.',
      ),
    },
    controller: 'ESP32-WROOM',
    programming: l(
      'Blok di simulator Taksu, lalu C++ di Arduino IDE',
      'Blocks in the Taksu simulator, then C++ in the Arduino IDE',
    ),
    inBox: [
      l(
        'Semua modul Momo: sasis, motor, PCB, sensor, dan layar',
        'Every Momo module: chassis, motors, PCB, sensors, and screen',
      ),
      l('Baterai 2S 18650 dengan BMS dan charger', '2S 18650 battery with BMS and charger'),
      l('Kabel, konektor, dan baut', 'Cables, connectors, and screws'),
      l('Kartu rakit langkah demi langkah', 'Step-by-step build cards'),
    ],
    parts: [
      {
        group: l('Gerak', 'Motion'),
        items: [
          l(
            'Sasis aluminium 2WD, dua motor DC dan roda',
            'Aluminium 2WD chassis, two DC motors and wheels',
          ),
          l('Driver motor TB6612FNG', 'TB6612FNG motor driver'),
          l('Servo untuk gerak tambahan', 'Servo for an extra axis'),
        ],
      },
      {
        group: l('Otak dan sensor', 'Brain and sensors'),
        items: [
          l('ESP32-WROOM dengan Wi-Fi dan Bluetooth', 'ESP32-WROOM with Wi-Fi and Bluetooth'),
          l('Sensor garis IR 5-in-1', '5-in-1 IR line array'),
          l('Ultrasonik HC-SR04', 'HC-SR04 ultrasonic'),
          l('Sensor suhu dan kelembapan AHT10', 'AHT10 temperature and humidity'),
          l('Mikrofon', 'Microphone'),
        ],
      },
      {
        group: l('Umpan balik', 'Feedback'),
        items: [
          l('OLED SSD1306 128×64', 'SSD1306 128×64 OLED'),
          l('Buzzer pasif untuk nada', 'Passive buzzer for tones'),
        ],
      },
      {
        group: l('Integrasi dan daya', 'Integration and power'),
        items: [
          l(
            'PCB kustom dua lapis dan konektor modular',
            'Two-layer custom PCB and modular connectors',
          ),
          l(
            'Baterai 2S 18650, BMS, charger, regulator, sakelar',
            '2S 18650 battery, BMS, charger, regulators, switch',
          ),
        ],
      },
    ],
    specs: [
      {
        label: l('Pengendali', 'Controller'),
        value: l('ESP32-WROOM, Wi-Fi dan Bluetooth', 'ESP32-WROOM, Wi-Fi and Bluetooth'),
      },
      {
        label: l('Sensor', 'Sensors'),
        value: l(
          'Garis IR 5-in-1, HC-SR04 di servo, AHT10, mikrofon',
          '5-in-1 IR line array, HC-SR04 on a servo, AHT10, microphone',
        ),
      },
      {
        label: l('Keluaran', 'Outputs'),
        value: l('OLED SSD1306, buzzer pasif', 'SSD1306 OLED, passive buzzer'),
      },
      {
        label: l('Gerak', 'Drive'),
        value: l('2WD aluminium, driver TB6612FNG', '2WD aluminium, TB6612FNG driver'),
      },
      { label: l('Daya', 'Power'), value: l('2S 18650 dengan BMS', '2S 18650 with BMS') },
      {
        label: l('Pemrograman', 'Programming'),
        value: l('Blok, C++ di Arduino IDE', 'Blocks, C++ in the Arduino IDE'),
      },
    ],
    price: 2_650_000,
    availability: 'preorder',
    sim: 'momo',
  },
  {
    slug: 'garu',
    number: 3,
    name: 'Garu',
    tagline: l(
      'Rover ROS 2 dengan kamera, LiDAR, dan lengan robot',
      'A ROS 2 rover with a camera, LiDAR, and a robotic arm',
    ),
    summary: l(
      'Garu untuk yang ingin ngulik robotika seperti di industri: komputer onboard, kamera, LiDAR, dan lengan robot. Programnya ROS 2, computer vision, pemetaan, dan navigasi otonom.',
      'Garu is for tinkering with robotics the way industry does it: an onboard computer, a camera, LiDAR, and a robotic arm. You program it with ROS 2, computer vision, mapping, and autonomous navigation.',
    ),
    age: 15,
    level: 'lanjut',
    goals: ['lomba', 'ai'],
    competition: l('Persiapan WRO, MakeX, dan KRI', 'Preparation for WRO, MakeX, and KRI'),
    abilities: [
      l('ROS 2 di komputer onboard', 'ROS 2 on an onboard computer'),
      l('Deteksi objek dengan OpenCV dan YOLO', 'Object detection with OpenCV and YOLO'),
      l('Pemetaan SLAM dan navigasi otonom', 'SLAM mapping and autonomous navigation'),
      l('Lengan robot dengan capit', 'Robotic arm with gripper'),
      l('IoT dengan MQTT', 'IoT with MQTT'),
    ],
    build: {
      label: l('Rakit dan integrasi', 'Build and integrate'),
      body: l(
        'Rakit mekaniknya, hubungkan komputer dengan mikrokontroler, lalu satukan sensor dalam ROS 2.',
        'Build the mechanics, connect the computer to the microcontroller, then bring the sensors together in ROS 2.',
      ),
    },
    controller: 'Raspberry Pi 5 / NVIDIA Jetson Orin Nano Super',
    programming: l('Python, C++, dan ROS 2', 'Python, C++, and ROS 2'),
    inBox: [
      l('Sasis rover, motor, dan lengan robot', 'Rover chassis, motors, and robotic arm'),
      l('Komputer onboard sesuai paket', 'Onboard computer for your package'),
      l('Kamera, LiDAR 2D, dan IMU', 'Camera, 2D LiDAR, and IMU'),
      l('Image sistem ROS 2 siap pakai', 'A ready-made ROS 2 system image'),
    ],
    parts: [
      {
        group: l('Komputasi', 'Compute'),
        items: [
          l('Paket A: Raspberry Pi 5', 'Package A: Raspberry Pi 5'),
          l('Paket B: NVIDIA Jetson Orin Nano Super', 'Package B: NVIDIA Jetson Orin Nano Super'),
          l(
            'Mikrokontroler ESP32 atau STM32 untuk motor',
            'ESP32 or STM32 microcontroller for motors',
          ),
        ],
      },
      {
        group: l('Persepsi', 'Perception'),
        items: [
          l('Kamera dan LiDAR 2D', 'Camera and 2D LiDAR'),
          l('IMU dan encoder roda', 'IMU and wheel encoders'),
        ],
      },
      {
        group: l('Aktuator', 'Actuators'),
        items: [
          l('Sasis rover dan motor', 'Rover chassis and motors'),
          l('Lengan robot dengan capit', 'Robotic arm with gripper'),
        ],
      },
    ],
    specs: [
      {
        label: l('Pengendali', 'Controller'),
        value: l(
          'Raspberry Pi 5 atau Jetson Orin Nano Super',
          'Raspberry Pi 5 or Jetson Orin Nano Super',
        ),
      },
      {
        label: l('Sensor', 'Sensors'),
        value: l('Kamera, LiDAR 2D, IMU, encoder', 'Camera, 2D LiDAR, IMU, encoders'),
      },
      {
        label: l('Aktuator', 'Actuators'),
        value: l('Rover, lengan dengan capit', 'Rover, arm with gripper'),
      },
      {
        label: l('Pemrograman', 'Programming'),
        value: l('Python, C++, ROS 2', 'Python, C++, ROS 2'),
      },
      {
        label: l('Simulasi', 'Simulation'),
        value: l('Gazebo dan RViz', 'Gazebo and RViz'),
      },
    ],
    price: null,
    options: [
      {
        id: 'pi5',
        label: l('Paket A: Raspberry Pi 5', 'Package A: Raspberry Pi 5'),
        price: 9_700_000,
      },
      {
        id: 'jetson',
        label: l('Paket B: Jetson Orin Nano Super', 'Package B: Jetson Orin Nano Super'),
        price: 19_700_000,
      },
    ],
    priceNote: l('Perkiraan, masih dikembangkan', 'Estimate, still in development'),
    availability: 'soon',
  },
];

export function getRobot(slug: string): Robot | undefined {
  return robots.find((robot) => robot.slug === slug);
}

/** The lowest price a robot is offered at, for "from Rp…" labels. */
export function startingPrice(robot: Robot): number | null {
  const prices = [robot.price, ...(robot.options ?? []).map((option) => option.price)].filter(
    (price): price is number => typeof price === 'number',
  );
  return prices.length > 0 ? Math.min(...prices) : null;
}
