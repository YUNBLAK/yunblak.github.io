import { mergePursuit } from "./pursuit.js";
import { mergeWoundedKnightState } from "./wounded-knight.js";

export const DEFAULT_WORLD_STATES = {
  elderHouse: { stage: "intact", fireDay: null, fireMinute: null },
  cemetery: { sensed: false },
  houseFires: {},
  guardRevenge: { triggered: false, defeated: false },
  crimeMemory: { witnesses: 0, lastCrimeDay: null },
  defeatedSpawns: {},
  pursuit: mergePursuit(),
  woundedKnight: mergeWoundedKnightState()
};

export function mergeWorldStates(saved = {}) {
  return {
    elderHouse: { ...DEFAULT_WORLD_STATES.elderHouse, ...(saved.elderHouse || {}) },
    cemetery: { ...DEFAULT_WORLD_STATES.cemetery, ...(saved.cemetery || {}) },
    houseFires: Object.fromEntries(Object.entries(saved.houseFires || {}).map(([id, fire]) => [id, { ...fire }])),
    guardRevenge: { ...DEFAULT_WORLD_STATES.guardRevenge, ...(saved.guardRevenge || {}) },
    crimeMemory: { ...DEFAULT_WORLD_STATES.crimeMemory, ...(saved.crimeMemory || {}) },
    defeatedSpawns: { ...(saved.defeatedSpawns || {}) },
    pursuit: mergePursuit(saved.pursuit),
    woundedKnight: mergeWoundedKnightState(saved.woundedKnight)
  };
}

export function elapsedWorldDays(startDay, startMinute, day, minute) {
  if (startDay == null) return 0;
  return (day - startDay) + ((minute || 0) - (startMinute || 0)) / 1440;
}

export function elderHouseStage(worldStates, day, minute) {
  const house = worldStates.elderHouse;
  if (house.stage !== "burning") return house.stage;
  return elapsedWorldDays(house.fireDay, house.fireMinute, day, minute) >= 1 ? "burned" : "burning";
}

export function startElderHouseFire(worldStates, day, minute) {
  worldStates.elderHouse = { stage: "burning", fireDay: day, fireMinute: minute };
  return worldStates.elderHouse;
}

export function houseFireStage(worldStates, ownerId, day, minute) {
  const fire = worldStates.houseFires?.[ownerId];
  if (!fire) return "intact";
  if (fire.stage !== "burning") return fire.stage;
  return elapsedWorldDays(fire.fireDay, fire.fireMinute, day, minute) >= 1 ? "burned" : "burning";
}

export function startHouseFire(worldStates, ownerId, day, minute) {
  worldStates.houseFires ||= {};
  worldStates.houseFires[ownerId] = { stage:"burning",fireDay:day,fireMinute:minute };
  return worldStates.houseFires[ownerId];
}
