export const ITEMS = {
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

export const SHOPS = {
  alchemy: { title: "연금술 상점", owner: "연금술사 미아", items: ["potion", "high_potion", "mana_potion", "stamina_potion", "haste_potion"] },
  smith: { title: "왕실 대장간", owner: "대장장이 브람", items: ["iron_sword", "knight_sword", "chain_armor", "dusk_armor"] },
  magic: { title: "별빛 마법 상점", owner: "마법사 세레나", items: ["magic_ring"] },
  traveler: { title: "여행자의 비밀 상점", owner: "수상한 여행자", items: ["memory_potion", "cursed_sword"] }
  ,moon: { title:"Moonbriar 월석 상점",owner:"예언자 아일라",items:["moon_charm","moonblade","mana_potion"] }
  ,sunforge: { title:"Sunspire 태양 대장간",owner:"대장장이 라심",items:["sunblade","sun_armor","high_potion"] }
  ,sunmagic: { title:"태양술 주문 상점",owner:"태양술사 이슈라",items:["magic_ring","mana_potion","haste_potion"] }
};

export const DEFAULT_COUNTS = {
  potion: 2,
  high_potion: 0,
  mana_potion: 0,
  stamina_potion: 0,
  haste_potion: 0,
  memory_potion: 0
};
