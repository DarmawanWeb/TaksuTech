import { describe, expect, it } from 'vitest';
import { curricula, meetingCount } from './curriculum';
import { accessories, eduFaq, upgradePacks } from './edu-catalog';
import { educationLevels } from './education';
import { guides } from './guides';
import { comparison, robots } from './reception';
import { missionPlace, simMissions } from './sim-missions';

describe('curriculum', () => {
  it('matches the advertised meeting count per level', () => {
    for (const level of educationLevels) {
      expect(meetingCount(curricula[level.slug]), level.slug).toBe(level.meetings);
    }
  });

  it('sends meetings only to simulator missions for the same kit', () => {
    const robots = new Map(simMissions.map((mission) => [mission.id, mission.robot]));
    for (const [level, curriculum] of Object.entries(curricula)) {
      for (const module of curriculum.modules) {
        for (const meeting of module.meetings) {
          if (meeting.sim) expect(robots.get(meeting.sim), `${level}/${module.id}`).toBe(level);
        }
      }
    }
  });

  it('places every simulator mission in exactly one module', () => {
    for (const mission of simMissions) {
      const modules = curricula[mission.robot].modules.filter((module) =>
        module.meetings.some((meeting) => meeting.sim === mission.id),
      );
      expect(modules.length, mission.id).toBe(1);
      expect(missionPlace(mission)?.moduleId).toBe(modules[0]?.id);
    }
  });

  it('lists missions in the order the syllabus reaches them', () => {
    for (const robot of ['sd', 'smp'] as const) {
      const firstMeetings = simMissions
        .filter((mission) => mission.robot === robot)
        .map((mission) => missionPlace(mission)?.meetings[0] ?? 0);
      expect(firstMeetings, robot).toEqual([...firstMeetings].sort((a, b) => a - b));
    }
  });
});

describe('curriculum videos', () => {
  const videos = Object.values(curricula).flatMap((curriculum) =>
    curriculum.modules.flatMap((module) => (module.video ? [module.video] : [])),
  );

  it('uses well-formed YouTube ids', () => {
    for (const video of videos) expect(video.youtube, video.title).toMatch(/^[\w-]{11}$/);
  });

  // Needs the internet, so it only runs on request: CHECK_VIDEOS=1 pnpm --filter @taksu/content test
  it.runIf(process.env.CHECK_VIDEOS)(
    'points at videos that still exist and can be embedded',
    async () => {
      for (const video of videos) {
        const url = `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${video.youtube}`;
        const response = await fetch(url);
        expect(response.status, `${video.youtube} ${video.title}`).toBe(200);
      }
    },
    60_000,
  );
});

describe('reception catalogue', () => {
  it('compares every robot on every row', () => {
    for (const row of comparison) {
      for (const robot of robots) expect(row.values[robot.slug], row.label.en).toBeDefined();
    }
  });

  it('gives every robot a plausible standing height', () => {
    for (const robot of robots) {
      expect(robot.heightCm).toBeGreaterThan(50);
      expect(robot.heightCm).toBeLessThan(250);
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
