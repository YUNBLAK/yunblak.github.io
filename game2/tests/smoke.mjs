import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { WorldClock } from "../core/clock.js";
import { SaveManager } from "../core/save.js";
import { ObjectPool } from "../core/pool.js";
import { corpseStage, karmaTier } from "../systems/karma.js";
import { ZoneLoader } from "../world/zone-loader.js";
import { SKILLS, DEFAULT_SKILL_SLOTS, DEFAULT_ITEM_SLOTS } from "../config/skills.js";
import { ITEMS, SHOPS } from "../config/items.js";
import {
  WEAPON_VISUALS,
  ARMOR_VISUALS,
  weaponVisual,
  armorVisual,
  equipmentVisual
} from "../config/equipment-visuals.js";
import { WARDEN_PHASES, bossPhase } from "../config/boss.js";
import { FIELD_EVENTS, WEATHER, dailyEvent, dailyWeather } from "../config/events.js";
import { sprintDecision, sprintStaminaStep } from "../systems/movement.js";
import { LOOT_RULES, potionDropDecision } from "../systems/loot.js";
import {
  mergeWorldStates,
  elderHouseStage,
  startElderHouseFire,
  elderHouseCanEnter,
  elderConfrontationReady,
  completeElderConfrontation,
  houseFireStage,
  startHouseFire
} from "../systems/world-state.js";
import { WORLD_REGIONS } from "../world/regions/index.js";
import { NPCS, VILLAGE_CIVILIAN_IDS } from "../config/npcs.js";
import { ENEMIES } from "../config/enemies.js";
import { spawnRecord, markSpawnDefeated, clearDefeatedSpawns, zoneClearStatus } from "../systems/monster-persistence.js";
import { karmaAuraTier, npcAttackUnlocked, worldHostile } from "../systems/karma-aura.js";
import { blessingForKarma, blessingDefense, blessingAttackMultiplier } from "../systems/blessing.js";
import { mergePursuit, schedulePursuit, updatePursuitSchedule, beginPursuit, finishPursuit } from "../systems/pursuit.js";
import { pursuitParty } from "../config/pursuit-parties.js";
import { DEV_COMMANDS, parseDevCommand, commandSuggestion } from "../systems/dev-console.js";
import {
  INTRO_SCENES,
  createIntroState,
  startIntroState,
  introCurrentScene,
  introSceneProgress,
  updateIntroState,
  advanceIntroState,
  skipIntroState
} from "../systems/intro.js";
import { MAP_ORDER, mapCode } from "../config/maps.js";
import { skillForKarma } from "../systems/karma-skills.js";
import { ensureContinuousGround, groundCoverageGaps, groundKindForZone } from "../systems/platforms.js";
import { daylightAt, sunsetGlowAt, interpolatePalette } from "../systems/daylight.js";
import { resolveHorizontalMovement } from "../systems/collision.js";
import {
  horizontalCameraTarget, verticalCameraTarget, playerVerticalCameraTarget,
  landingFloorBelowPlayer, fallingSupportFloorAt, easeCamera
} from "../systems/camera.js";
import { lerp, interpolated, playerSwordAngle, playerAttackMotion, playerAirMotion, enemyCombatMotion } from "../systems/animation.js";
import { skillGrowth, scaledRange, scaledEffectSize, skillGrowthSummary } from "../systems/skill-scaling.js";
import { enemyEffectProfile, hazardEffectProfile } from "../systems/combat-effects.js";
import { PLAYER_STAT_KEYS, normalizePlayerStats, statInvestment, commitStatAllocation, derivePlayerStats } from "../systems/stats.js";
import { APOCALYPSE_KARMA, apocalypseIntensity, firefallState } from "../systems/apocalypse.js";
import { villageCiviliansDefeated, guardRevengeReady } from "../systems/guard-revenge.js";
import { crossSlashProfile, crossWaveOpacity } from "../systems/cross-slash.js";
import { initializeRoamingNpc, updateRoamingNpc } from "../systems/npc-roaming.js";
import { garenEffectProfile } from "../systems/garen-effects.js";
import { NPC_HOMES, homesForZone } from "../config/homes.js";
import {
  WOUNDED_KNIGHT,
  mergeWoundedKnightState,
  advanceWoundedKnightExecution,
  chooseWoundedKnight,
  finishWoundedKnightExecution,
  failWoundedKnightEscort,
  completeWoundedKnightEscort,
  woundedKnightRemainsStage
} from "../systems/wounded-knight.js";

const memory = new Map();
globalThis.localStorage = {
  getItem: (key) => memory.get(key) ?? null,
  setItem: (key, value) => memory.set(key, String(value)),
  removeItem: (key) => memory.delete(key)
};

const clock = new WorldClock({ day: 2, minute: 0 });
assert.equal(clock.update(18 * 60), true);
assert.deepEqual(clock.serialize(), { day: 3, minute: 0 });
clock.minute = 20 * 60;
assert.equal(clock.isNight, true);
assert.equal(clock.shopOpen, false);

assert.equal(corpseStage({ alive: false, deathDay: 2 }, 6), "decayed");
assert.equal(corpseStage({ alive: false, deathDay: 2 }, 7), "bones");
assert.equal(karmaTier(20).hunters, true);
assert.equal(karmaTier(50).guards, true);
assert.equal(karmaTier(100).price, 1.8);
assert.equal(karmaTier(500).name, "타락한 군주");
assert.equal(karmaTier(1000).hostileWorld, true);

const loader = new ZoneLoader();
const ids = [
  "village", "elderHill", "elderHouse", "outskirts1", "moonbriarForest",
  "moonbriarVillage", "sunspirePass", "sunspireTown", "outskirts2", "bossArena", "dungeon",
  "castleApproach", "castleHall"
];
const zones = {};
for (const id of ids) {
  zones[id] = await loader.load(id);
  assert.ok(loader.cachedZones.length <= 2);
}
assert.deepEqual(MAP_ORDER, ids.slice(0, 8).concat(ids.slice(8)));
assert.equal(mapCode("village"), "map_01");
assert.equal(mapCode("elderHouse"), "map_03");
assert.equal(mapCode("dungeon"), "map_11");
assert.equal(mapCode("castleApproach"), "map_12");
assert.equal(mapCode("castleHall"), "map_13");
assert.equal(zones.village.exits[0].target, "elderHill");
assert.equal(zones.village.exits[1].target, "outskirts1");
const villageSunsetGate = zones.village.exits.find((exit) => exit.target === "elderHill");
const villageInnHome = homesForZone("village").find((home) => home.ownerId === "inn");
assert.equal(zones.village.cameraMinX,-180);
assert.equal(zones.village.playerMinX,-78);
assert.equal(zones.village.platforms[0].x,zones.village.cameraMinX);
assert.equal(zones.village.platforms[0].x + zones.village.platforms[0].w,zones.village.width);
assert.equal(villageSunsetGate.x,-60);
assert.equal(villageSunsetGate.visualX,-60);
assert.equal(villageSunsetGate.x,villageSunsetGate.visualX);
assert.equal(zones.village.playerMinX + 18,villageSunsetGate.x);
assert.ok(villageInnHome.x - 17 - (villageSunsetGate.visualX + 98) >= 45);
assert.equal(
  horizontalCameraTarget({
    playerX:zones.village.spawn,
    viewportWidth:960,
    worldWidth:zones.village.width,
    minX:zones.village.cameraMinX
  }),
  zones.village.cameraMinX
);
assert.equal(
  horizontalCameraTarget({ playerX:150,viewportWidth:960,worldWidth:2300 }),
  0
);
assert.equal(zones.elderHill.exits.find((exit) => exit.target === "elderHouse")?.target, "elderHouse");
const elderHouseProp = zones.elderHill.props.find((prop) => prop.type === "elderHouse");
const elderHouseDoor = zones.elderHill.exits.find((exit) => exit.target === "elderHouse");
const elderHouseLandmark = zones.elderHill.landmarks.find((landmark) => landmark.kind === "elderHouse");
const elderHousePlateau = zones.elderHill.platforms.find((platform) =>
  elderHouseProp.houseX >= platform.x && elderHouseProp.houseX <= platform.x + platform.w
);
assert.equal(zones.elderHill.exits.find((exit) => exit.target === "village")?.spawn,55);
assert.equal(elderHouseProp.x,820);
assert.equal(elderHouseProp.houseX,755);
assert.equal(elderHouseProp.width,250);
assert.equal(elderHouseProp.windmillX,1035);
assert.equal(elderHouseDoor.x,880);
assert.equal(elderHouseLandmark.x,elderHouseDoor.x);
assert.equal(zones.elderHouse.exits[0].spawn,elderHouseDoor.x + 20);
assert.ok(elderHouseProp.houseX - elderHousePlateau.x >= 35);
assert.ok(elderHouseProp.houseX + elderHouseProp.width <= elderHousePlateau.x + elderHousePlateau.w);
assert.ok(elderHouseProp.windmillX - (elderHouseProp.houseX + elderHouseProp.width) >= 25);
assert.ok(elderHouseProp.windmillX + 82 <= elderHousePlateau.x + elderHousePlateau.w);
assert.ok(elderHouseDoor.x >= elderHouseProp.houseX);
assert.ok(elderHouseDoor.x <= elderHouseProp.houseX + elderHouseProp.width);
assert.equal(zones.elderHill.props.some((prop) => prop.type === "windmill"),false);
const elderCastlePass = zones.elderHill.exits.find((exit) => exit.target === "castleApproach");
const elderSealedCave = zones.elderHill.landmarks.find((landmark) => landmark.kind === "sealedCave");
assert.equal(elderCastlePass.spawn,2440);
assert.equal(elderCastlePass.visualX,48);
assert.equal(elderSealedCave.x,245);
assert.ok(elderSealedCave.x - 61 - (elderCastlePass.visualX + 112) >= 24);
assert.ok(Math.abs(elderCastlePass.x - elderSealedCave.x) - (92 + 94) >= 70);
assert.ok(zones.elderHill.props.filter((prop) => prop.type === "grave").every((prop) => prop.x >= 400));
assert.equal(zones.elderHouse.exits[0].target, "elderHill");
assert.equal(zones.outskirts1.exits[1].target, "moonbriarForest");
assert.match(zones.outskirts1.exits[1].label,/성문/);
assert.equal(zones.outskirts1.exits[2].target, "outskirts2");
assert.equal(zones.moonbriarForest.exits[0].target, "outskirts1");
assert.equal(zones.moonbriarForest.exits[1].target, "moonbriarVillage");
assert.equal(zones.moonbriarVillage.exits[0].target, "moonbriarForest");
assert.equal(zones.moonbriarVillage.exits[1].target, "sunspirePass");
assert.equal(zones.sunspirePass.exits[0].target, "moonbriarVillage");
assert.equal(zones.sunspirePass.exits[1].target, "sunspireTown");
assert.equal(zones.sunspireTown.exits[0].target, "sunspirePass");
assert.equal(zones.outskirts2.exits[1].target, "bossArena");
assert.equal(zones.bossArena.exits[1].target, "dungeon");
assert.equal(zones.bossArena.boss, "warden");
assert.equal(zones.castleApproach.exits[0].target, "castleHall");
assert.equal(zones.castleApproach.exits[1].target, "elderHill");
assert.equal(zones.castleHall.exits[0].target, "castleApproach");
assert.equal(zones.castleHall.interior, true);
const castleSteps = zones.castleApproach.platforms
  .filter((platform) => platform.x >= 700 && platform.x < 2530)
  .sort((a,b) => a.x - b.x);
assert.equal(castleSteps.length,34);
assert.ok(castleSteps.every((step,index) => index === 0 || step.y - castleSteps[index - 1].y === 8));
assert.ok(castleSteps.every((step,index) => index === 0 || step.x <= castleSteps[index - 1].x + castleSteps[index - 1].w));
const castleTerrain = ensureContinuousGround(zones.castleApproach);
const castleFloorAt = (x) => Math.min(...castleTerrain.filter((platform) =>
  x >= platform.x && x <= platform.x + platform.w
).map((platform) => platform.y));
const stairWalker = { x:2490,y:castleFloorAt(2508) - 68,w:36,h:68 };
for (let frame=0;frame<390;frame++) {
  const nextX = stairWalker.x - 5;
  const currentFloor = castleFloorAt(stairWalker.x + stairWalker.w / 2);
  const nextFloor = castleFloorAt(nextX + stairWalker.w / 2);
  const stepHeight = currentFloor - nextFloor;
  if (stepHeight > 0 && stepHeight <= 55) stairWalker.y = nextFloor - stairWalker.h;
  const resolved = resolveHorizontalMovement({ ...stairWalker,nextX,platforms:castleTerrain });
  assert.equal(resolved.blocked,false,`castle stair blocked near x=${stairWalker.x}`);
  stairWalker.x = resolved.x;
}
assert.ok(stairWalker.x < 600);
assert.equal(stairWalker.y,90);
for (const id of ids) assert.ok(Array.isArray(zones[id].secrets));
for (const id of ids) {
  const continuous = ensureContinuousGround(zones[id]);
  assert.deepEqual(groundCoverageGaps(continuous, zones[id].width), []);
}
assert.equal(groundKindForZone("moonbriarForest"), "moonGrass");
assert.equal(groundKindForZone("sunspirePass"), "sand");
assert.equal(groundKindForZone("dungeon"), "dungeon");
assert.equal(groundKindForZone("castleApproach"), "castleStone");
assert.equal(groundKindForZone("castleHall",true), "castleInterior");
assert.equal(verticalCameraTarget(438),0);
assert.equal(verticalCameraTarget(258),-180);
assert.equal(verticalCameraTarget(180),-258);
assert.equal(verticalCameraTarget(100),-300);
assert.equal(verticalCameraTarget(500),0);
const stackedCameraPlatforms = [
  { x:0,y:438,w:900,h:102,kind:"ground" },
  { x:560,y:302,w:140,h:18,kind:"wood" }
];
assert.equal(
  landingFloorBelowPlayer(stackedCameraPlatforms,600,438),
  438,
  "overhead platforms must not replace the ground beneath the player"
);
assert.equal(
  landingFloorBelowPlayer(stackedCameraPlatforms,600,350),
  438,
  "a platform still above airborne feet must remain invisible to the camera"
);
assert.equal(
  landingFloorBelowPlayer(stackedCameraPlatforms,600,300),
  302,
  "a platform becomes a landing candidate only after the player's feet pass above it"
);
assert.equal(landingFloorBelowPlayer(stackedCameraPlatforms,800,300),438);
assert.equal(
  fallingSupportFloorAt(stackedCameraPlatforms,600,310),
  302,
  "falling bodies retain a small collision tolerance at the platform surface"
);
assert.equal(
  fallingSupportFloorAt(stackedCameraPlatforms,600,314),
  438,
  "a falling body that has passed a platform must continue toward the lower floor"
);
assert.equal(playerVerticalCameraTarget({ playerY:370,floorY:438,grounded:true }),0);
assert.equal(playerVerticalCameraTarget({ playerY:330,floorY:438,grounded:false,velocityY:-10 }),-62);
assert.equal(playerVerticalCameraTarget({ playerY:90,floorY:158,grounded:true }),-280);
assert.equal(
  playerVerticalCameraTarget({
    playerY:90,playerHeight:68,floorY:166,grounded:true,velocityY:0
  }),
  -280,
  "camera must stay on the actual upper support while the player straddles a descending edge"
);
assert.equal(
  playerVerticalCameraTarget({
    playerY:98,playerHeight:68,floorY:158,grounded:true,velocityY:0
  }),
  -272,
  "camera must not climb until the player's feet reach the upper step"
);
assert.equal(
  playerVerticalCameraTarget({
    playerY:91,playerHeight:68,floorY:166,grounded:false,velocityY:10
  }),
  -279,
  "camera must follow the current falling position without anticipating downward velocity"
);
assert.ok(easeCamera(0,-120,1) < 0);
assert.ok(easeCamera(-118,-120,1) > -120);
assert.equal(daylightAt(0), 0);
assert.ok(daylightAt(420) > 0 && daylightAt(420) < 1);
assert.equal(daylightAt(720), 1);
assert.ok(daylightAt(1140) > 0 && daylightAt(1140) < 1);
assert.ok(Math.abs(daylightAt(421) - daylightAt(420)) < .02);
assert.ok(sunsetGlowAt(1140) > .5);
assert.deepEqual(interpolatePalette([
  { minute:0, colors:["#000000"] },
  { minute:100, colors:["#ffffff"] },
  { minute:1440, colors:["#000000"] }
], 50), ["#808080"]);
const cliffCollision = resolveHorizontalMovement({
  x:50,y:370,w:36,h:68,nextX:72,platforms:[{x:100,y:380,w:200,h:160,kind:"stone"}]
});
assert.equal(cliffCollision.blocked, true);
assert.equal(cliffCollision.x, 64);
assert.equal(resolveHorizontalMovement({
  x:50,y:290,w:36,h:68,nextX:72,platforms:[{x:100,y:380,w:200,h:160,kind:"stone"}]
}).blocked, false);
assert.equal(resolveHorizontalMovement({
  x:50,y:370,w:36,h:68,nextX:72,platforms:[{x:0,y:438,w:500,h:102,foundation:true}]
}).blocked, false);
assert.equal(lerp(0, 10, .5), 5);
assert.equal(interpolated({ prevX: 10, x: 20 }, "x", .25), 12.5);
assert.ok(playerAttackMotion({ active:true,progress:.5,combo:2,face:1 }).lunge > 6);
assert.ok(playerAttackMotion({ active:true,progress:.5,combo:0,face:-1 }).lunge < 0);
assert.ok(playerSwordAngle(0,1) > -.5);
assert.ok(playerSwordAngle(1,1) < .6);
assert.ok(playerSwordAngle(1,1) > playerSwordAngle(0,1));
assert.ok(playerSwordAngle(.1,0,true) < 0);
assert.ok(playerSwordAngle(.45,0,true) > 0);
assert.ok(playerSwordAngle(.55,0,true) > 0);
assert.ok(playerSwordAngle(.9,0,true) < 0);
assert.ok(playerAirMotion({ grounded:false,vy:-8,airTime:5,face:1 }).frontKnee > 3);
assert.ok(playerAirMotion({ grounded:true,landTimer:8 }).bodyY > 0);
assert.ok(enemyCombatMotion({ attackAnim:17,attackAnimMax:34,face:1 }).bodyX > 0);
assert.equal(enemyCombatMotion({ launchTimer:11 }).airborne, true);
assert.equal(enemyCombatMotion({ leapTimer:14,leapDuration:28 }).airborne, true);
const levelOneSkill = skillGrowth(1, "ember_slash", "crossProjectile");
const levelTwoSkill = skillGrowth(2, "ember_slash", "crossProjectile");
const levelTenSkill = skillGrowth(10, "sunset_execution", "ultimate");
assert.equal(levelOneSkill.rangeScale, 1);
assert.ok(levelTwoSkill.rangeScale > levelOneSkill.rangeScale);
assert.ok(levelTenSkill.effectScale > levelTwoSkill.effectScale);
assert.ok(levelTenSkill.tier >= 3);
assert.equal(scaledRange(100, levelTwoSkill), 103);
assert.ok(scaledEffectSize(100, levelTenSkill) > scaledRange(100, levelTwoSkill));
assert.equal(skillGrowthSummary(5, "frost_bind", "frost").rangeBonus, 11);
let previousSkillGrowth = skillGrowth(1, "ember_slash", "crossProjectile");
for (let level = 2; level <= 30; level++) {
  const currentSkillGrowth = skillGrowth(level, "ember_slash", "crossProjectile");
  assert.ok(currentSkillGrowth.rangeScale > previousSkillGrowth.rangeScale);
  assert.ok(currentSkillGrowth.effectScale > previousSkillGrowth.effectScale);
  previousSkillGrowth = currentSkillGrowth;
}
const crossLevelOne = crossSlashProfile(1,levelOneSkill);
const crossLevelTen = crossSlashProfile(10,skillGrowth(10,"ember_slash","crossProjectile"));
const crossLevelThirty = crossSlashProfile(30,skillGrowth(30,"ember_slash","crossProjectile"));
assert.ok(crossLevelTen.velocity > crossLevelOne.velocity);
assert.ok(crossLevelTen.damageScale > crossLevelOne.damageScale);
assert.ok(crossLevelTen.maxHits > crossLevelOne.maxHits);
assert.equal(crossLevelOne.guardBreak,false);
assert.equal(crossLevelTen.guardBreak,true);
assert.ok(crossLevelThirty.echoCount > crossLevelTen.echoCount);
assert.ok(crossLevelOne.launchDelay > crossLevelOne.castFrames * .5);
assert.ok(crossLevelThirty.velocity > 12);
assert.equal(crossWaveOpacity(100,100),1);
assert.ok(crossWaveOpacity(20,100) > crossWaveOpacity(8,100));
assert.ok(crossWaveOpacity(20,100) < 1);
assert.equal(crossWaveOpacity(0,100),0);
assert.equal(enemyEffectProfile({ type:"wolf" }).kind, "claw");
assert.equal(enemyEffectProfile({ type:"mage" }).kind, "arcane");
assert.equal(enemyEffectProfile({ type:"warden",boss:true }).kind, "boss");
assert.equal(hazardEffectProfile("meteor", true).shape, "meteor");
assert.equal(hazardEffectProfile("root", false).shape, "root");
assert.equal(hazardEffectProfile("venom", false).shape, "venom");
for (const [type, enemy] of Object.entries(ENEMIES)) {
  const profile = enemyEffectProfile({ type, ...enemy });
  assert.ok(profile.kind && profile.color && profile.accent && profile.radius > 0);
}
for (const kind of ["slash","charge","slam","bash","fire","lane","pillars","wall","night","lightning","meteor","root","venom","splash","sunburst","eclipse"]) {
  const profile = hazardEffectProfile(kind, kind === "sunburst" || kind === "eclipse");
  assert.ok(profile.shape && profile.telegraph && profile.color && profile.accent);
}
const animationPool = new ObjectPool(4);
animationPool.add({ life:1 });
animationPool.add({ life:0 });
const animationPoolItems = animationPool.items;
animationPool.update((item) => item.life > 0);
assert.equal(animationPool.items, animationPoolItems);
assert.equal(animationPool.items.length, 1);
const cappedEffects = new ObjectPool(2);
cappedEffects.add({ id:1 });
cappedEffects.add({ id:2 });
cappedEffects.add({ id:3 });
assert.equal(cappedEffects.items.length, 2);
assert.ok(cappedEffects.items.some((item) => item.id === 3));

const legacyStringStats = normalizePlayerStats({
  attack:"3", health:"2", defense:"1", magic:"4", speed:"5"
});
assert.deepEqual(legacyStringStats, { attack:3, health:2, defense:1, magic:4, speed:5 });
assert.deepEqual(normalizePlayerStats({ attack:-3, health:"invalid" }), {
  attack:0, health:0, defense:0, magic:0, speed:0
});
assert.ok(PLAYER_STAT_KEYS.every((key) => Object.hasOwn(legacyStringStats, key)));
assert.equal(statInvestment(
  { attack:0, health:0, defense:0, magic:0, speed:0 },
  { attack:2, health:1, defense:0, magic:0, speed:0 }
), 3);
const committedStats = commitStatAllocation(
  { attack:"1", health:0, defense:0, magic:0, speed:0 },
  { attack:"3", health:"1", defense:0, magic:0, speed:0 },
  "3"
);
assert.equal(committedStats.ok, true);
assert.equal(committedStats.spent, 3);
assert.equal(committedStats.remaining, 0);
assert.deepEqual(committedStats.stats, { attack:3, health:1, defense:0, magic:0, speed:0 });
assert.equal(commitStatAllocation(
  { attack:0, health:0, defense:0, magic:0, speed:0 },
  { attack:4, health:0, defense:0, magic:0, speed:0 },
  3
).ok, false);
assert.equal(commitStatAllocation(
  { attack:2, health:0, defense:0, magic:0, speed:0 },
  { attack:1, health:0, defense:0, magic:0, speed:0 },
  3
).ok, false);
assert.deepEqual(derivePlayerStats(legacyStringStats, {
  weaponAttack:"2", armorHp:"3", armorDefense:"2", accessoryMagic:"1"
}), {
  attackPower:7,
  maxHp:15,
  defense:3,
  magicPower:9,
  maxMana:120,
  maxStamina:115,
  moveSpeed:4.2,
  jump:12.325
});
assert.equal(APOCALYPSE_KARMA, 1000);
assert.equal(apocalypseIntensity(999), 0);
assert.equal(apocalypseIntensity(1000), .72);
assert.equal(apocalypseIntensity(5000), 1);
const firstFirefall = firefallState(0, 0, 960, 540);
assert.equal(firstFirefall.active, true);
assert.equal(firstFirefall.backgroundOnly,true);
assert.equal(firstFirefall.collidable,false);
assert.equal(firstFirefall.damage,0);
assert.ok(firstFirefall.x >= -200 && firstFirefall.x <= 1200);
assert.ok(firstFirefall.y >= -100 && firstFirefall.y <= 540);
const movingFirefall = firefallState(500, 0, 960, 540);
assert.ok(Math.abs(movingFirefall.x - firstFirefall.x) > 60);
assert.ok(movingFirefall.y - firstFirefall.y > 150);
assert.ok(Math.abs(movingFirefall.trailX) > 20);
assert.equal(Math.sign(movingFirefall.x - firstFirefall.x), firstFirefall.direction);
assert.deepEqual(firefallState(1234, 2), firefallState(1234, 2));
const fallingNpc = initializeRoamingNpc({
  roamX:109,roamY:100,prevRoamY:100,roamVY:0,roamGrounded:true,
  roamDir:1,roamPause:0,roamDistance:0
},100,100);
const fallStep = updateRoamingNpc(fallingNpc,{
  originX:100,dt:1,zoneWidth:500,speed:2,floorAt:(x) => x <= 110 ? 100 : 220
});
assert.equal(fallStep.startedFall,true);
assert.equal(fallStep.grounded,false);
assert.ok(fallStep.y > 100 && fallStep.y < 220);
for (let frame = 0; frame < 60 && !fallingNpc.roamGrounded; frame++) {
  updateRoamingNpc(fallingNpc,{
    originX:100,dt:1,zoneWidth:500,speed:2,floorAt:(x) => x <= 110 ? 100 : 220
  });
}
assert.equal(fallingNpc.roamGrounded,true);
assert.equal(fallingNpc.roamY,220);
const climbingNpc = initializeRoamingNpc({
  roamX:109,roamY:220,prevRoamY:220,roamVY:0,roamGrounded:true,
  roamDir:1,roamPause:0,roamDistance:0
},100,220);
updateRoamingNpc(climbingNpc,{
  originX:100,dt:1,zoneWidth:500,speed:2,floorAt:(x) => x <= 110 ? 220 : 100
});
assert.equal(climbingNpc.roamX,109);
assert.equal(climbingNpc.roamDir,-1);
assert.equal(garenEffectProfile("shield",false).tier,4);
assert.equal(garenEffectProfile("spearStorm",true).tier,5);
assert.notEqual(garenEffectProfile("shield",false).color,garenEffectProfile("dash",false).color);
assert.equal(garenEffectProfile("oath",true).rage,true);
const massacreStates = Object.fromEntries(VILLAGE_CIVILIAN_IDS.map((id) => [id, { alive:false }]));
massacreStates.guard = { alive:true };
assert.equal(villageCiviliansDefeated(VILLAGE_CIVILIAN_IDS, massacreStates), true);
assert.equal(guardRevengeReady(VILLAGE_CIVILIAN_IDS, massacreStates), true);
massacreStates.inn.alive = true;
assert.equal(villageCiviliansDefeated(VILLAGE_CIVILIAN_IDS, massacreStates), false);
assert.equal(guardRevengeReady(VILLAGE_CIVILIAN_IDS, massacreStates), false);
massacreStates.inn.alive = false;
massacreStates.guard.alive = false;
assert.equal(guardRevengeReady(VILLAGE_CIVILIAN_IDS, massacreStates), false);

assert.equal(DEFAULT_SKILL_SLOTS.length, 4);
assert.equal(DEFAULT_ITEM_SLOTS.length, 4);
for (const id of DEFAULT_SKILL_SLOTS) assert.ok(SKILLS[id]);
for (const id of DEFAULT_ITEM_SLOTS) assert.ok(ITEMS[id]);
for (const id of ["twilight_sword", "wraith_sword", "royal_sword"]) {
  assert.equal(ITEMS[id].type, "weapon");
  assert.equal(ITEMS[id].rare, true);
}
for (const id of ["moonblade","sunblade","moon_charm","sun_armor"]) assert.ok(ITEMS[id]);
for (const id of ["moon","sunforge","sunmagic"]) assert.ok(SHOPS[id]?.items.length);
const weaponItemIds = Object.keys(ITEMS).filter((id) => ITEMS[id].type === "weapon");
const armorItemIds = Object.keys(ITEMS).filter((id) => ITEMS[id].type === "armor");
assert.deepEqual(Object.keys(WEAPON_VISUALS).sort(),weaponItemIds.sort());
assert.deepEqual(Object.keys(ARMOR_VISUALS).sort(),armorItemIds.sort());
assert.equal(new Set(Object.values(WEAPON_VISUALS).map((visual) => visual.design)).size,weaponItemIds.length);
assert.equal(new Set(Object.values(ARMOR_VISUALS).map((visual) => visual.design)).size,armorItemIds.length);
for (const id of weaponItemIds) {
  const visual = weaponVisual(id);
  for (const key of ["design","length","width","blade","edge","shadow","guard","grip","accent","trail","trailCore"]) {
    assert.ok(visual[key] !== undefined,`${id} weapon visual is missing ${key}`);
  }
}
for (const id of armorItemIds) {
  const visual = armorVisual(id);
  for (const key of ["design","body","bodyLight","bodyShadow","trim","metal","gem","sleeves","leggings","boots","cape"]) {
    assert.ok(visual[key] !== undefined,`${id} armor visual is missing ${key}`);
  }
}
assert.equal(equipmentVisual("royal_sword","weapon").design,"royal");
assert.equal(equipmentVisual("sun_armor","armor").design,"sunscale");
assert.equal(equipmentVisual("magic_ring","accessory"),null);
for (const threshold of [20, 40, 60, 100]) {
  assert.ok(Object.values(SKILLS).some((skill) => skill.karma === threshold));
}
assert.equal(bossPhase(90, 90), 0);
assert.equal(bossPhase(50, 90), 1);
assert.equal(bossPhase(20, 90), 2);
assert.deepEqual(WARDEN_PHASES.map((phase) => phase.patterns.length), [4, 4, 4]);
assert.ok(FIELD_EVENTS.length >= 5);
assert.equal(FIELD_EVENTS.some((event) => event.id === "wounded_knight"),false);
assert.ok(WEATHER[dailyWeather(3, "outskirts1")]);
assert.ok(dailyEvent(2, "outskirts2", true));
assert.equal(sprintDecision({ moving: 1, shift: true, stamina: 100, exhausted: 0, guardTimer: 0, attackTimer: 0, transformed: false }).sprinting, true);
assert.equal(sprintDecision({ moving: 1, shift: true, stamina: 0, exhausted: 0, guardTimer: 0, attackTimer: 0, transformed: false }).sprinting, false);
const drained = sprintStaminaStep({ stamina: 100, maxStamina: 100, sprinting: true, regenDelay: 0, moving: true, dt: 60 });
assert.ok(drained.stamina < 80);
const recovered = sprintStaminaStep({ stamina: 50, maxStamina: 100, sprinting: false, regenDelay: 0, moving: false, dt: 60 });
assert.ok(recovered.stamina > 60);
assert.equal(potionDropDecision({ roll: 0, killsSinceDrop: 2, killsSincePickup: 2 }), false);
assert.equal(potionDropDecision({ roll: 0, killsSinceDrop: 2, killsSincePickup: 5 }), true);
assert.equal(potionDropDecision({ roll: .99, killsSinceDrop: LOOT_RULES.hardPityKills, killsSincePickup: 20 }), true);
const worldStates = mergeWorldStates();
assert.deepEqual(worldStates.defeatedSpawns, {});
assert.equal(worldStates.cemetery.sensed,false);
assert.equal(mergeWorldStates({ cemetery:{ sensed:true } }).cemetery.sensed,true);
assert.equal(worldStates.pursuit.active, false);
assert.equal(worldStates.woundedKnight.status,"waiting");
assert.equal(worldStates.woundedKnight.x,WOUNDED_KNIGHT.x);
startElderHouseFire(worldStates, 2, 720, { elderDoomed:true });
assert.equal(worldStates.elderHouse.elderDoomed,true);
assert.equal(worldStates.elderHouse.dialogueStep,0);
assert.equal(worldStates.elderHouse.curseActive,false);
assert.equal(elderHouseStage(worldStates, 3, 719), "burning");
assert.equal(elderHouseCanEnter(worldStates, 3, 719),true);
assert.equal(elderConfrontationReady(worldStates, 3, 719),true);
assert.equal(completeElderConfrontation(worldStates),true);
assert.equal(worldStates.elderHouse.curseActive,true);
assert.equal(elderConfrontationReady(worldStates, 3, 719),false);
assert.equal(completeElderConfrontation(worldStates),false);
assert.equal(elderHouseStage(worldStates, 3, 720), "burned");
assert.equal(elderHouseCanEnter(worldStates, 3, 720),false);
startHouseFire(worldStates, "inn", 3, 240);
assert.equal(houseFireStage(worldStates, "inn", 4, 239), "burning");
assert.equal(houseFireStage(worldStates, "inn", 4, 240), "burned");
const executedKnight = mergeWoundedKnightState();
assert.equal(chooseWoundedKnight(executedKnight,"execute",2,600),true);
assert.equal(executedKnight.status,"executing");
let executionFrame = null;
for (let frame=0;frame<70;frame++) executionFrame = advanceWoundedKnightExecution(executedKnight,1);
assert.equal(executionFrame.shouldHit,true);
assert.equal(executedKnight.executionTimer,62);
assert.equal(finishWoundedKnightExecution(executedKnight,2,620,"outskirts2",1648,1670,392),true);
assert.equal(woundedKnightRemainsStage(executedKnight,5,619),"fresh");
assert.equal(woundedKnightRemainsStage(executedKnight,5,620),"bones");
const corruptedExecutionKnight = mergeWoundedKnightState();
assert.equal(chooseWoundedKnight(corruptedExecutionKnight,"execute",2,600),true);
corruptedExecutionKnight.executionTimer = Number.NaN;
assert.equal(
  advanceWoundedKnightExecution(corruptedExecutionKnight,1).shouldHit,
  true,
  "a malformed execution timer must recover at the impact frame instead of freezing"
);
const escortedKnight = mergeWoundedKnightState();
assert.equal(chooseWoundedKnight(escortedKnight,"spare",3,200),true);
assert.equal(escortedKnight.status,"escort");
assert.equal(failWoundedKnightEscort(escortedKnight,3,350,"outskirts1",2200),true);
assert.equal(escortedKnight.status,"escort_dead");
const rescuedKnight = mergeWoundedKnightState();
assert.equal(chooseWoundedKnight(rescuedKnight,"spare",4,100),true);
assert.equal(completeWoundedKnightEscort(rescuedKnight),true);
assert.equal(rescuedKnight.status,"rescued");
const mergedKnight = mergeWoundedKnightState({ status:"escort",waveDefeated:{ "outskirts2:0":true } });
assert.equal(mergedKnight.waveDefeated["outskirts2:0"],true);
assert.ok(WORLD_REGIONS.duskvale.zones.includes("elderHill"));
assert.ok(WORLD_REGIONS.duskvale.zones.includes("castleHall"));
assert.ok(WORLD_REGIONS.moonbriar.zones.includes("moonbriarVillage"));
assert.ok(WORLD_REGIONS.sunspire.zones.includes("sunspireTown"));
assert.equal(NPCS.find((npc) => npc.id === "elder").zone, "elderHouse");
assert.ok(NPCS.some((npc) => npc.wander && npc.zone === "outskirts1"));
assert.ok(VILLAGE_CIVILIAN_IDS.every((id) => NPCS.some((npc) => npc.id === id)));
assert.equal(VILLAGE_CIVILIAN_IDS.includes("elder"), true);
assert.equal(VILLAGE_CIVILIAN_IDS.includes("guard"), false);
assert.ok(NPC_HOMES.filter((home) => home.ownerId).every((home) => NPCS.some((npc) => npc.id === home.ownerId)));
assert.equal(homesForZone("village").filter((home) => home.ownerId).length, 7);
assert.equal(homesForZone("outskirts1").length,0);
assert.equal(NPCS.filter((npc) => npc.zone === "moonbriarVillage").length, 4);
assert.equal(NPCS.filter((npc) => npc.zone === "sunspireTown").length, 4);
assert.equal(ENEMIES.captain.name, "황혼 경비대장 가렌");
assert.ok(ENEMIES.captain.hp >= 100);
for (const id of ["treant","moonstalker","briarMage","sunscorpion","duneRaider","flameDjinn"]) assert.ok(ENEMIES[id]);
const spawnA = spawnRecord("outskirts1", "day", ["wolf", 650, 438], 0);
const spawnB = spawnRecord("outskirts1", "day", ["slime", 430, 438], 1);
const defeatedSpawns = {};
markSpawnDefeated(defeatedSpawns, spawnA.id, 3);
assert.equal(zoneClearStatus("outskirts1", { enemies:[["wolf",650,438]], nightEnemies:[] }, defeatedSpawns).cleared, true);
markSpawnDefeated(defeatedSpawns, spawnB.id, 3);
assert.equal(clearDefeatedSpawns(defeatedSpawns, "outskirts1"), 2);
assert.equal(Object.keys(defeatedSpawns).length, 0);
assert.equal(karmaAuraTier(499).id, "blood");
assert.equal(karmaAuraTier(500).id, "corruption");
assert.equal(karmaAuraTier(1000).id, "abyss");
assert.equal(npcAttackUnlocked(500), true);
assert.equal(worldHostile(999), false);
assert.equal(worldHostile(1000), true);
assert.equal(blessingForKarma(499).id, "warrior");
assert.equal(blessingForKarma(500).id, "demon");
assert.equal(skillForKarma("ember_slash", SKILLS.ember_slash, 0).name, "불씨 교차참");
assert.equal(skillForKarma("ember_slash", SKILLS.ember_slash, 500).name, "심연 교차참");
assert.equal(skillForKarma("iron_guard", SKILLS.iron_guard, 500).name, "심연 장벽");
assert.equal(skillForKarma("sunset_execution", SKILLS.sunset_execution, 500).name, "일식의 심판");
assert.equal(blessingDefense({ timer:1, variant:"warrior" }), 4);
assert.ok(blessingAttackMultiplier({ timer:1, variant:"demon" }) < blessingAttackMultiplier({ timer:1, variant:"warrior" }));
const pursuit = mergePursuit();
assert.equal(schedulePursuit(pursuit, 1000, 4), true);
assert.equal(pursuit.nextDay, 7);
assert.equal(updatePursuitSchedule(pursuit, 1000, 7), true);
assert.equal(beginPursuit(pursuit), true);
finishPursuit(pursuit, 8);
assert.equal(pursuit.nextDay, 11);
assert.equal(pursuitParty(20, 2000).name, "왕실 심판대");
assert.deepEqual(parseDevCommand("karma 500"), { command:"karma", args:["500"], raw:"karma 500" });
assert.equal(commandSuggestion("kar"), "karma");
assert.deepEqual(parseDevCommand("pos 1580").args, ["1580"]);
assert.equal(parseDevCommand("jump").command, "jump");
assert.equal(parseDevCommand("fall").command, "fall");
assert.equal(parseDevCommand("massacre").command, "massacre");
assert.equal(commandSuggestion("mass"), "massacre");
assert.deepEqual(parseDevCommand("equip moonblade"), { command:"equip",args:["moonblade"],raw:"equip moonblade" });
assert.deepEqual(parseDevCommand("garen spearStorm"), { command:"garen",args:["spearStorm"],raw:"garen spearStorm" });
assert.equal(DEV_COMMANDS.includes("skip"),true);
assert.deepEqual(parseDevCommand("skip"), { command:"skip",args:[],raw:"skip" });

assert.deepEqual(
  INTRO_SCENES.map((scene) => scene.id),
  ["ashen-war","angelic-grace","karma-seed","red-night","the-marked","the-fugitive","duskvale"]
);
assert.equal(INTRO_SCENES.length,7);
assert.ok(INTRO_SCENES.every((scene) => scene.title && scene.lines.length === 2 && scene.duration >= 10500));
assert.deepEqual(INTRO_SCENES.map((scene) => scene.duration),[10600,10800,11000,11300,11000,10800,11800]);
assert.equal(INTRO_SCENES.reduce((sum,scene) => sum + scene.duration,0),77300);
assert.deepEqual(new Set(INTRO_SCENES.map((scene) => scene.style)),new Set(["illustration","ingame"]));
const intro = startIntroState(createIntroState());
assert.equal(intro.active,true);
assert.equal(introCurrentScene(intro).id,"ashen-war");
assert.equal(introSceneProgress(intro),0);
assert.equal(updateIntroState(intro,1000).sceneChanged,false);
assert.equal(intro.sceneIndex,0);
assert.ok(introSceneProgress(intro) > 0);
const introSceneRemainder = 170;
assert.equal(
  updateIntroState(intro,INTRO_SCENES[0].duration - 1000 + introSceneRemainder).sceneChanged,
  true
);
assert.equal(introCurrentScene(intro).id,"angelic-grace");
assert.equal(intro.sceneTime,introSceneRemainder);
assert.equal(advanceIntroState(intro).sceneChanged,true);
assert.equal(introCurrentScene(intro).id,"karma-seed");
const skippedIntro = skipIntroState(intro);
assert.equal(skippedIntro.finished,true);
assert.equal(intro.active,false);
assert.equal(intro.completed,true);
assert.equal(intro.skipped,true);
const completedIntro = startIntroState(createIntroState());
const totalIntroDuration = INTRO_SCENES.reduce((sum,scene) => sum + scene.duration,0);
assert.equal(updateIntroState(completedIntro,totalIntroDuration).finished,true);
assert.equal(completedIntro.completed,true);
assert.equal(completedIntro.skipped,false);
assert.equal(completedIntro.sceneIndex,INTRO_SCENES.length - 1);

const gameHtml = await readFile(new URL("../../game2.html",import.meta.url),"utf8");
const gameMain = await readFile(new URL("../main.js",import.meta.url),"utf8");
const gameStyles = await readFile(new URL("../../style.css",import.meta.url),"utf8");
for (const id of ["g2-hp","g2-hp-bar","g2-level","g2-xp-bar","g2-mana","g2-stamina"]) {
  assert.equal((gameHtml.match(new RegExp(`id="${id}"`,"g")) || []).length,1,`${id} must remain unique`);
}
assert.ok(gameHtml.indexOf('id="g2-hp"') < gameHtml.indexOf('id="g2-level"'));
assert.ok(gameHtml.indexOf('id="g2-level"') < gameHtml.indexOf('id="g2-mana"'));
assert.ok(gameHtml.indexOf('id="g2-mana"') < gameHtml.indexOf('id="g2-stamina"'));
assert.match(gameMain,/game2-panel-resource game2-points-card/);
assert.match(gameMain,/사용 가능한 스탯 포인트/);
assert.match(gameMain,/game2-panel-resource game2-gold-card/);
assert.match(gameMain,/보유 골드/);
assert.match(gameStyles,/\.game2-hud-hp b/);
assert.match(gameStyles,/\.game2-hud-level b/);
assert.match(gameStyles,/\.game2-points-card\.available/);
assert.match(gameStyles,/\.game2-gold-card/);
assert.match(gameMain,/function zonePlayerMinX\(/);
assert.match(gameMain,/nextX = clamp\(player\.x \+ player\.vx \* dt, zonePlayerMinX\(\), zone\.width - player\.w\)/);
assert.match(gameMain,/function drawCastlePassMountain\(/);
assert.ok(gameMain.indexOf("drawCastlePassMountain(2550,438);") < gameMain.indexOf('drawCavePassGate(2550,438,"DUSKVALE CAVE PASS","right");'));
assert.match(gameMain,/const ELDER_CURSE_INTERVAL = 120/);
assert.match(gameMain,/function updateElderHouseFireScene\(/);
assert.match(gameMain,/function drawBurningElderHouseInterior\(/);
assert.match(gameMain,/function drawBurningElderEffect\(/);
for (const line of [
  "나는 네가 그럴 줄 알았다.",
  "마음 한켠으로 너를 받아들여야 하나 고민했다.",
  "너는…… 결국 악마가 맞았구나……",
  "내 너를 저주하며 이 집에서 죽어가겠다……"
]) assert.ok(gameMain.includes(line));
assert.match(gameStyles,/\.game2-elder-fire-dialogue\.curse/);
assert.match(gameStyles,/\.game2-elder-curse-line/);
assert.match(gameMain,/function equipmentArtMarkup\(/);
assert.match(gameMain,/function drawWeaponBlade\(/);
assert.match(gameMain,/function drawPlayerArmorBody\(/);
assert.match(gameMain,/canvas\.dataset\.equippedWeapon/);
assert.match(gameMain,/canvas\.dataset\.equippedArmor/);
for (const design of Object.values(WEAPON_VISUALS).map((visual) => visual.design)) {
  assert.match(gameStyles,new RegExp(`\\.game2-equipment-art\\.weapon\\.design-${design}`));
}
for (const design of Object.values(ARMOR_VISUALS).map((visual) => visual.design)) {
  assert.match(gameStyles,new RegExp(`\\.game2-equipment-art\\.armor\\.design-${design}`));
}
assert.match(gameMain,/function drawElderManor\(/);
assert.match(gameMain,/function drawElderManorWindmill\(/);
assert.match(gameMain,/function drawBurnedElderManor\(/);
assert.match(gameMain,/drawHouseFire\(home,progress,\{ roofOffset:27 \}\)/);

const manager = new SaveManager();
const payload = {
  player: {
    level: 7, karma: 40,
    explored: { village: [0, 1, 2] },
    foundSecrets: { village_well: "claimed" },
    completedEvents: { "3:outskirts1:merchant_rescue": true },
    collectedCrystals: { "outskirts1:crystal:0": true }
  },
  gold: 999,
  clock: { day: 8, minute: 400 },
  npcStates: { inn: { alive: false, deathDay: 3 } },
  bosses: { warden: true }
};
manager.save(1, payload);
assert.equal(manager.load(1).version, 5);
assert.equal(manager.load(1).player.level, 7);
assert.equal(manager.load(1).npcStates.inn.alive, false);
assert.deepEqual(manager.load(1).player.explored.village, [0, 1, 2]);
assert.equal(manager.load(1).player.collectedCrystals["outskirts1:crystal:0"], true);
assert.equal(manager.list().filter((slot) => slot.exists).length, 1);
assert.equal((await manager.export(1).text()).includes('"warden": true'), true);
const imported = await manager.importFile(new Blob([JSON.stringify(manager.load(1))], { type: "application/json" }), 2);
assert.equal(imported.player.karma, 40);
assert.equal(manager.load(2).bosses.warden, true);
const legacy = { ...manager.load(1), version: 4 };
await manager.importFile(new Blob([JSON.stringify(legacy)], { type: "application/json" }), 3);
assert.equal(manager.load(3).version, 5);
manager.save("auto", payload);
manager.clearAuto();
assert.equal(manager.load("auto"), null);

console.log("Emberfall smoke tests: PASS");
