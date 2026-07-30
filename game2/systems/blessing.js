export const BLESSINGS = {
  warrior: {
    id: "warrior", name: "전사의 가호", icon: "✦", attackSpeed: .30, defense: 4,
    duration: 720, cooldown: 1500, color: "#ffe39a", quote: "빛은 아직 그대를 버리지 않았다."
  },
  demon: {
    id: "demon", name: "악마의 가호", icon: "♰", attackSpeed: .40, defense: 3,
    duration: 720, cooldown: 1500, color: "#d84661", lifeSteal: .08, quote: "심연은 그대의 검을 기억한다."
  }
};

export function blessingForKarma(karma) {
  return karma >= 500 ? BLESSINGS.demon : BLESSINGS.warrior;
}

export function blessingDefense(buff) {
  return buff?.timer > 0 ? BLESSINGS[buff.variant]?.defense || 0 : 0;
}

export function blessingAttackMultiplier(buff) {
  return buff?.timer > 0 ? 1 - (BLESSINGS[buff.variant]?.attackSpeed || 0) : 1;
}
