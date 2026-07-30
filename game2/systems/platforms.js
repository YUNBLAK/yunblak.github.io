const BASELINE_Y = 438;

export function groundKindForZone(zoneId, interior = false) {
  if (interior) {
    if (zoneId === "elderHouse") return "wood";
    if (zoneId === "castleHall") return "castleInterior";
    return "dungeon";
  }
  if (zoneId === "village") return "village";
  if (zoneId === "bossArena") return "bridge";
  if (zoneId === "dungeon") return "dungeon";
  if (zoneId === "outskirts2") return "ruin";
  if (zoneId === "castleApproach") return "castleStone";
  if (zoneId === "moonbriarVillage") return "moonVillage";
  if (zoneId?.startsWith("moonbriar")) return "moonGrass";
  if (zoneId === "sunspireTown") return "sunVillage";
  if (zoneId?.startsWith("sunspire")) return "sand";
  return "grass";
}

export function ensureContinuousGround(zone, baseline = BASELINE_Y) {
  const originals = (zone.platforms || []).map((platform) => ({ ...platform }));
  const alreadyContinuous = originals.some((platform) =>
    platform.x <= 0 &&
    platform.x + platform.w >= zone.width &&
    platform.y === baseline
  );
  if (alreadyContinuous) return originals;
  return [
    {
      x: 0,
      y: baseline,
      w: zone.width,
      h: Math.max(102, 540 - baseline),
      kind: groundKindForZone(zone.id, zone.interior),
      foundation: true
    },
    ...originals
  ];
}

export function groundCoverageGaps(platforms, width) {
  const intervals = (platforms || [])
    .filter((platform) => platform.w > 0)
    .map((platform) => [Math.max(0, platform.x), Math.min(width, platform.x + platform.w)])
    .filter(([start, end]) => end > start)
    .sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let coveredUntil = 0;
  for (const [start, end] of intervals) {
    if (start > coveredUntil) gaps.push([coveredUntil, start]);
    coveredUntil = Math.max(coveredUntil, end);
  }
  if (coveredUntil < width) gaps.push([coveredUntil, width]);
  return gaps;
}
