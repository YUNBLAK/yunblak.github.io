const freezeProfile = (profile) => Object.freeze(profile);

export const WEAPON_VISUALS = Object.freeze({
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

export const ARMOR_VISUALS = Object.freeze({
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

export function weaponVisual(id) {
  return WEAPON_VISUALS[id] || WEAPON_VISUALS.rusty_sword;
}

export function armorVisual(id) {
  return ARMOR_VISUALS[id] || ARMOR_VISUALS.cloth;
}

export function equipmentVisual(id, type) {
  if (type === "weapon") return WEAPON_VISUALS[id] || null;
  if (type === "armor") return ARMOR_VISUALS[id] || null;
  return null;
}
