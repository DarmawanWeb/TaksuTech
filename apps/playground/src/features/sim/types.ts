/** 0 = north (up), 1 = east, 2 = south, 3 = west. */
export type Heading = 0 | 1 | 2 | 3;
export type Condition = 'obstacleAhead' | 'lineAhead' | 'lineLeft' | 'lineRight' | 'atGoal';
export type LedColor = 'red' | 'green' | 'blue' | 'yellow' | 'off';
export type Note = 'do' | 're' | 'mi' | 'fa' | 'sol' | 'la' | 'si';

interface Traced {
  /** Source Blockly block, used to highlight it while the program runs. */
  blockId?: string;
}

export type Statement = Traced &
  (
    | { kind: 'move'; direction: 'forward' | 'backward'; steps: number }
    | { kind: 'turn'; direction: 'left' | 'right' }
    | { kind: 'wait'; seconds: number }
    | { kind: 'repeat'; times: number; body: Statement[] }
    | { kind: 'repeatUntilGoal'; body: Statement[] }
    | { kind: 'if'; condition: Condition; then: Statement[]; else: Statement[] }
    | { kind: 'led'; color: LedColor }
    | { kind: 'beep'; note: Note }
    | { kind: 'say'; text: string }
  );

export interface Program {
  body: Statement[];
}

export interface Cell {
  x: number;
  y: number;
}

export interface RobotState extends Cell {
  heading: Heading;
  led: LedColor;
}

export type LevelId = 'straight' | 'turn' | 'duck' | 'subak';

export interface Level {
  id: LevelId;
  cols: number;
  rows: number;
  start: Cell & { heading: Heading };
  goal: Cell;
  /** Ducks: the robot crashes if it moves into one. */
  obstacles: Cell[];
  /** Subak water channel the line sensors can see. */
  line: Cell[];
  /** Blockly serialization state loaded the first time a level opens. */
  starter: object;
}

export type SimEvent = Traced &
  (
    | { type: 'move'; to: Cell }
    | { type: 'turn'; heading: Heading; delta: 90 | -90 }
    | { type: 'wait'; ms: number }
    | { type: 'led'; color: LedColor }
    | { type: 'beep'; note: Note }
    | { type: 'say'; text: string }
    | { type: 'crash'; at: Cell }
  );

export type Outcome = 'success' | 'crash' | 'incomplete' | 'timeout';

export interface RunResult {
  events: SimEvent[];
  outcome: Outcome;
  final: RobotState;
}
