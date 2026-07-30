import { NPCS } from "../../../config/npcs.js";
export default {
  id:"moonbriarVillage",name:"MOONBRIAR VILLAGE",subtitle:"달사슴의 종이 울리는 숲의 마을",width:2200,spawn:125,safe:true,npcs:NPCS.filter((npc)=>npc.zone==="moonbriarVillage"),
  platforms:[{x:0,y:438,w:2200,h:102,kind:"moonVillage"}],
  enemies:[],nightEnemies:[],crystals:[],
  secrets:[{id:"moonbriar_belfry",x:1550,reward:"mana_potion",label:"달 종탑의 숨은 서랍"}],
  props:[{type:"moonWell",x:920},{type:"moonLantern",x:510},{type:"moonLantern",x:1420},{type:"moonObelisk",x:1650}],
  exits:[{x:42,target:"moonbriarForest",spawn:3050,label:"월광림으로"},{x:2120,target:"sunspirePass",spawn:125,label:"태양 고개로"}],
  adjacent:["moonbriarForest","sunspirePass"]
};
