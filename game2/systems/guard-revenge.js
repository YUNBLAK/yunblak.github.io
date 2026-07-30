export function villageCiviliansDefeated(civilianIds, npcStates) {
  return civilianIds.length > 0 && civilianIds.every((id) => npcStates[id] && !npcStates[id].alive);
}

export function guardRevengeReady(civilianIds, npcStates, guardId = "guard") {
  return Boolean(npcStates[guardId]?.alive) && villageCiviliansDefeated(civilianIds, npcStates);
}
