/**
 * Frost Wing — map
 * Frozen terrain generation, palettes, and background rendering.
 * This source is assembled into ../game.js by build-game.mjs.
 */
const DARK_GAME_PALETTE = {
    groundTop: "#173440",
    groundBottom: "#214c5b",
    grid: "rgba(139, 197, 218, 0.12)",
    river: "rgba(64, 117, 138, 0.72)",
    riverEdge: "rgba(136, 195, 216, 0.18)",
    feature: "#2c5a67",
    featureEdge: "#6f9eaa",
    shadow: "rgba(2, 17, 25, 0.2)",
    snow: "rgba(224, 244, 252, 0.74)",
    player: "#e5f5fb",
    playerEdge: "#6ab4d9",
    canopy: "#68b6dc",
    engine: "#8fe2ff",
    bullet: "#dff8ff",
    enemy: "#cf7b72",
    enemyEdge: "#ffd0c8"
  };

const LIGHT_GAME_PALETTE = {
    groundTop: "#dcecf1",
    groundBottom: "#bfd9e2",
    grid: "rgba(73, 133, 158, 0.12)",
    river: "rgba(156, 204, 220, 0.74)",
    riverEdge: "rgba(255, 255, 255, 0.5)",
    feature: "#a7c8d2",
    featureEdge: "#7ca9b7",
    shadow: "rgba(54, 91, 106, 0.12)",
    snow: "rgba(255, 255, 255, 0.9)",
    player: "#f8fdff",
    playerEdge: "#397ca4",
    canopy: "#70b8d8",
    engine: "#2e91c2",
    bullet: "#187db2",
    enemy: "#b85f58",
    enemyEdge: "#7f3935"
  };

function palette() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? DARK_GAME_PALETTE
      : LIGHT_GAME_PALETTE;
  }

function makeStars() {
    stars = Array.from({ length: 86 }, () => {
      const alpha = 0.25 + Math.random() * 0.65;
      return {
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        radius: 0.7 + Math.random() * 2,
        speed: 22 + Math.random() * 70,
        alpha,
        alphaBand: Math.min(2, Math.floor(alpha * 3))
      };
    });
    terrainFeatures = Array.from({ length: 18 }, () => ({
      x: 45 + Math.random() * (WIDTH - 90),
      y: Math.random() * (HEIGHT + 200) - 100,
      radius: 20 + Math.random() * 58,
      kind: Math.floor(Math.random() * 3),
      stretch: 0.55 + Math.random() * 0.8
    }));
  }

function drawBackground(colors) {
    const gradientKey = `${colors.groundTop}|${colors.groundBottom}`;
    if (!backgroundGradient || backgroundGradientKey !== gradientKey) {
      backgroundGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      backgroundGradient.addColorStop(0, colors.groundTop);
      backgroundGradient.addColorStop(1, colors.groundBottom);
      backgroundGradientKey = gradientKey;
    }
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const riverStep = renderQuality < 0.55 ? 48 : renderQuality < 0.8 ? 36 : 24;
    for (let y = -40; y <= HEIGHT + 40; y += riverStep) {
      const worldY = y - terrainOffset;
      const x = WIDTH * 0.5 + Math.sin(worldY * 0.006) * 128 + Math.sin(worldY * 0.015) * 26;
      if (y === -40) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = colors.riverEdge;
    ctx.lineWidth = 140;
    ctx.stroke();
    ctx.strokeStyle = colors.river;
    ctx.lineWidth = 112;
    ctx.stroke();

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    const gridOffset = terrainOffset % 105;
    ctx.beginPath();
    for (let y = gridOffset - 105; y < HEIGHT + 105; y += 105) {
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
    }
    const columnStep = renderQuality < 0.55 ? 290 : 145;
    const bendStep = renderQuality < 0.8 ? 45 : 30;
    for (let x = 85; x < WIDTH; x += columnStep) {
      for (let y = -30; y <= HEIGHT + 30; y += bendStep) {
        const bend = Math.sin((y - terrainOffset) * 0.012 + x) * 9;
        if (y === -30) ctx.moveTo(x + bend, y);
        else ctx.lineTo(x + bend, y);
      }
    }
    ctx.stroke();

    terrainFeatures.forEach((feature, featureIndex) => {
      if (renderQuality < 0.55 && featureIndex % 2) return;
      if (renderQuality < 0.8 && featureIndex % 3 === 0) return;
      const y = ((feature.y + terrainOffset + 100) % (HEIGHT + 200)) - 100;
      if (feature.kind === 2) {
        ctx.fillStyle = colors.shadow;
        ctx.beginPath();
        ctx.ellipse(feature.x + 15, y + 18, feature.radius * 1.45, feature.radius * 0.58, 0.22, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.fillStyle = colors.feature;
      ctx.strokeStyle = colors.featureEdge;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = feature.kind === 0 ? 0.48 : 0.68;
      ctx.beginPath();
      ctx.ellipse(feature.x, y, feature.radius, feature.radius * feature.stretch, feature.kind === 0 ? -0.25 : 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (feature.kind === 1) {
        ctx.fillStyle = colors.featureEdge;
        ctx.beginPath();
        for (let i = 0; i < 4; i += 1) {
          const angle = i * 1.7 + feature.x;
          const detailX = feature.x + Math.cos(angle) * feature.radius * 0.45;
          const detailY = y + Math.sin(angle) * feature.radius * 0.25;
          const detailRadius = 4 + (i % 2) * 2;
          ctx.moveTo(detailX + detailRadius, detailY);
          ctx.arc(detailX, detailY, detailRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });

    if (renderQuality >= 0.55) {
      ctx.strokeStyle = colors.riverEdge;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const crackY = (terrainOffset * 1.35) % (HEIGHT + 160) - 80;
      ctx.moveTo(70, crackY);
      ctx.lineTo(160, crackY + 26);
      ctx.lineTo(235, crackY + 12);
      ctx.lineTo(310, crackY + 55);
      ctx.stroke();
    }

    ctx.fillStyle = colors.snow;
    for (let band = 0; band < 3; band += 1) {
      ctx.globalAlpha = 0.36 + band * 0.27;
      ctx.beginPath();
      let hasStars = false;
      for (let starIndex = 0; starIndex < stars.length; starIndex += 1) {
        if (renderQuality < 0.55 && starIndex % 2) continue;
        if (renderQuality < 0.8 && starIndex % 3 === 0) continue;
        const star = stars[starIndex];
        if (star.alphaBand !== band) continue;
        ctx.moveTo(star.x + star.radius, star.y);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        hasStars = true;
      }
      if (hasStars) ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
