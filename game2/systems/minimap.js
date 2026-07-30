export class MinimapRenderer {
  constructor(canvas, toggleButton) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.toggleButton = toggleButton;
    this.expanded = false;
    this.lastRender = -Infinity;
    this.interval = 50;
    this.terrainCache = new Map();
    this.dirtyZones = new Set();
  }

  toggle() {
    this.expanded = !this.expanded;
    this.canvas.parentElement.classList.toggle("expanded", this.expanded);
    this.toggleButton?.setAttribute("aria-pressed", String(this.expanded));
    this.toggleButton?.setAttribute("aria-label", this.expanded ? "미니맵 축소" : "미니맵 확대");
  }

  markExplored(explored, zoneId, x, width) {
    explored[zoneId] ||= [];
    const bucket = Math.max(0, Math.min(Math.ceil(width / 100), Math.floor(x / 100)));
    let changed = false;
    for (let offset = -1; offset <= 1; offset++) {
      const value = bucket + offset;
      if (value >= 0 && !explored[zoneId].includes(value)) {
        explored[zoneId].push(value);
        changed = true;
      }
    }
    if (changed) this.dirtyZones.add(zoneId);
    return changed;
  }

  isExplored(explored, zoneId, x) {
    return (explored[zoneId] || []).includes(Math.floor(x / 100));
  }

  terrain(zone, explored) {
    if (!this.terrainCache.has(zone.id) || this.dirtyZones.has(zone.id)) {
      const layer = document.createElement("canvas");
      layer.width = this.canvas.width;
      layer.height = this.canvas.height;
      const draw = layer.getContext("2d");
      draw.imageSmoothingEnabled = false;
      draw.fillStyle = "#171725";
      draw.fillRect(0, 0, layer.width, layer.height);
      const sx = layer.width / zone.width;
      const sy = (layer.height - 18) / 540;
      for (const platform of zone.platforms) {
        const start = Math.floor(platform.x / 100);
        const end = Math.ceil((platform.x + platform.w) / 100);
        for (let bucket = start; bucket <= end; bucket++) {
          if (!(explored[zone.id] || []).includes(bucket)) continue;
          const bx = Math.max(platform.x, bucket * 100);
          const right = Math.min(platform.x + platform.w, (bucket + 1) * 100);
          draw.fillStyle = platform.kind === "grass" ? "#607957" : platform.kind === "village" ? "#9a7357" : "#777384";
          draw.fillRect(Math.floor(bx * sx), Math.floor(platform.y * sy), Math.max(1, Math.ceil((right - bx) * sx)), Math.max(2, Math.ceil(Math.min(platform.h, 22) * sy)));
        }
      }
      this.terrainCache.set(zone.id, layer);
      this.dirtyZones.delete(zone.id);
    }
    return this.terrainCache.get(zone.id);
  }

  render(data, now = performance.now()) {
    if (now - this.lastRender < this.interval && !this.dirtyZones.has(data.zone.id)) return;
    this.lastRender = now;
    const { zone, player, explored, exits, npcs, npcStates, enemies, secrets, event, cleared } = data;
    const ctx = this.ctx;
    const sx = this.canvas.width / zone.width;
    const mapY = (worldY) => Math.floor(worldY / 540 * (this.canvas.height - 18));
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.terrain(zone, explored), 0, 0);
    const marker = (x, y, color, size = 4) => {
      if (!this.isExplored(explored, zone.id, x)) return;
      ctx.fillStyle = "#151522";
      ctx.fillRect(Math.floor(x * sx) - size / 2 - 1, mapY(y) - size / 2 - 1, size + 2, size + 2);
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x * sx) - size / 2, mapY(y) - size / 2, size, size);
    };
    exits.forEach((exit) => marker(exit.x, 410, "#f0c46e", 6));
    for (const npc of npcs) {
      const state = npcStates[npc.id];
      if (state?.alive) marker(npc.x, 395, npc.shop ? "#79d7bd" : "#86b9e4", 4);
      else marker(state?.deathX || npc.x, 420, "#8a7d82", 3);
    }
    for (const enemy of enemies) {
      if (enemy.dead || Math.abs(enemy.x - player.x) >= 330) continue;
      marker(enemy.x, enemy.y, enemy.boss ? "#ff4e55" : "#d9656b", enemy.boss ? 7 : 3);
    }
    secrets.filter((secret) => secret.found).forEach((secret) => marker(secret.x, 410, "#db9bff", 4));
    if (event?.active) marker(event.x, 392, "#ffdf67", 6);
    const x = Math.floor(player.x * sx);
    const y = mapY(player.y + player.h / 2);
    ctx.fillStyle = "#fff4be";
    ctx.beginPath();
    ctx.moveTo(x + player.face * 6, y);
    ctx.lineTo(x - player.face * 3, y - 4);
    ctx.lineTo(x - player.face * 3, y + 4);
    ctx.fill();
    ctx.fillStyle = "#b9a7bb";
    ctx.font = "bold 8px monospace";
    ctx.textAlign = "left";
    ctx.fillText(zone.name, 5, this.canvas.height - 6);
    if (cleared) {
      ctx.fillStyle = "#7fe0b5";
      ctx.textAlign = "right";
      ctx.fillText("CLEARED", this.canvas.width - 5, this.canvas.height - 6);
    }
  }
}
