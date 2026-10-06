'use client';

import { getPawukon } from '@taksu/bali';
import { useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}

const readCycleDay = () => getPawukon(new Date()).cycleDay;
const serverCycleDay = () => null;

/**
 * Today's position in the Pawukon cycle (Bali time), or null during server render.
 * Re-checks every minute so kiosks that run overnight roll over at midnight WITA.
 */
export function usePawukonCycleDay(): number | null {
  return useSyncExternalStore(subscribe, readCycleDay, serverCycleDay);
}
