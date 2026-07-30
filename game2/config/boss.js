export const WARDEN_PHASES = [
  {
    threshold: .67,
    name: "철의 맹세",
    patterns: ["combo", "charge", "slam", "bash"],
    interval: 150
  },
  {
    threshold: .34,
    name: "타오르는 칼날",
    patterns: ["fireBlade", "lanes", "summon", "predictCharge"],
    interval: 124
  },
  {
    threshold: 0,
    name: "재의 폭군",
    patterns: ["fiveCombo", "pillars", "fireWalls", "predictCharge"],
    interval: 96
  }
];

export function bossPhase(hp, maxHp) {
  const ratio = hp / maxHp;
  return ratio > .67 ? 0 : ratio > .34 ? 1 : 2;
}
