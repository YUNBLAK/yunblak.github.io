const roamingClamp = (value,min,max) => Math.max(min,Math.min(max,value));

export function initializeRoamingNpc(state = {},originX = 0,floorY = 438) {
  if (!Number.isFinite(state.roamX)) state.roamX = originX;
  if (!Number.isFinite(state.roamY)) state.roamY = floorY;
  if (!Number.isFinite(state.prevRoamY)) state.prevRoamY = state.roamY;
  if (!Number.isFinite(state.roamVY)) state.roamVY = 0;
  if (!Number.isFinite(state.roamDistance)) state.roamDistance = 0;
  if (!Number.isFinite(state.roamPause)) state.roamPause = 0;
  if (!Number.isFinite(state.roamDir) || state.roamDir === 0) state.roamDir = 1;
  if (typeof state.roamGrounded !== "boolean") state.roamGrounded = true;
  return state;
}

export function updateRoamingNpc(state, {
  originX = 0,
  dt = 1,
  zoneWidth = 960,
  floorAt,
  speed = .42,
  range = 330,
  gravity = .58,
  maxFallSpeed = 11
} = {}) {
  const getFloor = typeof floorAt === "function" ? floorAt : () => 438;
  initializeRoamingNpc(state,originX,getFloor(state?.roamX ?? originX));
  const step = Math.max(0,Number(dt) || 0);
  state.roamPause = Math.max(0,state.roamPause - step);
  let startedFall = false;
  let landed = false;

  if (state.roamPause <= 0) {
    const nextX = roamingClamp(state.roamX + Math.sign(state.roamDir) * speed * step,90,Math.max(90,zoneWidth - 90));
    const nextFloor = getFloor(nextX);
    const reachedRange = Math.abs(nextX - originX) >= range;
    const blockedByRise = nextFloor < state.roamY - 18;
    const reachedBoundary = nextX <= 91 || nextX >= zoneWidth - 91;
    if (reachedRange || blockedByRise || reachedBoundary) {
      state.roamDir *= -1;
      state.roamPause = 24;
    } else {
      state.roamDistance += Math.abs(nextX - state.roamX);
      state.roamX = nextX;
    }
  }

  const ground = getFloor(state.roamX);
  if (state.roamGrounded && ground > state.roamY + 2) {
    state.roamGrounded = false;
    state.roamVY = Math.max(.8,state.roamVY);
    startedFall = true;
  }
  if (state.roamGrounded) {
    state.roamY = ground;
    state.roamVY = 0;
  } else {
    state.roamVY = Math.min(maxFallSpeed,state.roamVY + gravity * step);
    state.roamY += state.roamVY * step;
    if (state.roamY >= ground) {
      state.roamY = ground;
      state.roamVY = 0;
      state.roamGrounded = true;
      landed = true;
    }
  }

  return {
    x:state.roamX,
    y:state.roamY,
    grounded:state.roamGrounded,
    startedFall,
    landed
  };
}
