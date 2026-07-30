import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const gameDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = dirname(gameDirectory);
const outputPath = join(projectDirectory, "game2.bundle.js");
const htmlPath = join(projectDirectory, "game2.html");
const checkOnly = process.argv.includes("--check");

const moduleFiles = [
  "config/items.js",
  "config/equipment-visuals.js",
  "config/skills.js",
  "config/npcs.js",
  "config/enemies.js",
  "config/boss.js",
  "config/events.js",
  "config/pursuit-parties.js",
  "config/maps.js",
  "config/homes.js",
  "core/clock.js",
  "core/save.js",
  "core/pool.js",
  "systems/karma.js",
  "systems/movement.js",
  "systems/minimap.js",
  "systems/loot.js",
  "systems/monster-persistence.js",
  "systems/karma-aura.js",
  "systems/blessing.js",
  "systems/pursuit.js",
  "systems/dev-console.js",
  "systems/intro.js",
  "systems/karma-skills.js",
  "systems/wounded-knight.js",
  "systems/world-state.js",
  "systems/platforms.js",
  "systems/daylight.js",
  "systems/collision.js",
  "systems/camera.js",
  "systems/animation.js",
  "systems/skill-scaling.js",
  "systems/combat-effects.js",
  "systems/stats.js",
  "systems/apocalypse.js",
  "systems/guard-revenge.js",
  "systems/cross-slash.js",
  "systems/npc-roaming.js",
  "systems/garen-effects.js",
  "world/regions/index.js",
  "render/intro-cinematic.js",
  "render/gpu-renderer.js"
];

const zoneFiles = [
  ["world/zones/village.js", "ZONE_VILLAGE"],
  ["world/regions/duskvale/elder-hill.js", "ZONE_ELDER_HILL"],
  ["world/regions/duskvale/elder-house.js", "ZONE_ELDER_HOUSE"],
  ["world/regions/duskvale/castle-approach.js", "ZONE_CASTLE_APPROACH"],
  ["world/regions/duskvale/castle-hall.js", "ZONE_CASTLE_HALL"],
  ["world/regions/moonbriar/moonbriar-forest.js", "ZONE_MOONBRIAR_FOREST"],
  ["world/regions/moonbriar/moonbriar-village.js", "ZONE_MOONBRIAR_VILLAGE"],
  ["world/regions/sunspire/sunspire-pass.js", "ZONE_SUNSPIRE_PASS"],
  ["world/regions/sunspire/sunspire-town.js", "ZONE_SUNSPIRE_TOWN"],
  ["world/zones/outskirts1.js", "ZONE_OUTSKIRTS1"],
  ["world/zones/outskirts2.js", "ZONE_OUTSKIRTS2"],
  ["world/zones/boss-arena.js", "ZONE_BOSS_ARENA"],
  ["world/zones/dungeon.js", "ZONE_DUNGEON"]
];

function transformModule(source) {
  return source
    .replace(/^import\s+[^;]+;\s*$/gm, "")
    .replace(/\bexport\s+default\s+/g, "")
    .replace(/\bexport\s+(const|class|function)\s+/g, "$1 ")
    .trim();
}

const parts = [];
for (const file of moduleFiles) {
  parts.push(`  // ── ${file} ──\n${transformModule(await readFile(join(gameDirectory, file), "utf8"))}`);
}

for (const [file, variable] of zoneFiles) {
  const source = transformModule(await readFile(join(gameDirectory, file), "utf8"));
  parts.push(`  // ── ${file} ──\nconst ${variable} = ${source}`);
}

let loaderSource = transformModule(await readFile(join(gameDirectory, "world/zone-loader.js"), "utf8"));
loaderSource = loaderSource.replace(
  /const routes = \{[\s\S]*?\n\};/,
  `const routes = {
  village: () => Promise.resolve({ default: ZONE_VILLAGE }),
  elderHill: () => Promise.resolve({ default: ZONE_ELDER_HILL }),
  elderHouse: () => Promise.resolve({ default: ZONE_ELDER_HOUSE }),
  castleApproach: () => Promise.resolve({ default: ZONE_CASTLE_APPROACH }),
  castleHall: () => Promise.resolve({ default: ZONE_CASTLE_HALL }),
  moonbriarForest: () => Promise.resolve({ default: ZONE_MOONBRIAR_FOREST }),
  moonbriarVillage: () => Promise.resolve({ default: ZONE_MOONBRIAR_VILLAGE }),
  sunspirePass: () => Promise.resolve({ default: ZONE_SUNSPIRE_PASS }),
  sunspireTown: () => Promise.resolve({ default: ZONE_SUNSPIRE_TOWN }),
  outskirts1: () => Promise.resolve({ default: ZONE_OUTSKIRTS1 }),
  outskirts2: () => Promise.resolve({ default: ZONE_OUTSKIRTS2 }),
  bossArena: () => Promise.resolve({ default: ZONE_BOSS_ARENA }),
  dungeon: () => Promise.resolve({ default: ZONE_DUNGEON })
};`
);
parts.push(`  // ── world/zone-loader.js ──\n${loaderSource}`);

const mainSource = transformModule(await readFile(join(gameDirectory, "main.js"), "utf8"));
parts.push(`  // ── main.js ──\n${mainSource}`);

const bundle = [
  "/* AUTO-GENERATED — edit game2/ modules and run: node game2/build-game2.mjs */",
  "(function () {",
  '  "use strict";',
  ...parts,
  "})();",
  ""
].join("\n\n");

const version = createHash("sha256").update(bundle).digest("hex").slice(0, 10);
const currentHtml = await readFile(htmlPath, "utf8");
const nextHtml = currentHtml.replace(
  /<script\s+type="module"\s+src="game2\/main\.js(?:\?v=[^"]*)?"><\/script>|<script\s+src="game2\.bundle\.js(?:\?v=[^"]*)?"><\/script>/,
  `<script src="game2.bundle.js?v=${version}"></script>`
);

if (checkOnly) {
  const currentBundle = await readFile(outputPath, "utf8");
  if (currentBundle !== bundle || currentHtml !== nextHtml) {
    console.error("Game 2 bundle or HTML cache version is stale.");
    process.exitCode = 1;
  } else {
    console.log(`Game 2 bundle is current (${version}).`);
  }
} else {
  await writeFile(outputPath, bundle);
  if (currentHtml !== nextHtml) await writeFile(htmlPath, nextHtml);
  console.log(`Built game2.bundle.js (${version}).`);
}
