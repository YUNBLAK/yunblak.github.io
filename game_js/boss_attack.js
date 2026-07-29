/**
 * Frost Wing — boss attack
 * Boss weapons, ultimates, tactical patterns, hazards, missiles, and minions.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function fireApexOrb(angle, speed, damage, kind = "boss-orb", options = {}) {
    if (enemyBullets.length >= enemyBulletBudget()) return null;
    const bullet = {
      x: options.x ?? boss.x,
      y: options.y ?? boss.y + 55,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: options.radius ?? (kind === "seeker" ? 7 : 6),
      collisionRadius: 5,
      damage,
      kind,
      effect: options.effect ?? boss.special,
      color: options.color ?? boss.color,
      accel: options.accel ?? 0,
      curve: options.curve ?? 0,
      age: options.age ?? 0,
      life: options.life
    };
    enemyBullets.push(bullet);
    return bullet;
  }

function addApexHazard(type, options = {}) {
    if (bossHazards.length >= bossHazardBudget()) return;
    const shouldDistribute = options.avoidOverlap !== false
      && ["strike", "field", "well", "portal", "turret", "decoy"].includes(type);
    const desiredX = options.x ?? WIDTH / 2;
    const desiredY = options.y ?? HEIGHT / 2;
    const hazardRadius = options.radius ?? 70;
    const distributed = shouldDistribute
      ? findDistributedAttackTarget(
          desiredX,
          desiredY,
          Math.max(70, Math.min(145, hazardRadius * 1.3)),
          activeAttackTargets(),
          {
            minX: Math.max(38, Math.min(100, hazardRadius * 0.65)),
            maxX: WIDTH - Math.max(38, Math.min(100, hazardRadius * 0.65)),
            minY: type === "portal" || type === "turret" || type === "decoy" ? 95 : 285,
            maxY: type === "portal" || type === "turret" || type === "decoy" ? Math.min(HEIGHT - 80, 470) : HEIGHT - 48
          }
        )
      : { x: desiredX, y: desiredY };
    bossHazards.push({
      type,
      x: distributed.x,
      y: distributed.y,
      radius: hazardRadius,
      width: options.width ?? 46,
      angle: options.angle ?? 0,
      delay: options.delay ?? 1.15,
      duration: options.duration ?? 0.8,
      maxDelay: options.delay ?? 1.15,
      maxDuration: options.duration ?? 0.8,
      damage: options.damage ?? 26,
      color: options.color ?? boss.color,
      speed: options.speed ?? 0,
      pull: options.pull ?? 0,
      safeRadius: options.safeRadius ?? 115,
      hitTimer: 0,
      phase: options.phase ?? Math.random() * Math.PI * 2,
      active: false
    });
  }

function launchApexSpecial(special) {
    if (!boss || boss.type !== "apex") return;
    const tier = boss.tier;
    const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72 };
    const damage = 20 + tier * 1.45;
    const stage = boss.phaseStage || 1;
    boss.specialCount += 1;

    if (special === "prism_cage") {
      const safeX = Math.max(95, Math.min(WIDTH - 95, target.x));
      [safeX - 105, safeX + 105].forEach((x, index) => {
        addApexHazard("beam-v", { x, width: 30, delay: 1.25 + index * 0.12, duration: 1.8, damage, color: "#8beaff" });
      });
      addApexHazard("beam-h", { y: Math.max(360, target.y - 120), width: 24, delay: 1.45, duration: 1.25, damage, color: "#f3a8ff" });
      if (stage >= 2) {
        addApexHazard("ring", { x: target.x, y: target.y, radius: 18, width: 20, delay: 1.8, duration: 1.4, speed: 290, damage, color: "#fff09a" });
      }
      if (stage >= 3) {
        addApexHazard("sweep", { x: target.x, y: target.y, angle: Math.PI * 0.22, width: 22, delay: 2.15, duration: 1.8, speed: -1.8, damage, color: "#9df7ff" });
      }
    } else if (special === "void_gates") {
      for (let index = 0; index < 3 + stage * 2; index += 1) {
        const x = 65 + Math.random() * (WIDTH - 130);
        addApexHazard("portal", { x, y: 210 + index * 82, angle: index % 2 ? Math.PI : 0, delay: 0.75 + index * 0.14, duration: 1.2 + stage * 0.25, damage, color: "#b798ff" });
      }
    } else if (special === "solar_sweep") {
      addApexHazard("sweep", { x: boss.x, y: boss.y, angle: Math.PI * 0.2, width: 32, delay: 1.25, duration: 2.15, damage: damage + 4, speed: 1.45, color: "#ffbd73" });
      if (stage >= 2) {
        addApexHazard("sweep", {
          x: boss.x, y: boss.y, angle: Math.PI * 0.8, width: 24 + stage * 3,
          delay: stage === 3 ? 1.45 : 1.8, duration: 2.1, damage: damage + 3,
          speed: stage === 3 ? -2.05 : -1.35, color: "#fff0a3"
        });
      }
    } else if (special === "frost_domain") {
      for (let domain = 0; domain < stage; domain += 1) {
        addApexHazard("field", {
          x: target.x + (domain - (stage - 1) / 2) * 135,
          y: target.y + Math.sin(domain * 2.2) * 70,
          radius: stage === 1 ? 150 : 105,
          delay: 1.05 + domain * 0.24,
          duration: 3.6 + stage * 0.35,
          damage: damage * 0.55,
          pull: -42,
          color: "#8fe5ff"
        });
      }
      if (stage >= 3) {
        addApexHazard("ring", { x: boss.x, y: boss.y, radius: 20, width: 26, delay: 1.75, duration: 1.8, speed: 315, damage, color: "#e8fdff" });
      }
    } else if (special === "echo_replay") {
      const remembered = boss.lastPattern ?? 1;
      setTimeout(() => {
        if (!boss || boss.type !== "apex" || boss.special !== "echo_replay") return;
        launchApexPattern(remembered, true);
      }, 420);
      setTimeout(() => {
        if (!boss || boss.type !== "apex" || boss.special !== "echo_replay") return;
        launchApexPattern(remembered, true);
      }, 900);
    } else if (special === "singularity") {
      for (let orbit = 0; orbit < 3; orbit += 1) {
        const angle = orbit / 3 * Math.PI * 2 + boss.phase;
        addApexHazard("well", {
          x: target.x + Math.cos(angle) * 115,
          y: target.y + Math.sin(angle) * 90,
          radius: 72,
          delay: 0.9 + orbit * 0.22,
          duration: 2.8,
          damage: damage * 0.72,
          pull: 92,
          color: "#9ba8ff"
        });
      }
    } else if (special === "black_hole") {
      addApexHazard("well", {
        x: target.x,
        y: target.y - 35,
        radius: 175,
        delay: 1.35,
        duration: 4.8,
        damage,
        pull: 235,
        color: "#7054c7"
      });
    } else if (special === "chain_lightning") {
      livingPilots().forEach((pilot, pilotIndex) => {
        for (let strike = 0; strike < 4; strike += 1) {
          addApexHazard("strike", {
            x: Math.max(38, Math.min(WIDTH - 38, pilot.x + (Math.random() - 0.5) * 190)),
            y: Math.max(260, Math.min(HEIGHT - 38, pilot.y + (Math.random() - 0.5) * 150)),
            radius: 43,
            delay: 0.65 + strike * 0.38 + pilotIndex * 0.12,
            duration: 0.22,
            damage,
            color: "#80ffe5"
          });
        }
      });
    } else if (special === "future_grid") {
      const safeColumn = Math.floor(Math.random() * 5);
      for (let column = 0; column < 5; column += 1) {
        if (column === safeColumn) continue;
        addApexHazard("beam-v", { x: WIDTH * (column + 0.5) / 5, width: WIDTH / 5 - 18, delay: 1.7, duration: 0.85, damage, color: "#c68aff" });
      }
      addApexHazard("beam-h", { y: 350 + Math.random() * (HEIGHT - 470), width: 42, delay: 2.65, duration: 0.65, damage, color: "#e8b7ff" });
    } else if (special === "corona_wave") {
      for (let ring = 0; ring < 3; ring += 1) {
        addApexHazard("ring", { x: boss.x, y: boss.y, radius: 18, delay: 0.7 + ring * 0.62, duration: 1.5, damage, speed: 330 + ring * 35, width: 26, color: "#ffad66" });
      }
    } else if (special === "hydra_heads") {
      for (let head = 0; head < 5; head += 1) {
        addApexHazard("turret", { x: boss.x + (head - 2) * 48, y: boss.y + 42 + Math.abs(head - 2) * 10, delay: 0.55 + head * 0.12, duration: 3.2, damage, phase: head, color: "#75e4aa" });
      }
    } else if (special === "phase_cloak") {
      boss.phaseCloak = 3.4;
      for (let clone = 0; clone < 4; clone += 1) {
        addApexHazard("decoy", { x: 95 + Math.random() * (WIDTH - 190), y: 130 + Math.random() * 170, delay: 0.2, duration: 3.2, damage, phase: clone, color: "#a7c9ff" });
      }
    } else if (special === "time_stop") {
      boss.timeStop = 2.2;
      addApexHazard("clock", {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        radius: Math.min(WIDTH, HEIGHT) * 0.3,
        delay: 0.15,
        duration: 2.2,
        damage: 0,
        color: "#f1db79",
        avoidOverlap: false
      });
    } else if (special === "scythe_cross") {
      addApexHazard("sweep", { x: target.x, y: target.y, angle: 0, width: 28, delay: 1.05, duration: 2.1, damage, speed: 2.25, color: "#79f0c6" });
      addApexHazard("sweep", { x: target.x, y: target.y, angle: Math.PI / 2, width: 28, delay: 1.05, duration: 2.1, damage, speed: -2.25, color: "#c3ffe8" });
    } else if (special === "molten_floor") {
      for (let pool = 0; pool < 7; pool += 1) {
        addApexHazard("field", { x: 55 + Math.random() * (WIDTH - 110), y: HEIGHT * 0.46 + Math.random() * (HEIGHT * 0.49), radius: 48 + Math.random() * 30, delay: 0.8 + pool * 0.17, duration: 4.5, damage: damage * 0.62, color: "#ff765e" });
      }
    } else if (special === "quantum_decoys") {
      for (let clone = 0; clone < 6; clone += 1) {
        addApexHazard("decoy", { x: 70 + Math.random() * (WIDTH - 140), y: 110 + Math.random() * 260, delay: 0.35 + clone * 0.12, duration: 3.4, damage, phase: clone * 1.3, color: "#63d8ff" });
      }
      boss.phaseCloak = 1.8;
    } else if (special === "shrinking_world") {
      addApexHazard("safezone", { x: target.x, y: target.y, safeRadius: 185, delay: 1.6, duration: 5.2, damage: damage * 0.65, speed: 18, color: "#ff7898" });
    } else if (special === "absolute_zero") {
      addApexHazard("safezone", { x: WIDTH / 2, y: HEIGHT * 0.68, safeRadius: 150, delay: 1.5, duration: 4.5, damage, speed: 22, color: "#dffcff" });
      addApexHazard("sweep", { x: WIDTH / 2, y: HEIGHT * 0.55, angle: 0, width: 26, delay: 2.05, duration: 2.5, damage, speed: 2.6, color: "#a9ebff" });
      for (let strike = 0; strike < 5; strike += 1) {
        addApexHazard("strike", { x: 60 + Math.random() * (WIDTH - 120), y: 300 + Math.random() * (HEIGHT - 360), radius: 48, delay: 0.7 + strike * 0.45, duration: 0.25, damage, color: "#ffffff" });
      }
    }
    playTone(110 + tier * 9, 860, 0.65, 0.085, "sawtooth");
    screenFlash = Math.max(screenFlash, 0.32);
  }

function showUltimateBanner(title, color, label = null) {
    ultimateBanner = {
      title,
      color,
      label,
      life: 2.5,
      maxLife: 2.5
    };
    screenFlash = Math.max(screenFlash, 0.48);
    playTone(92, 620, 0.75, 0.09, "sawtooth");
    playNoise(0.38, 0.065, 760);
  }

function launchBossUltimate() {
    if (!boss || bossIntro) return;
    boss.ultimateCount += 1;
    boss.lasers = [];
    boss.ultimateSequence = [];
    boss.followupAttack = null;
    boss.attackTimer = Math.max(boss.attackTimer || 0, 4.8);
    if (boss.type === "colossus") {
      boss.laserBarrageActive = false;
      boss.bombShotsRemaining = 0;
      boss.volleyShotsRemaining = 0;
    }
    if (boss.type === "colossus") {
      const safeLane = Math.floor(Math.random() * 5);
      const laneWidth = WIDTH / 5;
      for (let lane = 0; lane < 5; lane += 1) {
        if (lane === safeLane) continue;
        addApexHazard("beam-v", {
          x: laneWidth * (lane + 0.5),
          width: laneWidth - 18,
          delay: 1.65 + Math.abs(lane - safeLane) * 0.08,
          duration: 1.45,
          damage: 38,
          color: "#8eeaff"
        });
      }
      addApexHazard("ring", {
        x: boss.x, y: boss.y, radius: 20, width: 30,
        delay: 2.35, duration: 1.7, speed: 350, damage: 34, color: "#dffbff"
      });
      boss.ultimateSequence = [
        { timer: 0.72, kind: "colossus-fan" },
        { timer: 1.65, kind: "newton-gravity" }
      ];
    } else if (boss.type === "station") {
      const targets = livingPilots();
      const occupied = activeAttackTargets();
      const count = 6;
      for (let strike = 0; strike < count; strike += 1) {
        const pilot = targets[strike % Math.max(1, targets.length)] || { x: WIDTH / 2, y: HEIGHT * 0.7 };
        const point = findDistributedAttackTarget(
          pilot.x + Math.cos(strike * 2.4) * (55 + strike * 11),
          pilot.y + Math.sin(strike * 2.4) * (45 + strike * 9),
          82,
          occupied
        );
        occupied.push({ ...point, radius: 38 });
        addApexHazard("strike", {
          x: point.x, y: point.y, radius: 38,
          delay: 1 + strike * 0.18, duration: 0.2, damage: 36, color: "#78cfff",
          avoidOverlap: false
        });
      }
      boss.ultimateSequence = [
        { timer: 0.72, kind: "station-missiles" },
        { timer: 1.75, kind: "station-replicate" }
      ];
    } else {
      launchApexSpecial(boss.special);
      const variants = [0, 1, 2].sort(() => Math.random() - 0.5);
      boss.ultimateSequence = [
        { timer: 0.42, kind: "apex-pattern", pattern: variants[0] },
        { timer: 0.96, kind: "apex-pattern", pattern: variants[1] },
        { timer: 1.55, kind: "apex-pattern", pattern: variants[2] },
        { timer: 2.25, kind: "apex-special" }
      ];
    }
    screenFlash = Math.max(screenFlash, 0.72);
    playNoise(0.6, 0.08, 980);
  }

function updateBossUltimateSequence(dt) {
    if (!boss?.ultimateSequence?.length) return;
    for (let index = boss.ultimateSequence.length - 1; index >= 0; index -= 1) {
      const step = boss.ultimateSequence[index];
      step.timer -= dt;
      if (step.timer > 0) continue;
      boss.ultimateSequence.splice(index, 1);
      if (!boss) return;
      if (step.kind === "apex-pattern" && boss.type === "apex") {
        launchApexPattern(step.pattern, true);
      } else if (step.kind === "apex-special" && boss.type === "apex") {
        launchApexSpecial(boss.special);
      } else if (
        step.kind === "einstein-black-hole-burst"
        && boss.type === "apex"
        && boss.special === "time_stop"
      ) {
        const centerX = boss.rareBlackHoleX ?? WIDTH / 2;
        const centerY = boss.rareBlackHoleY ?? HEIGHT * 0.64;
        const count = 10 + Math.min(4, boss.phaseStage * 2);
        for (let graviton = 0; graviton < count; graviton += 1) {
          const angle = graviton / count * Math.PI * 2 + boss.phase * 0.35;
          fireApexOrb(angle, 115 + (graviton % 3) * 26, 16 + boss.tier, "boss-orb", {
            x: centerX,
            y: centerY,
            effect: "black_hole",
            color: "#8d72e8",
            radius: 9,
            curve: graviton % 2 ? -0.24 : 0.24,
            accel: 20,
            life: 6.5
          });
        }
      } else if (step.kind === "colossus-fan" && boss.type === "colossus") {
        spawnBossSpread();
        const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72 };
        const aimed = Math.atan2(target.y - boss.y, target.x - boss.x);
        for (let shot = -3; shot <= 3; shot += 1) {
          fireApexOrb(aimed + shot * 0.11, 240 + Math.abs(shot) * 14, 18, "boss-orb", {
            color: "#a9efff",
            radius: 8,
            curve: shot * 0.045
          });
        }
      } else if (step.kind === "colossus-cross" && boss.type === "colossus") {
        const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72 };
        addApexHazard("sweep", {
          x: target.x, y: target.y, angle: Math.PI * 0.18, width: 28,
          delay: 0.62, duration: 1.65, speed: 2.25, damage: 36, color: "#8eeaff"
        });
        addApexHazard("sweep", {
          x: target.x, y: target.y, angle: Math.PI * 0.82, width: 28,
          delay: 0.82, duration: 1.65, speed: -2.25, damage: 36, color: "#ffd09f"
        });
      } else if (step.kind === "colossus-bombs" && boss.type === "colossus") {
        for (let bomb = 0; bomb < 3; bomb += 1) throwBossBomb();
      } else if (step.kind === "newton-gravity" && boss.type === "colossus") {
        const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.7 };
        addApexHazard("well", {
          x: target.x, y: target.y, radius: 105,
          delay: 0.9, duration: 2.7, damage: 28,
          pull: 120, color: "#a9efff"
        });
        addApexHazard("ring", {
          x: target.x, y: target.y, radius: 18, width: 24,
          delay: 1.1, duration: 1.7, speed: 285,
          damage: 28, color: "#ffd38f"
        });
      } else if (step.kind === "station-missiles" && boss.type === "station") {
        launchBoss2Missiles();
      } else if (step.kind === "station-grid" && boss.type === "station") {
        const safeLane = Math.floor(Math.random() * 6);
        const laneWidth = WIDTH / 6;
        for (let lane = 0; lane < 6; lane += 1) {
          if (lane === safeLane) continue;
          addApexHazard("beam-v", {
            x: laneWidth * (lane + 0.5), width: laneWidth - 20,
            delay: 0.72 + Math.abs(lane - safeLane) * 0.07,
            duration: 0.82, damage: 38, color: "#78cfff"
          });
        }
      } else if (step.kind === "station-crossfire" && boss.type === "station") {
        spawnBossPredictiveVolley();
        livingPilots().forEach((pilot, pilotIndex) => {
          addApexHazard("ring", {
            x: pilot.x, y: pilot.y, radius: 18, width: 25,
            delay: 0.72 + pilotIndex * 0.12, duration: 1.45,
            speed: 310, damage: 36, color: "#a7e4ff"
          });
        });
      } else if (step.kind === "station-replicate" && boss.type === "station") {
        const availableSlots = Math.max(0, 7 - enemies.filter((enemy) => enemy.type === "assault").length);
        for (let copyIndex = 0; copyIndex < Math.min(3, availableSlots); copyIndex += 1) {
          spawnAssaultDrone();
        }
        spawnBossPredictiveVolley();
      }
      screenFlash = Math.max(screenFlash, 0.3);
    }
  }

function launchEinsteinBlackHoleUltimate() {
    if (!boss || boss.type !== "apex" || boss.special !== "time_stop") return;
    const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.68, vx: 0, vy: 0 };
    const centerX = Math.max(105, Math.min(WIDTH - 105, target.x + (target.vx || 0) * 0.38));
    const centerY = Math.max(330, Math.min(HEIGHT - 105, target.y + (target.vy || 0) * 0.24));
    boss.ultimateCount += 1;
    boss.lasers = [];
    boss.followupAttack = null;
    boss.attackTimer = Math.max(boss.attackTimer || 0, 6.2);
    boss.timeStop = Math.max(boss.timeStop, 0.82);
    boss.rareBlackHoleX = centerX;
    boss.rareBlackHoleY = centerY;
    boss.strategy = copy[language()].apexStrategy("RELATIVISTIC EVENT HORIZON");

    addApexHazard("clock", {
      x: centerX,
      y: centerY,
      radius: 160,
      delay: 0.05,
      duration: 0.82,
      damage: 0,
      color: "#f1db79",
      avoidOverlap: false
    });
    addApexHazard("well", {
      x: centerX,
      y: centerY,
      radius: 170 + boss.phaseStage * 10,
      delay: 1.5,
      duration: 5.2,
      damage: 19 + boss.tier * 1.4,
      pull: 205 + boss.phaseStage * 22,
      color: "#7659cf",
      avoidOverlap: false
    });
    addApexHazard("ring", {
      x: centerX,
      y: centerY,
      radius: 18,
      width: 26,
      delay: 1.62,
      duration: 1.75,
      speed: 285,
      damage: 22 + boss.tier,
      color: "#b09bff",
      avoidOverlap: false
    });
    boss.ultimateSequence = [
      { timer: 1.72, kind: "einstein-black-hole-burst" },
      { timer: 3.05, kind: "einstein-black-hole-burst" }
    ];
    screenFlash = Math.max(screenFlash, 0.82);
    playTone(68, 24, 1.1, 0.11, "sawtooth");
    playNoise(0.72, 0.085, 720);
  }

function updateBossUltimate(dt) {
    if (!boss || bossIntro || boss.ultimateTimer == null) return;
    if (boss.type === "apex" && boss.special === "time_stop") {
      boss.rareBlackHoleTimer -= dt;
      const canCollapse = boss.rareBlackHoleTimer <= 0
        && boss.timeStop <= 0
        && !boss.ultimateSequence?.length
        && !boss.followupAttack
        && bossHazards.length < 5;
      if (canCollapse) {
        launchEinsteinBlackHoleUltimate();
        boss.rareBlackHoleTimer = 52 + Math.random() * 26;
        boss.ultimateTimer = Math.max(boss.ultimateTimer, 7);
        return;
      }
    }
    boss.ultimateTimer -= dt;
    if (boss.ultimateTimer > 0) return;
    launchBossUltimate();
    boss.ultimateTimer = boss.type === "apex" ? 10 + Math.random() * 5 : 16 + Math.random() * 4;
  }

function launchApexPattern(forcedPattern = null, echo = false) {
    if (!boss || boss.type !== "apex") return;
    const tier = boss.tier;
    const power = 1 + (tier - 3) * 0.055;
    const choices = [0, 1, 2].filter((variant) => variant !== boss.lastPattern);
    const pattern = forcedPattern ?? choices[Math.floor(Math.random() * choices.length)];
    boss.attackIndex += 1;
    boss.lastPattern = pattern;
    const target = targetedPilot() || { x: WIDTH / 2, y: HEIGHT * 0.72, vx: 0, vy: 0 };
    const aimed = Math.atan2(target.y - boss.y, target.x - boss.x);
    const damage = 12 + tier;
    const effect = boss.special;
    const stage = boss.phaseStage || 1;
    const fireFan = (count, spread, speed, options = {}) => {
      for (let lane = 0; lane < count; lane += 1) {
        const offset = (lane - (count - 1) / 2) * spread;
        fireApexOrb(aimed + offset, (speed + lane * (options.speedStep || 0)) * power, damage, options.kind || "boss-orb", {
          effect,
          radius: options.radius,
          curve: options.curve ? (lane % 2 ? -1 : 1) * options.curve : 0,
          accel: options.accel || 0,
          life: options.life
        });
      }
    };
    const fireRing = (count, speed, rotation = 0, options = {}) => {
      for (let index = 0; index < count; index += 1) {
        fireApexOrb(index / count * Math.PI * 2 + rotation, speed * power, damage, options.kind || "boss-orb", {
          effect,
          radius: options.radius,
          curve: options.curve ? (index % 2 ? -1 : 1) * options.curve : 0,
          accel: options.accel || 0,
          life: options.life
        });
      }
    };

    if (effect === "prism_cage") {
      const colors = ["#77e8ff", "#d49bff", "#fff09a"];
      const rayCount = 7 + stage * 2;
      for (let ray = 0; ray < rayCount; ray += 1) {
        const offset = (ray - (rayCount - 1) / 2) * (0.13 - stage * 0.008);
        fireApexOrb(aimed + offset, (220 + (ray % 3) * 42) * power, damage, "boss-orb", {
          effect, color: colors[ray % colors.length], radius: 7, curve: (ray - 4) * 0.025
        });
      }
      boss.strategy = copy[language()].apexStrategy("REFRACTED SPECTRUM");
    } else if (effect === "void_gates") {
      const rows = 3 + pattern + stage;
      for (let row = 0; row < rows; row += 1) {
        const y = 260 + row * (HEIGHT - 340) / Math.max(1, rows - 1);
        const fromLeft = (row + pattern) % 2 === 0;
        fireApexOrb(fromLeft ? 0 : Math.PI, (250 + row * 18) * power, damage + 2, "boss-orb", {
          x: fromLeft ? 12 : WIDTH - 12, y, effect, radius: 9, curve: fromLeft ? 0.16 : -0.16
        });
      }
      boss.strategy = copy[language()].apexStrategy("VOID PROCESSION");
    } else if (effect === "solar_sweep") {
      const lanes = 1 + pattern + stage;
      for (let lane = 0; lane < lanes; lane += 1) {
        const x = Math.max(55, Math.min(WIDTH - 55, target.x + (lane - (lanes - 1) / 2) * 125));
        addApexHazard("beam-v", { x, width: 18 + pattern * 4, delay: 0.8 + lane * 0.18, duration: 0.5, damage: damage + 5, color: "#ffbd68" });
      }
      boss.strategy = copy[language()].apexStrategy("HELIOS LANCE ARRAY");
    } else if (effect === "frost_domain") {
      const arms = 3 + pattern + stage;
      for (let arm = 0; arm < arms; arm += 1) {
        const angle = Math.PI / 2 + arm / arms * Math.PI * 2 + boss.phase;
        const bullet = fireApexOrb(angle, (155 + arm * 17) * power, damage, "cyclone", { effect, radius: 8, curve: 0.42, life: 7 });
        if (!bullet) continue;
        bullet.baseVx = bullet.vx;
        bullet.baseVy = bullet.vy;
        bullet.swirl = 48 + arm * 6;
        bullet.phase = angle;
      }
      boss.strategy = copy[language()].apexStrategy("GLACIAL SERPENT");
    } else if (effect === "echo_replay") {
      for (let mirror = -1; mirror <= 1; mirror += 2) {
        for (let lane = 0; lane < 4 + pattern; lane += 1) {
          const offset = (lane - (3 + pattern) / 2) * 0.13;
          fireApexOrb(aimed + offset * mirror, (205 + lane * 24) * power, damage, "boss-orb", {
            x: boss.x + mirror * 62, y: boss.y + 45, effect, radius: 7, curve: mirror * 0.22
          });
        }
      }
      boss.strategy = copy[language()].apexStrategy("MIRROR AFTERIMAGE");
    } else if (effect === "singularity") {
      fireRing(10 + pattern * 2, 105 + pattern * 22, boss.phase, { radius: 9, accel: 48, curve: 0.25, life: 8 });
      boss.strategy = copy[language()].apexStrategy("ORBITAL GRAVITONS");
    } else if (effect === "chain_lightning") {
      for (let strike = 0; strike < 3 + pattern; strike += 1) {
        addApexHazard("strike", {
          x: target.x + target.vx * 0.18 + (strike - 1) * 88,
          y: target.y + target.vy * 0.12 + Math.sin(strike * 2.4) * 65,
          radius: 34, delay: 0.55 + strike * 0.2, duration: 0.16, damage: damage + 4, color: "#74ffe1"
        });
      }
      boss.strategy = copy[language()].apexStrategy("TESLA STEP");
    } else if (effect === "future_grid") {
      const predictedX = target.x + target.vx * (0.45 + pattern * 0.15);
      const predictedY = target.y + target.vy * (0.35 + pattern * 0.12);
      for (let rune = 0; rune < 5 + pattern; rune += 1) {
        const angle = Math.atan2(predictedY - boss.y, predictedX - boss.x) + (rune - 2 - pattern / 2) * 0.105;
        fireApexOrb(angle, (260 + rune * 13) * power, damage + 2, "predictor", { effect, radius: 8, life: 5 });
      }
      boss.strategy = copy[language()].apexStrategy("ORACLE VECTOR LOCK");
    } else if (effect === "corona_wave") {
      fireRing(12 + pattern * 3, 175 + pattern * 32, boss.phase * 0.4, { radius: 8, accel: 18 });
      boss.strategy = copy[language()].apexStrategy("PROMINENCE BLOOM");
    } else if (effect === "hydra_heads") {
      const heads = 3 + pattern;
      for (let head = 0; head < heads; head += 1) {
        const originX = boss.x + (head - (heads - 1) / 2) * 38;
        const originY = boss.y + 35 + Math.abs(head - (heads - 1) / 2) * 9;
        const angle = Math.atan2(target.y - originY, target.x - originX) + Math.sin(head * 2.1) * 0.09;
        const bullet = fireApexOrb(angle, (205 + head * 18) * power, damage, "seeker", {
          x: originX, y: originY, effect, radius: 7, life: 6
        });
        if (!bullet) continue;
        bullet.targetId = target.id;
        bullet.speed = Math.hypot(bullet.vx, bullet.vy);
        bullet.turnRate = 0.55 + head * 0.08;
      }
      boss.strategy = copy[language()].apexStrategy("HYDRA BITE FORMATION");
    } else if (effect === "phase_cloak") {
      const origins = [[70, 210], [WIDTH - 70, 210], [WIDTH * 0.28, 330], [WIDTH * 0.72, 330]];
      origins.slice(0, 2 + pattern).forEach(([x, y], index) => {
        const angle = Math.atan2(target.y - y, target.x - x);
        fireApexOrb(angle, (225 + index * 24) * power, damage, "boss-orb", { x, y, effect, radius: 9, curve: index % 2 ? -0.3 : 0.3 });
      });
      boss.strategy = copy[language()].apexStrategy("PHASE AMBUSH");
    } else if (effect === "time_stop") {
      const hands = 6 + pattern * 2;
      for (let hand = 0; hand < hands; hand += 1) {
        const angle = Math.PI / 2 + (hand - (hands - 1) / 2) * 0.17;
        fireApexOrb(angle, (135 + hand * 17) * power, damage, "boss-orb", { effect, radius: 8, accel: 30, curve: hand % 2 ? -0.16 : 0.16 });
      }
      boss.strategy = copy[language()].apexStrategy("CLOCKWORK SALVO");
    } else if (effect === "black_hole") {
      const count = 8 + pattern * 2;
      for (let index = 0; index < count; index += 1) {
        const angle = index / count * Math.PI * 2;
        const x = WIDTH / 2 + Math.cos(angle) * (WIDTH * 0.48);
        const y = HEIGHT * 0.58 + Math.sin(angle) * (HEIGHT * 0.42);
        const inward = Math.atan2(target.y - y, target.x - x);
        fireApexOrb(inward, (145 + pattern * 25) * power, damage + 2, "boss-orb", { x, y, effect, radius: 10, accel: 25 });
      }
      boss.strategy = copy[language()].apexStrategy("EVENT HORIZON COLLAPSE");
    } else if (effect === "scythe_cross") {
      for (let blade = 0; blade < 4 + pattern; blade += 1) {
        const offset = (blade - (3 + pattern) / 2) * 0.16;
        fireApexOrb(aimed + offset, (275 + blade * 20) * power, damage + 3, "boss-orb", { effect, radius: 10, curve: blade % 2 ? -0.5 : 0.5 });
      }
      boss.strategy = copy[language()].apexStrategy("MANTIS BLADE DANCE");
    } else if (effect === "molten_floor") {
      const occupied = activeAttackTargets();
      for (let drop = 0; drop < 3 + pattern; drop += 1) {
        const point = findDistributedAttackTarget(target.x + (drop - 2) * 90, target.y + Math.sin(drop) * 80, 105, occupied);
        occupied.push({ ...point, radius: 42 });
        bossBombs.push({
          x: point.x, y: point.y, radius: 42, timer: 0.9 + drop * 0.16, maxTimer: 1.55,
          phase: Math.random() * Math.PI * 2, damage: damage + 7, color: "#ff765e", effect
        });
      }
      boss.strategy = copy[language()].apexStrategy("FOUNDRY METEOR CAST");
    } else if (effect === "quantum_decoys") {
      for (let shot = 0; shot < 5 + pattern; shot += 1) {
        const x = 55 + Math.random() * (WIDTH - 110);
        const y = 100 + Math.random() * 220;
        const angle = Math.atan2(target.y - y, target.x - x);
        fireApexOrb(angle, (230 + Math.random() * 90) * power, damage, "boss-orb", { x, y, effect, radius: 8, curve: Math.random() - 0.5 });
      }
      boss.strategy = copy[language()].apexStrategy("QUANTUM POSSIBILITY RAIN");
    } else if (effect === "shrinking_world") {
      const rows = 3 + pattern;
      for (let row = 0; row < rows; row += 1) {
        const y = 300 + row * (HEIGHT - 370) / Math.max(1, rows - 1);
        fireApexOrb(0, (210 + row * 20) * power, damage + 3, "boss-orb", { x: 8, y, effect, radius: 11, accel: 20 });
        fireApexOrb(Math.PI, (210 + row * 20) * power, damage + 3, "boss-orb", { x: WIDTH - 8, y: y + 24, effect, radius: 11, accel: 20 });
      }
      boss.strategy = copy[language()].apexStrategy("EXTINCTION PINCER");
    } else {
      fireRing(18 + pattern * 4, 155 + pattern * 35, boss.phase * 0.8, { radius: 8 + pattern, accel: 22, curve: 0.32, life: 8 });
      fireFan(5 + pattern * 2, 0.1, 285, { radius: 9, speedStep: 8 });
      boss.strategy = copy[language()].apexStrategy("ABSOLUTE ZERO FRACTAL");
    }
    playTone(165 + tier * 18, 90 + pattern * 80, 0.32, 0.055, "sawtooth");
  }

function updateBossHazards(dt) {
    const activePilots = livingPilots();
    for (let index = bossHazards.length - 1; index >= 0; index -= 1) {
      const hazard = bossHazards[index];
      hazard.phase += dt * 3;
      hazard.hitTimer = Math.max(0, hazard.hitTimer - dt);
      if (hazard.delay > 0) {
        hazard.delay -= dt;
        continue;
      }
      if (!hazard.active) {
        hazard.active = true;
        if (hazard.type === "portal" || hazard.type === "turret" || hazard.type === "decoy") hazard.shotTimer = 0;
        playTone(560, 170, 0.16, 0.025, "square");
      }
      hazard.duration -= dt;
      if (hazard.type === "ring") hazard.radius += hazard.speed * dt;
      if (hazard.type === "sweep") hazard.angle += hazard.speed * dt;
      if (hazard.type === "safezone") hazard.safeRadius = Math.max(72, hazard.safeRadius - hazard.speed * dt);

      if (hazard.type === "portal" || hazard.type === "turret" || hazard.type === "decoy") {
        hazard.shotTimer -= dt;
        if (hazard.shotTimer <= 0) {
          activePilots.forEach((pilot) => {
            if (enemyBullets.length >= enemyBulletBudget()) return;
            const angle = Math.atan2(pilot.y - hazard.y, pilot.x - hazard.x) + (hazard.type === "decoy" ? Math.sin(hazard.phase) * 0.12 : 0);
            enemyBullets.push({
              x: hazard.x, y: hazard.y, vx: Math.cos(angle) * (hazard.type === "portal" ? 320 : 235),
              vy: Math.sin(angle) * (hazard.type === "portal" ? 320 : 235),
              radius: 6, collisionRadius: 5, damage: hazard.damage, kind: "boss-orb",
              effect: boss?.type === "apex" ? boss.special : null,
              color: hazard.color
            });
          });
          hazard.shotTimer = hazard.type === "turret" ? 0.62 : hazard.type === "decoy" ? 0.78 : 0.48;
        }
      }

      activePilots.forEach((pilot) => {
        const dx = pilot.x - hazard.x;
        const dy = pilot.y - hazard.y;
        const needsDistance = hazard.type === "well"
          || hazard.type === "field"
          || hazard.type === "strike"
          || hazard.type === "ring"
          || hazard.type === "safezone";
        const distance = needsDistance ? Math.hypot(dx, dy) || 1 : 0;
        if (hazard.type === "well" && distance < hazard.radius * 2.2) {
          const pull = hazard.pull * (1 - Math.min(1, distance / (hazard.radius * 2.2)));
          pilot.x -= dx / distance * pull * dt;
          pilot.y -= dy / distance * pull * dt;
        } else if (hazard.type === "field" && hazard.pull < 0 && distance < hazard.radius) {
          pilot.hazardSlow = Math.min(pilot.hazardSlow, 0.58);
        }
        let hit = false;
        if (hazard.type === "beam-v") hit = Math.abs(dx) <= hazard.width / 2 + pilot.collisionRadius;
        else if (hazard.type === "beam-h") hit = Math.abs(dy) <= hazard.width / 2 + pilot.collisionRadius;
        else if (hazard.type === "strike" || hazard.type === "field" || hazard.type === "well") hit = distance <= hazard.radius + pilot.collisionRadius;
        else if (hazard.type === "ring") hit = Math.abs(distance - hazard.radius) <= hazard.width / 2 + pilot.collisionRadius;
        else if (hazard.type === "safezone") hit = distance > hazard.safeRadius - pilot.collisionRadius;
        else if (hazard.type === "sweep") {
          const lineDistance = Math.abs(Math.sin(hazard.angle) * dx - Math.cos(hazard.angle) * dy);
          hit = lineDistance <= hazard.width / 2 + pilot.collisionRadius;
        }
        if (hit && hazard.hitTimer <= 0 && hazard.damage > 0) {
          damagePlayer(pilot, hazard.damage * (boss?.damageScale ?? 1));
          hazard.hitTimer = 0.42;
        }
      });
      if (hazard.duration <= 0 || (hazard.type === "ring" && hazard.radius > Math.hypot(WIDTH, HEIGHT))) {
        bossHazards.splice(index, 1);
      }
    }
  }

function spawnBossSpread() {
    if (!boss) return;
    const count = 11;
    for (let index = 0; index < count; index += 1) {
      const angle = Math.PI / 2 + (index - (count - 1) / 2) * 0.145;
      const speed = 205 + (index % 2) * 28;
      enemyBullets.push({
        x: boss.x,
        y: boss.y + 58,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 7,
        collisionRadius: 5,
        damage: 16,
        kind: "boss-orb"
      });
    }
    playTone(190, 72, 0.34, 0.075, "square");
  }

function throwBossBomb() {
    if (!boss) return;
    const livingPlayers = players.filter((pilot) => pilot.alive);
    const followPlayer = livingPlayers.length && Math.random() < 0.62;
    const target = followPlayer
      ? livingPlayers[Math.floor(Math.random() * livingPlayers.length)]
      : {
          x: 90 + Math.random() * (WIDTH - 180),
          y: HEIGHT * 0.42 + Math.random() * (HEIGHT * 0.42)
        };
    const distributedTarget = findDistributedAttackTarget(
      target.x + (followPlayer ? target.vx * 0.18 + (Math.random() - 0.5) * 55 : 0),
      target.y + (followPlayer ? target.vy * 0.14 + (Math.random() - 0.5) * 45 : 0),
      150,
      activeAttackTargets(),
      { minX: 70, maxX: WIDTH - 70, minY: 310, maxY: HEIGHT - 65 }
    );
    bossBombs.push({
      x: distributedTarget.x,
      y: distributedTarget.y,
      radius: 66,
      timer: 2,
      maxTimer: 2,
      phase: Math.random() * Math.PI * 2
    });
    playTone(330, 155, 0.3, 0.055, "triangle");
  }

function startBossBombBarrage() {
    if (!boss) return;
    boss.bombShotsRemaining = 5 + Math.floor(Math.random() * 3);
    boss.bombNextTimer = 0.1;
    boss.attackTimer = 999;
  }

function analyzePlayers() {
    const living = players.filter((pilot) => pilot.alive);
    if (!living.length) return { living: [], centerX: WIDTH / 2, predictedX: WIDTH / 2, mobility: 0, spread: 0, nearEdge: false };
    const centerX = living.reduce((sum, pilot) => sum + pilot.x, 0) / living.length;
    const averageVx = living.reduce((sum, pilot) => sum + pilot.vx, 0) / living.length;
    const mobility = living.reduce((sum, pilot) => sum + Math.hypot(pilot.vx, pilot.vy), 0) / living.length;
    const spread = living.length > 1 ? Math.max(...living.map((pilot) => pilot.x)) - Math.min(...living.map((pilot) => pilot.x)) : 0;
    const nearEdge = living.some((pilot) => pilot.x < WIDTH * 0.2 || pilot.x > WIDTH * 0.8);
    return {
      living,
      centerX,
      predictedX: Math.max(55, Math.min(WIDTH - 55, centerX + averageVx * 0.62)),
      mobility,
      spread,
      nearEdge
    };
  }

function startBossLaserBarrage(style) {
    if (!boss) return;
    const analysis = analyzePlayers();
    const enraged = boss.hp <= boss.maxHp * 0.5;
    const laserCount = style === "wall" ? 5 : 4 + Math.floor(Math.random() * 2);
    const positions = [];
    if (style === "wall") {
      const slots = Array.from({ length: 6 }, (_, index) => 90 + index * (WIDTH - 180) / 5);
      const safestSlot = slots.reduce((best, slot, index) => (
        Math.abs(slot - analysis.predictedX) > Math.abs(slots[best] - analysis.predictedX) ? index : best
      ), 0);
      slots.forEach((slot, index) => {
        if (index !== safestSlot) positions.push(slot);
      });
    } else {
      positions.push(analysis.predictedX);
      while (positions.length < laserCount) {
        let candidate = 55 + Math.random() * (WIDTH - 110);
        let attempts = 0;
        while (positions.some((position) => Math.abs(position - candidate) < 58) && attempts < 16) {
          candidate = 55 + Math.random() * (WIDTH - 110);
          attempts += 1;
        }
        positions.push(candidate);
      }
    }
    boss.lasers = positions.map((x) => {
      const baseCharge = style === "wall" ? 0.9 + Math.random() * 0.35 : 0.55 + Math.random() * 1.25;
      const maxCharge = baseCharge * (enraged ? 0.68 : 1);
      return {
        x,
        charge: maxCharge,
        maxCharge,
        width: 52 + Math.random() * 24,
        length: 0,
        beamSpeed: (650 + Math.random() * 850) * (enraged ? 1.28 : 1),
        linger: 0.28 + Math.random() * 0.34,
        firing: false,
        finished: false
      };
    });
    boss.laserBarrageActive = true;
    boss.attackTimer = 999;
    playTone(92, 680, 0.95, 0.085, "sawtooth");
    playTone(145, 920, 1.15, 0.045, "sine", 0.04);
  }

function spawnBossPredictiveVolley() {
    if (!boss) return;
    const analysis = analyzePlayers();
    analysis.living.forEach((pilot) => {
      const targetX = Math.max(35, Math.min(WIDTH - 35, pilot.x + pilot.vx * 0.72));
      const targetY = Math.max(260, Math.min(HEIGHT - 35, pilot.y + pilot.vy * 0.72));
      const baseAngle = Math.atan2(targetY - boss.y, targetX - boss.x);
      [-0.13, 0, 0.13].forEach((offset) => {
        const angle = baseAngle + offset;
        enemyBullets.push({
          x: boss.x,
          y: boss.y + 55,
          vx: Math.cos(angle) * 210,
          vy: Math.sin(angle) * 210,
          radius: 6,
          collisionRadius: 4,
          damage: 15,
          kind: "predictor"
        });
      });
    });
    playTone(510, 250, 0.2, 0.05, "square");
  }

function spawnBossSeekerVolley() {
    if (!boss) return;
    const living = players.filter((pilot) => pilot.alive);
    living.forEach((pilot, playerIndex) => {
      [-26, 26].forEach((offset, index) => {
        const angle = Math.PI / 2 + (playerIndex * 0.16) + (index ? 0.12 : -0.12);
        enemyBullets.push({
          x: boss.x + offset,
          y: boss.y + 48,
          vx: Math.cos(angle) * 150,
          vy: Math.sin(angle) * 150,
          speed: 150,
          radius: 7,
          collisionRadius: 5,
          damage: 14,
          kind: "seeker",
          targetId: pilot.id,
          turnRate: 1.45,
          life: 5.2
        });
      });
    });
    playTone(360, 620, 0.24, 0.045, "sine");
  }

function spawnBossSpiralVolley() {
    if (!boss) return;
    const wave = boss.pattern + boss.volleyShotsRemaining;
    const count = 13;
    for (let index = 0; index < count; index += 1) {
      const offset = (index - (count - 1) / 2) * 0.12;
      const angle = Math.PI / 2 + offset + Math.sin(wave * 1.7) * 0.23;
      const speed = 150 + (index % 3) * 24;
      enemyBullets.push({
        x: boss.x,
        y: boss.y + 58,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 6,
        collisionRadius: 4,
        damage: 13,
        kind: "neural"
      });
    }
    playTone(240 + (wave % 3) * 75, 520, 0.18, 0.04, "triangle");
  }

function spawnBossCycloneVolley() {
    if (!boss) return;
    const analysis = analyzePlayers();
    const targets = analysis.living.length ? analysis.living : players;
    const missileCount = players.length === 2 ? 8 : 6;
    for (let index = 0; index < missileCount; index += 1) {
      const target = targets[index % targets.length];
      const targetX = target.x + target.vx * 0.48;
      const targetY = target.y + target.vy * 0.48;
      const baseAngle = Math.atan2(targetY - boss.y, targetX - boss.x) + (index - (missileCount - 1) / 2) * 0.055;
      const speed = 142 + Math.random() * 38;
      enemyBullets.push({
        x: boss.x + (index - (missileCount - 1) / 2) * 13,
        y: boss.y + 55,
        vx: Math.cos(baseAngle) * speed,
        vy: Math.sin(baseAngle) * speed,
        baseVx: Math.cos(baseAngle) * speed,
        baseVy: Math.sin(baseAngle) * speed,
        radius: 8,
        collisionRadius: 5,
        damage: 16,
        kind: "cyclone",
        phase: index * 0.9 + Math.random(),
        age: 0,
        swirl: 72 + Math.random() * 38,
        life: 5.5
      });
    }
    playTone(175, 540, 0.45, 0.06, "sawtooth");
    playNoise(0.24, 0.025, 1200);
  }

function startBossVolley(kind) {
    if (!boss) return;
    boss.volleyKind = kind;
    boss.volleyShotsRemaining = kind === "seeker" ? 2 : kind === "cyclone" ? 3 : kind === "predictive" ? 3 : 4;
    boss.volleyNextTimer = 0.08;
    boss.attackTimer = 999;
  }

function chooseBossPattern() {
    if (!boss) return;
    const analysis = analyzePlayers();
    const candidates = ["laser", "spiral", "bomb", "cyclone"];
    if (analysis.mobility > 135) candidates.push("predictive", "predictive");
    if (analysis.nearEdge) candidates.push("wall", "wall");
    if (analysis.spread > 230) candidates.push("seeker", "seeker");
    if (analysis.mobility < 75) candidates.push("bomb", "wall");
    if (analysis.spread < 150) candidates.push("spiral");

    let available = candidates.filter((pattern) => !boss.recentPatterns.includes(pattern));
    if (!available.length) available = candidates;
    const pattern = available[Math.floor(Math.random() * available.length)];
    boss.recentPatterns.push(pattern);
    boss.recentPatterns = boss.recentPatterns.slice(-2);
    boss.pattern += 1;

    const t = copy[language()];
    if (pattern === "laser") {
      boss.strategy = t.strategyLaser;
      startBossLaserBarrage("random");
    } else if (pattern === "wall") {
      boss.strategy = t.strategyWall;
      startBossLaserBarrage("wall");
    } else if (pattern === "bomb") {
      boss.strategy = t.strategyBomb;
      startBossBombBarrage();
    } else if (pattern === "predictive") {
      boss.strategy = t.strategyPredict;
      startBossVolley("predictive");
    } else if (pattern === "seeker") {
      boss.strategy = t.strategySeeker;
      startBossVolley("seeker");
    } else if (pattern === "cyclone") {
      boss.strategy = t.strategyCyclone;
      startBossVolley("cyclone");
    } else {
      boss.strategy = t.strategySpiral;
      startBossVolley("spiral");
    }
  }

function spawnAssaultDrone() {
    if (!boss || boss.type !== "station" || enemies.length >= MAX_ENEMIES) return;
    const targets = players.filter((pilot) => pilot.alive);
    if (!targets.length) return;
    const hp = 14 + Math.floor(level * 0.8);
    const activeDrones = enemies.filter((enemy) => enemy.type === "assault");
    const formationIndex = activeDrones.length;
    const side = formationIndex % 2 === 0 ? -1 : 1;
    const rank = Math.floor(formationIndex / 2);
    const spawnOffset = side * (62 + rank * 44);
    const droneSequence = boss.droneSequence++;
    const assignedTarget = targets[droneSequence % targets.length];
    const usedTargetSlots = new Set(activeDrones
      .filter((enemy) => enemy.targetId === assignedTarget.id)
      .map((enemy) => enemy.attachSlot));
    let targetSlot = 0;
    while (usedTargetSlots.has(targetSlot) && targetSlot < 10) targetSlot += 1;
    const attachRing = 42 + Math.floor(targetSlot / 6) * 30;
    const attachAngle = targetSlot * 2.399963229728653;
    const targetOffsetX = Math.cos(attachAngle) * attachRing;
    const targetOffsetY = Math.sin(attachAngle) * attachRing;
    enemies.push({
      type: "assault",
      x: Math.max(35, Math.min(WIDTH - 35, boss.x + spawnOffset)),
      y: boss.y + 58 + (rank % 2) * 26,
      radius: 21,
      collisionRadius: 14,
      hp,
      maxHp: hp,
      speed: 112 + Math.random() * 30,
      points: 850,
      phase: Math.random() * Math.PI * 2,
      fireTimer: 0.7 + Math.random(),
      fireDelay: 2.1,
      bulletDamage: 14,
      contactDamage: 34,
      targetId: assignedTarget.id,
      attachSlot: targetSlot,
      targetOffsetX,
      targetOffsetY,
      separationPhase: Math.random() * Math.PI * 2,
      state: "approach",
      holdTimer: 2,
      holding: false
    });
  }

function findPlayerCenteredMissileTarget(pilot, radius, occupiedTargets) {
    const baseX = Math.max(55, Math.min(WIDTH - 55, pilot.x + pilot.vx * 0.28));
    const baseY = Math.max(320, Math.min(HEIGHT - 50, pilot.y + pilot.vy * 0.18));
    return findDistributedAttackTarget(
      baseX,
      baseY,
      radius * 2 + 16,
      occupiedTargets,
      { minX: 52, maxX: WIDTH - 52, minY: 315, maxY: HEIGHT - 50 }
    );
  }

function launchBoss2Missiles() {
    if (!boss || boss.type !== "station") return;
    const targets = players.filter((pilot) => pilot.alive);
    if (!targets.length) return;
    const count = boss.enraged ? 8 + Math.floor(Math.random() * 3) : 6 + Math.floor(Math.random() * 3);
    const missileRadius = boss.enraged ? 44 : 42;
    const occupiedTargets = activeAttackTargets();
    for (let index = 0; index < count; index += 1) {
      const target = targets[index % targets.length];
      const missileTarget = findPlayerCenteredMissileTarget(target, missileRadius, occupiedTargets);
      const targetX = missileTarget.x;
      const targetY = missileTarget.y;
      occupiedTargets.push({ ...missileTarget, radius: missileRadius });
      const port = (index + Math.floor(boss.phase * 3)) % 7;
      const portOffset = (port - 3) * 27;
      bossMissiles.push({
        startX: boss.x + portOffset,
        startY: boss.y + 20 + Math.abs(port - 3) * 5,
        controlX: targetX + (Math.random() - 0.5) * 340,
        controlY: -90 - Math.random() * 190,
        targetX,
        targetY,
        x: boss.x,
        y: boss.y,
        progress: -index * (boss.enraged ? 0.035 : 0.05),
        duration: (boss.enraged ? 0.78 : 1.02) + Math.random() * (boss.enraged ? 0.28 : 0.38),
        trail: [],
        radius: missileRadius
      });
    }
    playTone(88, 620, 0.65, 0.09, "sawtooth");
    playNoise(0.45, 0.05, 1100);
  }
