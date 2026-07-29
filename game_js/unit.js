/**
 * Frost Wing — unit
 * Regular enemy aircraft, projectiles, collisions, and optimized unit rendering.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function currentEnemyLimit() {
    return MAX_ENEMIES;
  }

function spawnEnemy() {
    if (boss || enemies.length >= currentEnemyLimit()) return;
    const difficulty = Math.min(1, elapsed / 100);
    const roll = Math.random();
    const eliteChance = level >= 4 ? Math.min(0.5, 0.22 + (level - 4) * 0.04) : 0;
    const enemyPower = 1 + (level - 1) * 0.16;
    const enemySpeedScale = Math.min(1.65, 1 + (level - 1) * 0.035);
    let enemy;
    const flakChance = level >= 13 ? Math.min(0.24, 0.08 + (level - 13) * 0.008) : 0;
    const advancedRoll = Math.random();
    if (level >= 25 && advancedRoll < 0.09) {
      enemy = {
        type: "bomber",
        radius: 32,
        collisionRadius: 23,
        hp: 24,
        speed: 72 + difficulty * 22,
        points: 1450,
        fireDelay: 1.75,
        tripleBeam: true
      };
    } else if (level >= 18 && advancedRoll < 0.22) {
      enemy = {
        type: "wraith",
        radius: 20,
        collisionRadius: 12,
        hp: 11,
        speed: 155 + difficulty * 35,
        points: 1180,
        fireDelay: 1.65,
        tripleBeam: true
      };
    } else if (level >= 13 && Math.random() < flakChance) {
      enemy = {
        type: "flak",
        radius: 29,
        collisionRadius: 20,
        hp: 15,
        speed: 64 + difficulty * 18,
        points: 980,
        fireDelay: 2.7,
        flakBurst: true
      };
    } else if (level >= 4 && Math.random() < eliteChance) {
      if (Math.random() < 0.52) {
        enemy = {
          type: "guardian",
          radius: 25,
          collisionRadius: 17,
          hp: 9,
          speed: 76 + difficulty * 24,
          points: 650,
          fireDelay: 2.4,
          shieldActive: false,
          shieldCooldown: 1.4,
          shieldTimer: 0
        };
      } else {
        enemy = {
          type: "prism",
          radius: 22,
          collisionRadius: 15,
          hp: 8,
          speed: 92 + difficulty * 28,
          points: 720,
          fireDelay: 2,
          tripleBeam: true
        };
      }
    } else if (roll < 0.14 + difficulty * 0.08) {
      enemy = { type: "tank", radius: 27, collisionRadius: 19, hp: 7, speed: 72 + difficulty * 22, points: 420, fireDelay: 1.3 };
    } else if (roll < 0.44) {
      enemy = { type: "dart", radius: 15, collisionRadius: 10, hp: 2, speed: 145 + difficulty * 42, points: 190, fireDelay: 2.2 };
    } else {
      enemy = { type: "scout", radius: 19, collisionRadius: 13, hp: 3, speed: 100 + difficulty * 34, points: 130, fireDelay: 2.8 };
    }
    enemy.hp = Math.ceil(enemy.hp * enemyPower);
    enemy.speed *= enemySpeedScale;
    enemy.points = Math.round(enemy.points * (1 + (level - 1) * 0.1));
    const baseContactDamage = enemy.type === "tank" || enemy.type === "flak" || enemy.type === "bomber" ? 34 : enemy.type === "guardian" || enemy.type === "prism" || enemy.type === "wraith" ? 30 : 24;
    enemy.contactDamage = Math.round(baseContactDamage * (1 + (level - 1) * 0.08));
    const baseBulletDamage = enemy.type === "prism" ? 8 : enemy.type === "flak" ? 16 : 12;
    enemy.bulletDamage = Math.round(baseBulletDamage * (1 + (level - 1) * 0.08));
    enemy.maxHp = enemy.hp;
    enemy.x = 55 + Math.random() * (WIDTH - 110);
    enemy.y = -enemy.radius - 10;
    enemy.phase = Math.random() * Math.PI * 2;
    enemy.wobble = enemy.type === "wraith" ? 46 : enemy.type === "dart" ? 28 : enemy.type === "prism" ? 22 : 14;
    const isElite = ["guardian", "prism", "flak", "wraith", "bomber"].includes(enemy.type);
    const sentryChance = enemy.type === "wraith" ? 0.2 : isElite ? 1 : enemy.type === "tank" ? 0.68 : enemy.type === "dart" ? 0.22 : 0.42;
    enemy.behavior = Math.random() < sentryChance ? "sentry" : "dive";
    enemy.stopY = 115 + Math.random() * 215;
    enemy.holding = false;
    enemy.holdTimer = isElite ? 8 + Math.random() * 4 : 4 + Math.random() * 3;
    enemy.fireTimer = 1 + Math.random() * enemy.fireDelay * 1.15;
    enemies.push(enemy);
  }

function spawnEnemyBullet(enemy) {
    const targets = players.filter((pilot) => pilot.alive);
    if (!targets.length) return;
    const target = targets.reduce((closest, pilot) => {
      const pilotDistance = Math.hypot(pilot.x - enemy.x, pilot.y - enemy.y);
      const closestDistance = Math.hypot(closest.x - enemy.x, closest.y - enemy.y);
      return pilotDistance < closestDistance ? pilot : closest;
    });
    const prediction = enemy.type === "ace" ? 0.55 : enemy.flakBurst ? 0.42 : 0;
    const dx = target.x + target.vx * prediction - enemy.x;
    const dy = target.y + target.vy * prediction - enemy.y;
    const baseAngle = Math.atan2(dy, dx);
    const offsets = enemy.type === "ace" ? [-0.32, -0.16, 0, 0.16, 0.32] : enemy.flakBurst ? [-0.2, -0.1, 0, 0.1, 0.2] : enemy.tripleBeam ? [-0.28, 0, 0.28] : [0];
    const speed = enemy.type === "ace" ? 280 : enemy.type === "tank" ? 190 : enemy.type === "prism" ? 205 : enemy.type === "flak" ? 255 : 225;
    offsets.forEach((offset) => {
      const angle = baseAngle + offset;
      enemyBullets.push({
        x: enemy.x,
        y: enemy.y + enemy.radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: enemy.type === "ace" ? 6 : enemy.type === "tank" || enemy.type === "flak" ? 6 : 4,
        collisionRadius: enemy.type === "ace" ? 4 : enemy.type === "tank" || enemy.type === "flak" ? 4 : 3,
        damage: enemy.bulletDamage,
        kind: enemy.type === "ace" ? "predictor" : enemy.flakBurst ? "flak" : enemy.tripleBeam ? "beam" : "orb"
      });
    });
    if (enemy.flakBurst) playTone(110, 840, 0.28, 0.065, "square");
    else if (enemy.tripleBeam) playTone(240, 610, 0.22, 0.055, "sawtooth");
    else playTone(180, 120, 0.08, 0.018, "triangle");
  }

function destroyEnemy(index, awardPoints, source = "weapon") {
    const enemy = enemies[index];
    if (!enemy) return;
    addExplosion(enemy.x, enemy.y, enemy.type === "tank" ? "#f0a05e" : "#e0766d", enemy.type === "tank" ? 24 : 15);
    playNoise(enemy.type === "tank" || enemy.type === "guardian" ? 0.2 : 0.12, awardPoints ? 0.055 : 0.035, 780);
    if (awardPoints) {
      const grantsProgress = enemy.type !== "assault";
      if (grantsProgress && source !== "bomb") {
        combo = Math.min(40, combo + 1);
        comboTimer = 2.8;
      }
      const comboMultiplier = 1 + Math.min(2, Math.floor(combo / 5) * 0.25);
      score += enemy.points * comboMultiplier * (frostDriveTimer > 0 ? 1.5 : 1);
      if (grantsProgress) {
        kills += 1;
        enemyKillsSinceRepair += 1;
        if (enemyKillsSinceRepair >= 2) {
          enemyKillsSinceRepair -= 2;
          players.filter((pilot) => pilot.alive).forEach((pilot) => {
            pilot.health = Math.min(pilot.maxHealth, pilot.health + 1);
          });
        }
        grantXp(1);
        if (mission?.type === "hunter" && source !== "bomb") mission.progress += 1;
        if (mission?.type === "ace" && enemy.type === "ace") mission.progress = mission.target;
      }
      const healingDropped = grantsProgress && maybeDropHealingItem(enemy.x, enemy.y);
      if (grantsProgress && source !== "bomb") {
        const luck = players.reduce((highest, pilot) => Math.max(highest, pilot.itemLuck), 0);
        if (Math.random() < 0.18) {
          dropItem(Math.max(18, enemy.x - 26), enemy.y, "shield");
        }
        if (Math.random() < 0.08) {
          dropItem(Math.min(WIDTH - 18, enemy.x + 26), enemy.y, "wingman");
        }
        if (Math.random() < 0.025) {
          dropItem(enemy.x, Math.max(18, enemy.y - 30), "magnet");
        }
        if (Math.random() < 0.045 + luck * 0.25) {
          dropItem(Math.max(18, enemy.x - 18), Math.max(18, enemy.y - 24), "overdrive");
        }
        if (Math.random() < 0.03 + luck * 0.18) {
          dropItem(Math.min(WIDTH - 18, enemy.x + 18), Math.max(18, enemy.y - 24), "core");
        }
        weaponKillsSinceBombDrop += 1;
        if (weaponKillsSinceBombDrop >= 5) {
          const bombX = Math.max(18, Math.min(WIDTH - 18, enemy.x + (healingDropped ? 28 : 0)));
          dropItem(bombX, enemy.y, "bomb");
          weaponKillsSinceBombDrop = 0;
        }
      }
    }
    enemies.splice(index, 1);
    updateHud();
    if (awardPoints && mode === "running") {
      if (pendingClassChoice) showClassChoice();
      else if (pendingLevelUps > 0) showLevelUp();
    }
  }

function drawEnemy(enemy, colors) {
    if (enemy.type === "assault") {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(Math.sin(enemy.phase) * 0.15);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : enemy.holding ? 18 : 8;
      ctx.shadowColor = enemy.holding ? "#ff725f" : "#78d6ff";
      ctx.fillStyle = enemy.holding && Math.floor(enemy.holdTimer * 8) % 2 === 0 ? "#ff8a6f" : "#314f6d";
      ctx.strokeStyle = "#a9ddf2";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 25);
      ctx.lineTo(-18, -13);
      ctx.lineTo(-8, -7);
      ctx.lineTo(0, -24);
      ctx.lineTo(8, -7);
      ctx.lineTo(18, -13);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = enemy.holding ? "#ffdf95" : "#75d9f5";
      ctx.beginPath();
      ctx.arc(0, 3, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      if (enemy.holding) {
        const progress = 1 - enemy.holdTimer / 2;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 106, 80, ${0.45 + progress * 0.5})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([7, 5]);
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 34 + progress * 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#ffe3c2";
        ctx.font = "800 12px Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(Math.max(1, Math.ceil(enemy.holdTimer)).toString(), enemy.x, enemy.y - 40);
        ctx.restore();
      }
      return;
    }

    if (enemy.type === "ace") {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(Math.sin(enemy.phase * 1.4) * 0.2);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 22;
      ctx.shadowColor = "#ffd56b";
      ctx.fillStyle = "#27394f";
      ctx.strokeStyle = "#ffd978";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 31);
      ctx.lineTo(-17, 8);
      ctx.lineTo(-38, 3);
      ctx.lineTo(-23, -13);
      ctx.lineTo(-8, -8);
      ctx.lineTo(0, -29);
      ctx.lineTo(8, -8);
      ctx.lineTo(23, -13);
      ctx.lineTo(38, 3);
      ctx.lineTo(17, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff4bb";
      ctx.beginPath();
      ctx.arc(0, 2, 8 + Math.sin(enemy.phase * 3) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 221, 120, 0.72)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 2, 18, enemy.phase, enemy.phase + Math.PI * 1.35);
      ctx.stroke();
      ctx.restore();
      const ratio = Math.max(0, enemy.hp / enemy.maxHp);
      ctx.fillStyle = "rgba(10, 20, 31, 0.76)";
      ctx.fillRect(enemy.x - 42, enemy.y - 45, 84, 6);
      ctx.fillStyle = "#ffd978";
      ctx.fillRect(enemy.x - 42, enemy.y - 45, 84 * ratio, 6);
      return;
    }

    if (enemy.type === "flak") {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 14;
      ctx.shadowColor = "#c58ad4";
      ctx.fillStyle = "#46394f";
      ctx.strokeStyle = "#c79ad0";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let point = 0; point < 8; point += 1) {
        const angle = point / 8 * Math.PI * 2;
        const x = Math.cos(angle) * 27;
        const y = Math.sin(angle) * 22;
        if (point === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.rotate(Math.sin(enemy.phase * 0.35) * 0.18);
      [-9, 0, 9].forEach((offset) => {
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(offset, 4);
        ctx.lineTo(offset, 35);
        ctx.stroke();
      });
      ctx.fillStyle = "#f2b56d";
      ctx.beginPath();
      ctx.arc(0, 1, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      if (enemy.hp < enemy.maxHp) {
        ctx.fillStyle = "rgba(20, 35, 45, 0.35)";
        ctx.fillRect(enemy.x - 30, enemy.y - 39, 60, 4);
        ctx.fillStyle = "#e39bdc";
        ctx.fillRect(enemy.x - 30, enemy.y - 39, 60 * enemy.hp / enemy.maxHp, 4);
      }
      return;
    }

    if (enemy.shieldActive) {
      ctx.save();
      const shieldGradient = ctx.createRadialGradient(enemy.x, enemy.y, enemy.radius, enemy.x, enemy.y, enemy.radius + 13);
      shieldGradient.addColorStop(0, "rgba(104, 210, 239, 0.05)");
      shieldGradient.addColorStop(1, "rgba(104, 210, 239, 0.3)");
      ctx.fillStyle = shieldGradient;
      ctx.strokeStyle = "rgba(135, 226, 250, 0.9)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius + 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    if (enemy.holding) {
      ctx.save();
      ctx.strokeStyle = "rgba(255, 163, 145, 0.58)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius + 9 + Math.sin(enemy.phase) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(-Math.PI / 2);
    const scale = enemy.type === "tank" ? 1.18 : enemy.type === "bomber" ? 1.34 : enemy.type === "flak" ? 1.28 : enemy.type === "wraith" ? 0.9 : enemy.type === "dart" ? 0.82 : 1;
    ctx.scale(scale, scale);
    ctx.fillStyle = enemy.type === "tank"
        ? "#9d5d55"
      : enemy.type === "flak"
        ? "#6f556f"
      : enemy.type === "bomber"
        ? "#7f483e"
      : enemy.type === "wraith"
        ? "#655a9c"
      : enemy.type === "guardian"
        ? "#3b8fa5"
        : enemy.type === "prism"
          ? "#d18948"
          : colors.enemy;
    ctx.strokeStyle = colors.enemyEdge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-27, 0);
    ctx.lineTo(17, -12);
    ctx.lineTo(27, 0);
    ctx.lineTo(17, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(9, -8);
    ctx.lineTo(19, -25);
    ctx.lineTo(-4, -11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(9, 8);
    ctx.lineTo(19, 25);
    ctx.lineTo(-4, 11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const enemyCore = enemy.type === "guardian"
      ? "#9defff"
      : enemy.type === "prism" ? "#ffe28b" : enemy.type === "wraith" ? "#d5c6ff" : "#ffc1a6";
    ctx.strokeStyle = enemyCore;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-13, 0);
    ctx.lineTo(2, 0);
    ctx.lineTo(11, -8);
    ctx.moveTo(2, 0);
    ctx.lineTo(11, 8);
    ctx.stroke();
    ctx.fillStyle = "#182633";
    ctx.strokeStyle = enemyCore;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(2, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = enemyCore;
    ctx.beginPath();
    ctx.arc(2, 0, 3.2 + Math.sin(enemy.phase * 3) * 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (enemy.hp < enemy.maxHp) {
      const width = enemy.radius * 2.1;
      ctx.fillStyle = "rgba(20, 35, 45, 0.35)";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width, 3);
      ctx.fillStyle = "#f3a39b";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width * enemy.hp / enemy.maxHp, 3);
    }
  }

function appendProjectileEllipse(projectile) {
    ctx.moveTo(projectile.x + 2.6, projectile.y);
    ctx.ellipse(projectile.x, projectile.y, 2.6, 9, 0, 0, Math.PI * 2);
  }

function drawPlayerBulletBatch(owner, color) {
    ctx.beginPath();
    let hasBullets = false;
    for (let index = 0; index < bullets.length; index += 1) {
      const bullet = bullets[index];
      if ((bullet.owner || 1) !== owner) continue;
      appendProjectileEllipse(bullet);
      hasBullets = true;
    }
    if (!hasBullets) return;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.fill();
  }

function drawSimplifiedEnemyBullets() {
    for (let group = 0; group < 3; group += 1) {
      ctx.beginPath();
      let hasBullets = false;
      for (let index = 0; index < enemyBullets.length; index += 1) {
        const bullet = enemyBullets[index];
        const isBeam = bullet.kind === "beam";
        const isBossProjectile = !isBeam && Boolean(bullet.effect || bullet.color);
        if (group === 0 ? !isBeam : group === 1 ? !isBossProjectile : isBeam || isBossProjectile) continue;
        const radius = Math.max(4, bullet.radius || 5);
        ctx.moveTo(bullet.x + radius, bullet.y);
        ctx.arc(bullet.x, bullet.y, radius, 0, Math.PI * 2);
        hasBullets = true;
      }
      if (!hasBullets) continue;
      ctx.fillStyle = group === 0 ? "#ffd087" : group === 1 ? boss?.color || "#ff9d54" : "#e9685c";
      ctx.fill();
    }
  }
