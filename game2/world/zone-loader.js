const routes = {
  village: () => import("./zones/village.js"),
  elderHill: () => import("./regions/duskvale/elder-hill.js"),
  elderHouse: () => import("./regions/duskvale/elder-house.js"),
  castleApproach: () => import("./regions/duskvale/castle-approach.js"),
  castleHall: () => import("./regions/duskvale/castle-hall.js"),
  moonbriarForest: () => import("./regions/moonbriar/moonbriar-forest.js"),
  moonbriarVillage: () => import("./regions/moonbriar/moonbriar-village.js"),
  sunspirePass: () => import("./regions/sunspire/sunspire-pass.js"),
  sunspireTown: () => import("./regions/sunspire/sunspire-town.js"),
  outskirts1: () => import("./zones/outskirts1.js"),
  outskirts2: () => import("./zones/outskirts2.js"),
  bossArena: () => import("./zones/boss-arena.js"),
  dungeon: () => import("./zones/dungeon.js")
};

export class ZoneLoader {
  constructor() { this.cache = new Map(); }
  async load(id) {
    if (this.cache.has(id)) {
      const value = this.cache.get(id);
      this.cache.delete(id); this.cache.set(id, value);
      return structuredClone(value);
    }
    const module = await routes[id]();
    this.cache.set(id, module.default);
    while (this.cache.size > 2) this.cache.delete(this.cache.keys().next().value);
    return structuredClone(module.default);
  }
  preload(id) { if (routes[id] && !this.cache.has(id)) routes[id]().then((m) => { this.cache.set(id, m.default); while (this.cache.size > 2) this.cache.delete(this.cache.keys().next().value); }); }
  get cachedZones() { return [...this.cache.keys()]; }
}
