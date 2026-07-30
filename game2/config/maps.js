export const MAP_ORDER = [
  "village",
  "elderHill",
  "elderHouse",
  "outskirts1",
  "moonbriarForest",
  "moonbriarVillage",
  "sunspirePass",
  "sunspireTown",
  "outskirts2",
  "bossArena",
  "dungeon",
  "castleApproach",
  "castleHall"
];

export function mapCode(zoneId) {
  const index = MAP_ORDER.indexOf(zoneId);
  return `map_${String(index < 0 ? 0 : index + 1).padStart(2, "0")}`;
}
