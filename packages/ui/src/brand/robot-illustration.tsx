import type * as React from 'react';
import { cn } from '../lib/utils';

export type RobotIllustrationKind = 'timo' | 'snow' | 'kiosk' | 'ciko' | 'momo' | 'garu';

export interface RobotIllustrationProps extends Omit<React.ComponentProps<'svg'>, 'children'> {
  kind: RobotIllustrationKind;
  /** Accessible name. Omit only when the illustration is purely decorative. */
  label?: string;
}

const line = { stroke: 'var(--illus-line)', strokeWidth: 3, strokeLinejoin: 'round' as const };
const body = { fill: 'var(--illus-body)', ...line };

/**
 * Original flat illustrations used until product photography is supplied.
 * Replace with official photos via the content package when available.
 */
export function RobotIllustration({ kind, label, className, ...props }: RobotIllustrationProps) {
  const viewBox =
    kind === 'timo' || kind === 'snow' || kind === 'kiosk' ? '0 0 240 300' : '0 0 240 200';
  const art = (
    <>
      {kind === 'timo' ? <Timo /> : null}
      {kind === 'snow' ? <Snow /> : null}
      {kind === 'kiosk' ? <Kiosk /> : null}
      {kind === 'ciko' ? <Ciko /> : null}
      {kind === 'momo' ? <Momo /> : null}
      {kind === 'garu' ? <Garu /> : null}
    </>
  );
  return label ? (
    <svg viewBox={viewBox} role="img" className={cn('h-auto w-full', className)} {...props}>
      <title>{label}</title>
      {art}
    </svg>
  ) : (
    <svg viewBox={viewBox} aria-hidden="true" className={cn('h-auto w-full', className)} {...props}>
      {art}
    </svg>
  );
}

function Shadow({ cy, rx }: { cy: number; rx: number }) {
  return <ellipse cx="120" cy={cy} rx={rx} ry="8" fill="var(--illus-line)" opacity="0.12" />;
}

function Timo() {
  return (
    <g>
      <Shadow cy={288} rx={72} />
      <path d="M72 282h96l-10-50H82z" {...body} />
      <rect x="58" y="128" width="16" height="72" rx="8" {...body} />
      <rect x="166" y="128" width="16" height="72" rx="8" {...body} />
      <rect x="78" y="118" width="84" height="122" rx="30" {...body} />
      <rect x="78" y="214" width="84" height="6" fill="var(--accent)" />
      <rect x="93" y="146" width="54" height="40" rx="6" fill="var(--primary)" {...line} />
      <rect x="111" y="102" width="18" height="20" {...body} />
      <rect x="68" y="28" width="104" height="80" rx="34" {...body} />
      <rect x="81" y="42" width="78" height="52" rx="22" fill="#0b1030" />
      <rect x="96" y="55" width="14" height="24" rx="7" fill="#7fe0ff" />
      <rect x="130" y="55" width="14" height="24" rx="7" fill="#7fe0ff" />
    </g>
  );
}

function Snow() {
  return (
    <g>
      <Shadow cy={290} rx={70} />
      <ellipse cx="120" cy="270" rx="62" ry="16" {...body} />
      <ellipse cx="50" cy="196" rx="13" ry="28" transform="rotate(18 50 196)" {...body} />
      <ellipse cx="190" cy="196" rx="13" ry="28" transform="rotate(-18 190 196)" {...body} />
      <ellipse cx="120" cy="204" rx="70" ry="66" {...body} />
      <rect x="88" y="186" width="64" height="44" rx="8" fill="var(--primary)" {...line} />
      <circle cx="120" cy="92" r="62" {...body} />
      <circle cx="120" cy="28" r="7" fill="var(--accent)" {...line} />
      <circle cx="98" cy="94" r="12" fill="#1b2253" />
      <circle cx="142" cy="94" r="12" fill="#1b2253" />
      <circle cx="102" cy="90" r="4" fill="#ffffff" />
      <circle cx="146" cy="90" r="4" fill="#ffffff" />
      <ellipse cx="82" cy="114" rx="9" ry="5" fill="#ff9fb2" opacity="0.8" />
      <ellipse cx="158" cy="114" rx="9" ry="5" fill="#ff9fb2" opacity="0.8" />
      <path
        d="M110 116q10 8 20 0"
        fill="none"
        stroke="#1b2253"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Wheel({ cx, cy, r, hub }: { cx: number; cy: number; r: number; hub: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="var(--illus-line)" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill={hub} />
      <circle cx={cx} cy={cy} r={r * 0.18} fill="var(--illus-line)" />
    </g>
  );
}

/**
 * Ciko from the front: the red shell and white racing stripe, the visor face with its cyan eyes,
 * the distance sensor in the bumper, and a turn signal at each corner.
 */
function Ciko() {
  return (
    <g>
      <Shadow cy={190} rx={88} />
      <Wheel cx={60} cy={160} r={26} hub="#f4f5f7" />
      <Wheel cx={180} cy={160} r={26} hub="#f4f5f7" />
      <rect x="44" y="44" width="152" height="118" rx="34" fill="#e3262d" />
      <rect x="106" y="44" width="28" height="118" fill="#ffffff" />
      <rect x="44" y="44" width="152" height="118" rx="34" fill="none" {...line} />
      <rect x="66" y="62" width="108" height="50" rx="16" fill="#1f2228" />
      <rect x="86" y="74" width="20" height="26" rx="6" fill="#44ddeb" />
      <rect x="134" y="74" width="20" height="26" rx="6" fill="#44ddeb" />
      <circle cx="102" cy="138" r="10" fill="#d7dbe6" {...line} />
      <circle cx="138" cy="138" r="10" fill="#d7dbe6" {...line} />
      <rect x="54" y="128" width="20" height="12" rx="4" fill="#ffb020" {...line} />
      <rect x="166" y="128" width="20" height="12" rx="4" fill="#ffb020" {...line} />
    </g>
  );
}

/**
 * Momo from the front: two red plates with its green control board between them, the OLED face,
 * the ultrasonic sensor on top, the jumper wires, and its yellow wheels.
 */
function Momo() {
  return (
    <g>
      <Shadow cy={190} rx={96} />
      {[50, 190].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="150" r="30" fill="#f2b705" {...line} />
          <circle cx={cx} cy="150" r="10" fill="var(--illus-line)" />
        </g>
      ))}
      <path
        d="M68 96C56 74 62 52 86 40"
        fill="none"
        stroke="#e5484d"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M172 96C184 74 178 52 154 40"
        fill="none"
        stroke="#f2b705"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="44" y="118" width="152" height="20" rx="5" fill="#e3262d" {...line} />
      <rect x="62" y="96" width="116" height="22" rx="3" fill="#1f6f5c" {...line} />
      <rect x="72" y="101" width="22" height="12" rx="2" fill="var(--illus-line)" />
      {[106, 122, 138, 154].map((x) => (
        <rect key={x} x={x} y="102" width="10" height="10" rx="1.5" fill="#ffffff" />
      ))}
      <rect x="52" y="82" width="136" height="14" rx="4" fill="#e3262d" {...line} />
      <rect x="88" y="48" width="64" height="34" rx="7" fill="#1f2228" {...line} />
      <rect x="102" y="56" width="12" height="16" rx="3" fill="#44ddeb" />
      <rect x="126" y="56" width="12" height="16" rx="3" fill="#44ddeb" />
      <rect x="82" y="18" width="76" height="24" rx="4" fill="#2f6fd6" {...line} />
      <circle cx="104" cy="30" r="11" fill="#d7dbe6" {...line} />
      <circle cx="136" cy="30" r="11" fill="#d7dbe6" {...line} />
      <circle cx="104" cy="30" r="4.5" fill="#8a93a6" />
      <circle cx="136" cy="30" r="4.5" fill="#8a93a6" />
    </g>
  );
}

/** Garu: tracks, the onboard computer, a camera mast, and the robot arm. */
function Garu() {
  return (
    <g>
      <Shadow cy={194} rx={100} />
      <rect x="22" y="148" width="196" height="40" rx="20" fill="var(--illus-line)" />
      {[52, 92, 132, 172].map((cx) => (
        <circle key={cx} cx={cx} cy="168" r="11" fill="#5b6182" />
      ))}
      <rect x="38" y="106" width="164" height="46" rx="8" {...body} />
      <rect x="38" y="138" width="164" height="7" fill="#3a6ea5" />
      <rect x="72" y="90" width="72" height="18" rx="3" fill="#1f6f5c" {...line} />
      <rect x="58" y="48" width="9" height="60" fill="var(--illus-line)" />
      <rect x="44" y="30" width="38" height="24" rx="6" fill="var(--illus-line)" />
      <circle cx="63" cy="42" r="7" fill="#7fe0ff" />
      <path
        d="M172 108L190 62L220 76"
        fill="none"
        stroke="var(--illus-line)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M220 76l10-10M220 76l12 4"
        stroke="var(--illus-line)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="190" cy="62" r="6" fill="var(--accent)" />
    </g>
  );
}

/** Taksu Kiosk: a carved totem with a split-gate crown, portrait screen, and thermal printer. */
function Kiosk() {
  return (
    <g>
      <Shadow cy={290} rx={70} />
      <path d="M62 284h116v-14H62z" {...body} />
      <path d="M78 62h84v208H78z" {...body} />
      <g fill="var(--accent)" {...line}>
        <path d="M78 62V40h8v-8h8v-8h10v38z" />
        <path d="M162 62V40h-8v-8h-8v-8h-10v38z" />
      </g>
      <circle cx="120" cy="44" r="5" fill="var(--accent)" {...line} />
      <rect x="88" y="74" width="64" height="104" rx="6" fill="#120f2a" {...line} />
      <path
        d="M104 116q8-10 16 0M120 116q8-10 16 0"
        fill="none"
        stroke="#e6bd52"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M110 138q10 8 20 0"
        fill="none"
        stroke="#e6bd52"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="96" y="160" width="48" height="8" rx="4" fill="#26338a" />
      <rect x="96" y="196" width="48" height="6" rx="3" fill="var(--illus-line)" />
      <path d="M102 202h36v22l-6-4-6 4-6-4-6 4-6-4-6 4z" fill="#ffffff" {...line} />
      {[88, 110, 132, 154].map((x) => (
        <circle key={x} cx={x} cy="248" r="5" fill="none" stroke="var(--accent)" strokeWidth="3" />
      ))}
    </g>
  );
}
