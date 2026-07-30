export const PURSUIT_PARTIES = [
  { minLevel: 1, minKarma: 1000, name: "왕국 수색조", units: ["soldier","soldier","adventurer"] },
  { minLevel: 6, minKarma: 1200, name: "은빛 추적대", units: ["shieldKnight","royalMage","crossbow","crossbow"] },
  { minLevel: 12, minKarma: 1600, name: "왕실 심판대", units: ["inquisitor","shieldKnight","royalMage","priest","hound"] }
];

export function pursuitParty(level, karma) {
  return [...PURSUIT_PARTIES].reverse().find((party) => level >= party.minLevel && karma >= party.minKarma) || PURSUIT_PARTIES[0];
}
