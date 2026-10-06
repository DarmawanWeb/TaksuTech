import type { Cell, Level } from './types';

const cells = (...pairs: Array<[number, number]>): Cell[] => pairs.map(([x, y]) => ({ x, y }));

const starter = (...steps: Array<{ type: string; fields?: Record<string, unknown> }>) => {
  const chain = steps.reduceRight<object | undefined>(
    (next, step) => ({
      type: step.type,
      fields: step.fields,
      ...(next ? { next: { block: next } } : {}),
    }),
    undefined,
  );
  return {
    blocks: {
      languageVersion: 0,
      blocks: [{ type: 'taksu_start', x: 32, y: 32, ...(chain ? { next: { block: chain } } : {}) }],
    },
  };
};

/** Levels in teaching order: sequence, turning, obstacles, then sensors and loops. */
export const levels: readonly Level[] = [
  {
    id: 'straight',
    cols: 7,
    rows: 5,
    start: { x: 1, y: 2, heading: 1 },
    goal: { x: 5, y: 2 },
    obstacles: [],
    line: [],
    starter: starter({ type: 'taksu_forward', fields: { STEPS: 1 } }),
  },
  {
    id: 'turn',
    cols: 7,
    rows: 5,
    start: { x: 1, y: 3, heading: 1 },
    goal: { x: 5, y: 1 },
    obstacles: cells([1, 1], [3, 1]),
    line: [],
    starter: starter({ type: 'taksu_forward', fields: { STEPS: 4 } }),
  },
  {
    id: 'duck',
    cols: 7,
    rows: 5,
    start: { x: 0, y: 2, heading: 1 },
    goal: { x: 6, y: 2 },
    obstacles: cells([3, 2]),
    line: [],
    starter: starter({ type: 'taksu_forward', fields: { STEPS: 2 } }),
  },
  {
    id: 'subak',
    cols: 8,
    rows: 5,
    start: { x: 0, y: 4, heading: 1 },
    goal: { x: 7, y: 0 },
    obstacles: cells([3, 3], [6, 3], [4, 0]),
    line: cells(
      [0, 4],
      [1, 4],
      [2, 4],
      [2, 3],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [5, 1],
      [5, 0],
      [6, 0],
      [7, 0],
    ),
    starter: starter(),
  },
];
