/**
 * Frost Wing — skill
 * Level-ups, classes, missions, upgrades, bombs, focus, and combat-system UI.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function showLevelUp() {
    if (pendingLevelUps <= 0) return;
    const enteringLevelUp = mode !== "levelup";
    const t = copy[language()];
    mode = "levelup";
    keys.clear();
    overlay.classList.remove("is-hidden");
    overlayCard.classList.add("is-levelup");
    overlayTitle.textContent = t.levelTitle;
    overlayCopy.textContent = bossCommandUpgradeSequence
      ? t.bossPrepCopy(bossCommandTargetLevel, pendingLevelUps)
      : t.levelCopy(level - pendingLevelUps + 1);
    playerSelect.hidden = true;
    classOptions.hidden = true;
    const multiShotButton = levelOptions.querySelector('[data-upgrade="multishot"]');
    if (multiShotButton) {
      const laserClassLocked = players.every((pilot) => pilot.classType === "laser");
      const atMaximum = laserClassLocked || players.every((pilot) => pilot.weapon >= 6);
      multiShotButton.disabled = atMaximum;
      document.getElementById("game-multishot-title").textContent = atMaximum ? t.upgradeComplete : t.multishot;
      document.getElementById("game-multishot-desc").textContent = laserClassLocked
        ? t.multishotClassLocked
        : atMaximum ? t.multishotMax : t.multishotDesc(player.weapon);
    }
    const aegisButton = levelOptions.querySelector('[data-upgrade="aegis_duration"]');
    if (aegisButton) {
      const aegisPilots = players.filter((pilot) => pilot.classType === "aegis");
      const aegisUnlocked = aegisPilots.length > 0;
      const aegisMaxed = aegisUnlocked && aegisPilots.every((pilot) => pilot.aegisUpgradeLevel >= 3);
      const currentAegisDuration = aegisPilots[0]?.aegisDuration ?? 2;
      const currentAegisRank = aegisPilots[0]?.aegisUpgradeLevel ?? 0;
      aegisButton.hidden = !aegisUnlocked;
      aegisButton.disabled = aegisMaxed;
      document.getElementById("game-aegis-title").textContent = aegisMaxed ? t.aegisUpgradeMax : t.aegisUpgrade;
      document.getElementById("game-aegis-desc").textContent = aegisMaxed
        ? t.aegisUpgradeMaxDesc
        : t.aegisUpgradeDesc(currentAegisDuration, Math.min(5, currentAegisDuration + 1), currentAegisRank + 1);
    }
    const fleetSpeedButton = levelOptions.querySelector('[data-upgrade="fleet_speed"]');
    const fleetShotButton = levelOptions.querySelector('[data-upgrade="fleet_multishot"]');
    const fleetCapacityButton = levelOptions.querySelector('[data-upgrade="fleet_capacity"]');
    const fleetSpeedMaxed = players.every((pilot) => pilot.wingmanFireInterval <= 0.17);
    const fleetShotMaxed = players.every((pilot) => pilot.wingmanWeapon >= MAX_WINGMAN_WEAPON);
    const fleetCapacityMaxed = players.every((pilot) => pilot.wingmanMax >= MAX_WINGMEN);
    const armorButton = levelOptions.querySelector('[data-upgrade="armor"]');
    const salvageButton = levelOptions.querySelector('[data-upgrade="salvage"]');
    armorButton.disabled = players.every((pilot) => pilot.armor >= 0.419);
    salvageButton.disabled = players.every((pilot) => pilot.itemLuck >= 0.179);
    fleetSpeedButton.disabled = fleetSpeedMaxed;
    fleetShotButton.disabled = fleetShotMaxed;
    fleetCapacityButton.disabled = fleetCapacityMaxed;
    document.getElementById("game-fleet-speed-title").textContent = fleetSpeedMaxed ? t.fleetMax : t.fleetSpeed;
    document.getElementById("game-fleet-speed-desc").textContent = fleetSpeedMaxed ? t.fleetMaxDesc : t.fleetSpeedDesc(player.wingmanFireInterval);
    document.getElementById("game-fleet-shot-title").textContent = fleetShotMaxed ? t.fleetMax : t.fleetShot;
    document.getElementById("game-fleet-shot-desc").textContent = fleetShotMaxed ? t.fleetMaxDesc : t.fleetShotDesc(player.wingmanWeapon);
    document.getElementById("game-fleet-capacity-title").textContent = fleetCapacityMaxed ? t.fleetMax : t.fleetCapacity;
    document.getElementById("game-fleet-capacity-desc").textContent = fleetCapacityMaxed ? t.fleetMaxDesc : t.fleetCapacityDesc(player.wingmanMax);
    levelOptions.hidden = false;
    startButton.hidden = true;
    if (enteringLevelUp) playLevelSound();
  }

function showClassChoice() {
    if (!pendingClassChoice) return;
    const enteringClassChoice = mode !== "classup";
    const t = copy[language()];
    mode = "classup";
    keys.clear();
    overlay.classList.remove("is-hidden");
    overlayCard.classList.add("is-levelup");
    overlayTitle.textContent = pendingClassTier === 3 ? t.class3Title : pendingClassTier === 2 ? t.class2Title : t.classTitle;
    overlayCopy.textContent = pendingClassTier === 3 ? t.class3Copy : pendingClassTier === 2 ? t.class2Copy : t.classCopy;
    playerSelect.hidden = true;
    levelOptions.hidden = true;
    classOptions.hidden = false;
    classOptions.querySelectorAll("[data-class-tier]").forEach((button) => {
      button.hidden = Number(button.dataset.classTier) !== pendingClassTier;
    });
    startButton.hidden = true;
    if (enteringClassChoice) playTone(360, 880, 0.45, 0.075, "sine");
  }

function chooseClass(type) {
    const validChoices = pendingClassTier === 3
      ? ["nova", "chrono"]
      : pendingClassTier === 2 ? ["overcharge", "vanguard"] : ["laser", "aegis"];
    if (mode !== "classup" || !pendingClassChoice || !validChoices.includes(type)) return;
    players.forEach((pilot) => {
      if (pendingClassTier === 1) pilot.classType = type;
      if (type === "overcharge") {
        pilot.specialization = type;
        pilot.damage *= 1.35;
        pilot.fireInterval = Math.max(0.065, pilot.fireInterval * 0.84);
        pilot.laserInterval = Math.max(0.038, pilot.laserInterval * 0.84);
        pilot.critChance += 0.12;
      } else if (type === "vanguard") {
        pilot.specialization = type;
        pilot.maxHealth += 60;
        pilot.health += 60;
        pilot.speed *= 1.15;
        pilot.armor = Math.min(0.45, pilot.armor + 0.15);
        pilot.shieldHits = Math.max(2, pilot.shieldHits);
      } else if (type === "nova") {
        pilot.specialization = type;
        pilot.novaTimer = 3;
      } else if (type === "chrono") {
        pilot.specialization = type;
        pilot.enemySlow = 0.74;
        pilot.fireInterval = Math.max(0.06, pilot.fireInterval * 0.8);
        pilot.laserInterval = Math.max(0.035, pilot.laserInterval * 0.82);
      }
      pilot.classTier = pendingClassTier;
      pilot.laserActive = false;
      pilot.aegisTimer = 10;
      pilot.aegisActive = 0;
    });
    pendingClassChoice = false;
    playLevelSound();
    if (pendingLevelUps > 0) {
      showLevelUp();
    } else {
      mode = "running";
      hideOverlay();
      lastTime = performance.now();
      canvas.focus({ preventScroll: true });
    }
    updateHud();
  }

function spawnMissionAce() {
    if (boss || enemies.some((enemy) => enemy.type === "ace") || enemies.length >= currentEnemyLimit()) return;
    const power = 1 + Math.max(0, level - 1) * 0.15;
    const hp = Math.ceil((18 + level * 1.6) * power);
    enemies.push({
      type: "ace",
      radius: 27,
      collisionRadius: 18,
      hp,
      maxHp: hp,
      speed: Math.min(230, 132 + level * 2.4),
      points: Math.round(2400 * (1 + level * 0.11)),
      fireDelay: 1.25,
      tripleBeam: true,
      contactDamage: Math.round(38 * (1 + level * 0.07)),
      bulletDamage: Math.round(15 * (1 + level * 0.07)),
      x: WIDTH / 2,
      y: -45,
      phase: Math.random() * Math.PI * 2,
      wobble: 58,
      behavior: "sentry",
      stopY: 155,
      holding: false,
      holdTimer: 13,
      fireTimer: 0.7,
      missionAce: true
    });
    messages.push({
      text: language() === "ko" ? "정예 에이스 출현" : "RIVAL ACE INBOUND",
      x: WIDTH / 2,
      y: HEIGHT * 0.34,
      life: 2,
      color: "#ffd878",
      fixed: true
    });
    playTone(240, 760, 0.5, 0.075, "sawtooth");
  }

function missionDefinition(type) {
    const korean = language() === "ko";
    if (type === "hunter") return {
      type, title: korean ? "요격 명령" : "INTERCEPT ORDER",
      detail: korean ? "폭탄 없이 적 격추" : "Destroy enemies without bombs",
      target: 7 + Math.min(8, Math.floor(level / 4)), time: 34
    };
    if (type === "survivor") return {
      type, title: korean ? "백색 폭풍 생존" : "WHITEOUT SURVIVAL",
      detail: korean ? "제한 시간 생존" : "Survive the timer",
      target: 20, time: 20
    };
    if (type === "collector") return {
      type, title: korean ? "보급 회수" : "SUPPLY RECOVERY",
      detail: korean ? "보급 아이템 획득" : "Collect supply items",
      target: 3, time: 38
    };
    if (type === "untouchable") return {
      type, title: korean ? "무결점 비행" : "GHOST FLIGHT",
      detail: korean ? "피해 없이 비행" : "Fly without taking damage",
      target: 16, time: 28
    };
    return {
      type: "ace", title: korean ? "라이벌 에이스" : "RIVAL ACE",
      detail: korean ? "특수 정예기 격추" : "Destroy the rival ace",
      target: 1, time: 42
    };
  }

function startMission() {
    if (boss || mission) return;
    const available = level >= 7
      ? ["hunter", "survivor", "collector", "untouchable", "ace"]
      : ["hunter", "survivor", "collector", "untouchable"];
    const type = available[missionSerial % available.length];
    missionSerial += 1;
    mission = { ...missionDefinition(type), progress: 0, completed: false };
    if (type === "ace") spawnMissionAce();
    messages.push({
      text: `${language() === "ko" ? "새 미션" : "NEW MISSION"} · ${mission.title}`,
      x: WIDTH / 2,
      y: HEIGHT * 0.28,
      life: 2.2,
      color: "#9eeaff",
      fixed: true
    });
    playTone(420, 860, 0.28, 0.055, "sine");
  }

function rewardMission() {
    if (!mission) return;
    const completedMission = mission;
    const rewardScore = 2200 + level * 280;
    score += rewardScore;
    players.filter((pilot) => pilot.alive).forEach((pilot) => {
      if (completedMission.type === "hunter") pilot.bombs = Math.min(5, pilot.bombs + 1);
      else if (completedMission.type === "survivor") pilot.health = Math.min(pilot.maxHealth, pilot.health + 35);
      else if (completedMission.type === "collector") pilot.shieldHits = Math.max(pilot.shieldHits, 2);
      else if (completedMission.type === "untouchable") pilot.overdriveTimer = Math.max(pilot.overdriveTimer, 10);
      else pilot.wingmanCount = Math.min(pilot.wingmanMax, pilot.wingmanCount + 1);
    });
    messages.push({
      text: `${language() === "ko" ? "미션 완료" : "MISSION COMPLETE"} · +${rewardScore}`,
      x: WIDTH / 2,
      y: HEIGHT * 0.34,
      life: 2.5,
      color: "#fff09a",
      fixed: true
    });
    addExplosion(WIDTH / 2, HEIGHT * 0.38, "#fff2a6", 38);
    playLevelSound();
    mission = null;
    missionCooldown = 9;
  }

function failMission() {
    if (!mission) return;
    messages.push({
      text: language() === "ko" ? "미션 실패 · 다음 명령 대기" : "MISSION FAILED · STANDBY",
      x: WIDTH / 2,
      y: HEIGHT * 0.34,
      life: 1.8,
      color: "#ef9a92",
      fixed: true
    });
    mission = null;
    missionCooldown = 7;
  }

function updateMission(dt) {
    if (boss) return;
    if (!mission) {
      missionCooldown -= dt;
      if (missionCooldown <= 0) startMission();
      return;
    }
    mission.time -= dt;
    if (mission.type === "survivor" || mission.type === "untouchable") mission.progress += dt;
    if (mission.type === "ace" && !enemies.some((enemy) => enemy.type === "ace")) spawnMissionAce();
    if (mission.progress >= mission.target) rewardMission();
    else if (mission.time <= 0) failMission();
  }

function activateFrostDrive() {
    focus = 0;
    frostDriveTimer = 6;
    players.filter((pilot) => pilot.alive).forEach((pilot) => {
      pilot.overdriveTimer = Math.max(pilot.overdriveTimer, 6);
    });
    messages.push({
      text: "FROST DRIVE · 6 SEC",
      x: WIDTH / 2,
      y: HEIGHT * 0.4,
      life: 2,
      color: "#a9f4ff",
      fixed: true
    });
    screenFlash = Math.max(screenFlash, 0.55);
    playTone(180, 1280, 0.65, 0.085, "sawtooth");
  }

function grantXp(amount) {
    xp += amount;
    while (xp >= xpNeeded) {
      xp -= xpNeeded;
      level += 1;
      pendingLevelUps += 1;
      if (level === 5 || level === 15 || level === 25) {
        pendingClassChoice = true;
        pendingClassTier = level === 25 ? 3 : level === 15 ? 2 : 1;
      }
    }
  }

function chooseUpgrade(type) {
    if (mode !== "levelup" || pendingLevelUps <= 0) return;
    if (type === "damage") {
      players.forEach((pilot) => { pilot.damage += 0.5; });
    } else if (type === "speed") {
      players.forEach((pilot) => {
        pilot.fireInterval = Math.max(0.08, pilot.fireInterval * 0.85);
        pilot.laserInterval = Math.max(0.045, pilot.laserInterval * 0.88);
      });
    } else if (type === "health") {
      players.forEach((pilot) => {
        pilot.maxHealth += 25;
        if (pilot.alive) pilot.health = Math.min(pilot.maxHealth, pilot.health + 25);
      });
    } else if (type === "mobility") {
      players.forEach((pilot) => { pilot.speed += 32; });
    } else if (type === "armor" && players.some((pilot) => pilot.armor < 0.419)) {
      players.forEach((pilot) => { pilot.armor = Math.min(0.42, pilot.armor + 0.06); });
    } else if (type === "salvage" && players.some((pilot) => pilot.itemLuck < 0.179)) {
      players.forEach((pilot) => { pilot.itemLuck = Math.min(0.18, pilot.itemLuck + 0.03); });
    } else if (type === "multishot" && players.some((pilot) => pilot.weapon < 6)) {
      players.forEach((pilot) => { pilot.weapon = Math.min(6, pilot.weapon + 1); });
    } else if (
      type === "aegis_duration"
      && players.some((pilot) => pilot.classType === "aegis" && pilot.aegisUpgradeLevel < 3)
    ) {
      players.forEach((pilot) => {
        if (pilot.classType !== "aegis") return;
        pilot.aegisUpgradeLevel = Math.min(3, pilot.aegisUpgradeLevel + 1);
        pilot.aegisDuration = Math.min(5, 2 + pilot.aegisUpgradeLevel);
      });
    } else if (type === "fleet_speed" && players.some((pilot) => pilot.wingmanFireInterval > 0.17)) {
      players.forEach((pilot) => {
        pilot.wingmanFireInterval = Math.max(0.16, pilot.wingmanFireInterval * 0.85);
      });
    } else if (type === "fleet_multishot" && players.some((pilot) => pilot.wingmanWeapon < MAX_WINGMAN_WEAPON)) {
      players.forEach((pilot) => {
        pilot.wingmanWeapon = Math.min(MAX_WINGMAN_WEAPON, pilot.wingmanWeapon + 1);
      });
    } else if (type === "fleet_capacity" && players.some((pilot) => pilot.wingmanMax < MAX_WINGMEN)) {
      players.forEach((pilot) => {
        pilot.wingmanMax = Math.min(MAX_WINGMEN, pilot.wingmanMax + 1);
      });
    } else {
      return;
    }

    playTone(480, 820, 0.2, 0.07, "sine");
    pendingLevelUps -= 1;
    updateHud();
    if (pendingLevelUps > 0) {
      showLevelUp();
    } else {
      bossCommandUpgradeSequence = false;
      mode = "running";
      hideOverlay();
      canvas.focus({ preventScroll: true });
      lastTime = performance.now();
    }
  }

function useBomb(pilot) {
    if (mode !== "running" || pilotTimeLocked(pilot) || !pilot || !pilot.alive || pilot.bombs <= 0) return;
    pilot.bombs -= 1;
    screenFlash = 1;
    playTone(110, 42, 0.55, 0.11, "sawtooth");
    playNoise(0.55, 0.11, 620);
    enemyBullets = [];
    bossBombs = [];
    if (boss && !bossIntro && !bossIsCloaked()) {
      boss.hp -= 36;
      boss.hitFlash = 0.22;
      addExplosion(boss.x, boss.y, "#dff8ff", 24);
      if (boss.hp <= 0) defeatBoss();
    }
    for (let i = enemies.length - 1; i >= 0; i -= 1) {
      const enemy = enemies[i];
      if (enemy.type === "guardian") {
        enemy.shieldActive = false;
        enemy.shieldDisabled = true;
        enemy.shieldTimer = 0;
        enemy.shieldCooldown = Number.POSITIVE_INFINITY;
        enemy.hp -= Math.max(1, Math.ceil(enemy.maxHp * 0.65));
        addExplosion(enemy.x, enemy.y, "#8de0f4", 18);
        if (enemy.hp <= 0) destroyEnemy(i, true, "bomb");
      } else {
        destroyEnemy(i, true, "bomb");
      }
    }
    updateHud();
  }

function drawCombatSystems() {
    ctx.save();
    if (ultimateBanner) {
      const progress = 1 - ultimateBanner.life / ultimateBanner.maxLife;
      const alpha = Math.min(1, ultimateBanner.life * 1.6, progress * 5);
      const centerY = HEIGHT * 0.46;
      ctx.globalAlpha = alpha * 0.3;
      ctx.fillStyle = ultimateBanner.color;
      ctx.fillRect(0, centerY - 58, WIDTH, 116);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = ultimateBanner.color;
      ctx.lineWidth = 3;
      ctx.setLineDash([18, 9]);
      ctx.lineDashOffset = -elapsed * 80;
      ctx.beginPath();
      ctx.moveTo(0, centerY - 58);
      ctx.lineTo(WIDTH, centerY - 58);
      ctx.moveTo(0, centerY + 58);
      ctx.lineTo(WIDTH, centerY + 58);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 28;
      ctx.shadowColor = ultimateBanner.color;
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 13px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(ultimateBanner.label || (language() === "ko" ? "궁극기 감지" : "ULTIMATE DETECTED"), WIDTH / 2, centerY - 20);
      const titleSize = Math.max(20, Math.min(34, WIDTH / Math.max(12, ultimateBanner.title.length) * 0.72));
      ctx.font = `900 ${titleSize}px Roboto, sans-serif`;
      ctx.fillText(ultimateBanner.title, WIDTH / 2, centerY + 15);
      ctx.fillStyle = ultimateBanner.color;
      ctx.font = "800 10px Roboto, sans-serif";
      ctx.fillText(language() === "ko" ? "회피 경로를 확보하세요" : "SECURE AN EVASION ROUTE", WIDTH / 2, centerY + 39);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    if (mission && !boss) {
      const panelX = 18;
      const panelY = 82;
      const panelWidth = Math.min(300, WIDTH - 36);
      const ratio = Math.max(0, Math.min(1, mission.progress / mission.target));
      ctx.fillStyle = "rgba(5, 18, 29, 0.74)";
      ctx.strokeStyle = "rgba(147, 225, 246, 0.45)";
      ctx.lineWidth = 1;
      ctx.fillRect(panelX, panelY, panelWidth, 76);
      ctx.strokeRect(panelX, panelY, panelWidth, 76);
      ctx.fillStyle = "#9eeaff";
      ctx.font = "800 11px Roboto, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(mission.title, panelX + 12, panelY + 18);
      ctx.fillStyle = "rgba(227, 244, 250, 0.82)";
      ctx.font = "600 10px Roboto, sans-serif";
      ctx.fillText(mission.detail, panelX + 12, panelY + 36);
      ctx.textAlign = "right";
      const progressText = mission.type === "survivor" || mission.type === "untouchable"
        ? `${Math.floor(mission.progress)} / ${mission.target}s`
        : `${Math.floor(mission.progress)} / ${mission.target}`;
      ctx.fillText(`${progressText} · ${Math.max(0, Math.ceil(mission.time))}s`, panelX + panelWidth - 12, panelY + 36);
      ctx.fillStyle = "rgba(126, 172, 188, 0.28)";
      ctx.fillRect(panelX + 12, panelY + 53, panelWidth - 24, 8);
      const missionGradient = ctx.createLinearGradient(panelX + 12, 0, panelX + panelWidth - 12, 0);
      missionGradient.addColorStop(0, "#4aa9ca");
      missionGradient.addColorStop(1, "#a8f1ff");
      ctx.fillStyle = missionGradient;
      ctx.fillRect(panelX + 12, panelY + 53, (panelWidth - 24) * ratio, 8);
    }

    if (combo >= 2) {
      const multiplier = 1 + Math.min(2, Math.floor(combo / 5) * 0.25);
      ctx.textAlign = "right";
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 16;
      ctx.shadowColor = "#ffdc7d";
      ctx.fillStyle = "#fff1b1";
      ctx.font = `900 ${Math.min(34, 20 + combo * 0.35)}px Roboto, sans-serif`;
      ctx.fillText(`${combo} COMBO`, WIDTH - 20, 105);
      ctx.fillStyle = "#ffc96e";
      ctx.font = "800 12px Roboto, sans-serif";
      ctx.fillText(`SCORE ×${multiplier.toFixed(2)}`, WIDTH - 20, 125);
    }

    const focusWidth = Math.min(320, WIDTH - 80);
    const focusX = (WIDTH - focusWidth) / 2;
    const focusY = HEIGHT - 20;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(4, 18, 28, 0.72)";
    ctx.fillRect(focusX, focusY, focusWidth, 7);
    if (!focusGradient) {
      focusGradient = ctx.createLinearGradient(focusX, 0, focusX + focusWidth, 0);
      focusGradient.addColorStop(0, "#55bfdc");
      focusGradient.addColorStop(1, "#d7fbff");
    }
    ctx.fillStyle = focusGradient;
    ctx.fillRect(focusX, focusY, focusWidth * (frostDriveTimer > 0 ? 1 : focus / 100), 7);
    ctx.strokeStyle = frostDriveTimer > 0 ? "#ffffff" : "rgba(194, 236, 247, 0.5)";
    ctx.strokeRect(focusX, focusY, focusWidth, 7);
    ctx.fillStyle = frostDriveTimer > 0 ? "#e9fdff" : "rgba(218, 242, 248, 0.78)";
    ctx.font = "800 9px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(frostDriveTimer > 0 ? `FROST DRIVE ${frostDriveTimer.toFixed(1)}s` : "FOCUS · NEAR MISS", WIDTH / 2, focusY - 6);
    if (frostDriveTimer > 0) {
      ctx.strokeStyle = `rgba(157, 239, 255, ${0.18 + Math.sin(elapsed * 8) * 0.08})`;
      ctx.lineWidth = 5;
      ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);
    }
    ctx.restore();
  }
