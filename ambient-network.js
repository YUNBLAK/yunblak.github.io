(function () {
  "use strict";

  const canvas = document.getElementById("ambient-network");
  if (!canvas) return;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const themeObserver = new MutationObserver(handleThemeChange);
  const pointer = { x: 0, y: 0, active: false };

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let particles = [];
  let frameId = 0;
  let lastFrame = 0;
  let resizeTimer = 0;
  let seed = 260802691;

  const palettes = {
    light: {
      line: [36, 100, 145],
      points: [
        [47, 111, 159],
        [91, 126, 168],
        [113, 101, 176]
      ]
    },
    dark: {
      line: [112, 208, 248],
      points: [
        [125, 211, 252],
        [148, 192, 230],
        [172, 161, 255]
      ]
    }
  };

  function random() {
    seed += 0x6D2B79F5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  }

  function rgba(rgb, alpha) {
    return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
  }

  function currentPalette() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? palettes.dark
      : palettes.light;
  }

  function createParticles() {
    seed = 260802691;
    const isCompact = width < 640;
    const areaPerParticle = isCompact ? 10500 : 13000;
    const minimum = isCompact ? 30 : 44;
    const maximum = isCompact ? 44 : 88;
    const count = Math.max(minimum, Math.min(maximum, Math.round((width * height) / areaPerParticle)));

    const columns = Math.max(1, Math.ceil(Math.sqrt(count * (width / height))));
    const rows = Math.max(1, Math.ceil(count / columns));
    const slots = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        slots.push({ row: row, column: column });
      }
    }

    for (let index = slots.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      const current = slots[index];
      slots[index] = slots[target];
      slots[target] = current;
    }

    particles = Array.from({ length: count }, function (_, index) {
      const slot = slots[index];
      const depth = 0.58 + random() * 0.72;
      const speed = 0.004 + random() * 0.006;
      const angle = random() * Math.PI * 2;
      const horizontalJitter = 0.14 + random() * 0.72;
      const verticalJitter = 0.14 + random() * 0.72;

      return {
        x: ((slot.column + horizontalJitter) / columns) * width,
        y: ((slot.row + verticalJitter) / rows) * height,
        vx: Math.cos(angle) * speed * depth,
        vy: Math.sin(angle) * speed * depth,
        depth: depth,
        radius: 0.9 + random() * 1.35,
        color: index % 11 === 0 ? 2 : (index % 5 === 0 ? 1 : 0),
        shape: index % 17 === 0 ? "ring" : (index % 29 === 0 ? "diamond" : "dot"),
        phase: random() * Math.PI * 2
      };
    });
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    createParticles();
    draw(performance.now(), true);
  }

  function update(delta) {
    const margin = 28;

    particles.forEach(function (particle) {
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;

      if (particle.x < -margin) particle.x = width + margin;
      if (particle.x > width + margin) particle.x = -margin;
      if (particle.y < -margin) particle.y = height + margin;
      if (particle.y > height + margin) particle.y = -margin;
    });
  }

  function drawConnections(palette) {
    const connectionDistance = width < 640 ? 134 : 182;
    const maxDistanceSquared = connectionDistance * connectionDistance;

    for (let first = 0; first < particles.length; first += 1) {
      const a = particles[first];

      for (let second = first + 1; second < particles.length; second += 1) {
        const b = particles[second];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared > maxDistanceSquared) continue;

        const distance = Math.sqrt(distanceSquared);
        const strength = 1 - distance / connectionDistance;
        const depth = Math.min(a.depth, b.depth);

        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.lineWidth = 0.62 + depth * 0.43;
        context.strokeStyle = rgba(palette.line, (0.11 + strength * strength * 0.35) * depth);
        context.stroke();
      }
    }
  }

  function drawPointerConnections(palette) {
    if (!pointer.active || !finePointerQuery.matches) return;

    const connectionDistance = 145;
    particles.forEach(function (particle) {
      const dx = pointer.x - particle.x;
      const dy = pointer.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > connectionDistance) return;

      const strength = 1 - distance / connectionDistance;
      context.beginPath();
      context.moveTo(pointer.x, pointer.y);
      context.lineTo(particle.x, particle.y);
      context.lineWidth = 1;
      context.strokeStyle = rgba(palette.line, strength * strength * 0.43);
      context.stroke();
    });
  }

  function drawParticles(time, palette) {
    particles.forEach(function (particle) {
      const pulse = 1 + Math.sin(time * 0.00055 + particle.phase) * 0.12;
      const radius = particle.radius * particle.depth * pulse;
      const color = palette.points[particle.color];

      if (particle.shape !== "dot") {
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 3.2, 0, Math.PI * 2);
        context.fillStyle = rgba(color, 0.06);
        context.fill();
      }

      context.beginPath();
      if (particle.shape === "diamond") {
        context.moveTo(particle.x, particle.y - radius * 1.8);
        context.lineTo(particle.x + radius * 1.8, particle.y);
        context.lineTo(particle.x, particle.y + radius * 1.8);
        context.lineTo(particle.x - radius * 1.8, particle.y);
        context.closePath();
        context.strokeStyle = rgba(color, 0.76 * particle.depth);
        context.lineWidth = 0.8;
        context.stroke();
      } else if (particle.shape === "ring") {
        context.arc(particle.x, particle.y, radius * 1.55, 0, Math.PI * 2);
        context.strokeStyle = rgba(color, 0.76 * particle.depth);
        context.lineWidth = 0.8;
        context.stroke();
      } else {
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fillStyle = rgba(color, 0.72 * particle.depth);
        context.fill();
      }
    });
  }

  function draw(time, staticFrame) {
    context.clearRect(0, 0, width, height);
    const palette = currentPalette();

    drawConnections(palette);
    drawPointerConnections(palette);
    drawParticles(time, palette);

    if (staticFrame) canvas.classList.add("is-ready");
  }

  function animate(time) {
    if (motionQuery.matches) {
      draw(time, true);
      frameId = 0;
      return;
    }

    if (!lastFrame) lastFrame = time;
    const elapsed = Math.min(time - lastFrame, 48);

    if (elapsed >= 24) {
      update(elapsed);
      draw(time, true);
      lastFrame = time;
    }

    frameId = window.requestAnimationFrame(animate);
  }

  function start() {
    if (frameId) window.cancelAnimationFrame(frameId);
    lastFrame = 0;

    if (motionQuery.matches) {
      draw(performance.now(), true);
      frameId = 0;
      return;
    }

    frameId = window.requestAnimationFrame(animate);
  }

  function handleThemeChange() {
    if (motionQuery.matches || document.hidden) draw(performance.now(), true);
  }

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resize();
      start();
    }, 140);
  }, { passive: true });

  window.addEventListener("pointermove", function (event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });

  document.documentElement.addEventListener("pointerleave", function () {
    pointer.active = false;
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    } else {
      start();
    }
  });

  motionQuery.addEventListener("change", start);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  resize();
  start();
})();
