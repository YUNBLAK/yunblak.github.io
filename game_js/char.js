/**
 * Frost Wing — char
 * Player aircraft state, controls, weapons, damage, wingmen, and rendering.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function createPilot(id, x) {
    return {
      id,
      x,
      y: HEIGHT - 88,
      radius: 20,
      collisionRadius: 11,
      speed: 310,
      health: 100,
      maxHealth: 100,
      bombs: 1,
      weapon: 1,
      damage: 1,
      fireInterval: 0.19,
      fireTimer: 0,
      vx: 0,
      vy: 0,
      shieldHits: 0,
      wingmanCount: 0,
      wingmanMax: 1,
      wingmanWeapon: 1,
      wingmanFireInterval: 0.48,
      wingmanFireTimer: 0,
      classType: "standard",
      classTier: 0,
      specialization: "",
      armor: 0,
      critChance: 0,
      novaTimer: 8,
      enemySlow: 1,
      hazardSlow: 1,
      overdriveTimer: 0,
      itemLuck: 0,
      laserActive: false,
      laserTick: 0,
      laserInterval: 0.08,
      aegisTimer: 10,
      aegisActive: 0,
      aegisDuration: 2,
      aegisUpgradeLevel: 0,
      invulnerable: 0,
      alive: true
    };
  }

function shoot(pilot) {
    if (!pilot || !pilot.alive || pilot.fireTimer > 0) return;
    const laneGap = 0.075;
    const shotAngles = Array.from(
      { length: pilot.weapon },
      (_, index) => (index - (pilot.weapon - 1) / 2) * laneGap
    );
    shotAngles.forEach((angle) => {
      const speed = 560;
      bullets.push({
        x: pilot.x,
        y: pilot.y - 31,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed,
        radius: 4,
        collisionRadius: 3,
        damage: pilot.damage * (Math.random() < pilot.critChance ? 2 : 1) * (pilot.overdriveTimer > 0 ? 1.5 : 1),
        owner: pilot.id
      });
    });
    playTone(720, 980, 0.045, 0.018, "square");
    pilot.fireTimer = pilot.fireInterval * (pilot.overdriveTimer > 0 ? 0.65 : 1);
  }

function releaseNova(pilot) {
    const count = 22;
    for (let index = 0; index < count; index += 1) {
      const angle = index / count * Math.PI * 2;
      bullets.push({
        x: pilot.x,
        y: pilot.y,
        vx: Math.cos(angle) * 520,
        vy: Math.sin(angle) * 520,
        radius: 6,
        collisionRadius: 5,
        damage: pilot.damage * 3.2,
        owner: pilot.id,
        nova: true
      });
    }
    addExplosion(pilot.x, pilot.y, "#fff3a3", 34);
    playTone(220, 1220, 0.48, 0.08, "sawtooth");
  }

function wingmanPosition(pilot, index = 0) {
    const preferredSide = pilot.id === 2 ? 1 : -1;
    const side = index % 2 === 0 ? preferredSide : -preferredSide;
    const rank = Math.floor(index / 2);
    const distance = 38 + rank * 15;
    return {
      x: Math.max(18, Math.min(WIDTH - 18, pilot.x + side * distance)),
      y: pilot.y + 8 + rank * 10
    };
  }

function shootWingman(pilot) {
    if (pilot.wingmanCount <= 0 || pilot.wingmanFireTimer > 0) return;
    pilot.wingmanFireTimer = pilot.wingmanFireInterval;
    for (let fighterIndex = 0; fighterIndex < pilot.wingmanCount; fighterIndex += 1) {
      const position = wingmanPosition(pilot, fighterIndex);
      const angles = Array.from(
        { length: pilot.wingmanWeapon },
        (_, lane) => (lane - (pilot.wingmanWeapon - 1) / 2) * 0.085
      );
      angles.forEach((angle) => {
        const speed = 500;
        bullets.push({
          x: position.x,
          y: position.y - 16,
          vx: Math.sin(angle) * speed,
          vy: -Math.cos(angle) * speed,
          radius: 3,
          collisionRadius: 2,
          damage: Math.max(0.75, pilot.damage * 0.7),
          owner: pilot.id,
          wingman: true
        });
      });
    }
    playTone(620, 820, 0.035, 0.01, "square");
  }

function updatePlayerLaser(pilot, dt) {
    pilot.laserTick -= dt;
    if (pilot.laserTick > 0) return;
    pilot.laserTick = pilot.laserInterval * (pilot.overdriveTimer > 0 ? 0.65 : 1);
    const laserDamage = Math.max(0.6, pilot.damage * 0.72) * (pilot.overdriveTimer > 0 ? 1.5 : 1);

    let targetIndex = -1;
    let closestY = -Infinity;
    enemies.forEach((enemy, index) => {
      if (enemy.y >= pilot.y || Math.abs(enemy.x - pilot.x) > enemy.collisionRadius + 7) return;
      if (enemy.y > closestY) {
        closestY = enemy.y;
        targetIndex = index;
      }
    });
    if (targetIndex >= 0) {
      const enemy = enemies[targetIndex];
      if (enemy.shieldActive) {
        addExplosion(pilot.x, enemy.y, "#78d9f2", 4);
        return;
      }
      enemy.hp -= laserDamage;
      addExplosion(pilot.x, enemy.y, "#d7f5ff", 3);
      if (enemy.hp <= 0) destroyEnemy(targetIndex, true);
      return;
    }

    if (boss && !bossIntro && pilot.y > boss.y && Math.abs(pilot.x - boss.x) <= boss.collisionRadius + 7) {
      if (bossIsCloaked()) {
        addExplosion(pilot.x, boss.y + boss.radius * 0.5, boss.color, 2);
        return;
      }
      boss.hp -= laserDamage;
      boss.hitFlash = 0.08;
      addExplosion(pilot.x, boss.y + boss.radius * 0.5, "#c9f8ff", 2);
      if (boss.hp <= 0) defeatBoss();
    }
  }

function destroyWingman(pilot) {
    if (!pilot || pilot.wingmanCount <= 0) return;
    const position = wingmanPosition(pilot, pilot.wingmanCount - 1);
    pilot.wingmanCount -= 1;
    addExplosion(position.x, position.y, "#a9e6f7", 24);
    playTone(310, 90, 0.3, 0.06, "sawtooth");
    playNoise(0.25, 0.045, 760);
  }

function damagePlayer(pilot, amount) {
    if (!pilot || !pilot.alive || pilot.invulnerable > 0 || mode !== "running") return;
    amount *= 1 - pilot.armor;
    if (pilot.aegisActive > 0) {
      pilot.invulnerable = 0.12;
      addExplosion(pilot.x, pilot.y, "#ffe39a", 5);
      return;
    }
    if (pilot.shieldHits > 0) {
      pilot.shieldHits -= 1;
      pilot.invulnerable = 0.38;
      addExplosion(pilot.x, pilot.y, "#aaa8ff", 12);
      playTone(760, 420, 0.16, 0.05, "sine");
      updateHud();
      return;
    }
    if (pilot.wingmanCount > 0) {
      destroyWingman(pilot);
      pilot.invulnerable = 0.38;
      return;
    }
    pilot.health -= amount;
    combo = 0;
    comboTimer = 0;
    if (mission?.type === "untouchable") failMission();
    pilot.invulnerable = 0.9;
    screenFlash = Math.max(screenFlash, 0.35);
    addExplosion(pilot.x, pilot.y, "#9adcf4", 12);
    playTone(150, 70, 0.22, 0.085, "sawtooth");
    playNoise(0.16, 0.05, 540);
    if (pilot.health <= 0) {
      pilot.health = 0;
      pilot.alive = false;
      addExplosion(pilot.x, pilot.y, "#eaf8ff", 38);
      if (!players.some((candidate) => candidate.alive)) {
        mode = "gameover";
        showOverlay("gameover");
      }
    }
    updateHud(!pilot.alive);
  }

function addMessage(text, color, pilot) {
    const target = pilot || player;
    messages.push({ text, x: target.x, y: target.y - 30, life: 1.1, color });
  }

function updatePilot(pilot, controls, dt) {
    if (!pilot || !pilot.alive) return;
    const isPressed = (binding) => {
      const bindings = Array.isArray(binding) ? binding : [binding];
      return bindings.some((code) => keys.has(code));
    };
    pilot.fireTimer = Math.max(0, pilot.fireTimer - dt);
    pilot.wingmanFireTimer = Math.max(0, pilot.wingmanFireTimer - dt);
    pilot.invulnerable = Math.max(0, pilot.invulnerable - dt);
    pilot.overdriveTimer = Math.max(0, pilot.overdriveTimer - dt);
    const hazardSlow = pilot.hazardSlow || 1;
    pilot.hazardSlow = 1;
    if (pilot.specialization === "nova") {
      pilot.novaTimer -= dt;
      if (pilot.novaTimer <= 0) {
        pilot.novaTimer = 8;
        releaseNova(pilot);
      }
    }
    if (pilot.classType === "aegis") {
      pilot.aegisTimer -= dt;
      pilot.aegisActive = Math.max(0, pilot.aegisActive - dt);
      if (pilot.aegisTimer <= 0) {
        pilot.aegisTimer = 10;
        pilot.aegisActive = pilot.aegisDuration;
        playTone(420, 920, 0.28, 0.06, "sine");
      }
    }
    let dx = 0;
    let dy = 0;
    if (isPressed(controls.left)) dx -= 1;
    if (isPressed(controls.right)) dx += 1;
    if (isPressed(controls.up)) dy -= 1;
    if (isPressed(controls.down)) dy += 1;
    if (pilot.id === 1 && mobileInput.active) {
      dx = mobileInput.dx;
      dy = mobileInput.dy;
    }
    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      const strength = Math.min(1, length);
      pilot.vx = dx / length * pilot.speed * strength * hazardSlow;
      pilot.vy = dy / length * pilot.speed * strength * hazardSlow;
      pilot.x += pilot.vx * dt;
      pilot.y += pilot.vy * dt;
    } else {
      pilot.vx *= Math.max(0, 1 - dt * 12);
      pilot.vy *= Math.max(0, 1 - dt * 12);
    }
    pilot.x = Math.max(34, Math.min(WIDTH - 42, pilot.x));
    pilot.y = Math.max(34, Math.min(HEIGHT - 34, pilot.y));
    shootWingman(pilot);
    if (pilot.classType === "laser") {
      const wasActive = pilot.laserActive;
      pilot.laserActive = isPressed(controls.fire) || (pilot.id === 1 && mobileInput.fire);
      if (pilot.laserActive) {
        if (!wasActive) playTone(180, 960, 0.35, 0.055, "sawtooth");
        updatePlayerLaser(pilot, dt);
      }
    } else {
      pilot.laserActive = false;
      if (isPressed(controls.fire) || (pilot.id === 1 && mobileInput.fire)) shoot(pilot);
    }
  }

  function drawPlayerShield(pilot) {
    if (pilot.shieldHits <= 0 && pilot.aegisActive <= 0) return;
    const isAegis = pilot.aegisActive > 0;
    const primary = isAegis ? "#ffe177" : "#9b9cff";
    const secondary = isAegis ? "#72eaff" : "#72d9ff";
    const radius = 36 + Math.sin(elapsed * 7 + pilot.id) * 1.7;
    const rotation = elapsed * (isAegis ? 0.72 : 0.42);
    ctx.save();
    ctx.translate(pilot.x, pilot.y);
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : isAegis ? 23 : 16;
    ctx.shadowColor = primary;

    if (renderQuality >= 0.8) {
      const field = ctx.createRadialGradient(0, 0, 12, 0, 0, radius + 9);
      field.addColorStop(0, "rgba(255,255,255,0)");
      field.addColorStop(0.68, isAegis ? "rgba(255,225,119,0.025)" : "rgba(155,156,255,0.025)");
      field.addColorStop(1, isAegis ? "rgba(91,225,255,0.18)" : "rgba(117,137,255,0.18)");
      ctx.fillStyle = field;
      ctx.beginPath();
      ctx.arc(0, 0, radius + 7, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.rotate(rotation);
    ctx.fillStyle = isAegis ? "rgba(255,225,119,0.055)" : "rgba(140,143,255,0.07)";
    ctx.strokeStyle = primary;
    ctx.lineWidth = isAegis ? 3.2 : 2.5;
    ctx.beginPath();
    for (let point = 0; point < 6; point += 1) {
      const angle = point / 6 * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (!point) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.rotate(-rotation * 2.25);
    ctx.strokeStyle = secondary;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(isAegis ? [12, 6] : [7, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, radius + 6, -0.18, Math.PI * 0.78);
    ctx.arc(0, 0, radius + 6, Math.PI - 0.18, Math.PI * 1.78);
    ctx.stroke();
    ctx.setLineDash([]);

    if (renderQuality >= 0.55) {
      for (let node = 0; node < 6; node += 1) {
        const angle = node / 6 * Math.PI * 2 + rotation;
        const nodeX = Math.cos(angle) * (radius + 5);
        const nodeY = Math.sin(angle) * (radius + 5);
        ctx.fillStyle = node % 2 ? secondary : primary;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, isAegis ? 2.7 : 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!isAegis) {
      ctx.rotate(rotation * 1.25);
      ctx.fillStyle = "#ededff";
      ctx.font = "900 10px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${pilot.shieldHits}`, 0, -radius - 10);
    }
    ctx.restore();
  }

  function drawPlayerHealthBar(pilot) {
    const ratio = Math.max(0, Math.min(1, pilot.health / pilot.maxHealth));
    const width = 56;
    const height = 6;
    const y = Math.min(HEIGHT - 11, pilot.y + 42);
    const x = Math.max(4, Math.min(WIDTH - width - 4, pilot.x - width / 2));
    const healthyColor = pilot.id === 2 ? "#f1b75e" : "#69d7ef";
    const healthColor = ratio <= 0.25 ? "#ff6f6f" : ratio <= 0.5 ? "#f2c464" : healthyColor;
    ctx.save();
    ctx.fillStyle = "rgba(3, 13, 21, 0.84)";
    ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    ctx.fillStyle = "rgba(107, 135, 149, 0.34)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = healthColor;
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 7;
    ctx.shadowColor = healthColor;
    ctx.fillRect(x, y, width * ratio, height);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(228, 247, 255, 0.72)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    if (players.length === 2) {
      ctx.fillStyle = pilot.id === 2 ? "#ffd99d" : "#a8eaff";
      ctx.font = "900 9px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`P${pilot.id}`, pilot.x, y - 3);
    }
    ctx.restore();
  }

  function drawPlayer(pilot, colors) {
    if (!pilot.alive) return;
    if (pilot.invulnerable > 0 && Math.floor(pilot.invulnerable * 16) % 2 === 0) {
      drawPlayerShield(pilot);
      drawPlayerHealthBar(pilot);
      return;
    }
    const isPlayerTwo = pilot.id === 2;
    const accent = isPlayerTwo ? "#f0a84d" : "#61c8ef";
    const coreColor = isPlayerTwo ? "#ffe29a" : "#bdf4ff";
    ctx.save();
    ctx.translate(pilot.x + 9, pilot.y + 14);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = colors.shadow;
    ctx.beginPath();
    ctx.ellipse(0, 0, 34, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(pilot.x, pilot.y);
    ctx.rotate(-Math.PI / 2);

    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 13;
    ctx.shadowColor = accent;
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.52 + Math.sin(elapsed * 18 + pilot.id) * 0.12;
    [-8, 8].forEach((engineY) => {
      ctx.beginPath();
      ctx.moveTo(-23, engineY - 3);
      ctx.lineTo(-42 - Math.sin(elapsed * 24 + engineY) * 5, engineY);
      ctx.lineTo(-23, engineY + 3);
      ctx.closePath();
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#172d3d";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(38, 0);
    ctx.lineTo(17, -8);
    ctx.lineTo(3, -30);
    ctx.lineTo(-11, -32);
    ctx.lineTo(-7, -15);
    ctx.lineTo(-28, -9);
    ctx.lineTo(-23, 0);
    ctx.lineTo(-28, 9);
    ctx.lineTo(-7, 15);
    ctx.lineTo(-11, 32);
    ctx.lineTo(3, 30);
    ctx.lineTo(17, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPlayerTwo ? "#fff0cd" : "#eaf9ff";
    ctx.strokeStyle = isPlayerTwo ? "#c47c2d" : "#4fa6c9";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(31, 0);
    ctx.lineTo(10, -7);
    ctx.lineTo(-15, -9);
    ctx.lineTo(-21, 0);
    ctx.lineTo(-15, 9);
    ctx.lineTo(10, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPlayerTwo ? "#e8b967" : "#8cd8ee";
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(4, side * 10);
      ctx.lineTo(-6, side * 28);
      ctx.lineTo(-17, side * 28);
      ctx.lineTo(-10, side * 13);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#193544";
      ctx.fillRect(-8, side * 22 - 3, 10, 6);
      ctx.fillStyle = isPlayerTwo ? "#e8b967" : "#8cd8ee";
    });

    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-16, -8);
    ctx.lineTo(3, -8);
    ctx.lineTo(13, -3);
    ctx.moveTo(-16, 8);
    ctx.lineTo(3, 8);
    ctx.lineTo(13, 3);
    ctx.stroke();

    ctx.fillStyle = "#0d2432";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(6, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = coreColor;
    ctx.beginPath();
    for (let point = 0; point < 6; point += 1) {
      const angle = point / 6 * Math.PI * 2;
      const x = 6 + Math.cos(angle) * 5.5;
      const y = Math.sin(angle) * 5.5;
      if (!point) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    drawPlayerShield(pilot);
    drawPlayerHealthBar(pilot);

    for (let fighterIndex = 0; fighterIndex < pilot.wingmanCount; fighterIndex += 1) {
      const position = wingmanPosition(pilot, fighterIndex);
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 8;
      ctx.shadowColor = pilot.id === 2 ? "#f0a84d" : "#61c8ef";
      ctx.fillStyle = "#183443";
      ctx.strokeStyle = pilot.id === 2 ? "#e5a14d" : "#72d5ef";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(-7, -5);
      ctx.lineTo(-14, 7);
      ctx.lineTo(-5, 5);
      ctx.lineTo(0, 13);
      ctx.lineTo(5, 5);
      ctx.lineTo(14, 7);
      ctx.lineTo(7, -5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = pilot.id === 2 ? "#ffe0a1" : "#bdf4ff";
      ctx.beginPath();
      ctx.arc(0, -2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

function drawPlayerLasers() {
    players.forEach((pilot) => {
      if (!pilot.alive || !pilot.laserActive) return;
      const beamBottom = pilot.y - 28;
      const flicker = 7 + Math.random() * 5;
      ctx.save();
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 24;
      ctx.shadowColor = pilot.id === 2 ? "#ffc76d" : "#76e7ff";
      const gradient = ctx.createLinearGradient(pilot.x - flicker, 0, pilot.x + flicker, 0);
      gradient.addColorStop(0, "rgba(89, 208, 242, 0.08)");
      gradient.addColorStop(0.32, pilot.id === 2 ? "rgba(255, 184, 82, 0.78)" : "rgba(84, 215, 250, 0.78)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.98)");
      gradient.addColorStop(0.68, pilot.id === 2 ? "rgba(255, 184, 82, 0.78)" : "rgba(84, 215, 250, 0.78)");
      gradient.addColorStop(1, "rgba(89, 208, 242, 0.08)");
      ctx.fillStyle = gradient;
      ctx.fillRect(pilot.x - flicker, 0, flicker * 2, beamBottom);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(pilot.x - 2, 0, 4, beamBottom);
      ctx.restore();
    });
  }

function resetMobileJoystick(pointerId) {
    if (pointerId != null && mobileInput.pointerId !== pointerId) return;
    mobileInput.active = false;
    mobileInput.pointerId = null;
    mobileInput.dx = 0;
    mobileInput.dy = 0;
    if (joystickKnob) joystickKnob.style.transform = "translate3d(0, 0, 0)";
  }

function updateMobileJoystick(event) {
    if (!joystick || mobileInput.pointerId !== event.pointerId) return;
    const rect = joystick.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDistance = rect.width * 0.32;
    const rawX = event.clientX - centerX;
    const rawY = event.clientY - centerY;
    const distance = Math.hypot(rawX, rawY);
    const scale = distance > maxDistance ? maxDistance / distance : 1;
    const knobX = rawX * scale;
    const knobY = rawY * scale;
    mobileInput.dx = knobX / maxDistance;
    mobileInput.dy = knobY / maxDistance;
    joystickKnob.style.transform = `translate3d(${knobX}px, ${knobY}px, 0)`;
  }
