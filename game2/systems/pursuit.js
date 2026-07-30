export const DEFAULT_PURSUIT = {
  thresholdDay: null,
  nextDay: null,
  pending: false,
  active: false,
  wave: 0,
  defeated: 0
};

export function mergePursuit(saved = {}) {
  return { ...DEFAULT_PURSUIT, ...(saved || {}) };
}

export function schedulePursuit(pursuit, karma, day) {
  if (karma < 1000 || pursuit.thresholdDay != null) return false;
  pursuit.thresholdDay = day;
  pursuit.nextDay = day + 3;
  return true;
}

export function updatePursuitSchedule(pursuit, karma, day) {
  schedulePursuit(pursuit, karma, day);
  if (karma >= 1000 && pursuit.nextDay != null && day >= pursuit.nextDay && !pursuit.active) {
    pursuit.pending = true;
    return true;
  }
  return false;
}

export function beginPursuit(pursuit) {
  if (!pursuit.pending || pursuit.active) return false;
  pursuit.pending = false;
  pursuit.active = true;
  pursuit.wave += 1;
  return true;
}

export function finishPursuit(pursuit, day) {
  pursuit.active = false;
  pursuit.pending = false;
  pursuit.defeated += 1;
  pursuit.nextDay = day + 3;
}
