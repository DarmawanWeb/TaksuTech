import { robots as eduRobots, getSimMission, learnPaths } from '@taksu/catalog';
import { describe, expect, it } from 'vitest';
import { demos } from './demos';
import { comparison, robots } from './reception';
import { services } from './services';
import { getSite } from './sites';
import { workKinds, works } from './works';

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

/** The robot (and mission) a simulator link opens, checked against the catalogue. */
function expectSimLink(query: string, where: string) {
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  const robot = params.get('robot');
  const mission = params.get('mission');
  if (robot) expect(['ciko', 'momo'], where).toContain(robot);
  if (mission) expect(getSimMission(mission)?.robot, where).toBe(robot);
}

describe('demos', () => {
  it('opens each simulator demo on its own robot', () => {
    for (const demo of demos.filter((entry) => entry.app === 'sim')) {
      expect(demo.track, demo.id).toBeDefined();
      expect(demo.path, demo.id).toBe(`?robot=${demo.track}`);
      expectSimLink(demo.path, demo.id);
    }
  });
});

describe('works', () => {
  it('has unique ids and both languages filled in', () => {
    expect(new Set(works.map((work) => work.id)).size).toBe(works.length);
    for (const work of works) {
      for (const text of [work.name, work.lead, work.body, work.imageAlt]) {
        expect(text.id.trim(), work.id).not.toBe('');
        expect(text.en.trim(), work.id).not.toBe('');
      }
      expect(work.facts.length, work.id).toBeGreaterThan(0);
      expect(work.links.length, work.id).toBeGreaterThan(0);
    }
  });

  it('only points at services that exist', () => {
    const ids = new Set(services.map((service) => service.id));
    for (const work of works) {
      for (const service of work.services) expect(ids.has(service), work.id).toBe(true);
    }
  });

  it('opens real robots, store pages, missions, and kiosk venues', () => {
    const receptionSlugs = new Set<string>(robots.map((robot) => robot.slug));
    const eduSlugs = new Set<string>(eduRobots.map((robot) => robot.slug));
    const pathSlugs = new Set<string>(learnPaths.map((path) => path.robot));
    for (const work of works) {
      for (const link of work.links) {
        const where = `${work.id} ${link.site}${link.path}`;
        if (link.site === 'robot') expect(receptionSlugs.has(link.path.slice(1)), where).toBe(true);
        if (link.site === 'edu') {
          const [, page, slug] = link.path.split('/');
          if (page === 'robot' && slug) expect(eduSlugs.has(slug), where).toBe(true);
          if (page === 'belajar' && slug) expect(pathSlugs.has(slug), where).toBe(true);
        }
        if (link.site === 'sim') expectSimLink(link.path, where);
        const venue = link.path.match(/^\/[a-z]+\/([a-z-]+)\/preview$/)?.[1];
        if (link.site === 'kiosk' && venue) expect(getSite(venue), where).toBeDefined();
      }
    }
  });

  it('fills every group', () => {
    for (const kind of workKinds) expect(works.some((work) => work.kind === kind)).toBe(true);
  });
});
