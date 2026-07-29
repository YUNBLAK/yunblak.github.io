/**
 * Frost Wing — audio
 * Sound synthesis, sound state, and audio controls.
 * This source is assembled into ../game.js by build-game.mjs.
 */
function ensureAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = soundMuted ? 0 : 0.72;
      masterGain.connect(audioContext.destination);
      const noiseLength = Math.floor(audioContext.sampleRate);
      noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noiseLength; index += 1) noiseData[index] = Math.random() * 2 - 1;
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return true;
  }

function playTone(frequency, endFrequency, duration, volume, type, delay) {
    if (soundMuted || !ensureAudio()) return;
    if (activeAudioVoices >= (renderQuality < 0.55 ? 10 : renderQuality < 0.8 ? 14 : 24)) return;
    activeAudioVoices += 1;
    const start = audioContext.currentTime + (delay || 0);
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type || "sine";
    oscillator.frequency.setValueAtTime(Math.max(20, frequency), start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency || frequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      activeAudioVoices = Math.max(0, activeAudioVoices - 1);
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

function playNoise(duration, volume, cutoff) {
    if (soundMuted || !ensureAudio()) return;
    if (!noiseBuffer || activeAudioVoices >= (renderQuality < 0.55 ? 10 : renderQuality < 0.8 ? 14 : 24)) return;
    activeAudioVoices += 1;
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    filter.type = "lowpass";
    filter.frequency.value = cutoff || 900;
    const noiseEnd = audioContext.currentTime + Math.min(duration, 0.95);
    gain.gain.setValueAtTime(volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, noiseEnd);
    source.buffer = noiseBuffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
      activeAudioVoices = Math.max(0, activeAudioVoices - 1);
    };
    source.start();
    source.stop(noiseEnd);
  }

function playLevelSound() {
    playTone(440, 440, 0.14, 0.07, "sine", 0);
    playTone(554, 554, 0.14, 0.07, "sine", 0.12);
    playTone(659, 880, 0.28, 0.08, "sine", 0.24);
  }

function updateSoundButton() {
    const t = copy[language()];
    const label = soundMuted ? t.unmute : t.mute;
    soundButton.setAttribute("aria-label", label);
    soundButton.setAttribute("title", label);
    soundButton.setAttribute("aria-pressed", soundMuted ? "true" : "false");
    const icon = soundButton.querySelector("i");
    if (icon) icon.className = soundMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
  }

function toggleSound() {
    soundMuted = !soundMuted;
    try {
      localStorage.setItem("frostWingMuted", String(soundMuted));
    } catch (error) {}
    if (!soundMuted) ensureAudio();
    if (masterGain && audioContext) {
      masterGain.gain.setTargetAtTime(soundMuted ? 0 : 0.72, audioContext.currentTime, 0.02);
    }
    updateSoundButton();
    if (!soundMuted) playTone(520, 740, 0.12, 0.05, "sine");
  }
