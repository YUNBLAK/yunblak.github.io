export default {
  id:"moonbriarForest",name:"MOONBRIAR FOREST",subtitle:"달빛이 나뭇잎 아래 머무는 고대 숲",width:3200,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:700,h:102,kind:"moonGrass"},{x:700,y:410,w:550,h:130,kind:"moonGrass"},
    {x:1250,y:438,w:750,h:102,kind:"moonGrass"},{x:2000,y:395,w:550,h:145,kind:"moonStone"},
    {x:2550,y:438,w:650,h:102,kind:"moonGrass"},{x:560,y:302,w:140,h:18,kind:"wood"},
    {x:1170,y:275,w:145,h:18,kind:"moonStone"},{x:1900,y:285,w:150,h:18,kind:"wood"},{x:2480,y:250,w:145,h:18,kind:"moonStone"}
  ],
  enemies:[["moonstalker",420,438],["treant",820,410],["briarMage",1120,410],["moonstalker",1510,438],["treant",1840,438],["briarMage",2210,395],["moonstalker",2700,438],["treant",3000,438]],
  nightEnemies:[["ghost",980,410],["moonstalker",1760,438],["briarMage",2410,395]],
  crystals:[[270,390],[610,260],[910,360],[1210,235],[1460,390],[1910,245],[2140,345],[2510,210],[2810,390],[3070,390]],
  secrets:[{id:"moonbriar_hollow",x:1330,reward:"moon_charm",label:"은빛 고목의 빈 속"},{id:"moonbriar_altar",x:2470,reward:"moonblade",label:"달의 검 제단"}],
  props:[{type:"moonTree",x:330},{type:"moonTree",x:910},{type:"moonLantern",x:1260},{type:"moonTree",x:1750},{type:"moonObelisk",x:2240},{type:"moonTree",x:2860}],
  exits:[{x:42,target:"outskirts1",spawn:1510,label:"Amberwild 초원으로"},{x:3110,target:"moonbriarVillage",spawn:125,label:"Moonbriar 마을로"}],
  adjacent:["outskirts1","moonbriarVillage"]
};
