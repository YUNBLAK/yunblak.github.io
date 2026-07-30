export default {
  id: "castleApproach",
  name: "CINDERKEEP ASCENT",
  subtitle: "구름 위 신더킵으로 치솟는 왕조의 대계단",
  width: 2670,
  spawn: 2440,
  safe: true,
  npcs: [],
  platforms: [
    { x:0,y:158,w:700,h:382,kind:"castleStone" },
    ...Array.from({ length:34 },(_,index) => ({
      x:700 + index * 54,
      y:166 + index * 8,
      w:56,
      h:374 - index * 8,
      kind:"castleStone"
    })),
    { x:2530,y:438,w:140,h:102,kind:"castleStone" }
  ],
  enemies: [],
  nightEnemies: [],
  crystals: [],
  secrets: [],
  props: [],
  exits: [
    { x:385,target:"castleHall",spawn:1250,label:"신더킵 대성문으로 들어가기",kind:"door" },
    { x:2550,target:"elderHill",spawn:38,label:"암벽 터널을 지나 촌장 언덕으로 돌아가기" }
  ],
  adjacent: ["elderHill","castleHall"]
};
