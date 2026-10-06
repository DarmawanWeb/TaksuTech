import * as Blockly from 'blockly/core';

const msg = (key: string) => Blockly.Msg[key] ?? key;

const COLORS = ['red', 'green', 'blue', 'yellow', 'off'] as const;
const NOTES = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'] as const;
const CONDITIONS = [
  ['TAKSU_COND_OBSTACLE', 'obstacleAhead'],
  ['TAKSU_COND_LINE_AHEAD', 'lineAhead'],
  ['TAKSU_COND_LINE_LEFT', 'lineLeft'],
  ['TAKSU_COND_LINE_RIGHT', 'lineRight'],
  ['TAKSU_COND_GOAL', 'atGoal'],
] as const;

const statement = { previousStatement: null, nextStatement: null };
const conditionField = () => ({
  type: 'field_dropdown',
  name: 'COND',
  options: CONDITIONS.map(([label, value]) => [msg(label), value]),
});

/**
 * Block JSON is built inside `init`, so labels come from `Blockly.Msg` at creation time.
 * Re-creating the workspace after a locale change re-labels every block.
 */
const definitions: Record<string, () => object> = {
  taksu_start: () => ({ message0: msg('TAKSU_START'), nextStatement: null, style: 'event_blocks' }),
  taksu_forward: () => ({
    message0: msg('TAKSU_FORWARD'),
    args0: [{ type: 'field_number', name: 'STEPS', value: 1, min: 1, max: 9, precision: 1 }],
    ...statement,
    style: 'motion_blocks',
  }),
  taksu_backward: () => ({
    message0: msg('TAKSU_BACKWARD'),
    args0: [{ type: 'field_number', name: 'STEPS', value: 1, min: 1, max: 9, precision: 1 }],
    ...statement,
    style: 'motion_blocks',
  }),
  taksu_turn: () => ({
    message0: msg('TAKSU_TURN'),
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIR',
        options: [
          [msg('TAKSU_LEFT'), 'left'],
          [msg('TAKSU_RIGHT'), 'right'],
        ],
      },
    ],
    ...statement,
    style: 'motion_blocks',
  }),
  taksu_wait: () => ({
    message0: msg('TAKSU_WAIT'),
    args0: [{ type: 'field_number', name: 'SECONDS', value: 1, min: 1, max: 5, precision: 1 }],
    ...statement,
    style: 'motion_blocks',
  }),
  taksu_repeat: () => ({
    message0: msg('TAKSU_REPEAT'),
    args0: [{ type: 'field_number', name: 'TIMES', value: 3, min: 1, max: 20, precision: 1 }],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    ...statement,
    style: 'control_blocks',
  }),
  taksu_repeat_until_goal: () => ({
    message0: msg('TAKSU_REPEAT_UNTIL_GOAL'),
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    ...statement,
    style: 'control_blocks',
  }),
  taksu_if: () => ({
    message0: msg('TAKSU_IF'),
    args0: [conditionField()],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    ...statement,
    style: 'control_blocks',
  }),
  taksu_if_else: () => ({
    message0: msg('TAKSU_IF'),
    args0: [conditionField()],
    message1: '%1',
    args1: [{ type: 'input_statement', name: 'DO' }],
    message2: `${msg('TAKSU_ELSE')} %1`,
    args2: [{ type: 'input_statement', name: 'ELSE' }],
    ...statement,
    style: 'control_blocks',
  }),
  taksu_led: () => ({
    message0: msg('TAKSU_LED'),
    args0: [
      {
        type: 'field_dropdown',
        name: 'COLOR',
        options: COLORS.map((color) => [msg(`TAKSU_${color.toUpperCase()}`), color]),
      },
    ],
    ...statement,
    style: 'looks_blocks',
  }),
  taksu_beep: () => ({
    message0: msg('TAKSU_BEEP'),
    args0: [{ type: 'field_dropdown', name: 'NOTE', options: NOTES.map((note) => [note, note]) }],
    ...statement,
    style: 'looks_blocks',
  }),
  taksu_say: () => ({
    message0: msg('TAKSU_SAY'),
    args0: [{ type: 'field_input', name: 'TEXT', text: msg('TAKSU_SAY_DEFAULT') }],
    ...statement,
    style: 'looks_blocks',
  }),
};

export function registerBlocks(): void {
  for (const [type, json] of Object.entries(definitions)) {
    Blockly.Blocks[type] = {
      init(this: Blockly.Block) {
        this.jsonInit(json());
      },
    };
  }
}

export function buildToolbox(): Blockly.utils.toolbox.ToolboxDefinition {
  const blocks = (...types: string[]) => types.map((type) => ({ kind: 'block', type }));
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: msg('TAKSU_CAT_EVENTS'),
        categorystyle: 'event_category',
        contents: blocks('taksu_start'),
      },
      {
        kind: 'category',
        name: msg('TAKSU_CAT_MOTION'),
        categorystyle: 'motion_category',
        contents: blocks('taksu_forward', 'taksu_backward', 'taksu_turn', 'taksu_wait'),
      },
      {
        kind: 'category',
        name: msg('TAKSU_CAT_CONTROL'),
        categorystyle: 'control_category',
        contents: blocks('taksu_repeat', 'taksu_repeat_until_goal', 'taksu_if', 'taksu_if_else'),
      },
      {
        kind: 'category',
        name: msg('TAKSU_CAT_LOOKS'),
        categorystyle: 'looks_category',
        contents: blocks('taksu_led', 'taksu_beep', 'taksu_say'),
      },
    ],
  };
}

const palette = {
  event: '#b5871a',
  motion: '#3949ab',
  control: '#1d7466',
  looks: '#7c5cc4',
};

const blockStyles = {
  event_blocks: {
    colourPrimary: palette.event,
    colourSecondary: '#d6a93a',
    colourTertiary: '#8a6512',
    hat: 'cap',
  },
  motion_blocks: {
    colourPrimary: palette.motion,
    colourSecondary: '#5c6bc0',
    colourTertiary: '#283593',
  },
  control_blocks: {
    colourPrimary: palette.control,
    colourSecondary: '#2f9a88',
    colourTertiary: '#13544a',
  },
  looks_blocks: {
    colourPrimary: palette.looks,
    colourSecondary: '#9a80d8',
    colourTertiary: '#5b3fa0',
  },
};

const categoryStyles = {
  event_category: { colour: palette.event },
  motion_category: { colour: palette.motion },
  control_category: { colour: palette.control },
  looks_category: { colour: palette.looks },
};

const fontStyle = {
  family: "'Plus Jakarta Sans Variable', system-ui, sans-serif",
  weight: '700',
  size: 13,
};

export const lightTheme = Blockly.Theme.defineTheme('taksu-light', {
  name: 'taksu-light',
  base: Blockly.Themes.Classic,
  blockStyles,
  categoryStyles,
  fontStyle,
  startHats: true,
  componentStyles: {
    workspaceBackgroundColour: '#f6f7f3',
    toolboxBackgroundColour: '#ffffff',
    toolboxForegroundColour: '#14183a',
    flyoutBackgroundColour: '#e2e6df',
    flyoutForegroundColour: '#14183a',
    flyoutOpacity: 1,
    scrollbarColour: '#cdd2c8',
    insertionMarkerColour: '#26338a',
    insertionMarkerOpacity: 0.3,
    cursorColour: '#26338a',
  },
});

export const darkTheme = Blockly.Theme.defineTheme('taksu-dark', {
  name: 'taksu-dark',
  base: Blockly.Themes.Classic,
  blockStyles,
  categoryStyles,
  fontStyle,
  startHats: true,
  componentStyles: {
    workspaceBackgroundColour: '#0e1335',
    toolboxBackgroundColour: '#161c4a',
    toolboxForegroundColour: '#eceef8',
    flyoutBackgroundColour: '#1d2458',
    flyoutForegroundColour: '#eceef8',
    flyoutOpacity: 1,
    scrollbarColour: '#2a3275',
    insertionMarkerColour: '#e6bd52',
    insertionMarkerOpacity: 0.4,
    cursorColour: '#e6bd52',
  },
});
