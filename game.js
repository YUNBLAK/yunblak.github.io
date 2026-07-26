(function () {
  "use strict";

  const canvas = document.getElementById("flight-game");
  if (!canvas) return;

  const MOBILE_LAYOUT = window.matchMedia("(max-width: 760px)").matches;
  if (MOBILE_LAYOUT) {
    canvas.width = 720;
    canvas.height = 1000;
  }
  const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
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
      overdrive: "Overdrive · 10 seconds",
      core: "Data Core · +2 XP",
      classTitle: "Choose your advancement",
      classCopy: "Level 5 reached. Choose one permanent combat specialization.",
      class2Title: "Second advancement",
      class2Copy: "Level 15 reached. Evolve your aircraft core.",
      class3Title: "Final advancement",
      class3Copy: "Level 25 reached. Choose an ultimate system.",
      bossName: "FROST COLOSSUS",
      bossWarning: "BOSS INCOMING",
      bossDefeated: "BOSS DEFEATED",
      terminalOpen: "Open command terminal",
      terminalClose: "Close terminal",
      terminalPlaceholder: "type a command",
      terminalUnknown: "Unknown command. Use boss1 through boss20.",
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
      boss2Overdrive: "ORBITAL EVASION MODE",
      apexWarning: (tier, name) => `BOSS ${tier}/20 · ${name}`,
      apexDefeated: (name) => `${name} DESTROYED`,
      apexStrategy: (pattern) => `APEX AI · ${pattern}`
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
      overdrive: "오버드라이브 · 10초",
      core: "데이터 코어 · 경험치 +2",
      classTitle: "전직 선택",
      classCopy: "레벨 5 달성! 영구적으로 적용할 전투 특성을 선택하세요.",
      class2Title: "2차 전직",
      class2Copy: "레벨 15 달성! 기체의 핵심 시스템을 진화시키세요.",
      class3Title: "3차 전직",
      class3Copy: "레벨 25 달성! 궁극 시스템을 선택하세요.",
      bossName: "프로스트 콜로서스",
      bossWarning: "보스 출현",
      bossDefeated: "보스 격파",
      terminalOpen: "명령 터미널 열기",
      terminalClose: "터미널 닫기",
      terminalPlaceholder: "명령어 입력",
      terminalUnknown: "알 수 없는 명령어입니다. boss1부터 boss20까지 입력할 수 있습니다.",
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
      boss2Overdrive: "궤도 회피 모드",
      apexWarning: (tier, name) => `보스 ${tier}/20 · ${name}`,
      apexDefeated: (name) => `${name} 격파`,
      apexStrategy: (pattern) => `APEX AI · ${pattern}`
    }
  };

  const keys = new Set();
  const mobileInput = { active: false, pointerId: null, dx: 0, dy: 0, fire: false };
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
  const APEX_BOSSES = [
    { name: "AURORA DEVOURER", color: "#71d7ee", pattern: "PRISM STORM", movement: "ribbon", kit: [0, 1, 2], special: "prism_cage", evolutions: ["SPECTRUM AWAKENING", "SEVEN-COLOR COLLAPSE"] },
    { name: "NULL CATHEDRAL", color: "#ad92ff", pattern: "VOID CROSSFIRE", movement: "teleport", kit: [5, 4, 0], special: "void_gates", evolutions: ["OPEN THE CHOIR", "CATHEDRAL OF NOTHING"] },
    { name: "IRON SERAPH", color: "#f0b46b", pattern: "SOLAR LANCES", movement: "dive", kit: [1, 3, 5], special: "solar_sweep", evolutions: ["WINGS OF FUSION", "FALLEN SUN PROTOCOL"] },
    { name: "CRYO LEVIATHAN", color: "#7ec8ff", pattern: "FROZEN SPIRAL", movement: "serpent", kit: [2, 3, 4], special: "frost_domain", evolutions: ["PERMAFROST SHED", "ABSOLUTE HIBERNATION"] },
    { name: "ECHO TYRANT", color: "#ef83b6", pattern: "MIRROR VOLLEY", movement: "mirror", kit: [1, 5, 2], special: "echo_replay", evolutions: ["SECOND VOICE", "INFINITE REFRAIN"] },
    { name: "GRAVITY REAPER", color: "#8f9cff", pattern: "SINGULARITY MINES", movement: "orbit", kit: [3, 0, 4], special: "singularity", evolutions: ["MASS HARVEST", "GRAVITY FUNERAL"] },
    { name: "TEMPEST CROWN", color: "#66e0cb", pattern: "THUNDER FAN", movement: "dash", kit: [1, 5, 0], special: "chain_lightning", evolutions: ["STORM THRONE", "HEAVEN-SPLITTER"] },
    { name: "OBSIDIAN ORACLE", color: "#bd83e8", pattern: "PREDICTION GRID", movement: "oracle", kit: [4, 3, 1], special: "future_grid", evolutions: ["FUTURE SIGHT", "INEVITABLE VERDICT"] },
    { name: "SOLAR EXECUTOR", color: "#ff9b62", pattern: "CORONA BURST", movement: "sun", kit: [0, 2, 3], special: "corona_wave", evolutions: ["RED GIANT", "SUPERNOVA SENTENCE"] },
    { name: "NEURAL HYDRA", color: "#79d5a7", pattern: "HUNTER SWARM", movement: "hydra", kit: [4, 1, 2], special: "hydra_heads", evolutions: ["RECURSIVE GROWTH", "THOUSAND-MIND SWARM"] },
    { name: "PHANTOM ARK", color: "#91b8ec", pattern: "PHASE BARRAGE", movement: "phase", kit: [5, 4, 3], special: "phase_cloak", evolutions: ["GHOST FLEET", "UNOBSERVED REALITY"] },
    { name: "CHRONO WARDEN", color: "#e5ce72", pattern: "TIME FRACTURE", movement: "clock", kit: [2, 1, 0], special: "time_stop", evolutions: ["BROKEN SECOND", "END OF TIME"] },
    { name: "DARKSTAR ENGINE", color: "#9c82df", pattern: "EVENT HORIZON", movement: "orbit", kit: [3, 4, 0], special: "black_hole", evolutions: ["DARK MATTER CORE", "SINGULARITY ENGINE"] },
    { name: "CELESTIAL MANTIS", color: "#72e2bb", pattern: "SCYTHE CROSS", movement: "dash", kit: [5, 1, 2], special: "scythe_cross", evolutions: ["PREDATOR ASCENT", "HEAVEN-CUTTING FORM"] },
    { name: "OMEGA FOUNDRY", color: "#ef7b68", pattern: "MOLTEN RAIN", movement: "forge", kit: [3, 0, 5], special: "molten_floor", evolutions: ["CORE OVERHEAT", "WORLD-FORGE MELTDOWN"] },
    { name: "QUANTUM SOVEREIGN", color: "#65c9ff", pattern: "PROBABILITY STORM", movement: "teleport", kit: [4, 2, 5], special: "quantum_decoys", evolutions: ["SUPERPOSITION", "ALL OUTCOMES AT ONCE"] },
    { name: "WORLD EATER", color: "#e26b8c", pattern: "EXTINCTION WAVE", movement: "pursuit", kit: [0, 1, 3], special: "shrinking_world", evolutions: ["PLANETARY HUNGER", "LAST HORIZON"] },
    { name: "ABSOLUTE ZERO", color: "#d8f6ff", pattern: "FINAL CONVERGENCE", movement: "chaos", kit: [0, 1, 2, 3, 4, 5], special: "absolute_zero", evolutions: ["ZERO KELVIN", "HEAT DEATH"] }
  ];
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
  let renderQuality = 1;
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
    return renderQuality < 0.55 ? 230 : renderQuality < 0.8 ? 310 : MAX_ENEMY_BULLETS;
  }

  function particleBudget() {
    return renderQuality < 0.55 ? 190 : renderQuality < 0.8 ? 300 : MAX_PARTICLES;
  }

  function bossHazardBudget() {
    return renderQuality < 0.55 ? 18 : renderQuality < 0.8 ? 26 : MAX_BOSS_HAZARDS;
  }

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
      const noiseLength = Math.floor(audioContext.sampleRate);
      noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noiseLength; index += 1) noiseData[index] = Math.random() * 2 - 1;
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return true;
  }

  function playTone(frequency, endFrequency, duration, volume, type, delay) {
    if (soundMuted || !ensureAudio()) return;
    if (activeAudioVoices >= (renderQuality < 0.55 ? 10 : renderQuality < 0.8 ? 14 : 24)) return;
    activeAudioVoices += 1;
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
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      activeAudioVoices = Math.max(0, activeAudioVoices - 1);
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  function playNoise(duration, volume, cutoff) {
    if (soundMuted || !ensureAudio()) return;
    if (!noiseBuffer || activeAudioVoices >= (renderQuality < 0.55 ? 10 : renderQuality < 0.8 ? 14 : 24)) return;
    activeAudioVoices += 1;
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    filter.type = "lowpass";
    filter.frequency.value = cutoff || 900;
    const noiseEnd = audioContext.currentTime + Math.min(duration, 0.95);
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, noiseEnd);
    source.buffer = noiseBuffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
      activeAudioVoices = Math.max(0, activeAudioVoices - 1);
    };
    source.start();
    source.stop(noiseEnd);
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

  const DARK_GAME_PALETTE = {
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
  };
  const LIGHT_GAME_PALETTE = {
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

  function palette() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? DARK_GAME_PALETTE
      : LIGHT_GAME_PALETTE;
  }

  function makeStars() {
    stars = Array.from({ length: 86 }, () => {
      const alpha = 0.25 + Math.random() * 0.65;
      return {
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        radius: 0.7 + Math.random() * 2,
        speed: 22 + Math.random() * 70,
        alpha,
        alphaBand: Math.min(2, Math.floor(alpha * 3))
      };
    });
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
    const now = performance.now();
    if (now - hudLastUpdate < 80) return;
    const signature = [
      Math.floor(score), level, xp, xpNeeded,
      ...players.flatMap((pilot) => [
        Math.ceil(pilot.health), pilot.maxHealth, pilot.weapon, pilot.bombs,
        pilot.classType, pilot.alive
      ])
    ].join("|");
    if (signature === hudLastSignature) return;
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

  function currentEnemyLimit() {
    return Math.min(12, MAX_ENEMIES + Math.floor(Math.max(0, level - 10) / 10));
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
      hitFlash: 0,
      damageScale: 0.72,
      ultimateTimer: 16 + Math.random() * 4,
      ultimateCount: 0,
      ultimateSequence: [],
      cloakTimer: 10 + Math.random() * 4,
      cloakDuration: 0
    };
    startBossIntro({
      title: language() === "ko" ? "프로스트 콜로서스" : "FROST COLOSSUS",
      subtitle: language() === "ko" ? "차원 포격 병기" : "DIMENSIONAL ARTILLERY",
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
      enraged: false,
      damageScale: 0.78,
      ultimateTimer: 16 + Math.random() * 4,
      ultimateCount: 0,
      ultimateSequence: [],
      cloakTimer: 10 + Math.random() * 4,
      cloakDuration: 0
    };
    startBossIntro({
      title: language() === "ko" ? "궤도 AI 사령부" : "ORBITAL AI COMMAND",
      subtitle: language() === "ko" ? "성층권 전투 본부" : "STRATOSPHERIC WAR STATION",
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
      phaseCloak: 0,
      timeStop: 0,
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
      subtitle: profile.pattern,
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
      addApexHazard("clock", { x: WIDTH / 2, y: HEIGHT / 2, radius: Math.max(WIDTH, HEIGHT), delay: 0.15, duration: 2.2, damage: 0, color: "#f1db79" });
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
        { timer: 1.65, kind: "colossus-bombs" }
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
        { timer: 1.75, kind: "station-crossfire" }
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
      }
      screenFlash = Math.max(screenFlash, 0.3);
    }
  }

  function updateBossUltimate(dt) {
    if (!boss || bossIntro || boss.ultimateTimer == null) return;
    boss.ultimateTimer -= dt;
    if (boss.ultimateTimer > 0) return;
    launchBossUltimate();
    boss.ultimateTimer = boss.type === "apex" ? 10 + Math.random() * 5 : 16 + Math.random() * 4;
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

  function moveApexBoss(dt) {
    const speed = (boss.enraged ? 1.45 : 1) * (1 + Math.max(0, (boss.phaseStage || 1) - 1) * 0.12);
    const phase = boss.phase;
    if (boss.movement === "ribbon") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.92) * (WIDTH / 2 - 145);
      boss.y = boss.homeY + Math.sin(phase * 1.84) * 46;
    } else if (boss.movement === "teleport" || boss.movement === "phase") {
      boss.teleportTimer -= dt;
      boss.y = boss.homeY + Math.sin(phase * 1.6) * 28;
      if (boss.teleportTimer <= 0) {
        addExplosion(boss.x, boss.y, boss.color, 18);
        boss.x = 120 + Math.random() * (WIDTH - 240);
        boss.y = 95 + Math.random() * 115;
        addExplosion(boss.x, boss.y, "#ffffff", 14);
        boss.teleportTimer = (boss.movement === "phase" ? 1.2 : 2.1) / speed;
      }
    } else if (boss.movement === "dive") {
      boss.dashTimer -= dt;
      if (boss.dashTimer <= 0) {
        boss.dashTargetX = targetedPilot()?.x ?? WIDTH / 2;
        boss.dashTargetY = boss.y < 250 ? 330 : boss.homeY;
        boss.dashTimer = 1.45 / speed;
      }
      boss.x += (boss.dashTargetX - boss.x) * dt * 2.2 * speed;
      boss.y += (boss.dashTargetY - boss.y) * dt * 2.7 * speed;
    } else if (boss.movement === "serpent") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.72) * (WIDTH / 2 - 150);
      boss.y = boss.homeY + Math.sin(phase * 2.15) * 72;
    } else if (boss.movement === "mirror") {
      const target = targetedPilot();
      const desired = target ? WIDTH - target.x : WIDTH / 2;
      boss.x += (desired - boss.x) * dt * 1.35 * speed;
      boss.y = boss.homeY + Math.sin(phase) * 34;
    } else if (boss.movement === "orbit" || boss.movement === "sun" || boss.movement === "clock") {
      const rate = boss.movement === "clock" ? 1.25 : 0.55;
      boss.x = WIDTH / 2 + Math.cos(phase * rate) * (WIDTH / 2 - 165);
      boss.y = boss.homeY + 55 + Math.sin(phase * rate * 2) * 62;
    } else if (boss.movement === "dash") {
      boss.dashTimer -= dt;
      if (boss.dashTimer <= 0) {
        boss.dashTargetX = 90 + Math.random() * (WIDTH - 180);
        boss.dashTimer = 0.55 + Math.random() * 0.55;
      }
      boss.x += (boss.dashTargetX - boss.x) * dt * 5.4 * speed;
      boss.y = boss.homeY + Math.sin(phase * 3.2) * 34;
    } else if (boss.movement === "hydra") {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.48) * (WIDTH / 2 - 185);
      boss.y = boss.homeY + Math.abs(Math.sin(phase * 0.92)) * 62;
    } else if (boss.movement === "pursuit") {
      const target = targetedPilot();
      boss.x += ((target?.x ?? WIDTH / 2) - boss.x) * dt * 0.72 * speed;
      boss.y = boss.homeY + Math.sin(phase * 0.7) * 35;
    } else if (boss.movement === "chaos") {
      boss.x = WIDTH / 2 + Math.sin(phase * 1.7) * Math.cos(phase * 0.43) * (WIDTH / 2 - 135);
      boss.y = boss.homeY + 75 + Math.sin(phase * 2.7) * 82;
    } else {
      boss.x = WIDTH / 2 + Math.sin(phase * 0.45) * (WIDTH / 2 - 175);
      boss.y = boss.homeY + Math.sin(phase * 0.83) * 30;
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
    if (boss.tier === 3) {
      const colors = ["#78eaff", "#e095ff", "#fff19a"];
      for (let ray = 0; ray < 3 + stage; ray += 1) {
        const angle = Math.atan2(target.y - boss.y, target.x - boss.x) + (ray - (2 + stage) / 2) * 0.14;
        fireApexOrb(angle, 250 + ray * 18, 13 + boss.tier, "boss-orb", {
          effect: "prism_cage", color: colors[ray % colors.length], curve: ray % 2 ? -0.35 : 0.35
        });
      }
      boss.strategy = copy[language()].apexStrategy("LIVING SPECTRUM");
    } else if (boss.tier === 4) {
      addApexHazard("portal", {
        x: target.x + (Math.random() - 0.5) * 180,
        y: Math.max(180, target.y - 190),
        radius: 32,
        delay: 0.45,
        duration: 1.7 + stage * 0.3,
        damage: 19,
        color: "#b99aff"
      });
      boss.strategy = copy[language()].apexStrategy("VOID CHOIR");
    } else if (boss.tier === 5) {
      addApexHazard("beam-v", {
        x: Math.max(45, Math.min(WIDTH - 45, target.x + target.vx * 0.35)),
        width: 18 + stage * 4,
        delay: 0.78,
        duration: 0.42 + stage * 0.08,
        damage: 25,
        color: "#ffc16e"
      });
      boss.strategy = copy[language()].apexStrategy("SERAPH FEATHER LANCE");
    } else if (boss.tier === 6) {
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
      boss.strategy = copy[language()].apexStrategy("LEVIATHAN FROST TRAIL");
    } else if (boss.tier === 7) {
      [-1, 1].forEach((mirror) => {
        const angle = Math.atan2(target.y - boss.y, target.x - (boss.x + mirror * 85));
        fireApexOrb(angle, 235 + stage * 20, 18, "boss-orb", {
          x: boss.x + mirror * 85, y: boss.y + 40, effect: "echo_replay",
          color: boss.color, curve: mirror * 0.32
        });
      });
      boss.strategy = copy[language()].apexStrategy("AUTONOMOUS ECHO");
    } else if (boss.tier === 8) {
      addApexHazard("well", {
        x: target.x, y: target.y - 30, radius: 58 + stage * 12,
        delay: 0.75, duration: 2.2, damage: 15 + stage * 2,
        pull: 75 + stage * 25, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("MASS ANCHOR");
    } else if (boss.tier === 9) {
      addApexHazard("strike", {
        x: target.x + target.vx * 0.32, y: target.y + target.vy * 0.22,
        radius: 35 + stage * 4, delay: 0.55, duration: 0.18,
        damage: 22 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("CROWN BOLT");
    } else if (boss.tier === 10) {
      const predicted = Math.atan2(target.y + target.vy * 0.55 - boss.y, target.x + target.vx * 0.65 - boss.x);
      for (let rune = 0; rune < 2 + stage; rune += 1) {
        fireApexOrb(predicted + (rune - (1 + stage) / 2) * 0.12, 285 + rune * 15, 19, "predictor", {
          effect: "future_grid", color: boss.color, radius: 8, life: 5
        });
      }
      boss.strategy = copy[language()].apexStrategy("INEVITABLE VECTOR");
    } else if (boss.tier === 11) {
      addApexHazard("ring", {
        x: boss.x, y: boss.y, radius: 18, width: 18 + stage * 3,
        delay: 0.55, duration: 1.5, speed: 255 + stage * 35,
        damage: 18 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("CORONA HEARTBEAT");
    } else if (boss.tier === 12) {
      addApexHazard("turret", {
        x: boss.x + (Math.random() - 0.5) * 160, y: boss.y + 80,
        radius: 30, delay: 0.35, duration: 1.8 + stage * 0.4,
        damage: 16 + stage * 2, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("REGENERATING HEAD");
    } else if (boss.tier === 13) {
      addApexHazard("decoy", {
        x: target.x + (Math.random() - 0.5) * 220, y: Math.max(120, target.y - 230),
        radius: 30, delay: 0.18, duration: 1.8 + stage * 0.5,
        damage: 17 + stage * 2, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("GHOST ESCORT");
    } else if (boss.tier === 14) {
      boss.timeStop = Math.max(boss.timeStop, 0.42 + stage * 0.16);
      addApexHazard("clock", {
        x: target.x, y: target.y, radius: 125, delay: 0.05,
        duration: 0.55 + stage * 0.18, damage: 0, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("STOLEN SECOND");
    } else if (boss.tier === 15) {
      addApexHazard("well", {
        x: target.x, y: target.y, radius: 78 + stage * 12,
        delay: 0.72, duration: 2.6, damage: 18 + stage * 3,
        pull: 120 + stage * 32, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("DARK MATTER LEAK");
    } else if (boss.tier === 16) {
      addApexHazard("sweep", {
        x: target.x, y: target.y, angle: Math.atan2(target.vy || 1, target.vx || 1),
        width: 18 + stage * 3, delay: 0.65, duration: 1.25,
        speed: stage % 2 ? 2.4 : -2.4, damage: 20 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("PREDATOR REFLEX");
    } else if (boss.tier === 17) {
      addApexHazard("field", {
        x: target.x, y: target.y, radius: 58 + stage * 8,
        delay: 0.72, duration: 2.7 + stage * 0.35,
        damage: 16 + stage * 3, color: boss.color
      });
      boss.strategy = copy[language()].apexStrategy("MOLTEN EXHAUST");
    } else if (boss.tier === 18) {
      for (let clone = 0; clone < stage; clone += 1) {
        addApexHazard("decoy", {
          x: 80 + Math.random() * (WIDTH - 160), y: 120 + Math.random() * 180,
          radius: 28, delay: 0.2 + clone * 0.12, duration: 1.8,
          damage: 17 + stage * 2, color: boss.color
        });
      }
      boss.strategy = copy[language()].apexStrategy("PROBABILITY ECHO");
    } else if (boss.tier === 19) {
      const side = Math.random() < 0.5 ? 1 : -1;
      fireApexOrb(side > 0 ? 0 : Math.PI, 270 + stage * 25, 21 + stage * 2, "boss-orb", {
        x: side > 0 ? 10 : WIDTH - 10, y: target.y,
        effect: "shrinking_world", color: boss.color, radius: 12, accel: 35
      });
      boss.strategy = copy[language()].apexStrategy("HORIZON BITE");
    } else if (boss.tier === 20) {
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
      boss.strategy = copy[language()].apexStrategy("ZERO-POINT LEAK");
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
      missile.trail.push({ x: missile.x, y: missile.y });
      if (missile.trail.length > 24) missile.trail.shift();
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
    if (averageFrameTime > 0.024) {
      slowFrameCount += 1;
      fastFrameCount = 0;
    } else if (averageFrameTime < 0.0195) {
      fastFrameCount += 1;
      slowFrameCount = Math.max(0, slowFrameCount - 2);
    } else {
      slowFrameCount = Math.max(0, slowFrameCount - 1);
      fastFrameCount = Math.max(0, fastFrameCount - 1);
    }
    if (slowFrameCount > 28) {
      renderQuality = 0.48;
      slowFrameCount = 0;
    } else if (slowFrameCount > 10 && renderQuality > 0.72) {
      renderQuality = 0.72;
    }
    if (fastFrameCount > 420) {
      renderQuality = renderQuality < 0.7 ? 0.72 : 1;
      fastFrameCount = 0;
    }
  }

  function dropItem(x, y, type) {
    items.push({ x, y, type, radius: 15, phase: Math.random() * Math.PI * 2 });
  }

  function maybeDropHealingItem(x, y) {
    const luck = players.reduce((highest, pilot) => Math.max(highest, pilot.itemLuck), 0);
    if (Math.random() > 0.12 + luck * 0.35) return false;
    dropItem(x, y, "heal");
    return true;
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
    updateHud();
  }

  function addMessage(text, color, pilot) {
    const target = pilot || player;
    messages.push({ text, x: target.x, y: target.y - 30, life: 1.1, color });
  }

  function collectItem(item, pilot) {
    const t = copy[language()];
    if (mission?.type === "collector") mission.progress += 1;
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
    } else if (item.type === "overdrive") {
      pilot.overdriveTimer = Math.max(pilot.overdriveTimer, 10);
      addMessage(t.overdrive, "#ffd66f", pilot);
    } else if (item.type === "core") {
      grantXp(2);
      score += 500;
      addMessage(t.core, "#8be3ff", pilot);
    }
    addExplosion(item.x, item.y, "#dff7ff", 12);
    const itemTone = item.type === "heal" ? 520 : item.type === "bomb" ? 620 : item.type === "shield" ? 710 : 820;
    playTone(itemTone, itemTone + 220, 0.2, 0.06, "sine");
    updateHud();
    if (mode === "running") {
      if (pendingClassChoice) showClassChoice();
      else if (pendingLevelUps > 0) showLevelUp();
    }
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
    } else if (type === "mobility") {
      players.forEach((pilot) => { pilot.speed += 32; });
    } else if (type === "armor" && players.some((pilot) => pilot.armor < 0.419)) {
      players.forEach((pilot) => { pilot.armor = Math.min(0.42, pilot.armor + 0.06); });
    } else if (type === "salvage" && players.some((pilot) => pilot.itemLuck < 0.179)) {
      players.forEach((pilot) => { pilot.itemLuck = Math.min(0.18, pilot.itemLuck + 0.03); });
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
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      if (bullet.x <= -20 || bullet.x >= WIDTH + 20 || bullet.y <= -30 || bullet.y >= HEIGHT + 30) {
        bullets.splice(index, 1);
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
    const apexTimeScale = boss?.type === "apex" && boss.timeStop > 0 ? 0.025 : 1;
    const bossProjectileScale = boss?.type === "apex" ? 1.24 : 1;
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
      bullet.x += bullet.vx * dt * hostileTimeScale * apexTimeScale * bossProjectileScale;
      bullet.y += bullet.vy * dt * hostileTimeScale * apexTimeScale * bossProjectileScale;
    });
    for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
      const bullet = enemyBullets[i];
      if ((bullet.life != null && bullet.life <= 0) || bullet.x < -20 || bullet.x > WIDTH + 20 || bullet.y < -20 || bullet.y > HEIGHT + 20) {
        enemyBullets.splice(i, 1);
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
        enemyBullets.splice(i, 1);
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

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vx *= 0.985;
      particle.vy *= 0.985;
      particle.life -= dt;
      if (particle.life <= 0) particles.splice(index, 1);
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

  function drawBackground(colors) {
    const gradientKey = `${colors.groundTop}|${colors.groundBottom}`;
    if (!backgroundGradient || backgroundGradientKey !== gradientKey) {
      backgroundGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      backgroundGradient.addColorStop(0, colors.groundTop);
      backgroundGradient.addColorStop(1, colors.groundBottom);
      backgroundGradientKey = gradientKey;
    }
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    for (let y = -40; y <= HEIGHT + 40; y += renderQuality < 0.8 ? 36 : 24) {
      const worldY = y - terrainOffset;
      const x = WIDTH * 0.5 + Math.sin(worldY * 0.006) * 128 + Math.sin(worldY * 0.015) * 26;
      if (y === -40) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = colors.riverEdge;
    ctx.lineWidth = 140;
    ctx.stroke();
    ctx.strokeStyle = colors.river;
    ctx.lineWidth = 112;
    ctx.stroke();

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    const gridOffset = terrainOffset % 105;
    ctx.beginPath();
    for (let y = gridOffset - 105; y < HEIGHT + 105; y += 105) {
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
    }
    const columnStep = renderQuality < 0.55 ? 290 : 145;
    const bendStep = renderQuality < 0.8 ? 45 : 30;
    for (let x = 85; x < WIDTH; x += columnStep) {
      for (let y = -30; y <= HEIGHT + 30; y += bendStep) {
        const bend = Math.sin((y - terrainOffset) * 0.012 + x) * 9;
        if (y === -30) ctx.moveTo(x + bend, y);
        else ctx.lineTo(x + bend, y);
      }
    }
    ctx.stroke();

    terrainFeatures.forEach((feature, featureIndex) => {
      if (renderQuality < 0.55 && featureIndex % 2) return;
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
        ctx.beginPath();
        for (let i = 0; i < 4; i += 1) {
          const angle = i * 1.7 + feature.x;
          const detailX = feature.x + Math.cos(angle) * feature.radius * 0.45;
          const detailY = y + Math.sin(angle) * feature.radius * 0.25;
          const detailRadius = 4 + (i % 2) * 2;
          ctx.moveTo(detailX + detailRadius, detailY);
          ctx.arc(detailX, detailY, detailRadius, 0, Math.PI * 2);
        }
        ctx.fill();
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

    ctx.fillStyle = colors.snow;
    for (let band = 0; band < 3; band += 1) {
      ctx.globalAlpha = 0.36 + band * 0.27;
      ctx.beginPath();
      let hasStars = false;
      for (let starIndex = 0; starIndex < stars.length; starIndex += 1) {
        if (renderQuality < 0.55 && starIndex % 2) continue;
        if (renderQuality < 0.8 && starIndex % 3 === 0) continue;
        const star = stars[starIndex];
        if (star.alphaBand !== band) continue;
        ctx.moveTo(star.x + star.radius, star.y);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        hasStars = true;
      }
      if (hasStars) ctx.fill();
    }
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
    ctx.restore();

    if (enemy.hp < enemy.maxHp) {
      const width = enemy.radius * 2.1;
      ctx.fillStyle = "rgba(20, 35, 45, 0.35)";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width, 3);
      ctx.fillStyle = "#f3a39b";
      ctx.fillRect(enemy.x - width / 2, enemy.y - enemy.radius - 12, width * enemy.hp / enemy.maxHp, 3);
    }
  }

  function drawBossHazards() {
    bossHazards.forEach((hazard) => {
      const charging = hazard.delay > 0;
      const chargeProgress = charging ? 1 - hazard.delay / Math.max(0.01, hazard.maxDelay) : 1;
      const alpha = charging ? 0.22 + chargeProgress * 0.38 : 0.72;
      ctx.save();
      ctx.strokeStyle = hazard.color;
      ctx.fillStyle = hazard.color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : charging ? 8 : 24;
      ctx.shadowColor = hazard.color;
      if (charging) ctx.setLineDash([9, 8]);

      if (hazard.type === "beam-v") {
        if (!charging && renderQuality >= 0.8) {
          const beamGradient = ctx.createLinearGradient(hazard.x - hazard.width / 2, 0, hazard.x + hazard.width / 2, 0);
          beamGradient.addColorStop(0, "rgba(255,255,255,0)");
          beamGradient.addColorStop(0.22, hazard.color);
          beamGradient.addColorStop(0.5, "#ffffff");
          beamGradient.addColorStop(0.78, hazard.color);
          beamGradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = beamGradient;
        }
        ctx.fillRect(hazard.x - hazard.width / 2, 0, hazard.width, HEIGHT);
        if (!charging) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(hazard.x - Math.max(2, hazard.width * 0.1), 0, Math.max(4, hazard.width * 0.2), HEIGHT);
        }
        ctx.strokeRect(hazard.x - hazard.width / 2, 0, hazard.width, HEIGHT);
      } else if (hazard.type === "beam-h") {
        if (!charging && renderQuality >= 0.8) {
          const beamGradient = ctx.createLinearGradient(0, hazard.y - hazard.width / 2, 0, hazard.y + hazard.width / 2);
          beamGradient.addColorStop(0, "rgba(255,255,255,0)");
          beamGradient.addColorStop(0.22, hazard.color);
          beamGradient.addColorStop(0.5, "#ffffff");
          beamGradient.addColorStop(0.78, hazard.color);
          beamGradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = beamGradient;
        }
        ctx.fillRect(0, hazard.y - hazard.width / 2, WIDTH, hazard.width);
        if (!charging) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, hazard.y - Math.max(2, hazard.width * 0.1), WIDTH, Math.max(4, hazard.width * 0.2));
        }
        ctx.strokeRect(0, hazard.y - hazard.width / 2, WIDTH, hazard.width);
      } else if (hazard.type === "strike") {
        ctx.lineWidth = charging ? 3 : 6;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius * (0.72 + chargeProgress * 0.28), 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hazard.x - hazard.radius, hazard.y);
        ctx.lineTo(hazard.x + hazard.radius, hazard.y);
        ctx.moveTo(hazard.x, hazard.y - hazard.radius);
        ctx.lineTo(hazard.x, hazard.y + hazard.radius);
        ctx.stroke();
        if (!charging) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(hazard.x, 0);
          const segments = 9;
          for (let segment = 1; segment <= segments; segment += 1) {
            const y = hazard.y * segment / segments;
            const jitter = segment === segments ? 0 : Math.sin(hazard.phase * 8 + segment * 4.7) * 19;
            ctx.lineTo(hazard.x + jitter, y);
          }
          ctx.stroke();
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = 10;
          ctx.globalAlpha *= 0.38;
          ctx.stroke();
        }
      } else if (hazard.type === "field" || hazard.type === "well") {
        if (renderQuality >= 0.8) {
          const gradient = ctx.createRadialGradient(hazard.x, hazard.y, 3, hazard.x, hazard.y, hazard.radius);
          gradient.addColorStop(0, hazard.type === "well" ? "rgba(5, 8, 24, 0.96)" : hazard.color);
          gradient.addColorStop(1, "rgba(15, 20, 35, 0)");
          ctx.fillStyle = gradient;
        } else {
          ctx.globalAlpha *= 0.35;
        }
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = hazard.color;
        ctx.lineWidth = hazard.type === "strike" ? 4 : 3;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius * (charging ? 0.65 + chargeProgress * 0.35 : 1), 0, Math.PI * 2);
        ctx.stroke();
        if (hazard.type === "well") {
          for (let arm = 0; arm < 4; arm += 1) {
            ctx.beginPath();
            ctx.arc(hazard.x, hazard.y, 18 + arm * 19, hazard.phase + arm, hazard.phase + arm + Math.PI * 1.35);
            ctx.stroke();
          }
        }
      } else if (hazard.type === "ring") {
        ctx.lineWidth = hazard.width;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        ctx.stroke();
        if (!charging && renderQuality >= 0.55) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = Math.max(2, hazard.width * 0.16);
          ctx.beginPath();
          ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = Math.max(2, hazard.width * 0.42);
          ctx.beginPath();
          ctx.arc(hazard.x, hazard.y, Math.max(4, hazard.radius - hazard.width * 1.2), 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (hazard.type === "sweep") {
        ctx.translate(hazard.x, hazard.y);
        ctx.rotate(hazard.angle);
        const length = Math.hypot(WIDTH, HEIGHT) * 1.5;
        ctx.fillRect(-length, -hazard.width / 2, length * 2, hazard.width);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = charging ? 2 : 5;
        ctx.beginPath();
        ctx.moveTo(-length, 0);
        ctx.lineTo(length, 0);
        ctx.stroke();
        if (!charging && renderQuality >= 0.55) {
          ctx.globalAlpha = alpha * 0.45;
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = 2;
          for (let trail = -2; trail <= 2; trail += 1) {
            if (!trail) continue;
            ctx.beginPath();
            ctx.moveTo(-length, trail * (hazard.width * 0.75));
            ctx.lineTo(length, trail * (hazard.width * 0.75));
            ctx.stroke();
          }
        }
      } else if (hazard.type === "portal" || hazard.type === "turret" || hazard.type === "decoy") {
        ctx.translate(hazard.x, hazard.y);
        ctx.rotate(hazard.phase * 0.25);
        const sides = hazard.type === "turret" ? 6 : hazard.type === "decoy" ? 4 : 10;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let point = 0; point < sides; point += 1) {
          const angle = point / sides * Math.PI * 2;
          const radius = point % 2 ? 18 : 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (point === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha *= 0.38;
        ctx.fill();
      } else if (hazard.type === "safezone") {
        ctx.fillStyle = "rgba(4, 10, 20, 0.46)";
        ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.arc(hazard.x, hazard.y, hazard.safeRadius, 0, Math.PI * 2);
        ctx.fill("evenodd");
        ctx.strokeStyle = hazard.color;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.safeRadius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (hazard.type === "clock") {
        ctx.translate(hazard.x, hazard.y);
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(0, 0, Math.min(WIDTH, HEIGHT) * 0.32, 0, Math.PI * 2);
        ctx.stroke();
        for (let mark = 0; mark < 12; mark += 1) {
          const angle = mark / 12 * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 115, Math.sin(angle) * 115);
          ctx.lineTo(Math.cos(angle) * 135, Math.sin(angle) * 135);
          ctx.stroke();
        }
        ctx.rotate(-hazard.duration * 2.2);
        ctx.fillRect(-4, -105, 8, 105);
      }
      ctx.setLineDash([]);
      ctx.restore();
    });
  }

  function drawBossAttacks() {
    drawBossHazards();
    bossBombs.forEach((bomb) => {
      const progress = 1 - bomb.timer / bomb.maxTimer;
      const pulse = 0.5 + Math.sin(bomb.phase * 2.2) * 0.18;
      const bombColor = bomb.color || (boss?.color ?? "#ff9670");
      ctx.save();
      ctx.globalAlpha = 0.18 + progress * 0.45;
      ctx.fillStyle = bombColor;
      ctx.strokeStyle = bombColor;
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18 + progress * 18;
      ctx.shadowColor = bombColor;
      ctx.lineWidth = 3 + progress * 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, bomb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (bomb.effect === "molten_floor") {
        ctx.globalAlpha = 0.7;
        for (let flame = 0; flame < 5; flame += 1) {
          const angle = flame / 5 * Math.PI * 2 + bomb.phase;
          ctx.beginPath();
          ctx.moveTo(bomb.x + Math.cos(angle) * bomb.radius * 0.55, bomb.y + Math.sin(angle) * bomb.radius * 0.55);
          ctx.lineTo(bomb.x + Math.cos(angle + 0.2) * bomb.radius * 0.9, bomb.y + Math.sin(angle + 0.2) * bomb.radius * 0.9);
          ctx.lineTo(bomb.x + Math.cos(angle - 0.2) * bomb.radius * 0.72, bomb.y + Math.sin(angle - 0.2) * bomb.radius * 0.72);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.9;
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
          if (renderQuality < 0.8 && index % 2) return;
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
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 22;
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

    if (!boss || !boss.lasers?.length) return;
    const beamTop = boss.y + 54;
    boss.lasers.forEach((laser) => {
      ctx.save();
      const portalTime = performance.now() * 0.0025 + laser.x * 0.01;
      const portalEnergy = laser.charge > 0 ? 1 - laser.charge / laser.maxCharge : 1;
      ctx.save();
      ctx.translate(laser.x, beamTop);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18 + portalEnergy * 16;
      ctx.shadowColor = "#9c78ff";
      if (renderQuality >= 0.8) {
        const portalGradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 34);
        portalGradient.addColorStop(0, "rgba(247, 245, 255, 0.98)");
        portalGradient.addColorStop(0.22, "rgba(116, 220, 255, 0.9)");
        portalGradient.addColorStop(0.58, "rgba(116, 82, 225, 0.72)");
        portalGradient.addColorStop(1, "rgba(46, 23, 104, 0)");
        ctx.fillStyle = portalGradient;
      } else {
        ctx.fillStyle = "rgba(128, 101, 226, 0.72)";
      }
      ctx.beginPath();
      ctx.ellipse(0, 0, 37 + portalEnergy * 6, 13 + portalEnergy * 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let ring = 0; ring < (renderQuality < 0.8 ? 1 : 3); ring += 1) {
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
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
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
    ctx.globalAlpha = (0.52 + Math.sin(boss.phase * 5) * 0.18) * (bossIsCloaked() ? 0.18 : 1);
    ctx.beginPath();
    ctx.arc(0, 0, 29, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
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

  function drawApexBoss() {
    const pulse = 0.65 + Math.sin(boss.phase * 4) * 0.2;
    const form = (boss.tier - 3) % 6;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.rotate((form === 1 || form === 5 ? boss.phase * 0.16 : Math.sin(boss.phase * 0.7) * 0.12));
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
    ctx.shadowBlur = 32;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : boss.color;
    ctx.fillStyle = boss.hitFlash > 0 ? "#ffffff" : "#172f43";
    ctx.strokeStyle = boss.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    const points = form === 0 ? 14 : form === 1 ? 16 : form === 2 ? 8 : form === 3 ? 12 : form === 4 ? 10 : 18;
    for (let point = 0; point < points; point += 1) {
      const angle = point / points * Math.PI * 2 - Math.PI / 2;
      let radius;
      if (form === 0) radius = point % 2 === 0 ? 112 : 58;
      else if (form === 1) radius = point % 4 === 0 ? 116 : point % 2 === 0 ? 82 : 65;
      else if (form === 2) radius = point % 2 === 0 ? 122 : 52;
      else if (form === 3) radius = point % 3 === 0 ? 118 : 70;
      else if (form === 4) radius = point % 2 === 0 ? 98 : 78;
      else radius = point % 3 === 0 ? 115 : point % 2 === 0 ? 72 : 55;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * (form === 2 ? 0.9 : form === 4 ? 0.55 : 0.72);
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (form === 1 || form === 3) {
      ctx.lineWidth = 5;
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(side * 72, 8, 25 + form * 2, boss.phase, boss.phase + Math.PI * 1.55);
        ctx.stroke();
        ctx.fillStyle = boss.color;
        ctx.beginPath();
        ctx.arc(side * 72, 8, 8 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    if (form === 2) {
      ctx.lineWidth = 7;
      for (let wing = -2; wing <= 2; wing += 1) {
        ctx.beginPath();
        ctx.moveTo(wing * 23, 5);
        ctx.quadraticCurveTo(wing * 40, 58, wing * 55, 92);
        ctx.stroke();
      }
    }
    if (form === 4) {
      ctx.lineWidth = 4;
      for (let pod = 0; pod < 5; pod += 1) {
        const angle = pod / 5 * Math.PI * 2 + boss.phase * 0.32;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * 92, Math.sin(angle) * 46, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
    const signatureNodes = 2 + boss.tier % 5;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.55 * (bossIsCloaked() ? 0.18 : 1);
    for (let node = 0; node < signatureNodes; node += 1) {
      const angle = node / signatureNodes * Math.PI * 2 + boss.phase * (boss.tier % 2 ? 0.42 : -0.35);
      const orbitX = Math.cos(angle) * (78 + form * 4);
      const orbitY = Math.sin(angle) * (48 + (boss.tier % 3) * 7);
      ctx.beginPath();
      ctx.arc(orbitX, orbitY, 4 + boss.tier % 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
    if (boss.phaseStage > 1) {
      ctx.strokeStyle = boss.color;
      ctx.lineWidth = boss.phaseStage === 3 ? 5 : 3;
      ctx.globalAlpha = (0.42 + Math.sin(boss.phase * 6) * 0.16) * (bossIsCloaked() ? 0.18 : 1);
      for (let aura = 0; aura < boss.phaseStage; aura += 1) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          118 + aura * 13 + Math.sin(boss.phase * 3 + aura) * 5,
          72 + aura * 9,
          boss.phase * (aura % 2 ? -0.18 : 0.22),
          aura * 1.1,
          aura * 1.1 + Math.PI * 1.45
        );
        ctx.stroke();
      }
      ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
    }

    ctx.rotate(-boss.phase * (form === 5 ? 0.95 : 0.55));
    ctx.strokeStyle = boss.color;
    ctx.lineWidth = 5 + form % 3;
    ctx.globalAlpha = pulse * (bossIsCloaked() ? 0.18 : 1);
    ctx.beginPath();
    if (form === 3) {
      ctx.ellipse(0, 0, 58, 30, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(0, 0, 42 + form * 3, 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
    ctx.fillStyle = boss.color;
    ctx.beginPath();
    ctx.arc(0, 0, 15 + pulse * 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const barWidth = Math.min(620, WIDTH - 100);
    const barX = (WIDTH - barWidth) / 2;
    const healthRatio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(8, 24, 36, 0.78)";
    ctx.fillRect(barX, 36, barWidth, 10);
    ctx.fillStyle = boss.color;
    ctx.fillRect(barX, 36, barWidth * healthRatio, 10);
    ctx.strokeStyle = "rgba(225, 244, 251, 0.58)";
    ctx.strokeRect(barX, 36, barWidth, 10);
    ctx.fillStyle = "#eefaff";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    const phaseLabel = boss.phaseStage > 1 ? ` · PHASE ${boss.phaseStage}` : "";
    ctx.fillText(`${boss.name}${phaseLabel}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 29);
    ctx.fillStyle = boss.color;
    ctx.font = "700 10px Roboto, sans-serif";
    ctx.fillText(boss.strategy, WIDTH / 2, 62);
    ctx.restore();
  }

  function drawBoss() {
    if (!boss) return;
    if (bossIsCloaked() && !bossIntro) return;
    if (boss.type === "apex") {
      drawApexBoss();
      return;
    }
    if (boss.type === "station") {
      drawBoss2();
      return;
    }
    const glow = 0.5 + Math.sin(boss.phase * 3) * 0.12;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
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
      magnet: { fill: "#e1f9f8", edge: "#238f9e", mark: "∩" },
      overdrive: { fill: "#fff4c8", edge: "#d89b26", mark: "⚡" },
      core: { fill: "#e2f4ff", edge: "#397fb5", mark: "◆" }
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

  function drawBossIntro() {
    if (!bossIntro || !boss) return;
    const progress = Math.min(1, bossIntro.time / bossIntro.duration);
    const reveal = Math.max(0, Math.min(1, (progress - 0.36) / 0.22));
    const fadeOut = Math.max(0, Math.min(1, (1 - progress) / 0.13));
    const intensity = Math.min(reveal || progress * 2.5, fadeOut);
    const barHeight = 64 * Math.min(1, progress * 4) * fadeOut;
    const pulse = 0.55 + Math.sin(bossIntro.time * 9) * 0.25;

    ctx.save();
    const vignette = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, HEIGHT * 0.1, WIDTH / 2, HEIGHT / 2, HEIGHT * 0.76);
    vignette.addColorStop(0, "rgba(3, 12, 20, 0.08)");
    vignette.addColorStop(1, `rgba(1, 5, 10, ${0.68 * fadeOut})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = `rgba(2, 7, 13, ${0.94 * fadeOut})`;
    ctx.fillRect(0, 0, WIDTH, barHeight);
    ctx.fillRect(0, HEIGHT - barHeight, WIDTH, barHeight);
    ctx.fillStyle = bossIntro.color;
    ctx.globalAlpha = 0.42 * fadeOut;
    ctx.fillRect(0, barHeight, WIDTH, 2);
    ctx.fillRect(0, HEIGHT - barHeight - 2, WIDTH, 2);

    const ringProgress = (bossIntro.time * 0.58) % 1;
    for (let ring = 0; ring < 4; ring += 1) {
      const ringPhase = (ringProgress + ring * 0.22) % 1;
      ctx.globalAlpha = (1 - ringPhase) * 0.58 * fadeOut;
      ctx.strokeStyle = bossIntro.color;
      ctx.lineWidth = 6 * (1 - ringPhase) + 1;
      ctx.beginPath();
      ctx.ellipse(boss.x, boss.y, 52 + ringPhase * 210, 24 + ringPhase * 105, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.18 * fadeOut;
    ctx.strokeStyle = bossIntro.color;
    ctx.lineWidth = 1;
    const scanY = (bossIntro.time * 360) % HEIGHT;
    for (let offset = -2; offset <= 2; offset += 1) {
      ctx.beginPath();
      ctx.moveTo(0, scanY + offset * 5);
      ctx.lineTo(WIDTH, scanY + offset * 5);
      ctx.stroke();
    }

    ctx.globalAlpha = intensity;
    const titleY = HEIGHT * 0.61;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 28;
    ctx.shadowColor = bossIntro.color;
    ctx.fillStyle = bossIntro.color;
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText(`— ${bossIntro.chapter} —`, WIDTH / 2, titleY - 50);

    ctx.shadowBlur = 38;
    ctx.fillStyle = "#f4fbff";
    const titleSize = Math.max(22, Math.min(42, WIDTH / Math.max(10, bossIntro.title.length) * 0.82));
    ctx.font = `900 ${titleSize}px Roboto, sans-serif`;
    const glitch = progress > 0.37 && progress < 0.48 ? Math.sin(bossIntro.time * 80) * 5 : 0;
    ctx.fillText(bossIntro.title, WIDTH / 2 + glitch, titleY);
    ctx.globalAlpha = intensity * 0.32;
    ctx.fillStyle = bossIntro.color;
    ctx.fillText(bossIntro.title, WIDTH / 2 - glitch * 1.5, titleY + 2);

    ctx.globalAlpha = intensity;
    ctx.shadowBlur = 12;
    ctx.fillStyle = bossIntro.color;
    ctx.font = "700 12px Roboto, sans-serif";
    ctx.fillText(bossIntro.subtitle, WIDTH / 2, titleY + 43);

    ctx.globalAlpha = pulse * fadeOut;
    ctx.lineWidth = 2;
    ctx.strokeStyle = bossIntro.color;
    const markerWidth = Math.min(260, WIDTH * 0.3);
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(WIDTH / 2 + side * (markerWidth + 18), titleY);
      ctx.lineTo(WIDTH / 2 + side * (markerWidth + 54), titleY);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawApexProjectile(bullet) {
    if (!bullet.effect) return false;
    const color = bullet.color || "#ffb06c";
    const angle = Math.atan2(bullet.vy, bullet.vx);
    const pulse = 0.75 + Math.sin(elapsed * 9 + bullet.x * 0.03) * 0.2;
    ctx.save();
    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(angle);
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18;
    ctx.shadowColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    if (renderQuality < 0.55) {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    }

    if (bullet.effect === "prism_cage") {
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-6, -6, 12, 12);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(-9, -9, 18, 18);
    } else if (bullet.effect === "void_gates") {
      ctx.fillStyle = "rgba(8, 5, 22, 0.92)";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius + 7 + pulse * 2, 0.2, Math.PI * 1.65);
      ctx.stroke();
    } else if (bullet.effect === "frost_domain" || bullet.effect === "absolute_zero") {
      for (let arm = 0; arm < 6; arm += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bullet.radius + 6, 0);
        ctx.moveTo(bullet.radius * 0.6, 0);
        ctx.lineTo(bullet.radius, 4);
        ctx.moveTo(bullet.radius * 0.6, 0);
        ctx.lineTo(bullet.radius, -4);
        ctx.stroke();
      }
    } else if (bullet.effect === "echo_replay") {
      ctx.globalAlpha = 0.82;
      [-5, 5].forEach((offset) => {
        ctx.beginPath();
        ctx.arc(offset, 0, bullet.radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (bullet.effect === "singularity" || bullet.effect === "black_hole") {
      ctx.fillStyle = "#050914";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.ellipse(0, 0, bullet.radius + 8, 4, elapsed * 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (bullet.effect === "future_grid") {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, -bullet.radius - 3);
      ctx.lineTo(bullet.radius + 7, bullet.radius + 5);
      ctx.lineTo(-bullet.radius - 7, bullet.radius + 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else if (bullet.effect === "corona_wave" || bullet.effect === "solar_sweep") {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      for (let ray = 0; ray < 6; ray += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(bullet.radius + 2, 0);
        ctx.lineTo(bullet.radius + 8 + pulse * 3, 0);
        ctx.stroke();
      }
    } else if (bullet.effect === "hydra_heads") {
      ctx.beginPath();
      ctx.moveTo(13, 0);
      ctx.lineTo(-7, -7);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-7, 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#eaffc9";
      ctx.fillRect(2, -2, 6, 4);
    } else if (bullet.effect === "phase_cloak") {
      ctx.globalAlpha = 0.42 + pulse * 0.35;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(0, -9);
      ctx.lineTo(-12, 0);
      ctx.lineTo(0, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    } else if (bullet.effect === "time_stop") {
      ctx.rotate(elapsed * 3);
      ctx.strokeRect(-bullet.radius, -bullet.radius, bullet.radius * 2, bullet.radius * 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -bullet.radius + 2);
      ctx.moveTo(0, 0);
      ctx.lineTo(bullet.radius - 2, 0);
      ctx.stroke();
    } else if (bullet.effect === "scythe_cross") {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(-3, 0, bullet.radius + 8, -1.1, 1.1);
      ctx.stroke();
      ctx.strokeStyle = "#e9fff7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(-3, 0, bullet.radius + 4, -1, 1);
      ctx.stroke();
    } else if (bullet.effect === "quantum_decoys") {
      ctx.rotate(elapsed * 4 + bullet.x);
      ctx.globalAlpha = 0.72;
      ctx.strokeRect(-bullet.radius, -bullet.radius, bullet.radius * 2, bullet.radius * 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-4, -4, 8, 8);
    } else if (bullet.effect === "shrinking_world") {
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-8, -9);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffdbe5";
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius * 0.42, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return true;
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
      enemyBullets.forEach((bullet) => {
      if (bullet.effect && drawApexProjectile(bullet)) return;
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
      });
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
      particles.forEach((particle) => {
        ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
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
    if (rawFrameTime > 0 && rawFrameTime < 0.2) updatePerformanceQuality(rawFrameTime);
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
    const numberedBossCommand = command.match(/^boss([1-9]|1[0-9]|20)$/);
    if (command === "boss") {
      ensureAudio();
      jumpToBoss();
    } else if (numberedBossCommand) {
      ensureAudio();
      prepareBossStage(Number(numberedBossCommand[1]));
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
