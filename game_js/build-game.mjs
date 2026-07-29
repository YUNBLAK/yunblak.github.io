import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = dirname(moduleDirectory);
const outputPath = join(projectDirectory, "game.js");
const htmlPath = join(projectDirectory, "game.html");
const checkOnly = process.argv.includes("--check");

const moduleFiles = [
  "game_structure.js",
  "audio.js",
  "map.js",
  "char.js",
  "unit.js",
  "skill.js",
  "item.js",
  "boss_data.js",
  "boss.js",
  "boss_attack.js",
  "boss_render.js",
  "game_loop.js",
  "main.js"
];

const parts = await Promise.all(moduleFiles.map(async (file) => {
  const source = (await readFile(join(moduleDirectory, file), "utf8")).trim();
  return `  // ── ${file} ─────────────────────────────────────────────\n${source}`;
}));

const bundle = [
  "/*",
  " * AUTO-GENERATED FILE — DO NOT EDIT DIRECTLY.",
  " * Edit the source files in game_js/ and run:",
  " *   node game_js/build-game.mjs",
  " */",
  "(function () {",
  '  "use strict";',
  "",
  parts.join("\n\n"),
  "})();",
  ""
].join("\n");

const version = createHash("sha256").update(bundle).digest("hex").slice(0, 10);
const currentHtml = await readFile(htmlPath, "utf8");
const nextHtml = currentHtml.replace(
  /game\.js(?:\?v=[^"'<>]*)?/,
  `game.js?v=${version}`
);

if (checkOnly) {
  const currentBundle = await readFile(outputPath, "utf8");
  const bundleMatches = currentBundle === bundle;
  const htmlMatches = currentHtml === nextHtml;
  if (!bundleMatches || !htmlMatches) {
    const stale = [
      !bundleMatches ? "game.js" : null,
      !htmlMatches ? "game.html cache version" : null
    ].filter(Boolean).join(", ");
    console.error(`Generated game files are stale: ${stale}`);
    process.exitCode = 1;
  } else {
    console.log(`Game bundle is current (${version}).`);
  }
} else {
  await writeFile(outputPath, bundle);
  if (nextHtml !== currentHtml) await writeFile(htmlPath, nextHtml);
  console.log(`Built game.js from ${moduleFiles.length} modules (${version}).`);
}
