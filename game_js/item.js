/**
 * Frost Wing — item
 * Supply drops, collection effects, and item rendering.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function dropItem(x, y, type) {
    items.push({
      x,
      y,
      type,
      radius: 15,
      phase: Math.random() * Math.PI * 2,
      driftSpeed: 13 + Math.random() * 8
    });
  }

function maybeDropHealingItem(x, y) {
    const luck = players.reduce((highest, pilot) => Math.max(highest, pilot.itemLuck), 0);
    if (Math.random() > 0.12 + luck * 0.35) return false;
    dropItem(x, y, "heal");
    return true;
  }

function collectItem(item, pilot) {
    const t = copy[language()];
    if (mission?.type === "collector") mission.progress += 1;
    if (item.type === "magnet") {
      const gatheredItems = items.filter((candidate) => candidate !== item);
      items.length = 0;
      addMessage(t.magnet, "#70d8e7", pilot);
      gatheredItems.forEach((gatheredItem) => collectItem(gatheredItem, pilot));
      addExplosion(pilot.x, pilot.y, "#9ff3ff", 26);
      playTone(330, 1180, 0.36, 0.075, "sine");
      updateHud();
      return true;
    } else if (item.type === "heal") {
      pilot.health = Math.min(pilot.maxHealth, pilot.health + 32);
      addMessage(t.heal, "#75d4ac", pilot);
    } else if (item.type === "bomb") {
      pilot.bombs = Math.min(5, pilot.bombs + 1);
      addMessage(t.bomb, "#ffc27c", pilot);
    } else if (item.type === "shield") {
      if (pilot.shieldHits > 0 || pilot.aegisActive > 0) {
        addMessage(t.shieldActive, "#aebbc5", pilot);
      } else {
        pilot.shieldHits = 2;
        addMessage(t.shield, "#9ea9ff", pilot);
      }
    } else if (item.type === "wingman") {
      if (pilot.wingmanCount >= pilot.wingmanMax) {
        addMessage(t.wingmanActive, "#aebbc5", pilot);
      } else {
        pilot.wingmanCount += 1;
        pilot.wingmanFireTimer = 0.2;
        addMessage(t.wingman, "#8edbff", pilot);
      }
    } else if (item.type === "overdrive") {
      pilot.overdriveTimer = Math.max(pilot.overdriveTimer, 10);
      addMessage(t.overdrive, "#ffd66f", pilot);
    } else if (item.type === "core") {
      grantXp(2);
      score += 500;
      addMessage(t.core, "#8be3ff", pilot);
    }
    addExplosion(item.x, item.y, "#dff7ff", 12);
    const itemTone = item.type === "heal" ? 520 : item.type === "bomb" ? 620 : item.type === "shield" ? 710 : 820;
    playTone(itemTone, itemTone + 220, 0.2, 0.06, "sine");
    updateHud();
    if (mode === "running") {
      if (pendingClassChoice) showClassChoice();
      else if (pendingLevelUps > 0) showLevelUp();
    }
    return false;
  }

function drawItem(item) {
    const colors = {
      heal: { fill: "#dff4e9", edge: "#4c9c80", mark: "+" },
      bomb: { fill: "#fff0df", edge: "#c67a43", mark: "✦" },
      shield: { fill: "#eeecff", edge: "#716fc2", mark: "◇" },
      wingman: { fill: "#e4f6fc", edge: "#347eae", mark: "▲" },
      magnet: { fill: "#e1f9f8", edge: "#238f9e", mark: "∩" },
      overdrive: { fill: "#fff4c8", edge: "#d89b26", mark: "⚡" },
      core: { fill: "#e2f4ff", edge: "#397fb5", mark: "◆" }
    }[item.type];
    ctx.save();
    ctx.translate(item.x, item.y + Math.sin(item.phase) * 4);
    ctx.rotate(item.phase * 0.25);
    ctx.fillStyle = colors.fill;
    ctx.strokeStyle = colors.edge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(-item.phase * 0.25);
    ctx.fillStyle = colors.edge;
    ctx.font = "700 18px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(colors.mark, 0, 0);
    ctx.restore();
  }
