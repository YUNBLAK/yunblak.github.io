import { NPCS } from "../../../config/npcs.js";

export default {
  id: "elderHouse", name: "THE ELDER'S HEARTH", subtitle: "촌장의 기록과 오래된 왕국 지도가 놓인 집", width: 960,
  spawn: 165, safe: true, npcs: NPCS.filter((npc) => npc.zone === "elderHouse"),
  platforms:[{x:0,y:438,w:960,h:102,kind:"wood"}],
  enemies:[],nightEnemies:[],crystals:[],secrets:[],
  props:[{type:"bookshelf",x:450},{type:"maptable",x:680},{type:"hearth",x:825}],
  exits:[{x:105,target:"elderHill",spawn:900,label:"언덕으로 나가기",kind:"door"}],
  adjacent:["elderHill"],interior:true
};
