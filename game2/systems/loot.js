export const LOOT_RULES = {
  basePotionChance: .075,
  pityKills: 9,
  hardPityKills: 16,
  pickupCooldownKills: 4
};

export function potionDropDecision({ roll, killsSinceDrop, killsSincePickup }) {
  if (killsSincePickup < LOOT_RULES.pickupCooldownKills) return false;
  if (killsSinceDrop >= LOOT_RULES.hardPityKills) return true;
  const pity = killsSinceDrop >= LOOT_RULES.pityKills ? (killsSinceDrop - LOOT_RULES.pityKills + 1) * .025 : 0;
  return roll < LOOT_RULES.basePotionChance + pity;
}
