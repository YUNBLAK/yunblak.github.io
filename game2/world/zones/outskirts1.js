import { NPCS } from "../../config/npcs.js";
export default {
  id: "outskirts1", name: "AMBERWILD OUTSKIRTS", subtitle: "마을 밖 1 · 야생 초원", width: 3050,
  spawn: 125, safe: false, npcs: NPCS.filter((npc) => npc.zone === "outskirts1"),
  platforms: [
    { x: 0, y: 438, w: 720, h: 102, kind: "grass" },
    { x: 810, y: 388, w: 510, h: 152, kind: "stone" },
    { x: 1400, y: 438, w: 710, h: 102, kind: "grass" },
    { x: 2190, y: 350, w: 470, h: 190, kind: "ruin" },
    { x: 2740, y: 438, w: 310, h: 102, kind: "grass" },
    { x: 650, y: 302, w: 135, h: 18, kind: "wood" },
    { x: 1260, y: 265, w: 145, h: 18, kind: "wood" },
    { x: 2050, y: 250, w: 145, h: 18, kind: "stone" }
  ],
  enemies: [["slime",430,438],["wolf",650,438],["bandit",980,388],["slime",1530,438],["wolf",1840,438],["bandit",2350,350],["guard",2860,438]],
  nightEnemies: [["ghost",1180,388],["skeleton",1980,438]],
  crystals: [[260,390],[690,260],[930,340],[1290,225],[1510,390],[1980,390],[2100,210],[2300,300],[2850,390]],
  secrets: [{ id: "amber_cart", x: 760, reward: "twilight_sword", label: "뒤집힌 수레의 비밀 상자" },{ id: "amber_tree", x: 2120, reward: "high_potion", label: "속이 빈 고목" }],
  props: [{ type: "crate", x: 510 },{ type: "barrel", x: 1010 },{ type: "puddle", x: 1640 },{ type: "flag", x: 2350 },{ type: "grass", x: 2800 }],
  exits: [{ x: 42, target: "village", spawn: 2130, label: "마을로 돌아가기" },{x:1580,target:"moonbriarForest",spawn:125,label:"Moonbriar 월광 성문으로"},{ x: 2960, target: "outskirts2", spawn: 125, label: "버려진 왕도로" }],
  adjacent: ["village","moonbriarForest","outskirts2"]
};
