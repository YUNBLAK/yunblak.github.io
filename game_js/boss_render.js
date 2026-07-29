/**
 * Frost Wing — boss render
 * Boss bodies, intros, portals, projectiles, hazards, and attack effects.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function drawBossHazards() {
    bossHazards.forEach((hazard) => {
      const charging = hazard.delay > 0;
      const chargeProgress = charging ? 1 - hazard.delay / Math.max(0.01, hazard.maxDelay) : 1;
      const alpha = charging ? 0.22 + chargeProgress * 0.38 : 0.72;
      ctx.save();
      ctx.strokeStyle = hazard.color;
      ctx.fillStyle = hazard.color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : charging ? 8 : 24;
      ctx.shadowColor = hazard.color;
      if (charging) ctx.setLineDash([9, 8]);

      if (hazard.type === "beam-v") {
        if (!charging && renderQuality >= 0.8) {
          const beamGradient = ctx.createLinearGradient(hazard.x - hazard.width / 2, 0, hazard.x + hazard.width / 2, 0);
          beamGradient.addColorStop(0, "rgba(255,255,255,0)");
          beamGradient.addColorStop(0.22, hazard.color);
          beamGradient.addColorStop(0.5, "#ffffff");
          beamGradient.addColorStop(0.78, hazard.color);
          beamGradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = beamGradient;
        }
        ctx.fillRect(hazard.x - hazard.width / 2, 0, hazard.width, HEIGHT);
        if (!charging) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(hazard.x - Math.max(2, hazard.width * 0.1), 0, Math.max(4, hazard.width * 0.2), HEIGHT);
        }
        ctx.strokeRect(hazard.x - hazard.width / 2, 0, hazard.width, HEIGHT);
      } else if (hazard.type === "beam-h") {
        if (!charging && renderQuality >= 0.8) {
          const beamGradient = ctx.createLinearGradient(0, hazard.y - hazard.width / 2, 0, hazard.y + hazard.width / 2);
          beamGradient.addColorStop(0, "rgba(255,255,255,0)");
          beamGradient.addColorStop(0.22, hazard.color);
          beamGradient.addColorStop(0.5, "#ffffff");
          beamGradient.addColorStop(0.78, hazard.color);
          beamGradient.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = beamGradient;
        }
        ctx.fillRect(0, hazard.y - hazard.width / 2, WIDTH, hazard.width);
        if (!charging) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, hazard.y - Math.max(2, hazard.width * 0.1), WIDTH, Math.max(4, hazard.width * 0.2));
        }
        ctx.strokeRect(0, hazard.y - hazard.width / 2, WIDTH, hazard.width);
      } else if (hazard.type === "strike") {
        ctx.lineWidth = charging ? 3 : 6;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius * (0.72 + chargeProgress * 0.28), 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(hazard.x - hazard.radius, hazard.y);
        ctx.lineTo(hazard.x + hazard.radius, hazard.y);
        ctx.moveTo(hazard.x, hazard.y - hazard.radius);
        ctx.lineTo(hazard.x, hazard.y + hazard.radius);
        ctx.stroke();
        if (!charging) {
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(hazard.x, 0);
          const segments = 9;
          for (let segment = 1; segment <= segments; segment += 1) {
            const y = hazard.y * segment / segments;
            const jitter = segment === segments ? 0 : Math.sin(hazard.phase * 8 + segment * 4.7) * 19;
            ctx.lineTo(hazard.x + jitter, y);
          }
          ctx.stroke();
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = 10;
          ctx.globalAlpha *= 0.38;
          ctx.stroke();
        }
      } else if (hazard.type === "field" || hazard.type === "well") {
        if (renderQuality >= 0.8) {
          const gradient = ctx.createRadialGradient(hazard.x, hazard.y, 3, hazard.x, hazard.y, hazard.radius);
          gradient.addColorStop(0, hazard.type === "well" ? "rgba(5, 8, 24, 0.96)" : hazard.color);
          gradient.addColorStop(1, "rgba(15, 20, 35, 0)");
          ctx.fillStyle = gradient;
        } else {
          ctx.globalAlpha *= 0.35;
        }
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = hazard.color;
        ctx.lineWidth = hazard.type === "strike" ? 4 : 3;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius * (charging ? 0.65 + chargeProgress * 0.35 : 1), 0, Math.PI * 2);
        ctx.stroke();
        if (hazard.type === "well") {
          for (let arm = 0; arm < 4; arm += 1) {
            ctx.beginPath();
            ctx.arc(hazard.x, hazard.y, 18 + arm * 19, hazard.phase + arm, hazard.phase + arm + Math.PI * 1.35);
            ctx.stroke();
          }
        }
      } else if (hazard.type === "ring") {
        ctx.lineWidth = hazard.width;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
        ctx.stroke();
        if (!charging && renderQuality >= 0.55) {
          ctx.globalAlpha = Math.min(1, alpha + 0.2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = Math.max(2, hazard.width * 0.16);
          ctx.beginPath();
          ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = Math.max(2, hazard.width * 0.42);
          ctx.beginPath();
          ctx.arc(hazard.x, hazard.y, Math.max(4, hazard.radius - hazard.width * 1.2), 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (hazard.type === "sweep") {
        ctx.translate(hazard.x, hazard.y);
        ctx.rotate(hazard.angle);
        const length = Math.hypot(WIDTH, HEIGHT) * 1.5;
        ctx.fillRect(-length, -hazard.width / 2, length * 2, hazard.width);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = charging ? 2 : 5;
        ctx.beginPath();
        ctx.moveTo(-length, 0);
        ctx.lineTo(length, 0);
        ctx.stroke();
        if (!charging && renderQuality >= 0.55) {
          ctx.globalAlpha = alpha * 0.45;
          ctx.strokeStyle = hazard.color;
          ctx.lineWidth = 2;
          for (let trail = -2; trail <= 2; trail += 1) {
            if (!trail) continue;
            ctx.beginPath();
            ctx.moveTo(-length, trail * (hazard.width * 0.75));
            ctx.lineTo(length, trail * (hazard.width * 0.75));
            ctx.stroke();
          }
        }
      } else if (hazard.type === "portal" || hazard.type === "turret" || hazard.type === "decoy") {
        ctx.translate(hazard.x, hazard.y);
        ctx.rotate(hazard.phase * 0.25);
        const sides = hazard.type === "turret" ? 6 : hazard.type === "decoy" ? 4 : 10;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let point = 0; point < sides; point += 1) {
          const angle = point / sides * Math.PI * 2;
          const radius = point % 2 ? 18 : 30;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (point === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.globalAlpha *= 0.38;
        ctx.fill();
      } else if (hazard.type === "safezone") {
        ctx.fillStyle = "rgba(4, 10, 20, 0.46)";
        ctx.beginPath();
        ctx.rect(0, 0, WIDTH, HEIGHT);
        ctx.arc(hazard.x, hazard.y, hazard.safeRadius, 0, Math.PI * 2);
        ctx.fill("evenodd");
        ctx.strokeStyle = hazard.color;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(hazard.x, hazard.y, hazard.safeRadius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (hazard.type === "clock") {
        ctx.translate(hazard.x, hazard.y);
        const clockRadius = hazard.radius || Math.min(WIDTH, HEIGHT) * 0.3;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(0, 0, clockRadius, 0, Math.PI * 2);
        ctx.stroke();
        for (let mark = 0; mark < 12; mark += 1) {
          const angle = mark / 12 * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * clockRadius * 0.82, Math.sin(angle) * clockRadius * 0.82);
          ctx.lineTo(Math.cos(angle) * clockRadius * 0.96, Math.sin(angle) * clockRadius * 0.96);
          ctx.stroke();
        }
        ctx.rotate(-hazard.duration * 2.2);
        ctx.fillRect(-4, -clockRadius * 0.72, 8, clockRadius * 0.72);
      }
      ctx.setLineDash([]);
      ctx.restore();
    });
  }

function drawBossAttacks() {
    drawBossHazards();
    bossBombs.forEach((bomb) => {
      const progress = 1 - bomb.timer / bomb.maxTimer;
      const pulse = 0.5 + Math.sin(bomb.phase * 2.2) * 0.18;
      const bombColor = bomb.color || (boss?.color ?? "#ff9670");
      ctx.save();
      ctx.globalAlpha = 0.18 + progress * 0.45;
      ctx.fillStyle = bombColor;
      ctx.strokeStyle = bombColor;
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18 + progress * 18;
      ctx.shadowColor = bombColor;
      ctx.lineWidth = 3 + progress * 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, bomb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (bomb.effect === "molten_floor") {
        ctx.globalAlpha = 0.7;
        for (let flame = 0; flame < 5; flame += 1) {
          const angle = flame / 5 * Math.PI * 2 + bomb.phase;
          ctx.beginPath();
          ctx.moveTo(bomb.x + Math.cos(angle) * bomb.radius * 0.55, bomb.y + Math.sin(angle) * bomb.radius * 0.55);
          ctx.lineTo(bomb.x + Math.cos(angle + 0.2) * bomb.radius * 0.9, bomb.y + Math.sin(angle + 0.2) * bomb.radius * 0.9);
          ctx.lineTo(bomb.x + Math.cos(angle - 0.2) * bomb.radius * 0.72, bomb.y + Math.sin(angle - 0.2) * bomb.radius * 0.72);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = "rgba(255, 229, 194, 0.86)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(bomb.x, bomb.y, Math.max(7, bomb.radius * (1 - progress)), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#fff0d0";
      ctx.font = "800 14px Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(Math.max(1, Math.ceil(bomb.timer)).toString(), bomb.x, bomb.y);
      ctx.restore();
    });

    bossMissiles.forEach((missile) => {
      if (missile.progress < 0) return;
      ctx.save();
      ctx.fillStyle = "rgba(55, 121, 179, 0.1)";
      ctx.strokeStyle = "rgba(114, 203, 255, 0.72)";
      ctx.lineWidth = 3;
      ctx.setLineDash([9, 7]);
      ctx.beginPath();
      ctx.arc(missile.targetX, missile.targetY, missile.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
      if (missile.trail.length > 1) {
        ctx.lineCap = "round";
        missile.trail.forEach((point, index) => {
          if (index === 0) return;
          if (renderQuality < 0.8 && index % 2) return;
          const previous = missile.trail[index - 1];
          ctx.strokeStyle = `rgba(173, 229, 255, ${index / missile.trail.length * 0.75})`;
          ctx.lineWidth = 2 + index / missile.trail.length * 7;
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        });
      }
      const previous = missile.trail[missile.trail.length - 2] || { x: missile.x, y: missile.y - 1 };
      ctx.translate(missile.x, missile.y);
      ctx.rotate(Math.atan2(missile.y - previous.y, missile.x - previous.x) + Math.PI / 2);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 22;
      ctx.shadowColor = "#9ddcff";
      ctx.fillStyle = "#eefaff";
      ctx.strokeStyle = "#4b86b4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(-7, 10);
      ctx.lineTo(0, 6);
      ctx.lineTo(7, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ff9b62";
      ctx.beginPath();
      ctx.moveTo(-5, 9);
      ctx.lineTo(0, 22 + Math.random() * 9);
      ctx.lineTo(5, 9);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    if (!boss || !boss.lasers?.length) return;
    const beamTop = boss.y + 54;
    boss.lasers.forEach((laser) => {
      ctx.save();
      const portalTime = performance.now() * 0.0025 + laser.x * 0.01;
      const portalEnergy = laser.charge > 0 ? 1 - laser.charge / laser.maxCharge : 1;
      ctx.save();
      ctx.translate(laser.x, beamTop);
      ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18 + portalEnergy * 16;
      ctx.shadowColor = "#9c78ff";
      if (renderQuality >= 0.8) {
        const portalGradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 34);
        portalGradient.addColorStop(0, "rgba(247, 245, 255, 0.98)");
        portalGradient.addColorStop(0.22, "rgba(116, 220, 255, 0.9)");
        portalGradient.addColorStop(0.58, "rgba(116, 82, 225, 0.72)");
        portalGradient.addColorStop(1, "rgba(46, 23, 104, 0)");
        ctx.fillStyle = portalGradient;
      } else {
        ctx.fillStyle = "rgba(128, 101, 226, 0.72)";
      }
      ctx.beginPath();
      ctx.ellipse(0, 0, 37 + portalEnergy * 6, 13 + portalEnergy * 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let ring = 0; ring < (renderQuality < 0.8 ? 1 : 3); ring += 1) {
        ctx.strokeStyle = ring === 0 ? "rgba(226, 248, 255, 0.9)" : "rgba(157, 122, 255, 0.72)";
        ctx.lineWidth = 2;
        ctx.setLineDash([8 - ring, 5 + ring]);
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          27 + ring * 7 + Math.sin(portalTime * 2 + ring) * 3,
          8 + ring * 3,
          portalTime * (ring % 2 ? -0.35 : 0.28),
          portalTime + ring * 1.4,
          portalTime + ring * 1.4 + Math.PI * 1.45
        );
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      if (laser.charge > 0) {
        const chargeProgress = 1 - laser.charge / laser.maxCharge;
        const pulse = 0.35 + Math.sin(performance.now() * 0.024 + laser.x) * 0.2;
        ctx.fillStyle = `rgba(255, 93, 78, ${0.04 + chargeProgress * 0.08})`;
        ctx.fillRect(laser.x - laser.width / 2, beamTop, laser.width, HEIGHT - beamTop);
        ctx.strokeStyle = `rgba(255, 220, 185, ${pulse + chargeProgress * 0.3})`;
        ctx.lineWidth = 2 + chargeProgress * 3;
        ctx.setLineDash([12, 9]);
        ctx.beginPath();
        ctx.moveTo(laser.x, beamTop);
        ctx.lineTo(laser.x, HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(255, 132, 91, 0.9)";
        ctx.beginPath();
        ctx.arc(laser.x, beamTop, 6 + chargeProgress * 9, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const gradient = ctx.createLinearGradient(laser.x - laser.width / 2, 0, laser.x + laser.width / 2, 0);
        gradient.addColorStop(0, "rgba(255, 91, 69, 0.08)");
        gradient.addColorStop(0.28, "rgba(255, 129, 81, 0.72)");
        gradient.addColorStop(0.5, "rgba(255, 249, 219, 0.98)");
        gradient.addColorStop(0.72, "rgba(255, 129, 81, 0.72)");
        gradient.addColorStop(1, "rgba(255, 91, 69, 0.08)");
        ctx.shadowBlur = 24;
        ctx.shadowColor = "#ff765d";
        ctx.fillStyle = gradient;
        ctx.fillRect(laser.x - laser.width / 2, beamTop, laser.width, laser.length);
        ctx.fillStyle = "rgba(255, 255, 245, 0.9)";
        ctx.fillRect(laser.x - 7, beamTop, 14, laser.length);
      }
      ctx.restore();
    });
  }

function drawScientistTrait(profile) {
    const special = profile.special || "";
    const color = profile.color || "#86d8ef";
    const phase = profile.phase || 0;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.4;
    ctx.globalAlpha *= 0.72;

    if (renderQuality < 0.55) {
      ctx.beginPath();
      ctx.ellipse(0, -18, 54, 29, phase * 0.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -18, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    if (special === "gravity") {
      ctx.beginPath();
      ctx.ellipse(0, -12, 61, 27, phase * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      for (let apple = 0; apple < 3; apple += 1) {
        const angle = phase * 0.5 + apple / 3 * Math.PI * 2;
        const x = Math.cos(angle) * 59;
        const y = -12 + Math.sin(angle) * 25;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.quadraticCurveTo(x + 5, y - 10, x + 8, y - 5);
        ctx.stroke();
      }
    } else if (special === "recursive") {
      for (let depth = 0; depth < 3; depth += 1) {
        const size = 72 - depth * 14;
        ctx.globalAlpha *= 0.8;
        ctx.strokeRect(-size / 2, -48 + depth * 7, size, size * 0.64);
      }
    } else if (special === "chain_lightning") {
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.moveTo(side * 22, -51);
        ctx.lineTo(side * 29, -66);
        ctx.lineTo(side * 23, -78);
        ctx.lineTo(side * 37, -91);
        ctx.stroke();
        for (let coil = 0; coil < 3; coil += 1) {
          ctx.beginPath();
          ctx.arc(side * (29 + coil * 4), -62 - coil * 8, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    } else if (special === "time_stop") {
      ctx.beginPath();
      ctx.arc(0, -20, 62, 0, Math.PI * 2);
      ctx.stroke();
      for (let mark = 0; mark < 12; mark += 1) {
        const angle = mark / 12 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 54, -20 + Math.sin(angle) * 54);
        ctx.lineTo(Math.cos(angle) * 62, -20 + Math.sin(angle) * 62);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(phase) * 34, -20 + Math.sin(phase) * 34);
      ctx.moveTo(0, -20);
      ctx.lineTo(Math.cos(-phase * 0.25 + 1.2) * 23, -20 + Math.sin(-phase * 0.25 + 1.2) * 23);
      ctx.stroke();
    } else if (special === "corona_wave") {
      for (let ray = 0; ray < 12; ray += 1) {
        const angle = ray / 12 * Math.PI * 2 + phase * 0.08;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * 46, -18 + Math.sin(angle) * 46);
        ctx.lineTo(Math.cos(angle) * (58 + ray % 3 * 4), -18 + Math.sin(angle) * (58 + ray % 3 * 4));
        ctx.stroke();
      }
    } else if (special === "prism_cage") {
      for (let bar = -2; bar <= 2; bar += 1) {
        ctx.beginPath();
        ctx.moveTo(bar * 16, -70 + Math.abs(bar) * 5);
        ctx.lineTo(bar * 16, 37 - Math.abs(bar) * 4);
        ctx.stroke();
      }
      ctx.strokeRect(-47, -57, 94, 79);
    } else if (special === "future_grid") {
      for (let column = -3; column <= 3; column += 1) {
        for (let row = -2; row <= 1; row += 1) {
          if ((column + row + Math.floor(phase * 2)) % 3) continue;
          ctx.globalAlpha = 0.35 + ((column - row + 8) % 4) * 0.12;
          ctx.fillRect(column * 17 - 3, row * 15 - 20, 6, 6);
        }
      }
    } else if (special === "black_hole") {
      ctx.fillStyle = "rgba(1, 4, 12, 0.9)";
      ctx.beginPath();
      ctx.arc(0, -20, 51, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.ellipse(0, -20, 68, 18, phase * 0.18, 0, Math.PI * 2);
      ctx.stroke();
    } else if (special === "frost_domain") {
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(side * 26, -18, 39, side < 0 ? -1.3 : 1.8, side < 0 ? 1.3 : 4.4);
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.moveTo(-58, -18);
      ctx.bezierCurveTo(-24, -58, 24, 22, 58, -18);
      ctx.stroke();
    } else if (special === "hydra_heads") {
      [-1, 0, 1].forEach((side) => {
        ctx.beginPath();
        ctx.moveTo(side * 16, -48);
        ctx.quadraticCurveTo(side * 38, -68, side * 49, -87 + Math.abs(side) * 8);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(side * 49, -87 + Math.abs(side) * 8, 7, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (special === "quantum_decoys" || special === "echo_replay") {
      [-1, 1].forEach((side) => {
        ctx.globalAlpha = 0.26;
        ctx.strokeRect(side * 54 - 17, -48, 34, 48);
        ctx.beginPath();
        ctx.arc(side * 54, -57, 15, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.globalAlpha = 0.72;
    } else if (special === "void_gates" || special === "singularity") {
      for (let ring = 0; ring < 3; ring += 1) {
        ctx.beginPath();
        ctx.ellipse(0, -15, 38 + ring * 13, 14 + ring * 8, phase * (ring % 2 ? -0.18 : 0.14), 0, Math.PI * 2);
        ctx.stroke();
      }
    } else if (special === "solar_sweep") {
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(8, -42);
      ctx.lineTo(61, -67);
      ctx.stroke();
      ctx.strokeRect(42, -76, 30, 16);
      ctx.beginPath();
      ctx.arc(-36, -23, 20, 0, Math.PI * 2);
      ctx.stroke();
    } else if (special === "phase_cloak") {
      [-1, 1].forEach((side) => {
        ctx.globalAlpha = 0.25;
        ctx.strokeRect(side * 12 - 34, -65 + side * 4, 68, 96);
      });
      ctx.globalAlpha = 0.72;
      for (let glitch = 0; glitch < 5; glitch += 1) {
        const y = -57 + glitch * 20;
        ctx.fillRect((glitch % 2 ? -1 : 1) * 43, y, (glitch % 2 ? 1 : -1) * 18, 3);
      }
    } else if (special === "scythe_cross") {
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-75, 21);
      ctx.lineTo(75, -48);
      ctx.moveTo(-34, -72);
      ctx.lineTo(38, 38);
      ctx.stroke();
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(side * 64, side < 0 ? 16 : -43, 10, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (special === "molten_floor") {
      for (let flame = -2; flame <= 2; flame += 1) {
        ctx.beginPath();
        ctx.moveTo(flame * 20 - 7, 39);
        ctx.lineTo(flame * 20, 17 - Math.abs(flame) * 5);
        ctx.lineTo(flame * 20 + 7, 39);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, -72);
      ctx.lineTo(-21, -44);
      ctx.lineTo(21, -44);
      ctx.closePath();
      ctx.stroke();
    } else if (special === "shrinking_world") {
      ctx.font = "900 76px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("∞", 0, -20);
    } else if (special === "absolute_zero") {
      for (let arm = 0; arm < 6; arm += 1) {
        const angle = arm / 6 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(Math.cos(angle) * 61, -20 + Math.sin(angle) * 61);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(0, -20, 64, 22, phase * 0.14, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

function drawScientistHumanoidCore(profile, scale = 1) {
    const color = profile.color || "#8bdcf2";
    const hitColor = profile.hitFlash > 0 ? "#ffffff" : color;
    ctx.save();
    ctx.scale(scale, scale);
    drawScientistTrait(profile);
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 13;
    ctx.shadowColor = hitColor;
    ctx.strokeStyle = hitColor;
    ctx.lineWidth = 2.8;

    ctx.fillStyle = profile.hitFlash > 0 ? "#ffffff" : "#102735";
    ctx.beginPath();
    ctx.moveTo(-48, 36);
    ctx.lineTo(-39, -5);
    ctx.lineTo(-23, -19);
    ctx.lineTo(23, -19);
    ctx.lineTo(39, -5);
    ctx.lineTo(48, 36);
    ctx.lineTo(20, 43);
    ctx.lineTo(12, 19);
    ctx.lineTo(-12, 19);
    ctx.lineTo(-20, 43);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#173b4b";
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(side * 37, -2);
      ctx.lineTo(side * 61, 12);
      ctx.lineTo(side * 54, 38);
      ctx.lineTo(side * 42, 26);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    ctx.fillStyle = "#d9edf2";
    ctx.beginPath();
    ctx.moveTo(-25, -19);
    ctx.lineTo(-31, -50);
    ctx.lineTo(-20, -69);
    ctx.lineTo(0, -79);
    ctx.lineTo(20, -69);
    ctx.lineTo(31, -50);
    ctx.lineTo(25, -19);
    ctx.lineTo(14, -9);
    ctx.lineTo(-14, -9);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#0b1d29";
    ctx.beginPath();
    ctx.moveTo(-24, -54);
    ctx.lineTo(-13, -62);
    ctx.lineTo(13, -62);
    ctx.lineTo(24, -54);
    ctx.lineTo(17, -41);
    ctx.lineTo(-17, -41);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = hitColor;
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 10;
    [-9, 9].forEach((eyeX) => {
      ctx.beginPath();
      ctx.ellipse(eyeX, -51, 5, 2.3, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(235, 249, 255, 0.72)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-10, -31);
    ctx.lineTo(0, -27);
    ctx.lineTo(10, -31);
    ctx.stroke();

    ctx.fillStyle = "#071824";
    ctx.strokeStyle = hitColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 7, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hitColor;
    ctx.font = `900 ${String(profile.sigil || "AI").length > 1 ? 9 : 13}px Roboto, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(profile.sigil || "AI", 0, 7);
    ctx.fillStyle = "rgba(231, 247, 252, 0.86)";
    ctx.font = "800 6px Roboto, sans-serif";
    ctx.fillText(profile.formula || "AI", 0, 28);
    ctx.restore();
  }

function drawBossNameplate() {
    if (!boss || bossIsCloaked()) return;
    const text = boss.name || copy[language()].bossName;
    const y = Math.max(87, boss.y - Math.min(76, (boss.radius || 90) * 0.62));
    ctx.save();
    ctx.font = "900 10px Roboto, sans-serif";
    const width = Math.min(242, Math.max(110, ctx.measureText(text).width + 30));
    const x = Math.max(width / 2 + 8, Math.min(WIDTH - width / 2 - 8, boss.x));
    ctx.fillStyle = "rgba(3, 12, 20, 0.8)";
    ctx.strokeStyle = boss.color || "#8bdcf2";
    ctx.lineWidth = 1.4;
    const left = x - width / 2;
    const top = y - 10;
    const height = 21;
    const radius = 7;
    ctx.beginPath();
    ctx.moveTo(left + radius, top);
    ctx.lineTo(left + width - radius, top);
    ctx.quadraticCurveTo(left + width, top, left + width, top + radius);
    ctx.lineTo(left + width, top + height - radius);
    ctx.quadraticCurveTo(left + width, top + height, left + width - radius, top + height);
    ctx.lineTo(left + radius, top + height);
    ctx.quadraticCurveTo(left, top + height, left, top + height - radius);
    ctx.lineTo(left, top + radius);
    ctx.quadraticCurveTo(left, top, left + radius, top);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f1fbff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y + 0.5);
    ctx.restore();
  }

function drawBoss2() {
    const pulse = 0.5 + Math.sin(boss.phase * 3.2) * 0.18;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
    ctx.shadowBlur = 24;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : `rgba(103, 188, 255, ${pulse})`;

    ctx.fillStyle = "#193b59";
    ctx.strokeStyle = "#9bd8f4";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 118, 62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#274f72";
    [-1, 1].forEach((side) => {
      ctx.fillRect(side * 92 - (side < 0 ? 105 : 0), -38, 105, 76);
      ctx.strokeRect(side * 92 - (side < 0 ? 105 : 0), -38, 105, 76);
      ctx.strokeStyle = "rgba(139, 213, 244, 0.42)";
      for (let line = 1; line < 4; line += 1) {
        const x = side * 92 - (side < 0 ? 105 : 0) + line * 26;
        ctx.beginPath();
        ctx.moveTo(x, -36);
        ctx.lineTo(x, 36);
        ctx.stroke();
      }
      ctx.strokeStyle = "#9bd8f4";
    });

    ctx.fillStyle = "#102c44";
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(135, 220, 247, 0.72)";
    ctx.lineWidth = 2;
    for (let cell = 0; cell < 6; cell += 1) {
      const angle = cell / 6 * Math.PI * 2 + boss.phase * 0.16;
      const cellX = Math.cos(angle) * 66;
      const cellY = Math.sin(angle) * 38;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 34, Math.sin(angle) * 20);
      ctx.lineTo(cellX, cellY);
      ctx.stroke();
      ctx.beginPath();
      for (let point = 0; point < 6; point += 1) {
        const nodeAngle = point / 6 * Math.PI * 2;
        const x = cellX + Math.cos(nodeAngle) * 7;
        const y = cellY + Math.sin(nodeAngle) * 7;
        if (!point) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    ctx.strokeStyle = "#84c9e8";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 82, boss.phase * 0.6, boss.phase * 0.6 + Math.PI * 1.45);
    ctx.stroke();
    ctx.strokeStyle = "#5d89d8";
    ctx.beginPath();
    ctx.arc(0, 0, 94, -boss.phase * 0.45, -boss.phase * 0.45 + Math.PI * 1.3);
    ctx.stroke();

    drawScientistHumanoidCore(boss, 0.67);

    [-62, 62].forEach((x) => {
      ctx.fillStyle = "#0c2539";
      ctx.fillRect(x - 17, 42, 34, 30);
      ctx.strokeStyle = "#77c8e8";
      ctx.strokeRect(x - 17, 42, 34, 30);
      ctx.fillStyle = "#ffb36e";
      ctx.beginPath();
      ctx.arc(x, 59, 6 + Math.sin(boss.phase * 8 + x) * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "#b7e9fb";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -48);
    ctx.lineTo(0, -92);
    ctx.lineTo(28, -112);
    ctx.stroke();
    ctx.fillStyle = "#8edcff";
    ctx.beginPath();
    ctx.arc(28, -112, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const barWidth = Math.min(620, WIDTH - 100);
    const barX = (WIDTH - barWidth) / 2;
    const ratio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(8, 24, 40, 0.82)";
    ctx.fillRect(barX - 5, 18, barWidth + 10, 34);
    ctx.fillStyle = "#142c42";
    ctx.fillRect(barX, 37, barWidth, 10);
    const gradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    gradient.addColorStop(0, "#4b85cf");
    gradient.addColorStop(1, "#92d8f5");
    ctx.fillStyle = gradient;
    ctx.fillRect(barX, 37, barWidth * ratio, 10);
    ctx.strokeStyle = "#b7e7f8";
    ctx.strokeRect(barX, 37, barWidth, 10);
    ctx.fillStyle = "#eefaff";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${copy[language()].boss2Name}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 30);
    ctx.fillStyle = "rgba(190, 226, 248, 0.9)";
    ctx.font = "800 10px Roboto, sans-serif";
    ctx.fillText("JOHN VON NEUMANN AI · SELF-REPLICATING AUTOMATON", WIDTH / 2, 62);
    ctx.fillStyle = "rgba(190, 226, 248, 0.68)";
    ctx.font = "700 9px Roboto, sans-serif";
    ctx.fillText(boss.strategy, WIDTH / 2, 74);
    ctx.restore();
  }

function drawApexBoss() {
    const pulse = 0.65 + Math.sin(boss.phase * 4) * 0.2;
    const form = (boss.tier - 3) % 6;
    const bodyRotation = form === 1 || form === 5
      ? boss.phase * 0.16
      : Math.sin(boss.phase * 0.7) * 0.12;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.rotate(bodyRotation);
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
    ctx.shadowBlur = 32;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : boss.color;
    ctx.fillStyle = boss.hitFlash > 0 ? "#ffffff" : "#172f43";
    ctx.strokeStyle = boss.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    const points = form === 0 ? 14 : form === 1 ? 16 : form === 2 ? 8 : form === 3 ? 12 : form === 4 ? 10 : 18;
    for (let point = 0; point < points; point += 1) {
      const angle = point / points * Math.PI * 2 - Math.PI / 2;
      let radius;
      if (form === 0) radius = point % 2 === 0 ? 112 : 58;
      else if (form === 1) radius = point % 4 === 0 ? 116 : point % 2 === 0 ? 82 : 65;
      else if (form === 2) radius = point % 2 === 0 ? 122 : 52;
      else if (form === 3) radius = point % 3 === 0 ? 118 : 70;
      else if (form === 4) radius = point % 2 === 0 ? 98 : 78;
      else radius = point % 3 === 0 ? 115 : point % 2 === 0 ? 72 : 55;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * (form === 2 ? 0.9 : form === 4 ? 0.55 : 0.72);
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (form === 1 || form === 3) {
      ctx.lineWidth = 5;
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(side * 72, 8, 25 + form * 2, boss.phase, boss.phase + Math.PI * 1.55);
        ctx.stroke();
        ctx.fillStyle = boss.color;
        ctx.beginPath();
        ctx.arc(side * 72, 8, 8 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    if (form === 2) {
      ctx.lineWidth = 7;
      for (let wing = -2; wing <= 2; wing += 1) {
        ctx.beginPath();
        ctx.moveTo(wing * 23, 5);
        ctx.quadraticCurveTo(wing * 40, 58, wing * 55, 92);
        ctx.stroke();
      }
    }
    if (form === 4) {
      ctx.lineWidth = 4;
      for (let pod = 0; pod < 5; pod += 1) {
        const angle = pod / 5 * Math.PI * 2 + boss.phase * 0.32;
        ctx.beginPath();
        ctx.arc(Math.cos(angle) * 92, Math.sin(angle) * 46, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }
    const signatureNodes = 2 + boss.tier % 5;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.55 * (bossIsCloaked() ? 0.18 : 1);
    for (let node = 0; node < signatureNodes; node += 1) {
      const angle = node / signatureNodes * Math.PI * 2 + boss.phase * (boss.tier % 2 ? 0.42 : -0.35);
      const orbitX = Math.cos(angle) * (78 + form * 4);
      const orbitY = Math.sin(angle) * (48 + (boss.tier % 3) * 7);
      ctx.beginPath();
      ctx.arc(orbitX, orbitY, 4 + boss.tier % 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
    if (boss.phaseStage > 1) {
      ctx.strokeStyle = boss.color;
      ctx.lineWidth = boss.phaseStage === 3 ? 5 : 3;
      ctx.globalAlpha = (0.42 + Math.sin(boss.phase * 6) * 0.16) * (bossIsCloaked() ? 0.18 : 1);
      for (let aura = 0; aura < boss.phaseStage; aura += 1) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          118 + aura * 13 + Math.sin(boss.phase * 3 + aura) * 5,
          72 + aura * 9,
          boss.phase * (aura % 2 ? -0.18 : 0.22),
          aura * 1.1,
          aura * 1.1 + Math.PI * 1.45
        );
        ctx.stroke();
      }
      ctx.globalAlpha = bossIsCloaked() ? 0.15 : 1;
    }

    ctx.rotate(-bodyRotation);
    drawScientistHumanoidCore(boss, 0.92 + Math.min(0.12, (boss.phaseStage - 1) * 0.04));
    ctx.restore();

    const barWidth = Math.min(620, WIDTH - 100);
    const barX = (WIDTH - barWidth) / 2;
    const healthRatio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(8, 24, 36, 0.78)";
    ctx.fillRect(barX, 36, barWidth, 10);
    ctx.fillStyle = boss.color;
    ctx.fillRect(barX, 36, barWidth * healthRatio, 10);
    ctx.strokeStyle = "rgba(225, 244, 251, 0.58)";
    ctx.strokeRect(barX, 36, barWidth, 10);
    ctx.fillStyle = "#eefaff";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    const phaseLabel = boss.phaseStage > 1 ? ` · PHASE ${boss.phaseStage}` : "";
    ctx.fillText(`${boss.name}${phaseLabel}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 29);
    ctx.fillStyle = boss.color;
    ctx.font = "800 10px Roboto, sans-serif";
    ctx.fillText(`${boss.scientist} AI · ${boss.formula}`, WIDTH / 2, 61);
    ctx.fillStyle = "rgba(222, 241, 248, 0.76)";
    ctx.font = "700 9px Roboto, sans-serif";
    ctx.fillText(boss.strategy, WIDTH / 2, 74);
    ctx.restore();
  }

function drawBoss() {
    if (!boss) return;
    if (bossIsCloaked() && !bossIntro) return;
    if (boss.type === "apex") {
      drawApexBoss();
      drawBossNameplate();
      return;
    }
    if (boss.type === "station") {
      drawBoss2();
      drawBossNameplate();
      return;
    }
    const glow = 0.5 + Math.sin(boss.phase * 3) * 0.12;
    ctx.save();
    ctx.translate(boss.x, boss.y);
    ctx.scale(boss.introScale || 1, boss.introScale || 1);
    ctx.globalAlpha = bossIsCloaked() ? 0.12 + Math.sin(boss.phase * 20) * 0.06 : 1;
    ctx.shadowBlur = 22;
    ctx.shadowColor = boss.hitFlash > 0 ? "#ffffff" : `rgba(104, 202, 232, ${glow})`;

    ctx.fillStyle = boss.hitFlash > 0 ? "#ffffff" : "#274d61";
    ctx.strokeStyle = "#a8d9e9";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 96);
    ctx.lineTo(-34, 55);
    ctx.lineTo(-112, 65);
    ctx.lineTo(-128, 42);
    ctx.lineTo(-70, 5);
    ctx.lineTo(-92, -47);
    ctx.lineTo(-45, -38);
    ctx.lineTo(0, -72);
    ctx.lineTo(45, -38);
    ctx.lineTo(92, -47);
    ctx.lineTo(70, 5);
    ctx.lineTo(128, 42);
    ctx.lineTo(112, 65);
    ctx.lineTo(34, 55);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#3d7891";
    ctx.beginPath();
    ctx.moveTo(0, 78);
    ctx.lineTo(-28, 18);
    ctx.lineTo(0, -48);
    ctx.lineTo(28, 18);
    ctx.closePath();
    ctx.fill();

    drawScientistHumanoidCore(boss, 0.76);

    [-78, 78].forEach((x) => {
      ctx.fillStyle = "#183544";
      ctx.strokeStyle = "#73bad3";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, 35, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = boss.lasers.some((laser) => laser.charge > 0) ? "#ff9c76" : "#7cd6ef";
      ctx.beginPath();
      ctx.arc(x, 35, 9 + Math.sin(boss.phase * 7) * 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    const barWidth = Math.min(560, WIDTH - 120);
    const barX = (WIDTH - barWidth) / 2;
    const healthRatio = Math.max(0, boss.hp / boss.maxHp);
    ctx.save();
    ctx.fillStyle = "rgba(12, 29, 40, 0.76)";
    ctx.fillRect(barX - 4, 20, barWidth + 8, 30);
    ctx.fillStyle = "#172d3a";
    ctx.fillRect(barX, 36, barWidth, 9);
    const healthGradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    healthGradient.addColorStop(0, "#d85f57");
    healthGradient.addColorStop(1, "#f1a16d");
    ctx.fillStyle = healthGradient;
    ctx.fillRect(barX, 36, barWidth * healthRatio, 9);
    ctx.strokeStyle = "rgba(225, 244, 251, 0.58)";
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, 36, barWidth, 9);
    ctx.fillStyle = "#f2f9fc";
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${copy[language()].bossName}  ${Math.ceil(boss.hp)} / ${boss.maxHp}`, WIDTH / 2, 29);
    ctx.fillStyle = "rgba(213, 241, 250, 0.88)";
    ctx.font = "800 10px Roboto, sans-serif";
    ctx.fillText("ISAAC NEWTON AI · F = ma · UNIVERSAL GRAVITY", WIDTH / 2, 60);
    if (boss.strategy) {
      ctx.fillStyle = "rgba(213, 241, 250, 0.66)";
      ctx.font = "700 9px Roboto, sans-serif";
      ctx.fillText(boss.strategy, WIDTH / 2, 73);
    }
    ctx.restore();
    drawBossNameplate();
  }

function drawBossIntro() {
    if (!bossIntro || !boss) return;
    const progress = Math.min(1, bossIntro.time / bossIntro.duration);
    const reveal = Math.max(0, Math.min(1, (progress - 0.36) / 0.22));
    const fadeOut = Math.max(0, Math.min(1, (1 - progress) / 0.13));
    const intensity = Math.min(reveal || progress * 2.5, fadeOut);
    const barHeight = 64 * Math.min(1, progress * 4) * fadeOut;
    const pulse = 0.55 + Math.sin(bossIntro.time * 9) * 0.25;

    ctx.save();
    const vignette = ctx.createRadialGradient(WIDTH / 2, HEIGHT / 2, HEIGHT * 0.1, WIDTH / 2, HEIGHT / 2, HEIGHT * 0.76);
    vignette.addColorStop(0, "rgba(3, 12, 20, 0.08)");
    vignette.addColorStop(1, `rgba(1, 5, 10, ${0.68 * fadeOut})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = `rgba(2, 7, 13, ${0.94 * fadeOut})`;
    ctx.fillRect(0, 0, WIDTH, barHeight);
    ctx.fillRect(0, HEIGHT - barHeight, WIDTH, barHeight);
    ctx.fillStyle = bossIntro.color;
    ctx.globalAlpha = 0.42 * fadeOut;
    ctx.fillRect(0, barHeight, WIDTH, 2);
    ctx.fillRect(0, HEIGHT - barHeight - 2, WIDTH, 2);

    const ringProgress = (bossIntro.time * 0.58) % 1;
    for (let ring = 0; ring < 4; ring += 1) {
      const ringPhase = (ringProgress + ring * 0.22) % 1;
      ctx.globalAlpha = (1 - ringPhase) * 0.58 * fadeOut;
      ctx.strokeStyle = bossIntro.color;
      ctx.lineWidth = 6 * (1 - ringPhase) + 1;
      ctx.beginPath();
      ctx.ellipse(boss.x, boss.y, 52 + ringPhase * 210, 24 + ringPhase * 105, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.18 * fadeOut;
    ctx.strokeStyle = bossIntro.color;
    ctx.lineWidth = 1;
    const scanY = (bossIntro.time * 360) % HEIGHT;
    for (let offset = -2; offset <= 2; offset += 1) {
      ctx.beginPath();
      ctx.moveTo(0, scanY + offset * 5);
      ctx.lineTo(WIDTH, scanY + offset * 5);
      ctx.stroke();
    }

    ctx.globalAlpha = intensity;
    const titleY = HEIGHT * 0.61;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 28;
    ctx.shadowColor = bossIntro.color;
    ctx.fillStyle = bossIntro.color;
    ctx.font = "800 12px Roboto, sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText(`— ${bossIntro.chapter} —`, WIDTH / 2, titleY - 50);

    ctx.shadowBlur = 38;
    ctx.fillStyle = "#f4fbff";
    const titleSize = Math.max(22, Math.min(42, WIDTH / Math.max(10, bossIntro.title.length) * 0.82));
    ctx.font = `900 ${titleSize}px Roboto, sans-serif`;
    const glitch = progress > 0.37 && progress < 0.48 ? Math.sin(bossIntro.time * 80) * 5 : 0;
    ctx.fillText(bossIntro.title, WIDTH / 2 + glitch, titleY);
    ctx.globalAlpha = intensity * 0.32;
    ctx.fillStyle = bossIntro.color;
    ctx.fillText(bossIntro.title, WIDTH / 2 - glitch * 1.5, titleY + 2);

    ctx.globalAlpha = intensity;
    ctx.shadowBlur = 12;
    ctx.fillStyle = bossIntro.color;
    ctx.font = "700 12px Roboto, sans-serif";
    ctx.fillText(bossIntro.subtitle, WIDTH / 2, titleY + 43);

    ctx.globalAlpha = pulse * fadeOut;
    ctx.lineWidth = 2;
    ctx.strokeStyle = bossIntro.color;
    const markerWidth = Math.min(260, WIDTH * 0.3);
    [-1, 1].forEach((side) => {
      ctx.beginPath();
      ctx.moveTo(WIDTH / 2 + side * (markerWidth + 18), titleY);
      ctx.lineTo(WIDTH / 2 + side * (markerWidth + 54), titleY);
      ctx.stroke();
    });
    ctx.restore();
  }

function drawApexProjectile(bullet) {
    if (!bullet.effect) return false;
    const color = bullet.color || "#ffb06c";
    const angle = Math.atan2(bullet.vy, bullet.vx);
    const pulse = 0.75 + Math.sin(elapsed * 9 + bullet.x * 0.03) * 0.2;
    ctx.save();
    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(angle);
    ctx.shadowBlur = renderQuality < 0.8 ? 0 : 18;
    ctx.shadowColor = color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    if (renderQuality < 0.55) {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    }

    if (bullet.effect === "prism_cage") {
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-6, -6, 12, 12);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(-9, -9, 18, 18);
    } else if (bullet.effect === "void_gates") {
      ctx.fillStyle = "rgba(8, 5, 22, 0.92)";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius + 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius + 7 + pulse * 2, 0.2, Math.PI * 1.65);
      ctx.stroke();
    } else if (bullet.effect === "frost_domain" || bullet.effect === "absolute_zero") {
      for (let arm = 0; arm < 6; arm += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bullet.radius + 6, 0);
        ctx.moveTo(bullet.radius * 0.6, 0);
        ctx.lineTo(bullet.radius, 4);
        ctx.moveTo(bullet.radius * 0.6, 0);
        ctx.lineTo(bullet.radius, -4);
        ctx.stroke();
      }
    } else if (bullet.effect === "echo_replay") {
      ctx.globalAlpha = 0.82;
      [-5, 5].forEach((offset) => {
        ctx.beginPath();
        ctx.arc(offset, 0, bullet.radius * 0.72, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else if (bullet.effect === "singularity" || bullet.effect === "black_hole") {
      ctx.fillStyle = "#050914";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.ellipse(0, 0, bullet.radius + 8, 4, elapsed * 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (bullet.effect === "future_grid") {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(0, -bullet.radius - 3);
      ctx.lineTo(bullet.radius + 7, bullet.radius + 5);
      ctx.lineTo(-bullet.radius - 7, bullet.radius + 5);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    } else if (bullet.effect === "corona_wave" || bullet.effect === "solar_sweep") {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      for (let ray = 0; ray < 6; ray += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(bullet.radius + 2, 0);
        ctx.lineTo(bullet.radius + 8 + pulse * 3, 0);
        ctx.stroke();
      }
    } else if (bullet.effect === "hydra_heads") {
      ctx.beginPath();
      ctx.moveTo(13, 0);
      ctx.lineTo(-7, -7);
      ctx.lineTo(-3, 0);
      ctx.lineTo(-7, 7);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#eaffc9";
      ctx.fillRect(2, -2, 6, 4);
    } else if (bullet.effect === "phase_cloak") {
      ctx.globalAlpha = 0.42 + pulse * 0.35;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(0, -9);
      ctx.lineTo(-12, 0);
      ctx.lineTo(0, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    } else if (bullet.effect === "time_stop") {
      ctx.rotate(elapsed * 3);
      ctx.strokeRect(-bullet.radius, -bullet.radius, bullet.radius * 2, bullet.radius * 2);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -bullet.radius + 2);
      ctx.moveTo(0, 0);
      ctx.lineTo(bullet.radius - 2, 0);
      ctx.stroke();
    } else if (bullet.effect === "scythe_cross") {
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(-3, 0, bullet.radius + 8, -1.1, 1.1);
      ctx.stroke();
      ctx.strokeStyle = "#e9fff7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(-3, 0, bullet.radius + 4, -1, 1);
      ctx.stroke();
    } else if (bullet.effect === "quantum_decoys") {
      ctx.rotate(elapsed * 4 + bullet.x);
      ctx.globalAlpha = 0.72;
      ctx.strokeRect(-bullet.radius, -bullet.radius, bullet.radius * 2, bullet.radius * 2);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-4, -4, 8, 8);
    } else if (bullet.effect === "shrinking_world") {
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-8, -9);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffdbe5";
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, bullet.radius * 0.42, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return true;
  }
