const SKILL_GROWTH_RANKS = ["점화", "강화", "각성", "초월", "성좌", "신화", "영겁"];

export function skillGrowth(level = 1, id = "", kind = "") {
  const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
  const steps = safeLevel - 1;
  const tier = Math.min(SKILL_GROWTH_RANKS.length, 1 + Math.floor(steps / 4));
  const kindWeight = {
    ultimate: 1.3,
    meteor: 1.25,
    transform: 1.2,
    blessing: 1.1,
    crossProjectile: 1.16,
    lightning: 1.08,
    frost: 1.05
  }[kind] || 1;

  return {
    id,
    kind,
    level: safeLevel,
    tier,
    rank: SKILL_GROWTH_RANKS[tier - 1],
    rangeScale: 1 + steps * .028,
    effectScale: 1 + steps * .036,
    durationScale: 1 + steps * .01,
    powerScale: 1 + steps * .012,
    particleCount: Math.round((8 + tier * 4 + steps * .7) * kindWeight),
    echoCount: Math.min(4, Math.floor(steps / 5)),
    chainCount: Math.min(4, 1 + Math.floor(steps / 7)),
    trailCount: Math.min(5, 1 + Math.floor(steps / 4))
  };
}

export function scaledRange(baseRange, growth) {
  return Math.round(Math.max(1, Number(baseRange) || 1) * (growth?.rangeScale || 1));
}

export function scaledEffectSize(baseSize, growth) {
  return Math.round(Math.max(1, Number(baseSize) || 1) * (growth?.effectScale || 1));
}

export function skillGrowthSummary(level, id = "", kind = "") {
  const growth = skillGrowth(level, id, kind);
  return {
    ...growth,
    rangeBonus: Math.round((growth.rangeScale - 1) * 100),
    effectBonus: Math.round((growth.effectScale - 1) * 100)
  };
}
