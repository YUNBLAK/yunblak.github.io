export default {
  id:"sunspirePass",name:"SUNSPIRE PASS",subtitle:"달의 숲을 떠나 태양 첨탑으로 향하는 붉은 고개",width:3000,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:620,h:102,kind:"sand"},{x:620,y:400,w:540,h:140,kind:"sandstone"},
    {x:1160,y:438,w:680,h:102,kind:"sand"},{x:1840,y:405,w:520,h:135,kind:"sandstone"},
    {x:2360,y:438,w:640,h:102,kind:"sand"},{x:520,y:290,w:140,h:18,kind:"wood"},
    {x:1090,y:255,w:150,h:18,kind:"sandstone"},{x:1770,y:275,w:150,h:18,kind:"wood"},{x:2300,y:245,w:150,h:18,kind:"sandstone"}
  ],
  enemies:[["sunscorpion",390,438],["duneRaider",790,400],["flameDjinn",1050,400],["sunscorpion",1370,438],["duneRaider",1690,438],["flameDjinn",2050,405],["sunscorpion",2510,438],["duneRaider",2800,438]],
  nightEnemies:[["ghost",920,400],["flameDjinn",1540,438],["duneRaider",2240,405]],
  crystals:[[250,390],[560,250],[800,350],[1130,215],[1330,390],[1790,235],[1990,355],[2340,205],[2600,390],[2880,390]],
  secrets:[{id:"sunspire_caravan",x:1180,reward:"high_potion",label:"모래에 파묻힌 대상단 궤짝"},{id:"sunspire_flame",x:2300,reward:"sunblade",label:"태양 불꽃 제단"}],
  props:[{type:"sunTent",x:480},{type:"sunPillar",x:980},{type:"palm",x:1480},{type:"sunTent",x:1980},{type:"sunPillar",x:2470}],
  exits:[{x:42,target:"moonbriarVillage",spawn:2050,label:"Moonbriar로 돌아가기"},{x:2910,target:"sunspireTown",spawn:125,label:"Sunspire 성문으로"}],
  adjacent:["moonbriarVillage","sunspireTown"]
};
