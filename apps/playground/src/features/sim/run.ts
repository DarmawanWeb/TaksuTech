import type {
  Cell,
  Condition,
  Heading,
  Level,
  Outcome,
  Program,
  RobotState,
  RunResult,
  SimEvent,
  Statement,
} from './types';

const DELTAS: Record<Heading, Cell> = {
  0: { x: 0, y: -1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 },
};

const key = (cell: Cell) => `${cell.x},${cell.y}`;
const rotate = (heading: Heading, quarterTurns: number) =>
  ((((heading + quarterTurns) % 4) + 4) % 4) as Heading;
const neighbour = (cell: Cell, heading: Heading): Cell => ({
  x: cell.x + DELTAS[heading].x,
  y: cell.y + DELTAS[heading].y,
});

class Stop extends Error {
  constructor(readonly outcome: Extract<Outcome, 'crash' | 'timeout'>) {
    super(outcome);
  }
}

/**
 * Runs a program against a level and records every visible event up front, so the UI can
 * replay it at any speed. `maxSteps` bounds infinite loops from kids' programs.
 */
export function runProgram(program: Program, level: Level, maxSteps = 400): RunResult {
  const state: RobotState = { ...level.start, led: 'off' };
  const events: SimEvent[] = [];
  const obstacles = new Set(level.obstacles.map(key));
  const line = new Set(level.line.map(key));
  let steps = 0;

  const tick = () => {
    steps += 1;
    if (steps > maxSteps) throw new Stop('timeout');
  };
  const blocked = (cell: Cell) =>
    cell.x < 0 ||
    cell.y < 0 ||
    cell.x >= level.cols ||
    cell.y >= level.rows ||
    obstacles.has(key(cell));
  const atGoal = () => state.x === level.goal.x && state.y === level.goal.y;

  const check = (condition: Condition): boolean => {
    switch (condition) {
      case 'obstacleAhead':
        return blocked(neighbour(state, state.heading));
      case 'lineAhead':
        return line.has(key(neighbour(state, state.heading)));
      case 'lineLeft':
        return line.has(key(neighbour(state, rotate(state.heading, -1))));
      case 'lineRight':
        return line.has(key(neighbour(state, rotate(state.heading, 1))));
      case 'atGoal':
        return atGoal();
    }
  };

  const execute = (statements: readonly Statement[]) => {
    for (const statement of statements) executeOne(statement);
  };

  const executeOne = (statement: Statement) => {
    const { blockId } = statement;
    switch (statement.kind) {
      case 'move': {
        const heading =
          statement.direction === 'forward' ? state.heading : rotate(state.heading, 2);
        for (let index = 0; index < statement.steps; index += 1) {
          tick();
          const next = neighbour(state, heading);
          if (blocked(next)) {
            events.push({ type: 'crash', at: next, blockId });
            throw new Stop('crash');
          }
          state.x = next.x;
          state.y = next.y;
          events.push({ type: 'move', to: { ...next }, blockId });
        }
        return;
      }
      case 'turn': {
        tick();
        const delta = statement.direction === 'right' ? 90 : -90;
        state.heading = rotate(state.heading, delta / 90);
        events.push({ type: 'turn', heading: state.heading, delta, blockId });
        return;
      }
      case 'wait':
        tick();
        events.push({ type: 'wait', ms: statement.seconds * 1000, blockId });
        return;
      case 'repeat':
        for (let index = 0; index < statement.times; index += 1) {
          tick();
          execute(statement.body);
        }
        return;
      case 'repeatUntilGoal':
        while (!atGoal()) {
          tick();
          execute(statement.body);
        }
        return;
      case 'if':
        tick();
        execute(check(statement.condition) ? statement.then : statement.else);
        return;
      case 'led':
        tick();
        state.led = statement.color;
        events.push({ type: 'led', color: statement.color, blockId });
        return;
      case 'beep':
        tick();
        events.push({ type: 'beep', note: statement.note, blockId });
        return;
      case 'say':
        tick();
        events.push({ type: 'say', text: statement.text, blockId });
        return;
    }
  };

  try {
    execute(program.body);
  } catch (error) {
    if (error instanceof Stop) return { events, outcome: error.outcome, final: state };
    throw error;
  }
  return { events, outcome: atGoal() ? 'success' : 'incomplete', final: state };
}
