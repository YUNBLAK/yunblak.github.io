const PREFIX = "emberfall-modular";

export class SaveManager {
  constructor() {
    this.autosaveKey = `${PREFIX}-auto`;
  }
  save(slot, data) {
    localStorage.setItem(slot === "auto" ? this.autosaveKey : `${PREFIX}-slot-${slot}`, JSON.stringify({ ...data, version: 5, savedAt: Date.now() }));
  }
  clearAuto() { localStorage.removeItem(this.autosaveKey); }
  load(slot) {
    const raw = localStorage.getItem(slot === "auto" ? this.autosaveKey : `${PREFIX}-slot-${slot}`);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  list() {
    return ["auto", 1, 2, 3].map((slot) => {
      const data = this.load(slot);
      return { slot, data, exists: !!data };
    });
  }
  export(slot = "auto") {
    const data = this.load(slot);
    if (!data) return null;
    return new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  }
  async importFile(file, slot = 1) {
    const data = JSON.parse(await file.text());
    if (!data || ![3, 4, 5].includes(data.version) || !data.player) throw new Error("Invalid Emberfall save");
    this.save(slot, data);
    return data;
  }
}
