/**
 * Frost Wing — boss
 * Boss spawning, shared state machines, movement, evolution, and lifecycle.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function startBossIntro({ title, subtitle, color, targetY, style, chapter }) {
    if (!boss) return;
    bossIntro = {
      title,
      subtitle,
      color,
      targetY,
      style,
      chapter,
      time: 0,
      duration: style === "orbit" ? 4.1 : 3.7,
      impactDone: false,
      startY: style === "rift" ? targetY : -boss.radius - 135,
      startX: style === "orbit" ? -boss.radius * 2.6 : WIDTH / 2
    };
    boss.x = bossIntro.startX;
    boss.y = bossIntro.startY;
    boss.hitFlash = 0;
    enemyBullets = [];
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
  }

function easeOutBack(value) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
  }

function updateBossIntro(dt) {
    if (!bossIntro || !boss) return false;
    bossIntro.time += dt;
    const progress = Math.min(1, bossIntro.time / bossIntro.duration);
    const entrance = Math.max(0, Math.min(1, (progress - 0.18) / 0.48));
    const eased = easeOutBack(entrance);
    if (bossIntro.style === "orbit") {
      const arc = Math.PI * (1.05 - entrance * 0.55);
      boss.x = WIDTH / 2 + Math.cos(arc) * (WIDTH * 0.62) * (1 - entrance);
      boss.y = bossIntro.targetY + Math.sin(arc) * 170 * (1 - entrance);
    } else if (bossIntro.style === "rift") {
      const scale = 1 - Math.pow(1 - entrance, 3);
      boss.x = WIDTH / 2 + Math.sin(bossIntro.time * 19) * (1 - entrance) * 32;
      boss.y = bossIntro.targetY - (1 - scale) * 55;
      boss.introScale = Math.max(0.03, scale);
    } else {
      boss.x = WIDTH / 2 + Math.sin(bossIntro.time * 13) * (1 - entrance) * 18;
      boss.y = bossIntro.startY + (bossIntro.targetY - bossIntro.startY) * eased;
    }
    if (entrance >= 0.88 && !bossIntro.impactDone) {
      bossIntro.impactDone = true;
      screenFlash = Math.max(screenFlash, 0.92);
      addExplosion(boss.x, bossIntro.targetY, bossIntro.color, 64);
      addExplosion(boss.x, bossIntro.targetY, "#ffffff", 28);
      playTone(76, 31, 0.75, 0.12, "sawtooth");
      playNoise(0.72, 0.105, 620);
    }
    if (progress >= 1) {
      boss.x = WIDTH / 2;
      boss.y = bossIntro.targetY;
      boss.introScale = 1;
      boss.attackTimer = Math.max(boss.attackTimer || 0, 1.15);
      bossIntro = null;
      return false;
    }
    return true;
  }

function spawnBoss() {
    if (bossSpawned || bossDefeated) return;
    bossSpawned = true;
    enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, "#d7f5ff", 12));
    enemies = [];
    enemyBullets = [];
    bossBombs = [];
    const maxHp = Math.round((players.length === 2 ? 760 : 480) * 1.34);
    boss = {
      type: "colossus",
      name: "NEWTON GRAVITY ENGINE",
      scientist: "ISAAC NEWTON",
      sigil: "N",
      formula: "F = ma",
      color: "#8bdcf2",
      special: "gravity",
      x: WIDTH / 2,
      y: 145,
      radius: 88,
      collisionRadius: 70,
      hp: maxHp,
      maxHp,
      phase: 0,
      attackTimer: 1.8,
      pattern: 0,
      lasers: [],
      laserBarrageActive: false,
      bombShotsRemaining: 0,
      bombNextTimer: 0,
      volleyShotsRemaining: 0,
      volleyNextTimer: 0,
      volleyKind: "",
      strategy: "",
      recentPatterns: [],
      enraged: false,
      dodgeDirection: Math.random() < 0.5 ? -1 : 1,
      dodgeTimer: 0,
      motionTimer: 0,
      motionTargetX: WIDTH / 2,
      motionTargetY: 145,
      motionVx: 0,
      motionVy: 0,
      hitFlash: 0,
      damageScale: 0.72,
      ultimateTimer: 16 + Math.random() * 4,
      ultimateCount: 0,
      ultimateSequence: [],
      cloakTimer: 10 + Math.random() * 4,
      cloakDuration: 0
    };
    startBossIntro({
      title: language() === "ko" ? "뉴턴 중력 엔진" : "NEWTON GRAVITY ENGINE",
      subtitle: language() === "ko" ? "운동 법칙 전투 AI" : "LAWS OF MOTION COMBAT AI",
      color: "#8bdcf2",
      targetY: 145,
      style: "drop",
      chapter: "BOSS 01"
    });
    messages.push({
      text: copy[language()].bossWarning,
      x: WIDTH / 2,
      y: HEIGHT * 0.48,
      life: 2.2,
      color: "#ffd2b0",
      fixed: true
    });
    screenFlash = 0.75;
    playTone(72, 46, 0.7, 0.12, "sawtooth");
    playNoise(0.65, 0.08, 480);
  }

function spawnBoss2() {
    if (boss2Spawned || boss2Defeated) return;
    boss2Spawned = true;
    enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, "#c9e9ff", 12));
    enemies = [];
    enemyBullets = [];
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
    const maxHp = Math.round((players.length === 2 ? 2200 : 1450) * 1.3);
    boss = {
      type: "station",
      name: "VON NEUMANN REPLICATOR",
      scientist: "JOHN VON NEUMANN",
      sigil: "VN",
      formula: "xₙ₊₁ = f(xₙ)",
      color: "#78c9f2",
      special: "recursive",
      x: WIDTH / 2,
      y: 132,
      radius: 112,
      collisionRadius: 86,
      hp: maxHp,
      maxHp,
      phase: 0,
      hitFlash: 0,
      lasers: [],
      strategy: copy[language()].strategyIcbm,
      minionTimer: 0.4,
      missileTimer: 2.4,
      tacticTimer: 1.8,
      lastTactic: -1,
      droneSequence: 0,
      dodgeTargetX: WIDTH / 2,
      dodgeTargetY: 132,
      dodgeTimer: 0,
      motionTimer: 0,
      motionTargetX: WIDTH / 2,
      motionTargetY: 132,
      motionVx: 0,
      motionVy: 0,
      enraged: false,
      damageScale: 0.78,
      ultimateTimer: 16 + Math.random() * 4,
      ultimateCount: 0,
      ultimateSequence: [],
      cloakTimer: 10 + Math.random() * 4,
      cloakDuration: 0
    };
    startBossIntro({
      title: language() === "ko" ? "폰 노이만 자기복제기" : "VON NEUMANN REPLICATOR",
      subtitle: language() === "ko" ? "재귀 생산 궤도 AI" : "RECURSIVE ORBITAL FACTORY AI",
      color: "#78c9f2",
      targetY: 132,
      style: "orbit",
      chapter: "BOSS 02"
    });
    messages.push({
      text: copy[language()].boss2Warning,
      x: WIDTH / 2,
      y: HEIGHT * 0.48,
      life: 2.8,
      color: "#b9d9ff",
      fixed: true
    });
    screenFlash = 0.9;
    playTone(58, 34, 0.9, 0.13, "sawtooth");
    playNoise(0.8, 0.095, 520);
  }

function nextApexBossTier() {
    const highestUnlockedTier = Math.min(TOTAL_BOSSES, Math.floor(level / 5));
    for (let tier = 3; tier <= highestUnlockedTier; tier += 1) {
      if (!defeatedApexTiers.has(tier)) return tier;
    }
    return 0;
  }

function spawnApexBoss(tier) {
    if (boss || tier < 3 || tier > TOTAL_BOSSES || defeatedApexTiers.has(tier)) return;
    const profile = APEX_BOSSES[tier - 3];
    enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, profile.color, 14));
    enemies = [];
    enemyBullets = [];
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
    const soloHp = 1250 + tier * 470 + Math.pow(tier, 1.35) * 38;
    const maxHp = Math.round(soloHp * 1.38 * (players.length === 2 ? 1.55 : 1));
    boss = {
      type: "apex",
      tier,
      name: profile.name,
      scientist: profile.scientist,
      sigil: profile.sigil,
      formula: profile.formula,
      color: profile.color,
      patternName: profile.pattern,
      movement: profile.movement,
      kit: profile.kit,
      special: profile.special,
      evolutions: profile.evolutions || [],
      x: WIDTH / 2,
      y: 132,
      homeY: 132,
      radius: 94,
      collisionRadius: 72,
      hp: maxHp,
      maxHp,
      phase: 0,
      hitFlash: 0,
      lasers: [],
      attackTimer: 1.4,
      attackIndex: 0,
      specialCount: 0,
      teleportTimer: 1.4,
      dashTargetX: WIDTH / 2,
      dashTimer: 0,
      motionClock: Math.random() * Math.PI * 2,
      motionTimer: 0,
      motionOffsetX: 0,
      motionOffsetY: 0,
      motionTargetOffsetX: 0,
      motionTargetOffsetY: 0,
      motionRate: 1,
      motionRateTarget: 1,
      phaseCloak: 0,
      timeStop: 0,
      rareBlackHoleTimer: profile.special === "time_stop"
        ? 28 + Math.random() * 18
        : Number.POSITIVE_INFINITY,
      strategy: copy[language()].apexStrategy(profile.pattern),
      enraged: false,
      damageScale: 1,
      ultimateTimer: 10 + Math.random() * 5,
      ultimateCount: 0,
      ultimateSequence: [],
      followupAttack: null,
      lastPattern: -1,
      phaseStage: 1,
      evolutionTimer: 3.5,
      cloakTimer: 4 + Math.random() * 5,
      cloakDuration: 0
    };
    startBossIntro({
      title: profile.name,
      subtitle: `${profile.scientist} AI · ${profile.pattern}`,
      color: profile.color,
      targetY: 132,
      style: ["rift", "drop", "orbit"][tier % 3],
      chapter: `APEX ${String(tier).padStart(2, "0")} / ${TOTAL_BOSSES}`
    });
    messages.push({
      text: copy[language()].apexWarning(tier, profile.name),
      x: WIDTH / 2,
      y: HEIGHT * 0.46,
      life: 2.8,
      color: profile.color,
      fixed: true
    });
    screenFlash = 0.9;
    playTone(54 + tier * 3, 28, 0.9, 0.13, "sawtooth");
    playNoise(0.75, 0.09, 620);
  }

function livingPilots() {
    return players.filter((pilot) => pilot.alive);
  }

function targetedPilot() {
    const living = livingPilots();
    return living.length ? living[Math.floor(Math.random() * living.length)] : null;
  }

function activeAttackTargets() {
    const targets = [];
    bossBombs.forEach((bomb) => targets.push({ x: bomb.x, y: bomb.y, radius: bomb.radius || 40 }));
    bossMissiles.forEach((missile) => targets.push({ x: missile.targetX, y: missile.targetY, radius: missile.radius || 40 }));
    bossHazards.forEach((hazard) => {
      if (["strike", "field", "well", "portal", "turret", "decoy"].includes(hazard.type)) {
        targets.push({ x: hazard.x, y: hazard.y, radius: Math.min(75, hazard.radius || 30) });
      }
    });
    return targets;
  }

function findDistributedAttackTarget(preferredX, preferredY, clearance, occupied = activeAttackTargets(), bounds = {}) {
    const minX = bounds.minX ?? 48;
    const maxX = bounds.maxX ?? WIDTH - 48;
    const minY = bounds.minY ?? 285;
    const maxY = bounds.maxY ?? HEIGHT - 48;
    const clampX = (value) => Math.max(minX, Math.min(maxX, value));
    const clampY = (value) => Math.max(minY, Math.min(maxY, value));
    const baseX = clampX(preferredX);
    const baseY = clampY(preferredY);
    const candidates = [{ x: baseX, y: baseY }];
    const goldenAngle = 2.399963229728653;
    for (let index = 1; index <= 46; index += 1) {
      const distance = clearance * (0.72 + Math.sqrt(index) * 0.72);
      const angle = index * goldenAngle;
      candidates.push({
        x: clampX(baseX + Math.cos(angle) * distance),
        y: clampY(baseY + Math.sin(angle) * distance)
      });
    }
    const columns = Math.max(3, Math.floor((maxX - minX) / Math.max(65, clearance)));
    const rows = Math.max(3, Math.floor((maxY - minY) / Math.max(65, clearance)));
    for (let row = 0; row <= rows; row += 1) {
      for (let column = 0; column <= columns; column += 1) {
        candidates.push({
          x: minX + (maxX - minX) * (column + (row % 2) * 0.35) / Math.max(1, columns + 0.35),
          y: minY + (maxY - minY) * row / Math.max(1, rows)
        });
      }
    }
    let best = candidates[0];
    let bestScore = -Infinity;
    candidates.forEach((candidate) => {
      let nearestGap = clearance * 2;
      for (let index = 0; index < occupied.length; index += 1) {
        const point = occupied[index];
        const gap = Math.hypot(candidate.x - point.x, candidate.y - point.y) - (point.radius || 0);
        if (gap < nearestGap) nearestGap = gap;
        if (nearestGap < -clearance * 0.35) break;
      }
      const preferredDistance = Math.hypot(candidate.x - baseX, candidate.y - baseY);
      const edgeMargin = Math.min(candidate.x - minX, maxX - candidate.x, candidate.y - minY, maxY - candidate.y);
      const score = Math.min(nearestGap, clearance * 2.4) - preferredDistance * 0.08 + edgeMargin * 0.035;
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    });
    return best;
  }

function bossIsCloaked() {
    return Boolean(boss && (boss.cloakDuration > 0 || (boss.type === "apex" && boss.phaseCloak > 0)));
  }

function updateBossCloaking(dt) {
    if (!boss || bossIntro) return;
    if (boss.cloakDuration > 0) {
      boss.cloakDuration = Math.max(0, boss.cloakDuration - dt);
      return;
    }
    boss.cloakTimer -= dt;
    if (boss.cloakTimer > 0) return;
    const isApex = boss.type === "apex";
    const stageBonus = isApex ? Math.max(0, (boss.phaseStage || 1) - 1) * 0.22 : 0;
    boss.cloakDuration = isApex ? 1.25 + Math.random() * 0.85 + stageBonus : 0.72 + Math.random() * 0.35;
    boss.cloakTimer = isApex ? 5.5 + Math.random() * 4.5 : 10 + Math.random() * 4;
    addExplosion(boss.x, boss.y, boss.color || "#9eeaff", 10);
    playTone(620, 120, 0.18, 0.025, "sine");
    if (boss.type !== "apex" && Math.random() < 0.6) {
      boss.x = Math.max(135, Math.min(WIDTH - 135, boss.x + (Math.random() - 0.5) * WIDTH * 0.52));
    }
  }

function updateApexWander(dt) {
    boss.motionTimer -= dt;
    if (boss.motionTimer <= 0) {
      const stage = boss.phaseStage || 1;
      const intensity = 1 + (stage - 1) * 0.2 + (boss.enraged ? 0.28 : 0);
      boss.motionTargetOffsetX = (Math.random() - 0.5) * 118 * intensity;
      boss.motionTargetOffsetY = (Math.random() - 0.5) * 58 * intensity;
      boss.motionRateTarget = 0.68 + Math.random() * 0.78;
      boss.motionTimer = (boss.enraged ? 0.3 : 0.48) + Math.random() * (boss.enraged ? 0.82 : 1.45);
    }
    const steering = Math.min(1, dt * (boss.enraged ? 4.8 : 3.1));
    boss.motionOffsetX += (boss.motionTargetOffsetX - boss.motionOffsetX) * steering;
    boss.motionOffsetY += (boss.motionTargetOffsetY - boss.motionOffsetY) * steering;
    boss.motionRate += (boss.motionRateTarget - boss.motionRate) * Math.min(1, dt * 1.8);
    boss.motionClock += dt * boss.motionRate;
  }

function updateTargetedBossMotion(dt, options) {
    const minX = options.minX;
    const maxX = options.maxX;
    const minY = options.minY;
    const maxY = options.maxY;
    boss.motionTimer -= dt;
    const dxToTarget = boss.motionTargetX - boss.x;
    const dyToTarget = boss.motionTargetY - boss.y;
    if (boss.motionTimer <= 0 || dxToTarget * dxToTarget + dyToTarget * dyToTarget < 625) {
      let targetX = minX + Math.random() * (maxX - minX);
      let targetY = minY + Math.random() * (maxY - minY);
      if (options.dodgeBullets && bullets.length) {
        let nearest = null;
        let nearestDistance = Infinity;
        for (let index = 0; index < bullets.length; index += 1) {
          const bullet = bullets[index];
          if (bullet.vy >= 0 || bullet.y < boss.y - 30 || bullet.y > boss.y + 320) continue;
          const dx = bullet.x - boss.x;
          const dy = bullet.y - boss.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= nearestDistance) continue;
          nearest = bullet;
          nearestDistance = distanceSquared;
        }
        if (nearest && nearestDistance < 52000) {
          const escapeSide = nearest.x <= boss.x ? 1 : -1;
          targetX = boss.x + escapeSide * (125 + Math.random() * 190);
          targetY = boss.y + (Math.random() - 0.5) * 88;
        }
      }
      boss.motionTargetX = Math.max(minX, Math.min(maxX, targetX));
      boss.motionTargetY = Math.max(minY, Math.min(maxY, targetY));
      boss.motionSpeed = options.minSpeed + Math.random() * (options.maxSpeed - options.minSpeed);
      boss.motionTimer = options.minDelay + Math.random() * (options.maxDelay - options.minDelay);
    }
    const dx = boss.motionTargetX - boss.x;
    const dy = boss.motionTargetY - boss.y;
    const distance = Math.hypot(dx, dy) || 1;
    const speed = boss.motionSpeed || options.minSpeed;
    const desiredVx = dx / distance * speed;
    const desiredVy = dy / distance * speed;
    const steering = Math.min(1, dt * options.steering);
    boss.motionVx += (desiredVx - boss.motionVx) * steering;
    boss.motionVy += (desiredVy - boss.motionVy) * steering;
    boss.x = Math.max(minX, Math.min(maxX, boss.x + boss.motionVx * dt));
    boss.y = Math.max(minY, Math.min(maxY, boss.y + boss.motionVy * dt));
  }

function moveApexBoss(dt) {
    const speed = (boss.enraged ? 1.45 : 1) * (1 + Math.max(0, (boss.phaseStage || 1) - 1) * 0.12);
    updateApexWander(dt);
    const phase = boss.motionClock;
    const offsetX = boss.motionOffsetX;
    const offsetY = boss.motionOffsetY;
    if (boss.movement === "ribbon") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.92) * (WIDTH / 2 - 190) + offsetX;
      boss.y = boss.homeY + Math.sin(phase * 1.84) * 46 + offsetY;
    } else if (boss.movement === "teleport" || boss.movement === "phase") {
      boss.teleportTimer -= dt;
      boss.y = boss.homeY + Math.sin(phase * 1.6) * 28 + offsetY;
      boss.x += offsetX * dt * 0.28;
      if (boss.teleportTimer <= 0) {
        addExplosion(boss.x, boss.y, boss.color, 18);
        boss.x = 120 + Math.random() * (WIDTH - 240);
        boss.y = 95 + Math.random() * 115;
        addExplosion(boss.x, boss.y, "#ffffff", 14);
        boss.teleportTimer = ((boss.movement === "phase" ? 0.7 : 1.25) + Math.random() * (boss.movement === "phase" ? 1.1 : 1.8)) / speed;
      }
    } else if (boss.movement === "dive") {
      boss.dashTimer -= dt;
      if (boss.dashTimer <= 0) {
        const target = targetedPilot();
        boss.dashTargetX = (target?.x ?? WIDTH / 2) + offsetX * 0.55;
        boss.dashTargetY = boss.y < 250 ? 285 + Math.random() * 85 : boss.homeY + offsetY;
        boss.dashTimer = (0.85 + Math.random() * 1.25) / speed;
      }
      boss.x += (boss.dashTargetX - boss.x) * dt * 2.2 * speed;
      boss.y += (boss.dashTargetY - boss.y) * dt * 2.7 * speed;
    } else if (boss.movement === "serpent") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.72) * (WIDTH / 2 - 190) + offsetX;
      boss.y = boss.homeY + Math.sin(phase * 2.15) * 72 + offsetY;
    } else if (boss.movement === "mirror") {
      const target = targetedPilot();
      const desired = (target ? WIDTH - target.x : WIDTH / 2) + offsetX;
      boss.x += (desired - boss.x) * dt * 1.35 * speed;
      boss.y = boss.homeY + Math.sin(phase) * 34 + offsetY;
    } else if (boss.movement === "orbit" || boss.movement === "sun" || boss.movement === "clock") {
      const rate = boss.movement === "clock" ? 1.25 : 0.55;
      boss.x = WIDTH / 2 + Math.cos(phase * rate) * (WIDTH / 2 - 205) + offsetX;
      boss.y = boss.homeY + 55 + Math.sin(phase * rate * 2) * 62 + offsetY;
    } else if (boss.movement === "dash") {
      boss.dashTimer -= dt;
      if (boss.dashTimer <= 0) {
        boss.dashTargetX = 105 + Math.random() * (WIDTH - 210);
        boss.dashTimer = 0.35 + Math.random() * 1.05;
      }
      boss.x += (boss.dashTargetX - boss.x) * dt * 5.4 * speed;
      boss.y = boss.homeY + Math.sin(phase * 3.2) * 34 + offsetY;
    } else if (boss.movement === "hydra") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.48) * (WIDTH / 2 - 220) + offsetX;
      boss.y = boss.homeY + Math.abs(Math.sin(phase * 0.92)) * 62 + offsetY;
    } else if (boss.movement === "pursuit") {
      const target = targetedPilot();
      boss.x += ((target?.x ?? WIDTH / 2) + offsetX - boss.x) * dt * 0.72 * speed;
      boss.y = boss.homeY + Math.sin(phase * 0.7) * 35 + offsetY;
    } else if (boss.movement === "chaos") {
      boss.x = WIDTH / 2 + Math.sin(phase * 1.7) * Math.cos(phase * 0.43) * (WIDTH / 2 - 180) + offsetX;
      boss.y = boss.homeY + 75 + Math.sin(phase * 2.7) * 82 + offsetY;
    } else {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.45) * (WIDTH / 2 - 210) + offsetX;
      boss.y = boss.homeY + Math.sin(phase * 0.83) * 30 + offsetY;
    }
    boss.x = Math.max(105, Math.min(WIDTH - 105, boss.x));
    boss.y = Math.max(85, Math.min(350, boss.y));
  }

function updateApexEvolution(dt) {
    if (!boss || boss.type !== "apex") return;
    const healthRatio = boss.hp / boss.maxHp;
    const desiredStage = healthRatio <= 0.4 ? 3 : healthRatio <= 0.72 ? 2 : 1;
    if (desiredStage > boss.phaseStage) {
      boss.phaseStage = desiredStage;
      boss.evolutionTimer = 1.5;
      enemyBullets = [];
      bossHazards = [];
      bossBombs = [];
      boss.attackTimer = Math.max(boss.attackTimer, 1.4);
      const evolutionName = boss.evolutions[desiredStage - 2] || `PHASE ${desiredStage}`;
      showUltimateBanner(
        `${boss.name} · ${evolutionName}`,
        boss.color,
        language() === "ko" ? "형태 진화" : "FORM EVOLUTION"
      );
      messages.push({
        text: `${language() === "ko" ? "형태 진화" : "FORM EVOLUTION"} · ${evolutionName}`,
        x: WIDTH / 2,
        y: HEIGHT * 0.34,
        life: 2.3,
        color: boss.color,
        fixed: true
      });
      addExplosion(boss.x, boss.y, boss.color, 52);
      if (desiredStage === 3) boss.ultimateTimer = Math.min(boss.ultimateTimer, 2.8);
    }
    if (boss.phaseStage <= 1) return;
    boss.evolutionTimer -= dt;
    if (boss.evolutionTimer > 0) return;
    const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72 };
    const stage = boss.phaseStage;
    if (boss.special === "prism_cage") {
      const colors = ["#78eaff", "#e095ff", "#fff19a"];
      for (let ray = 0; ray < 3 + stage; ray += 1) {
        const angle = Math.atan2(target.y - boss.y, target.x - boss.x) + (ray - (2 + stage) / 2) * 0.14;
        fireApexOrb(angle, 250 + ray * 18, 13 + boss.tier, "boss-orb", {
          effect: "prism_cage", color: colors[ray % colors.length], curve: ray % 2 ? -0.35 : 0.35
        });
      }
      boss.strategy = copy[language()].apexStrategy("FARADAY INDUCTION ARRAY");
    } else if (boss.special === "void_gates") {
      addApexHazard("portal", {
        x: target.x + (Math.random() - 0.5) * 180,
        y: Math.max(180, target.y - 190),
        radius: 32,
        delay: 0.45,
        duration: 1.7 + stage * 0.3,
        damage: 19,
        color: "#b99aff"
      });
      boss.strategy = copy[language()].apexStrategy("FEYNMAN PATH APERTURE");
    } else if (boss.special === "solar_sweep") {
      addApexHazard("beam-v", {
        x: Math.max(45, Math.min(WIDTH - 45, target.x + target.vx * 0.35)),
        width: 18 + stage * 4,
        delay: 0.78,
        duration: 0.42 + stage * 0.08,
        damage: 25,
        color: "#ffc16e"
      });
      boss.strategy = copy[language()].apexStrategy("GALILEAN SOLAR LANCE");
    } else if (boss.special === "frost_domain") {
      addApexHazard("field", {
        x: target.x,
        y: target.y,
        radius: 62 + stage * 13,
        delay: 0.85,
        duration: 2.4,
        damage: 12 + stage * 3,
        pull: -42,
        color: "#9beaff"
      });
      boss.strategy = copy[language()].apexStrategy("MAXWELL ENTROPY FILTER");
    } else if (boss.special === "echo_replay") {
      [-1, 1].forEach((mirror) => {
        const angle = Math.atan2(target.y - boss.y, target.x - (boss.x + mirror * 85));
        fireApexOrb(angle, 235 + stage * 20, 18, "boss-orb", {
          x: boss.x + mirror * 85, y: boss.y + 40, effect: "echo_replay",
          color: boss.color, curve: mirror * 0.32
        });
      });
      boss.strategy = copy[language()].apexStrategy("LOVELACE RECURSIVE ECHO");
    } else if (boss.special === "singularity") {
      addApexHazard("well", {
        x: target.x, y: target.y - 30, radius: 58 + stage * 12,
        delay: 0.75, duration: 2.2, damage: 15 + stage * 2,
        pull: 75 + stage * 25, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("KEPLER MASS FOCUS");
    } else if (boss.special === "chain_lightning") {
      addApexHazard("strike", {
        x: target.x + target.vx * 0.32, y: target.y + target.vy * 0.22,
        radius: 35 + stage * 4, delay: 0.55, duration: 0.18,
        damage: 22 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("TESLA RESONANCE BOLT");
    } else if (boss.special === "future_grid") {
      const predicted = Math.atan2(target.y + target.vy * 0.55 - boss.y, target.x + target.vx * 0.65 - boss.x);
      for (let rune = 0; rune < 2 + stage; rune += 1) {
        fireApexOrb(predicted + (rune - (1 + stage) / 2) * 0.12, 285 + rune * 15, 19, "predictor", {
          effect: "future_grid", color: boss.color, radius: 8, life: 5
        });
      }
      boss.strategy = copy[language()].apexStrategy("TURING DECISION VECTOR");
    } else if (boss.special === "corona_wave") {
      addApexHazard("ring", {
        x: boss.x, y: boss.y, radius: 18, width: 18 + stage * 3,
        delay: 0.55, duration: 1.5, speed: 255 + stage * 35,
        damage: 18 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("CURIE RADIUM HEARTBEAT");
    } else if (boss.special === "hydra_heads") {
      addApexHazard("turret", {
        x: boss.x + (Math.random() - 0.5) * 160, y: boss.y + 80,
        radius: 30, delay: 0.35, duration: 1.8 + stage * 0.4,
        damage: 16 + stage * 2, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("DARWIN ADAPTIVE OFFSPRING");
    } else if (boss.special === "phase_cloak") {
      addApexHazard("decoy", {
        x: target.x + (Math.random() - 0.5) * 220, y: Math.max(120, target.y - 230),
        radius: 30, delay: 0.18, duration: 1.8 + stage * 0.5,
        damage: 17 + stage * 2, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("HEISENBERG POSITION UNKNOWN");
    } else if (boss.special === "time_stop") {
      boss.timeStop = Math.max(boss.timeStop, 0.42 + stage * 0.16);
      addApexHazard("clock", {
        x: target.x, y: target.y, radius: 125, delay: 0.05,
        duration: 0.55 + stage * 0.18, damage: 0, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("EINSTEIN TIME DILATION");
    } else if (boss.special === "black_hole") {
      addApexHazard("well", {
        x: target.x, y: target.y, radius: 78 + stage * 12,
        delay: 0.72, duration: 2.6, damage: 18 + stage * 3,
        pull: 120 + stage * 32, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("HAWKING MASS EVAPORATION");
    } else if (boss.special === "scythe_cross") {
      addApexHazard("sweep", {
        x: target.x, y: target.y, angle: Math.atan2(target.vy || 1, target.vx || 1),
        width: 18 + stage * 3, delay: 0.65, duration: 1.25,
        speed: stage % 2 ? 2.4 : -2.4, damage: 20 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("ARCHIMEDES FULCRUM SWEEP");
    } else if (boss.special === "molten_floor") {
      addApexHazard("field", {
        x: target.x, y: target.y, radius: 58 + stage * 8,
        delay: 0.72, duration: 2.7 + stage * 0.35,
        damage: 16 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("OPPENHEIMER CRITICAL LEAK");
    } else if (boss.special === "quantum_decoys") {
      for (let clone = 0; clone < stage; clone += 1) {
        addApexHazard("decoy", {
          x: 80 + Math.random() * (WIDTH - 160), y: 120 + Math.random() * 180,
          radius: 28, delay: 0.2 + clone * 0.12, duration: 1.8,
          damage: 17 + stage * 2, color: boss.color
        });
      }
      boss.strategy = copy[language()].apexStrategy("SCHRODINGER STATE ECHO");
    } else if (boss.special === "shrinking_world") {
      const side = Math.random() < 0.5 ? 1 : -1;
      fireApexOrb(side > 0 ? 0 : Math.PI, 270 + stage * 25, 21 + stage * 2, "boss-orb", {
        x: side > 0 ? 10 : WIDTH - 10, y: target.y,
        effect: "shrinking_world", color: boss.color, radius: 12, accel: 35
      });
      boss.strategy = copy[language()].apexStrategy("RAMANUJAN CONVERGENCE");
    } else if (boss.special === "absolute_zero") {
      addApexHazard(stage === 3 ? "ring" : "strike", {
        x: stage === 3 ? boss.x : target.x,
        y: stage === 3 ? boss.y : target.y,
        radius: stage === 3 ? 20 : 42,
        width: 26,
        delay: 0.65,
        duration: stage === 3 ? 1.8 : 0.2,
        speed: stage === 3 ? 340 : 0,
        damage: 24 + stage * 3,
        color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("BOHR GROUND-STATE LEAK");
    }
    boss.evolutionTimer = (stage === 3 ? 2.8 : 4.2) + Math.random() * 0.8;
  }

function updateApexBoss(dt) {
    if (!boss || boss.type !== "apex") return;
    boss.phase += dt;
    boss.hitFlash = Math.max(0, boss.hitFlash - dt * 5);
    const healthRatio = boss.hp / boss.maxHp;
    if (healthRatio <= 0.5 && !boss.enraged) {
      boss.enraged = true;
      boss.attackTimer = Math.min(0.55, boss.attackTimer);
      messages.push({
        text: `${boss.name} · AI OVERDRIVE`,
        x: WIDTH / 2,
        y: HEIGHT * 0.36,
        life: 2.1,
        color: boss.color,
        fixed: true
      });
      screenFlash = 0.7;
    }
    boss.phaseCloak = Math.max(0, boss.phaseCloak - dt);
    boss.timeStop = Math.max(0, boss.timeStop - dt);
    updateApexEvolution(dt);
    moveApexBoss(dt);
    if (boss.followupAttack) {
      boss.followupAttack.timer -= dt;
      if (boss.followupAttack.timer <= 0) {
        const followupPattern = boss.followupAttack.pattern;
        boss.followupAttack = null;
        launchApexPattern(followupPattern, true);
      }
    }
    boss.attackTimer -= dt;
    if (boss.attackTimer <= 0 && !boss.ultimateSequence?.length && !boss.followupAttack) {
      launchApexPattern();
      const baseDelay = Math.max(0.68, 1.9 - boss.tier * 0.045);
      const evolutionRate = 1 - Math.max(0, boss.phaseStage - 1) * 0.09;
      const comboChance = boss.phaseStage === 3 ? 0.46 : boss.phaseStage === 2 ? 0.3 : 0.16;
      if (Math.random() < comboChance) {
        const nextPatterns = [0, 1, 2].filter((variant) => variant !== boss.lastPattern);
        boss.followupAttack = {
          timer: 0.28 + Math.random() * 0.34,
          pattern: nextPatterns[Math.floor(Math.random() * nextPatterns.length)]
        };
      }
      const burstTempo = Math.random() < (boss.enraged ? 0.4 : 0.22);
      boss.attackTimer = burstTempo
        ? 0.48 + Math.random() * 0.34
        : baseDelay * (boss.enraged ? 0.58 : 1) * evolutionRate * (0.78 + Math.random() * 0.52);
    }
    for (let index = bossBombs.length - 1; index >= 0; index -= 1) {
      const bomb = bossBombs[index];
      bomb.timer -= dt;
      bomb.phase += dt * 5;
      if (bomb.timer > 0) continue;
      addExplosion(bomb.x, bomb.y, bomb.color || boss.color, 42);
      players.forEach((pilot) => {
        if (pilot.alive && Math.hypot(pilot.x - bomb.x, pilot.y - bomb.y) <= bomb.radius + pilot.collisionRadius) {
          damagePlayer(pilot, bomb.damage);
        }
      });
      screenFlash = Math.max(screenFlash, 0.42);
      playNoise(0.42, 0.08, 720);
      bossBombs.splice(index, 1);
    }
  }

function updateBoss2(dt) {
    if (!boss || boss.type !== "station") return;
    boss.phase += dt;
    boss.hitFlash = Math.max(0, boss.hitFlash - dt * 5);
    const halfHealth = boss.hp <= boss.maxHp * 0.5;
    if (halfHealth && !boss.enraged) {
      boss.enraged = true;
      boss.minionTimer = Math.min(boss.minionTimer, 0.8);
      boss.missileTimer = Math.min(boss.missileTimer, 1.9);
      messages.push({
        text: copy[language()].boss2Overdrive,
        x: WIDTH / 2,
        y: HEIGHT * 0.36,
        life: 2.3,
        color: "#8dc9ff",
        fixed: true
      });
      screenFlash = 0.75;
      playTone(270, 62, 0.8, 0.1, "sawtooth");
    }

    updateTargetedBossMotion(dt, {
      minX: 210,
      maxX: WIDTH - 210,
      minY: 112,
      maxY: 245,
      dodgeBullets: halfHealth,
      minDelay: halfHealth ? 0.42 : 0.9,
      maxDelay: halfHealth ? 1.35 : 2.6,
      minSpeed: halfHealth ? 92 : 34,
      maxSpeed: halfHealth ? 138 : 62,
      steering: halfHealth ? 4.2 : 2.5
    });

    boss.minionTimer -= dt;
    const assaultCount = enemies.filter((enemy) => enemy.type === "assault").length;
    if (boss.minionTimer <= 0 && assaultCount < 7) {
      spawnAssaultDrone();
      boss.minionTimer = boss.enraged ? 1.15 : 1.65;
    }

    boss.missileTimer -= dt;
    if (boss.missileTimer <= 0) {
      launchBoss2Missiles();
      boss.missileTimer = boss.enraged ? 3.1 : 4.8;
    }

    boss.tacticTimer -= dt;
    if (boss.tacticTimer <= 0 && !boss.ultimateSequence?.length) {
      const tacticChoices = [0, 1, 2].filter((tactic) => tactic !== boss.lastTactic);
      const tactic = tacticChoices[Math.floor(Math.random() * tacticChoices.length)];
      boss.lastTactic = tactic;
      const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72, vx: 0, vy: 0 };
      if (tactic === 0) {
        spawnBossPredictiveVolley();
        if (boss.enraged) {
          addApexHazard("strike", {
            x: target.x + target.vx * 0.28, y: target.y + target.vy * 0.2,
            radius: 46, delay: 0.68, duration: 0.2, damage: 30, color: "#8cdcff"
          });
        }
      } else if (tactic === 1) {
        const side = Math.random() < 0.5 ? 1 : -1;
        addApexHazard("sweep", {
          x: target.x, y: target.y,
          angle: side > 0 ? Math.PI * 0.22 : Math.PI * 0.78,
          width: 24, delay: 0.75, duration: 1.35,
          speed: side * (boss.enraged ? 2.5 : 1.8),
          damage: 30, color: "#78cfff"
        });
      } else {
        const count = boss.enraged ? 15 : 11;
        for (let shot = 0; shot < count; shot += 1) {
          const angle = shot / count * Math.PI * 2 + boss.phase * 0.45;
          fireApexOrb(angle, 165 + (shot % 3) * 34, 18, "boss-orb", {
            color: "#acdfff", radius: 7, curve: shot % 2 ? -0.22 : 0.22
          });
        }
      }
      boss.tacticTimer = (boss.enraged ? 2.5 : 3.6) + Math.random() * 1.4;
    }

    for (let index = bossMissiles.length - 1; index >= 0; index -= 1) {
      const missile = bossMissiles[index];
      missile.progress += dt / missile.duration;
      if (missile.progress < 0) continue;
      const t = Math.min(1, missile.progress);
      const inverse = 1 - t;
      missile.x = inverse * inverse * missile.startX + 2 * inverse * t * missile.controlX + t * t * missile.targetX;
      missile.y = inverse * inverse * missile.startY + 2 * inverse * t * missile.controlY + t * t * missile.targetY;
      missile.trailTick = (missile.trailTick || 0) + 1;
      const trailSampleRate = renderQuality < 0.55 ? 3 : renderQuality < 0.8 ? 2 : 1;
      if (missile.trailTick % trailSampleRate === 0) {
        missile.trail.push({ x: missile.x, y: missile.y });
        const trailLimit = renderQuality < 0.55 ? 9 : renderQuality < 0.8 ? 15 : 24;
        if (missile.trail.length > trailLimit) missile.trail.shift();
      }
      if (t < 1) continue;
      addExplosion(missile.targetX, missile.targetY, "#9fdcff", 46);
      addExplosion(missile.targetX, missile.targetY, "#ffbc7d", 34);
      players.forEach((pilot) => {
        if (pilot.alive && Math.hypot(pilot.x - missile.targetX, pilot.y - missile.targetY) <= missile.radius + pilot.collisionRadius) {
          damagePlayer(pilot, 42 * boss.damageScale);
        }
      });
      screenFlash = Math.max(screenFlash, 0.55);
      playTone(92, 34, 0.55, 0.1, "sawtooth");
      playNoise(0.55, 0.09, 720);
      bossMissiles.splice(index, 1);
    }
  }

function defeatBoss() {
    if (!boss) return;
    const defeatedBoss = boss;
    const isBoss2 = defeatedBoss.type === "station";
    const isApex = defeatedBoss.type === "apex";
    addExplosion(defeatedBoss.x, defeatedBoss.y, "#ffd0a2", 85);
    addExplosion(defeatedBoss.x - 72, defeatedBoss.y + 18, "#dff8ff", 42);
    addExplosion(defeatedBoss.x + 72, defeatedBoss.y + 18, "#dff8ff", 42);
    score += isApex ? 18000 + defeatedBoss.tier * 6500 : isBoss2 ? 25000 : 10000;
    kills += 1;
    players.filter((pilot) => pilot.alive).forEach((pilot) => {
      pilot.health = pilot.maxHealth;
    });
    boss = null;
    bossIntro = null;
    ultimateBanner = null;
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
    enemyBullets = [];
    if (isApex) {
      defeatedApexTiers.add(defeatedBoss.tier);
    } else if (isBoss2) {
      enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, "#a9def4", 16));
      enemies = [];
      boss2Defeated = true;
    } else {
      bossDefeated = true;
    }
    spawnTimer = 2.4;
    screenFlash = 1;
    messages.push({
      text: isApex
        ? copy[language()].apexDefeated(defeatedBoss.name)
        : isBoss2 ? copy[language()].boss2Defeated : copy[language()].bossDefeated,
      x: WIDTH / 2,
      y: HEIGHT * 0.42,
      life: 2.6,
      color: "#fff0bd",
      fixed: true
    });
    playTone(150, 42, 0.9, 0.13, "sawtooth");
    playNoise(0.9, 0.14, 700);
    updateHud();
  }

function updateBoss(dt) {
    if (!boss) return;
    if (bossIntro && updateBossIntro(dt)) return;
    updateBossUltimate(dt);
    updateBossCloaking(dt);
    updateBossUltimateSequence(dt);
    updateBossHazards(dt);
    const actionDt = boss.type === "apex"
      ? dt * (1.26 + Math.max(0, (boss.phaseStage || 1) - 1) * 0.06)
      : dt;
    if (boss.type === "apex") {
      updateApexBoss(actionDt);
      return;
    }
    if (boss.type === "station") {
      updateBoss2(actionDt);
      return;
    }
    dt = actionDt;
    boss.phase += dt;
    boss.hitFlash = Math.max(0, boss.hitFlash - dt * 5);
    boss.attackTimer -= dt;

    if (boss.hp <= boss.maxHp * 0.5 && !boss.enraged) {
      boss.enraged = true;
      boss.attackTimer = Math.min(boss.attackTimer, 1.1);
      boss.bombNextTimer *= 0.82;
      boss.volleyNextTimer *= 0.82;
      boss.lasers.forEach((laser) => {
        laser.charge *= 0.84;
        laser.maxCharge *= 0.84;
        laser.beamSpeed *= 1.1;
      });
      messages.push({
        text: copy[language()].bossOverdrive,
        x: WIDTH / 2,
        y: HEIGHT * 0.38,
        life: 2.1,
        color: "#ff9b7d",
        fixed: true
      });
      screenFlash = Math.max(screenFlash, 0.65);
      playTone(220, 68, 0.75, 0.1, "sawtooth");
      playNoise(0.55, 0.075, 850);
    }

    const colossusEnraged = boss.hp <= boss.maxHp * 0.5;
    updateTargetedBossMotion(dt, {
      minX: 145,
      maxX: WIDTH - 145,
      minY: 125,
      maxY: 205,
      dodgeBullets: colossusEnraged,
      minDelay: colossusEnraged ? 0.38 : 1.05,
      maxDelay: colossusEnraged ? 1.2 : 2.75,
      minSpeed: colossusEnraged ? 68 : 24,
      maxSpeed: colossusEnraged ? 102 : 48,
      steering: colossusEnraged ? 4.6 : 2.2
    });

    if (boss.lasers.length) {
      const beamTop = boss.y + 54;
      const maximumLength = HEIGHT - beamTop;
      boss.lasers.forEach((laser) => {
        if (laser.finished) return;
        if (laser.charge > 0) {
          laser.charge -= dt;
          if (laser.charge <= 0) {
            laser.firing = true;
            playTone(920 + Math.random() * 260, 90 + Math.random() * 75, 0.42, 0.075, "sawtooth");
            playNoise(0.32, 0.028, 1500 + Math.random() * 500);
          }
          return;
        }

        if (laser.firing) {
          laser.length = Math.min(maximumLength, laser.length + laser.beamSpeed * dt);
          players.forEach((pilot) => {
            if (!pilot.alive || pilot.y < beamTop || pilot.y > beamTop + laser.length) return;
            if (Math.abs(pilot.x - laser.x) <= laser.width / 2 + pilot.collisionRadius) {
              damagePlayer(pilot, 32 * boss.damageScale);
            }
          });
          if (laser.length >= maximumLength) {
            laser.linger -= dt;
            if (laser.linger <= 0) laser.finished = true;
          }
        }
      });
      boss.lasers = boss.lasers.filter((laser) => !laser.finished);
      if (boss.laserBarrageActive && boss.lasers.length === 0) {
        boss.laserBarrageActive = false;
        boss.attackTimer = boss.hp <= boss.maxHp * 0.5 ? 1.15 : 2.2;
      }
    }

    if (boss.bombShotsRemaining > 0) {
      boss.bombNextTimer -= dt;
      if (boss.bombNextTimer <= 0) {
        boss.bombShotsRemaining -= 1;
        throwBossBomb();
        if (boss.bombShotsRemaining > 0) {
          const bombDelay = 0.48 + Math.random() * 0.48;
          boss.bombNextTimer = bombDelay * (boss.hp <= boss.maxHp * 0.5 ? 0.82 : 1);
        } else {
          boss.attackTimer = boss.hp <= boss.maxHp * 0.5 ? 1.3 : 2.5;
        }
      }
    }

    if (boss.volleyShotsRemaining > 0) {
      boss.volleyNextTimer -= dt;
      if (boss.volleyNextTimer <= 0) {
        boss.volleyShotsRemaining -= 1;
        if (boss.volleyKind === "predictive") spawnBossPredictiveVolley();
        else if (boss.volleyKind === "seeker") spawnBossSeekerVolley();
        else if (boss.volleyKind === "cyclone") spawnBossCycloneVolley();
        else spawnBossSpiralVolley();
        if (boss.volleyShotsRemaining > 0) {
          const volleyDelay = boss.volleyKind === "seeker" ? 0.9 : boss.volleyKind === "cyclone" ? 0.72 : 0.48 + Math.random() * 0.34;
          boss.volleyNextTimer = volleyDelay * (boss.hp <= boss.maxHp * 0.5 ? 0.82 : 1);
        } else {
          boss.attackTimer = boss.hp <= boss.maxHp * 0.5 ? 1.25 : 2.35;
        }
      }
    }

    const sequenceActive = (
      boss.laserBarrageActive
      || boss.lasers.length > 0
      || boss.bombShotsRemaining > 0
      || boss.volleyShotsRemaining > 0
      || boss.ultimateSequence?.length > 0
    );
    if (boss.attackTimer <= 0 && !sequenceActive) {
      chooseBossPattern();
    }

    for (let index = bossBombs.length - 1; index >= 0; index -= 1) {
      const bomb = bossBombs[index];
      bomb.timer -= dt;
      bomb.phase += dt * 5;
      if (bomb.timer > 0) continue;
      addExplosion(bomb.x, bomb.y, "#ffad73", 34);
      addExplosion(bomb.x, bomb.y, "#fff0bd", 18);
      players.forEach((pilot) => {
        if (!pilot.alive) return;
        const distance = Math.hypot(pilot.x - bomb.x, pilot.y - bomb.y);
        if (distance <= bomb.radius + pilot.collisionRadius) damagePlayer(pilot, 32 * boss.damageScale);
      });
      screenFlash = Math.max(screenFlash, 0.42);
      playTone(105, 42, 0.42, 0.085, "sawtooth");
      playNoise(0.42, 0.08, 620);
      bossBombs.splice(index, 1);
    }
  }
