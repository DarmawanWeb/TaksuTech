'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Cell, LedColor, Level, Note, Outcome, RunResult, SimEvent } from '../sim/types';

export interface VisualState extends Cell {
  /** Cumulative rotation in degrees, so turns always animate the short way. */
  rotation: number;
  led: LedColor;
  speech: string | null;
  crash: Cell | null;
}

export const initialVisual = (level: Level): VisualState => ({
  x: level.start.x,
  y: level.start.y,
  rotation: level.start.heading * 90,
  led: 'off',
  speech: null,
  crash: null,
});

export function applyEvent(state: VisualState, event: SimEvent): VisualState {
  switch (event.type) {
    case 'move':
      return { ...state, x: event.to.x, y: event.to.y };
    case 'turn':
      return { ...state, rotation: state.rotation + event.delta };
    case 'led':
      return { ...state, led: event.color };
    case 'say':
      return { ...state, speech: event.text };
    case 'crash':
      return { ...state, crash: event.at };
    case 'wait':
    case 'beep':
      return state;
  }
}

const durations: Record<SimEvent['type'], number> = {
  move: 420,
  turn: 360,
  wait: 0,
  led: 260,
  beep: 320,
  say: 1300,
  crash: 700,
};

const NOTE_HZ: Record<Note, number> = {
  do: 261.63,
  re: 293.66,
  mi: 329.63,
  fa: 349.23,
  sol: 392,
  la: 440,
  si: 493.88,
};

/** Replays a recorded run on the stage, one event at a time. */
export function usePlayback(level: Level) {
  const [visual, setVisual] = useState<VisualState>(() => initialVisual(level));
  const [running, setRunning] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const beep = useCallback((note: Note) => {
    try {
      const context = audio.current ?? new AudioContext();
      audio.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = NOTE_HZ[note];
      gain.gain.setValueAtTime(0.18, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.3);
    } catch {
      // Audio is a bonus; ignore browsers that block it.
    }
  }, []);

  const stop = useCallback(() => {
    window.clearTimeout(timer.current);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setVisual(initialVisual(level));
  }, [level, stop]);

  const play = useCallback(
    (
      result: RunResult,
      hooks: { onEvent?: (event: SimEvent) => void; onDone: (outcome: Outcome) => void },
    ) => {
      window.clearTimeout(timer.current);
      setVisual(initialVisual(level));
      setRunning(true);
      let index = 0;
      const step = () => {
        const event = result.events[index];
        if (!event) {
          setRunning(false);
          hooks.onDone(result.outcome);
          return;
        }
        index += 1;
        hooks.onEvent?.(event);
        setVisual((current) => applyEvent(current, event));
        if (event.type === 'beep') beep(event.note);
        const delay = event.type === 'wait' ? Math.min(event.ms, 1500) : durations[event.type];
        timer.current = window.setTimeout(step, delay);
      };
      timer.current = window.setTimeout(step, 250);
    },
    [beep, level],
  );

  return { visual, running, play, stop, reset };
}
