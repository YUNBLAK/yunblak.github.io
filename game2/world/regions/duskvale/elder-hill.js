export default {
  id: "elderHill", name: "DUSKVALE SUNSET HILL", subtitle: "풍차와 묘지가 내려다보는 촌장의 언덕", width: 1500,
  spawn: 1320, safe: true, npcs: [],
  platforms: [
    { x:0,y:438,w:350,h:102,kind:"stone" },
    { x:350,y:405,w:370,h:135,kind:"grass" },
    { x:720,y:365,w:410,h:175,kind:"grass" },
    { x:1130,y:410,w:370,h:130,kind:"grass" }
  ],
  enemies: [], nightEnemies: [], crystals: [],
  secrets: [{ id:"elder_grave",x:465,reward:"high_potion",label:"오래된 기사 묘비" }],
  props: [{type:"grave",x:455,variant:0},{type:"grave",x:570,variant:1},{type:"windmill",x:1040},{type:"elderHouse",x:750}],
  landmarks: [
    {x:175,kind:"sealedCave",label:"봉인된 암벽 동굴 · 잠긴 철문"},
    {x:810,kind:"elderHouse",label:"촌장 에드윈의 집"}
  ],
  exits: [
    {x:-20,target:"castleApproach",spawn:2440,label:"암벽 터널 너머 · 고성 돌계단"},
    {x:810,target:"elderHouse",spawn:165,label:"촌장집으로 들어가기",kind:"door"},
    {x:1430,target:"village",spawn:95,label:"마을 광장으로 내려가기"}
  ],
  adjacent:["castleApproach","village","elderHouse"]
};
