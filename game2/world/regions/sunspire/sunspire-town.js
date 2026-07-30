import { NPCS } from "../../../config/npcs.js";
export default {
  id:"sunspireTown",name:"SUNSPIRE TOWN",subtitle:"황금 첨탑 아래 대상단이 모이는 태양의 도시",width:2300,spawn:125,safe:true,npcs:NPCS.filter((npc)=>npc.zone==="sunspireTown"),
  platforms:[{x:0,y:438,w:2300,h:102,kind:"sunVillage"}],
  enemies:[],nightEnemies:[],crystals:[],
  secrets:[{id:"sunspire_rooftop",x:1530,reward:"haste_potion",label:"태양 신전 지붕의 봉헌함"}],
  props:[{type:"sunFountain",x:1040},{type:"palm",x:470},{type:"palm",x:1590},{type:"sunPillar",x:1810}],
  exits:[{x:42,target:"sunspirePass",spawn:2840,label:"태양 고개로 돌아가기"}],
  adjacent:["sunspirePass"]
};
