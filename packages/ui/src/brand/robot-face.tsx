import type * as React from 'react';
import { cn } from '../lib/utils';

export type RobotMood = 'idle' | 'listening' | 'thinking' | 'speaking' | 'happy';
export type RobotFaceVariant = 'timo' | 'snow';

export interface RobotFaceProps extends Omit<React.ComponentProps<'svg'>, 'children'> {
  variant: RobotFaceVariant;
  mood?: RobotMood;
  /** Accessible description, e.g. "Timo is listening". */
  label: string;
}

const palettes: Record<RobotFaceVariant, { screen: string; eye: string; cheek: string }> = {
  timo: { screen: '#0b1030', eye: '#7fe0ff', cheek: 'transparent' },
  snow: { screen: '#f7f8fc', eye: '#1b2253', cheek: '#ff9fb2' },
};

/** Animated robot face shared by the website hero and the kiosk. */
export function RobotFace({ variant, mood = 'idle', label, className, ...props }: RobotFaceProps) {
  const palette = palettes[variant];
  const eyeY = mood === 'thinking' ? 50 : 58;
  const happy = mood === 'happy';

  return (
    <svg
      viewBox="0 0 200 130"
      role="img"
      aria-label={label}
      className={cn('w-full', className)}
      {...props}
    >
      <rect
        x="4"
        y="4"
        width="192"
        height="122"
        rx={variant === 'snow' ? 61 : 28}
        fill={palette.screen}
      />

      {mood === 'listening' ? (
        <circle
          className="robot-listen-ring"
          cx="100"
          cy="65"
          r="54"
          fill="none"
          stroke={palette.eye}
          strokeWidth="3"
        />
      ) : null}

      {happy ? (
        <g fill="none" stroke={palette.eye} strokeWidth="7" strokeLinecap="round">
          <path d="M52 64q18-22 36 0" />
          <path d="M112 64q18-22 36 0" />
        </g>
      ) : variant === 'snow' ? (
        <g className="robot-eye">
          <circle cx="70" cy={eyeY} r="18" fill={palette.eye} />
          <circle cx="130" cy={eyeY} r="18" fill={palette.eye} />
          <circle cx="76" cy={eyeY - 7} r="6" fill="#ffffff" />
          <circle cx="136" cy={eyeY - 7} r="6" fill="#ffffff" />
        </g>
      ) : (
        <g className="robot-eye" fill={palette.eye}>
          <rect x="52" y={eyeY - 26} width="34" height="48" rx="17" />
          <rect x="114" y={eyeY - 26} width="34" height="48" rx="17" />
        </g>
      )}

      {variant === 'snow' ? (
        <g fill={palette.cheek} opacity="0.75">
          <ellipse cx="46" cy="84" rx="12" ry="7" />
          <ellipse cx="154" cy="84" rx="12" ry="7" />
        </g>
      ) : null}

      {mood === 'thinking' ? (
        <g fill={palette.eye}>
          <circle cx="86" cy="100" r="4" opacity="0.5" />
          <circle cx="100" cy="100" r="4" opacity="0.75" />
          <circle cx="114" cy="100" r="4" />
        </g>
      ) : mood === 'speaking' ? (
        <rect
          className="robot-mouth-talking"
          x="86"
          y="92"
          width="28"
          height="14"
          rx="7"
          fill={palette.eye}
        />
      ) : (
        <path
          d={happy ? 'M82 92q18 18 36 0' : 'M88 96q12 8 24 0'}
          fill="none"
          stroke={palette.eye}
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
