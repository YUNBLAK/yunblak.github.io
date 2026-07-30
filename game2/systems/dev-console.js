export const DEV_COMMANDS = [
  "help","skip","karma","level","gold","day","time","heal","ready","skill","jump","fall","zone","pos","spawn","killall",
  "give","equip","npc","massacre","house","monsters","pursuit","garen","wounded","god","save","debug","resetworld","clear"
];

export function parseDevCommand(input) {
  const raw = String(input || "").trim();
  if (!raw) return { command: "", args: [], raw };
  const [command, ...args] = raw.split(/\s+/);
  return { command: command.toLowerCase(), args, raw };
}

export function commandSuggestion(input) {
  const value = String(input || "").trim().toLowerCase();
  if (!value || value.includes(" ")) return null;
  return DEV_COMMANDS.find((command) => command.startsWith(value) && command !== value) || null;
}

export const DEV_HELP = [
  "skip (새 게임 인트로 즉시 건너뛰기)",
  "karma 500 · level 10 · gold 5000 · day 12 · time 22:00",
  "heal · ready · skill meteor q · jump · fall · zone village · pos 1580",
  "spawn wolf 3 · killall",
  "give potion 10 · equip moonblade · npc kill elder · npc revive elder · massacre",
  "house intact|burning|burned · monsters clear|reset [zone]",
  "pursuit now · garen shield|dash|spear|spearStorm|slam|banner|oath · god on|off",
  "wounded reset|waiting|execute|escort|failed|bones|rescued",
  "save · clear",
  "debug · resetworld CONFIRM (자동 저장 세계 초기화)"
];
