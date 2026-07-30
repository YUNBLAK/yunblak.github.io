const clamp01 = (value) => Math.max(0, Math.min(1, value));

export function smoothstep(start, end, value) {
  const t = clamp01((value - start) / Math.max(1, end - start));
  return t * t * (3 - 2 * t);
}

export function daylightAt(minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  const sunrise = smoothstep(300, 510, time);
  const sunset = 1 - smoothstep(1050, 1260, time);
  return clamp01(sunrise * sunset);
}

export function sunsetGlowAt(minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  const evening = smoothstep(930, 1080, time) * (1 - smoothstep(1200, 1320, time));
  const morning = smoothstep(270, 390, time) * (1 - smoothstep(480, 600, time));
  return clamp01(Math.max(evening, morning * .65));
}

export function blendHex(from, to, amount) {
  const t = clamp01(amount);
  const parse = (hex) => [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16)
  ];
  const a = parse(from);
  const b = parse(to);
  const channels = a.map((value, index) => Math.round(value + (b[index] - value) * t));
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

export function interpolatePalette(keyframes, minute) {
  const time = ((minute % 1440) + 1440) % 1440;
  let left = keyframes[0];
  let right = keyframes[keyframes.length - 1];
  for (let index = 0; index < keyframes.length - 1; index++) {
    if (time >= keyframes[index].minute && time <= keyframes[index + 1].minute) {
      left = keyframes[index];
      right = keyframes[index + 1];
      break;
    }
  }
  const amount = smoothstep(left.minute, right.minute, time);
  return left.colors.map((color, index) => blendHex(color, right.colors[index], amount));
}
