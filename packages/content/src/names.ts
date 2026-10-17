/**
 * Brand names that are not final yet. Every site reads them from here, so renaming a line is a
 * one-line change. "NAMA" marks a name that is still to be decided.
 */
export const names = {
  /** The company and its profile site. */
  company: 'Taksu Tech',
  parent: 'Ezra Robotics',
  /**
   * Education line: named robots, their store, and the simulator. Sold nationwide, so not
   * Bali-themed. The same name as `brand.name` in packages/catalog, which the store reads.
   */
  edu: 'Taksu',
  /** Service-robot line: Snow, Timo, and the kiosk. Also the future PT name. */
  robot: 'NAMA Robot',
} as const;
