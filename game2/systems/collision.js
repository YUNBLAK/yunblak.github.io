export function resolveHorizontalMovement({ x, y, w, h, nextX, platforms }) {
  const direction = Math.sign(nextX - x);
  if (!direction) return { x, blocked: false };
  let resolvedX = nextX;
  let blocked = false;
  const top = y + 3;
  const bottom = y + h - 2;

  for (const platform of platforms) {
    if (platform.foundation) continue;
    const verticalOverlap = bottom > platform.y + 6 && top < platform.y + platform.h - 2;
    if (!verticalOverlap) continue;
    if (direction > 0) {
      const currentRight = x + w;
      const nextRight = resolvedX + w;
      if (currentRight <= platform.x + 1 && nextRight > platform.x) {
        resolvedX = Math.min(resolvedX, platform.x - w);
        blocked = true;
      }
    } else {
      const currentLeft = x;
      const nextLeft = resolvedX;
      const wall = platform.x + platform.w;
      if (currentLeft >= wall - 1 && nextLeft < wall) {
        resolvedX = Math.max(resolvedX, wall);
        blocked = true;
      }
    }
  }
  return { x: resolvedX, blocked };
}
