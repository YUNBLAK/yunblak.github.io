import { NPCS } from "../../config/npcs.js";
export default {
  id: "outskirts2", name: "BROKEN ROYAL ROAD", subtitle: "마을 밖 2 · 버려진 왕도", width: 3420,
  spawn: 125, safe: false, npcs: NPCS.filter((npc) => npc.zone === "outskirts2"),
  platforms: [
    { x:0,y:438,w:620,h:102,kind:"ruin" },{ x:710,y:360,w:470,h:180,kind:"stone" },
    { x:1260,y:438,w:650,h:102,kind:"ruin" },{ x:1990,y:335,w:520,h:205,kind:"stone" },
    { x:2600,y:438,w:820,h:102,kind:"ruin" },{ x:530,y:270,w:150,h:18,kind:"stone" },
    { x:1170,y:245,w:140,h:18,kind:"wood" },{ x:1880,y:240,w:150,h:18,kind:"stone" },
    { x:2480,y:225,w:160,h:18,kind:"stone" }
  ],
  enemies: [["skeleton",420,438],["bandit",900,360],["guard",1080,360],["mage",2110,335],["guard",2390,335],["skeleton",2750,438],["hunter",3100,438]],
  nightEnemies: [["ghost",1120,360],["ghost",2400,335]],
  crystals: [[280,390],[580,230],[820,310],[1200,205],[1420,390],[1880,200],[2120,285],[2520,185],[2800,390],[3220,390]],
  secrets: [{ id: "royal_crypt", x: 1870, reward: "royal_sword", label: "무너진 왕실 묘실" },{ id: "road_shrine", x: 2640, reward: "stamina_potion", label: "잊힌 길가 제단" }],
  props: [{ type: "barrel", x: 440 },{ type: "flag", x: 840 },{ type: "crate", x: 1510 },{ type: "woundedKnightTree", x: 1648 },{ type: "puddle", x: 2200 },{ type: "crate", x: 2920 }],
  exits: [{ x:42,target:"outskirts1",spawn:2870,label:"Amberwild 초원으로" },{ x:3330,target:"bossArena",spawn:150,label:"재의 다리 보스 지역" }],
  adjacent: ["outskirts1","bossArena"]
};
