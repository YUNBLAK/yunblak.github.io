export class WorldClock {
  constructor(saved = {}) {
    this.day = saved.day || 1;
    this.minute = saved.minute ?? 17 * 60;
    // 1 in-game day (1,440 minutes) passes in 18 real-time minutes.
    this.speed = 1440 / (18 * 60);
    this.lastSavedDay = this.day;
  }
  update(seconds) {
    this.minute += seconds * this.speed;
    let dayChanged = false;
    while (this.minute >= 1440) {
      this.minute -= 1440;
      this.day += 1;
      dayChanged = true;
    }
    return dayChanged;
  }
  get hour() { return this.minute / 60; }
  get phase() {
    const h = this.hour;
    if (h >= 6 && h < 10) return "morning";
    if (h >= 10 && h < 17) return "day";
    if (h >= 17 && h < 20) return "sunset";
    return "night";
  }
  get isNight() { return this.phase === "night"; }
  get shopOpen() { return this.hour >= 7 && this.hour < 20; }
  format() {
    const h = Math.floor(this.hour).toString().padStart(2, "0");
    const m = Math.floor(this.minute % 60).toString().padStart(2, "0");
    return `DAY ${this.day} · ${h}:${m}`;
  }
  serialize() { return { day: this.day, minute: this.minute }; }
}
