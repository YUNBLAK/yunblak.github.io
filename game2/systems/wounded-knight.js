export const WOUNDED_KNIGHT = Object.freeze({
  id: "wounded_knight_cedric",
  name: "세드릭",
  role: "부상당한 왕실 기사",
  zone: "outskirts2",
  x: 1648,
  maxHp: 42,
  boneAfterDays: 3
});

export const WOUNDED_KNIGHT_ROUTE = Object.freeze([
  "outskirts2",
  "outskirts1",
  "village",
  "elderHill",
  "elderHouse"
]);

export const DEFAULT_WOUNDED_KNIGHT_STATE = Object.freeze({
  status: "waiting",
  zone: WOUNDED_KNIGHT.zone,
  x: WOUNDED_KNIGHT.x,
  y: null,
  prevX: WOUNDED_KNIGHT.x,
  prevY: null,
  vx: 0,
  vy: 0,
  limpFrame: 0,
  hurtTimer: 0,
  hp: WOUNDED_KNIGHT.maxHp,
  maxHp: WOUNDED_KNIGHT.maxHp,
  approached: false,
  choice: null,
  executionTimer: 0,
  executionHit: false,
  deathDay: null,
  deathMinute: null,
  bodyZone: null,
  bodyX: null,
  headX: null,
  headY: null,
  headVx: 0,
  headVy: 0,
  headRotation: 0,
  bloodTimer: 0,
  escortStartedDay: null,
  escortStartedMinute: null,
  escortKills: 0,
  wavesSpawned: {},
  waveDefeated: {},
  failureSpoken: false,
  rewardClaimed: false
});

export function mergeWoundedKnightState(saved = {}) {
  return {
    ...DEFAULT_WOUNDED_KNIGHT_STATE,
    ...(saved || {}),
    wavesSpawned: { ...DEFAULT_WOUNDED_KNIGHT_STATE.wavesSpawned, ...(saved?.wavesSpawned || {}) },
    waveDefeated: { ...DEFAULT_WOUNDED_KNIGHT_STATE.waveDefeated, ...(saved?.waveDefeated || {}) }
  };
}

export function chooseWoundedKnight(state, choice, day, minute) {
  if (!state || state.status !== "waiting" || !["execute", "spare"].includes(choice)) return false;
  state.choice = choice;
  if (choice === "execute") {
    state.status = "executing";
    state.executionTimer = 132;
    state.executionHit = false;
    return true;
  }
  state.status = "escort";
  state.hp = Math.max(1, Math.round(state.maxHp * .82));
  state.escortStartedDay = day;
  state.escortStartedMinute = minute;
  state.wavesSpawned = {};
  state.waveDefeated = {};
  return true;
}

export function advanceWoundedKnightExecution(state, dt = 1) {
  if (!state || state.status !== "executing") {
    return { active:false,timer:0,windup:false,shouldHit:false };
  }
  const timer = Number.isFinite(state.executionTimer) ? state.executionTimer : 0;
  const step = Number.isFinite(dt) && dt > 0 ? dt : 1;
  state.executionTimer = Math.max(0,timer - step);
  return {
    active:true,
    timer:state.executionTimer,
    windup:state.executionTimer < 96 && state.executionTimer > 62,
    shouldHit:!state.executionHit && state.executionTimer <= 62
  };
}

export function finishWoundedKnightExecution(state, day, minute, zone, x, headX, headY) {
  if (!state || !["executing", "waiting"].includes(state.status)) return false;
  state.status = "executed";
  state.executionTimer = 0;
  state.executionHit = true;
  state.deathDay = day;
  state.deathMinute = minute;
  state.bodyZone = zone;
  state.bodyX = x;
  state.headX = headX;
  state.headY = headY;
  state.headVx = 5.6;
  state.headVy = -5.8;
  state.headRotation = 0;
  state.bloodTimer = 120;
  state.hp = 0;
  return true;
}

export function failWoundedKnightEscort(state, day, minute, zone, x) {
  if (!state || state.status !== "escort") return false;
  state.status = "escort_dead";
  state.hp = 0;
  state.deathDay = day;
  state.deathMinute = minute;
  state.bodyZone = zone;
  state.bodyX = x;
  state.failureSpoken = true;
  return true;
}

export function completeWoundedKnightEscort(state) {
  if (!state || state.status !== "escort") return false;
  state.status = "rescued";
  state.hp = Math.max(1, state.hp);
  state.rewardClaimed = true;
  return true;
}

export function woundedKnightEscortActive(state) {
  return state?.status === "escort";
}

export function woundedKnightIsCorpse(state) {
  return state?.status === "executed" || state?.status === "escort_dead";
}

export function woundedKnightElapsedDays(state, day, minute) {
  if (state?.deathDay == null) return 0;
  return (day - state.deathDay) + ((minute || 0) - (state.deathMinute || 0)) / 1440;
}

export function woundedKnightRemainsStage(state, day, minute) {
  if (!woundedKnightIsCorpse(state)) return "none";
  return woundedKnightElapsedDays(state, day, minute) >= WOUNDED_KNIGHT.boneAfterDays ? "bones" : "fresh";
}
