export const FIELD_EVENTS = [
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

export const WEATHER = {
  clear: { name: "맑음", fire: 1, lightning: 1 },
  rain: { name: "비", fire: .8, lightning: 1.25 },
  fog: { name: "안개", fire: 1, lightning: 1, enemyVision: .78 },
  leaves: { name: "낙엽 바람", fire: 1.15, lightning: 1 }
};

export function dailyWeather(day, zoneId) {
  if (zoneId === "dungeon") return "fog";
  const options = ["clear", "leaves", "rain", "clear", "fog"];
  const seed = day * 17 + zoneId.length * 11;
  return options[seed % options.length];
}

export function dailyEvent(day, zoneId, isNight) {
  const candidates = FIELD_EVENTS.filter((event) => event.zones.includes(zoneId) && (!event.nightOnly || isNight));
  if (!candidates.length) return null;
  return candidates[(day * 13 + zoneId.length * 7) % candidates.length];
}
