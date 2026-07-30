export const ENEMIES = {
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

export const NIGHT_MULTIPLIER = {
  hp: 1.25,
  damage: 1.2,
  xp: 1.35,
  gold: 1.3
};
