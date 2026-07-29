/**
 * Frost Wing — game structure
 * DOM bindings, shared state, lifecycle, HUD, terminal, and common runtime helpers.
 * This source is assembled into ../game.js by build-game.mjs.
 */
const canvas = document.getElementById("flight-game");

if (!canvas) return;

const MOBILE_LAYOUT = window.matchMedia("(max-width: 760px)").matches;

const LOW_POWER_DEVICE = MOBILE_LAYOUT
    || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory > 0 && navigator.deviceMemory <= 4);

if (MOBILE_LAYOUT) {
    canvas.width = 720;
    canvas.height = 1000;
  }

const ctx = canvas.getContext("2d", {
    alpha: false,
    desynchronized: true,
    willReadFrequently: false,
    colorSpace: "srgb"
  });

if (!ctx) return;

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
      aegisUpgrade: "Aegis Duration",
      aegisUpgradeDesc: (current, next, rank) => `Automatic shield ${current}s → ${next}s · Upgrade ${rank}/3`,
      aegisUpgradeMax: "Aegis upgrade complete",
      aegisUpgradeMaxDesc: "Maximum 5-second automatic shield reached",
      mute: "Mute sound",
      unmute: "Turn sound on",
      heal: "+ Health",
      bomb: "+ Bomb",
      shield: "+ Two-hit Shield",
      shieldActive: "Shield already active",
      wingman: "+ Wingman",
      wingmanActive: "Fleet capacity is full",
      magnet: "Magnet · All supplies collected",
      overdrive: "Overdrive · 10 seconds",
      core: "Data Core · +2 XP",
      classTitle: "Choose your advancement",
      classCopy: "Level 5 reached. Choose one permanent combat specialization.",
      class2Title: "Second advancement",
      class2Copy: "Level 15 reached. Evolve your aircraft core.",
      class3Title: "Final advancement",
      class3Copy: "Level 25 reached. Choose an ultimate system.",
      bossName: "NEWTON GRAVITY ENGINE",
      bossWarning: "BOSS INCOMING",
      bossDefeated: "BOSS DEFEATED",
      terminalOpen: "Open command terminal",
      terminalClose: "Close terminal",
      terminalPlaceholder: "type a command",
      terminalUnknown: "Unknown command. Use boss1 through boss20.",
      strategyLaser: "NEWTON AI · INERTIAL LASER SEARCH",
      strategyWall: "NEWTON AI · SECOND-LAW FORCE WALL",
      strategyBomb: "NEWTON AI · FALLING-APPLE BOMBARDMENT",
      strategyPredict: "NEWTON AI · MOMENTUM PREDICTION",
      strategySeeker: "NEWTON AI · ORBITAL PURSUIT",
      strategySpiral: "NEWTON AI · ACTION-REACTION CROSSFIRE",
      strategyCyclone: "NEWTON AI · ROTATIONAL MOMENTUM",
      bossOverdrive: "NEWTON AI · GRAVITY OVERDRIVE",
      bossPrepCopy: (targetLevel, remaining) => `Level ${targetLevel} boss preparation · Choose ${remaining} more upgrade${remaining === 1 ? "" : "s"}.`,
      boss2Name: "VON NEUMANN REPLICATOR",
      boss2Warning: "CHAPTER 2 · SELF-REPLICATING ORBITAL AI",
      boss2Defeated: "REPLICATOR CORE DESTROYED",
      strategyIcbm: "VON NEUMANN AI · RECURSIVE MISSILE TREE",
      boss2Overdrive: "SELF-REPLICATION OVERDRIVE",
      apexWarning: (tier, name) => `SCIENTIST AI ${tier}/20 · ${name}`,
      apexDefeated: (name) => `${name} DESTROYED`,
      apexStrategy: (pattern) => `SCIENTIST AI · ${pattern}`
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
      aegisUpgrade: "이지스 지속시간",
      aegisUpgradeDesc: (current, next, rank) => `자동 보호막 ${current}초 → ${next}초 · ${rank}/3단계`,
      aegisUpgradeMax: "이지스 업그레이드 완료",
      aegisUpgradeMaxDesc: "자동 보호막 최대 지속시간 5초에 도달했습니다",
      mute: "소리 끄기",
      unmute: "소리 켜기",
      heal: "+ 체력",
      bomb: "+ 폭탄",
      shield: "+ 2회 보호막",
      shieldActive: "이미 보호막이 활성화되어 있습니다",
      wingman: "+ 보조 비행기",
      wingmanActive: "함대 수용량이 가득 찼습니다",
      magnet: "자석 · 모든 보급품 회수",
      overdrive: "오버드라이브 · 10초",
      core: "데이터 코어 · 경험치 +2",
      classTitle: "전직 선택",
      classCopy: "레벨 5 달성! 영구적으로 적용할 전투 특성을 선택하세요.",
      class2Title: "2차 전직",
      class2Copy: "레벨 15 달성! 기체의 핵심 시스템을 진화시키세요.",
      class3Title: "3차 전직",
      class3Copy: "레벨 25 달성! 궁극 시스템을 선택하세요.",
      bossName: "뉴턴 중력 엔진",
      bossWarning: "보스 출현",
      bossDefeated: "보스 격파",
      terminalOpen: "명령 터미널 열기",
      terminalClose: "터미널 닫기",
      terminalPlaceholder: "명령어 입력",
      terminalUnknown: "알 수 없는 명령어입니다. boss1부터 boss20까지 입력할 수 있습니다.",
      strategyLaser: "뉴턴 AI · 관성 레이저 탐색",
      strategyWall: "뉴턴 AI · 제2법칙 힘의 장",
      strategyBomb: "뉴턴 AI · 낙하 사과 포격",
      strategyPredict: "뉴턴 AI · 운동량 예측",
      strategySeeker: "뉴턴 AI · 궤도 추적",
      strategySpiral: "뉴턴 AI · 작용·반작용 교차 사격",
      strategyCyclone: "뉴턴 AI · 회전 운동량",
      bossOverdrive: "뉴턴 AI · 중력 오버드라이브",
      bossPrepCopy: (targetLevel, remaining) => `레벨 ${targetLevel} 보스전 준비 · 업그레이드를 ${remaining}번 더 선택하세요.`,
      boss2Name: "폰 노이만 자기복제기",
      boss2Warning: "챕터 2 · 자기복제 궤도 AI",
      boss2Defeated: "자기복제 코어 파괴",
      strategyIcbm: "폰 노이만 AI · 재귀 미사일 트리",
      boss2Overdrive: "자기복제 오버드라이브",
      apexWarning: (tier, name) => `과학자 AI ${tier}/20 · ${name}`,
      apexDefeated: (name) => `${name} 격파`,
      apexStrategy: (pattern) => `과학자 AI · ${pattern}`
    }
  };

const keys = new Set();

const mobileInput = { active: false, pointerId: null, dx: 0, dy: 0, fire: false };

const SOLO_CONTROLS = {
    left: ["KeyA", "ArrowLeft"],
    right: ["KeyD", "ArrowRight"],
    up: ["KeyW", "ArrowUp"],
    down: ["KeyS", "ArrowDown"],
    fire: "Space"
  };

const PLAYER_ONE_CONTROLS = {
    left: "KeyA",
    right: "KeyD",
    up: "KeyW",
    down: "KeyS",
    fire: "Space"
  };

const PLAYER_TWO_CONTROLS = {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
    fire: "ShiftRight"
  };

const MAX_ENEMIES = 7;

const MAX_WINGMEN = 3;

const MAX_WINGMAN_WEAPON = 3;

const TOTAL_BOSSES = 20;

const MAX_PLAYER_BULLETS = 340;

const MAX_ENEMY_BULLETS = 420;

const MAX_PARTICLES = 440;

const MAX_MESSAGES = 32;

const MAX_ITEMS = 40;

const MAX_BOSS_HAZARDS = 36;

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

let defeatedApexTiers = new Set();

let bossMissiles = [];

let bossHazards = [];

let bossIntro = null;

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

let pendingClassTier = 1;

let bossCommandUpgradeSequence = false;

let bossCommandTargetLevel = 6;

let weaponKillsSinceBombDrop = 0;

let enemyKillsSinceRepair = 0;

let elapsed = 0;

let spawnTimer = 0;

let screenFlash = 0;

let lastTime = performance.now();

let audioContext = null;

let masterGain = null;

let noiseBuffer = null;

let activeAudioVoices = 0;

let soundMuted = false;

let terminalPreviousMode = null;

let renderQuality = LOW_POWER_DEVICE ? 0.72 : 1;

let averageFrameTime = 1 / 60;

let slowFrameCount = 0;

let fastFrameCount = 0;

let hudLastUpdate = 0;

let hudLastSignature = "";

let mission = null;

let missionCooldown = 5;

let missionSerial = 0;

let combo = 0;

let comboTimer = 0;

let focus = 0;

let frostDriveTimer = 0;

let ultimateBanner = null;

let backgroundGradient = null;

let backgroundGradientKey = "";

let focusGradient = null;

function enemyBulletBudget() {
    return renderQuality < 0.55 ? 165 : renderQuality < 0.8 ? 270 : 390;
  }

function particleBudget() {
    return renderQuality < 0.55 ? 135 : renderQuality < 0.8 ? 235 : 400;
  }

function bossHazardBudget() {
    return renderQuality < 0.55 ? 14 : renderQuality < 0.8 ? 22 : 32;
  }

try {
    soundMuted = localStorage.getItem("frostWingMuted") === "true";
  } catch (error) {}

function language() {
    return document.documentElement.getAttribute("lang") === "ko" ? "ko" : "en";
  }

function pointInsideTimeLock(x, y) {
    if (
      !boss
      || boss.type !== "apex"
      || boss.special !== "time_stop"
      || boss.timeStop <= 0
    ) return false;
    return bossHazards.some((hazard) => (
      hazard.type === "clock"
      && hazard.delay <= 0
      && hazard.duration > 0
      && Math.hypot(x - hazard.x, y - hazard.y) <= hazard.radius
    ));
  }

function pilotTimeLocked(pilot) {
    return Boolean(pilot?.alive && pointInsideTimeLock(pilot.x, pilot.y));
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
    pendingClassTier = 1;
    bossCommandUpgradeSequence = true;
    bossCommandTargetLevel = 6;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    boss = null;
    bossIntro = null;
    ultimateBanner = null;
    bossBombs = [];
    bossSpawned = false;
    bossDefeated = false;
    boss2Spawned = false;
    boss2Defeated = false;
    defeatedApexTiers = new Set();
    bossMissiles = [];
    bossHazards = [];
    mission = null;
    combo = 0;
    comboTimer = 0;
    focus = 0;
    frostDriveTimer = 0;
    ultimateBanner = null;
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
    pendingClassTier = 1;
    bossCommandUpgradeSequence = true;
    bossCommandTargetLevel = 10;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    boss = null;
    bossIntro = null;
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
    mission = null;
    combo = 0;
    comboTimer = 0;
    focus = 0;
    frostDriveTimer = 0;
    ultimateBanner = null;
    bossSpawned = true;
    bossDefeated = true;
    boss2Spawned = false;
    boss2Defeated = false;
    defeatedApexTiers = new Set();
    mode = "running";
    terminalPanel.hidden = true;
    terminalButton.setAttribute("aria-expanded", "false");
    terminalInput.value = "";
    terminalPreviousMode = null;
    updateHud();
    lastTime = performance.now();
    showClassChoice();
  }

function prepareBossStage(bossNumber) {
    if (bossNumber < 1 || bossNumber > TOTAL_BOSSES) return;
    resetGame();
    const targetLevel = bossNumber * 5;
    level = targetLevel;
    xp = 0;
    xpNeeded = 10;
    pendingLevelUps = 0;
    pendingClassChoice = false;
    mission = null;
    missionCooldown = 5;
    missionSerial = 0;
    combo = 0;
    comboTimer = 0;
    focus = 0;
    frostDriveTimer = 0;
    ultimateBanner = null;
    pendingClassTier = targetLevel >= 25 ? 3 : targetLevel >= 15 ? 2 : 1;
    bossCommandUpgradeSequence = false;
    bossCommandTargetLevel = targetLevel;

    players.forEach((pilot) => {
      pilot.damage += targetLevel * 0.12;
      pilot.weapon = Math.min(6, 1 + Math.floor(targetLevel / 10));
      pilot.fireInterval = Math.max(0.08, 0.19 - targetLevel * 0.002);
      pilot.laserInterval = Math.max(0.04, 0.08 - targetLevel * 0.0005);
      pilot.maxHealth += Math.floor(targetLevel / 5) * 30;
      pilot.health = pilot.maxHealth;
      pilot.speed += Math.min(150, targetLevel * 2);
      pilot.armor = Math.min(0.42, Math.floor(targetLevel / 15) * 0.06);
      pilot.bombs = 5;
      pilot.wingmanMax = Math.min(MAX_WINGMEN, 1 + Math.floor(targetLevel / 20));
      pilot.wingmanCount = pilot.wingmanMax;
      pilot.wingmanWeapon = Math.min(MAX_WINGMAN_WEAPON, 1 + Math.floor(targetLevel / 25));
      pilot.wingmanFireInterval = Math.max(0.2, 0.48 - targetLevel * 0.003);
      if (targetLevel >= 5) {
        pilot.classType = "aegis";
        pilot.classTier = 1;
      }
      if (targetLevel >= 15) {
        pilot.classTier = 2;
        pilot.maxHealth += 60;
        pilot.health = pilot.maxHealth;
        pilot.armor = Math.min(0.42, pilot.armor + 0.12);
      }
      if (targetLevel >= 25) {
        pilot.classTier = 3;
        pilot.specialization = "chrono";
        pilot.enemySlow = 0.78;
      }
    });

    boss = null;
    bossIntro = null;
    bossBombs = [];
    bossMissiles = [];
    bossHazards = [];
    bullets = [];
    enemies = [];
    enemyBullets = [];
    items = [];
    bossSpawned = bossNumber > 1;
    bossDefeated = bossNumber > 1;
    boss2Spawned = bossNumber > 2;
    boss2Defeated = bossNumber > 2;
    defeatedApexTiers = new Set();
    for (let tier = 3; tier < bossNumber; tier += 1) defeatedApexTiers.add(tier);

    mode = "running";
    if (bossNumber === 1) spawnBoss();
    else if (bossNumber === 2) spawnBoss2();
    else spawnApexBoss(bossNumber);
    hideOverlay();
    terminalPanel.hidden = true;
    terminalButton.setAttribute("aria-expanded", "false");
    terminalInput.value = "";
    terminalPreviousMode = null;
    updateHud();
    messages.push({
      text: `BOSS ${bossNumber} · LEVEL ${targetLevel}`,
      x: WIDTH / 2,
      y: HEIGHT * 0.54,
      life: 2.2,
      color: "#b9e8ff",
      fixed: true
    });
    lastTime = performance.now();
    canvas.focus({ preventScroll: true });
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
    bossIntro = null;
    bossBombs = [];
    bossSpawned = false;
    bossDefeated = false;
    boss2Spawned = false;
    boss2Defeated = false;
    defeatedApexTiers = new Set();
    bossMissiles = [];
    bossHazards = [];
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
    pendingClassTier = 1;
    mission = null;
    missionCooldown = 5;
    missionSerial = 0;
    combo = 0;
    comboTimer = 0;
    focus = 0;
    frostDriveTimer = 0;
    ultimateBanner = null;
    bossCommandUpgradeSequence = false;
    bossCommandTargetLevel = 6;
    weaponKillsSinceBombDrop = 0;
    enemyKillsSinceRepair = 0;
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

function updateHud(force = false) {
    const now = performance.now();
    if (!force && now - hudLastUpdate < 80) return;
    const signature = [
      Math.floor(score), level, xp, xpNeeded,
      ...players.flatMap((pilot) => [
        Math.ceil(pilot.health), pilot.maxHealth, pilot.weapon, pilot.bombs,
        pilot.classType, pilot.alive
      ])
    ].join("|");
    if (!force && signature === hudLastSignature) return;
    hudLastUpdate = now;
    hudLastSignature = signature;
    scoreEl.textContent = Math.floor(score).toString().padStart(6, "0");
    levelEl.textContent = `LV.${level}`;
    xpEl.textContent = `${xp} / ${xpNeeded} XP`;
    const isCoop = players.length === 2;
    const setPlayerRows = (element, values) => {
      while (element.children.length < values.length) element.appendChild(document.createElement("span"));
      while (element.children.length > values.length) element.lastElementChild.remove();
      values.forEach((value, index) => {
        const row = element.children[index];
        row.className = `coop-player-row coop-player-${index + 1}`;
        row.textContent = `P${index + 1} ${value}`;
      });
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

function addExplosion(x, y, color, amount) {
    const available = Math.max(0, particleBudget() - particles.length);
    const adjustedAmount = Math.min(available, Math.ceil(amount * (renderQuality < 0.55 ? 0.34 : renderQuality < 0.8 ? 0.62 : 1)));
    for (let i = 0; i < adjustedAmount; i += 1) {
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

function trimPerformancePools() {
    if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
    const bulletLimit = enemyBulletBudget();
    if (enemyBullets.length > bulletLimit) enemyBullets.splice(0, enemyBullets.length - bulletLimit);
    const particleLimit = particleBudget();
    if (particles.length > particleLimit) particles.splice(0, particles.length - particleLimit);
    if (messages.length > MAX_MESSAGES) messages.splice(0, messages.length - MAX_MESSAGES);
    if (items.length > MAX_ITEMS) items.splice(0, items.length - MAX_ITEMS);
    const hazardLimit = bossHazardBudget();
    if (bossHazards.length > hazardLimit) bossHazards.splice(0, bossHazards.length - hazardLimit);
  }

function updatePerformanceQuality(frameTime) {
    averageFrameTime = averageFrameTime * 0.9 + frameTime * 0.1;
    if (averageFrameTime > 0.0215) {
      slowFrameCount += 1;
      fastFrameCount = 0;
    } else if (averageFrameTime < 0.0185) {
      fastFrameCount += 1;
      slowFrameCount = Math.max(0, slowFrameCount - 2);
    } else {
      slowFrameCount = Math.max(0, slowFrameCount - 1);
      fastFrameCount = Math.max(0, fastFrameCount - 1);
    }
    if (slowFrameCount > 18) {
      renderQuality = 0.48;
      slowFrameCount = 0;
    } else if (slowFrameCount > 6 && renderQuality > 0.72) {
      renderQuality = 0.72;
    }
    if (fastFrameCount > 360) {
      renderQuality = renderQuality < 0.7 ? 0.72 : 1;
      fastFrameCount = 0;
    }
  }

function circlesTouch(a, b, extra) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const radiusA = a.collisionRadius == null ? a.radius : a.collisionRadius;
    const radiusB = b.collisionRadius == null ? b.radius : b.collisionRadius;
    const radius = radiusA + radiusB + (extra || 0);
    return dx * dx + dy * dy <= radius * radius;
  }

function removeUnordered(list, index) {
    const lastIndex = list.length - 1;
    if (index < 0 || index > lastIndex) return;
    if (index !== lastIndex) list[index] = list[lastIndex];
    list.pop();
  }
