export const KARMA_AURA_TIERS = [
  { min: 0, id: "none", particles: 0, radius: 0, darkness: 0 },
  { min: 20, id: "whisper", particles: 1, radius: 24, darkness: .02 },
  { min: 100, id: "shadow", particles: 2, radius: 34, darkness: .04 },
  { min: 250, id: "blood", particles: 3, radius: 44, darkness: .065 },
  { min: 500, id: "corruption", particles: 5, radius: 68, darkness: .095 },
  { min: 1000, id: "abyss", particles: 8, radius: 96, darkness: .14 }
];

export function karmaAuraTier(value) {
  return [...KARMA_AURA_TIERS].reverse().find((tier) => value >= tier.min);
}

export function npcAttackUnlocked(value) {
  return value >= 500;
}

export function worldHostile(value) {
  return value >= 1000;
}
