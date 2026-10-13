import type { Localized } from './i18n';

export type ServiceId = 'custom-robots' | 'iot' | 'web';

export interface Service {
  id: ServiceId;
  title: Localized;
  summary: Localized;
  /** Kinds of work we take on, as short lines. */
  examples: readonly Localized[];
}

/**
 * Work we take on outside the two product lines. Kept to what the same team already does for
 * the products, so the list stays short and believable.
 */
export const services: readonly Service[] = [
  {
    id: 'custom-robots',
    title: { id: 'Robot dan PCB kustom', en: 'Custom robots and PCBs' },
    summary: {
      id: 'Robot dan papan sirkuit yang dirancang untuk kebutuhan Anda, dengan cara kerja yang sama seperti kit edukasi kami.',
      en: 'Robots and circuit boards designed for your needs, built the same way as our education kits.',
    },
    examples: [
      {
        id: 'Kit robot kustom untuk sekolah, kampus, atau tempat kursus',
        en: 'Custom robot kits for schools, universities, or course providers',
      },
      {
        id: 'Robot untuk lomba robotik, termasuk pendampingan tim',
        en: 'Robots for robotics competitions, including team coaching',
      },
      {
        id: 'PCB kustom dari skema sampai siap rakit',
        en: 'Custom PCBs from schematic to assembly',
      },
      {
        id: 'Purwarupa alat dengan sensor dan motor',
        en: 'Prototypes of devices with sensors and motors',
      },
    ],
  },
  {
    id: 'iot',
    title: { id: 'IoT dan sistem tertanam', en: 'IoT and embedded systems' },
    summary: {
      id: 'Perangkat kecil yang membaca sensor, mengendalikan alat, dan mengirim datanya lewat Wi-Fi.',
      en: 'Small devices that read sensors, control equipment, and send their data over Wi-Fi.',
    },
    examples: [
      {
        id: 'Pemantauan suhu, kelembapan, atau pemakaian listrik ruangan',
        en: 'Monitoring a room’s temperature, humidity, or power use',
      },
      {
        id: 'Firmware untuk ESP32 dan mikrokontroler lain',
        en: 'Firmware for ESP32 and other microcontrollers',
      },
      { id: 'Kendali alat dari jarak jauh', en: 'Remote control of equipment' },
      {
        id: 'Data sensor yang tampil di dashboard web',
        en: 'Sensor data shown on a web dashboard',
      },
    ],
  },
  {
    id: 'web',
    title: { id: 'Aplikasi web dan dashboard', en: 'Web apps and dashboards' },
    summary: {
      id: 'Aplikasi web untuk menampilkan data perangkat, mengatur antrean dan tamu, atau merapikan pekerjaan internal.',
      en: 'Web apps that show device data, run queues and guest lists, or tidy up internal work.',
    },
    examples: [
      {
        id: 'Dashboard pemantauan robot dan perangkat IoT',
        en: 'Monitoring dashboards for robots and IoT devices',
      },
      { id: 'Sistem antrean dan buku tamu digital', en: 'Digital queue and guest book systems' },
      { id: 'Situs perusahaan atau sekolah', en: 'Company or school websites' },
      { id: 'Aplikasi internal yang ringan', en: 'Lightweight internal apps' },
    ],
  },
];

/** How a custom project runs, from the first message to after handover. */
export const serviceProcess: readonly { id: string; title: Localized; body: Localized }[] = [
  {
    id: 'brief',
    title: { id: 'Ceritakan kebutuhannya', en: 'Tell us what you need' },
    body: {
      id: 'Lewat form kontak atau WhatsApp. Kami tanyakan balik hal yang belum jelas sebelum memberi angka.',
      en: 'Through the contact form or WhatsApp. We ask about anything unclear before giving a figure.',
    },
  },
  {
    id: 'proposal',
    title: { id: 'Usulan dan biaya', en: 'Proposal and cost' },
    body: {
      id: 'Cakupan kerja, jadwal, dan biaya tertulis sebelum pekerjaan dimulai.',
      en: 'Scope, schedule, and cost in writing before any work starts.',
    },
  },
  {
    id: 'build',
    title: { id: 'Rancang, buat, dan uji', en: 'Design, build, and test' },
    body: {
      id: 'Anda mencoba purwarupa atau versi awalnya, lalu kami perbaiki dari masukan itu.',
      en: 'You try a prototype or early version, and we refine it from your feedback.',
    },
  },
  {
    id: 'handover',
    title: { id: 'Serah terima dan dukungan', en: 'Handover and support' },
    body: {
      id: 'Dokumentasi, pelatihan singkat, dan perbaikan bila ada masalah setelah dipakai.',
      en: 'Documentation, a short training session, and fixes if something goes wrong in use.',
    },
  },
];
