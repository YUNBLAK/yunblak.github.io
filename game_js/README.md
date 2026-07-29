# Frost Wing game source

The editable game source is organized by responsibility:

- `game_structure.js` — shared state, lifecycle, HUD, terminal, and common helpers
- `audio.js` — synthesized sound and sound controls
- `map.js` — frozen terrain, palettes, and background rendering
- `char.js` — player aircraft, movement, weapons, damage, and wingmen
- `unit.js` — regular enemies, projectiles, collisions, and unit rendering
- `skill.js` — levels, classes, missions, upgrades, bombs, and combat systems
- `item.js` — supply drops, collection effects, and item rendering
- `boss_data.js` — scientist AI names, formulas, colors, and evolution profiles
- `boss.js` — boss spawning, movement, evolution, and lifecycle
- `boss_attack.js` — boss weapons, ultimates, hazards, missiles, and minions
- `boss_render.js` — boss bodies, intros, projectiles, and attack effects
- `game_loop.js` — simulation update, canvas composition, and animation frame
- `main.js` — keyboard, touch, UI events, and startup

`../game.js` is the browser-ready bundle generated from these files. Do not edit
it directly.

After changing any game source file, rebuild with:

```bash
node game_js/build-game.mjs
```

The build also updates the `game.js` cache version in `game.html`, which prevents
GitHub Pages from serving an older game script.

To verify that the generated files are current without changing them:

```bash
node game_js/build-game.mjs --check
```
