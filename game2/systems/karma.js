export function karmaTier(value) {
  if (value >= 1000) return { name: "심연의 재앙", price: 3, guards: true, hunters: true, hostileWorld: true };
  if (value >= 500) return { name: "타락한 군주", price: 2.2, guards: true, hunters: true, autoHostile: true };
  if (value >= 250) return { name: "검은 현상수배자", price: 2, guards: true, hunters: true };
  if (value >= 100) return { name: "저주받은 기사", price: 1.8, guards: true, hunters: true };
  if (value >= 50) return { name: "현상 수배자", price: 1.5, guards: true, hunters: true };
  if (value >= 20) return { name: "범죄자", price: 1.2, guards: false, hunters: true };
  if (value > 0) return { name: "불길한 자", price: 1, guards: false, hunters: false };
  return { name: "평범한 기사", price: 1, guards: false, hunters: false };
}

export function corpseStage(npcState, currentDay) {
  if (npcState.alive) return null;
  const age = currentDay - npcState.deathDay;
  if (age >= 5) return "bones";
  if (age >= 3) return "decayed";
  return "fresh";
}
