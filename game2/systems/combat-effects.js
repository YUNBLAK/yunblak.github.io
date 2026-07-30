const COMBAT_EFFECT_ARCANE_TYPES = new Set([
  "mage", "royalMage", "briarMage", "ghost", "lich", "flameDjinn", "priest"
]);
const COMBAT_EFFECT_BEAST_TYPES = new Set(["wolf", "hound", "moonstalker"]);
const COMBAT_EFFECT_MARKSMAN_TYPES = new Set(["ranger", "hunter", "crossbow"]);
const COMBAT_EFFECT_ELITE_TYPES = new Set([
  "captain", "inquisitor", "judge", "shieldKnight", "guard", "spellblade", "adventurer", "soldier"
]);

export function enemyEffectProfile(enemy = {}) {
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

export function hazardEffectProfile(kind = "impact", friendly = false) {
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
