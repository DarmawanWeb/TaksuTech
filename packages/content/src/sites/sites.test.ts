import { describe, expect, it } from 'vitest';
import { robots } from '../reception';
import { flattenOrganization, kioskSites } from './index';

describe.each(kioskSites.map((site) => [site.slug, site] as const))(
  'kiosk site %s',
  (_slug, site) => {
    const nodeIds = new Set(site.map.nodes.map((node) => node.id));
    const roomIds = new Set(site.map.rooms.map((room) => room.id));

    it('has unique node and room ids', () => {
      expect(nodeIds.size).toBe(site.map.nodes.length);
      expect(roomIds.size).toBe(site.map.rooms.length);
    });

    it('only connects nodes that exist', () => {
      for (const [from, to] of site.map.edges) {
        expect(nodeIds.has(from), `missing node ${from}`).toBe(true);
        expect(nodeIds.has(to), `missing node ${to}`).toBe(true);
      }
    });

    it('reaches every room door from the robot start', () => {
      const adjacency = new Map<string, string[]>();
      for (const [from, to] of site.map.edges) {
        adjacency.set(from, [...(adjacency.get(from) ?? []), to]);
        adjacency.set(to, [...(adjacency.get(to) ?? []), from]);
      }
      const visited = new Set([site.map.startNodeId]);
      const queue = [site.map.startNodeId];
      while (queue.length > 0) {
        const current = queue.shift() as string;
        for (const next of adjacency.get(current) ?? []) {
          if (!visited.has(next)) {
            visited.add(next);
            queue.push(next);
          }
        }
      }
      for (const room of site.map.rooms) {
        expect(visited.has(room.doorNodeId), `unreachable room ${room.id}`).toBe(true);
      }
    });

    it('keeps rooms inside the map', () => {
      for (const room of site.map.rooms) {
        expect(room.x + room.width).toBeLessThanOrEqual(site.map.width);
        expect(room.y + room.height).toBeLessThanOrEqual(site.map.height);
      }
    });

    it('links organisation members and services to real rooms', () => {
      for (const member of flattenOrganization(site.organization)) {
        if (member.roomId) expect(roomIds.has(member.roomId), member.id).toBe(true);
      }
      for (const service of site.services) {
        if (service.roomId) expect(roomIds.has(service.roomId), service.id).toBe(true);
      }
    });

    it('uses unique queue prefixes', () => {
      const prefixes = site.services.map((service) => service.prefix);
      expect(new Set(prefixes).size).toBe(prefixes.length);
    });

    it('recommends a robot that exists', () => {
      expect(robots.some((robot) => robot.slug === site.recommendedRobot)).toBe(true);
    });
  },
);
