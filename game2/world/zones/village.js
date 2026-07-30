import { NPCS } from "../../config/npcs.js";
export default {
  id: "village", name: "DUSKVALE VILLAGE", subtitle: "황혼이 머무는 마을", width: 2300,
  spawn: 150, safe: true, nightEnemies: [], npcs: NPCS.filter((npc) => npc.zone === "village"),
  platforms: [{ x: 0, y: 438, w: 2300, h: 102, kind: "village" }],
  enemies: [], crystals: [],
  secrets: [{ id: "village_well", x: 1010, reward: "mana_potion", label: "오래된 우물의 은닉물" }],
  props: [{ type: "well", x: 1010 },{ type: "crate", x: 365 },{ type: "barrel", x: 1325 },{ type: "flag", x: 2080 }],
  exits: [
    { x: 42, target: "elderHill", spawn: 1320, label: "촌장의 노을 언덕으로" },
    { x: 2225, target: "outskirts1", spawn: 125, label: "Amberwild 초원으로" }
  ],
  adjacent: ["elderHill","outskirts1"]
};
