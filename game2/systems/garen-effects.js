const GAREN_EFFECT_PROFILES = {
  shield: { color:"#4f7392",accent:"#dff5ff",telegraph:"#9cc8e4",tier:4 },
  dash: { color:"#9d2638",accent:"#ffd27d",telegraph:"#df6d65",tier:4 },
  spear: { color:"#7f3445",accent:"#ffe0a3",telegraph:"#d99a79",tier:4 },
  spearStorm: { color:"#a22636",accent:"#ffbe72",telegraph:"#ef7464",tier:5 },
  slam: { color:"#8d3b31",accent:"#ffd08a",telegraph:"#e59a62",tier:4 },
  oath: { color:"#7b1830",accent:"#ffdf96",telegraph:"#e65d68",tier:5 }
};

export function garenEffectProfile(pattern = "dash",rage = false) {
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
