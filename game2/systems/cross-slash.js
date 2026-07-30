export function crossSlashProfile(level = 1, growth = {}) {
  const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
  const steps = safeLevel - 1;
  const tier = Math.max(1, Math.floor(Number(growth.tier) || 1));
  const castFrames = Math.max(18,24 - Math.floor((tier - 1) / 2));
  return {
    level:safeLevel,
    tier,
    velocity:9.4 + Math.min(3.6,steps * .12),
    damageScale:1 + steps * .022 + (tier - 1) * .045,
    maxHits:Math.min(9,2 + tier + Math.floor(steps / 8)),
    staggerFrames:tier >= 2 ? 5 + tier * 2 : 0,
    guardBreak:tier >= 3,
    trailCount:Math.min(7,2 + tier),
    echoCount:Math.max(Number(growth.echoCount) || 0,Math.min(5,tier - 1)),
    castFrames,
    launchDelay:Math.max(14,castFrames - 2),
    sizeScale:1 + (tier - 1) * .055
  };
}

export function crossWaveOpacity(life = 0,maxLife = 1) {
  const total = Math.max(1,Number(maxLife) || 1);
  const remaining = Math.max(0,Math.min(1,(Number(life) || 0) / total));
  const fadeWindow = .42;
  if (remaining >= fadeWindow) return 1;
  const normalized = remaining / fadeWindow;
  return normalized * normalized * (3 - normalized * 2);
}
