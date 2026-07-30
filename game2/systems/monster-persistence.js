export function spawnRecord(zoneId, group, spawn, index) {
  const [type, x, floor, explicitId] = spawn;
  return {
    id: explicitId || `${zoneId}:${group}:${type}:${Math.round(x)}`,
    spec: [type, x, floor]
  };
}

export function isSpawnDefeated(defeatedSpawns, id) {
  return !!defeatedSpawns?.[id];
}

export function markSpawnDefeated(defeatedSpawns, id, day) {
  if (!id) return false;
  defeatedSpawns[id] = { day };
  return true;
}

export function clearDefeatedSpawns(defeatedSpawns, zoneId = null) {
  let removed = 0;
  for (const id of Object.keys(defeatedSpawns)) {
    if (!zoneId || id.startsWith(`${zoneId}:`)) {
      delete defeatedSpawns[id];
      removed += 1;
    }
  }
  return removed;
}

export function zoneClearStatus(zoneId, spawns, defeatedSpawns) {
  const records = [
    ...(spawns.enemies || []).map((spawn, index) => spawnRecord(zoneId, "day", spawn, index)),
    ...(spawns.nightEnemies || []).map((spawn, index) => spawnRecord(zoneId, "night", spawn, index))
  ];
  return {
    total: records.length,
    defeated: records.filter((record) => isSpawnDefeated(defeatedSpawns, record.id)).length,
    cleared: records.length > 0 && records.every((record) => isSpawnDefeated(defeatedSpawns, record.id))
  };
}
