(function () {
  "use strict";

  const canvas = document.getElementById("flight-game");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const scoreEl = document.getElementById("game-score");
  const levelEl = document.getElementById("game-level");
  const xpEl = document.getElementById("game-xp");
  const healthEl = document.getElementById("game-health");
  const healthBarEl = document.getElementById("game-health-bar");
  const weaponEl = document.getElementById("game-weapon");
  const bombsEl = document.getElementById("game-bombs");
  const overlay = document.getElementById("game-overlay");
  const overlayTitle = document.getElementById("game-overlay-title");
  const overlayCopy = document.getElementById("game-overlay-copy");
  const overlayCard = document.getElementById("game-overlay-card");
  const playerSelect = document.getElementById("game-player-select");
  const levelOptions = document.getElementById("game-level-options");
  const startButton = document.getElementById("game-start");
  const soundButton = document.getElementById("game-sound-toggle");

  const copy = {
    en: {
      readyTitle: "Ready for takeoff?",
      readyCopy: "Choose 1P for a solo flight or 2P for local co-op.",
      start: "Start Mission",
      pauseTitle: "Mission paused",
      pauseCopy: "Take a breath. Your flight will resume exactly where you left it.",
      resume: "Resume Flight",
      overTitle: "Mission complete",
      overCopy: (score, kills) => `Final score ${score.toLocaleString()} · ${kills} enemies destroyed`,
      restart: "Fly Again",
      levelTitle: "Level up!",
      levelCopy: (level) => `Level ${level} reached. Choose one stat to upgrade.`,
      multishot: "Multi-shot",
      multishotDesc: (current) => `Add one bullet lane (${current} → ${current + 1} / 6)`,
      upgradeComplete: "Upgrade complete",
      multishotMax: "Maximum 6-way shot reached",
      mute: "Mute sound",
      unmute: "Turn sound on",
      heal: "+ Health",
      bomb: "+ Bomb"
    },
    ko: {
      readyTitle: "이륙 준비가 되셨나요?",
      readyCopy: "혼자 비행할지, 2인 협동으로 비행할지 선택하세요.",
      start: "미션 시작",
      pauseTitle: "미션 일시정지",
      pauseCopy: "잠시 쉬어가세요. 현재 위치에서 그대로 비행을 재개할 수 있습니다.",
      resume: "비행 계속하기",
      overTitle: "미션 종료",
      overCopy: (score, kills) => `최종 점수 ${score.toLocaleString()} · 적 ${kills}기 격추`,
      restart: "다시 비행하기",
      levelTitle: "레벨 업!",
      levelCopy: (level) => `레벨 ${level} 달성! 강화할 스탯을 하나 선택하세요.`,
      multishot: "다중 사격",
      multishotDesc: (current) => `공격 갈래 1개 증가 (${current} → ${current + 1} / 6)`,
      upgradeComplete: "업그레이드 완료",
      multishotMax: "최대 6갈래에 도달했습니다",
      mute: "소리 끄기",
      unmute: "소리 켜기",
      heal: "+ 체력",
      bomb: "+ 폭탄"
    }
  };

  const keys = new Set();
  let mode = "ready";
  let player;
  let players = [];
  let selectedPlayerCount = 1;
  let bullets = [];
  let enemies = [];
  let enemyBullets = [];
  let items = [];
  let particles = [];
  let messages = [];
  let stars = [];
  let terrainFeatures = [];
  let terrainOffset = 0;
  let score = 0;
  let kills = 0;
  let level = 1;
  let xp = 0;
  let xpNeeded = 5;
  let pendingLevelUps = 0;
  let elapsed = 0;
  let spawnTimer = 0;
  let screenFlash = 0;
  let lastTime = performance.now();
  let audioContext = null;
  let masterGain = null;
  let soundMuted = false;

  try {
    soundMuted = localStorage.getItem("frostWingMuted") === "true";
  } catch (error) {}

  function language() {
    return document.documentElement.getAttribute("lang") === "ko" ? "ko" : "en";
  }

  function ensureAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = soundMuted ? 0 : 0.72;
      masterGain.connect(audioContext.destination);
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return true;
  }

  function playTone(frequency, endFrequency, duration, volume, type, delay) {
    if (soundMuted || !ensureAudio()) return;
    const start = audioContext.currentTime + (delay || 0);
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(Math.max(20, frequency), start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency || frequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function playNoise(duration, volume, cutoff) {
    if (soundMuted || !ensureAudio()) return;
    const length = Math.max(1, Math.floor(audioContext.sampleRate * duration));
    const buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 1.8);
    }
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    filter.type = "lowpass";
    filter.frequency.value = cutoff || 900;
    gain.gain.value = volume;
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start();
  }

  function playLevelSound() {
    playTone(440, 440, 0.14, 0.07, "sine", 0);
    playTone(554, 554, 0.14, 0.07, "sine", 0.12);
    playTone(659, 880, 0.28, 0.08, "sine", 0.24);
  }

  function updateSoundButton() {
    const t = copy[language()];
    const label = soundMuted ? t.unmute : t.mute;
    soundButton.setAttribute("aria-label", label);
    soundButton.setAttribute("title", label);
    soundButton.setAttribute("aria-pressed", soundMuted ? "true" : "false");
    const icon = soundButton.querySelector("i");
    if (icon) icon.className = soundMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
  }

  function toggleSound() {
    soundMuted = !soundMuted;
    try {
      localStorage.setItem("frostWingMuted", String(soundMuted));
    } catch (error) {}
    if (!soundMuted) ensureAudio();
    if (masterGain && audioContext) {
      masterGain.gain.setTargetAtTime(soundMuted ? 0 : 0.72, audioContext.currentTime, 0.02);
    }
    updateSoundButton();
    if (!soundMuted) playTone(520, 740, 0.12, 0.05, "sine");
  }

  function palette() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    return dark ? {
      groundTop: "#173440",
      groundBottom: "#214c5b",
      grid: "rgba(139, 197, 218, 0.12)",
      river: "rgba(64, 117, 138, 0.72)",
      riverEdge: "rgba(136, 195, 216, 0.18)",
      feature: "#2c5a67",
      featureEdge: "#6f9eaa",
      shadow: "rgba(2, 17, 25, 0.2)",
      snow: "rgba(224, 244, 252, 0.74)",
      player: "#e5f5fb",
      playerEdge: "#6ab4d9",
      canopy: "#68b6dc",
      engine: "#8fe2ff",
      bullet: "#dff8ff",
      enemy: "#cf7b72",
      enemyEdge: "#ffd0c8"
    } : {
      groundTop: "#dcecf1",
      groundBottom: "#bfd9e2",
      grid: "rgba(73, 133, 158, 0.12)",
      river: "rgba(156, 204, 220, 0.74)",
      riverEdge: "rgba(255, 255, 255, 0.5)",
      feature: "#a7c8d2",
      featureEdge: "#7ca9b7",
      shadow: "rgba(54, 91, 106, 0.12)",
      snow: "rgba(255, 255, 255, 0.9)",
      player: "#f8fdff",
      playerEdge: "#397ca4",
      canopy: "#70b8d8",
      engine: "#2e91c2",
      bullet: "#187db2",
      enemy: "#b85f58",
      enemyEdge: "#7f3935"
    };
  }

  function makeStars() {
    stars = Array.from({ length: 86 }, () => ({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      radius: 0.7 + Math.random() * 2,
      speed: 22 + Math.random() * 70,
      alpha: 0.25 + Math.random() * 0.65
    }));
    terrainFeatures = Array.from({ length: 18 }, () => ({
      x: 45 + Math.random() * (WIDTH - 90),
      y: Math.random() * (HEIGHT + 200) - 100,
      radius: 20 + Math.random() * 58,
      kind: Math.floor(Math.random() * 3),
      stretch: 0.55 + Math.random() * 0.8
    }));
  }

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
      invulnerable: 0,
      alive: true
    };
  }

  function resetGame() {
    player = createPilot(1, selectedPlayerCount === 2 ? WIDTH * 0.38 : WIDTH / 2);
    players = [player];
    if (selectedPlayerCount === 2) players.push(createPilot(2, WIDTH * 0.62));
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    particles = [];
    messages = [];
    score = 0;
    kills = 0;
    level = 1;
    xp = 0;
    xpNeeded = 5;
    pendingLevelUps = 0;
    elapsed = 0;
    spawnTimer = 0.55;
    screenFlash = 0;
    terrainOffset = 0;
    makeStars();
    updateHud();
  }

  function showOverlay(kind) {
    const t = copy[language()];
    overlay.classList.remove("is-hidden");
    overlayCard.classList.remove("is-levelup");
    playerSelect.hidden = true;
    levelOptions.hidden = true;
    startButton.hidden = false;
    if (kind === "paused") {
      overlayTitle.textContent = t.pauseTitle;
      overlayCopy.textContent = t.pauseCopy;
      startButton.textContent = t.resume;
    } else if (kind === "gameover") {
      overlayTitle.textContent = t.overTitle;
      overlayCopy.textContent = t.overCopy(Math.floor(score), kills);
      playerSelect.hidden = false;
      startButton.hidden = true;
    } else {
      overlayTitle.textContent = t.readyTitle;
      overlayCopy.textContent = t.readyCopy;
      playerSelect.hidden = false;
      startButton.hidden = true;
    }
  }

  function showLevelUp() {
    if (pendingLevelUps <= 0) return;
    const enteringLevelUp = mode !== "levelup";
    const t = copy[language()];
    mode = "levelup";
    keys.clear();
    overlay.classList.remove("is-hidden");
    overlayCard.classList.add("is-levelup");
    overlayTitle.textContent = t.levelTitle;
    overlayCopy.textContent = t.levelCopy(level - pendingLevelUps + 1);
    playerSelect.hidden = true;
    const multiShotButton = levelOptions.querySelector('[data-upgrade="multishot"]');
    if (multiShotButton) {
      const atMaximum = players.every((pilot) => pilot.weapon >= 6);
      multiShotButton.disabled = atMaximum;
      document.getElementById("game-multishot-title").textContent = atMaximum ? t.upgradeComplete : t.multishot;
      document.getElementById("game-multishot-desc").textContent = atMaximum ? t.multishotMax : t.multishotDesc(player.weapon);
    }
    levelOptions.hidden = false;
    startButton.hidden = true;
    if (enteringLevelUp) playLevelSound();
  }

  function hideOverlay() {
    overlay.classList.add("is-hidden");
  }

  function startGame(playerCount) {
    if (mode === "levelup") return;
    if (mode === "ready" || mode === "gameover") {
      selectedPlayerCount = playerCount === 2 ? 2 : 1;
      resetGame();
    }
    mode = "running";
    hideOverlay();
    canvas.focus({ preventScroll: true });
    lastTime = performance.now();
  }

  function togglePause() {
    if (mode === "running") {
      mode = "paused";
      showOverlay("paused");
    } else if (mode === "paused") {
      startGame();
    }
  }

  function updateHud() {
    scoreEl.textContent = Math.floor(score).toString().padStart(6, "0");
    levelEl.textContent = `LV.${level}`;
    xpEl.textContent = `${xp} / ${xpNeeded} XP`;
    const isCoop = players.length === 2;
    const setPlayerRows = (element, values) => {
      element.replaceChildren(...values.map((value, index) => {
        const row = document.createElement("span");
        row.className = `coop-player-row coop-player-${index + 1}`;
        row.textContent = `P${index + 1} ${value}`;
        return row;
      }));
    };
    if (isCoop) {
      setPlayerRows(healthEl, players.map((pilot) => `${Math.max(0, Math.ceil(pilot.health))}/${pilot.maxHealth}`));
      setPlayerRows(weaponEl, players.map((pilot) => `${pilot.weapon}W`));
      setPlayerRows(bombsEl, players.map((pilot) => pilot.bombs));
    } else {
      healthEl.textContent = `${Math.max(0, Math.ceil(player.health))} / ${player.maxHealth}`;
      weaponEl.textContent = `${player.weapon}-WAY`;
      bombsEl.textContent = player.bombs;
    }
    [healthEl, weaponEl, bombsEl].forEach((element) => element.classList.toggle("coop-value", isCoop));
    const totalHealth = players.reduce((total, pilot) => total + Math.max(0, pilot.health), 0);
    const totalMaxHealth = players.reduce((total, pilot) => total + pilot.maxHealth, 0);
    const healthPercent = Math.max(0, totalHealth / totalMaxHealth * 100);
    healthBarEl.style.width = `${healthPercent}%`;
    healthBarEl.style.backgroundColor = healthPercent > 55 ? "#4ea187" : healthPercent > 25 ? "#d69a4b" : "#d6665d";
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
        damage: pilot.damage,
        owner: pilot.id
      });
    });
    playTone(720, 980, 0.045, 0.018, "square");
    pilot.fireTimer = pilot.fireInterval;
  }

  function spawnEnemy() {
    const difficulty = Math.min(1, elapsed / 100);
    const roll = Math.random();
    const eliteChance = level >= 4 ? Math.min(0.5, 0.22 + (level - 4) * 0.04) : 0;
    const enemyPower = 1 + (level - 1) * 0.16;
    const enemySpeedScale = Math.min(1.65, 1 + (level - 1) * 0.035);
    let enemy;
    if (level >= 4 && Math.random() < eliteChance) {
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
    const baseContactDamage = enemy.type === "tank" ? 34 : enemy.type === "guardian" || enemy.type === "prism" ? 30 : 24;
    enemy.contactDamage = Math.round(baseContactDamage * (1 + (level - 1) * 0.08));
    const baseBulletDamage = enemy.type === "prism" ? 8 : 12;
    enemy.bulletDamage = Math.round(baseBulletDamage * (1 + (level - 1) * 0.08));
    enemy.maxHp = enemy.hp;
    enemy.x = 55 + Math.random() * (WIDTH - 110);
    enemy.y = -enemy.radius - 10;
    enemy.phase = Math.random() * Math.PI * 2;
    enemy.wobble = enemy.type === "dart" ? 28 : enemy.type === "prism" ? 22 : 14;
    const isElite = enemy.type === "guardian" || enemy.type === "prism";
    const sentryChance = isElite ? 1 : enemy.type === "tank" ? 0.68 : enemy.type === "dart" ? 0.22 : 0.42;
    enemy.behavior = Math.random() < sentryChance ? "sentry" : "dive";
    enemy.stopY = 115 + Math.random() * 215;
    enemy.holding = false;
    enemy.holdTimer = isElite ? 8 + Math.random() * 4 : 4 + Math.random() * 3;
    enemy.fireTimer = 0.7 + Math.random() * enemy.fireDelay;
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
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const baseAngle = Math.atan2(dy, dx);
    const offsets = enemy.tripleBeam ? [-0.28, 0, 0.28] : [0];
    const speed = enemy.type === "tank" ? 235 : enemy.type === "prism" ? 255 : 280;
    offsets.forEach((offset) => {
      const angle = baseAngle + offset;
      enemyBullets.push({
        x: enemy.x,
        y: enemy.y + enemy.radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: enemy.type === "tank" ? 6 : 4,
        collisionRadius: enemy.type === "tank" ? 4 : 3,
        damage: enemy.bulletDamage,
        kind: enemy.tripleBeam ? "beam" : "orb"
      });
    });
    if (enemy.tripleBeam) playTone(240, 610, 0.22, 0.055, "sawtooth");
    else playTone(180, 120, 0.08, 0.018, "triangle");
  }

  function addExplosion(x, y, color, amount) {
    for (let i = 0; i < amount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 45 + Math.random() * 190;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.35 + Math.random() * 0.55,
        maxLife: 0.9,
        size: 2 + Math.random() * 5,
        color
      });
    }
  }

  function maybeDropItem(x, y) {
    if (Math.random() > 0.22) return;
    const type = Math.random() < 0.65 ? "heal" : "bomb";
    items.push({ x, y, type, radius: 15, speed: 105, phase: Math.random() * Math.PI * 2 });
  }

  function destroyEnemy(index, awardPoints) {
    const enemy = enemies[index];
    if (!enemy) return;
    addExplosion(enemy.x, enemy.y, enemy.type === "tank" ? "#f0a05e" : "#e0766d", enemy.type === "tank" ? 24 : 15);
    playNoise(enemy.type === "tank" || enemy.type === "guardian" ? 0.2 : 0.12, awardPoints ? 0.055 : 0.035, 780);
    if (awardPoints) {
      score += enemy.points;
      kills += 1;
      xp += 1;
      while (xp >= xpNeeded) {
        xp -= xpNeeded;
        xpNeeded *= 2;
        level += 1;
        pendingLevelUps += 1;
      }
      maybeDropItem(enemy.x, enemy.y);
    }
    enemies.splice(index, 1);
    updateHud();
    if (awardPoints && pendingLevelUps > 0 && mode === "running") showLevelUp();
  }

  function damagePlayer(pilot, amount) {
    if (!pilot || !pilot.alive || pilot.invulnerable > 0 || mode !== "running") return;
    pilot.health -= amount;
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
    updateHud();
  }

  function addMessage(text, color, pilot) {
    const target = pilot || player;
    messages.push({ text, x: target.x, y: target.y - 30, life: 1.1, color });
  }

  function collectItem(item, pilot) {
    const t = copy[language()];
    if (item.type === "heal") {
      pilot.health = Math.min(pilot.maxHealth, pilot.health + 32);
      addMessage(t.heal, "#75d4ac", pilot);
    } else if (item.type === "bomb") {
      pilot.bombs = Math.min(5, pilot.bombs + 1);
      addMessage(t.bomb, "#ffc27c", pilot);
    }
    addExplosion(item.x, item.y, "#dff7ff", 12);
    playTone(item.type === "heal" ? 520 : 620, item.type === "heal" ? 740 : 780, 0.2, 0.06, "sine");
    updateHud();
  }

  function chooseUpgrade(type) {
    if (mode !== "levelup" || pendingLevelUps <= 0) return;
    if (type === "damage") {
      players.forEach((pilot) => { pilot.damage += 0.5; });
    } else if (type === "speed") {
      players.forEach((pilot) => { pilot.fireInterval = Math.max(0.08, pilot.fireInterval * 0.85); });
    } else if (type === "health") {
      players.forEach((pilot) => {
        pilot.maxHealth += 25;
        if (pilot.alive) pilot.health = Math.min(pilot.maxHealth, pilot.health + 25);
      });
    } else if (type === "multishot" && players.some((pilot) => pilot.weapon < 6)) {
      players.forEach((pilot) => { pilot.weapon = Math.min(6, pilot.weapon + 1); });
    } else {
      return;
    }

    playTone(480, 820, 0.2, 0.07, "sine");
    pendingLevelUps -= 1;
    updateHud();
    if (pendingLevelUps > 0) {
      showLevelUp();
    } else {
      mode = "running";
      hideOverlay();
      canvas.focus({ preventScroll: true });
      lastTime = performance.now();
    }
  }

  function useBomb(pilot) {
    if (mode !== "running" || !pilot || !pilot.alive || pilot.bombs <= 0) return;
    pilot.bombs -= 1;
    screenFlash = 1;
    playTone(110, 42, 0.55, 0.11, "sawtooth");
    playNoise(0.55, 0.11, 620);
    enemyBullets = [];
    for (let i = enemies.length - 1; i >= 0; i -= 1) destroyEnemy(i, true);
    updateHud();
  }

  function circlesTouch(a, b, extra) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const radiusA = a.collisionRadius == null ? a.radius : a.collisionRadius;
    const radiusB = b.collisionRadius == null ? b.radius : b.collisionRadius;
    const radius = radiusA + radiusB + (extra || 0);
    return dx * dx + dy * dy <= radius * radius;
  }

  function updatePilot(pilot, controls, dt) {
    if (!pilot || !pilot.alive) return;
    const isPressed = (binding) => {
      const bindings = Array.isArray(binding) ? binding : [binding];
      return bindings.some((code) => keys.has(code));
    };
    pilot.fireTimer = Math.max(0, pilot.fireTimer - dt);
    pilot.invulnerable = Math.max(0, pilot.invulnerable - dt);
    let dx = 0;
    let dy = 0;
    if (isPressed(controls.left)) dx -= 1;
    if (isPressed(controls.right)) dx += 1;
    if (isPressed(controls.up)) dy -= 1;
    if (isPressed(controls.down)) dy += 1;
    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      pilot.x += dx / length * pilot.speed * dt;
      pilot.y += dy / length * pilot.speed * dt;
    }
    pilot.x = Math.max(34, Math.min(WIDTH - 42, pilot.x));
    pilot.y = Math.max(34, Math.min(HEIGHT - 34, pilot.y));
    if (isPressed(controls.fire)) shoot(pilot);
  }

  function update(dt) {
    elapsed += dt;
    score += dt * 12;
    terrainOffset += 82 * dt;
    screenFlash = Math.max(0, screenFlash - dt * 2.2);
    const playerOneControls = players.length === 1
      ? {
          left: ["KeyA", "ArrowLeft"],
          right: ["KeyD", "ArrowRight"],
          up: ["KeyW", "ArrowUp"],
          down: ["KeyS", "ArrowDown"],
          fire: "Space"
        }
      : { left: "KeyA", right: "KeyD", up: "KeyW", down: "KeyS", fire: "Space" };
    updatePilot(players[0], playerOneControls, dt);
    if (players[1]) {
      updatePilot(players[1], { left: "ArrowLeft", right: "ArrowRight", up: "ArrowUp", down: "ArrowDown", fire: "ShiftRight" }, dt);
    }

    stars.forEach((star) => {
      star.y += star.speed * dt;
      if (star.y > HEIGHT + 5) {
        star.y = -5;
        star.x = Math.random() * WIDTH;
      }
    });

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnEnemy();
      const interval = Math.max(0.38, 1.08 - elapsed * 0.006);
      const levelSpawnScale = Math.max(0.65, 1 - (level - 1) * 0.035);
      spawnTimer = interval * levelSpawnScale * (0.72 + Math.random() * 0.56);
    }

    bullets.forEach((bullet) => {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
    });
    bullets = bullets.filter((bullet) => bullet.x > -20 && bullet.x < WIDTH + 20 && bullet.y > -30);

    for (let i = enemies.length - 1; i >= 0; i -= 1) {
      const enemy = enemies[i];
      enemy.phase += dt * (enemy.type === "dart" ? 4.4 : 2.3);

      if (enemy.type === "guardian") {
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
          enemy.fireTimer = 0.2 + Math.random() * 0.35;
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
          enemy.fireTimer = 2 * prismLevelScale;
        } else {
          const fireRate = enemy.holding ? 0.48 : 0.9;
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

    enemyBullets.forEach((bullet) => {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
    });
    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBullets[i];
      if (bullet.x < -20 || bullet.x > WIDTH + 20 || bullet.y < -20 || bullet.y > HEIGHT + 20) {
        enemyBullets.splice(i, 1);
      } else {
        const hitPilot = players.find((pilot) => pilot.alive && circlesTouch(pilot, bullet, -1));
        if (!hitPilot) continue;
        enemyBullets.splice(i, 1);
        damagePlayer(hitPilot, bullet.damage || 12);
      }
    }

    for (let i = bullets.length - 1; i >= 0; i -= 1) {
      let hit = false;
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
      if (hit) bullets.splice(i, 1);
    }

    for (let i = items.length - 1; i >= 0; i -= 1) {
      const item = items[i];
      item.y += item.speed * dt;
      item.phase += dt * 3;
      item.x += Math.sin(item.phase) * 10 * dt;
      if (item.y > HEIGHT + 30) {
        items.splice(i, 1);
      } else {
        const collector = players.find((pilot) => pilot.alive && circlesTouch(pilot, item, 3));
        if (!collector) continue;
        collectItem(item, collector);
        items.splice(i, 1);
      }
    }

    particles.forEach((particle) => {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.life -= dt;
    });
    particles = particles.filter((particle) => particle.life > 0);

    messages.forEach((message) => {
      message.y -= 36 * dt;
      message.life -= dt;
    });
    messages = messages.filter((message) => message.life > 0);
    updateHud();
  }

  function drawBackground(colors) {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, colors.groundTop);
    gradient.addColorStop(1, colors.groundBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const riverPath = () => {
      ctx.beginPath();
      for (let y = -40; y <= HEIGHT + 40; y += 24) {
        const worldY = y - terrainOffset;
        const x = WIDTH * 0.5 + Math.sin(worldY * 0.006) * 128 + Math.sin(worldY * 0.015) * 26;
        if (y === -40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    };
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    riverPath();
    ctx.strokeStyle = colors.riverEdge;
    ctx.lineWidth = 140;
    ctx.stroke();
    riverPath();
    ctx.strokeStyle = colors.river;
    ctx.lineWidth = 112;
    ctx.stroke();

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    const gridOffset = terrainOffset % 105;
    for (let y = gridOffset - 105; y < HEIGHT + 105; y += 105) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }
    for (let x = 85; x < WIDTH; x += 145) {
      ctx.beginPath();
      for (let y = -30; y <= HEIGHT + 30; y += 30) {
        const bend = Math.sin((y - terrainOffset) * 0.012 + x) * 9;
        if (y === -30) ctx.moveTo(x + bend, y);
        else ctx.lineTo(x + bend, y);
      }
      ctx.stroke();
    }

    terrainFeatures.forEach((feature) => {
      const y = ((feature.y + terrainOffset + 100) % (HEIGHT + 200)) - 100;
      if (feature.kind === 2) {
        ctx.fillStyle = colors.shadow;
        ctx.beginPath();
        ctx.ellipse(feature.x + 15, y + 18, feature.radius * 1.45, feature.radius * 0.58, 0.22, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.fillStyle = colors.feature;
      ctx.strokeStyle = colors.featureEdge;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = feature.kind === 0 ? 0.48 : 0.68;
      ctx.beginPath();
      ctx.ellipse(feature.x, y, feature.radius, feature.radius * feature.stretch, feature.kind === 0 ? -0.25 : 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (feature.kind === 1) {
        ctx.fillStyle = colors.featureEdge;
        for (let i = 0; i < 4; i += 1) {
          const angle = i * 1.7 + feature.x;
          ctx.beginPath();
          ctx.arc(feature.x + Math.cos(angle) * feature.radius * 0.45, y + Math.sin(angle) * feature.radius * 0.25, 4 + (i % 2) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    });

    ctx.strokeStyle = colors.riverEdge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const crackY = (terrainOffset * 1.35) % (HEIGHT + 160) - 80;
    ctx.moveTo(70, crackY);
    ctx.lineTo(160, crackY + 26);
    ctx.lineTo(235, crackY + 12);
    ctx.lineTo(310, crackY + 55);
    ctx.stroke();

    stars.forEach((star) => {
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = colors.snow;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawPlayer(pilot, colors) {
    if (!pilot.alive || (pilot.invulnerable > 0 && Math.floor(pilot.invulnerable * 16) % 2 === 0)) return;
    const isPlayerTwo = pilot.id === 2;
    ctx.save();
    ctx.translate(pilot.x + 10, pilot.y + 13);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = colors.shadow;
    ctx.beginPath();
    ctx.ellipse(0, 0, 30, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(pilot.x, pilot.y);
    ctx.rotate(-Math.PI / 2);

    ctx.fillStyle = isPlayerTwo ? "#f0a84d" : colors.engine;
    ctx.globalAlpha = 0.42 + Math.random() * 0.28;
    ctx.beginPath();
    ctx.moveTo(-25, -7);
    ctx.lineTo(-43 - Math.random() * 9, 0);
    ctx.lineTo(-25, 7);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = isPlayerTwo ? "#fff3d4" : colors.player;
    ctx.strokeStyle = isPlayerTwo ? "#b97828" : colors.playerEdge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(33, 0);
    ctx.lineTo(-20, -13);
    ctx.lineTo(-29, -6);
    ctx.lineTo(-18, 0);
    ctx.lineTo(-29, 6);
    ctx.lineTo(-20, 13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(3, -7);
    ctx.lineTo(-13, -28);
    ctx.lineTo(-24, -27);
    ctx.lineTo(-11, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(3, 7);
    ctx.lineTo(-13, 28);
    ctx.lineTo(-24, 27);
    ctx.lineTo(-11, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = isPlayerTwo ? "#e2a04d" : colors.canopy;
    ctx.beginPath();
    ctx.ellipse(9, -3, 9, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (players.length === 2) {
      ctx.fillStyle = isPlayerTwo ? "#f0b35f" : "#8edbff";
      ctx.font = "700 12px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`P${pilot.id}`, pilot.x, pilot.y + 42);
    }
  }

  function drawEnemy(enemy, colors) {
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
    const scale = enemy.type === "tank" ? 1.18 : enemy.type === "dart" ? 0.82 : 1;
    ctx.scale(scale, scale);
    ctx.fillStyle = enemy.type === "tank"
      ? "#9d5d55"
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
    ctx.restore();

    if (enemy.hp < enemy.maxHp) {
      const width = enemy.radius * 2.1;
      ctx.fillStyle = "rgba(20, 35, 45, 0.35)";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width, 3);
      ctx.fillStyle = "#f3a39b";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width * enemy.hp / enemy.maxHp, 3);
    }
  }

  function drawItem(item) {
    const colors = {
      heal: { fill: "#dff4e9", edge: "#4c9c80", mark: "+" },
      bomb: { fill: "#fff0df", edge: "#c67a43", mark: "✦" }
    }[item.type];
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.phase * 0.25);
    ctx.fillStyle = colors.fill;
    ctx.strokeStyle = colors.edge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(-item.phase * 0.25);
    ctx.fillStyle = colors.edge;
    ctx.font = "700 18px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(colors.mark, 0, 0);
    ctx.restore();
  }

  function draw() {
    const colors = palette();
    drawBackground(colors);

    bullets.forEach((bullet) => {
      ctx.save();
      ctx.shadowBlur = 9;
      const bulletColor = bullet.owner === 2 ? "#f0b35f" : colors.bullet;
      ctx.shadowColor = bulletColor;
      ctx.fillStyle = bulletColor;
      ctx.beginPath();
      ctx.ellipse(bullet.x, bullet.y, 2.6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    enemyBullets.forEach((bullet) => {
      ctx.save();
      if (bullet.kind === "beam") {
        ctx.translate(bullet.x, bullet.y);
        ctx.rotate(Math.atan2(bullet.vy, bullet.vx));
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ffd087";
        ctx.fillStyle = "#ffd087";
        ctx.fillRect(-16, -3, 32, 6);
        ctx.fillStyle = "#fff6d7";
        ctx.fillRect(-13, -1, 26, 2);
      } else {
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ef8478";
        ctx.fillStyle = "#e9685c";
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    enemies.forEach((enemy) => drawEnemy(enemy, colors));
    items.forEach(drawItem);
    players.forEach((pilot) => drawPlayer(pilot, colors));

    particles.forEach((particle) => {
      ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    messages.forEach((message) => {
      ctx.globalAlpha = Math.min(1, message.life * 1.5);
      ctx.fillStyle = message.color;
      ctx.font = "700 16px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(message.text, message.x, message.y);
    });
    ctx.globalAlpha = 1;

    if (screenFlash > 0) {
      ctx.fillStyle = `rgba(226, 248, 255, ${screenFlash * 0.42})`;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  }

  function frame(now) {
    const dt = Math.min(0.034, (now - lastTime) / 1000 || 0);
    lastTime = now;
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

  window.addEventListener("keydown", (event) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
    }
    if (["Space", "ShiftRight", "KeyB", "KeyL", "Enter"].includes(event.code)) ensureAudio();
    keys.add(event.code);
    if (event.code === "KeyB" && !event.repeat) useBomb(players[0]);
    if (event.code === "KeyL" && !event.repeat && players[1]) useBomb(players[1]);
    if (event.code === "KeyP" && !event.repeat) togglePause();
    if (event.code === "Enter" && !event.repeat && ["ready", "paused", "gameover"].includes(mode)) startGame();
  });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.code);
  });

  window.addEventListener("blur", () => {
    keys.clear();
    if (mode === "running") togglePause();
  });

  startButton.addEventListener("click", () => {
    ensureAudio();
    startGame();
  });
  playerSelect.querySelectorAll("[data-player-count]").forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      startGame(Number(button.dataset.playerCount));
    });
  });
  soundButton.addEventListener("click", toggleSound);
  levelOptions.querySelectorAll("[data-upgrade]").forEach((button) => {
    button.addEventListener("click", () => chooseUpgrade(button.dataset.upgrade));
  });
  document.addEventListener("i18nchange", () => {
    updateSoundButton();
    if (mode === "paused") showOverlay("paused");
    else if (mode === "gameover") showOverlay("gameover");
    else if (mode === "ready") showOverlay("ready");
    else if (mode === "levelup") showLevelUp();
  });

  resetGame();
  showOverlay("ready");
  updateSoundButton();
  requestAnimationFrame(frame);
})();
