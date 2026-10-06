import { describe, expect, it } from 'vitest';
import { levels } from './levels';
import { runProgram } from './run';
import type { LevelId, Statement } from './types';

const level = (id: LevelId) => levels.find((entry) => entry.id === id)!;
const forward = (steps: number): Statement => ({ kind: 'move', direction: 'forward', steps });
const turn = (direction: 'left' | 'right'): Statement => ({ kind: 'turn', direction });

describe('runProgram', () => {
  it('solves the straight level with one block', () => {
    expect(runProgram({ body: [forward(4)] }, level('straight')).outcome).toBe('success');
    expect(runProgram({ body: [forward(3)] }, level('straight')).outcome).toBe('incomplete');
  });

  it('crashes into field edges', () => {
    const result = runProgram({ body: [forward(9)] }, level('straight'));
    expect(result.outcome).toBe('crash');
    expect(result.events.at(-1)).toMatchObject({ type: 'crash', at: { x: 7, y: 2 } });
  });

  it('solves the turn level', () => {
    expect(
      runProgram({ body: [forward(4), turn('left'), forward(2)] }, level('turn')).outcome,
    ).toBe('success');
  });

  it('detects the duck with the obstacle sensor', () => {
    const goAround: Statement[] = [
      turn('left'),
      forward(1),
      turn('right'),
      forward(2),
      turn('right'),
      forward(1),
      turn('left'),
    ];
    const program = {
      body: [
        {
          kind: 'repeatUntilGoal',
          body: [{ kind: 'if', condition: 'obstacleAhead', then: goAround, else: [forward(1)] }],
        },
      ] satisfies Statement[],
    };
    expect(runProgram(program, level('duck')).outcome).toBe('success');
  });

  it('follows the subak channel with line sensors', () => {
    const program = {
      body: [
        {
          kind: 'repeatUntilGoal',
          body: [
            {
              kind: 'if',
              condition: 'lineAhead',
              then: [forward(1)],
              else: [
                { kind: 'if', condition: 'lineLeft', then: [turn('left')], else: [turn('right')] },
              ],
            },
          ],
        },
      ] satisfies Statement[],
    };
    expect(runProgram(program, level('subak')).outcome).toBe('success');
  });

  it('stops endless loops', () => {
    const result = runProgram({ body: [{ kind: 'repeatUntilGoal', body: [] }] }, level('straight'));
    expect(result.outcome).toBe('timeout');
  });
});
