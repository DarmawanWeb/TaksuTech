import { describe, expect, it } from 'vitest';
import { formatPawukon, getPawukon, upcomingHolyDays } from './pawukon';

const wita = (isoDate: string) => new Date(`${isoDate}T09:00:00+08:00`);

describe('getPawukon', () => {
  it('starts the cycle on Redite Paing Sinta (Banyu Pinaruh)', () => {
    const day = getPawukon(wita('2023-12-17'));
    expect(formatPawukon(day)).toBe('Redite Paing Sinta');
    expect(day.holyDays.map((holyDay) => holyDay.id)).toEqual(['banyu-pinaruh']);
  });

  it.each(['2024-02-28', '2024-09-25', '2025-04-23', '2025-11-19'])(
    'finds Galungan (Buda Kliwon Dungulan) on %s',
    (date) => {
      const day = getPawukon(wita(date));
      expect(formatPawukon(day)).toBe('Buda Kliwon Dungulan');
      expect(day.holyDays.map((holyDay) => holyDay.id)).toContain('galungan');
    },
  );

  it('finds Kuningan ten days after Galungan', () => {
    expect(formatPawukon(getPawukon(wita('2024-03-09')))).toBe('Saniscara Kliwon Kuningan');
  });

  it('places every Tumpek on Saniscara Kliwon', () => {
    for (let offset = 0; offset < 210; offset += 1) {
      const date = new Date(Date.UTC(2024, 0, 1 + offset, 4));
      const day = getPawukon(date);
      const isTumpek = day.holyDays.some((holyDay) => holyDay.id.startsWith('tumpek'));
      if (isTumpek) {
        expect(`${day.saptawara.name} ${day.pancawara.name}`).toBe('Saniscara Kliwon');
      }
    }
  });

  it('evaluates the calendar day in Bali time', () => {
    // 17:00 UTC on 27 Feb is already 01:00 on 28 Feb in WITA (UTC+8).
    const day = getPawukon(new Date('2024-02-27T17:00:00Z'));
    expect(day.holyDays.map((holyDay) => holyDay.id)).toContain('galungan');
  });
});

describe('upcomingHolyDays', () => {
  it('lists the nearest holy days first', () => {
    const [first, second] = upcomingHolyDays(wita('2024-02-26'), 2);
    expect(first).toMatchObject({ id: 'penampahan-galungan', inDays: 1 });
    expect(second).toMatchObject({ id: 'galungan', inDays: 2 });
  });
});
