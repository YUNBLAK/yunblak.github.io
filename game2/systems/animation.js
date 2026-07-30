const animationClamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
const animationSmoothstep = (value) => {
  const t = animationClamp01(value);
  return t * t * (3 - 2 * t);
};

export function lerp(previous, current, alpha) {
  const from = Number.isFinite(previous) ? previous : current;
  const to = Number.isFinite(current) ? current : from;
  return from + (to - from) * animationClamp01(alpha);
}

export function interpolated(entity, axis, alpha) {
  return lerp(entity?.[`prev${axis.toUpperCase()}`], entity?.[axis], alpha);
}

export function playerSwordAngle(progress, combo = 0, crossSlash = false) {
  const t = animationClamp01(progress);
  if (crossSlash) {
    if (t < .5) {
      const firstStroke = animationSmoothstep(t / .5);
      return -1.2 + firstStroke * 2.08;
    }
    const secondStroke = animationSmoothstep((t - .5) / .5);
    return .88 - secondStroke * 2.08;
  }
  const eased = 1 - Math.pow(1 - t, 3);
  if (combo === 0) return -1.3 + eased * 1.98;
  if (combo === 1) return -.42 + eased * .94;
  return -1.52 + eased * 2.22;
}

export function playerAttackMotion({ active, progress, combo = 0, face = 1 }, out = {}) {
  if (!active) {
    out.lunge = 0;
    out.crouch = 0;
    out.stance = 0;
    out.shoulder = 0;
    out.counterArm = 0;
    return out;
  }
  const t = animationClamp01(progress);
  const windup = animationSmoothstep(t / .24);
  const strike = animationSmoothstep((t - .2) / .38);
  const recovery = animationSmoothstep((t - .62) / .38);
  const impulse = Math.sin(Math.PI * animationClamp01((t - .08) / .92));
  const finisher = combo === 2 ? 1.45 : combo === 1 ? 1.12 : 1;
  out.lunge = face * impulse * 5.5 * finisher;
  out.crouch = Math.sin(Math.PI * t) * (combo === 2 ? 4 : 2.2);
  out.stance = impulse * (combo === 2 ? 5.5 : 3.5);
  out.shoulder = face * (strike - recovery * .65) * 3.5 * finisher;
  out.counterArm = face * (windup - strike) * 4;
  return out;
}

export function playerAirMotion({ grounded, vy = 0, airTime = 0, landTimer = 0, face = 1 }, out = {}) {
  if (grounded) {
    const landing = animationClamp01(landTimer / 9);
    out.bodyY = landing * 3;
    out.bodyLean = 0;
    out.frontKnee = landing * 2;
    out.rearKnee = landing * 2;
    out.capeLift = 0;
    out.airborne = false;
    return out;
  }
  const ascent = animationClamp01(-vy / 12);
  const descent = animationClamp01(vy / 12);
  const hang = 1 - animationClamp01(Math.abs(vy) / 8);
  const settled = animationSmoothstep(airTime / 5);
  out.bodyY = -hang * 1.5;
  out.bodyLean = face * (ascent * 1.5 - descent);
  out.frontKnee = (3 + ascent * 5 + hang * 2) * settled;
  out.rearKnee = (1 + ascent * 2 + hang * 5 + descent * 2) * settled;
  out.capeLift = (4 + ascent * 5 + descent * 2) * settled;
  out.airborne = true;
  return out;
}

export function enemyCombatMotion(entity = {}, alpha = 1, out = {}) {
  const attackAnim = lerp(entity.prevAttackAnim, entity.attackAnim ?? 0, alpha);
  const dashTimer = lerp(entity.prevDashTimer, entity.dashTimer ?? 0, alpha);
  const launchTimer = lerp(entity.prevLaunchTimer, entity.launchTimer ?? 0, alpha);
  const leapTimer = lerp(entity.prevLeapTimer, entity.leapTimer ?? 0, alpha);
  const attackAnimMax = entity.attackAnimMax ?? 0;
  const face = entity.face ?? 1;
  const attacking = attackAnim > 0;
  const duration = Math.max(1, attackAnimMax || 34);
  const progress = attacking ? animationClamp01(1 - attackAnim / duration) : 0;
  const impulse = attacking ? Math.sin(Math.PI * progress) : 0;
  const airborne = launchTimer > 0 || leapTimer > 0;
  const launchProgress = launchTimer > 0
    ? animationClamp01(1 - launchTimer / 22)
    : animationClamp01(1 - leapTimer / Math.max(1, entity.leapDuration || 28));
  const jumpArc = airborne ? Math.sin(Math.PI * launchProgress) : 0;
  out.bodyX = face * (dashTimer > 0 ? 5 : impulse * 4.5);
  out.bodyY = impulse * 2 - jumpArc * 1.5;
  out.stance = attacking ? impulse * 4 : 0;
  out.frontKnee = airborne ? 6 + jumpArc * 3 : attacking ? impulse * 2 : 0;
  out.rearKnee = airborne ? 3 + (1 - jumpArc) * 3 : attacking ? impulse : 0;
  out.tilt = face * (dashTimer > 0 ? .07 : impulse * .035);
  out.attackProgress = progress;
  out.airborne = airborne;
  return out;
}
