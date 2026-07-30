export const CAMERA_BASE_FLOOR = 438;

export function landingFloorBelowPlayer(
  platforms = [],
  x,
  footY,
  { fallback = CAMERA_BASE_FLOOR } = {}
) {
  const playerFootY = Number.isFinite(footY) ? footY : fallback;
  let support = Infinity;
  for (const platform of platforms) {
    if (
      !platform || !Number.isFinite(platform.x)
      || !Number.isFinite(platform.y) || !Number.isFinite(platform.w)
    ) continue;
    if (x < platform.x || x > platform.x + platform.w) continue;
    // Canvas Y increases downward: a smaller Y is above the player's feet.
    // Never let an overhead or currently pass-through platform steer the camera.
    if (platform.y < playerFootY) continue;
    support = Math.min(support,platform.y);
  }
  return Number.isFinite(support) ? support : fallback;
}

export function verticalCameraTarget(
  floorY,
  { baseFloor = CAMERA_BASE_FLOOR, follow = 1, maxRise = 300 } = {}
) {
  const terrainY = Number.isFinite(floorY) ? floorY : baseFloor;
  return Math.max(-maxRise, Math.min(0,(terrainY - baseFloor) * follow));
}

export function playerVerticalCameraTarget({
  playerY,
  playerHeight = 0,
  floorY,
  grounded = true,
  velocityY = 0,
  screenTop = 370,
  maxRise = 300
} = {}) {
  const hasGroundedSupport = grounded
    && Number.isFinite(playerY)
    && Number.isFinite(playerHeight)
    && playerHeight > 0;
  const supportedFloorY = hasGroundedSupport ? playerY + playerHeight : floorY;
  const terrainTarget = verticalCameraTarget(supportedFloorY,{ maxRise });
  if (grounded || !Number.isFinite(playerY)) return terrainTarget;
  // Predict takeoff so the camera never reacts late, but never predict a fall:
  // downward anticipation makes the world drop before the player's feet leave an edge.
  const prediction = Math.max(-32,Math.min(0,(Number(velocityY) || 0) * 2.2));
  const playerTarget = Math.max(-maxRise,Math.min(0,playerY + prediction - screenTop));
  return Math.min(terrainTarget,playerTarget);
}

export function easeCamera(current, target, dt = 1, responsiveness = 0.24) {
  return current + (target - current) * Math.min(1,responsiveness * dt);
}
