import type { LevelSlug } from './education';
import type { Localized } from './i18n';

export interface Meeting {
  title: Localized;
  activity: Localized;
  /** Simulator mission students open in this meeting, if any. */
  sim?: string;
}

/** A YouTube video a teacher can play in class. Loaded from youtube-nocookie.com after a click. */
export interface ModuleVideo {
  youtube: string;
  title: string;
  channel: string;
  /** Spoken language of the video. */
  lang: 'id' | 'en';
  minutes?: number;
  /** When and how to use it in class. */
  note: Localized;
}

export interface CurriculumModule {
  id: string;
  title: Localized;
  goal: Localized;
  concepts: Localized[];
  evidence: Localized;
  meetings: Meeting[];
  video?: ModuleVideo;
}

/** One element of the elective subject Koding dan Kecerdasan Artifisial (KKA). */
export interface KkaElement {
  /** The element's official name. */
  element: Localized;
  /** Where this syllabus works on it. */
  how: Localized;
}

export interface Curriculum {
  level: LevelSlug;
  minutesPerMeeting: number;
  modules: CurriculumModule[];
  /** KKA phase and grades this level lines up with. */
  kkaPhase: Localized;
  /** KKA elements this syllabus actually works on, in the subject's own words. */
  kka: KkaElement[];
}

const l = (id: string, en: string): Localized => ({ id, en });
/** An English-language video with a note on using it in class. */
const en = (
  youtube: string,
  title: string,
  channel: string,
  note: Localized,
  minutes?: number,
): ModuleVideo => ({ youtube, title, channel, lang: 'en', note, ...(minutes ? { minutes } : {}) });
/** Compact meeting row: title and activity in both languages, plus an optional simulator mission. */
const m = (
  titleId: string,
  titleEn: string,
  activityId: string,
  activityEn: string,
  sim?: string,
): Meeting => ({
  title: l(titleId, titleEn),
  activity: l(activityId, activityEn),
  ...(sim ? { sim } : {}),
});

const sd: Curriculum = {
  level: 'sd',
  minutesPerMeeting: 70,
  kkaPhase: l(
    'Fase C, kelas 5 dan 6. Di kelas 1 sampai 4, modul yang sama bisa berjalan sebagai ekstrakurikuler.',
    'Phase C, grades 5 and 6. In grades 1 to 4 the same modules can run as an after-school club.',
  ),
  kka: [
    {
      element: l('Berpikir komputasional', 'Computational thinking'),
      how: l(
        'Urutan, pola, pengulangan, dan jika-maka di modul 2 sampai 6.',
        'Sequences, patterns, loops, and if-then rules in modules 2 to 6.',
      ),
    },
    {
      element: l('Literasi digital', 'Digital literacy'),
      how: l(
        'Cara kerja perangkat: sensor sebagai masukan, pengendali, lalu keluaran (modul 1, 4, dan 5).',
        'How a device works: sensors as input, a controller, then outputs (modules 1, 4, and 5).',
      ),
    },
  ],
  modules: [
    {
      id: 'kenalan',
      title: l('Kenalan dengan robot', 'Meet the robot'),
      goal: l(
        'Mengenali bagian robot dan memahami bahwa robot menjalankan perintah.',
        'Recognise the robot’s parts and understand that it follows commands.',
      ),
      concepts: [
        l('Sensor, pengendali, keluaran', 'Sensors, controller, outputs'),
        l('Keselamatan', 'Safety'),
      ],
      evidence: l(
        'Siswa menceritakan alur sensor, pengendali, lalu respons robot.',
        'Students describe the flow from sensor to controller to response.',
      ),
      video: en(
        '8wHJjLMnikU',
        'Real-Life Robots',
        'SciShow Kids',
        l(
          'Putar di pertemuan 1. Jeda di tengah, lalu tanya: robot ini merasakan apa, dan apa yang ia lakukan?',
          'Play it in meeting 1. Pause halfway and ask: what does this robot sense, and what does it do?',
        ),
      ),
      meetings: [
        m(
          'Apa itu robot?',
          'What is a robot?',
          'Tebak fungsi bagian robot dengan kartu komponen.',
          'Guess what each part does with component cards.',
        ),
        m(
          'Sensor, otak, dan keluaran',
          'Sensors, brain, and outputs',
          'Jalankan demo bawaan dan cocokkan kejadian dengan bagiannya.',
          'Run the built-in demo and match events to parts.',
        ),
        m(
          'Aturan kelas dan keselamatan',
          'Class rules and safety',
          'Latihan sakelar, cara memegang robot, dan area uji.',
          'Practise the switch, how to hold the robot, and the test area.',
        ),
        m(
          'Program pertama di simulator',
          'First program in the simulator',
          'Tampilkan wajah senang dan bunyikan bip.',
          'Show a happy face and play a beep.',
          'sd-kenalan',
        ),
      ],
    },
    {
      id: 'bergerak',
      title: l('Membuat robot bergerak', 'Making the robot move'),
      goal: l(
        'Menyusun urutan instruksi dan memahami arah gerak.',
        'Sequence instructions and understand direction.',
      ),
      concepts: [
        l('Urutan', 'Sequence'),
        l('Durasi', 'Duration'),
        l('Uji dan perbaiki', 'Test and fix'),
      ],
      evidence: l(
        'Robot sampai di garis finis dan siswa menjelaskan perubahan yang dibuat.',
        'The robot reaches the finish and students explain what they changed.',
      ),
      video: en(
        'Y_paSrH2ffw',
        'Unplugged - Graph Paper Programming',
        'Code.org',
        l(
          'Coba kegiatannya tanpa robot dulu: satu siswa jadi robot, temannya menulis urutan panah.',
          'Try the activity without robots first: one student plays the robot while a partner writes the arrows.',
        ),
      ),
      meetings: [
        m(
          'Maju dan berhenti',
          'Forward and stop',
          'Tebak jarak tempuh sebelum menekan Jalankan.',
          'Predict the distance before pressing Run.',
          'sd-finish',
        ),
        m(
          'Belok kiri dan kanan',
          'Turning left and right',
          'Ukur belokan seperempat putaran.',
          'Find a quarter turn.',
          'sd-belok',
        ),
        m(
          'Lampu sein sebelum belok',
          'Signal before you turn',
          'Tebak kapan sein harus menyala, jalankan, lalu catat hasilnya di lembar kerja.',
          'Predict when the signal should come on, run it, and record the result on a worksheet.',
          'sd-sein',
        ),
        m(
          'Kotak dan kembali',
          'Square and return',
          'Gerakkan robot membentuk kotak dan pulang.',
          'Drive a square and come home.',
        ),
        m(
          'Dari simulator ke robot',
          'From simulator to robot',
          'Unggah program yang sama ke robot nyata.',
          'Upload the same program to the real robot.',
        ),
        m(
          'Refleksi dan perbaikan',
          'Reflect and improve',
          'Bandingkan simulator dan lantai kelas.',
          'Compare the simulator with the classroom floor.',
        ),
      ],
    },
    {
      id: 'pola',
      title: l('Kecepatan dan pola', 'Speed and patterns'),
      goal: l(
        'Membandingkan dampak kecepatan dan lama gerak.',
        'Compare the effect of speed and duration.',
      ),
      concepts: [l('Parameter', 'Parameters'), l('Pola', 'Patterns'), l('Pengulangan', 'Loops')],
      evidence: l(
        'Program memakai blok ulangi dan siswa menjelaskan parameter yang diubah.',
        'The program uses a repeat block and students explain the parameter they changed.',
      ),
      video: en(
        'JoKTqHCni0M',
        'Unplugged - Getting Loopy',
        'Code.org',
        l(
          'Cocok sebelum pertemuan blok ulangi. Siswa menari mengikuti pola, lalu menuliskannya dengan ulangi.',
          'Good before the repeat block meeting. Students dance a pattern, then write it down with repeat.',
        ),
      ),
      meetings: [
        m(
          'Kecepatan dan jarak',
          'Speed and distance',
          'Ubah satu nilai kecepatan, ukur jaraknya.',
          'Change one speed value and measure the distance.',
        ),
        m(
          'Durasi gerak',
          'Movement duration',
          'Cari durasi untuk berhenti tepat di tanda.',
          'Find the duration to stop on the mark.',
        ),
        m(
          'Blok ulangi',
          'The repeat block',
          'Ubah program kotak menjadi pengulangan.',
          'Turn the square program into a loop.',
          'sd-kotak',
        ),
        m(
          'Tantangan pola',
          'Pattern challenge',
          'Buat zig-zag atau bintang dengan ulangi.',
          'Make a zig-zag or star with repeat.',
        ),
        m(
          'Presentasi mini',
          'Mini presentation',
          'Kelompok menjelaskan polanya.',
          'Groups explain their patterns.',
        ),
      ],
    },
    {
      id: 'rintangan',
      title: l('Robot mengenali rintangan', 'Detecting obstacles'),
      goal: l(
        'Memakai pembacaan jarak untuk mengambil keputusan.',
        'Use distance readings to make decisions.',
      ),
      concepts: [
        l('Sensor sebagai masukan', 'Sensors as input'),
        l('Ambang', 'Thresholds'),
        l('Jika-maka', 'If-then'),
      ],
      evidence: l(
        'Robot berhenti sebelum rintangan, menampilkan wajah waspada, dan siswa menjelaskan ambangnya.',
        'The robot stops before the obstacle, shows an alert face, and students explain the threshold.',
      ),
      video: en(
        'q64T_lxw_bs',
        'How do bats see in the dark?',
        'SciShow Kids',
        l(
          'Kelelawar mengukur jarak dari pantulan suara. Sensor di wajah SD v1 bekerja dengan cara yang sama.',
          'Bats judge distance from echoes. The sensor on the face of SD v1 works the same way.',
        ),
      ),
      meetings: [
        m(
          'Sensor jarak',
          'The distance sensor',
          'Baca jarak ke beberapa benda.',
          'Read the distance to several objects.',
        ),
        m(
          'Jika jarak dekat',
          'If the distance is short',
          'Susun aturan berhenti dengan blok jika.',
          'Build a stop rule with an if block.',
          'sd-rintangan',
        ),
        m(
          'Berhenti tepat waktu',
          'Stopping in time',
          'Uji beberapa ambang jarak.',
          'Test several distance thresholds.',
          'sd-rintangan',
        ),
        m(
          'Wajah dan bunyi waspada',
          'Alert face and sound',
          'Tambahkan ekspresi waspada dan bip.',
          'Add an alert expression and a beep.',
        ),
        m(
          'Jika-tidak: menghindar',
          'If-else: avoiding',
          'Mundur dan belok saat ada halangan.',
          'Back up and turn when blocked.',
          'sd-hindar',
        ),
        m(
          'Uji berbagai benda',
          'Testing different objects',
          'Bandingkan kotak, kain, dan benda miring.',
          'Compare boxes, cloth, and angled objects.',
        ),
      ],
    },
    {
      id: 'garis',
      title: l('Robot mengikuti garis', 'Following a line'),
      goal: l(
        'Membandingkan sensor kiri dan kanan untuk memilih arah.',
        'Compare left and right sensors to choose a direction.',
      ),
      concepts: [
        l('Beberapa masukan', 'Multiple inputs'),
        l('Kalibrasi', 'Calibration'),
        l('Debugging', 'Debugging'),
      ],
      evidence: l(
        'Robot menyelesaikan lintasan dan siswa menjelaskan kegagalan yang diperbaiki.',
        'The robot completes the track and students explain the failures they fixed.',
      ),
      video: en(
        'S6Z8rJB30M4',
        'Line Follower: A Zippy Robot That Senses Where to Go',
        'Science Buddies',
        l(
          'Setelah menonton, bandingkan sensor robot di video dengan dua sensor garis SD v1.',
          'After watching, compare the sensors on the robot in the video with the two line sensors on SD v1.',
        ),
      ),
      meetings: [
        m(
          'Sensor garis kiri-kanan',
          'Left and right line sensors',
          'Amati bacaan di atas putih dan hitam.',
          'Watch the readings over white and black.',
        ),
        m(
          'Kalibrasi',
          'Calibration',
          'Uji pada lantai dan cahaya berbeda.',
          'Test on different floors and light.',
        ),
        m(
          'Aturan belok',
          'Steering rules',
          'Garis kiri: belok kiri. Garis kanan: belok kanan.',
          'Line on the left: turn left. Line on the right: turn right.',
          'sd-garis',
        ),
        m(
          'Lintasan lengkung',
          'Curved tracks',
          'Atur kecepatan agar tidak keluar garis.',
          'Tune speed so the robot stays on the line.',
          'sd-garis',
        ),
        m(
          'Garis lebar dan persimpangan',
          'Wide lines and junctions',
          'Berhenti saat kedua sensor melihat garis.',
          'Stop when both sensors see the line.',
          'sd-persimpangan',
        ),
        m(
          'Debugging',
          'Debugging',
          'Catat titik gagal dan perbaikannya.',
          'Log where it failed and how you fixed it.',
        ),
      ],
    },
    {
      id: 'misi-akhir',
      title: l('Misi akhir: robot pintar', 'Final mission: smart robot'),
      goal: l(
        'Menggabungkan gerak, sensor, dan keluaran menjadi solusi.',
        'Combine motion, sensors, and outputs into a solution.',
      ),
      concepts: [
        l('Strategi', 'Strategy'),
        l('Integrasi', 'Integration'),
        l('Komunikasi', 'Communication'),
      ],
      evidence: l(
        'Misi berhasil, aturan dijelaskan, dan ada bukti uji coba serta perbaikan.',
        'The mission succeeds, rules are explained, and testing and fixes are shown.',
      ),
      video: en(
        '9vJRopau0g0',
        'The Super Mario Effect - Tricking Your Brain into Learning More',
        'TEDx Talks',
        l(
          'Untuk guru atau kelas 5 dan 6, sebelum hari uji coba. Mark Rober bercerita kenapa gagal saat mencoba tidak perlu ditakuti.',
          'For teachers or grades 5 and 6, before test day. Mark Rober explains why failing while you try is nothing to fear.',
        ),
        15,
      ),
      meetings: [
        m(
          'Rancang misi',
          'Design the mission',
          'Gambar alur robot di kertas.',
          'Sketch the robot’s plan on paper.',
        ),
        m(
          'Gabungkan sensor',
          'Combine sensors',
          'Ikuti garis dan berhenti saat ada halangan.',
          'Follow the line and stop at an obstacle.',
          'sd-misi-akhir',
        ),
        m(
          'Uji dan perbaiki',
          'Test and fix',
          'Uji tiga kali, catat hasilnya.',
          'Run three trials and record them.',
          'sd-misi-akhir',
        ),
        m(
          'Gladi',
          'Rehearsal',
          'Latihan presentasi dan demo.',
          'Practise the presentation and demo.',
        ),
        m(
          'Presentasi dan refleksi',
          'Presentation and reflection',
          'Demo di depan kelas dan refleksi.',
          'Demo to the class and reflect.',
        ),
      ],
    },
  ],
};

const smp: Curriculum = {
  level: 'smp',
  minutesPerMeeting: 80,
  kkaPhase: l('Fase D, kelas 7 sampai 9.', 'Phase D, grades 7 to 9.'),
  kka: [
    {
      element: l('Berpikir komputasional', 'Computational thinking'),
      how: l(
        'Aturan kemudi dari pola bacaan sensor, kendali proporsional, dan pemindaian tiga arah (modul 3 dan 4).',
        'Steering rules from sensor patterns, proportional control, and three-way scans (modules 3 and 4).',
      ),
    },
    {
      element: l('Literasi digital', 'Digital literacy'),
      how: l(
        'Jaringan kelas, data apa yang boleh dikirim, dan mode luring (modul 7).',
        'The class network, which data may be sent, and offline mode (module 7).',
      ),
    },
    {
      element: l('Literasi dan etika kecerdasan artifisial', 'AI literacy and ethics'),
      how: l(
        'Membedakan deteksi suara sederhana dari pengenalan ucapan (modul 6).',
        'Telling simple sound detection apart from speech recognition (module 6).',
      ),
    },
  ],
  modules: [
    {
      id: 'sistem',
      title: l('Petakan sistem', 'Map the system'),
      goal: l(
        'Memahami input-proses-output dan merakit platform dengan aman.',
        'Understand input-process-output and assemble the platform safely.',
      ),
      concepts: [
        l('Diagram blok', 'Block diagrams'),
        l('Sistem daya', 'Power systems'),
        l('Perakitan', 'Assembly'),
      ],
      evidence: l(
        'Siswa menjelaskan alur satu sensor ke satu aksi pada robot rakitannya.',
        'Students explain one sensor-to-action path on the robot they built.',
      ),
      video: en(
        'DKGZlaPlVLY',
        'How Computers Work: CPU, Memory, Input & Output',
        'Code.org',
        l(
          'Setelah menonton, siswa memetakan sensor, ESP32, dan aktuator SMP v1 ke input, proses, dan output.',
          'After watching, students map the sensors, ESP32, and actuators of SMP v1 to input, process, and output.',
        ),
      ),
      meetings: [
        m(
          'Input, proses, output',
          'Input, process, output',
          'Kelompokkan modul dan gambar diagram blok.',
          'Group the modules and draw a block diagram.',
          'smp-sistem',
        ),
        m(
          'Daya dan keselamatan',
          'Power and safety',
          'Kenali baterai 2S, sakelar, dan charger khusus.',
          'Learn the 2S battery, switch, and dedicated charger.',
        ),
        m(
          'Rakit platform',
          'Build the platform',
          'Pasang sasis, motor, roda, dan PCB tanpa solder.',
          'Fit the chassis, motors, wheels, and PCB without soldering.',
        ),
      ],
    },
    {
      id: 'gerak',
      title: l('Kendali gerak', 'Motion control'),
      goal: l('Mengatur arah dan kecepatan dengan PWM.', 'Control direction and speed with PWM.'),
      concepts: [
        l('Driver motor', 'Motor drivers'),
        l('PWM', 'PWM'),
        l('Kalibrasi', 'Calibration'),
      ],
      evidence: l(
        'Siswa membandingkan hasil dan alasan setiap perubahan parameter.',
        'Students compare results and reasons for each parameter change.',
      ),
      video: en(
        'YU17L650k3s',
        'DC Motor Control with an H-Bridge and Arduino (Lesson #17)',
        'Science Buddies',
        l(
          'Video memakai L293D, sedangkan SMP v1 memakai TB6612FNG. Cara kerjanya sama: dua pin arah dan satu PWM untuk tiap motor.',
          'The video uses an L293D while SMP v1 uses a TB6612FNG. They work the same way: two direction pins and one PWM pin per motor.',
        ),
      ),
      meetings: [
        m(
          'Driver motor TB6612FNG',
          'The TB6612FNG driver',
          'Uji arah maju-mundur tiap motor.',
          'Test forward and reverse on each motor.',
        ),
        m(
          'PWM dan kecepatan',
          'PWM and speed',
          'Ukur kecepatan pada beberapa nilai PWM.',
          'Measure speed at several PWM values.',
        ),
        m(
          'Jalan lurus',
          'Driving straight',
          'Kalibrasi beda kecepatan kiri-kanan.',
          'Calibrate left-right speed differences.',
          'smp-pwm',
        ),
        m(
          'Ukur jarak tempuh',
          'Measuring distance',
          'Hubungkan waktu, kecepatan, dan jarak.',
          'Relate time, speed, and distance.',
        ),
        m(
          'Berhenti tepat',
          'Stopping on target',
          'Tantangan berhenti di zona: simulator lalu robot.',
          'Stop in the zone: simulator, then robot.',
          'smp-pwm',
        ),
      ],
    },
    {
      id: 'garis',
      title: l('Ikuti garis', 'Line following'),
      goal: l(
        'Membaca array sensor, menetapkan ambang, dan mengemudi proporsional.',
        'Read a sensor array, set thresholds, and steer proportionally.',
      ),
      concepts: [
        l('Ambang', 'Thresholds'),
        l('Posisi garis', 'Line position'),
        l('Kendali proporsional', 'Proportional control'),
      ],
      evidence: l(
        'Robot menyelesaikan lintasan dan siswa menjelaskan kegagalannya.',
        'The robot completes the track and students explain its failures.',
      ),
      video: en(
        'wkfEZmsQqiA',
        'What Is PID Control?',
        'MATLAB',
        l(
          'Untuk pertemuan koreksi proporsional. Bagian P sudah cukup; I dan D bisa jadi tantangan tambahan.',
          'For the proportional correction meeting. The P part is enough; I and D make a good stretch goal.',
        ),
        11,
      ),
      meetings: [
        m(
          'Pasang dan baca IR 5-in-1',
          'Fit and read the 5-in-1 array',
          'Tampilkan lima bacaan di OLED.',
          'Show the five readings on the OLED.',
        ),
        m(
          'Ambang hitam-putih',
          'Black and white thresholds',
          'Kalibrasi pada lintasan kelas.',
          'Calibrate on the class track.',
        ),
        m(
          'Aturan kemudi',
          'Steering rules',
          'Susun aturan dari pola bacaan.',
          'Write rules from the reading pattern.',
        ),
        m(
          'Koreksi proporsional',
          'Proportional correction',
          'Kemudi sebanding posisi garis.',
          'Steer in proportion to line position.',
          'smp-garis',
        ),
        m(
          'Lintasan sulit',
          'Hard tracks',
          'Tikungan tajam dan garis putus.',
          'Sharp turns and broken lines.',
        ),
        m(
          'Analisis kegagalan',
          'Failure analysis',
          'Rekam dan jelaskan titik gagal.',
          'Record and explain failure points.',
        ),
      ],
    },
    {
      id: 'radar',
      title: l('Radar jarak', 'Distance radar'),
      goal: l(
        'Mengukur jarak di beberapa sudut dan memilih jalur.',
        'Measure distance at several angles and choose a path.',
      ),
      concepts: [l('Pengukuran', 'Measurement'), l('Sudut', 'Angles'), l('Keputusan', 'Decisions')],
      evidence: l(
        'Siswa membuat aturan berhenti atau memilih jalur dari data pindaian.',
        'Students build a stop or path-choice rule from scan data.',
      ),
      video: en(
        'n-gJ00GTsNg',
        'HC-SR04 Ultrasonic Distance Sensor and Arduino (Lesson #9)',
        'Science Buddies',
        l(
          'Perhatikan bagian pin Echo. Di ESP32, sinyal itu harus diturunkan dulu ke 3,3 V.',
          'Watch the part about the Echo pin. On the ESP32 that signal has to be brought down to 3.3 V first.',
        ),
      ),
      meetings: [
        m(
          'HC-SR04 dan level sinyal',
          'HC-SR04 and signal levels',
          'Ukur jarak dan pahami batas tegangan GPIO.',
          'Measure distance and learn GPIO voltage limits.',
        ),
        m(
          'Servo dan dudukan',
          'Servo and mount',
          'Atur sudut servo kiri-tengah-kanan.',
          'Set servo angles left, centre, right.',
        ),
        m(
          'Pindai tiga arah',
          'Scanning three ways',
          'Simpan jarak tiap arah ke variabel.',
          'Store each direction’s distance in a variable.',
          'smp-radar',
        ),
        m(
          'Pilih jalur',
          'Choosing a path',
          'Belok ke arah yang paling lapang.',
          'Turn toward the most open side.',
          'smp-radar',
        ),
        m(
          'Tantangan labirin mini',
          'Mini maze challenge',
          'Keluar dari lorong tanpa menabrak.',
          'Exit the corridor without bumping.',
        ),
      ],
    },
    {
      id: 'lingkungan',
      title: l('Stasiun lingkungan', 'Environment station'),
      goal: l('Membaca data I2C dan menampilkannya.', 'Read I2C data and display it.'),
      concepts: [
        l('I2C', 'I2C'),
        l('Data dan satuan', 'Data and units'),
        l('Keterbatasan sensor', 'Sensor limits'),
      ],
      evidence: l(
        'Siswa mencatat data, kondisi uji, dan keterbatasan.',
        'Students log data, test conditions, and limitations.',
      ),
      video: en(
        '6IAkYpmA1DQ',
        'How I2C Communication Works and How To Use It with Arduino',
        'How To Mechatronics',
        l(
          'OLED dan AHT10 di SMP v1 berbagi dua kabel I2C yang sama. Video ini menjelaskan kenapa itu bisa.',
          'The OLED and the AHT10 on SMP v1 share the same two I2C wires. This video explains how that works.',
        ),
      ),
      meetings: [
        m(
          'I2C dan AHT10',
          'I2C and the AHT10',
          'Baca suhu dan kelembapan.',
          'Read temperature and humidity.',
        ),
        m(
          'Tampilkan di OLED',
          'Show it on the OLED',
          'Format angka dan satuan.',
          'Format numbers and units.',
          'smp-lingkungan',
        ),
        m(
          'Catat dan grafik',
          'Log and chart',
          'Catat data tiap menit dan buat grafik.',
          'Log data each minute and chart it.',
        ),
        m(
          'Batas sensor',
          'Sensor limits',
          'Bandingkan dengan termometer; panas regulator.',
          'Compare with a thermometer; regulator heat.',
        ),
      ],
    },
    {
      id: 'suara',
      title: l('Respons suara', 'Sound response'),
      goal: l('Mengubah tingkat suara menjadi peristiwa.', 'Turn sound level into events.'),
      concepts: [
        l('Sinyal analog', 'Analog signals'),
        l('Ambang dan noise', 'Thresholds and noise'),
      ],
      evidence: l(
        'Siswa membedakan peristiwa sederhana dari pengenalan ucapan.',
        'Students tell simple sound events apart from speech recognition.',
      ),
      video: en(
        'bMs5J4bJOD0',
        'How to Use a Microphone with Arduino (Lesson #12)',
        'Science Buddies',
        l(
          'Setelah menonton, ukur tingkat suara kelas saat tenang dan saat ramai, lalu tentukan ambang tepuk tangan.',
          'After watching, measure the class sound level when it is quiet and when it is noisy, then pick a clap threshold.',
        ),
      ),
      meetings: [
        m(
          'Mikrofon dan tingkat suara',
          'Microphone and sound level',
          'Amati nilai saat kelas tenang dan ramai.',
          'Watch the value in a quiet and noisy class.',
        ),
        m(
          'Ambang dan noise',
          'Thresholds and noise',
          'Tentukan ambang tepuk tangan.',
          'Set a clap threshold.',
        ),
        m(
          'Robot tepuk tangan',
          'Clap-controlled robot',
          'Tepuk sekali jalan, tepuk lagi berhenti.',
          'Clap once to go, again to stop.',
          'smp-suara',
        ),
        m(
          'Peristiwa vs ucapan',
          'Events vs speech',
          'Diskusi: apa yang bisa dan tidak bisa sensor ini.',
          'Discuss what this sensor can and cannot do.',
        ),
      ],
    },
    {
      id: 'telemetri',
      title: l('Telemetri Wi-Fi', 'Wi-Fi telemetry'),
      goal: l(
        'Mengirim data sensor ke tampilan lokal dengan aman.',
        'Send sensor data to a local display safely.',
      ),
      concepts: [
        l('Jaringan', 'Networks'),
        l('Privasi', 'Privacy'),
        l('Mode luring', 'Offline mode'),
      ],
      evidence: l(
        'Sistem tetap punya aktivitas lokal ketika Wi-Fi tidak tersedia.',
        'The system still works locally without Wi-Fi.',
      ),
      video: en(
        'ZhEf7e4kopM',
        'The Internet: Wires, Cables & Wifi',
        'Code.org',
        l(
          'Pengantar sebelum ESP32 disambungkan ke jaringan kelas.',
          'An introduction before the ESP32 joins the class network.',
        ),
      ),
      meetings: [
        m(
          'Wi-Fi ESP32',
          'ESP32 Wi-Fi',
          'Sambung ke jaringan kelas yang dikelola guru.',
          'Join the teacher-managed class network.',
        ),
        m(
          'Dasbor lokal',
          'Local dashboard',
          'Kirim data jarak dan suhu ke halaman lokal.',
          'Send distance and temperature to a local page.',
          'smp-telemetri',
        ),
        m(
          'Privasi dan keamanan',
          'Privacy and security',
          'Data apa yang boleh dikirim, ke mana.',
          'Which data may be sent, and where.',
        ),
        m(
          'Mode luring',
          'Offline mode',
          'Pastikan robot tetap bekerja tanpa jaringan.',
          'Make sure the robot works without a network.',
          'smp-telemetri',
        ),
      ],
    },
    {
      id: 'proyek',
      title: l('Proyek akhir', 'Final project'),
      goal: l(
        'Mengintegrasikan modul dan mengomunikasikan desain.',
        'Integrate modules and communicate the design.',
      ),
      concepts: [
        l('Integrasi', 'Integration'),
        l('Iterasi', 'Iteration'),
        l('Dokumentasi', 'Documentation'),
      ],
      evidence: l(
        'Siswa menunjukkan hasil, data uji, batasan, dan iterasi.',
        'Students show results, test data, limits, and iterations.',
      ),
      video: en(
        'hFZFjoX2cGg',
        'Building the Perfect Squirrel Proof Bird Feeder',
        'Mark Rober',
        l(
          'Contoh rancang, uji, lalu rancang ulang. Ada bagian sponsor di tengah video yang bisa dilewati.',
          'Design, test, redesign, on a real problem. There is a sponsor segment in the middle you can skip.',
        ),
      ),
      meetings: [
        m(
          'Pilih masalah',
          'Pick a problem',
          'Tentukan misi dan kriteria berhasil.',
          'Define the mission and success criteria.',
        ),
        m(
          'Integrasi modul',
          'Integrate modules',
          'Gabungkan sensor dan aktuator yang dibutuhkan.',
          'Combine the sensors and actuators you need.',
          'smp-bebas',
        ),
        m('Uji dan iterasi', 'Test and iterate', 'Uji, catat, perbaiki.', 'Test, log, fix.'),
        m(
          'Dokumentasi desain',
          'Design documentation',
          'Tulis keputusan dan alasannya.',
          'Write down decisions and reasons.',
        ),
        m('Presentasi', 'Presentation', 'Demo dan tanya jawab.', 'Demo and Q&A.'),
      ],
    },
  ],
};

const sma: Curriculum = {
  level: 'sma',
  minutesPerMeeting: 90,
  kkaPhase: l('Fase E dan F, kelas 10 sampai 12.', 'Phases E and F, grades 10 to 12.'),
  kka: [
    {
      element: l('Algoritma pemrograman', 'Algorithms and programming'),
      how: l(
        'Python dan C++ untuk sensor, motor, dan PID (modul 1 dan 2).',
        'Python and C++ for sensors, motors, and PID (modules 1 and 2).',
      ),
    },
    {
      element: l('Berpikir komputasional', 'Computational thinking'),
      how: l(
        'Memecah robot menjadi node, topik, dan layanan ROS 2 (modul 3).',
        'Breaking the robot into ROS 2 nodes, topics, and services (module 3).',
      ),
    },
    {
      element: l('Analisis data', 'Data analysis'),
      how: l(
        'Rekaman rosbag, dataset gambar, dan akurasi model (modul 3 dan 5).',
        'Rosbag recordings, image datasets, and model accuracy (modules 3 and 5).',
      ),
    },
    {
      element: l(
        'Pemanfaatan dan pengembangan kecerdasan artifisial',
        'Using and developing artificial intelligence',
      ),
      how: l(
        'Melatih dan menjalankan deteksi objek YOLO di robot (modul 5).',
        'Training a YOLO object detector and running it on the robot (module 5).',
      ),
    },
    {
      element: l('Literasi dan etika kecerdasan artifisial', 'AI literacy and ethics'),
      how: l(
        'Kesalahan model, bias data, dan dampaknya (modul 5).',
        'Model errors, data bias, and their effects (module 5).',
      ),
    },
    {
      element: l('Literasi digital', 'Digital literacy'),
      how: l(
        'Linux, jaringan, dan dasbor yang aksesnya dibatasi (modul 1 dan 7).',
        'Linux, networking, and a dashboard with restricted access (modules 1 and 7).',
      ),
    },
  ],
  modules: [
    {
      id: 'linux',
      title: l('Linux dan Python di komputer robot', 'Linux and Python on the robot computer'),
      goal: l(
        'Menyiapkan komputer onboard dan bekerja lewat terminal.',
        'Set up the onboard computer and work from the terminal.',
      ),
      concepts: [l('Linux', 'Linux'), l('Python', 'Python'), l('Jaringan', 'Networking')],
      evidence: l(
        'Siswa mengakses robot lewat SSH dan menjalankan skrip Python.',
        'Students reach the robot over SSH and run Python scripts.',
      ),
      meetings: [
        m(
          'Menyalakan komputer robot',
          'Booting the robot computer',
          'Flash OS dan atur jaringan.',
          'Flash the OS and set up the network.',
        ),
        m(
          'Terminal dan SSH',
          'Terminal and SSH',
          'Navigasi file dan akses jarak jauh.',
          'Navigate files and connect remotely.',
        ),
        m(
          'Python untuk robot',
          'Python for robots',
          'Baca sensor sederhana dengan Python.',
          'Read a simple sensor in Python.',
        ),
        m(
          'Git dan kerja tim',
          'Git and teamwork',
          'Simpan kode di repositori kelompok.',
          'Keep code in a team repository.',
        ),
      ],
    },
    {
      id: 'embedded',
      title: l('Sistem tertanam', 'Embedded systems'),
      goal: l(
        'Mengendalikan motor dan sensor dari mikrokontroler.',
        'Control motors and sensors from the microcontroller.',
      ),
      concepts: [
        l('ESP32/STM32', 'ESP32/STM32'),
        l('Encoder', 'Encoders'),
        l('Komunikasi serial', 'Serial communication'),
      ],
      evidence: l(
        'Komputer dan mikrokontroler bertukar perintah dan data.',
        'The computer and microcontroller exchange commands and data.',
      ),
      meetings: [
        m(
          'Rakit sasis rover',
          'Build the rover chassis',
          'Pasang motor, encoder, dan sakelar.',
          'Fit motors, encoders, and the switch.',
        ),
        m(
          'Motor dan encoder',
          'Motors and encoders',
          'Ukur putaran roda.',
          'Measure wheel rotation.',
        ),
        m(
          'PID kecepatan',
          'Speed PID',
          'Atur kecepatan stabil dengan PID.',
          'Hold a steady speed with PID.',
        ),
        m(
          'Serial ke komputer',
          'Serial to the computer',
          'Kirim perintah dan telemetri.',
          'Send commands and telemetry.',
        ),
      ],
    },
    {
      id: 'ros2',
      title: l('ROS 2 dasar', 'ROS 2 basics'),
      goal: l(
        'Menyusun robot sebagai node, topik, dan layanan.',
        'Structure the robot as nodes, topics, and services.',
      ),
      concepts: [l('Node dan topik', 'Nodes and topics'), l('TF', 'TF'), l('RViz', 'RViz')],
      evidence: l(
        'Robot dikendalikan lewat ROS 2 dan terlihat di RViz.',
        'The robot is driven through ROS 2 and visible in RViz.',
      ),
      meetings: [
        m('Konsep ROS 2', 'ROS 2 concepts', 'Node, topik, pesan.', 'Nodes, topics, messages.'),
        m(
          'Publisher dan subscriber',
          'Publishers and subscribers',
          'Tulis node Python pertama.',
          'Write a first Python node.',
        ),
        m(
          'Teleoperasi',
          'Teleoperation',
          'Kendalikan rover dengan keyboard atau gamepad.',
          'Drive the rover with a keyboard or gamepad.',
        ),
        m(
          'TF dan URDF',
          'TF and URDF',
          'Model robot dan kerangka koordinat.',
          'Robot model and coordinate frames.',
        ),
        m(
          'RViz dan rosbag',
          'RViz and rosbag',
          'Visualisasi dan rekam data.',
          'Visualise and record data.',
        ),
        m(
          'Simulasi Gazebo',
          'Gazebo simulation',
          'Uji node di digital twin.',
          'Test nodes on the digital twin.',
        ),
      ],
    },
    {
      id: 'vision',
      title: l('Computer vision', 'Computer vision'),
      goal: l(
        'Mengolah citra kamera untuk keputusan robot.',
        'Process camera images for robot decisions.',
      ),
      concepts: [
        l('OpenCV', 'OpenCV'),
        l('Warna dan bentuk', 'Colour and shape'),
        l('Kalibrasi kamera', 'Camera calibration'),
      ],
      evidence: l(
        'Robot bereaksi terhadap objek yang dikenali kamera.',
        'The robot reacts to objects the camera recognises.',
      ),
      meetings: [
        m(
          'Kamera di ROS 2',
          'Cameras in ROS 2',
          'Terbitkan gambar sebagai topik.',
          'Publish images as a topic.',
        ),
        m(
          'Filter warna',
          'Colour filters',
          'Deteksi objek berdasarkan warna.',
          'Detect objects by colour.',
        ),
        m(
          'Kontur dan bentuk',
          'Contours and shapes',
          'Hitung posisi objek di gambar.',
          'Find object positions in the image.',
        ),
        m(
          'Ikuti objek',
          'Follow an object',
          'Kemudi berdasarkan posisi objek.',
          'Steer from the object position.',
        ),
        m(
          'Kalibrasi kamera',
          'Camera calibration',
          'Koreksi distorsi lensa.',
          'Correct lens distortion.',
        ),
      ],
    },
    {
      id: 'yolo',
      title: l('Deteksi objek dengan AI', 'Object detection with AI'),
      goal: l(
        'Melatih dan memakai model deteksi objek sederhana.',
        'Train and use a simple object detector.',
      ),
      concepts: [l('Dataset', 'Datasets'), l('YOLO', 'YOLO'), l('Etika AI', 'AI ethics')],
      evidence: l(
        'Siswa menjelaskan kualitas data, akurasi, dan batas modelnya.',
        'Students explain data quality, accuracy, and model limits.',
      ),
      meetings: [
        m(
          'Data dan label',
          'Data and labels',
          'Kumpulkan dan beri label gambar.',
          'Collect and label images.',
        ),
        m(
          'Latih YOLO',
          'Train YOLO',
          'Latih model kecil dan ukur akurasinya.',
          'Train a small model and measure accuracy.',
        ),
        m(
          'Jalankan di robot',
          'Run it on the robot',
          'Inferensi di Raspberry Pi atau Jetson.',
          'Inference on Raspberry Pi or Jetson.',
        ),
        m(
          'Bias dan etika',
          'Bias and ethics',
          'Diskusi kesalahan dan dampak model.',
          'Discuss model errors and their impact.',
        ),
      ],
    },
    {
      id: 'navigasi',
      title: l('SLAM dan navigasi', 'SLAM and navigation'),
      goal: l('Memetakan ruangan dan bernavigasi otonom.', 'Map a room and navigate autonomously.'),
      concepts: [l('LiDAR', 'LiDAR'), l('SLAM', 'SLAM'), l('Nav2', 'Nav2')],
      evidence: l(
        'Robot membuat peta dan mencapai tujuan tanpa menabrak.',
        'The robot builds a map and reaches goals without collisions.',
      ),
      meetings: [
        m(
          'LiDAR dan scan',
          'LiDAR and scans',
          'Visualisasikan data LiDAR.',
          'Visualise LiDAR data.',
        ),
        m('Odometri', 'Odometry', 'Gabungkan encoder dan IMU.', 'Fuse encoders and IMU.'),
        m('Buat peta', 'Build a map', 'SLAM di ruang kelas.', 'SLAM in the classroom.'),
        m(
          'Navigasi ke tujuan',
          'Navigate to a goal',
          'Atur Nav2 dan kirim tujuan.',
          'Set up Nav2 and send goals.',
        ),
        m(
          'Hindari rintangan',
          'Avoid obstacles',
          'Uji rintangan dinamis.',
          'Test moving obstacles.',
        ),
        m(
          'Patroli titik',
          'Waypoint patrol',
          'Robot berpatroli beberapa titik.',
          'Patrol several waypoints.',
        ),
      ],
    },
    {
      id: 'iot',
      title: l('IoT dan dasbor', 'IoT and dashboards'),
      goal: l(
        'Mengirim status robot ke dasbor lewat MQTT.',
        'Send robot status to a dashboard over MQTT.',
      ),
      concepts: [l('MQTT', 'MQTT'), l('Dasbor', 'Dashboards'), l('Keamanan', 'Security')],
      evidence: l(
        'Status robot terlihat di dasbor lokal yang aman.',
        'Robot status appears on a secure local dashboard.',
      ),
      meetings: [
        m('Broker MQTT', 'MQTT broker', 'Jalankan broker lokal.', 'Run a local broker.'),
        m(
          'Jembatan ROS 2 ke MQTT',
          'ROS 2 to MQTT bridge',
          'Kirim baterai dan posisi.',
          'Publish battery and position.',
        ),
        m(
          'Dasbor dan keamanan',
          'Dashboard and security',
          'Tampilkan data dan batasi akses.',
          'Show data and restrict access.',
        ),
      ],
    },
    {
      id: 'proyek',
      title: l('Lengan robot dan proyek akhir', 'Robotic arm and final project'),
      goal: l(
        'Menggabungkan persepsi, navigasi, dan manipulasi.',
        'Combine perception, navigation, and manipulation.',
      ),
      concepts: [l('Kinematika', 'Kinematics'), l('Integrasi sistem', 'System integration')],
      evidence: l(
        'Robot menyelesaikan misi ambil-antar dan tim mempresentasikan desainnya.',
        'The robot completes a pick-and-deliver mission and the team presents its design.',
      ),
      meetings: [
        m(
          'Lengan robot',
          'Robotic arm',
          'Gerakkan sendi dan capit.',
          'Move joints and the gripper.',
        ),
        m(
          'Ambil objek terdeteksi',
          'Pick a detected object',
          'Gabungkan vision dan lengan.',
          'Combine vision and the arm.',
        ),
        m(
          'Integrasi misi',
          'Mission integration',
          'Navigasi, ambil, antar.',
          'Navigate, pick, deliver.',
        ),
        m(
          'Presentasi dan lomba',
          'Presentation and competition',
          'Demo akhir dan persiapan lomba.',
          'Final demo and competition prep.',
        ),
      ],
    },
  ],
};

export const curricula: Record<LevelSlug, Curriculum> = { sd, smp, sma };

export function meetingCount(curriculum: Curriculum): number {
  return curriculum.modules.reduce((total, module) => total + module.meetings.length, 0);
}

/** SD challenge tiers on the same robot. */
export const sdTiers: ReadonlyArray<{
  id: string;
  title: Localized;
  approach: Localized;
  target: Localized;
}> = [
  {
    id: 'beginner',
    title: l('Pemula', 'Beginner'),
    approach: l(
      'Ikuti contoh blok, prediksi satu aksi, ubah satu instruksi.',
      'Follow example blocks, predict one action, change one instruction.',
    ),
    target: l('Urutan dan sebab-akibat', 'Sequence and cause-effect'),
  },
  {
    id: 'intermediate',
    title: l('Menengah', 'Intermediate'),
    approach: l(
      'Pilih di antara dua kondisi, atur kecepatan dan durasi, perbaiki jalur.',
      'Choose between two conditions, tune speed and duration, fix the path.',
    ),
    target: l('Kondisi dan debugging sederhana', 'Conditions and simple debugging'),
  },
  {
    id: 'advanced',
    title: l('Lanjutan', 'Advanced'),
    approach: l(
      'Gabungkan sensor dan pengulangan untuk menjalankan misi.',
      'Combine sensors and loops to complete a mission.',
    ),
    target: l(
      'Strategi, pengujian, dan penjelasan solusi',
      'Strategy, testing, and explaining solutions',
    ),
  },
];

/** Shared assessment rubric: criteria scored on four levels. */
export const rubric = {
  levels: [
    l('Mulai berkembang', 'Emerging'),
    l('Berkembang', 'Developing'),
    l('Cakap', 'Proficient'),
    l('Mahir', 'Advanced'),
  ],
  criteria: [
    l('Prediksi dan perencanaan', 'Prediction and planning'),
    l('Program bekerja sesuai misi', 'Program meets the mission'),
    l('Uji coba dan perbaikan', 'Testing and iteration'),
    l('Menjelaskan aturan dan keputusan', 'Explaining rules and decisions'),
    l('Kerja sama dan keselamatan', 'Teamwork and safety'),
  ],
} as const;
