/**
 * Frost Wing — game loop
 * Frame updates, world simulation orchestration, and final canvas composition.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function update(dt) {
    elapsed += dt;
    if (ultimateBanner) {
      ultimateBanner.life -= dt;
      if (ultimateBanner.life <= 0) ultimateBanner = null;
    }
    score += dt * 12 * (frostDriveTimer > 0 ? 1.5 : 1);
    comboTimer = Math.max(0, comboTimer - dt);
    if (comboTimer <= 0) combo = 0;
    frostDriveTimer = Math.max(0, frostDriveTimer - dt);
    terrainOffset += 82 * dt;
    screenFlash = Math.max(0, screenFlash - dt * 2.2);
    const playerOneControls = players.length === 1 ? SOLO_CONTROLS : PLAYER_ONE_CONTROLS;
    players.forEach((pilot, pilotIndex) => {
      if (pilotTimeLocked(pilot)) {
        pilot.vx = 0;
        pilot.vy = 0;
        pilot.laserActive = false;
        return;
      }
      const controls = pilotIndex === 0
        ? playerOneControls
        : PLAYER_TWO_CONTROLS;
      updatePilot(pilot, controls, dt);
    });

    for (let starIndex = 0; starIndex < stars.length; starIndex += 1) {
      const star = stars[starIndex];
      star.y += star.speed * dt;
      if (star.y > HEIGHT + 5) {
        star.y = -5;
        star.x = Math.random() * WIDTH;
      }
    }

    if (level >= 10 && bossDefeated && !boss2Spawned && !boss2Defeated) spawnBoss2();
    else if (level >= 5 && !bossSpawned && !bossDefeated) spawnBoss();
    else if (level >= 15 && boss2Defeated && !boss) {
      const apexTier = nextApexBossTier();
      if (apexTier) spawnApexBoss(apexTier);
    }
    updateBoss(dt);
    updateMission(dt);

    if (!boss) {
      spawnTimer -= dt;
      if (spawnTimer <= 0 && enemies.length < currentEnemyLimit()) {
        spawnEnemy();
        const interval = Math.max(0.38, 1.08 - elapsed * 0.006);
        const levelSpawnScale = Math.max(0.65, 1 - (level - 1) * 0.035);
        spawnTimer = interval * levelSpawnScale * (0.72 + Math.random() * 0.56);
      }
    }

    for (let index = bullets.length - 1; index >= 0; index -= 1) {
      const bullet = bullets[index];
      const timeScale = pointInsideTimeLock(bullet.x, bullet.y) ? 0 : 1;
      bullet.x += bullet.vx * dt * timeScale;
      bullet.y += bullet.vy * dt * timeScale;
      if (bullet.x <= -20 || bullet.x >= WIDTH + 20 || bullet.y <= -30 || bullet.y >= HEIGHT + 30) {
        removeUnordered(bullets, index);
      }
    }

    for (let i = enemies.length - 1; i >= 0; i -= 1) {
      const enemy = enemies[i];
      enemy.phase += dt * (enemy.type === "dart" ? 4.4 : 2.3);

      if (enemy.type === "assault") {
        let target = players.find((pilot) => pilot.alive && pilot.id === enemy.targetId);
        if (!target) target = players.find((pilot) => pilot.alive);
        if (!target) continue;
        enemy.fireTimer -= dt;
        if (enemy.state === "approach") {
          const targetX = Math.max(35, Math.min(WIDTH - 35, target.x + enemy.targetOffsetX));
          const targetY = Math.max(235, Math.min(HEIGHT - 100, target.y + enemy.targetOffsetY));
          const dx = targetX - enemy.x;
          const dy = targetY - enemy.y;
          const distance = Math.hypot(dx, dy) || 1;
          let separationX = 0;
          let separationY = 0;
          enemies.forEach((other) => {
            if (other === enemy || other.type !== "assault") return;
            const awayX = enemy.x - other.x;
            const awayY = enemy.y - other.y;
            const gap = Math.hypot(awayX, awayY) || 1;
            if (gap >= 50) return;
            const pressure = (50 - gap) / 50;
            separationX += awayX / gap * pressure * 92;
            separationY += awayY / gap * pressure * 72;
          });
          const weave = Math.sin(enemy.phase * 1.7 + enemy.separationPhase) * 24;
          enemy.x += (dx / distance * enemy.speed + separationX + weave) * dt;
          enemy.y += (dy / distance * enemy.speed + separationY) * dt;
          enemy.x = Math.max(enemy.radius, Math.min(WIDTH - enemy.radius, enemy.x));
          enemy.y = Math.max(boss.y + 44, Math.min(HEIGHT - enemy.radius, enemy.y));
          if (enemy.fireTimer <= 0) {
            spawnEnemyBullet(enemy);
            enemy.fireTimer = 1.65 + Math.random() * 0.75;
          }
          if (distance < 38) {
            enemy.state = "arming";
            enemy.holding = true;
            enemy.holdTimer = 2;
            enemy.armedX = enemy.x;
            enemy.armedY = enemy.y;
            playTone(420, 720, 0.16, 0.025, "square");
          }
        } else {
          enemy.holdTimer -= dt;
          enemy.x = enemy.armedX;
          enemy.y = enemy.armedY;
          if (enemy.holdTimer <= 0) {
            const explosionX = enemy.x;
            const explosionY = enemy.y;
            addExplosion(explosionX, explosionY, "#ffb07c", 42);
            players.forEach((pilot) => {
              if (pilot.alive && Math.hypot(pilot.x - explosionX, pilot.y - explosionY) <= 105 + pilot.collisionRadius) {
                damagePlayer(pilot, 38 * (boss?.type === "station" ? boss.damageScale : 1));
              }
            });
            playTone(120, 38, 0.48, 0.09, "sawtooth");
            playNoise(0.48, 0.075, 650);
            destroyEnemy(i, false);
          }
        }
        continue;
      }

      if (enemy.type === "guardian" && !enemy.shieldDisabled) {
        if (enemy.shieldActive) {
          enemy.shieldTimer -= dt;
          if (enemy.shieldTimer <= 0) {
            enemy.shieldActive = false;
            const shieldDuration = Math.min(1.8, 1.2 + Math.max(0, level - 4) * 0.08);
            enemy.shieldCooldown = Math.max(1.2, 3 - shieldDuration);
          }
        } else {
          enemy.shieldCooldown -= dt;
          if (enemy.shieldCooldown <= 0) {
            enemy.shieldActive = true;
            enemy.shieldTimer = Math.min(1.8, 1.2 + Math.max(0, level - 4) * 0.08);
            playTone(340, 780, 0.2, 0.035, "sine");
          }
        }
      }

      if (enemy.behavior === "sentry" && !enemy.holding) {
        enemy.y += enemy.speed * 0.95 * dt;
        if (enemy.y >= enemy.stopY) {
          enemy.y = enemy.stopY;
          enemy.holding = true;
          enemy.fireTimer = 0.55 + Math.random() * 0.5;
        }
      } else if (enemy.behavior === "sentry" && enemy.holding) {
        enemy.holdTimer -= dt;
        if (enemy.holdTimer <= 0) {
          enemy.behavior = "dive";
          enemy.holding = false;
        }
      } else {
        enemy.y += enemy.speed * 1.25 * dt;
      }

      const strafeScale = enemy.holding ? 2.1 : 1;
      enemy.x += Math.sin(enemy.phase) * enemy.wobble * strafeScale * dt;
      enemy.x = Math.max(enemy.radius, Math.min(WIDTH - enemy.radius, enemy.x));
      enemy.fireTimer -= dt;
      const canFire = enemy.y > 80 && (enemy.behavior === "dive" || enemy.holding);
      if (enemy.fireTimer <= 0 && canFire) {
        spawnEnemyBullet(enemy);
        const levelFireScale = Math.max(0.58, 1 - (level - 1) * 0.045);
        if (enemy.type === "prism") {
          const prismLevelScale = Math.max(0.58, 1 - Math.max(0, level - 4) * 0.05);
          enemy.fireTimer = 2.65 * prismLevelScale;
        } else {
          const fireRate = enemy.holding ? 0.65 : 1.18;
          enemy.fireTimer = enemy.fireDelay * fireRate * levelFireScale * (0.8 + Math.random() * 0.45);
        }
      }
      if (enemy.y > HEIGHT + enemy.radius + 10) {
        enemies.splice(i, 1);
        continue;
      }
      const hitPilot = players.find((pilot) => pilot.alive && circlesTouch(pilot, enemy, -1));
      if (hitPilot) {
        destroyEnemy(i, false);
        damagePlayer(hitPilot, enemy.contactDamage);
      }
    }

    const hostileTimeScale = players.reduce((slowest, pilot) => pilot.alive ? Math.min(slowest, pilot.enemySlow) : slowest, 1)
      * (frostDriveTimer > 0 ? 0.58 : 1);
    const bossProjectileScale = boss?.type === "apex" ? 1.24 : 1;
    for (let bulletIndex = 0; bulletIndex < enemyBullets.length; bulletIndex += 1) {
      const bullet = enemyBullets[bulletIndex];
      if (bullet.kind === "seeker") {
        bullet.life -= dt;
        const target = players[bullet.targetId - 1];
        if (target?.alive) {
          const desiredAngle = Math.atan2(target.y - bullet.y, target.x - bullet.x);
          const currentAngle = Math.atan2(bullet.vy, bullet.vx);
          const angleDifference = Math.atan2(Math.sin(desiredAngle - currentAngle), Math.cos(desiredAngle - currentAngle));
          const nextAngle = currentAngle + Math.max(-bullet.turnRate * dt, Math.min(bullet.turnRate * dt, angleDifference));
          bullet.vx = Math.cos(nextAngle) * bullet.speed;
          bullet.vy = Math.sin(nextAngle) * bullet.speed;
        }
      } else if (bullet.kind === "cyclone") {
        bullet.life -= dt;
        bullet.age += dt;
        const spiralAngle = bullet.phase + bullet.age * 7.2;
        bullet.vx = bullet.baseVx + Math.cos(spiralAngle) * bullet.swirl;
        bullet.vy = bullet.baseVy + Math.sin(spiralAngle) * bullet.swirl * 0.32;
      } else if (bullet.life != null) {
        bullet.life -= dt;
      }
      if (bullet.accel) {
        const speed = Math.hypot(bullet.vx, bullet.vy) || 1;
        const nextSpeed = Math.min(620, speed + bullet.accel * dt);
        bullet.vx = bullet.vx / speed * nextSpeed;
        bullet.vy = bullet.vy / speed * nextSpeed;
      }
      if (bullet.curve && bullet.kind !== "seeker" && bullet.kind !== "cyclone") {
        const rotation = bullet.curve * dt;
        const cosine = Math.cos(rotation);
        const sine = Math.sin(rotation);
        const nextVx = bullet.vx * cosine - bullet.vy * sine;
        bullet.vy = bullet.vx * sine + bullet.vy * cosine;
        bullet.vx = nextVx;
      }
      const timeLockScale = pointInsideTimeLock(bullet.x, bullet.y) ? 0.025 : 1;
      bullet.x += bullet.vx * dt * hostileTimeScale * timeLockScale * bossProjectileScale;
      bullet.y += bullet.vy * dt * hostileTimeScale * timeLockScale * bossProjectileScale;
    }
    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBullets[i];
      if ((bullet.life != null && bullet.life <= 0) || bullet.x < -20 || bullet.x > WIDTH + 20 || bullet.y < -20 || bullet.y > HEIGHT + 20) {
        removeUnordered(enemyBullets, i);
      } else {
        let hitPilot = null;
        const bulletCollisionRadius = bullet.collisionRadius == null ? bullet.radius : bullet.collisionRadius;
        for (let pilotIndex = 0; pilotIndex < players.length; pilotIndex += 1) {
          const pilot = players[pilotIndex];
          if (!pilot.alive) continue;
          const dx = pilot.x - bullet.x;
          const dy = pilot.y - bullet.y;
          const distanceSquared = dx * dx + dy * dy;
          const collisionDistance = pilot.collisionRadius + bulletCollisionRadius;
          const hitDistance = collisionDistance - 1;
          if (distanceSquared <= hitDistance * hitDistance) {
            hitPilot = pilot;
            break;
          }
          const pilotMask = 1 << (pilot.id - 1);
          if ((bullet.nearMissMask || 0) & pilotMask) continue;
          const nearDistance = collisionDistance + 30;
          if (distanceSquared > collisionDistance * collisionDistance && distanceSquared <= nearDistance * nearDistance) {
            bullet.nearMissMask = (bullet.nearMissMask || 0) | pilotMask;
            focus = Math.min(100, focus + 3.5);
            score += 45 * (1 + combo * 0.03);
            if (focus >= 100) activateFrostDrive();
          }
        }
        if (!hitPilot) continue;
        removeUnordered(enemyBullets, i);
        const projectileDamageScale = boss?.type === "apex" ? 1.15 : boss?.damageScale ?? 1;
        damagePlayer(hitPilot, (bullet.damage || 12) * projectileDamageScale);
      }
    }

    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      let hit = false;
      // Escort craft take priority while crossing the station silhouette.
      for (let j = enemies.length - 1; j >= 0; j -= 1) {
        const enemy = enemies[j];
        const shieldTarget = enemy.shieldActive
          ? { x: enemy.x, y: enemy.y, collisionRadius: enemy.radius + 11, radius: enemy.radius }
          : enemy;
        if (!circlesTouch(bullets[i], shieldTarget, -2)) continue;
        if (enemy.shieldActive) {
          addExplosion(bullets[i].x, bullets[i].y, "#78d9f2", 7);
          hit = true;
          break;
        }
        enemy.hp -= bullets[i].damage;
        addExplosion(bullets[i].x, bullets[i].y, "#d7f5ff", 4);
        if (enemy.hp <= 0) destroyEnemy(j, true);
        hit = true;
        break;
      }
      if (!hit && boss && !bossIntro && circlesTouch(bullets[i], boss, -4)) {
        if (bossIsCloaked()) {
          addExplosion(bullets[i].x, bullets[i].y, boss.color, 7);
        } else {
          boss.hp -= bullets[i].damage;
          boss.hitFlash = 0.13;
          addExplosion(bullets[i].x, bullets[i].y, "#d7f5ff", 4);
          if (boss.hp <= 0) defeatBoss();
        }
        hit = true;
      }
      if (hit) removeUnordered(bullets, i);
    }

    for (let i = items.length - 1; i >= 0; i -= 1) {
      const item = items[i];
      item.phase += dt * 3;
      item.y += item.driftSpeed * dt;
      if (item.y > HEIGHT + item.radius + 8) {
        items.splice(i, 1);
        continue;
      }
      const collector = players.find((pilot) => pilot.alive && circlesTouch(pilot, item, 3));
      if (!collector) continue;
      const collectedAllItems = collectItem(item, collector);
      if (collectedAllItems) break;
      items.splice(i, 1);
    }

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.life -= dt;
      if (particle.life <= 0) removeUnordered(particles, index);
    }

    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const message = messages[index];
      if (!message.fixed) message.y -= 36 * dt;
      message.life -= dt;
      if (message.life <= 0) messages.splice(index, 1);
    }
    trimPerformancePools();
    updateHud();
  }

function draw() {
    const colors = palette();
    drawBackground(colors);
    drawBossAttacks();

    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 9;
    drawPlayerBulletBatch(1, colors.bullet);
    if (players.length === 2) drawPlayerBulletBatch(2, "#f0b35f");
    ctx.shadowBlur = 0;

    drawPlayerLasers();

    if (renderQuality < 0.8) {
      drawSimplifiedEnemyBullets();
    } else {
      for (let bulletIndex = 0; bulletIndex < enemyBullets.length; bulletIndex += 1) {
      const bullet = enemyBullets[bulletIndex];
      if (bullet.effect && drawApexProjectile(bullet)) continue;
      ctx.save();
      if (bullet.kind === "beam") {
        ctx.translate(bullet.x, bullet.y);
        ctx.rotate(Math.atan2(bullet.vy, bullet.vx));
        ctx.shadowBlur = renderQuality < 0.8 ? 0 : 12;
        ctx.shadowColor = "#ffd087";
        ctx.fillStyle = "#ffd087";
        ctx.fillRect(-16, -3, 32, 6);
        ctx.fillStyle = "#fff6d7";
        ctx.fillRect(-13, -1, 26, 2);
      } else {
        const isBossOrb = bullet.kind === "boss-orb";
        const isSeeker = bullet.kind === "seeker";
        const isPredictor = bullet.kind === "predictor";
        const isNeural = bullet.kind === "neural";
        const isCyclone = bullet.kind === "cyclone";
        const glowColor = isCyclone ? "#b9f3ff" : isSeeker ? "#70e2ff" : isPredictor ? "#db9cff" : isNeural ? "#89ffd2" : isBossOrb ? "#ffc16f" : "#ef8478";
        const fillColor = isCyclone ? "#5ec6e8" : isSeeker ? "#46bdda" : isPredictor ? "#bc6de0" : isNeural ? "#55c99c" : isBossOrb ? "#ff9d54" : "#e9685c";
        ctx.shadowBlur = renderQuality < 0.8 ? 0 : isBossOrb || isSeeker || isPredictor || isNeural || isCyclone ? 16 : 8;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        if (renderQuality >= 0.55 && (isBossOrb || isSeeker || isPredictor || isNeural || isCyclone)) {
          ctx.fillStyle = "#fff2c9";
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
        if (isSeeker && renderQuality >= 0.55) {
          ctx.strokeStyle = "rgba(151, 236, 255, 0.78)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius + 4 + Math.sin(elapsed * 8) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (isCyclone && renderQuality >= 0.8) {
          ctx.strokeStyle = "rgba(214, 250, 255, 0.82)";
          ctx.lineWidth = 2;
          for (let ring = 0; ring < 3; ring += 1) {
            const radius = bullet.radius + 3 + ring * 4;
            ctx.beginPath();
            ctx.arc(
              bullet.x + Math.cos(bullet.phase + bullet.age * 7 + ring * 1.8) * 3,
              bullet.y + Math.sin(bullet.phase + bullet.age * 7 + ring * 1.8) * 3,
              radius,
              bullet.age * 4 + ring,
              bullet.age * 4 + ring + Math.PI * 1.15
            );
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      }
    }

    enemies.forEach((enemy) => drawEnemy(enemy, colors));
    drawBoss();
    items.forEach(drawItem);
    players.forEach((pilot) => drawPlayer(pilot, colors));

    if (renderQuality < 0.8) {
      ctx.globalAlpha = 0.58;
      ctx.fillStyle = "#dff8ff";
      ctx.beginPath();
      for (let particleIndex = 0; particleIndex < particles.length; particleIndex += 1) {
        if (renderQuality < 0.55 && particleIndex % 2) continue;
        if (particleIndex % 3 === 0) continue;
        const particle = particles[particleIndex];
        const size = particle.size * Math.max(0.35, particle.life / particle.maxLife);
        ctx.moveTo(particle.x + size, particle.y);
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      }
      ctx.fill();
    } else {
      for (let particleIndex = 0; particleIndex < particles.length; particleIndex += 1) {
        const particle = particles[particleIndex];
        ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    messages.forEach((message) => {
      if (bossIntro && message.fixed) return;
      ctx.globalAlpha = Math.min(1, message.life * 1.5);
      ctx.fillStyle = message.color;
      ctx.font = "700 16px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(message.text, message.x, message.y);
    });
    ctx.globalAlpha = 1;
    drawBossIntro();
    drawCombatSystems();

    if (screenFlash > 0) {
      ctx.fillStyle = `rgba(226, 248, 255, ${screenFlash * 0.42})`;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  }

function frame(now) {
    const rawFrameTime = (now - lastTime) / 1000 || 0;
    const dt = Math.min(0.034, rawFrameTime);
    lastTime = now;
    if (rawFrameTime > 0) updatePerformanceQuality(Math.min(rawFrameTime, 0.12));
    if (mode === "running") update(dt);
    else {
      terrainOffset += 24 * dt;
      stars.forEach((star) => {
        star.y += star.speed * dt * 0.25;
        if (star.y > HEIGHT + 5) star.y = -5;
      });
    }
    draw();
    requestAnimationFrame(frame);
  }
