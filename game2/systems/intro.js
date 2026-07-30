export const INTRO_SCENES = Object.freeze([
  Object.freeze({
    id:"ashen-war",
    chapter:"I · THE ASHEN WAR",
    title:"인간과 악마의 전쟁",
    lines:[
      "오래전, 인간과 악마는 세상의 마지막 땅을 두고 끝없이 싸웠다.",
      "산맥은 불탔고, 수많은 왕국이 재가 되어 사라졌다."
    ],
    duration:10600,
    style:"illustration"
  }),
  Object.freeze({
    id:"angelic-grace",
    chapter:"II · CELESTIAL GRACE",
    title:"하늘이 응답하다",
    lines:[
      "멸망을 앞둔 인간들은 마지막 기도로 천사의 힘을 빌렸다.",
      "빛을 두른 기사들은 지옥의 군세를 밀어내고 마침내 승리했다."
    ],
    duration:10800,
    style:"illustration"
  }),
  Object.freeze({
    id:"karma-seed",
    chapter:"III · THE LAST CURSE",
    title:"카르마의 씨앗",
    lines:[
      "그러나 패배한 악마는 인간의 마음 깊숙한 곳에 마지막 저주를 심었다.",
      "죄와 분노를 먹고 자라는 붉은 표식. 사람들은 그것을 ‘카르마’라 불렀다."
    ],
    duration:11000,
    style:"illustration"
  }),
  Object.freeze({
    id:"red-night",
    chapter:"IV · THE RED NIGHT",
    title:"인간이 인간을 베다",
    lines:[
      "카르마가 한계를 넘을 때마다 평범했던 인간은 검은 광기에 삼켜졌다.",
      "그리고 때때로, 단 한 사람이 마을과 도시의 모두를 몰살했다."
    ],
    duration:11300,
    style:"illustration"
  }),
  Object.freeze({
    id:"the-marked",
    chapter:"V · THE MARKED",
    title:"표식 받은 자들의 최후",
    lines:[
      "왕국은 카르마가 보이는 자를 죄의 유무와 상관없이 붙잡았다.",
      "지목된 사람은 누구도 예외 없이 광장에서 처형당했다."
    ],
    duration:11000,
    style:"illustration"
  }),
  Object.freeze({
    id:"the-fugitive",
    chapter:"VI · THE FUGITIVE",
    title:"하지만, 당신은 도망쳤다",
    lines:[
      "어느 날 당신에게도 붉은 표식이 나타났다.",
      "처형대에 서기 전, 당신은 검 한 자루만 쥔 채 왕도를 빠져나왔다."
    ],
    duration:10800,
    style:"ingame"
  }),
  Object.freeze({
    id:"duskvale",
    chapter:"VII · DUSKVALE",
    title:"노을 아래의 조용한 마을",
    lines:[
      "긴 도주 끝에, 아무도 과거를 묻지 않는 시골 마을에 도착했다.",
      "더스크베일. 그러나 카르마는 아직 당신 안에서 조용히 숨 쉬고 있었다."
    ],
    duration:11800,
    style:"ingame"
  })
]);

export function createIntroState() {
  return {
    active:false,
    completed:false,
    skipped:false,
    sceneIndex:0,
    sceneTime:0,
    totalTime:0,
    sceneSerial:0
  };
}

export function startIntroState(state = createIntroState(), sceneIndex = 0) {
  state.active = true;
  state.completed = false;
  state.skipped = false;
  state.sceneIndex = Math.max(0,Math.min(INTRO_SCENES.length - 1,Math.floor(sceneIndex || 0)));
  state.sceneTime = 0;
  state.totalTime = 0;
  state.sceneSerial = (state.sceneSerial || 0) + 1;
  return state;
}

export function introCurrentScene(state) {
  return INTRO_SCENES[Math.max(0,Math.min(INTRO_SCENES.length - 1,state?.sceneIndex || 0))];
}

export function introSceneProgress(state) {
  const scene = introCurrentScene(state);
  if (!scene?.duration) return 0;
  return Math.max(0,Math.min(1,(state?.sceneTime || 0) / scene.duration));
}

function finishIntroState(state, skipped) {
  state.active = false;
  state.completed = true;
  state.skipped = !!skipped;
  state.sceneIndex = INTRO_SCENES.length - 1;
  state.sceneTime = INTRO_SCENES.at(-1).duration;
  return { sceneChanged:false,finished:true,skipped:state.skipped };
}

export function updateIntroState(state, deltaMs = 0) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  let remaining = Math.max(0,Number.isFinite(deltaMs) ? deltaMs : 0);
  let sceneChanged = false;
  while (remaining > 0 && state.active) {
    const scene = introCurrentScene(state);
    const available = Math.max(0,scene.duration - state.sceneTime);
    const consumed = Math.min(remaining,available);
    state.sceneTime += consumed;
    state.totalTime += consumed;
    remaining -= consumed;
    if (state.sceneTime < scene.duration) break;
    if (state.sceneIndex >= INTRO_SCENES.length - 1) {
      return finishIntroState(state,false);
    }
    state.sceneIndex += 1;
    state.sceneTime = 0;
    state.sceneSerial += 1;
    sceneChanged = true;
  }
  return { sceneChanged,finished:false,skipped:false };
}

export function advanceIntroState(state) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  if (state.sceneIndex >= INTRO_SCENES.length - 1) return finishIntroState(state,false);
  state.sceneIndex += 1;
  state.sceneTime = 0;
  state.sceneSerial += 1;
  return { sceneChanged:true,finished:false,skipped:false };
}

export function skipIntroState(state) {
  if (!state?.active) return { sceneChanged:false,finished:!!state?.completed,skipped:!!state?.skipped };
  return finishIntroState(state,true);
}
