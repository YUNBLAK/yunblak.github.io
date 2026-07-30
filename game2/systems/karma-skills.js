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

export function skillForKarma(id, baseSkill, karma) {
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
