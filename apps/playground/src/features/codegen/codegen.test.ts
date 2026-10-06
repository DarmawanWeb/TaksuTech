import { describe, expect, it } from 'vitest';
import type { Program } from '../sim/types';
import { toCpp, toPython } from './codegen';

const program: Program = {
  body: [
    { kind: 'led', color: 'green' },
    {
      kind: 'repeat',
      times: 2,
      body: [
        { kind: 'move', direction: 'forward', steps: 1 },
        {
          kind: 'if',
          condition: 'obstacleAhead',
          then: [{ kind: 'turn', direction: 'left' }],
          else: [],
        },
      ],
    },
    { kind: 'say', text: 'Om "Swastiastu"' },
  ],
};

describe('codegen', () => {
  it('generates Arduino C++', () => {
    expect(toCpp(program)).toBe(
      [
        '#include <TaksuRobot.h>',
        '',
        'TaksuRobot robot;',
        '',
        'void setup() {',
        '  robot.begin();',
        '  robot.led(Color::Green);',
        '  for (int i = 0; i < 2; i++) {',
        '    robot.forward(1);',
        '    if (robot.obstacleAhead()) {',
        '      robot.turnLeft();',
        '    }',
        '  }',
        '  robot.say("Om \\"Swastiastu\\"");',
        '}',
        '',
        'void loop() {}',
      ].join('\n'),
    );
  });

  it('generates MicroPython with pass for empty bodies', () => {
    const python = toPython({ body: [{ kind: 'repeatUntilGoal', body: [] }] });
    expect(python).toContain('while not robot.at_goal():\n    pass');
    expect(toPython(program)).toContain(
      'for _ in range(2):\n    robot.forward(1)\n    if robot.obstacle_ahead():\n        robot.turn_left()',
    );
  });
});
