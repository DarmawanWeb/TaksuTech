import type { Condition, LedColor, Program, Statement } from '../sim/types';

const LOOP_VARS = ['i', 'j', 'k', 'm', 'n'];
const pad = (depth: number, unit: string) => unit.repeat(depth);
const quote = (text: string) => JSON.stringify(text);

const cppCondition: Record<Condition, string> = {
  obstacleAhead: 'robot.obstacleAhead()',
  lineAhead: 'robot.lineAhead()',
  lineLeft: 'robot.lineLeft()',
  lineRight: 'robot.lineRight()',
  atGoal: 'robot.atGoal()',
};

const pyCondition: Record<Condition, string> = {
  obstacleAhead: 'robot.obstacle_ahead()',
  lineAhead: 'robot.line_ahead()',
  lineLeft: 'robot.line_left()',
  lineRight: 'robot.line_right()',
  atGoal: 'robot.at_goal()',
};

const cppColor = (color: LedColor) => `Color::${color.charAt(0).toUpperCase()}${color.slice(1)}`;

function cppLines(statements: readonly Statement[], depth: number): string[] {
  const indent = pad(depth, '  ');
  if (statements.length === 0) return [`${indent}// (kosong)`];
  return statements.flatMap((statement): string[] => {
    switch (statement.kind) {
      case 'move':
        return [`${indent}robot.${statement.direction}(${statement.steps});`];
      case 'turn':
        return [`${indent}robot.${statement.direction === 'left' ? 'turnLeft' : 'turnRight'}();`];
      case 'wait':
        return [`${indent}robot.wait(${statement.seconds * 1000});`];
      case 'led':
        return [
          statement.color === 'off'
            ? `${indent}robot.ledOff();`
            : `${indent}robot.led(${cppColor(statement.color)});`,
        ];
      case 'beep':
        return [`${indent}robot.beep(Note::${statement.note.toUpperCase()});`];
      case 'say':
        return [`${indent}robot.say(${quote(statement.text)});`];
      case 'repeat': {
        const variable = LOOP_VARS[Math.min(depth - 1, LOOP_VARS.length - 1)] ?? 'i';
        return [
          `${indent}for (int ${variable} = 0; ${variable} < ${statement.times}; ${variable}++) {`,
          ...cppLines(statement.body, depth + 1),
          `${indent}}`,
        ];
      }
      case 'repeatUntilGoal':
        return [
          `${indent}while (!robot.atGoal()) {`,
          ...cppLines(statement.body, depth + 1),
          `${indent}}`,
        ];
      case 'if':
        return [
          `${indent}if (${cppCondition[statement.condition]}) {`,
          ...cppLines(statement.then, depth + 1),
          ...(statement.else.length > 0
            ? [`${indent}} else {`, ...cppLines(statement.else, depth + 1)]
            : []),
          `${indent}}`,
        ];
    }
  });
}

function pyLines(statements: readonly Statement[], depth: number): string[] {
  const indent = pad(depth, '    ');
  if (statements.length === 0) return [`${indent}pass`];
  return statements.flatMap((statement): string[] => {
    switch (statement.kind) {
      case 'move':
        return [`${indent}robot.${statement.direction}(${statement.steps})`];
      case 'turn':
        return [`${indent}robot.turn_${statement.direction}()`];
      case 'wait':
        return [`${indent}robot.wait(${statement.seconds})`];
      case 'led':
        return [
          statement.color === 'off'
            ? `${indent}robot.led_off()`
            : `${indent}robot.led(Color.${statement.color.toUpperCase()})`,
        ];
      case 'beep':
        return [`${indent}robot.beep(Note.${statement.note.toUpperCase()})`];
      case 'say':
        return [`${indent}robot.say(${quote(statement.text)})`];
      case 'repeat':
        return [
          `${indent}for _ in range(${statement.times}):`,
          ...pyLines(statement.body, depth + 1),
        ];
      case 'repeatUntilGoal':
        return [`${indent}while not robot.at_goal():`, ...pyLines(statement.body, depth + 1)];
      case 'if':
        return [
          `${indent}if ${pyCondition[statement.condition]}:`,
          ...pyLines(statement.then, depth + 1),
          ...(statement.else.length > 0
            ? [`${indent}else:`, ...pyLines(statement.else, depth + 1)]
            : []),
        ];
    }
  });
}

/** Arduino-style C++ for the ESP32 robot (TaksuRobot library API). */
export function toCpp(program: Program): string {
  return [
    '#include <TaksuRobot.h>',
    '',
    'TaksuRobot robot;',
    '',
    'void setup() {',
    '  robot.begin();',
    ...cppLines(program.body, 1),
    '}',
    '',
    'void loop() {}',
  ].join('\n');
}

/** MicroPython for the same robot (taksu module API). */
export function toPython(program: Program): string {
  return [
    'from taksu import Color, Note, Robot',
    '',
    'robot = Robot()',
    '',
    ...pyLines(program.body, 0),
  ].join('\n');
}
