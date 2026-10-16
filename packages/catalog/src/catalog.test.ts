import { describe, expect, it } from 'vitest';
import { brand } from './brand';
import {
  bulkBuyers,
  bulkIncludes,
  businessFaq,
  oemLevels,
  oemProcess,
  oemSoftware,
} from './business';
import { drops, nextReleaseNumber } from './drops';
import { faq } from './faq';
import { getGuide, guides } from './guides';
import { learnPaths, missionStep, stepTitle } from './learn';
import { robots } from './robots';
import { formatRupiah, products } from './shop';
import { simMissions } from './sim-missions';

describe('release numbers', () => {
  it('are unique across robots and drops, and drops come after the robots', () => {
    const numbers = [...robots.map((robot) => robot.number), ...drops.map((drop) => drop.number)];
    expect(new Set(numbers).size).toBe(numbers.length);
    const lastRobot = Math.max(...robots.map((robot) => robot.number));
    for (const drop of drops) expect(drop.number).toBeGreaterThan(lastRobot);
    expect(nextReleaseNumber()).toBe(Math.max(...numbers) + 1);
  });
});

describe('catalogue', () => {
  it('uses unique slugs', () => {
    const slugs = [
      ...robots.map((robot) => robot.slug),
      ...products.map((product) => product.slug),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only fits products to robots that exist', () => {
    const known = new Set(robots.map((robot) => robot.slug));
    for (const product of products) {
      expect(product.fits.length, product.slug).toBeGreaterThan(0);
      for (const fit of product.fits) expect(known.has(fit), `${product.slug}/${fit}`).toBe(true);
    }
  });

  it('prices orderable robots, and only estimates the ones still coming', () => {
    for (const robot of robots) {
      if (robot.availability === 'soon') continue;
      expect(robot.price, robot.slug).toBeGreaterThan(0);
    }
  });

  it('formats rupiah the Indonesian way', () => {
    expect(formatRupiah(1_750_000, 'id')).toBe('Rp1.750.000');
    expect(formatRupiah(1_750_000, 'en')).toBe('IDR 1,750,000');
  });
});

describe('learning paths', () => {
  it('cover every robot once', () => {
    expect(learnPaths.map((path) => path.robot).sort()).toEqual(
      robots.map((robot) => robot.slug).sort(),
    );
  });

  it('point every step at a mission or a guide that exists', () => {
    const missions = new Set(simMissions.map((mission) => mission.id));
    for (const path of learnPaths) {
      for (const step of path.steps) {
        expect(Boolean(step.mission) || Boolean(step.guide), step.id).toBe(true);
        if (step.mission) expect(missions.has(step.mission), step.mission).toBe(true);
        if (step.guide) expect(getGuide(step.guide), step.guide).toBeDefined();
        expect(stepTitle(step).id.length).toBeGreaterThan(0);
      }
    }
  });

  it('place every simulator mission on its own robot’s path, in catalogue order', () => {
    for (const robot of ['ciko', 'momo'] as const) {
      const listed = simMissions.filter((mission) => mission.robot === robot).map((m) => m.id);
      const onPath = learnPaths
        .find((path) => path.robot === robot)
        ?.steps.flatMap((step) => (step.mission ? [step.mission] : []));
      expect(onPath, robot).toEqual(listed);
      for (const id of listed) expect(missionStep(id)?.robot).toBe(robot);
    }
  });

  it('uses well-formed YouTube ids', () => {
    for (const path of learnPaths) {
      for (const step of path.steps) {
        if (step.video) expect(step.video.youtube, step.id).toMatch(/^[\w-]{11}$/);
      }
    }
  });
});

describe('copy', () => {
  /** Walks any value and returns every { id, en } pair inside it. */
  function localized(value: unknown, found: { id: string; en: string }[] = []) {
    if (Array.isArray(value)) for (const item of value) localized(item, found);
    else if (value && typeof value === 'object') {
      const record = value as Record<string, unknown>;
      if (
        typeof record.id === 'string' &&
        typeof record.en === 'string' &&
        Object.keys(record).length === 2
      )
        found.push(record as { id: string; en: string });
      else for (const item of Object.values(record)) localized(item, found);
    }
    return found;
  }

  it('fills in both languages everywhere', () => {
    const everything = [
      brand,
      robots,
      products,
      drops,
      guides,
      learnPaths,
      simMissions,
      faq,
      bulkBuyers,
      bulkIncludes,
      oemLevels,
      oemSoftware,
      oemProcess,
      businessFaq,
    ];
    const pairs = localized(everything);
    expect(pairs.length).toBeGreaterThan(200);
    for (const pair of pairs) {
      expect(pair.id.trim().length, pair.en).toBeGreaterThan(0);
      expect(pair.en.trim().length, pair.id).toBeGreaterThan(0);
    }
  });

  it('never mentions the old kit names or the working name', () => {
    const text = JSON.stringify([robots, products, guides, learnPaths, simMissions, faq]);
    expect(text).not.toMatch(/SD v1|SMP v1|SMA v1|ULIK/);
  });
});
