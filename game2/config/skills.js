export const SKILLS = {
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

export const DEFAULT_SKILL_SLOTS = ["ember_slash", "iron_guard", "warrior_blessing", "sunset_execution"];
export const DEFAULT_ITEM_SLOTS = ["potion", "high_potion", "mana_potion", "stamina_potion"];
