export function sprintDecision({ moving, shift, stamina, exhausted, guardTimer, attackTimer, transformed }) {
  const sprinting = moving !== 0 && shift && exhausted <= 0 && stamina >= 1 && guardTimer <= 0 && attackTimer <= 0;
  return {
    sprinting,
    multiplier: sprinting ? (transformed ? 1.8 : 1.56) : 1
  };
}

export function sprintStaminaStep({ stamina, maxStamina, sprinting, regenDelay, moving, dt }) {
  if (sprinting) {
    const next = Math.max(0, stamina - .34 * dt);
    return { stamina: next, regenDelay: 32, exhausted: next <= 0 ? 90 : 0 };
  }
  const nextDelay = Math.max(0, regenDelay - dt);
  return {
    stamina: nextDelay <= 0 ? Math.min(maxStamina, stamina + (moving ? .16 : .25) * dt) : stamina,
    regenDelay: nextDelay,
    exhausted: 0
  };
}
