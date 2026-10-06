'use client';

import { useId } from 'react';
import type { Cell, LedColor, Level } from '../sim/types';
import type { VisualState } from './playback';

const CELL = 64;
const ledFill: Record<LedColor, string> = {
  red: '#e5484d',
  green: '#30a46c',
  blue: '#3e63dd',
  yellow: '#ffc53d',
  off: '#9aa0b8',
};

const center = (cell: Cell) => ({ x: cell.x * CELL + CELL / 2, y: cell.y * CELL + CELL / 2 });

function Duck({ cell }: { cell: Cell }) {
  const { x, y } = center(cell);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="2" cy="8" rx="17" ry="11" fill="#ffffff" stroke="#14183a" strokeWidth="2.5" />
      <circle cx="-10" cy="-8" r="9" fill="#ffffff" stroke="#14183a" strokeWidth="2.5" />
      <path
        d="M-19 -8l-8 3 8 3z"
        fill="#f2a33a"
        stroke="#14183a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="-12" cy="-10" r="1.8" fill="#14183a" />
    </g>
  );
}

/** Jineng: the raised rice barn of Balinese compounds. */
function Jineng({ cell }: { cell: Cell }) {
  const { x, y } = center(cell);
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-14" y="2" width="5" height="20" fill="#6b4423" />
      <rect x="9" y="2" width="5" height="20" fill="#6b4423" />
      <rect x="-17" y="-2" width="34" height="8" rx="2" fill="#8b5a2b" />
      <path d="M-24 -2C-16 -22 16 -22 24 -2z" fill="#c08a3e" stroke="#6b4423" strokeWidth="2" />
      <path d="M0 -24v-6" stroke="#6b4423" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

export function Stage({
  level,
  visual,
  label,
}: {
  level: Level;
  visual: VisualState;
  label: string;
}) {
  const patternId = useId();
  const width = level.cols * CELL;
  const height = level.rows * CELL;
  const robot = center(visual);
  const bubbleX = Math.min(Math.max(robot.x, 90), width - 90);
  const bubbleY = robot.y > 70 ? robot.y - 58 : robot.y + 40;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={label}
      className="h-auto w-full shrink-0 rounded-xl"
    >
      <defs>
        <pattern id={patternId} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#cfe5b4" />
          <path d="M0 4h16M0 12h16" stroke="#b6d595" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
      {Array.from({ length: level.cols - 1 }, (_, index) => (
        <line
          key={`v${index}`}
          x1={(index + 1) * CELL}
          y1="0"
          x2={(index + 1) * CELL}
          y2={height}
          stroke="#9fc27c"
          strokeWidth="2"
        />
      ))}
      {Array.from({ length: level.rows - 1 }, (_, index) => (
        <line
          key={`h${index}`}
          x1="0"
          y1={(index + 1) * CELL}
          x2={width}
          y2={(index + 1) * CELL}
          stroke="#9fc27c"
          strokeWidth="2"
        />
      ))}

      {level.line.length > 1 ? (
        <polyline
          points={level.line.map((cell) => `${center(cell).x},${center(cell).y}`).join(' ')}
          fill="none"
          stroke="#4b9fd1"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      <Jineng cell={level.goal} />
      {level.obstacles.map((cell) => (
        <Duck key={`${cell.x},${cell.y}`} cell={cell} />
      ))}

      {visual.crash ? (
        <g transform={`translate(${center(visual.crash).x} ${center(visual.crash).y})`}>
          <path
            d="M0-22l6 12 14-4-8 12 10 10-14-2-8 14-2-14-14 2 10-10-8-12 14 4z"
            fill="#e5484d"
            opacity="0.85"
          />
        </g>
      ) : null}

      <g
        style={{
          transform: `translate(${robot.x}px, ${robot.y}px)`,
          transition: 'transform 380ms ease',
        }}
      >
        <g
          style={{ transform: `rotate(${visual.rotation}deg)`, transition: 'transform 320ms ease' }}
        >
          <rect x="-24" y="-16" width="8" height="32" rx="3" fill="#14183a" />
          <rect x="16" y="-16" width="8" height="32" rx="3" fill="#14183a" />
          <rect
            x="-18"
            y="-20"
            width="36"
            height="40"
            rx="12"
            fill="#ffffff"
            stroke="#14183a"
            strokeWidth="3"
          />
          <circle cx="-7" cy="-11" r="4" fill="#14183a" />
          <circle cx="7" cy="-11" r="4" fill="#14183a" />
          <circle cx="0" cy="6" r="7" fill={ledFill[visual.led]} stroke="#14183a" strokeWidth="2" />
        </g>
      </g>

      {visual.speech ? (
        <g transform={`translate(${bubbleX} ${bubbleY})`}>
          <rect
            x="-86"
            y="-18"
            width="172"
            height="36"
            rx="12"
            fill="#ffffff"
            stroke="#14183a"
            strokeWidth="2"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="700"
            fill="#14183a"
          >
            {visual.speech.length > 22 ? `${visual.speech.slice(0, 21)}…` : visual.speech}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
