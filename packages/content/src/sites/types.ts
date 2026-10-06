import type { Localized } from '../i18n';
import type { RobotSlug } from '../robots';

export type RoomCategory = 'service' | 'office' | 'facility' | 'dining' | 'wellness' | 'leisure';

export interface MapNode {
  id: string;
  x: number;
  y: number;
}

export interface SiteRoom {
  id: string;
  name: Localized;
  category: RoomCategory;
  /** Rectangle in map units. */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Graph node at the room's entrance; routes end here. */
  doorNodeId: string;
}

export interface SiteMap {
  width: number;
  height: number;
  /** Real-world scale used for spoken directions. */
  metersPerUnit: number;
  /** Where the robot stands, shown as "You are here". */
  startNodeId: string;
  startLabel: Localized;
  nodes: MapNode[];
  /** Undirected walkable connections between nodes. */
  edges: ReadonlyArray<readonly [string, string]>;
  rooms: SiteRoom[];
}

export interface QueueService {
  id: string;
  /** Ticket prefix, e.g. "A" for "A-012". */
  prefix: string;
  name: Localized;
  description: Localized;
  counter: Localized;
  averageMinutes: number;
  roomId?: string;
}

export interface OrgNode {
  id: string;
  name: string;
  role: Localized;
  roomId?: string;
  children?: OrgNode[];
}

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
  /** Extra lowercase terms for the offline assistant's matcher. */
  keywords: string[];
}

export interface CultureNote {
  id: string;
  title: Localized;
  body: Localized;
}

export interface SiteFact {
  label: Localized;
  value: Localized;
}

export type SiteKind = 'public-service' | 'hospitality';

/**
 * A kiosk use-case sample. Add a new file next to this one, export it from
 * `./index.ts`, and it appears in the kiosk launcher and the company-profile demo list.
 */
export interface KioskSite {
  slug: string;
  kind: SiteKind;
  /** Proper name in Latin script; the kiosk renders the Aksara Bali line above it. */
  name: string;
  tagline: Localized;
  about: Localized;
  facts: SiteFact[];
  organization: OrgNode;
  services: QueueService[];
  map: SiteMap;
  faq: FaqItem[];
  culture: CultureNote[];
  recommendedRobot: RobotSlug;
  /** Sample data is labelled as such in the kiosk UI. */
  isSample: boolean;
}
