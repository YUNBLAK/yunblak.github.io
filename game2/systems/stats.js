export const PLAYER_STAT_KEYS = ["attack", "health", "defense", "magic", "speed"];

const safeStatValue = (value) => Math.max(0, Math.floor(Number(value) || 0));

export function normalizePlayerStats(source = {}) {
  return Object.fromEntries(PLAYER_STAT_KEYS.map((key) => [key, safeStatValue(source[key])]));
}

export function statInvestment(current, pending) {
  const base = normalizePlayerStats(current);
  const next = normalizePlayerStats(pending);
  return PLAYER_STAT_KEYS.reduce((sum, key) => sum + next[key] - base[key], 0);
}

export function commitStatAllocation(current, pending, availablePoints) {
  const base = normalizePlayerStats(current);
  const next = normalizePlayerStats(pending);
  const points = safeStatValue(availablePoints);
  for (const key of PLAYER_STAT_KEYS) {
    if (next[key] < base[key]) return { ok:false, reason:"기존 스탯보다 낮출 수 없습니다.", stats:base, remaining:points, spent:0 };
  }
  const spent = statInvestment(base, next);
  if (spent <= 0) return { ok:false, reason:"투자할 스탯을 선택하세요.", stats:base, remaining:points, spent:0 };
  if (spent > points) return { ok:false, reason:"사용 가능한 스탯 포인트를 초과했습니다.", stats:base, remaining:points, spent:0 };
  return { ok:true, stats:next, remaining:points - spent, spent };
}

export function derivePlayerStats(stats, equipment = {}) {
  const value = normalizePlayerStats(stats);
  const weaponAttack = Number(equipment.weaponAttack) || 0;
  const armorHp = Number(equipment.armorHp) || 0;
  const armorDefense = Number(equipment.armorDefense) || 0;
  const accessoryMagic = Number(equipment.accessoryMagic) || 0;
  return {
    attackPower:2 + value.attack + weaponAttack,
    maxHp:8 + value.health * 2 + armorHp,
    defense:value.defense + armorDefense,
    magicPower:value.magic * 2 + accessoryMagic,
    maxMana:100 + value.magic * 5,
    maxStamina:100 + value.speed * 3,
    moveSpeed:3.9 + value.speed * .06,
    jump:12.2 + value.speed * .025
  };
}
