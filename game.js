(function () {
  "use strict";

  const canvas = document.getElementById("flight-game");
  if (!canvas) return;

  const MOBILE_LAYOUT = window.matchMedia("(max-width: 760px)").matches;
  if (MOBILE_LAYOUT) {
    canvas.width = 720;
    canvas.height = 1000;
  }
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
  const classOptions = document.getElementById("game-class-options");
  const startButton = document.getElementById("game-start");
  const soundButton = document.getElementById("game-sound-toggle");
  const terminalButton = document.getElementById("game-terminal-toggle");
  const terminalPanel = document.getElementById("game-terminal");
  const terminalCloseButton = document.getElementById("game-terminal-close");
  const terminalForm = document.getElementById("game-terminal-form");
  const terminalInput = document.getElementById("game-terminal-input");
  const terminalOutput = document.getElementById("game-terminal-output");
  const mobileControls = document.getElementById("game-mobile-controls");
  const joystick = document.getElementById("game-joystick");
  const joystickKnob = document.getElementById("game-joystick-knob");
  const mobileFireButton = document.getElementById("game-mobile-fire");
  const mobileBombButton = document.getElementById("game-mobile-bomb");

  const copy = {
    en: {
      readyTitle: "Ready for takeoff?",
      readyCopy: "Choose 1P for a solo flight or 2P for local co-op.",
      mobileReadyCopy: "Mobile play supports 1 Player with touch controls.",
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
      multishotClassLocked: "Laser Gunner uses a fixed continuous beam",
      fleetSpeed: "Fleet Fire Rate",
      fleetSpeedDesc: (current) => `Wingman fire interval ${current.toFixed(2)}s · 15% faster`,
      fleetShot: "Fleet Multi-shot",
      fleetShotDesc: (current) => `Wingman bullet lanes ${current} → ${Math.min(3, current + 1)} / 3`,
      fleetCapacity: "Fleet Capacity",
      fleetCapacityDesc: (current) => `Maximum wingmen ${current} → ${Math.min(3, current + 1)} / 3`,
      fleetMax: "Fleet upgrade complete",
      fleetMaxDesc: "Maximum upgrade reached",
      mute: "Mute sound",
      unmute: "Turn sound on",
      heal: "+ Health",
      bomb: "+ Bomb",
      shield: "+ Two-hit Shield",
      shieldActive: "Shield already active",
      wingman: "+ Wingman",
      wingmanActive: "Fleet capacity is full",
      magnet: "Magnet · All supplies collected",
      classTitle: "Choose your advancement",
      classCopy: "Level 5 reached. Choose one permanent combat specialization.",
      bossName: "FROST COLOSSUS",
      bossWarning: "BOSS INCOMING",
      bossDefeated: "BOSS DEFEATED",
      terminalOpen: "Open command terminal",
      terminalClose: "Close terminal",
      terminalPlaceholder: "type a command",
      terminalUnknown: "Unknown command. Try again.",
      strategyLaser: "AI · MULTI-LASER SEARCH",
      strategyWall: "AI · ADAPTIVE LASER WALL",
      strategyBomb: "AI · SATURATION BOMBING",
      strategyPredict: "AI · MOTION PREDICTION",
      strategySeeker: "AI · HUNTER DRONES",
      strategySpiral: "AI · NEURAL CROSSFIRE",
      strategyCyclone: "AI · CYCLONE MISSILES",
      bossOverdrive: "AI OVERDRIVE",
      bossPrepCopy: (targetLevel, remaining) => `Level ${targetLevel} boss preparation · Choose ${remaining} more upgrade${remaining === 1 ? "" : "s"}.`,
      boss2Name: "ORBITAL AI COMMAND",
      boss2Warning: "CHAPTER 2 · ORBITAL HEADQUARTERS",
      boss2Defeated: "ORBITAL COMMAND DESTROYED",
      strategyIcbm: "AI · ICBM SATURATION",
      boss2Overdrive: "ORBITAL EVASION MODE"
    },
    ko: {
      readyTitle: "이륙 준비가 되셨나요?",
      readyCopy: "혼자 비행할지, 2인 협동으로 비행할지 선택하세요.",
      mobileReadyCopy: "모바일에서는 터치 조작을 사용하는 1인 플레이만 지원합니다.",
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
      multishotClassLocked: "레이저 거너는 고정된 연속 빔을 사용합니다",
      fleetSpeed: "함대 공격 속도",
      fleetSpeedDesc: (current) => `보조 비행기 발사 간격 ${current.toFixed(2)}초 · 15% 가속`,
      fleetShot: "함대 다중 사격",
      fleetShotDesc: (current) => `보조 비행기 공격 갈래 ${current} → ${Math.min(3, current + 1)} / 3`,
      fleetCapacity: "함대 수용량",
      fleetCapacityDesc: (current) => `최대 보조 비행기 ${current} → ${Math.min(3, current + 1)} / 3대`,
      fleetMax: "함대 업그레이드 완료",
      fleetMaxDesc: "최대 단계에 도달했습니다",
      mute: "소리 끄기",
      unmute: "소리 켜기",
      heal: "+ 체력",
      bomb: "+ 폭탄",
      shield: "+ 2회 보호막",
      shieldActive: "이미 보호막이 활성화되어 있습니다",
      wingman: "+ 보조 비행기",
      wingmanActive: "함대 수용량이 가득 찼습니다",
      magnet: "자석 · 모든 보급품 회수",
      classTitle: "전직 선택",
      classCopy: "레벨 5 달성! 영구적으로 적용할 전투 특성을 선택하세요.",
      bossName: "프로스트 콜로서스",
      bossWarning: "보스 출현",
      bossDefeated: "보스 격파",
      terminalOpen: "명령 터미널 열기",
      terminalClose: "터미널 닫기",
      terminalPlaceholder: "명령어 입력",
      terminalUnknown: "알 수 없는 명령어입니다. 다시 입력하세요.",
      strategyLaser: "AI · 다중 레이저 탐색",
      strategyWall: "AI · 적응형 레이저 장벽",
      strategyBomb: "AI · 포화 폭격",
      strategyPredict: "AI · 이동 경로 예측",
      strategySeeker: "AI · 추적 드론",
      strategySpiral: "AI · 신경망 교차 사격",
      strategyCyclone: "AI · 회오리 미사일",
      bossOverdrive: "AI 광폭화",
      bossPrepCopy: (targetLevel, remaining) => `레벨 ${targetLevel} 보스전 준비 · 업그레이드를 ${remaining}번 더 선택하세요.`,
      boss2Name: "궤도 AI 사령부",
      boss2Warning: "챕터 2 · 궤도 우주 본부",
      boss2Defeated: "궤도 사령부 파괴",
      strategyIcbm: "AI · 대륙간 탄도 포화공격",
      boss2Overdrive: "궤도 회피 모드"
    }
  };

  const keys = new Set();
  const mobileInput = { active: false, pointerId: null, dx: 0, dy: 0, fire: false };
  const MAX_ENEMIES = 7;
  const MAX_WINGMEN = 3;
  const MAX_WINGMAN_WEAPON = 3;
  let mode = "ready";
  let player;
  let players = [];
  let selectedPlayerCount = 1;
  let bullets = [];
  let enemies = [];
  let enemyBullets = [];
  let boss = null;
  let bossBombs = [];
  let bossSpawned = false;
  let bossDefeated = false;
  let boss2Spawned = false;
  let boss2Defeated = false;
  let bossMissiles = [];
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
  let xpNeeded = 10;
  let pendingLevelUps = 0;
  let pendingClassChoice = false;
  let bossCommandUpgradeSequence = false;
  let bossCommandTargetLevel = 6;
  let weaponKillsSinceBombDrop = 0;
  let elapsed = 0;
  let spawnTimer = 0;
  let screenFlash = 0;
  let lastTime = performance.now();
  let audioContext = null;
  let masterGain = null;
  let soundMuted = false;
  let terminalPreviousMode = null;

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

  function updateTerminalLanguage() {
    const t = copy[language()];
    terminalButton.setAttribute("aria-label", t.terminalOpen);
    terminalButton.setAttribute("title", t.terminalOpen);
    terminalCloseButton.setAttribute("aria-label", t.terminalClose);
    terminalInput.setAttribute("placeholder", t.terminalPlaceholder);
  }

  function openTerminal() {
    if (!terminalPanel.hidden) return;
    terminalPreviousMode = mode;
    if (mode === "running") mode = "terminal";
    keys.clear();
    terminalOutput.textContent = "";
    terminalPanel.hidden = false;
    terminalButton.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => terminalInput.focus());
  }

  function closeTerminal() {
    if (terminalPanel.hidden) return;
    terminalPanel.hidden = true;
    terminalButton.setAttribute("aria-expanded", "false");
    terminalInput.value = "";
    if (mode === "terminal") {
      mode = terminalPreviousMode === "running" ? "running" : terminalPreviousMode;
      lastTime = performance.now();
    }
    terminalPreviousMode = null;
    canvas.focus({ preventScroll: true });
  }

  function jumpToBoss() {
    if (["ready", "gameover"].includes(terminalPreviousMode || mode)) resetGame();
    level = 6;
    xp = 0;
    xpNeeded = 10;
    pendingLevelUps = 6;
    pendingClassChoice = true;
    bossCommandUpgradeSequence = true;
    bossCommandTargetLevel = 6;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    boss = null;
    bossBombs = [];
    bossSpawned = false;
    bossDefeated = false;
    boss2Spawned = false;
    boss2Defeated = false;
    bossMissiles = [];
    mode = "running";
    terminalPanel.hidden = true;
    terminalButton.setAttribute("aria-expanded", "false");
    terminalInput.value = "";
    terminalPreviousMode = null;
    updateHud();
    lastTime = performance.now();
    showClassChoice();
  }

  function jumpToBoss2() {
    if (["ready", "gameover"].includes(terminalPreviousMode || mode)) resetGame();
    level = 10;
    xp = 0;
    xpNeeded = 10;
    pendingLevelUps = 10;
    pendingClassChoice = true;
    bossCommandUpgradeSequence = true;
    bossCommandTargetLevel = 10;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    boss = null;
    bossBombs = [];
    bossMissiles = [];
    bossSpawned = true;
    bossDefeated = true;
    boss2Spawned = false;
    boss2Defeated = false;
    mode = "running";
    terminalPanel.hidden = true;
    terminalButton.setAttribute("aria-expanded", "false");
    terminalInput.value = "";
    terminalPreviousMode = null;
    updateHud();
    lastTime = performance.now();
    showClassChoice();
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
      vx: 0,
      vy: 0,
      shieldHits: 0,
      wingmanCount: 0,
      wingmanMax: 1,
      wingmanWeapon: 1,
      wingmanFireInterval: 0.48,
      wingmanFireTimer: 0,
      classType: "standard",
      laserActive: false,
      laserTick: 0,
      laserInterval: 0.08,
      aegisTimer: 10,
      aegisActive: 0,
      invulnerable: 0,
      alive: true
    };
  }

  function resetGame() {
    resetMobileJoystick();
    mobileInput.fire = false;
    if (mobileFireButton) mobileFireButton.classList.remove("is-pressed");
    if (mobileBombButton) mobileBombButton.classList.remove("is-pressed");
    player = createPilot(1, selectedPlayerCount === 2 ? WIDTH * 0.38 : WIDTH / 2);
    players = [player];
    if (selectedPlayerCount === 2) players.push(createPilot(2, WIDTH * 0.62));
    bullets = [];
    enemies = [];
    enemyBullets = [];
    boss = null;
    bossBombs = [];
    bossSpawned = false;
    bossDefeated = false;
    boss2Spawned = false;
    boss2Defeated = false;
    bossMissiles = [];
    items = [];
    particles = [];
    messages = [];
    score = 0;
    kills = 0;
    level = 1;
    xp = 0;
    xpNeeded = 10;
    pendingLevelUps = 0;
    pendingClassChoice = false;
    bossCommandUpgradeSequence = false;
    bossCommandTargetLevel = 6;
    weaponKillsSinceBombDrop = 0;
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
    classOptions.hidden = true;
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
      overlayCopy.textContent = MOBILE_LAYOUT ? t.mobileReadyCopy : t.readyCopy;
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
    const fleetSpeedButton = levelOptions.querySelector('[data-upgrade="fleet_speed"]');
    const fleetShotButton = levelOptions.querySelector('[data-upgrade="fleet_multishot"]');
    const fleetCapacityButton = levelOptions.querySelector('[data-upgrade="fleet_capacity"]');
    const fleetSpeedMaxed = players.every((pilot) => pilot.wingmanFireInterval <= 0.17);
    const fleetShotMaxed = players.every((pilot) => pilot.wingmanWeapon >= MAX_WINGMAN_WEAPON);
    const fleetCapacityMaxed = players.every((pilot) => pilot.wingmanMax >= MAX_WINGMEN);
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
    overlayTitle.textContent = t.classTitle;
    overlayCopy.textContent = t.classCopy;
    playerSelect.hidden = true;
    levelOptions.hidden = true;
    classOptions.hidden = false;
    startButton.hidden = true;
    if (enteringClassChoice) playTone(360, 880, 0.45, 0.075, "sine");
  }

  function chooseClass(type) {
    if (mode !== "classup" || !pendingClassChoice || !["laser", "aegis"].includes(type)) return;
    players.forEach((pilot) => {
      pilot.classType = type;
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

  function hideOverlay() {
    overlay.classList.add("is-hidden");
  }

  function startGame(playerCount) {
    if (mode === "levelup") return;
    if (mode === "ready" || mode === "gameover") {
      selectedPlayerCount = !MOBILE_LAYOUT && playerCount === 2 ? 2 : 1;
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
      setPlayerRows(weaponEl, players.map((pilot) => pilot.classType === "laser" ? "LASER" : `${pilot.weapon}W`));
      setPlayerRows(bombsEl, players.map((pilot) => pilot.bombs));
    } else {
      healthEl.textContent = `${Math.max(0, Math.ceil(player.health))} / ${player.maxHealth}`;
      weaponEl.textContent = player.classType === "laser" ? "LASER" : `${player.weapon}-WAY`;
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
    pilot.laserTick = pilot.laserInterval;
    const laserDamage = Math.max(0.6, pilot.damage * 0.72);

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

    if (boss && pilot.y > boss.y && Math.abs(pilot.x - boss.x) <= boss.collisionRadius + 7) {
      boss.hp -= laserDamage;
      boss.hitFlash = 0.08;
      addExplosion(pilot.x, boss.y + boss.radius * 0.5, "#c9f8ff", 2);
      if (boss.hp <= 0) defeatBoss();
    }
  }

  function spawnEnemy() {
    if (boss || enemies.length >= MAX_ENEMIES) return;
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
    const dx = target.x - enemy.x;
    const dy = target.y - enemy.y;
    const baseAngle = Math.atan2(dy, dx);
    const offsets = enemy.tripleBeam ? [-0.28, 0, 0.28] : [0];
    const speed = enemy.type === "tank" ? 190 : enemy.type === "prism" ? 205 : 225;
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

  function spawnBoss() {
    if (bossSpawned || bossDefeated) return;
    bossSpawned = true;
    enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, "#d7f5ff", 12));
    enemies = [];
    enemyBullets = [];
    bossBombs = [];
    const maxHp = players.length === 2 ? 760 : 480;
    boss = {
      type: "colossus",
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
      hitFlash: 0
    };
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
    const maxHp = players.length === 2 ? 2200 : 1450;
    boss = {
      type: "station",
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
      droneSequence: 0,
      dodgeTargetX: WIDTH / 2,
      dodgeTargetY: 132,
      dodgeTimer: 0,
      enraged: false
    };
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
    bossBombs.push({
      x: Math.max(70, Math.min(WIDTH - 70, target.x + (followPlayer ? (Math.random() - 0.5) * 75 : 0))),
      y: Math.max(310, Math.min(HEIGHT - 65, target.y + (followPlayer ? (Math.random() - 0.5) * 55 : 0))),
      radius: 66,
      timer: 2,
      maxTimer: 2,
      phase: Math.random() * Math.PI * 2
    });
    playTone(330, 155, 0.3, 0.055, "triangle");
  }

  function startBossBombBarrage() {
    if (!boss) return;
    boss.bombShotsRemaining = 7 + Math.floor(Math.random() * 4);
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
    const laserCount = style === "wall" ? 6 : 5 + Math.floor(Math.random() * 3);
    const positions = [];
    if (style === "wall") {
      const slots = Array.from({ length: 7 }, (_, index) => 80 + index * (WIDTH - 160) / 6);
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
    if (!boss || boss.type !== "station") return;
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
    const minimumGap = radius * 2 + 12;
    const candidates = [{ x: baseX, y: baseY }];
    for (let ring = 1; ring <= 7; ring += 1) {
      const points = 8 + ring * 2;
      const ringRadius = minimumGap * ring;
      for (let point = 0; point < points; point += 1) {
        const angle = point / points * Math.PI * 2 + ring * 0.37;
        candidates.push({
          x: Math.max(50, Math.min(WIDTH - 50, baseX + Math.cos(angle) * ringRadius)),
          y: Math.max(315, Math.min(HEIGHT - 48, baseY + Math.sin(angle) * ringRadius))
        });
      }
    }
    return candidates.find((candidate) => occupiedTargets.every((occupied) => (
      Math.hypot(candidate.x - occupied.x, candidate.y - occupied.y) >= minimumGap
    ))) || { x: baseX, y: baseY };
  }

  function launchBoss2Missiles() {
    if (!boss || boss.type !== "station") return;
    const targets = players.filter((pilot) => pilot.alive);
    if (!targets.length) return;
    const count = boss.enraged ? 11 + Math.floor(Math.random() * 4) : 8 + Math.floor(Math.random() * 4);
    const missileRadius = boss.enraged ? 44 : 42;
    const occupiedTargets = bossMissiles.map((missile) => ({ x: missile.targetX, y: missile.targetY }));
    for (let index = 0; index < count; index += 1) {
      const target = targets[index % targets.length];
      const missileTarget = findPlayerCenteredMissileTarget(target, missileRadius, occupiedTargets);
      const targetX = missileTarget.x;
      const targetY = missileTarget.y;
      occupiedTargets.push(missileTarget);
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

  function updateBoss2(dt) {
    if (!boss || boss.type !== "station") return;
    boss.phase += dt;
    boss.hitFlash = Math.max(0, boss.hitFlash - dt * 5);
    const halfHealth = boss.hp <= boss.maxHp * 0.5;
    if (halfHealth && !boss.enraged) {
      boss.enraged = true;
      boss.minionTimer = Math.min(boss.minionTimer, 0.35);
      boss.missileTimer = Math.min(boss.missileTimer, 1.1);
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

    if (halfHealth) {
      boss.dodgeTimer -= dt;
      if (boss.dodgeTimer <= 0 || Math.hypot(boss.x - boss.dodgeTargetX, boss.y - boss.dodgeTargetY) < 24) {
        const nearestBullet = bullets.reduce((closest, bullet) => {
          if (!closest) return bullet;
          return Math.hypot(bullet.x - boss.x, bullet.y - boss.y) < Math.hypot(closest.x - boss.x, closest.y - boss.y) ? bullet : closest;
        }, null);
        const avoidSide = nearestBullet && nearestBullet.x < boss.x ? 1 : -1;
        boss.dodgeTargetX = Math.max(210, Math.min(WIDTH - 210, boss.x + avoidSide * (180 + Math.random() * 260)));
        boss.dodgeTargetY = 125 + Math.random() * 120;
        boss.dodgeTimer = 1.1 + Math.random() * 1.2;
      }
      const dx = boss.dodgeTargetX - boss.x;
      const dy = boss.dodgeTargetY - boss.y;
      const distance = Math.hypot(dx, dy) || 1;
      const speed = 105;
      boss.x += dx / distance * Math.min(speed * dt, distance);
      boss.y += dy / distance * Math.min(speed * dt, distance);
    }

    boss.minionTimer -= dt;
    const assaultCount = enemies.filter((enemy) => enemy.type === "assault").length;
    if (boss.minionTimer <= 0 && assaultCount < 10) {
      spawnAssaultDrone();
      boss.minionTimer = boss.enraged ? 0.72 : 1.15;
    }

    boss.missileTimer -= dt;
    if (boss.missileTimer <= 0) {
      launchBoss2Missiles();
      boss.missileTimer = boss.enraged ? 2.25 : 3.75;
    }

    for (let index = bossMissiles.length - 1; index >= 0; index -= 1) {
      const missile = bossMissiles[index];
      missile.progress += dt / missile.duration;
      if (missile.progress < 0) continue;
      const t = Math.min(1, missile.progress);
      const inverse = 1 - t;
      missile.x = inverse * inverse * missile.startX + 2 * inverse * t * missile.controlX + t * t * missile.targetX;
      missile.y = inverse * inverse * missile.startY + 2 * inverse * t * missile.controlY + t * t * missile.targetY;
      missile.trail.push({ x: missile.x, y: missile.y });
      if (missile.trail.length > 24) missile.trail.shift();
      if (t < 1) continue;
      addExplosion(missile.targetX, missile.targetY, "#9fdcff", 46);
      addExplosion(missile.targetX, missile.targetY, "#ffbc7d", 34);
      players.forEach((pilot) => {
        if (pilot.alive && Math.hypot(pilot.x - missile.targetX, pilot.y - missile.targetY) <= missile.radius + pilot.collisionRadius) {
          damagePlayer(pilot, 42);
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
    addExplosion(defeatedBoss.x, defeatedBoss.y, "#ffd0a2", 85);
    addExplosion(defeatedBoss.x - 72, defeatedBoss.y + 18, "#dff8ff", 42);
    addExplosion(defeatedBoss.x + 72, defeatedBoss.y + 18, "#dff8ff", 42);
    score += isBoss2 ? 25000 : 10000;
    kills += 1;
    boss = null;
    bossBombs = [];
    bossMissiles = [];
    enemyBullets = [];
    if (isBoss2) {
      enemies.forEach((enemy) => addExplosion(enemy.x, enemy.y, "#a9def4", 16));
      enemies = [];
      boss2Defeated = true;
    } else {
      bossDefeated = true;
    }
    spawnTimer = 2.4;
    screenFlash = 1;
    messages.push({
      text: isBoss2 ? copy[language()].boss2Defeated : copy[language()].bossDefeated,
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
    if (boss.type === "station") {
      updateBoss2(dt);
      return;
    }
    boss.phase += dt;
    boss.hitFlash = Math.max(0, boss.hitFlash - dt * 5);
    boss.attackTimer -= dt;

    if (boss.hp <= boss.maxHp * 0.5 && !boss.enraged) {
      boss.enraged = true;
      boss.attackTimer = Math.min(boss.attackTimer, 1.1);
      boss.bombNextTimer *= 0.58;
      boss.volleyNextTimer *= 0.6;
      boss.lasers.forEach((laser) => {
        laser.charge *= 0.68;
        laser.maxCharge *= 0.68;
        laser.beamSpeed *= 1.28;
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

    if (boss.hp <= boss.maxHp * 0.5) {
      boss.dodgeTimer -= dt;
      if (boss.dodgeTimer <= 0) {
        const threats = bullets.filter((bullet) => (
          bullet.vy < 0
          && bullet.y > boss.y - 25
          && bullet.y < boss.y + 300
        ));
        const closestThreat = threats.reduce((closest, bullet) => {
          if (!closest) return bullet;
          const bulletDistance = Math.hypot(bullet.x - boss.x, bullet.y - boss.y);
          const closestDistance = Math.hypot(closest.x - boss.x, closest.y - boss.y);
          return bulletDistance < closestDistance ? bullet : closest;
        }, null);
        if (closestThreat && Math.abs(closestThreat.x - boss.x) < 190) {
          boss.dodgeDirection = closestThreat.x <= boss.x ? 1 : -1;
        } else if (Math.random() < 0.28) {
          boss.dodgeDirection *= -1;
        }
        boss.dodgeTimer = 0.45 + Math.random() * 0.5;
      }
      boss.x += boss.dodgeDirection * 54 * dt;
      const leftBound = 145;
      const rightBound = WIDTH - 145;
      if (boss.x <= leftBound || boss.x >= rightBound) {
        boss.x = Math.max(leftBound, Math.min(rightBound, boss.x));
        boss.dodgeDirection *= -1;
      }
    }

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
              damagePlayer(pilot, 32);
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
          const bombDelay = 0.38 + Math.random() * 0.42;
          boss.bombNextTimer = bombDelay * (boss.hp <= boss.maxHp * 0.5 ? 0.58 : 1);
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
          boss.volleyNextTimer = volleyDelay * (boss.hp <= boss.maxHp * 0.5 ? 0.6 : 1);
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
        if (distance <= bomb.radius + pilot.collisionRadius) damagePlayer(pilot, 32);
      });
      screenFlash = Math.max(screenFlash, 0.42);
      playTone(105, 42, 0.42, 0.085, "sawtooth");
      playNoise(0.42, 0.08, 620);
      bossBombs.splice(index, 1);
    }
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

  function dropItem(x, y, type) {
    items.push({ x, y, type, radius: 15, phase: Math.random() * Math.PI * 2 });
  }

  function maybeDropHealingItem(x, y) {
    if (Math.random() > 0.12) return false;
    dropItem(x, y, "heal");
    return true;
  }

  function destroyEnemy(index, awardPoints, source = "weapon") {
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
        level += 1;
        pendingLevelUps += 1;
        if (level === 5) pendingClassChoice = true;
      }
      const healingDropped = maybeDropHealingItem(enemy.x, enemy.y);
      if (source !== "bomb") {
        if (Math.random() < 0.18) {
          dropItem(Math.max(18, enemy.x - 26), enemy.y, "shield");
        }
        if (Math.random() < 0.08) {
          dropItem(Math.min(WIDTH - 18, enemy.x + 26), enemy.y, "wingman");
        }
        if (Math.random() < 0.025) {
          dropItem(enemy.x, Math.max(18, enemy.y - 30), "magnet");
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
    if (item.type === "magnet") {
      const gatheredItems = items.filter((candidate) => candidate !== item);
      items.length = 0;
      addMessage(t.magnet, "#70d8e7", pilot);
      gatheredItems.forEach((gatheredItem) => collectItem(gatheredItem, pilot));
      addExplosion(pilot.x, pilot.y, "#9ff3ff", 26);
      playTone(330, 1180, 0.36, 0.075, "sine");
      updateHud();
      return true;
    } else if (item.type === "heal") {
      pilot.health = Math.min(pilot.maxHealth, pilot.health + 32);
      addMessage(t.heal, "#75d4ac", pilot);
    } else if (item.type === "bomb") {
      pilot.bombs = Math.min(5, pilot.bombs + 1);
      addMessage(t.bomb, "#ffc27c", pilot);
    } else if (item.type === "shield") {
      if (pilot.shieldHits > 0 || pilot.aegisActive > 0) {
        addMessage(t.shieldActive, "#aebbc5", pilot);
      } else {
        pilot.shieldHits = 2;
        addMessage(t.shield, "#9ea9ff", pilot);
      }
    } else if (item.type === "wingman") {
      if (pilot.wingmanCount >= pilot.wingmanMax) {
        addMessage(t.wingmanActive, "#aebbc5", pilot);
      } else {
        pilot.wingmanCount += 1;
        pilot.wingmanFireTimer = 0.2;
        addMessage(t.wingman, "#8edbff", pilot);
      }
    }
    addExplosion(item.x, item.y, "#dff7ff", 12);
    const itemTone = item.type === "heal" ? 520 : item.type === "bomb" ? 620 : item.type === "shield" ? 710 : 820;
    playTone(itemTone, itemTone + 220, 0.2, 0.06, "sine");
    updateHud();
    return false;
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
    } else if (type === "multishot" && players.some((pilot) => pilot.weapon < 6)) {
      players.forEach((pilot) => { pilot.weapon = Math.min(6, pilot.weapon + 1); });
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
    if (mode !== "running" || !pilot || !pilot.alive || pilot.bombs <= 0) return;
    pilot.bombs -= 1;
    screenFlash = 1;
    playTone(110, 42, 0.55, 0.11, "sawtooth");
    playNoise(0.55, 0.11, 620);
    enemyBullets = [];
    bossBombs = [];
    if (boss) {
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
    pilot.wingmanFireTimer = Math.max(0, pilot.wingmanFireTimer - dt);
    pilot.invulnerable = Math.max(0, pilot.invulnerable - dt);
    if (pilot.classType === "aegis") {
      pilot.aegisTimer -= dt;
      pilot.aegisActive = Math.max(0, pilot.aegisActive - dt);
      if (pilot.aegisTimer <= 0) {
        pilot.aegisTimer = 10;
        pilot.aegisActive = 2;
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
      pilot.vx = dx / length * pilot.speed * strength;
      pilot.vy = dy / length * pilot.speed * strength;
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

    if (level >= 10 && bossDefeated && !boss2Spawned && !boss2Defeated) spawnBoss2();
    else if (level >= 5 && !bossSpawned && !bossDefeated) spawnBoss();
    updateBoss(dt);

    if (!boss) {
      spawnTimer -= dt;
      if (spawnTimer <= 0 && enemies.length < MAX_ENEMIES) {
        spawnEnemy();
        const interval = Math.max(0.38, 1.08 - elapsed * 0.006);
        const levelSpawnScale = Math.max(0.65, 1 - (level - 1) * 0.035);
        spawnTimer = interval * levelSpawnScale * (0.72 + Math.random() * 0.56);
      }
    }

    bullets.forEach((bullet) => {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
    });
    bullets = bullets.filter((bullet) => bullet.x > -20 && bullet.x < WIDTH + 20 && bullet.y > -30);

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
                damagePlayer(pilot, 38);
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

    enemyBullets.forEach((bullet) => {
      if (bullet.kind === "seeker") {
        bullet.life -= dt;
        const target = players.find((pilot) => pilot.alive && pilot.id === bullet.targetId);
        if (target) {
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
      }
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
    });
    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBullets[i];
      if ((bullet.life != null && bullet.life <= 0) || bullet.x < -20 || bullet.x > WIDTH + 20 || bullet.y < -20 || bullet.y > HEIGHT + 20) {
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
      if (!hit && boss && circlesTouch(bullets[i], boss, -4)) {
        boss.hp -= bullets[i].damage;
        boss.hitFlash = 0.13;
        addExplosion(bullets[i].x, bullets[i].y, "#d7f5ff", 4);
        if (boss.hp <= 0) defeatBoss();
        hit = true;
      }
      if (hit) bullets.splice(i, 1);
    }

    for (let i = items.length - 1; i >= 0; i -= 1) {
      const item = items[i];
      item.phase += dt * 3;
      const collector = players.find((pilot) => pilot.alive && circlesTouch(pilot, item, 3));
      if (!collector) continue;
      const collectedAllItems = collectItem(item, collector);
      if (collectedAllItems) break;
      items.splice(i, 1);
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
      if (!message.fixed) message.y -= 36 * dt;
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

    if (pilot.shieldHits > 0 || pilot.aegisActive > 0) {
      const isAegis = pilot.aegisActive > 0;
      ctx.save();
      ctx.strokeStyle = isAegis ? "rgba(255, 226, 122, 0.95)" : "rgba(168, 166, 255, 0.92)";
      ctx.fillStyle = isAegis ? "rgba(255, 224, 112, 0.1)" : "rgba(145, 142, 255, 0.1)";
      ctx.lineWidth = isAegis ? 4 : 3;
      ctx.setLineDash(isAegis ? [8, 5] : []);
      ctx.beginPath();
      ctx.arc(pilot.x, pilot.y, 34 + Math.sin(elapsed * 7) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      if (!isAegis) {
        ctx.fillStyle = "#dad9ff";
        ctx.font = "800 10px Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${pilot.shieldHits}`, pilot.x, pilot.y - 40);
      }
      ctx.restore();
    }

    for (let fighterIndex = 0; fighterIndex < pilot.wingmanCount; fighterIndex += 1) {
      const position = wingmanPosition(pilot, fighterIndex);
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.fillStyle = pilot.id === 2 ? "#ffe2ad" : "#d9f5ff";
      ctx.strokeStyle = pilot.id === 2 ? "#c47c2d" : "#3c8daf";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-11, 11);
      ctx.lineTo(0, 6);
      ctx.lineTo(11, 11);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#8ee4ff";
      ctx.beginPath();
      ctx.arc(0, -2, 3, 0, Math.PI * 2);
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
      ctx.shadowBlur = 24;
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

  function drawEnemy(enemy, colors) {
    if (enemy.type === "assault") {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(Math.sin(enemy.phase) * 0.15);
      ctx.shadowBlur = enemy.holding ? 18 : 8;
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

  function drawBossAttacks() {
    bossBombs.forEach((bomb) => {
      const progress = 1 - bomb.timer / bomb.maxTimer;
      const pulse = 0.5 + Math.sin(bomb.phase * 2.2) * 0.18;
      ctx.save();
      ctx.fillStyle = `rgba(218, 72, 53, ${0.08 + progress * 0.16})`;
      ctx.strokeStyle = `rgba(255, 150, 112, ${pulse + progress * 0.25})`;
      ctx.lineWidth = 3 + progress * 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, bomb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(255, 229, 194, 0.86)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, Math.max(7, bomb.radius * (1 - progress)), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#fff0d0";
      ctx.font = "800 14px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(Math.max(1, Math.ceil(bomb.timer)).toString(), bomb.x, bomb.y);
      ctx.restore();
    });

    bossMissiles.forEach((missile) => {
      if (missile.progress < 0) return;
      ctx.save();
      ctx.fillStyle = "rgba(55, 121, 179, 0.1)";
      ctx.strokeStyle = "rgba(114, 203, 255, 0.72)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 7]);
      ctx.beginPath();
      ctx.arc(missile.targetX, missile.targetY, missile.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      if (missile.trail.length > 1) {
        ctx.lineCap = "round";
        missile.trail.forEach((point, index) => {
          if (index === 0) return;
          const previous = missile.trail[index - 1];
          ctx.strokeStyle = `rgba(173, 229, 255, ${index / missile.trail.length * 0.75})`;
          ctx.lineWidth = 2 + index / missile.trail.length * 7;
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        });
      }
      const previous = missile.trail[missile.trail.length - 2] || { x: missile.x, y: missile.y - 1 };
      ctx.translate(missile.x, missile.y);
      ctx.rotate(Math.atan2(missile.y - previous.y, missile.x - previous.x) + Math.PI / 2);
      ctx.shadowBlur = 22;
      ctx.shadowColor = "#9ddcff";
      ctx.fillStyle = "#eefaff";
      ctx.strokeStyle = "#4b86b4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(-7, 10);
      ctx.lineTo(0, 6);
      ctx.lineTo(7, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ff9b62";
      ctx.beginPath();
      ctx.moveTo(-5, 9);
      ctx.lineTo(0, 22 + Math.random() * 9);
      ctx.lineTo(5, 9);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    if (!boss || !boss.lasers.length) return;
    const beamTop = boss.y + 54;
    boss.lasers.forEach((laser) => {
      ctx.save();
      const portalTime = performance.now() * 0.0025 + laser.x * 0.01;
      const portalEnergy = laser.charge > 0 ? 1 - laser.charge / laser.maxCharge : 1;
      ctx.save();
      ctx.translate(laser.x, beamTop);
      ctx.shadowBlur = 18 + portalEnergy * 16;
      ctx.shadowColor = "#9c78ff";
      const portalGradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 34);
      portalGradient.addColorStop(0, "rgba(247, 245, 255, 0.98)");
      portalGradient.addColorStop(0.22, "rgba(116, 220, 255, 0.9)");
      portalGradient.addColorStop(0.58, "rgba(116, 82, 225, 0.72)");
      portalGradient.addColorStop(1, "rgba(46, 23, 104, 0)");
      ctx.fillStyle = portalGradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, 37 + portalEnergy * 6, 13 + portalEnergy * 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let ring = 0; ring < 3; ring += 1) {
        ctx.strokeStyle = ring === 0 ? "rgba(226, 248, 255, 0.9)" : "rgba(157, 122, 255, 0.72)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8 - ring, 5 + ring]);
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          27 + ring * 7 + Math.sin(portalTime * 2 + ring) * 3,
          8 + ring * 3,
          portalTime * (ring % 2 ? -0.35 : 0.28),
          portalTime + ring * 1.4,
          portalTime + ring * 1.4 + Math.PI * 1.45
        );
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      if (laser.charge > 0) {
        const chargeProgress = 1 - laser.charge / laser.maxCharge;
        const pulse = 0.35 + Math.sin(performance.now() * 0.024 + laser.x) * 0.2;
        ctx.fillStyle = `rgba(255, 93, 78, ${0.04 + chargeProgress * 0.08})`;
        ctx.fillRect(laser.x - laser.width / 2, beamTop, laser.width, HEIGHT - beamTop);
        ctx.strokeStyle = `rgba(255, 220, 185, ${pulse + chargeProgress * 0.3})`;
        ctx.lineWidth = 2 + chargeProgress * 3;
        ctx.setLineDash([12, 9]);
        ctx.beginPath();
        ctx.moveTo(laser.x, beamTop);
        ctx.lineTo(laser.x, HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(255, 132, 91, 0.9)";
        ctx.beginPath();
        ctx.arc(laser.x, beamTop, 6 + chargeProgress * 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const gradient = ctx.createLinearGradient(laser.x - laser.width / 2, 0, laser.x + laser.width / 2, 0);
        gradient.addColorStop(0, "rgba(255, 91, 69, 0.08)");
        gradient.addColorStop(0.28, "rgba(255, 129, 81, 0.72)");
        gradient.addColorStop(0.5, "rgba(255, 249, 219, 0.98)");
        gradient.addColorStop(0.72, "rgba(255, 129, 81, 0.72)");
        gradient.addColorStop(1, "rgba(255, 91, 69, 0.08)");
        ctx.shadowBlur = 24;
        ctx.shadowColor = "#ff765d";
        ctx.fillStyle = gradient;
        ctx.fillRect(laser.x - laser.width / 2, beamTop, laser.width, laser.length);
        ctx.fillStyle = "rgba(255, 255, 245, 0.9)";
        ctx.fillRect(laser.x - 7, beamTop, 14, laser.length);
      }
      ctx.restore();
    });
  }

  function drawBoss2() {
    const pulse = 0.5 + Math.sin(boss.phase * 3.2) * 0.18;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.shadowBlur = 24;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : `rgba(103, 188, 255, ${pulse})`;

    ctx.fillStyle = "#193b59";
    ctx.strokeStyle = "#9bd8f4";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 118, 62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#274f72";
    [-1, 1].forEach((side) => {
      ctx.fillRect(side * 92 - (side < 0 ? 105 : 0), -38, 105, 76);
      ctx.strokeRect(side * 92 - (side < 0 ? 105 : 0), -38, 105, 76);
      ctx.strokeStyle = "rgba(139, 213, 244, 0.42)";
      for (let line = 1; line < 4; line += 1) {
        const x = side * 92 - (side < 0 ? 105 : 0) + line * 26;
        ctx.beginPath();
        ctx.moveTo(x, -36);
        ctx.lineTo(x, 36);
        ctx.stroke();
      }
      ctx.strokeStyle = "#9bd8f4";
    });

    ctx.fillStyle = "#102c44";
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#72c9ee";
    ctx.globalAlpha = 0.52 + Math.sin(boss.phase * 5) * 0.18;
    ctx.beginPath();
    ctx.arc(0, 0, 29, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#d9f5ff";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#84c9e8";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 82, boss.phase * 0.6, boss.phase * 0.6 + Math.PI * 1.45);
    ctx.stroke();
    ctx.strokeStyle = "#5d89d8";
    ctx.beginPath();
    ctx.arc(0, 0, 94, -boss.phase * 0.45, -boss.phase * 0.45 + Math.PI * 1.3);
    ctx.stroke();

    [-62, 62].forEach((x) => {
      ctx.fillStyle = "#0c2539";
      ctx.fillRect(x - 17, 42, 34, 30);
      ctx.strokeStyle = "#77c8e8";
      ctx.strokeRect(x - 17, 42, 34, 30);
      ctx.fillStyle = "#ffb36e";
      ctx.beginPath();
      ctx.arc(x, 59, 6 + Math.sin(boss.phase * 8 + x) * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "#b7e9fb";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -48);
    ctx.lineTo(0, -92);
    ctx.lineTo(28, -112);
    ctx.stroke();
    ctx.fillStyle = "#8edcff";
    ctx.beginPath();
    ctx.arc(28, -112, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const barWidth = Math.min(620, WIDTH - 100);
    const barX = (WIDTH - barWidth) / 2;
    const ratio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(8, 24, 40, 0.82)";
    ctx.fillRect(barX - 5, 18, barWidth + 10, 34);
    ctx.fillStyle = "#142c42";
    ctx.fillRect(barX, 37, barWidth, 10);
    const gradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    gradient.addColorStop(0, "#4b85cf");
    gradient.addColorStop(1, "#92d8f5");
    ctx.fillStyle = gradient;
    ctx.fillRect(barX, 37, barWidth * ratio, 10);
    ctx.strokeStyle = "#b7e7f8";
    ctx.strokeRect(barX, 37, barWidth, 10);
    ctx.fillStyle = "#eefaff";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${copy[language()].boss2Name}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 30);
    ctx.fillStyle = "rgba(190, 226, 248, 0.9)";
    ctx.font = "700 10px Roboto, sans-serif";
    ctx.fillText(boss.strategy, WIDTH / 2, 62);
    ctx.restore();
  }

  function drawBoss() {
    if (!boss) return;
    if (boss.type === "station") {
      drawBoss2();
      return;
    }
    const glow = 0.5 + Math.sin(boss.phase * 3) * 0.12;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.shadowBlur = 22;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : `rgba(104, 202, 232, ${glow})`;

    ctx.fillStyle = boss.hitFlash > 0 ? "#ffffff" : "#274d61";
    ctx.strokeStyle = "#a8d9e9";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 96);
    ctx.lineTo(-34, 55);
    ctx.lineTo(-112, 65);
    ctx.lineTo(-128, 42);
    ctx.lineTo(-70, 5);
    ctx.lineTo(-92, -47);
    ctx.lineTo(-45, -38);
    ctx.lineTo(0, -72);
    ctx.lineTo(45, -38);
    ctx.lineTo(92, -47);
    ctx.lineTo(70, 5);
    ctx.lineTo(128, 42);
    ctx.lineTo(112, 65);
    ctx.lineTo(34, 55);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#3d7891";
    ctx.beginPath();
    ctx.moveTo(0, 78);
    ctx.lineTo(-28, 18);
    ctx.lineTo(0, -48);
    ctx.lineTo(28, 18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#9bdcf0";
    ctx.beginPath();
    ctx.ellipse(0, 3, 24, 36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e6f8ff";
    ctx.beginPath();
    ctx.ellipse(0, 13, 9, 19, 0, 0, Math.PI * 2);
    ctx.fill();

    [-78, 78].forEach((x) => {
      ctx.fillStyle = "#183544";
      ctx.strokeStyle = "#73bad3";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, 35, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = boss.lasers.some((laser) => laser.charge > 0) ? "#ff9c76" : "#7cd6ef";
      ctx.beginPath();
      ctx.arc(x, 35, 9 + Math.sin(boss.phase * 7) * 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    const barWidth = Math.min(560, WIDTH - 120);
    const barX = (WIDTH - barWidth) / 2;
    const healthRatio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(12, 29, 40, 0.76)";
    ctx.fillRect(barX - 4, 20, barWidth + 8, 30);
    ctx.fillStyle = "#172d3a";
    ctx.fillRect(barX, 36, barWidth, 9);
    const healthGradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    healthGradient.addColorStop(0, "#d85f57");
    healthGradient.addColorStop(1, "#f1a16d");
    ctx.fillStyle = healthGradient;
    ctx.fillRect(barX, 36, barWidth * healthRatio, 9);
    ctx.strokeStyle = "rgba(225, 244, 251, 0.58)";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, 36, barWidth, 9);
    ctx.fillStyle = "#f2f9fc";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${copy[language()].bossName}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 29);
    if (boss.strategy) {
      ctx.fillStyle = "rgba(213, 241, 250, 0.88)";
      ctx.font = "700 10px Roboto, sans-serif";
      ctx.fillText(boss.strategy, WIDTH / 2, 60);
    }
    ctx.restore();
  }

  function drawItem(item) {
    const colors = {
      heal: { fill: "#dff4e9", edge: "#4c9c80", mark: "+" },
      bomb: { fill: "#fff0df", edge: "#c67a43", mark: "✦" },
      shield: { fill: "#eeecff", edge: "#716fc2", mark: "◇" },
      wingman: { fill: "#e4f6fc", edge: "#347eae", mark: "▲" },
      magnet: { fill: "#e1f9f8", edge: "#238f9e", mark: "∩" }
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
    drawBossAttacks();

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

    drawPlayerLasers();

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
        const isBossOrb = bullet.kind === "boss-orb";
        const isSeeker = bullet.kind === "seeker";
        const isPredictor = bullet.kind === "predictor";
        const isNeural = bullet.kind === "neural";
        const isCyclone = bullet.kind === "cyclone";
        const glowColor = isCyclone ? "#b9f3ff" : isSeeker ? "#70e2ff" : isPredictor ? "#db9cff" : isNeural ? "#89ffd2" : isBossOrb ? "#ffc16f" : "#ef8478";
        const fillColor = isCyclone ? "#5ec6e8" : isSeeker ? "#46bdda" : isPredictor ? "#bc6de0" : isNeural ? "#55c99c" : isBossOrb ? "#ff9d54" : "#e9685c";
        ctx.shadowBlur = isBossOrb || isSeeker || isPredictor || isNeural || isCyclone ? 16 : 8;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        if (isBossOrb || isSeeker || isPredictor || isNeural || isCyclone) {
          ctx.fillStyle = "#fff2c9";
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius * 0.42, 0, Math.PI * 2);
          ctx.fill();
        }
        if (isSeeker) {
          ctx.strokeStyle = "rgba(151, 236, 255, 0.78)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius + 4 + Math.sin(elapsed * 8) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (isCyclone) {
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
    });

    enemies.forEach((enemy) => drawEnemy(enemy, colors));
    drawBoss();
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
    if (!terminalPanel.hidden) {
      if (event.code === "Escape") {
        event.preventDefault();
        closeTerminal();
      }
      return;
    }
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

  if (MOBILE_LAYOUT && mobileControls && joystick && mobileFireButton && mobileBombButton) {
    joystick.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileInput.active = true;
      mobileInput.pointerId = event.pointerId;
      joystick.setPointerCapture(event.pointerId);
      updateMobileJoystick(event);
    });
    joystick.addEventListener("pointermove", (event) => {
      if (mobileInput.pointerId !== event.pointerId) return;
      event.preventDefault();
      updateMobileJoystick(event);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      joystick.addEventListener(eventName, (event) => resetMobileJoystick(event.pointerId));
    });
    mobileFireButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileInput.fire = true;
      mobileFireButton.setPointerCapture(event.pointerId);
      mobileFireButton.classList.add("is-pressed");
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      mobileFireButton.addEventListener(eventName, () => {
        mobileInput.fire = false;
        mobileFireButton.classList.remove("is-pressed");
      });
    });
    mobileBombButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileBombButton.setPointerCapture(event.pointerId);
      mobileBombButton.classList.add("is-pressed");
      useBomb(players[0]);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      mobileBombButton.addEventListener(eventName, () => mobileBombButton.classList.remove("is-pressed"));
    });
  }

  window.addEventListener("blur", () => {
    keys.clear();
    resetMobileJoystick();
    mobileInput.fire = false;
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
  terminalButton.addEventListener("click", () => {
    if (terminalPanel.hidden) openTerminal();
    else closeTerminal();
  });
  terminalCloseButton.addEventListener("click", closeTerminal);
  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    if (command === "boss") {
      ensureAudio();
      jumpToBoss();
    } else if (command === "boss2") {
      ensureAudio();
      jumpToBoss2();
    } else {
      terminalOutput.textContent = copy[language()].terminalUnknown;
      terminalInput.select();
    }
  });
  levelOptions.querySelectorAll("[data-upgrade]").forEach((button) => {
    button.addEventListener("click", () => chooseUpgrade(button.dataset.upgrade));
  });
  classOptions.querySelectorAll("[data-class]").forEach((button) => {
    button.addEventListener("click", () => chooseClass(button.dataset.class));
  });
  document.addEventListener("i18nchange", () => {
    updateSoundButton();
    updateTerminalLanguage();
    if (mode === "paused") showOverlay("paused");
    else if (mode === "gameover") showOverlay("gameover");
    else if (mode === "ready") showOverlay("ready");
    else if (mode === "levelup") showLevelUp();
    else if (mode === "classup") showClassChoice();
  });

  resetGame();
  showOverlay("ready");
  updateSoundButton();
  updateTerminalLanguage();
  requestAnimationFrame(frame);
})();
