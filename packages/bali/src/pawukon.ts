/**
 * Pawukon: the 210-day Balinese calendar cycle (30 wuku × 7 days) that schedules
 * holy days such as Galungan, Kuningan, Saraswati, and the Tumpek days.
 *
 * Anchor: Sunday 17 December 2023 was Redite Paing Sinta, the first day of a cycle
 * (Banyu Pinaruh). It is consistent with Galungan on 28 Feb 2024, 25 Sep 2024,
 * 23 Apr 2025, and 19 Nov 2025 (see pawukon.test.ts).
 */

export const WUKU = [
  'Sinta',
  'Landep',
  'Ukir',
  'Kulantir',
  'Tolu',
  'Gumbreg',
  'Wariga',
  'Warigadean',
  'Julungwangi',
  'Sungsang',
  'Dungulan',
  'Kuningan',
  'Langkir',
  'Medangsia',
  'Pujut',
  'Pahang',
  'Krulut',
  'Merakih',
  'Tambir',
  'Medangkungan',
  'Matal',
  'Uye',
  'Menail',
  'Prangbakat',
  'Bala',
  'Ugu',
  'Wayang',
  'Klawu',
  'Dukut',
  'Watugunung',
] as const;

/** Seven-day week, Sunday first. */
export const SAPTAWARA = [
  'Redite',
  'Soma',
  'Anggara',
  'Buda',
  'Wraspati',
  'Sukra',
  'Saniscara',
] as const;

/** Five-day market week. */
export const PANCAWARA = ['Umanis', 'Paing', 'Pon', 'Wage', 'Kliwon'] as const;

export type WukuName = (typeof WUKU)[number];
export type SaptawaraName = (typeof SAPTAWARA)[number];
export type PancawaraName = (typeof PANCAWARA)[number];

export type HolyDayId =
  | 'banyu-pinaruh'
  | 'pagerwesi'
  | 'tumpek-landep'
  | 'tumpek-wariga'
  | 'penampahan-galungan'
  | 'galungan'
  | 'manis-galungan'
  | 'kuningan'
  | 'tumpek-krulut'
  | 'tumpek-kandang'
  | 'tumpek-wayang'
  | 'saraswati';

export interface HolyDay {
  id: HolyDayId;
  /** Name as commonly written in Bali. */
  name: string;
}

export interface PawukonDay {
  /** Position in the 210-day cycle, 0 = Redite Paing Sinta. */
  cycleDay: number;
  wuku: { index: number; name: WukuName };
  saptawara: { index: number; name: SaptawaraName };
  pancawara: { index: number; name: PancawaraName };
  holyDays: HolyDay[];
}

const CYCLE_LENGTH = 210;
const DAY_MS = 86_400_000;
const EPOCH_UTC = Date.UTC(2023, 11, 17);
export const BALI_TIME_ZONE = 'Asia/Makassar';

/** Holy days keyed by wuku index and saptawara index. Pancawara follows from the cycle. */
const HOLY_DAYS: ReadonlyArray<{ wuku: number; saptawara: number } & HolyDay> = [
  { wuku: 0, saptawara: 0, id: 'banyu-pinaruh', name: 'Banyu Pinaruh' },
  { wuku: 0, saptawara: 3, id: 'pagerwesi', name: 'Pagerwesi' },
  { wuku: 1, saptawara: 6, id: 'tumpek-landep', name: 'Tumpek Landep' },
  { wuku: 6, saptawara: 6, id: 'tumpek-wariga', name: 'Tumpek Wariga' },
  { wuku: 10, saptawara: 2, id: 'penampahan-galungan', name: 'Penampahan Galungan' },
  { wuku: 10, saptawara: 3, id: 'galungan', name: 'Galungan' },
  { wuku: 10, saptawara: 4, id: 'manis-galungan', name: 'Manis Galungan' },
  { wuku: 11, saptawara: 6, id: 'kuningan', name: 'Kuningan' },
  { wuku: 16, saptawara: 6, id: 'tumpek-krulut', name: 'Tumpek Krulut' },
  { wuku: 21, saptawara: 6, id: 'tumpek-kandang', name: 'Tumpek Kandang' },
  { wuku: 26, saptawara: 6, id: 'tumpek-wayang', name: 'Tumpek Wayang' },
  { wuku: 29, saptawara: 6, id: 'saraswati', name: 'Saraswati' },
];

function mod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

/** Calendar date (y, m, d) of an instant as seen in the given time zone. */
function calendarDateIn(
  date: Date,
  timeZone: string,
): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: read('year'), month: read('month'), day: read('day') };
}

/** Pawukon reading for a position in the 210-day cycle (0 = Redite Paing Sinta). */
export function pawukonFromCycleDay(cycleDay: number): PawukonDay {
  const wukuIndex = Math.floor(cycleDay / 7);
  const saptawaraIndex = cycleDay % 7;
  const pancawaraIndex = (cycleDay + 1) % 5;
  const wuku = WUKU[wukuIndex] ?? WUKU[0];
  const saptawara = SAPTAWARA[saptawaraIndex] ?? SAPTAWARA[0];
  const pancawara = PANCAWARA[pancawaraIndex] ?? PANCAWARA[0];

  return {
    cycleDay,
    wuku: { index: wukuIndex, name: wuku },
    saptawara: { index: saptawaraIndex, name: saptawara },
    pancawara: { index: pancawaraIndex, name: pancawara },
    holyDays: HOLY_DAYS.filter(
      (holyDay) => holyDay.wuku === wukuIndex && holyDay.saptawara === saptawaraIndex,
    ).map(({ id, name }) => ({ id, name })),
  };
}

/** Pawukon reading for a date, evaluated in Bali time (WITA) by default. */
export function getPawukon(date: Date, timeZone: string = BALI_TIME_ZONE): PawukonDay {
  const { year, month, day } = calendarDateIn(date, timeZone);
  const elapsedDays = Math.round((Date.UTC(year, month - 1, day) - EPOCH_UTC) / DAY_MS);
  return pawukonFromCycleDay(mod(elapsedDays, CYCLE_LENGTH));
}

/** "Anggara Kliwon Medangsia" style label used on Balinese calendars. */
export function formatPawukon(day: PawukonDay): string {
  return `${day.saptawara.name} ${day.pancawara.name} ${day.wuku.name}`;
}

export interface UpcomingHolyDay extends HolyDay {
  /** Whole days from the reference date (0 = today). */
  inDays: number;
}

/** Next holy days within one full cycle from a cycle position, nearest first. */
export function upcomingHolyDaysFromCycleDay(start: number, count = 3): UpcomingHolyDay[] {
  const result: UpcomingHolyDay[] = [];
  for (let offset = 0; offset < CYCLE_LENGTH && result.length < count; offset += 1) {
    const { holyDays } = pawukonFromCycleDay(mod(start + offset, CYCLE_LENGTH));
    for (const holyDay of holyDays) {
      if (result.length < count) result.push({ ...holyDay, inDays: offset });
    }
  }
  return result;
}

/** Next holy days within one full cycle from `from`, nearest first. */
export function upcomingHolyDays(
  from: Date,
  count = 3,
  timeZone: string = BALI_TIME_ZONE,
): UpcomingHolyDay[] {
  return upcomingHolyDaysFromCycleDay(getPawukon(from, timeZone).cycleDay, count);
}
