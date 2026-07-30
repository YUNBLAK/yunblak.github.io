export default {
  id:"dungeon",name:"EMBERFALL CATACOMBS",subtitle:"폐왕의 지하 묘지",width:3100,spawn:125,safe:false,npcs:[],
  platforms:[
    {x:0,y:438,w:650,h:102,kind:"dungeon"},{x:735,y:370,w:470,h:170,kind:"dungeon"},
    {x:1285,y:438,w:610,h:102,kind:"dungeon"},{x:1985,y:340,w:510,h:200,kind:"dungeon"},
    {x:2580,y:438,w:520,h:102,kind:"dungeon"},{x:560,y:285,w:140,h:18,kind:"stone"},
    {x:1180,y:250,w:140,h:18,kind:"stone"},{x:1860,y:258,w:150,h:18,kind:"stone"},{x:2450,y:235,w:150,h:18,kind:"stone"}
  ],
  enemies:[["skeleton",430,438],["ghost",920,370],["guard",1500,438],["mage",1760,438],["guard",2180,340],["skeleton",2700,438],["lich",2920,438]],
  nightEnemies:[],crystals:[[310,390],[610,245],[870,320],[1220,210],[1410,390],[1830,390],[1900,218],[2110,290],[2500,195],[2700,390]],
  secrets:[{id:"catacomb_reliquary",x:1210,reward:"wraith_sword",label:"봉인된 성물함"},{id:"lich_archive",x:2480,reward:"memory_potion",label:"리치의 금서고"}],
  props:[{type:"crate",x:360},{type:"barrel",x:1080},{type:"puddle",x:1600},{type:"barrel",x:2310},{type:"flag",x:2820}],
  exits:[{x:42,target:"bossArena",spawn:1640,label:"재의 다리로 돌아가기"}],adjacent:["bossArena"]
};
