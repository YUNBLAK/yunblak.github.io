export const APOCALYPSE_KARMA = 1000;

const apocalypseClamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function apocalypseIntensity(value) {
  const karma = Math.max(0, Number(value) || 0);
  if (karma < APOCALYPSE_KARMA) return 0;
  return apocalypseClamp(.72 + (karma - APOCALYPSE_KARMA) / 1800 * .28, .72, 1);
}

export function firefallState(timeMs, index, width = 960, height = 540) {
  const time = Math.max(0, Number(timeMs) || 0);
  const order = Math.max(0, Math.floor(Number(index) || 0));
  const cycle = 6200 + order % 4 * 1100;
  const shifted = time + order * 1739;
  const sequence = Math.floor(shifted / cycle);
  const phase = (shifted % cycle) / cycle;
  const activeWindow = .24;
  const progress = apocalypseClamp(phase / activeWindow, 0, 1);
  const seed = (order * 197 + sequence * 131 + 71) % 997;
  const direction = order % 5 === 4 ? 1 : -1;
  const travelY = height + 180;
  const drift = height * (.46 + order % 3 * .08);
  const startX = -120 + seed / 997 * (width + 240);
  const trail = 82 + order % 3 * 20;
  return {
    active:phase < activeWindow,
    backgroundOnly:true,
    collidable:false,
    damage:0,
    progress,
    x:startX + direction * drift * progress,
    y:-90 + travelY * progress,
    direction,
    drift,
    travelY,
    trail,
    trailX:-direction * trail * drift / travelY,
    trailY:trail,
    scale:.82 + order % 4 * .12
  };
}
