import { describe, expect, it } from 'vitest';
import { curricula, meetingCount } from './curriculum';
import { accessories, eduFaq, upgradePacks } from './edu-catalog';
import { educationLevels } from './education';
import { guides } from './guides';
import { comparison, robots } from './reception';
import { simMissions } from './sim-missions';

describe('curriculum', () => {
  it('matches the advertised meeting count per level', () => {
    for (const level of educationLevels) {
      expect(meetingCount(curricula[level.slug]), level.slug).toBe(level.meetings);
    }
  });

  it('links modules only to simulator missions that exist for that robot', () => {
    const ids = new Map(simMissions.map((mission) => [mission.id, mission.robot]));
    for (const [level, curriculum] of Object.entries(curricula)) {
      for (const module of curriculum.modules) {
        if (!module.simMission) continue;
        expect(ids.get(module.simMission), `${level}/${module.id}`).toBe(level);
      }
    }
  });
});

describe('reception catalogue', () => {
  it('compares every robot on every row', () => {
    for (const row of comparison) {
      for (const robot of robots) expect(row.values[robot.slug], row.label.en).toBeDefined();
    }
  });

  it('has exactly one static kiosk with a built-in printer', () => {
    const statics = robots.filter((robot) => robot.kind === 'static');
    expect(statics.map((robot) => robot.capabilities.printer)).toEqual(['built-in']);
  });
});

describe('guides', () => {
  it('uses unique slugs', () => {
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
  });
});

describe('edu catalog', () => {
  const kits = new Set(educationLevels.map((level) => level.slug));

  it('fits every add-on to at least one existing kit', () => {
    for (const item of [...upgradePacks, ...accessories]) {
      expect(item.fits.length, item.id).toBeGreaterThan(0);
      for (const level of item.fits) expect(kits.has(level), `${item.id}/${level}`).toBe(true);
    }
  });

  it('uses unique ids within each list', () => {
    for (const list of [[...upgradePacks, ...accessories], eduFaq]) {
      const ids = list.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('names each kit with its version', () => {
    for (const level of educationLevels) expect(level.kit.endsWith(level.version)).toBe(true);
  });
});
