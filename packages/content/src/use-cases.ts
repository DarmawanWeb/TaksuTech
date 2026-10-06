import type { Localized } from './i18n';
import type { RobotSlug } from './robots';

export interface UseCase {
  id: string;
  icon: 'hotel' | 'office' | 'hospital' | 'airport' | 'school';
  title: Localized;
  body: Localized;
  robot: RobotSlug;
  /** Kiosk sample that demonstrates this use case, if one exists. */
  demoSite?: string;
}

export const useCases: readonly UseCase[] = [
  {
    id: 'hospitality',
    icon: 'hotel',
    title: { id: 'Hotel, resor, dan vila', en: 'Hotels, resorts, and villas' },
    body: {
      id: 'Menyambut tamu dalam bahasa mereka, menjelaskan fasilitas, mengantar ke spa atau restoran, dan memberi tips adat Bali.',
      en: 'Welcome guests in their language, explain facilities, escort them to the spa or restaurant, and share Balinese etiquette.',
    },
    robot: 'snow',
    demoSite: 'resort',
  },
  {
    id: 'public-service',
    icon: 'office',
    title: { id: 'Kantor pelayanan publik', en: 'Public-service offices' },
    body: {
      id: 'Mengambilkan nomor antrean, menjelaskan syarat layanan, menampilkan struktur organisasi, dan mengantar ke loket.',
      en: 'Issue queue numbers, explain service requirements, show the organisation chart, and lead visitors to the right counter.',
    },
    robot: 'timo',
    demoSite: 'kantor-layanan',
  },
  {
    id: 'healthcare',
    icon: 'hospital',
    title: { id: 'Rumah sakit dan klinik', en: 'Hospitals and clinics' },
    body: {
      id: 'Mengarahkan pasien ke poli, membagi antrean, dan mengurangi kerumunan di meja informasi.',
      en: 'Direct patients to the right clinic, split queues, and ease crowding at the information desk.',
    },
    robot: 'timo',
  },
  {
    id: 'transport-retail',
    icon: 'airport',
    title: { id: 'Bandara, pelabuhan, dan mal', en: 'Airports, harbours, and malls' },
    body: {
      id: 'Menjawab pertanyaan umum wisatawan, menampilkan promosi, dan menunjukkan arah ke gerai atau gerbang.',
      en: 'Answer common traveller questions, display promotions, and point the way to shops or gates.',
    },
    robot: 'snow',
  },
  {
    id: 'education',
    icon: 'school',
    title: { id: 'Sekolah dan kampus', en: 'Schools and campuses' },
    body: {
      id: 'Menerima tamu sekolah, mengantar ke ruang kelas, dan menjadi teman belajar di perpustakaan.',
      en: 'Receive school visitors, lead them to classrooms, and keep students company in the library.',
    },
    robot: 'snow',
  },
];
