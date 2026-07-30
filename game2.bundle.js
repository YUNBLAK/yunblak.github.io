/* AUTO-GENERATED — edit game2/ modules and run: node game2/build-game2.mjs */

(function () {

  "use strict";

  // ── config/items.js ──
const ITEMS = {
  rusty_sword: { name: "낡은 장검", type: "weapon", attack: 0, price: 0, desc: "손에 익은 오래된 한손 장검" },
  iron_sword: { name: "철제 장검", type: "weapon", attack: 2, price: 250, level: 1, desc: "공격력 +2 · 안정적인 연속 베기" },
  knight_sword: { name: "기사단 장검", type: "weapon", attack: 5, price: 650, level: 4, desc: "공격력 +5 · 콤보 마무리 강화", combo: .15 },
  cursed_sword: { name: "피의 장검", type: "weapon", attack: 8, karma: 40, price: 1200, level: 6, desc: "공격력 +8 · 처치 시 소량 회복", lifeOnKill: 1 },
  twilight_sword: { name: "황혼검", type: "weapon", attack: 6, price: 0, rare: true, desc: "노을에 공격력 +25%", phase: "sunset" },
  wraith_sword: { name: "망령검", type: "weapon", attack: 7, price: 0, rare: true, desc: "밤에 마법 피해 +30%", phase: "night" },
  royal_sword: { name: "왕실 장검", type: "weapon", attack: 7, price: 0, rare: true, desc: "3연타 마무리 피해 +35%", combo: .35 },
  royal_insignia: { name: "추적대의 왕실 인장", type: "accessory", magic: 6, price: 0, rare: true, desc: "왕실 심판대를 물리친 증표 · 마법력 +6" },
  moonblade: { name:"월광 장검",type:"weapon",attack:9,price:1450,level:7,rare:true,phase:"night",desc:"공격력 +9 · 밤에 달빛이 검날을 강화" },
  sunblade: { name:"태양 장검",type:"weapon",attack:10,price:1750,level:9,rare:true,phase:"day",desc:"공격력 +10 · 낮에 태양의 열기를 머금음" },
  moon_charm: { name:"월석 부적",type:"accessory",magic:8,price:920,level:6,desc:"마법력 +8 · Moonbriar의 수호 부적" },
  sun_armor: { name:"태양 비늘 갑옷",type:"armor",defense:9,hp:5,price:1650,level:8,desc:"방어력 +9 · 최대 HP +5" },
  cloth: { name: "여행자의 외투", type: "armor", defense: 0, hp: 0, price: 0, desc: "가벼운 여행용 외투" },
  chain_armor: { name: "사슬 갑옷", type: "armor", defense: 3, hp: 0, price: 300, level: 2, desc: "방어력 +3" },
  dusk_armor: { name: "황혼 갑옷", type: "armor", defense: 7, hp: 3, price: 800, level: 6, desc: "방어력 +7 · 최대 HP +3" },
  magic_ring: { name: "마력 반지", type: "accessory", magic: 4, price: 350, level: 2, desc: "마법력 +4" },
  potion: { name: "붉은 회복 물약", type: "consumable", price: 35, heal: 3, desc: "HP 3 회복" },
  high_potion: { name: "상급 회복 물약", type: "consumable", price: 90, level: 3, heal: 8, desc: "HP 8 회복" },
  mana_potion: { name: "푸른 마나 물약", type: "consumable", price: 70, mana: 35, desc: "마나 35 회복" },
  stamina_potion: { name: "기사의 활력 물약", type: "consumable", price: 65, stamina: 45, desc: "스태미나 45 회복" },
  haste_potion: { name: "신속 물약", type: "consumable", price: 120, level: 2, desc: "30초간 공격속도 증가" },
  memory_potion: { name: "기억의 물약", type: "reset", price: 1000, desc: "투자한 스탯을 모두 회수" }
};

const SHOPS = {
  alchemy: { title: "연금술 상점", owner: "연금술사 미아", items: ["potion", "high_potion", "mana_potion", "stamina_potion", "haste_potion"] },
  smith: { title: "왕실 대장간", owner: "대장장이 브람", items: ["iron_sword", "knight_sword", "chain_armor", "dusk_armor"] },
  magic: { title: "별빛 마법 상점", owner: "마법사 세레나", items: ["magic_ring"] },
  traveler: { title: "여행자의 비밀 상점", owner: "수상한 여행자", items: ["memory_potion", "cursed_sword"] }
  ,moon: { title:"Moonbriar 월석 상점",owner:"예언자 아일라",items:["moon_charm","moonblade","mana_potion"] }
  ,sunforge: { title:"Sunspire 태양 대장간",owner:"대장장이 라심",items:["sunblade","sun_armor","high_potion"] }
  ,sunmagic: { title:"태양술 주문 상점",owner:"태양술사 이슈라",items:["magic_ring","mana_potion","haste_potion"] }
};

const DEFAULT_COUNTS = {
  potion: 2,
  high_potion: 0,
  mana_potion: 0,
  stamina_potion: 0,
  haste_potion: 0,
  memory_potion: 0
};

  // ── config/equipment-visuals.js ──
const freezeProfile = (profile) => Object.freeze(profile);

const WEAPON_VISUALS = Object.freeze({
  rusty_sword: freezeProfile({
    design: "rusted",
    length: 39,
    width: 6,
    blade: "#81796d",
    edge: "#b9ad98",
    shadow: "#4d4540",
    guard: "#76513f",
    guardLight: "#b77a50",
    grip: "#604137",
    pommel: "#8a5a3e",
    accent: "#a65d42",
    trail: "#c8c0ae",
    trailCore: "#f4dfb6",
    glow: "rgba(190,131,82,.18)"
  }),
  iron_sword: freezeProfile({
    design: "iron",
    length: 43,
    width: 6,
    blade: "#7d929f",
    edge: "#dce9e8",
    shadow: "#475966",
    guard: "#8a724c",
    guardLight: "#e4bd69",
    grip: "#314c67",
    pommel: "#a88a58",
    accent: "#7bb5d0",
    trail: "#b9d6df",
    trailCore: "#f5ffff",
    glow: "rgba(113,181,210,.2)"
  }),
  knight_sword: freezeProfile({
    design: "knight",
    length: 47,
    width: 8,
    blade: "#718aa3",
    edge: "#edf5ef",
    shadow: "#3b5067",
    guard: "#c2a05b",
    guardLight: "#ffe19a",
    grip: "#273d69",
    pommel: "#d1ae63",
    accent: "#5e82c5",
    trail: "#9fc9e6",
    trailCore: "#fff6cb",
    glow: "rgba(106,154,215,.24)"
  }),
  cursed_sword: freezeProfile({
    design: "cursed",
    length: 49,
    width: 9,
    blade: "#34223a",
    edge: "#ae3d5a",
    shadow: "#180f20",
    guard: "#4b1e32",
    guardLight: "#c94455",
    grip: "#27131f",
    pommel: "#711f39",
    accent: "#ff5365",
    trail: "#8f2548",
    trailCore: "#ff7581",
    glow: "rgba(220,38,70,.38)"
  }),
  twilight_sword: freezeProfile({
    design: "twilight",
    length: 48,
    width: 8,
    blade: "#604d82",
    edge: "#f4a16f",
    shadow: "#302a50",
    guard: "#9d526b",
    guardLight: "#ffc37e",
    grip: "#343253",
    pommel: "#e07869",
    accent: "#ffb36f",
    trail: "#bd6f91",
    trailCore: "#ffd294",
    glow: "rgba(255,133,102,.32)"
  }),
  wraith_sword: freezeProfile({
    design: "wraith",
    length: 50,
    width: 7,
    blade: "#4c7180",
    edge: "#99f1dd",
    shadow: "#183442",
    guard: "#31566a",
    guardLight: "#7edfcf",
    grip: "#213445",
    pommel: "#3d8f91",
    accent: "#a7ffe8",
    trail: "#65cbbf",
    trailCore: "#d8fff2",
    glow: "rgba(90,244,213,.42)"
  }),
  royal_sword: freezeProfile({
    design: "royal",
    length: 51,
    width: 8,
    blade: "#a9b9c8",
    edge: "#fffbe7",
    shadow: "#596f86",
    guard: "#c9a54d",
    guardLight: "#ffe99a",
    grip: "#354a80",
    pommel: "#e1bc57",
    accent: "#6fa7e4",
    trail: "#d5e7f3",
    trailCore: "#fff8c9",
    glow: "rgba(255,218,111,.3)"
  }),
  moonblade: freezeProfile({
    design: "moon",
    length: 52,
    width: 7,
    blade: "#6686ae",
    edge: "#d4f3ff",
    shadow: "#263c6c",
    guard: "#5265a0",
    guardLight: "#b9d7ff",
    grip: "#252c55",
    pommel: "#748fd1",
    accent: "#d8efff",
    trail: "#8dbef1",
    trailCore: "#f0fbff",
    glow: "rgba(113,178,255,.44)"
  }),
  sunblade: freezeProfile({
    design: "sun",
    length: 52,
    width: 10,
    blade: "#be7033",
    edge: "#ffe179",
    shadow: "#703622",
    guard: "#b74d2f",
    guardLight: "#ffd056",
    grip: "#6d2c26",
    pommel: "#df762f",
    accent: "#fff09a",
    trail: "#ff9b45",
    trailCore: "#fff3a5",
    glow: "rgba(255,116,34,.48)"
  })
});

const ARMOR_VISUALS = Object.freeze({
  cloth: freezeProfile({
    design: "traveler",
    body: "#46566b",
    bodyLight: "#71839a",
    bodyShadow: "#273344",
    trim: "#bd874f",
    metal: "#8797a9",
    gem: "#d9a65c",
    sleeves: "#53677d",
    leggings: "#283448",
    legLight: "#4c5f76",
    boots: "#171e29",
    bootTrim: "#536276",
    cape: "#773f50",
    capeLight: "#ba6570",
    capeShadow: "#2d2130"
  }),
  chain_armor: freezeProfile({
    design: "chain",
    body: "#65737e",
    bodyLight: "#a9b5ba",
    bodyShadow: "#35434f",
    trim: "#8f7652",
    metal: "#c6d0cf",
    gem: "#7296ad",
    sleeves: "#4a5967",
    leggings: "#263342",
    legLight: "#60727e",
    boots: "#151d27",
    bootTrim: "#77858b",
    cape: "#43516d",
    capeLight: "#7286a9",
    capeShadow: "#202837"
  }),
  dusk_armor: freezeProfile({
    design: "dusk",
    body: "#4f3f69",
    bodyLight: "#8a6ca0",
    bodyShadow: "#261e3d",
    trim: "#cf755c",
    metal: "#9c80aa",
    gem: "#ff9870",
    sleeves: "#5f4a78",
    leggings: "#28213e",
    legLight: "#645179",
    boots: "#171326",
    bootTrim: "#8f607b",
    cape: "#692e4c",
    capeLight: "#d45f69",
    capeShadow: "#24152d"
  }),
  sun_armor: freezeProfile({
    design: "sunscale",
    body: "#b75b35",
    bodyLight: "#efaa4f",
    bodyShadow: "#612f2b",
    trim: "#ffd36d",
    metal: "#e8bd5d",
    gem: "#fff1a2",
    sleeves: "#93432f",
    leggings: "#4c2a30",
    legLight: "#ad6541",
    boots: "#2a1921",
    bootTrim: "#e59a45",
    cape: "#a83235",
    capeLight: "#ed6c3d",
    capeShadow: "#461f2b"
  })
});

function weaponVisual(id) {
  return WEAPON_VISUALS[id] || WEAPON_VISUALS.rusty_sword;
}

function armorVisual(id) {
  return ARMOR_VISUALS[id] || ARMOR_VISUALS.cloth;
}

function equipmentVisual(id, type) {
  if (type === "weapon") return WEAPON_VISUALS[id] || null;
  if (type === "armor") return ARMOR_VISUALS[id] || null;
  return null;
}

  // ── config/skills.js ──
const SKILLS = {
  ember_slash: { name: "불씨 교차참", key: "Q", icon: "✕", costType: "stamina", cost: 18, cooldown: 90, kind: "crossProjectile", power: 1.1, desc: "검으로 X자를 새겨 관통하는 교차 검기를 날립니다" },
  iron_guard: { name: "철벽 방어", key: "W", icon: "🛡", costType: "stamina", cost: 12, cooldown: 110, kind: "guard", duration: 42, desc: "방어하고 정확한 순간에는 패링" },
  warrior_blessing: { name: "전사의 가호", key: "E", icon: "✦", costType: "mana", cost: 28, cooldown: 1500, kind: "blessing", desc: "천상의 존재가 공격속도와 방어력을 높입니다" },
  sunset_execution: { name: "황혼 처형", key: "R", icon: "☀", costType: "mana", cost: 45, cooldown: 520, kind: "ultimate", power: 3.2, desc: "넓은 범위의 궁극 장검 공격" },
  fire_wave: { name: "화염 파동", icon: "🔥", costType: "mana", cost: 20, cooldown: 100, kind: "projectile", power: 1.4, level: 3 },
  frost_bind: { name: "서리 속박", icon: "❄", costType: "mana", cost: 25, cooldown: 180, kind: "frost", power: .8, level: 4 },
  shadow_step: { name: "그림자 도약", icon: "◈", costType: "mana", cost: 18, cooldown: 140, kind: "blink", level: 5 },
  lightning: { name: "낙뢰", icon: "⚡", costType: "mana", cost: 30, cooldown: 210, kind: "lightning", power: 2, level: 6 },
  meteor: { name: "운석 낙하", icon: "☄", costType: "mana", cost: 55, cooldown: 600, kind: "meteor", power: 4, level: 8 },
  soul_drain: { name: "영혼 흡수", icon: "◉", costType: "mana", cost: 32, cooldown: 260, kind: "drain", power: 1.6, level: 7 },
  blood_blade: { name: "피의 칼날", icon: "🩸", costType: "stamina", cost: 24, cooldown: 150, kind: "drain", power: 1.8, karma: 20 },
  corpse_burst: { name: "시체 폭발", icon: "☠", costType: "mana", cost: 35, cooldown: 260, kind: "corpse", power: 2.4, karma: 40 },
  soul_harvest: { name: "영혼 수확", icon: "👁", costType: "mana", cost: 40, cooldown: 300, kind: "harvest", power: 2.8, karma: 60 },
  abyss_knight: { name: "심연의 기사", icon: "♛", costType: "mana", cost: 70, cooldown: 900, kind: "transform", power: 2, karma: 100 }
};

const DEFAULT_SKILL_SLOTS = ["ember_slash", "iron_guard", "warrior_blessing", "sunset_execution"];
const DEFAULT_ITEM_SLOTS = ["potion", "high_potion", "mana_potion", "stamina_potion"];

  // ── config/npcs.js ──
const NPCS = [
  { id: "inn", zone:"village", x:255, name:"엘린", role:"여관 주인", color:"#c26b64", hp:5, karma:20, schedule:"inn" },
  { id: "alchemist", zone:"village", x:555, name:"미아", role:"연금술사", color:"#965e9f", hp:5, karma:20, shop:"alchemy", schedule:"shop" },
  { id: "farmer", zone:"village", x:825, name:"토마스", role:"밀 농부", color:"#8b744f", hp:5, karma:15, schedule:"square" },
  { id: "guild", zone:"village", x:1110, name:"로웬", role:"길드 접수원", color:"#4f7893", hp:6, karma:25, schedule:"guild", combatType:"ranger" },
  { id: "smith", zone:"village", x:1410, name:"브람", role:"대장장이", color:"#965448", hp:7, karma:20, shop:"smith", schedule:"shop", combatType:"guard" },
  { id: "mage", zone:"village", x:1690, name:"세레나", role:"마법사", color:"#6157a0", hp:8, karma:25, shop:"magic", schedule:"tower", combatType:"mage" },
  { id: "traveler", zone:"village", x:1925, name:"???", role:"수상한 여행자", color:"#4a4658", hp:6, karma:10, shop:"traveler", schedule:"night", combatType:"spellblade" },
  { id: "guard", zone:"village", x:2145, name:"가렌", role:"황혼 경비대장", color:"#4e6077", hp:24, karma:15, guard:true, schedule:"gate", combatType:"captain" },
  { id: "elder", zone:"elderHouse", x:620, name:"에드윈", role:"더스크베일 촌장", color:"#7a6d78", hp:8, karma:40, schedule:"home" },
  { id: "wanderer_knight", zone:"outskirts1", x:1320, name:"카엘", role:"방랑 기사", color:"#61778c", hp:12, karma:18, schedule:"road", combatType:"guard", wander:true },
  { id: "wanderer_mage", zone:"outskirts2", x:560, name:"루나", role:"별길 마법사", color:"#7464a8", hp:10, karma:20, schedule:"road", combatType:"mage", wander:true }
  ,{ id:"moon_inn",zone:"moonbriarVillage",x:310,name:"네리아",role:"달사슴 여관 주인",color:"#617b86",hp:7,karma:20,schedule:"inn" }
  ,{ id:"moon_ranger",zone:"moonbriarVillage",x:720,name:"실바",role:"월광림 순찰대장",color:"#486d62",hp:14,karma:30,schedule:"square",combatType:"ranger" }
  ,{ id:"moon_oracle",zone:"moonbriarVillage",x:1120,name:"아일라",role:"달의 예언자",color:"#7568a7",hp:10,karma:35,shop:"moon",schedule:"tower",combatType:"mage" }
  ,{ id:"moon_guard",zone:"moonbriarVillage",x:1940,name:"오르반",role:"Moonbriar 문지기",color:"#556d75",hp:18,karma:20,guard:true,schedule:"gate",combatType:"guard" }
  ,{ id:"sun_inn",zone:"sunspireTown",x:300,name:"사피라",role:"황금잔 여관 주인",color:"#b06d56",hp:7,karma:20,schedule:"inn" }
  ,{ id:"sun_smith",zone:"sunspireTown",x:760,name:"라심",role:"태양 대장장이",color:"#9c5944",hp:13,karma:25,shop:"sunforge",schedule:"shop",combatType:"guard" }
  ,{ id:"sun_mage",zone:"sunspireTown",x:1260,name:"이슈라",role:"태양술사",color:"#a76a45",hp:12,karma:30,shop:"sunmagic",schedule:"tower",combatType:"mage" }
  ,{ id:"sun_guard",zone:"sunspireTown",x:2020,name:"자히르",role:"Sunspire 창기사",color:"#8a7258",hp:20,karma:25,guard:true,schedule:"gate",combatType:"guard" }
];

const VILLAGE_CIVILIAN_IDS = ["inn","alchemist","farmer","guild","smith","mage","traveler","elder"];

  // ── config/enemies.js ──
const ENEMIES = {
  slime: { name: "황혼 슬라임", w: 42, h: 32, hp: 3, xp: 42, damage: 1, speed: .55, gold: 24, color: "#8261a8" },
  wolf: { name: "잿빛 늑대", w: 48, h: 34, hp: 4, xp: 48, damage: 2, speed: 1.05, gold: 34, color: "#596274" },
  bandit: { name: "왕도 산적", w: 36, h: 58, hp: 6, xp: 62, damage: 2, speed: .78, gold: 50, color: "#6f4145" },
  skeleton: { name: "망각의 해골", w: 34, h: 55, hp: 6, xp: 68, damage: 2, speed: .7, gold: 52, color: "#aaa394" },
  ghost: { name: "밤의 망령", w: 38, h: 50, hp: 5, xp: 82, damage: 3, speed: .66, gold: 70, color: "#6d74a5" },
  mage: { name: "타락 마도사", w: 38, h: 58, hp: 8, xp: 92, damage: 4, speed: .48, gold: 86, color: "#66568c" },
  guard: { name: "폐왕의 근위병", w: 40, h: 62, hp: 10, xp: 105, damage: 4, speed: .55, gold: 95, color: "#55586b" },
  hunter: { name: "카르마 사냥꾼", w: 42, h: 62, hp: 12, xp: 130, damage: 5, speed: .85, gold: 120, color: "#6d3341" },
  ranger: { name: "분노한 길드 사수", w: 40, h: 60, hp: 11, xp: 0, damage: 3, speed: .82, gold: 0, color: "#4f7893" },
  spellblade: { name: "수상한 주문검사", w: 42, h: 62, hp: 13, xp: 0, damage: 4, speed: .92, gold: 0, color: "#4a4658" },
  captain: { name: "황혼 경비대장 가렌", w: 52, h: 72, hp: 110, xp: 900, damage: 8, speed: 1.2, gold: 0, color: "#566a85" },
  villager: { name: "분노한 주민", w: 36, h: 58, hp: 7, xp: 0, damage: 2, speed: .72, gold: 0, color: "#79604d" },
  soldier: { name: "왕국 병사", w: 40, h: 62, hp: 20, xp: 120, damage: 5, speed: .88, gold: 85, color: "#66758c" },
  adventurer: { name: "현상금 모험가", w: 40, h: 62, hp: 24, xp: 145, damage: 6, speed: 1.04, gold: 105, color: "#7d5a4f" },
  shieldKnight: { name: "왕실 방패기사", w: 48, h: 68, hp: 38, xp: 230, damage: 6, speed: .65, gold: 160, color: "#7c8397" },
  royalMage: { name: "왕실 마도사", w: 40, h: 62, hp: 23, xp: 210, damage: 7, speed: .6, gold: 175, color: "#635b9c" },
  crossbow: { name: "왕실 석궁병", w: 40, h: 60, hp: 20, xp: 175, damage: 6, speed: .68, gold: 130, color: "#536e63" },
  inquisitor: { name: "심연 심판관", w: 54, h: 72, hp: 65, xp: 520, damage: 9, speed: .9, gold: 390, color: "#a4a7b4" },
  priest: { name: "왕실 치유사제", w: 40, h: 62, hp: 20, xp: 250, damage: 3, speed: .5, gold: 210, color: "#c2b58d" },
  hound: { name: "왕실 추적견", w: 48, h: 34, hp: 18, xp: 140, damage: 5, speed: 1.35, gold: 90, color: "#594f4c" },
  treant: { name:"월광 고목",w:54,h:72,hp:18,xp:150,damage:5,speed:.38,gold:115,color:"#496454" },
  moonstalker: { name:"월흔 추적자",w:48,h:38,hp:14,xp:135,damage:5,speed:1.18,gold:105,color:"#596384" },
  briarMage: { name:"가시 마도사",w:40,h:60,hp:16,xp:180,damage:6,speed:.5,gold:145,color:"#665583" },
  sunscorpion: { name:"태양 전갈",w:52,h:34,hp:16,xp:155,damage:5,speed:.82,gold:125,color:"#a76642" },
  duneRaider: { name:"사막 약탈자",w:40,h:60,hp:19,xp:175,damage:6,speed:.82,gold:155,color:"#8d5945" },
  flameDjinn: { name:"불꽃 진",w:42,h:64,hp:22,xp:220,damage:7,speed:.65,gold:190,color:"#b84e3e" },
  judge: { name: "백은의 심판관", w: 54, h: 74, hp: 42, xp: 620, damage: 7, speed: .72, gold: 800, color: "#8a8fa8" },
  lich: { name: "지하묘지 리치", w: 58, h: 78, hp: 36, xp: 550, damage: 5, speed: .46, gold: 650, color: "#513e76" },
  warden: { name: "재의 수문장 발카르", w: 82, h: 96, hp: 90, xp: 900, damage: 5, speed: .62, gold: 1000, color: "#714555", boss: true }
};

const NIGHT_MULTIPLIER = {
  hp: 1.25,
  damage: 1.2,
  xp: 1.35,
  gold: 1.3
};

  // ── config/boss.js ──
const WARDEN_PHASES = [
  {
    threshold: .67,
    name: "철의 맹세",
    patterns: ["combo", "charge", "slam", "bash"],
    interval: 150
  },
  {
    threshold: .34,
    name: "타오르는 칼날",
    patterns: ["fireBlade", "lanes", "summon", "predictCharge"],
    interval: 124
  },
  {
    threshold: 0,
    name: "재의 폭군",
    patterns: ["fiveCombo", "pillars", "fireWalls", "predictCharge"],
    interval: 96
  }
];

function bossPhase(hp, maxHp) {
  const ratio = hp / maxHp;
  return ratio > .67 ? 0 : ratio > .34 ? 1 : 2;
}

  // ── config/events.js ──
const FIELD_EVENTS = [
  {
    id: "merchant_rescue",
    name: "습격당한 행상인",
    icon: "!",
    zones: ["outskirts1"],
    enemies: ["bandit", "bandit", "wolf"],
    rewardGold: 260,
    rewardItem: "twilight_sword",
    rumor: "Amberwild의 부서진 수레 주변에서 비명이 들렸대요."
  },
  {
    id: "ghost_caravan",
    name: "유령 마차",
    icon: "☾",
    zones: ["outskirts1", "outskirts2"],
    nightOnly: true,
    enemies: ["ghost", "ghost", "skeleton"],
    rewardGold: 320,
    rewardItem: "wraith_sword",
    rumor: "밤길에서 종소리가 들려도 절대 뒤돌아보지 말라더군요."
  },
  {
    id: "rare_hunt",
    name: "붉은 뿔 추적",
    icon: "◆",
    zones: ["outskirts2"],
    enemies: ["hunter", "wolf", "wolf"],
    rewardGold: 380,
    rewardItem: "royal_sword",
    rumor: "버려진 왕도에 붉은 뿔을 단 정예 사냥꾼이 나타났어요."
  },
  {
    id:"moon_hunt",name:"월흔 사냥",icon:"☽",zones:["moonbriarForest"],
    enemies:["moonstalker","briarMage","moonstalker"],rewardGold:420,rewardItem:"moon_charm",
    rumor:"월광림 깊은 곳에서 은빛 눈동자들이 여행자를 따라온대요."
  },
  {
    id:"sun_caravan",name:"태양 대상단 방어",icon:"☀",zones:["sunspirePass"],
    enemies:["duneRaider","duneRaider","flameDjinn"],rewardGold:480,rewardItem:"haste_potion",
    rumor:"태양 고개의 대상단이 불꽃 진에게 포위됐다는 전갈입니다."
  }
];

const WEATHER = {
  clear: { name: "맑음", fire: 1, lightning: 1 },
  rain: { name: "비", fire: .8, lightning: 1.25 },
  fog: { name: "안개", fire: 1, lightning: 1, enemyVision: .78 },
  leaves: { name: "낙엽 바람", fire: 1.15, lightning: 1 }
};

function dailyWeather(day, zoneId) {
  if (zoneId === "dungeon") return "fog";
  const options = ["clear", "leaves", "rain", "clear", "fog"];
  const seed = day * 17 + zoneId.length * 11;
  return options[seed % options.length];
}

function dailyEvent(day, zoneId, isNight) {
  const candidates = FIELD_EVENTS.filter((event) => event.zones.includes(zoneId) && (!event.nightOnly || isNight));
  if (!candidates.length) return null;
  return candidates[(day * 13 + zoneId.length * 7) % candidates.length];
}

  // ── config/pursuit-parties.js ──
const PURSUIT_PARTIES = [
  { minLevel: 1, minKarma: 1000, name: "왕국 수색조", units: ["soldier","soldier","adventurer"] },
  { minLevel: 6, minKarma: 1200, name: "은빛 추적대", units: ["shieldKnight","royalMage","crossbow","crossbow"] },
  { minLevel: 12, minKarma: 1600, name: "왕실 심판대", units: ["inquisitor","shieldKnight","royalMage","priest","hound"] }
];

function pursuitParty(level, karma) {
  return [...PURSUIT_PARTIES].reverse().find((party) => level >= party.minLevel && karma >= party.minKarma) || PURSUIT_PARTIES[0];
}

  // ── config/maps.js ──
const MAP_ORDER = [
  "village",
  "elderHill",
  "elderHouse",
  "outskirts1",
  "moonbriarForest",
  "moonbriarVillage",
  "sunspirePass",
  "sunspireTown",
  "outskirts2",
  "bossArena",
  "dungeon",
  "castleApproach",
  "castleHall"
];

function mapCode(zoneId) {
  const index = MAP_ORDER.indexOf(zoneId);
  return `map_${String(index < 0 ? 0 : index + 1).padStart(2, "0")}`;
}

  // ── config/homes.js ──
const NPC_HOMES = [
  { zone:"village",x:100,floor:438,color:"#8d6651",ownerId:"inn" },
  { zone:"village",x:420,floor:438,color:"#815969",ownerId:"alchemist" },
  { zone:"village",x:750,floor:438,color:"#8c6c52",ownerId:"farmer" },
  { zone:"village",x:1040,floor:438,color:"#71544f",ownerId:"guild",style:"guild",width:160 },
  { zone:"village",x:1280,floor:438,color:"#7f594c",ownerId:"smith" },
  { zone:"village",x:1580,floor:438,color:"#6c5b7e",ownerId:"mage" },
  { zone:"village",x:1850,floor:438,color:"#605364",ownerId:"traveler" },
  { zone:"moonbriarVillage",x:150,floor:438,color:"#536376",ownerId:"moon_inn" },
  { zone:"moonbriarVillage",x:460,floor:438,color:"#5e5474" },
  { zone:"moonbriarVillage",x:770,floor:438,color:"#48666b",ownerId:"moon_ranger" },
  { zone:"moonbriarVillage",x:1210,floor:438,color:"#625777",ownerId:"moon_oracle" },
  { zone:"moonbriarVillage",x:1510,floor:438,color:"#4d626f" },
  { zone:"moonbriarVillage",x:1820,floor:438,color:"#5b526d",ownerId:"moon_guard" },
  { zone:"sunspireTown",x:130,floor:438,color:"#a7694d",ownerId:"sun_inn" },
  { zone:"sunspireTown",x:430,floor:438,color:"#b47750" },
  { zone:"sunspireTown",x:730,floor:438,color:"#976049",ownerId:"sun_smith" },
  { zone:"sunspireTown",x:1240,floor:438,color:"#ad714c",ownerId:"sun_mage" },
  { zone:"sunspireTown",x:1540,floor:438,color:"#9e644a" },
  { zone:"sunspireTown",x:1880,floor:438,color:"#a96e4e",ownerId:"sun_guard" }
];

function homesForZone(zoneId) {
  return NPC_HOMES.filter((home) => home.zone === zoneId);
}

  // ── core/clock.js ──
class WorldClock {
  constructor(saved = {}) {
    this.day = saved.day || 1;
    this.minute = saved.minute ?? 17 * 60;
    // 1 in-game day (1,440 minutes) passes in 18 real-time minutes.
    this.speed = 1440 / (18 * 60);
    this.lastSavedDay = this.day;
  }
  update(seconds) {
    this.minute += seconds * this.speed;
    let dayChanged = false;
    while (this.minute >= 1440) {
      this.minute -= 1440;
      this.day += 1;
      dayChanged = true;
    }
    return dayChanged;
  }
  get hour() { return this.minute / 60; }
  get phase() {
    const h = this.hour;
    if (h >= 6 && h < 10) return "morning";
    if (h >= 10 && h < 17) return "day";
    if (h >= 17 && h < 20) return "sunset";
    return "night";
  }
  get isNight() { return this.phase === "night"; }
  get shopOpen() { return this.hour >= 7 && this.hour < 20; }
  format() {
    const h = Math.floor(this.hour).toString().padStart(2, "0");
    const m = Math.floor(this.minute % 60).toString().padStart(2, "0");
    return `DAY ${this.day} · ${h}:${m}`;
  }
  serialize() { return { day: this.day, minute: this.minute }; }
}

  // ── core/save.js ──
const PREFIX = "emberfall-modular";

class SaveManager {
  constructor() {
    this.autosaveKey = `${PREFIX}-auto`;
  }
  save(slot, data) {
    localStorage.setItem(slot === "auto" ? this.autosaveKey : `${PREFIX}-slot-${slot}`, JSON.stringify({ ...data, version: 5, savedAt: Date.now() }));
  }
  clearAuto() { localStorage.removeItem(this.autosaveKey); }
  load(slot) {
    const raw = localStorage.getItem(slot === "auto" ? this.autosaveKey : `${PREFIX}-slot-${slot}`);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  list() {
    return ["auto", 1, 2, 3].map((slot) => {
      const data = this.load(slot);
      return { slot, data, exists: !!data };
    });
  }
  export(slot = "auto") {
    const data = this.load(slot);
    if (!data) return null;
    return new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  }
  async importFile(file, slot = 1) {
    const data = JSON.parse(await file.text());
    if (!data || ![3, 4, 5].includes(data.version) || !data.player) throw new Error("Invalid Emberfall save");
    this.save(slot, data);
    return data;
  }
}

  // ── core/pool.js ──
class ObjectPool {
  constructor(limit) { this.limit = limit; this.items = []; this.cursor = 0; }
  add(item) {
    if (this.items.length < this.limit) {
      this.items.push(item);
    } else {
      this.items[this.cursor] = item;
      this.cursor = (this.cursor + 1) % this.limit;
    }
    return item;
  }
  update(fn) {
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < this.items.length; readIndex++) {
      const item = this.items[readIndex];
      if (fn(item) !== false) this.items[writeIndex++] = item;
    }
    this.items.length = writeIndex;
    if (this.cursor >= writeIndex) this.cursor = 0;
  }
  clear() { this.items.length = 0; this.cursor = 0; }
}

  // ── systems/karma.js ──
function karmaTier(value) {
  if (value >= 1000) return { name: "심연의 재앙", price: 3, guards: true, hunters: true, hostileWorld: true };
  if (value >= 500) return { name: "타락한 군주", price: 2.2, guards: true, hunters: true, autoHostile: true };
  if (value >= 250) return { name: "검은 현상수배자", price: 2, guards: true, hunters: true };
  if (value >= 100) return { name: "저주받은 기사", price: 1.8, guards: true, hunters: true };
  if (value >= 50) return { name: "현상 수배자", price: 1.5, guards: true, hunters: true };
  if (value >= 20) return { name: "범죄자", price: 1.2, guards: false, hunters: true };
  if (value > 0) return { name: "불길한 자", price: 1, guards: false, hunters: false };
  return { name: "평범한 기사", price: 1, guards: false, hunters: false };
}

function corpseStage(npcState, currentDay) {
  if (npcState.alive) return null;
  const age = currentDay - npcState.deathDay;
  if (age >= 5) return "bones";
  if (age >= 3) return "decayed";
  return "fresh";
}

  // ── systems/movement.js ──
function sprintDecision({ moving, shift, stamina, exhausted, guardTimer, attackTimer, transformed }) {
  const sprinting = moving !== 0 && shift && exhausted <= 0 && stamina >= 1 && guardTimer <= 0 && attackTimer <= 0;
  return {
    sprinting,
    multiplier: sprinting ? (transformed ? 1.8 : 1.56) : 1
  };
}

function sprintStaminaStep({ stamina, maxStamina, sprinting, regenDelay, moving, dt }) {
  if (sprinting) {
    const next = Math.max(0, stamina - .34 * dt);
    return { stamina: next, regenDelay: 32, exhausted: next <= 0 ? 90 : 0 };
  }
  const nextDelay = Math.max(0, regenDelay - dt);
  return {
    stamina: nextDelay <= 0 ? Math.min(maxStamina, stamina + (moving ? .16 : .25) * dt) : stamina,
    regenDelay: nextDelay,
    exhausted: 0
  };
}

  // ── systems/minimap.js ──
class MinimapRenderer {
  constructor(canvas, toggleButton) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.toggleButton = toggleButton;
    this.expanded = false;
    this.lastRender = -Infinity;
    this.interval = 50;
    this.terrainCache = new Map();
    this.dirtyZones = new Set();
  }

  toggle() {
    this.expanded = !this.expanded;
    this.canvas.parentElement.classList.toggle("expanded", this.expanded);
    this.toggleButton?.setAttribute("aria-pressed", String(this.expanded));
    this.toggleButton?.setAttribute("aria-label", this.expanded ? "미니맵 축소" : "미니맵 확대");
  }

  markExplored(explored, zoneId, x, width) {
    explored[zoneId] ||= [];
    const bucket = Math.max(0, Math.min(Math.ceil(width / 100), Math.floor(x / 100)));
    let changed = false;
    for (let offset = -1; offset <= 1; offset++) {
      const value = bucket + offset;
      if (value >= 0 && !explored[zoneId].includes(value)) {
        explored[zoneId].push(value);
        changed = true;
      }
    }
    if (changed) this.dirtyZones.add(zoneId);
    return changed;
  }

  isExplored(explored, zoneId, x) {
    return (explored[zoneId] || []).includes(Math.floor(x / 100));
  }

  terrain(zone, explored) {
    if (!this.terrainCache.has(zone.id) || this.dirtyZones.has(zone.id)) {
      const layer = document.createElement("canvas");
      layer.width = this.canvas.width;
      layer.height = this.canvas.height;
      const draw = layer.getContext("2d");
      draw.imageSmoothingEnabled = false;
      draw.fillStyle = "#171725";
      draw.fillRect(0, 0, layer.width, layer.height);
      const sx = layer.width / zone.width;
      const sy = (layer.height - 18) / 540;
      for (const platform of zone.platforms) {
        const start = Math.floor(platform.x / 100);
        const end = Math.ceil((platform.x + platform.w) / 100);
        for (let bucket = start; bucket <= end; bucket++) {
          if (!(explored[zone.id] || []).includes(bucket)) continue;
          const bx = Math.max(platform.x, bucket * 100);
          const right = Math.min(platform.x + platform.w, (bucket + 1) * 100);
          draw.fillStyle = platform.kind === "grass" ? "#607957" : platform.kind === "village" ? "#9a7357" : "#777384";
          draw.fillRect(Math.floor(bx * sx), Math.floor(platform.y * sy), Math.max(1, Math.ceil((right - bx) * sx)), Math.max(2, Math.ceil(Math.min(platform.h, 22) * sy)));
        }
      }
      this.terrainCache.set(zone.id, layer);
      this.dirtyZones.delete(zone.id);
    }
    return this.terrainCache.get(zone.id);
  }

  render(data, now = performance.now()) {
    if (now - this.lastRender < this.interval && !this.dirtyZones.has(data.zone.id)) return;
    this.lastRender = now;
    const { zone, player, explored, exits, npcs, npcStates, enemies, secrets, event, cleared } = data;
    const ctx = this.ctx;
    const sx = this.canvas.width / zone.width;
    const mapY = (worldY) => Math.floor(worldY / 540 * (this.canvas.height - 18));
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.terrain(zone, explored), 0, 0);
    const marker = (x, y, color, size = 4) => {
      if (!this.isExplored(explored, zone.id, x)) return;
      ctx.fillStyle = "#151522";
      ctx.fillRect(Math.floor(x * sx) - size / 2 - 1, mapY(y) - size / 2 - 1, size + 2, size + 2);
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x * sx) - size / 2, mapY(y) - size / 2, size, size);
    };
    exits.forEach((exit) => marker(exit.x, 410, "#f0c46e", 6));
    for (const npc of npcs) {
      const state = npcStates[npc.id];
      if (state?.alive) marker(npc.x, 395, npc.shop ? "#79d7bd" : "#86b9e4", 4);
      else marker(state?.deathX || npc.x, 420, "#8a7d82", 3);
    }
    for (const enemy of enemies) {
      if (enemy.dead || Math.abs(enemy.x - player.x) >= 330) continue;
      marker(enemy.x, enemy.y, enemy.boss ? "#ff4e55" : "#d9656b", enemy.boss ? 7 : 3);
    }
    secrets.filter((secret) => secret.found).forEach((secret) => marker(secret.x, 410, "#db9bff", 4));
    if (event?.active) marker(event.x, 392, "#ffdf67", 6);
    const x = Math.floor(player.x * sx);
    const y = mapY(player.y + player.h / 2);
    ctx.fillStyle = "#fff4be";
    ctx.beginPath();
    ctx.moveTo(x + player.face * 6, y);
    ctx.lineTo(x - player.face * 3, y - 4);
    ctx.lineTo(x - player.face * 3, y + 4);
    ctx.fill();
    ctx.fillStyle = "#b9a7bb";
    ctx.font = "bold 8px monospace";
    ctx.textAlign = "left";
    ctx.fillText(zone.name, 5, this.canvas.height - 6);
    if (cleared) {
      ctx.fillStyle = "#7fe0b5";
      ctx.textAlign = "right";
      ctx.fillText("CLEARED", this.canvas.width - 5, this.canvas.height - 6);
    }
  }
}

  // ── systems/loot.js ──
const LOOT_RULES = {
  basePotionChance: .075,
  pityKills: 9,
  hardPityKills: 16,
  pickupCooldownKills: 4
};

function potionDropDecision({ roll, killsSinceDrop, killsSincePickup }) {
  if (killsSincePickup < LOOT_RULES.pickupCooldownKills) return false;
  if (killsSinceDrop >= LOOT_RULES.hardPityKills) return true;
  const pity = killsSinceDrop >= LOOT_RULES.pityKills ? (killsSinceDrop - LOOT_RULES.pityKills + 1) * .025 : 0;
  return roll < LOOT_RULES.basePotionChance + pity;
}

  // ── systems/monster-persistence.js ──
function spawnRecord(zoneId, group, spawn, index) {
  const [type, x, floor, explicitId] = spawn;
  return {
    id: explicitId || `${zoneId}:${group}:${type}:${Math.round(x)}`,
    spec: [type, x, floor]
  };
}

function isSpawnDefeated(defeatedSpawns, id) {
  return !!defeatedSpawns?.[id];
}

function markSpawnDefeated(defeatedSpawns, id, day) {
  if (!id) return false;
  defeatedSpawns[id] = { day };
  return true;
}

function clearDefeatedSpawns(defeatedSpawns, zoneId = null) {
  let removed = 0;
  for (const id of Object.keys(defeatedSpawns)) {
    if (!zoneId || id.startsWith(`${zoneId}:`)) {
      delete defeatedSpawns[id];
      removed += 1;
    }
  }
  return removed;
}

function zoneClearStatus(zoneId, spawns, defeatedSpawns) {
  const records = [
    ...(spawns.enemies || []).map((spawn, index) => spawnRecord(zoneId, "day", spawn, index)),
    ...(spawns.nightEnemies || []).map((spawn, index) => spawnRecord(zoneId, "night", spawn, index))
  ];
  return {
    total: records.length,
    defeated: records.filter((record) => isSpawnDefeated(defeatedSpawns, record.id)).length,
    cleared: records.length > 0 && records.every((record) => isSpawnDefeated(defeatedSpawns, record.id))
  };
}

  // ── systems/karma-aura.js ──
const KARMA_AURA_TIERS = [
  { min: 0, id: "none", particles: 0, radius: 0, darkness: 0 },
  { min: 20, id: "whisper", particles: 1, radius: 24, darkness: .02 },
  { min: 100, id: "shadow", particles: 2, radius: 34, darkness: .04 },
  { min: 250, id: "blood", particles: 3, radius: 44, darkness: .065 },
  { min: 500, id: "corruption", particles: 5, radius: 68, darkness: .095 },
  { min: 1000, id: "abyss", particles: 8, radius: 96, darkness: .14 }
];

function karmaAuraTier(value) {
  return [...KARMA_AURA_TIERS].reverse().find((tier) => value >= tier.min);
}

function npcAttackUnlocked(value) {
  return value >= 500;
}

function worldHostile(value) {
  return value >= 1000;
}

  // ── systems/blessing.js ──
const BLESSINGS = {
  warrior: {
    id: "warrior", name: "전사의 가호", icon: "✦", attackSpeed: .30, defense: 4,
    duration: 720, cooldown: 1500, color: "#ffe39a", quote: "빛은 아직 그대를 버리지 않았다."
  },
  demon: {
    id: "demon", name: "악마의 가호", icon: "♰", attackSpeed: .40, defense: 3,
    duration: 720, cooldown: 1500, color: "#d84661", lifeSteal: .08, quote: "심연은 그대의 검을 기억한다."
  }
};

function blessingForKarma(karma) {
  return karma >= 500 ? BLESSINGS.demon : BLESSINGS.warrior;
}

function blessingDefense(buff) {
  return buff?.timer > 0 ? BLESSINGS[buff.variant]?.defense || 0 : 0;
}

function blessingAttackMultiplier(buff) {
  return buff?.timer > 0 ? 1 - (BLESSINGS[buff.variant]?.attackSpeed || 0) : 1;
}

  // ── systems/pursuit.js ──
const DEFAULT_PURSUIT = {
  thresholdDay: null,
  nextDay: null,
  pending: false,
  active: false,
  wave: 0,
  defeated: 0
};

function mergePursuit(saved = {}) {
  return { ...DEFAULT_PURSUIT, ...(saved || {}) };
}

function schedulePursuit(pursuit, karma, day) {
  if (karma < 1000 || pursuit.thresholdDay != null) return false;
  pursuit.thresholdDay = day;
  pursuit.nextDay = day + 3;
  return true;
}

function updatePursuitSchedule(pursuit, karma, day) {
  schedulePursuit(pursuit, karma, day);
  if (karma >= 1000 && pursuit.nextDay != null && day >= pursuit.nextDay && !pursuit.active) {
    pursuit.pending = true;
    return true;
  }
  return false;
}

function beginPursuit(pursuit) {
  if (!pursuit.pending || pursuit.active) return false;
  pursuit.pending = false;
  pursuit.active = true;
  pursuit.wave += 1;
  return true;
}

function finishPursuit(pursuit, day) {
  pursuit.active = false;
  pursuit.pending = false;
  pursuit.defeated += 1;
  pursuit.nextDay = day + 3;
}

  // ── systems/dev-console.js ──
const DEV_COMMANDS = [
  "help","skip","karma","level","gold","day","time","heal","ready","skill","jump","fall","zone","pos","spawn","killall",
  "give","equip","npc","massacre","house","monsters","pursuit","garen","wounded","god","save","debug","resetworld","clear"
];

function parseDevCommand(input) {
  const raw = String(input || "").trim();
  if (!raw) return { command: "", args: [], raw };
  const [command, ...args] = raw.split(/\s+/);
  return { command: command.toLowerCase(), args, raw };
}

function commandSuggestion(input) {
  const value = String(input || "").trim().toLowerCase();
  if (!value || value.includes(" ")) return null;
  return DEV_COMMANDS.find((command) => command.startsWith(value) && command !== value) || null;
}

const DEV_HELP = [
  "skip (새 게임 인트로 즉시 건너뛰기)",
  "karma 500 · level 10 · gold 5000 · day 12 · time 22:00",
  "heal · ready · skill meteor q · jump · fall · zone village · pos 1580",
  "spawn wolf 3 · killall",
  "give potion 10 · equip moonblade · npc kill elder · npc revive elder · massacre",
  "house intact|burning|burned · monsters clear|reset [zone]",
  "pursuit now · garen shield|dash|spear|spearStorm|slam|banner|oath · god on|off",
  "wounded reset|waiting|execute|escort|failed|bones|rescued",
  "save · clear",
  "debug · resetworld CONFIRM (자동 저장 세계 초기화)"
];

  // ── systems/intro.js ──
const INTRO_SCENES = Object.freeze([
  Object.freeze({
    id:"ashen-war",
    chapter:"I · THE ASHEN WAR",
    title:"인간과 악마의 전쟁",
    lines:[
      "오래전, 인간과 악마는 세상의 마지막 땅을 두고 끝없이 싸웠다.",
      "산맥은 불탔고, 수많은 왕국이 재가 되어 사라졌다."
    ],
    duration:10600,
    style:"illustration"
  }),
  Object.freeze({
    id:"angelic-grace",
    chapter:"II · CELESTIAL GRACE",
    title:"하늘이 응답하다",
    lines:[
      "멸망을 앞둔 인간들은 마지막 기도로 천사의 힘을 빌렸다.",
      "빛을 두른 기사들은 지옥의 군세를 밀어내고 마침내 승리했다."
    ],
    duration:10800,
    style:"illustration"
  }),
  Object.freeze({
    id:"karma-seed",
    chapter:"III · THE LAST CURSE",
    title:"카르마의 씨앗",
    lines:[
      "그러나 패배한 악마는 인간의 마음 깊숙한 곳에 마지막 저주를 심었다.",
      "죄와 분노를 먹고 자라는 붉은 표식. 사람들은 그것을 ‘카르마’라 불렀다."
    ],
    duration:11000,
    style:"illustration"
  }),
  Object.freeze({
    id:"red-night",
    chapter:"IV · THE RED NIGHT",
    title:"인간이 인간을 베다",
    lines:[
      "카르마가 한계를 넘을 때마다 평범했던 인간은 검은 광기에 삼켜졌다.",
      "그리고 때때로, 단 한 사람이 마을과 도시의 모두를 몰살했다."
    ],
    duration:11300,
    style:"illustration"
  }),
  Object.freeze({
    id:"the-marked",
    chapter:"V · THE MARKED",
    title:"표식 받은 자들의 최후",
    lines:[
      "왕국은 카르마가 보이는 자를 죄의 유무와 상관없이 붙잡았다.",
      "지목된 사람은 누구도 예외 없이 광장에서 처형당했다."
    ],
    duration:11000,
    style:"illustration"
  }),
  Object.freeze({
    id:"the-fugitive",
    chapter:"VI · THE FUGITIVE",
    title:"하지만, 당신은 도망쳤다",
    lines:[
      "어느 날 당신에게도 붉은 표식이 나타났다.",
      "처형대에 서기 전, 당신은 검 한 자루만 쥔 채 왕도를 빠져나왔다."
    ],
    duration:10800,
    style:"ingame"
  }),
  Object.freeze({
    id:"duskvale",
    chapter:"VII · DUSKVALE",
    title:"노을 아래의 조용한 마을",
    lines:[
      "긴 도주 끝에, 아무도 과거를 묻지 않는 시골 마을에 도착했다.",
      "더스크베일. 그러나 카르마는 아직 당신 안에서 조용히 숨 쉬고 있었다."
    ],
    duration:11800,
    style:"ingame"
  })
]);

function createIntroState() {
  return {
    active:false,
    completed:false,
    skipped:false,
    sceneIndex:0,
    sceneTime:0,
    totalTime:0,
    sceneSerial:0
  };
}

function startIntroState(state = createIntroState(), sceneIndex = 0) {
  state.active = true;
  state.completed = false;
  state.skipped = false;
  state.sceneIndex = Math.max(0,Math.min(INTRO_SCENES.length - 1,Math.floor(sceneIndex || 0)));
  state.sceneTime = 0;
  state.totalTime = 0;
  state.sceneSerial = (state.sceneSerial || 0) + 1;
  return state;
}

function introCurrentScene(state) {
  return INTRO_SCENES[Math.max(0,Math.min(INTRO_SCENES.length - 1,state?.sceneIndex || 0))];
}

function introSceneProgress(state) {
  const scene = introCurrentScene(state);
  if (!scene?.duration) return 0;
  return Math.max(0,Math.min(1,(state?.sceneTime || 0) / scene.duration));
}

function finishIntroState(state, skipped) {
  state.active = false;
  state.completed = true;
  state.skipped = !!skipped;
  state.sceneIndex = INTRO_SCENES.length - 1;
  state.sceneTime = INTRO_SCENES.at(-1).duration;
  return { sceneChanged:false,finished:true,skipped:state.skipped };
}

function updateIntroState(state, deltaMs = 0) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  let remaining = Math.max(0,Number.isFinite(deltaMs) ? deltaMs : 0);
  let sceneChanged = false;
  while (remaining > 0 && state.active) {
    const scene = introCurrentScene(state);
    const available = Math.max(0,scene.duration - state.sceneTime);
    const consumed = Math.min(remaining,available);
    state.sceneTime += consumed;
    state.totalTime += consumed;
    remaining -= consumed;
    if (state.sceneTime < scene.duration) break;
    if (state.sceneIndex >= INTRO_SCENES.length - 1) {
      return finishIntroState(state,false);
    }
    state.sceneIndex += 1;
    state.sceneTime = 0;
    state.sceneSerial += 1;
    sceneChanged = true;
  }
  return { sceneChanged,finished:false,skipped:false };
}

function advanceIntroState(state) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  if (state.sceneIndex >= INTRO_SCENES.length - 1) return finishIntroState(state,false);
  state.sceneIndex += 1;
  state.sceneTime = 0;
  state.sceneSerial += 1;
  return { sceneChanged:true,finished:false,skipped:false };
}

function skipIntroState(state) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  return finishIntroState(state,true);
}

  // ── systems/karma-skills.js ──
const VARIANTS = {
  ember_slash: [
    { min: 250, name: "혈월 교차참", icon: "✕", color: "#b43b55", powerMultiplier: 1.2 },
    { min: 500, name: "심연 교차참", icon: "╳", color: "#54205f", coreColor: "#b04783", powerMultiplier: 1.45 }
  ],
  iron_guard: [
    { min: 250, name: "핏빛 결의", icon: "◆", durationMultiplier: 1.18 },
    { min: 500, name: "심연 장벽", icon: "⬟", durationMultiplier: 1.45, guardColor: "#6d376f" }
  ],
  sunset_execution: [
    { min: 250, name: "혈월 처형", icon: "◉", color: "#ad304f", powerMultiplier: 1.18, lifeSteal: .05 },
    { min: 500, name: "일식의 심판", icon: "●", color: "#3b174d", coreColor: "#a53674", powerMultiplier: 1.4, lifeSteal: .1 }
  ]
};

function skillForKarma(id, baseSkill, karma) {
  if (!baseSkill) return null;
  const variant = [...(VARIANTS[id] || [])].reverse().find((entry) => karma >= entry.min);
  if (!variant) return { ...baseSkill };
  return {
    ...baseSkill,
    ...variant,
    power: (baseSkill.power || 1) * (variant.powerMultiplier || 1),
    duration: Math.round((baseSkill.duration || 0) * (variant.durationMultiplier || 1)),
    karmaVariant: variant.min
  };
}

  // ── systems/wounded-knight.js ──
const WOUNDED_KNIGHT = Object.freeze({
  id: "wounded_knight_cedric",
  name: "세드릭",
  role: "부상당한 왕실 기사",
  zone: "outskirts2",
  x: 1648,
  maxHp: 42,
  boneAfterDays: 3
});

const WOUNDED_KNIGHT_ROUTE = Object.freeze([
  "outskirts2",
  "outskirts1",
  "village",
  "elderHill",
  "elderHouse"
]);

const DEFAULT_WOUNDED_KNIGHT_STATE = Object.freeze({
  status: "waiting",
  zone: WOUNDED_KNIGHT.zone,
  x: WOUNDED_KNIGHT.x,
  y: null,
  prevX: WOUNDED_KNIGHT.x,
  prevY: null,
  vx: 0,
  vy: 0,
  limpFrame: 0,
  hurtTimer: 0,
  hp: WOUNDED_KNIGHT.maxHp,
  maxHp: WOUNDED_KNIGHT.maxHp,
  approached: false,
  choice: null,
  executionTimer: 0,
  executionHit: false,
  deathDay: null,
  deathMinute: null,
  bodyZone: null,
  bodyX: null,
  headX: null,
  headY: null,
  headVx: 0,
  headVy: 0,
  headRotation: 0,
  bloodTimer: 0,
  escortStartedDay: null,
  escortStartedMinute: null,
  escortKills: 0,
  wavesSpawned: {},
  waveDefeated: {},
  failureSpoken: false,
  rewardClaimed: false
});

function mergeWoundedKnightState(saved = {}) {
  return {
    ...DEFAULT_WOUNDED_KNIGHT_STATE,
    ...(saved || {}),
    wavesSpawned: { ...DEFAULT_WOUNDED_KNIGHT_STATE.wavesSpawned, ...(saved?.wavesSpawned || {}) },
    waveDefeated: { ...DEFAULT_WOUNDED_KNIGHT_STATE.waveDefeated, ...(saved?.waveDefeated || {}) }
  };
}

function chooseWoundedKnight(state, choice, day, minute) {
  if (!state || state.status !== "waiting" || !["execute", "spare"].includes(choice)) return false;
  state.choice = choice;
  if (choice === "execute") {
    state.status = "executing";
    state.executionTimer = 132;
    state.executionHit = false;
    return true;
  }
  state.status = "escort";
  state.hp = Math.max(1, Math.round(state.maxHp * .82));
  state.escortStartedDay = day;
  state.escortStartedMinute = minute;
  state.wavesSpawned = {};
  state.waveDefeated = {};
  return true;
}

function advanceWoundedKnightExecution(state, dt = 1) {
  if (!state || state.status !== "executing") {
    return { active:false,timer:0,windup:false,shouldHit:false };
  }
  const timer = Number.isFinite(state.executionTimer) ? state.executionTimer : 0;
  const step = Number.isFinite(dt) && dt > 0 ? dt : 1;
  state.executionTimer = Math.max(0,timer - step);
  return {
    active:true,
    timer:state.executionTimer,
    windup:state.executionTimer < 96 && state.executionTimer > 62,
    shouldHit:!state.executionHit && state.executionTimer <= 62
  };
}

function finishWoundedKnightExecution(state, day, minute, zone, x, headX, headY) {
  if (!state || !["executing", "waiting"].includes(state.status)) return false;
  state.status = "executed";
  state.executionTimer = 0;
  state.executionHit = true;
  state.deathDay = day;
  state.deathMinute = minute;
  state.bodyZone = zone;
  state.bodyX = x;
  state.headX = headX;
  state.headY = headY;
  state.headVx = 5.6;
  state.headVy = -5.8;
  state.headRotation = 0;
  state.bloodTimer = 120;
  state.hp = 0;
  return true;
}

function failWoundedKnightEscort(state, day, minute, zone, x) {
  if (!state || state.status !== "escort") return false;
  state.status = "escort_dead";
  state.hp = 0;
  state.deathDay = day;
  state.deathMinute = minute;
  state.bodyZone = zone;
  state.bodyX = x;
  state.failureSpoken = true;
  return true;
}

function completeWoundedKnightEscort(state) {
  if (!state || state.status !== "escort") return false;
  state.status = "rescued";
  state.hp = Math.max(1, state.hp);
  state.rewardClaimed = true;
  return true;
}

function woundedKnightEscortActive(state) {
  return state?.status === "escort";
}

function woundedKnightIsCorpse(state) {
  return state?.status === "executed" || state?.status === "escort_dead";
}

function woundedKnightElapsedDays(state, day, minute) {
  if (state?.deathDay == null) return 0;
  return (day - state.deathDay) + ((minute || 0) - (state.deathMinute || 0)) / 1440;
}

function woundedKnightRemainsStage(state, day, minute) {
  if (!woundedKnightIsCorpse(state)) return "none";
  return woundedKnightElapsedDays(state, day, minute) >= WOUNDED_KNIGHT.boneAfterDays ? "bones" : "fresh";
}

  // ── systems/world-state.js ──
const DEFAULT_WORLD_STATES = {
  elderHouse: {
    stage: "intact",
    fireDay: null,
    fireMinute: null,
    elderDoomed: false,
    confronted: false,
    dialogueStep: 0,
    curseActive: false,
    elderDiedInFire: false
  },
  cemetery: { sensed: false },
  houseFires: {},
  guardRevenge: { triggered: false, defeated: false },
  crimeMemory: { witnesses: 0, lastCrimeDay: null },
  defeatedSpawns: {},
  pursuit: mergePursuit(),
  woundedKnight: mergeWoundedKnightState()
};

function mergeWorldStates(saved = {}) {
  return {
    elderHouse: { ...DEFAULT_WORLD_STATES.elderHouse, ...(saved.elderHouse || {}) },
    cemetery: { ...DEFAULT_WORLD_STATES.cemetery, ...(saved.cemetery || {}) },
    houseFires: Object.fromEntries(Object.entries(saved.houseFires || {}).map(([id, fire]) => [id, { ...fire }])),
    guardRevenge: { ...DEFAULT_WORLD_STATES.guardRevenge, ...(saved.guardRevenge || {}) },
    crimeMemory: { ...DEFAULT_WORLD_STATES.crimeMemory, ...(saved.crimeMemory || {}) },
    defeatedSpawns: { ...(saved.defeatedSpawns || {}) },
    pursuit: mergePursuit(saved.pursuit),
    woundedKnight: mergeWoundedKnightState(saved.woundedKnight)
  };
}

function elapsedWorldDays(startDay, startMinute, day, minute) {
  if (startDay == null) return 0;
  return (day - startDay) + ((minute || 0) - (startMinute || 0)) / 1440;
}

function elderHouseStage(worldStates, day, minute) {
  const house = worldStates.elderHouse;
  if (house.stage !== "burning") return house.stage;
  return elapsedWorldDays(house.fireDay, house.fireMinute, day, minute) >= 1 ? "burned" : "burning";
}

function startElderHouseFire(worldStates, day, minute, { elderDoomed = false } = {}) {
  worldStates.elderHouse = {
    stage: "burning",
    fireDay: day,
    fireMinute: minute,
    elderDoomed: !!elderDoomed,
    confronted: false,
    dialogueStep: 0,
    curseActive: false,
    elderDiedInFire: false
  };
  return worldStates.elderHouse;
}

function elderHouseCanEnter(worldStates, day, minute) {
  return elderHouseStage(worldStates,day,minute) !== "burned";
}

function elderConfrontationReady(worldStates, day, minute) {
  const house = worldStates.elderHouse;
  return elderHouseStage(worldStates,day,minute) === "burning"
    && !!house.elderDoomed
    && !house.confronted;
}

function completeElderConfrontation(worldStates) {
  const house = worldStates.elderHouse;
  if (house.stage !== "burning" || !house.elderDoomed || house.confronted) return false;
  house.confronted = true;
  house.curseActive = true;
  return true;
}

function houseFireStage(worldStates, ownerId, day, minute) {
  const fire = worldStates.houseFires?.[ownerId];
  if (!fire) return "intact";
  if (fire.stage !== "burning") return fire.stage;
  return elapsedWorldDays(fire.fireDay, fire.fireMinute, day, minute) >= 1 ? "burned" : "burning";
}

function startHouseFire(worldStates, ownerId, day, minute) {
  worldStates.houseFires ||= {};
  worldStates.houseFires[ownerId] = { stage:"burning",fireDay:day,fireMinute:minute };
  return worldStates.houseFires[ownerId];
}

  // ── systems/platforms.js ──
const BASELINE_Y = 438;

function groundKindForZone(zoneId, interior = false) {
  if (interior) {
    if (zoneId === "elderHouse") return "wood";
    if (zoneId === "castleHall") return "castleInterior";
    return "dungeon";
  }
  if (zoneId === "village") return "village";
  if (zoneId === "bossArena") return "bridge";
  if (zoneId === "dungeon") return "dungeon";
  if (zoneId === "outskirts2") return "ruin";
  if (zoneId === "castleApproach") return "castleStone";
  if (zoneId === "moonbriarVillage") return "moonVillage";
  if (zoneId?.startsWith("moonbriar")) return "moonGrass";
  if (zoneId === "sunspireTown") return "sunVillage";
  if (zoneId?.startsWith("sunspire")) return "sand";
  return "grass";
}

function ensureContinuousGround(zone, baseline = BASELINE_Y) {
  const originals = (zone.platforms || []).map((platform) => ({ ...platform }));
  const alreadyContinuous = originals.some((platform) =>
    platform.x <= 0 &&
    platform.x + platform.w >= zone.width &&
    platform.y === baseline
  );
  if (alreadyContinuous) return originals;
  return [
    {
      x: 0,
      y: baseline,
      w: zone.width,
      h: Math.max(102, 540 - baseline),
      kind: groundKindForZone(zone.id, zone.interior),
      foundation: true
    },
    ...originals
  ];
}

function groundCoverageGaps(platforms, width) {
  const intervals = (platforms || [])
    .filter((platform) => platform.w > 0)
    .map((platform) => [Math.max(0, platform.x), Math.min(width, platform.x + platform.w)])
    .filter(([start, end]) => end > start)
    .sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let coveredUntil = 0;
  for (const [start, end] of intervals) {
    if (start > coveredUntil) gaps.push([coveredUntil, start]);
    coveredUntil = Math.max(coveredUntil, end);
  }
  if (coveredUntil < width) gaps.push([coveredUntil, width]);
  return gaps;
}

  // ── systems/daylight.js ──
const clamp01 = (value) => Math.max(0, Math.min(1, value));

function smoothstep(start, end, value) {
  const t = clamp01((value - start) / Math.max(1, end - start));
  return t * t * (3 - 2 * t);
}

function daylightAt(minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  const sunrise = smoothstep(300, 510, time);
  const sunset = 1 - smoothstep(1050, 1260, time);
  return clamp01(sunrise * sunset);
}

function sunsetGlowAt(minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  const evening = smoothstep(930, 1080, time) * (1 - smoothstep(1200, 1320, time));
  const morning = smoothstep(270, 390, time) * (1 - smoothstep(480, 600, time));
  return clamp01(Math.max(evening, morning * .65));
}

function blendHex(from, to, amount) {
  const t = clamp01(amount);
  const parse = (hex) => [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16)
  ];
  const a = parse(from);
  const b = parse(to);
  const channels = a.map((value, index) => Math.round(value + (b[index] - value) * t));
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function interpolatePalette(keyframes, minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  let left = keyframes[0];
  let right = keyframes[keyframes.length - 1];
  for (let index = 0; index < keyframes.length - 1; index++) {
    if (time >= keyframes[index].minute && time <= keyframes[index + 1].minute) {
      left = keyframes[index];
      right = keyframes[index + 1];
      break;
    }
  }
  const amount = smoothstep(left.minute, right.minute, time);
  return left.colors.map((color, index) => blendHex(color, right.colors[index], amount));
}

  // ── systems/collision.js ──
function resolveHorizontalMovement({ x, y, w, h, nextX, platforms }) {
  const direction = Math.sign(nextX - x);
  if (!direction) return { x, blocked: false };
  let resolvedX = nextX;
  let blocked = false;
  const top = y + 3;
  const bottom = y + h - 2;

  for (const platform of platforms) {
    if (platform.foundation) continue;
    const verticalOverlap = bottom > platform.y + 6 && top < platform.y + platform.h - 2;
    if (!verticalOverlap) continue;
    if (direction > 0) {
      const currentRight = x + w;
      const nextRight = resolvedX + w;
      if (currentRight <= platform.x + 1 && nextRight > platform.x) {
        resolvedX = Math.min(resolvedX, platform.x - w);
        blocked = true;
      }
    } else {
      const currentLeft = x;
      const nextLeft = resolvedX;
      const wall = platform.x + platform.w;
      if (currentLeft >= wall - 1 && nextLeft < wall) {
        resolvedX = Math.max(resolvedX, wall);
        blocked = true;
      }
    }
  }
  return { x: resolvedX, blocked };
}

  // ── systems/camera.js ──
const CAMERA_BASE_FLOOR = 438;

function horizontalCameraTarget({
  playerX,
  viewportWidth,
  worldWidth,
  minX = 0,
  anchor = .36
} = {}) {
  const viewport = Math.max(0,Number(viewportWidth) || 0);
  const width = Math.max(viewport,Number(worldWidth) || viewport);
  const minimum = Number.isFinite(minX) ? minX : 0;
  const maximum = Math.max(minimum,width - viewport);
  const target = (Number(playerX) || 0) - viewport * anchor;
  return Math.max(minimum,Math.min(maximum,target));
}

function landingFloorBelowPlayer(
  platforms = [],
  x,
  footY,
  { fallback = CAMERA_BASE_FLOOR } = {}
) {
  const playerFootY = Number.isFinite(footY) ? footY : fallback;
  let support = Infinity;
  for (const platform of platforms) {
    if (
      !platform || !Number.isFinite(platform.x)
      || !Number.isFinite(platform.y) || !Number.isFinite(platform.w)
    ) continue;
    if (x < platform.x || x > platform.x + platform.w) continue;
    // Canvas Y increases downward: a smaller Y is above the player's feet.
    // Never let an overhead or currently pass-through platform steer the camera.
    if (platform.y < playerFootY) continue;
    support = Math.min(support,platform.y);
  }
  return Number.isFinite(support) ? support : fallback;
}

function fallingSupportFloorAt(
  platforms = [],
  x,
  bodyY,
  { fallback = CAMERA_BASE_FLOOR, tolerance = 10 } = {}
) {
  const probeY = Number.isFinite(bodyY) ? bodyY - tolerance : fallback;
  return landingFloorBelowPlayer(platforms,x,probeY,{ fallback });
}

function verticalCameraTarget(
  floorY,
  { baseFloor = CAMERA_BASE_FLOOR, follow = 1, maxRise = 300 } = {}
) {
  const terrainY = Number.isFinite(floorY) ? floorY : baseFloor;
  return Math.max(-maxRise, Math.min(0,(terrainY - baseFloor) * follow));
}

function playerVerticalCameraTarget({
  playerY,
  playerHeight = 0,
  floorY,
  grounded = true,
  velocityY = 0,
  screenTop = 370,
  maxRise = 300
} = {}) {
  const hasGroundedSupport = grounded
    && Number.isFinite(playerY)
    && Number.isFinite(playerHeight)
    && playerHeight > 0;
  const supportedFloorY = hasGroundedSupport ? playerY + playerHeight : floorY;
  const terrainTarget = verticalCameraTarget(supportedFloorY,{ maxRise });
  if (grounded || !Number.isFinite(playerY)) return terrainTarget;
  // Predict takeoff so the camera never reacts late, but never predict a fall:
  // downward anticipation makes the world drop before the player's feet leave an edge.
  const prediction = Math.max(-32,Math.min(0,(Number(velocityY) || 0) * 2.2));
  const playerTarget = Math.max(-maxRise,Math.min(0,playerY + prediction - screenTop));
  return Math.min(terrainTarget,playerTarget);
}

function easeCamera(current, target, dt = 1, responsiveness = 0.24) {
  return current + (target - current) * Math.min(1,responsiveness * dt);
}

  // ── systems/animation.js ──
const animationClamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
const animationSmoothstep = (value) => {
  const t = animationClamp01(value);
  return t * t * (3 - 2 * t);
};

function lerp(previous, current, alpha) {
  const from = Number.isFinite(previous) ? previous : current;
  const to = Number.isFinite(current) ? current : from;
  return from + (to - from) * animationClamp01(alpha);
}

function interpolated(entity, axis, alpha) {
  return lerp(entity?.[`prev${axis.toUpperCase()}`], entity?.[axis], alpha);
}

function playerSwordAngle(progress, combo = 0, crossSlash = false) {
  const t = animationClamp01(progress);
  if (crossSlash) {
    if (t < .5) {
      const firstStroke = animationSmoothstep(t / .5);
      return -1.2 + firstStroke * 2.08;
    }
    const secondStroke = animationSmoothstep((t - .5) / .5);
    return .88 - secondStroke * 2.08;
  }
  const eased = 1 - Math.pow(1 - t, 3);
  if (combo === 0) return -1.3 + eased * 1.98;
  if (combo === 1) return -.42 + eased * .94;
  return -1.52 + eased * 2.22;
}

function playerAttackMotion({ active, progress, combo = 0, face = 1 }, out = {}) {
  if (!active) {
    out.lunge = 0;
    out.crouch = 0;
    out.stance = 0;
    out.shoulder = 0;
    out.counterArm = 0;
    return out;
  }
  const t = animationClamp01(progress);
  const windup = animationSmoothstep(t / .24);
  const strike = animationSmoothstep((t - .2) / .38);
  const recovery = animationSmoothstep((t - .62) / .38);
  const impulse = Math.sin(Math.PI * animationClamp01((t - .08) / .92));
  const finisher = combo === 2 ? 1.45 : combo === 1 ? 1.12 : 1;
  out.lunge = face * impulse * 5.5 * finisher;
  out.crouch = Math.sin(Math.PI * t) * (combo === 2 ? 4 : 2.2);
  out.stance = impulse * (combo === 2 ? 5.5 : 3.5);
  out.shoulder = face * (strike - recovery * .65) * 3.5 * finisher;
  out.counterArm = face * (windup - strike) * 4;
  return out;
}

function playerAirMotion({ grounded, vy = 0, airTime = 0, landTimer = 0, face = 1 }, out = {}) {
  if (grounded) {
    const landing = animationClamp01(landTimer / 9);
    out.bodyY = landing * 3;
    out.bodyLean = 0;
    out.frontKnee = landing * 2;
    out.rearKnee = landing * 2;
    out.capeLift = 0;
    out.airborne = false;
    return out;
  }
  const ascent = animationClamp01(-vy / 12);
  const descent = animationClamp01(vy / 12);
  const hang = 1 - animationClamp01(Math.abs(vy) / 8);
  const settled = animationSmoothstep(airTime / 5);
  out.bodyY = -hang * 1.5;
  out.bodyLean = face * (ascent * 1.5 - descent);
  out.frontKnee = (3 + ascent * 5 + hang * 2) * settled;
  out.rearKnee = (1 + ascent * 2 + hang * 5 + descent * 2) * settled;
  out.capeLift = (4 + ascent * 5 + descent * 2) * settled;
  out.airborne = true;
  return out;
}

function enemyCombatMotion(entity = {}, alpha = 1, out = {}) {
  const attackAnim = lerp(entity.prevAttackAnim, entity.attackAnim ?? 0, alpha);
  const dashTimer = lerp(entity.prevDashTimer, entity.dashTimer ?? 0, alpha);
  const launchTimer = lerp(entity.prevLaunchTimer, entity.launchTimer ?? 0, alpha);
  const leapTimer = lerp(entity.prevLeapTimer, entity.leapTimer ?? 0, alpha);
  const attackAnimMax = entity.attackAnimMax ?? 0;
  const face = entity.face ?? 1;
  const attacking = attackAnim > 0;
  const duration = Math.max(1, attackAnimMax || 34);
  const progress = attacking ? animationClamp01(1 - attackAnim / duration) : 0;
  const impulse = attacking ? Math.sin(Math.PI * progress) : 0;
  const airborne = launchTimer > 0 || leapTimer > 0;
  const launchProgress = launchTimer > 0
    ? animationClamp01(1 - launchTimer / 22)
    : animationClamp01(1 - leapTimer / Math.max(1, entity.leapDuration || 28));
  const jumpArc = airborne ? Math.sin(Math.PI * launchProgress) : 0;
  out.bodyX = face * (dashTimer > 0 ? 5 : impulse * 4.5);
  out.bodyY = impulse * 2 - jumpArc * 1.5;
  out.stance = attacking ? impulse * 4 : 0;
  out.frontKnee = airborne ? 6 + jumpArc * 3 : attacking ? impulse * 2 : 0;
  out.rearKnee = airborne ? 3 + (1 - jumpArc) * 3 : attacking ? impulse : 0;
  out.tilt = face * (dashTimer > 0 ? .07 : impulse * .035);
  out.attackProgress = progress;
  out.airborne = airborne;
  return out;
}

  // ── systems/skill-scaling.js ──
const SKILL_GROWTH_RANKS = ["점화", "강화", "각성", "초월", "성좌", "신화", "영겁"];

function skillGrowth(level = 1, id = "", kind = "") {
  const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
  const steps = safeLevel - 1;
  const tier = Math.min(SKILL_GROWTH_RANKS.length, 1 + Math.floor(steps / 4));
  const kindWeight = {
    ultimate: 1.3,
    meteor: 1.25,
    transform: 1.2,
    blessing: 1.1,
    crossProjectile: 1.16,
    lightning: 1.08,
    frost: 1.05
  }[kind] || 1;

  return {
    id,
    kind,
    level: safeLevel,
    tier,
    rank: SKILL_GROWTH_RANKS[tier - 1],
    rangeScale: 1 + steps * .028,
    effectScale: 1 + steps * .036,
    durationScale: 1 + steps * .01,
    powerScale: 1 + steps * .012,
    particleCount: Math.round((8 + tier * 4 + steps * .7) * kindWeight),
    echoCount: Math.min(4, Math.floor(steps / 5)),
    chainCount: Math.min(4, 1 + Math.floor(steps / 7)),
    trailCount: Math.min(5, 1 + Math.floor(steps / 4))
  };
}

function scaledRange(baseRange, growth) {
  return Math.round(Math.max(1, Number(baseRange) || 1) * (growth?.rangeScale || 1));
}

function scaledEffectSize(baseSize, growth) {
  return Math.round(Math.max(1, Number(baseSize) || 1) * (growth?.effectScale || 1));
}

function skillGrowthSummary(level, id = "", kind = "") {
  const growth = skillGrowth(level, id, kind);
  return {
    ...growth,
    rangeBonus: Math.round((growth.rangeScale - 1) * 100),
    effectBonus: Math.round((growth.effectScale - 1) * 100)
  };
}

  // ── systems/combat-effects.js ──
const COMBAT_EFFECT_ARCANE_TYPES = new Set([
  "mage", "royalMage", "briarMage", "ghost", "lich", "flameDjinn", "priest"
]);
const COMBAT_EFFECT_BEAST_TYPES = new Set(["wolf", "hound", "moonstalker"]);
const COMBAT_EFFECT_MARKSMAN_TYPES = new Set(["ranger", "hunter", "crossbow"]);
const COMBAT_EFFECT_ELITE_TYPES = new Set([
  "captain", "inquisitor", "judge", "shieldKnight", "guard", "spellblade", "adventurer", "soldier"
]);

function enemyEffectProfile(enemy = {}) {
  const type = enemy.type || "unknown";
  if (enemy.boss || type === "warden") {
    return { kind:"boss", color:"#d54842", accent:"#ffd079", radius:92, sparks:28 };
  }
  if (type === "treant") {
    return { kind:"root", color:"#52725a", accent:"#b6d278", radius:58, sparks:15 };
  }
  if (type === "sunscorpion") {
    return { kind:"venom", color:"#c96b42", accent:"#ffe06d", radius:48, sparks:14 };
  }
  if (type === "slime") {
    return { kind:"splash", color:"#8261a8", accent:"#e0b8ff", radius:42, sparks:12 };
  }
  if (COMBAT_EFFECT_BEAST_TYPES.has(type)) {
    return {
      kind:"claw",
      color:type === "moonstalker" ? "#716fa4" : "#747b86",
      accent:type === "moonstalker" ? "#d9c8ff" : "#f0c995",
      radius:52,
      sparks:14
    };
  }
  if (COMBAT_EFFECT_ARCANE_TYPES.has(type)) {
    return {
      kind:"arcane",
      color:type === "flameDjinn" ? "#c7463c" : type === "priest" ? "#d9c987" : "#735da2",
      accent:type === "flameDjinn" ? "#ffc15d" : type === "priest" ? "#fff3bd" : "#dec8ff",
      radius:62,
      sparks:19
    };
  }
  if (COMBAT_EFFECT_MARKSMAN_TYPES.has(type)) {
    return { kind:"marksman", color:"#8a684e", accent:"#f0d2a1", radius:54, sparks:11 };
  }
  if (COMBAT_EFFECT_ELITE_TYPES.has(type) || enemy.npcId) {
    return {
      kind:"blade",
      color:type === "captain" ? "#b43e49" : type === "spellblade" ? "#8a4eb1" : "#68788d",
      accent:type === "captain" ? "#ffb36c" : type === "spellblade" ? "#e0a3ff" : "#e9d6ae",
      radius:type === "captain" ? 72 : 58,
      sparks:type === "captain" ? 22 : 15
    };
  }
  return { kind:"impact", color:"#8b6f66", accent:"#f1cf9f", radius:46, sparks:10 };
}

function hazardEffectProfile(kind = "impact", friendly = false) {
  if (kind === "eclipse" || kind === "night" || kind === "corpse") {
    return { shape:"dark", telegraph:"#a968c0", color:"#4f1c61", accent:"#e38bc8" };
  }
  if (kind === "sunburst") {
    return { shape:"sun", telegraph:"#ffe28a", color:"#ff8a49", accent:"#fff2ae" };
  }
  if (kind === "lightning") {
    return { shape:"lightning", telegraph:"#d8cbff", color:"#806eff", accent:"#f5efff" };
  }
  if (kind === "meteor") {
    return { shape:"meteor", telegraph:"#ffb262", color:"#d94a38", accent:"#ffe07b" };
  }
  if (kind === "root") {
    return { shape:"root", telegraph:"#a9c978", color:"#4e6a50", accent:"#d9ec9b" };
  }
  if (kind === "venom") {
    return { shape:"venom", telegraph:"#d7c45f", color:"#77883f", accent:"#eff58c" };
  }
  if (kind === "splash") {
    return { shape:"splash", telegraph:"#c19be1", color:"#79599d", accent:"#ebcfff" };
  }
  if (["pillars", "fire", "lane", "wall"].includes(kind)) {
    return { shape:"flame", telegraph:"#ffbd62", color:"#e94c35", accent:"#ffd56c" };
  }
  if (kind === "slash") {
    return { shape:"slash", telegraph:"#ffbf78", color:"#e9564d", accent:"#fff0c2" };
  }
  if (kind === "slam") {
    return { shape:"slam", telegraph:"#f1a85e", color:"#a83f35", accent:"#ffd18a" };
  }
  if (kind === "bash") {
    return { shape:"shield", telegraph:"#c7d9e8", color:"#738ba3", accent:"#f0f7ff" };
  }
  if (kind === "charge" || kind === "predicted") {
    return { shape:"charge", telegraph:"#e7b46e", color:"#b85a43", accent:"#ffe0a0" };
  }
  return friendly
    ? { shape:"magic", telegraph:"#ffe189", color:"#f47b4d", accent:"#fff0ad" }
    : { shape:"impact", telegraph:"#efb15e", color:"#dc4f45", accent:"#ffe09b" };
}

  // ── systems/stats.js ──
const PLAYER_STAT_KEYS = ["attack", "health", "defense", "magic", "speed"];

const safeStatValue = (value) => Math.max(0, Math.floor(Number(value) || 0));

function normalizePlayerStats(source = {}) {
  return Object.fromEntries(PLAYER_STAT_KEYS.map((key) => [key, safeStatValue(source[key])]));
}

function statInvestment(current, pending) {
  const base = normalizePlayerStats(current);
  const next = normalizePlayerStats(pending);
  return PLAYER_STAT_KEYS.reduce((sum, key) => sum + next[key] - base[key], 0);
}

function commitStatAllocation(current, pending, availablePoints) {
  const base = normalizePlayerStats(current);
  const next = normalizePlayerStats(pending);
  const points = safeStatValue(availablePoints);
  for (const key of PLAYER_STAT_KEYS) {
    if (next[key] < base[key]) return { ok:false, reason:"기존 스탯보다 낮출 수 없습니다.", stats:base, remaining:points, spent:0 };
  }
  const spent = statInvestment(base, next);
  if (spent <= 0) return { ok:false, reason:"투자할 스탯을 선택하세요.", stats:base, remaining:points, spent:0 };
  if (spent > points) return { ok:false, reason:"사용 가능한 스탯 포인트를 초과했습니다.", stats:base, remaining:points, spent:0 };
  return { ok:true, stats:next, remaining:points - spent, spent };
}

function derivePlayerStats(stats, equipment = {}) {
  const value = normalizePlayerStats(stats);
  const weaponAttack = Number(equipment.weaponAttack) || 0;
  const armorHp = Number(equipment.armorHp) || 0;
  const armorDefense = Number(equipment.armorDefense) || 0;
  const accessoryMagic = Number(equipment.accessoryMagic) || 0;
  return {
    attackPower:2 + value.attack + weaponAttack,
    maxHp:8 + value.health * 2 + armorHp,
    defense:value.defense + armorDefense,
    magicPower:value.magic * 2 + accessoryMagic,
    maxMana:100 + value.magic * 5,
    maxStamina:100 + value.speed * 3,
    moveSpeed:3.9 + value.speed * .06,
    jump:12.2 + value.speed * .025
  };
}

  // ── systems/apocalypse.js ──
const APOCALYPSE_KARMA = 1000;

const apocalypseClamp = (value, min, max) => Math.max(min, Math.min(max, value));

function apocalypseIntensity(value) {
  const karma = Math.max(0, Number(value) || 0);
  if (karma < APOCALYPSE_KARMA) return 0;
  return apocalypseClamp(.72 + (karma - APOCALYPSE_KARMA) / 1800 * .28, .72, 1);
}

function firefallState(timeMs, index, width = 960, height = 540) {
  const time = Math.max(0, Number(timeMs) || 0);
  const order = Math.max(0, Math.floor(Number(index) || 0));
  const cycle = 6200 + order % 4 * 1100;
  const shifted = time + order * 1739;
  const sequence = Math.floor(shifted / cycle);
  const phase = (shifted % cycle) / cycle;
  const activeWindow = .24;
  const progress = apocalypseClamp(phase / activeWindow, 0, 1);
  const seed = (order * 197 + sequence * 131 + 71) % 997;
  const direction = order % 5 === 4 ? 1 : -1;
  const travelY = height + 180;
  const drift = height * (.46 + order % 3 * .08);
  const startX = -120 + seed / 997 * (width + 240);
  const trail = 82 + order % 3 * 20;
  return {
    active:phase < activeWindow,
    backgroundOnly:true,
    collidable:false,
    damage:0,
    progress,
    x:startX + direction * drift * progress,
    y:-90 + travelY * progress,
    direction,
    drift,
    travelY,
    trail,
    trailX:-direction * trail * drift / travelY,
    trailY:trail,
    scale:.82 + order % 4 * .12
  };
}

  // ── systems/guard-revenge.js ──
function villageCiviliansDefeated(civilianIds, npcStates) {
  return civilianIds.length > 0 && civilianIds.every((id) => npcStates[id] && !npcStates[id].alive);
}

function guardRevengeReady(civilianIds, npcStates, guardId = "guard") {
  return Boolean(npcStates[guardId]?.alive) && villageCiviliansDefeated(civilianIds, npcStates);
}

  // ── systems/cross-slash.js ──
function crossSlashProfile(level = 1, growth = {}) {
  const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
  const steps = safeLevel - 1;
  const tier = Math.max(1, Math.floor(Number(growth.tier) || 1));
  const castFrames = Math.max(18,24 - Math.floor((tier - 1) / 2));
  return {
    level:safeLevel,
    tier,
    velocity:9.4 + Math.min(3.6,steps * .12),
    damageScale:1 + steps * .022 + (tier - 1) * .045,
    maxHits:Math.min(9,2 + tier + Math.floor(steps / 8)),
    staggerFrames:tier >= 2 ? 5 + tier * 2 : 0,
    guardBreak:tier >= 3,
    trailCount:Math.min(7,2 + tier),
    echoCount:Math.max(Number(growth.echoCount) || 0,Math.min(5,tier - 1)),
    castFrames,
    launchDelay:Math.max(14,castFrames - 2),
    sizeScale:1 + (tier - 1) * .055
  };
}

function crossWaveOpacity(life = 0,maxLife = 1) {
  const total = Math.max(1,Number(maxLife) || 1);
  const remaining = Math.max(0,Math.min(1,(Number(life) || 0) / total));
  const fadeWindow = .42;
  if (remaining >= fadeWindow) return 1;
  const normalized = remaining / fadeWindow;
  return normalized * normalized * (3 - normalized * 2);
}

  // ── systems/npc-roaming.js ──
const roamingClamp = (value,min,max) => Math.max(min,Math.min(max,value));

function initializeRoamingNpc(state = {},originX = 0,floorY = 438) {
  if (!Number.isFinite(state.roamX)) state.roamX = originX;
  if (!Number.isFinite(state.roamY)) state.roamY = floorY;
  if (!Number.isFinite(state.prevRoamY)) state.prevRoamY = state.roamY;
  if (!Number.isFinite(state.roamVY)) state.roamVY = 0;
  if (!Number.isFinite(state.roamDistance)) state.roamDistance = 0;
  if (!Number.isFinite(state.roamPause)) state.roamPause = 0;
  if (!Number.isFinite(state.roamDir) || state.roamDir === 0) state.roamDir = 1;
  if (typeof state.roamGrounded !== "boolean") state.roamGrounded = true;
  return state;
}

function updateRoamingNpc(state, {
  originX = 0,
  dt = 1,
  zoneWidth = 960,
  floorAt,
  speed = .42,
  range = 330,
  gravity = .58,
  maxFallSpeed = 11
} = {}) {
  const getFloor = typeof floorAt === "function" ? floorAt : () => 438;
  initializeRoamingNpc(state,originX,getFloor(state?.roamX ?? originX));
  const step = Math.max(0,Number(dt) || 0);
  state.roamPause = Math.max(0,state.roamPause - step);
  let startedFall = false;
  let landed = false;

  if (state.roamPause <= 0) {
    const nextX = roamingClamp(state.roamX + Math.sign(state.roamDir) * speed * step,90,Math.max(90,zoneWidth - 90));
    const nextFloor = getFloor(nextX);
    const reachedRange = Math.abs(nextX - originX) >= range;
    const blockedByRise = nextFloor < state.roamY - 18;
    const reachedBoundary = nextX <= 91 || nextX >= zoneWidth - 91;
    if (reachedRange || blockedByRise || reachedBoundary) {
      state.roamDir *= -1;
      state.roamPause = 24;
    } else {
      state.roamDistance += Math.abs(nextX - state.roamX);
      state.roamX = nextX;
    }
  }

  const ground = getFloor(state.roamX);
  if (state.roamGrounded && ground > state.roamY + 2) {
    state.roamGrounded = false;
    state.roamVY = Math.max(.8,state.roamVY);
    startedFall = true;
  }
  if (state.roamGrounded) {
    state.roamY = ground;
    state.roamVY = 0;
  } else {
    state.roamVY = Math.min(maxFallSpeed,state.roamVY + gravity * step);
    state.roamY += state.roamVY * step;
    if (state.roamY >= ground) {
      state.roamY = ground;
      state.roamVY = 0;
      state.roamGrounded = true;
      landed = true;
    }
  }

  return {
    x:state.roamX,
    y:state.roamY,
    grounded:state.roamGrounded,
    startedFall,
    landed
  };
}

  // ── systems/garen-effects.js ──
const GAREN_EFFECT_PROFILES = {
  shield: { color:"#4f7392",accent:"#dff5ff",telegraph:"#9cc8e4",tier:4 },
  dash: { color:"#9d2638",accent:"#ffd27d",telegraph:"#df6d65",tier:4 },
  spear: { color:"#7f3445",accent:"#ffe0a3",telegraph:"#d99a79",tier:4 },
  spearStorm: { color:"#a22636",accent:"#ffbe72",telegraph:"#ef7464",tier:5 },
  slam: { color:"#8d3b31",accent:"#ffd08a",telegraph:"#e59a62",tier:4 },
  oath: { color:"#7b1830",accent:"#ffdf96",telegraph:"#e65d68",tier:5 }
};

function garenEffectProfile(pattern = "dash",rage = false) {
  const base = GAREN_EFFECT_PROFILES[pattern] || GAREN_EFFECT_PROFILES.dash;
  if (!rage) return { ...base,pattern,rage:false };
  return {
    ...base,
    pattern,
    rage:true,
    tier:Math.max(5,base.tier),
    color:pattern === "shield" ? "#74445d" : "#bd2339",
    accent:"#fff0a3",
    telegraph:"#ff6a70"
  };
}

  // ── world/regions/index.js ──
const WORLD_REGIONS = {
  duskvale: {
    name: "Duskvale",
    theme: "노을빛 변경 마을",
    zones: ["village", "elderHill", "elderHouse", "outskirts1", "castleApproach", "castleHall"]
  },
  amberwild: {
    name: "Amberwild",
    theme: "황금 들판과 방랑자의 길",
    zones: ["outskirts1", "outskirts2"]
  },
  ashenMarch: {
    name: "Ashen March",
    theme: "몰락한 왕도와 재의 성채",
    zones: ["bossArena", "dungeon"]
  },
  futureRoutes: {
    name: "Beyond Emberfall",
    theme: "월광림·태양첨탑·빙설풍 협곡 확장 경로",
    zones: ["moonbriar", "sunspire", "frostwind"]
  }
  ,moonbriar: { name:"Moonbriar",theme:"달빛 숲과 예언자의 마을",zones:["moonbriarForest","moonbriarVillage"] }
  ,sunspire: { name:"Sunspire",theme:"태양 고개와 황금 첨탑 도시",zones:["sunspirePass","sunspireTown"] }
};

  // ── render/intro-cinematic.js ──
function introClamp(value,min = 0,max = 1) {
  return Math.max(min,Math.min(max,value));
}

function introEase(value) {
  const t = introClamp(value);
  return t * t * (3 - 2 * t);
}

function introPx(ctx,x,y,w,h,color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)));
}

function introGradient(ctx,x0,y0,x1,y1,stops) {
  const gradient = ctx.createLinearGradient(x0,y0,x1,y1);
  stops.forEach(([offset,color]) => gradient.addColorStop(offset,color));
  return gradient;
}

function introGlow(ctx,x,y,radius,color,alpha = 1) {
  const gradient = ctx.createRadialGradient(x,y,0,x,y,radius);
  gradient.addColorStop(0,color);
  gradient.addColorStop(.35,color);
  gradient.addColorStop(1,"rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius,y - radius,radius * 2,radius * 2);
  ctx.restore();
}

function introHills(ctx,baseY,color,offset,amplitude,step = 150) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,540);
  ctx.lineTo(0,baseY);
  for (let x=0;x<=1020;x+=step) {
    const peak = baseY - amplitude * (.45 + .55 * Math.abs(Math.sin((x + offset) * .009)));
    ctx.lineTo(x + step * .48,peak);
    ctx.lineTo(x + step,baseY + Math.sin((x + offset) * .017) * 11);
  }
  ctx.lineTo(1020,540);
  ctx.closePath();
  ctx.fill();
}

function introCloud(ctx,x,y,scale,color,alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  introPx(ctx,x,y,88 * scale,15 * scale,color);
  introPx(ctx,x + 18 * scale,y - 12 * scale,51 * scale,18 * scale,color);
  introPx(ctx,x + 34 * scale,y - 21 * scale,28 * scale,20 * scale,color);
  ctx.restore();
}

function introFlame(ctx,x,y,scale,time,index = 0) {
  const sway = Math.sin(time * .006 + index * 1.7) * 3 * scale;
  introGlow(ctx,x,y - 16 * scale,34 * scale,"rgba(255,93,38,.42)",.75);
  ctx.fillStyle = "#8e2736";
  ctx.beginPath();
  ctx.moveTo(x - 9 * scale,y);
  ctx.lineTo(x - 5 * scale + sway,y - 24 * scale);
  ctx.lineTo(x + sway * .4,y - 14 * scale);
  ctx.lineTo(x + 5 * scale + sway,y - 36 * scale);
  ctx.lineTo(x + 10 * scale,y);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff7a3d";
  ctx.beginPath();
  ctx.moveTo(x - 5 * scale,y);
  ctx.lineTo(x + sway * .45,y - 23 * scale);
  ctx.lineTo(x + 6 * scale,y);
  ctx.closePath();
  ctx.fill();
  introPx(ctx,x - 2 * scale,y - 9 * scale,4 * scale,9 * scale,"#ffd36a");
}

function introSword(ctx,x,y,scale,angle,color = "#e8d7c1") {
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(angle);
  introPx(ctx,-2 * scale,-39 * scale,4 * scale,39 * scale,color);
  introPx(ctx,-1 * scale,-47 * scale,2 * scale,8 * scale,"#fff1c9");
  introPx(ctx,-8 * scale,-3 * scale,16 * scale,3 * scale,"#d29a57");
  introPx(ctx,-2.5 * scale,0,5 * scale,11 * scale,"#6c3b3c");
  ctx.restore();
}

function introHuman(ctx,x,ground,scale,face = 1,pose = 0,colors = {}) {
  const armor = colors.armor || "#8793a5";
  const cloth = colors.cloth || "#8e4054";
  const skin = colors.skin || "#d9a27b";
  const weaponAngle = Number.isFinite(colors.weaponAngle)
    ? colors.weaponAngle
    : .42 + Math.sin(pose * .7) * .2;
  const weaponScale = Number.isFinite(colors.weaponScale) ? colors.weaponScale : 1;
  ctx.save();
  ctx.translate(x,ground);
  ctx.scale(face * scale,scale);
  const stride = Math.sin(pose) * 5;
  introPx(ctx,-11,-21 + Math.max(0,stride),8,21,"#353949");
  introPx(ctx,3,-21 + Math.max(0,-stride),8,21,"#303442");
  introPx(ctx,-13,-50,26,31,cloth);
  introPx(ctx,-10,-55,20,27,armor);
  introPx(ctx,-15,-52,5,16,"#b8a786");
  introPx(ctx,10,-52,5,17,armor);
  introPx(ctx,-9,-70,18,16,skin);
  introPx(ctx,-11,-72,22,7,"#656d7e");
  introPx(ctx,-12,-77,20,6,"#4a5262");
  introPx(ctx,3,-66,3,2,"#2b2730");
  if (colors.weapon !== false) {
    introSword(ctx,13,-42,weaponScale,weaponAngle,colors.sword || "#efe1c5");
  }
  ctx.restore();
}

function introDemon(ctx,x,ground,scale,face = -1,pose = 0,alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x,ground);
  ctx.scale(face * scale,scale);
  const pulse = Math.sin(pose) * 2;
  introPx(ctx,-13,-29,10,29,"#321d32");
  introPx(ctx,4,-29,10,29,"#281829");
  introPx(ctx,-18,-62 + pulse,36,36,"#57203b");
  introPx(ctx,-13,-72 + pulse,26,18,"#6f2945");
  ctx.fillStyle = "#211323";
  ctx.beginPath();
  ctx.moveTo(-12,-70 + pulse);ctx.lineTo(-26,-91 + pulse);ctx.lineTo(-5,-79 + pulse);ctx.fill();
  ctx.beginPath();
  ctx.moveTo(12,-70 + pulse);ctx.lineTo(26,-91 + pulse);ctx.lineTo(5,-79 + pulse);ctx.fill();
  introPx(ctx,-8,-67 + pulse,5,3,"#ff594f");
  introPx(ctx,4,-67 + pulse,5,3,"#ff594f");
  introGlow(ctx,0,-58 + pulse,34,"rgba(207,35,68,.28)",.7);
  ctx.strokeStyle = "#bd3c54";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-15,-48);ctx.quadraticCurveTo(-35,-42,-42,-25);ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(15,-48);ctx.quadraticCurveTo(34,-38,44,-17);ctx.stroke();
  ctx.restore();
}

function introAngel(ctx,x,y,scale,time) {
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale,scale);
  const wing = 4 + Math.sin(time * .003) * 3;
  introGlow(ctx,0,-18,125,"rgba(255,231,146,.5)",1);
  ctx.fillStyle = "rgba(255,244,198,.82)";
  ctx.beginPath();
  ctx.moveTo(-10,-28);ctx.bezierCurveTo(-60,-90,-128,-74,-150,-16);
  ctx.bezierCurveTo(-100,-40,-65,4,-13,18);ctx.closePath();ctx.fill();
  ctx.beginPath();
  ctx.moveTo(10,-28);ctx.bezierCurveTo(60,-90,128,-74,150,-16);
  ctx.bezierCurveTo(100,-40,65,4,13,18);ctx.closePath();ctx.fill();
  for (let i=0;i<5;i++) {
    ctx.strokeStyle = `rgba(255,226,142,${.42 - i * .045})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-14,-20 + i * 7);
    ctx.quadraticCurveTo(-72 - i * 9,-58 + i * 2,-132 - wing,-21 + i * 9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(14,-20 + i * 7);
    ctx.quadraticCurveTo(72 + i * 9,-58 + i * 2,132 + wing,-21 + i * 9);
    ctx.stroke();
  }
  introPx(ctx,-17,-58,34,66,"#fff0bd");
  introPx(ctx,-12,-77,24,22,"#f7d6a0");
  introPx(ctx,-16,-82,32,7,"#fff5c9");
  ctx.strokeStyle = "#fff3b3";
  ctx.lineWidth = 4;
  ctx.beginPath();ctx.ellipse(0,-92,24,7,0,0,Math.PI * 2);ctx.stroke();
  ctx.restore();
}

function introKarmaRune(ctx,x,y,scale,time,alpha = 1) {
  const pulse = 1 + Math.sin(time * .007) * .08;
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale * pulse,scale * pulse);
  ctx.globalAlpha = alpha;
  introGlow(ctx,0,0,48,"rgba(228,32,62,.48)",1);
  ctx.strokeStyle = "#ff4059";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0,0,18,Math.PI * .18,Math.PI * 1.82);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-14,-13);ctx.lineTo(13,14);
  ctx.moveTo(14,-14);ctx.lineTo(-13,13);
  ctx.moveTo(0,-27);ctx.lineTo(0,-13);
  ctx.stroke();
  introPx(ctx,-3,-3,6,6,"#fff0c5");
  ctx.restore();
}

function introHouse(ctx,x,ground,scale,wall,roof,lit = true) {
  introPx(ctx,x,ground - 82 * scale,104 * scale,82 * scale,wall);
  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 12 * scale,ground - 82 * scale);
  ctx.lineTo(x + 52 * scale,ground - 128 * scale);
  ctx.lineTo(x + 116 * scale,ground - 82 * scale);
  ctx.closePath();
  ctx.fill();
  introPx(ctx,x + 43 * scale,ground - 46 * scale,22 * scale,46 * scale,"#4a3137");
  introPx(ctx,x + 13 * scale,ground - 60 * scale,20 * scale,21 * scale,lit ? "#f5b85f" : "#292835");
  introPx(ctx,x + 74 * scale,ground - 60 * scale,20 * scale,21 * scale,lit ? "#f5b85f" : "#292835");
  introPx(ctx,x + 17 * scale,ground - 58 * scale,3 * scale,17 * scale,"#8e5c45");
  introPx(ctx,x + 78 * scale,ground - 58 * scale,3 * scale,17 * scale,"#8e5c45");
}

function introTree(ctx,x,ground,scale,color = "#28333b") {
  introPx(ctx,x - 8 * scale,ground - 86 * scale,16 * scale,86 * scale,"#4b3337");
  introPx(ctx,x - 34 * scale,ground - 118 * scale,68 * scale,42 * scale,color);
  introPx(ctx,x - 26 * scale,ground - 151 * scale,54 * scale,51 * scale,color);
  introPx(ctx,x - 17 * scale,ground - 178 * scale,38 * scale,45 * scale,color);
}

function introDrawAshenWar(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#171523"],[.48,"#5a2839"],[1,"#d25b45"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,790,104,120,"rgba(255,91,52,.32)",.8);
  introHills(ctx,306,"#291d2c",20,108,170);
  introHills(ctx,340,"#3d2330",92,76,130);
  introCloud(ctx,75,92,1.25,"#29202f",.75);
  introCloud(ctx,615,67,1.6,"#2b202e",.68);
  introPx(ctx,0,356,w,184,"#241b27");
  for (let i=0;i<7;i++) introFlame(ctx,45 + i * 151,365,1 + i%2 * .25,time,i);
  for (let i=0;i<20;i++) {
    const sparkX = (i * 83 + time * (.018 + i%4 * .004)) % w;
    const sparkY = 330 - ((i * 37 + time * .04) % 180);
    introPx(ctx,sparkX,sparkY,i%5===0?3:2,i%5===0?5:3,i%3 ? "#ff8b48" : "#ffd06a");
  }
  introHuman(ctx,138,381,1.05,1,time * .012,{cloth:"#7b4250"});
  introHuman(ctx,235,385,.92,1,time * .014 + 1.4,{armor:"#9ca7b4"});
  introHuman(ctx,326,382,1.12,1,time * .011 + 2.3,{cloth:"#5f526e"});
  introHuman(ctx,410,382,1.08,1,time * .016,{armor:"#a2a8b2",cloth:"#70404d",weaponAngle:.78});
  introDemon(ctx,830,386,1.18,-1,time * .01,.98);
  introDemon(ctx,733,382,.96,-1,time * .013 + 2,.94);
  introDemon(ctx,638,384,1.08,-1,time * .012 + 4,.95);
  introDemon(ctx,525,384,1.05,-1,time * .016 + 1,.98);
  ctx.save();
  ctx.globalAlpha = .36 + Math.sin(time * .012) * .12;
  introGlow(ctx,466,309,74,"rgba(255,222,151,.76)",1);
  for (let spark=0;spark<12;spark++) {
    const angle = spark / 12 * Math.PI * 2 + Math.sin(time * .001 + spark) * .08;
    const radius = 10 + ((time * .018 + spark * 11) % 34);
    const size = spark%4 === 0 ? 3 : 2;
    introPx(
      ctx,
      466 + Math.cos(angle) * radius,
      309 + Math.sin(angle) * radius,
      size,size,
      spark%3 ? "#ffd991" : "#fff1bf"
    );
  }
  ctx.restore();
}

function introDrawAngelicGrace(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#17182b"],[.52,"#3d3852"],[1,"#9d6957"]]);
  ctx.fillRect(0,0,w,h);
  introHills(ctx,342,"#252338",35,85,170);
  introPx(ctx,0,367,w,173,"#262333");
  const descend = introEase(introClamp(p * 2.2));
  introAngel(ctx,480,115 + (1 - descend) * -90,1.05,time);
  for (let ray=0;ray<7;ray++) {
    const x = 245 + ray * 78;
    ctx.save();
    ctx.globalAlpha = .08 + .11 * Math.sin(time * .002 + ray) ** 2;
    ctx.fillStyle = "#ffe69a";
    ctx.beginPath();
    ctx.moveTo(480 + (ray - 3) * 18,120);
    ctx.lineTo(x - 38,367);
    ctx.lineTo(x + 38,367);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  [238,330,420].forEach((x,i) => introHuman(ctx,x,389,.95,1,time * .004 + i,{armor:"#aab4bd",cloth:"#705264"}));
  [760,840,900].forEach((x,i) => introDemon(ctx,x + p * 55,386,.92,-1,time * .006 + i,1 - p * .65));
  introGlow(ctx,480,319,190,"rgba(255,221,133,.18)",.8);
  for (let i=0;i<18;i++) {
    const x = 190 + (i * 41) % 590;
    const y = 330 - ((time * .025 + i * 29) % 210);
    introPx(ctx,x,y,2,5,i%3 ? "#ffe9aa" : "#fff7d2");
  }
}

function introDrawKarmaSeed(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,w,h,[[0,"#110d18"],[.55,"#281528"],[1,"#4d202e"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,255,242,235,"rgba(125,24,53,.28)",1);
  ctx.save();
  ctx.translate(185,368);
  ctx.scale(2.65,2.65);
  introDemon(ctx,0,0,1,1,time * .008,1);
  ctx.restore();
  ctx.fillStyle = "#30142b";
  ctx.beginPath();
  ctx.moveTo(340,276);
  ctx.bezierCurveTo(430,235,465,248,530,294);
  ctx.lineTo(516,330);
  ctx.bezierCurveTo(450,302,405,309,344,338);
  ctx.closePath();
  ctx.fill();
  for (let finger=0;finger<4;finger++) {
    ctx.strokeStyle = "#7a2945";
    ctx.lineWidth = 8 - finger;
    ctx.beginPath();
    ctx.moveTo(490,298 + finger * 8);
    ctx.quadraticCurveTo(548 + finger * 5,272 + finger * 4,610,298 + finger * 2);
    ctx.stroke();
  }
  introHuman(ctx,716,407,1.55,-1,0,{armor:"#6d7180",cloth:"#544354"});
  const runeAlpha = introClamp((p - .18) * 3.2);
  introKarmaRune(ctx,716,323,1.25,time,runeAlpha);
  for (let i=0;i<12;i++) {
    const a = i / 12 * Math.PI * 2 + time * .0005;
    const radius = 38 + ((time * .025 + i * 13) % 120);
    ctx.save();ctx.globalAlpha = runeAlpha * (1 - radius / 190);
    introPx(ctx,716 + Math.cos(a) * radius,323 + Math.sin(a) * radius * .55,3,3,"#ef3d58");
    ctx.restore();
  }
  ctx.fillStyle = "rgba(233,63,82,.15)";
  ctx.fillRect(595,170,235,245);
}

function introDrawRedNight(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#160f1d"],[.58,"#5a2033"],[1,"#ad443a"]]);
  ctx.fillRect(0,0,w,h);
  introHills(ctx,310,"#221724",65,72,140);
  introHouse(ctx,55,390,.92,"#5a3a3a","#321d2c",false);
  introHouse(ctx,770,392,1.05,"#603c3b","#361d2b",false);
  introFlame(ctx,102,323,1.2,time,1);
  introFlame(ctx,851,309,1.35,time,2);
  introPx(ctx,0,389,w,151,"#231822");
  const aura = .7 + Math.sin(time * .005) * .12;
  introGlow(ctx,485,297,170,"rgba(41,8,39,.74)",aura);
  for (let ring=0;ring<4;ring++) {
    ctx.strokeStyle = `rgba(114,25,67,${.45 - ring * .08})`;
    ctx.lineWidth = 8 - ring;
    ctx.beginPath();
    ctx.ellipse(485,317,75 + ring * 22 + Math.sin(time * .004 + ring) * 7,112 + ring * 12,0,0,Math.PI * 2);
    ctx.stroke();
  }
  introHuman(ctx,485,402,1.55,1,time * .012,{armor:"#383443",cloth:"#321e35",skin:"#c58a72",sword:"#7d243e"});
  introKarmaRune(ctx,485,307,.76,time,1);
  introPx(ctx,476,294,5,3,"#ff4059");
  introPx(ctx,491,294,5,3,"#ff4059");
  for (const [x,y,face] of [[195,408,1],[277,414,-1],[675,410,1],[746,417,-1]]) {
    ctx.save();ctx.translate(x,y);ctx.rotate(face * .08);
    introPx(ctx,-30,-10,58,10,"#2b2330");
    introPx(ctx,20,-14,17,14,"#5c3540");
    ctx.restore();
  }
  for (let i=0;i<16;i++) {
    const x = (i * 67 + time * .021) % w;
    const y = 385 - ((i * 31 + time * .027) % 190);
    introPx(ctx,x,y,2 + i%3,3 + i%4,i%2 ? "#70263b" : "#db4b44");
  }
}

function introDrawMarked(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#171a25"],[.6,"#363242"],[1,"#71605d"]]);
  ctx.fillRect(0,0,w,h);
  introPx(ctx,0,102,w,18,"#252735");
  for (let x=0;x<w;x+=96) {
    introPx(ctx,x,70,66,32,"#2d3040");
    introPx(ctx,x + 13,41,40,29,"#343747");
  }
  introPx(ctx,0,384,w,156,"#292834");
  ctx.fillStyle = "rgba(230,210,174,.12)";
  ctx.beginPath();ctx.moveTo(480,0);ctx.lineTo(285,384);ctx.lineTo(675,384);ctx.closePath();ctx.fill();
  const prisoners = [250,340,430,520,610];
  prisoners.forEach((x,i) => {
    introHuman(ctx,x,395,.82,1,0,{armor:"#665b62",cloth:"#51404e",skin:"#bc8d74",weapon:false});
    introKarmaRune(ctx,x,340,.36,time + i * 220,1);
    introPx(ctx,x - 17,386,34,3,"#161821");
  });
  [105,185,755,835].forEach((x,i) => introHuman(ctx,x,397,1.02,i<2?1:-1,time * .003 + i,{armor:"#242b38",cloth:"#6e3344",skin:"#b98770",sword:"#d9d0b9"}));
  introPx(ctx,692,225,13,160,"#231c25");
  introPx(ctx,812,225,13,160,"#231c25");
  introPx(ctx,685,218,147,15,"#31252e");
  introPx(ctx,742,233,12,65,"#9b806d");
  introPx(ctx,755,233,12,65,"#9b806d");
  ctx.save();ctx.globalAlpha = .2 + Math.sin(time * .003) * .05;
  introGlow(ctx,480,328,190,"rgba(224,56,73,.24)",1);
  ctx.restore();
}

function introDrawFugitive(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#161c2b"],[.58,"#283848"],[1,"#755045"]]);
  ctx.fillRect(0,0,w,h);
  introGlow(ctx,770,122,70,"rgba(241,197,112,.27)",1);
  introHills(ctx,315,"#1c2633",time * .018,72,150);
  introHills(ctx,352,"#26313b",time * .032,54,110);
  for (let i=0;i<9;i++) introTree(ctx,70 + i * 125 - (time * .025 % 125),389,.72 + i%3 * .08,i%2 ? "#25363b" : "#2d3b40");
  introPx(ctx,0,389,w,151,"#24262d");
  introPx(ctx,0,405,w,8,"#4e4540");
  for (let i=0;i<8;i++) {
    const x = 84 + i * 121 - (time * .07 % 121);
    introPx(ctx,x,414,58,4,"#695747");
    introPx(ctx,x + 13,422,31,3,"#3b3535");
  }
  const heroBob = Math.abs(Math.sin(time * .014)) * 4;
  introHuman(ctx,535,397 - heroBob,1.17,1,time * .02,{
    armor:"#7c8795",cloth:"#7c4050",sword:"#e8d8bc",weaponAngle:-.82,weaponScale:1.12
  });
  introKarmaRune(ctx,535,325,.4,time,.72);
  [92,172,253].forEach((x,i) => {
    introHuman(ctx,x,401,1,1,time * .017 + i,{armor:"#343b49",cloth:"#633546",sword:"#c5bcaa"});
    introFlame(ctx,x - 18,346,.55,time,i);
  });
  for (let i=0;i<20;i++) {
    const x = (i * 61 - time * .09 + w * 2) % w;
    const y = 175 + (i * 43 % 205);
    introPx(ctx,x,y,i%4===0?5:3,2,i%2 ? "#80917d" : "#596b61");
  }
}

function introDrawDuskvale(ctx,p,time,w,h) {
  ctx.fillStyle = introGradient(ctx,0,0,0,h,[[0,"#493f69"],[.46,"#d17a68"],[.76,"#f2ad6c"],[1,"#5f493f"]]);
  ctx.fillRect(0,0,w,h);
  const sunX = 725;
  const sunY = 154;
  introGlow(ctx,sunX,sunY,120,"rgba(255,211,127,.42)",1);
  ctx.fillStyle = "#ffd488";
  ctx.beginPath();ctx.arc(sunX,sunY,34,0,Math.PI * 2);ctx.fill();
  introCloud(ctx,95,92,1.1,"#aa6e71",.62);
  introCloud(ctx,598,72,1.3,"#b97777",.48);
  introHills(ctx,300,"#443b51",30,95,180);
  introHills(ctx,342,"#5b4a4d",100,62,135);
  introPx(ctx,0,383,w,157,"#5a493d");
  introPx(ctx,0,399,w,12,"#86644d");
  introHouse(ctx,515,394,.92,"#8f6049","#5b3642",true);
  introHouse(ctx,700,397,1.05,"#91634d","#573543",true);
  introHouse(ctx,858,396,.74,"#87604e","#503441",true);
  introTree(ctx,455,395,.78,"#334746");
  introTree(ctx,930,395,.7,"#314342");
  introPx(ctx,340,254,16,141,"#49383a");
  introPx(ctx,452,254,16,141,"#49383a");
  introPx(ctx,326,245,156,17,"#65474a");
  introPx(ctx,365,267,12,128,"#302c35");
  introPx(ctx,430,267,12,128,"#302c35");
  introPx(ctx,377,267,53,9,"#5d4745");
  for (let y=285;y<370;y+=19) introPx(ctx,377,y,53,4,"#4c3d40");
  const arrival = introEase(introClamp((p - .08) * 1.45));
  const heroX = 70 + arrival * 285;
  introHuman(ctx,heroX,403,1.04,1,time * .012,{
    armor:"#7f8b98",cloth:"#7c4050",sword:"#e8d7bb",weaponAngle:-.82,weaponScale:1.08
  });
  [605,785,890].forEach((x,i) => introHuman(ctx,x,404,.68,i===1?-1:1,time * .003 + i,{
    armor:"#8d786f",cloth:i%2?"#6b5968":"#72514b",weapon:false
  }));
  for (let i=0;i<12;i++) {
    const x = (i * 91 + time * .012) % w;
    const y = 180 + Math.sin(time * .002 + i * 1.7) * 40 + i%3 * 43;
    introPx(ctx,x,y,3,2,i%2 ? "#d9a467" : "#80675a");
  }
  ctx.save();
  ctx.globalAlpha = introClamp((p - .72) * 3.4) * .35;
  ctx.fillStyle = "#fff0c2";
  ctx.fillRect(0,0,w,h);
  ctx.restore();
}

function introDrawCaption(ctx,state,scene,w,h) {
  const progress = introSceneProgress(state);
  const fadeIn = introEase(introClamp(state.sceneTime / 760));
  const fadeOut = introEase(introClamp((scene.duration - state.sceneTime) / 900));
  const opacity = Math.min(fadeIn,fadeOut);
  const panel = introGradient(ctx,0,350,0,h,[[0,"rgba(10,9,16,0)"],[.18,"rgba(12,10,18,.83)"],[1,"rgba(9,8,14,.98)"]]);
  ctx.fillStyle = panel;
  ctx.fillRect(0,340,w,200);
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.textAlign = "left";
  ctx.fillStyle = "#d59a63";
  ctx.font = "700 11px monospace";
  ctx.letterSpacing = "2px";
  ctx.fillText(scene.chapter,48,400);
  ctx.fillStyle = "#ffe2ae";
  ctx.font = "700 27px monospace";
  ctx.fillText(scene.title,48,435);
  scene.lines.forEach((line,index) => {
    const lineAlpha = introEase(introClamp((state.sceneTime - 1050 - index * 460) / 720));
    ctx.globalAlpha = opacity * lineAlpha;
    ctx.fillStyle = index ? "#c9bdc2" : "#ead8c4";
    ctx.font = "700 14px monospace";
    ctx.fillText(line,49,469 + index * 25);
  });
  ctx.globalAlpha = opacity;
  ctx.textAlign = "right";
  ctx.fillStyle = scene.style === "ingame" ? "#8ed3b5" : "#a99bb3";
  ctx.font = "700 9px monospace";
  ctx.fillText(scene.style === "ingame" ? "IN-GAME MEMORY" : "PIXEL ILLUSTRATION",w - 48,400);
  ctx.fillStyle = "#8e828f";
  ctx.fillText("ENTER · 다음     ` 콘솔에서 skip",w - 48,510);
  ctx.restore();
  const meterX = 48;
  const meterY = 527;
  const meterWidth = w - 96;
  introPx(ctx,meterX,meterY,meterWidth,2,"#342d3b");
  introPx(ctx,meterX,meterY,meterWidth * ((state.sceneIndex + progress) / INTRO_SCENES.length),2,"#d19761");
  for (let index=0;index<INTRO_SCENES.length;index++) {
    ctx.save();
    ctx.translate(w / 2 + (index - 3) * 18,24);
    ctx.rotate(Math.PI / 4);
    introPx(ctx,-3,-3,6,6,index <= state.sceneIndex ? "#e1ac6c" : "#534757");
    ctx.restore();
  }
  ctx.fillStyle = "#817483";
  ctx.textAlign = "right";
  ctx.font = "700 9px monospace";
  ctx.fillText(`${String(state.sceneIndex + 1).padStart(2,"0")} / ${String(INTRO_SCENES.length).padStart(2,"0")}`,w - 22,28);
}

function drawIntroCinematic(
  ctx,
  state,
  { width = 960,height = 540,now = 0 } = {}
) {
  const scene = introCurrentScene(state);
  const progress = introSceneProgress(state);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0,0,width,height);
  if (scene.id === "ashen-war") introDrawAshenWar(ctx,progress,now,width,height);
  else if (scene.id === "angelic-grace") introDrawAngelicGrace(ctx,progress,now,width,height);
  else if (scene.id === "karma-seed") introDrawKarmaSeed(ctx,progress,now,width,height);
  else if (scene.id === "red-night") introDrawRedNight(ctx,progress,now,width,height);
  else if (scene.id === "the-marked") introDrawMarked(ctx,progress,now,width,height);
  else if (scene.id === "the-fugitive") introDrawFugitive(ctx,progress,now,width,height);
  else introDrawDuskvale(ctx,progress,now,width,height);
  for (let x=0;x<width;x+=8) {
    ctx.fillStyle = x % 24 ? "rgba(255,255,255,.012)" : "rgba(0,0,0,.025)";
    ctx.fillRect(x,0,1,height);
  }
  ctx.fillStyle = "rgba(8,7,13,.78)";
  ctx.fillRect(0,0,width,12);
  ctx.fillRect(0,height - 8,width,8);
  introDrawCaption(ctx,state,scene,width,height);
  const sceneFade = Math.min(
    introEase(introClamp(state.sceneTime / 700)),
    introEase(introClamp((scene.duration - state.sceneTime) / 820))
  );
  ctx.fillStyle = `rgba(8,7,13,${1 - sceneFade})`;
  ctx.fillRect(0,0,width,height);
  ctx.restore();
}

  // ── render/gpu-renderer.js ──
function createRenderer(canvas, width, height) {
  const logical = typeof OffscreenCanvas !== "undefined"
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement("canvas"), { width, height });
  const ctx = logical.getContext("2d", { alpha: false, desynchronized: true });
  ctx.imageSmoothingEnabled = false;

  const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, powerPreference: "high-performance" });
  if (!gl) {
    const fallback = canvas.getContext("2d", { alpha: false, desynchronized: true });
    fallback.imageSmoothingEnabled = false;
    return { ctx: fallback, gpu: false, present() {} };
  }

  const vs = `#version 300 es
    in vec2 p; out vec2 uv;
    void main(){uv=(p+1.0)*0.5;gl_Position=vec4(p,0,1);}`;
  const fs = `#version 300 es
    precision mediump float; in vec2 uv; uniform sampler2D tex; out vec4 color;
    void main(){color=texture(tex,vec2(uv.x,1.0-uv.y));}`;
  const compile = (type, source) => {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(program); gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const location = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

  return {
    ctx, gpu: true,
    present() {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, logical);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  };
}

  // ── world/zones/village.js ──
const ZONE_VILLAGE = {
  id: "village", name: "DUSKVALE VILLAGE", subtitle: "황혼이 머무는 마을", width: 2300,
  cameraMinX: -180,
  playerMinX: -78,
  spawn: 150, safe: true, nightEnemies: [], npcs: NPCS.filter((npc) => npc.zone === "village"),
  platforms: [{ x: -180, y: 438, w: 2480, h: 102, kind: "village" }],
  enemies: [], crystals: [],
  secrets: [{ id: "village_well", x: 1010, reward: "mana_potion", label: "오래된 우물의 은닉물" }],
  props: [{ type: "well", x: 1010 },{ type: "crate", x: 365 },{ type: "barrel", x: 1325 },{ type: "flag", x: 2080 }],
  exits: [
    { x: -60, visualX: -60, target: "elderHill", spawn: 1320, label: "촌장의 노을 언덕으로" },
    { x: 2225, target: "outskirts1", spawn: 125, label: "Amberwild 초원으로" }
  ],
  adjacent: ["elderHill","outskirts1"]
};

  // ── world/regions/duskvale/elder-hill.js ──
const ZONE_ELDER_HILL = {
  id: "elderHill", name: "DUSKVALE SUNSET HILL", subtitle: "풍차와 묘지가 내려다보는 촌장의 언덕", width: 1500,
  spawn: 1320, safe: true, npcs: [],
  platforms: [
    { x:0,y:438,w:350,h:102,kind:"stone" },
    { x:350,y:405,w:370,h:135,kind:"grass" },
    { x:720,y:365,w:410,h:175,kind:"grass" },
    { x:1130,y:410,w:370,h:130,kind:"grass" }
  ],
  enemies: [], nightEnemies: [], crystals: [],
  secrets: [{ id:"elder_grave",x:465,reward:"high_potion",label:"오래된 기사 묘비" }],
  props: [
    {type:"grave",x:455,variant:0},
    {type:"grave",x:570,variant:1},
    {type:"elderHouse",x:820,houseX:755,width:250,windmillX:1035}
  ],
  landmarks: [
    {x:245,kind:"sealedCave",label:"봉인된 암벽 동굴 · 잠긴 철문"},
    {x:880,kind:"elderHouse",label:"촌장 에드윈의 집"}
  ],
  exits: [
    {x:-20,visualX:48,target:"castleApproach",spawn:2440,label:"암벽 터널 너머 · 고성 돌계단"},
    {x:880,target:"elderHouse",spawn:165,label:"촌장집으로 들어가기",kind:"door"},
    {x:1430,target:"village",spawn:55,label:"마을 광장으로 내려가기"}
  ],
  adjacent:["castleApproach","village","elderHouse"]
};

  // ── world/regions/duskvale/elder-house.js ──
const ZONE_ELDER_HOUSE = {
  id: "elderHouse", name: "THE ELDER'S HEARTH", subtitle: "촌장의 기록과 오래된 왕국 지도가 놓인 집", width: 960,
  spawn: 165, safe: true, npcs: NPCS.filter((npc) => npc.zone === "elderHouse"),
  platforms:[{x:0,y:438,w:960,h:102,kind:"wood"}],
  enemies:[],nightEnemies:[],crystals:[],secrets:[],
  props:[{type:"bookshelf",x:450},{type:"maptable",x:680},{type:"hearth",x:825}],
  exits:[{x:105,target:"elderHill",spawn:900,label:"언덕으로 나가기",kind:"door"}],
  adjacent:["elderHill"],interior:true
};

  // ── world/regions/duskvale/castle-approach.js ──
const ZONE_CASTLE_APPROACH = {
  id: "castleApproach",
  name: "CINDERKEEP ASCENT",
  subtitle: "구름 위 신더킵으로 치솟는 왕조의 대계단",
  width: 2670,
  spawn: 2440,
  safe: true,
  npcs: [],
  platforms: [
    { x:0,y:158,w:700,h:382,kind:"castleStone" },
    ...Array.from({ length:34 },(_,index) => ({
      x:700 + index * 54,
      y:166 + index * 8,
      w:56,
      h:374 - index * 8,
      kind:"castleStone"
    })),
    { x:2530,y:438,w:140,h:102,kind:"castleStone" }
  ],
  enemies: [],
  nightEnemies: [],
  crystals: [],
  secrets: [],
  props: [],
  exits: [
    { x:385,target:"castleHall",spawn:1250,label:"신더킵 대성문으로 들어가기",kind:"door" },
    { x:2550,target:"elderHill",spawn:38,label:"암벽 터널을 지나 촌장 언덕으로 돌아가기" }
  ],
  adjacent: ["elderHill","castleHall"]
};

  // ── world/regions/duskvale/castle-hall.js ──
const ZONE_CASTLE_HALL = {
  id: "castleHall",
  name: "CINDERKEEP GREAT HALL",
  subtitle: "주인을 잃은 왕좌와 오래된 맹세가 잠든 대전당",
  width: 1500,
  spawn: 1250,
  safe: true,
  interior: true,
  npcs: [],
  platforms: [
    { x:0,y:438,w:1500,h:102,kind:"castleInterior" },
    { x:85,y:408,w:430,h:132,kind:"castleInterior" },
    { x:145,y:378,w:300,h:162,kind:"castleInterior" }
  ],
  enemies: [],
  nightEnemies: [],
  crystals: [],
  secrets: [],
  props: [],
  exits: [
    { x:1390,target:"castleApproach",spawn:500,label:"대성문 밖 돌계단으로 나가기",kind:"door" }
  ],
  adjacent: ["castleApproach"]
};

  // ── world/regions/moonbriar/moonbriar-forest.js ──
const ZONE_MOONBRIAR_FOREST = {
  id:"moonbriarForest",name:"MOONBRIAR FOREST",subtitle:"달빛이 나뭇잎 아래 머무는 고대 숲",width:3200,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:700,h:102,kind:"moonGrass"},{x:700,y:410,w:550,h:130,kind:"moonGrass"},
    {x:1250,y:438,w:750,h:102,kind:"moonGrass"},{x:2000,y:395,w:550,h:145,kind:"moonStone"},
    {x:2550,y:438,w:650,h:102,kind:"moonGrass"},{x:560,y:302,w:140,h:18,kind:"wood"},
    {x:1170,y:275,w:145,h:18,kind:"moonStone"},{x:1900,y:285,w:150,h:18,kind:"wood"},{x:2480,y:250,w:145,h:18,kind:"moonStone"}
  ],
  enemies:[["moonstalker",420,438],["treant",820,410],["briarMage",1120,410],["moonstalker",1510,438],["treant",1840,438],["briarMage",2210,395],["moonstalker",2700,438],["treant",3000,438]],
  nightEnemies:[["ghost",980,410],["moonstalker",1760,438],["briarMage",2410,395]],
  crystals:[[270,390],[610,260],[910,360],[1210,235],[1460,390],[1910,245],[2140,345],[2510,210],[2810,390],[3070,390]],
  secrets:[{id:"moonbriar_hollow",x:1330,reward:"moon_charm",label:"은빛 고목의 빈 속"},{id:"moonbriar_altar",x:2470,reward:"moonblade",label:"달의 검 제단"}],
  props:[{type:"moonTree",x:330},{type:"moonTree",x:910},{type:"moonLantern",x:1260},{type:"moonTree",x:1750},{type:"moonObelisk",x:2240},{type:"moonTree",x:2860}],
  exits:[{x:42,target:"outskirts1",spawn:1510,label:"Amberwild 초원으로"},{x:3110,target:"moonbriarVillage",spawn:125,label:"Moonbriar 마을로"}],
  adjacent:["outskirts1","moonbriarVillage"]
};

  // ── world/regions/moonbriar/moonbriar-village.js ──
const ZONE_MOONBRIAR_VILLAGE = {
  id:"moonbriarVillage",name:"MOONBRIAR VILLAGE",subtitle:"달사슴의 종이 울리는 숲의 마을",width:2200,spawn:125,safe:true,npcs:NPCS.filter((npc)=>npc.zone==="moonbriarVillage"),
  platforms:[{x:0,y:438,w:2200,h:102,kind:"moonVillage"}],
  enemies:[],nightEnemies:[],crystals:[],
  secrets:[{id:"moonbriar_belfry",x:1550,reward:"mana_potion",label:"달 종탑의 숨은 서랍"}],
  props:[{type:"moonWell",x:920},{type:"moonLantern",x:510},{type:"moonLantern",x:1420},{type:"moonObelisk",x:1650}],
  exits:[{x:42,target:"moonbriarForest",spawn:3050,label:"월광림으로"},{x:2120,target:"sunspirePass",spawn:125,label:"태양 고개로"}],
  adjacent:["moonbriarForest","sunspirePass"]
};

  // ── world/regions/sunspire/sunspire-pass.js ──
const ZONE_SUNSPIRE_PASS = {
  id:"sunspirePass",name:"SUNSPIRE PASS",subtitle:"달의 숲을 떠나 태양 첨탑으로 향하는 붉은 고개",width:3000,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:620,h:102,kind:"sand"},{x:620,y:400,w:540,h:140,kind:"sandstone"},
    {x:1160,y:438,w:680,h:102,kind:"sand"},{x:1840,y:405,w:520,h:135,kind:"sandstone"},
    {x:2360,y:438,w:640,h:102,kind:"sand"},{x:520,y:290,w:140,h:18,kind:"wood"},
    {x:1090,y:255,w:150,h:18,kind:"sandstone"},{x:1770,y:275,w:150,h:18,kind:"wood"},{x:2300,y:245,w:150,h:18,kind:"sandstone"}
  ],
  enemies:[["sunscorpion",390,438],["duneRaider",790,400],["flameDjinn",1050,400],["sunscorpion",1370,438],["duneRaider",1690,438],["flameDjinn",2050,405],["sunscorpion",2510,438],["duneRaider",2800,438]],
  nightEnemies:[["ghost",920,400],["flameDjinn",1540,438],["duneRaider",2240,405]],
  crystals:[[250,390],[560,250],[800,350],[1130,215],[1330,390],[1790,235],[1990,355],[2340,205],[2600,390],[2880,390]],
  secrets:[{id:"sunspire_caravan",x:1180,reward:"high_potion",label:"모래에 파묻힌 대상단 궤짝"},{id:"sunspire_flame",x:2300,reward:"sunblade",label:"태양 불꽃 제단"}],
  props:[{type:"sunTent",x:480},{type:"sunPillar",x:980},{type:"palm",x:1480},{type:"sunTent",x:1980},{type:"sunPillar",x:2470}],
  exits:[{x:42,target:"moonbriarVillage",spawn:2050,label:"Moonbriar로 돌아가기"},{x:2910,target:"sunspireTown",spawn:125,label:"Sunspire 성문으로"}],
  adjacent:["moonbriarVillage","sunspireTown"]
};

  // ── world/regions/sunspire/sunspire-town.js ──
const ZONE_SUNSPIRE_TOWN = {
  id:"sunspireTown",name:"SUNSPIRE TOWN",subtitle:"황금 첨탑 아래 대상단이 모이는 태양의 도시",width:2300,spawn:125,safe:true,npcs:NPCS.filter((npc)=>npc.zone==="sunspireTown"),
  platforms:[{x:0,y:438,w:2300,h:102,kind:"sunVillage"}],
  enemies:[],nightEnemies:[],crystals:[],
  secrets:[{id:"sunspire_rooftop",x:1530,reward:"haste_potion",label:"태양 신전 지붕의 봉헌함"}],
  props:[{type:"sunFountain",x:1040},{type:"palm",x:470},{type:"palm",x:1590},{type:"sunPillar",x:1810}],
  exits:[{x:42,target:"sunspirePass",spawn:2840,label:"태양 고개로 돌아가기"}],
  adjacent:["sunspirePass"]
};

  // ── world/zones/outskirts1.js ──
const ZONE_OUTSKIRTS1 = {
  id: "outskirts1", name: "AMBERWILD OUTSKIRTS", subtitle: "마을 밖 1 · 야생 초원", width: 3050,
  spawn: 125, safe: false, npcs: NPCS.filter((npc) => npc.zone === "outskirts1"),
  platforms: [
    { x: 0, y: 438, w: 720, h: 102, kind: "grass" },
    { x: 810, y: 388, w: 510, h: 152, kind: "stone" },
    { x: 1400, y: 438, w: 710, h: 102, kind: "grass" },
    { x: 2190, y: 350, w: 470, h: 190, kind: "ruin" },
    { x: 2740, y: 438, w: 310, h: 102, kind: "grass" },
    { x: 650, y: 302, w: 135, h: 18, kind: "wood" },
    { x: 1260, y: 265, w: 145, h: 18, kind: "wood" },
    { x: 2050, y: 250, w: 145, h: 18, kind: "stone" }
  ],
  enemies: [["slime",430,438],["wolf",650,438],["bandit",980,388],["slime",1530,438],["wolf",1840,438],["bandit",2350,350],["guard",2860,438]],
  nightEnemies: [["ghost",1180,388],["skeleton",1980,438]],
  crystals: [[260,390],[690,260],[930,340],[1290,225],[1510,390],[1980,390],[2100,210],[2300,300],[2850,390]],
  secrets: [{ id: "amber_cart", x: 760, reward: "twilight_sword", label: "뒤집힌 수레의 비밀 상자" },{ id: "amber_tree", x: 2120, reward: "high_potion", label: "속이 빈 고목" }],
  props: [{ type: "crate", x: 510 },{ type: "barrel", x: 1010 },{ type: "puddle", x: 1640 },{ type: "flag", x: 2350 },{ type: "grass", x: 2800 }],
  exits: [{ x: 42, target: "village", spawn: 2130, label: "마을로 돌아가기" },{x:1580,target:"moonbriarForest",spawn:125,label:"Moonbriar 월광 성문으로"},{ x: 2960, target: "outskirts2", spawn: 125, label: "버려진 왕도로" }],
  adjacent: ["village","moonbriarForest","outskirts2"]
};

  // ── world/zones/outskirts2.js ──
const ZONE_OUTSKIRTS2 = {
  id: "outskirts2", name: "BROKEN ROYAL ROAD", subtitle: "마을 밖 2 · 버려진 왕도", width: 3420,
  spawn: 125, safe: false, npcs: NPCS.filter((npc) => npc.zone === "outskirts2"),
  platforms: [
    { x:0,y:438,w:620,h:102,kind:"ruin" },{ x:710,y:360,w:470,h:180,kind:"stone" },
    { x:1260,y:438,w:650,h:102,kind:"ruin" },{ x:1990,y:335,w:520,h:205,kind:"stone" },
    { x:2600,y:438,w:820,h:102,kind:"ruin" },{ x:530,y:270,w:150,h:18,kind:"stone" },
    { x:1170,y:245,w:140,h:18,kind:"wood" },{ x:1880,y:240,w:150,h:18,kind:"stone" },
    { x:2480,y:225,w:160,h:18,kind:"stone" }
  ],
  enemies: [["skeleton",420,438],["bandit",900,360],["guard",1080,360],["mage",2110,335],["guard",2390,335],["skeleton",2750,438],["hunter",3100,438]],
  nightEnemies: [["ghost",1120,360],["ghost",2400,335]],
  crystals: [[280,390],[580,230],[820,310],[1200,205],[1420,390],[1880,200],[2120,285],[2520,185],[2800,390],[3220,390]],
  secrets: [{ id: "royal_crypt", x: 1870, reward: "royal_sword", label: "무너진 왕실 묘실" },{ id: "road_shrine", x: 2640, reward: "stamina_potion", label: "잊힌 길가 제단" }],
  props: [{ type: "barrel", x: 440 },{ type: "flag", x: 840 },{ type: "crate", x: 1510 },{ type: "woundedKnightTree", x: 1648 },{ type: "puddle", x: 2200 },{ type: "crate", x: 2920 }],
  exits: [{ x:42,target:"outskirts1",spawn:2870,label:"Amberwild 초원으로" },{ x:3330,target:"bossArena",spawn:150,label:"재의 다리 보스 지역" }],
  adjacent: ["outskirts1","bossArena"]
};

  // ── world/zones/boss-arena.js ──
const ZONE_BOSS_ARENA = {
  id:"bossArena",name:"THE ASHEN BRIDGE",subtitle:"보스 지역 · 재의 수문장",width:1800,spawn:150,safe:false,npcs:[],
  platforms:[{x:0,y:438,w:1800,h:102,kind:"bridge"}],
  enemies:[["warden",1180,438]],nightEnemies:[],crystals:[],
  secrets:[{id:"bridge_ashes",x:890,reward:"high_potion",label:"재더미 속 기사 가방"}],
  props:[{type:"flag",x:350},{type:"barrel",x:690},{type:"flag",x:1460}],
  exits:[{x:42,target:"outskirts2",spawn:3250,label:"버려진 왕도로 후퇴"},{x:1710,target:"dungeon",spawn:125,label:"폐허 던전으로"}],
  adjacent:["outskirts2","dungeon"],boss:"warden"
};

  // ── world/zones/dungeon.js ──
const ZONE_DUNGEON = {
  id:"dungeon",name:"EMBERFALL CATACOMBS",subtitle:"폐왕의 지하 묘지",width:3100,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:650,h:102,kind:"dungeon"},{x:735,y:370,w:470,h:170,kind:"dungeon"},
    {x:1285,y:438,w:610,h:102,kind:"dungeon"},{x:1985,y:340,w:510,h:200,kind:"dungeon"},
    {x:2580,y:438,w:520,h:102,kind:"dungeon"},{x:560,y:285,w:140,h:18,kind:"stone"},
    {x:1180,y:250,w:140,h:18,kind:"stone"},{x:1860,y:258,w:150,h:18,kind:"stone"},{x:2450,y:235,w:150,h:18,kind:"stone"}
  ],
  enemies:[["skeleton",430,438],["ghost",920,370],["guard",1500,438],["mage",1760,438],["guard",2180,340],["skeleton",2700,438],["lich",2920,438]],
  nightEnemies:[],crystals:[[310,390],[610,245],[870,320],[1220,210],[1410,390],[1830,390],[1900,218],[2110,290],[2500,195],[2700,390]],
  secrets:[{id:"catacomb_reliquary",x:1210,reward:"wraith_sword",label:"봉인된 성물함"},{id:"lich_archive",x:2480,reward:"memory_potion",label:"리치의 금서고"}],
  props:[{type:"crate",x:360},{type:"barrel",x:1080},{type:"puddle",x:1600},{type:"barrel",x:2310},{type:"flag",x:2820}],
  exits:[{x:42,target:"bossArena",spawn:1640,label:"재의 다리로 돌아가기"}],adjacent:["bossArena"]
};

  // ── world/zone-loader.js ──
const routes = {
  village: () => Promise.resolve({ default: ZONE_VILLAGE }),
  elderHill: () => Promise.resolve({ default: ZONE_ELDER_HILL }),
  elderHouse: () => Promise.resolve({ default: ZONE_ELDER_HOUSE }),
  castleApproach: () => Promise.resolve({ default: ZONE_CASTLE_APPROACH }),
  castleHall: () => Promise.resolve({ default: ZONE_CASTLE_HALL }),
  moonbriarForest: () => Promise.resolve({ default: ZONE_MOONBRIAR_FOREST }),
  moonbriarVillage: () => Promise.resolve({ default: ZONE_MOONBRIAR_VILLAGE }),
  sunspirePass: () => Promise.resolve({ default: ZONE_SUNSPIRE_PASS }),
  sunspireTown: () => Promise.resolve({ default: ZONE_SUNSPIRE_TOWN }),
  outskirts1: () => Promise.resolve({ default: ZONE_OUTSKIRTS1 }),
  outskirts2: () => Promise.resolve({ default: ZONE_OUTSKIRTS2 }),
  bossArena: () => Promise.resolve({ default: ZONE_BOSS_ARENA }),
  dungeon: () => Promise.resolve({ default: ZONE_DUNGEON })
};

class ZoneLoader {
  constructor() { this.cache = new Map(); }
  async load(id) {
    if (this.cache.has(id)) {
      const value = this.cache.get(id);
      this.cache.delete(id); this.cache.set(id, value);
      return structuredClone(value);
    }
    const module = await routes[id]();
    this.cache.set(id, module.default);
    while (this.cache.size > 2) this.cache.delete(this.cache.keys().next().value);
    return structuredClone(module.default);
  }
  preload(id) { if (routes[id] && !this.cache.has(id)) routes[id]().then((m) => { this.cache.set(id, m.default); while (this.cache.size > 2) this.cache.delete(this.cache.keys().next().value); }); }
  get cachedZones() { return [...this.cache.keys()]; }
}

  // ── main.js ──
const canvas = document.getElementById("game2-canvas");
const shell = document.querySelector(".game2-shell");
const wrap = document.querySelector(".game2-canvas-wrap");
const $ = (id) => document.getElementById(id);
const renderer = createRenderer(canvas, canvas.width, canvas.height);
const ctx = renderer.ctx;
const W = canvas.width;
const H = canvas.height;
const STEP = 1000 / 60;
const MAX_FIXED_STEPS = 6;
const keys = new Set();
const loader = new ZoneLoader();
const saves = new SaveManager();
const particles = new ObjectPool(260);
const projectiles = new ObjectPool(120);
const floaters = new ObjectPool(80);
const hazards = new ObjectPool(72);
const combatEffects = new ObjectPool(180);
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const overlap = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const px = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
const inView = (x, w = 0, margin = 120) => x + w >= cameraX - margin && x <= cameraX + W + margin;
const renderX = (entity) => interpolated(entity, "x", renderAlpha);
const renderY = (entity) => interpolated(entity, "y", renderAlpha);
const enemyMotionScratch = {};
const playerAttackMotionScratch = {};
const playerAirMotionScratch = {};
const SPECIAL_EFFECT_MONSTERS = new Set(["mage","briarMage","ghost","treant","sunscorpion","flameDjinn","lich","judge"]);
let runtimeErrors = 0;
let debugGodMode = false;
addEventListener("error", () => { runtimeErrors += 1; });
addEventListener("unhandledrejection", () => { runtimeErrors += 1; });

const dom = {
  overlay: $("g2-overlay"), overlayTitle: $("g2-overlay-title"), overlayCopy: $("g2-overlay-copy"),
  start: $("g2-start"), newGame: $("g2-new-game"), transition: $("g2-transition"), upgrades: $("g2-upgrades"), hp: $("g2-hp"), hpBar: $("g2-hp-bar"),
  level: $("g2-level"), xpBar: $("g2-xp-bar"), atk: $("g2-atk"), gold: $("g2-score"),
  time: $("g2-time"), karma: $("g2-karma"), mana: $("g2-mana"), manaBar: $("g2-mana-bar"),
  stamina: $("g2-stamina"), staminaBar: $("g2-stamina-bar"), mapCode: $("g2-map-code"), mapTime: $("g2-map-time"), hostile: $("g2-hostile"),
  hotbar: $("g2-hotbar"), sound: $("g2-sound"), stats: $("g2-stats-toggle"),
  inventory: $("g2-inventory-toggle"), save: $("g2-save-toggle"), fullscreen: $("g2-fullscreen"),
  minimap: $("g2-minimap"), minimapToggle: $("g2-minimap-toggle"), resourceHud: $("g2-resource-hud"),
  panel: $("g2-panel"), panelKicker: $("g2-panel-kicker"), panelTitle: $("g2-panel-title"),
  panelBody: $("g2-panel-body"), panelClose: $("g2-panel-close")
  , console: $("g2-console"), consoleOutput: $("g2-console-output"), consoleInput: $("g2-console-input"),
  consoleClose: $("g2-console-close")
};

const basePlayer = () => ({
  x: 150, y: 300, prevX: 150, prevY: 300, w: 36, h: 68, vx: 0, vy: 0, grounded: false, face: 1,
  hp: 8, maxHp: 8, mana: 100, maxMana: 100, stamina: 100, maxStamina: 100,
  level: 1, xp: 0, xpNeed: 90, statPoints: 0,
  stats: { attack: 0, health: 0, defense: 0, magic: 0, speed: 0 },
  attackPower: 2, defense: 0, magicPower: 0, moveSpeed: 3.9, jump: 12.2,
  counts: { ...DEFAULT_COUNTS }, owned: { rusty_sword: true, cloth: true },
  equipped: { weapon: "rusty_sword", armor: "cloth", accessory: null },
  ownedSkills: { ember_slash: true, iron_guard: true, warrior_blessing: true, sunset_execution: true },
  skillSlots: [...DEFAULT_SKILL_SLOTS], itemSlots: [...DEFAULT_ITEM_SLOTS],
  cooldowns: {}, karma: 0, kills: 0, crystals: 0, questKills: 0, questClaimed: false,
  explored: {}, foundSecrets: {}, completedEvents: {}, collectedCrystals: {},
  attackTimer: 0, prevAttackTimer: 0, attackCooldown: 0, attackSerial: 0, invincible: 0,
  crossSlashTimer: 0, prevCrossSlashTimer: 0, crossSlashDuration: 24,
  attackCombo: 0, attackDuration: 18, comboWindow: 0, attackQueued: false,
  guardTimer: 0, parryTimer: 0, chargeTimer: 0, transformTimer: 0, haste: 0, runFrame: 0, prevRunFrame: 0,
  sprinting: false, sprintRegenDelay: 0, exhausted: 0, lastDustFrame: -1
  , blessing: { timer: 0, cast: 0, variant: "warrior" }, auraFrame: 0, corruptionTrail: [],
  fallRescues: 0, wallBlocked: false, karmaContactHits: 0,
  airTime: 0, landTimer: 0, jumpSquash: 0
});

let player = basePlayer();
const minimap = new MinimapRenderer(dom.minimap, dom.minimapToggle);
let clock = new WorldClock();
let state = "ready";
let panelType = null;
let pendingStats = null;
let activeNpc = null;
let activeShop = null;
let currentZoneId = "village";
let zone = null;
let platforms = [];
let enemies = [];
let crystals = [];
let pickups = [];
let zoneSecrets = [];
let worldEvent = null;
let weatherId = "clear";
let npcStates = {};
let worldStates = mergeWorldStates();
let bosses = { warden: false, lich: false, judge: false };
let gold = 200;
let cameraX = 0;
let previousCameraX = 0;
let renderCameraX = 0;
let cameraY = 0;
let previousCameraY = 0;
let renderCameraY = 0;
let cameraTargetY = 0;
let renderAlpha = 1;
let interaction = null;
let attackNpcEnabled = false;
let villageAggro = false;
let soundOn = true;
let audioContext = null;
let stageBanner = 180;
let levelBanner = 0;
let screenShake = 0;
let hitStop = 0;
let autosaveNote = "";
let lastTime = performance.now();
let accumulator = 0;
let pausedByVisibility = false;
let loadToken = 0;
let booted = false;
let hotbarSignature = "";
let killsSinceDrop = 0;
let killsSincePickup = 99;
let transitionBusy = false;
let massacreBanner = 0;

function zonePlayerMinX(targetZone = zone) {
  return Number.isFinite(targetZone?.playerMinX) ? targetZone.playerMinX : 0;
}
let pursuitBanner = 0;
let zoneSpawnState = { total: 0, defeated: 0, cleared: false };
let consoleHistory = [];
let consoleHistoryIndex = 0;
let stateBeforeConsole = "running";
let hudTick = 0;
let metricWindowStart = performance.now();
let metricFrames = 0;
let metricFps = 60;
let metricFrameMs = STEP;
let metricLongFrames = 0;
let metricDroppedSteps = 0;
let metricDrawMs = 0;
let lastSkillDebug = { id:"none", tier:1, range:0, effectScale:1 };
let woundedKnightSpeech = 0;
let woundedKnightBanner = 0;
let woundedKnightBannerText = "";
const CEMETERY_THOUGHT_DURATION = 420;
let cemeteryThought = 0;
let introState = createIntroState();
let introRequiredOnStart = false;
let introCueScene = -1;
const ELDER_FIRE_DIALOGUE = Object.freeze([
  { text:"나는 네가 그럴 줄 알았다." },
  { text:"마음 한켠으로 너를 받아들여야 하나 고민했다." },
  { text:"너는…… 결국 악마가 맞았구나……" },
  { text:"내 너를 저주하며 이 집에서 죽어가겠다……", curse:true }
]);
const ELDER_CURSE_INTERVAL = 120;
let elderFireDialogueStep = 0;
let elderCurseTimer = ELDER_CURSE_INTERVAL;
let elderApproachGrace = 0;

function xpFor(level) {
  return Math.round(90 * Math.pow(1.32, level - 1));
}

function initNpcStates(saved = {}) {
  npcStates = {};
  for (const npc of NPCS) {
    npcStates[npc.id] = {
      alive: true, hp: npc.hp, deathDay: null, deathMinute: null,
      deathX: npc.x, deathZone: npc.zone, lootAvailable: true, flee: 0, hurt: 0, hostile: false,
      abyssHostile: false, roamX: npc.x, roamDir: npc.id.length % 2 ? 1 : -1,
      prevRoamX: npc.x, roamY: null, prevRoamY: null, roamVY: 0, roamGrounded: true,
      roamPause: 0, roamDistance: 0, ...(saved[npc.id] || {})
    };
  }
}

function zoneNpcs() {
  return zone?.npcs || [];
}

function villageMassacreComplete() {
  return villageCiviliansDefeated(VILLAGE_CIVILIAN_IDS, npcStates);
}

function garenAttackReady() {
  return guardRevengeReady(VILLAGE_CIVILIAN_IDS, npcStates);
}

function elderNpc() {
  return NPCS.find((npc) => npc.id === "elder");
}

function elderHouseBurning() {
  return elderHouseStage(worldStates,clock.day,clock.minute) === "burning";
}

function elderFireSceneAvailable() {
  return currentZoneId === "elderHouse"
    && elderHouseBurning()
    && !!worldStates.elderHouse.elderDoomed
    && !!npcStates.elder?.alive;
}

function elderFireVisualIntensity() {
  const fireProgress = houseBurnProgress(worldStates.elderHouse);
  const dialogueBoost = panelType === "elderFireDialogue"
    ? elderFireDialogueStep / Math.max(1,ELDER_FIRE_DIALOGUE.length - 1) * .32
    : worldStates.elderHouse.confronted ? .32 : 0;
  return clamp(.24 + fireProgress * .66 + dialogueBoost,.24,1);
}

function migrateLegacyBurningElder() {
  const house = worldStates.elderHouse;
  const ns = npcStates.elder;
  if (house.stage !== "burning" || !ns) return false;
  if (ns.alive) {
    house.elderDoomed = true;
    return true;
  }
  const legacyFireDeath = ns.hp > 0
    && ns.deathZone === "elderHouse"
    && ns.deathDay === house.fireDay
    && ns.deathMinute === house.fireMinute;
  if (!legacyFireDeath) return false;
  const npc = elderNpc();
  Object.assign(ns,{
    alive:true,hp:npc.hp,deathDay:null,deathMinute:null,deathX:npc.x,
    deathZone:npc.zone,lootAvailable:true,hostile:false,abyssHostile:false,
    burnX:npc.x,prevBurnX:npc.x,burnFace:-1
  });
  house.elderDoomed = true;
  house.confronted = false;
  house.dialogueStep = 0;
  house.curseActive = false;
  house.elderDiedInFire = false;
  return true;
}

function finalizeElderHouseBurn() {
  const house = worldStates.elderHouse;
  if (house.stage === "burned") return;
  house.stage = "burned";
  if (house.elderDoomed && !house.elderDiedInFire && npcStates.elder?.alive) {
    house.elderDiedInFire = true;
    const npc = elderNpc();
    const deathX = Number.isFinite(npcStates.elder.burnX) ? npcStates.elder.burnX : npc.x;
    killNpc(npc,deathX,"elderHouse",{
      message:"에드윈이 촌장집과 함께 불타 죽었습니다",
      floater:false
    });
  }
  autosave("촌장집이 폐허가 됨");
}

function currentHouseStage() {
  const stage = elderHouseStage(worldStates, clock.day, clock.minute);
  if (stage === "burned" && worldStates.elderHouse.stage !== "burned") {
    finalizeElderHouseBurn();
  }
  return stage;
}

function elderHouseEntranceX() {
  return zone?.exits?.find((exit) => exit.target === "elderHouse")?.x ?? 880;
}

function currentNpcHouseStage(ownerId) {
  const stage = houseFireStage(worldStates, ownerId, clock.day, clock.minute);
  const fire = worldStates.houseFires?.[ownerId];
  if (stage === "burned" && fire?.stage !== "burned") {
    fire.stage = "burned";
    autosave(`${ownerId}의 집이 폐허가 됨`);
  }
  return stage;
}

function npcWorldX(npc) {
  const ns = npcStates[npc.id];
  if (npc.id === "elder" && elderFireSceneAvailable() && Number.isFinite(ns?.burnX)) return ns.burnX;
  return npc.wander && Number.isFinite(ns?.roamX) ? ns.roamX : npc.x;
}

function npcRenderX(npc) {
  const ns = npcStates[npc.id];
  if (npc.id === "elder" && elderFireSceneAvailable() && Number.isFinite(ns?.burnX)) {
    return lerp(Number.isFinite(ns.prevBurnX) ? ns.prevBurnX : ns.burnX,ns.burnX,renderAlpha);
  }
  if (!npc.wander || !Number.isFinite(ns?.roamX)) return npc.x;
  return lerp(ns.prevRoamX, ns.roamX, renderAlpha);
}

function npcWorldFloor(npc) {
  const ns = npcStates[npc.id];
  if (npc.wander && Number.isFinite(ns?.roamY)) return ns.roamY;
  return floorAt(npcWorldX(npc));
}

function npcRenderFloor(npc) {
  const ns = npcStates[npc.id];
  if (!npc.wander || !Number.isFinite(ns?.roamY)) return floorAt(npcRenderX(npc));
  return lerp(ns.prevRoamY,ns.roamY,renderAlpha);
}

function spawnNpcDefender(npc, enraged = false) {
  if (!npc || enemies.some((enemy) => !enemy.dead && enemy.npcId === npc.id)) return null;
  if (npc.id === "guard" && !garenAttackReady()) {
    npcStates.guard.hostile = false;
    npcStates.guard.abyssHostile = false;
    return null;
  }
  if (npc.id === "guard") enraged = true;
  const type = enraged ? "captain" : npc.combatType || "villager";
  const spawnX = npcStates[npc.id]?.alive ? npcWorldX(npc) : npcStates[npc.id]?.deathX ?? npc.x;
  const defender = makeEnemy([type, spawnX, floorAt(spawnX)], false);
  defender.npcId = npc.id;
  defender.noLoot = true;
  defender.revenge = enraged;
  defender.homeX = defender.x;
  defender.patternTimer = enraged ? 80 : 130;
  defender.attackAnim = 0;
  if (!enraged) {
    defender.hp = defender.maxHp = Math.ceil(defender.maxHp * (npc.guard ? 1.65 : 1.35));
    defender.damage += npc.guard ? 3 : 2;
  }
  const npcHealthRatio = clamp((npcStates[npc.id]?.hp ?? npc.hp) / npc.hp, 0, 1);
  defender.hp = Math.max(1, Math.ceil(defender.maxHp * npcHealthRatio));
  enemies.push(defender);
  npcStates[npc.id].hostile = true;
  return defender;
}

function applyWorldHostility() {
  if (!worldHostile(player.karma) || !zone) return;
  for (const npc of zoneNpcs()) {
    const ns = npcStates[npc.id];
    if (!ns?.alive) continue;
    if (npc.id === "elder" && elderFireSceneAvailable()) {
      ns.hostile = false;
      ns.abyssHostile = false;
      enemies = enemies.filter((enemy) => enemy.npcId !== "elder");
      continue;
    }
    if (npc.id === "guard") {
      if (!garenAttackReady()) {
        ns.hostile = false;
        ns.abyssHostile = false;
      }
      continue;
    }
    ns.hostile = true;
    ns.abyssHostile = true;
    spawnNpcDefender(npc, npc.id === "guard" && worldStates.guardRevenge.triggered);
  }
}

function setKarma(value, reason = "카르마 변화") {
  const previous = player.karma || 0;
  player.karma = Math.max(0, Math.floor(Number(value) || 0));
  if (previous >= 1000 && player.karma < 1000) {
    const released = new Set();
    for (const [id, ns] of Object.entries(npcStates)) {
      if (!ns.abyssHostile) continue;
      ns.hostile = false;
      ns.abyssHostile = false;
      released.add(id);
    }
    enemies = enemies.filter((enemy) => !released.has(enemy.npcId));
    enemies = enemies.filter((enemy) => !enemy.pursuit);
    worldStates.pursuit = { thresholdDay:null,nextDay:null,pending:false,active:false,wave:0,defeated:worldStates.pursuit.defeated || 0 };
  }
  schedulePursuitForCurrentDay();
  if (previous < 500 && player.karma >= 500) toast("당신의 검은 이제 무고한 자를 구분하지 않습니다");
  if (previous < 1000 && player.karma >= 1000) {
    toast(garenAttackReady()
      ? "왕국의 모든 이가 당신을 적으로 선포했습니다"
      : "왕국이 당신을 적으로 선포했습니다 · 가렌은 마지막 주민이 쓰러질 때까지 성문을 지킵니다");
    player.invincible = Math.max(player.invincible, 240);
    applyWorldHostility();
  }
  unlockSkills(true);
  updateHud();
  if (booted) autosave(reason);
}

function schedulePursuitForCurrentDay() {
  return updatePursuitSchedule(worldStates.pursuit, player.karma, clock.day);
}

function spawnPursuitParty(force = false) {
  if (!zone || zone.interior || player.karma < 1000) return false;
  const pursuit = worldStates.pursuit;
  if (force) pursuit.pending = true;
  if (!pursuit.active && !beginPursuit(pursuit)) return false;
  if (enemies.some((enemy) => !enemy.dead && enemy.pursuit)) return true;
  const party = pursuitParty(player.level, player.karma);
  const pursuitScale = clamp(1 + Math.max(0, player.level - 1) * .055 + Math.max(0, pursuit.wave - 1) * .09 + Math.max(0, player.karma - 1000) / 4000, 1, 2.8);
  const side = player.x < zone.width / 2 ? 1 : -1;
  party.units.forEach((type, index) => {
    const x = clamp(player.x + side * (520 + index * 64), 45, zone.width - 90);
    const spawnId = `pursuit:wave:${pursuit.wave}:unit:${index}:${type}`;
    const enemy = makePersistentEnemy([type, x, floorAt(x)], spawnId, clock.isNight);
    if (!enemy) return;
    enemy.hp = enemy.maxHp = Math.ceil(enemy.maxHp * pursuitScale);
    enemy.damage = Math.ceil(enemy.damage * Math.min(2.1, .9 + pursuitScale * .28));
    enemy.speed *= Math.min(1.35, .95 + pursuitScale * .08);
    enemy.pursuit = true;
    enemy.homeX = x;
    enemy.patternTimer = 80 + index * 18;
    enemies.push(enemy);
  });
  if (!enemies.some((enemy) => enemy.pursuit && !enemy.dead)) {
    checkPursuitDefeated();
    return false;
  }
  pursuitBanner = 300;
  toast(`${party.name}이 당신의 흔적을 찾아냈습니다`);
  autosave("왕국 추적대 출현");
  return true;
}

function checkPursuitDefeated() {
  const pursuit = worldStates.pursuit;
  if (!pursuit.active || enemies.some((enemy) => enemy.pursuit && !enemy.dead)) return;
  finishPursuit(pursuit, clock.day);
  if (Math.random() < .12) {
    player.owned.royal_insignia = true;
    toast("추적대 격파 · 왕실 인장을 발견했습니다");
  } else toast(`추적대 격파 · 다음 추적 예상 DAY ${pursuit.nextDay}`);
  autosave("왕국 추적대 격파");
}

function triggerGuardRevenge() {
  if (!garenAttackReady() || worldStates.guardRevenge.defeated) return;
  if (!worldStates.guardRevenge.triggered) {
    worldStates.guardRevenge.triggered = true;
    massacreBanner = 330;
    villageAggro = true;
    autosave("경비대장의 최후 맹세");
  }
  if (currentZoneId === "village") spawnNpcDefender(NPCS.find((npc) => npc.id === "guard"), true);
}

function itemStat(slot, stat) {
  const id = player.equipped[slot];
  return ITEMS[id]?.[stat] || 0;
}

function equippedWeaponVisual() {
  return weaponVisual(player.equipped.weapon);
}

function equippedArmorVisual() {
  return armorVisual(player.equipped.armor);
}

function equipmentArtMarkup(id, item, wrapperClass = "game2-item-icon") {
  const visual = equipmentVisual(id,item.type);
  if (!visual) {
    const glyph = item.type === "accessory" ? "✦" : item.type === "consumable" || item.type === "reset" ? "♥" : "◆";
    return `<span class="${wrapperClass} ${item.type}">${glyph}</span>`;
  }
  const design = visual.design.replace(/[^a-z0-9_-]/gi,"");
  const colors = item.type === "weapon"
    ? `--eq-main:${visual.blade};--eq-light:${visual.edge};--eq-shadow:${visual.shadow};--eq-trim:${visual.guard};--eq-accent:${visual.accent};--eq-grip:${visual.grip}`
    : `--eq-main:${visual.body};--eq-light:${visual.bodyLight};--eq-shadow:${visual.bodyShadow};--eq-trim:${visual.trim};--eq-accent:${visual.gem};--eq-metal:${visual.metal}`;
  return `<span class="${wrapperClass} game2-equipment-art ${item.type} design-${design}" data-item-art="${id}" style="${colors}">
    <span class="game2-equipment-sprite" aria-hidden="true">
      <i class="eq-main"></i><i class="eq-light"></i><i class="eq-trim"></i><i class="eq-accent"></i>
    </span>
  </span>`;
}

function calculatedPlayerStats(stats = player.stats) {
  return derivePlayerStats(stats, {
    weaponAttack:itemStat("weapon", "attack"),
    armorHp:itemStat("armor", "hp"),
    armorDefense:itemStat("armor", "defense"),
    accessoryMagic:itemStat("accessory", "magic")
  });
}

function recalcStats(healDifference = false) {
  const oldMax = player.maxHp || 8;
  player.stats = normalizePlayerStats(player.stats);
  player.statPoints = Math.max(0, Math.floor(Number(player.statPoints) || 0));
  Object.assign(player, calculatedPlayerStats(player.stats));
  if (healDifference && player.maxHp > oldMax) player.hp += player.maxHp - oldMax;
  player.hp = clamp(player.hp, 0, player.maxHp);
  player.mana = clamp(player.mana, 0, player.maxMana);
  player.stamina = clamp(player.stamina, 0, player.maxStamina);
  updateHud();
}

function attackInterval() {
  return 31 * Math.max(.58, 1 - player.stats.speed * .032) * (player.haste > 0 ? .72 : 1) * blessingAttackMultiplier(player.blessing);
}

function unlockSkills(show = false) {
  for (const [id, skill] of Object.entries(SKILLS)) {
    const unlocked = (!skill.level || player.level >= skill.level) && (!skill.karma || player.karma >= skill.karma);
    if (unlocked && !player.ownedSkills[id]) {
      player.ownedSkills[id] = true;
      if (show) toast(`${skill.icon} ${skill.name} 습득`);
    }
  }
}

function tone(freq, duration = .08, type = "square", volume = .025) {
  if (!soundOn) return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
    osc.connect(gain).connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch {}
}

function burst(x, y, color, count = 10, speed = 3) {
  for (let i = 0; i < count; i++) {
    particles.add({
      x, y, vx: (Math.random() - .5) * speed * 2, vy: (Math.random() - .9) * speed,
      life: 24 + Math.random() * 22, size: Math.random() > .55 ? 4 : 2, color
    });
  }
}

function addCombatEffect(kind, x, y, options = {}) {
  const life = options.life || 30;
  return combatEffects.add({
    kind,
    x,
    y,
    prevX:x,
    prevY:y,
    vx:options.vx || 0,
    vy:options.vy || 0,
    life,
    maxLife:life,
    radius:options.radius || 48,
    color:options.color || "#ef835c",
    accent:options.accent || "#ffe2a2",
    face:options.face || 1,
    tier:options.tier || 1,
    echoes:options.echoes || 0,
    layer:options.layer || "front",
    targetX:options.targetX,
    targetY:options.targetY,
    source:options.source,
    sourceYRatio:options.sourceYRatio ?? .52,
    sourceGround:options.sourceGround || false,
    sourceYOffset:options.sourceYOffset || 0,
    variant:options.variant,
    pattern:options.pattern,
    seed:options.seed ?? Math.random() * 1000
  });
}

function effectBurst(x, y, profile, count = profile.sparks || 12, speed = 3) {
  for (let index = 0; index < count; index++) {
    particles.add({
      x:x + (Math.random() - .5) * 10,
      y:y + (Math.random() - .5) * 10,
      vx:(Math.random() - .5) * speed * 2,
      vy:(Math.random() - .85) * speed,
      life:18 + Math.random() * 26,
      size:index % 4 === 0 ? 4 : index % 2 ? 2 : 3,
      color:index % 3 === 0 ? profile.accent : profile.color,
      glow:index % 4 === 0
    });
  }
}

function spawnEnemyAttackEffect(enemy) {
  const profile = enemyEffectProfile(enemy);
  const garen = enemy.type === "captain" && enemy.npcId === "guard";
  const centerX = enemy.x + enemy.w / 2;
  const centerY = profile.kind === "root" ? enemy.floor - 8 : enemy.y + enemy.h * .52;
  addCombatEffect(garen ? "enemy-garen-blade" : `enemy-${profile.kind}`, centerX, centerY, {
    radius:garen ? 104 : profile.radius,
    color:garen ? "#a92338" : profile.color,
    accent:garen ? "#ffe0a0" : profile.accent,
    face:enemy.face,
    life:garen ? 40 : profile.kind === "boss" ? 48 : 30,
    tier:garen ? (enemy.enraged ? 5 : 4) : enemy.boss ? 4 : enemy.elite || enemy.pursuit ? 2 : 1,
    echoes:garen ? 3 : enemy.boss ? 3 : enemy.elite ? 1 : 0,
    layer:profile.kind === "root" || profile.kind === "splash" ? "back" : "front",
    source:profile.kind === "root" || profile.kind === "splash" ? null : enemy,
    sourceYRatio:.52,
    pattern:enemy.activePattern
  });
  effectBurst(centerX, centerY, garen
    ? { color:"#a92338",accent:"#ffe0a0",sparks:30 }
    : profile, garen ? 30 : profile.sparks, garen ? 5.8 : enemy.boss ? 5.5 : 3.2);
}

function floater(text, x, y, color = "#ffe2a2") {
  floaters.add({ text, x, y, life: 74, color });
}

function toast(message) {
  const old = wrap.querySelector(".game2-toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "game2-toast";
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 2400);
}

function makeEnemy([type, x, floor], forcedNight = false) {
  const base = ENEMIES[type];
  const night = forcedNight || (clock.isNight && !base.boss);
  const mult = night ? NIGHT_MULTIPLIER : { hp: 1, damage: 1, xp: 1, gold: 1 };
  const hp = Math.ceil(base.hp * mult.hp);
  return {
    type, x, y: floor - base.h, prevX: x, prevY: floor - base.h, floor, homeX: x, ...base,
    hp, maxHp: hp, damage: Math.ceil(base.damage * mult.damage),
    xp: Math.ceil(base.xp * mult.xp), gold: Math.ceil(base.gold * mult.gold),
    face: -1, dead: false, hurt: 0, lastAttackHit: -1, step: Math.random() * 100,
    slow: 0, patternTimer: 105, patternIndex: 0, phase: 0, stunned: 0, night,
    guardBuff: 0, dashTimer: 0, dashDir: 0, dashHit: false, enraged: false,
    attackAnim: 0, prevAttackAnim: 0, attackAnimMax: 0,
    prevDashTimer: 0, prevLaunchTimer: 0, leapTimer: 0, prevLeapTimer: 0,
    leapDuration: 28, leapCooldown: 70 + Math.random() * 90, leapDir: 0, leapHit: false,
    karmaContactCooldown: 0
  };
}

function syncRenderState() {
  player.prevX = player.x;
  player.prevY = player.y;
  player.prevRunFrame = player.runFrame;
  player.prevAttackTimer = player.attackTimer;
  player.prevCrossSlashTimer = player.crossSlashTimer;
  previousCameraX = cameraX;
  renderCameraX = cameraX;
  previousCameraY = cameraY;
  renderCameraY = cameraY;
  renderAlpha = 1;
  for (const enemy of enemies) {
    enemy.prevX = enemy.x;
    enemy.prevY = enemy.y;
    enemy.prevStep = enemy.step;
    enemy.prevAttackAnim = enemy.attackAnim;
    enemy.prevDashTimer = enemy.dashTimer;
    enemy.prevLaunchTimer = enemy.launchTimer;
    enemy.prevLeapTimer = enemy.leapTimer;
  }
  for (const ns of Object.values(npcStates)) {
    ns.prevRoamX = ns.roamX;
    ns.prevRoamY = ns.roamY;
    if (Number.isFinite(ns.burnX)) ns.prevBurnX = ns.burnX;
  }
  for (const pool of [particles, projectiles, floaters, combatEffects]) {
    for (const item of pool.items) {
      item.prevX = item.x;
      item.prevY = item.y;
    }
  }
  syncWoundedKnightRenderState();
}

function snapshotSimulation() {
  player.prevX = player.x;
  player.prevY = player.y;
  player.prevRunFrame = player.runFrame;
  player.prevAttackTimer = player.attackTimer;
  player.prevCrossSlashTimer = player.crossSlashTimer;
  previousCameraX = cameraX;
  previousCameraY = cameraY;
  for (const enemy of enemies) {
    enemy.prevX = enemy.x;
    enemy.prevY = enemy.y;
    enemy.prevStep = enemy.step;
    enemy.prevAttackAnim = enemy.attackAnim;
    enemy.prevDashTimer = enemy.dashTimer;
    enemy.prevLaunchTimer = enemy.launchTimer;
    enemy.prevLeapTimer = enemy.leapTimer;
  }
  for (const ns of Object.values(npcStates)) {
    ns.prevRoamX = ns.roamX;
    ns.prevRoamY = ns.roamY;
  }
  for (const pool of [particles, projectiles, floaters, combatEffects]) {
    for (const item of pool.items) {
      item.prevX = item.x;
      item.prevY = item.y;
    }
  }
  syncWoundedKnightRenderState();
}

function resumeSimulationClock() {
  const now = performance.now();
  lastTime = now;
  metricWindowStart = now;
  metricFrames = 0;
  accumulator = 0;
  syncRenderState();
}

function makePersistentEnemy(spec, spawnId, forcedNight = false) {
  if (isSpawnDefeated(worldStates.defeatedSpawns, spawnId)) return null;
  const enemy = makeEnemy(spec, forcedNight);
  enemy.spawnId = spawnId;
  enemy.persistentSpawn = true;
  return enemy;
}

function floorAt(x) {
  let floor = 438;
  let found = false;
  for (const platform of platforms) {
    if (x < platform.x || x > platform.x + platform.w) continue;
    if (!found || platform.y < floor) floor = platform.y;
    found = true;
  }
  return found ? floor : 438;
}

const WOUNDED_KNIGHT_WAVES = Object.freeze({
  outskirts2: ["hound","bandit","skeleton","mage","hunter","guard","wolf","spellblade"],
  outskirts1: ["hound","wolf","bandit","mage","hunter","skeleton"],
  village: ["hound","hunter","bandit","spellblade"],
  elderHill: ["hound","hunter","mage"]
});

function woundedKnightState() {
  return worldStates.woundedKnight;
}

function woundedKnightPresent(statuses = null) {
  const knight = woundedKnightState();
  if (!knight || knight.zone !== currentZoneId) return false;
  return !statuses || statuses.includes(knight.status);
}

function woundedKnightHitbox() {
  const knight = woundedKnightState();
  if (!woundedKnightEscortActive(knight) || knight.zone !== currentZoneId) return null;
  const floor = Number.isFinite(knight.y) ? knight.y : floorAt(knight.x);
  return { x:knight.x - 17,y:floor - 58,w:34,h:58 };
}

function setWoundedKnightBanner(text, duration = 300) {
  woundedKnightBannerText = text;
  woundedKnightBanner = duration;
}

function syncWoundedKnightRenderState() {
  const knight = woundedKnightState();
  if (!knight) return;
  knight.prevX = knight.x;
  knight.prevY = knight.y;
}

function placeWoundedKnightForZone(id) {
  const knight = woundedKnightState();
  if (!knight) return;
  if (woundedKnightEscortActive(knight)) {
    const crossedGate = knight.zone !== id;
    if (crossedGate) knight.hp = clamp(knight.hp + Math.ceil(knight.maxHp * .16),1,knight.maxHp);
    knight.zone = id;
    knight.x = clamp(player.x + player.w / 2 - player.face * 68, 38, zone.width - 38);
    knight.y = floorAt(knight.x);
    knight.prevX = knight.x;
    knight.prevY = knight.y;
    knight.vx = 0;
    knight.vy = 0;
  } else if (knight.status === "waiting" && id === WOUNDED_KNIGHT.zone) {
    knight.zone = id;
    knight.x = WOUNDED_KNIGHT.x;
    knight.y = floorAt(knight.x);
    knight.prevX = knight.x;
    knight.prevY = knight.y;
  }
}

function escortSpawnX(index, count, initialRightSide) {
  if (initialRightSide) return clamp(player.x + 610 + index * 78, 60, zone.width - 70);
  const side = player.x < zone.width / 2 ? 1 : -1;
  const rank = side > 0 ? index : count - index - 1;
  return clamp(player.x + side * (430 + rank * 68), 60, zone.width - 70);
}

function spawnWoundedKnightAmbush() {
  const knight = woundedKnightState();
  const wave = WOUNDED_KNIGHT_WAVES[currentZoneId];
  if (!woundedKnightEscortActive(knight) || knight.zone !== currentZoneId || !wave) return false;
  let spawned = 0;
  const initialRightSide = currentZoneId === WOUNDED_KNIGHT.zone;
  wave.forEach((type, index) => {
    const waveId = `${currentZoneId}:${index}`;
    if (knight.waveDefeated?.[waveId] || enemies.some((enemy) => !enemy.dead && enemy.escortWaveId === waveId)) return;
    const x = escortSpawnX(index, wave.length, initialRightSide);
    const enemy = makeEnemy([type,x,floorAt(x)],clock.isNight);
    enemy.escortHunter = true;
    enemy.escortWaveId = waveId;
    enemy.homeX = x;
    enemy.patternTimer = 54 + index * 9;
    enemy.leapCooldown = 25 + index * 8;
    enemy.speed *= 1.1;
    enemy.hp = enemy.maxHp = Math.ceil(enemy.maxHp * (index >= wave.length - 2 ? 1.28 : 1.12));
    enemy.damage = Math.ceil(enemy.damage * 1.08);
    enemy.elite = index >= wave.length - 2;
    enemies.push(enemy);
    spawned += 1;
  });
  if (spawned) {
    const firstVisit = !knight.wavesSpawned[currentZoneId];
    knight.wavesSpawned[currentZoneId] = true;
    if (firstVisit) {
      setWoundedKnightBanner(
        currentZoneId === WOUNDED_KNIGHT.zone
          ? "피 냄새를 맡은 추격대가 왕도 동쪽에서 몰려옵니다"
          : "추격대가 길목을 돌아 다시 따라붙었습니다",
        260
      );
      screenShake = Math.max(screenShake,6);
      tone(92,.32,"sawtooth",.035);
    }
  }
  return spawned > 0;
}

function completeWoundedKnightMission() {
  const knight = woundedKnightState();
  if (!completeWoundedKnightEscort(knight)) return false;
  gold += 700;
  grantRewardItem("high_potion");
  setWoundedKnightBanner("세드릭 생환 · 촌장이 상처를 치료하기 시작했습니다",360);
  toast("호위 완료 · 700G · 상급 물약");
  burst(knight.x,(knight.y || floorAt(knight.x)) - 38,"#ffe2a0",34,4.5);
  tone(660,.18,"triangle",.045);
  tone(880,.24,"triangle",.025);
  autosave("부상당한 기사 호위 완료");
  return true;
}

function damageWoundedKnight(enemy, amount = enemy.damage) {
  const knight = woundedKnightState();
  if (!woundedKnightEscortActive(knight) || knight.zone !== currentZoneId) return false;
  const damage = Math.max(1,Math.ceil(amount * .48));
  knight.hp = Math.max(0,knight.hp - damage);
  knight.hurtTimer = 12;
  knight.vx = Math.sign(knight.x - (enemy.x + enemy.w / 2)) * 2.8;
  burst(knight.x,(knight.y || floorAt(knight.x)) - 37,"#d84d5c",8,2.4);
  floater(`세드릭 -${damage}`,knight.x,(knight.y || floorAt(knight.x)) - 70,"#ff8f91");
  if (knight.hp > 0) return true;
  const deathX = knight.x;
  const deathFloor = knight.y || floorAt(deathX);
  if (!failWoundedKnightEscort(knight,clock.day,clock.minute,currentZoneId,deathX)) return true;
  knight.y = deathFloor;
  setWoundedKnightBanner("세드릭: 살려준다더니… 결국 날 괴물의 미끼로 썼군…",600);
  woundedKnightSpeech = 600;
  setKarma(player.karma + 30,"부상당한 기사 호위 실패");
  burst(deathX,deathFloor - 30,"#a52d3f",30,4.8);
  screenShake = Math.max(screenShake,12);
  tone(96,.42,"sawtooth",.045);
  toast("호위 실패 · 세드릭의 원망 · KARMA +30");
  autosave("부상당한 기사 호위 실패");
  return true;
}

function updateWoundedKnight(dt) {
  const knight = woundedKnightState();
  woundedKnightSpeech = Math.max(0,woundedKnightSpeech - dt);
  woundedKnightBanner = Math.max(0,woundedKnightBanner - dt);
  if (!knight) return;
  knight.hurtTimer = Math.max(0,(knight.hurtTimer || 0) - dt);
  if (knight.status === "waiting" && currentZoneId === WOUNDED_KNIGHT.zone) {
    knight.y = floorAt(knight.x);
    const distance = Math.abs(player.x + player.w / 2 - knight.x);
    if (!knight.approached && distance < 285) {
      knight.approached = true;
      woundedKnightSpeech = 360;
      setWoundedKnightBanner("세드릭: …거기, 모험가여. 제발 이 고통을 끝내 주시오.",360);
      tone(165,.22,"triangle",.025);
      autosave("부상당한 기사 발견");
    }
    return;
  }
  if (knight.status === "executing" && currentZoneId === knight.zone) {
    const targetX = clamp(knight.x - 74,0,zone.width - player.w);
    player.x += (targetX - player.x) * Math.min(1,.16 * dt);
    player.y = floorAt(player.x + player.w / 2) - player.h;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    player.face = 1;
    player.attackCombo = 2;
    const executionFrame = advanceWoundedKnightExecution(knight,dt);
    if (executionFrame.windup) {
      player.attackDuration = 34;
      player.attackTimer = Math.max(player.attackTimer,executionFrame.timer - 62);
    }
    if (executionFrame.shouldHit) {
      const floor = floorAt(knight.x);
      finishWoundedKnightExecution(
        knight,clock.day,clock.minute,currentZoneId,knight.x,
        knight.x + 18,floor - 45
      );
      player.attackTimer = 19;
      player.attackSerial += 1;
      player.x = clamp(knight.x - 108,0,zone.width - player.w);
      player.y = floorAt(player.x + player.w / 2) - player.h;
      addCombatEffect("skill-execution",knight.x,floor - 42,{
        radius:82,color:"#d63149",accent:"#fff0c7",face:1,life:36,tier:4,echoes:2
      });
      for (let index = 0; index < 34; index++) {
        particles.add({
          x:knight.x + 4,y:floor - 45 + (Math.random() - .5) * 8,
          vx:1.8 + Math.random() * 5.8,vy:-5.4 + Math.random() * 4.5,
          life:42 + Math.random() * 34,size:index % 6 === 0 ? 5 : index % 3 === 0 ? 3 : 2,
          color:index % 3 ? "#b9273d" : "#ef5261"
        });
      }
      screenShake = 18;
      hitStop = 7;
      woundedKnightSpeech = 150;
      setWoundedKnightBanner("세드릭: …고맙소.",220);
      tone(88,.12,"sawtooth",.055);
      tone(244,.08,"square",.028);
      autosave("부상당한 기사 처형");
    }
    return;
  }
  if (knight.status === "executed" && knight.bodyZone === currentZoneId) {
    knight.bloodTimer = Math.max(0,(knight.bloodTimer || 0) - dt);
    if (knight.bloodTimer > 0 && Math.floor(knight.bloodTimer) % 5 === 0) {
      particles.add({
        x:knight.bodyX + 11,y:floorAt(knight.bodyX) - 12,
        vx:.3 + Math.random() * 1.2,vy:-.3 - Math.random() * .7,
        life:18,size:2,color:"#7e1d31"
      });
    }
    if (Number.isFinite(knight.headX) && (Math.abs(knight.headVx || 0) > .04 || Math.abs(knight.headVy || 0) > .04)) {
      const previousHeadX = knight.headX;
      const proposedHeadX = clamp(knight.headX + knight.headVx * dt,12,zone.width - 12);
      if (floorAt(proposedHeadX) < knight.headY - 12) {
        knight.headX = previousHeadX;
        knight.headVx *= -.22;
      } else {
        knight.headX = proposedHeadX;
      }
      knight.headY += knight.headVy * dt;
      knight.headVy += .34 * dt;
      knight.headRotation += knight.headVx * .09 * dt;
      const headFloor = fallingSupportFloorAt(platforms,knight.headX,knight.headY) - 8;
      if (knight.headY >= headFloor) {
        knight.headY = headFloor;
        if (Math.abs(knight.headVy) > 1.25) {
          knight.headVy *= -.32;
          knight.headVx *= .78;
          tone(74,.04,"square",.012);
        } else {
          knight.headVy = 0;
          knight.headVx *= .9;
          if (Math.abs(knight.headVx) < .05) knight.headVx = 0;
        }
      }
    }
    return;
  }
  if (!woundedKnightEscortActive(knight) || knight.zone !== currentZoneId) return;
  knight.limpFrame = (knight.limpFrame || 0) + Math.abs(knight.vx || 0) * .16 * dt;
  const desiredX = clamp(player.x + player.w / 2 - player.face * 66,30,zone.width - 30);
  const distance = desiredX - knight.x;
  const followSpeed = Math.abs(distance) > 210 ? 4.35 : Math.abs(distance) > 42 ? 2.35 : 0;
  knight.vx += (Math.sign(distance) * followSpeed - knight.vx) * Math.min(1,.17 * dt);
  if (Math.abs(distance) < 18) knight.vx *= .72;
  knight.x = clamp(knight.x + knight.vx * dt,24,zone.width - 24);
  const targetFloor = floorAt(knight.x);
  if (!Number.isFinite(knight.y)) knight.y = targetFloor;
  const floorDelta = targetFloor - knight.y;
  if (Math.abs(floorDelta) > 1) knight.y += clamp(floorDelta,-5.4,6.4) * dt;
  else knight.y = targetFloor;
  if (currentZoneId === "elderHouse" && npcStates.elder?.alive && Math.abs(player.x - npcWorldX(NPCS.find((npc) => npc.id === "elder"))) < 180) {
    completeWoundedKnightMission();
  }
}

function eventKey(event, zoneId = currentZoneId) {
  return `${clock.day}:${zoneId}:${event.id}`;
}

function grantRewardItem(id) {
  const item = ITEMS[id];
  if (!item) return;
  if (item.type === "consumable" || item.type === "reset") player.counts[id] = (player.counts[id] || 0) + 1;
  else player.owned[id] = true;
}

function completeWorldEvent() {
  if (!worldEvent?.active) return;
  worldEvent.active = false;
  player.completedEvents[eventKey(worldEvent)] = true;
  gold += worldEvent.rewardGold || 0;
  grantRewardItem(worldEvent.rewardItem);
  burst(worldEvent.x, floorAt(worldEvent.x) - 34, "#ffe17a", 32, 5);
  toast(`${worldEvent.name} 완료 · ${worldEvent.rewardGold}G · ${ITEMS[worldEvent.rewardItem]?.name || "보상"}`);
  autosave("필드 사건 완료");
}

function spawnDailyEvent() {
  if (worldEvent?.active) return;
  worldEvent = null;
  if (zone.safe || zone.boss) return;
  const template = dailyEvent(clock.day, currentZoneId, clock.isNight);
  if (!template || player.completedEvents[eventKey(template)]) return;
  const x = Math.round(zone.width * (.5 + ((clock.day * 17) % 20) / 100));
  worldEvent = { ...template, x, active: true };
  if (!template.interaction) {
    template.enemies.forEach((type, index) => {
      const ex = clamp(x + (index - 1) * 78, 120, zone.width - 120);
      const spawnId = `${currentZoneId}:event:${clock.day}:${template.id}:${index}`;
      const enemy = makePersistentEnemy([type, ex, floorAt(ex)], spawnId, clock.isNight);
      if (!enemy) return;
      enemy.eventId = template.id;
      enemy.homeX = ex;
      enemies.push(enemy);
    });
  }
}

async function setupZone(id, spawnX = null, saveReason = null) {
  const token = ++loadToken;
  const next = await loader.load(id);
  if (token !== loadToken) return;
  currentZoneId = id;
  if (id !== "elderHill") cemeteryThought = 0;
  zone = next;
  platforms = ensureContinuousGround(next);
  const daySpawns = next.enemies.map((data, index) => spawnRecord(id, "day", data, index));
  enemies = daySpawns.filter((record) => !isSpawnDefeated(worldStates.defeatedSpawns, record.id)).map((record) => {
    const enemy = makeEnemy(record.spec);
    enemy.spawnId = record.id;
    enemy.persistentSpawn = true;
    return enemy;
  });
  if (next.boss === "warden" && bosses.warden) enemies = enemies.filter((e) => e.type !== "warden");
  if (id === "dungeon" && bosses.lich) enemies = enemies.filter((e) => e.type !== "lich");
  if (!next.safe && clock.isNight) {
    const nightSpawns = next.nightEnemies.map((data, index) => spawnRecord(id, "night", data, index));
    enemies.push(...nightSpawns.filter((record) => !isSpawnDefeated(worldStates.defeatedSpawns, record.id)).map((record) => {
      const enemy = makeEnemy(record.spec, true);
      enemy.spawnId = record.id;
      enemy.persistentSpawn = true;
      return enemy;
    }));
  }
  zoneSpawnState = zoneClearStatus(id, next, worldStates.defeatedSpawns);
  const hasAuthoredHunter = [...next.enemies, ...next.nightEnemies].some(([type]) => type === "hunter");
  if (karmaTier(player.karma).hunters && !next.safe && !hasAuthoredHunter) {
    const hunter = makePersistentEnemy(
      ["hunter", Math.min(next.width - 220, 620), 438],
      `${id}:dynamic:karma-hunter`,
      clock.isNight
    );
    if (hunter) enemies.push(hunter);
  }
  if (id === "village" && npcStates.guard && !garenAttackReady()) {
    npcStates.guard.hostile = false;
    npcStates.guard.abyssHostile = false;
    enemies = enemies.filter((enemy) => enemy.npcId !== "guard");
  }
  if (player.karma >= 100 && id === "outskirts2" && !bosses.judge) {
    const judge = makePersistentEnemy(["judge", 2860, floorAt(2860)], "outskirts2:dynamic:judge", clock.isNight);
    if (judge) {
      judge.elite = true;
      enemies.push(judge);
    }
  }
  crystals = next.crystals.map(([x, y], index) => {
    const crystalId = `${id}:crystal:${index}`;
    return { id:crystalId,x,y,collected:!!player.collectedCrystals[crystalId],phase:index * .8 };
  });
  zoneSecrets = (next.secrets || []).map((secret) => ({
    ...secret,
    found: !!player.foundSecrets[secret.id],
    claimed: player.foundSecrets[secret.id] === "claimed"
  }));
  weatherId = dailyWeather(clock.day, id);
  worldEvent = null;
  spawnDailyEvent();
  pickups = [];
  particles.clear();
  projectiles.clear();
  hazards.clear();
  combatEffects.clear();
  player.x = spawnX ?? next.spawn;
  player.y = floorAt(player.x + player.w / 2) - player.h;
  player.vx = 0;
  player.vy = 0;
  player.grounded = true;
  player.invincible = worldHostile(player.karma) ? 240 : 44;
  placeWoundedKnightForZone(id);
  spawnWoundedKnightAmbush();
  minimap.markExplored(player.explored, id, player.x, next.width);
  cameraX = horizontalCameraTarget({
    playerX:player.x,
    viewportWidth:W,
    worldWidth:next.width,
    minX:next.cameraMinX
  });
  cameraTargetY = verticalCameraTarget(player.y + player.h);
  cameraY = cameraTargetY;
  stageBanner = 180;
  interaction = null;
  elderCurseTimer = ELDER_CURSE_INTERVAL;
  elderApproachGrace = id === "elderHouse" && elderHouseBurning() ? 42 : 0;
  if (id === "elderHouse" && elderHouseBurning() && worldStates.elderHouse.elderDoomed && npcStates.elder?.alive) {
    const elder = elderNpc();
    const ns = npcStates.elder;
    ns.hostile = false;
    ns.abyssHostile = false;
    ns.burnX = Number.isFinite(ns.burnX) ? ns.burnX : elder.x;
    ns.prevBurnX = ns.burnX;
    ns.burnFace = -1;
    enemies = enemies.filter((enemy) => enemy.npcId !== "elder");
  }
  for (const npc of zoneNpcs()) {
    if (npc.id !== "guard" && npcStates[npc.id]?.hostile && npcStates[npc.id]?.alive) spawnNpcDefender(npc);
  }
  applyWorldHostility();
  triggerGuardRevenge();
  schedulePursuitForCurrentDay();
  spawnPursuitParty();
  syncRenderState();
  for (const adjacent of next.adjacent.slice(0, 1)) loader.preload(adjacent);
  if (saveReason) autosave(saveReason);
}

const waitMs = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function transitionTo(id, spawnX, saveReason = "맵 이동") {
  if (transitionBusy) return;
  transitionBusy = true;
  const previousState = state;
  state = "transition";
  keys.clear();
  dom.transition.classList.add("show");
  dom.transition.setAttribute("aria-hidden", "false");
  await waitMs(250);
  await setupZone(id, spawnX, saveReason);
  await waitMs(150);
  dom.transition.classList.remove("show");
  dom.transition.setAttribute("aria-hidden", "true");
  await waitMs(230);
  state = previousState === "ready" ? "ready" : "running";
  transitionBusy = false;
  if (state === "running") resumeSimulationClock();
  canvas.focus();
}

function serialize() {
  const savePlayer = {
    level: player.level, xp: player.xp,
    statPoints: Math.max(0, Math.floor(Number(player.statPoints) || 0)),
    stats: normalizePlayerStats(player.stats),
    hp: player.hp, mana: player.mana, stamina: player.stamina, counts: player.counts,
    owned: player.owned, equipped: player.equipped, ownedSkills: player.ownedSkills,
    skillSlots: player.skillSlots, itemSlots: player.itemSlots, karma: player.karma,
    kills: player.kills, crystals: player.crystals, questKills: player.questKills,
    questClaimed: player.questClaimed, explored: player.explored,
    foundSecrets: player.foundSecrets, completedEvents: player.completedEvents,
    collectedCrystals: player.collectedCrystals,
    loot: { killsSinceDrop, killsSincePickup }
  };
  return {
    player: savePlayer, gold, clock: clock.serialize(), npcStates, bosses, worldStates,
    world: { zone: currentZoneId, x: player.x, villageAggro },
    metadata: { renderer: renderer.gpu ? "WebGL2" : "Canvas2D", cachedZones: loader.cachedZones, regions: Object.keys(WORLD_REGIONS) }
  };
}

function autosave(reason = "자동 저장") {
  if (!booted) return;
  saves.save("auto", serialize());
  autosaveNote = reason;
}

async function loadSave(data) {
  if (!data?.player) return false;
  player = { ...basePlayer(), ...data.player };
  player.stats = { ...basePlayer().stats, ...(data.player.stats || {}) };
  player.counts = { ...DEFAULT_COUNTS, ...(data.player.counts || {}) };
  player.owned = { rusty_sword: true, cloth: true, ...(data.player.owned || {}) };
  player.equipped = { weapon: "rusty_sword", armor: "cloth", accessory: null, ...(data.player.equipped || {}) };
  player.ownedSkills = { ember_slash: true, iron_guard: true, warrior_blessing: true, sunset_execution: true, ...(data.player.ownedSkills || {}) };
  delete player.ownedSkills.knight_charge;
  player.skillSlots = [...(data.player.skillSlots || DEFAULT_SKILL_SLOTS)].map((id) => id === "knight_charge" ? "warrior_blessing" : id);
  player.itemSlots = [...(data.player.itemSlots || DEFAULT_ITEM_SLOTS)];
  player.explored = { ...(data.player.explored || {}) };
  player.foundSecrets = { ...(data.player.foundSecrets || {}) };
  player.completedEvents = { ...(data.player.completedEvents || {}) };
  player.collectedCrystals = { ...(data.player.collectedCrystals || {}) };
  killsSinceDrop = data.player.loot?.killsSinceDrop || 0;
  killsSincePickup = data.player.loot?.killsSincePickup ?? 99;
  player.cooldowns = {};
  player.blessing = { timer: 0, cast: 0, variant: blessingForKarma(player.karma).id };
  player.corruptionTrail = [];
  player.xpNeed = xpFor(player.level);
  gold = data.gold ?? 200;
  clock = new WorldClock(data.clock || {});
  initNpcStates(data.npcStates || {});
  bosses = { warden: false, lich: false, judge: false, ...(data.bosses || {}) };
  worldStates = mergeWorldStates(data.worldStates || {});
  migrateLegacyBurningElder();
  cemeteryThought = 0;
  if (bosses.warden) markSpawnDefeated(worldStates.defeatedSpawns, spawnRecord("bossArena","day",["warden",1180,438],0).id, clock.day);
  if (bosses.lich) markSpawnDefeated(worldStates.defeatedSpawns, spawnRecord("dungeon","day",["lich",2920,438],6).id, clock.day);
  villageAggro = !!data.world?.villageAggro;
  unlockSkills();
  recalcStats();
  await setupZone(data.world?.zone || "village", data.world?.x || 150);
  return true;
}

async function resetNewGame() {
  player = basePlayer();
  clock = new WorldClock();
  gold = 200;
  bosses = { warden: false, lich: false, judge: false };
  worldStates = mergeWorldStates();
  cemeteryThought = 0;
  killsSinceDrop = 0;
  killsSincePickup = 99;
  villageAggro = false;
  introState = createIntroState();
  introCueScene = -1;
  shell.classList.remove("intro-active");
  initNpcStates();
  recalcStats();
  await setupZone("village", 150);
}

function addXp(amount, x = player.x, y = player.y) {
  player.xp += amount;
  floater(`+${amount} XP`, x, y - 8, "#f7d36f");
  let leveled = false;
  while (player.xp >= player.xpNeed) {
    player.xp -= player.xpNeed;
    player.level += 1;
    player.statPoints += 3;
    player.xpNeed = xpFor(player.level);
    player.hp = player.maxHp;
    player.mana = player.maxMana;
    levelBanner = 190;
    leveled = true;
    const growth = skillGrowth(player.level, "all", "level");
    addCombatEffect("skill-levelup", player.x + 18, player.y + player.h - 2, {
      radius:scaledRange(105, growth),
      color:"#d99b49",
      accent:"#fff0a5",
      life:70,
      tier:growth.tier,
      echoes:growth.echoCount,
      layer:"back"
    });
    effectBurst(player.x + 18, player.y + 24, { color:"#d99b49", accent:"#fff0a5", sparks:growth.particleCount + 16 }, Math.min(62, growth.particleCount + 16), 5);
    floater("모든 스킬 범위·이펙트 강화", player.x + 18, player.y - 28, "#fff0a5");
  }
  if (leveled) {
    unlockSkills(true);
    tone(523, .1);
    setTimeout(() => tone(659, .13), 80);
    autosave("레벨 업");
  }
  updateHud();
}

function beginGame(saveLabel = "모험 시작") {
  state = "running";
  dom.panel.hidden = true;
  dom.overlay.classList.remove("show");
  shell.classList.remove("intro-active");
  canvas.focus();
  resumeSimulationClock();
  updateHud();
  autosave(saveLabel);
}

function syncIntroDiagnostics() {
  const scene = introCurrentScene(introState);
  canvas.dataset.gameState = state;
  canvas.dataset.introActive = String(!!introState.active);
  canvas.dataset.introCompleted = String(!!introState.completed);
  canvas.dataset.introSkipped = String(!!introState.skipped);
  canvas.dataset.introScene = scene?.id || "none";
  canvas.dataset.introSceneIndex = String((introState.sceneIndex || 0) + 1);
  canvas.dataset.introSceneCount = String(INTRO_SCENES.length);
  canvas.dataset.introSceneTime = Math.round(introState.sceneTime || 0).toString();
  canvas.dataset.introProgress = introSceneProgress(introState).toFixed(3);
}

function playIntroCue(index) {
  if (introCueScene === index) return;
  introCueScene = index;
  const frequencies = [74,523,116,82,155,196,392];
  const wave = ["sawtooth","triangle","sine","sawtooth","square","triangle","sine"][index] || "triangle";
  tone(frequencies[index] || 196,index === 6 ? .42 : .25,wave,index === 6 ? .035 : .025);
  if (index === 1) setTimeout(() => tone(784,.32,"triangle",.022),130);
  if (index === 2) setTimeout(() => tone(58,.38,"sawtooth",.022),110);
}

function startGameIntro() {
  introState = startIntroState(createIntroState());
  introRequiredOnStart = false;
  introCueScene = -1;
  state = "intro";
  stateBeforeConsole = "intro";
  keys.clear();
  dom.panel.hidden = true;
  dom.console.hidden = true;
  dom.hostile.hidden = true;
  dom.overlay.classList.remove("show");
  shell.classList.add("intro-active");
  accumulator = 0;
  lastTime = performance.now();
  playIntroCue(0);
  syncIntroDiagnostics();
  canvas.focus();
}

function finishGameIntro(reason = "complete") {
  if (reason === "skip" && introState.active) skipIntroState(introState);
  introRequiredOnStart = false;
  shell.classList.remove("intro-active");
  dom.console.hidden = true;
  stateBeforeConsole = "running";
  syncIntroDiagnostics();
  beginGame(reason === "skip" ? "프롤로그 건너뛰기" : "프롤로그 완료");
  toast(reason === "skip" ? "프롤로그 건너뜀 · 더스크베일 도착" : "더스크베일에 도착했습니다");
}

function advanceGameIntro() {
  if (!introState.active) return;
  const result = advanceIntroState(introState);
  if (result.finished) {
    finishGameIntro("complete");
    return;
  }
  playIntroCue(introState.sceneIndex);
  syncIntroDiagnostics();
}

function updateGameIntro(deltaMs) {
  if (!introState.active) return;
  const result = updateIntroState(introState,deltaMs);
  if (result.sceneChanged) playIntroCue(introState.sceneIndex);
  syncIntroDiagnostics();
  if (result.finished) finishGameIntro(result.skipped ? "skip" : "complete");
}

function die() {
  if (state === "dead") return;
  state = "dead";
  keys.clear();
  dom.hostile.hidden = true;
  dom.overlayTitle.textContent = "기사가 쓰러졌습니다";
  dom.overlayCopy.textContent = "체크포인트는 없습니다. 골드 10%를 잃고 마을 여관에서 부활합니다.";
  dom.start.textContent = "마을에서 부활";
  dom.start.hidden = false;
  dom.overlay.classList.add("show");
  tone(130, .4, "sawtooth", .04);
}

async function respawn() {
  gold = Math.floor(gold * .9);
  player.hp = player.maxHp;
  player.mana = player.maxMana;
  player.stamina = player.maxStamina;
  player.cooldowns = {};
  await setupZone("village", 190);
  state = "running";
  dom.overlay.classList.remove("show");
  resumeSimulationClock();
  autosave("마을 부활");
  canvas.focus();
}

function updateHud() {
  if (!dom.hp) return;
  dom.hp.textContent = `${Math.ceil(Math.max(0, player.hp))} / ${player.maxHp}`;
  dom.hpBar.style.width = `${clamp(player.hp / player.maxHp, 0, 1) * 100}%`;
  dom.level.textContent = String(player.level);
  dom.xpBar.style.width = `${clamp(player.xp / player.xpNeed, 0, 1) * 100}%`;
  dom.atk.textContent = String(player.attackPower);
  dom.gold.textContent = String(gold).padStart(4, "0");
  dom.time.textContent = clock.format();
  dom.karma.textContent = `${player.karma} · ${karmaTier(player.karma).name}`;
  dom.karma.classList.toggle("positive", player.karma > 0);
  dom.mana.textContent = String(Math.floor(player.mana));
  dom.manaBar.style.width = `${player.mana / player.maxMana * 100}%`;
  dom.stamina.textContent = String(Math.floor(player.stamina));
  dom.staminaBar.style.width = `${player.stamina / player.maxStamina * 100}%`;
  dom.mapCode.textContent = mapCode(currentZoneId);
  if (dom.mapTime) dom.mapTime.textContent = clock.format();
  canvas.dataset.combo = String(player.attackCombo + 1);
  canvas.dataset.sprinting = String(player.sprinting);
  canvas.dataset.zone = currentZoneId;
  canvas.dataset.mapCode = mapCode(currentZoneId);
  canvas.dataset.weather = weatherId;
  canvas.dataset.weatherVisual = weatherId === "fog" ? "curved-fog-ribbons" : weatherId;
  canvas.dataset.playerX = String(Math.round(player.x));
  canvas.dataset.gameState = state;
  canvas.dataset.houseStage = currentHouseStage();
  canvas.dataset.elderHouseCanEnter = String(elderHouseCanEnter(worldStates,clock.day,clock.minute));
  canvas.dataset.elderFireConfrontation = worldStates.elderHouse.confronted
    ? "complete"
    : elderConfrontationReady(worldStates,clock.day,clock.minute)
      ? panelType === "elderFireDialogue" ? "dialogue" : "approaching"
      : "inactive";
  canvas.dataset.elderFireDialogueStep = String(elderFireDialogueStep);
  canvas.dataset.elderCurseActive = String(!!worldStates.elderHouse.curseActive);
  canvas.dataset.elderCurseTimer = String(Math.max(0,Math.ceil(elderCurseTimer)));
  canvas.dataset.elderBurnX = String(Math.round(npcStates.elder?.burnX ?? elderNpc().x));
  canvas.dataset.elderFireVisualIntensity = elderHouseBurning() ? elderFireVisualIntensity().toFixed(3) : "0.000";
  canvas.dataset.elderCave = currentZoneId === "elderHill" ? "locked-no-key" : "unloaded";
  canvas.dataset.moonbriarEntrance = currentZoneId === "outskirts1" ? "moon-gate" : "unloaded";
  canvas.dataset.guardRevenge = worldStates.guardRevenge.triggered ? (worldStates.guardRevenge.defeated ? "defeated" : "active") : "idle";
  canvas.dataset.playerY = String(Math.round(player.y));
  canvas.dataset.cameraY = cameraY.toFixed(2);
  canvas.dataset.cameraTargetY = cameraTargetY.toFixed(2);
  canvas.dataset.playerScreenY = (player.y - cameraY).toFixed(2);
  canvas.dataset.cameraFootY = (player.y + player.h).toFixed(2);
  canvas.dataset.cameraTerrainY = landingFloorBelowPlayer(
    platforms,player.x + player.w / 2,player.y + player.h
  ).toFixed(2);
  canvas.dataset.cameraRawTerrainY = floorAt(player.x + player.w / 2).toFixed(2);
  canvas.dataset.cameraFloorSource = player.grounded ? "feet-support" : "airborne-below-only";
  canvas.dataset.verticalCamera = "overhead-safe-hybrid";
  canvas.dataset.grounded = String(player.grounded);
  canvas.dataset.fallRescues = String(player.fallRescues || 0);
  canvas.dataset.groundGaps = String(zone ? groundCoverageGaps(platforms, zone.width).length : 0);
  canvas.dataset.runtimeErrors = String(runtimeErrors);
  canvas.dataset.debugGodMode = String(debugGodMode);
  canvas.dataset.equippedWeapon = player.equipped.weapon;
  canvas.dataset.weaponDesign = equippedWeaponVisual().design;
  canvas.dataset.equippedArmor = player.equipped.armor;
  canvas.dataset.armorDesign = equippedArmorVisual().design;
  canvas.dataset.karma = String(player.karma);
  canvas.dataset.karmaAura = karmaAuraTier(player.karma).id;
  canvas.dataset.blessing = player.blessing?.timer > 0 ? player.blessing.variant : "none";
  canvas.dataset.zoneCleared = String(zoneSpawnState.cleared);
  canvas.dataset.persistentEnemies = String(enemies.filter((enemy) => enemy.persistentSpawn && !enemy.dead).length);
  canvas.dataset.hostileNpcEnemies = String(enemies.filter((enemy) => enemy.npcId && !enemy.dead).length);
  canvas.dataset.hostileNpcIds = enemies.filter((enemy) => enemy.npcId && !enemy.dead).map((enemy) => enemy.npcId).join(",");
  canvas.dataset.hostileNpcVisual = enemies.some((enemy) => enemy.npcId && !enemy.dead) ? "original-npc" : "none";
  canvas.dataset.karmaGroundVisible = String(player.karma >= 500 && player.grounded);
  const nearbyHome = zone ? nearbyNpcHome() : null;
  const elderBurnReady = currentZoneId === "elderHill" && Math.abs(player.x + player.w / 2 - elderHouseEntranceX()) <= 190 && currentHouseStage() === "intact";
  const npcBurnReady = !!nearbyHome && !npcStates[nearbyHome.ownerId]?.alive && currentNpcHouseStage(nearbyHome.ownerId) === "intact";
  canvas.dataset.burnKeyReady = String(elderBurnReady || npcBurnReady);
  canvas.dataset.swordHeld = "true";
  canvas.dataset.swordPose = "shoulder";
  canvas.dataset.wallBlocked = String(player.wallBlocked);
  canvas.dataset.daylight = daylightAt(clock.minute).toFixed(3);
  canvas.dataset.gameTime = clock.format();
  canvas.dataset.remainingCrystals = String(crystals.filter((crystal) => !crystal.collected).length);
  canvas.dataset.karmaThorns = String(player.karma >= 500);
  canvas.dataset.karmaContactHits = String(player.karmaContactHits || 0);
  const apocalypse = apocalypseIntensity(player.karma);
  canvas.dataset.apocalypse = apocalypse > 0 ? "active" : "dormant";
  canvas.dataset.apocalypseIntensity = apocalypse.toFixed(3);
  canvas.dataset.firefallCount = String(apocalypse > 0
    ? Array.from({ length:5 },(_, index) => firefallState(performance.now(),index,W,H)).filter((fall) => fall.active).length
    : 0);
  canvas.dataset.firefallMode = "background-only";
  canvas.dataset.firefallDamage = "0";
  canvas.dataset.firefallCollidable = "false";
  canvas.dataset.villageCivilianDeaths = String(VILLAGE_CIVILIAN_IDS.filter((id) => !npcStates[id]?.alive).length);
  canvas.dataset.garenAttackReady = String(garenAttackReady());
  canvas.dataset.corpseVisual = "detailed-prone";
  const npcHomeStages = zone
    ? homesForZone(currentZoneId)
      .filter((home) => home.ownerId)
      .map((home) => currentNpcHouseStage(home.ownerId))
    : [];
  const burningNpcHomes = npcHomeStages.filter((stage) => stage === "burning").length;
  const damagedNpcHomes = npcHomeStages.filter((stage) => stage !== "intact").length;
  canvas.dataset.burningNpcHomes = String(burningNpcHomes);
  canvas.dataset.damagedNpcHomes = String(damagedNpcHomes);
  canvas.dataset.houseFireVisual = currentHouseStage() === "burning" || burningNpcHomes > 0
    ? "separated-scorch-puffs"
    : "inactive";
  canvas.dataset.houseFireDebris = currentHouseStage() !== "intact" || damagedNpcHomes > 0
    ? "roof-attached-no-standing-beams"
    : "inactive";
  canvas.dataset.statPoints = String(player.statPoints);
  canvas.dataset.statAttack = String(player.stats.attack);
  canvas.dataset.statHealth = String(player.stats.health);
  canvas.dataset.statDefense = String(player.stats.defense);
  canvas.dataset.statMagic = String(player.stats.magic);
  canvas.dataset.statSpeed = String(player.stats.speed);
  canvas.dataset.attackPower = String(player.attackPower);
  canvas.dataset.maxHp = String(player.maxHp);
  canvas.dataset.defense = String(player.defense);
  canvas.dataset.magicPower = String(player.magicPower);
  canvas.dataset.moveSpeed = player.moveSpeed.toFixed(3);
  canvas.dataset.attackInterval = attackInterval().toFixed(3);
  canvas.dataset.corpseOverlay = "flies-only";
  canvas.dataset.activeEnemyIds = enemies.filter((enemy) => !enemy.dead && enemy.spawnId).map((enemy) => enemy.spawnId).join(",");
  canvas.dataset.activeEnemyTypes = enemies.filter((enemy) => !enemy.dead).map((enemy) => enemy.type).join(",");
  canvas.dataset.houseFires = Object.entries(worldStates.houseFires || {}).map(([id, fire]) => `${id}:${fire.stage}`).join(",");
  canvas.dataset.pursuitEnemies = String(enemies.filter((enemy) => enemy.pursuit && !enemy.dead).length);
  const activeGaren = enemies.find((enemy) => enemy.type === "captain" && enemy.npcId === "guard" && !enemy.dead);
  canvas.dataset.garen = activeGaren ? (activeGaren.enraged ? "enraged" : "active") : "idle";
  canvas.dataset.garenHp = activeGaren ? String(Math.ceil(activeGaren.hp)) : "0";
  canvas.dataset.garenDash = String(Boolean(activeGaren?.dashTimer > 0));
  canvas.dataset.garenPattern = activeGaren?.activePattern || "none";
  canvas.dataset.garenHazards = hazards.items.filter((hazard) => hazard.garenPattern)
    .map((hazard) => `${hazard.garenPattern}:${hazard.telegraph > 0 ? "telegraph" : "active"}`).join(",");
  canvas.dataset.autoNpcAttack = String(npcAttackUnlocked(player.karma));
  canvas.dataset.pursuit = worldStates.pursuit.active ? "active" : worldStates.pursuit.pending ? "pending" : "idle";
  const woundedDebug = woundedKnightState();
  canvas.dataset.woundedKnight = woundedDebug.status;
  canvas.dataset.woundedKnightZone = woundedDebug.bodyZone || woundedDebug.zone;
  canvas.dataset.woundedKnightHp = `${woundedDebug.hp}/${woundedDebug.maxHp}`;
  canvas.dataset.woundedKnightRemains = woundedKnightRemainsStage(woundedDebug,clock.day,clock.minute);
  canvas.dataset.woundedKnightExecutionTimer = Number(woundedDebug.executionTimer || 0).toFixed(2);
  canvas.dataset.woundedKnightExecutionHit = String(!!woundedDebug.executionHit);
  canvas.dataset.woundedKnightHeadSpeed = Math.hypot(woundedDebug.headVx || 0,woundedDebug.headVy || 0).toFixed(2);
  canvas.dataset.woundedKnightPose = ["waiting","executing"].includes(woundedDebug.status)
    ? "grounded-tree-lean"
    : woundedDebug.status;
  canvas.dataset.woundedKnightEmbeddedArrows = ["waiting","executing"].includes(woundedDebug.status) ? "2" : "0";
  canvas.dataset.escortEnemies = String(enemies.filter((enemy) => enemy.escortHunter && !enemy.dead).length);
  canvas.dataset.escortKills = String(woundedDebug.escortKills || 0);
  canvas.dataset.cemeteryThought = cemeteryThought > 0
    ? "active"
    : worldStates.cemetery?.sensed ? "remembered" : "unheard";
  canvas.dataset.fps = metricFps.toFixed(1);
  canvas.dataset.frameMs = metricFrameMs.toFixed(2);
  canvas.dataset.drawMs = metricDrawMs.toFixed(2);
  canvas.dataset.longFrames = String(metricLongFrames);
  canvas.dataset.droppedSteps = String(metricDroppedSteps);
  canvas.dataset.renderAlpha = renderAlpha.toFixed(3);
  canvas.dataset.playerMotion = player.crossSlashTimer > 0
    ? "skill-cross-slash"
    : player.attackTimer > 0
      ? `attack-${player.attackCombo + 1}`
    : !player.grounded ? "airborne"
      : player.landTimer > 0 ? "landing"
        : player.sprinting ? "sprinting"
          : Math.abs(player.vx) > .5 ? "walking" : "idle";
  canvas.dataset.crossSlash = player.crossSlashTimer > 0 ? "casting" : "ready";
  canvas.dataset.crossProjectiles = String(projectiles.items.filter((projectile) =>
    projectile.kind?.toLowerCase().includes("crosswave")
  ).length);
  const activeCrossWave = projectiles.items.find((projectile) =>
    projectile.kind?.toLowerCase().includes("crosswave")
  );
  canvas.dataset.crossProjectileOpacity = activeCrossWave
    ? crossWaveOpacity(activeCrossWave.life,activeCrossWave.maxLife).toFixed(3)
    : "0.000";
  const crossDebug = crossSlashProfile(player.level,skillGrowth(player.level,"ember_slash","crossProjectile"));
  canvas.dataset.crossDamageScale = crossDebug.damageScale.toFixed(3);
  canvas.dataset.crossMaxHits = String(crossDebug.maxHits);
  canvas.dataset.crossGuardBreak = String(crossDebug.guardBreak);
  canvas.dataset.beastFacing = "movement-mirrored";
  canvas.dataset.animatedEnemies = String(enemies.filter((enemy) =>
    !enemy.dead && (enemy.attackAnim > 0 || enemy.dashTimer > 0 || enemy.launchTimer > 0 || enemy.leapTimer > 0)
  ).length);
  canvas.dataset.leapingEnemies = String(enemies.filter((enemy) => !enemy.dead && enemy.leapTimer > 0).length);
  const wanderingNpcs = zoneNpcs().filter((npc) => npc.wander && npcStates[npc.id]?.alive);
  canvas.dataset.wanderingNpcAirborne = String(wanderingNpcs.filter((npc) => !npcStates[npc.id].roamGrounded).length);
  canvas.dataset.wanderingNpcPositions = wanderingNpcs.map((npc) => {
    const ns = npcStates[npc.id];
    return `${npc.id}:${Math.round(ns.roamX)}:${Math.round(npcWorldFloor(npc))}:${ns.roamGrounded ? "ground" : "air"}`;
  }).join(",");
  let nearestDebugEnemy = null;
  let nearestDebugDistance = Infinity;
  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const distance = Math.abs(enemy.x - player.x);
    if (distance < nearestDebugDistance) {
      nearestDebugDistance = distance;
      nearestDebugEnemy = enemy;
    }
  }
  canvas.dataset.nearestEnemy = nearestDebugEnemy?.type || "none";
  canvas.dataset.nearestEnemyX = nearestDebugEnemy ? String(Math.round(nearestDebugEnemy.x)) : "-1";
  canvas.dataset.skillLevel = String(player.level);
  canvas.dataset.skillTier = String(lastSkillDebug.tier);
  canvas.dataset.lastSkill = lastSkillDebug.id;
  canvas.dataset.lastSkillRange = String(lastSkillDebug.range);
  canvas.dataset.lastSkillEffectScale = Number(lastSkillDebug.effectScale).toFixed(3);
  canvas.dataset.activeCombatEffects = String(combatEffects.items.length);
  canvas.dataset.activeHazards = String(hazards.items.length);
  updateHotbar();
}

function updateHotbar() {
  const skillKeys = ["Q", "W", "E", "R"];
  const itemKeys = ["1", "2", "3", "4"];
  const signature = [
    `karma-skill:${Math.floor(player.karma / 250)}`,
    `skill-level:${player.level}`,
    ...player.skillSlots.map((id) => `${id}:${Math.ceil((player.cooldowns[id] || 0) / 60)}`),
    ...player.itemSlots.map((id) => `${id}:${player.counts[id] || 0}`)
  ].join("|");
  if (signature === hotbarSignature) return;
  hotbarSignature = signature;
  const skillsHtml = player.skillSlots.map((id, i) => {
    const karmaSkill = skillForKarma(id, SKILLS[id], player.karma);
    const skill = id === "warrior_blessing" ? { ...karmaSkill, ...blessingForKarma(player.karma) } : karmaSkill;
    const growth = skillGrowth(player.level, id, skill?.kind);
    const cd = Math.ceil((player.cooldowns[id] || 0) / 60);
    return `<div class="game2-hotbar-slot ${cd ? "cooldown" : "ready"}"><span class="game2-hotbar-key">${skillKeys[i]}</span>${skill?.icon || "·"}<span class="game2-hotbar-name">${skill?.name || "비어 있음"} · ${growth.rank}</span><small class="game2-hotbar-tier">T${growth.tier}</small>${cd ? `<span class="game2-hotbar-cooldown">${cd}</span>` : ""}</div>`;
  }).join("");
  const itemsHtml = player.itemSlots.map((id, i) => {
    const item = ITEMS[id];
    const count = player.counts[id] || 0;
    return `<div class="game2-hotbar-slot item"><span class="game2-hotbar-key">${itemKeys[i]}</span>${id?.includes("mana") ? "◆" : id?.includes("stamina") ? "⚡" : "♥"}<span class="game2-hotbar-count">${count}</span><span class="game2-hotbar-name">${item?.name || "비어 있음"}</span></div>`;
  }).join("");
  dom.hotbar.innerHTML = `${skillsHtml}<span class="game2-divider"></span>${itemsHtml}`;
}

function startAttack() {
  if (state !== "running" || player.guardTimer > 0 || player.crossSlashTimer > 0) return;
  if (player.attackTimer > 0) {
    if (player.attackTimer <= 7) player.attackQueued = true;
    return;
  }
  if (player.attackCooldown > 0) return;
  const nextCombo = player.comboWindow > 0 ? (player.attackCombo + 1) % 3 : 0;
  const costs = [3, 4, 6];
  const durations = [17, 18, 22];
  if (player.stamina < costs[nextCombo]) {
    toast("스태미나가 부족합니다");
    return;
  }
  player.stamina -= costs[nextCombo];
  player.sprinting = false;
  player.sprintRegenDelay = 32;
  player.attackCombo = nextCombo;
  player.attackDuration = durations[nextCombo];
  player.attackTimer = player.attackDuration;
  player.attackCooldown = [7, 8, 12][nextCombo] * Math.max(.62, attackInterval() / 31);
  player.comboWindow = 0;
  player.attackSerial += 1;
  attackNpcEnabled = keys.has("Slash") || npcAttackUnlocked(player.karma);
  tone([145, 125, 95][nextCombo], .08 + nextCombo * .015, "sawtooth", .025);
}

function attackBox() {
  const reach = [58, 62, 69][player.attackCombo] + itemStat("weapon", "attack");
  return {
    x: player.face > 0 ? player.x + player.w - 5 : player.x - reach + 5,
    y: player.y + 1, w: reach, h: player.h + 7
  };
}

function currentAttackDamage() {
  let multiplier = [.9, 1, 1.38][player.attackCombo];
  const weapon = ITEMS[player.equipped.weapon];
  if (player.attackCombo === 2) multiplier += weapon?.combo || 0;
  if (weapon?.phase === clock.phase) multiplier *= 1.25;
  return player.attackPower * multiplier;
}

function damageEnemy(enemy, amount, magic = false, knockbackDirection = player.face) {
  if (enemy.dead) return;
  const guarded = enemy.guardBuff > 0 ? (enemy.type === "captain" ? .42 : .58) : 1;
  const damage = Math.max(1, Math.round(amount * (player.transformTimer > 0 ? 1.55 : 1) * guarded));
  enemy.hp -= damage;
  if (enemy.npcId) {
    const npc = NPCS.find((entry) => entry.id === enemy.npcId);
    if (npc && npcStates[npc.id]?.alive) npcStates[npc.id].hp = Math.max(0, Math.ceil(npc.hp * enemy.hp / enemy.maxHp));
  }
  enemy.hurt = 10;
  enemy.x += Math.sign(knockbackDirection || player.face) * (enemy.boss ? 4 : 15);
  burst(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, magic ? "#ff784c" : "#ffe493", 10, 3);
  floater(String(damage), enemy.x, enemy.y - 4, magic ? "#ff9d69" : "#ffe2a2");
  if (player.blessing?.timer > 0 && player.blessing.variant === "demon") {
    player.hp = clamp(player.hp + damage * BLESSINGS.demon.lifeSteal, 0, player.maxHp);
  }
  screenShake = enemy.boss ? 8 : 4;
  if (!magic && player.attackCombo === 2) {
    enemy.leapTimer = 0;
    enemy.launchTimer = 22;
    hitStop = enemy.boss ? 3 : 5;
  }
  if (enemy.hp <= 0) killEnemy(enemy);
}

function damageEnemyFromKarma(enemy) {
  if (enemy.dead || player.karma < 500) return;
  const tierDamage = 1 + Math.floor((player.karma - 500) / 250);
  const damage = Math.max(1, Math.round(tierDamage + player.magicPower * .18));
  enemy.hp -= damage;
  if (enemy.npcId) {
    const npc = NPCS.find((entry) => entry.id === enemy.npcId);
    if (npc && npcStates[npc.id]?.alive) npcStates[npc.id].hp = Math.max(0, Math.ceil(npc.hp * enemy.hp / enemy.maxHp));
  }
  enemy.hurt = 9;
  enemy.karmaContactCooldown = 42;
  player.karmaContactHits = (player.karmaContactHits || 0) + 1;
  burst(enemy.x + enemy.w / 2, enemy.y + enemy.h * .65, player.karma >= 1000 ? "#542060" : "#7c2d65", 7, 2);
  floater(`심연 -${damage}`, enemy.x + enemy.w / 2, enemy.y - 5, "#d873bc");
  if (enemy.hp <= 0) killEnemy(enemy);
}

function killEnemy(enemy) {
  enemy.dead = true;
  if (enemy.escortWaveId) {
    const knight = woundedKnightState();
    knight.waveDefeated ||= {};
    if (!knight.waveDefeated[enemy.escortWaveId]) {
      knight.waveDefeated[enemy.escortWaveId] = true;
      knight.escortKills = (knight.escortKills || 0) + 1;
    }
  }
  if (enemy.persistentSpawn && enemy.spawnId) {
    markSpawnDefeated(worldStates.defeatedSpawns, enemy.spawnId, clock.day);
    const previousCleared = zoneSpawnState.cleared;
    zoneSpawnState = zoneClearStatus(currentZoneId, zone, worldStates.defeatedSpawns);
    if (!previousCleared && zoneSpawnState.cleared) toast(`${zone.name} · 모든 고정 몬스터 토벌 완료`);
  }
  if (enemy.npcId) {
    const npc = NPCS.find((entry) => entry.id === enemy.npcId);
    if (npc && npcStates[npc.id]?.alive) killNpc(npc, enemy.x + enemy.w / 2);
    if (enemy.type === "captain") {
      worldStates.guardRevenge.defeated = true;
      toast("가렌의 최후 맹세가 끝났습니다");
    }
  }
  player.kills += enemy.noLoot ? 0 : 1;
  player.questKills += enemy.noLoot ? 0 : 1;
  gold += enemy.noLoot ? 0 : enemy.gold;
  if (!enemy.noLoot) addXp(enemy.xp, enemy.x, enemy.y);
  if (!enemy.noLoot) floater(`+${enemy.gold}G`, enemy.x, enemy.y - 18, "#ffd06a");
  const deathProfile = enemyEffectProfile(enemy);
  effectBurst(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, deathProfile, enemy.boss ? 54 : enemy.elite ? 32 : 22, enemy.boss ? 7 : 4.2);
  addCombatEffect("skill-impact", enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, {
    radius:deathProfile.radius * (enemy.boss ? 1.45 : 1),
    color:deathProfile.color,
    accent:deathProfile.accent,
    life:enemy.boss ? 58 : 32,
    tier:enemy.boss ? 5 : enemy.elite ? 3 : 2,
    echoes:enemy.boss ? 3 : 1
  });
  const weapon = ITEMS[player.equipped.weapon];
  if (weapon?.lifeOnKill) player.hp = clamp(player.hp + weapon.lifeOnKill, 0, player.maxHp);
  if (enemy.type === "warden") {
    bosses.warden = true;
    gold += 1000;
    player.owned.dusk_armor = true;
    toast("재의 수문장 격파 · 황혼 갑옷 획득");
    autosave("보스 격파");
  } else if (enemy.type === "lich") {
    bosses.lich = true;
    gold += 650;
    toast("지하묘지의 리치를 쓰러뜨렸습니다");
    autosave("던전 군주 격파");
  } else if (enemy.type === "judge") {
    bosses.judge = true;
    player.owned.royal_sword = true;
    gold += 800;
    toast("백은의 심판관 격파 · 왕실 장검 획득");
    autosave("현상 수배 보스 격파");
  } else {
    if (!enemy.noLoot) {
      killsSinceDrop += 1;
      killsSincePickup += 1;
      if (potionDropDecision({ roll: Math.random(), killsSinceDrop, killsSincePickup })) {
        pickups.push({ type: "potion", x: enemy.x, y: enemy.floor - 18, phase: 0, collected: false });
        killsSinceDrop = 0;
      }
    }
    autosave("전투 진행");
  }
  if (worldEvent?.active && enemy.eventId === worldEvent.id && !enemies.some((entry) => !entry.dead && entry.eventId === worldEvent.id)) completeWorldEvent();
  if (enemy.pursuit) checkPursuitDefeated();
}

function hurtPlayer(source, amount = source.damage) {
  if (source?.backgroundOnly || debugGodMode || player.invincible > 0 || state !== "running") return;
  if (player.guardTimer > 0) {
    if (player.parryTimer > 0) {
      if (source?.boss) source.stunned = 90;
      floater("PARRY!", player.x, player.y - 12, "#8de3ff");
      burst(player.x + 18, player.y + 26, "#b7ecff", 18, 4);
      tone(760, .08, "square", .04);
      player.stamina = clamp(player.stamina + 18, 0, player.maxStamina);
      return;
    }
    amount *= .25;
  }
  const activeDefense = player.defense + blessingDefense(player.blessing);
  const damage = Math.max(1, Math.ceil(amount * 100 / (100 + activeDefense * 13)));
  player.hp -= damage;
  player.invincible = 64;
  player.vx = player.x < (source?.x || player.x) ? -5 : 5;
  player.vy = -6;
  screenShake = 7;
  burst(player.x + 18, player.y + 25, "#ff7187", 12, 3);
  floater(`-${damage} HP`, player.x, player.y, "#ff91a1");
  tone(120, .17, "sawtooth", .04);
  updateHud();
  if (player.hp <= 0) die();
}

function damageNpc(npc) {
  const ns = npcStates[npc.id];
  if (!ns?.alive || ns.lastAttackHit === player.attackSerial) return;
  const npcX = npcWorldX(npc);
  const npcFloor = npcWorldFloor(npc);
  ns.lastAttackHit = player.attackSerial;
  if (npc.id === "guard" && !garenAttackReady()) {
    ns.hurt = 7;
    floater("PARRY!", npcX, npcFloor - 88, "#bfe6ff");
    burst(npcX, npcFloor - 43, "#c9eaff", 15, 4);
    player.vx = player.x < npcX ? -4 : 4;
    player.invincible = Math.max(player.invincible, 16);
    screenShake = Math.max(screenShake, 3);
    tone(740, .08, "square", .035);
    toast("가렌은 검을 받아냈지만 아직 당신을 쫓지 않습니다");
    return;
  }
  const defense = npc.guard ? 2 : npc.id === "mage" ? 1 : 0;
  const damage = Math.max(1, player.attackPower - defense);
  ns.hp -= damage;
  ns.hurt = 12;
  ns.flee = 180;
  floater(`-${damage}`, npcX, npcFloor - 76, "#ff7378");
  burst(npcX, npcFloor - 36, "#ef8d78", 12, 3);
  villageAggro = true;
  worldStates.crimeMemory.witnesses += zoneNpcs().filter((entry) =>
    entry.id !== npc.id && npcStates[entry.id]?.alive && Math.abs(npcWorldX(entry) - npcX) < 520
  ).length;
  worldStates.crimeMemory.lastCrimeDay = clock.day;
  if (ns.hp > 0) {
    spawnNpcDefender(npc, npc.id === "guard" && worldStates.guardRevenge.triggered);
    toast(`${npc.name}${["mage","moon_oracle","sun_mage"].includes(npc.id) ? "가 주문을 외우며" : "이 직접 무기를 들고"} 반격합니다!`);
  }
  if (ns.hp <= 0) killNpc(npc, npcX);
}

function killNpc(npc, deathX = npcWorldX(npc), deathZone = currentZoneId, options = {}) {
  const ns = npcStates[npc.id];
  ns.alive = false;
  ns.hp = 0;
  ns.deathDay = clock.day;
  ns.deathMinute = clock.minute;
  ns.deathX = deathX;
  ns.deathZone = deathZone;
  ns.lootAvailable = true;
  setKarma(player.karma + npc.karma, "NPC 사망");
  toast(`${options.message || `${npc.name} 사망`} · KARMA +${npc.karma}`);
  if (options.floater !== false) floater(`KARMA +${npc.karma}`, deathX, floorAt(deathX) - 96, "#ff5f68");
  triggerGuardRevenge();
  updateHud();
}

function nearestEnemy(max = 360) {
  let nearest = null;
  let nearestDistance = max;
  for (const enemy of enemies) {
    if (enemy.dead) continue;
    const distance = Math.abs(enemy.x - player.x);
    if (distance < nearestDistance) {
      nearest = enemy;
      nearestDistance = distance;
    }
  }
  return nearest;
}

function nearestEnemies(max = 360, count = 1) {
  return enemies
    .filter((enemy) => !enemy.dead && Math.abs(enemy.x - player.x) < max)
    .sort((a, b) => Math.abs(a.x - player.x) - Math.abs(b.x - player.x))
    .slice(0, count);
}

function playerSkillPalette(id, skill) {
  if (skill.karmaVariant >= 500 || ["corpse_burst","soul_harvest","abyss_knight"].includes(id)) {
    return { color:skill.color || "#55205f", accent:skill.coreColor || "#e47fc2" };
  }
  if (id === "frost_bind") return { color:"#5aa4c9", accent:"#d9f6ff" };
  if (id === "lightning") return { color:"#7369dc", accent:"#eee9ff" };
  if (id === "meteor") return { color:"#d94b35", accent:"#ffd46b" };
  if (id === "shadow_step") return { color:"#5f4b8f", accent:"#c5a9ff" };
  if (id === "soul_drain" || id === "blood_blade") return { color:"#8f294d", accent:"#ff96ac" };
  if (id === "warrior_blessing") {
    const blessing = blessingForKarma(player.karma);
    return { color:blessing.id === "demon" ? "#7d203e" : "#dcb85a", accent:blessing.color };
  }
  return { color:skill.color || "#ef6a42", accent:skill.coreColor || "#ffe08a" };
}

function recordSkillDebug(id, growth, range) {
  lastSkillDebug = {
    id,
    tier:growth.tier,
    range:Math.round(range || 0),
    effectScale:growth.effectScale
  };
}

function paySkillCost(skill) {
  if (player.cooldowns[skill.id] > 0) return false;
  const key = skill.costType;
  if (player[key] < skill.cost) {
    toast(`${key === "mana" ? "마나" : "스태미나"}가 부족합니다`);
    return false;
  }
  player[key] -= skill.cost;
  player.cooldowns[skill.id] = skill.cooldown;
  return true;
}

function useSkill(slot) {
  if (state !== "running") return;
  const id = player.skillSlots[slot];
  const karmaSkill = skillForKarma(id, SKILLS[id], player.karma);
  const base = id === "warrior_blessing" ? { ...karmaSkill, ...blessingForKarma(player.karma) } : karmaSkill;
  if (!base || !player.ownedSkills[id]) return;
  const skill = { ...base, id };
  if (!paySkillCost(skill)) return;
  const growth = skillGrowth(player.level, id, skill.kind);
  const palette = playerSkillPalette(id, skill);
  const castX = player.x + player.w / 2;
  const castY = player.y + player.h * .48;
  const weather = WEATHER[weatherId] || WEATHER.clear;
  let power = player.attackPower + player.magicPower * .55;
  if (["ember_slash","fire_wave","meteor","sunset_execution"].includes(id)) power *= weather.fire;
  if (id === "lightning") power *= weather.lightning;
  if (ITEMS[player.equipped.weapon]?.phase === clock.phase) power *= 1.25;
  power *= growth.powerScale;
  addCombatEffect("skill-cast", castX, castY, {
    radius:scaledEffectSize(35, growth),
    color:palette.color,
    accent:palette.accent,
    face:player.face,
    life:22 + growth.tier * 2,
    tier:growth.tier,
    echoes:growth.echoCount,
    layer:"front"
  });
  effectBurst(castX, castY, { ...palette, sparks:growth.particleCount }, Math.min(34, growth.particleCount), 3.2 + growth.tier * .3);
  let effectiveRange = 0;

  if (skill.kind === "crossProjectile") {
    const profile = crossSlashProfile(player.level,growth);
    const life = scaledRange(88,growth);
    const radiusX = scaledEffectSize(29 * profile.sizeScale,growth);
    const radiusY = scaledEffectSize(23 * profile.sizeScale,growth);
    const velocity = player.face * profile.velocity * (skill.karmaVariant >= 500 ? 1.08 : 1);
    const originX = castX + player.face * 35;
    player.sprinting = false;
    player.attackTimer = 0;
    player.prevAttackTimer = 0;
    player.attackQueued = false;
    player.comboWindow = 0;
    player.crossSlashDuration = profile.castFrames;
    player.crossSlashTimer = profile.castFrames;
    player.prevCrossSlashTimer = profile.castFrames;
    player.vx *= .35;
    projectiles.add({
      kind:skill.karmaVariant ? "karmaCrossWave" : "crossWave",
      x:originX,
      y:castY,
      prevX:originX,
      prevY:castY,
      vx:velocity,
      life,
      maxLife:life,
      delay:profile.launchDelay,
      launched:false,
      damage:power * skill.power * profile.damageScale,
      hit:new Set(),
      hitCount:0,
      maxHits:profile.maxHits,
      staggerFrames:profile.staggerFrames,
      guardBreak:profile.guardBreak,
      color:palette.color,
      coreColor:palette.accent,
      radiusX,
      radiusY,
      tier:growth.tier,
      echoes:profile.echoCount,
      trailCount:profile.trailCount,
      trailFrame:-1,
      face:player.face
    });
    effectiveRange = Math.abs(velocity) * life;
    addCombatEffect("skill-cross-slash", castX + player.face * 18, castY, {
      radius:scaledEffectSize(66,growth),
      color:palette.color,
      accent:palette.accent,
      face:player.face,
      life:profile.castFrames,
      tier:growth.tier,
      echoes:profile.echoCount,
      source:player,
      sourceYRatio:.48
    });
    screenShake = 3 + Math.min(5,growth.tier);
  } else if (skill.kind === "projectile") {
    const life = scaledRange(95, growth);
    const radiusX = scaledEffectSize(24, growth);
    const radiusY = scaledEffectSize(17, growth);
    const velocity = player.face * (skill.karmaVariant >= 500 ? 9.4 : 8);
    projectiles.add({
      kind: skill.karmaVariant ? "karmaWave" : "wave", x: player.x + player.face * 32, y: player.y + 26,
      vx:velocity,
      life,
      maxLife:life,
      damage:power * skill.power,
      hit:new Set(),
      color:palette.color,
      coreColor:palette.accent,
      radiusX,
      radiusY,
      tier:growth.tier,
      echoes:growth.echoCount,
      trailCount:growth.trailCount,
      trailFrame:-1,
      face:player.face
    });
    effectiveRange = Math.abs(velocity) * life;
    addCombatEffect("skill-slash", castX + player.face * 32, castY, {
      radius:scaledEffectSize(58, growth), color:palette.color, accent:palette.accent,
      face:player.face, life:26, tier:growth.tier, echoes:growth.echoCount
    });
  } else if (skill.kind === "guard") {
    effectiveRange = scaledRange(72, growth);
    player.sprinting = false;
    player.guardTimer = Math.round(skill.duration * growth.durationScale);
    player.parryTimer = 16 + growth.tier;
    addCombatEffect("skill-barrier", castX, player.y + player.h * .52, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      face:player.face, life:38 + growth.tier * 3, tier:growth.tier,
      echoes:growth.echoCount, layer:"front", source:player, sourceYRatio:.52
    });
  } else if (skill.kind === "charge") {
    effectiveRange = scaledRange(330, growth);
    player.chargeTimer = Math.round(30 * growth.durationScale);
    player.vx = player.face * 11;
  } else if (skill.kind === "blessing") {
    const blessing = blessingForKarma(player.karma);
    effectiveRange = scaledRange(92, growth);
    player.blessing = {
      timer:Math.round(blessing.duration * growth.durationScale),
      cast:90,
      variant:blessing.id,
      scale:growth.effectScale,
      tier:growth.tier
    };
    effectBurst(player.x + 18, player.y - 25, { ...palette, sparks:growth.particleCount }, Math.min(48, growth.particleCount + 10), blessing.id === "demon" ? 6 : 4.5);
    addCombatEffect("skill-blessing", castX, player.y + player.h, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      life:70, tier:growth.tier, echoes:growth.echoCount, layer:"back",
      source:player, sourceGround:true, sourceYOffset:-2, variant:blessing.id
    });
    floater(blessing.name, player.x + 18, player.y - 48, blessing.color);
    toast(`${blessing.name} · “${blessing.quote}”`);
    screenShake = blessing.id === "demon" ? 8 : 3;
  } else if (skill.kind === "ultimate") {
    effectiveRange = scaledRange(240, growth);
    for (const enemy of enemies) if (!enemy.dead && Math.abs(enemy.x - player.x) < effectiveRange) damageEnemy(enemy, power * skill.power, true);
    const height = scaledEffectSize(165, growth);
    hazards.add({
      kind:skill.karmaVariant ? "eclipse" : "sunburst",
      x:castX - effectiveRange,
      y:player.y + player.h - height,
      w:effectiveRange * 2,
      h:height,
      telegraph:0,
      active:30 + growth.tier * 2,
      maxActive:30 + growth.tier * 2,
      damage:0,
      friendly:true,
      visualTier:growth.tier,
      color:palette.color,
      accent:palette.accent
    });
    addCombatEffect(skill.karmaVariant ? "skill-eclipse" : "skill-sunburst", castX, player.y + player.h - 4, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      life:46, tier:growth.tier, echoes:growth.echoCount, layer:"back"
    });
    effectBurst(castX, castY, { ...palette, sparks:growth.particleCount }, Math.min(70, growth.particleCount + 22), 7 + growth.tier * .35);
    if (skill.lifeSteal) player.hp = clamp(player.hp + player.maxHp * skill.lifeSteal, 0, player.maxHp);
    screenShake = 12 + growth.tier;
  } else if (skill.kind === "frost") {
    effectiveRange = scaledRange(210, growth);
    for (const enemy of enemies) if (!enemy.dead && Math.abs(enemy.x - player.x) < effectiveRange) {
      enemy.slow = 240;
      damageEnemy(enemy, power * skill.power, true);
    }
    addCombatEffect("skill-frost", castX, player.y + player.h - 3, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      life:44, tier:growth.tier, echoes:growth.echoCount, layer:"back"
    });
  } else if (skill.kind === "blink") {
    effectiveRange = scaledRange(180, growth);
    const originX = castX;
    const originY = castY;
    player.x = clamp(player.x + player.face * effectiveRange, zonePlayerMinX(), zone.width - player.w);
    player.invincible = 30;
    addCombatEffect("skill-blink", originX, originY, {
      targetX:player.x + player.w / 2, targetY:player.y + player.h * .48,
      radius:scaledEffectSize(40, growth), color:palette.color, accent:palette.accent,
      face:player.face, life:30, tier:growth.tier, echoes:growth.echoCount
    });
    effectBurst(player.x + player.w / 2, player.y + 30, { ...palette, sparks:growth.particleCount }, Math.min(38, growth.particleCount), 4.5);
  } else if (skill.kind === "lightning") {
    effectiveRange = scaledRange(520, growth);
    const targets = nearestEnemies(effectiveRange, growth.chainCount);
    targets.forEach((enemy, index) => {
      damageEnemy(enemy, power * skill.power * Math.pow(.82, index), true);
      const active = 10 + growth.tier;
      hazards.add({
        kind:"lightning",
        x:enemy.x - 12 - growth.tier * 2,
        y:54,
        w:enemy.w + 24 + growth.tier * 4,
        h:enemy.y + enemy.h - 54,
        telegraph:10 + index * 4,
        maxTelegraph:10 + index * 4,
        active,
        maxActive:active,
        damage:0,
        friendly:true,
        visualTier:growth.tier,
        color:palette.color,
        accent:palette.accent
      });
      addCombatEffect("skill-lightning", index ? targets[index - 1].x + targets[index - 1].w / 2 : castX, index ? targets[index - 1].y + 20 : castY, {
        targetX:enemy.x + enemy.w / 2, targetY:enemy.y + enemy.h * .45,
        radius:scaledEffectSize(48, growth), color:palette.color, accent:palette.accent,
        life:24 + index * 3, tier:growth.tier, echoes:growth.echoCount
      });
    });
    if (!targets.length) {
      addCombatEffect("skill-lightning", castX, castY, {
        targetX:castX + player.face * Math.min(effectiveRange, 220), targetY:castY - 80,
        radius:scaledEffectSize(42, growth), color:palette.color, accent:palette.accent,
        life:22, tier:growth.tier
      });
    }
  } else if (skill.kind === "meteor") {
    effectiveRange = scaledRange(560, growth);
    const target = nearestEnemy(effectiveRange);
    const width = scaledEffectSize(170, growth);
    const height = scaledEffectSize(158, growth);
    const targetCenter = target?.x + target?.w / 2 || player.x + player.face * Math.min(effectiveRange, scaledRange(180, growth));
    const active = 30 + growth.tier * 2;
    hazards.add({
      kind:"meteor",
      x:targetCenter - width / 2,
      y:floorAt(targetCenter) - height,
      w:width,
      h:height,
      telegraph:Math.max(42, 70 - growth.tier * 3),
      maxTelegraph:Math.max(42, 70 - growth.tier * 3),
      active,
      maxActive:active,
      damage:power * skill.power,
      friendly:true,
      hit:new Set(),
      visualTier:growth.tier,
      color:palette.color,
      accent:palette.accent
    });
    addCombatEffect("skill-meteor-cast", targetCenter, floorAt(targetCenter) - 4, {
      radius:width * .62, color:palette.color, accent:palette.accent,
      life:62, tier:growth.tier, echoes:growth.echoCount, layer:"back"
    });
  } else if (skill.kind === "drain") {
    effectiveRange = scaledRange(280, growth);
    const enemy = nearestEnemy(effectiveRange);
    if (enemy) {
      damageEnemy(enemy, power * skill.power, true);
      player.hp = clamp(player.hp + 3 + growth.tier - 1, 0, player.maxHp);
      addCombatEffect("skill-drain", castX, castY, {
        targetX:enemy.x + enemy.w / 2, targetY:enemy.y + enemy.h * .45,
        radius:scaledEffectSize(46, growth), color:palette.color, accent:palette.accent,
        life:36, tier:growth.tier, echoes:growth.echoCount
      });
    }
  } else if (skill.kind === "corpse") {
    effectiveRange = scaledRange(260, growth);
    const corpse = NPCS.find((n) => !npcStates[n.id].alive && npcStates[n.id].deathZone === currentZoneId && Math.abs(npcStates[n.id].deathX - player.x) < effectiveRange);
    if (!corpse) {
      player[skill.costType] += skill.cost;
      player.cooldowns[id] = 0;
      toast("근처에 시체가 없습니다");
      return;
    }
    const width = scaledEffectSize(210, growth);
    const height = scaledEffectSize(138, growth);
    const active = 22 + growth.tier * 2;
    hazards.add({
      kind:"corpse", x:npcStates[corpse.id].deathX - width / 2,
      y:floorAt(npcStates[corpse.id].deathX) - height, w:width, h:height,
      telegraph:24, maxTelegraph:24, active, maxActive:active,
      damage:power * skill.power, friendly:true, hit:new Set(),
      visualTier:growth.tier, color:palette.color, accent:palette.accent
    });
  } else if (skill.kind === "harvest") {
    effectiveRange = scaledRange(300, growth);
    const deadCount = Object.values(npcStates).filter((n) => !n.alive).length;
    for (const enemy of enemies) if (!enemy.dead && Math.abs(enemy.x - player.x) < effectiveRange) damageEnemy(enemy, power * (skill.power + deadCount * .15), true);
    player.mana = clamp(player.mana + deadCount * 6, 0, player.maxMana);
    addCombatEffect("skill-harvest", castX, player.y + player.h - 3, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      life:52, tier:growth.tier, echoes:growth.echoCount, layer:"back"
    });
  } else if (skill.kind === "transform") {
    effectiveRange = scaledRange(110, growth);
    player.transformTimer = Math.round(600 * growth.durationScale);
    player.hp = player.maxHp;
    addCombatEffect("skill-transform", castX, player.y + player.h - 4, {
      radius:effectiveRange, color:palette.color, accent:palette.accent,
      life:70, tier:growth.tier, echoes:growth.echoCount, layer:"back",
      source:player, sourceGround:true, sourceYOffset:-4
    });
    screenShake = 10 + growth.tier;
  }
  recordSkillDebug(id, growth, effectiveRange);
  if (growth.tier > 1) floater(`${growth.rank} · T${growth.tier}`, castX, player.y - 18, palette.accent);
  tone(skill.kind === "guard" ? 420 : 180, .1, "square", .035);
  updateHud();
}

function useItem(id) {
  if (!id || (player.counts[id] || 0) <= 0) {
    toast("아이템이 없습니다");
    return;
  }
  const item = ITEMS[id];
  if (!item) return;
  if (item.heal && player.hp >= player.maxHp) return toast("이미 체력이 가득합니다");
  if (item.mana && player.mana >= player.maxMana) return toast("이미 마나가 가득합니다");
  if (item.stamina && player.stamina >= player.maxStamina) return toast("이미 스태미나가 가득합니다");
  player.counts[id] -= 1;
  if (item.heal) player.hp = clamp(player.hp + item.heal, 0, player.maxHp);
  if (item.mana) player.mana = clamp(player.mana + item.mana, 0, player.maxMana);
  if (item.stamina) player.stamina = clamp(player.stamina + item.stamina, 0, player.maxStamina);
  if (id === "haste_potion") player.haste = 1800;
  if (id === "memory_potion") {
    player.statPoints += Object.values(player.stats).reduce((a, b) => a + b, 0);
    player.stats = { attack: 0, health: 0, defense: 0, magic: 0, speed: 0 };
    recalcStats();
  }
  burst(player.x + 18, player.y + 24, item.mana ? "#6e7ee6" : "#ff7188", 14, 3);
  tone(620, .1);
  updateHud();
  autosave("아이템 사용");
}

function quickHeal() {
  const id = player.counts.potion > 0 ? "potion" : player.counts.high_potion > 0 ? "high_potion" : null;
  if (id) useItem(id);
  else toast("회복 물약이 없습니다");
}

function addBossHazard(kind, x, w, telegraph, active, damage, delay = 0) {
  const nightRate = clock.isNight ? .82 : 1;
  const telegraphFrames = Math.round(telegraph * nightRate) + delay;
  const tall = ["pillars","wall","lightning"].includes(kind);
  const medium = ["fire","lane","root"].includes(kind);
  const h = kind === "lightning" ? 360 : tall ? 188 : medium ? 120 : 82;
  const y = floorAt(x + w / 2) - h;
  return hazards.add({
    kind, x, y, w, h,
    telegraph:telegraphFrames,
    maxTelegraph:telegraphFrames,
    active,
    maxActive:active,
    damage,
    friendly:false,
    hitPlayer:false,
    visualTier:["pillars","wall","lane","night"].includes(kind) ? 3 : 2
  });
}

function addGarenHazard(pattern, kind, x, w, telegraph, active, damage, rage, delay = 0) {
  const hazard = addBossHazard(kind,x,w,telegraph,active,damage,delay);
  const profile = garenEffectProfile(pattern,rage);
  Object.assign(hazard,{
    garenPattern:pattern,
    color:profile.color,
    accent:profile.accent,
    telegraphColor:profile.telegraph,
    visualTier:profile.tier,
    rage:profile.rage
  });
  return hazard;
}

function triggerEnemyAttack(enemy, duration = 34) {
  const starting = (enemy.attackAnim || 0) <= 0;
  if ((enemy.attackAnim || 0) <= 0) enemy.attackAnimMax = duration;
  else enemy.attackAnimMax = Math.max(enemy.attackAnimMax || duration, duration);
  enemy.attackAnim = Math.max(enemy.attackAnim || 0, duration);
  if (starting) spawnEnemyAttackEffect(enemy);
}

function activateHazardEffect(hazard) {
  if (hazard.activationFx) return;
  hazard.activationFx = true;
  const profile = hazardEffectProfile(hazard.kind, hazard.friendly);
  const centerX = hazard.x + hazard.w / 2;
  const centerY = profile.shape === "lightning" ? hazard.y + hazard.h : hazard.y + hazard.h * .72;
  const radius = Math.max(34, Math.min(260, hazard.w * .56 + hazard.h * .14));
  addCombatEffect(`hazard-${profile.shape}`, centerX, centerY, {
    radius,
    color:hazard.color || profile.color,
    accent:hazard.accent || profile.accent,
    life:Math.max(20, Math.min(52, hazard.maxActive || hazard.active || 24)),
    tier:hazard.visualTier || 2,
    echoes:Math.max(0, (hazard.visualTier || 2) - 2),
    layer:["flame","slam","dark","meteor"].includes(profile.shape) ? "back" : "front"
  });
  effectBurst(centerX, centerY, {
    color:hazard.color || profile.color,
    accent:hazard.accent || profile.accent,
    sparks:8 + (hazard.visualTier || 2) * 4
  }, Math.min(24, 8 + (hazard.visualTier || 2) * 4), profile.shape === "meteor" ? 6 : 3.8);
}

function executeBossPattern(boss) {
  const phase = bossPhase(boss.hp, boss.maxHp);
  const previousPhase = boss.phase;
  boss.phase = phase;
  const data = WARDEN_PHASES[phase];
  const pattern = data.patterns[boss.patternIndex++ % data.patterns.length];
  const dir = player.x >= boss.x ? 1 : -1;
  boss.face = dir;
  if (phase !== previousPhase) {
    const profile = enemyEffectProfile(boss);
    addCombatEffect("enemy-boss", boss.x + boss.w / 2, boss.y + boss.h * .55, {
      radius:profile.radius + phase * 28,
      color:phase === 2 ? "#8d172c" : profile.color,
      accent:phase === 2 ? "#fff08a" : profile.accent,
      face:dir,
      life:72,
      tier:4 + phase,
      echoes:3 + phase,
      layer:"back",
      source:boss,
      sourceYRatio:.55
    });
    effectBurst(boss.x + boss.w / 2, boss.y + boss.h * .5, profile, 38 + phase * 14, 6 + phase);
    floater(`PHASE ${phase + 1} · ${data.name}`, boss.x + boss.w / 2, boss.y - 30, profile.accent);
    screenShake = 14 + phase * 3;
  }
  triggerEnemyAttack(boss, pattern === "lanes" || pattern === "summon" ? 28 : 42);
  if (pattern === "combo") {
    for (let i = 0; i < 3; i++) addBossHazard("slash", dir > 0 ? boss.x + 40 : boss.x - 135, 140, 22, 10, boss.damage, i * 18);
  } else if (pattern === "charge") {
    addBossHazard("charge", dir > 0 ? boss.x : boss.x - 280, 330, 48, 18, boss.damage + 1);
  } else if (pattern === "slam") {
    addBossHazard("slam", boss.x - 125, 330, 55, 18, boss.damage + 1);
  } else if (pattern === "bash") {
    addBossHazard("bash", dir > 0 ? boss.x + 40 : boss.x - 95, 130, 25, 12, boss.damage);
  } else if (pattern === "fireBlade") {
    boss.fireBlade = 240;
    addCombatEffect("enemy-blade", boss.x + boss.w / 2, boss.y + boss.h * .5, {
      radius:110, color:"#c63335", accent:"#ffd069", face:dir,
      life:54, tier:4, echoes:3, source:boss, sourceYRatio:.5
    });
    for (let i = 0; i < 2; i++) addBossHazard("fire", dir > 0 ? boss.x + 40 + i * 115 : boss.x - 155 - i * 115, 130, 38 + i * 10, 20, boss.damage + 1);
  } else if (pattern === "lanes") {
    for (let x = 140; x < zone.width - 120; x += 260) addBossHazard("lane", x, 72, 65 + (x % 3) * 4, 35, boss.damage);
  } else if (pattern === "summon") {
    enemies.push(makeEnemy(["skeleton", clamp(boss.x - 180, 80, zone.width - 100), 438], clock.isNight));
    enemies.push(makeEnemy(["skeleton", clamp(boss.x + 180, 80, zone.width - 100), 438], clock.isNight));
    addCombatEffect("enemy-arcane", boss.x + boss.w / 2, boss.floor - 8, {
      radius:135, color:"#6f334f", accent:"#ffb16c",
      life:60, tier:4, echoes:2, layer:"back"
    });
    floater("재의 망자 소환", boss.x, boss.y - 28, "#ffb16c");
  } else if (pattern === "predictCharge") {
    addBossHazard("predicted", clamp(player.x - 75, 20, zone.width - 170), 170, 52, 22, boss.damage + 2);
  } else if (pattern === "fiveCombo") {
    for (let i = 0; i < 5; i++) addBossHazard("slash", dir > 0 ? boss.x + 35 : boss.x - 130, 150, 16, 9, boss.damage, i * 12);
  } else if (pattern === "pillars") {
    [player.x - 200, player.x, player.x + 200].forEach((x, i) => addBossHazard("pillars", clamp(x, 20, zone.width - 95), 95, 48, 30, boss.damage + 1, i * 7));
  } else if (pattern === "fireWalls") {
    addBossHazard("wall", clamp(player.x - 320, 10, zone.width - 70), 65, 60, 80, boss.damage);
    addBossHazard("wall", clamp(player.x + 280, 10, zone.width - 70), 65, 60, 80, boss.damage);
  }
  if (clock.isNight && phase >= 1 && pattern !== "lanes") {
    addBossHazard("night", clamp(player.x + (Math.random() - .5) * 220, 20, zone.width - 90), 90, 70, 24, boss.damage);
  }
  boss.patternTimer = data.interval * (clock.isNight ? .85 : 1);
}

function executeCaptainPattern(captain,forcedPattern = null) {
  const rage = captain.hp / captain.maxHp < .42;
  if (rage && !captain.enraged) {
    captain.enraged = true;
    captain.speed *= 1.22;
    captain.damage += 2;
    captain.hp = Math.min(captain.maxHp, captain.hp + 14);
    const rageProfile = garenEffectProfile("oath",true);
    effectBurst(captain.x + captain.w / 2, captain.y + 24, rageProfile, 38, 5.5);
    addCombatEffect("enemy-garen-rage", captain.x + captain.w / 2, captain.floor - 8, {
      radius:122, color:rageProfile.color, accent:rageProfile.accent,
      life:72, tier:5, echoes:4, layer:"back",
      source:captain, sourceYRatio:.55
    });
    floater("황혼의 최후 맹세", captain.x, captain.y - 28, "#ff6d65");
    screenShake = Math.max(screenShake, 12);
  }
  const patterns = rage ? ["dash","spearStorm","slam","oath","shield"] : ["shield","dash","spear","slam","banner"];
  const pattern = forcedPattern || patterns[captain.patternIndex++ % patterns.length];
  captain.activePattern = pattern;
  const dir = player.x >= captain.x ? 1 : -1;
  captain.face = dir;
  triggerEnemyAttack(captain, pattern === "banner" ? 18 : 38);
  if (pattern === "shield") {
    captain.guardBuff = 150;
    addGarenHazard("shield","bash",dir > 0 ? captain.x + 34 : captain.x - 128,155,28,13,captain.damage + 1,rage);
    floater("철벽 방패 강타", captain.x, captain.y - 18, "#b8d7e9");
  } else if (pattern === "dash") {
    captain.dashTimer = rage ? 48 : 38;
    captain.dashDir = dir;
    captain.dashHit = false;
    addGarenHazard("dash","charge",dir > 0 ? captain.x : captain.x - 360,410,42,20,0,rage);
    floater(rage ? "피의 추격" : "황혼 돌진", captain.x, captain.y - 18, "#efb66d");
  } else if (pattern === "spear") {
    [-95, 0, 95].forEach((offset, index) =>
      addGarenHazard("spear","predicted",clamp(player.x + offset - 35,12,zone.width - 82),82,44,19,captain.damage + 1,rage,index * 7));
    floater("삼연 창 투척", captain.x, captain.y - 18, "#d7cbb3");
  } else if (pattern === "spearStorm") {
    [-210, -105, 0, 105, 210].forEach((offset, index) =>
      addGarenHazard("spearStorm","pillars",clamp(player.x + offset - 35,12,zone.width - 82),82,48,25,captain.damage + 2,rage,index * 5));
    floater("황혼 창우", captain.x, captain.y - 18, "#ff9d80");
  } else if (pattern === "slam") {
    addGarenHazard("slam","slam",clamp(player.x - 195,8,zone.width - 400),400,52,21,captain.damage + 2,rage);
    floater("대지 분쇄", captain.x, captain.y - 18, "#ffc078");
  } else if (pattern === "banner") {
    captain.hp = Math.min(captain.maxHp, captain.hp + 18);
    captain.guardBuff = 240;
    captain.stunned = 20;
    burst(captain.x + 22, captain.y + 20, "#d7b35e", 26, 4);
    addCombatEffect("enemy-garen-banner",captain.x + captain.w / 2,captain.floor - 4,{
      radius:118,color:"#8c2638",accent:"#ffe19b",life:86,tier:4,echoes:2,layer:"back",
      source:captain,sourceGround:true,sourceYOffset:-3
    });
    floater("+18 최후의 수호 깃발", captain.x, captain.y - 18, "#ffe19b");
  } else {
    for (let i = 0; i < 7; i++) {
      addGarenHazard("oath","slash",dir > 0 ? captain.x + 28 : captain.x - 145,175,18,10,captain.damage + 2,true,i * 9);
    }
    captain.dashTimer = 24;
    captain.dashDir = dir;
    captain.dashHit = false;
    floater("최후의 맹세", captain.x, captain.y - 18, "#ff6871");
  }
  captain.patternTimer = rage ? 68 : 92;
}

function executePursuitAbility(enemy) {
  const distance = Math.abs(player.x - enemy.x);
  if (enemy.type === "priest") {
    const ally = enemies.filter((entry) => entry.pursuit && !entry.dead && entry !== enemy)
      .sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
    if (ally && ally.hp < ally.maxHp) {
      triggerEnemyAttack(enemy, 34);
      ally.hp = Math.min(ally.maxHp, ally.hp + 12);
      ally.guardBuff = 90;
      effectBurst(ally.x + ally.w / 2, ally.y + 20, { color:"#d9c987", accent:"#fff3bd", sparks:18 }, 18, 2.4);
      addCombatEffect("skill-blessing", ally.x + ally.w / 2, ally.floor - 6, {
        radius:72, color:"#d9c987", accent:"#fff3bd",
        life:42, tier:2, echoes:1, layer:"back"
      });
      floater("+12 왕실 성역", ally.x, ally.y - 16, "#fff0ae");
    }
  } else if (enemy.type === "royalMage" && distance < 620) {
    triggerEnemyAttack(enemy, 38);
    [-120, 0, 120].forEach((offset, index) =>
      addBossHazard("lightning", clamp(player.x + offset - 40, 10, zone.width - 90), 90, 52, 18, enemy.damage + 1, index * 7));
    floater("삼중 왕실 낙뢰", enemy.x, enemy.y - 15, "#d8caff");
  } else if (enemy.type === "crossbow" && distance < 650) {
    triggerEnemyAttack(enemy, 32);
    [-70, 0, 70].forEach((offset, index) =>
      addBossHazard("predicted", clamp(player.x + offset - 30, 10, zone.width - 78), 78, 36, 14, enemy.damage + 1, index * 5));
    floater("관통 연사", enemy.x, enemy.y - 15, "#e3c5a4");
  } else if (["soldier","hound"].includes(enemy.type) && distance < 430) {
    enemy.dashTimer = enemy.type === "hound" ? 28 : 24;
    enemy.dashDir = player.x >= enemy.x ? 1 : -1;
    enemy.dashHit = false;
    triggerEnemyAttack(enemy, 30);
    floater(enemy.type === "hound" ? "사냥 돌진" : "왕국 돌격", enemy.x, enemy.y - 15, "#f0b26e");
  } else if (enemy.type === "adventurer" && distance < 520) {
    enemy.dashTimer = distance > 135 ? 25 : 12;
    enemy.dashDir = player.x >= enemy.x ? 1 : -1;
    enemy.dashHit = false;
    triggerEnemyAttack(enemy, 36);
    for (let index = 0; index < 3; index++)
      addBossHazard("slash", enemy.face > 0 ? enemy.x + 25 : enemy.x - 125, 150, 15, 9, enemy.damage + 1, index * 10);
    floater("모험가 돌진 삼연격", enemy.x, enemy.y - 15, "#d6b58a");
  } else if (enemy.type === "shieldKnight" && distance < 470) {
    if (distance > 145) {
      enemy.dashTimer = 22;
      enemy.dashDir = player.x >= enemy.x ? 1 : -1;
      enemy.dashHit = false;
    }
    triggerEnemyAttack(enemy, 34);
    enemy.guardBuff = 125;
    addBossHazard("bash", enemy.face > 0 ? enemy.x + 30 : enemy.x - 125, 145, 24, 13, enemy.damage + 1);
    floater("철벽 압박", enemy.x, enemy.y - 15, "#aebed0");
  } else if (enemy.type === "inquisitor") {
    triggerEnemyAttack(enemy, 38);
    for (let index = 0; index < 5; index++)
      addBossHazard("slash", enemy.face > 0 ? enemy.x + 28 : enemy.x - 140, 170, 16, 9, enemy.damage + 1, index * 10);
    floater("이단 심판", enemy.x, enemy.y - 15, "#f0d6ad");
  }
  enemy.patternTimer = enemy.type === "priest" ? 135 : enemy.type === "inquisitor" ? 76 : 96;
}

function executeNpcAbility(enemy) {
  const npc = NPCS.find((entry) => entry.id === enemy.npcId);
  if (!npc) return;
  const distance = Math.abs(player.x - enemy.x);
  const dir = player.x >= enemy.x ? 1 : -1;
  enemy.face = dir;
  if (["mage","briarMage"].includes(enemy.type) && distance < 600) {
    triggerEnemyAttack(enemy, 36);
    [-85,0,85].forEach((offset,index) =>
      addBossHazard("lightning", clamp(player.x + offset - 36, 10, zone.width - 82), 82, 42, 16, enemy.damage + 1, index * 6));
    floater("삼중 마력 폭격", enemy.x, enemy.y - 14, "#c8b6ff");
  } else if (["ranger","hunter"].includes(enemy.type) && distance < 620) {
    triggerEnemyAttack(enemy, 34);
    [-60,0,60].forEach((offset,index) =>
      addBossHazard("predicted", clamp(player.x + offset - 28, 10, zone.width - 68), 68, 31, 13, enemy.damage, index * 5));
    floater("분노의 연사", enemy.x, enemy.y - 14, "#dbbd83");
  } else if (enemy.type === "spellblade" && distance < 360) {
    triggerEnemyAttack(enemy, 40);
    for (let index=0;index<4;index++)
      addBossHazard("slash", dir > 0 ? enemy.x + 20 : enemy.x - 132, 152, 16, 9, enemy.damage + 1, index * 9);
    enemy.dashTimer = 22; enemy.dashDir = dir; enemy.dashHit = false;
    floater("주문검 난무", enemy.x, enemy.y - 14, "#d097ff");
  } else if (distance < 185) {
    triggerEnemyAttack(enemy, 34);
    enemy.guardBuff = npc.guard ? 105 : 40;
    for (let index = 0; index < (npc.guard ? 3 : 2); index++)
      addBossHazard("slash", dir > 0 ? enemy.x + 20 : enemy.x - 118, 138, 16, 10, enemy.damage + 1, index * 9);
    floater(npc.guard ? "경비대 연속 베기" : "필사의 반격", enemy.x, enemy.y - 14, "#efc280");
  } else if (distance < 540) {
    triggerEnemyAttack(enemy, 30);
    enemy.dashTimer = npc.guard ? 28 : 22;
    enemy.dashDir = dir;
    enemy.dashHit = false;
    floater(npc.guard ? "수호 돌진" : "추격 베기", enemy.x, enemy.y - 14, "#efc280");
  }
  enemy.patternTimer = npc.guard ? 78 : ["mage","ranger"].includes(enemy.type) ? 92 : 84;
}

function executeMonsterAbility(enemy) {
  const distance = Math.abs(player.x - enemy.x);
  const dir = player.x >= enemy.x ? 1 : -1;
  enemy.face = dir;
  if (distance > 680) {
    enemy.patternTimer = 70;
    return;
  }
  triggerEnemyAttack(enemy, ["lich","judge"].includes(enemy.type) ? 46 : 36);

  if (enemy.type === "mage") {
    addBossHazard("lightning", clamp(player.x - 42, 10, zone.width - 94), 94, 52, 18, enemy.damage);
    floater("타락 낙뢰", enemy.x, enemy.y - 14, "#d3c4ff");
    enemy.patternTimer = 128;
  } else if (enemy.type === "briarMage") {
    [-80, 80].forEach((offset, index) =>
      addBossHazard("root", clamp(player.x + offset - 45, 10, zone.width - 100), 100, 46, 24, enemy.damage, index * 8));
    floater("월가시 속박", enemy.x, enemy.y - 14, "#c7dda1");
    enemy.patternTimer = 118;
  } else if (enemy.type === "ghost") {
    addBossHazard("night", clamp(player.x - 60, 10, zone.width - 130), 130, 48, 25, enemy.damage);
    floater("망령 파동", enemy.x, enemy.y - 14, "#c4b5ec");
    enemy.patternTimer = 132;
  } else if (enemy.type === "treant") {
    [-110, 0, 110].forEach((offset, index) =>
      addBossHazard("root", clamp(player.x + offset - 38, 10, zone.width - 86), 86, 54, 28, enemy.damage, index * 7));
    floater("고목의 뿌리", enemy.x, enemy.y - 14, "#c9dd8d");
    enemy.patternTimer = 142;
  } else if (enemy.type === "sunscorpion") {
    addBossHazard("venom", clamp(player.x - 70, 10, zone.width - 150), 150, 44, 34, enemy.damage);
    floater("태양 독침", enemy.x, enemy.y - 14, "#f1e47b");
    enemy.patternTimer = 116;
  } else if (enemy.type === "flameDjinn") {
    [-95, 95].forEach((offset, index) =>
      addBossHazard("fire", clamp(player.x + offset - 55, 10, zone.width - 120), 120, 48, 30, enemy.damage, index * 9));
    floater("진의 홍염", enemy.x, enemy.y - 14, "#ffbe68");
    enemy.patternTimer = 108;
  } else if (enemy.type === "lich") {
    [-145, 0, 145].forEach((offset, index) =>
      addBossHazard(index === 1 ? "lightning" : "night", clamp(player.x + offset - 48, 10, zone.width - 105), 105, 56, 28, enemy.damage + 1, index * 9));
    addCombatEffect("enemy-arcane", enemy.x + enemy.w / 2, enemy.floor - 6, {
      radius:105, color:"#4f326f", accent:"#d59cff",
      life:52, tier:4, echoes:2, layer:"back"
    });
    floater("사령 군주의 의식", enemy.x, enemy.y - 18, "#d8afff");
    enemy.patternTimer = 94;
  } else if (enemy.type === "judge") {
    for (let index = 0; index < 4; index++)
      addBossHazard("slash", dir > 0 ? enemy.x + 30 : enemy.x - 150, 180, 18, 10, enemy.damage + 1, index * 11);
    addBossHazard("lightning", clamp(player.x - 50, 10, zone.width - 110), 110, 54, 20, enemy.damage + 2, 18);
    floater("백은 심판식", enemy.x, enemy.y - 18, "#f2e8ff");
    enemy.patternTimer = 84;
  }
}

function updatePlayer(dt) {
  const wasGrounded = player.grounded;
  const moving = Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"));
  const sprint = sprintDecision({
    moving, shift: keys.has("ShiftLeft") || keys.has("ShiftRight"), stamina: player.stamina,
    exhausted: player.exhausted, guardTimer: player.guardTimer, attackTimer:Math.max(player.attackTimer,player.crossSlashTimer),
    transformed: player.transformTimer > 0
  });
  player.sprinting = sprint.sprinting;
  const sprintMultiplier = sprint.multiplier;
  const castMovement = player.crossSlashTimer > 0 ? .34 : 1;
  const target = moving * player.moveSpeed * sprintMultiplier * (player.transformTimer > 0 ? 1.14 : 1) * castMovement;
  const airControl = player.grounded ? .28 : .11;
  if (player.chargeTimer <= 0) player.vx += (target - player.vx) * Math.min(1, airControl * dt);
  if (moving && Math.abs(player.vx) > .2) player.face = moving > 0 ? 1 : -1;
  if ((keys.has("Space") || keys.has("ArrowUp")) && player.grounded) {
    player.vy = -player.jump;
    player.grounded = false;
    player.airTime = 0;
    player.jumpSquash = 5;
    keys.delete("Space");
    keys.delete("ArrowUp");
    for (let index = 0; index < 5; index++) particles.add({
      x: player.x + player.w / 2 + (Math.random() - .5) * 22,
      y: player.y + player.h - 2,
      vx: -player.face * (.35 + Math.random() * .7),
      vy: -.4 - Math.random() * .8,
      life: 13 + Math.random() * 7,
      size: index % 2 ? 2 : 3,
      color: "#aa9278"
    });
    tone(230, .07);
  }
  player.vy += .58 * dt;
  let nextX = clamp(player.x + player.vx * dt, zonePlayerMinX(), zone.width - player.w);
  if (player.grounded && player.vy >= 0) {
    const currentFloor = floorAt(player.x + player.w / 2);
    const nextFloor = floorAt(nextX + player.w / 2);
    const stepHeight = currentFloor - nextFloor;
    if (stepHeight > 0 && stepHeight <= 55) {
      player.y = nextFloor - player.h;
      player.vy = 0;
    }
  }
  const horizontal = resolveHorizontalMovement({
    x: player.x, y: player.y, w: player.w, h: player.h, nextX, platforms
  });
  nextX = horizontal.x;
  player.wallBlocked = horizontal.blocked;
  if (horizontal.blocked) player.vx = 0;
  player.x = nextX;
  const oldBottom = player.y + player.h;
  player.y += player.vy * dt;
  const landingVelocity = player.vy;
  player.grounded = false;
  for (const p of platforms) {
    const bottom = player.y + player.h;
    if (player.x + player.w > p.x + 2 && player.x < p.x + p.w - 2 && oldBottom <= p.y + 6 && bottom >= p.y && player.vy >= 0) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.grounded = true;
    }
  }
  player.jumpSquash = Math.max(0, player.jumpSquash - dt);
  if (player.grounded) {
    player.airTime = 0;
    if (!wasGrounded && landingVelocity > 2.5) {
      player.landTimer = 9;
      for (let index = 0; index < 7; index++) particles.add({
        x: player.x + player.w / 2 + (Math.random() - .5) * 28,
        y: player.y + player.h - 2,
        vx: (Math.random() - .5) * 2.2,
        vy: -.25 - Math.random() * .65,
        life: 12 + Math.random() * 8,
        size: index % 3 ? 2 : 3,
        color: "#9e8972"
      });
    } else {
      player.landTimer = Math.max(0, player.landTimer - dt);
    }
  } else {
    player.airTime += dt;
    player.landTimer = 0;
  }
  const hadAttack = player.attackTimer > 0;
  player.invincible = Math.max(0, player.invincible - dt);
  player.attackTimer = Math.max(0, player.attackTimer - dt);
  if (hadAttack && player.attackTimer === 0) {
    player.comboWindow = player.attackCombo === 2 ? 0 : 28;
    if (player.attackQueued) {
      player.attackQueued = false;
      if (player.attackCombo < 2) {
        player.attackCooldown = 0;
        startAttack();
      }
    }
  }
  else if (!hadAttack) player.comboWindow = Math.max(0, player.comboWindow - dt);
  if (player.comboWindow === 0 && player.attackTimer === 0 && player.attackCombo === 2) player.attackCombo = 0;
  player.attackCooldown = Math.max(0, player.attackCooldown - dt);
  player.crossSlashTimer = Math.max(0,player.crossSlashTimer - dt);
  player.guardTimer = Math.max(0, player.guardTimer - dt);
  player.parryTimer = Math.max(0, player.parryTimer - dt);
  player.chargeTimer = Math.max(0, player.chargeTimer - dt);
  player.transformTimer = Math.max(0, player.transformTimer - dt);
  player.blessing.timer = Math.max(0, player.blessing.timer - dt);
  player.blessing.cast = Math.max(0, player.blessing.cast - dt);
  player.haste = Math.max(0, player.haste - dt);
  player.exhausted = Math.max(0, player.exhausted - dt);
  for (const id in player.cooldowns) player.cooldowns[id] = Math.max(0, player.cooldowns[id] - dt);
  player.mana = clamp(player.mana + .045 * dt, 0, player.maxMana);
  const sprintResources = sprintStaminaStep({
    stamina: player.stamina, maxStamina: player.maxStamina, sprinting: player.sprinting,
    regenDelay: player.sprintRegenDelay, moving: moving !== 0, dt
  });
  player.stamina = sprintResources.stamina;
  player.sprintRegenDelay = sprintResources.regenDelay;
  if (player.sprinting) {
    if (sprintResources.exhausted > 0) {
      player.sprinting = false;
      player.exhausted = sprintResources.exhausted;
      dom.resourceHud.classList.add("exhausted");
      setTimeout(() => dom.resourceHud.classList.remove("exhausted"), 800);
      toast("숨이 찼습니다");
    }
    const dustFrame = Math.floor(player.runFrame / 9);
    if (player.grounded && dustFrame !== player.lastDustFrame) {
      player.lastDustFrame = dustFrame;
      particles.add({ x: player.x + 18 - player.face * 12, y: player.y + player.h - 2, vx: -player.face * (1 + Math.random()), vy: -1.1, life: 18, size: 3, color: "#b7a081" });
    }
  }
  dom.resourceHud.classList.toggle("sprinting", player.sprinting);
  player.runFrame += Math.abs(player.vx) * (player.sprinting ? .2 : .12) * dt;
  player.auraFrame += dt;
  if (player.corruptionTrail.length) player.corruptionTrail.length = 0;
  if (player.y > H + 100) {
    const safeX = clamp(player.x + player.w / 2, zonePlayerMinX() + 1, zone.width - 1);
    player.y = floorAt(safeX) - player.h;
    player.vx = 0;
    player.vy = 0;
    player.grounded = true;
    player.invincible = Math.max(player.invincible, 75);
    player.fallRescues = (player.fallRescues || 0) + 1;
    toast("안전한 지면으로 복귀했습니다");
  }
}

function attackIsActive() {
  const start = [13, 14, 17][player.attackCombo];
  const end = [5, 5, 6][player.attackCombo];
  return player.attackTimer <= start && player.attackTimer >= end;
}

function enemyLeash(enemy) {
  if (enemy.boss) return 540;
  if (enemy.npcId || enemy.revenge || enemy.pursuit || enemy.escortHunter) return zone.width;
  if (["hunter","ranger","spellblade"].includes(enemy.type)) return 900;
  if (["wolf","hound","moonstalker"].includes(enemy.type)) return 260;
  return 135;
}

function clampEnemyToLeash(enemy, x) {
  const leash = enemyLeash(enemy);
  return clamp(x, Math.max(0, enemy.homeX - leash), Math.min(zone.width - enemy.w, enemy.homeX + leash));
}

function updateEnemies(dt) {
  const attackActive = attackIsActive();
  const box = attackActive ? attackBox() : null;
  const escortBox = woundedKnightHitbox();
  for (const enemy of enemies) {
    if (enemy.dead || (!enemy.escortHunter && !inView(enemy.x, enemy.w, 520))) continue;
    const previousEnemyX = enemy.x;
    enemy.hurt = Math.max(0, enemy.hurt - dt);
    enemy.slow = Math.max(0, enemy.slow - dt);
    enemy.stunned = Math.max(0, enemy.stunned - dt);
    enemy.guardBuff = Math.max(0, (enemy.guardBuff || 0) - dt);
    enemy.attackAnim = Math.max(0, (enemy.attackAnim || 0) - dt);
    if (enemy.attackAnim === 0) enemy.attackAnimMax = 0;
    enemy.karmaContactCooldown = Math.max(0, (enemy.karmaContactCooldown || 0) - dt);
    enemy.escortAttackCooldown = Math.max(0,(enemy.escortAttackCooldown || 0) - dt);
    const wasDashing = enemy.dashTimer > 0;
    const wasLeaping = enemy.leapTimer > 0;
    enemy.dashTimer = Math.max(0, (enemy.dashTimer || 0) - dt);
    enemy.leapTimer = Math.max(0, (enemy.leapTimer || 0) - dt);
    enemy.leapCooldown = Math.max(0, (enemy.leapCooldown || 0) - dt);
    enemy.fireBlade = Math.max(0, (enemy.fireBlade || 0) - dt);
    enemy.launchTimer = Math.max(0, (enemy.launchTimer || 0) - dt);
    if (enemy.launchTimer > 0) enemy.y = enemy.floor - enemy.h - Math.sin((22 - enemy.launchTimer) / 22 * Math.PI) * 18;
    else if (enemy.leapTimer > 0) {
      const leapProgress = 1 - enemy.leapTimer / enemy.leapDuration;
      enemy.y = enemy.floor - enemy.h - Math.sin(leapProgress * Math.PI) * 34;
    }
    else enemy.y = enemy.floor - enemy.h;
    enemy.step += dt;
    if (wasDashing) {
      const dashSpeed = enemy.type === "captain" ? 7.4 : enemy.type === "hound" ? 6.8 : 5.9;
      enemy.face = enemy.dashDir >= 0 ? 1 : -1;
      enemy.x = clamp(enemy.x + enemy.dashDir * dashSpeed * dt, 0, zone.width - enemy.w);
      if (Math.floor(enemy.step) % 3 === 0) particles.add({
        x: enemy.x + enemy.w / 2, y: enemy.y + enemy.h - 8,
        vx: -enemy.dashDir * 1.4, vy: -.3, life: 12, size: enemy.type === "captain" ? 7 : 5,
        color: enemy.type === "captain" ? "#d95b55" : "#b39a77"
      });
    } else if (wasLeaping) {
      enemy.face = enemy.leapDir >= 0 ? 1 : -1;
      enemy.x = clampEnemyToLeash(enemy, enemy.x + enemy.leapDir * 4.9 * dt);
    } else if (enemy.stunned <= 0) {
      if (enemy.boss) {
        enemy.patternTimer -= dt;
        if (enemy.patternTimer <= 0) executeBossPattern(enemy);
      } else if (enemy.type === "captain" && (enemy.revenge || enemy.npcId === "guard")) {
        enemy.patternTimer -= dt;
        if (enemy.patternTimer <= 0) executeCaptainPattern(enemy);
      } else if (enemy.pursuit) {
        enemy.patternTimer -= dt;
        if (enemy.patternTimer <= 0) executePursuitAbility(enemy);
      } else if (enemy.npcId) {
        enemy.patternTimer -= dt;
        if (enemy.patternTimer <= 0) executeNpcAbility(enemy);
      } else if (SPECIAL_EFFECT_MONSTERS.has(enemy.type)) {
        enemy.patternTimer -= dt;
        if (enemy.patternTimer <= 0) executeMonsterAbility(enemy);
      }
      const playerDistance = player.x + player.w / 2 - (enemy.x + enemy.w / 2);
      const knightDistance = escortBox ? escortBox.x + escortBox.w / 2 - (enemy.x + enemy.w / 2) : Infinity;
      const targetsKnight = !!escortBox && !enemy.npcId && (
        enemy.escortHunter || Math.abs(knightDistance) + 28 < Math.abs(playerDistance)
      );
      enemy.escortTargeting = targetsKnight;
      const distance = targetsKnight ? knightDistance : playerDistance;
      const chaseRange = enemy.boss ? 560 : enemy.npcId || enemy.revenge || enemy.pursuit || enemy.escortHunter ? zone.width : ["hunter","ranger","spellblade"].includes(enemy.type) ? 620 : 285;
      const chasing = Math.abs(distance) < chaseRange;
      let dir = chasing ? Math.sign(distance) : Math.sin(enemy.step * .024);
      const beastCanLeap = ["wolf","hound","moonstalker"].includes(enemy.type)
        && enemy.leapCooldown <= 0
        && Math.abs(distance) >= 90
        && Math.abs(distance) <= 245;
      if (beastCanLeap) {
        enemy.leapDuration = enemy.type === "hound" ? 24 : 28;
        enemy.leapTimer = enemy.leapDuration;
        enemy.leapDir = distance >= 0 ? 1 : -1;
        enemy.leapHit = false;
        enemy.leapCooldown = 150 + Math.random() * 90;
        triggerEnemyAttack(enemy, enemy.leapDuration);
      }
      if (enemy.pursuit && ["royalMage","crossbow","priest"].includes(enemy.type) && Math.abs(distance) < 255) dir = 0;
      const slow = enemy.slow > 0 ? .4 : 1;
      const bossPace = enemy.boss && enemy.phase === 2 ? 1.28 : 1;
      enemy.face = dir >= 0 ? 1 : -1;
      enemy.x += dir * enemy.speed * slow * bossPace * dt;
      enemy.x = clampEnemyToLeash(enemy, enemy.x);
    }
    if (enemy.escortHunter && enemy.launchTimer <= 0 && enemy.leapTimer <= 0) {
      const terrainFloor = fallingSupportFloorAt(
        platforms,enemy.x + enemy.w / 2,enemy.floor
      );
      if (terrainFloor < enemy.floor - 14) {
        enemy.x = previousEnemyX;
      } else {
        enemy.floor += clamp(terrainFloor - enemy.floor,-3.8,6.2) * dt;
      }
      enemy.y = enemy.floor - enemy.h;
    }
    const touching = overlap(player, enemy);
    const touchingKnight = !!escortBox && overlap(escortBox,enemy);
    if (touching && player.invincible <= 0 && enemy.attackAnim <= 0) {
      triggerEnemyAttack(enemy, enemy.boss ? 30 : ["wolf","hound","moonstalker"].includes(enemy.type) ? 20 : 24);
    }
    if (touchingKnight && enemy.escortAttackCooldown <= 0 && enemy.attackAnim <= 0) {
      triggerEnemyAttack(enemy,["wolf","hound","moonstalker"].includes(enemy.type) ? 20 : 24);
    }
    if (touching && player.karma >= 500 && enemy.karmaContactCooldown <= 0) damageEnemyFromKarma(enemy);
    if (enemy.dead) continue;
    if (box && enemy.lastAttackHit !== player.attackSerial && overlap(box, enemy)) {
      enemy.lastAttackHit = player.attackSerial;
      damageEnemy(enemy, currentAttackDamage());
    } else if (player.chargeTimer > 0 && overlap(player, enemy) && enemy.lastCharge !== player.attackSerial) {
      enemy.lastCharge = player.attackSerial;
      damageEnemy(enemy, player.attackPower * 1.35);
    }
    if (enemy.dead) continue;
    if (touchingKnight && enemy.escortAttackCooldown <= 0) {
      const impact = enemy.damage + (wasDashing || wasLeaping ? 2 : 0);
      enemy.escortAttackCooldown = ["wolf","hound","moonstalker"].includes(enemy.type) ? 44 : 58;
      damageWoundedKnight(enemy,impact);
      if (woundedKnightEscortActive(woundedKnightState())) {
        screenShake = Math.max(screenShake,4);
        enemy.x += Math.sign(enemy.x - escortBox.x) * 5;
      }
    }
    if (touching) {
      if (wasDashing && !enemy.dashHit) {
        enemy.dashHit = true;
        hurtPlayer(enemy, enemy.damage + (enemy.type === "captain" ? 4 : 2));
        screenShake = Math.max(screenShake, enemy.type === "captain" ? 14 : 8);
      } else if (wasLeaping && !enemy.leapHit) {
        enemy.leapHit = true;
        hurtPlayer(enemy, enemy.damage + 1);
        screenShake = Math.max(screenShake, 6);
      } else if (!enemy.boss) {
        hurtPlayer(enemy);
      }
    }
  }
  if (box && attackNpcEnabled) {
    for (const npc of zoneNpcs()) {
      const ns = npcStates[npc.id];
      if (!ns.alive || ns.hostile || !npcVisible(npc)) continue;
      const nx = npcWorldX(npc);
      if (overlap(box, { x: nx - 13, y: npcWorldFloor(npc) - 62, w: 28, h: 62 })) damageNpc(npc);
    }
  }
}

function updateProjectiles(dt) {
  projectiles.update((p) => {
    if (p.delay > 0) {
      p.delay = Math.max(0,p.delay - dt);
      return true;
    }
    if (!p.launched) {
      p.launched = true;
      addCombatEffect(p.kind.toLowerCase().includes("crosswave") ? "skill-cross-release" : "skill-impact",p.x,p.y,{
        radius:Math.max(p.radiusX || 24,p.radiusY || 17) * 1.4,
        color:p.color,
        accent:p.coreColor,
        face:Math.sign(p.vx),
        life:20,
        tier:p.tier || 1,
        echoes:p.echoes || 0
      });
      effectBurst(p.x,p.y,{ color:p.color,accent:p.coreColor,sparks:8 + (p.tier || 1) * 3 },Math.min(28,8 + (p.tier || 1) * 3),3.8);
    }
    p.x += p.vx * dt;
    p.life -= dt;
    const trailFrame = Math.floor(p.life / 2);
    if (trailFrame !== p.trailFrame) {
      p.trailFrame = trailFrame;
      const crossWave = p.kind.toLowerCase().includes("crosswave");
      const trailCount = Math.min(crossWave ? 4 : 3,p.trailCount || 1);
      for (let index = 0; index < trailCount; index++) {
        particles.add({
          x:p.x - Math.sign(p.vx) * (10 + index * 7),
          y:p.y + (index - (trailCount - 1) / 2) * (crossWave ? 6 : 5),
          vx:-p.vx * .08 + (Math.random() - .5) * .7,
          vy:(Math.random() - .5) * .7,
          life:10 + (p.tier || 1) * 1.5,
          size:index === 0 ? (crossWave ? 3 : 4) : 2,
          color:index % 2 ? p.coreColor : p.color,
          glow:true
        });
      }
    }
    const radiusX = p.radiusX || 24;
    const radiusY = p.radiusY || 17;
    for (const enemy of enemies) {
      if (enemy.dead || p.hit.has(enemy)) continue;
      if (overlap({ x:p.x - radiusX, y:p.y - radiusY, w:radiusX * 2, h:radiusY * 2 }, enemy)) {
        p.hit.add(enemy);
        p.hitCount = (p.hitCount || 0) + 1;
        if (p.guardBreak && enemy.guardBuff > 0) {
          enemy.guardBuff = 0;
          floater("GUARD BREAK",enemy.x,enemy.y - 18,p.coreColor);
        }
        if (p.staggerFrames > 0 && !enemy.boss) enemy.stunned = Math.max(enemy.stunned || 0,p.staggerFrames);
        damageEnemy(enemy, p.damage, true, Math.sign(p.vx));
        addCombatEffect("skill-impact", enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, {
          radius:Math.max(radiusX, radiusY) * 1.8,
          color:p.color,
          accent:p.coreColor,
          face:Math.sign(p.vx),
          life:22,
          tier:p.tier || 1,
          echoes:p.echoes || 0
        });
        if ((p.tier || 1) >= 4) effectBurst(
          enemy.x + enemy.w / 2,
          enemy.y + enemy.h / 2,
          { color:p.color,accent:p.coreColor,sparks:10 + p.tier * 2 },
          Math.min(28,10 + p.tier * 2),
          4.5
        );
        if (p.maxHits && p.hitCount >= p.maxHits) {
          p.life = 0;
          break;
        }
      }
    }
    return p.life > 0 && p.x > -100 && p.x < zone.width + 100;
  });
}

function updateHazards(dt) {
  hazards.update((h) => {
    if (h.telegraph > 0) {
      h.telegraph -= dt;
      if (h.telegraph <= 0) activateHazardEffect(h);
      return true;
    }
    activateHazardEffect(h);
    h.active -= dt;
    if (h.friendly) {
      if (h.damage > 0) {
        h.hit ||= new Set();
        for (const enemy of enemies) if (!enemy.dead && !h.hit.has(enemy) && overlap(h, enemy)) {
          h.hit.add(enemy);
          damageEnemy(enemy, h.damage, true);
        }
      }
    } else if (h.damage > 0 && !h.hitPlayer && overlap(h, player)) {
      h.hitPlayer = true;
      const boss = enemies.find((e) => e.boss && !e.dead);
      hurtPlayer(boss || h, h.damage);
    }
    return h.active > 0;
  });
}

function updateCollectibles(dt) {
  for (const c of crystals) {
    if (c.collected) continue;
    c.phase += .04 * dt;
    if (overlap(player, { x: c.x - 12, y: c.y - 16, w: 24, h: 32 })) {
      c.collected = true;
      player.collectedCrystals[c.id] = true;
      player.crystals += 1;
      gold += 20;
      burst(c.x, c.y, "#ffca67", 10, 3);
      addXp(7, c.x, c.y);
      autosave("수정 획득");
    }
  }
  for (const p of pickups) {
    if (p.collected) continue;
    p.phase += .05 * dt;
    if (overlap(player, { x: p.x - 13, y: p.y - 18, w: 26, h: 30 })) {
      p.collected = true;
      player.counts[p.type] = (player.counts[p.type] || 0) + 1;
      killsSincePickup = 0;
      floater("회복 물약 +1", p.x, p.y - 8, "#ff9cac");
      autosave("아이템 획득");
    }
  }
}

function updateEffects(dt) {
  particles.update((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += .13 * dt;
    return p.life > 0;
  });
  floaters.update((f) => {
    f.life -= dt;
    f.y -= .45 * dt;
    return f.life > 0;
  });
  combatEffects.update((effect) => {
    effect.life -= dt;
    if (effect.source && !effect.source.dead) {
      effect.x = effect.source.x + effect.source.w / 2;
      effect.y = effect.sourceGround
        ? effect.source.y + effect.source.h + effect.sourceYOffset
        : effect.source.y + effect.source.h * effect.sourceYRatio + effect.sourceYOffset;
    } else {
      effect.x += (effect.vx || 0) * dt;
      effect.y += (effect.vy || 0) * dt;
    }
    return effect.life > 0;
  });
  for (const npc of zoneNpcs()) {
    const ns = npcStates[npc.id];
    ns.hurt = Math.max(0, ns.hurt - dt);
    ns.flee = Math.max(0, ns.flee - dt);
    if (npc.wander && ns.alive && !ns.hostile) {
      initializeRoamingNpc(ns,npc.x,floorAt(ns.roamX ?? npc.x));
      const roaming = updateRoamingNpc(ns,{
        originX:npc.x,
        dt,
        zoneWidth:zone.width,
        floorAt
      });
      if (roaming.landed && inView(ns.roamX,50)) {
        for (let dust = 0; dust < 5; dust++) {
          particles.add({
            x:ns.roamX + (Math.random() - .5) * 20,
            y:ns.roamY - 3,
            vx:(Math.random() - .5) * 1.6,
            vy:-.35 - Math.random() * .5,
            life:13 + Math.random() * 8,
            size:dust % 2 ? 2 : 3,
            color:"#a9957c"
          });
        }
      }
    }
  }
  stageBanner = Math.max(0, stageBanner - dt);
  levelBanner = Math.max(0, levelBanner - dt);
  massacreBanner = Math.max(0, massacreBanner - dt);
  pursuitBanner = Math.max(0, pursuitBanner - dt);
  screenShake = Math.max(0, screenShake - dt);
}

function npcVisible(npc) {
  if (npc.schedule === "night") return clock.isNight;
  return true;
}

function findInteraction() {
  interaction = null;
  for (const secret of zoneSecrets) {
    if (secret.found && !secret.claimed && Math.abs(player.x + player.w / 2 - secret.x) < 78) {
      interaction = { kind: "secret", obj: secret, label: secret.label };
    }
  }
  if (woundedKnightPresent(["waiting"])) {
    const knight = woundedKnightState();
    if (Math.abs(player.x + player.w / 2 - knight.x) < 112) {
      interaction = { kind:"woundedKnight",obj:knight,label:`${WOUNDED_KNIGHT.name}의 마지막 부탁 듣기` };
    }
  }
  if (worldEvent?.active && worldEvent.interaction && Math.abs(player.x + player.w / 2 - worldEvent.x) < 90) {
    interaction = { kind: "event", obj: worldEvent, label: `${worldEvent.name} 돕기` };
  }
  {
    let best = Infinity;
    for (const npc of zoneNpcs()) {
      const ns = npcStates[npc.id];
      if (ns.deathZone && !ns.alive && ns.deathZone !== currentZoneId) continue;
      const x = ns.alive ? npcDrawX(npc) : ns.deathX;
      const d = Math.abs(player.x + player.w / 2 - x);
      if (d < 96 && d < best && (ns.alive ? npcVisible(npc) && !ns.hostile : true)) {
        best = d;
        interaction ||= ns.alive
          ? { kind: "npc", obj: npc, label: `${npc.name} · ${npc.role}` }
          : { kind: "corpse", obj: npc, label: `${corpseStage(ns, clock.day) === "bones" ? "유골" : "시체"} 조사` };
      }
    }
  }
  for (const landmark of zone.landmarks || []) {
    if (Math.abs(player.x + player.w / 2 - landmark.x) < 94) {
      interaction = { kind: "landmark", obj: landmark, label: landmark.label };
    }
  }
  for (const exit of zone.exits) {
    if (Math.abs(player.x + player.w / 2 - exit.x) < 92) {
      const houseStage = exit.target === "elderHouse" ? currentHouseStage() : null;
      const houseCanEnter = exit.target !== "elderHouse"
        || elderHouseCanEnter(worldStates,clock.day,clock.minute);
      if (exit.target === "elderHouse" && (
        !houseCanEnter
        || (houseStage === "intact" && !npcStates.elder?.alive)
      )) {
        interaction = {
          kind:"landmark",
          obj:{ kind:"elderHouse",x:exit.x },
          label:houseStage === "intact" ? "촌장집에 불 지르기" : "불타버린 촌장집 살펴보기"
        };
      } else {
        interaction = {
          kind:"exit",
          obj:exit,
          label:exit.target === "elderHouse" && houseStage === "burning"
            ? "불타는 촌장집 안으로 들어가기"
            : exit.label
        };
      }
      loader.preload(exit.target);
    } else if (Math.abs(player.x - exit.x) < 360) loader.preload(exit.target);
  }
}

function igniteElderHouse() {
  const stage = currentHouseStage();
  if (stage === "burning") return toast("촌장집은 이미 불타고 있습니다");
  if (stage === "burned") return toast("촌장집은 이미 검게 타버렸습니다");
  const elderAlive = !!npcStates.elder?.alive;
  startElderHouseFire(worldStates,clock.day,clock.minute,{ elderDoomed:elderAlive });
  if (elderAlive) {
    const elder = elderNpc();
    const ns = npcStates.elder;
    ns.hostile = false;
    ns.abyssHostile = false;
    ns.flee = 0;
    ns.burnX = elder.x;
    ns.prevBurnX = elder.x;
    ns.burnFace = -1;
    enemies = enemies.filter((enemy) => enemy.npcId !== "elder");
  }
  setKarma(player.karma + 35, "촌장집 방화");
  worldStates.crimeMemory.lastCrimeDay = clock.day;
  const fireX = elderHouseEntranceX();
  burst(fireX, floorAt(fireX) - 85, "#ff7a3d", 58, 7);
  screenShake = 14;
  toast("촌장집에 불을 질렀습니다 · L · KARMA +35");
  updateHud();
  autosave("촌장집 방화");
  return true;
}

function nearbyNpcHome(maxDistance = 175) {
  const centerX = player.x + player.w / 2;
  return homesForZone(currentZoneId)
    .filter((home) => home.ownerId)
    .map((home) => ({ home, distance: Math.abs(centerX - (home.x + (home.width || 120) / 2)) }))
    .filter((entry) => entry.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)[0]?.home || null;
}

function igniteNpcHouse(home) {
  const owner = NPCS.find((npc) => npc.id === home.ownerId);
  const ownerState = npcStates[home.ownerId];
  if (!owner || !ownerState) return false;
  if (ownerState.alive) {
    toast(`${owner.name}${owner.name.endsWith("???") ? "" : "의"} 집입니다. 집주인이 살아 있습니다`);
    return false;
  }
  const stage = currentNpcHouseStage(home.ownerId);
  if (stage === "burning") return toast(`${owner.name}의 집은 이미 불타고 있습니다`);
  if (stage === "burned") return toast(`${owner.name}의 집은 이미 검게 타버렸습니다`);
  startHouseFire(worldStates, home.ownerId, clock.day, clock.minute);
  setKarma(player.karma + 15, `${owner.name}의 집 방화`);
  worldStates.crimeMemory.lastCrimeDay = clock.day;
  const fireX = home.x + (home.width || 120) / 2;
  burst(fireX, home.floor - 70, "#ff7438", 38, 6);
  screenShake = Math.max(screenShake, 8);
  toast(`${owner.name}의 빈집에 불을 질렀습니다 · KARMA +15`);
  updateHud();
  autosave(`${owner.name}의 집 방화`);
  return true;
}

function attemptBurnHouse() {
  const distance = Math.abs(player.x + player.w / 2 - elderHouseEntranceX());
  if (currentZoneId === "elderHill" && distance <= 190) return igniteElderHouse();
  const home = nearbyNpcHome();
  if (home) return igniteNpcHouse(home);
  toast("죽은 NPC의 집 가까이에서 L을 누르면 횃불을 던질 수 있습니다");
  return false;
}

function renderElderFireDialogue() {
  const line = ELDER_FIRE_DIALOGUE[elderFireDialogueStep];
  const finalLine = !!line.curse;
  dom.panelKicker.textContent = finalLine ? "THE ELDER'S CURSE" : "A HOUSE IN FLAMES";
  dom.panelTitle.textContent = "불타는 촌장 에드윈";
  dom.panelBody.innerHTML = `
    <div class="game2-elder-fire-dialogue${finalLine ? " curse" : ""}">
      <div class="game2-elder-fire-portrait" aria-hidden="true">
        <span class="game2-elder-fire-eyes">••</span>
        <i>♟</i>
      </div>
      <div>
        <small>에드윈 · 더스크베일의 마지막 저주</small>
        <p class="${finalLine ? "game2-elder-curse-line" : ""}">“${line.text}”</p>
        <div class="game2-elder-dialogue-progress">
          ${ELDER_FIRE_DIALOGUE.map((_,index) => `<span class="${index <= elderFireDialogueStep ? "active" : ""}"></span>`).join("")}
        </div>
        <button class="game2-dialogue-action${finalLine ? " danger" : ""}" data-action="elder-fire-next">
          ${finalLine ? "저주를 받아들인다" : "계속"}
        </button>
      </div>
    </div>`;
}

function openElderFireDialogue() {
  if (!elderConfrontationReady(worldStates,clock.day,clock.minute) || state !== "running") return false;
  activeNpc = elderNpc();
  elderFireDialogueStep = clamp(
    Math.floor(Number(worldStates.elderHouse.dialogueStep) || 0),
    0,
    ELDER_FIRE_DIALOGUE.length - 1
  );
  panelType = "elderFireDialogue";
  state = "panel";
  keys.clear();
  dom.panel.hidden = false;
  renderElderFireDialogue();
  tone(103,.24,"triangle",.035);
  screenShake = Math.max(screenShake,3);
  return true;
}

function advanceElderFireDialogue() {
  if (panelType !== "elderFireDialogue") return false;
  if (elderFireDialogueStep < ELDER_FIRE_DIALOGUE.length - 1) {
    elderFireDialogueStep += 1;
    worldStates.elderHouse.dialogueStep = elderFireDialogueStep;
    renderElderFireDialogue();
    tone(elderFireDialogueStep === ELDER_FIRE_DIALOGUE.length - 1 ? 76 : 96,.2,"triangle",.03);
    screenShake = Math.max(screenShake,elderFireDialogueStep + 2);
    return true;
  }
  if (!completeElderConfrontation(worldStates)) return false;
  worldStates.elderHouse.dialogueStep = ELDER_FIRE_DIALOGUE.length;
  elderCurseTimer = ELDER_CURSE_INTERVAL;
  closePanel();
  player.invincible = 0;
  screenShake = 10;
  burst(player.x + player.w / 2,player.y + 24,"#d63d46",26,4.5);
  floater("에드윈의 저주",player.x + player.w / 2,player.y - 15,"#ff5963");
  toast("붉은 눈의 저주 · 불타는 집 안에서 2초마다 HP -1");
  tone(66,.42,"sawtooth",.045);
  updateHud();
  autosave("에드윈의 화염 저주");
  return true;
}

function applyElderCurseDamage() {
  if (debugGodMode || state !== "running" || player.hp <= 0) return;
  player.hp = Math.max(0,player.hp - 1);
  burst(player.x + player.w / 2,player.y + 34,"#e04b3f",9,2.4);
  floater("화염의 저주 -1 HP",player.x + player.w / 2,player.y - 3,"#ff6b63");
  screenShake = Math.max(screenShake,3);
  tone(92,.13,"sawtooth",.025);
  updateHud();
  if (player.hp <= 0) die();
}

function updateElderHouseFireScene(dt) {
  if (currentZoneId !== "elderHouse") {
    elderCurseTimer = ELDER_CURSE_INTERVAL;
    return;
  }
  const stage = currentHouseStage();
  if (stage === "burned") {
    if (!transitionBusy) {
      toast("불타던 지붕이 무너집니다 · 가까스로 집 밖으로 탈출합니다");
      void transitionTo("elderHill",900,"촌장집 붕괴 탈출");
    }
    return;
  }
  if (stage !== "burning") return;

  const npc = elderNpc();
  const ns = npcStates.elder;
  if (worldStates.elderHouse.elderDoomed && ns?.alive) {
    if (!Number.isFinite(ns.burnX)) ns.burnX = npc.x;
    if (!Number.isFinite(ns.prevBurnX)) ns.prevBurnX = ns.burnX;
    const playerCenter = player.x + player.w / 2;
    const distance = playerCenter - ns.burnX;
    ns.burnFace = Math.sign(distance || -1);
    if (elderConfrontationReady(worldStates,clock.day,clock.minute)) {
      elderApproachGrace = Math.max(0,elderApproachGrace - dt);
      const stopDistance = 84;
      if (Math.abs(distance) > stopDistance) {
        const approachSpeed = 1.7 + elderFireVisualIntensity() * .8;
        ns.burnX += Math.sign(distance) * Math.min(Math.abs(distance) - stopDistance,approachSpeed * dt);
      } else if (elderApproachGrace <= 0) {
        openElderFireDialogue();
      }
    }
  }

  if (worldStates.elderHouse.curseActive && worldStates.elderHouse.confronted) {
    elderCurseTimer -= dt;
    if (elderCurseTimer <= 0) {
      elderCurseTimer += ELDER_CURSE_INTERVAL;
      applyElderCurseDamage();
    }
  } else {
    elderCurseTimer = ELDER_CURSE_INTERVAL;
  }
}

function openWoundedKnightChoice() {
  const knight = woundedKnightState();
  if (knight.status !== "waiting") return;
  const escortAvailable = !!npcStates.elder?.alive && currentHouseStage() === "intact";
  panelType = "woundedKnight";
  state = "panel";
  keys.clear();
  dom.panel.hidden = false;
  dom.panelKicker.textContent = "A KNIGHT'S LAST REQUEST";
  dom.panelTitle.textContent = `${WOUNDED_KNIGHT.name} · 마지막 부탁`;
  dom.panelBody.innerHTML = `
    <div class="game2-knight-choice">
      <div class="game2-knight-portrait" aria-hidden="true"><span>➹</span><b>♞</b></div>
      <div>
        <p>“화살에 독이 묻었소… 숨을 쉴 때마다 갑옷 안쪽이 타들어 가는군.”</p>
        <p>“부탁이오. 여기서 내 고통을 끝내 주시오. 아니면… 날 더스크베일의 촌장에게 데려다주시오.”</p>
      </div>
    </div>
    <p class="game2-karma-warning">${escortAvailable
      ? "선택은 되돌릴 수 없습니다. 살려주면 부상당한 세드릭을 지키며 촌장집 안까지 호위해야 합니다."
      : "촌장이 죽었거나 촌장집이 파괴되어 치료를 부탁할 수 없습니다. 이전 선택이 살려주기의 길을 닫았습니다."}</p>
    <div class="game2-panel-actions game2-knight-actions">
      <button data-action="wounded-cancel">아직 결정하지 않는다</button>
      <button data-action="wounded-spare" ${escortAvailable ? "" : "disabled"}>${escortAvailable ? "살려준다 · 호위" : "살려줄 곳이 없다"}</button>
      <button class="danger" data-action="wounded-execute">처형한다 · 고통을 끝낸다</button>
    </div>`;
}

function resolveWoundedKnightChoice(choice) {
  const knight = woundedKnightState();
  if (choice === "spare" && (!npcStates.elder?.alive || currentHouseStage() !== "intact")) {
    toast("촌장과 촌장집이 사라져 세드릭을 데려갈 곳이 없습니다");
    return false;
  }
  if (!chooseWoundedKnight(knight,choice,clock.day,clock.minute)) return false;
  closePanel();
  player.invincible = Math.max(player.invincible,90);
  if (choice === "execute") {
    setWoundedKnightBanner("세드릭은 눈을 감고 마지막으로 왕도를 바라봅니다",260);
    woundedKnightSpeech = 210;
    tone(128,.24,"triangle",.024);
    autosave("부상당한 기사 · 처형 선택");
    return true;
  }
  knight.zone = currentZoneId;
  knight.x = WOUNDED_KNIGHT.x;
  knight.y = floorAt(knight.x);
  knight.prevX = knight.x;
  knight.prevY = knight.y;
  setWoundedKnightBanner("호위 임무 시작 · 세드릭을 촌장집 안까지 데려가십시오",340);
  woundedKnightSpeech = 300;
  spawnWoundedKnightAmbush();
  screenShake = Math.max(screenShake,7);
  toast("왕도 동쪽에서 다수의 괴물이 접근합니다");
  autosave("부상당한 기사 · 호위 시작");
  return true;
}

async function interact() {
  if (state !== "running" || !interaction) return;
  const { kind, obj } = interaction;
  if (kind === "exit") {
    if (currentZoneId === "bossArena" && obj.target === "dungeon" && !bosses.warden) {
      toast("재의 수문장이 길을 막고 있습니다");
      return;
    }
    await transitionTo(obj.target, obj.spawn, "맵 이동");
    return;
  }
  if (kind === "woundedKnight") {
    openWoundedKnightChoice();
    return;
  }
  if (kind === "landmark" && obj.kind === "elderHouse") {
    const stage = currentHouseStage();
    if (stage === "burning") return toast("집 전체가 불길에 휩싸였습니다. 내일까지 타오를 것입니다.");
    if (stage === "burned") return toast("검게 탄 들보와 재만 남았습니다.");
    if (npcStates.elder?.alive) return toast("촌장이 안에 있습니다. 문을 열고 들어갈 수 있습니다.");
    panelType = "burn";
    state = "panel";
    dom.panel.hidden = false;
    dom.panelKicker.textContent = "IRREVERSIBLE CHOICE";
    dom.panelTitle.textContent = "촌장집에 불을 지르겠습니까?";
    dom.panelBody.innerHTML = `<p class="game2-karma-warning">이 선택은 되돌릴 수 없습니다. 집은 게임 시간으로 하루 동안 불타고 영구적인 폐허가 됩니다. KARMA +35</p><div class="game2-panel-actions"><button data-action="cancel-burn">그만둔다</button><button class="primary" data-action="burn-house">횃불을 던진다</button></div>`;
    return;
  }
  if (kind === "secret") {
    obj.claimed = true;
    player.foundSecrets[obj.id] = "claimed";
    grantRewardItem(obj.reward);
    burst(obj.x, floorAt(obj.x) - 24, "#dfa6ff", 25, 4);
    toast(`비밀 발견 · ${ITEMS[obj.reward]?.name || obj.reward}`);
    autosave("비밀 장소 발견");
    return;
  }
  if (kind === "event") {
    completeWorldEvent();
    return;
  }
  if (kind === "corpse") {
    const ns = npcStates[obj.id];
    const stage = corpseStage(ns, clock.day);
    if (ns.lootAvailable) {
      const loot = 35 + Math.floor(Math.random() * 45);
      gold += loot;
      ns.lootAvailable = false;
      toast(`${stage === "bones" ? "유골" : "시체"}에서 ${loot}G 발견`);
      autosave("시체 조사");
    } else {
      toast(stage === "bones" ? "빛바랜 뼈만 남아 있습니다" : "이미 조사한 시체입니다");
    }
    return;
  }
  if (kind === "landmark" && obj.kind === "sealedCave") {
    tone(116,.18,"triangle",.035);
    screenShake = Math.max(screenShake,2);
    floater("KEY REQUIRED",obj.x,floorAt(obj.x) - 137,"#d9b2e7");
    toast("철문은 안쪽에서 봉인되어 있습니다. 열쇠가 없어 동굴에 들어갈 수 없습니다.");
    return;
  }
  if (kind === "npc") {
    const ns = npcStates[obj.id];
    if (!ns.alive) return toast("이 NPC는 죽어 기능을 이용할 수 없습니다");
    if (obj.id === "elder" && elderHouseBurning()) {
      if (elderConfrontationReady(worldStates,clock.day,clock.minute)) return openElderFireDialogue();
      return openDialogue(obj,"내 저주는 이미 네 피에 스며들었다. 나는 이 불길과 함께 마지막 숨을 쉬겠다.");
    }
    if (obj.shop && !clock.shopOpen) return openDialogue(obj, "밤에는 상점을 닫습니다. 아침 7시에 다시 오세요.");
    if (obj.shop) openShop(obj);
    else openDialogue(obj);
  }
}

function updateExploration(dt = 1) {
  cemeteryThought = Math.max(0,cemeteryThought - dt);
  const playerCenter = player.x + player.w / 2;
  if (
    currentZoneId === "elderHill" &&
    !worldStates.cemetery?.sensed &&
    playerCenter >= 365 &&
    playerCenter <= 705
  ) {
    worldStates.cemetery ||= { sensed:false };
    worldStates.cemetery.sensed = true;
    cemeteryThought = CEMETERY_THOUGHT_DURATION;
    screenShake = Math.max(screenShake,2);
    tone(92,.34,"triangle",.028);
    setTimeout(() => tone(138,.28,"sine",.018),180);
    autosave("묘지의 어두운 기운 감지");
  }
  const changed = minimap.markExplored(player.explored, currentZoneId, player.x + player.w / 2, zone.width);
  if (changed && player.explored[currentZoneId].length % 5 === 0) autosave("지도 탐험");
  for (const secret of zoneSecrets) {
    if (!secret.found && Math.abs(secret.x - player.x) < 125) {
      secret.found = true;
      player.foundSecrets[secret.id] = true;
      toast(`숨겨진 장소 감지 · ${secret.label}`);
      tone(740, .1, "triangle", .03);
      autosave("비밀 장소 감지");
    }
  }
}

function update(dt) {
  if (hitStop > 0) {
    hitStop = Math.max(0, hitStop - dt);
    return;
  }
  if (clock.update(STEP / 1000)) {
    weatherId = dailyWeather(clock.day, currentZoneId);
    spawnDailyEvent();
    autosave("새로운 날");
    toast(`DAY ${clock.day} · 시체의 시간이 흐릅니다`);
    schedulePursuitForCurrentDay();
    spawnPursuitParty();
  }
  if (worldStates.pursuit.pending && !worldStates.pursuit.active) spawnPursuitParty();
  updatePlayer(dt);
  if (state !== "running") return;
  updateElderHouseFireScene(dt);
  if (state !== "running") return;
  updateWoundedKnight(dt);
  updateEnemies(dt);
  updateProjectiles(dt);
  updateHazards(dt);
  updateCollectibles(dt);
  updateEffects(dt);
  updateExploration(dt);
  findInteraction();
  const target = horizontalCameraTarget({
    playerX:player.x,
    viewportWidth:W,
    worldWidth:zone.width,
    minX:zone.cameraMinX
  });
  cameraX += (target - cameraX) * Math.min(1, .08 * dt);
  const cameraLandingFloorY = landingFloorBelowPlayer(
    platforms,player.x + player.w / 2,player.y + player.h
  );
  cameraTargetY = playerVerticalCameraTarget({
    playerY:player.y,
    playerHeight:player.h,
    floorY:cameraLandingFloorY,
    grounded:player.grounded,
    velocityY:player.vy
  });
  cameraY = easeCamera(cameraY,cameraTargetY,dt);
  const hostileVisible = keys.has("Slash") || npcAttackUnlocked(player.karma);
  if (dom.hostile.hidden === hostileVisible) dom.hostile.hidden = !hostileVisible;
  hudTick += dt;
  if (hudTick >= 3) {
    hudTick %= 3;
    updateHud();
  }
}

function openPanel(type) {
  panelType = type;
  if (state === "running") state = "panel";
  dom.panel.hidden = false;
  if (type === "stats") renderStats();
  else if (type === "inventory") renderInventory();
  else if (type === "save") renderSave();
}

function closePanel() {
  dom.panel.hidden = true;
  panelType = null;
  pendingStats = null;
  if (state === "panel") {
    state = "running";
    resumeSimulationClock();
  }
  canvas.focus();
}

function renderStats() {
  player.stats = normalizePlayerStats(player.stats);
  player.statPoints = Math.max(0, Math.floor(Number(player.statPoints) || 0));
  pendingStats = normalizePlayerStats(pendingStats || player.stats);
  const invested = statInvestment(player.stats, pendingStats);
  const remaining = Math.max(0, player.statPoints - invested);
  const current = calculatedPlayerStats(player.stats);
  const preview = calculatedPlayerStats(pendingStats);
  const readout = (label, before, after) => {
    const changed = before !== after;
    const format = (value) => Number.isInteger(value) ? value : value.toFixed(2);
    return `<span class="${changed ? "pending" : ""}">${label} ${changed ? `${format(before)} → ${format(after)}` : format(after)}</span>`;
  };
  const rows = [
    ["attack", "공격력", "장검 물리 피해 +1"],
    ["health", "체력", "최대 HP +2"],
    ["defense", "방어력", "받는 피해 감소"],
    ["magic", "마법력", "마법 피해·최대 MP 증가"],
    ["speed", "공격속도", "공격 간격·이동·스태미나 개선"]
  ];
  dom.panelKicker.textContent = "STAT ALLOCATION";
  dom.panelTitle.textContent = "STATUS";
  dom.panelBody.innerHTML = `
    <div class="game2-panel-resource game2-points-card ${remaining > 0 ? "available" : "empty"}">
      <div>
        <span>사용 가능한 스탯 포인트</span>
        <small>${invested > 0 ? `현재 ${invested} POINT 배분 예정` : "레벨 업 포인트를 원하는 능력치에 배분하세요"}</small>
      </div>
      <strong>${remaining}</strong>
      <em>POINT</em>
    </div>
    <div class="game2-stat-summary">
      <span>LV.${player.level}</span>
      ${readout("ATK", current.attackPower, preview.attackPower)}
      ${readout("HP", current.maxHp, preview.maxHp)}
      ${readout("DEF", current.defense + blessingDefense(player.blessing), preview.defense + blessingDefense(player.blessing))}
      ${readout("MAG", current.magicPower, preview.magicPower)}
    </div>
    <div class="game2-stat-summary">
      ${readout("MP", current.maxMana, preview.maxMana)}
      ${readout("ST", current.maxStamina, preview.maxStamina)}
      <span class="${player.karma > 0 ? "positive" : ""}">KARMA ${player.karma}</span>
      <span>${karmaTier(player.karma).name}</span><span>DAY ${clock.day}</span>
    </div>
    ${player.karma > 0 ? `<p class="game2-karma-warning">카르마는 되돌릴 수 없습니다. 상점 가격, 경비병, 현상금 사냥꾼과 어둠 스킬에 영향을 줍니다.</p>` : ""}
    <div class="game2-allocation">
      ${rows.map(([key, name, desc]) => `<div class="game2-allocation-row">
        <div><b>${name}</b><small>${desc}</small></div>
        <button data-stat-minus="${key}" ${pendingStats[key] <= player.stats[key] ? "disabled" : ""}>−</button>
        <strong class="${pendingStats[key] !== player.stats[key] ? "pending" : ""}">${pendingStats[key] !== player.stats[key] ? `${player.stats[key]}→${pendingStats[key]}` : pendingStats[key]}</strong>
        <button data-stat-plus="${key}" ${remaining <= 0 ? "disabled" : ""}>＋</button>
      </div>`).join("")}
    </div>
    <div class="game2-panel-actions">
      <button data-action="reset-pending">되돌리기</button>
      <button class="primary" data-action="apply-stats" ${invested <= 0 ? "disabled" : ""}>적용하기${invested > 0 ? ` · ${invested} POINT` : ""}</button>
    </div>`;
}

function renderInventory() {
  dom.panelKicker.textContent = "INVENTORY · HOTBAR ASSIGN";
  dom.panelTitle.textContent = "ITEM & SKILL";
  const equipment = Object.keys(player.owned).filter((id) => player.owned[id] && ["weapon", "armor", "accessory"].includes(ITEMS[id]?.type));
  const consumables = Object.keys(player.counts);
  const ownedSkills = Object.keys(player.ownedSkills).filter((id) => player.ownedSkills[id]);
  dom.panelBody.innerHTML = `
    <div class="game2-panel-resource game2-gold-card">
      <div>
        <span>보유 골드</span>
        <small>상점 구매와 장비 강화에 사용됩니다</small>
      </div>
      <strong>${gold.toLocaleString("ko-KR")}</strong>
      <em>G</em>
    </div>
    <div class="game2-inventory-section"><h3>EQUIPMENT</h3>
      ${equipment.map((id) => {
        const item = ITEMS[id];
        const equipped = Object.values(player.equipped).includes(id);
        return `<div class="game2-item-slot ${equipped ? "equipped" : ""}">
          ${equipmentArtMarkup(id,item)}
          <div><b>${item.name}</b><small>${item.desc}</small></div>
          <button data-equip="${id}" ${equipped ? "disabled" : ""}>${equipped ? "장착 중" : "장착"}</button>
        </div>`;
      }).join("")}
    </div>
    <div class="game2-inventory-section"><h3>CONSUMABLE · 1–4 지정</h3>
      ${consumables.map((id) => `<div class="game2-item-slot">
        <span class="game2-item-icon potion">${id.includes("mana") ? "◆" : id.includes("stamina") ? "⚡" : "♥"}</span>
        <div><b>${ITEMS[id].name}</b><small>${ITEMS[id].desc} · ${player.counts[id]}개
          <span class="game2-hotbar-assign">${[0,1,2,3].map((slot) => `<button data-item-slot="${slot}" data-id="${id}" class="${player.itemSlots[slot] === id ? "active" : ""}">${slot + 1}</button>`).join("")}</span>
        </small></div>
        <button data-use="${id}" ${player.counts[id] <= 0 ? "disabled" : ""}>사용</button>
      </div>`).join("")}
    </div>
    <div class="game2-inventory-section"><h3>SKILLS · Q/W/E/R 지정</h3>
      ${ownedSkills.map((id) => {
        const karmaSkill = skillForKarma(id, SKILLS[id], player.karma);
        const skill = id === "warrior_blessing" ? { ...karmaSkill, ...blessingForKarma(player.karma) } : karmaSkill;
        const growth = skillGrowthSummary(player.level, id, skill.kind);
        return `<div class="game2-item-slot">
          <span class="game2-item-icon">${skill.icon}</span>
          <div><b>${skill.name}</b><small>${skill.desc || `재사용 ${Math.ceil(skill.cooldown / 60)}초`}
            <span class="game2-skill-growth">${growth.rank} T${growth.tier} · 범위 +${growth.rangeBonus}% · 이펙트 +${growth.effectBonus}%</span>
            <span class="game2-hotbar-assign">${["Q","W","E","R"].map((key, slot) => `<button data-skill-slot="${slot}" data-id="${id}" class="${player.skillSlots[slot] === id ? "active" : ""}">${key}</button>`).join("")}</span>
          </small></div><em>${skill.cost}</em>
        </div>`;
      }).join("")}
    </div>`;
}

function slotLabel(slot) {
  return slot === "auto" ? "AUTOSAVE" : `SLOT ${slot}`;
}

function renderSave() {
  dom.panelKicker.textContent = `WORLD DATA · ${autosaveNote || "READY"}`;
  dom.panelTitle.textContent = "SAVE / LOAD";
  dom.panelBody.innerHTML = `
    <div class="game2-save-grid">
      ${saves.list().map(({ slot, data, exists }) => `<div class="game2-save-slot">
        <div><b>${slotLabel(slot)}</b><small>${exists ? `LV.${data.player.level} · DAY ${data.clock.day} · KARMA ${data.player.karma || 0}<br>${new Date(data.savedAt).toLocaleString("ko-KR")}` : "빈 저장 슬롯"}</small></div>
        <div class="game2-save-slot-actions">
          ${slot !== "auto" ? `<button data-save-slot="${slot}">저장</button>` : ""}
          <button data-load-slot="${slot}" ${exists ? "" : "disabled"}>불러오기</button>
        </div>
      </div>`).join("")}
    </div>
    <div class="game2-save-tools">
      <button data-action="dev-console">DEV CONSOLE</button>
      <button data-action="new-game">게임 새로 시작하기</button>
      <button data-action="export-save" ${saves.load("auto") ? "" : "disabled"}>JSON 내보내기</button>
      <button data-action="import-save">JSON 가져오기</button>
      <input id="g2-import-file" type="file" accept="application/json" hidden>
      <span class="game2-render-badge">${renderer.gpu ? "GPU · WEBGL2" : "CANVAS2D FALLBACK"} · CACHE ${loader.cachedZones.join(" / ")}</span>
    </div>`;
}

function shopSkillRows(npc) {
  if (npc.id !== "mage") return "";
  const options = Object.entries(SKILLS).filter(([, skill]) => skill.level && !skill.karma);
  return options.map(([id, skill]) => {
    const price = 180 + skill.level * 85;
    const owned = !!player.ownedSkills[id];
    const locked = player.level < skill.level;
    return `<div class="game2-shop-row"><span class="game2-shop-icon">${skill.icon}</span>
      <div><b>${skill.name}</b><small>${locked ? `LV.${skill.level} 필요` : `스킬 주문서 · ${skill.kind}`}</small></div>
      <strong>${price}G</strong><button data-buy-skill="${id}" data-price="${price}" ${owned || locked ? "disabled" : ""}>${owned ? "보유" : "구매"}</button></div>`;
  }).join("");
}

function openShop(npc) {
  const ns = npcStates[npc.id];
  if (!ns.alive) return toast("주인이 죽어 상점을 이용할 수 없습니다");
  activeNpc = npc;
  activeShop = SHOPS[npc.shop];
  panelType = "shop";
  state = "panel";
  dom.panel.hidden = false;
  dom.panelKicker.textContent = `${activeShop.owner} · ${clock.shopOpen ? "OPEN" : "CLOSED"}`;
  dom.panelTitle.textContent = activeShop.title;
  const tier = karmaTier(player.karma);
  dom.panelBody.innerHTML = `
    ${player.karma >= 20 ? `<p class="game2-karma-warning">카르마 할증 ${Math.round((tier.price - 1) * 100)}%가 적용됩니다.</p>` : ""}
    <div class="game2-shop-list">
      ${activeShop.items.map((id) => {
        const item = ITEMS[id];
        const price = Math.ceil(item.price * tier.price);
        const levelLocked = item.level && player.level < item.level;
        const karmaLocked = item.karma && player.karma < item.karma;
        const owned = ["weapon","armor","accessory"].includes(item.type) && player.owned[id];
        return `<div class="game2-shop-row">${equipmentArtMarkup(id,item,"game2-shop-icon")}
          <div><b>${item.name}</b><small>${levelLocked ? `LV.${item.level} 필요` : karmaLocked ? `KARMA ${item.karma} 필요` : item.desc}</small></div>
          <strong>${price}G</strong><button data-buy="${id}" data-price="${price}" ${owned || levelLocked || karmaLocked ? "disabled" : ""}>${owned ? "보유" : "구매"}</button></div>`;
      }).join("")}
      ${shopSkillRows(npc)}
    </div>`;
}

function openDialogue(npc, override = "") {
  activeNpc = npc;
  panelType = "dialogue";
  state = "panel";
  dom.panel.hidden = false;
  dom.panelKicker.textContent = npc.role.toUpperCase();
  dom.panelTitle.textContent = npc.name;
  let text = override;
  let action = "";
  if (!text && ["inn","moon_inn","sun_inn"].includes(npc.id)) {
    const rumor = dailyEvent(clock.day, clock.isNight ? "outskirts2" : "outskirts1", clock.isNight);
    const woundedRumor = woundedKnightState().status === "waiting"
      ? "왕도 쪽으로 떠난 왕실 기사 세드릭이 돌아오지 않았어요. 부러진 나무 아래에서 신음 소리를 들었다는 사람도 있고요."
      : "";
    const localRumor = npc.id === "moon_inn"
      ? "숲의 은빛 종이 세 번 울리면 고목들이 길을 바꾼다고 해요."
      : npc.id === "sun_inn"
        ? "붉은 고개에 대상단이 묶였어요. 밤의 불꽃 진을 조심하세요."
        : woundedRumor || rumor?.rumor || "왕도 쪽 길에서 수상한 불빛이 보였다는군요.";
    text = `오늘 날씨는 ${WEATHER[dailyWeather(clock.day, npc.zone)].name}이에요. ${localRumor}`;
    action = `<button class="game2-dialogue-action" data-service="rest">무료로 휴식</button>`;
  } else if (!text && npc.id === "elder") {
    text = player.questClaimed ? "재의 다리 너머에서 더 오래된 악이 깨어나고 있소." : "마을 밖의 괴물 열 마리를 쓰러뜨리고 돌아오게. 왕도의 인장을 주겠네.";
    action = player.questKills >= 10 && !player.questClaimed ? `<button class="game2-dialogue-action" data-service="quest">토벌 보상 받기</button>` : "";
  } else if (!text && npc.id === "guild") {
    text = `현재 토벌 기록은 ${player.questKills}마리입니다. 밤의 괴물은 강하지만 보상도 더 크죠.`;
  } else if (!text && npc.id === "guard") {
    text = worldStates.guardRevenge.triggered ? "말은 끝났다. 더스크베일의 마지막 방패가 너를 심판한다." : player.karma > 0 ? "네 검에서 마을 사람의 피 냄새가 난다. 다음 행동은 신중히 해라." : "성문 밖은 밤이 되면 위험해집니다. F로 문을 통과하세요.";
  } else if (!text && npc.id === "wanderer_knight") {
    text = clock.isNight ? "달빛 아래서는 길보다 발자국을 봐. 망령은 길을 걷지 않거든." : "나는 카엘. 왕도까지 가는 중이야. 네 카르마 소문도 길 위에서 들었다.";
  } else if (!text && npc.id === "wanderer_mage") {
    text = clock.phase === "sunset" ? "노을은 두 세계의 경계야. 이 시간엔 황혼검이 깨어난다고 해." : "별길은 고정된 길이 아니야. 다음 마을은 네 선택에 따라 가까워지기도 하지.";
  } else if (!text && npc.id === "farmer") {
    text = worldStates.crimeMemory.witnesses > 0 ? "요즘 마을 사람들이 문을 잠그고 있어요. 누군가 검을 휘두른다는 소문 때문에…" : "언덕의 풍차가 돌면 내일은 맑을 겁니다. 촌장님도 그 풍경을 좋아하시죠.";
  } else if (!text && npc.id === "moon_ranger") {
    text = "월광림의 고목은 죽은 자의 이름을 기억해요. 숲을 통과하려면 전갈보다 침묵을 먼저 배워야 하죠.";
  } else if (!text && npc.id === "moon_oracle") {
    text = player.karma >= 500 ? "달이 당신의 그림자를 비추지 못하는군요. 그 어둠은 곧 길 위의 모두에게 보일 거예요." : "두 도시의 태양과 달을 함께 본 검만이 북쪽 폐왕의 길을 열 수 있어요.";
  } else if (!text && npc.id === "sun_smith") {
    text = "Sunspire의 강철은 낮보다 노을에 담금질할 때 단단해진다. 골드가 있다면 네 검도 사막을 견디게 해주지.";
  } else if (!text && npc.id === "sun_mage") {
    text = "태양술은 불을 던지는 기술이 아니야. 적이 설 자리를 먼저 태워 없애는 전술이지.";
  } else if (!text && ["moon_guard","sun_guard"].includes(npc.id)) {
    text = player.karma >= 1000 ? "현상 수배자의 얼굴이다. 성문을 지나려면 우리부터 쓰러뜨려라." : "다음 지역은 강한 적이 지키고 있습니다. 물약과 장비를 확인하세요.";
  } else if (!text) {
    text = "노을이 아름답군요. 하지만 밤이 오면 마을의 규칙도 달라집니다.";
  }
  dom.panelBody.innerHTML = `<div class="game2-dialogue" style="--npc:${npc.color}"><div class="game2-dialogue-portrait">♟</div><div><p>${text}</p>${action}</div></div>`;
}

async function handlePanelAction(target) {
  if (!(target instanceof HTMLElement)) return;
  if (target.dataset.statPlus) {
    const key = target.dataset.statPlus;
    if (!PLAYER_STAT_KEYS.includes(key)) return;
    pendingStats = normalizePlayerStats(pendingStats || player.stats);
    if (statInvestment(player.stats, pendingStats) >= player.statPoints) return;
    pendingStats[key] += 1;
    renderStats();
  } else if (target.dataset.statMinus) {
    const key = target.dataset.statMinus;
    if (!PLAYER_STAT_KEYS.includes(key)) return;
    pendingStats = normalizePlayerStats(pendingStats || player.stats);
    if (pendingStats[key] <= player.stats[key]) return;
    pendingStats[key] -= 1;
    renderStats();
  } else if (target.dataset.action === "reset-pending") {
    pendingStats = normalizePlayerStats(player.stats);
    renderStats();
  } else if (target.dataset.action === "apply-stats") {
    const result = commitStatAllocation(player.stats, pendingStats, player.statPoints);
    if (!result.ok) {
      toast(result.reason);
      renderStats();
      return;
    }
    player.statPoints = result.remaining;
    player.stats = result.stats;
    pendingStats = null;
    recalcStats(true);
    autosave("스탯 투자");
    toast(`스탯 적용 완료 · ${result.spent} POINT`);
    renderStats();
  } else if (target.dataset.equip) {
    const item = ITEMS[target.dataset.equip];
    player.equipped[item.type] = target.dataset.equip;
    recalcStats(true);
    autosave("장비 변경");
    renderInventory();
  } else if (target.dataset.use) {
    useItem(target.dataset.use);
    renderInventory();
  } else if (target.dataset.skillSlot !== undefined) {
    player.skillSlots[Number(target.dataset.skillSlot)] = target.dataset.id;
    updateHotbar();
    autosave("스킬 핫바 변경");
    renderInventory();
  } else if (target.dataset.itemSlot !== undefined) {
    player.itemSlots[Number(target.dataset.itemSlot)] = target.dataset.id;
    updateHotbar();
    autosave("아이템 핫바 변경");
    renderInventory();
  } else if (target.dataset.buy) {
    buyItem(target.dataset.buy, Number(target.dataset.price));
  } else if (target.dataset.buySkill) {
    buySkill(target.dataset.buySkill, Number(target.dataset.price));
  } else if (target.dataset.service === "rest") {
    player.hp = player.maxHp;
    player.mana = player.maxMana;
    player.stamina = player.maxStamina;
    autosave("여관 휴식");
    toast("모든 자원을 회복했습니다");
    closePanel();
  } else if (target.dataset.service === "quest") {
    player.questClaimed = true;
    gold += 450;
    player.owned.knight_sword = true;
    autosave("퀘스트 완료");
    toast("450G와 기사단 장검 획득");
    closePanel();
  } else if (target.dataset.saveSlot) {
    saves.save(Number(target.dataset.saveSlot), serialize());
    toast(`SLOT ${target.dataset.saveSlot} 저장 완료`);
    renderSave();
  } else if (target.dataset.loadSlot) {
    const slot = target.dataset.loadSlot === "auto" ? "auto" : Number(target.dataset.loadSlot);
    const data = saves.load(slot);
    if (data) {
      await loadSave(data);
      closePanel();
      state = "running";
      resumeSimulationClock();
      toast(`${slotLabel(slot)} 불러오기 완료`);
    }
  } else if (target.dataset.action === "export-save") {
    const blob = saves.export("auto");
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `emberfall-day-${clock.day}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  } else if (target.dataset.action === "import-save") {
    $("g2-import-file")?.click();
  } else if (target.dataset.action === "new-game") {
    closePanel();
    state = "ready";
    dom.overlayTitle.textContent = "정말 새 게임을 시작할까요?";
    dom.overlayCopy.textContent = "자동 저장만 새로 쓰며 SLOT 1–3의 수동 저장은 그대로 유지됩니다.";
    dom.start.textContent = "취소";
    dom.newGame.textContent = "정말 새로 시작";
    dom.newGame.dataset.confirm = "true";
    dom.newGame.hidden = false;
    dom.overlay.classList.add("show");
  } else if (target.dataset.action === "dev-console") {
    closePanel();
    openDevConsole();
  } else if (target.dataset.action === "elder-fire-next") {
    advanceElderFireDialogue();
  } else if (target.dataset.action === "cancel-burn") {
    closePanel();
  } else if (target.dataset.action === "burn-house") {
    igniteElderHouse();
    closePanel();
  } else if (target.dataset.action === "wounded-cancel") {
    closePanel();
  } else if (target.dataset.action === "wounded-execute") {
    resolveWoundedKnightChoice("execute");
  } else if (target.dataset.action === "wounded-spare") {
    resolveWoundedKnightChoice("spare");
  }
}

function buyItem(id, price) {
  if (!activeNpc || !npcStates[activeNpc.id]?.alive) return toast("상점 주인이 없어 거래할 수 없습니다");
  if (gold < price) return toast("골드가 부족합니다");
  gold -= price;
  const item = ITEMS[id];
  if (item.type === "consumable" || item.type === "reset") player.counts[id] = (player.counts[id] || 0) + 1;
  else player.owned[id] = true;
  autosave("아이템 구매");
  tone(680, .08);
  openShop(activeNpc);
}

function buySkill(id, price) {
  if (gold < price) return toast("골드가 부족합니다");
  gold -= price;
  player.ownedSkills[id] = true;
  autosave("스킬 구매");
  toast(`${SKILLS[id].name} 습득`);
  openShop(activeNpc);
}

const SKY_KEYFRAMES = {
  duskvale: [
    { minute:0, colors:["#10152e","#172142","#252853","#403153"] },
    { minute:300, colors:["#11172f","#1c2646","#31325a","#59435f"] },
    { minute:450, colors:["#554c72","#bd7774","#f3b278","#f6d899"] },
    { minute:630, colors:["#5685a7","#78a8c2","#b5ced2","#e9d7a8"] },
    { minute:960, colors:["#5685a7","#78a8c2","#b5ced2","#e9d7a8"] },
    { minute:1140, colors:["#29274f","#5b3960","#a75465","#ef9b67"] },
    { minute:1290, colors:["#11172f","#1b2344","#302a54","#553b59"] },
    { minute:1440, colors:["#10152e","#172142","#252853","#403153"] }
  ],
  moonbriar: [
    { minute:0, colors:["#080e26","#111b3a","#22264e","#3c3159"] },
    { minute:300, colors:["#0d1730","#1c2b49","#384058","#675669"] },
    { minute:450, colors:["#263755","#4f6478","#879594","#d0b98b"] },
    { minute:630, colors:["#273f5e","#496a78","#78918a","#c5b982"] },
    { minute:960, colors:["#273f5e","#496a78","#78918a","#c5b982"] },
    { minute:1140, colors:["#1b2345","#39365e","#6c4969","#c77970"] },
    { minute:1290, colors:["#0b1230","#192342","#2f3154","#51405f"] },
    { minute:1440, colors:["#080e26","#111b3a","#22264e","#3c3159"] }
  ],
  sunspire: [
    { minute:0, colors:["#15152d","#262446","#463150","#75454c"] },
    { minute:300, colors:["#251c36","#483049","#7c4a50","#b56a54"] },
    { minute:450, colors:["#6d4455","#b85f55","#e88b58","#ffd27a"] },
    { minute:630, colors:["#4d79a0","#79a7bc","#e2b873","#f2cf7a"] },
    { minute:960, colors:["#4d79a0","#79a7bc","#e2b873","#f2cf7a"] },
    { minute:1140, colors:["#382344","#73394b","#c65f47","#f2a14e"] },
    { minute:1290, colors:["#201831","#3b2944","#69404d","#9a594e"] },
    { minute:1440, colors:["#15152d","#262446","#463150","#75454c"] }
  ]
};

function skyPalette() {
  const abyss = apocalypseIntensity(player.karma);
  if (currentZoneId === "dungeon" || currentZoneId === "elderHouse") {
    const interior = ["#11131f", "#1b1d2c", "#272637", "#302b3a"];
    return abyss > 0 ? interior.map((color, index) =>
      blendHex(color, ["#100b12","#211017","#35161b","#4a211e"][index], abyss * .7)
    ) : interior;
  }
  const region = currentZoneId.startsWith("moonbriar") ? "moonbriar" : currentZoneId.startsWith("sunspire") ? "sunspire" : "duskvale";
  const palette = interpolatePalette(SKY_KEYFRAMES[region], clock.minute);
  if (abyss <= 0) return palette;
  const ruin = ["#130b18","#2b111b","#4a1c20","#702d24"];
  return palette.map((color, index) => blendHex(color, ruin[index], abyss * .84));
}

function drawSky() {
  const colors = skyPalette();
  colors.forEach((color, i) => px(0, i * H / 4, W, H / 4 + 1, color));
  if (currentZoneId === "dungeon" || currentZoneId === "elderHouse") return;
  const abyss = apocalypseIntensity(player.karma);
  const celestialFade = abyss > 0 ? .08 : 1;
  const daylight = daylightAt(clock.minute);
  const nightlight = 1 - daylight;
  const minute = ((clock.minute % 1440) + 1440) % 1440;
  const sunProgress = clamp((minute - 300) / 960, 0, 1);
  const sunX = 95 + sunProgress * 770 - renderCameraX * .018;
  const sunY = 192 - Math.sin(sunProgress * Math.PI) * 126;
  const moonMinute = minute < 330 ? minute + 1440 : minute;
  const moonProgress = clamp((moonMinute - 1050) / 720, 0, 1);
  const moonX = 95 + moonProgress * 770 - renderCameraX * .014;
  const moonY = 176 - Math.sin(moonProgress * Math.PI) * 103;
  ctx.save();
  ctx.globalAlpha = daylight * .15 * celestialFade;
  ctx.fillStyle="#ffd778";ctx.beginPath();ctx.arc(sunX,sunY,47,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha = daylight * .96 * celestialFade;
  px(sunX - 19,sunY - 25,38,50,"#f6c66a");
  px(sunX - 25,sunY - 19,50,38,"#f6c66a");
  px(sunX - 22,sunY - 22,44,44,"#ffd57a");
  px(sunX - 17,sunY - 19,11,4,"#fff1b2");
  px(sunX - 20,sunY - 14,5,3,"#ffe89b");
  ctx.globalAlpha = nightlight * .16 * celestialFade;
  ctx.fillStyle="#cdd9ff";ctx.beginPath();ctx.arc(moonX,moonY,44,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha = nightlight * .9 * celestialFade;
  px(moonX - 18,moonY - 24,36,48,"#d6def1");
  px(moonX - 24,moonY - 18,48,36,"#d6def1");
  px(moonX - 21,moonY - 21,42,42,"#d6def1");
  px(moonX - 15,moonY - 18,10,4,"#edf3ff");
  px(moonX + 5,moonY - 25,22,42,colors[0]);
  px(moonX + 2,moonY - 20,7,31,colors[0]);
  ctx.restore();
  const stars = [[46,72],[90,58],[180,104],[314,48],[397,82],[455,116],[555,64],[618,143],[684,38],[850,91],[926,44],[730,155],[250,160]];
  if (nightlight > .04 && abyss <= 0) {
    ctx.save();
    ctx.globalAlpha = clamp(nightlight * 1.15, 0, 1);
    for (const [index, [x, y]] of stars.entries()) {
    const size = nightlight > .72 && index % 4 === 0 ? 4 : nightlight > .35 ? 3 : 2;
    px(x, y, size, size, index % 3 ? "#f8dfbf" : "#c8d9ff");
    if (nightlight > .72 && index % 5 === 0) {
      px(x - 3, y + 1, 2, 1, "#f8dfbf");
      px(x + size + 1, y + 1, 2, 1, "#f8dfbf");
    }
    }
    ctx.restore();
  }
  ctx.save();
  ctx.globalAlpha = .12;
  for (let x = 18; x < W; x += 37) {
    const band = (x * 7) % 4;
    px(x, H / 4 * (band + 1) - 2, 3, 3, colors[Math.min(3, band)]);
  }
  ctx.restore();
}

function drawPixelCloud(x, y, scale = 1, tint = "#ead9cf", alpha = .18) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const unit = Math.max(2, Math.round(4 * scale));
  px(x + unit, y + unit * 3, unit * 14, unit * 2, tint);
  px(x + unit * 3, y + unit * 2, unit * 9, unit * 3, tint);
  px(x + unit * 5, y + unit, unit * 5, unit * 4, tint);
  px(x + unit * 7, y, unit * 3, unit * 5, tint);
  px(x + unit * 12, y + unit * 3, unit * 5, unit * 2, tint);
  px(x, y + unit * 4, unit * 2, unit, tint);
  px(x + unit * 2, y + unit * 5, unit * 12, unit, "rgba(37,34,52,.28)");
  px(x + unit * 4, y + unit * 2, unit * 3, 1, "rgba(255,255,255,.22)");
  ctx.restore();
}

function drawApocalypseSmoke(x, y, scale, alpha) {
  ctx.save();
  const size = Math.max(.55,scale);
  const phase = performance.now() * .0014 + x * .013 + y * .007;
  const drift = Math.sin(phase) * 4 * size;
  const puffs = [
    [-11,8,17,11,"#17151b",.62],
    [-3,1,19,15,"#201a1d",.74],
    [8,-10,17,18,"#292024",.7],
    [13,-25,14,17,"#342629",.58],
    [8,-39,11,14,"#49302c",.42]
  ];
  for (let index = 0; index < puffs.length; index++) {
    const [offsetX,offsetY,radiusX,radiusY,color,opacity] = puffs[index];
    ctx.globalAlpha = alpha * opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(
      x + offsetX * size + drift * (index / Math.max(1,puffs.length - 1)),
      y + offsetY * size,
      radiusX * size,
      radiusY * size,
      Math.sin(phase + index) * .12,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  ctx.globalAlpha = alpha * .18;
  ctx.fillStyle = "#9b5542";
  ctx.beginPath();
  ctx.ellipse(x - 2 * size,y + 3 * size,12 * size,3 * size,-.08,0,Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = alpha * .34;
  for (let mote = 0; mote < 3; mote++) {
    const moteX = x + (mote - 1) * 13 * size + Math.sin(phase + mote * 2.1) * 5 * size;
    const moteY = y - (17 + mote * 11) * size;
    ctx.fillStyle = mote === 1 ? "#6d3c32" : "#312328";
    ctx.beginPath();
    ctx.arc(moteX,moteY,Math.max(1,2.2 * size - mote * .3),0,Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawDistantFlame(x, baseY, height, phase, intensity) {
  const sway = Math.sin(phase) * Math.max(3,height * .08);
  const flutter = Math.sin(phase * 1.73 + 1.2) * Math.max(2,height * .045);
  const half = Math.max(5,height * .23);
  ctx.save();
  ctx.globalAlpha = .52 + intensity * .28;
  ctx.fillStyle = "#7f1d24";
  ctx.beginPath();
  ctx.moveTo(x - half,baseY);
  ctx.bezierCurveTo(
    x - half * 1.05,baseY - height * .28,
    x - half * .42 + sway * .3,baseY - height * .55,
    x + sway + flutter,baseY - height
  );
  ctx.bezierCurveTo(
    x + half * .15 + sway,baseY - height * .64,
    x + half * 1.08,baseY - height * .34,
    x + half,baseY
  );
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = .7 + intensity * .2;
  ctx.fillStyle = "#e4482d";
  ctx.beginPath();
  ctx.moveTo(x - half * .73,baseY);
  ctx.bezierCurveTo(
    x - half * .82,baseY - height * .22,
    x - half * .16 + sway * .28,baseY - height * .48,
    x + sway * .55,baseY - height * .72
  );
  ctx.bezierCurveTo(
    x + half * .2 + flutter * .2,baseY - height * .48,
    x + half * .76,baseY - height * .24,
    x + half * .7,baseY
  );
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff9b3d";
  ctx.beginPath();
  ctx.moveTo(x - half * .42,baseY);
  ctx.quadraticCurveTo(x - half * .16 + sway * .15,baseY - height * .34,x + sway * .25,baseY - height * .53);
  ctx.quadraticCurveTo(x + half * .48,baseY - height * .22,x + half * .43,baseY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffe57c";
  ctx.beginPath();
  ctx.moveTo(x - half * .13,baseY);
  ctx.quadraticCurveTo(x + sway * .12,baseY - height * .22,x + flutter * .12,baseY - height * .34);
  ctx.quadraticCurveTo(x + half * .2,baseY - height * .14,x + half * .16,baseY);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = .48 + intensity * .18;
  ctx.fillStyle = "#bd2d29";
  ctx.beginPath();
  ctx.moveTo(x - half * .94,baseY);
  ctx.quadraticCurveTo(x - half * 1.18,baseY - height * .22,x - half * .62 + flutter,baseY - height * .42);
  ctx.quadraticCurveTo(x - half * .37,baseY - height * .18,x - half * .3,baseY);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = .75;
  px(x - half,baseY - 3,half * 2,4,"#ef5b2f");
  px(x - half * .48,baseY - 4,half * .92,3,"#ffc252");
  ctx.restore();
}

function drawFireGlow(x,y,radiusX,radiusY,alpha = .3) {
  ctx.save();
  const glow = ctx.createRadialGradient(x,y,2,x,y,Math.max(radiusX,radiusY));
  glow.addColorStop(0,`rgba(255,224,112,${alpha})`);
  glow.addColorStop(.34,`rgba(255,112,47,${alpha * .72})`);
  glow.addColorStop(1,"rgba(155,35,31,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(x,y,radiusX,radiusY,0,0,Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawApocalypseBackdrop() {
  const intensity = apocalypseIntensity(player.karma);
  if (intensity <= 0) return;
  const now = performance.now();
  const interior = currentZoneId === "elderHouse" || currentZoneId === "dungeon";
  ctx.save();
  if (interior) {
    ctx.globalAlpha = .1 + Math.sin(now * .002) * .025;
    px(0,72,W,H - 72,"#5a1719");
    for (let x = 28; x < W; x += 117) {
      const glow = .18 + Math.sin(now * .004 + x) * .06;
      ctx.globalAlpha = glow;
      px(x,386 + x % 3 * 7,46,3,"#d84b2d");
      px(x + 12,381 + x % 3 * 7,18,2,"#ffad49");
    }
    ctx.restore();
    return;
  }

  ctx.globalAlpha = .1 + intensity * .08;
  px(0,0,W,H,"#27070e");
  ctx.globalAlpha = .12 + intensity * .08;
  ctx.fillStyle = "#d3482f";
  ctx.beginPath();
  ctx.arc(W * .79,92,54,0,Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = .76;
  px(W * .79 - 22,64,44,56,"#6f2525");
  px(W * .79 - 28,70,56,44,"#6f2525");
  px(W * .79 - 19,67,38,50,"#9d3329");
  px(W * .79 - 12,73,9,5,"#d9683c");

  for (let index = 0; index < 6; index++) {
    const cloudX = ((index * 207 - renderCameraX * .035 + now * .0025) % (W + 300) + W + 300) % (W + 300) - 170;
    drawPixelCloud(cloudX,74 + index % 3 * 54,.9 + index % 2 * .28,index % 2 ? "#2c171d" : "#3b1d20",.16 + intensity * .1);
  }

  const fireStart = Math.floor(renderCameraX * .11 / 174) - 2;
  for (let index = 0; index < 9; index++) {
    const worldIndex = fireStart + index;
    const x = worldIndex * 174 - renderCameraX * .11;
    const baseY = 374 + ((worldIndex % 4) + 4) % 4 * 12;
    const height = 24 + ((worldIndex * 17 % 29) + 29) % 29;
    drawDistantFlame(x + 66,baseY,height,now * .007 + worldIndex * 1.7,intensity);
    if (worldIndex % 2 === 0) drawDistantFlame(x + 97,baseY + 5,height * .66,now * .009 + worldIndex,intensity);
    drawApocalypseSmoke(x + 74,baseY - height - 19,.72 + index % 2 * .18,.12 + intensity * .07);
    ctx.globalAlpha = .25;
    px(x + 27,baseY - 2,112,4,"#6f211f");
    px(x + 52,baseY - 5,52,3,"#d64d29");
  }

  for (let index = 0; index < 5; index++) {
    const fall = firefallState(now,index,W,H);
    if (!fall.active) continue;
    const meteorX = Math.round(fall.x);
    const meteorY = Math.round(fall.y);
    const trailX = fall.trailX * fall.scale;
    const trailY = fall.trailY * fall.scale;
    ctx.lineCap = "round";
    ctx.globalAlpha = .1 + intensity * .1;
    ctx.fillStyle = "#ff542f";
    ctx.beginPath();
    ctx.ellipse(meteorX,meteorY,24 * fall.scale,18 * fall.scale,0,0,Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = .16 + intensity * .12;
    ctx.strokeStyle = "#ff4a2c";
    ctx.lineWidth = 13 * fall.scale;
    ctx.beginPath();
    ctx.moveTo(meteorX,meteorY);
    ctx.lineTo(meteorX + trailX,meteorY - trailY);
    ctx.stroke();
    ctx.globalAlpha = .68;
    ctx.strokeStyle = "#ef6b32";
    ctx.lineWidth = 5 * fall.scale;
    ctx.beginPath();
    ctx.moveTo(meteorX,meteorY);
    ctx.lineTo(meteorX + trailX * .88,meteorY - trailY * .88);
    ctx.stroke();
    ctx.globalAlpha = .92;
    ctx.strokeStyle = "#ffe08a";
    ctx.lineWidth = Math.max(2,2.4 * fall.scale);
    ctx.beginPath();
    ctx.moveTo(meteorX,meteorY);
    ctx.lineTo(meteorX + trailX * .54,meteorY - trailY * .54);
    ctx.stroke();
    for (let ember = 1; ember <= 4; ember++) {
      const ratio = ember / 5;
      const jitter = Math.sin(index * 3.1 + ember * 2.7 + now * .004) * 8;
      px(
        meteorX + trailX * ratio + jitter,
        meteorY - trailY * ratio + jitter * .25,
        ember % 2 ? 3 : 2,
        ember % 2 ? 4 : 3,
        ember === 1 ? "#ffe08a" : "#e64d2e"
      );
    }
    ctx.globalAlpha = .95;
    px(meteorX - 7 * fall.scale,meteorY - 7 * fall.scale,14 * fall.scale,14 * fall.scale,"#d53d29");
    px(meteorX - 4 * fall.scale,meteorY - 5 * fall.scale,9 * fall.scale,10 * fall.scale,"#ff8b3d");
    px(meteorX - 1,meteorY - 3,4,5,"#ffe47b");
  }
  ctx.restore();
}

function drawBackground() {
  drawSky();
  const abyss = apocalypseIntensity(player.karma);
  const daylight = daylightAt(clock.minute) * (1 - abyss * .72);
  if (currentZoneId === "elderHouse") {
    const burning = elderHouseBurning();
    const fireIntensity = burning ? elderFireVisualIntensity() : 0;
    px(0,70,W,368,burning ? blendHex("#302735","#5f2829",fireIntensity * .48) : "#302735");
    for (let x = -(renderCameraX * .08) % 150 - 150; x < W + 150; x += 150) {
      px(x,82,138,330,burning ? blendHex("#493541","#632d2b",fireIntensity * .35) : "#493541");
      px(x + 8,92,122,310,burning ? blendHex("#392d38","#3e252b",fireIntensity * .42) : "#392d38");
      px(x + 65,92,5,310,burning ? "#34262b" : "#5f443e");
    }
    px(0,405,W,33,burning ? "#48302d" : "#6c4937");
    if (burning) {
      ctx.save();
      ctx.globalAlpha = .08 + fireIntensity * .11;
      px(0,70,W,368,"#ff4f2f");
      ctx.globalAlpha = .16 + fireIntensity * .12;
      for (let smoke = 0; smoke < 5; smoke++) {
        const smokeX = 80 + smoke * 205 + Math.sin(performance.now() * .0012 + smoke) * 34;
        drawApocalypseSmoke(smokeX,104 + smoke % 2 * 28,.72 + fireIntensity * .28,.07);
      }
      ctx.restore();
    }
    return;
  }
  if (currentZoneId === "castleHall") {
    px(0,58,W,380,blendHex("#171925","#302936",daylight));
    const wallOffset = -(renderCameraX * .09) % 156;
    for (let x=wallOffset - 156;x<W + 156;x+=156) {
      px(x,72,150,366,"#34313c");
      px(x + 7,80,136,358,"#252631");
      for (let row=0;row<11;row++) {
        const brickY = 92 + row * 31;
        const offset = row % 2 ? 17 : 0;
        for (let brick=0;brick<4;brick++) {
          px(x + 13 + offset + brick * 35,brickY,30,2,"rgba(102,94,106,.32)");
          px(x + 41 + offset + brick * 35,brickY + 1,2,24,"rgba(15,17,25,.26)");
        }
      }
    }
    const windowOffset = -(renderCameraX * .16) % 390;
    for (let x=windowOffset - 390;x<W + 390;x+=390) {
      px(x + 111,105,102,238,"#171923");
      ctx.fillStyle="#191b27";
      ctx.beginPath();ctx.arc(x + 162,105,51,Math.PI,0);ctx.fill();
      const glass = blendHex("#5c365c","#b36665",1 - daylight);
      px(x + 121,112,82,218,glass);
      ctx.save();
      ctx.globalAlpha=.28 + daylight * .18;
      px(x + 126,117,33,91,"#a96d75");
      px(x + 164,117,34,91,"#5f6688");
      px(x + 126,213,33,110,"#5b527a");
      px(x + 164,213,34,110,"#b58562");
      ctx.restore();
      px(x + 158,107,7,223,"#252530");
      px(x + 121,207,82,7,"#252530");
      ctx.strokeStyle="#68606c";ctx.lineWidth=6;ctx.beginPath();ctx.arc(x + 162,108,46,Math.PI,0);ctx.stroke();
    }
    px(0,401,W,37,"#29252f");
    return;
  }
  if (currentZoneId === "dungeon") {
    px(0,64,W,376,"#171b29");
    for (let x = -(renderCameraX * .12) % 180 - 180; x < W + 180; x += 180) {
      px(x, 80, 118, 360, "#252a3a");
      px(x + 8, 90, 102, 350, "#1c2131");
      px(x + 18, 118, 16, 275, "#121725");
      px(x + 77, 148, 13, 242, "#121725");
      px(x + 4, 94, 105, 10, "#3b3c4e");
      px(x + 10, 104, 6, 295, "#303345");
      px(x + 96, 104, 6, 295, "#101522");
      for (let rune = 0; rune < 3; rune++) {
        px(x + 46, 145 + rune * 78, 20, 3, "#4c4967");
        px(x + 54, 137 + rune * 78, 4, 19, "#676083");
      }
    }
    ctx.save(); ctx.globalAlpha = .1;
    for (let x = -(renderCameraX * .3) % 260 - 260; x < W + 260; x += 260) drawPixelCloud(x, 270, .9, "#7d8198", .28);
    ctx.restore();
    return;
  }
  if (currentZoneId.startsWith("moonbriar")) {
    const treeStart = Math.floor(renderCameraX * .08 / 270) - 1;
    for (let index = 0; index < 7; index++) {
      const worldIndex = treeStart + index;
      const x = worldIndex * 270 - renderCameraX * .08;
      px(x + 95, 180, 18, 260, "#192d37");
      px(x + 100, 178, 7, 262, "#27404a");
      px(x + 47, 158, 118, 8, "#243e42");
      px(x + 23, 188, 166, 7, "#20383e");
      ctx.strokeStyle="#223b42";ctx.lineWidth=5;ctx.beginPath();
      ctx.moveTo(x+101,205);ctx.lineTo(x+64,169);ctx.lineTo(x+40,169);
      ctx.moveTo(x+106,233);ctx.lineTo(x+147,190);ctx.lineTo(x+181,190);ctx.stroke();
      ctx.strokeStyle="rgba(111,143,138,.16)";ctx.lineWidth=2;ctx.beginPath();
      ctx.moveTo(x+102,186);ctx.lineTo(x+70,161);ctx.moveTo(x+105,215);ctx.lineTo(x+146,186);ctx.stroke();
      ctx.fillStyle = blendHex("#142538","#29474a",daylight);
      ctx.beginPath(); ctx.arc(x + 105, 170, 73, Math.PI, 0); ctx.fill();
      px(x + 100, 174, 7, 266, "#16272f");
      px(x + 54, 211, 104, 5, "#1b3035");
      for (let leaf=0;leaf<9;leaf++) {
        const lx = x + 42 + (leaf * 29) % 126;
        const ly = 126 + (leaf * 23) % 62;
        px(lx,ly,3 + leaf%2,2,leaf%3 ? "#2f5250" : "#405e58");
        if (leaf%3===0) px(lx+1,ly-2,2,2,"#678075");
      }
    }
    ctx.save(); ctx.globalAlpha = .12;
    const fogStart = Math.floor(renderCameraX * .22 / 240) - 1;
    for (let index = 0; index < 7; index++) {
      const worldIndex = fogStart + index;
      const x = worldIndex * 240 - renderCameraX * .22;
      const stableBand = ((worldIndex % 3) + 3) % 3;
      px(x,315 + stableBand * 11,330,43,"#bdc6d5");
    }
    ctx.restore();
    const fireflyTime = performance.now() * .001;
    for (let index = 0; index < 17; index++) {
      const x = ((index * 149 - renderCameraX * .16) % (W + 100) + W + 100) % (W + 100) - 40;
      const y = 190 + (index * 47) % 165 + Math.sin(fireflyTime * 2 + index) * 7;
      ctx.save(); ctx.globalAlpha = .22 + Math.sin(fireflyTime * 3 + index) * .12;
      px(x, y, 3, 3, index % 2 ? "#c8e9cc" : "#d9d0ff");
      px(x - 2, y + 1, 7, 1, "rgba(207,224,210,.25)");
      ctx.restore();
    }
    return;
  }
  if (currentZoneId.startsWith("sunspire")) {
    for (let index = 0; index < 3; index++) {
      const cloudX = ((index * 390 - renderCameraX * .04) % (W + 520) + W + 520) % (W + 520) - 240;
      drawPixelCloud(cloudX,72 + index * 38,.78 + index * .12,"#ffe0af",.08 + daylight * .06);
    }
    const duneOff = -(renderCameraX * .1) % 390;
    for (let x = duneOff - 390; x < W + 390; x += 390) {
      ctx.fillStyle = blendHex("#4c3545","#b66d4d",daylight);
      ctx.beginPath(); ctx.moveTo(x,430);ctx.quadraticCurveTo(x+145,250,x+390,430);ctx.fill();
      ctx.fillStyle = blendHex("#3a3042","#d58b58",daylight);
      ctx.beginPath();ctx.moveTo(x+120,430);ctx.quadraticCurveTo(x+285,315,x+470,430);ctx.fill();
    }
    for (let x = -(renderCameraX * .24) % 410 - 410; x < W + 410; x += 410) {
      px(x + 186, 226, 15, 214, "#745044");
      px(x + 190, 227, 4, 210, "rgba(238,184,116,.16)");
      px(x + 164, 208, 59, 13, "#98705a");
      px(x + 169, 204, 49, 5, "#c88a5a");
      px(x + 175, 168, 37, 36, "#b37d56");
      px(x + 179, 171, 4, 29, "rgba(255,214,139,.2)");
      px(x + 185, 143, 17, 26, "#e4b56b");
      px(x + 189, 120, 9, 24, "#f1c56f");
      px(x + 191, 110, 5, 11, "#fff0a5");
      px(x + 193, 107, 2, 5, "#fff8c7");
      px(x + 181, 189, 4, 6, "#7c4e42");px(x + 202, 184, 4, 8, "#7c4e42");
      px(x + 188, 240, 11, 2,"rgba(255,218,155,.13)");
      px(x + 188, 292, 11, 2,"rgba(255,218,155,.13)");
      px(x + 188, 344, 11, 2,"rgba(255,218,155,.13)");
    }
    ctx.save(); ctx.globalAlpha = .16;
    for (let x = -(renderCameraX * .32) % 116 - 116; x < W + 116; x += 116) {
      px(x,399,89,39,blendHex("#2c283c","#8f5745",daylight));
      px(x + 14,385,19,16,blendHex("#3b3045","#b16b4c",daylight));
      px(x + 57,376,14,25,blendHex("#3b3045","#b16b4c",daylight));
    }
    ctx.restore();
    return;
  }
  for (let index = 0; index < 4; index++) {
    const cloudX = ((index * 330 - renderCameraX * .045) % (W + 450) + W + 450) % (W + 450) - 220;
    drawPixelCloud(cloudX,62 + (index % 3) * 44,.74 + (index % 2) * .2,blendHex("#a8acc7","#f0d4ca",daylight),.09 + daylight * .07);
  }
  const mountainOff = -(renderCameraX * .1) % 310;
  for (let x = mountainOff - 310; x < W + 310; x += 310) {
    const mountain = blendHex("#252943","#4e485f",daylight);
    const ridge = blendHex("#1d233a","#6a5264",daylight);
    ctx.fillStyle = mountain;
    ctx.beginPath();
    ctx.moveTo(x, 430); ctx.lineTo(x + 105, 275); ctx.lineTo(x + 165, 355); ctx.lineTo(x + 230, 242); ctx.lineTo(x + 310, 430);
    ctx.fill();
    ctx.fillStyle = ridge;
    ctx.beginPath();
    ctx.moveTo(x + 105,275);ctx.lineTo(x + 64,430);ctx.lineTo(x + 128,430);ctx.lineTo(x + 145,332);ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 230,242);ctx.lineTo(x + 183,430);ctx.lineTo(x + 247,430);ctx.lineTo(x + 257,294);ctx.fill();
    px(x + 96,291,10,2,"rgba(230,197,191,.13)");
    px(x + 221,259,10,2,"rgba(230,197,191,.13)");
    px(x + 72,363,18,2,"rgba(26,26,39,.22)");
    px(x + 246,337,15,2,"rgba(26,26,39,.22)");
  }
  const trees = -(renderCameraX * .2) % 132;
  for (let x = trees - 132; x < W + 132; x += 132) {
    const pine = blendHex("#202c3a","#304a50",daylight);
    const pineShadow = blendHex("#172330","#243e45",daylight);
    const pineLight = blendHex("#293948","#46605c",daylight);
    px(x + 59, 330, 9, 110, "#293743");
    ctx.fillStyle = pineShadow;
    ctx.beginPath(); ctx.moveTo(x + 3,420);ctx.lineTo(x + 63,277);ctx.lineTo(x + 124,420);ctx.fill();
    ctx.fillStyle = pine;
    ctx.beginPath();ctx.moveTo(x + 25,353);ctx.lineTo(x + 63,280);ctx.lineTo(x + 101,353);ctx.fill();
    ctx.beginPath();ctx.moveTo(x + 13,389);ctx.lineTo(x + 63,315);ctx.lineTo(x + 114,389);ctx.fill();
    ctx.beginPath();ctx.moveTo(x,420);ctx.lineTo(x + 63,350);ctx.lineTo(x + 127,420);ctx.fill();
    px(x + 48,326,3,20,pineLight);px(x + 37,363,3,15,pineLight);px(x + 25,397,3,12,pineLight);
    px(x + 74,347,2,13,"rgba(16,27,35,.42)");px(x + 89,385,2,11,"rgba(16,27,35,.42)");
  }
  ctx.save(); ctx.globalAlpha = .42 - daylight * .14;
  const castleX = 690 - renderCameraX * .15;
  px(castleX,298,154,142,"#252a3b");
  px(castleX + 16,260,38,180,"#252a3b");
  px(castleX + 101,274,35,166,"#252a3b");
  for (const bx of [19,31,43,104,116,128]) px(castleX + bx,251 + (bx > 80 ? 14 : 0),8,12,"#252a3b");
  px(castleX + 64,337,29,103,"#171d2c");
  px(castleX + 24,302,8,14,blendHex("#d39355","#4d4954",daylight));
  px(castleX + 113,307,8,14,blendHex("#d39355","#4d4954",daylight));
  ctx.restore();
  if (currentZoneId === "bossArena") {
    px(0, 404, W, 34, "rgba(222,96,53,.26)");
    for (let x = -(renderCameraX * .4) % 90; x < W; x += 90) px(x, 405, 36, 3, "#ef8d54");
  }
}

function drawPlatform(p) {
  if (!inView(p.x, p.w)) return;
  const topByKind = {
    wood:"#95623c", grass:"#52744b", village:"#7c685d", stone:"#72707b", ruin:"#6b5e5b",
    bridge:"#82625e", dungeon:"#565466",
    moonGrass:"#506b69", moonStone:"#706b86", moonVillage:"#607575",
    sand:"#d29555", sandstone:"#bd774b", sunVillage:"#c28656",
    castleStone:"#77717d", castleInterior:"#5e5867"
  };
  const sideByKind = {
    grass:"#443b38", village:"#51433e", stone:"#484750", ruin:"#473f42", bridge:"#433845",
    dungeon:"#323340", moonGrass:"#303d42", moonStone:"#3d3a50", moonVillage:"#3d4750",
    sand:"#785442", sandstone:"#6f493d", sunVillage:"#765344", wood:"#523a31",
    castleStone:"#43434e", castleInterior:"#35333f"
  };
  const top = topByKind[p.kind] || "#77727c";
  const side = sideByKind[p.kind] || "#42434f";
  px(p.x, p.y, p.w, p.h, side);
  px(p.x, p.y, p.w, 9, top);
  px(p.x, p.y + 9, p.w, 3, "#292d37");
  px(p.x, p.y + 12, p.w, 2, "rgba(255,255,255,.07)");
  if (p.kind === "wood") {
    for (let x = p.x + 10; x < p.x + p.w; x += 30) {
      px(x, p.y + 1, 2, 12, "#c68c53");
      px(x + 7, p.y + 5, 12, 1, "#6b4636");
      px(x + 16, p.y + 2, 6, 1, "rgba(255,220,158,.24)");
    }
  } else {
    for (let y = p.y + 22; y < p.y + p.h; y += 22) {
      for (let x = p.x + ((y / 22) % 2) * 20; x < p.x + p.w; x += 42) {
        const seam = p.kind.startsWith("moon") ? "#524e64" : ["sand","sandstone","sunVillage"].includes(p.kind) ? "#8e5d43" : "#5c5353";
        px(x, y, 36, 2, seam);
        px(x + 36, y, 2, 18, seam);
        px(x + 3,y + 3,20,1,"rgba(255,255,255,.045)");
      }
    }
  }
  if (["grass","moonGrass"].includes(p.kind)) {
    const tuft = p.kind === "moonGrass" ? "#7e9a8e" : "#78945e";
    for (let x = p.x + 17; x < p.x + p.w; x += 61) {
      px(x,p.y - 6,2,7,tuft); px(x + 4,p.y - 9,2,10,tuft); px(x + 8,p.y - 5,2,6,tuft);
      if (p.kind === "moonGrass" && Math.floor(x / 61) % 3 === 0) px(x + 4,p.y - 13,4,4,"#bdb5ee");
    }
  } else if (["sand","sandstone","sunVillage"].includes(p.kind)) {
    for (let x = p.x + 20; x < p.x + p.w; x += 74) {
      px(x,p.y + 5,32,2,"rgba(255,220,139,.24)");
      px(x + 27,p.y + 3,12,2,"rgba(98,59,46,.28)");
    }
  } else if (["village","moonVillage","stone","ruin","dungeon","castleStone","castleInterior"].includes(p.kind)) {
    for (let x = p.x + 12; x < p.x + p.w; x += 48) {
      px(x,p.y + 3,31,2,"rgba(255,255,255,.12)");
      px(x + 29,p.y + 3,3,7,"rgba(27,27,37,.28)");
    }
  }
}

function drawHouse(x, floor, color = "#8a624f") {
  if (!inView(x - 18, 165)) return;
  const moon = currentZoneId.startsWith("moonbriar");
  const sun = currentZoneId.startsWith("sunspire");
  const variant = Math.abs(Math.floor(x / 70)) % 3;
  const roof = moon ? "#343b59" : sun ? "#744139" : variant === 1 ? "#4f3a4c" : "#443744";
  const roofLight = moon ? "#59627d" : sun ? "#a65d42" : "#6d4e55";
  const beam = sun ? "#794936" : moon ? "#34444f" : "#503b36";
  const stone = sun ? "#8f5c48" : moon ? "#43505d" : "#5d5150";
  const dayWindow = moon ? "#9eb5c2" : sun ? "#f4bd69" : "#d9ae70";
  const nightWindow = moon ? "#c9c6ff" : sun ? "#ffd36e" : "#ffbd70";
  const window = blendHex(dayWindow,nightWindow,1 - daylightAt(clock.minute));
  px(x - 4,floor - 6,130,6,"rgba(24,23,31,.42)");
  px(x,floor - 95,120,95,stone);
  px(x + 4,floor - 91,112,87,color);
  px(x + 7,floor - 88,106,2,"rgba(255,255,255,.1)");
  for (let row=0;row<3;row++) {
    const wallY = floor - 80 + row * 24;
    const offset = row % 2 ? 12 : 0;
    for (let mark=0;mark<4;mark++) {
      const wallX = x + 13 + offset + mark * 27;
      px(wallX,wallY,10 + (mark % 2) * 5,1,"rgba(67,48,49,.16)");
      px(wallX + 2,wallY + 1,1,4,"rgba(67,48,49,.12)");
    }
  }
  ctx.fillStyle = roof;
  ctx.beginPath(); ctx.moveTo(x - 17,floor - 89);ctx.lineTo(x + 59,floor - 151 - variant * 4);ctx.lineTo(x + 137,floor - 89);ctx.fill();
  ctx.fillStyle = roofLight;
  ctx.beginPath();ctx.moveTo(x - 10,floor - 93);ctx.lineTo(x + 59,floor - 145 - variant * 4);ctx.lineTo(x + 128,floor - 93);ctx.fill();
  px(x - 12,floor - 94,144,5,roof);
  px(x - 5,floor - 96,130,2,blendHex(roofLight,"#f3d6b8",.14));
  for (let row=0;row<5;row++) {
    const roofY = floor - 100 - row * 10;
    const inset = 9 + row * 12;
    for (let tile=x + inset;tile<x + 120 - inset;tile+=16) {
      px(tile,roofY,12,2,roof);
      px(tile + 11,roofY - 3,2,5,"rgba(39,29,39,.42)");
      px(tile + 2,roofY - 2,7,1,"rgba(255,221,194,.12)");
    }
  }
  px(x + 8,floor - 95,4,91,beam);px(x + 108,floor - 95,4,91,beam);
  px(x + 57,floor - 98,5,94,beam);px(x + 8,floor - 54,104,4,beam);
  ctx.strokeStyle=beam;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+11,floor-91);ctx.lineTo(x+59,floor-57);ctx.lineTo(x+109,floor-91);ctx.stroke();
  px(x + 14,floor - 88,2,30,"rgba(255,219,182,.12)");
  px(x + 104,floor - 84,2,26,"rgba(38,27,32,.2)");
  const doorX = variant === 1 ? x + 18 : x + 47;
  px(doorX - 2,floor - 49,32,49,"#282832");
  px(doorX + 1,floor - 46,26,46,sun ? "#6e3f32" : "#493431");
  px(doorX + 4,floor - 41,2,36,"rgba(255,255,255,.1)");
  for (let plank=0;plank<3;plank++) px(doorX + 8 + plank*6,floor - 43,1,40,"rgba(39,28,32,.24)");
  px(doorX + 21,floor - 25,3,3,"#e2b45e");px(doorX + 22,floor - 24,1,1,"#fff1a2");
  const windows = variant === 1 ? [73] : [19,88];
  for (const wx of windows) {
    px(x + wx - 2,floor - 69,24,27,beam);
    px(x + wx,floor - 67,20,23,window);
    px(x + wx + 9,floor - 67,2,23,"rgba(48,42,53,.72)");
    px(x + wx,floor - 57,20,2,"rgba(48,42,53,.72)");
    px(x + wx + 2,floor - 65,4,6,"rgba(255,245,195,.42)");
    px(x + wx + 3,floor - 64,1,3,"rgba(255,255,233,.52)");
    if (variant === 2) {
      px(x + wx - 3,floor - 40,26,3,"#654837");
      for (let flower=0;flower<5;flower++) {
        px(x + wx + flower*4,floor - 43 - flower%2*2,2,2,moon ? "#a895d4" : "#bc5e5d");
        px(x + wx + flower*4 + 1,floor - 45 - flower%2*2,1,1,moon ? "#ddd2ff" : "#ef9990");
      }
    }
  }
  if (variant === 0) {
    px(x + 91,floor - 148,16,43,beam);px(x + 88,floor - 151,22,7,roof);
    ctx.save();ctx.globalAlpha=.13;
    px(x + 94,floor - 174,19,15,"#c6b8b6");px(x + 100,floor - 190,24,17,"#c6b8b6");
    ctx.restore();
  } else if (variant === 1) {
    px(x + 71,floor - 109,30,18,beam);px(x + 75,floor - 106,22,12,moon ? "#776aa0" : sun ? "#d18b4d" : "#95604f");
    px(x + 84,floor - 91,4,12,"#42333a");
  } else {
    px(x + 48,floor - 132,23,25,beam);px(x + 52,floor - 128,15,17,window);
    px(x + 58,floor - 128,3,17,"#4c4250");
  }
}

function elderManorGeometry(prop, floor) {
  const width = Math.max(240,Number(prop.width) || 250);
  const x = Number.isFinite(prop.houseX) ? prop.houseX : prop.x - 65;
  return {
    x,
    floor,
    width,
    color:"#765342",
    doorX:elderHouseEntranceX(),
    windmillX:Number.isFinite(prop.windmillX) ? prop.windmillX : x + width + 30
  };
}

function drawElderManorWindmill(home, stage = "intact", progress = 0) {
  const x = home.windmillX;
  const floor = home.floor;
  const hubY = floor - 151;
  const burning = stage === "burning";
  const burned = stage === "burned";
  const beam = burned ? "#211f22" : burning ? "#3a2928" : "#4b3934";
  const beamLight = burned ? "#4a312c" : burning ? "#70443a" : "#88654d";
  const sail = burned ? "#2a2528" : burning ? "#563633" : "#8c745b";

  ctx.save();
  ctx.globalAlpha = burned ? .22 : .3;
  ctx.fillStyle = "#15151c";
  ctx.beginPath();ctx.ellipse(x + 1,floor - 3,52,9,0,0,Math.PI * 2);ctx.fill();
  ctx.restore();

  if (burned) {
    ctx.fillStyle = "#282529";
    ctx.beginPath();
    ctx.moveTo(x - 31,floor);
    ctx.lineTo(x - 24,floor - 97);
    ctx.lineTo(x - 13,floor - 139);
    ctx.lineTo(x + 17,floor - 133);
    ctx.lineTo(x + 27,floor - 66);
    ctx.lineTo(x + 34,floor);
    ctx.closePath();ctx.fill();
    px(x - 17,floor - 121,12,118,beam);
    px(x + 9,floor - 97,9,94,beam);
    px(x - 27,floor - 7,61,7,"#17171b");
    ctx.save();
    ctx.translate(x,hubY + 15);
    ctx.rotate(-.42);
    px(-4,-63,8,79,beam);
    px(-3,-60,3,56,beamLight);
    ctx.rotate(Math.PI * .72);
    px(-4,-39,8,54,beam);
    px(-3,-36,3,33,beamLight);
    ctx.restore();
    px(x - 10,hubY + 5,20,20,"#1a191d");
    px(x - 6,hubY + 9,12,12,"#5a3a31");
    px(x + 19,floor - 22,18,7,"#3e2a27");
    px(x + 28,floor - 14,12,6,"#201e21");
    return;
  }

  const rotationSpeed = burning ? .000055 * Math.max(.18,1 - progress) : .00022;
  const rotation = performance.now() * rotationSpeed + x * .003;
  ctx.save();
  ctx.translate(x,hubY);
  ctx.rotate(rotation);
  for (let blade = 0; blade < 4; blade++) {
    ctx.save();
    ctx.rotate(blade * Math.PI / 2);
    px(-4,-82,8,84,beam);
    px(-2,-79,3,77,beamLight);
    ctx.fillStyle = sail;
    ctx.beginPath();
    ctx.moveTo(7,-76);
    ctx.lineTo(24,-67);
    ctx.lineTo(20,-34);
    ctx.lineTo(6,-43);
    ctx.closePath();ctx.fill();
    px(9,-68,11,3,beamLight);
    px(8,-57,12,3,beamLight);
    px(7,-46,11,3,beamLight);
    ctx.restore();
  }
  ctx.restore();

  const tower = burning ? "#5a3b34" : "#80604a";
  const towerLight = burning ? "#71473a" : "#a47b57";
  ctx.fillStyle = "#353039";
  ctx.beginPath();
  ctx.moveTo(x - 39,floor);
  ctx.lineTo(x - 28,floor - 121);
  ctx.lineTo(x - 18,floor - 151);
  ctx.lineTo(x + 19,floor - 151);
  ctx.lineTo(x + 30,floor - 121);
  ctx.lineTo(x + 39,floor);
  ctx.closePath();ctx.fill();
  ctx.fillStyle = tower;
  ctx.beginPath();
  ctx.moveTo(x - 31,floor - 5);
  ctx.lineTo(x - 22,floor - 116);
  ctx.lineTo(x - 13,floor - 143);
  ctx.lineTo(x + 14,floor - 143);
  ctx.lineTo(x + 23,floor - 116);
  ctx.lineTo(x + 31,floor - 5);
  ctx.closePath();ctx.fill();
  px(x - 18,floor - 129,36,5,towerLight);
  px(x - 25,floor - 83,50,5,beam);
  px(x - 29,floor - 39,58,5,beam);
  px(x - 6,floor - 140,7,136,beam);
  ctx.strokeStyle = beam;
  ctx.lineWidth = 4;
  ctx.beginPath();ctx.moveTo(x - 23,floor - 115);ctx.lineTo(x + 22,floor - 41);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x + 22,floor - 115);ctx.lineTo(x - 24,floor - 42);ctx.stroke();
  px(x - 12,floor - 76,24,30,beam);
  px(x - 8,floor - 72,16,22,burning ? "#b54c32" : "#e1b76e");
  px(x - 1,floor - 72,2,22,"#4b3b3c");
  px(x - 8,floor - 63,16,2,"#4b3b3c");
  px(x - 12,floor - 10,24,10,"#3b2f2d");
  px(x - 9,floor - 7,18,7,"#201f25");
  px(x - 11,hubY - 11,22,22,beam);
  px(x - 7,hubY - 7,14,14,burning ? "#9a4c38" : "#c4925c");
  px(x - 3,hubY - 3,6,6,"#2c2730");
}

function drawBurnedElderManor(home) {
  drawElderManorWindmill(home,"burned",1);
  drawBurnedHouse(home);
  px(home.x - 10,home.floor - 9,home.width + 30,9,"#17171b");
  px(home.x - 4,home.floor - 16,home.width + 17,7,"#4c3b36");
  for (const [offset,height] of [[8,72],[58,48],[126,81],[191,55],[239,68]]) {
    px(home.x + offset,home.floor - height,8,height - 9,"#222024");
    px(home.x + offset + 2,home.floor - height + 3,3,height - 16,"#56372f");
  }
  ctx.save();
  ctx.strokeStyle = "#211f22";
  ctx.lineCap = "round";
  for (const [x1,y1,x2,y2,width] of [
    [home.x + 3,home.floor - 63,home.x + 82,home.floor - 18,9],
    [home.x + 69,home.floor - 47,home.x + 156,home.floor - 13,8],
    [home.x + 139,home.floor - 75,home.x + 237,home.floor - 19,10]
  ]) {
    ctx.lineWidth = width;
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
    ctx.strokeStyle = "#6a3d32";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = "#211f22";
  }
  ctx.restore();
  px(home.doorX - 19,home.floor - 31,38,24,"#1b1a1e");
  px(home.doorX - 15,home.floor - 28,30,5,"#54342f");
  px(home.doorX - 31,home.floor - 94,62,8,"#292329");
  px(home.doorX - 21,home.floor - 88,42,6,"#5b3933");
}

function drawElderManor(home, stage = "intact", progress = 0) {
  const totalWidth = home.windmillX - home.x + 92;
  if (!inView(home.x - 34,totalWidth + 50)) return;
  if (stage === "burned") {
    drawBurnedElderManor(home);
    return;
  }

  const burning = stage === "burning";
  const floor = home.floor;
  const x = home.x;
  const right = x + home.width;
  const wall = burning ? "#68443c" : "#8b624a";
  const wallLight = burning ? "#765045" : "#a27656";
  const stone = burning ? "#4b3f41" : "#665b59";
  const beam = burning ? "#392b2c" : "#4b3734";
  const roof = burning ? "#342a30" : "#44333f";
  const roofLight = burning ? "#5a3836" : "#76504d";
  const window = burning
    ? "#d15a37"
    : blendHex("#e4b96f","#ffbd6f",1 - daylightAt(clock.minute));

  drawElderManorWindmill(home,stage,progress);
  ctx.save();
  ctx.globalAlpha = .32;
  ctx.fillStyle = "#171720";
  ctx.beginPath();ctx.ellipse(x + home.width * .56,floor - 2,home.width * .58,10,0,0,Math.PI * 2);ctx.fill();
  ctx.restore();

  px(x - 9,floor - 14,home.width + 20,14,"#3d3739");
  px(x - 4,floor - 19,home.width + 10,8,stone);
  px(x,floor - 112,home.width,96,stone);
  px(x + 5,floor - 108,home.width - 10,90,wall);
  px(x + 9,floor - 104,home.width - 18,5,wallLight);

  ctx.fillStyle = roof;
  ctx.beginPath();
  ctx.moveTo(x - 18,floor - 109);
  ctx.lineTo(x + 40,floor - 168);
  ctx.lineTo(right - 42,floor - 168);
  ctx.lineTo(right + 18,floor - 109);
  ctx.closePath();ctx.fill();
  ctx.fillStyle = roofLight;
  ctx.beginPath();
  ctx.moveTo(x - 9,floor - 114);
  ctx.lineTo(x + 45,floor - 160);
  ctx.lineTo(right - 46,floor - 160);
  ctx.lineTo(right + 9,floor - 114);
  ctx.closePath();ctx.fill();
  px(x - 13,floor - 114,home.width + 26,7,roof);
  for (let roofRow = 0; roofRow < 5; roofRow++) {
    const roofY = floor - 121 - roofRow * 9;
    const inset = 7 + roofRow * 10;
    for (let tileX = x + inset; tileX < right - inset; tileX += 18) {
      px(tileX,roofY,14,3,roof);
      px(tileX + 2,roofY - 2,9,2,"rgba(255,226,195,.11)");
      px(tileX + 13,roofY - 1,2,5,"rgba(32,25,31,.34)");
    }
  }

  px(x + 28,floor - 191,19,50,beam);
  px(x + 24,floor - 195,27,8,roof);
  ctx.save();ctx.globalAlpha = burning ? .2 : .12;
  drawApocalypseSmoke(x + 40,floor - 204,.42,.06);
  ctx.restore();

  px(x + 10,floor - 108,6,92,beam);
  px(right - 16,floor - 108,6,92,beam);
  px(x + 58,floor - 108,5,92,beam);
  px(x + 164,floor - 108,5,92,beam);
  px(x + 9,floor - 66,home.width - 18,6,beam);
  ctx.strokeStyle = beam;
  ctx.lineWidth = 4;
  for (const [start,end] of [[x + 14,x + 58],[x + 63,x + 112],[x + 168,x + 211],[x + 216,right - 14]]) {
    ctx.beginPath();ctx.moveTo(start,floor - 105);ctx.lineTo(end,floor - 69);ctx.stroke();
    ctx.beginPath();ctx.moveTo(end,floor - 105);ctx.lineTo(start,floor - 69);ctx.stroke();
  }

  for (const windowX of [x + 24,x + 72,right - 82,right - 38]) {
    px(windowX - 3,floor - 91,29,33,beam);
    px(windowX,floor - 88,23,27,window);
    px(windowX + 10,floor - 88,3,27,"#493b3e");
    px(windowX,floor - 76,23,3,"#493b3e");
    px(windowX + 3,floor - 85,5,7,"rgba(255,246,205,.42)");
    px(windowX - 4,floor - 57,31,4,"#584039");
  }

  const doorLeft = home.doorX - 18;
  px(doorLeft - 4,floor - 61,44,61,beam);
  px(doorLeft,floor - 57,36,57,"#3c2d2e");
  px(doorLeft + 4,floor - 53,28,50,burning ? "#59352f" : "#674638");
  for (let plank = 0; plank < 4; plank++) px(doorLeft + 7 + plank * 7,floor - 51,2,47,"rgba(28,24,29,.3)");
  px(doorLeft + 27,floor - 29,4,4,"#e0ae5c");
  px(doorLeft + 28,floor - 28,2,2,"#fff0a0");
  px(doorLeft - 8,floor - 5,52,5,"#2c2930");

  ctx.fillStyle = wallLight;
  ctx.beginPath();
  ctx.moveTo(home.doorX - 48,floor - 109);
  ctx.lineTo(home.doorX,floor - 181);
  ctx.lineTo(home.doorX + 48,floor - 109);
  ctx.closePath();ctx.fill();
  ctx.strokeStyle = beam;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(home.doorX - 48,floor - 109);
  ctx.lineTo(home.doorX,floor - 181);
  ctx.lineTo(home.doorX + 48,floor - 109);
  ctx.stroke();
  px(home.doorX - 44,floor - 114,88,6,beam);
  px(home.doorX - 4,floor - 173,8,61,beam);
  ctx.beginPath();ctx.moveTo(home.doorX - 39,floor - 115);ctx.lineTo(home.doorX - 3,floor - 157);ctx.stroke();
  ctx.beginPath();ctx.moveTo(home.doorX + 39,floor - 115);ctx.lineTo(home.doorX + 3,floor - 157);ctx.stroke();
  px(home.doorX - 15,floor - 151,30,27,beam);
  px(home.doorX - 11,floor - 147,22,19,window);
  px(home.doorX - 1,floor - 147,3,19,"#4b3c41");
  px(home.doorX - 11,floor - 139,22,3,"#4b3c41");
  px(home.doorX - 28,floor - 105,56,13,"#322b32");
  px(home.doorX - 24,floor - 102,48,8,burning ? "#8d4b37" : "#765045");
  ctx.fillStyle = "#f1cf91";
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.fillText("EDWIN · ELDER",home.doorX,floor - 96);
  px(home.doorX - 5,floor - 188,10,12,"#c89c59");
  px(home.doorX - 2,floor - 185,4,8,"#57363d");

  if (burning) {
    drawHouseFire(home,progress,{ roofOffset:27 });
    const fireTime = performance.now() * .014;
    drawFireGlow(home.windmillX,home.floor - 117,62,132,.25);
    drawDistantFlame(home.windmillX - 19,home.floor - 85,48 + progress * 28,fireTime + .8,.92);
    drawDistantFlame(home.windmillX + 18,home.floor - 53,39 + progress * 22,fireTime * 1.07 + 2.1,.83);
    drawDistantFlame(home.windmillX,home.floor - 151,34 + progress * 17,fireTime * 1.13 + 3.4,.86);
    for (let spark = 0; spark < 7; spark++) {
      const sparkY = home.floor - 123 - ((performance.now() * .021 + spark * 31) % 91);
      px(home.windmillX - 24 + spark * 8,sparkY,2,3,spark % 2 ? "#ffb24b" : "#e9502e");
    }
    drawApocalypseSmoke(home.windmillX + 4,home.floor - 202,.72,.15);
  }
}

function houseBurnProgress(fire) {
  if (!fire || fire.fireDay == null) return .35;
  return clamp(elapsedWorldDays(fire.fireDay,fire.fireMinute,clock.day,clock.minute),0,1);
}

function drawHouseFire(home, progress = .35, options = {}) {
  const width = home.width || 120;
  const center = home.x + width / 2;
  const roofOffset = Math.max(0,Number(options.roofOffset) || 0);
  const now = performance.now();
  const fireTime = now * .013;
  const flicker = .82 + Math.sin(fireTime * .7) * .1 + Math.sin(fireTime * 1.37) * .08;
  drawFireGlow(center,home.floor - 66 - roofOffset * .3,width * (.74 + progress * .12),112 + progress * 42,(.19 + progress * .09) * flicker);
  ctx.save();
  ctx.globalAlpha = (.1 + progress * .08) * flicker;
  ctx.fillStyle = "#ff5c31";
  ctx.beginPath();
  ctx.arc(center,home.floor - 70 - roofOffset * .3,width * (.56 + progress * .18),0,Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = (.14 + progress * .12) * flicker;
  const scorchPatches = [
    [
      [home.x + 6,home.floor - 7],
      [home.x + 10,home.floor - 38],
      [home.x + 18,home.floor - 69],
      [home.x + 26,home.floor - 82],
      [home.x + 31,home.floor - 55],
      [home.x + 27,home.floor - 26],
      [home.x + 36,home.floor - 7]
    ],
    [
      [home.x + width * .42,home.floor - 5],
      [home.x + width * .45,home.floor - 31],
      [home.x + width * .51,home.floor - 61],
      [home.x + width * .57,home.floor - 74],
      [home.x + width * .62,home.floor - 46],
      [home.x + width * .59,home.floor - 19],
      [home.x + width * .66,home.floor - 5]
    ],
    [
      [home.x + width - 31,home.floor - 6],
      [home.x + width - 27,home.floor - 31],
      [home.x + width - 19,home.floor - 65],
      [home.x + width - 12,home.floor - 78],
      [home.x + width - 5,home.floor - 48],
      [home.x + width - 3,home.floor - 7]
    ]
  ];
  for (let patch = 0; patch < scorchPatches.length; patch++) {
    ctx.fillStyle = patch === 1 ? "#21191d" : "#17171b";
    ctx.beginPath();
    scorchPatches[patch].forEach(([pointX,pointY],index) => {
      if (index === 0) ctx.moveTo(pointX,pointY);
      else ctx.lineTo(pointX,pointY);
    });
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = .18 + progress * .12;
  ctx.strokeStyle = "#2b1c1f";
  ctx.lineCap = "round";
  for (let scorch = 0; scorch < 4; scorch++) {
    const sx = home.x + 18 + scorch * (width - 36) / 3;
    const sy = home.floor - 16 - scorch % 2 * 12;
    ctx.lineWidth = 2.5 + scorch % 2;
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.quadraticCurveTo(sx - 5,sy - 18 - progress * 7,sx + (scorch % 2 ? 4 : -3),sy - 37 - progress * 10);
    ctx.stroke();
  }
  ctx.restore();

  for (const windowX of [home.x + 20,home.x + width - 39]) {
    ctx.save();
    ctx.globalAlpha = .72 + flicker * .2;
    px(windowX,home.floor - 65,22,23,"#6f201e");
    px(windowX + 2,home.floor - 63,18,19,"#a52d24");
    px(windowX + 4,home.floor - 62,14,17,"#ef5830");
    px(windowX + 7,home.floor - 59,8,13,"#ffb849");
    px(windowX + 9,home.floor - 57,4,8,"#fff0a0");
    px(windowX + 2,home.floor - 55,18,2,"#381d20");
    px(windowX + 10,home.floor - 65,2,23,"#21191d");
    ctx.restore();
  }

  const flameCount = Math.max(9,Math.round(width / 14));
  for (let index = 0; index < flameCount; index++) {
    const fx = home.x + 8 + index * (width - 16) / Math.max(1,flameCount - 1);
    const roofFlame = index % 3 === 0 || index === flameCount - 2;
    const baseY = roofFlame ? home.floor - 89 - roofOffset - index % 2 * 11 : home.floor - 3;
    const height = (roofFlame ? 31 : 39) + (index * 17 % 24) + progress * 24;
    drawDistantFlame(fx,baseY,height,fireTime * (1 + index % 3 * .06) + index * 1.37,.9);
    if (!roofFlame && index % 2 === 0) {
      drawDistantFlame(fx + 7,baseY - 2,height * .58,fireTime * 1.19 + index * 2.03,.72);
    }
  }

  if (progress > .35) {
    const collapse = clamp((progress - .35) / .65,0,1);
    const roofHoles = [
      [home.x + width * .19,home.floor - 103 - roofOffset,18,11,-3],
      [home.x + width * .48,home.floor - 116 - roofOffset,22,13,2],
      [home.x + width * .73,home.floor - 101 - roofOffset,19,10,-2]
    ];
    ctx.save();
    for (let hole = 0; hole < roofHoles.length; hole++) {
      const [holeX,holeY,holeWidth,holeHeight,slant] = roofHoles[hole];
      ctx.globalAlpha = .34 + collapse * .26;
      ctx.fillStyle = hole % 2 ? "#20171b" : "#17161a";
      ctx.beginPath();
      ctx.moveTo(holeX,holeY + holeHeight * .32);
      ctx.lineTo(holeX + holeWidth * .24,holeY);
      ctx.lineTo(holeX + holeWidth * .72,holeY + 2 + slant);
      ctx.lineTo(holeX + holeWidth,holeY + holeHeight * .58);
      ctx.lineTo(holeX + holeWidth * .63,holeY + holeHeight);
      ctx.lineTo(holeX + holeWidth * .18,holeY + holeHeight * .82);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = .22 + collapse * .18;
      ctx.fillStyle = "#a6412c";
      ctx.beginPath();
      ctx.moveTo(holeX + 3,holeY + holeHeight * .57);
      ctx.lineTo(holeX + holeWidth * .47,holeY + holeHeight * .34);
      ctx.lineTo(holeX + holeWidth - 3,holeY + holeHeight * .67);
      ctx.lineTo(holeX + holeWidth * .5,holeY + holeHeight * .76);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  for (let ember = 0; ember < 18; ember++) {
    const ex = home.x + ((ember * 31 + now * (.009 + ember % 3 * .002)) % width);
    const ey = home.floor - 25 - ((ember * 23 + now * (.018 + ember % 2 * .004)) % 145);
    const bright = ember % 4 === 0;
    ctx.save();
    ctx.globalAlpha = .55 + Math.sin(fireTime + ember * 2.1) * .25;
    px(ex,ey,bright ? 3 : 2,bright ? 5 : 3,bright ? "#ffd36b" : "#e24a2a");
    ctx.restore();
  }

  for (let smoke = 0; smoke < 7; smoke++) {
    const sx = center - 31 + smoke * 10 + Math.sin(fireTime * .14 + smoke) * (11 + progress * 8);
    const sy = home.floor - 138 - roofOffset - ((now * (.012 + smoke % 3 * .002) + smoke * 37) % 126);
    drawApocalypseSmoke(sx,sy,.62 + smoke % 3 * .16,.11 + progress * .065);
  }
}

function drawBurnedHouse(home) {
  const width = home.width || 120;
  if (!inView(home.x - 20, width + 40)) return;
  const now = performance.now();
  px(home.x - 13,home.floor - 7,width + 26,7,"#16171b");
  px(home.x - 7,home.floor - 13,width + 15,8,"#29262a");
  px(home.x,home.floor - 48,width,41,"#393235");
  px(home.x + 4,home.floor - 44,width - 9,7,"#211f23");
  for (let rubble = 0; rubble < 11; rubble++) {
    const rx = home.x - 7 + rubble * (width + 10) / 11;
    const rw = 7 + rubble % 4 * 3;
    const rh = 5 + rubble % 3 * 4;
    px(rx,home.floor - 7 - rh,rw,rh,rubble % 3 ? "#302c30" : "#4a3733");
    px(rx + 2,home.floor - 8 - rh,Math.max(2,rw - 4),2,rubble % 4 === 0 ? "#6a3a2e" : "#242328");
  }
  const collapsedTimbers = [
    [home.x + 2,home.floor - 16,home.x + width * .21,home.floor - 34,7],
    [home.x + width * .29,home.floor - 11,home.x + width * .48,home.floor - 29,8],
    [home.x + width * .57,home.floor - 15,home.x + width * .76,home.floor - 31,7],
    [home.x + width * .83,home.floor - 10,home.x + width - 3,home.floor - 24,6]
  ];
  ctx.save();
  ctx.lineCap = "round";
  for (let timber = 0; timber < collapsedTimbers.length; timber++) {
    const [startX,startY,endX,endY,lineWidth] = collapsedTimbers[timber];
    ctx.globalAlpha = .92;
    ctx.strokeStyle = timber % 2 ? "#292329" : "#1d1d21";
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.quadraticCurveTo((startX + endX) / 2,(startY + endY) / 2 - 2,endX,endY);
    ctx.stroke();
    ctx.globalAlpha = .4;
    ctx.strokeStyle = "#674037";
    ctx.lineWidth = Math.max(1,lineWidth - 5);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = "#17181c";
  ctx.beginPath();
  ctx.moveTo(home.x + width * .24,home.floor - 8);
  ctx.lineTo(home.x + width * .29,home.floor - 26);
  ctx.lineTo(home.x + width * .39,home.floor - 29);
  ctx.lineTo(home.x + width * .45,home.floor - 12);
  ctx.lineTo(home.x + width * .4,home.floor - 7);
  ctx.closePath();
  ctx.fill();
  px(home.x + width - 34,home.floor - 39,17,31,"#29272a");
  px(home.x + width - 31,home.floor - 35,11,7,"#4b3936");
  px(home.x + width - 37,home.floor - 42,22,6,"#1d1d21");
  for (let ember = 0; ember < 8; ember++) {
    const pulse = .3 + Math.sin(now * .006 + ember * 1.8) * .18;
    ctx.save();ctx.globalAlpha=pulse;
    px(home.x + 9 + ember * (width - 18) / 8,home.floor - 9 - ember % 3 * 3,7,3,ember % 2 ? "#8a3328" : "#d34d2c");
    ctx.restore();
  }
  for (let smoke = 0; smoke < 2; smoke++) {
    const sy = home.floor - 91 - ((now * .004 + smoke * 47) % 54);
    drawApocalypseSmoke(home.x + width * (.38 + smoke * .24),sy,.48,.055);
  }
}

function drawOwnedHouse(home) {
  const stage = home.ownerId ? currentNpcHouseStage(home.ownerId) : "intact";
  if (stage === "burned") {
    drawBurnedHouse(home);
    return;
  }
  drawHouse(home.x,home.floor,stage === "burning" ? blendHex(home.color,"#5a302e",.14) : home.color);
  if (stage === "burning") drawHouseFire(home,houseBurnProgress(worldStates.houseFires?.[home.ownerId]));
}

function drawTorch(x, y) {
  if (!inView(x, 10)) return;
  const darkness = 1 - daylightAt(clock.minute);
  const phase = performance.now() * .012 + x * .017;
  drawFireGlow(x,y - 11,27 + darkness * 15,31 + darkness * 18,.11 + darkness * .11);
  px(x - 3, y, 6, 25, "#3a2b2b");
  px(x - 5,y - 2,10,4,"#221c20");
  drawDistantFlame(x,y,19 + darkness * 7,phase,.72);
}

function drawGate(x, floor, label, theme = "") {
  if (!inView(x - 105, 210)) return;
  const moon = theme === "moon" || currentZoneId.startsWith("moonbriar");
  const sun = theme === "sun" || currentZoneId.startsWith("sunspire");
  const stone = moon ? "#4d5369" : sun ? "#9b664d" : "#55525f";
  const lightStone = moon ? "#71758e" : sun ? "#c18a5b" : "#77717a";
  const dark = moon ? "#23283c" : sun ? "#4b302f" : "#292936";
  px(x - 94,floor - 20,188,20,dark);
  for (const side of [-1,1]) {
    const towerX = x + side * 68 - 25;
    px(towerX,floor - 181,50,181,stone);
    px(towerX + 5,floor - 172,40,172,dark);
    px(towerX + 9,floor - 166,32,166,stone);
    px(towerX - 6,floor - 194,62,15,lightStone);
    for (let merlon=0;merlon<4;merlon++) px(towerX - 3 + merlon*16,floor - 207,10,14,lightStone);
    px(towerX + 18,floor - 145,14,24,"#1d1e29");
    px(towerX + 21,floor - 141,8,17,blendHex("#f0a157","#6e5550",daylightAt(clock.minute)));
    for (let row=0;row<6;row++) {
      const brickY = floor - 174 + row * 27;
      const brickOffset = row % 2 ? 8 : 0;
      px(towerX + 11 + brickOffset,brickY,20,1,"rgba(28,27,37,.34)");
      px(towerX + 30 + brickOffset,brickY,1,12,"rgba(28,27,37,.3)");
      px(towerX + 13 + brickOffset,brickY + 2,10,1,"rgba(255,255,255,.08)");
    }
  }
  px(x - 68,floor - 184,136,27,lightStone);
  px(x - 61,floor - 157,122,18,stone);
  ctx.fillStyle = dark;
  ctx.beginPath();ctx.arc(x,floor - 127,49,Math.PI,0);ctx.fill();
  px(x - 49,floor - 129,98,129,dark);
  px(x - 39,floor - 121,78,121,"#1a1c28");
  ctx.strokeStyle=lightStone;ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,floor-126,49,Math.PI,0);ctx.stroke();
  ctx.strokeStyle="rgba(255,255,255,.13)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,floor-128,44,Math.PI,0);ctx.stroke();
  for (let bar=-30;bar<=30;bar+=12) {
    px(x + bar - 1,floor - 121,2,121,"#6f5b50");
    px(x + bar,floor - 118,1,115,"#b18a65");
  }
  for (let row=0;row<4;row++) px(x - 39,floor - 99 + row*25,78,2,"#927258");
  px(x - 4,floor - 183,8,57,sun ? "#f2c05f" : moon ? "#b8b3ef" : "#d49b5d");
  px(x - 1,floor - 181,2,49,"rgba(255,255,255,.28)");
  drawTorch(x - 56,floor - 95);drawTorch(x + 56,floor - 95);
  px(x - 63,floor - 231,126,18,"#302c39");
  px(x - 59,floor - 228,118,12,moon ? "#55527c" : sun ? "#9c4f3f" : "#6d3e50");
  px(x - 55,floor - 226,110,1,"rgba(255,232,193,.22)");
  ctx.fillStyle = "#f2d19a";ctx.font = "bold 9px monospace";ctx.textAlign = "center";ctx.fillText(label,x,floor - 219);
}

function drawInteriorExit(x, floor) {
  if (!inView(x - 50, 100)) return;
  px(x - 35,floor - 124,70,124,"#211f2a");
  px(x - 29,floor - 117,58,117,"#5b3d35");
  for (let y=floor-108;y<floor-10;y+=19) px(x - 25,y,50,3,"#765044");
  px(x + 18,floor - 62,6,6,"#e6b76d");
  px(x - 44,floor - 134,88,13,"#81604c");
  px(x - 25,floor - 151,50,15,"#302c38");
  ctx.fillStyle="#f4cf8a";ctx.font="bold 8px monospace";ctx.textAlign="center";ctx.fillText("EXIT · F",x,floor - 140);
  px(x - 42,floor - 4,84,4,"#a77a55");
}

function drawCavePassGate(x,floor,label,edge = "left") {
  if (!inView(x - 112,224,80)) return;
  const daylight = daylightAt(clock.minute);
  const tunnelGlow = blendHex("#49334f","#171923",daylight);
  ctx.save();
  ctx.globalAlpha=.34;
  ctx.fillStyle="#11131b";
  ctx.beginPath();ctx.ellipse(x,floor - 3,105,10,0,0,Math.PI * 2);ctx.fill();
  ctx.globalAlpha=1;
  ctx.fillStyle="#2b2d38";
  ctx.beginPath();
  ctx.moveTo(x - 112,floor);
  ctx.lineTo(x - 101,floor - 96);
  ctx.lineTo(x - 75,floor - 154);
  ctx.lineTo(x - 37,floor - 185);
  ctx.lineTo(x + 12,floor - 177);
  ctx.lineTo(x + 64,floor - 155);
  ctx.lineTo(x + 98,floor - 97);
  ctx.lineTo(x + 112,floor);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle="#41404a";
  ctx.beginPath();
  ctx.moveTo(x - 91,floor);
  ctx.lineTo(x - 79,floor - 99);
  ctx.lineTo(x - 47,floor - 152);
  ctx.lineTo(x + 4,floor - 160);
  ctx.lineTo(x + 58,floor - 135);
  ctx.lineTo(x + 88,floor - 72);
  ctx.lineTo(x + 96,floor);
  ctx.closePath();
  ctx.fill();
  const facets = [
    [-91,-111,33,34],[-63,-157,36,26],[-19,-174,42,29],[35,-148,39,32],
    [70,-104,28,38],[-105,-55,37,31],[69,-51,37,32]
  ];
  for (let index=0;index<facets.length;index++) {
    const [dx,dy,w,h] = facets[index];
    ctx.fillStyle=index % 2 ? "rgba(125,118,130,.14)" : "rgba(9,12,20,.2)";
    ctx.beginPath();
    ctx.moveTo(x + dx,floor + dy);
    ctx.lineTo(x + dx + w,floor + dy + h * .25);
    ctx.lineTo(x + dx + w * .63,floor + dy + h);
    ctx.lineTo(x + dx + 3,floor + dy + h * .72);
    ctx.closePath();ctx.fill();
  }
  ctx.fillStyle="#11131d";
  ctx.beginPath();
  ctx.arc(x,floor - 72,62,Math.PI,0);
  ctx.lineTo(x + 62,floor);
  ctx.lineTo(x - 62,floor);
  ctx.closePath();ctx.fill();
  const tunnelGradient = ctx.createLinearGradient(
    edge === "left" ? x + 49 : x - 49,floor - 60,
    edge === "left" ? x - 52 : x + 52,floor - 60
  );
  tunnelGradient.addColorStop(0,"#262431");
  tunnelGradient.addColorStop(.46,tunnelGlow);
  tunnelGradient.addColorStop(1,"#0a0d16");
  ctx.fillStyle=tunnelGradient;
  ctx.beginPath();
  ctx.arc(x,floor - 70,53,Math.PI,0);
  ctx.lineTo(x + 53,floor);
  ctx.lineTo(x - 53,floor);
  ctx.closePath();ctx.fill();
  ctx.strokeStyle="#77717b";
  ctx.lineWidth=10;
  ctx.beginPath();ctx.arc(x,floor - 72,66,Math.PI,0);ctx.stroke();
  for (let stone=0;stone<9;stone++) {
    const angle=Math.PI + stone * Math.PI / 8;
    const sx=x + Math.cos(angle) * 66;
    const sy=floor - 72 + Math.sin(angle) * 66;
    px(sx - 8,sy - 6,16,12,stone % 2 ? "#66616b" : "#89828a");
    px(sx - 5,sy - 4,9,2,"rgba(255,244,226,.12)");
  }
  for (let ring=0;ring<3;ring++) {
    ctx.globalAlpha=.18 - ring * .04;
    ctx.strokeStyle=ring % 2 ? "#a080a9" : "#8c7b88";
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(
      x + (edge === "left" ? -ring * 8 : ring * 8),
      floor - 69,
      45 - ring * 6,
      Math.PI,0
    );
    ctx.stroke();
  }
  ctx.globalAlpha=1;
  for (let bar=-35;bar<=35;bar+=14) {
    px(x + bar - 2,floor - 119,4,35,"#5f5556");
    px(x + bar - 1,floor - 117,1,31,"#a38469");
  }
  px(x - 43,floor - 91,86,5,"#776354");
  px(x - 40,floor - 88,80,3,"#aa8a6c");
  ctx.save();
  ctx.translate(x - 53,floor - 49);
  ctx.rotate(-.16);
  px(-3,-43,7,43,"#50454a");
  for (let rung=0;rung<3;rung++) px(-1,-38 + rung*13,25,3,"#806b5c");
  ctx.restore();
  ctx.save();
  ctx.translate(x + 53,floor - 49);
  ctx.rotate(.16);
  px(-4,-43,7,43,"#50454a");
  for (let rung=0;rung<3;rung++) px(-24,-38 + rung*13,25,3,"#806b5c");
  ctx.restore();
  for (let chain=0;chain<2;chain++) {
    ctx.strokeStyle="#5e565b";
    ctx.lineWidth=2;
    ctx.beginPath();
    const anchor=x + (chain ? 55 : -55);
    ctx.moveTo(anchor,floor - 121);
    ctx.quadraticCurveTo(x + (chain ? 74 : -74),floor - 90,anchor + (chain ? 15 : -15),floor - 55);
    ctx.stroke();
  }
  for (let cobble=0;cobble<7;cobble++) {
    px(x - 67 + cobble*21,floor - 8 - cobble%2*3,17,5,cobble%2 ? "#5c5862" : "#77717a");
    px(x - 64 + cobble*21,floor - 7 - cobble%2*3,9,1,"rgba(255,255,255,.13)");
  }
  px(x - 78,floor - 159,156,18,"#22242e");
  px(x - 73,floor - 155,146,10,"#654757");
  px(x - 69,floor - 153,138,2,"rgba(255,224,196,.14)");
  ctx.fillStyle="#f0d0a0";
  ctx.font="bold 8px monospace";
  ctx.textAlign="center";
  ctx.fillText(label,x,floor - 147);
  drawTorch(x + (edge === "left" ? 83 : -83),floor - 105);
  ctx.restore();
}

function drawCastleHallGate(x,floor) {
  if (!inView(x - 105,210,70)) return;
  ctx.save();
  ctx.globalAlpha=.32;
  px(x - 101,floor - 5,202,7,"#11121a");
  ctx.globalAlpha=1;
  for (const side of [-1,1]) {
    const pierX=x + side * 70 - 24;
    px(pierX,floor - 205,48,205,"#3e3b47");
    px(pierX + 7,floor - 195,34,195,"#5a535f");
    px(pierX - 7,floor - 219,62,17,"#77707b");
    px(pierX - 4,floor - 216,56,4,"rgba(255,255,255,.09)");
    for (let row=0;row<6;row++) {
      px(pierX + 10,floor - 181 + row*29,27,2,"#403c48");
      px(pierX + 17,floor - 178 + row*29,15,1,"rgba(255,255,255,.07)");
    }
    px(pierX + 16,floor - 160,17,38,"#24252f");
    px(pierX + 20,floor - 154,9,26,"#9b5b58");
  }
  px(x - 70,floor - 211,140,24,"#77707a");
  px(x - 62,floor - 187,124,18,"#514b57");
  ctx.fillStyle="#171822";
  ctx.beginPath();ctx.arc(x,floor - 139,59,Math.PI,0);ctx.fill();
  px(x - 59,floor - 139,118,139,"#171822");
  ctx.strokeStyle="#8c8288";
  ctx.lineWidth=8;
  ctx.beginPath();ctx.arc(x,floor - 139,63,Math.PI,0);ctx.stroke();
  ctx.strokeStyle="rgba(255,239,220,.12)";
  ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(x,floor - 141,56,Math.PI,0);ctx.stroke();
  px(x - 51,floor - 136,50,136,"#3b2b38");
  px(x + 2,floor - 136,49,136,"#322934");
  for (let plank=0;plank<4;plank++) {
    px(x - 47 + plank*13,floor - 130,9,124,plank%2 ? "#543745" : "#4a3340");
    px(x + 6 + plank*12,floor - 130,8,124,plank%2 ? "#49333f" : "#3f303a");
  }
  px(x - 52,floor - 109,104,5,"#8b705d");
  px(x - 52,floor - 54,104,5,"#8b705d");
  for (let stud=0;stud<7;stud++) {
    px(x - 43 + stud*14,floor - 105,4,4,"#c19a6b");
    px(x - 43 + stud*14,floor - 50,4,4,"#c19a6b");
  }
  px(x - 3,floor - 136,6,136,"#1d1e27");
  px(x - 18,floor - 82,36,28,"#211f29");
  px(x - 13,floor - 77,26,18,"#b18450");
  px(x - 7,floor - 72,14,13,"#2b252d");
  for (let bar=-42;bar<=42;bar+=14) {
    px(x + bar - 2,floor - 174,4,36,"#6e5d54");
    px(x + bar - 1,floor - 172,1,31,"#b18c6b");
  }
  px(x - 72,floor - 246,144,23,"#292833");
  px(x - 67,floor - 241,134,13,"#713d50");
  px(x - 63,floor - 238,126,2,"rgba(255,224,196,.16)");
  ctx.fillStyle="#f3d49d";
  ctx.font="bold 9px monospace";
  ctx.textAlign="center";
  ctx.fillText("CINDERKEEP · GREAT GATE · F",x,floor - 231);
  for (const side of [-1,1]) {
    const bannerX=x + side * 92;
    px(bannerX - 3,floor - 219,6,106,"#282630");
    ctx.fillStyle="#6f3449";
    ctx.beginPath();
    ctx.moveTo(bannerX,floor - 211);
    ctx.lineTo(bannerX + side * 35,floor - 204);
    ctx.lineTo(bannerX + side * 31,floor - 147);
    ctx.lineTo(bannerX + side * 17,floor - 160);
    ctx.lineTo(bannerX + side * 4,floor - 147);
    ctx.closePath();ctx.fill();
    px(bannerX + side * 9 - (side < 0 ? 20 : 0),floor - 190,20,4,"#c39a62");
  }
  drawTorch(x - 77,floor - 100);
  drawTorch(x + 77,floor - 100);
  px(x - 78,floor - 7,156,7,"#a17d62");
  px(x - 70,floor - 9,140,3,"#d0a270");
  ctx.restore();
}

function drawElderHillCliffAndCave() {
  if (!inView(0,385,80)) return;
  const floor = 438;
  const caveX = zone.landmarks?.find((landmark) => landmark.kind === "sealedCave")?.x ?? 245;
  const passX = zone.exits?.find((exit) => exit.target === "castleApproach")?.visualX ?? 48;
  ctx.save();
  ctx.fillStyle = "#30313c";
  ctx.beginPath();
  ctx.moveTo(0,floor);
  ctx.lineTo(0,121);
  ctx.lineTo(52,139);
  ctx.lineTo(103,91);
  ctx.lineTo(154,126);
  ctx.lineTo(210,84);
  ctx.lineTo(263,137);
  ctx.lineTo(315,226);
  ctx.lineTo(350,floor);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#42414b";
  ctx.beginPath();
  ctx.moveTo(0,floor);
  ctx.lineTo(0,179);
  ctx.lineTo(73,153);
  ctx.lineTo(112,191);
  ctx.lineTo(172,135);
  ctx.lineTo(226,169);
  ctx.lineTo(288,249);
  ctx.lineTo(336,floor);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#242733";
  ctx.beginPath();
  ctx.moveTo(0,floor);
  ctx.lineTo(0,263);
  ctx.lineTo(57,225);
  ctx.lineTo(98,266);
  ctx.lineTo(143,203);
  ctx.lineTo(194,226);
  ctx.lineTo(252,300);
  ctx.lineTo(306,floor);
  ctx.closePath();
  ctx.fill();
  const facets = [
    [24,168,48,37],[82,124,31,53],[145,151,38,47],[215,115,30,63],
    [270,219,42,44],[36,282,55,31],[104,248,45,54],[225,246,37,55]
  ];
  for (let index = 0; index < facets.length; index++) {
    const [x,y,w,h] = facets[index];
    ctx.fillStyle = index % 2 ? "rgba(130,123,133,.13)" : "rgba(13,18,29,.2)";
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + w,y + h * .28);
    ctx.lineTo(x + w * .62,y + h);
    ctx.lineTo(x + w * .1,y + h * .74);
    ctx.closePath();
    ctx.fill();
    px(x + 4,y + 5,Math.max(8,w * .38),2,index % 2 ? "rgba(220,205,188,.09)" : "rgba(5,8,16,.18)");
  }
  ctx.globalAlpha = .24;
  ctx.fillStyle = "#0d111c";
  ctx.beginPath();
  ctx.arc(caveX,floor - 76,61,Math.PI,0);
  ctx.lineTo(caveX + 61,floor);
  ctx.lineTo(caveX - 61,floor);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#131620";
  ctx.beginPath();
  ctx.arc(caveX,floor - 70,49,Math.PI,0);
  ctx.lineTo(caveX + 49,floor);
  ctx.lineTo(caveX - 49,floor);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#77727b";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(caveX,floor - 70,54,Math.PI,0);
  ctx.stroke();
  for (let stone = 0; stone < 7; stone++) {
    const angle = Math.PI + stone * Math.PI / 6;
    const sx = caveX + Math.cos(angle) * 54;
    const sy = floor - 70 + Math.sin(angle) * 54;
    px(sx - 7,sy - 5,14,10,stone % 2 ? "#625f69" : "#85808a");
    px(sx - 5,sy - 4,8,2,"rgba(255,255,255,.13)");
  }
  px(caveX - 45,floor - 70,90,70,"#1c1d27");
  px(caveX - 39,floor - 67,78,67,"#40353a");
  for (let plank = -31; plank <= 31; plank += 15) {
    px(caveX + plank,floor - 65,10,63,plank % 2 ? "#4c3c3d" : "#594342");
    px(caveX + plank + 2,floor - 63,2,57,"rgba(216,176,132,.12)");
  }
  px(caveX - 41,floor - 55,82,6,"#242633");
  px(caveX - 41,floor - 24,82,6,"#242633");
  px(caveX - 4,floor - 67,8,67,"#252733");
  ctx.strokeStyle = "#77717a";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(caveX - 34,floor - 62);
  ctx.lineTo(caveX + 31,floor - 13);
  ctx.moveTo(caveX + 34,floor - 62);
  ctx.lineTo(caveX - 31,floor - 13);
  ctx.stroke();
  px(caveX - 9,floor - 39,18,20,"#242530");
  px(caveX - 5,floor - 35,10,12,"#a77b48");
  px(caveX - 2,floor - 31,4,8,"#201f26");
  ctx.save();
  ctx.globalAlpha = .18 + Math.sin(performance.now() * .003) * .05;
  ctx.strokeStyle = "#bd9adc";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(caveX,floor - 70,66,-2.6,-.55);
  ctx.stroke();
  drawEffectSpark(caveX,floor - 118,2,"#d8b3ea");
  ctx.restore();
  for (let vine = 0; vine < 4; vine++) {
    const vx = 44 + vine * 74;
    const length = 34 + vine % 2 * 21;
    px(vx,192 + vine * 13,3,length,"#3f5b48");
    px(vx - 5,207 + vine * 13,7,3,"#60785a");
    px(vx + 2,221 + vine * 9,8,3,"#536d53");
  }
  px(caveX - 51,floor - 146,102,17,"#22232d");
  px(caveX - 47,floor - 143,94,11,"#5b4650");
  ctx.fillStyle = "#e4c38f";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SEALED · KEY REQUIRED",caveX,floor - 135);
  for (let step = 0; step < 4; step++) {
    px(316 + step * 10,floor - step * 11 - 8,34 + step * 4,8,"#6e6665");
    px(319 + step * 10,floor - step * 11 - 7,27 + step * 4,2,"#948779");
  }
  px(82,floor - 121,45,13,"#4a4650");
  px(88,floor - 118,35,4,"rgba(255,255,255,.08)");
  drawCavePassGate(passX,floor,"CINDERKEEP PASS","left");
  ctx.restore();
}

function drawElderCemetery() {
  const floor = 405;
  if (!inView(350,370,40)) return;
  px(372,floor - 7,314,7,"rgba(30,28,36,.45)");
  for (let x = 378; x <= 682; x += 51) {
    px(x,floor - 43,4,43,"#3c3740");
    px(x - 4,floor - 47,12,5,"#5d5054");
    px(x + 5,floor - 35,43,3,"#50464a");
    px(x + 5,floor - 17,43,3,"#50464a");
  }
  ctx.save();
  ctx.globalAlpha = .14;
  for (let mist = 0; mist < 3; mist++) {
    const mx = 395 + ((performance.now() * (.009 + mist * .002) + mist * 103) % 260);
    px(mx,floor - 23 - mist * 8,78,9,"#c7c0c4");
  }
  if (cemeteryThought > 0) {
    const pulse = .1 + Math.sin(performance.now() * .004) * .035;
    ctx.globalAlpha = pulse;
    ctx.fillStyle="#8b63a8";
    ctx.beginPath();ctx.ellipse(535,floor - 14,174,34,0,0,Math.PI * 2);ctx.fill();
    for (let mote=0;mote<9;mote++) {
      const phase = performance.now() * .0015 + mote * .73;
      px(
        392 + mote * 34 + Math.sin(phase * 1.7) * 9,
        floor - 32 - (mote * 17 + performance.now() * .018) % 64,
        2,3,
        mote % 2 ? "#b79bc6" : "#765b91"
      );
    }
  }
  ctx.restore();
}

function drawCastlePassMountain(x, floor) {
  if (!inView(x - 365,650,120)) return;
  ctx.save();

  ctx.fillStyle = "#272a35";
  ctx.beginPath();
  ctx.moveTo(x - 365,floor);
  ctx.lineTo(x - 345,floor - 91);
  ctx.lineTo(x - 283,floor - 137);
  ctx.lineTo(x - 225,floor - 229);
  ctx.lineTo(x - 164,floor - 198);
  ctx.lineTo(x - 103,floor - 310);
  ctx.lineTo(x - 39,floor - 372);
  ctx.lineTo(x + 15,floor - 324);
  ctx.lineTo(x + 78,floor - 350);
  ctx.lineTo(x + 139,floor - 253);
  ctx.lineTo(x + 202,floor - 216);
  ctx.lineTo(x + 254,floor - 108);
  ctx.lineTo(x + 286,floor);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#363742";
  ctx.beginPath();
  ctx.moveTo(x - 327,floor);
  ctx.lineTo(x - 304,floor - 103);
  ctx.lineTo(x - 236,floor - 174);
  ctx.lineTo(x - 182,floor - 155);
  ctx.lineTo(x - 113,floor - 273);
  ctx.lineTo(x - 44,floor - 330);
  ctx.lineTo(x + 9,floor - 281);
  ctx.lineTo(x + 76,floor - 312);
  ctx.lineTo(x + 128,floor - 220);
  ctx.lineTo(x + 191,floor - 174);
  ctx.lineTo(x + 236,floor - 77);
  ctx.lineTo(x + 258,floor);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#464550";
  ctx.beginPath();
  ctx.moveTo(x - 286,floor);
  ctx.lineTo(x - 264,floor - 89);
  ctx.lineTo(x - 201,floor - 137);
  ctx.lineTo(x - 145,floor - 118);
  ctx.lineTo(x - 87,floor - 226);
  ctx.lineTo(x - 28,floor - 281);
  ctx.lineTo(x + 23,floor - 238);
  ctx.lineTo(x + 78,floor - 263);
  ctx.lineTo(x + 123,floor - 179);
  ctx.lineTo(x + 178,floor - 141);
  ctx.lineTo(x + 218,floor - 60);
  ctx.lineTo(x + 238,floor);
  ctx.closePath();
  ctx.fill();

  const mountainFacets = [
    [-300,-126,67,79],[-246,-207,61,91],[-177,-176,58,73],
    [-121,-286,72,104],[-48,-340,63,119],[22,-282,58,88],
    [76,-310,61,111],[130,-225,57,83],[180,-151,49,67],
    [-262,-70,75,51],[-158,-91,69,62],[90,-107,72,67]
  ];
  for (let index = 0; index < mountainFacets.length; index++) {
    const [dx,dy,w,h] = mountainFacets[index];
    ctx.fillStyle = index % 3 === 0
      ? "rgba(15,18,27,.25)"
      : index % 3 === 1
        ? "rgba(137,132,143,.14)"
        : "rgba(91,87,101,.19)";
    ctx.beginPath();
    ctx.moveTo(x + dx,floor + dy);
    ctx.lineTo(x + dx + w * .68,floor + dy + h * .12);
    ctx.lineTo(x + dx + w,floor + dy + h * .56);
    ctx.lineTo(x + dx + w * .46,floor + dy + h);
    ctx.lineTo(x + dx + 5,floor + dy + h * .69);
    ctx.closePath();
    ctx.fill();
    px(
      x + dx + 7,floor + dy + 7,
      Math.max(11,w * .38),2,
      index % 2 ? "rgba(231,217,202,.09)" : "rgba(13,15,23,.2)"
    );
  }

  ctx.strokeStyle = "rgba(18,20,29,.38)";
  ctx.lineWidth = 4;
  ctx.lineCap = "square";
  for (const crack of [
    [[x - 214,floor - 198],[x - 190,floor - 170],[x - 201,floor - 139],[x - 178,floor - 116]],
    [[x - 50,floor - 309],[x - 65,floor - 270],[x - 41,floor - 244],[x - 54,floor - 209]],
    [[x + 94,floor - 255],[x + 78,floor - 220],[x + 101,floor - 186],[x + 88,floor - 151]],
    [[x + 180,floor - 128],[x + 157,floor - 97],[x + 170,floor - 67]]
  ]) {
    ctx.beginPath();
    ctx.moveTo(crack[0][0],crack[0][1]);
    for (let point = 1; point < crack.length; point++) ctx.lineTo(crack[point][0],crack[point][1]);
    ctx.stroke();
  }

  for (const [ledgeX,ledgeY,ledgeW] of [
    [x - 279,floor - 102,76],[x - 190,floor - 153,71],
    [x - 94,floor - 225,83],[x + 9,floor - 243,72],
    [x + 93,floor - 179,68],[x + 151,floor - 103,66]
  ]) {
    px(ledgeX,ledgeY,ledgeW,6,"#292b36");
    px(ledgeX + 5,ledgeY + 1,ledgeW - 12,2,"rgba(218,207,194,.12)");
  }

  ctx.save();
  ctx.globalAlpha = .24;
  ctx.fillStyle = "#11141e";
  ctx.beginPath();
  ctx.ellipse(x,floor - 42,170,43,0,0,Math.PI * 2);
  ctx.fill();
  ctx.restore();

  for (const [rockX,rockY,rockW,rockH,color] of [
    [x - 253,floor - 40,76,40,"#3b3b46"],
    [x - 208,floor - 58,69,58,"#4a4852"],
    [x - 164,floor - 31,61,31,"#343640"],
    [x + 124,floor - 47,71,47,"#41414b"],
    [x + 170,floor - 66,68,66,"#4b4953"],
    [x + 215,floor - 31,48,31,"#33353f"]
  ]) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(rockX,rockY + rockH);
    ctx.lineTo(rockX + rockW * .12,rockY + rockH * .31);
    ctx.lineTo(rockX + rockW * .48,rockY);
    ctx.lineTo(rockX + rockW * .87,rockY + rockH * .24);
    ctx.lineTo(rockX + rockW,rockY + rockH);
    ctx.closePath();
    ctx.fill();
    px(rockX + rockW * .25,rockY + rockH * .24,rockW * .34,2,"rgba(235,220,204,.1)");
  }
  ctx.restore();
}

function drawCastleApproach() {
  const castleFloor = 158;
  const facadeFloor = 258;
  if (inView(-20,780,80)) {
    ctx.save();
    ctx.translate(0,castleFloor);
    ctx.scale(1,1.16);
    ctx.translate(0,-facadeFloor);
    ctx.save();
    ctx.globalAlpha=.36;
    px(-20,facadeFloor - 7,790,7,"#11131c");
    ctx.restore();
    px(316,-21,138,111,"#343340");
    px(327,-10,116,100,"#4c4752");
    px(306,-36,158,18,"#6f6873");
    for (let merlon=0;merlon<7;merlon++) px(310 + merlon*23,-58,15,24,merlon%2 ? "#625d68" : "#7c747d");
    ctx.fillStyle="#2c2d39";
    ctx.beginPath();ctx.moveTo(318,-58);ctx.lineTo(385,-116);ctx.lineTo(452,-58);ctx.fill();
    ctx.fillStyle="#54454f";
    ctx.beginPath();ctx.moveTo(335,-58);ctx.lineTo(385,-101);ctx.lineTo(435,-58);ctx.fill();
    px(378,-96,14,82,"#282a35");
    px(381,-91,8,64,blendHex("#cf7f53","#544755",daylightAt(clock.minute)));
    for (const spireX of [174,548]) {
      px(spireX,2,55,104,"#373642");
      px(spireX + 8,10,39,96,"#4a4651");
      ctx.fillStyle="#292b36";
      ctx.beginPath();ctx.moveTo(spireX - 5,4);ctx.lineTo(spireX + 27,-49);ctx.lineTo(spireX + 60,4);ctx.fill();
      px(spireX + 23,-69,8,24,"#68616c");
      px(spireX + 15,46,25,38,"#1b1d27");
    }
    px(-18,71,786,187,"#393744");
    px(-8,80,766,178,"#4b4651");
    for (let row=0;row<7;row++) {
      const brickY = 91 + row * 24;
      const offset = row % 2 ? 24 : 0;
      for (let brick=0;brick<15;brick++) {
        const brickX = -2 + offset + brick * 51;
        px(brickX,brickY,43,2,"rgba(24,24,33,.3)");
        px(brickX + 41,brickY + 1,2,18,"rgba(25,25,34,.28)");
        px(brickX + 3,brickY + 3,21,1,"rgba(255,240,225,.055)");
      }
    }
    for (const towerX of [20,610]) {
      px(towerX,38,130,220,"#3c3a47");
      px(towerX + 10,49,110,209,"#514b56");
      px(towerX - 10,27,150,17,"#716a73");
      for (let merlon=0;merlon<6;merlon++) {
        px(towerX - 6 + merlon * 26,8,17,22,merlon % 2 ? "#625d68" : "#79727b");
        px(towerX - 3 + merlon * 26,11,11,4,"rgba(255,255,255,.09)");
      }
      px(towerX + 46,93,38,62,"#1a1c27");
      ctx.fillStyle="#1a1c27";
      ctx.beginPath();ctx.arc(towerX + 65,94,19,Math.PI,0);ctx.fill();
      px(towerX + 54,105,22,43,blendHex("#d78a54","#4c4452",daylightAt(clock.minute)));
      px(towerX + 63,104,3,45,"#292b36");
      px(towerX + 52,123,26,3,"#292b36");
      for (let slit=0;slit<3;slit++) px(towerX + 23 + slit*41,188 + slit%2*19,8,29,"#242631");
    }
    px(173,55,425,203,"#45414d");
    px(184,68,403,190,"#57505a");
    px(164,43,443,20,"#77707a");
    for (let merlon=0;merlon<14;merlon++) {
      px(169 + merlon * 32,20,20,25,merlon % 3 ? "#6e6872" : "#827a82");
      px(172 + merlon * 32,23,13,4,"rgba(255,255,255,.09)");
    }
    for (const bannerX of [230,515]) {
      px(bannerX,72,5,104,"#272631");
      ctx.fillStyle="#71394d";
      ctx.beginPath();
      ctx.moveTo(bannerX + 5,78);
      ctx.lineTo(bannerX + 55,85);
      ctx.lineTo(bannerX + 48,150);
      ctx.lineTo(bannerX + 30,136);
      ctx.lineTo(bannerX + 10,151);
      ctx.closePath();
      ctx.fill();
      px(bannerX + 18,101,27,5,"#c49462");
      px(bannerX + 27,92,7,36,"#c49462");
    }
    ctx.fillStyle="#171923";
    ctx.beginPath();ctx.arc(385,168,66,Math.PI,0);ctx.fill();
    px(319,167,132,91,"#171923");
    ctx.strokeStyle="#8a8086";
    ctx.lineWidth=10;
    ctx.beginPath();ctx.arc(385,168,71,Math.PI,0);ctx.stroke();
    ctx.strokeStyle="rgba(238,215,195,.13)";
    ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(385,168,64,Math.PI,0);ctx.stroke();
    px(329,169,112,89,"#312936");
    for (let plank=0;plank<8;plank++) {
      px(333 + plank * 14,174,10,84,plank % 2 ? "#493944" : "#3e323d");
      px(335 + plank * 14,177,2,76,"rgba(255,229,198,.08)");
    }
    for (let bar=-48;bar<=48;bar+=16) px(385 + bar - 2,160,4,98,"#746052");
    for (let row=0;row<4;row++) px(329,181 + row*23,112,4,"#8d725b");
    px(373,192,24,27,"#201f29");
    px(378,197,14,17,"#b1814b");
    px(383,202,4,12,"#27232a");
    px(306,80,158,17,"#292a35");
    px(312,84,146,9,"#704758");
    ctx.fillStyle="#f1d3a2";
    ctx.font="bold 10px monospace";
    ctx.textAlign="center";
    ctx.fillText("CINDERKEEP · GREAT GATE",385,92);
    drawTorch(294,195);
    drawTorch(476,195);
    ctx.restore();
  }
  drawCastlePassMountain(2550,438);
  if (inView(680,1930,80)) {
    for (let post=0;post<10;post++) {
      const x = 800 + post * 190;
      const floor = floorAt(x);
      px(x - 5,floor - 61,10,61,"#4a4752");
      px(x - 11,floor - 68,22,9,"#77717a");
      px(x - 8,floor - 66,16,3,"rgba(255,255,255,.11)");
      if (post < 9) {
        const nextX = x + 190;
        const nextFloor = floorAt(nextX);
        ctx.strokeStyle="#5c5661";
        ctx.lineWidth=4;
        ctx.beginPath();ctx.moveTo(x,floor - 53);ctx.lineTo(nextX,nextFloor - 53);ctx.stroke();
      }
    }
    for (const x of [900,1280,1660,2040,2420]) drawTorch(x,floorAt(x)-30);
    for (const x of [1115,1865]) {
      const floor = floorAt(x);
      px(x - 24,floor - 11,48,11,"#4b4852");
      px(x - 18,floor - 25,36,15,"#67616b");
      px(x - 10,floor - 91,20,67,"#56535e");
      px(x - 17,floor - 101,34,13,"#817a82");
      px(x - 5,floor - 130,10,29,"#494752");
      px(x - 13,floor - 139,26,11,"#706b75");
    }
  }
  drawCavePassGate(2550,438,"DUSKVALE CAVE PASS","right");
}

function drawCastleHall() {
  px(122,434,1310,4,"#241d29");
  px(165,374,1210,64,"#562d3f");
  px(177,382,1198,56,"#74394b");
  px(185,390,1190,3,"rgba(230,177,127,.18)");
  for (const x of [92,510,805,1095,1370]) {
    px(x - 25,118,50,320,"#45414d");
    px(x - 18,126,36,312,"#5a535e");
    px(x - 35,105,70,17,"#77707a");
    px(x - 39,421,78,17,"#35333e");
    px(x - 31,413,62,10,"#6b626c");
    for (let seam=0;seam<8;seam++) px(x - 14,151 + seam*34,28,2,"rgba(28,27,37,.32)");
  }
  ctx.strokeStyle="#4c4754";
  ctx.lineWidth=12;
  for (const [left,right] of [[117,485],[535,780],[830,1070],[1120,1345]]) {
    ctx.beginPath();
    ctx.moveTo(left,132);
    ctx.quadraticCurveTo((left + right) / 2,28,right,132);
    ctx.stroke();
  }
  px(150,301,310,77,"#3e3946");
  px(171,274,268,104,"#504955");
  for (let step=0;step<3;step++) {
    px(145 + step*17,378 + step*10,300 - step*34,10,"#77707a");
    px(150 + step*17,379 + step*10,290 - step*34,3,"rgba(255,255,255,.11)");
  }
  px(259,183,74,134,"#292732");
  px(267,190,58,127,"#65384c");
  px(273,201,46,109,"#7d4255");
  px(251,177,90,19,"#8a6c65");
  for (let spike=0;spike<5;spike++) px(255 + spike*20,155 + Math.abs(2-spike)*6,12,25,"#625a65");
  px(277,226,38,8,"#c18c61");
  px(292,207,8,62,"#c18c61");
  px(244,310,104,11,"#302c37");
  px(229,320,134,13,"#6f6670");
  for (const x of [190,430,650,940,1210]) drawTorch(x,405);
  drawCastleHallGate(1390,438);
}

function drawBurningElderHouseInterior() {
  if (!elderHouseBurning()) return;
  const intensity = elderFireVisualIntensity();
  const now = performance.now();
  const fireTime = now * .014;
  ctx.save();

  ctx.globalAlpha = .15 + intensity * .13;
  drawFireGlow(500,268,430,250,.2 + intensity * .11);
  ctx.globalAlpha = 1;

  for (let beam = 0; beam < 8; beam++) {
    const beamX = 25 + beam * 132;
    const charHeight = 45 + ((beam * 29) % 78) + intensity * 38;
    px(beamX,405 - charHeight,18,charHeight,"rgba(27,23,28,.72)");
    px(beamX + 4,409 - charHeight,5,charHeight - 9,"rgba(83,43,36,.58)");
    px(beamX + 13,416 - charHeight,3,charHeight - 18,"rgba(205,65,36,.2)");
  }

  const flameSites = [
    { x:84,base:405,size:44,delay:0 },
    { x:208,base:398,size:38,delay:.15 },
    { x:355,base:405,size:50,delay:.05 },
    { x:486,base:394,size:40,delay:.38 },
    { x:621,base:405,size:53,delay:.2 },
    { x:755,base:401,size:45,delay:.48 },
    { x:875,base:405,size:58,delay:.28 }
  ];
  const activeFlames = Math.min(
    flameSites.length,
    3 + Math.floor(intensity * 4)
  );
  for (let index = 0; index < activeFlames; index++) {
    const site = flameSites[index];
    const flameSize = site.size * (.7 + intensity * .58);
    drawFireGlow(site.x,site.base - flameSize * .45,flameSize * 1.15,flameSize * 1.55,.12 + intensity * .1);
    drawDistantFlame(site.x,site.base,flameSize,fireTime + index * 1.37,.8 + intensity * .16);
  }

  ctx.strokeStyle = `rgba(39,27,31,${.32 + intensity * .28})`;
  ctx.lineWidth = 7;
  for (const [x1,y1,x2,y2] of [
    [6,171,218,135],[190,126,410,164],[397,153,628,117],
    [612,124,817,162],[795,149,955,112]
  ]) {
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }
  ctx.strokeStyle = `rgba(205,67,39,${.08 + intensity * .11})`;
  ctx.lineWidth = 2;
  for (const [x1,y1,x2,y2] of [[31,174,222,142],[416,155,625,124],[811,151,952,119]]) {
    ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  }

  for (let ember = 0; ember < 30; ember++) {
    const x = (ember * 83 + now * (.018 + ember % 4 * .003)) % 940 + 10;
    const y = 386 - ((now * (.026 + ember % 5 * .004) + ember * 47) % 278);
    const bright = ember % 5 === 0;
    ctx.globalAlpha = (.28 + intensity * .4) * (bright ? 1 : .66);
    px(x,y,bright ? 3 : 2,bright ? 5 : 3,bright ? "#ffc061" : ember % 2 ? "#e45130" : "#8e4035");
  }

  ctx.globalAlpha = .12 + intensity * .1;
  px(0,70,960,58,"#171821");
  for (let smoke = 0; smoke < 4; smoke++) {
    const smokeX = 130 + smoke * 245 + Math.sin(now * .0015 + smoke * 1.4) * 44;
    drawApocalypseSmoke(smokeX,122 + smoke % 2 * 19,.68 + intensity * .36,.065);
  }
  ctx.restore();
}

function drawZoneDecor() {
  if (currentZoneId === "village") {
    homesForZone(currentZoneId).forEach(drawOwnedHouse);
    [220,510,920,1200,1510,1810,2070].forEach((x) => drawTorch(x,408));
    const sunsetGate = zone.exits.find((exit) => exit.target === "elderHill");
    drawGate(sunsetGate?.visualX ?? 48,438,"SUNSET HILL"); drawGate(2225,438,"AMBERWILD");
  } else if (currentZoneId === "elderHill") {
    drawElderHillCliffAndCave();
    drawElderCemetery();
    [365,685,735,1120,1380].forEach((x) => drawTorch(x,floorAt(x)-30));
    drawGate(1450,410,"DUSKVALE");
  } else if (currentZoneId === "castleApproach") {
    drawCastleApproach();
  } else if (currentZoneId === "castleHall") {
    drawCastleHall();
  } else if (currentZoneId === "elderHouse") {
    drawInteriorExit(105,438);
    px(120,285,220,153,"#604238"); px(138,302,184,118,"#3a2c35");
    px(150,326,64,94,"#49333b"); px(232,326,72,94,"#49333b");
    drawTorch(355,406);
    drawBurningElderHouseInterior();
  } else if (currentZoneId === "outskirts1") {
    homesForZone(currentZoneId).forEach(drawOwnedHouse);
    [190,690,890,1280,2050,2220,2580,2810].forEach((x) => drawTorch(x,408));
    drawGate(60,438,"DUSKVALE"); drawGate(2980,438,"ROYAL ROAD");
    drawGate(1580,438,"MOONBRIAR","moon");
  } else if (currentZoneId === "outskirts2") {
    [150,720,1260,1950,2510,3100].forEach((x) => drawTorch(x,408));
    drawGate(58,438,"AMBERWILD"); drawGate(3350,438,"ASHEN BRIDGE");
    for (const x of [860,1520,2320,2860]) { px(x,326,70,112,"#514b56"); px(x-8,316,86,12,"#71646a"); }
  } else if (currentZoneId === "moonbriarForest") {
    [310,760,1210,1690,2190,2660,3020].forEach((x) => drawTorch(x,floorAt(x)-30));
    drawGate(55,438,"AMBERWILD"); drawGate(3130,438,"MOONBRIAR");
    for (const x of [470,1050,1580,2420,2860]) {
      px(x - 9,floorAt(x)-135,18,135,"#24373a");
      px(x - 42,floorAt(x)-156,84,34,"#315153");
      px(x - 29,floorAt(x)-178,58,27,"#3e6260");
    }
  } else if (currentZoneId === "moonbriarVillage") {
    homesForZone(currentZoneId).forEach(drawOwnedHouse);
    [350,650,1050,1400,1730,2040].forEach((x) => drawTorch(x,408));
    drawGate(55,438,"MOON FOREST"); drawGate(2140,438,"SUNSPIRE");
    px(940,286,32,152,"#586174");px(917,275,78,18,"#747b92");px(930,235,52,42,"#8a83a0");
    px(949,247,14,14,blendHex("#e8e1ff","#b9b0cc",daylightAt(clock.minute)));
  } else if (currentZoneId === "sunspirePass") {
    [250,720,1110,1580,2070,2540,2860].forEach((x) => drawTorch(x,floorAt(x)-30));
    drawGate(55,438,"MOONBRIAR"); drawGate(2935,438,"SUNSPIRE");
    for (const x of [850,1450,2200,2700]) {
      px(x-18,floorAt(x)-122,36,122,"#8f5d43");px(x-29,floorAt(x)-136,58,16,"#c18b58");
      px(x-8,floorAt(x)-176,16,41,"#e4b765");
    }
  } else if (currentZoneId === "sunspireTown") {
    homesForZone(currentZoneId).forEach(drawOwnedHouse);
    [340,610,920,1160,1450,1760,2100].forEach((x) => drawTorch(x,408));
    drawGate(55,438,"SUNSPIRE PASS");
    for (const x of [1010,1090]) {
      px(x,245,34,193,"#9a654a");px(x-12,230,58,18,"#d09a5e");px(x+8,190,18,40,"#f1c56f");
    }
  } else if (currentZoneId === "bossArena") {
    [120,430,750,1050,1370,1650].forEach((x) => drawTorch(x,408));
    drawGate(55,438,"ROYAL ROAD"); drawGate(1730,438,bosses.warden ? "CATACOMBS" : "SEALED");
    for (let x = 250; x < 1650; x += 240) { px(x,360,20,78,"#55414a"); px(x-12,350,44,12,"#806057"); }
  } else {
    [120,560,780,1160,1320,1600,1880,2050,2440,2670,3000].forEach((x) => drawTorch(x,408));
    drawGate(55,438,"ASHEN BRIDGE");
  }
}

function drawWorldProps() {
  for (const prop of zone.props || []) {
    if (!inView(prop.x, 55)) continue;
    const floor = floorAt(prop.x);
    if (prop.type === "crate") {
      px(prop.x - 15,floor - 27,30,27,"#5b3c31"); px(prop.x - 12,floor - 24,24,21,"#96613f");
      px(prop.x - 10,floor - 21,20,3,"#c18450"); px(prop.x - 2,floor - 24,4,21,"#6c4435");
    } else if (prop.type === "barrel") {
      px(prop.x - 12,floor - 31,24,29,"#714532"); px(prop.x - 9,floor - 34,18,34,"#9b603a");
      px(prop.x - 12,floor - 28,24,4,"#41414b"); px(prop.x - 12,floor - 9,24,4,"#41414b");
    } else if (prop.type === "well") {
      px(prop.x - 34,floor - 31,68,31,"#5f5960"); px(prop.x - 29,floor - 26,58,8,"#8a7f78");
      px(prop.x - 23,floor - 17,46,17,"#333541"); px(prop.x - 27,floor - 76,5,48,"#6a4937"); px(prop.x + 22,floor - 76,5,48,"#6a4937");
      px(prop.x - 30,floor - 78,60,6,"#8f5f3d");
    } else if (prop.type === "flag") {
      px(prop.x - 2,floor - 92,4,92,"#3b3541");
      const wave = Math.round(Math.sin(performance.now() * .004 + prop.x) * 3);
      px(prop.x + 2,floor - 88,35 + wave,24,"#773d4f"); px(prop.x + 6,floor - 83,17,4,"#d6a65a");
    } else if (prop.type === "woundedKnightTree") {
      ctx.save();
      ctx.globalAlpha = .28;
      ctx.fillStyle = "#15151d";
      ctx.beginPath();ctx.ellipse(prop.x + 7,floor - 2,82,10,0,0,Math.PI * 2);ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#30272a";
      ctx.beginPath();
      ctx.moveTo(prop.x - 27,floor);
      ctx.lineTo(prop.x - 19,floor - 76);
      ctx.lineTo(prop.x - 13,floor - 151);
      ctx.lineTo(prop.x + 5,floor - 207);
      ctx.lineTo(prop.x + 25,floor - 203);
      ctx.lineTo(prop.x + 20,floor - 142);
      ctx.lineTo(prop.x + 31,floor - 77);
      ctx.lineTo(prop.x + 38,floor);
      ctx.closePath();ctx.fill();
      ctx.fillStyle = "#4b3934";
      ctx.beginPath();
      ctx.moveTo(prop.x - 17,floor);
      ctx.lineTo(prop.x - 9,floor - 80);
      ctx.lineTo(prop.x - 2,floor - 151);
      ctx.lineTo(prop.x + 10,floor - 193);
      ctx.lineTo(prop.x + 20,floor - 188);
      ctx.lineTo(prop.x + 13,floor - 130);
      ctx.lineTo(prop.x + 24,floor - 65);
      ctx.lineTo(prop.x + 27,floor);
      ctx.closePath();ctx.fill();
      px(prop.x - 8,floor - 177,8,67,"#695048");
      px(prop.x + 9,floor - 121,7,73,"#322a2d");
      px(prop.x - 12,floor - 91,7,39,"#76564a");
      px(prop.x + 14,floor - 176,6,31,"#2b2529");
      px(prop.x - 42,floor - 6,59,7,"#44332f");
      px(prop.x + 21,floor - 7,49,7,"#392e2e");
      ctx.fillStyle = "#33292c";
      ctx.beginPath();ctx.moveTo(prop.x + 7,floor - 168);ctx.lineTo(prop.x - 62,floor - 194);ctx.lineTo(prop.x - 68,floor - 186);ctx.lineTo(prop.x - 3,floor - 150);ctx.fill();
      ctx.beginPath();ctx.moveTo(prop.x + 18,floor - 141);ctx.lineTo(prop.x + 76,floor - 169);ctx.lineTo(prop.x + 80,floor - 160);ctx.lineTo(prop.x + 21,floor - 123);ctx.fill();
      ctx.beginPath();ctx.moveTo(prop.x + 13,floor - 197);ctx.lineTo(prop.x + 43,floor - 231);ctx.lineTo(prop.x + 49,floor - 226);ctx.lineTo(prop.x + 25,floor - 188);ctx.fill();
      px(prop.x - 64,floor - 194,30,5,"#513d37");
      px(prop.x + 49,floor - 169,29,5,"#4d3935");
      px(prop.x + 39,floor - 231,11,6,"#64483d");
      for (const [dx,dy,color] of [[-59,-198,"#4c4a3f"],[-45,-205,"#575442"],[72,-174,"#45493d"],[57,-181,"#525442"],[35,-235,"#4c463b"]]) {
        px(prop.x + dx,floor + dy,17,7,color);
        px(prop.x + dx + 5,floor + dy - 6,12,7,blendHex(color,"#72805d",.18));
      }
      px(prop.x - 3,floor - 108,5,3,"#93735a");
      px(prop.x - 6,floor - 48,7,3,"#8a674f");
      px(prop.x + 4,floor - 14,5,3,"#9a7053");
      ctx.restore();
    } else if (prop.type === "puddle") {
      ctx.save(); ctx.globalAlpha = .48; px(prop.x - 34,floor - 3,68,4,blendHex("#7188a8","#91aebb",daylightAt(clock.minute))); px(prop.x - 18,floor - 5,28,2,"#d6d4c0"); ctx.restore();
    } else if (prop.type === "grass") {
      for (let i = -2; i <= 2; i++) { px(prop.x + i * 6,floor - 9 - Math.abs(i) * 2,2,9 + Math.abs(i) * 2,"#667653"); }
    } else if (prop.type === "grave") {
      const variant = prop.variant || 0;
      ctx.save();
      ctx.fillStyle = "#46434b";
      ctx.beginPath();ctx.ellipse(prop.x,floor - 3,31,8,0,0,Math.PI * 2);ctx.fill();
      ctx.fillStyle = "#626067";
      ctx.beginPath();
      ctx.moveTo(prop.x - 16,floor - 7);
      ctx.lineTo(prop.x - 14,floor - 46);
      ctx.quadraticCurveTo(prop.x,floor - 63,prop.x + 14,floor - 46);
      ctx.lineTo(prop.x + 16,floor - 7);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#393943";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(239,226,210,.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(prop.x - 10,floor - 43);
      ctx.quadraticCurveTo(prop.x,floor - 54,prop.x + 9,floor - 43);
      ctx.stroke();
      ctx.strokeStyle = "#353640";
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (variant === 0) {
        ctx.moveTo(prop.x,floor - 42);ctx.lineTo(prop.x,floor - 18);
        ctx.moveTo(prop.x - 8,floor - 34);ctx.lineTo(prop.x + 8,floor - 34);
      } else {
        ctx.moveTo(prop.x - 7,floor - 37);ctx.lineTo(prop.x + 7,floor - 20);
        ctx.moveTo(prop.x + 7,floor - 37);ctx.lineTo(prop.x - 7,floor - 20);
      }
      ctx.stroke();
      px(prop.x - 21,floor - 9,42,7,"#4c4951");
      px(prop.x - 17,floor - 11,34,4,"#77727a");
      for (let grass = -1; grass <= 1; grass++) {
        px(prop.x + 23 + grass * 5,floor - 8 - Math.abs(grass) * 3,2,9 + Math.abs(grass) * 3,"#687b58");
      }
      if (variant === 1) {
        px(prop.x - 29,floor - 10,4,7,"#795b77");
        px(prop.x - 31,floor - 13,8,5,"#c39abb");
      }
      ctx.restore();
    } else if (prop.type === "windmill") {
      px(prop.x - 35,floor - 135,70,135,"#785647"); px(prop.x - 28,floor - 126,56,118,"#a07154");
      px(prop.x - 7,floor - 190,14,110,"#51404a"); px(prop.x - 55,floor - 142,110,14,"#51404a");
      px(prop.x - 29,floor - 174,15,56,"#826653"); px(prop.x + 14,floor - 151,15,56,"#826653");
    } else if (prop.type === "elderHouse") {
      const stage = currentHouseStage();
      const elderHome = elderManorGeometry(prop,floor);
      drawElderManor(elderHome,stage,houseBurnProgress(worldStates.elderHouse));
    } else if (prop.type === "bookshelf") {
      px(prop.x - 42,floor - 145,84,145,"#53392f"); px(prop.x - 36,floor - 138,72,132,"#2e2831");
      for (let row=0;row<4;row++) { px(prop.x - 34,floor - 129 + row*31,68,5,"#77503a"); for(let book=0;book<7;book++) px(prop.x - 31 + book*9,floor - 124 + row*31,6,23,["#7f4b4f","#53657b","#7c6845"][book%3]); }
    } else if (prop.type === "maptable") {
      px(prop.x - 55,floor - 55,110,12,"#8c6445"); px(prop.x - 47,floor - 43,8,43,"#543a31"); px(prop.x + 39,floor - 43,8,43,"#543a31");
      px(prop.x - 38,floor - 59,76,7,"#d0b77f");
    } else if (prop.type === "hearth") {
      px(prop.x - 48,floor - 100,96,100,"#5e5154"); px(prop.x - 31,floor - 61,62,61,"#25242c");
      px(prop.x - 22,floor - 26,44,22,"#b94432"); px(prop.x - 10,floor - 48,20,38,"#f09b42");
    } else if (prop.type === "moonTree") {
      px(prop.x - 11,floor - 146,22,146,"#29373d");px(prop.x - 44,floor - 168,88,31,"#334c51");
      px(prop.x - 31,floor - 194,63,32,"#456267");px(prop.x - 4,floor - 129,8,31,"#9eb4b6");
    } else if (prop.type === "moonLantern") {
      px(prop.x - 2,floor - 95,4,95,"#3a3b4c");px(prop.x - 10,floor - 105,20,16,"#777495");
      ctx.save();ctx.globalAlpha=.22;ctx.fillStyle="#c9c5ff";ctx.beginPath();ctx.arc(prop.x,floor-98,29,0,Math.PI*2);ctx.fill();ctx.restore();
      px(prop.x - 5,floor - 101,10,9,"#e7e2ff");
    } else if (prop.type === "moonObelisk") {
      px(prop.x - 20,floor - 104,40,102,"#4b4b63");px(prop.x - 13,floor - 128,26,28,"#666886");
      px(prop.x - 3,floor - 91,6,61,"#aaa5e1");px(prop.x - 9,floor - 7,18,5,"#827eaa");
    } else if (prop.type === "moonWell") {
      px(prop.x - 38,floor - 34,76,34,"#515567");px(prop.x - 30,floor - 26,60,12,"#292f44");
      px(prop.x - 4,floor - 75,8,43,"#7f7b91");px(prop.x - 32,floor - 82,64,8,"#77748d");
      px(prop.x - 10,floor - 18,20,5,"#a9b5db");
    } else if (prop.type === "sunTent") {
      ctx.fillStyle="#a85542";ctx.beginPath();ctx.moveTo(prop.x-55,floor);ctx.lineTo(prop.x,floor-82);ctx.lineTo(prop.x+62,floor);ctx.fill();
      px(prop.x - 50,floor - 8,105,8,"#633e37");px(prop.x - 4,floor - 70,8,70,"#efc66f");
    } else if (prop.type === "sunPillar") {
      px(prop.x - 17,floor - 126,34,126,"#a46c4c");px(prop.x - 26,floor - 139,52,16,"#d29a5f");
      px(prop.x - 7,floor - 174,14,36,"#f1c571");px(prop.x - 29,floor - 9,58,9,"#7e5142");
    } else if (prop.type === "palm") {
      px(prop.x - 6,floor - 128,12,128,"#72503d");
      for (const dir of [-1,1]) {
        ctx.fillStyle="#4d6a4c";ctx.beginPath();ctx.moveTo(prop.x,floor-128);ctx.lineTo(prop.x+dir*68,floor-153);ctx.lineTo(prop.x+dir*18,floor-119);ctx.fill();
        ctx.beginPath();ctx.moveTo(prop.x,floor-128);ctx.lineTo(prop.x+dir*55,floor-99);ctx.lineTo(prop.x+dir*14,floor-111);ctx.fill();
      }
    } else if (prop.type === "sunFountain") {
      px(prop.x - 52,floor - 22,104,22,"#9d7359");px(prop.x - 38,floor - 31,76,15,"#d3a26a");
      px(prop.x - 12,floor - 83,24,58,"#ad7c56");px(prop.x - 24,floor - 91,48,12,"#e0b773");
      ctx.save();ctx.globalAlpha=.65;px(prop.x - 3,floor - 118,6,35,"#8dd5dc");px(prop.x - 21,floor - 37,42,6,"#76bac8");ctx.restore();
    }
  }
}

function drawSecretsAndEvent() {
  for (const secret of zoneSecrets) {
    if (!secret.found || !inView(secret.x, 50)) continue;
    const floor = floorAt(secret.x);
    if (secret.claimed) {
      px(secret.x - 14,floor - 10,28,8,"#55485b"); px(secret.x - 9,floor - 14,18,5,"#806a82");
    } else {
      ctx.save(); ctx.globalAlpha = .22 + Math.sin(performance.now() * .006) * .08; ctx.fillStyle = "#dba5ff"; ctx.beginPath(); ctx.arc(secret.x,floor - 22,29,0,Math.PI * 2); ctx.fill(); ctx.restore();
      px(secret.x - 14,floor - 20,28,18,"#573d61"); px(secret.x - 11,floor - 17,22,12,"#b184bd"); px(secret.x - 3,floor - 15,6,6,"#ffe39b");
    }
  }
  if (worldEvent?.active && inView(worldEvent.x, 90)) {
    const floor = floorAt(worldEvent.x);
    if (worldEvent.interaction) {
      px(worldEvent.x - 13,floor - 45,26,42,"#596580"); px(worldEvent.x - 9,floor - 59,18,16,"#cf9f7c");
      px(worldEvent.x - 18,floor - 6,38,4,"#342e38");
    }
    ctx.textAlign = "center"; ctx.font = "bold 15px monospace"; ctx.fillStyle = "#ffe27a"; ctx.fillText(worldEvent.icon,worldEvent.x,floor - 75);
    ctx.font = "bold 9px monospace"; ctx.fillStyle = "#f3cf91"; ctx.fillText(worldEvent.name,worldEvent.x,floor - 62);
  }
}

function drawEmbeddedArrow(x,y,angle,length = 34) {
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y));
  ctx.rotate(angle);
  px(-length + 3,-1,length,2,"#71533e");
  px(-length + 1,-2,7,2,"#b24d52");
  px(-length + 1,1,7,2,"#81404a");
  px(-2,-2,5,4,"#aeb0ab");
  px(1,-1,5,2,"#d8d4c8");
  ctx.restore();
}

function drawWoundedKnightFace(x,y,face = 1,eyesClosed = false) {
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y));
  ctx.scale(face,1);
  px(-8,-8,16,15,"#b77e68");
  px(-6,-7,13,12,"#d4a080");
  px(-4,-6,9,3,"#edbd95");
  px(-9,-11,18,5,"#34313a");
  px(-8,-14,15,5,"#545868");
  px(5,-11,5,9,"#2a2932");
  if (eyesClosed) {
    px(1,-1,4,1,"#51363a");
  } else {
    px(2,-2,3,2,"#27384a");
    px(3,-2,1,1,"#d9e0d8");
  }
  px(4,4,4,1,"#774c49");
  px(-7,7,12,3,"#6f4146");
  ctx.restore();
}

function drawWoundedKnightSeated(knight,executing = false) {
  const treeX = Math.round(lerp(knight.prevX ?? knight.x,knight.x,renderAlpha));
  const floor = Math.round(lerp(knight.prevY ?? knight.y ?? floorAt(treeX),knight.y ?? floorAt(treeX),renderAlpha));
  const seatX = treeX - 29;
  const breath = executing ? 0 : Math.sin(performance.now() * .0032) * .8;
  ctx.save();
  ctx.globalAlpha=.38;
  ctx.fillStyle="#101219";
  ctx.beginPath();ctx.ellipse(seatX - 2,floor - 3,55,7,0,0,Math.PI * 2);ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.globalAlpha=.68;
  ctx.fillStyle="#691d2a";
  ctx.beginPath();ctx.ellipse(seatX + 7,floor - 5,37,5,0,0,Math.PI * 2);ctx.fill();
  px(seatX - 8,floor - 8,32,4,"#94283a");
  ctx.restore();

  ctx.save();
  ctx.translate(seatX - 35,floor - 8);
  ctx.rotate(-.13);
  ctx.fillStyle="#333b4b";
  ctx.beginPath();ctx.ellipse(0,0,19,9,0,0,Math.PI * 2);ctx.fill();
  ctx.strokeStyle="#8b929e";ctx.lineWidth=3;ctx.stroke();
  px(-10,-5,19,3,"#5b6677");
  px(-2,-8,4,15,"#ad8750");
  ctx.restore();

  ctx.save();
  ctx.fillStyle="#242b37";
  ctx.beginPath();
  ctx.moveTo(seatX - 8,floor - 19);
  ctx.lineTo(seatX - 24,floor - 18);
  ctx.lineTo(seatX - 39,floor - 11);
  ctx.lineTo(seatX - 34,floor - 4);
  ctx.lineTo(seatX - 8,floor - 7);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#596678";ctx.lineWidth=3;ctx.stroke();
  px(seatX - 29,floor - 13,20,4,"#788494");
  px(seatX - 35,floor - 8,24,4,"#151a23");

  ctx.fillStyle="#202631";
  ctx.beginPath();
  ctx.moveTo(seatX + 1,floor - 18);
  ctx.lineTo(seatX + 18,floor - 14);
  ctx.lineTo(seatX + 39,floor - 8);
  ctx.lineTo(seatX + 38,floor - 2);
  ctx.lineTo(seatX + 8,floor - 5);
  ctx.lineTo(seatX - 5,floor - 10);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle="#536173";ctx.lineWidth=3;ctx.stroke();
  px(seatX + 14,floor - 10,24,4,"#697688");
  px(seatX + 35,floor - 7,14,6,"#141923");
  px(seatX + 39,floor - 9,10,4,"#737c8a");
  ctx.restore();

  ctx.save();
  ctx.translate(seatX + 4,floor - 18);
  ctx.rotate(.18);
  ctx.translate(0,breath);
  px(-15,-43,30,41,"#242b38");
  px(-13,-41,26,37,knight.hurtTimer > 0 ? "#ddd7cc" : "#5d697a");
  px(-10,-38,20,31,"#394758");
  px(-8,-35,16,5,"#8793a2");
  px(-9,-24,18,4,"#252d39");
  px(-13,-9,27,6,"#8a6b48");
  px(-17,-39,8,27,"#303948");
  px(10,-36,8,26,"#202733");
  px(-19,-40,10,9,"#778395");
  px(10,-38,9,9,"#7d8998");
  px(-8,-17,6,16,"#6e3742");
  px(-5,-17,3,13,"#b85a55");
  drawWoundedKnightFace(3,-52,1,executing);
  px(-8,-65,22,4,"#262833");
  px(-6,-69,18,5,"#585d6b");
  px(8,-65,6,12,"#30323e");
  px(13,-43,3,24,"rgba(15,16,23,.5)");
  ctx.restore();

  px(treeX - 15,floor - 76,4,48,"rgba(20,17,22,.5)");
  px(seatX + 12,floor - 56,5,10,"#762335");
  px(seatX + 15,floor - 53,3,5,"#c64d55");
  drawEmbeddedArrow(seatX + 14,floor - 55,.34,43);
  px(seatX - 8,floor - 21,5,7,"#792334");
  px(seatX - 5,floor - 19,3,4,"#c24750");
  drawEmbeddedArrow(seatX - 6,floor - 20,.12,35);
  px(seatX + 3,floor - 45,4,20,"#873441");
  px(seatX + 7,floor - 43,2,17,"#cf7658");
  if (!executing) drawUnitNameplate(WOUNDED_KNIGHT.name,WOUNDED_KNIGHT.role,seatX,floor - 143);
}

function drawWoundedKnightEscort(knight,rescued = false) {
  const x = Math.round(lerp(knight.prevX ?? knight.x,knight.x,renderAlpha));
  const floor = Math.round(lerp(knight.prevY ?? knight.y ?? floorAt(x),knight.y ?? floorAt(x),renderAlpha));
  const moving = Math.abs(knight.vx || 0) > .25;
  const face = rescued ? 1 : (knight.vx < -.12 ? -1 : knight.vx > .12 ? 1 : player.face);
  const limp = moving ? Math.sin(knight.limpFrame || 0) : 0;
  const bob = Math.round(Math.abs(limp) * 1.5);
  const y = floor - 62 + bob;
  ctx.save();
  ctx.globalAlpha=.3;
  px(x - 21,floor - 4,43,4,"#11131b");
  px(x - 12,floor - 5,25,2,"#39323b");
  ctx.restore();
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(face,1);
  ctx.rotate(rescued ? .03 : -.055);
  const backLeg = Math.round(limp * 4);
  px(-10,47 + backLeg,8,14,"#27303e");
  px(2,47 - backLeg,8,14,"#313a49");
  px(-13,59 + backLeg,13,5,"#151a23");
  px(1,59 - backLeg,13,5,"#171c25");
  px(-14,18,29,33,"#252d3a");
  px(-12,19,25,30,knight.hurtTimer > 0 ? "#eee4d5" : "#586678");
  px(-9,22,19,25,"#374657");
  px(-7,24,4,21,"#8591a0");
  px(2,23,5,23,"#25313e");
  px(-14,18,28,5,"#778496");
  px(-12,32,24,4,"#222a36");
  px(-13,45,27,5,"#8d6948");
  px(-18,20,7,24,"#313b4a");
  px(12,22,7,24,"#202835");
  px(-19,17,9,8,"#778496");
  px(11,18,9,8,"#8590a0");
  drawWoundedKnightFace(1,9,1,false);
  px(-9,-4,20,4,"#2a2c36");
  px(-7,-8,16,5,"#59606d");
  px(7,-4,6,12,"#30323c");
  px(-12,14,26,4,"#6e4147");
  ctx.restore();
  drawEmbeddedArrow(x - face * 3,y + 22,face > 0 ? -.42 : Math.PI + .42,39);
  drawEmbeddedArrow(x + face * 8,y + 42,face > 0 ? -.12 : Math.PI + .12,31);
  if (!rescued) {
    px(x - 25,y - 19,50,4,"#171924");
    px(x - 24,y - 18,48 * clamp(knight.hp / knight.maxHp,0,1),2,knight.hp < 9 ? "#e33e50" : "#d4765d");
  }
  drawUnitNameplate(WOUNDED_KNIGHT.name,rescued ? "생환 · 치료 중" : "호위 대상",x,y - 47);
}

function drawDetachedKnightHead(x,y,rotation,bones = false) {
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y));
  ctx.rotate(rotation || 0);
  if (bones) {
    px(-7,-7,14,11,"#d4ccb7");
    px(-5,-9,10,4,"#ebe2c9");
    px(-4,-3,3,3,"#36333a");px(2,-3,3,3,"#36333a");
    px(-2,2,4,2,"#8e8779");px(-5,5,10,3,"#b6ae9d");
  } else {
    px(-8,-7,16,13,"#b87968");
    px(-6,-6,13,10,"#d39e7f");
    px(-9,-10,18,5,"#34313a");
    px(-7,-13,15,5,"#575b68");
    px(1,-2,3,2,"#26364a");
    px(-8,5,16,3,"#6e2634");
  }
  ctx.restore();
}

function drawWoundedKnightRemains(knight) {
  if (knight.bodyZone !== currentZoneId) return;
  const x = knight.bodyX ?? knight.x;
  if (!inView(x - 100,200)) return;
  const floor = floorAt(x);
  const bones = woundedKnightRemainsStage(knight,clock.day,clock.minute) === "bones";
  const beheaded = knight.status === "executed";
  ctx.save();
  ctx.globalAlpha=.34;
  px(x - 51,floor - 4,103,4,"#101219");
  ctx.restore();
  if (!bones) {
    ctx.save();
    ctx.globalAlpha=.82;
    ctx.fillStyle="#6b1728";ctx.beginPath();ctx.ellipse(x + 4,floor - 5,49,7,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.72;ctx.fillStyle="#a82438";ctx.beginPath();ctx.ellipse(x + 21,floor - 8,29,5,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
    px(x - 45,floor - 13,35,9,"#202631");
    px(x - 41,floor - 17,30,7,"#566273");
    px(x - 13,floor - 20,44,16,"#252c38");
    px(x - 9,floor - 23,39,15,"#536173");
    px(x - 4,floor - 21,29,4,"#82909f");
    px(x + 25,floor - 19,10,12,"#252b36");
    px(x - 17,floor - 10,48,6,"#20252f");
    px(x - 2,floor - 24,4,16,"#8c3342");
    drawEmbeddedArrow(x - 1,floor - 22,-.15,34);
    drawEmbeddedArrow(x - 24,floor - 14,-.08,29);
    if (beheaded) {
      px(x + 29,floor - 20,8,10,"#792034");
      drawDetachedKnightHead(
        Number.isFinite(knight.headX) ? knight.headX : x + 42,
        Number.isFinite(knight.headY) ? knight.headY : floor - 8,
        knight.headRotation,
        false
      );
    } else {
      drawDetachedKnightHead(x + 39,floor - 14,.15,false);
    }
  } else {
    px(x - 42,floor - 11,35,3,"#c8c0ac");
    px(x - 46,floor - 9,7,5,"#aaa492");
    px(x - 12,floor - 13,45,4,"#d8d0ba");
    for (let index=0;index<7;index++) px(x - 9 + index * 6,floor - 16 - index%2,4,4,index%2 ? "#beb7a5" : "#e0d8c0");
    px(x - 4,floor - 23,3,10,"#d9d1ba");
    px(x + 5,floor - 25,3,12,"#c8c0ab");
    px(x + 14,floor - 22,3,9,"#e1d9bf");
    px(x - 2,floor - 23,22,2,"#c9c1ad");
    px(x - 4,floor - 19,26,2,"#aaa493");
    px(x - 18,floor - 9,29,3,"#4d4b50");
    if (beheaded) {
      drawDetachedKnightHead(
        Number.isFinite(knight.headX) ? knight.headX : x + 45,
        Number.isFinite(knight.headY)
          ? knight.headY
          : fallingSupportFloorAt(
            platforms,Number.isFinite(knight.headX) ? knight.headX : x + 45,floor - 8
          ) - 8,
        knight.headRotation,
        true
      );
      px(x + 28,floor - 16,8,3,"#bdb5a1");
    } else {
      drawDetachedKnightHead(x + 39,floor - 13,.1,true);
    }
  }
  if (!bones) {
    for (let fly=0;fly<3;fly++) {
      const phase = performance.now() * .004 + fly * 2.1;
      px(x + 9 + Math.cos(phase) * (12 + fly * 3),floor - 31 + Math.sin(phase * 1.3) * 7,2,2,"#16151a");
    }
  }
}

function drawWoundedKnightSpeechBubble(knight) {
  if (woundedKnightSpeech <= 0) return;
  const corpse = woundedKnightIsCorpse(knight);
  const seated = ["waiting","executing"].includes(knight.status);
  const x = corpse ? knight.bodyX : seated ? knight.x - 29 : knight.x;
  if (!Number.isFinite(x) || !inView(x - 150,300)) return;
  const floor = corpse ? floorAt(x) : (knight.y || floorAt(x));
  const text = knight.status === "escort_dead"
    ? "살려준다더니… 날 미끼로 썼군…"
    : knight.status === "escort"
      ? "촌장에게만 닿는다면… 버텨 보겠소."
      : knight.status === "executing"
        ? "망설이지 마시오…"
        : knight.status === "executed"
          ? "…고맙소."
          : "독화살이오… 제발, 이 고통을 끝내 주시오.";
  const width = knight.status === "escort_dead" ? 228 : 216;
  const top = floor - (corpse ? 88 : 158);
  ctx.save();
  ctx.globalAlpha = clamp(woundedKnightSpeech / 35,0,1);
  px(x - width / 2 - 2,top - 2,width + 4,34,"rgba(13,14,22,.9)");
  px(x - width / 2,top,width,30,"#383340");
  px(x - width / 2,top,width,2,knight.status === "escort_dead" ? "#c74855" : "#b99b6f");
  ctx.fillStyle = knight.status === "escort_dead" ? "#ffaaa1" : "#f1d8b0";
  ctx.font = "bold 9px monospace";
  ctx.textAlign = "center";
  ctx.fillText(text,x,top + 18);
  ctx.fillStyle="#383340";
  ctx.beginPath();ctx.moveTo(x-7,top+30);ctx.lineTo(x+4,top+42);ctx.lineTo(x+9,top+30);ctx.fill();
  ctx.restore();
}

function drawWoundedKnight() {
  const knight = woundedKnightState();
  if (!knight) return;
  if (["waiting","executing"].includes(knight.status) && knight.zone === currentZoneId) {
    if (inView(knight.x - 80,160)) drawWoundedKnightSeated(knight,knight.status === "executing");
    drawWoundedKnightSpeechBubble(knight);
    return;
  }
  if (woundedKnightEscortActive(knight) && knight.zone === currentZoneId) {
    if (inView(knight.x - 70,140)) drawWoundedKnightEscort(knight,false);
    drawWoundedKnightSpeechBubble(knight);
    return;
  }
  if (knight.status === "rescued" && knight.zone === currentZoneId) {
    if (inView(knight.x - 70,140)) drawWoundedKnightEscort(knight,true);
    return;
  }
  if (woundedKnightIsCorpse(knight)) {
    drawWoundedKnightRemains(knight);
    if (knight.bodyZone === currentZoneId) drawWoundedKnightSpeechBubble(knight);
  }
}

function npcDrawX(npc) {
  const ns = npcStates[npc.id];
  const baseX = npcWorldX(npc);
  return baseX + (ns.flee > 0 ? Math.sign(baseX - player.x) * Math.min(35, (180 - ns.flee) * .25) : 0);
}

function drawUnitNameplate(name, role, x, top, hostile = false) {
  ctx.save();
  ctx.font = "bold 9px monospace";
  const nameWidth = ctx.measureText(name).width;
  ctx.font = "7px monospace";
  const roleWidth = ctx.measureText(role).width;
  const width = Math.ceil(Math.max(nameWidth, roleWidth) + 14);
  const left = Math.round(x - width / 2);
  px(left - 1,top - 1,width + 2,24,"rgba(13,14,23,.86)");
  px(left,top,width,22,hostile ? "#4b202b" : "#252838");
  px(left,top,width,2,hostile ? "#dc5960" : "#c9a86b");
  px(left + 3,top + 4,2,14,hostile ? "#ef6b67" : "#7f8aa0");
  ctx.textAlign = "center";
  ctx.font = "7px monospace";
  ctx.fillStyle = hostile ? "#ffaaa0" : "#b8b8c7";
  ctx.fillText(role,x,top + 9);
  ctx.font = "bold 9px monospace";
  ctx.fillStyle = hostile ? "#ffe0c2" : "#ffe1a6";
  ctx.fillText(name,x,top + 19);
  ctx.restore();
}

function drawNpcCombatBlade(x, y, face, combatFrame = 0, captain = false) {
  const progress = combatFrame > 0 ? 1 - clamp(combatFrame / 40, 0, 1) : 0;
  const angle = combatFrame > 0 ? -1.55 + progress * 2.35 : -.82;
  ctx.save();
  ctx.translate(Math.round(x + face * 9), Math.round(y + 29));
  ctx.scale(face, 1);
  ctx.rotate(angle * .28);
  px(-2,-4,12,8,captain ? "#3d4d62" : "#3e4658");
  px(0,-3,10,5,captain ? "#8092a8" : "#778397");
  ctx.translate(9,0);
  ctx.rotate(angle * .34);
  px(-1,-3,11,7,captain ? "#46566d" : "#424b5d");
  px(8,-3,6,6,"#d2a07b");
  ctx.restore();
  ctx.save();
  ctx.translate(Math.round(x + face * 13), Math.round(y + 31));
  ctx.scale(face, 1);
  ctx.rotate(angle);
  px(-9,-2,14,5,captain ? "#5e3441" : "#6f4937");
  px(-6,-1,8,2,captain ? "#b77a55" : "#b98258");
  px(1,-6,4,13,captain ? "#e2b65f" : "#c79b54");
  px(-2,-2,10,4,captain ? "#8b5c45" : "#7b5741");
  px(5,-3,captain ? 39 : 32,captain ? 7 : 6,captain ? "#718795" : "#9facb0");
  px(8,-2,captain ? 35 : 29,captain ? 4 : 3,captain ? "#dbe8e9" : "#e3ebea");
  px(15,-1,captain ? 27 : 21,1,"#fff8dc");
  px(captain ? 44 : 36,-2,5,captain ? 5 : 4,captain ? "#d09c55" : "#e0dbca");
  ctx.restore();
}

function drawFineFace(cx, y, {
  skin = "#dfa982",
  skinShadow = "#b87966",
  skinLight = "#f4c69d",
  hair = "#413846",
  face = 0,
  hostile = false,
  beard = false,
  old = false,
  eyeColor = "#293047"
} = {}) {
  const direction = face === 0 ? 0 : Math.sign(face);
  const hairLight = blendHex(hair, "#ffffff", .2);
  const outline = "#372d35";
  px(cx - 8,y,16,2,outline);
  px(cx - 10,y + 2,20,13,outline);
  px(cx - 8,y + 15,16,4,outline);
  px(cx - 8,y + 2,16,14,skin);
  px(cx - 7,y + 3,7,5,skinLight);
  px(cx - 8,y + 11,3,5,skinShadow);
  px(cx + 6,y + 5,2,10,skinShadow);
  px(cx - 10,y + 7,2,6,skinShadow);
  px(cx + 8,y + 7,2,6,skin);
  px(cx - 5,y + 17,10,2,skinShadow);
  if (direction === 0) {
    const eye = hostile ? "#e64f59" : eyeColor;
    px(cx - 6,y + 8,5,1,blendHex(hair,"#1b1c27",.35));
    px(cx + 2,y + 8,5,1,blendHex(hair,"#1b1c27",.35));
    px(cx - 5,y + 10,2,2,eye);
    px(cx + 3,y + 10,2,2,eye);
    px(cx - 4,y + 10,1,1,hostile ? "#ffd0b4" : "#f6f0d9");
    px(cx + 4,y + 10,1,1,hostile ? "#ffd0b4" : "#f6f0d9");
    px(cx - 1,y + 11,2,4,skinShadow);
    px(cx,y + 12,1,2,skinLight);
  } else {
    const eyeX = cx + direction * 4;
    const backEyeX = cx - direction * 3;
    px(eyeX - 2,y + 8,4,1,blendHex(hair,"#1b1c27",.35));
    px(backEyeX - 1,y + 9,3,1,blendHex(hair,"#1b1c27",.35));
    px(eyeX - 1,y + 10,2,2,hostile ? "#e64f59" : eyeColor);
    px(backEyeX,y + 10,1,2,hostile ? "#e64f59" : eyeColor);
    px(eyeX,y + 10,1,1,hostile ? "#ffd0b4" : "#f6f0d9");
    px(cx + direction * 2,y + 11,2,4,skinShadow);
    px(cx + direction * 4,y + 14,2,1,skinLight);
  }
  if (old) {
    px(cx - 7,y + 7,2,1,"rgba(91,58,56,.35)");
    px(cx + 6,y + 7,2,1,"rgba(91,58,56,.35)");
    px(cx - 6,y + 14,3,1,"rgba(91,58,56,.3)");
  }
  if (beard) {
    const beardColor = old ? "#c9c5ba" : blendHex(hair,"#b99c87",.25);
    px(cx - 7,y + 14,14,3,beardColor);
    px(cx - 5,y + 17,10,5,beardColor);
    px(cx - 2,y + 20,5,4,blendHex(beardColor,"#312b32",.22));
    px(cx - 5,y + 15,4,2,blendHex(beardColor,"#ffffff",.15));
  } else {
    px(cx - 3 + direction,y + 16,6,1,hostile ? "#7b2f37" : "#8b514d");
    px(cx - 1 + direction,y + 17,3,1,skinLight);
  }
  px(cx - 9,y - 2,18,5,hair);
  px(cx - 6,y - 4,12,3,hair);
  px(cx - 8,y - 3,8,2,hairLight);
  px(cx - 10,y + 2,3,9,hair);
  px(cx + 7,y + 2,3,6,hair);
  px(cx - 7,y + 3,2,5,hairLight);
  px(cx + 4,y,2,4,blendHex(hair,"#211e2b",.28));
}

function drawNpcModel(
  npc,
  x,
  y,
  flash,
  hostile = false,
  face = 1,
  combatFrame = 0,
  airborne = false,
  walkFrame = 0,
  cursedEyes = false
) {
  const moon = npc.id.startsWith("moon_");
  const sun = npc.id.startsWith("sun_");
  const combatProgress = combatFrame > 0 ? 1 - clamp(combatFrame / 40, 0, 1) : 0;
  const combatPulse = hostile && combatFrame > 0 ? Math.sin(Math.PI * combatProgress) : 0;
  const combatStance = Math.round(combatPulse * 4);
  const walkStride = !hostile && npc.wander ? Math.round(Math.sin(walkFrame * .11) * 3) : 0;
  x += Math.round(face * combatPulse * 2);
  const idle = Math.round(Math.sin(performance.now() * .0035 + npc.x * .01) * .7);
  y += idle;
  const hair = npc.guard ? "#64718a" : moon ? "#36475d" : sun ? "#5d352d" : npc.id === "elder" ? "#d3d0c5" : "#413846";
  const cloth = flash || npc.color || "#6f6575";
  const clothShadow = blendHex(cloth,"#191b28",.38);
  const clothLight = blendHex(cloth,"#f3dfc1",.18);
  if (!airborne) {
    ctx.save(); ctx.globalAlpha = .26; px(x - 17,y + 58,35,4,"#11131d");px(x - 9,y + 57,19,2,"#38313d");ctx.restore();
  }
  const leftLift = airborne ? (face < 0 ? 7 : 4) : 0;
  const rightLift = airborne ? (face > 0 ? 7 : 4) : 0;
  const legAnchor = Math.round(face * combatPulse * 4);
  const leftLegX = x - 9 - combatStance - legAnchor + walkStride;
  const rightLegX = x + 3 + combatStance - legAnchor - walkStride;
  px(leftLegX,y + 47 - leftLift,7,11,"#202634");px(rightLegX,y + 47 - rightLift,7,11,"#202634");
  px(leftLegX + 1,y + 48 - leftLift,4,9,"#394356");px(rightLegX + 1,y + 48 - rightLift,4,9,"#394356");
  px(leftLegX - 2,y + 56 - leftLift,10,4,"#111722");px(rightLegX - 1,y + 56 - rightLift,10,4,"#111722");
  px(x - 13,y + 21,26,5,"#202331");
  px(x - 14,y + 25,28,8,"#202331");
  px(x - 12,y + 33,24,18,"#202331");
  px(x - 10,y + 50,20,4,"#202331");
  px(x - 11,y + 22,22,5,clothLight);
  px(x - 12,y + 27,24,6,cloth);
  px(x - 10,y + 33,20,17,cloth);
  px(x - 8,y + 50,16,2,clothShadow);
  px(x - 10,y + 27,3,22,clothLight);
  px(x + 7,y + 31,3,19,clothShadow);
  const leftArmShift = hostile ? Math.round((face < 0 ? -1 : 1) * combatPulse * 5) : -walkStride;
  const rightArmShift = hostile ? Math.round((face > 0 ? -1 : 1) * combatPulse * 5) : walkStride;
  px(x - 16,y + 25 + leftArmShift,5,21,clothShadow);
  px(x + 12,y + 25 + rightArmShift,5,21,clothShadow);
  px(x - 15,y + 44 + leftArmShift,5,6,sun ? "#b9795e" : "#c98f72");
  px(x + 11,y + 44 + rightArmShift,5,6,sun ? "#b9795e" : "#c98f72");
  px(x - 10,y + 42,20,3,"#403440");
  px(x - 1,y + 41,4,8,"#d0a85e");
  px(x,y + 42,2,4,"#f0cf7a");
  drawFineFace(x,y + 1,{
    skin:sun ? "#ca8d6d" : moon ? "#d4a88f" : "#e1ad87",
    skinShadow:sun ? "#9a5c4f" : moon ? "#a6786c" : "#b87966",
    skinLight:sun ? "#e9b08a" : "#f4c69d",
    hair,
    face:hostile || cursedEyes ? face : 0,
    hostile:hostile || cursedEyes,
    beard:["smith","sun_smith","elder"].includes(npc.id),
    old:npc.id === "elder",
    eyeColor:moon ? "#49547a" : sun ? "#4f302d" : "#293047"
  });
  if (["inn","moon_inn","sun_inn"].includes(npc.id)) {
    const apron = sun ? "#edc48c" : moon ? "#aebfc0" : "#d7ba94";
    px(x - 8,y + 30,17,21,apron);
    px(x - 6,y + 32,13,2,blendHex(apron,"#ffffff",.3));
    px(x - 5,y + 36,1,12,"rgba(88,63,58,.28)");
    px(x + 13,y + 34,7,9,"#7c533e");px(x + 15,y + 31,6,5,"#c89b61");px(x + 17,y + 32,2,2,"#f2d3a0");
    px(x - 11,y + 1,3,19,hair);px(x - 14,y + 18,7,3,hair);
  }
  if (npc.id === "alchemist") {
    px(x - 16,y - 4,32,5,"#4f315b");px(x - 10,y - 12,20,9,"#744783");
    px(x - 7,y - 15,13,4,"#965ca4");px(x - 12,y - 2,23,2,"#b087bf");
    px(x + 14,y + 31,7,14,"#683274");px(x + 15,y + 28,5,4,"#d6c2df");px(x + 16,y + 35,4,6,"#dd6bd5");px(x + 17,y + 36,1,2,"#ffe3ff");
    px(x - 8,y + 27,16,2,"#b087bf");
  }
  if (npc.id === "farmer") {
    px(x - 18,y - 5,36,4,"#c29750");px(x - 12,y - 12,24,8,"#a9783d");px(x - 8,y - 14,16,3,"#d1a45c");
    px(x - 8,y + 27,16,24,"#796d4f");px(x - 5,y + 29,2,18,"#a09668");
    px(x + 16,y + 23,2,37,"#8d6a3c");px(x + 13,y + 21,8,3,"#d1aa5b");
  }
  if (["guild","moon_ranger"].includes(npc.id)) {
    px(x - 15,y - 3,30,4,moon ? "#3f695f" : "#45677d");px(x - 9,y - 6,18,4,moon ? "#56847a" : "#5f8496");px(x + 7,y - 12,3,10,"#d8b66f");
    px(x + 11,y + 29,14,19,"#cbb183");px(x + 13,y + 32,10,2,"#5f4c3d");px(x + 15,y + 37,6,1,"#756150");
    px(x - 19,y + 24,3,34,"#8c6748");px(x - 23,y + 28,10,2,"#d5ba7f");px(x - 23,y + 50,10,2,"#d5ba7f");
  }
  if (["smith","sun_smith"].includes(npc.id)) {
    px(x - 9,y + 27,18,24,"#57413a");px(x - 6,y + 29,12,20,"#82604c");px(x - 4,y + 31,2,15,"#a17a61");
    px(x + 14,y + 27,5,27,"#686e78");px(x + 10,y + 23,15,5,"#adb1b3");px(x + 17,y + 18,4,9,"#6c4736");px(x + 18,y + 19,2,5,"#a06b4c");
    px(x - 10,y - 1,20,3,"#3d3233");
  }
  if (npc.id === "elder") {
    px(x - 5,y + 19,10,17,"#dad7c9");px(x - 7,y + 22,3,12,"#b8b6ae");px(x + 16,y + 23,3,38,"#6a4a37");px(x + 12,y + 20,11,4,"#9c7650");
    px(x - 11,y - 5,22,4,"#b6b3ad");px(x - 7,y - 8,14,4,"#e0ddd3");
  }
  if (["mage","moon_oracle","sun_mage"].includes(npc.id)) {
    const magic = npc.id === "sun_mage" ? "#ffb45d" : npc.id === "moon_oracle" ? "#c3b9ff" : "#a58ee8";
    ctx.fillStyle = moon ? "#514b7a" : sun ? "#884f3b" : "#4d426c";
    ctx.beginPath();ctx.moveTo(x - 14,y);ctx.lineTo(x,y - 21);ctx.lineTo(x + 15,y);ctx.fill();
    px(x - 18,y - 1,36,4,moon ? "#7770a2" : sun ? "#c3774b" : "#716496");
    px(x - 8,y - 11,9,2,blendHex(magic,"#ffffff",.18));
    const staffX = face > 0 ? x + 18 : x - 22;
    px(staffX,y + 16,3,45,"#5d443d");px(staffX - 3,y + 8,9,9,magic);px(staffX,y + 10,3,3,"#f6e7ff");
    ctx.save();ctx.globalAlpha=.2;px(staffX - 8,y + 4,20,20,magic);ctx.restore();
  }
  if (npc.id === "traveler") {
    ctx.fillStyle="#292633";ctx.beginPath();ctx.moveTo(x-15,y+22);ctx.lineTo(x-10,y-7);ctx.lineTo(x+11,y-7);ctx.lineTo(x+15,y+22);ctx.fill();
    px(x - 10,y - 4,20,5,"#3d3948");px(x - 5,y + 10,2,2,"#d86465");px(x + 3,y + 10,2,2,"#d86465");
    px(x - 12,y + 24,25,4,"#3d3547");
  }
  if (npc.guard) {
    px(x - 14,y - 5,28,5,sun ? "#9c805e" : moon ? "#667f89" : "#68748b");
    px(x - 10,y - 11,20,7,sun ? "#c4a06c" : "#8190a6");
    px(x - 7,y - 9,13,2,"rgba(255,255,255,.2)");
    px(x - 2,y - 18,5,8,npc.id === "guard" ? "#a84f54" : moon ? "#7995a1" : "#d0914f");
    px(x - 20,y + 24,9,30,"#566579");px(x - 17,y + 28,4,21,"#29374a");px(x - 16,y + 37,2,4,"#c5a768");
    if (!hostile) {
      px(x + 17,y + 15,3,46,"#9c835b");px(x + 13,y + 12,11,5,"#d3ba7d");
    }
    px(x - 9,y + 23,18,5,"#65758b");px(x - 6,y + 24,12,2,"#93a1b4");
  }
  if (hostile) {
    if (["mage","moon_oracle","sun_mage"].includes(npc.id)) {
      const staffX = face > 0 ? x + 18 : x - 21;
      px(staffX,y + 17,3,43,"#5d443d");px(staffX - 3,y + 10,9,9,npc.id === "sun_mage" ? "#ff9a4d" : "#a47ee0");
    } else if (npc.combatType === "ranger") {
      const bowX = face > 0 ? x + 16 : x - 22;
      px(bowX,y + 17,3,40,"#9b704a");px(bowX + (face > 0 ? 3 : -9),y + 22,9,2,"#e0c08c");px(bowX + (face > 0 ? 3 : -9),y + 48,9,2,"#e0c08c");
    } else {
      drawNpcCombatBlade(x, y, face, combatFrame, npc.id === "guard");
    }
    px(x - 11,y + 20,22,2,"#b73948");
  }
}

function drawBurningElderEffect(x, y) {
  const intensity = elderFireVisualIntensity();
  const now = performance.now();
  const flameCount = 2 + Math.floor(intensity * 4);
  ctx.save();
  drawFireGlow(x,y + 31,39 + intensity * 28,74 + intensity * 35,.16 + intensity * .1);
  ctx.globalAlpha = .34 + intensity * .28;
  px(x - 11,y + 24,8,17,"#2a2026");
  px(x + 4,y + 31,7,20,"#3a2425");
  px(x - 7,y + 45,16,6,"#5d2d29");
  ctx.globalAlpha = 1;
  const flameOffsets = [-12,9,-3,15,-17,3];
  for (let flame = 0; flame < flameCount; flame++) {
    const offset = flameOffsets[flame];
    const baseY = y + 58 - (flame % 2) * 9;
    const size = 19 + intensity * 18 - flame % 3 * 2;
    drawDistantFlame(x + offset,baseY,size,now * .016 + flame * 1.73,.76 + intensity * .2);
  }
  for (let ember = 0; ember < 9; ember++) {
    const emberY = y + 47 - ((now * (.019 + ember * .001) + ember * 23) % 78);
    const emberX = x - 17 + ((ember * 13 + now * .006) % 35);
    px(emberX,emberY,ember % 3 === 0 ? 3 : 2,ember % 3 === 0 ? 4 : 3,ember % 2 ? "#ff9b47" : "#e34b31");
  }
  ctx.restore();
}

function drawNpc(npc) {
  const ns = npcStates[npc.id];
  const x = npcRenderX(npc);
  if (!ns.alive || ns.hostile || !npcVisible(npc) || !inView(x, 40)) return;
  const burningElder = npc.id === "elder" && elderFireSceneAvailable();
  const visualFloor = npcRenderFloor(npc);
  const ground = floorAt(x);
  const airborne = npc.wander && (!ns.roamGrounded || visualFloor < ground - 2);
  const y = visualFloor - 60;
  const flash = ns.hurt > 0
    ? "#fff0d0"
    : burningElder
      ? blendHex(npc.color,"#5b2929",elderFireVisualIntensity() * .54)
      : npc.color;
  if (airborne) {
    const distance = clamp((ground - visualFloor) / 170,0,1);
    ctx.save();
    ctx.globalAlpha = .24 * (1 - distance * .55);
    px(x - 14 + distance * 5,ground - 4,28 - distance * 10,4,"#11131d");
    px(x - 7 + distance * 3,ground - 3,14 - distance * 5,2,"#443943");
    ctx.restore();
  }
  drawNpcModel(
    npc,x,y,flash,false,
    burningElder ? ns.burnFace || -1 : npc.wander ? ns.roamDir : 1,
    0,airborne,ns.roamDistance || 0,burningElder
  );
  if (burningElder) drawBurningElderEffect(x,y);
  if (ns.flee > 0) {
    px(x + (x > player.x ? -20 : 15), y + 28, 20, 4, "#b8a79c");
    px(x + (x > player.x ? -25 : 29), y + 24, 8, 11, "#8a5960");
  }
  drawUnitNameplate(
    npc.name,
    burningElder ? "불타는 촌장 · 저주의 화염" : npc.role,
    x,
    y - 54,
    burningElder
  );
  if (ns.hurt > 0 || ns.hp < npc.hp) {
    px(x - 22, y - 27, 44, 4, "#191a25");
    px(x - 21, y - 26, 42 * clamp(ns.hp / npc.hp, 0, 1), 2, "#e35963");
  }
}

function drawHostileNpcEnemy(enemy, npc) {
  const motion = enemyCombatMotion(enemy, renderAlpha, enemyMotionScratch);
  const x = Math.round(renderX(enemy) + enemy.w / 2 + motion.bodyX);
  const y = Math.round(renderY(enemy) + enemy.h - 60 + motion.bodyY);
  ctx.save();
  ctx.translate(0, motion.bodyY);
  drawNpcModel(
    npc,
    x,
    y - motion.bodyY,
    enemy.hurt > 0 ? "#fff0d0" : npc.color,
    true,
    enemy.face,
    Math.max(enemy.attackAnim || 0, enemy.dashTimer || 0),
    enemy.launchTimer > 0
  );
  ctx.restore();
  if (enemy.dashTimer > 0) {
    ctx.save();ctx.globalAlpha=.25;px(x - enemy.face * 28,y + 8,28,50,npc.id === "guard" ? "#e05758" : "#8f5bb0");ctx.restore();
  }
  if (enemy.guardBuff > 0) {
    ctx.save();ctx.globalAlpha=.28;ctx.strokeStyle="#bfe6ff";ctx.lineWidth=3;ctx.strokeRect(x-25,y-8,50,72);ctx.restore();
  }
  px(x - 25,y - 30,50,4,"#191a25");
  px(x - 24,y - 29,48 * clamp(enemy.hp / enemy.maxHp,0,1),2,enemy.enraged ? "#ff3f52" : "#df6570");
  drawUnitNameplate(npc.name, `적대 · ${npc.role}`, x, y - 58, true);
}

function drawCorpse(npc) {
  const ns = npcStates[npc.id];
  if (ns.alive || ns.deathZone !== currentZoneId || !inView(ns.deathX - 48, 96)) return;
  const x = ns.deathX;
  const floor = floorAt(x);
  const stage = corpseStage(ns, clock.day);
  const hash = [...npc.id].reduce((sum, char) => sum + char.charCodeAt(0),0);
  const direction = hash % 2 ? 1 : -1;
  const cloth = stage === "decayed" ? blendHex(npc.color,"#32343a",.7) : npc.color;
  const clothLight = blendHex(cloth,"#d8b08a",stage === "decayed" ? .08 : .22);
  const clothDark = blendHex(cloth,"#171922",.48);
  const skin = stage === "decayed" ? "#747464" : "#c99174";
  const skinLight = stage === "decayed" ? "#918f79" : "#e2ad88";
  const hair = ["mage","traveler","wanderer_mage","moon_oracle","sun_mage"].includes(npc.id) ? "#342c45" : "#3b3030";

  ctx.save();
  ctx.globalAlpha = .34;
  px(x - 43,floor - 4,87,4,"#11131a");
  px(x - 31,floor - 6,62,3,"#25212a");
  ctx.restore();

  if (stage === "bones") {
    ctx.save();
    ctx.translate(Math.round(x),Math.round(floor));
    ctx.scale(direction,1);
    px(-19,-8,35,3,"#b8b19e");
    for (let vertebra = 0; vertebra < 6; vertebra++) px(-12 + vertebra * 5,-10 - vertebra % 2,4,4,vertebra % 2 ? "#d8d0b9" : "#c8c0aa");
    px(-20,-12,10,7,"#c4bca7");px(-18,-14,7,3,"#e2dac2");
    px(-38,-8,20,3,"#d1c9b3");px(-41,-7,6,5,"#b7af9d");
    px(-33,-12,3,6,"#e0d8c0");px(-28,-9,4,4,"#aaa493");
    px(-4,-18,3,10,"#d7ceb6");px(1,-20,3,12,"#c9c1ac");
    px(5,-18,3,9,"#e0d7bd");px(10,-15,3,7,"#b9b29f");
    px(-1,-19,11,2,"#d8cfb7");px(1,-15,13,2,"#c1baa6");
    px(18,-20,15,13,"#d8cfb7");
    px(21,-24,10,5,"#e8dfc5");
    px(20,-18,4,4,"#38343a");px(28,-18,4,4,"#38343a");
    px(26,-14,3,2,"#8f8879");px(21,-10,10,4,"#b8b19e");
    px(23,-9,2,2,"#363239");px(28,-9,2,2,"#363239");
    px(-11,-6,12,3,blendHex(npc.color,"#25262c",.74));
    px(8,-6,9,3,blendHex(npc.color,"#25262c",.78));
    if (npc.guard || npc.combatType === "guard" || npc.combatType === "ranger") {
      px(-34,-17,39,2,"#77706b");px(-37,-18,8,4,"#4a4545");px(3,-20,3,8,"#75604a");
    }
    ctx.restore();
  } else {
    ctx.save();
    ctx.globalAlpha = stage === "fresh" ? .72 : .42;
    px(x - 42,floor - 7,85,6,stage === "fresh" ? "#5e1d28" : "#40232a");
    px(x - 25,floor - 10,49,6,stage === "fresh" ? "#902838" : "#51242e");
    px(x + 29,floor - 5,22,3,stage === "fresh" ? "#48151f" : "#322127");
    px(x - 46,floor - 4,15,2,"#32131b");
    ctx.restore();

    ctx.save();
    ctx.translate(Math.round(x),Math.round(floor));
    ctx.scale(direction,1);
    px(-42,-8,15,6,"#171a22");px(-39,-10,12,3,"#343b4a");
    px(-30,-13,19,10,"#252b39");px(-27,-15,15,4,"#4a5360");
    px(-17,-19,35,16,clothDark);
    px(-14,-20,31,13,cloth);
    px(-11,-19,26,3,clothLight);
    px(-13,-8,30,4,"#28252d");
    px(-7,-17,3,9,clothLight);
    px(6,-18,8,2,"rgba(255,224,189,.2)");
    px(-2,-10,27,5,clothDark);
    px(3,-9,23,4,cloth);
    px(23,-8,8,6,skin);px(26,-7,5,3,skinLight);
    px(18,-19,16,14,skin);
    px(21,-21,13,5,hair);px(29,-19,6,9,hair);
    px(19,-17,4,9,blendHex(hair,skin,.16));
    px(24,-14,7,2,stage === "decayed" ? "#55574e" : "#724d49");
    px(25,-15,5,1,"#2b2930");
    px(31,-11,3,2,stage === "fresh" ? "#763744" : "#4e4f47");
    px(17,-7,8,3,clothDark);
    px(12,-5,7,2,clothLight);
    px(-19,-4,13,2,clothLight);
    if (npc.guard || npc.combatType === "guard") {
      px(17,-23,18,4,"#3b4657");px(20,-26,13,4,"#647184");px(31,-21,4,10,"#343d4b");
    } else if (npc.id === "farmer") {
      px(15,-23,23,3,"#72583b");px(20,-27,14,5,"#947248");
    } else if (["mage","wanderer_mage","moon_oracle","sun_mage"].includes(npc.id)) {
      px(-35,-21,48,2,"#55466a");px(-38,-23,7,6,"#8876a0");px(10,-24,3,8,"#b49ad0");
    } else if (npc.combatType === "ranger") {
      px(-37,-20,43,2,"#6b5741");px(-39,-22,4,6,"#9d7a4f");
    }
    px(-9,-21,5,2,stage === "fresh" ? "#922f3c" : "#4b3135");
    px(2,-7,4,2,stage === "fresh" ? "#7b2634" : "#443036");
    ctx.restore();

    const flyTime = performance.now() * .004;
    const flyCount = stage === "decayed" ? 5 : 3;
    for (let index = 0; index < flyCount; index++) {
      const seed = npc.id.charCodeAt(index % npc.id.length) * .17 + index * 2.2;
      const fx = x + 5 + Math.sin(flyTime * (1.4 + index * .18) + seed) * (20 + index * 4);
      const fy = floor - 26 - index % 3 * 6 + Math.cos(flyTime * (1.8 + index * .15) + seed) * 8;
      px(fx,fy,2,2,"#111116");
      px(fx - 2,fy,2,1,"rgba(205,198,183,.5)");
      px(fx + 2,fy,2,1,"rgba(205,198,183,.5)");
    }
  }
}

function drawCrystal(c) {
  if (c.collected || !inView(c.x, 25)) return;
  const y = c.y + Math.round(Math.sin(c.phase) * 3);
  px(c.x - 4, y - 14, 8, 28, "#f39b49"); px(c.x - 10, y - 7, 20, 14, "#ffbf55"); px(c.x - 3, y - 10, 6, 16, "#ffe89a");
}

function drawPickup(p) {
  if (p.collected || !inView(p.x, 25)) return;
  const y = p.y + Math.round(Math.sin(p.phase) * 3);
  px(p.x - 8, y - 10, 16, 18, "#7c3049"); px(p.x - 10, y - 6, 20, 12, "#d84f68"); px(p.x - 4, y - 14, 8, 5, "#ead6c4");
}

function drawEnemyTag(enemy, x, y) {
  const near = Math.abs(player.x + player.w / 2 - (enemy.x + enemy.w / 2)) < 230;
  if (!near && enemy.hurt <= 0 && !enemy.elite && !enemy.boss && !enemy.pursuit) return;
  ctx.save();
  ctx.font = "bold 8px monospace";
  const width = Math.ceil(ctx.measureText(enemy.name).width + 12);
  const left = Math.round(x + enemy.w / 2 - width / 2);
  px(left - 1,y - 28,width + 2,14,"rgba(14,14,22,.8)");
  px(left,y - 27,width,12,enemy.boss ? "#4c242d" : enemy.elite || enemy.pursuit ? "#473548" : "#292936");
  px(left,y - 27,3,12,enemy.boss ? "#f06a55" : enemy.elite || enemy.pursuit ? "#c58ad5" : "#9b6b68");
  ctx.textAlign="center";
  ctx.fillStyle=enemy.boss ? "#ffd2a0" : enemy.night ? "#d8c9ff" : "#e7d2b4";
  ctx.fillText(enemy.name,x + enemy.w / 2,y - 18);
  ctx.restore();
}

function drawEnemy(e) {
  if (e.dead || !inView(e.x, e.w)) return;
  const motion = enemyCombatMotion(e, renderAlpha, enemyMotionScratch);
  const visualStep = lerp(e.prevStep, e.step, renderAlpha);
  const x = Math.round(renderX(e) + motion.bodyX);
  const floatBob = ["ghost","flameDjinn","lich"].includes(e.type) ? Math.sin(visualStep * .08) * 3 : e.boss ? Math.sin(visualStep * .045) : 0;
  const y = Math.round(renderY(e) + floatBob + motion.bodyY);
  const flash = e.hurt > 0 ? "#fff1d0" : null;
  const hostileNpc = e.npcId ? NPCS.find((npc) => npc.id === e.npcId) : null;
  if (hostileNpc) {
    drawHostileNpcEnemy(e, hostileNpc);
    return;
  }
  ctx.save();
  ctx.globalAlpha = e.type === "ghost" ? .12 : .32;
  px(x - 5,e.floor - 5,e.w + 10,5,"#11121b");
  px(x + 4,e.floor - 3,e.w - 8,3,"#282330");
  ctx.restore();
  if (e.elite || e.pursuit) {
    ctx.save();ctx.globalAlpha=.12 + Math.sin(e.step * .08) * .04;
    px(x - 9,y - 8,e.w + 18,e.h + 15,e.pursuit ? "#c499d5" : "#d6a65c");ctx.restore();
  }
  if (e.type === "slime") {
    const slime = flash || e.color;
    px(x + 10,y + 5,22,2,"#46345f");
    px(x + 6,y + 7,30,3,"#46345f");
    px(x + 3,y + 10,36,8,"#46345f");
    px(x + 1,y + 17,40,11,"#46345f");
    px(x + 4,y + 28,34,3,"#46345f");
    px(x + 10,y + 7,22,2,blendHex(slime,"#ffffff",.22));
    px(x + 7,y + 9,28,3,slime);
    px(x + 5,y + 12,32,14,slime);
    px(x + 3,y + 19,36,7,slime);
    px(x + 6,y + 26,30,2,blendHex(slime,"#1c1830",.2));
    px(x + 9,y + 10,9,3,"#b79ad0");px(x + 11,y + 10,5,1,"#e8d9f3");
    px(x + 10,y + 17,4,5,"#251f39");px(x + 29,y + 17,4,5,"#251f39");
    px(x + 11,y + 18,1,1,"#f8efff");px(x + 30,y + 18,1,1,"#f8efff");
    px(x + 18,y + 22,8,1,"#8b4964");px(x + 20,y + 23,4,2,"#e2828d");px(x + 21,y + 23,2,1,"#ffd2b1");
    px(x + 7,y + 23,2,1,"rgba(255,178,205,.48)");px(x + 34,y + 23,2,1,"rgba(255,178,205,.48)");
    px(x + 2,y + 27,6,3,"#684b8a");px(x + 35,y + 27,5,3,"#684b8a");
  } else if (["wolf","hound","moonstalker"].includes(e.type)) {
    ctx.save();
    if ((e.face || 1) < 0) {
      ctx.translate(Math.round(x * 2 + e.w),0);
      ctx.scale(-1,1);
    }
    const fur = flash || e.color;
    const furLight = blendHex(fur,"#dce4df",.18);
    const furDark = blendHex(fur,"#1e2631",.32);
    px(x + 6,y + 11,35,3,"#303541");px(x + 4,y + 14,39,13,"#303541");px(x + 8,y + 27,32,4,"#303541");
    px(x + 8,y + 12,31,3,furLight);px(x + 6,y + 15,35,11,fur);px(x + 9,y + 26,29,3,furDark);
    px(x + 34,y + 7,14,4,"#333846");px(x + 32,y + 11,18,12,"#333846");px(x + 35,y + 9,13,13,fur);
    ctx.fillStyle=fur;
    ctx.beginPath();ctx.moveTo(x+35,y+10);ctx.lineTo(x+38,y);ctx.lineTo(x+43,y+9);ctx.fill();
    ctx.beginPath();ctx.moveTo(x+42,y+10);ctx.lineTo(x+48,y+1);ctx.lineTo(x+48,y+13);ctx.fill();
    px(x + 45,y + 15,5,3,"#2c2a32");px(x + 47,y + 16,4,2,"#171821");
    px(x + 41,y + 12,2,2,e.type === "moonstalker" ? "#d7c4ff" : "#f1b06e");px(x + 42,y + 12,1,1,"#fff2c7");
    px(x + 9,y + 28,4,7,"#262c38");px(x + 30,y + 28,4,7,"#262c38");
    px(x + 11,y + 29,2,4,"#77808d");px(x + 32,y + 29,2,4,"#77808d");
    px(x + 7,y + 34,8,2,"#151922");px(x + 28,y + 34,8,2,"#151922");
    px(x,y + 11,9,4,fur);px(x - 5,y + 7,7,4,"#363d49");px(x - 9,y + 4,5,3,"#2c333f");px(x - 11,y + 2,3,2,"#75808b");
    px(x + 16,y + 12,5,2,"rgba(255,255,255,.18)");px(x + 22,y + 25,10,2,"#414754");
    px(x + 13,y + 17,2,6,furLight);px(x + 27,y + 14,1,5,"rgba(255,255,255,.14)");
    if (e.type === "moonstalker") {
      px(x + 34,y + 11,4,2,"#c7b6ff");px(x + 44,y + 11,3,2,"#c7b6ff");
      px(x + 14,y + 8,17,2,"#8794ba");px(x + 19,y + 5,4,4,"#b9b4e4");px(x + 20,y + 4,2,2,"#e3ddff");
    }
    ctx.restore();
  } else if (e.type === "treant") {
    px(x + 17,y + 8,22,e.h - 10,"#332d2c");px(x + 19,y + 9,18,e.h - 12,flash || "#654d3a");
    px(x + 7,y + 18,40,5,"#30433a");px(x + 5,y + 23,44,33,"#30433a");px(x + 9,y + 20,36,35,flash || e.color);
    px(x - 7,y + 26,19,6,"#334b3d");px(x - 3,y + 21,6,9,"#4c684e");px(x - 10,y + 28,6,3,"#25372f");
    px(x + 43,y + 23,19,6,"#334b3d");px(x + 56,y + 16,5,10,"#4c684e");px(x + 61,y + 15,3,5,"#6d845f");
    px(x + 14,y + 20,5,3,"#d6be6f");px(x + 35,y + 20,5,3,"#d6be6f");
    px(x + 16,y + 20,1,1,"#fff0a0");px(x + 37,y + 20,1,1,"#fff0a0");
    px(x + 19,y + 32,17,2,"#332a2a");px(x + 24,y + 34,7,6,"#211d22");px(x + 26,y + 35,3,2,"#5d4540");
    px(x + 4,y + 4,17,16,"#385344");px(x + 35,y,18,21,"#43614d");px(x + 21,y - 6,13,17,"#536f55");
    px(x + 8,y + 1,7,3,"#658269");px(x + 39,y - 3,8,3,"#6b856d");px(x + 25,y - 8,6,3,"#789076");
    px(x + 5,y + e.h - 6,18,6,"#292626");px(x + 33,y + e.h - 6,18,6,"#292626");
    for (let knot=0;knot<4;knot++) {
      px(x + 22 + (knot%2)*8,y + 43 + knot*7,3,3,"#3d302b");
      px(x + 23 + (knot%2)*8,y + 43 + knot*7,1,1,"#9a7350");
    }
    px(x + 21,y + 14,2,18,"#8a6747");px(x + 32,y + 41,2,17,"#3c2e2b");
  } else if (e.type === "sunscorpion") {
    px(x + 7,y + 14,34,4,"#5f3a32");px(x + 5,y + 18,38,11,"#5f3a32");px(x + 8,y + 16,32,11,flash || e.color);
    px(x + 15,y + 9,22,8,"#d28a50");px(x + 18,y + 10,14,2,"#e7ad6b");
    for (let leg=0;leg<4;leg++) {
      px(x + 5 + leg*10,y + 27,2,7,"#6f4538");
      px(x + 7 + leg*10,y + 32,8,2,"#6f4538");
      px(x + 13 + leg*10,y + 33,3,1,"#d08b58");
    }
    px(x + 39,y + 10,8,6,"#8b4d3c");px(x + 45,y + 3,4,11,"#7b4136");px(x + 47,y - 3,3,7,"#e6b35e");px(x + 46,y - 5,6,3,"#ffd77b");px(x + 49,y - 5,2,1,"#fff0ad");
    px(x - 3,y + 10,10,3,"#c37b49");px(x - 9,y + 4,6,8,"#8b4d3c");px(x - 11,y + 2,4,4,"#e2a25a");px(x - 12,y + 1,2,2,"#ffd38a");
    px(x + 20,y + 12,3,2,"#3e2c30");px(x + 31,y + 12,3,2,"#3e2c30");px(x + 21,y + 12,1,1,"#ffd99a");px(x + 32,y + 12,1,1,"#ffd99a");
  } else if (e.boss) {
    ctx.save();ctx.globalAlpha=.16;px(x - 12,y - 10,e.w + 24,e.h + 20,"#e85a49");ctx.restore();
    px(x + 13,y + 6,54,76,"#302e3a");px(x + 15,y + 8,50,72,flash || e.color);
    px(x + 7,y + 24,68,40,"#34313e");px(x + 9,y + 26,64,36,flash || e.color);
    px(x + 20,y,40,27,"#292936");px(x + 24,y + 3,32,22,"#454252");
    ctx.fillStyle="#302d39";
    ctx.beginPath();ctx.moveTo(x+23,y+5);ctx.lineTo(x+10,y-12);ctx.lineTo(x+32,y+1);ctx.fill();
    ctx.beginPath();ctx.moveTo(x+56,y+5);ctx.lineTo(x+70,y-12);ctx.lineTo(x+49,y+1);ctx.fill();
    px(x + 24,y + 11,6,3,"#ff694f");px(x + 49,y + 11,6,3,"#ff694f");
    px(x + 26,y + 11,2,1,"#ffe19a");px(x + 51,y + 11,2,1,"#ffe19a");
    px(x + 34,y + 19,12,2,"#1c1d27");px(x + 38,y + 21,5,1,"#92504c");
    px(x + 1,y + 38,14,49,"#272735");px(x + 67,y + 38,14,49,"#272735");
    px(x + 24,y + 36,32,7,"#d09255");px(x + 34,y + 38,12,18,"#572a37");
    px(x + 8,y + 64,18,29,"#292a34");px(x + 56,y + 64,18,29,"#292a34");
    if (e.fireBlade > 0) {
      px(x + (e.face > 0 ? 74 : -24),y + 22,18,72,"#e85537");
      px(x + (e.face > 0 ? 79 : -19),y + 12,8,76,"#ffb447");
    }
  } else if (e.type === "ghost") {
    ctx.save();ctx.globalAlpha=.18;px(x - 6,y - 4,e.w + 12,e.h + 5,"#a8b8ee");ctx.globalAlpha=.76;
    px(x + 6,y + 4,e.w - 12,e.h - 7,flash || e.color);px(x,y + 20,e.w,e.h - 24,flash || e.color);
    px(x + 11,y + 14,3,3,"#d8f4ff");px(x + 25,y + 14,3,3,"#d8f4ff");
    px(x + 12,y + 14,1,1,"#ffffff");px(x + 26,y + 14,1,1,"#ffffff");
    px(x + 18,y + 22,5,1,"#6977a2");
    for (let wisp=0;wisp<4;wisp++) px(x + 2 + wisp*10,y + e.h - 7 - (wisp%2)*4,7,8,"#59648f");
    ctx.restore();
  } else {
    const metal = flash || e.color;
    const center = x + e.w / 2;
    const armorShadow = blendHex(e.color,"#161923",.42);
    const armorLight = blendHex(e.color,"#e4ddd2",.18);
    const legSpread = Math.round(motion.stance);
    const walkStride = !motion.airborne && e.attackAnim <= 0 && Math.abs(e.speed || 0) > 0
      ? Math.round(Math.sin(visualStep * .22) * Math.min(3, 1 + (e.speed || 0)))
      : 0;
    const leftFront = e.face < 0;
    const leftLift = Math.round(leftFront ? motion.frontKnee : motion.rearKnee);
    const rightLift = Math.round(leftFront ? motion.rearKnee : motion.frontKnee);
    const legAnchor = Math.round(motion.bodyX * .7);
    const leftX = center - 9 - legSpread + walkStride - legAnchor;
    const rightX = center + 2 + legSpread - walkStride - legAnchor;
    px(leftX,y + e.h - 15 - leftLift,7,13,"#20232e");px(rightX,y + e.h - 15 - rightLift,7,13,"#20232e");
    px(leftX + 2,y + e.h - 13 - leftLift,3,9,"#465064");px(rightX + 2,y + e.h - 13 - rightLift,3,9,"#465064");
    px(leftX - 2,y + e.h - 4 - leftLift,10,4,"#131720");px(rightX - 1,y + e.h - 4 - rightLift,10,4,"#131720");
    px(center - 13,y + 21,26,5,"#282a36");
    px(center - 15,y + 25,30,8,"#282a36");
    px(center - 12,y + 33,24,e.h - 45,"#282a36");
    px(center - 11,y + 22,22,5,armorLight);
    px(center - 13,y + 27,26,6,metal);
    px(center - 10,y + 33,20,e.h - 47,e.color);
    px(center - 8,y + 35,3,e.h - 51,armorLight);
    px(center + 6,y + 35,3,e.h - 51,armorShadow);
    px(center - 17,y + 27,5,e.h - 36,armorShadow);
    px(center + 13,y + 27,5,e.h - 36,armorShadow);
    px(center - 10,y + 28,20,2,"rgba(255,255,255,.16)");
    px(center - 9,y + 42,18,3,"#3b3240");
    px(center - 1,y + 41,3,7,"#c39651");
    if (e.type !== "skeleton") {
      const desert = ["duneRaider","sunGuard","flameDjinn"].includes(e.type);
      const caster = ["mage","briarMage","royalMage","priest","lich"].includes(e.type);
      drawFineFace(center,y + 2,{
        skin:desert ? "#c98b68" : "#dda681",
        skinShadow:desert ? "#96594c" : "#a96f60",
        skinLight:desert ? "#e8ae86" : "#f2c093",
        hair:caster ? "#3d334d" : ["bandit","hunter","ranger","crossbow"].includes(e.type) ? "#4d352f" : "#4d5668",
        face:e.face || 1,
        hostile:true,
        beard:["captain","judge","inquisitor"].includes(e.type),
        old:["judge","priest"].includes(e.type),
        eyeColor:"#8f303d"
      });
    }
    if (e.type === "skeleton") {
      px(center - 8,y + 3,16,3,"#b8b2a4");px(center - 10,y + 6,20,12,"#d9d2c2");px(center - 7,y + 18,14,4,"#c5beae");
      px(center - 6,y + 9,3,3,"#2d2b31");px(center + 3,y + 9,3,3,"#2d2b31");
      px(center - 5,y + 9,1,1,"#f06b5e");px(center + 4,y + 9,1,1,"#f06b5e");
      px(center - 1,y + 13,2,3,"#817b72");px(center - 4,y + 18,8,1,"#625d58");
      for (let rib=0;rib<3;rib++) px(center - 8,y + 29 + rib*6,16,1,"#d2cabc");
      px(x + e.w - 2,y + 24,3,32,"#7d684d");px(x + e.w - 5,y + 21,9,6,"#a18a61");px(x + e.w,y + 18,4,8,"#d7d1c1");
    } else if (["bandit","duneRaider"].includes(e.type)) {
      px(center - 12,y - 1,24,5,e.type === "duneRaider" ? "#7f503e" : "#352630");
      px(center - 9,y - 4,18,4,e.type === "duneRaider" ? "#9d6549" : "#4b3340");
      px(center - 8,y + 19,16,5,"#3d2932");px(center - 5,y + 20,10,2,"#7f4750");
      px(x - 5,y + 25,3,33,"#8c7b66");px(x - 9,y + 23,10,3,"#b9a27a");px(x - 10,y + 20,6,5,"#d8c39b");
    } else if (["mage","briarMage","royalMage","priest","flameDjinn","lich"].includes(e.type)) {
      const orb = e.type === "flameDjinn" ? "#ff7847" : e.type === "priest" ? "#ffe39a" : e.type === "lich" ? "#7fe0cb" : "#a47ee0";
      ctx.fillStyle=e.type === "flameDjinn" ? "#803e37" : "#44395d";
      ctx.beginPath();ctx.moveTo(center-14,y+4);ctx.lineTo(center,y-13);ctx.lineTo(center+14,y+4);ctx.fill();
      px(center - 16,y + 2,32,4,blendHex(orb,"#393042",.52));
      px(x + e.w + 1,y + 15,3,43,"#5a443d");px(x + e.w - 2,y + 9,9,9,orb);px(x + e.w,y + 5,4,16,e.type === "flameDjinn" ? "#ffd067" : "#d5c2ff");
      px(x + e.w + 1,y + 10,2,2,"#fff3d2");
      ctx.save();ctx.globalAlpha=.18;px(x + e.w - 7,y + 5,20,20,orb);ctx.restore();
      if (e.type === "flameDjinn") { px(x + 7,y + e.h - 18,e.w - 14,18,"#9e3e35");px(x + 13,y + e.h - 25,e.w - 26,12,"#f0713f"); }
    } else if (["hunter","captain","adventurer","soldier","crossbow","ranger"].includes(e.type)) {
      px(x - 2,y + 21,9,e.h - 24,e.type === "crossbow" ? "#355346" : "#4d2634");
      if (!["captain","adventurer","soldier"].includes(e.type)) {
        px(x + e.w - 1,y + 16,2,47,"#b0675c");px(x + e.w - 5,y + 13,10,3,"#e3a174");
      }
      px(center - 9,y - 3,18,4,e.type === "soldier" ? "#8994a6" : "#765146");
      if (e.type === "crossbow") { px(x + e.w - 9,y + 24,25,4,"#b18457");px(x + e.w + 7,y + 19,4,14,"#d1b27e"); }
      if (e.type === "captain") { px(x - 12,y + 18,15,42,"#73849a");px(x - 9,y + 23,8,30,"#35465b");px(x - 7,y + 35,4,4,"#d4ae62"); }
      if (["captain","adventurer","soldier"].includes(e.type))
        drawNpcCombatBlade(x + e.w / 2,y,e.face,Math.max(e.attackAnim || 0,e.dashTimer || 0),e.type === "captain");
    } else if (["judge","inquisitor","shieldKnight"].includes(e.type)) {
      px(x - 9,y + 21,15,42,"#7c849a");px(x - 6,y + 24,10,36,"#a4abc0");px(x - 2,y + 30,4,27,"#525d78");
      if (e.type === "judge") {
        px(x + e.w,y + 8,3,57,"#d6d2bf");px(x + e.w + 3,y + 4,14,5,"#f0e1b0");
      } else {
        drawNpcCombatBlade(x + e.w / 2,y,e.face,Math.max(e.attackAnim || 0,e.dashTimer || 0),true);
      }
      px(center - 8,y - 5,16,4,"#d4c69d");px(center - 2,y - 12,4,8,"#f0dfad");
    } else if (["guard","spellblade"].includes(e.type)) {
      px(x - 6,y + 22,10,e.h - 25,"#5d687b");px(x + e.w,y + 18,3,42,"#c0c9ca");px(x + e.w - 3,y + 15,9,4,"#d9a85a");
    }
  }
  if (e.guardBuff > 0) {
    ctx.save();ctx.globalAlpha=.22;ctx.strokeStyle="#bfe6ff";ctx.lineWidth=3;ctx.strokeRect(x-5,y-6,e.w+10,e.h+10);ctx.restore();
  }
  if (e.hurt > 0 || e.hp < e.maxHp || e.boss) {
    px(x,y - 11,e.w,5,"#252533");
    px(x + 1,y - 10,(e.w - 2) * clamp(e.hp / e.maxHp,0,1),3,e.boss ? "#f0a458" : "#dc626e");
  }
  drawEnemyTag(e,x,y);
}

function crossSlashActive() {
  return player.crossSlashTimer > 0 || player.prevCrossSlashTimer > 0;
}

function crossSlashProgress() {
  const visualTimer = lerp(player.prevCrossSlashTimer,player.crossSlashTimer,renderAlpha);
  return clamp((player.crossSlashDuration - visualTimer) / Math.max(1,player.crossSlashDuration),0,1);
}

function swordProgress() {
  if (crossSlashActive()) return crossSlashProgress();
  const visualTimer = lerp(player.prevAttackTimer, player.attackTimer, renderAlpha);
  return clamp((player.attackDuration - visualTimer) / player.attackDuration, 0, 1);
}

function swordAngle() {
  return playerSwordAngle(swordProgress(),player.attackCombo,crossSlashActive());
}

function traceSwordTrail(radius,angle,crossCasting) {
  if (crossCasting) {
    const progress = crossSlashProgress();
    if (progress < .5) {
      ctx.arc(0,0,radius,-1.2,angle);
      return;
    }
    ctx.arc(0,0,radius,-1.2,.88);
    ctx.moveTo(Math.cos(.88) * radius,Math.sin(.88) * radius);
    ctx.arc(0,0,radius,.88,angle,true);
    return;
  }
  const start = player.attackCombo === 1 ? -.42 : player.attackCombo === 2 ? -1.52 : -1.3;
  ctx.arc(0,0,radius,start,angle);
}

function fillWeaponPolygon(points,color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0][0],points[0][1]);
  for (let index = 1; index < points.length; index++) ctx.lineTo(points[index][0],points[index][1]);
  ctx.closePath();
  ctx.fill();
}

function activeWeaponPalette(visual) {
  const corrupt = player.karma >= 500;
  const transformed = player.transformTimer > 0;
  const tint = (color,corruptTarget,transformTarget) => corrupt
    ? blendHex(color,corruptTarget,.48)
    : transformed
      ? blendHex(color,transformTarget,.35)
      : color;
  return {
    blade:tint(visual.blade,"#24142d","#8d3f58"),
    edge:tint(visual.edge,"#c65b9e","#f0787d"),
    shadow:tint(visual.shadow,"#120b19","#4e263a"),
    guard:tint(visual.guard,"#3d1b3f","#85394e"),
    guardLight:tint(visual.guardLight,"#96538b","#e16d6d"),
    grip:tint(visual.grip,"#1b1022","#4f2637"),
    pommel:tint(visual.pommel,"#6f2d64","#bc4e5d"),
    accent:tint(visual.accent,"#e16abb","#ff8a82"),
    trail:tint(visual.trail,"#9d3d83","#e26071"),
    trailCore:tint(visual.trailCore,"#f1a6d6","#ffc2aa")
  };
}

function drawWeaponHilt(visual,palette) {
  px(-15,-3,17,6,palette.grip);
  px(-13,-2,3,4,palette.guardLight);
  px(-8,-2,2,4,palette.shadow);
  px(-3,-2,3,4,palette.guardLight);
  px(-17,-4,5,8,palette.pommel);
  px(-16,-2,3,4,palette.accent);
  switch (visual.design) {
    case "rusted":
      px(0,-5,6,11,palette.guard);
      px(2,-4,2,9,palette.guardLight);
      px(-2,-2,11,4,palette.guard);
      px(5,1,4,2,palette.shadow);
      break;
    case "iron":
      px(0,-6,5,13,palette.guard);
      px(2,-5,2,11,palette.guardLight);
      px(-3,-2,13,4,palette.guard);
      px(-1,-1,9,2,palette.guardLight);
      break;
    case "knight":
      fillWeaponPolygon([[-3,-3],[1,-5],[5,-3],[9,-7],[12,-6],[8,0],[12,6],[9,7],[5,3],[1,5],[-3,3]],palette.guard);
      px(1,-2,9,4,palette.guardLight);
      px(5,-2,4,4,palette.accent);
      break;
    case "cursed":
      fillWeaponPolygon([[-4,-3],[2,-6],[5,-3],[9,-9],[12,-7],[9,-1],[14,-3],[11,1],[14,5],[9,3],[12,8],[9,9],[5,3],[2,6],[-4,3]],palette.guard);
      px(4,-3,6,6,palette.shadow);
      px(6,-2,3,3,palette.accent);
      break;
    case "twilight":
      fillWeaponPolygon([[-2,-3],[3,-7],[7,-4],[11,-7],[14,-5],[9,0],[14,5],[11,7],[7,4],[3,7],[-2,3]],palette.guard);
      px(2,-2,10,4,palette.guardLight);
      px(6,-2,4,4,palette.accent);
      break;
    case "wraith":
      ctx.save();
      ctx.globalAlpha = .82;
      fillWeaponPolygon([[-3,-2],[2,-7],[6,-3],[11,-8],[12,-4],[9,0],[13,5],[10,8],[6,3],[1,7],[-3,2]],palette.guard);
      px(3,-2,8,4,palette.guardLight);
      px(6,-1,3,3,palette.accent);
      ctx.restore();
      break;
    case "royal":
      fillWeaponPolygon([[-5,-3],[1,-6],[5,-4],[8,-8],[11,-7],[9,-2],[15,-3],[12,0],[15,3],[9,2],[11,7],[8,8],[5,4],[1,6],[-5,3]],palette.guard);
      px(0,-2,12,4,palette.guardLight);
      px(5,-3,5,6,palette.accent);
      px(6,-2,3,4,palette.trailCore);
      break;
    case "moon":
      fillWeaponPolygon([[-4,-2],[1,-7],[5,-5],[9,-9],[12,-7],[9,-2],[14,0],[9,2],[12,7],[9,9],[5,5],[1,7],[-4,2]],palette.guard);
      px(1,-2,11,4,palette.guardLight);
      px(6,-3,4,6,palette.accent);
      break;
    case "sun":
      fillWeaponPolygon([[-5,-2],[-1,-6],[3,-4],[5,-9],[8,-5],[11,-8],[12,-3],[17,0],[12,3],[11,8],[8,5],[5,9],[3,4],[-1,6],[-5,2]],palette.guard);
      px(0,-2,13,4,palette.guardLight);
      px(5,-3,6,6,palette.accent);
      px(7,-2,3,4,palette.trailCore);
      break;
  }
}

function drawWeaponBlade(visual,palette) {
  const start = 7;
  const tip = start + visual.length;
  const half = Math.ceil(visual.width / 2);
  const luminous = ["cursed","twilight","wraith","royal","moon","sun"].includes(visual.design);
  if (luminous) {
    ctx.shadowColor = palette.accent;
    ctx.shadowBlur = visual.design === "sun" || visual.design === "wraith" ? 8 : 5;
  }
  switch (visual.design) {
    case "rusted":
      fillWeaponPolygon([
        [start,-half],[17,-half],[21,-half + 1],[27,-half],[31,-half + 1],[tip - 5,-half],
        [tip,0],[tip - 5,half],[34,half],[30,half - 1],[22,half],[18,half - 1],[start,half]
      ],palette.shadow);
      px(start + 2,-half + 1,visual.length - 8,visual.width - 2,palette.blade);
      px(start + 8,-half + 1,7,1,palette.accent);
      px(start + 21,half - 2,6,1,palette.accent);
      px(start + 11,-1,visual.length - 16,1,palette.edge);
      break;
    case "iron":
      fillWeaponPolygon([[start,-half],[tip - 5,-half],[tip,0],[tip - 5,half],[start,half]],palette.shadow);
      fillWeaponPolygon([[start + 2,-half + 1],[tip - 6,-half + 1],[tip - 1,0],[tip - 6,half - 1],[start + 2,half - 1]],palette.blade);
      px(start + 6,-1,visual.length - 11,1,palette.edge);
      break;
    case "knight":
      fillWeaponPolygon([[start,-half],[tip - 7,-half],[tip,0],[tip - 7,half],[start,half]],palette.shadow);
      fillWeaponPolygon([[start + 2,-half + 1],[tip - 8,-half + 1],[tip - 2,0],[tip - 8,half - 1],[start + 2,half - 1]],palette.blade);
      px(start + 6,-1,visual.length - 14,2,palette.edge);
      px(start + 4,-half + 1,4,visual.width - 2,palette.guardLight);
      break;
    case "cursed":
      fillWeaponPolygon([
        [start,-half],[16,-half - 2],[21,-half],[26,-half - 3],[31,-half],[37,-half - 2],
        [43,-half],[tip - 4,-half - 2],[tip,0],[tip - 5,half],[45,half - 2],[39,half + 2],
        [33,half],[27,half + 2],[21,half],[16,half + 2],[start,half]
      ],palette.shadow);
      fillWeaponPolygon([[start + 3,-half + 1],[tip - 8,-half + 1],[tip - 2,0],[tip - 8,half - 1],[start + 3,half - 1]],palette.blade);
      px(start + 8,-1,visual.length - 17,2,palette.edge);
      for (const offset of [13,25,37]) px(start + offset,-2,3,3,palette.accent);
      break;
    case "twilight":
      fillWeaponPolygon([[start,-half],[tip - 6,-half - 1],[tip,0],[tip - 6,half + 1],[start,half]],palette.shadow);
      fillWeaponPolygon([[start + 2,-half + 1],[tip - 7,-half],[tip - 2,0],[tip - 7,0],[start + 2,0]],palette.edge);
      fillWeaponPolygon([[start + 2,0],[tip - 7,0],[tip - 2,0],[tip - 7,half],[start + 2,half - 1]],palette.blade);
      px(start + 9,-1,visual.length - 18,2,palette.accent);
      for (const offset of [8,20,32]) px(start + offset,-2,3,4,palette.guardLight);
      break;
    case "wraith":
      ctx.save();
      ctx.globalAlpha = .74;
      fillWeaponPolygon([
        [start,-2],[14,-half],[21,-half - 2],[26,-half],[33,-half - 3],[38,-half],
        [45,-half - 2],[tip,0],[45,half + 2],[38,half],[33,half + 3],[26,half],[21,half + 2],[14,half],[start,2]
      ],palette.blade);
      px(start + 5,-1,visual.length - 12,2,palette.edge);
      for (const offset of [12,27,39]) px(start + offset,-half + 1,4,2,palette.shadow);
      ctx.globalAlpha = .46;
      px(tip - 12,-half - 3,7,2,palette.accent);
      px(tip - 22,half + 2,9,2,palette.accent);
      ctx.restore();
      break;
    case "royal":
      fillWeaponPolygon([[start,-half],[tip - 8,-half],[tip - 3,-2],[tip,0],[tip - 3,2],[tip - 8,half],[start,half]],palette.shadow);
      fillWeaponPolygon([[start + 2,-half + 1],[tip - 9,-half + 1],[tip - 2,0],[tip - 9,half - 1],[start + 2,half - 1]],palette.blade);
      px(start + 7,-1,visual.length - 17,2,palette.edge);
      px(start + 11,-2,3,4,palette.guardLight);
      px(start + 25,-2,3,4,palette.guardLight);
      px(start + 39,-2,3,4,palette.guardLight);
      break;
    case "moon":
      fillWeaponPolygon([
        [start,-2],[17,-half],[29,-half - 1],[41,-half - 2],[tip - 5,-half - 1],[tip,0],
        [tip - 7,half - 1],[42,half],[30,half + 1],[18,half],[start,2]
      ],palette.shadow);
      fillWeaponPolygon([
        [start + 3,-1],[18,-half + 1],[30,-half],[42,-half - 1],[tip - 7,-half],[tip - 2,0],
        [tip - 8,half - 2],[42,half - 1],[30,half],[18,half - 1],[start + 3,1]
      ],palette.blade);
      px(start + 10,-1,visual.length - 18,1,palette.edge);
      for (const offset of [14,28,41]) px(start + offset,-2,2,3,palette.accent);
      break;
    case "sun":
      fillWeaponPolygon([
        [start,-half],[17,-half],[21,-half - 2],[26,-half],[31,-half - 2],[36,-half],
        [42,-half - 2],[tip - 6,-half],[tip,0],[tip - 6,half],[42,half + 2],[36,half],
        [31,half + 2],[26,half],[21,half + 2],[17,half],[start,half]
      ],palette.shadow);
      fillWeaponPolygon([[start + 2,-half + 1],[tip - 8,-half + 1],[tip - 2,0],[tip - 8,half - 1],[start + 2,half - 1]],palette.blade);
      px(start + 7,-1,visual.length - 15,2,palette.edge);
      for (const offset of [8,19,30,41]) {
        px(start + offset,-half + 1,3,2,palette.guardLight);
        px(start + offset,half - 2,3,2,palette.accent);
      }
      break;
  }
  ctx.shadowBlur = 0;
}

function drawSword(x, y, face, attacking) {
  const visual = equippedWeaponVisual();
  const palette = activeWeaponPalette(visual);
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(face, 1);
  const crossCasting = crossSlashActive();
  const angle = attacking ? swordAngle() : -2.25;
  const trailRadius = visual.length + (crossCasting ? 10 : 6);
  if (attacking && (crossCasting || attackIsActive())) {
    if (player.karma >= 250) {
      ctx.save();
      ctx.globalAlpha = crossCasting ? (player.karma >= 500 ? .66 : .48) : player.karma >= 500 ? .56 : .36;
      ctx.strokeStyle = player.karma >= 500 ? blendHex(palette.shadow,"#08040d",.5) : blendHex(palette.trail,"#661d39",.52);
      ctx.lineWidth = crossCasting ? 10 : player.karma >= 500 ? 9 : 7;
      ctx.lineCap = "round";
      ctx.beginPath();
      traceSwordTrail(trailRadius + 3,angle,crossCasting);
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = crossCasting ? .58 : player.attackCombo === 2 ? .34 : .22;
    ctx.strokeStyle = palette.trail;
    ctx.lineWidth = crossCasting ? 6 : player.attackCombo === 2 ? 7 : 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    traceSwordTrail(trailRadius,angle,crossCasting);
    ctx.stroke();
    ctx.globalAlpha *= .72;
    ctx.strokeStyle = palette.trailCore;
    ctx.lineWidth = crossCasting ? 2.5 : 1.5;
    ctx.beginPath();
    traceSwordTrail(trailRadius - 2,angle,crossCasting);
    ctx.stroke();
    ctx.restore();
  }
  ctx.rotate(angle);
  drawWeaponHilt(visual,palette);
  drawWeaponBlade(visual,palette);
  ctx.restore();
}

function drawKarmaGround() {
  if (player.karma < 500 || !player.grounded) return;
  const tier = karmaAuraTier(player.karma);
  const footX = renderX(player) + player.w / 2;
  const floor = renderY(player) + player.h;
  const supported = platforms.some((platform) =>
    footX >= platform.x && footX <= platform.x + platform.w && Math.abs(platform.y - floor) <= 8
  );
  if (!supported) return;
  px(footX - tier.radius, floor - 9, tier.radius * 2, 9, tier.id === "abyss" ? "rgba(8,5,17,.76)" : "rgba(24,10,31,.58)");
  px(footX - tier.radius * .65, floor - 13, tier.radius * 1.3, 5, "rgba(74,24,67,.38)");
}

function drawKarmaAura() {
  const tier = karmaAuraTier(player.karma);
  if (tier.particles <= 0 || !player.grounded) return;
  const time = performance.now() * .004;
  const visualX = renderX(player);
  const visualY = renderY(player);
  ctx.save();
  ctx.globalAlpha = tier.id === "abyss" ? .34 : .18;
  ctx.fillStyle = tier.id === "blood" || tier.id === "corruption" ? "#7e263f" : tier.id === "abyss" ? "#351846" : "#4e3a69";
  ctx.beginPath(); ctx.arc(visualX + 18, visualY + 35, tier.radius, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  for (let index = 0; index < tier.particles; index++) {
    const phase = time + index * 2.17;
    const x = visualX + 18 + Math.sin(phase) * (22 + index * 3);
    const y = visualY + 52 - ((time * 18 + index * 23) % 92);
    px(x, y, tier.id === "abyss" ? 5 : 3, tier.id === "abyss" ? 8 : 5, index % 2 ? "#551f62" : "#24152f");
  }
}

function drawBlessing() {
  if (player.blessing?.timer <= 0) return;
  const demon = player.blessing.variant === "demon";
  const visualX = renderX(player);
  const visualY = renderY(player);
  const x = Math.round(visualX + 18);
  const y = Math.round(visualY - 36 - Math.sin(performance.now() * .006) * 3);
  const blessingScale = Math.max(1, player.blessing.scale || 1);
  const blessingTier = player.blessing.tier || 1;
  ctx.save();
  ctx.globalAlpha = player.blessing.cast > 0 ? .9 : .36;
  ctx.strokeStyle = demon ? "#d95a7a" : "#ffe18a";
  ctx.lineWidth = Math.min(5, 1.5 + blessingTier * .45);
  ctx.beginPath();
  ctx.arc(x, visualY + 32, 30 * blessingScale + Math.sin(performance.now() * .008) * 3, 0, Math.PI * 2);
  ctx.stroke();
  for (let ray = 0; ray < 4 + blessingTier * 2; ray++) {
    const angle = performance.now() * .0015 + ray * Math.PI * 2 / (4 + blessingTier * 2);
    const inner = 34 * blessingScale;
    const outer = inner + 8 + blessingTier * 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * inner, visualY + 32 + Math.sin(angle) * inner);
    ctx.lineTo(x + Math.cos(angle) * outer, visualY + 32 + Math.sin(angle) * outer);
    ctx.stroke();
  }
  if (player.blessing.cast > 0) px(x - 34, visualY - 15, 68, player.h + 32, demon ? "rgba(118,20,49,.22)" : "rgba(255,224,139,.18)");
  if (demon) {
    px(x - 14,y - 8,28,23,"#432036"); px(x - 20,y - 14,9,13,"#8b3047"); px(x + 11,y - 14,9,13,"#8b3047");
    px(x - 31,y + 5,19,30,"#29182f"); px(x + 12,y + 5,19,30,"#29182f");
    px(x - 6,y,4,4,"#ff4b5e"); px(x + 4,y,4,4,"#ff4b5e");
  } else {
    px(x - 12,y - 5,24,24,"#f1d7a4"); px(x - 4,y - 15,8,5,"#fff2aa");
    px(x - 23,y + 2,14,25,"#efe5ca"); px(x + 9,y + 2,14,25,"#efe5ca");
    px(x - 9,y - 19,18,3,"#ffdf72");
  }
  ctx.restore();
}

function drawPlayerAttackArm(x, y, face, lean, armorLook) {
  const angle = swordAngle();
  const shoulderX = x + (face > 0 ? 28 : 10) + lean;
  ctx.save();
  ctx.translate(Math.round(shoulderX), Math.round(y + 29));
  ctx.scale(face, 1);
  ctx.rotate(angle * .28);
  px(-2,-4,13,8,armorLook.bodyShadow);
  px(0,-3,11,5,armorLook.sleeves);
  ctx.translate(10, 0);
  ctx.rotate(angle * .34);
  px(-1,-3,12,7,armorLook.bodyShadow);
  px(1,-2,9,4,armorLook.bodyLight);
  if (armorLook.design === "chain") {
    px(2,-2,2,2,armorLook.metal);
    px(6,0,2,2,armorLook.metal);
  } else if (armorLook.design === "dusk") {
    px(1,-3,5,2,armorLook.trim);
  } else if (armorLook.design === "sunscale") {
    px(1,-3,7,2,armorLook.metal);
    px(5,0,3,2,armorLook.trim);
  }
  px(9,-3,6,6,"#d4a17b");
  px(11,-2,4,4,"#f0bf96");
  ctx.restore();
}

function drawPlayerArmorBody(x,y,lean,armorLook,guarding) {
  const bx = x + lean;
  const body = guarding
    ? blendHex(armorLook.body,player.karma >= 500 ? "#67345f" : "#5b7892",.36)
    : armorLook.body;
  switch (armorLook.design) {
    case "traveler":
      px(bx + 7,y + 20,24,5,armorLook.bodyShadow);
      px(bx + 5,y + 24,28,8,armorLook.bodyShadow);
      px(bx + 7,y + 31,24,20,armorLook.bodyShadow);
      px(bx + 9,y + 23,20,8,armorLook.bodyLight);
      px(bx + 9,y + 29,20,19,body);
      px(bx + 8,y + 48,22,5,armorLook.bodyShadow);
      px(bx + 11,y + 27,4,20,armorLook.bodyLight);
      px(bx + 13,y + 27,3,21,armorLook.trim);
      px(bx + 15,y + 29,12,3,armorLook.bodyShadow);
      px(bx + 21,y + 31,3,15,armorLook.bodyShadow);
      px(bx + 9,y + 42,20,3,armorLook.trim);
      px(bx + 17,y + 42,5,4,armorLook.gem);
      px(bx + 3,y + 21,10,7,armorLook.bodyShadow);
      px(bx + 2,y + 23,8,5,armorLook.bodyLight);
      px(bx + 4,y + 24,3,2,armorLook.metal);
      break;
    case "chain":
      px(bx + 6,y + 20,26,5,armorLook.bodyShadow);
      px(bx + 4,y + 23,30,9,armorLook.bodyShadow);
      px(bx + 7,y + 30,24,22,armorLook.bodyShadow);
      px(bx + 9,y + 23,20,6,armorLook.metal);
      px(bx + 8,y + 28,22,21,body);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
          const chainX = bx + 10 + col * 4 + (row % 2 ? 2 : 0);
          if (chainX > bx + 27) continue;
          px(chainX,y + 31 + row * 4,2,2,(row + col) % 2 ? armorLook.bodyLight : armorLook.metal);
          px(chainX + 1,y + 33 + row * 4,2,1,armorLook.bodyShadow);
        }
      }
      px(bx + 8,y + 48,22,4,armorLook.trim);
      px(bx + 16,y + 48,6,4,armorLook.metal);
      px(bx + 2,y + 21,11,8,armorLook.bodyShadow);
      px(bx + 3,y + 20,9,6,armorLook.metal);
      px(bx + 25,y + 20,9,7,armorLook.bodyShadow);
      px(bx + 26,y + 21,8,5,armorLook.metal);
      break;
    case "dusk":
      fillWeaponPolygon([
        [bx + 7,y + 20],[bx + 31,y + 20],[bx + 35,y + 27],[bx + 31,y + 32],
        [bx + 30,y + 51],[bx + 19,y + 54],[bx + 8,y + 51],[bx + 7,y + 32],[bx + 3,y + 27]
      ],armorLook.bodyShadow);
      px(bx + 8,y + 24,22,8,armorLook.bodyLight);
      px(bx + 9,y + 30,20,19,body);
      fillWeaponPolygon([[bx + 10,y + 31],[bx + 18,y + 27],[bx + 18,y + 49],[bx + 11,y + 46]],armorLook.bodyLight);
      fillWeaponPolygon([[bx + 28,y + 31],[bx + 20,y + 27],[bx + 20,y + 49],[bx + 27,y + 46]],armorLook.bodyShadow);
      px(bx + 12,y + 34,14,2,armorLook.trim);
      px(bx + 10,y + 40,18,3,armorLook.bodyShadow);
      px(bx + 9,y + 47,20,4,armorLook.trim);
      fillWeaponPolygon([[bx + 19,y + 29],[bx + 24,y + 35],[bx + 19,y + 42],[bx + 14,y + 35]],armorLook.gem);
      px(bx + 18,y + 33,3,5,armorLook.metal);
      fillWeaponPolygon([[bx + 1,y + 21],[bx + 11,y + 18],[bx + 14,y + 24],[bx + 10,y + 31],[bx + 2,y + 28]],armorLook.bodyLight);
      fillWeaponPolygon([[bx + 37,y + 21],[bx + 27,y + 18],[bx + 24,y + 24],[bx + 28,y + 31],[bx + 36,y + 28]],armorLook.bodyLight);
      px(bx + 3,y + 20,4,2,armorLook.trim);
      px(bx + 31,y + 20,4,2,armorLook.trim);
      break;
    case "sunscale":
      fillWeaponPolygon([
        [bx + 6,y + 20],[bx + 32,y + 20],[bx + 36,y + 26],[bx + 31,y + 33],
        [bx + 30,y + 52],[bx + 19,y + 55],[bx + 8,y + 52],[bx + 7,y + 33],[bx + 2,y + 26]
      ],armorLook.bodyShadow);
      px(bx + 8,y + 23,22,8,armorLook.metal);
      px(bx + 8,y + 29,22,21,body);
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const scaleX = bx + 10 + col * 5 + (row % 2 ? 2 : 0);
          if (scaleX > bx + 27) continue;
          fillWeaponPolygon([
            [scaleX,y + 31 + row * 4],[scaleX + 4,y + 31 + row * 4],
            [scaleX + 2,y + 35 + row * 4]
          ],(row + col) % 2 ? armorLook.bodyLight : armorLook.trim);
        }
      }
      px(bx + 8,y + 48,22,4,armorLook.trim);
      px(bx + 16,y + 48,6,5,armorLook.gem);
      fillWeaponPolygon([[bx + 1,y + 24],[bx + 7,y + 18],[bx + 15,y + 22],[bx + 12,y + 30],[bx + 3,y + 31]],armorLook.metal);
      fillWeaponPolygon([[bx + 37,y + 24],[bx + 31,y + 18],[bx + 23,y + 22],[bx + 26,y + 30],[bx + 35,y + 31]],armorLook.metal);
      px(bx + 4,y + 20,4,3,armorLook.gem);
      px(bx + 30,y + 20,4,3,armorLook.gem);
      fillWeaponPolygon([[bx + 19,y + 28],[bx + 23,y + 34],[bx + 19,y + 40],[bx + 15,y + 34]],armorLook.gem);
      px(bx + 18,y + 31,3,6,armorLook.bodyShadow);
      break;
  }
}

function drawPlayerHeadgear(x,y,lean,armorLook) {
  const bx = x + lean;
  switch (armorLook.design) {
    case "traveler":
      px(bx + 9,y - 2,21,4,armorLook.bodyShadow);
      px(bx + 11,y - 5,17,5,armorLook.body);
      px(bx + 14,y - 7,11,3,armorLook.bodyLight);
      px(bx + 9,y + 1,3,8,armorLook.bodyShadow);
      px(bx + 28,y + 1,3,7,armorLook.bodyShadow);
      px(bx + 12,y + 1,17,2,armorLook.trim);
      px(bx + (player.face > 0 ? 6 : 29),y + 3,5,3,armorLook.cape);
      px(bx + (player.face > 0 ? 3 : 31),y + 5,6,2,armorLook.capeLight);
      break;
    case "chain":
      px(bx + 8,y - 2,23,4,armorLook.bodyShadow);
      px(bx + 10,y - 6,19,6,armorLook.metal);
      px(bx + 13,y - 9,13,4,armorLook.bodyLight);
      px(bx + 8,y + 1,4,12,armorLook.body);
      px(bx + 28,y + 1,4,11,armorLook.body);
      px(bx + 11,y + 1,18,2,armorLook.metal);
      px(bx + 12,y + 4,2,5,armorLook.bodyLight);
      px(bx + 26,y + 4,2,5,armorLook.bodyShadow);
      px(bx + (player.face > 0 ? 25 : 12),y + 2,2,9,armorLook.metal);
      break;
    case "dusk":
      fillWeaponPolygon([
        [bx + 8,y],[bx + 11,y - 7],[bx + 16,y - 5],[bx + 19,y - 12],
        [bx + 22,y - 5],[bx + 28,y - 8],[bx + 31,y],[bx + 28,y + 9],[bx + 11,y + 9]
      ],armorLook.bodyShadow);
      px(bx + 10,y - 3,20,5,armorLook.body);
      px(bx + 12,y - 7,16,5,armorLook.bodyLight);
      px(bx + 10,y + 1,4,10,armorLook.body);
      px(bx + 27,y + 1,4,9,armorLook.body);
      px(bx + 12,y + 1,17,2,armorLook.trim);
      px(bx + 13,y + 3,2,5,armorLook.metal);
      fillWeaponPolygon([[bx + 18,y - 12],[bx + 22,y - 17],[bx + 24,y - 11]],armorLook.trim);
      break;
    case "sunscale":
      px(bx + 7,y - 1,25,5,armorLook.bodyShadow);
      fillWeaponPolygon([
        [bx + 9,y - 1],[bx + 12,y - 8],[bx + 16,y - 6],[bx + 19,y - 13],
        [bx + 22,y - 6],[bx + 28,y - 8],[bx + 31,y - 1],[bx + 28,y + 9],[bx + 11,y + 9]
      ],armorLook.metal);
      px(bx + 11,y - 3,18,5,armorLook.bodyLight);
      px(bx + 9,y + 1,4,10,armorLook.metal);
      px(bx + 28,y + 1,4,9,armorLook.metal);
      px(bx + 12,y + 1,17,2,armorLook.trim);
      px(bx + 13,y + 3,2,5,armorLook.gem);
      px(bx + 17,y - 16,5,5,armorLook.cape);
      px(bx + 15,y - 19,9,4,armorLook.capeLight);
      px(bx + 13,y - 21,12,3,armorLook.trim);
      break;
  }
}

function drawPlayer() {
  const visualRunFrame = lerp(player.prevRunFrame, player.runFrame, renderAlpha);
  const x = Math.round(renderX(player));
  const elderCursedEyes = !!worldStates.elderHouse.curseActive;
  const crossCasting = crossSlashActive();
  const attacking = player.attackTimer > 0 || crossCasting;
  const attackMotion = playerAttackMotion({
    active: attacking,
    progress: swordProgress(),
    combo: crossCasting ? 1 : player.attackCombo,
    face: player.face
  }, playerAttackMotionScratch);
  const airMotion = playerAirMotion(player, playerAirMotionScratch);
  const runBob = player.grounded && Math.abs(player.vx) > .5 ? Math.round(Math.sin(visualRunFrame) * (player.sprinting ? 2 : 1)) : 0;
  const idleBob = player.grounded && Math.abs(player.vx) <= .5 ? Math.round(Math.sin(performance.now() * .0035)) : 0;
  const takeoffSquash = player.jumpSquash > 0 ? player.jumpSquash / 5 * 1.5 : 0;
  const y = Math.round(renderY(player) + runBob + idleBob + airMotion.bodyY + attackMotion.crouch + takeoffSquash);
  const lean = Math.round((player.sprinting ? player.face * 6 : 0) + attackMotion.lunge + airMotion.bodyLean);
  const armorLook = equippedArmorVisual();
  if (player.invincible > 0) {
    ctx.save();
    ctx.globalAlpha = .16 + Math.sin(performance.now() * .012) * .05;
    ctx.fillStyle = "#b8e8ff";
    ctx.beginPath(); ctx.arc(x + 18,y + 33,32,0,Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#e7f7ff"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }
  if (player.grounded) {
    const shadowY = Math.round(renderY(player) + 65);
    ctx.save(); ctx.globalAlpha = .34; px(x - 5,shadowY,46,4,"#11131d");px(x + 3,shadowY - 1,30,2,"#352e3b");ctx.restore();
  }
  const capeMain = player.transformTimer > 0
    ? blendHex(armorLook.cape,"#a23a50",.56)
    : player.karma >= 500
      ? blendHex(armorLook.cape,"#4c234d",.52)
      : armorLook.cape;
  const capeLight = player.karma >= 500
    ? blendHex(armorLook.capeLight,"#9c427c",.48)
    : armorLook.capeLight;
  const cloakWave = Math.round(Math.sin(visualRunFrame * .7) * (player.sprinting ? 5 : 2));
  const capeLift = Math.round(airMotion.capeLift);
  const capeLag = player.sprinting ? player.face * 8 : attackMotion.lunge * .45;
  const capeX = x + (player.face > 0 ? -5 : 22) + lean - capeLag;
  px(capeX - 1,y + 24 - capeLift,16 + Math.abs(cloakWave),35,armorLook.capeShadow);
  px(capeX + 1,y + 26 - capeLift,12 + Math.abs(cloakWave),31,capeMain);
  px(capeX + (player.face > 0 ? 3 : 1),y + 29 - capeLift,2,24,capeLight);
  px(capeX + 4,y + 31 - capeLift,1,18,"rgba(255,208,170,.16)");
  px(x + (player.face > 0 ? -6 - cloakWave : 26),y + 50 - Math.round(capeLift * .55),11,8,armorLook.capeShadow);
  px(x + (player.face > 0 ? -4 - cloakWave : 28),y + 55 - Math.round(capeLift * .6),7,6,capeMain);
  const restingSword = !attacking && player.guardTimer <= 0;
  if (restingSword) drawSword(x + (player.face > 0 ? 30 : 6) + lean, y + 31, player.face, false);
  if (attacking) {
    const counterOffset = Math.round(attackMotion.counterArm);
    const offArmX = x + (player.face > 0 ? 2 : 29) + lean - counterOffset;
    px(offArmX,y + 25,6,17,armorLook.bodyShadow);
    px(offArmX + (player.face > 0 ? 1 : -1),y + 27,5,12,armorLook.sleeves);
    px(offArmX + (player.face > 0 ? -1 : 1),y + 40,6,6,"#d1a07a");
  }
  const stride = Math.abs(player.vx) > .5 && player.grounded ? Math.round(Math.sin(visualRunFrame) * (player.sprinting ? 7 : 4)) : 0;
  const stance = Math.round(attackMotion.stance);
  const leftFront = player.face < 0;
  const leftLift = Math.round(leftFront ? airMotion.frontKnee : airMotion.rearKnee);
  const rightLift = Math.round(leftFront ? airMotion.rearKnee : airMotion.frontKnee);
  const legLean = player.sprinting ? Math.round(lean * .55) : Math.round(lean * .2);
  const leftLegX = x + 8 + stride + legLean - stance;
  const rightLegX = x + 21 - stride + legLean + stance;
  if (airMotion.airborne) {
    const leftShinX = leftLegX + (leftFront ? -3 : 3) * player.face;
    const rightShinX = rightLegX + (leftFront ? 3 : -3) * player.face;
    px(leftLegX,y + 49 - leftLift,8,9,armorLook.leggings);
    px(rightLegX,y + 49 - rightLift,8,9,armorLook.leggings);
    px(leftLegX + 2,y + 51 - leftLift,4,6,armorLook.legLight);
    px(rightLegX + 2,y + 51 - rightLift,4,6,armorLook.legLight);
    px(leftShinX,y + 56 - leftLift,7,8,armorLook.boots);
    px(rightShinX,y + 56 - rightLift,7,8,armorLook.boots);
    px(leftShinX - 3 + player.face * 3,y + 62 - leftLift,12,5,armorLook.boots);
    px(rightShinX - 2 + player.face * 2,y + 62 - rightLift,12,5,armorLook.boots);
  } else {
    px(leftLegX,y + 49,8,15,armorLook.leggings);
    px(rightLegX,y + 49,8,15,armorLook.leggings);
    px(leftLegX + 2,y + 51,4,11,armorLook.legLight);
    px(rightLegX + 2,y + 51,4,11,armorLook.legLight);
    px(leftLegX - 3,y + 62,13,5,armorLook.boots);
    px(rightLegX - 2,y + 62,13,5,armorLook.boots);
    px(leftLegX,y + 62,8,2,armorLook.bootTrim);
    px(rightLegX + 1,y + 62,7,2,armorLook.bootTrim);
  }
  drawPlayerArmorBody(x,y,lean,armorLook,player.guardTimer > 0);
  drawFineFace(x + 19 + lean,y + 3,{
    skin:"#e1aa82",
    skinShadow:"#aa6d61",
    skinLight:"#f5c59a",
    hair:"#392f3c",
    face:player.face,
    hostile:elderCursedEyes,
    eyeColor:elderCursedEyes || player.karma >= 250 ? "#e74455" : "#304460"
  });
  drawPlayerHeadgear(x,y,lean,armorLook);
  px(
    x + (player.face > 0 ? 27 : 9) + lean,y + 12,2,1,
    elderCursedEyes || player.karma >= 250 ? "#ffd1ba" : "#fff6dc"
  );
  if (restingSword) {
    const armX = x + (player.face > 0 ? 28 : 3) + lean;
    px(armX,y + 23,6,14,armorLook.bodyShadow);
    px(armX + (player.face > 0 ? 0 : -1),y + 24,5,10,armorLook.sleeves);
    px(armX + (player.face > 0 ? 1 : -1),y + 26,5,5,"#d0a07b");
    px(armX + (player.face > 0 ? 2 : -1),y + 27,3,3,"#f0c099");
  } else if (!attacking) {
    const armX = x + (player.face > 0 ? 29 : 2) + lean;
    px(armX,y + 27,6,21,armorLook.bodyShadow);
    px(armX + (player.face > 0 ? 0 : -1),y + 29,5,15,armorLook.sleeves);
    px(armX,y + 45,6,6,"#c99a75");
    px(armX + 2,y + 48,3,4,"#efbf98");
  } else {
    drawPlayerAttackArm(x, y, player.face, lean, armorLook);
  }
  if (player.guardTimer > 0) {
    const abyssGuard = player.karma >= 500;
    const shieldX = x + (player.face > 0 ? 27 : -8);
    px(shieldX - 1,y + 18,19,39,"#1f2633");
    px(shieldX + 1,y + 20,15,35,player.parryTimer > 0 ? (abyssGuard ? "#c45aa2" : "#9ed7ea") : (abyssGuard ? "#6d376f" : "#66748a"));
    px(shieldX + 4,y + 23,9,28,abyssGuard ? "#351d43" : "#38465b");
    px(shieldX + 7,y + 29,3,15,abyssGuard ? "#bc5a9d" : "#d0ad5c");
    px(shieldX + 3,y + 21,10,2,"rgba(255,255,255,.28)");
  } else if (attacking) {
    const attackLean = Math.round(attackMotion.shoulder);
    px(x + (player.face > 0 ? 25 : 4) + lean + attackLean,y + 31,9,6,"#30394f");
    drawSword(x + (player.face > 0 ? 32 : 4) + lean + attackLean, y + 37, player.face, true);
  }
}

function drawEffectSpark(x, y, size, color) {
  px(x - size, y, size * 2 + 1, 1, color);
  px(x, y - size, 1, size * 2 + 1, color);
  if (size > 2) px(x - 1, y - 1, 3, 3, "#fff8df");
}

function drawTaperedSlash(x1,y1,x2,y2,width,color,alpha = 1) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx,dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const startX = x1 + dx * .13;
  const startY = y1 + dy * .13;
  const endX = x1 + dx * .84;
  const endY = y1 + dy * .84;
  const half = Math.max(1,width * .5);
  const gradient = ctx.createLinearGradient(x1,y1,x2,y2);
  gradient.addColorStop(0,`${color}00`);
  gradient.addColorStop(.16,`${color}b8`);
  gradient.addColorStop(.48,color);
  gradient.addColorStop(.78,`${color}e0`);
  gradient.addColorStop(1,`${color}00`);
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(startX + nx * half,startY + ny * half);
  ctx.lineTo(endX + nx * half * .62,endY + ny * half * .62);
  ctx.lineTo(x2,y2);
  ctx.lineTo(endX - nx * half * .62,endY - ny * half * .62);
  ctx.lineTo(startX - nx * half,startY - ny * half);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawEffectSigil(x, y, radius, color, accent, rotation, tier, alpha = 1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(Math.round(x), Math.round(y));
  ctx.rotate(rotation);
  ctx.shadowColor = color;
  ctx.shadowBlur = 5 + tier * 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, Math.min(5, 1.5 + tier * .45));
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(1,Math.min(3,tier * .38));
  ctx.setLineDash([Math.max(5,radius * .11),Math.max(4,radius * .075)]);
  ctx.beginPath();
  ctx.arc(0, 0, radius * .72, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  const ticks = 8 + Math.min(8,tier * 2);
  for (let index = 0; index < ticks; index++) {
    const angle = index * Math.PI * 2 / ticks;
    const inner = radius * (index % 2 ? .82 : .76);
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner,Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * radius * .94,Math.sin(angle) * radius * .94);
    ctx.stroke();
  }
  ctx.rotate(-rotation * 1.7);
  ctx.globalAlpha *= .82;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,-radius * .42);
  ctx.lineTo(radius * .3,0);
  ctx.lineTo(0,radius * .42);
  ctx.lineTo(-radius * .3,0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(0,0,Math.max(2,radius * .08),0,Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawEffectBeam(effect, x, y, progress, alpha) {
  const targetX = effect.targetX ?? x + effect.face * effect.radius * 2;
  const targetY = effect.targetY ?? y;
  const segments = 5 + effect.tier * 2;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = effect.color;
  ctx.lineWidth = 5 + Math.min(5, effect.tier);
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let index = 1; index < segments; index++) {
    const ratio = index / segments;
    const jitter = Math.sin(effect.seed + index * 7.31 + progress * 28) * (4 + effect.tier);
    ctx.lineTo(x + (targetX - x) * ratio, y + (targetY - y) * ratio + jitter);
  }
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
  ctx.strokeStyle = effect.accent;
  ctx.lineWidth = 1 + Math.min(3, effect.tier * .5);
  ctx.stroke();
  drawEffectSpark(targetX, targetY, 3 + effect.tier, effect.accent);
  ctx.restore();
}

function drawWingedAvatar(x,y,radius,effect,progress,alpha,demonic = false) {
  const lift = Math.sin(progress * Math.PI) * radius * .12;
  const flap = .72 + Math.sin(progress * Math.PI * 3) * .12;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(Math.round(x),Math.round(y - radius * .62 - lift));
  ctx.shadowColor = effect.color;
  ctx.shadowBlur = 10 + effect.tier * 2;
  for (const side of [-1,1]) {
    ctx.save();
    ctx.scale(side,1);
    ctx.fillStyle = demonic ? "#271629" : `${effect.color}d9`;
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 2 + effect.tier * .2;
    ctx.beginPath();
    ctx.moveTo(0,-radius * .03);
    ctx.bezierCurveTo(radius * .18,-radius * .42 * flap,radius * .72,-radius * .5 * flap,radius * .8,-radius * .12);
    ctx.bezierCurveTo(radius * .64,-radius * .08,radius * .57,radius * .03,radius * .64,radius * .18);
    ctx.bezierCurveTo(radius * .4,radius * .08,radius * .3,radius * .27,radius * .34,radius * .39);
    ctx.bezierCurveTo(radius * .13,radius * .2,radius * .08,radius * .06,0,radius * .13);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = demonic ? effect.color : effect.accent;
    ctx.lineWidth = 1;
    for (let feather = 1; feather <= 3; feather++) {
      ctx.beginPath();
      ctx.moveTo(radius * .08,radius * .02);
      ctx.quadraticCurveTo(radius * (.28 + feather * .1),radius * (.04 + feather * .045),radius * (.32 + feather * .11),radius * (.24 - feather * .025));
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.shadowBlur = 0;
  ctx.fillStyle = demonic ? "#351a37" : "#f8edd2";
  ctx.strokeStyle = effect.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0,-radius * .15,Math.max(5,radius * .09),0,Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-radius * .1,-radius * .04);
  ctx.lineTo(-radius * .18,radius * .34);
  ctx.lineTo(0,radius * .25);
  ctx.lineTo(radius * .18,radius * .34);
  ctx.lineTo(radius * .1,-radius * .04);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  if (demonic) {
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-radius * .07,-radius * .22);
    ctx.quadraticCurveTo(-radius * .22,-radius * .34,-radius * .2,-radius * .45);
    ctx.moveTo(radius * .07,-radius * .22);
    ctx.quadraticCurveTo(radius * .22,-radius * .34,radius * .2,-radius * .45);
    ctx.stroke();
  } else {
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0,-radius * .34,radius * .18,radius * .055,0,0,Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBlessingEffect(effect,x,y,radius,rotation,progress,alpha) {
  const demonic = effect.variant === "demon";
  ctx.save();
  ctx.globalAlpha = alpha * .85;
  const beam = ctx.createLinearGradient(x,y - radius * 1.55,x,y + 5);
  beam.addColorStop(0,"rgba(255,255,255,0)");
  beam.addColorStop(.48,demonic ? "rgba(117,35,114,.18)" : "rgba(255,231,154,.2)");
  beam.addColorStop(1,"rgba(255,255,255,0)");
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(x - radius * .22,y);
  ctx.lineTo(x - radius * .46,y - radius * 1.45);
  ctx.lineTo(x + radius * .46,y - radius * 1.45);
  ctx.lineTo(x + radius * .22,y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.translate(Math.round(x),Math.round(y - 3));
  ctx.scale(1,.28);
  ctx.strokeStyle = effect.color;
  ctx.lineWidth = 7 + effect.tier;
  ctx.globalAlpha = alpha * .55;
  ctx.beginPath();ctx.arc(0,0,radius * (.52 + progress * .2),0,Math.PI * 2);ctx.stroke();
  ctx.strokeStyle = effect.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();ctx.arc(0,0,radius * (.35 + progress * .12),0,Math.PI * 2);ctx.stroke();
  ctx.restore();
  drawWingedAvatar(x,y,radius,effect,progress,alpha,demonic);
  const motes = 5 + effect.tier;
  for (let mote = 0; mote < motes; mote++) {
    const angle = rotation * .55 + mote * Math.PI * 2 / motes;
    const distance = radius * (.42 + (mote % 3) * .1);
    drawEffectSpark(x + Math.cos(angle) * distance,y - radius * .52 + Math.sin(angle) * distance * .75,2 + mote % 2,mote % 2 ? effect.color : effect.accent);
  }
}

function drawFrostEffect(effect,x,y,radius,progress,alpha) {
  const spread = Math.sin(Math.min(1,progress * 1.8) * Math.PI * .5);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(Math.round(x),Math.round(y));
  for (let shard = -5 - effect.tier; shard <= 5 + effect.tier; shard++) {
    const ratio = shard / (6 + effect.tier);
    const shardX = ratio * radius * spread;
    const height = radius * (.22 + (1 - Math.abs(ratio)) * .42) * spread;
    ctx.fillStyle = shard % 2 ? effect.color : effect.accent;
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(shardX - 5 - effect.tier * .3,0);
    ctx.lineTo(shardX,-height);
    ctx.lineTo(shardX + 5 + effect.tier * .3,0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.globalAlpha *= .4;
  ctx.fillStyle = effect.color;
  ctx.beginPath();
  ctx.ellipse(0,0,radius * spread,10 + effect.tier * 2,0,0,Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSolarEffect(effect,x,y,radius,rotation,progress,alpha,dark = false) {
  const diskY = y - radius * .32;
  const diskRadius = radius * (.2 + Math.sin(progress * Math.PI) * .15);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(Math.round(x),Math.round(diskY));
  ctx.shadowColor = effect.color;
  ctx.shadowBlur = 18 + effect.tier * 4;
  ctx.fillStyle = dark ? "#171224" : effect.accent;
  ctx.beginPath();ctx.arc(0,0,diskRadius,0,Math.PI * 2);ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = dark ? effect.accent : effect.color;
  ctx.lineWidth = 5 + effect.tier;
  ctx.beginPath();ctx.arc(0,0,diskRadius * 1.22,0,Math.PI * 2);ctx.stroke();
  const rays = 10 + effect.tier * 2;
  ctx.lineCap = "round";
  for (let ray = 0; ray < rays; ray++) {
    const angle = ray * Math.PI * 2 / rays + (dark ? -rotation * .16 : rotation * .11);
    const inner = diskRadius * 1.45;
    const outer = radius * (ray % 2 ? .72 : .92);
    ctx.strokeStyle = ray % 2 ? effect.color : effect.accent;
    ctx.lineWidth = ray % 3 ? 2 : 4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner,Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer,Math.sin(angle) * outer * .66);
    ctx.stroke();
  }
  if (dark) {
    ctx.globalAlpha *= .55;
    ctx.strokeStyle = "#351748";
    ctx.lineWidth = radius * .08;
    ctx.beginPath();ctx.arc(0,0,diskRadius * 1.65,0,Math.PI * 2);ctx.stroke();
  }
  ctx.restore();
}

function drawSoulEffect(effect,x,y,radius,rotation,progress,alpha,transform = false) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(Math.round(x),Math.round(y));
  const souls = 6 + effect.tier * 2;
  for (let soul = 0; soul < souls; soul++) {
    const angle = soul * Math.PI * 2 / souls - rotation * .55;
    const pull = 1 - Math.min(1,progress * 1.25);
    const distance = radius * (.22 + (.55 + soul % 3 * .08) * pull);
    const sx = Math.cos(angle) * distance;
    const sy = -Math.abs(Math.sin(angle)) * radius * .42 - soul % 2 * 10;
    ctx.strokeStyle = soul % 2 ? effect.color : effect.accent;
    ctx.lineWidth = 2 + soul % 3;
    ctx.beginPath();
    ctx.moveTo(sx,0);
    ctx.quadraticCurveTo(sx * .7 + Math.sin(rotation + soul) * 12,sy * .55,sx * .3,sy);
    ctx.stroke();
    ctx.fillStyle = soul % 2 ? effect.color : effect.accent;
    ctx.beginPath();ctx.arc(sx * .3,sy,3 + soul % 2,0,Math.PI * 2);ctx.fill();
  }
  ctx.restore();
  if (transform) drawWingedAvatar(x,y,radius,effect,progress,alpha,true);
  else drawEffectSigil(x,y - 3,radius * .32,effect.color,effect.accent,-rotation,effect.tier,.62);
}

function drawMeteorCastEffect(effect,x,y,radius,rotation,progress,alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(Math.round(x),Math.round(y));
  ctx.scale(1,.28);
  ctx.strokeStyle = effect.color;
  ctx.lineWidth = 6;
  ctx.beginPath();ctx.arc(0,0,radius * .72,0,Math.PI * 2);ctx.stroke();
  ctx.strokeStyle = effect.accent;
  ctx.lineWidth = 2;
  ctx.setLineDash([12,8]);
  ctx.beginPath();ctx.arc(0,0,radius * .47,rotation,rotation + Math.PI * 1.55);ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
  const meteorProgress = clamp(progress * 1.35,0,1);
  const mx = x + radius * .82 * (1 - meteorProgress);
  const my = y - radius * 1.25 * (1 - meteorProgress) - 18;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = effect.color;
  ctx.lineCap = "round";
  ctx.lineWidth = 12 + effect.tier;
  ctx.beginPath();ctx.moveTo(mx + radius * .42,my - radius * .42);ctx.lineTo(mx,my);ctx.stroke();
  ctx.strokeStyle = effect.accent;ctx.lineWidth = 3;ctx.stroke();
  ctx.fillStyle = effect.accent;
  ctx.beginPath();ctx.arc(mx,my,7 + effect.tier,0,Math.PI * 2);ctx.fill();
  ctx.restore();
}

function drawCombatEffect(effect) {
  const progress = clamp(1 - effect.life / effect.maxLife, 0, 1);
  const envelope = Math.sin(progress * Math.PI);
  const alpha = clamp(envelope * 1.25, 0, 1);
  const x = renderX(effect);
  const y = renderY(effect);
  const radius = effect.radius * (.34 + progress * .82);
  const rotation = progress * (1.8 + effect.tier * .28) + effect.seed;
  const time = performance.now() * .008;
  const skillKind = effect.kind.replace(/^skill-/, "");
  const enemyKind = effect.kind.replace(/^enemy-/, "");
  const hazardKind = effect.kind.replace(/^hazard-/, "");

  ctx.save();
  ctx.globalAlpha = alpha;
  if (effect.kind === "skill-cast") {
    drawEffectSigil(x, y, radius * .62, effect.color, effect.accent, rotation, effect.tier, alpha * .72);
    for (let index = 0; index < 3 + effect.tier; index++) {
      const angle = rotation * .7 + index * Math.PI * 2 / (3 + effect.tier);
      const orbit = radius * (.72 + index % 2 * .18);
      drawEffectSpark(x + Math.cos(angle) * orbit, y + Math.sin(angle) * orbit, 2 + index % 2, index % 2 ? effect.color : effect.accent);
    }
  } else if (skillKind === "execution") {
    ctx.translate(Math.round(x),Math.round(y));
    ctx.scale(effect.face,1);
    const sweep = clamp(progress * 1.45,0,1);
    const endX = -radius * .72 + radius * 1.55 * sweep;
    const endY = -radius * .68 + radius * 1.28 * sweep;
    drawTaperedSlash(-radius * .72,-radius * .68,endX,endY,20,effect.color,alpha * .25);
    drawTaperedSlash(-radius * .72,-radius * .68,endX,endY,10,effect.color,alpha);
    drawTaperedSlash(-radius * .68,-radius * .64,endX,endY,3,effect.accent,alpha);
    ctx.strokeStyle="#a91f38";
    ctx.lineWidth=4;
    ctx.lineCap="round";
    for (let arc=0;arc<3;arc++) {
      ctx.globalAlpha=alpha * (.62 - arc * .13);
      ctx.beginPath();
      ctx.moveTo(radius * (.08 + arc * .04),-radius * (.03 + arc * .05));
      ctx.quadraticCurveTo(radius * (.52 + arc * .07),-radius * (.55 + arc * .03),radius * (.88 + arc * .08),-radius * (.12 - arc * .12));
      ctx.stroke();
    }
    for (let drop=0;drop<9;drop++) {
      const ratio=drop/8;
      ctx.globalAlpha=alpha * (.9 - ratio * .45);
      ctx.fillStyle=drop%3 ? "#b5253d" : "#ef4e5e";
      ctx.beginPath();
      ctx.arc(radius * (.2 + ratio * .83),-radius * (.17 + Math.sin(ratio * Math.PI) * .36) + drop%2 * 5,2 + drop%3,0,Math.PI*2);
      ctx.fill();
    }
    drawEffectSpark(radius * .1,-radius * .02,4,effect.accent);
  } else if (skillKind === "cross-slash") {
    ctx.translate(Math.round(x),Math.round(y));
    ctx.scale(effect.face,1);
    const firstStroke = clamp(progress / .5,0,1);
    const secondStroke = clamp((progress - .5) / .5,0,1);
    const firstEndX = -radius * .62 + radius * 1.34 * firstStroke;
    const firstEndY = -radius * .56 + radius * 1.12 * firstStroke;
    const secondEndX = -radius * .58 + radius * 1.3 * secondStroke;
    const secondEndY = radius * .54 - radius * 1.08 * secondStroke;
    const echoCount = Math.min(2,effect.echoes);
    for (let echo = echoCount; echo >= 1; echo--) {
      const offset = echo * 5;
      drawTaperedSlash(-radius * .62 - offset,-radius * .56,firstEndX - offset,firstEndY,8 + effect.tier,effect.color,alpha * .13 / echo);
      if (secondStroke > 0) {
        drawTaperedSlash(-radius * .58 - offset,radius * .54,secondEndX - offset,secondEndY,8 + effect.tier,effect.color,alpha * .13 / echo);
      }
    }
    drawTaperedSlash(-radius * .62,-radius * .56,firstEndX,firstEndY,13 + effect.tier,effect.color,alpha * .22);
    drawTaperedSlash(-radius * .62,-radius * .56,firstEndX,firstEndY,7 + effect.tier * .42,effect.color,alpha * .96);
    drawTaperedSlash(-radius * .62,-radius * .56,firstEndX,firstEndY,2 + effect.tier * .18,effect.accent,alpha);
    if (secondStroke > 0) {
      drawTaperedSlash(-radius * .58,radius * .54,secondEndX,secondEndY,13 + effect.tier,effect.color,alpha * .22);
      drawTaperedSlash(-radius * .58,radius * .54,secondEndX,secondEndY,7 + effect.tier * .42,effect.color,alpha * .96);
      drawTaperedSlash(-radius * .58,radius * .54,secondEndX,secondEndY,2 + effect.tier * .18,effect.accent,alpha);
    }
    if (secondStroke > .35) drawEffectSpark(radius * .04,0,3 + effect.tier,effect.accent);
  } else if (skillKind === "cross-release") {
    ctx.translate(Math.round(x),Math.round(y));
    ctx.scale(effect.face,1);
    drawTaperedSlash(-radius * .72,-radius * .55,radius * .72,radius * .55,16 + effect.tier,effect.color,alpha * .24);
    drawTaperedSlash(-radius * .72,radius * .55,radius * .72,-radius * .55,16 + effect.tier,effect.color,alpha * .24);
    drawTaperedSlash(-radius * .72,-radius * .55,radius * .72,radius * .55,7 + effect.tier * .55,effect.color,alpha);
    drawTaperedSlash(-radius * .72,radius * .55,radius * .72,-radius * .55,7 + effect.tier * .55,effect.color,alpha);
    drawTaperedSlash(-radius * .68,-radius * .51,radius * .68,radius * .51,2 + effect.tier * .24,effect.accent,alpha);
    drawTaperedSlash(-radius * .68,radius * .51,radius * .68,-radius * .51,2 + effect.tier * .24,effect.accent,alpha);
  } else if (skillKind === "slash") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(effect.face, 1);
    ctx.lineCap = "round";
    for (let echo = 0; echo <= effect.echoes + 1; echo++) {
      ctx.globalAlpha = alpha * (1 - echo * .16);
      ctx.strokeStyle = echo % 2 ? effect.color : effect.accent;
      ctx.lineWidth = Math.max(2, 8 - echo * 1.4 + effect.tier * .55);
      ctx.beginPath();
      ctx.arc(-radius * .25 - echo * 5, 0, radius * (1 + echo * .09), -.95, .82);
      ctx.stroke();
    }
  } else if (skillKind === "barrier") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(effect.face * 1.16,1.16);
    const shieldGradient = ctx.createLinearGradient(-radius * .12,-radius * .7,radius * .86,radius * .62);
    shieldGradient.addColorStop(0,`${effect.accent}d9`);
    shieldGradient.addColorStop(.45,`${effect.color}a8`);
    shieldGradient.addColorStop(1,`${effect.color}28`);
    ctx.fillStyle = shieldGradient;
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 5 + effect.tier;
    ctx.beginPath();
    ctx.moveTo(radius * .25, -radius * .7);
    ctx.lineTo(radius * .82, -radius * .42);
    ctx.lineTo(radius * .86, radius * .24);
    ctx.lineTo(radius * .25, radius * .72);
    ctx.lineTo(-radius * .12, radius * .15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = alpha * .75;
    ctx.beginPath();
    ctx.moveTo(radius * .24,-radius * .48);
    ctx.lineTo(radius * .6,-radius * .3);
    ctx.lineTo(radius * .6,radius * .12);
    ctx.lineTo(radius * .24,radius * .43);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(radius * .25,-radius * .24);
    ctx.lineTo(radius * .25,radius * .2);
    ctx.moveTo(radius * .05,-radius * .02);
    ctx.lineTo(radius * .49,-radius * .02);
    ctx.stroke();
    for (let echo = 1; echo <= effect.echoes + 1; echo++) {
      ctx.globalAlpha = alpha * .24 / echo;
      ctx.beginPath();
      ctx.arc(radius * .2,0,radius * (.64 + echo * .08),-1.1,1.1);
      ctx.stroke();
    }
  } else if (skillKind === "blink") {
    const targetX = effect.targetX ?? x + effect.face * radius * 3;
    const targetY = effect.targetY ?? y;
    ctx.lineCap = "round";
    for (let ribbon = -1; ribbon <= 1; ribbon++) {
      ctx.globalAlpha = alpha * (ribbon === 0 ? .9 : .35);
      ctx.strokeStyle = ribbon === 0 ? effect.accent : effect.color;
      ctx.lineWidth = ribbon === 0 ? 5 + effect.tier : 2 + effect.tier * .4;
      ctx.beginPath();
      ctx.moveTo(x,y + ribbon * 8);
      ctx.bezierCurveTo(
        x + (targetX - x) * .28,y - 24 - ribbon * 7,
        x + (targetX - x) * .72,targetY + 24 + ribbon * 8,
        targetX,targetY + ribbon * 7
      );
      ctx.stroke();
    }
    for (let ghost = 0; ghost < 4; ghost++) {
      const ratio = (ghost + progress * 2.4) % 4 / 4;
      const gx = x + (targetX - x) * ratio;
      const gy = y + (targetY - y) * ratio - Math.sin(ratio * Math.PI) * 17;
      ctx.globalAlpha = alpha * (1 - ratio) * .55;
      ctx.fillStyle = ghost % 2 ? effect.color : effect.accent;
      ctx.beginPath();ctx.ellipse(gx,gy,5 + effect.tier,13 + effect.tier * 2,0,0,Math.PI * 2);ctx.fill();
    }
    drawEffectSpark(targetX,targetY,3 + effect.tier,effect.accent);
  } else if (skillKind === "lightning") {
    drawEffectBeam(effect,x,y,progress,alpha);
    const targetX = effect.targetX ?? x + effect.face * radius * 2;
    const targetY = effect.targetY ?? y;
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 2;
    for (let fork = -1; fork <= 1; fork += 2) {
      const branchX = x + (targetX - x) * .55;
      const branchY = y + (targetY - y) * .55;
      ctx.beginPath();
      ctx.moveTo(branchX,branchY);
      ctx.lineTo(branchX + fork * (18 + effect.tier * 4),branchY - 14);
      ctx.lineTo(branchX + fork * (29 + effect.tier * 5),branchY - 5);
      ctx.stroke();
    }
  } else if (skillKind === "drain") {
    const targetX = effect.targetX ?? x + effect.face * radius * 2;
    const targetY = effect.targetY ?? y;
    const segments = 20;
    for (let stream = 0; stream < 3 + Math.min(2,effect.tier); stream++) {
      ctx.strokeStyle = stream % 2 ? effect.color : effect.accent;
      ctx.lineWidth = stream === 0 ? 5 : 2;
      ctx.beginPath();
      for (let segment = 0; segment <= segments; segment++) {
        const ratio = segment / segments;
        const wave = Math.sin(ratio * Math.PI * 4 + rotation * 2 + stream * 2.1) * (8 + effect.tier * 2) * Math.sin(ratio * Math.PI);
        const pxX = targetX + (x - targetX) * ratio;
        const pxY = targetY + (y - targetY) * ratio + wave;
        if (!segment) ctx.moveTo(pxX,pxY); else ctx.lineTo(pxX,pxY);
      }
      ctx.stroke();
    }
    const orbRatio = (progress * 2.4) % 1;
    ctx.fillStyle = effect.accent;
    ctx.beginPath();
    ctx.arc(targetX + (x - targetX) * orbRatio,targetY + (y - targetY) * orbRatio,4 + effect.tier,0,Math.PI * 2);
    ctx.fill();
    drawEffectSigil(x,y,Math.min(radius,30 + effect.tier * 4),effect.color,effect.accent,-rotation,effect.tier,.48);
  } else if (skillKind === "frost") {
    drawFrostEffect(effect,x,y,radius,progress,alpha);
  } else if (skillKind === "sunburst") {
    drawSolarEffect(effect,x,y,radius,rotation,progress,alpha,false);
  } else if (skillKind === "eclipse") {
    drawSolarEffect(effect,x,y,radius,rotation,progress,alpha,true);
  } else if (skillKind === "blessing") {
    drawBlessingEffect(effect,x,y,radius,rotation,progress,alpha);
  } else if (skillKind === "harvest") {
    drawSoulEffect(effect,x,y,radius,rotation,progress,alpha,false);
  } else if (skillKind === "transform") {
    drawSoulEffect(effect,x,y,radius,rotation,progress,alpha,true);
  } else if (skillKind === "levelup") {
    drawBlessingEffect({...effect,variant:"warrior"},x,y,radius,rotation,progress,alpha);
  } else if (skillKind === "meteor-cast") {
    drawMeteorCastEffect(effect,x,y,radius,rotation,progress,alpha);
  } else if (skillKind === "impact") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 3 + effect.tier;
    const rays = 5 + effect.tier * 2;
    for (let index = 0; index < rays; index++) {
      const angle = index * Math.PI * 2 / rays + effect.seed;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * radius * .2, Math.sin(angle) * radius * .2);
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      ctx.stroke();
    }
  } else if (enemyKind === "garen-blade") {
    ctx.translate(Math.round(x),Math.round(y));
    ctx.scale(effect.face,1);
    ctx.lineCap = "round";
    for (let slash = 0; slash < 3; slash++) {
      ctx.globalAlpha = alpha * (1 - slash * .19);
      ctx.strokeStyle = slash === 1 ? effect.accent : effect.color;
      ctx.lineWidth = 11 - slash * 2 + effect.tier;
      ctx.beginPath();
      ctx.arc(-radius * (.32 + slash * .04),slash * 7 - 8,radius * (1 + slash * .12),-1.08 + slash * .1,.74 + slash * .08);
      ctx.stroke();
    }
    ctx.globalAlpha = alpha * .82;
    ctx.fillStyle = "#562131";
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(radius * .16,-radius * .42);
    ctx.lineTo(radius * .48,-radius * .27);
    ctx.lineTo(radius * .5,radius * .2);
    ctx.lineTo(radius * .13,radius * .48);
    ctx.lineTo(-radius * .05,radius * .04);
    ctx.closePath();ctx.fill();ctx.stroke();
  } else if (enemyKind === "garen-rage") {
    drawEffectSigil(x,y,radius * .68,effect.color,effect.accent,-rotation,effect.tier,.72);
    ctx.translate(Math.round(x),Math.round(y - radius * .28));
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-radius * .38,radius * .3);
    ctx.lineTo(-radius * .16,-radius * .42);
    ctx.lineTo(0,-radius * .1);
    ctx.lineTo(radius * .16,-radius * .42);
    ctx.lineTo(radius * .38,radius * .3);
    ctx.stroke();
  } else if (enemyKind === "garen-banner") {
    ctx.translate(Math.round(x),Math.round(y));
    const raise = Math.sin(Math.min(1,progress * 2) * Math.PI * .5);
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 6;
    ctx.beginPath();ctx.moveTo(-radius * .1,0);ctx.lineTo(-radius * .1,-radius * 1.25 * raise);ctx.stroke();
    ctx.fillStyle = effect.color;
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-radius * .07,-radius * 1.2 * raise);
    ctx.quadraticCurveTo(radius * .34,-radius * 1.08 * raise,radius * .48,-radius * .82 * raise);
    ctx.lineTo(radius * .2,-radius * .68 * raise);
    ctx.quadraticCurveTo(radius * .08,-radius * .82 * raise,-radius * .07,-radius * .76 * raise);
    ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle = effect.accent;
    ctx.beginPath();ctx.arc(radius * .12,-radius * .94 * raise,7 + effect.tier,0,Math.PI * 2);ctx.fill();
    ctx.globalAlpha = alpha * .4;
    ctx.strokeStyle = effect.color;ctx.lineWidth = 8;
    ctx.beginPath();ctx.ellipse(0,-3,radius * .72,12,0,0,Math.PI * 2);ctx.stroke();
  } else if (enemyKind === "claw") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(effect.face, 1);
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    for (let claw = -1; claw <= 1; claw++) {
      ctx.beginPath();
      ctx.arc(-radius * .25, claw * 8, radius, -.75, .72);
      ctx.stroke();
    }
  } else if (enemyKind === "arcane") {
    drawEffectSigil(x, y, radius, effect.color, effect.accent, -rotation, effect.tier + 1, .9);
    for (let orb = 0; orb < 3 + effect.tier; orb++) {
      const angle = time + orb * Math.PI * 2 / (3 + effect.tier);
      px(x + Math.cos(angle) * radius - 3, y + Math.sin(angle) * radius - 3, 6, 6, orb % 2 ? effect.color : effect.accent);
    }
  } else if (enemyKind === "root") {
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 5;
    for (let root = -2; root <= 2; root++) {
      ctx.beginPath();
      ctx.moveTo(x + root * 8, y);
      ctx.lineTo(x + root * radius * .24, y - radius * (.28 + Math.abs(root) * .08) * envelope);
      ctx.lineTo(x + root * radius * .34 + Math.sin(root) * 10, y - radius * .55 * envelope);
      ctx.stroke();
      px(x + root * radius * .34 - 2, y - radius * .55 * envelope - 5, 5, 10, effect.accent);
    }
  } else if (enemyKind === "venom") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(effect.face, 1);
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(-8, -6, radius * .7, -2.2, -.15);
    ctx.stroke();
    for (let drop = 0; drop < 4 + effect.tier; drop++) {
      px(radius * .25 + drop * 7, -14 + Math.sin(drop + time) * 8, 4, 8, drop % 2 ? effect.accent : effect.color);
    }
  } else if (enemyKind === "splash") {
    for (let blob = 0; blob < 7; blob++) {
      const angle = blob * Math.PI * 2 / 7 + effect.seed;
      const distance = radius * (.25 + progress * .65);
      ctx.fillStyle = blob % 2 ? effect.color : effect.accent;
      ctx.beginPath();
      ctx.arc(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance * .55, 3 + blob % 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (enemyKind === "marksman") {
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x + effect.face * radius * .55, y, radius * .42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + effect.face * radius * 1.35, y);
    ctx.stroke();
    drawEffectSpark(x + effect.face * radius * 1.35, y, 3, effect.accent);
  } else if (enemyKind === "blade") {
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(effect.face, 1);
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 7 + effect.tier;
    ctx.beginPath();
    ctx.arc(-radius * .15, 0, radius, -1.05, .7);
    ctx.stroke();
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (enemyKind === "boss") {
    drawEffectSigil(x, y, radius, effect.color, effect.accent, rotation, effect.tier + 1, .88);
    ctx.strokeStyle = effect.accent;
    ctx.lineWidth = 5;
    for (let flame = 0; flame < 7; flame++) {
      const flameX = x - radius * .72 + flame * radius * .24;
      ctx.beginPath();
      ctx.moveTo(flameX, y + radius * .45);
      ctx.quadraticCurveTo(flameX + Math.sin(time + flame) * 12, y, flameX + 4, y - radius * (.35 + (flame % 2) * .16) * envelope);
      ctx.stroke();
    }
  } else if (enemyKind === "impact") {
    drawEffectSpark(x, y, Math.round(radius * .3), effect.accent);
  } else if (effect.kind.startsWith("hazard-")) {
    const dark = hazardKind === "dark";
    if (hazardKind === "sun") {
      ctx.globalAlpha = alpha * .58;
      ctx.strokeStyle = effect.accent;
      ctx.lineWidth = 5 + effect.tier;
      ctx.beginPath();
      ctx.ellipse(x,y,radius * (.35 + progress * .55),9 + progress * 13,0,0,Math.PI * 2);
      ctx.stroke();
    } else if (hazardKind === "dark") {
      ctx.globalAlpha = alpha * .62;
      ctx.fillStyle = "#171221";
      ctx.beginPath();ctx.ellipse(x,y,radius * (.3 + progress * .5),10 + progress * 18,0,0,Math.PI * 2);ctx.fill();
      ctx.strokeStyle = effect.accent;ctx.lineWidth = 3;
      ctx.beginPath();ctx.ellipse(x,y,radius * (.22 + progress * .42),7 + progress * 11,0,0,Math.PI * 2);ctx.stroke();
    } else {
      drawEffectSigil(x,y,radius,effect.color,effect.accent,dark ? -rotation : rotation,effect.tier,.5);
      ctx.strokeStyle = effect.accent;
      ctx.lineWidth = hazardKind === "lightning" ? 4 : 2 + effect.tier;
      const rays = 5 + effect.tier * 2;
      for (let index = 0; index < rays; index++) {
        const angle = index * Math.PI * 2 / rays + rotation * .2;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * radius * .28,y + Math.sin(angle) * radius * .16);
        ctx.lineTo(x + Math.cos(angle) * radius,y + Math.sin(angle) * radius * .32);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

function drawCombatEffects(layer) {
  for (const effect of combatEffects.items) {
    if (effect.layer !== layer || !inView(effect.x, effect.radius * 2, 180)) continue;
    drawCombatEffect(effect);
  }
}

function drawGarenHazard(h,telegraph,centerX,floorY,pulse,telegraphProgress,activeProgress,time) {
  const color = h.color || "#a92338";
  const accent = h.accent || "#ffe0a0";
  const warning = h.telegraphColor || "#ff756f";
  const pattern = h.garenPattern;
  const direction = Math.floor(h.x / 80) % 2 ? 1 : -1;
  ctx.save();
  ctx.lineCap = "round";
  if (telegraph) {
    ctx.globalAlpha = .38 + pulse * .22;
    ctx.strokeStyle = warning;
    ctx.fillStyle = color;
    ctx.lineWidth = 3 + (h.visualTier || 4) * .35;
    if (pattern === "dash") {
      ctx.globalAlpha *= .48;
      ctx.fillRect(h.x,floorY - 17,h.w,14);
      ctx.globalAlpha = .85;
      for (let marker = h.x + 22; marker < h.x + h.w - 16; marker += 48) {
        ctx.beginPath();
        ctx.moveTo(marker - 14,floorY - 30);
        ctx.lineTo(marker + 4,floorY - 18);
        ctx.lineTo(marker - 14,floorY - 6);
        ctx.stroke();
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();ctx.moveTo(h.x,floorY - 38);ctx.lineTo(h.x + h.w * telegraphProgress,floorY - 38);ctx.stroke();
    } else if (pattern === "spear" || pattern === "spearStorm") {
      const spearX = centerX - direction * h.w * (.55 + (1 - telegraphProgress) * .35);
      const spearY = h.y - 72 + telegraphProgress * (h.h + 46);
      ctx.beginPath();ctx.ellipse(centerX,floorY - 4,h.w * .44,8 + pulse * 4,0,0,Math.PI * 2);ctx.stroke();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(spearX - direction * 38,spearY - 72);
      ctx.lineTo(spearX,spearY);
      ctx.stroke();
      ctx.fillStyle = warning;
      ctx.beginPath();
      ctx.moveTo(spearX,spearY);
      ctx.lineTo(spearX - direction * 15,spearY - 25);
      ctx.lineTo(spearX + direction * 9,spearY - 18);
      ctx.closePath();ctx.fill();
    } else if (pattern === "shield") {
      ctx.fillStyle = `${color}55`;
      ctx.beginPath();
      ctx.moveTo(centerX,floorY - h.h * .76);
      ctx.lineTo(centerX + h.w * .38,floorY - h.h * .58);
      ctx.lineTo(centerX + h.w * .34,floorY - h.h * .18);
      ctx.lineTo(centerX,floorY - 2);
      ctx.lineTo(centerX - h.w * .34,floorY - h.h * .18);
      ctx.lineTo(centerX - h.w * .38,floorY - h.h * .58);
      ctx.closePath();ctx.fill();ctx.stroke();
      ctx.strokeStyle = accent;
      ctx.beginPath();ctx.moveTo(centerX,floorY - h.h * .66);ctx.lineTo(centerX,floorY - h.h * .18);ctx.stroke();
    } else if (pattern === "slam") {
      ctx.globalAlpha *= .55;
      ctx.fillRect(h.x,floorY - 12,h.w,10);
      ctx.globalAlpha = .9;
      ctx.beginPath();ctx.ellipse(centerX,floorY - 5,h.w * .48,11 + pulse * 6,0,0,Math.PI * 2);ctx.stroke();
      for (let crack = 0; crack < 7; crack++) {
        const targetX = h.x + h.w * crack / 6;
        ctx.beginPath();ctx.moveTo(centerX,floorY - 7);ctx.lineTo((centerX + targetX) / 2,floorY - 19);ctx.lineTo(targetX,floorY - 4);ctx.stroke();
      }
    } else {
      ctx.fillStyle = `${color}44`;
      ctx.fillRect(h.x,floorY - 14,h.w,11);
      for (let slash = 0; slash < 3; slash++) {
        ctx.beginPath();
        ctx.moveTo(h.x + slash * 22,floorY - 8);
        ctx.lineTo(h.x + h.w - slash * 16,h.y + 8 + slash * 12);
        ctx.stroke();
      }
    }
  } else if (pattern === "dash") {
    const sweep = (time * 58) % Math.max(1,h.w + 100) - 50;
    ctx.globalAlpha = .28;
    ctx.fillStyle = color;
    ctx.fillRect(h.x,h.y,h.w,h.h);
    for (let streak = 0; streak < 8; streak++) {
      const streakX = h.x + ((sweep + streak * 61) % Math.max(1,h.w));
      ctx.globalAlpha = .48 + (streak % 3) * .18;
      ctx.strokeStyle = streak % 2 ? color : accent;
      ctx.lineWidth = streak % 3 ? 4 : 8;
      ctx.beginPath();
      ctx.moveTo(streakX - 52,floorY - 15 - streak * 7);
      ctx.lineTo(streakX + 28,floorY - 23 - streak * 7);
      ctx.stroke();
    }
    ctx.globalAlpha = .92;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 9;
    ctx.beginPath();ctx.arc(h.x + sweep,floorY - 42,58,-1.1,.74);ctx.stroke();
    ctx.strokeStyle = color;ctx.lineWidth = 3;ctx.stroke();
  } else if (pattern === "spear" || pattern === "spearStorm") {
    const impact = Math.min(1,activeProgress * 3.2);
    const tipX = centerX;
    const tipY = floorY - 4;
    ctx.globalAlpha = .92;
    ctx.strokeStyle = color;
    ctx.lineWidth = 13;
    ctx.beginPath();
    ctx.moveTo(tipX - direction * (62 + h.w * .35),h.y - 28 + (1 - impact) * -90);
    ctx.lineTo(tipX,tipY);
    ctx.stroke();
    ctx.strokeStyle = accent;ctx.lineWidth = 4;ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(tipX,tipY);
    ctx.lineTo(tipX - direction * 22,tipY - 34);
    ctx.lineTo(tipX + direction * 12,tipY - 27);
    ctx.closePath();ctx.fill();
    const burstSize = h.w * (.24 + Math.sin(Math.min(1,activeProgress * 3) * Math.PI) * .45);
    ctx.globalAlpha = .65;
    ctx.strokeStyle = warning;
    for (let ray = 0; ray < 8; ray++) {
      const angle = ray * Math.PI / 4;
      ctx.beginPath();ctx.moveTo(tipX,tipY - 3);ctx.lineTo(tipX + Math.cos(angle) * burstSize,tipY - 3 + Math.sin(angle) * burstSize * .35);ctx.stroke();
    }
  } else if (pattern === "shield") {
    ctx.globalAlpha = .94;
    ctx.fillStyle = `${color}c9`;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(centerX,floorY - h.h * .88);
    ctx.lineTo(centerX + h.w * .44,floorY - h.h * .64);
    ctx.lineTo(centerX + h.w * .38,floorY - h.h * .16);
    ctx.lineTo(centerX,floorY + 2);
    ctx.lineTo(centerX - h.w * .38,floorY - h.h * .16);
    ctx.lineTo(centerX - h.w * .44,floorY - h.h * .64);
    ctx.closePath();ctx.fill();ctx.stroke();
    ctx.lineWidth = 3;
    ctx.beginPath();ctx.moveTo(centerX,floorY - h.h * .72);ctx.lineTo(centerX,floorY - h.h * .18);ctx.moveTo(centerX - h.w * .21,floorY - h.h * .45);ctx.lineTo(centerX + h.w * .21,floorY - h.h * .45);ctx.stroke();
  } else if (pattern === "slam") {
    const shock = Math.sin(Math.min(1,activeProgress * 2.4) * Math.PI);
    ctx.globalAlpha = .78;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 7;
    ctx.beginPath();ctx.ellipse(centerX,floorY - 4,h.w * (.12 + shock * .52),9 + shock * 18,0,0,Math.PI * 2);ctx.stroke();
    ctx.strokeStyle = color;
    for (let rock = 0; rock < 12; rock++) {
      const ratio = rock / 11;
      const rockX = h.x + ratio * h.w;
      const height = (20 + rock % 4 * 13) * shock;
      ctx.fillStyle = rock % 2 ? color : accent;
      ctx.beginPath();
      ctx.moveTo(rockX - 7,floorY);
      ctx.lineTo(rockX,floorY - height);
      ctx.lineTo(rockX + 8,floorY);
      ctx.closePath();ctx.fill();
    }
  } else {
    ctx.translate(Math.round(centerX),Math.round(h.y + h.h * .52));
    ctx.lineCap = "round";
    for (let slash = 0; slash < 5; slash++) {
      ctx.globalAlpha = .92 - slash * .13;
      ctx.strokeStyle = slash % 2 ? accent : color;
      ctx.lineWidth = 12 - slash;
      const flip = slash % 2 ? -1 : 1;
      ctx.beginPath();
      ctx.arc(-h.w * .18,flip * (slash - 2) * 6,h.w * (.54 + slash * .04),flip > 0 ? -1.08 : -0.72,flip > 0 ? .72 : 1.08);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawHazards() {
  const time = performance.now() * .01;
  for (const h of hazards.items) {
    if (!inView(h.x, h.w)) continue;
    const telegraph = h.telegraph > 0;
    const profile = hazardEffectProfile(h.kind, h.friendly);
    const color = h.color || profile.color;
    const accent = h.accent || profile.accent;
    const centerX = h.x + h.w / 2;
    const floorY = h.y + h.h;
    const telegraphProgress = h.maxTelegraph > 0 ? clamp(1 - h.telegraph / h.maxTelegraph, 0, 1) : 1;
    const activeProgress = h.maxActive > 0 ? clamp(1 - h.active / h.maxActive, 0, 1) : 0;
    const pulse = .5 + Math.sin(time * 1.5 + h.x * .02) * .5;
    ctx.save();
    ctx.lineCap = "round";
    if (h.garenPattern) {
      drawGarenHazard(h,telegraph,centerX,floorY,pulse,telegraphProgress,activeProgress,time);
      ctx.restore();
      continue;
    }
    if (telegraph) {
      ctx.globalAlpha = .32 + pulse * .22;
      ctx.strokeStyle = h.accent || profile.telegraph;
      ctx.fillStyle = color;
      ctx.lineWidth = 2 + (h.visualTier || 1) * .35;
      if (profile.shape === "lightning") {
        ctx.setLineDash([6, 7]);
        ctx.beginPath();
        ctx.moveTo(centerX, h.y);
        ctx.lineTo(centerX, floorY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 3, h.w * .52, 8 + pulse * 4, 0, 0, Math.PI * 2);
        ctx.stroke();
        drawEffectSpark(centerX, h.y + h.h * telegraphProgress, 2 + (h.visualTier || 1), accent);
      } else if (profile.shape === "meteor") {
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 4, h.w * .48, 12 + pulse * 5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 4, h.w * .28, 7 + pulse * 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        const meteorY = h.y - 70 + telegraphProgress * (h.h + 45);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX + h.w * .25 * (1 - telegraphProgress), meteorY, 8 + (h.visualTier || 1) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = accent;
        ctx.beginPath();
        ctx.moveTo(centerX + h.w * .25 * (1 - telegraphProgress), meteorY - 3);
        ctx.lineTo(centerX + h.w * .55 * (1 - telegraphProgress), meteorY - 48);
        ctx.stroke();
      } else if (["dark", "sun", "magic"].includes(profile.shape)) {
        drawEffectSigil(centerX, floorY - 5, Math.min(h.w * .46, 110), color, accent, time * (profile.shape === "dark" ? -.25 : .25), h.visualTier || 2, .8);
      } else if (profile.shape === "charge") {
        px(h.x, floorY - 10, h.w, 7, `${color}66`);
        const direction = h.kind === "predicted" ? -1 : 1;
        for (let marker = h.x + 18; marker < h.x + h.w - 8; marker += 32) {
          ctx.beginPath();
          ctx.moveTo(marker - direction * 8, floorY - 23);
          ctx.lineTo(marker + direction * 4, floorY - 14);
          ctx.lineTo(marker - direction * 8, floorY - 5);
          ctx.stroke();
        }
      } else if (profile.shape === "slash") {
        for (let slash = 0; slash < 2 + (h.visualTier || 1); slash++) {
          const offset = slash * h.w / (3 + (h.visualTier || 1));
          ctx.beginPath();
          ctx.moveTo(h.x + offset, floorY - 8);
          ctx.lineTo(h.x + offset + h.w * .42, h.y + 10);
          ctx.stroke();
        }
      } else if (profile.shape === "flame") {
        px(h.x, floorY - 8, h.w, 6, `${color}66`);
        for (let marker = h.x + 10; marker < h.x + h.w; marker += 18) {
          const height = 12 + (marker % 4) * 3 + pulse * 7;
          ctx.beginPath();
          ctx.moveTo(marker, floorY - 8);
          ctx.lineTo(marker + Math.sin(time + marker) * 4, floorY - height);
          ctx.stroke();
        }
      } else if (["root", "venom", "splash"].includes(profile.shape)) {
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 4, h.w * .48, 8 + pulse * 4, 0, 0, Math.PI * 2);
        ctx.stroke();
        for (let marker = 0; marker < 3 + (h.visualTier || 1); marker++) {
          const markerX = h.x + h.w * (marker + .5) / (3 + (h.visualTier || 1));
          drawEffectSpark(markerX, floorY - 7 - (marker % 2) * 5, 2, accent);
        }
      } else {
        px(h.x, floorY - 9, h.w, 7, `${color}66`);
        ctx.strokeRect(Math.round(h.x), Math.round(floorY - 12), Math.round(h.w), 10);
      }
    } else {
      ctx.globalAlpha = .72 + pulse * .2;
      ctx.strokeStyle = accent;
      ctx.fillStyle = color;
      if (profile.shape === "lightning") {
        const branches = 2 + (h.visualTier || 1);
        for (let branch = 0; branch < branches; branch++) {
          const offset = (branch - (branches - 1) / 2) * Math.min(18, h.w / branches);
          ctx.lineWidth = branch === Math.floor(branches / 2) ? 6 : 2;
          ctx.beginPath();
          ctx.moveTo(centerX + offset * .2, h.y);
          const segments = 7;
          for (let segment = 1; segment < segments; segment++) {
            const ratio = segment / segments;
            ctx.lineTo(centerX + offset + Math.sin(time * 3 + segment * 4.7 + branch) * 9, h.y + h.h * ratio);
          }
          ctx.lineTo(centerX + offset, floorY);
          ctx.stroke();
        }
        ctx.globalAlpha *= .65;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 3, h.w * .58, 10 + pulse * 5, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (profile.shape === "meteor") {
        const explosion = Math.sin(Math.min(1, activeProgress * 2.2) * Math.PI);
        ctx.globalAlpha = .42;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 4, h.w * (.28 + explosion * .45), h.h * (.08 + explosion * .3), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = .95;
        for (let ray = 0; ray < 10 + (h.visualTier || 1) * 2; ray++) {
          const angle = ray * Math.PI * 2 / (10 + (h.visualTier || 1) * 2);
          ctx.lineWidth = ray % 3 ? 3 : 6;
          ctx.beginPath();
          ctx.moveTo(centerX + Math.cos(angle) * h.w * .12, floorY - 10 + Math.sin(angle) * 8);
          ctx.lineTo(centerX + Math.cos(angle) * h.w * (.34 + explosion * .36), floorY - 10 + Math.sin(angle) * h.h * (.2 + explosion * .35));
          ctx.stroke();
        }
      } else if (profile.shape === "sun") {
        const bloom = Math.sin(Math.min(1,activeProgress * 2.2) * Math.PI);
        ctx.globalAlpha = .28 + bloom * .24;
        ctx.fillStyle = color;
        ctx.beginPath();ctx.ellipse(centerX,floorY - 5,h.w * (.24 + bloom * .28),18 + bloom * 24,0,0,Math.PI * 2);ctx.fill();
        ctx.globalAlpha = .92;
        const rays = 9 + (h.visualTier || 2) * 2;
        for (let ray = 0; ray < rays; ray++) {
          const ratio = ray / Math.max(1,rays - 1);
          const rayX = h.x + ratio * h.w;
          const rayHeight = h.h * (.3 + (ray % 3) * .16) * bloom;
          ctx.strokeStyle = ray % 2 ? color : accent;
          ctx.lineWidth = ray % 3 ? 3 : 6;
          ctx.beginPath();ctx.moveTo(rayX,floorY);ctx.lineTo(rayX + Math.sin(time + ray) * 12,floorY - rayHeight);ctx.stroke();
          drawEffectSpark(rayX,floorY - rayHeight,2 + ray % 2,accent);
        }
      } else if (profile.shape === "dark") {
        const surge = Math.sin(Math.min(1,activeProgress * 2.1) * Math.PI);
        ctx.globalAlpha = .5;
        ctx.fillStyle = "#171221";
        ctx.beginPath();ctx.ellipse(centerX,floorY - 4,h.w * (.28 + surge * .25),16 + surge * 20,0,0,Math.PI * 2);ctx.fill();
        ctx.globalAlpha = .88;
        for (let tendril = 0; tendril < 8 + (h.visualTier || 2); tendril++) {
          const ratio = tendril / (7 + (h.visualTier || 2));
          const tendrilX = h.x + ratio * h.w;
          const height = h.h * (.25 + tendril % 4 * .1) * surge;
          ctx.strokeStyle = tendril % 2 ? color : accent;
          ctx.lineWidth = 3 + tendril % 3;
          ctx.beginPath();
          ctx.moveTo(tendrilX,floorY);
          ctx.bezierCurveTo(tendrilX - 18,floorY - height * .35,tendrilX + 20,floorY - height * .72,tendrilX + Math.sin(tendril + time) * 12,floorY - height);
          ctx.stroke();
        }
      } else if (profile.shape === "flame") {
        ctx.globalAlpha = .3;
        px(h.x, h.y, h.w, h.h, color);
        ctx.globalAlpha = .95;
        for (let flame = h.x + 5; flame < h.x + h.w; flame += 13) {
          const flameHeight = Math.min(h.h, 28 + (flame % 5) * 12 + Math.sin(time * 2 + flame) * 9);
          ctx.lineWidth = 7;
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.moveTo(flame, floorY);
          ctx.quadraticCurveTo(flame + Math.sin(time + flame) * 9, floorY - flameHeight * .55, flame + 3, floorY - flameHeight);
          ctx.stroke();
          ctx.lineWidth = 2;
          ctx.strokeStyle = accent;
          ctx.stroke();
        }
      } else if (profile.shape === "slash") {
        ctx.translate(Math.round(centerX), Math.round(h.y + h.h * .54));
        ctx.lineWidth = 7 + (h.visualTier || 1);
        ctx.beginPath();
        ctx.arc(-h.w * .12, 0, h.w * .62, -1.06, .72);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(-h.w * .17, 4, h.w * .52, -1.02, .65);
        ctx.stroke();
      } else if (profile.shape === "slam") {
        ctx.lineWidth = 4;
        const cracks = 7 + (h.visualTier || 1);
        for (let crack = 0; crack < cracks; crack++) {
          const startX = centerX + (crack - cracks / 2) * 7;
          const endX = h.x + crack * h.w / Math.max(1, cracks - 1);
          ctx.beginPath();
          ctx.moveTo(startX, floorY - 8);
          ctx.lineTo((startX + endX) / 2 + Math.sin(crack) * 12, floorY - 25 - (crack % 3) * 8);
          ctx.lineTo(endX, floorY - 3);
          ctx.stroke();
        }
      } else if (profile.shape === "shield") {
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(centerX, h.y + h.h * .55, h.w * .55, -1.18, 1.18);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (profile.shape === "charge") {
        ctx.lineWidth = 4;
        for (let streak = 0; streak < 5 + (h.visualTier || 1); streak++) {
          const y = h.y + 12 + streak * Math.max(7, h.h / 8);
          const shift = (time * 25 + streak * 31) % Math.max(40, h.w);
          ctx.beginPath();
          ctx.moveTo(h.x + shift, y);
          ctx.lineTo(Math.min(h.x + h.w, h.x + shift + 38 + streak * 5), y - 6);
          ctx.stroke();
        }
      } else if (profile.shape === "root") {
        ctx.lineWidth = 5;
        for (let root = 0; root < 5 + (h.visualTier || 1); root++) {
          const rootX = h.x + h.w * (root + .5) / (5 + (h.visualTier || 1));
          const height = h.h * (.32 + (root % 3) * .18) * Math.sin(Math.min(1, activeProgress * 2.5) * Math.PI);
          ctx.beginPath();
          ctx.moveTo(rootX, floorY);
          ctx.quadraticCurveTo(rootX + Math.sin(root + time) * 14, floorY - height * .55, rootX + Math.cos(root) * 9, floorY - height);
          ctx.stroke();
          px(rootX + Math.cos(root) * 9 - 2, floorY - height - 5, 5, 10, accent);
        }
      } else if (profile.shape === "venom") {
        ctx.globalAlpha = .52;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(centerX, floorY - 4, h.w * .5, 15 + pulse * 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = .9;
        for (let bubble = 0; bubble < 5 + (h.visualTier || 1); bubble++) {
          const bubbleX = h.x + 10 + ((bubble * 29 + time * 9) % Math.max(18, h.w - 20));
          const bubbleY = floorY - 9 - ((bubble * 11 + time * 8) % 34);
          ctx.strokeStyle = bubble % 2 ? color : accent;
          ctx.beginPath();
          ctx.arc(bubbleX, bubbleY, 2 + bubble % 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (profile.shape === "splash") {
        for (let blob = 0; blob < 8 + (h.visualTier || 1); blob++) {
          const angle = blob * Math.PI * 2 / (8 + (h.visualTier || 1));
          const distance = h.w * (.12 + Math.sin(Math.min(1, activeProgress * 2) * Math.PI) * .4);
          ctx.fillStyle = blob % 2 ? color : accent;
          ctx.beginPath();
          ctx.arc(centerX + Math.cos(angle) * distance, floorY - 10 + Math.sin(angle) * distance * .35, 3 + blob % 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        drawEffectSigil(centerX, floorY - 7, Math.min(h.w * .48, 125), color, accent, time * (profile.shape === "dark" ? -.22 : .22), h.visualTier || 2, .8);
      }
    }
    ctx.restore();
  }
}

function drawEffects() {
  for (const p of projectiles.items) {
    if (p.delay > 0) continue;
    const x = renderX(p);
    const y = renderY(p);
    const radiusX = p.radiusX || 24;
    const radiusY = p.radiusY || 17;
    const direction = Math.sign(p.vx) || 1;
    const core = p.coreColor || (p.kind === "karmaWave" ? "#b04783" : "#ffe078");
    ctx.save();
    ctx.globalAlpha = clamp(p.life / 18, 0, 1);
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(direction, 1);
    const crossWave = p.kind.toLowerCase().includes("crosswave");
    if (crossWave) {
      const fade = crossWaveOpacity(p.life,p.maxLife);
      const tier = p.tier || 1;
      const karmaCross = p.kind === "karmaCrossWave";
      const echoes = Math.min(3,1 + Math.floor((p.echoes || 0) / 2));
      ctx.globalAlpha = 1;
      if (karmaCross) {
        drawTaperedSlash(-radiusX * 1.08,-radiusY * 1.02,radiusX * 1.08,radiusY * 1.02,17 + tier,"#1b0d20",fade * .72);
        drawTaperedSlash(-radiusX * 1.08,radiusY * 1.02,radiusX * 1.08,-radiusY * 1.02,17 + tier,"#1b0d20",fade * .72);
      }
      for (let echo = echoes; echo >= 1; echo--) {
        const offset = echo * radiusX * .28;
        const echoAlpha = fade * (.16 / echo);
        drawTaperedSlash(-radiusX - offset,-radiusY,radiusX - offset,radiusY,8 + tier * .5,p.color,echoAlpha);
        drawTaperedSlash(-radiusX - offset,radiusY,radiusX - offset,-radiusY,8 + tier * .5,p.color,echoAlpha);
      }
      ctx.globalCompositeOperation = "lighter";
      drawTaperedSlash(-radiusX * 1.08,-radiusY,radiusX * 1.08,radiusY,15 + tier,p.color,fade * .22);
      drawTaperedSlash(-radiusX * 1.08,radiusY,radiusX * 1.08,-radiusY,15 + tier,p.color,fade * .22);
      drawTaperedSlash(-radiusX,-radiusY,radiusX,radiusY,6 + tier * .5,p.color,fade * .96);
      drawTaperedSlash(-radiusX,radiusY,radiusX,-radiusY,6 + tier * .5,p.color,fade * .96);
      drawTaperedSlash(-radiusX * .94,-radiusY * .94,radiusX * .94,radiusY * .94,1.7 + tier * .22,core,fade);
      drawTaperedSlash(-radiusX * .94,radiusY * .94,radiusX * .94,-radiusY * .94,1.7 + tier * .22,core,fade);
      for (let streak = 0; streak < 3; streak++) {
        const streakY = (streak - 1) * radiusY * .42;
        drawTaperedSlash(-radiusX * (1.65 + streak * .14),streakY,-radiusX * (.48 + streak * .08),streakY - 2,1.3 + tier * .12,streak % 2 ? p.color : core,fade * (.3 - streak * .06));
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = fade;
      drawEffectSpark(0,0,2 + Math.min(3,tier),karmaCross ? "#f2a2dc" : "#fff7df");
      ctx.restore();
      continue;
    }
    for (let echo = (p.echoes || 0) + 1; echo >= 0; echo--) {
      ctx.globalAlpha = clamp(p.life / 18, 0, 1) * (.22 + (echo === 0 ? .7 : .15));
      ctx.fillStyle = echo % 2 ? p.color : core;
      ctx.beginPath();
      ctx.ellipse(-echo * radiusX * .34, 0, radiusX * (1 - echo * .07), radiusY * (1 - echo * .08), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = clamp(p.life / 18, 0, 1);
    ctx.strokeStyle = core;
    ctx.lineWidth = 2 + Math.min(4, (p.tier || 1) * .5);
    ctx.beginPath();
    ctx.moveTo(-radiusX * 1.35, 0);
    ctx.lineTo(radiusX * .88, -radiusY * .58);
    ctx.lineTo(radiusX * .62, 0);
    ctx.lineTo(radiusX * .88, radiusY * .58);
    ctx.closePath();
    ctx.stroke();
    px(radiusX * .15 - 2, -radiusY * .28, 5 + (p.tier || 1), radiusY * .56, p.kind === "karmaWave" ? "#28112f" : "#fff2ad");
    ctx.restore();
  }
  ctx.save();
  for (const p of particles.items) {
    const x = renderX(p);
    const y = renderY(p);
    ctx.globalAlpha = clamp(p.life / 18, 0, 1);
    if (p.glow) {
      ctx.globalAlpha *= .22;
      px(x - p.size, y - p.size, p.size * 3, p.size * 3, p.color);
      ctx.globalAlpha = clamp(p.life / 18, 0, 1);
      drawEffectSpark(x, y, Math.max(1, Math.round(p.size * .75)), p.color);
    } else {
      px(x,y,p.size,p.size,p.color);
    }
  }
  ctx.restore();
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.save();
  for (const f of floaters.items) {
    const x = renderX(f);
    const y = renderY(f);
    ctx.globalAlpha = clamp(f.life / 28, 0, 1); ctx.fillStyle = "#272333"; ctx.fillText(f.text,x + 1,y + 1); ctx.fillStyle = f.color; ctx.fillText(f.text,x,y);
  }
  ctx.restore();
}

function drawBanners() {
  if (stageBanner > 0 && zone) {
    const alpha = clamp(Math.min(stageBanner / 25, (180 - stageBanner) / 25), 0, 1);
    ctx.save(); ctx.globalAlpha = alpha; px(W / 2 - 190,68,380,60,"rgba(35,30,49,.88)");
    ctx.fillStyle = "#ffe0a2"; ctx.textAlign = "center"; ctx.font = "bold 19px monospace"; ctx.fillText(zone.name,W / 2,95);
    ctx.fillStyle = "#d7a77d"; ctx.font = "10px monospace"; ctx.fillText(zone.subtitle,W / 2,113); ctx.restore();
  }
  if (levelBanner > 0) {
    const alpha = clamp(levelBanner / 30, 0, 1);
    ctx.save(); ctx.globalAlpha = alpha; px(W / 2 - 145,145,290,56,"#443447"); ctx.strokeStyle = "#f0b96f"; ctx.strokeRect(W / 2 - 141,149,282,48);
    ctx.fillStyle = "#ffe09b"; ctx.textAlign = "center"; ctx.font = "bold 18px monospace"; ctx.fillText(`LEVEL UP · LV.${player.level}`,W / 2,170);
    ctx.font = "10px monospace"; ctx.fillText("STAT +3 · 모든 스킬 범위와 이펙트 성장",W / 2,188); ctx.restore();
  }
  if (massacreBanner > 0) {
    const alpha = clamp(Math.min(massacreBanner / 30, (330 - massacreBanner) / 25), 0, 1);
    ctx.save(); ctx.globalAlpha = alpha; px(W / 2 - 250,118,500,82,"rgba(53,18,27,.94)");
    ctx.strokeStyle="#e76664";ctx.strokeRect(W/2-246,122,492,74);
    ctx.fillStyle="#ffb0a0";ctx.textAlign="center";ctx.font="bold 14px monospace";ctx.fillText("가렌: 내가 지키려던 사람들을… 모두 베었군.",W/2,151);
    ctx.fillStyle="#ffe0b0";ctx.font="bold 11px monospace";ctx.fillText("이제 이 성문이 네 무덤이다. 황혼 경비대의 이름으로!",W/2,177);ctx.restore();
  }
  if (pursuitBanner > 0) {
    const alpha = clamp(Math.min(pursuitBanner / 30, (300 - pursuitBanner) / 24), 0, 1);
    ctx.save();ctx.globalAlpha=alpha;px(W/2-220,88,440,64,"rgba(30,28,40,.95)");
    ctx.strokeStyle="#c9b57e";ctx.strokeRect(W/2-216,92,432,56);
    ctx.fillStyle="#f1d59e";ctx.textAlign="center";ctx.font="bold 14px monospace";ctx.fillText("왕국 추적대가 도착했습니다",W/2,117);
    ctx.fillStyle="#c7b8bd";ctx.font="10px monospace";ctx.fillText(`WAVE ${worldStates.pursuit.wave} · 도망쳐도 다음 지역까지 추격합니다`,W/2,137);ctx.restore();
  }
  if (cemeteryThought > 0) {
    const elapsed = CEMETERY_THOUGHT_DURATION - cemeteryThought;
    const alpha = clamp(Math.min(elapsed / 28,cemeteryThought / 34),0,1);
    const secondLineAlpha = clamp((elapsed - 62) / 34,0,1);
    ctx.save();
    ctx.globalAlpha = alpha;
    const panelX = W / 2 - 286;
    const panelY = 112;
    px(panelX,panelY,572,86,"rgba(12,10,20,.94)");
    px(panelX + 4,panelY + 4,564,78,"rgba(38,29,47,.91)");
    ctx.strokeStyle="#765b87";
    ctx.lineWidth=2;
    ctx.strokeRect(panelX + 8,panelY + 8,556,70);
    px(panelX + 18,panelY + 16,2,54,"#9a6daf");
    px(panelX + 552,panelY + 16,2,54,"#9a6daf");
    ctx.textAlign="center";
    ctx.fillStyle="#c8afcf";
    ctx.font="bold 8px monospace";
    ctx.fillText("INNER THOUGHT · THE NAMELESS GRAVES",W / 2,panelY + 22);
    ctx.fillStyle="#eee0df";
    ctx.font="bold 12px monospace";
    ctx.fillText("알 수 없는 어두운 기운이 느껴진다….",W / 2,panelY + 46);
    ctx.globalAlpha = alpha * secondLineAlpha;
    ctx.fillStyle="#d9b1c7";
    ctx.font="bold 11px monospace";
    ctx.fillText("대체 누가 묻혀 있는 것이지!",W / 2,panelY + 66);
    ctx.restore();
  }
  if (woundedKnightBanner > 0 && woundedKnightBannerText) {
    const alpha = clamp(woundedKnightBanner / 28,0,1);
    ctx.save();
    ctx.globalAlpha = alpha;
    px(W / 2 - 274,118,548,58,"rgba(27,23,34,.94)");
    ctx.strokeStyle="#a98163";ctx.lineWidth=2;ctx.strokeRect(W/2-270,122,540,50);
    px(W / 2 - 262,130,3,34,"#9d4050");
    px(W / 2 + 259,130,3,34,"#9d4050");
    ctx.fillStyle="#f5d7aa";ctx.textAlign="center";ctx.font="bold 11px monospace";
    ctx.fillText(woundedKnightBannerText,W/2,151);
    ctx.fillStyle="#a997a1";ctx.font="8px monospace";
    ctx.fillText("THE BROKEN OATH",W/2,165);
    ctx.restore();
  }
  const escortedKnight = woundedKnightState();
  if (woundedKnightEscortActive(escortedKnight)) {
    const routeIndex = Math.max(0,WOUNDED_KNIGHT_ROUTE.indexOf(currentZoneId));
    const routeProgress = clamp(routeIndex / (WOUNDED_KNIGHT_ROUTE.length - 1),0,1);
    ctx.save();
    px(14,120,248,61,"rgba(25,24,35,.91)");
    px(17,123,242,55,"#302d3b");
    px(17,123,242,2,"#b58f63");
    ctx.textAlign="left";ctx.fillStyle="#f1d39f";ctx.font="bold 9px monospace";
    ctx.fillText("호위 · 부상당한 기사 세드릭",26,138);
    ctx.fillStyle="#a99da5";ctx.font="8px monospace";
    ctx.fillText("목표: 촌장집 안까지 생존",26,151);
    px(26,158,142,7,"#171823");
    px(27,159,140 * clamp(escortedKnight.hp / escortedKnight.maxHp,0,1),5,escortedKnight.hp < 9 ? "#e24752" : "#c36d59");
    ctx.fillStyle="#f3d2ba";ctx.font="bold 7px monospace";ctx.fillText(`HP ${escortedKnight.hp}/${escortedKnight.maxHp}`,174,164);
    px(26,170,208,3,"#171823");
    px(26,170,208 * routeProgress,3,"#c69a61");
    ctx.restore();
  }
  if (interaction && state === "running") {
    px(W / 2 - 185,H - 92,370,34,"rgba(31,29,43,.92)");
    ctx.fillStyle = "#ffe0a0"; ctx.textAlign = "center"; ctx.font = "bold 11px monospace"; ctx.fillText(`[ F ] ${interaction.label}`,W / 2,H - 71);
  }
  if ((player.comboWindow > 0 || player.attackTimer > 0) && state === "running") {
    const comboText = ["I · SLASH","II · LOW CUT","III · HEAVY CLEAVE"][player.attackCombo];
    px(W / 2 - 62,H - 123,124,20,"rgba(27,26,39,.82)");
    ctx.fillStyle = player.attackCombo === 2 ? "#ffe28a" : "#bcd5e0"; ctx.textAlign = "center"; ctx.font = "bold 9px monospace";
    ctx.fillText(comboText,W / 2,H - 109);
  }
  const boss = enemies.find((e) => e.boss && !e.dead);
  if (boss) {
    px(W / 2 - 230,24,460,38,"rgba(28,22,32,.9)");
    px(W / 2 - 210,50,420,7,"#2b2936");
    px(W / 2 - 208,52,416 * boss.hp / boss.maxHp,3,"#e25b52");
    ctx.textAlign = "center"; ctx.fillStyle = "#f6d09c"; ctx.font = "bold 12px monospace";
    ctx.fillText(`${boss.name} · ${WARDEN_PHASES[bossPhase(boss.hp,boss.maxHp)].name}`,W / 2,42);
  } else {
    const captain = enemies.find((enemy) => enemy.type === "captain" && enemy.npcId === "guard" && !enemy.dead);
    if (captain) {
      px(W / 2 - 230,24,460,38,"rgba(34,20,27,.92)");
      px(W / 2 - 210,50,420,7,"#2b2936");
      px(W / 2 - 208,52,416 * captain.hp / captain.maxHp,3,captain.enraged ? "#ff3d4f" : "#d9775c");
      ctx.textAlign = "center"; ctx.fillStyle = captain.enraged ? "#ff9b94" : "#f6d09c"; ctx.font = "bold 12px monospace";
      ctx.fillText(`황혼 경비대장 가렌 · ${captain.enraged ? "최후의 맹세" : "마을의 복수"}`,W / 2,42);
    }
  }
}

function drawLighting() {
  const apocalypse = apocalypseIntensity(player.karma);
  if (currentZoneId === "dungeon" || zone?.interior) {
    px(0,0,W,H,"rgba(10,10,22,.17)");
    if (apocalypse > 0) px(0,0,W,H,`rgba(54,6,12,${(.08 + apocalypse * .06).toFixed(3)})`);
    return;
  }
  const daylight = daylightAt(clock.minute);
  const darkness = 1 - daylight;
  const glow = sunsetGlowAt(clock.minute);
  if (darkness > .015) px(0,0,W,H,`rgba(6,14,42,${(.32 * darkness).toFixed(3)})`);
  if (glow > .015) px(0,0,W,H,`rgba(190,73,53,${(.095 * glow).toFixed(3)})`);
  if (currentZoneId.startsWith("moonbriar")) {
    px(0,0,W,H,`rgba(23,29,80,${(.045 + darkness * .075).toFixed(3)})`);
  }
  if (currentZoneId.startsWith("sunspire")) {
    const nightTint = .025 + darkness * .055;
    px(0,0,W,H,`rgba(74,29,37,${nightTint.toFixed(3)})`);
    if (daylight > .02) px(0,0,W,H,`rgba(255,149,59,${(.035 * daylight).toFixed(3)})`);
  }
  const aura = karmaAuraTier(player.karma);
  if (aura.darkness > 0) px(0,0,W,H,`rgba(12,7,22,${aura.darkness})`);
  if (apocalypse > 0) {
    px(0,0,W,H,`rgba(42,4,10,${(.07 + apocalypse * .045).toFixed(3)})`);
    ctx.save();
    ctx.globalAlpha = .08 + apocalypse * .04;
    px(0,0,W,18,"#050309");px(0,H - 22,W,22,"#050309");
    px(0,18,16,H - 40,"#050309");px(W - 16,18,16,H - 40,"#050309");
    ctx.restore();
  }
}

function drawWeather() {
  if (zone?.interior) {
    ctx.fillStyle = "#b9adb8";
    ctx.textAlign = "right";
    ctx.font = "bold 8px monospace";
    ctx.fillText(`실내 · ${clock.phase.toUpperCase()}`,W - 12,H - 12);
    return;
  }
  const time = performance.now() * .08;
  if (weatherId === "rain") {
    ctx.save(); ctx.globalAlpha = .32; ctx.strokeStyle = "#a9c4d7"; ctx.lineWidth = 1;
    for (let i = 0; i < 54; i++) {
      const x = (i * 83 + time * 2) % (W + 80) - 40;
      const y = (i * 47 + time * 5) % H;
      ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x - 7,y + 17); ctx.stroke();
    }
    ctx.restore();
  } else if (weatherId === "fog") {
    ctx.save();
    for (let i = 0; i < 5; i++) {
      const x = ((i * 240 + time * .35) % (W + 380)) - 190;
      const y = 105 + (i % 2) * 52 + Math.sin(time * .008 + i * 1.7) * 6;
      const width = 330;
      const height = 42 + i % 3 * 5;
      const fogGradient = ctx.createLinearGradient(x,y,x + width,y);
      fogGradient.addColorStop(0,"rgba(195,198,197,0)");
      fogGradient.addColorStop(.16,"rgba(195,198,197,.4)");
      fogGradient.addColorStop(.5,"rgba(215,211,212,.62)");
      fogGradient.addColorStop(.84,"rgba(195,198,197,.36)");
      fogGradient.addColorStop(1,"rgba(195,198,197,0)");
      ctx.globalAlpha = .18;
      ctx.fillStyle = fogGradient;
      ctx.beginPath();
      ctx.moveTo(x,y + height * .57);
      ctx.bezierCurveTo(
        x + width * .12,y + height * .12,
        x + width * .29,y + height * .22,
        x + width * .43,y + height * .08
      );
      ctx.bezierCurveTo(
        x + width * .62,y - height * .04,
        x + width * .76,y + height * .2,
        x + width,y + height * .45
      );
      ctx.bezierCurveTo(
        x + width * .82,y + height * .96,
        x + width * .61,y + height * .7,
        x + width * .45,y + height * .91
      );
      ctx.bezierCurveTo(
        x + width * .26,y + height * 1.06,
        x + width * .11,y + height * .78,
        x,y + height * .57
      );
      ctx.fill();
      ctx.globalAlpha = .055;
      ctx.fillStyle = "#eef0ef";
      ctx.beginPath();
      ctx.ellipse(x + width * .47,y + height * .54,width * .27,height * .38,.02,0,Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (weatherId === "leaves") {
    ctx.save(); ctx.globalAlpha = .65;
    for (let i = 0; i < 18; i++) {
      const x = (i * 109 + time) % (W + 50) - 25;
      const y = (i * 67 + time * .42 + Math.sin(i + time * .02) * 18) % H;
      px(x,y,4,3,i % 2 ? "#b66b45" : "#d29a55");
    }
    ctx.restore();
  }
  const apocalypse = apocalypseIntensity(player.karma);
  if (apocalypse > 0) {
    ctx.save();
    for (let index = 0; index < 34; index++) {
      const speed = .42 + index % 5 * .07;
      const x = ((index * 97 - time * .13 + Math.sin(index * 2.4 + time * .008) * 19) % (W + 50) + W + 50) % (W + 50) - 25;
      const y = (index * 71 + time * speed) % (H + 36) - 18;
      const ember = index % 6 === 0 || index % 11 === 0;
      ctx.globalAlpha = ember ? .52 + apocalypse * .2 : .18 + apocalypse * .12;
      px(x,y,ember ? 3 : 2,ember ? 4 : 2,ember ? (index % 2 ? "#ff7436" : "#ffc15a") : "#6c5556");
      if (ember) px(x + 1,y - 5,1,4,"rgba(255,91,43,.4)");
    }
    ctx.restore();
  }
  ctx.fillStyle = "#c9b8c0"; ctx.textAlign = "right"; ctx.font = "bold 8px monospace";
  ctx.fillText(`${apocalypse > 0 ? "재의 폭풍" : WEATHER[weatherId]?.name || "맑음"} · ${clock.phase.toUpperCase()}`,W - 12,H - 12);
}

function drawMinimap() {
  const knight = woundedKnightState();
  const knightEvent = knight.zone === currentZoneId && ["waiting","escort"].includes(knight.status)
    ? { active:true,x:knight.x }
    : null;
  minimap.render({
    zone, player, explored: player.explored, exits: zone.exits,
    npcs: zone.npcs || [], npcStates, enemies, secrets: zoneSecrets, event: worldEvent || knightEvent, cleared: zoneSpawnState.cleared
  }, performance.now());
}

function draw() {
  if (!zone) return;
  const drawStarted = performance.now();
  const introVisible = introState.active && (
    state === "intro" || (state === "console" && stateBeforeConsole === "intro")
  );
  if (introVisible) {
    drawIntroCinematic(ctx,introState,{ width:W,height:H,now:performance.now() });
    renderer.present();
    metricDrawMs += (performance.now() - drawStarted - metricDrawMs) * .08;
    return;
  }
  renderCameraX = lerp(previousCameraX, cameraX, renderAlpha);
  renderCameraY = lerp(previousCameraY, cameraY, renderAlpha);
  ctx.clearRect(0,0,W,H);
  drawBackground();
  drawApocalypseBackdrop();
  const shake = screenShake > 0 ? Math.sin(performance.now() * .095) * screenShake * .46 : 0;
  ctx.save();
  ctx.translate(Math.round(-renderCameraX + shake), Math.round(-renderCameraY));
  for (const p of platforms) drawPlatform(p);
  drawZoneDecor();
  drawWorldProps();
  drawKarmaGround();
  drawSecretsAndEvent();
  drawWoundedKnight();
  drawHazards();
  drawCombatEffects("back");
  zoneNpcs().forEach(drawCorpse);
  zoneNpcs().forEach(drawNpc);
  crystals.forEach(drawCrystal);
  pickups.forEach(drawPickup);
  enemies.forEach(drawEnemy);
  drawKarmaAura();
  drawPlayer();
  drawBlessing();
  drawCombatEffects("front");
  drawEffects();
  ctx.restore();
  drawLighting();
  drawWeather();
  drawBanners();
  drawMinimap();
  renderer.present();
  metricDrawMs += (performance.now() - drawStarted - metricDrawMs) * .08;
}

function frame(time) {
  const rawElapsed = time - lastTime || STEP;
  const elapsed = Math.min(100, rawElapsed);
  lastTime = time;
  metricFrameMs += (rawElapsed - metricFrameMs) * .08;
  if (rawElapsed > 34) metricLongFrames += 1;
  metricFrames += 1;
  if (time - metricWindowStart >= 1000) {
    metricFps = metricFrames * 1000 / (time - metricWindowStart);
    metricFrames = 0;
    metricWindowStart = time;
  }
  if (!pausedByVisibility && state === "intro") {
    updateGameIntro(elapsed);
    accumulator = 0;
    renderAlpha = 1;
  } else if (!pausedByVisibility && state === "running") {
    accumulator += elapsed;
    let steps = 0;
    while (accumulator >= STEP && steps < MAX_FIXED_STEPS && state === "running") {
      snapshotSimulation();
      update(1);
      accumulator -= STEP;
      steps += 1;
    }
    if (state !== "running") {
      accumulator = 0;
      renderAlpha = 1;
    } else {
      if (steps === MAX_FIXED_STEPS && accumulator >= STEP) {
        metricDroppedSteps += Math.floor(accumulator / STEP);
        accumulator %= STEP;
      }
      renderAlpha = clamp(accumulator / STEP, 0, 1);
    }
  } else {
    renderAlpha = 1;
  }
  draw();
  requestAnimationFrame(frame);
}

function consoleLine(message, type = "") {
  const line = document.createElement("p");
  line.className = `game2-console-line ${type}`.trim();
  line.textContent = String(message);
  dom.consoleOutput.appendChild(line);
  while (dom.consoleOutput.children.length > 100) dom.consoleOutput.firstElementChild.remove();
  dom.consoleOutput.scrollTop = dom.consoleOutput.scrollHeight;
}

function openDevConsole() {
  if (!dom.console.hidden) return;
  stateBeforeConsole = state === "panel" ? "running" : state;
  if (!dom.panel.hidden) dom.panel.hidden = true;
  state = "console";
  keys.clear();
  dom.console.hidden = false;
  if (!dom.consoleOutput.children.length) {
    consoleLine("Emberfall 개발자 콘솔입니다. help를 입력하세요.", "success");
    consoleLine("명령은 자동 저장되며 eval을 사용하지 않습니다.");
  }
  dom.consoleInput.focus();
}

function closeDevConsole() {
  if (dom.console.hidden) return;
  dom.console.hidden = true;
  state = stateBeforeConsole === "console" ? "running" : stateBeforeConsole;
  if (state === "running") resumeSimulationClock();
  canvas.focus();
}

function consoleNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

async function executeDevCommand(input) {
  const parsed = parseDevCommand(input);
  if (!parsed.command) return;
  consoleLine(`> ${parsed.raw}`, "command");
  consoleHistory.push(parsed.raw);
  if (consoleHistory.length > 100) consoleHistory.shift();
  consoleHistoryIndex = consoleHistory.length;
  const [a, b] = parsed.args;
  let changed = false;
  try {
    if (parsed.command === "help") {
      DEV_HELP.forEach((line) => consoleLine(line));
      return;
    }
    if (parsed.command === "clear") {
      dom.consoleOutput.replaceChildren();
      return;
    }
    if (parsed.command === "skip") {
      if (!introState.active || stateBeforeConsole !== "intro") {
        throw new Error("현재 재생 중인 새 게임 인트로가 없습니다");
      }
      consoleLine("INTRO SKIPPED · 현재 더스크베일 시작 상태로 이동합니다", "success");
      finishGameIntro("skip");
      return;
    }
    if (parsed.command === "karma") {
      const value = consoleNumber(a);
      if (value == null) throw new Error("사용법: karma 500");
      setKarma(value, "[DEBUG] 카르마 변경");
      consoleLine(`KARMA = ${player.karma} · ${karmaTier(player.karma).name}`, "success");
      return;
    }
    if (parsed.command === "level") {
      const value = Math.max(1, Math.floor(consoleNumber(a, 0)));
      if (!value) throw new Error("사용법: level 10");
      const difference = Math.max(0, value - player.level);
      player.level = value; player.xp = 0; player.xpNeed = xpFor(value); player.statPoints += difference * 3;
      unlockSkills(); recalcStats(true); changed = true;
      consoleLine(`LEVEL = ${value} · STAT POINT +${difference * 3}`, "success");
    } else if (parsed.command === "gold") {
      const value = consoleNumber(a);
      if (value == null) throw new Error("사용법: gold 5000");
      gold = Math.max(0, Math.floor(value)); changed = true; updateHud();
      consoleLine(`GOLD = ${gold}`, "success");
    } else if (parsed.command === "day") {
      const value = Math.max(1, Math.floor(consoleNumber(a, 0)));
      if (!value) throw new Error("사용법: day 12");
      clock.day = value; schedulePursuitForCurrentDay(); spawnPursuitParty(); changed = true; updateHud();
      consoleLine(`DAY = ${clock.day}`, "success");
    } else if (parsed.command === "time") {
      const match = String(a || "").match(/^(\d{1,2}):(\d{2})$/);
      if (!match) throw new Error("사용법: time 22:00");
      const hour = clamp(Number(match[1]), 0, 23); const minute = clamp(Number(match[2]), 0, 59);
      clock.minute = hour * 60 + minute; changed = true; updateHud();
      consoleLine(`TIME = ${clock.format()}`, "success");
    } else if (parsed.command === "heal") {
      player.hp = player.maxHp; player.mana = player.maxMana; player.stamina = player.maxStamina; changed = true; updateHud();
      consoleLine("HP / MP / STAMINA 완전 회복", "success");
    } else if (parsed.command === "ready") {
      player.hp = player.maxHp;
      player.mana = player.maxMana;
      player.stamina = player.maxStamina;
      player.cooldowns = {};
      changed = true;
      updateHud();
      consoleLine("모든 자원과 스킬 재사용 대기시간 초기화", "success");
    } else if (parsed.command === "skill") {
      const slot = { q:0, w:1, e:2, r:3 }[String(b || "").toLowerCase()];
      if (!SKILLS[a] || slot == null) throw new Error("사용법: skill meteor q");
      player.ownedSkills[a] = true;
      player.skillSlots[slot] = a;
      player.cooldowns[a] = 0;
      changed = true;
      updateHud();
      consoleLine(`${String(b).toUpperCase()} = ${SKILLS[a].name}`, "success");
    } else if (parsed.command === "jump") {
      player.vy = -player.jump;
      player.grounded = false;
      changed = true;
      consoleLine("JUMP 상태로 전환", "success");
    } else if (parsed.command === "fall") {
      player.y = H + 180;
      player.vy = 10;
      player.grounded = false;
      changed = true;
      consoleLine("추락 복구 테스트 시작", "success");
    } else if (parsed.command === "zone") {
      const ids = ["village","elderHill","elderHouse","outskirts1","outskirts2","bossArena","dungeon","moonbriarForest","moonbriarVillage","sunspirePass","sunspireTown","castleApproach","castleHall"];
      if (!ids.includes(a)) throw new Error(`맵 ID: ${ids.join(", ")}`);
      await setupZone(a); changed = true;
      consoleLine(`ZONE = ${a}`, "success");
    } else if (parsed.command === "pos") {
      const value = consoleNumber(a);
      if (value == null) throw new Error("사용법: pos 1580");
      player.x = clamp(value, zonePlayerMinX(), zone.width - player.w);
      player.y = floorAt(player.x + player.w / 2) - player.h;
      player.vx = 0; player.vy = 0; player.grounded = true;
      changed = true;
      consoleLine(`POSITION X = ${Math.round(player.x)}`, "success");
    } else if (parsed.command === "spawn") {
      if (!ENEMIES[a]) throw new Error(`알 수 없는 몬스터: ${a}`);
      const count = clamp(Math.floor(consoleNumber(b, 1)), 1, 20);
      for (let index = 0; index < count; index++) {
        const x = clamp(player.x + player.face * (120 + index * 52), 20, zone.width - 90);
        enemies.push(makeEnemy([a, x, floorAt(x)], clock.isNight));
      }
      consoleLine(`${ENEMIES[a].name} × ${count} 생성`, "success");
    } else if (parsed.command === "killall") {
      const targets = enemies.filter((enemy) => !enemy.dead);
      targets.forEach(killEnemy);
      changed = true; consoleLine(`${targets.length}개 적 제거`, "success");
    } else if (parsed.command === "give") {
      if (!ITEMS[a]) throw new Error(`알 수 없는 아이템: ${a}`);
      const count = clamp(Math.floor(consoleNumber(b, 1)), 1, 999);
      if (["consumable","reset"].includes(ITEMS[a].type)) player.counts[a] = (player.counts[a] || 0) + count;
      else player.owned[a] = true;
      changed = true; updateHud(); consoleLine(`${ITEMS[a].name} × ${count} 지급`, "success");
    } else if (parsed.command === "equip") {
      const item = ITEMS[a];
      if (!item || !["weapon","armor","accessory"].includes(item.type)) throw new Error("사용법: equip moonblade");
      player.owned[a] = true;
      player.equipped[item.type] = a;
      recalcStats(true);
      changed = true;
      consoleLine(`${item.name} 장착 · ${item.type.toUpperCase()} DESIGN ${equipmentVisual(a,item.type)?.design || "DEFAULT"}`, "success");
    } else if (parsed.command === "npc") {
      const npc = NPCS.find((entry) => entry.id === b);
      if (!["kill","revive"].includes(a) || !npc) throw new Error("사용법: npc kill|revive elder");
      const ns = npcStates[npc.id];
      if (a === "kill" && ns.alive) {
        enemies = enemies.filter((enemy) => enemy.npcId !== npc.id);
        ns.hp = 0;
        killNpc(npc, npcWorldX(npc), npc.zone);
      }
      if (a === "revive") {
        enemies = enemies.filter((enemy) => enemy.npcId !== npc.id);
        const abyssHostile = worldHostile(player.karma) && npc.id !== "guard";
        npcStates[npc.id] = {
          alive:true,hp:npc.hp,deathDay:null,deathMinute:null,deathX:npc.x,deathZone:npc.zone,
          lootAvailable:true,flee:0,hurt:0,hostile:abyssHostile,abyssHostile,
          roamX:npc.x,prevRoamX:npc.x,roamY:null,prevRoamY:null,roamVY:0,roamGrounded:true,
          roamDir:npc.id.length % 2 ? 1 : -1,roamPause:0,roamDistance:0
        };
        if (npc.zone === currentZoneId && abyssHostile) spawnNpcDefender(npc);
      }
      changed = true; consoleLine(`${npc.name} ${a === "kill" ? "사망" : "부활"}`, "success");
    } else if (parsed.command === "massacre") {
      let deaths = 0;
      for (const id of VILLAGE_CIVILIAN_IDS) {
        const npc = NPCS.find((entry) => entry.id === id);
        const ns = npcStates[id];
        if (!npc || !ns?.alive) continue;
        enemies = enemies.filter((enemy) => enemy.npcId !== id);
        ns.hp = 0;
        killNpc(npc,npcWorldX(npc),npc.zone);
        deaths += 1;
      }
      triggerGuardRevenge();
      changed = true;
      consoleLine(`DUSKVALE 주민 ${deaths}명 제거 · GAREN ${garenAttackReady() ? "READY" : "LOCKED"}`, "success");
    } else if (parsed.command === "house") {
      if (!["intact","burning","burned"].includes(a)) throw new Error("사용법: house intact|burning|burned");
      if (a === "burning") {
        const doomed = !!npcStates.elder?.alive;
        startElderHouseFire(worldStates,clock.day,clock.minute,{ elderDoomed:doomed });
        if (doomed) {
          const elder = elderNpc();
          const ns = npcStates.elder;
          ns.hostile = false;
          ns.abyssHostile = false;
          ns.burnX = elder.x;
          ns.prevBurnX = elder.x;
          ns.burnFace = -1;
          enemies = enemies.filter((enemy) => enemy.npcId !== "elder");
        }
      } else {
        worldStates.elderHouse = {
          stage:a,fireDay:null,fireMinute:null,elderDoomed:false,
          confronted:false,dialogueStep:0,curseActive:false,elderDiedInFire:false
        };
      }
      changed = true; consoleLine(`ELDER HOUSE = ${a}`, "success");
    } else if (parsed.command === "monsters") {
      if (!["clear","reset"].includes(a)) throw new Error("사용법: monsters clear|reset [zone]");
      const targetId = b || currentZoneId;
      const targetZone = targetId === currentZoneId ? zone : await loader.load(targetId);
      if (a === "clear") {
        [...(targetZone.enemies || []), ...(targetZone.nightEnemies || [])].forEach((spawn, index) => {
          const group = index < (targetZone.enemies || []).length ? "day" : "night";
          const groupIndex = group === "day" ? index : index - targetZone.enemies.length;
          markSpawnDefeated(worldStates.defeatedSpawns, spawnRecord(targetId, group, spawn, groupIndex).id, clock.day);
        });
        if (targetId === currentZoneId) enemies.filter((enemy) => enemy.persistentSpawn).forEach((enemy) => { enemy.dead = true; });
      } else {
        clearDefeatedSpawns(worldStates.defeatedSpawns, targetId);
        if (targetId === currentZoneId) await setupZone(targetId, player.x);
      }
      if (targetId === currentZoneId) zoneSpawnState = zoneClearStatus(targetId, targetZone, worldStates.defeatedSpawns);
      changed = true; consoleLine(`${targetId} 몬스터 기록 ${a === "clear" ? "토벌 완료" : "초기화"}`, "success");
    } else if (parsed.command === "pursuit") {
      if (a !== "now") throw new Error("사용법: pursuit now");
      if (player.karma < 1000) throw new Error("KARMA 1000 이상에서만 추적대가 출현합니다");
      worldStates.pursuit.pending = true; spawnPursuitParty(true); changed = true;
      consoleLine("왕국 추적대 강제 출현", "success");
    } else if (parsed.command === "garen") {
      const allowed = ["shield","dash","spear","spearStorm","slam","banner","oath"];
      const requestedPattern = allowed.find((entry) => entry.toLowerCase() === String(a || "").toLowerCase());
      if (!requestedPattern) throw new Error(`사용법: garen ${allowed.join("|")}`);
      const captain = enemies.find((enemy) => enemy.type === "captain" && enemy.npcId === "guard" && !enemy.dead);
      if (!captain) throw new Error("현재 맵에 적대 상태의 가렌이 없습니다");
      if (["spearStorm","oath"].includes(requestedPattern) && captain.hp / captain.maxHp >= .42) {
        captain.hp = Math.max(1,Math.floor(captain.maxHp * .4));
      }
      captain.patternTimer = 999;
      executeCaptainPattern(captain,requestedPattern);
      updateHud();
      consoleLine(`GAREN PATTERN = ${requestedPattern}`, "success");
      return;
    } else if (parsed.command === "wounded") {
      const action = String(a || "").toLowerCase();
      if (!["reset","waiting","execute","escort","failed","bones","rescued"].includes(action)) {
        throw new Error("사용법: wounded reset|waiting|execute|escort|failed|bones|rescued");
      }
      worldStates.woundedKnight = mergeWoundedKnightState();
      const knight = woundedKnightState();
      if (action === "execute") {
        chooseWoundedKnight(knight,"execute",clock.day,clock.minute);
        await setupZone(WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x - 110);
      } else if (action === "escort") {
        chooseWoundedKnight(knight,"spare",clock.day,clock.minute);
        await setupZone(WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x - 110);
      } else if (action === "failed") {
        chooseWoundedKnight(knight,"spare",clock.day,clock.minute);
        failWoundedKnightEscort(knight,clock.day,clock.minute,WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x);
        knight.y = 438;
        await setupZone(WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x - 110);
      } else if (action === "bones") {
        finishWoundedKnightExecution(
          knight,clock.day - WOUNDED_KNIGHT.boneAfterDays,clock.minute,
          WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x,WOUNDED_KNIGHT.x + 58,430
        );
        knight.headVx = 0;knight.headVy = 0;knight.headY = 430;
        await setupZone(WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x - 110);
      } else if (action === "rescued") {
        chooseWoundedKnight(knight,"spare",clock.day,clock.minute);
        completeWoundedKnightEscort(knight);
        knight.zone = "elderHouse";knight.x = 520;knight.y = 438;knight.prevX = 520;knight.prevY = 438;
        await setupZone("elderHouse",430);
      } else {
        await setupZone(WOUNDED_KNIGHT.zone,WOUNDED_KNIGHT.x - 110);
      }
      changed = true;
      consoleLine(`WOUNDED KNIGHT = ${woundedKnightState().status}`, "success");
    } else if (parsed.command === "god") {
      if (!["on","off"].includes(a)) throw new Error("사용법: god on|off");
      debugGodMode = a === "on";
      if (debugGodMode) player.hp = player.maxHp;
      updateHud();
      consoleLine(`GOD MODE = ${debugGodMode ? "ON" : "OFF"}`, "success");
      return;
    } else if (parsed.command === "save") {
      saves.save("auto", serialize()); consoleLine("AUTOSAVE 저장 완료", "success"); return;
    } else if (parsed.command === "debug") {
      consoleLine(`ZONE ${currentZoneId} · X ${Math.round(player.x)} · KARMA ${player.karma}`);
      consoleLine(`SPAWN ${zoneSpawnState.defeated}/${zoneSpawnState.total} · PURSUIT ${worldStates.pursuit.active ? "ACTIVE" : worldStates.pursuit.pending ? "PENDING" : "IDLE"}`);
      consoleLine(`WOUNDED ${woundedKnightState().status.toUpperCase()} · HP ${woundedKnightState().hp}/${woundedKnightState().maxHp} · ESCORT KILLS ${woundedKnightState().escortKills || 0}`);
      consoleLine(`RENDER ${renderer.gpu ? "WEBGL2" : "CANVAS2D"} · ERRORS ${runtimeErrors}`);
      consoleLine(`SKILL ${lastSkillDebug.id} · T${lastSkillDebug.tier} · RANGE ${lastSkillDebug.range} · FX ${combatEffects.items.length}`);
      return;
    } else if (parsed.command === "resetworld") {
      if (a !== "CONFIRM") throw new Error("정말 초기화하려면 resetworld CONFIRM");
      saves.clearAuto();
      await resetNewGame();
      changed = true; consoleLine("자동 저장 세계를 초기화했습니다. 수동 슬롯은 유지됩니다.", "success");
    } else {
      const suggestion = commandSuggestion(parsed.command);
      throw new Error(suggestion ? `알 수 없는 명령어. 혹시 '${suggestion}'?` : `명령어 목록: ${DEV_COMMANDS.join(", ")}`);
    }
    if (changed) {
      updateHud();
      autosave(`[DEBUG] ${parsed.raw}`);
    }
  } catch (error) {
    consoleLine(error.message || String(error), "error");
  }
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else shell.requestFullscreen?.();
}

function handleKeyDown(event) {
  const managed = ["ArrowLeft","ArrowRight","ArrowUp","Space","ShiftLeft","ShiftRight","KeyA","KeyF","KeyL","KeyM","KeyC","KeyI","KeyH","KeyQ","KeyW","KeyE","KeyR","Digit1","Digit2","Digit3","Digit4","Slash","Escape","Enter","Backquote"];
  if (managed.includes(event.code)) event.preventDefault();
  if (event.code === "Backquote") {
    if (dom.console.hidden) openDevConsole();
    else closeDevConsole();
    return;
  }
  if (state === "console") return;
  if (state === "intro") {
    if (!event.repeat && ["Enter","Space"].includes(event.code)) advanceGameIntro();
    return;
  }
  if (event.repeat && ["KeyF","KeyL","KeyM","KeyC","KeyI","KeyH","KeyQ","KeyW","KeyE","KeyR","Digit1","Digit2","Digit3","Digit4","Escape"].includes(event.code)) return;
  if (event.code === "Slash") {
    keys.add("Slash");
    dom.hostile.hidden = state !== "running";
    return;
  }
  if (event.code === "Escape" && state === "panel") return closePanel();
  if (event.code === "KeyM") return minimap.toggle();
  if (event.code === "KeyC") return panelType === "stats" ? closePanel() : openPanel("stats");
  if (event.code === "KeyI") return panelType === "inventory" ? closePanel() : openPanel("inventory");
  if (state === "ready" && event.code === "Enter") return beginGame();
  if (state !== "running") return;
  if (event.code === "KeyA") startAttack();
  else if (event.code === "KeyF") interact();
  else if (event.code === "KeyL") attemptBurnHouse();
  else if (event.code === "KeyH") quickHeal();
  else if (["KeyQ","KeyW","KeyE","KeyR"].includes(event.code)) useSkill(["KeyQ","KeyW","KeyE","KeyR"].indexOf(event.code));
  else if (/^Digit[1-4]$/.test(event.code)) useItem(player.itemSlots[Number(event.code.slice(-1)) - 1]);
  keys.add(event.code);
}

function handleKeyUp(event) {
  keys.delete(event.code);
  if (event.code === "Slash") dom.hostile.hidden = npcAttackUnlocked(player.karma) ? false : true;
}

addEventListener("keydown", handleKeyDown);
addEventListener("keyup", handleKeyUp);
canvas.addEventListener("pointerup", () => {
  if (state === "intro") advanceGameIntro();
});
addEventListener("blur", () => {
  keys.clear();
  dom.hostile.hidden = !npcAttackUnlocked(player.karma);
});
document.addEventListener("visibilitychange", () => {
  pausedByVisibility = document.hidden;
  if (!document.hidden) {
    resumeSimulationClock();
  }
});
document.addEventListener("fullscreenchange", () => {
  const icon = dom.fullscreen.querySelector("i");
  icon.className = document.fullscreenElement ? "fa-solid fa-compress" : "fa-solid fa-expand";
  dom.fullscreen.lastChild.textContent = document.fullscreenElement ? " EXIT" : " FULL";
});

dom.start.addEventListener("click", async () => {
  if (state === "dead") await respawn();
  else if (dom.newGame.dataset.confirm === "true") {
    dom.newGame.dataset.confirm = "false";
    dom.overlayTitle.textContent = "Emberfall로 돌아가기";
    dom.overlayCopy.textContent = `LV.${player.level} · DAY ${clock.day} · ${zone.name}에서 모험을 계속합니다.`;
    dom.start.textContent = "모험 계속하기";
    dom.newGame.textContent = "게임 새로 시작하기";
  }
  else if (introRequiredOnStart) startGameIntro();
  else beginGame();
});
dom.newGame.addEventListener("click", async () => {
  if (dom.newGame.dataset.confirm !== "true") {
    dom.overlayTitle.textContent = "정말 새 게임을 시작할까요?";
    dom.overlayCopy.textContent = "자동 저장만 초기화됩니다. SLOT 1–3의 수동 저장은 안전하게 유지됩니다.";
    dom.start.textContent = "취소";
    dom.newGame.textContent = "정말 새로 시작";
    dom.newGame.dataset.confirm = "true";
    return;
  }
  saves.clearAuto();
  await resetNewGame();
  dom.newGame.dataset.confirm = "false";
  dom.newGame.textContent = "게임 새로 시작하기";
  startGameIntro();
});
dom.stats.addEventListener("click", () => openPanel("stats"));
dom.inventory.addEventListener("click", () => openPanel("inventory"));
dom.save.addEventListener("click", () => openPanel("save"));
dom.fullscreen.addEventListener("click", toggleFullscreen);
dom.minimapToggle.addEventListener("click", () => minimap.toggle());
dom.minimap.addEventListener("click", () => minimap.toggle());
dom.panelClose.addEventListener("click", closePanel);
dom.panelBody.addEventListener("click", (event) => {
  const origin = event.target;
  if (!(origin instanceof Element)) return;
  const target = origin.closest(
    "[data-stat-plus],[data-stat-minus],[data-action],[data-equip],[data-use],[data-skill-slot],[data-item-slot],[data-buy],[data-buy-skill],[data-service],[data-save-slot],[data-load-slot]"
  );
  if (target && dom.panelBody.contains(target)) void handlePanelAction(target);
});
dom.panelBody.addEventListener("change", async (event) => {
  if (event.target.id !== "g2-import-file" || !event.target.files?.[0]) return;
  try {
    const data = await saves.importFile(event.target.files[0], 1);
    await loadSave(data);
    closePanel();
    state = "running";
    resumeSimulationClock();
    toast("JSON 저장 파일을 SLOT 1에 가져왔습니다");
  } catch {
    toast("올바른 Emberfall 저장 파일이 아닙니다");
  }
});
dom.consoleClose.addEventListener("click", closeDevConsole);
dom.consoleInput.addEventListener("keydown", async (event) => {
  event.stopPropagation();
  if (event.code === "Backquote" || event.code === "Escape") {
    event.preventDefault(); closeDevConsole(); return;
  }
  if (event.code === "Enter") {
    event.preventDefault();
    const value = dom.consoleInput.value;
    dom.consoleInput.value = "";
    await executeDevCommand(value);
  } else if (event.code === "ArrowUp") {
    event.preventDefault();
    consoleHistoryIndex = Math.max(0, consoleHistoryIndex - 1);
    dom.consoleInput.value = consoleHistory[consoleHistoryIndex] || "";
  } else if (event.code === "ArrowDown") {
    event.preventDefault();
    consoleHistoryIndex = Math.min(consoleHistory.length, consoleHistoryIndex + 1);
    dom.consoleInput.value = consoleHistory[consoleHistoryIndex] || "";
  } else if (event.code === "Tab") {
    event.preventDefault();
    const suggestion = commandSuggestion(dom.consoleInput.value);
    if (suggestion) dom.consoleInput.value = `${suggestion} `;
  }
});
dom.sound.addEventListener("click", () => {
  soundOn = !soundOn;
  dom.sound.querySelector("i").className = soundOn ? "fa-solid fa-volume-high" : "fa-solid fa-volume-xmark";
  if (soundOn) tone(520, .06);
});

document.querySelectorAll(".game2-touch button").forEach((button) => {
  const code = { left: "ArrowLeft", right: "ArrowRight", run: "ShiftLeft", jump: "Space", attack: "KeyA", potion: "KeyH", interact: "KeyF", skill: "KeyQ" }[button.dataset.key];
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (code === "KeyA") startAttack();
    else if (code === "KeyH") quickHeal();
    else if (code === "KeyF") interact();
    else if (code === "KeyQ") useSkill(0);
    else {
      keys.add(code);
      button.classList.add("is-pressed");
    }
  });
  for (const name of ["pointerup","pointercancel","pointerleave"]) button.addEventListener(name, () => {
    keys.delete(code);
    button.classList.remove("is-pressed");
  });
});

window.__EMBERFALL_DEBUG__ = {
  state: () => ({
    state, zone: currentZoneId, player: {
      x: player.x, hp: player.hp, level: player.level, karma: player.karma,
      gold, mana: player.mana, stamina: player.stamina, sprinting: player.sprinting,
      combo: player.attackCombo, comboWindow: player.comboWindow,
      equipped: { ...player.equipped },
      weaponDesign: equippedWeaponVisual().design,
      armorDesign: equippedArmorVisual().design
    },
    clock: clock.serialize(), npcs: structuredClone(npcStates), bosses: { ...bosses },
    worldStates: structuredClone(worldStates), zoneSpawnState: { ...zoneSpawnState },
    exploration: structuredClone(player.explored), secrets: structuredClone(player.foundSecrets),
    event: worldEvent ? { id: worldEvent.id, active: worldEvent.active, x: worldEvent.x } : null,
    weather: weatherId, minimapExpanded: minimap.expanded,
    intro: {
      active:introState.active,
      completed:introState.completed,
      skipped:introState.skipped,
      scene:introCurrentScene(introState)?.id || "none",
      sceneIndex:introState.sceneIndex,
      sceneTime:introState.sceneTime
    },
    renderer: renderer.gpu ? "WebGL2" : "Canvas2D", cachedZones: loader.cachedZones,
    pools: { particles: particles.items.length, projectiles: projectiles.items.length, hazards: hazards.items.length },
    visuals: {
      apocalypse:apocalypseIntensity(player.karma),
      firefalls:Array.from({ length:5 },(_, index) => firefallState(performance.now(),index,W,H)).filter((fall) => fall.active).length,
      villageCivilianDeaths:VILLAGE_CIVILIAN_IDS.filter((id) => !npcStates[id]?.alive).length,
      garenAttackReady:garenAttackReady(),
      corpse:"detailed-prone",
      houseFire:"layered-collapse"
    }
  }),
  teleport: async (zoneId, x) => setupZone(zoneId, x),
  setClock: (day, minute) => { clock.day = day; clock.minute = minute; updateHud(); },
  damageNpc: (id, amount = 99) => {
    const npc = NPCS.find((entry) => entry.id === id);
    if (!npc || !npcStates[id].alive) return false;
    npcStates[id].hp -= amount;
    if (npcStates[id].hp <= 0) killNpc(npc);
    return true;
  },
  hurt: (amount = 999) => { player.hp -= amount; if (player.hp <= 0) die(); },
  grant: () => {
    player.level = 10; player.statPoints += 15; gold += 5000; setKarma(Math.max(player.karma, 100), "[DEBUG] grant");
    for (const id of Object.keys(ITEMS)) {
      if (ITEMS[id].type === "consumable" || ITEMS[id].type === "reset") player.counts[id] = 9;
      else player.owned[id] = true;
    }
    unlockSkills();
    recalcStats();
  },
  equip: (id) => {
    const item = ITEMS[id];
    if (!item || !["weapon","armor","accessory"].includes(item.type)) return false;
    player.owned[id] = true;
    player.equipped[item.type] = id;
    recalcStats(true);
    return true;
  },
  save: (slot = "auto") => saves.save(slot, serialize())
};

async function boot() {
  initNpcStates();
  const auto = saves.load("auto");
  if (auto) {
    introRequiredOnStart = false;
    await loadSave(auto);
    dom.overlayTitle.textContent = "Emberfall로 돌아가기";
    dom.overlayCopy.textContent = `LV.${player.level} · DAY ${clock.day} · ${zone.name}에서 모험을 계속합니다.`;
    dom.start.textContent = "모험 계속하기";
    dom.newGame.hidden = false;
  } else {
    await resetNewGame();
    introRequiredOnStart = true;
    dom.overlayTitle.textContent = "Emberfall에 오신 걸 환영합니다";
    dom.overlayCopy.textContent = "새 모험은 카르마의 기원을 보여주는 프롤로그에서 시작합니다.";
    dom.start.textContent = "새 모험 시작";
  }
  booted = true;
  updateHud();
  draw();
  requestAnimationFrame(frame);
}

boot().catch((error) => {
  console.error("Emberfall boot failed", error);
  dom.overlayTitle.textContent = "게임 초기화 오류";
  dom.overlayCopy.textContent = "페이지를 새로고침해 주세요.";
});

})();

