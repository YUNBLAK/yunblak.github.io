(() => {
  "use strict";

  const canvas = document.getElementById("game2-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  const $ = (id) => document.getElementById(id);
  const overlay = $("g2-overlay");
  const overlayTitle = $("g2-overlay-title");
  const overlayCopy = $("g2-overlay-copy");
  const startButton = $("g2-start");
  const upgradesEl = $("g2-upgrades");
  const hpText = $("g2-hp");
  const hpBar = $("g2-hp-bar");
  const levelText = $("g2-level");
  const xpBar = $("g2-xp-bar");
  const atkText = $("g2-atk");
  const goldText = $("g2-score");
  const soundButton = $("g2-sound");
  const statsButton = $("g2-stats-toggle");
  const inventoryButton = $("g2-inventory-toggle");
  const panel = $("g2-panel");
  const panelKicker = $("g2-panel-kicker");
  const panelTitle = $("g2-panel-title");
  const panelBody = $("g2-panel-body");
  const panelClose = $("g2-panel-close");

  const W = canvas.width;
  const H = canvas.height;
  const SAVE_KEY = "emberfall-save-v2";
  const keys = new Set();
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x &&
    a.y < b.y + b.h && a.y + a.h > b.y;

  const CATALOG = {
    rusty_sword: { name: "낡은 대검", type: "weapon", attack: 0, price: 0, desc: "오래됐지만 믿을 만한 대검" },
    iron_sword: { name: "철제 대검", type: "weapon", attack: 2, price: 250, level: 1, desc: "공격력 +2" },
    knight_sword: { name: "기사단 대검", type: "weapon", attack: 5, price: 650, level: 4, desc: "공격력 +5" },
    cloth: { name: "여행자의 외투", type: "armor", defense: 0, hp: 0, price: 0, desc: "가벼운 여행용 외투" },
    chain_armor: { name: "사슬 갑옷", type: "armor", defense: 3, hp: 0, price: 300, level: 2, desc: "방어력 +3" },
    dusk_armor: { name: "황혼 갑옷", type: "armor", defense: 7, hp: 3, price: 800, level: 6, desc: "방어력 +7 · 최대 HP +3" },
    magic_ring: { name: "마력 반지", type: "accessory", magic: 4, price: 350, level: 2, desc: "마법력 +4" },
    potion: { name: "붉은 회복 물약", type: "consumable", price: 35, desc: "HP 3 회복" },
    high_potion: { name: "상급 회복 물약", type: "consumable", price: 90, level: 3, desc: "HP 8 회복" },
    haste_potion: { name: "신속 물약", type: "consumable", price: 120, level: 2, desc: "30초간 공격속도 증가" },
    fire_scroll: { name: "화염 검기 주문서", type: "skill", price: 500, level: 4, desc: "대검 공격에 화염 검기 추가" },
    memory_potion: { name: "기억의 물약", type: "reset", price: 1000, level: 1, desc: "투자한 스탯을 모두 회수" }
  };

  const SHOPS = {
    alchemy: { title: "연금술 상점", owner: "연금술사 미아", items: ["potion", "high_potion", "haste_potion"] },
    smith: { title: "왕실 대장간", owner: "대장장이 브람", items: ["iron_sword", "knight_sword", "chain_armor", "dusk_armor"] },
    magic: { title: "별빛 마법 상점", owner: "마법사 세레나", items: ["magic_ring", "fire_scroll"] },
    traveler: { title: "여행자의 비밀 상점", owner: "수상한 여행자", items: ["memory_potion"] }
  };

  const villageNpcs = [
    { id: "inn", x: 255, name: "엘린", role: "여관 주인", color: "#c26b64" },
    { id: "alchemist", x: 555, name: "미아", role: "연금술사", color: "#965e9f", shop: "alchemy" },
    { id: "elder", x: 850, name: "에드윈", role: "마을 장로", color: "#7a6d78" },
    { id: "guild", x: 1110, name: "로웬", role: "길드 접수원", color: "#4f7893" },
    { id: "smith", x: 1410, name: "브람", role: "대장장이", color: "#965448", shop: "smith" },
    { id: "mage", x: 1690, name: "세레나", role: "마법사", color: "#6157a0", shop: "magic" },
    { id: "traveler", x: 1925, name: "???", role: "수상한 여행자", color: "#4a4658", shop: "traveler" },
    { id: "guard", x: 2145, name: "가렌", role: "성문 경비병", color: "#4e6077" }
  ];

  const ZONES = {
    village: {
      name: "DUSKVALE VILLAGE", subtitle: "황혼이 머무는 안전한 마을", width: 2300, spawn: 120,
      platforms: [{ x: 0, y: 438, w: 2300, h: 102, kind: "village" }],
      enemies: [], crystals: [], npcs: villageNpcs,
      exits: [{ x: 2225, target: "field", spawn: 120, label: "마을 밖으로 나가기" }],
      checkpoint: null
    },
    field: {
      name: "AMBERWILD OUTSKIRTS", subtitle: "마을 밖 · 버려진 왕도", width: 3650, spawn: 120,
      platforms: [
        { x: 0, y: 438, w: 720, h: 102, kind: "grass" },
        { x: 810, y: 388, w: 510, h: 152, kind: "stone" },
        { x: 1400, y: 438, w: 710, h: 102, kind: "grass" },
        { x: 2190, y: 350, w: 470, h: 190, kind: "ruin" },
        { x: 2740, y: 438, w: 910, h: 102, kind: "grass" },
        { x: 650, y: 302, w: 135, h: 18, kind: "wood" },
        { x: 1260, y: 265, w: 145, h: 18, kind: "wood" },
        { x: 2050, y: 250, w: 145, h: 18, kind: "stone" },
        { x: 2580, y: 245, w: 155, h: 18, kind: "stone" }
      ],
      enemies: [
        ["slime", 420, 438], ["wolf", 640, 438], ["bandit", 980, 388],
        ["slime", 1530, 438], ["wolf", 1840, 438], ["bandit", 2350, 350],
        ["guard", 2920, 438], ["wolf", 3290, 438]
      ],
      crystals: [[260,390],[690,260],[930,340],[1290,225],[1510,390],[1980,390],[2100,210],[2300,300],[2630,205],[2870,390],[3370,390]],
      npcs: [],
      exits: [
        { x: 42, target: "village", spawn: 2130, label: "마을로 돌아가기" },
        { x: 3555, target: "dungeon", spawn: 120, label: "폐허 던전에 입장하기" }
      ],
      checkpoint: { x: 1760, label: "모닥불 체크포인트" }
    },
    dungeon: {
      name: "EMBERFALL CATACOMBS", subtitle: "폐왕의 지하 묘지", width: 3250, spawn: 120,
      platforms: [
        { x: 0, y: 438, w: 650, h: 102, kind: "dungeon" },
        { x: 735, y: 370, w: 470, h: 170, kind: "dungeon" },
        { x: 1285, y: 438, w: 610, h: 102, kind: "dungeon" },
        { x: 1985, y: 340, w: 510, h: 200, kind: "dungeon" },
        { x: 2580, y: 438, w: 670, h: 102, kind: "dungeon" },
        { x: 560, y: 285, w: 140, h: 18, kind: "stone" },
        { x: 1180, y: 250, w: 140, h: 18, kind: "stone" },
        { x: 1860, y: 258, w: 150, h: 18, kind: "stone" },
        { x: 2450, y: 235, w: 150, h: 18, kind: "stone" }
      ],
      enemies: [
        ["skeleton", 430, 438], ["skeleton", 920, 370], ["guard", 1500, 438],
        ["skeleton", 1760, 438], ["guard", 2180, 340], ["skeleton", 2700, 438],
        ["boss", 2920, 438]
      ],
      crystals: [[310,390],[610,245],[870,320],[1220,210],[1410,390],[1830,390],[1900,218],[2110,290],[2500,195],[2700,390]],
      npcs: [],
      exits: [{ x: 42, target: "field", spawn: 3460, label: "던전에서 나가기" }],
      checkpoint: { x: 1450, label: "고대 제단 체크포인트" }
    }
  };

  const ENEMY_STATS = {
    slime: { w: 42, h: 32, hp: 2, xp: 48, damage: 1, speed: .55, gold: 28 },
    wolf: { w: 48, h: 34, hp: 3, xp: 42, damage: 2, speed: 1.05, gold: 38 },
    bandit: { w: 36, h: 58, hp: 4, xp: 55, damage: 2, speed: .8, gold: 52 },
    skeleton: { w: 34, h: 55, hp: 4, xp: 58, damage: 2, speed: .72, gold: 48 },
    guard: { w: 40, h: 62, hp: 7, xp: 85, damage: 3, speed: .55, gold: 80 },
    boss: { w: 74, h: 90, hp: 32, xp: 500, damage: 5, speed: .5, gold: 700 }
  };

  const player = {
    x: 120, y: 370, w: 34, h: 68, vx: 0, vy: 0, grounded: false, face: 1,
    hp: 6, maxHp: 6, level: 1, xp: 0, xpNeed: 90, statPoints: 0,
    stats: { attack: 0, health: 0, defense: 0, magic: 0, speed: 0 },
    attackPower: 1, defense: 0, magicPower: 0, moveSpeed: 3.8, jump: 12.3,
    potions: 2, highPotions: 0, hastePotions: 0, memoryPotions: 0,
    haste: 0, owned: { rusty_sword: true, cloth: true },
    equipped: { weapon: "rusty_sword", armor: "cloth", accessory: null },
    fireSkill: false, kills: 0, questKills: 0, questClaimed: false, crystals: 0,
    blessingClaimed: false,
    invincible: 0, attackTimer: 0, attackCooldown: 0, attackSerial: 0, runFrame: 0
  };

  let state = "ready";
  let currentZone = "village";
  let platforms = [];
  let enemies = [];
  let crystals = [];
  let pickups = [];
  let waves = [];
  let particles = [];
  let floaters = [];
  let cameraX = 0;
  let gold = 200;
  let lastTime = 0;
  let soundOn = true;
  let audioContext = null;
  let panelType = null;
  let activeShop = null;
  let activeNpc = null;
  let pendingStats = null;
  let checkpoint = { zone: "village", x: 180 };
  let stageBanner = 170;
  let levelBanner = 0;
  let screenShake = 0;
  let interaction = null;
  let bossDefeated = false;
  let saveLoaded = false;

  function xpFor(level) {
    return Math.round(90 * Math.pow(1.34, level - 1));
  }

  function itemStat(item, key) {
    return item ? (CATALOG[item]?.[key] || 0) : 0;
  }

  function recalcStats(healOverflow = false) {
    const oldMax = player.maxHp;
    player.attackPower = 1 + player.stats.attack + itemStat(player.equipped.weapon, "attack");
    player.maxHp = 6 + player.stats.health * 2 + itemStat(player.equipped.armor, "hp");
    player.defense = player.stats.defense + itemStat(player.equipped.armor, "defense");
    player.magicPower = player.stats.magic * 2 + itemStat(player.equipped.accessory, "magic");
    player.moveSpeed = 3.8 + player.stats.speed * .08;
    player.jump = 12.3 + player.stats.speed * .035;
    if (healOverflow && player.maxHp > oldMax) player.hp += player.maxHp - oldMax;
    player.hp = clamp(player.hp, 0, player.maxHp);
    updateHud();
  }

  function attackInterval() {
    const statMultiplier = Math.max(.6, 1 - player.stats.speed * .03);
    const hasteMultiplier = player.haste > 0 ? .72 : 1;
    return 28 * statMultiplier * hasteMultiplier;
  }

  function makeEnemy([type, x, floor]) {
    const s = ENEMY_STATS[type];
    return { type, x, y: floor - s.h, floor, homeX: x, ...s, maxHp: s.hp,
      face: -1, dead: false, hurt: 0, lastAttackHit: -1, step: Math.random() * 100 };
  }

  function setupZone(zoneId, spawnX = null) {
    currentZone = zoneId;
    const zone = ZONES[zoneId];
    platforms = zone.platforms.map((p) => ({ ...p }));
    enemies = zone.enemies.map(makeEnemy);
    if (zoneId === "dungeon" && bossDefeated) {
      const boss = enemies.find((enemy) => enemy.type === "boss");
      if (boss) boss.dead = true;
    }
    crystals = zone.crystals.map(([x, y], i) => ({ x, y, collected: false, phase: i * .8 }));
    pickups = [];
    waves = [];
    player.x = spawnX ?? zone.spawn;
    player.y = 250;
    player.vx = 0;
    player.vy = 0;
    cameraX = clamp(player.x - W * .35, 0, Math.max(0, zone.width - W));
    stageBanner = 170;
    interaction = null;
  }

  function resetNewGame() {
    Object.assign(player, {
      hp: 6, maxHp: 6, level: 1, xp: 0, xpNeed: 90, statPoints: 0,
      stats: { attack: 0, health: 0, defense: 0, magic: 0, speed: 0 },
      potions: 2, highPotions: 0, hastePotions: 0, memoryPotions: 0,
      haste: 0, owned: { rusty_sword: true, cloth: true },
      equipped: { weapon: "rusty_sword", armor: "cloth", accessory: null },
      fireSkill: false, kills: 0, questKills: 0, questClaimed: false, crystals: 0,
      blessingClaimed: false,
      invincible: 0, attackTimer: 0, attackCooldown: 0, attackSerial: 0
    });
    gold = 200;
    checkpoint = { zone: "village", x: 180 };
    bossDefeated = false;
    recalcStats();
    setupZone("village", 120);
  }

  function saveGame() {
    const data = {
      level: player.level, xp: player.xp, statPoints: player.statPoints,
      stats: player.stats, hp: player.hp, potions: player.potions,
      highPotions: player.highPotions, hastePotions: player.hastePotions,
      memoryPotions: player.memoryPotions, owned: player.owned,
      equipped: player.equipped, fireSkill: player.fireSkill, kills: player.kills,
      questKills: player.questKills, questClaimed: player.questClaimed,
      blessingClaimed: player.blessingClaimed,
      crystals: player.crystals, gold, checkpoint, bossDefeated
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  }

  function loadGame() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const d = JSON.parse(raw);
      player.level = d.level || 1;
      player.xp = d.xp || 0;
      player.xpNeed = xpFor(player.level);
      player.statPoints = d.statPoints || 0;
      player.stats = { attack: 0, health: 0, defense: 0, magic: 0, speed: 0, ...(d.stats || {}) };
      player.potions = d.potions ?? 2;
      player.highPotions = d.highPotions || 0;
      player.hastePotions = d.hastePotions || 0;
      player.memoryPotions = d.memoryPotions || 0;
      player.owned = { rusty_sword: true, cloth: true, ...(d.owned || {}) };
      player.equipped = { weapon: "rusty_sword", armor: "cloth", accessory: null, ...(d.equipped || {}) };
      player.fireSkill = !!d.fireSkill;
      player.kills = d.kills || 0;
      player.questKills = d.questKills || 0;
      player.questClaimed = !!d.questClaimed;
      player.blessingClaimed = !!d.blessingClaimed;
      player.crystals = d.crystals || 0;
      gold = d.gold ?? 200;
      checkpoint = d.checkpoint || { zone: "village", x: 180 };
      bossDefeated = !!d.bossDefeated;
      recalcStats();
      player.hp = clamp(d.hp ?? player.maxHp, 1, player.maxHp);
      setupZone(checkpoint.zone, checkpoint.x);
      updateHud();
      return true;
    } catch (_) {
      return false;
    }
  }

  function updateHud() {
    hpText.textContent = `${Math.max(0, player.hp)} / ${player.maxHp}`;
    hpBar.style.width = `${clamp(player.hp / player.maxHp, 0, 1) * 100}%`;
    levelText.textContent = String(player.level);
    xpBar.style.width = `${clamp(player.xp / player.xpNeed, 0, 1) * 100}%`;
    atkText.textContent = String(player.attackPower);
    goldText.textContent = String(gold).padStart(4, "0");
  }

  function tone(freq, duration = .08, type = "square", volume = .03) {
    if (!soundOn) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      osc.connect(gain).connect(audioContext.destination);
      osc.start(); osc.stop(audioContext.currentTime + duration);
    } catch (_) {}
  }

  function burst(x, y, color, count = 10, speed = 3) {
    for (let i = 0; i < count; i++) particles.push({
      x, y, vx: (Math.random() - .5) * speed * 2,
      vy: (Math.random() - .9) * speed, life: 24 + Math.random() * 20,
      size: Math.random() > .55 ? 4 : 2, color
    });
  }

  function floater(text, x, y, color = "#ffe2a2") {
    floaters.push({ text, x, y, life: 70, color });
  }

  function addXp(amount, x = player.x, y = player.y) {
    player.xp += amount;
    floater(`+${amount} XP`, x, y - 8, "#f7d36f");
    while (player.xp >= player.xpNeed) {
      player.xp -= player.xpNeed;
      player.level++;
      player.statPoints += 3;
      player.xpNeed = xpFor(player.level);
      levelBanner = 180;
      burst(player.x + 17, player.y + 20, "#ffd56f", 28, 4);
      tone(523, .1); setTimeout(() => tone(659, .13), 80);
    }
    updateHud();
    saveGame();
  }

  function beginGame() {
    if (!saveLoaded) {
      saveLoaded = true;
      if (!loadGame()) resetNewGame();
    }
    state = "running";
    panel.hidden = true;
    overlay.classList.remove("show");
    canvas.focus();
    lastTime = performance.now();
    requestAnimationFrame(loop);
  }

  function die() {
    state = "dead";
    keys.clear();
    overlayTitle.textContent = "기사가 쓰러졌습니다";
    overlayCopy.textContent = "체크포인트에서 부활합니다. 보유 골드의 10%를 잃습니다.";
    startButton.textContent = "체크포인트에서 부활";
    startButton.hidden = false;
    overlay.classList.add("show");
    tone(130, .4, "sawtooth", .04);
  }

  function respawn() {
    gold = Math.floor(gold * .9);
    setupZone(checkpoint.zone, checkpoint.x);
    player.hp = player.maxHp;
    player.invincible = 90;
    state = "running";
    overlay.classList.remove("show");
    saveGame();
    lastTime = performance.now();
    canvas.focus();
    requestAnimationFrame(loop);
  }

  function winGame() {
    state = "won";
    overlayTitle.textContent = "EMBERFALL 정복!";
    overlayCopy.textContent = `던전의 군주를 쓰러뜨렸습니다. LV.${player.level} · ${gold} GOLD`;
    startButton.textContent = "마을로 귀환";
    startButton.hidden = false;
    overlay.classList.add("show");
    checkpoint = { zone: "village", x: 180 };
    saveGame();
  }

  function renderStats() {
    pendingStats ||= { ...player.stats };
    const invested = Object.keys(player.stats).reduce((sum, k) => sum + pendingStats[k] - player.stats[k], 0);
    const remaining = player.statPoints - invested;
    const rows = [
      ["attack", "공격력", "대검 물리 피해 증가"],
      ["health", "체력", "포인트당 최대 HP +2"],
      ["defense", "방어력", "받는 피해 감소"],
      ["magic", "마법력", "화염 검기 피해 증가"],
      ["speed", "공격속도", "공격 간격 감소 · 최대 40%"]
    ];
    panelKicker.textContent = `UNSPENT POINTS · ${remaining}`;
    panelTitle.textContent = "STATUS";
    panelBody.innerHTML = `
      <div class="game2-stat-summary">
        <span>LV.${player.level}</span><span>ATK ${player.attackPower}</span>
        <span>HP ${player.maxHp}</span><span>DEF ${player.defense}</span><span>MAG ${player.magicPower}</span>
      </div>
      <div class="game2-allocation">
        ${rows.map(([key, name, desc]) => `
          <div class="game2-allocation-row">
            <div><b>${name}</b><small>${desc}</small></div>
            <button data-stat-minus="${key}" ${pendingStats[key] <= player.stats[key] ? "disabled" : ""}>−</button>
            <strong>${pendingStats[key]}</strong>
            <button data-stat-plus="${key}" ${remaining <= 0 ? "disabled" : ""}>＋</button>
          </div>`).join("")}
      </div>
      <div class="game2-panel-actions">
        <button data-action="reset-pending">되돌리기</button>
        <button class="primary" data-action="apply-stats" ${invested <= 0 ? "disabled" : ""}>적용하기</button>
      </div>`;
  }

  function inventoryCounts() {
    return [
      ["potion", player.potions, "HP 3 회복"],
      ["high_potion", player.highPotions, "HP 8 회복"],
      ["haste_potion", player.hastePotions, "30초간 공격속도 증가"],
      ["memory_potion", player.memoryPotions, "투자 스탯 모두 회수"]
    ];
  }

  function renderInventory() {
    panelKicker.textContent = `GOLD · ${gold}`;
    panelTitle.textContent = "ITEM";
    const equipment = Object.keys(player.owned).filter((key) => player.owned[key] && ["weapon","armor","accessory"].includes(CATALOG[key]?.type));
    panelBody.innerHTML = `
      <div class="game2-inventory-section"><h3>EQUIPMENT</h3>
        ${equipment.map((key) => {
          const item = CATALOG[key];
          const equipped = Object.values(player.equipped).includes(key);
          return `<div class="game2-item-slot ${equipped ? "equipped" : ""}">
            <span class="game2-item-icon ${item.type}">${item.type === "weapon" ? "⚔" : item.type === "armor" ? "♜" : "✦"}</span>
            <div><b>${item.name}</b><small>${item.desc}</small></div>
            <button data-equip="${key}" ${equipped ? "disabled" : ""}>${equipped ? "장착 중" : "장착"}</button>
          </div>`;
        }).join("")}
      </div>
      <div class="game2-inventory-section"><h3>CONSUMABLE</h3>
        ${inventoryCounts().map(([key, count, desc]) => `<div class="game2-item-slot">
          <span class="game2-item-icon ${key}">${key === "memory_potion" ? "↺" : "♥"}</span>
          <div><b>${CATALOG[key].name}</b><small>${desc} · ${count}개</small></div>
          <button data-use="${key}" ${count <= 0 ? "disabled" : ""}>사용</button>
        </div>`).join("")}
      </div>
      ${player.fireSkill ? `<div class="game2-skill-owned">🔥 화염 검기 습득 완료 · 마법력 ${player.magicPower}</div>` : ""}`;
  }

  function renderShop() {
    const shop = SHOPS[activeShop];
    panelKicker.textContent = `${shop.owner} · ${gold} GOLD`;
    panelTitle.textContent = shop.title;
    panelBody.innerHTML = `<div class="game2-shop-list">${shop.items.map((key) => {
      const item = CATALOG[key];
      const owned = player.owned[key] || (key === "fire_scroll" && player.fireSkill);
      const levelLocked = player.level < (item.level || 1);
      const disabled = levelLocked || gold < item.price || (owned && !["consumable","reset"].includes(item.type));
      let comparison = "";
      if (item.type === "weapon") {
        const diff = (item.attack || 0) - itemStat(player.equipped.weapon, "attack");
        comparison = ` · 현재 대비 ATK ${diff >= 0 ? "+" : ""}${diff}`;
      } else if (item.type === "armor") {
        const defDiff = (item.defense || 0) - itemStat(player.equipped.armor, "defense");
        const hpDiff = (item.hp || 0) - itemStat(player.equipped.armor, "hp");
        comparison = ` · DEF ${defDiff >= 0 ? "+" : ""}${defDiff}${hpDiff ? ` · HP ${hpDiff >= 0 ? "+" : ""}${hpDiff}` : ""}`;
      } else if (item.type === "accessory") {
        const diff = (item.magic || 0) - itemStat(player.equipped.accessory, "magic");
        comparison = ` · 현재 대비 MAG ${diff >= 0 ? "+" : ""}${diff}`;
      }
      return `<div class="game2-shop-row">
        <span class="game2-shop-icon">${item.type === "weapon" ? "⚔" : item.type === "armor" ? "♜" : item.type === "skill" ? "🔥" : item.type === "accessory" ? "✦" : "♥"}</span>
        <div><b>${item.name}</b><small>${item.desc}${comparison}${item.level ? ` · LV.${item.level}` : ""}</small></div>
        <strong>${item.price}G</strong>
        <button data-buy="${key}" ${disabled ? "disabled" : ""}>${owned && !["consumable","reset"].includes(item.type) ? "보유" : levelLocked ? "레벨 부족" : "구매"}</button>
      </div>`;
    }).join("")}</div>`;
  }

  function npcDialogue(npc) {
    const lines = {
      inn: ["긴 여행이었군요. 침대와 따뜻한 수프를 준비했어요.", "무료로 회복하고 이곳을 귀환 지점으로 설정합니다."],
      elder: player.blessingClaimed
        ? ["성문 밖 왕도에 어둠이 번지고 있네.", "몬스터를 처치하며 성장한 뒤 폐허 던전의 군주를 쓰러뜨려 주게."]
        : ["왕도를 되찾을 기사에게 황혼의 축복을 내리겠네.", "축복을 받으면 레벨과 스탯 포인트를 얻을 수 있네."],
      guild: player.questClaimed
        ? ["이미 훌륭한 성과를 증명하셨습니다.", "던전에서 더 강한 적에 도전해 보세요."]
        : player.questKills >= 5
          ? ["의뢰를 완수했군요! 보상 400G와 경험치 120을 지급하겠습니다.", "보상 받기"]
          : ["길드 의뢰: 마을 밖 몬스터 5마리 처치.", `진행도 ${player.questKills} / 5`],
      guard: ["이 성문 너머는 몬스터가 배회하는 왕도입니다.", "필드 끝의 폐허 문을 통과하면 던전으로 들어갈 수 있습니다."]
    };
    panelKicker.textContent = npc.role;
    panelTitle.textContent = npc.name;
    panelBody.innerHTML = `<div class="game2-dialogue">
      <div class="game2-dialogue-portrait" style="--npc:${npc.color}">♟</div>
      <div>${lines[npc.id].map((line) => `<p>${line}</p>`).join("")}</div>
    </div>
    ${npc.id === "guild" && player.questKills >= 5 && !player.questClaimed ? `<button class="game2-dialogue-action" data-action="claim-quest">보상 받기</button>` : ""}
    ${npc.id === "elder" && !player.blessingClaimed ? `<button class="game2-dialogue-action" data-action="elder-blessing">황혼의 축복 받기</button>` : ""}
    ${npc.id === "inn" ? `<button class="game2-dialogue-action" data-action="rest">쉬어가기</button>` : ""}`;
  }

  function openPanel(type, payload = null) {
    if (!["running", "panel"].includes(state)) return;
    if (state === "panel" && panelType === type && !payload) return closePanel();
    state = "panel"; keys.clear(); panelType = type; panel.hidden = false;
    if (type === "stats") { pendingStats = { ...player.stats }; renderStats(); }
    if (type === "inventory") renderInventory();
    if (type === "shop") { activeShop = payload; renderShop(); }
    if (type === "dialogue") { activeNpc = payload; npcDialogue(payload); }
  }

  function closePanel() {
    if (state !== "panel") return;
    panel.hidden = true; panelType = null; activeShop = null; activeNpc = null; pendingStats = null;
    state = "running"; lastTime = performance.now(); canvas.focus(); requestAnimationFrame(loop);
  }

  function buyItem(key) {
    const item = CATALOG[key];
    if (!item || gold < item.price || player.level < (item.level || 1)) return;
    gold -= item.price;
    if (key === "potion") player.potions++;
    else if (key === "high_potion") player.highPotions++;
    else if (key === "haste_potion") player.hastePotions++;
    else if (key === "memory_potion") player.memoryPotions++;
    else if (key === "fire_scroll") player.fireSkill = true;
    else player.owned[key] = true;
    tone(620, .08); saveGame(); updateHud(); renderShop();
  }

  function equipItem(key) {
    const item = CATALOG[key];
    if (!player.owned[key] || !item) return;
    player.equipped[item.type] = key;
    recalcStats(true); saveGame(); renderInventory(); tone(320, .08);
  }

  function useItem(key) {
    if (key === "potion") {
      if (player.potions <= 0 || player.hp >= player.maxHp) return;
      player.potions--; player.hp = Math.min(player.maxHp, player.hp + 3);
      floater("+3 HP", player.x, player.y - 8, "#ff96a7");
    } else if (key === "high_potion") {
      if (player.highPotions <= 0 || player.hp >= player.maxHp) return;
      player.highPotions--; player.hp = Math.min(player.maxHp, player.hp + 8);
      floater("+8 HP", player.x, player.y - 8, "#ff96a7");
    } else if (key === "haste_potion") {
      if (player.hastePotions <= 0) return;
      player.hastePotions--; player.haste = 1800;
      floater("신속 활성화!", player.x, player.y - 8, "#8ce7ff");
    } else if (key === "memory_potion") {
      if (player.memoryPotions <= 0) return;
      const refund = Object.values(player.stats).reduce((a, b) => a + b, 0);
      player.memoryPotions--; player.statPoints += refund;
      player.stats = { attack: 0, health: 0, defense: 0, magic: 0, speed: 0 };
      recalcStats(); floater(`스탯 ${refund} 회수`, player.x, player.y - 8, "#d9b3ff");
    }
    burst(player.x + 17, player.y + 22, "#ff7188", 16, 3);
    updateHud(); saveGame(); if (panelType === "inventory") renderInventory();
  }

  function handlePanelAction(target) {
    const buy = target.closest("[data-buy]"); if (buy) return buyItem(buy.dataset.buy);
    const equip = target.closest("[data-equip]"); if (equip) return equipItem(equip.dataset.equip);
    const use = target.closest("[data-use]"); if (use) return useItem(use.dataset.use);
    const plus = target.closest("[data-stat-plus]");
    if (plus) { pendingStats[plus.dataset.statPlus]++; renderStats(); return; }
    const minus = target.closest("[data-stat-minus]");
    if (minus) { pendingStats[minus.dataset.statMinus]--; renderStats(); return; }
    const action = target.closest("[data-action]")?.dataset.action;
    if (action === "reset-pending") { pendingStats = { ...player.stats }; renderStats(); }
    if (action === "apply-stats") {
      const spent = Object.keys(player.stats).reduce((sum, k) => sum + pendingStats[k] - player.stats[k], 0);
      if (spent > 0 && spent <= player.statPoints) {
        player.statPoints -= spent; player.stats = { ...pendingStats }; recalcStats(true); saveGame(); renderStats();
      }
    }
    if (action === "claim-quest" && player.questKills >= 5 && !player.questClaimed) {
      player.questClaimed = true; gold += 400; addXp(120); npcDialogue(activeNpc); saveGame();
    }
    if (action === "elder-blessing" && !player.blessingClaimed) {
      player.blessingClaimed = true; addXp(90); npcDialogue(activeNpc); saveGame();
    }
    if (action === "rest") {
      player.hp = player.maxHp; checkpoint = { zone: "village", x: 180 };
      updateHud(); saveGame(); npcDialogue(activeNpc); tone(480, .12);
    }
  }

  function transitionZone(target, spawn) {
    state = "transition"; keys.clear();
    let alpha = 0;
    const fade = () => {
      draw(); ctx.fillStyle = `rgba(20,18,30,${alpha})`; ctx.fillRect(0,0,W,H);
      alpha += .08;
      if (alpha < 1) return requestAnimationFrame(fade);
      setupZone(target, spawn); saveGame(); state = "running"; lastTime = performance.now(); requestAnimationFrame(loop);
    };
    requestAnimationFrame(fade);
  }

  function findInteraction() {
    const zone = ZONES[currentZone];
    let best = null;
    const consider = (obj, x, label, kind) => {
      const distance = Math.abs((player.x + player.w / 2) - x);
      if (distance < 72 && (!best || distance < best.distance)) best = { obj, x, label, kind, distance };
    };
    for (const npc of zone.npcs) consider(npc, npc.x, `${npc.name} · ${npc.role}`, "npc");
    for (const exit of zone.exits) consider(exit, exit.x, exit.label, "exit");
    if (zone.checkpoint) consider(zone.checkpoint, zone.checkpoint.x, zone.checkpoint.label, "checkpoint");
    if (currentZone === "dungeon" && bossDefeated) consider({ win: true }, 3150, "승리의 포탈에 들어가기", "win");
    interaction = best;
  }

  function interact() {
    if (state !== "running" || !interaction) return;
    const { kind, obj } = interaction;
    if (kind === "npc") {
      if (obj.shop) openPanel("shop", obj.shop);
      else openPanel("dialogue", obj);
    } else if (kind === "exit") transitionZone(obj.target, obj.spawn);
    else if (kind === "checkpoint") {
      checkpoint = { zone: currentZone, x: obj.x };
      player.hp = player.maxHp; updateHud(); saveGame();
      floater("체크포인트 저장", player.x, player.y - 12, "#ffd27b"); tone(520, .12);
    } else if (kind === "win") winGame();
  }

  function startAttack() {
    if (player.attackCooldown > 0 || player.attackTimer > 0) return;
    player.attackTimer = 20; player.attackCooldown = attackInterval(); player.attackSerial++;
    if (player.fireSkill && player.magicPower > 0) waves.push({
      x: player.x + (player.face > 0 ? 35 : -18), y: player.y + 20,
      vx: player.face * 7, face: player.face, life: 75,
      damage: Math.max(1, Math.round(player.magicPower * .75)), hit: new Set()
    });
    tone(105, .09, "sawtooth", .025);
  }

  function updatePlayer(dt) {
    const target = (Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"))) * player.moveSpeed;
    player.vx += (target - player.vx) * Math.min(1, .28 * dt);
    if (!keys.has("ArrowLeft") && !keys.has("ArrowRight") && Math.abs(player.vx) < .08) player.vx = 0;
    if (Math.abs(player.vx) > .2) player.face = player.vx > 0 ? 1 : -1;
    if ((keys.has("Space") || keys.has("ArrowUp")) && player.grounded) {
      player.vy = -player.jump; player.grounded = false; keys.delete("Space"); keys.delete("ArrowUp"); tone(230,.07);
    }
    if (keys.has("KeyA")) startAttack();
    player.vy += .58 * dt;
    player.x = clamp(player.x + player.vx * dt, 0, ZONES[currentZone].width - player.w);
    const oldBottom = player.y + player.h;
    player.y += player.vy * dt; player.grounded = false;
    for (const p of platforms) {
      const bottom = player.y + player.h;
      if (player.x + player.w > p.x + 2 && player.x < p.x + p.w - 2 &&
          oldBottom <= p.y + 5 && bottom >= p.y && player.vy >= 0) {
        player.y = p.y - player.h; player.vy = 0; player.grounded = true;
      }
    }
    player.invincible = Math.max(0, player.invincible - dt);
    player.attackTimer = Math.max(0, player.attackTimer - dt);
    player.attackCooldown = Math.max(0, player.attackCooldown - dt);
    player.haste = Math.max(0, player.haste - dt);
    player.runFrame += Math.abs(player.vx) * .12 * dt;
    if (player.y > H + 120) { player.hp = 0; updateHud(); die(); }
  }

  function attackBox() {
    const range = 66 + itemStat(player.equipped.weapon, "attack") * 2;
    return { x: player.face > 0 ? player.x + player.w - 3 : player.x - range + 3,
      y: player.y - 4, w: range, h: player.h + 10 };
  }

  function hurtPlayer(enemy) {
    if (player.invincible > 0) return;
    const damage = Math.max(1, Math.ceil(enemy.damage * 100 / (100 + player.defense * 12)));
    player.hp -= damage; player.invincible = 80; player.vx = player.x < enemy.x ? -6 : 6; player.vy = -7;
    screenShake = 8; burst(player.x+17,player.y+24,"#ff7187",12,3); floater(`-${damage} HP`,player.x,player.y,"#ff91a1");
    updateHud(); tone(120,.17,"sawtooth",.04); if (player.hp <= 0) die();
  }

  function killEnemy(enemy) {
    enemy.dead = true; player.kills++; if (currentZone !== "village") player.questKills++;
    gold += enemy.gold; floater(`+${enemy.gold}G`,enemy.x,enemy.y-15,"#ffd06a");
    burst(enemy.x+enemy.w/2,enemy.y+enemy.h/2,"#d59cff",18,4);
    if (enemy.type === "boss") {
      bossDefeated = true; gold += 500; floater("던전 군주 격파!", enemy.x, enemy.y-30, "#ffe08a");
    } else if (enemy.type === "guard" || Math.random() < .38) {
      pickups.push({ type:"potion",x:enemy.x+enemy.w/2,y:enemy.floor-18,phase:0,collected:false });
    }
    addXp(enemy.xp,enemy.x,enemy.y); saveGame();
  }

  function updateEnemies(dt) {
    const active = player.attackTimer <= 15 && player.attackTimer >= 6;
    const box = active ? attackBox() : null;
    for (const enemy of enemies) {
      if (enemy.dead) continue;
      enemy.hurt = Math.max(0,enemy.hurt-dt); enemy.step += dt;
      const distance = player.x - enemy.x;
      const chase = Math.abs(distance) < (enemy.type === "boss" ? 430 : 250);
      const dir = chase ? Math.sign(distance) : Math.sin(enemy.step*.025);
      enemy.face = dir >= 0 ? 1 : -1; enemy.x += dir*enemy.speed*dt;
      enemy.x = clamp(enemy.x,enemy.homeX-(enemy.type==="boss"?180:100),enemy.homeX+(enemy.type==="boss"?180:100));
      const body = {x:enemy.x,y:enemy.y,w:enemy.w,h:enemy.h};
      if (box && enemy.lastAttackHit !== player.attackSerial && overlap(box,body)) {
        enemy.lastAttackHit=player.attackSerial; enemy.hp-=player.attackPower; enemy.hurt=10; enemy.x+=player.face*18;
        screenShake=enemy.type==="boss"?9:5; burst(enemy.x+enemy.w/2,enemy.y+enemy.h/2,"#ffe493",10,3);
        floater(String(player.attackPower),enemy.x,enemy.y-4); tone(175,.07);
        if(enemy.hp<=0) killEnemy(enemy);
      } else if(overlap(player,body)) hurtPlayer(enemy);
    }
  }

  function updateItems(dt) {
    for(const c of crystals) {
      if(c.collected) continue; c.phase += .04*dt;
      if(overlap(player,{x:c.x-12,y:c.y-16,w:24,h:32})) {
        c.collected=true; player.crystals++; gold+=20; burst(c.x,c.y,"#ffca67",10,3); addXp(7,c.x,c.y);
      }
    }
    for(const p of pickups) {
      if(p.collected) continue; p.phase += .05*dt;
      if(overlap(player,{x:p.x-13,y:p.y-18,w:26,h:30})) {
        p.collected=true; player.potions++; floater("회복 물약 +1",p.x,p.y-8,"#ff9cac"); burst(p.x,p.y,"#ff7188",12,3); saveGame();
      }
    }
    for(const wave of waves) {
      wave.x += wave.vx*dt; wave.life-=dt;
      for(const enemy of enemies) {
        if(enemy.dead||wave.hit.has(enemy)) continue;
        if(overlap({x:wave.x-20,y:wave.y-15,w:40,h:30},{x:enemy.x,y:enemy.y,w:enemy.w,h:enemy.h})) {
          wave.hit.add(enemy); enemy.hp-=wave.damage; enemy.hurt=10; burst(enemy.x,enemy.y+20,"#ff884f",8,3);
          floater(`${wave.damage} MAG`,enemy.x,enemy.y-8,"#ffb073"); if(enemy.hp<=0) killEnemy(enemy);
        }
      }
    }
    waves = waves.filter(w=>w.life>0);
  }

  function updateEffects(dt) {
    particles=particles.filter(p=>{p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.13*dt;return p.life>0;});
    floaters=floaters.filter(f=>{f.life-=dt;f.y-=.45*dt;return f.life>0;});
    stageBanner=Math.max(0,stageBanner-dt);levelBanner=Math.max(0,levelBanner-dt);screenShake=Math.max(0,screenShake-dt);
  }

  function update(dt) {
    updatePlayer(dt); if(state!=="running")return;
    updateEnemies(dt); if(state!=="running")return;
    updateItems(dt); updateEffects(dt); findInteraction();
    const zoneCheckpoint = ZONES[currentZone].checkpoint;
    if (zoneCheckpoint && Math.abs(player.x - zoneCheckpoint.x) < 42 &&
        (checkpoint.zone !== currentZone || checkpoint.x !== zoneCheckpoint.x)) {
      checkpoint = { zone: currentZone, x: zoneCheckpoint.x };
      player.hp = player.maxHp;
      floater("체크포인트 저장", player.x, player.y - 12, "#ffd27b");
      updateHud(); saveGame(); tone(520, .12);
    }
    const target=clamp(player.x-W*.36,0,Math.max(0,ZONES[currentZone].width-W));
    cameraX+=(target-cameraX)*Math.min(1,.08*dt); updateHud();
  }

  function px(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}

  function drawSky() {
    if(currentZone==="dungeon"){px(0,0,W,H,"#171928");px(0,250,W,290,"#202332");return;}
    const bands=[["#29274f",0,90],["#50365f",90,75],["#914d68",165,82],["#d17668",247,90],["#efaa72",337,111],["#e8b978",448,92]];
    bands.forEach(([c,y,h])=>px(0,y,W,h,c));
    const sx=760-cameraX*.018;px(sx-31,132,62,62,"#f8ce7b");px(sx-39,140,78,46,"#f8ce7b");px(sx-23,124,46,78,"#f8ce7b");
    [[90,58],[180,104],[314,48],[455,116],[555,64],[684,38],[850,91],[926,44]].forEach(([x,y])=>px(x,y,2,2,"#f8dfbf"));
  }

  function drawBackground() {
    drawSky();
    if(currentZone==="dungeon"){
      for(let x=-(cameraX*.12)%180-180;x<W+180;x+=180){px(x,90,110,350,"#222738");px(x+18,125,16,260,"#171c2b");px(x+75,155,12,230,"#171c2b");}
      return;
    }
    const off=-(cameraX*.1)%300;
    for(let x=off-300;x<W+300;x+=300){ctx.fillStyle="#4e485f";ctx.beginPath();ctx.moveTo(x,430);ctx.lineTo(x+100,285);ctx.lineTo(x+160,360);ctx.lineTo(x+225,250);ctx.lineTo(x+300,430);ctx.fill();}
    const trees=-(cameraX*.2)%130;
    for(let x=trees-130;x<W+130;x+=130){px(x+56,343,12,96,"#293c49");ctx.fillStyle="#304a50";ctx.beginPath();ctx.moveTo(x,420);ctx.lineTo(x+62,280);ctx.lineTo(x+124,420);ctx.fill();}
  }

  function drawPlatform(p){
    const top=p.kind==="wood"?"#95623c":p.kind==="grass"?"#52744b":"#77727c";
    const side=p.kind==="grass"?"#443b38":p.kind==="village"?"#51433e":"#42434f";
    px(p.x,p.y,p.w,p.h,side);px(p.x,p.y,p.w,10,top);px(p.x,p.y+10,p.w,4,"#292d37");
    if(p.kind==="wood"){for(let x=p.x+10;x<p.x+p.w;x+=30)px(x,p.y+2,3,12,"#c68c53");}
    else for(let y=p.y+20;y<p.y+p.h;y+=22)for(let x=p.x+((y/22)%2)*20;x<p.x+p.w;x+=42){px(x,y,36,3,"#5c5353");px(x+36,y,3,18,"#5c5353");}
  }

  function drawHouse(x,floor,color="#8a624f"){
    px(x,floor-92,120,92,color);px(x+46,floor-45,28,45,"#3b3031");
    ctx.fillStyle="#4b3b48";ctx.beginPath();ctx.moveTo(x-15,floor-88);ctx.lineTo(x+60,floor-143);ctx.lineTo(x+135,floor-88);ctx.fill();
    px(x-6,floor-92,132,10,"#302d39");for(const wx of [18,88]){px(x+wx,floor-65,20,22,"#e9a95a");px(x+wx+3,floor-62,6,17,"#ffdf84");}
  }

  function drawTorch(x,y){ctx.save();ctx.globalAlpha=.16;ctx.fillStyle="#ffae4a";ctx.beginPath();ctx.arc(x,y-10,30,0,Math.PI*2);ctx.fill();ctx.restore();px(x-3,y,6,25,"#3a2b2b");px(x-5,y-13,10,13,"#ff843d");px(x-2,y-18,4,13,"#ffe07a");}

  function drawGate(x,floor,label){
    px(x-50,floor-170,30,170,"#514d59");px(x+50,floor-170,30,170,"#514d59");px(x-65,floor-184,160,28,"#625b66");
    for(let i=0;i<4;i++)px(x-61+i*42,floor-198,22,18,"#625b66");
    px(x-18,floor-136,38,136,"#2c2b38");px(x-10,floor-128,22,128,"#3a3140");px(x-3,floor-90,6,90,"#c98555");
    ctx.fillStyle="#e0b578";ctx.font="bold 10px monospace";ctx.textAlign="center";ctx.fillText(label,x,floor-207);
  }

  function drawVillageDecor(){
    [[100,"#8d6651"],[420,"#815969"],[750,"#8c6c52"],[1280,"#7f594c"],[1580,"#6c5b7e"],[1850,"#605364"]].forEach(([x,c])=>drawHouse(x,438,c));
    [220,510,920,1200,1510,1810,2070].forEach(x=>drawTorch(x,408));
    drawGate(2225,438,"AMBERWILD");
    px(1040,358,160,80,"#4b3c3c");px(1050,368,140,10,"#71524a");px(1070,385,100,8,"#c6a061");
  }

  function drawFieldDecor(){
    drawHouse(1450,438,"#79564d");[190,690,890,1280,1480,2050,2220,2580,2810,3380].forEach(x=>drawTorch(x,408));
    drawGate(60,438,"DUSKVALE");drawGate(3570,438,"CATACOMBS");
    px(1730,405,60,14,"#6e4b35");px(1755,382,8,24,"#e79b49");px(1758,375,4,14,"#ffe37a");
  }

  function drawDungeonDecor(){
    [120,560,780,1160,1320,1600,1880,2050,2440,2670,3130].forEach(x=>drawTorch(x,408));
    drawGate(55,438,"AMBERWILD");px(1410,400,80,38,"#52516a");px(1430,370,40,30,"#766d8b");px(1446,350,8,24,"#b7a1e6");
    if(bossDefeated){ctx.save();ctx.globalAlpha=.28;px(3110,285,70,153,"#f2b45e");ctx.globalAlpha=.85;px(3120,300,50,138,"#ffe49a");ctx.restore();}
  }

  function drawNpc(npc){
    const x=npc.x,y=378;px(x-10,y+22,22,38,npc.color);px(x-8,y+3,18,20,"#deb18d");px(x-11,y,24,8,"#3e3947");px(x-7,y+58,8,3,"#2b2d3b");px(x+5,y+58,8,3,"#2b2d3b");
    ctx.textAlign="center";ctx.font="bold 10px monospace";ctx.fillStyle="#ffe0a4";ctx.fillText(npc.name,x+1,y-9);ctx.font="8px monospace";ctx.fillStyle="#bcaeb8";ctx.fillText(npc.role,x+1,y-20);
  }

  function drawCrystal(c){if(c.collected)return;const y=c.y+Math.round(Math.sin(c.phase)*3);px(c.x-4,y-14,8,28,"#f39b49");px(c.x-10,y-7,20,14,"#ffbf55");px(c.x-3,y-10,6,16,"#ffe89a");}
  function drawPickup(p){if(p.collected)return;const y=p.y+Math.round(Math.sin(p.phase)*3);px(p.x-8,y-10,16,18,"#7c3049");px(p.x-10,y-6,20,12,"#d84f68");px(p.x-4,y-14,8,5,"#ead6c4");}

  function drawEnemy(e){
    if(e.dead)return;const x=Math.round(e.x),y=Math.round(e.y);const flash=e.hurt>0?"#fff1d0":null;
    if(e.type==="slime"){px(x+4,y+7,34,20,flash||"#8261a8");px(x,y+17,42,13,flash||"#8261a8");px(x+10,y+16,5,6,"#251f39");px(x+28,y+16,5,6,"#251f39");}
    else if(e.type==="wolf"){px(x+7,y+12,34,19,flash||"#596274");px(x+33,y+7,14,17,flash||"#596274");px(x+36,y+2,5,8,"#3d4352");px(x+43,y+3,4,8,"#3d4352");px(x+42,y+13,3,3,"#f1b06e");px(x+6,y+28,7,6,"#3c4250");px(x+31,y+28,7,6,"#3c4250");}
    else if(e.type==="boss"){px(x+15,y+8,44,70,flash||"#6b4b61");px(x+8,y+24,58,36,flash||"#6b4b61");px(x+20,y,34,24,"#353344");px(x+23,y+10,7,6,"#ff694f");px(x+44,y+10,7,6,"#ff694f");px(x+2,y+38,12,44,"#393746");px(x+61,y+38,12,44,"#393746");}
    else{const metal=e.type==="guard"?(flash||"#74798c"):(flash||"#b9b1a2");px(x+8,y+3,e.w-16,18,metal);px(x+5,y+10,e.w-10,10,metal);px(x+8,y+21,e.w-16,e.h-31,e.type==="bandit"?"#6f4145":e.type==="guard"?"#55586b":"#77706e");px(x+10,y+e.h-10,7,10,"#30313e");px(x+e.w-17,y+e.h-10,7,10,"#30313e");px(x+12,y+11,4,4,"#ef7b5c");px(x+e.w-16,y+11,4,4,"#ef7b5c");}
    if(e.hurt>0||e.hp<e.maxHp){px(x,y-10,e.w,4,"#252533");px(x+1,y-9,(e.w-2)*(e.hp/e.maxHp),2,e.type==="boss"?"#f0a458":"#dc626e");}
  }

  function swordAngle(){const p=clamp(1-player.attackTimer/20,0,1);return-1.65+(1-Math.pow(1-p,2.4))*2.35;}
  function drawSword(x,y,face,attack){
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(face,1);
    if(attack){const a=swordAngle();if(player.attackTimer<=16&&player.attackTimer>=5){ctx.save();ctx.globalAlpha=.3;ctx.strokeStyle="#ffe19a";ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,0,58,-1.5,a);ctx.stroke();ctx.restore();}ctx.rotate(a);}
    else ctx.rotate(-1.78);
    px(-16,-3,20,7,"#694333");px(3,-9,7,19,"#d6a850");px(8,-6,50,13,"#9ba8b5");px(13,-4,42,8,"#d3dde0");px(20,-3,34,3,"#f3ead3");px(58,-6,10,13,"#e4e9df");px(66,-3,8,7,"#f5f0d8");ctx.restore();
  }

  function drawPlayer(){
    if(player.invincible>0&&Math.floor(player.invincible/5)%2===0)return;const x=Math.round(player.x),y=Math.round(player.y),attack=player.attackTimer>0;
    if(!attack)drawSword(x+(player.face>0?7:27),y+35,player.face,false);
    px(x+(player.face>0?2:20),y+29,13,30,"#7a3146");px(x+7,y+23,22,34,"#46516c");px(x+9,y+7,21,18,"#dfaa82");px(x+6,y+2,27,12,"#3a4057");px(x+8,y-2,23,7,"#566078");
    px(x+(player.face>0?23:11),y+12,5,4,"#f5d29b");px(x+12,y+34,14,4,"#d3a74f");const step=Math.abs(player.vx)>.5&&player.grounded&&Math.sin(player.runFrame)>0?4:-4;px(x+9+step,y+56,8,12,"#242b3d");px(x+22-step,y+56,8,12,"#242b3d");
    if(attack){px(x+(player.face>0?24:3),y+31,10,7,"#30394f");px(x+(player.face>0?29:1),y+34,7,6,"#d7a47c");drawSword(x+(player.face>0?32:2),y+37,player.face,true);}
  }

  function drawEffects(){
    for(const w of waves){ctx.save();ctx.globalAlpha=clamp(w.life/18,0,1);px(w.x-18,w.y-14,36,28,"#d84b36");px(w.x-10,w.y-10,25,20,"#ff8b45");px(w.x-2,w.y-7,14,14,"#ffe078");ctx.restore();}
    for(const p of particles){ctx.save();ctx.globalAlpha=clamp(p.life/18,0,1);px(p.x,p.y,p.size,p.size,p.color);ctx.restore();}
    ctx.font="bold 11px monospace";ctx.textAlign="center";for(const f of floaters){ctx.save();ctx.globalAlpha=clamp(f.life/28,0,1);ctx.fillStyle="#272333";ctx.fillText(f.text,f.x+1,f.y+1);ctx.fillStyle=f.color;ctx.fillText(f.text,f.x,f.y);ctx.restore();}
  }

  function drawBanners(){
    if(stageBanner>0){const a=clamp(Math.min(stageBanner/25,(170-stageBanner)/25),0,1);ctx.save();ctx.globalAlpha=a;px(W/2-170,68,340,60,"rgba(35,30,49,.86)");ctx.fillStyle="#ffe0a2";ctx.textAlign="center";ctx.font="bold 19px monospace";ctx.fillText(ZONES[currentZone].name,W/2,95);ctx.fillStyle="#d7a77d";ctx.font="10px monospace";ctx.fillText(ZONES[currentZone].subtitle,W/2,113);ctx.restore();}
    if(levelBanner>0){const a=clamp(levelBanner/30,0,1);ctx.save();ctx.globalAlpha=a;px(W/2-145,145,290,56,"#443447");ctx.strokeStyle="#f0b96f";ctx.strokeRect(W/2-141,149,282,48);ctx.fillStyle="#ffe09b";ctx.textAlign="center";ctx.font="bold 18px monospace";ctx.fillText(`LEVEL UP · LV.${player.level}`,W/2,170);ctx.font="10px monospace";ctx.fillText("STAT POINT +3 · C 키로 투자",W/2,188);ctx.restore();}
    if(interaction&&state==="running"){px(W/2-145,H-58,290,34,"rgba(31,29,43,.9)");ctx.fillStyle="#ffe0a0";ctx.textAlign="center";ctx.font="bold 11px monospace";ctx.fillText(`[ E ] ${interaction.label}`,W/2,H-37);}
  }

  function draw(){
    ctx.clearRect(0,0,W,H);drawBackground();const sx=screenShake>0?(Math.random()-.5)*screenShake:0;
    ctx.save();ctx.translate(Math.round(-cameraX+sx),0);for(const p of platforms)drawPlatform(p);
    if(currentZone==="village")drawVillageDecor();else if(currentZone==="field")drawFieldDecor();else drawDungeonDecor();
    ZONES[currentZone].npcs.forEach(drawNpc);crystals.forEach(drawCrystal);pickups.forEach(drawPickup);enemies.forEach(drawEnemy);drawPlayer();drawEffects();ctx.restore();drawBanners();
  }

  function loop(time){
    if(state!=="running"){draw();return;}const dt=clamp((time-lastTime)/16.667||1,.4,2);lastTime=time;update(dt);draw();if(state==="running")requestAnimationFrame(loop);
  }

  addEventListener("keydown",(event)=>{
    if(["ArrowLeft","ArrowRight","ArrowUp","Space","KeyA","KeyE","KeyC","KeyI","KeyH","Escape"].includes(event.code))event.preventDefault();
    if(event.repeat&&["KeyE","KeyC","KeyI","KeyH","Escape"].includes(event.code))return;
    if(state==="running"&&!event.repeat&&event.code==="ArrowLeft")player.x=Math.max(0,player.x-4);
    if(state==="running"&&!event.repeat&&event.code==="ArrowRight")player.x=Math.min(ZONES[currentZone].width-player.w,player.x+4);
    if(state==="running"&&event.code==="KeyA")startAttack();
    if(state==="running"&&(event.code==="Space"||event.code==="ArrowUp")&&player.grounded){
      player.vy=-player.jump;player.grounded=false;tone(230,.07);
    }
    if(event.code==="KeyC")return openPanel("stats");
    if(event.code==="KeyI")return openPanel("inventory");
    if(event.code==="KeyH")return useItem(player.potions>0?"potion":"high_potion");
    if(event.code==="KeyE")return interact();
    if(event.code==="Escape"&&state==="panel")return closePanel();
    keys.add(event.code);
    if(event.code==="Enter"&&state==="ready")beginGame();
  });
  addEventListener("keyup",(event)=>keys.delete(event.code));
  addEventListener("blur",()=>keys.clear());

  startButton.addEventListener("click",()=>{
    if(state==="dead")respawn();
    else if(state==="won"){setupZone("village",180);state="running";overlay.classList.remove("show");lastTime=performance.now();requestAnimationFrame(loop);}
    else beginGame();
  });
  statsButton.addEventListener("click",()=>openPanel("stats"));
  inventoryButton.addEventListener("click",()=>openPanel("inventory"));
  panelClose.addEventListener("click",closePanel);
  panelBody.addEventListener("click",(event)=>handlePanelAction(event.target));
  soundButton.addEventListener("click",()=>{soundOn=!soundOn;soundButton.querySelector("i").className=soundOn?"fa-solid fa-volume-high":"fa-solid fa-volume-xmark";if(soundOn)tone(520,.06);});

  document.querySelectorAll(".game2-touch button").forEach((button)=>{
    const code={left:"ArrowLeft",right:"ArrowRight",jump:"Space",attack:"KeyA",potion:"KeyH",interact:"KeyE"}[button.dataset.key];
    button.addEventListener("pointerdown",(event)=>{event.preventDefault();if(code==="KeyH")useItem(player.potions>0?"potion":"high_potion");else if(code==="KeyE")interact();else keys.add(code);});
    ["pointerup","pointercancel","pointerleave"].forEach((name)=>button.addEventListener(name,()=>keys.delete(code)));
  });

  resetNewGame();
  const hasSave = !!localStorage.getItem(SAVE_KEY);
  if(hasSave){overlayTitle.textContent="Emberfall로 돌아가기";overlayCopy.textContent="저장된 기사와 장비, 스탯, 체크포인트에서 모험을 계속합니다.";startButton.textContent="모험 계속하기";}
  upgradesEl.hidden=true;updateHud();draw();
})();
