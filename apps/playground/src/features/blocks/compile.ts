import type * as Blockly from 'blockly/core';
import type { Condition, LedColor, Note, Program, Statement } from '../sim/types';

export type CompileResult = { ok: true; program: Program } | { ok: false; error: 'noStart' };

const clampInt = (value: unknown, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(Number(value) || min)));

function compileBlock(block: Blockly.Block): Statement | null {
  const blockId = block.id;
  switch (block.type) {
    case 'taksu_forward':
    case 'taksu_backward':
      return {
        kind: 'move',
        direction: block.type === 'taksu_forward' ? 'forward' : 'backward',
        steps: clampInt(block.getFieldValue('STEPS'), 1, 9),
        blockId,
      };
    case 'taksu_turn':
      return {
        kind: 'turn',
        direction: block.getFieldValue('DIR') === 'right' ? 'right' : 'left',
        blockId,
      };
    case 'taksu_wait':
      return { kind: 'wait', seconds: clampInt(block.getFieldValue('SECONDS'), 1, 5), blockId };
    case 'taksu_repeat':
      return {
        kind: 'repeat',
        times: clampInt(block.getFieldValue('TIMES'), 1, 20),
        body: compileChain(block.getInputTargetBlock('DO')),
        blockId,
      };
    case 'taksu_repeat_until_goal':
      return {
        kind: 'repeatUntilGoal',
        body: compileChain(block.getInputTargetBlock('DO')),
        blockId,
      };
    case 'taksu_if':
    case 'taksu_if_else':
      return {
        kind: 'if',
        condition: block.getFieldValue('COND') as Condition,
        then: compileChain(block.getInputTargetBlock('DO')),
        else: block.type === 'taksu_if_else' ? compileChain(block.getInputTargetBlock('ELSE')) : [],
        blockId,
      };
    case 'taksu_led':
      return { kind: 'led', color: block.getFieldValue('COLOR') as LedColor, blockId };
    case 'taksu_beep':
      return { kind: 'beep', note: block.getFieldValue('NOTE') as Note, blockId };
    case 'taksu_say':
      return { kind: 'say', text: String(block.getFieldValue('TEXT') ?? '').slice(0, 60), blockId };
    default:
      return null;
  }
}

function compileChain(first: Blockly.Block | null): Statement[] {
  const statements: Statement[] = [];
  for (let block = first; block; block = block.getNextBlock()) {
    if (!block.isEnabled()) continue;
    const statement = compileBlock(block);
    if (statement) statements.push(statement);
  }
  return statements;
}

/** Turns the blocks under the first "when started" hat into the simulator's AST. */
export function compileWorkspace(workspace: Blockly.Workspace): CompileResult {
  const start = workspace
    .getTopBlocks(true)
    .find((block) => block.type === 'taksu_start' && block.isEnabled());
  if (!start) return { ok: false, error: 'noStart' };
  return { ok: true, program: { body: compileChain(start.getNextBlock()) } };
}
