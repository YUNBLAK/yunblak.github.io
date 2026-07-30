export default {
  id: "castleHall",
  name: "CINDERKEEP GREAT HALL",
  subtitle: "주인을 잃은 왕좌와 오래된 맹세가 잠든 대전당",
  width: 1500,
  spawn: 1250,
  safe: true,
  interior: true,
  npcs: [],
  platforms: [
    { x:0,y:438,w:1500,h:102,kind:"castleInterior" },
    { x:85,y:408,w:430,h:132,kind:"castleInterior" },
    { x:145,y:378,w:300,h:162,kind:"castleInterior" }
  ],
  enemies: [],
  nightEnemies: [],
  crystals: [],
  secrets: [],
  props: [],
  exits: [
    { x:1390,target:"castleApproach",spawn:500,label:"대성문 밖 돌계단으로 나가기",kind:"door" }
  ],
  adjacent: ["castleApproach"]
};
