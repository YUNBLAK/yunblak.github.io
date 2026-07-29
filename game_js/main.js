/**
 * Frost Wing — main
 * Keyboard, touch, UI event wiring, and game startup.
 * This source is assembled into ../game.js by build-game.mjs.
 */
window.addEventListener("keydown", (event) => {
    if (!terminalPanel.hidden) {
      if (event.code === "Escape") {
        event.preventDefault();
        closeTerminal();
      }
      return;
    }
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
      event.preventDefault();
    }
    if (["Space", "ShiftRight", "KeyB", "KeyL", "Enter"].includes(event.code)) ensureAudio();
    keys.add(event.code);
    if (event.code === "KeyB" && !event.repeat) useBomb(players[0]);
    if (event.code === "KeyL" && !event.repeat && players[1]) useBomb(players[1]);
    if (event.code === "KeyP" && !event.repeat) togglePause();
    if (event.code === "Enter" && !event.repeat && ["ready", "paused", "gameover"].includes(mode)) startGame();
  });

window.addEventListener("keyup", (event) => {
    keys.delete(event.code);
  });

if (MOBILE_LAYOUT && mobileControls && joystick && mobileFireButton && mobileBombButton) {
    joystick.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileInput.active = true;
      mobileInput.pointerId = event.pointerId;
      joystick.setPointerCapture(event.pointerId);
      updateMobileJoystick(event);
    });
    joystick.addEventListener("pointermove", (event) => {
      if (mobileInput.pointerId !== event.pointerId) return;
      event.preventDefault();
      updateMobileJoystick(event);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      joystick.addEventListener(eventName, (event) => resetMobileJoystick(event.pointerId));
    });
    mobileFireButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileInput.fire = true;
      mobileFireButton.setPointerCapture(event.pointerId);
      mobileFireButton.classList.add("is-pressed");
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      mobileFireButton.addEventListener(eventName, () => {
        mobileInput.fire = false;
        mobileFireButton.classList.remove("is-pressed");
      });
    });
    mobileBombButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      ensureAudio();
      mobileBombButton.setPointerCapture(event.pointerId);
      mobileBombButton.classList.add("is-pressed");
      useBomb(players[0]);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach((eventName) => {
      mobileBombButton.addEventListener(eventName, () => mobileBombButton.classList.remove("is-pressed"));
    });
  }

window.addEventListener("blur", () => {
    keys.clear();
    resetMobileJoystick();
    mobileInput.fire = false;
    if (mode === "running") togglePause();
  });

startButton.addEventListener("click", () => {
    ensureAudio();
    startGame();
  });

playerSelect.querySelectorAll("[data-player-count]").forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      startGame(Number(button.dataset.playerCount));
    });
  });

soundButton.addEventListener("click", toggleSound);

terminalButton.addEventListener("click", () => {
    if (terminalPanel.hidden) openTerminal();
    else closeTerminal();
  });

terminalCloseButton.addEventListener("click", closeTerminal);

terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    const numberedBossCommand = command.match(/^boss([1-9]|1[0-9]|20)$/);
    if (command === "boss") {
      ensureAudio();
      jumpToBoss();
    } else if (numberedBossCommand) {
      ensureAudio();
      prepareBossStage(Number(numberedBossCommand[1]));
    } else {
      terminalOutput.textContent = copy[language()].terminalUnknown;
      terminalInput.select();
    }
  });

levelOptions.querySelectorAll("[data-upgrade]").forEach((button) => {
    button.addEventListener("click", () => chooseUpgrade(button.dataset.upgrade));
  });

classOptions.querySelectorAll("[data-class]").forEach((button) => {
    button.addEventListener("click", () => chooseClass(button.dataset.class));
  });

document.addEventListener("i18nchange", () => {
    updateSoundButton();
    updateTerminalLanguage();
    if (mode === "paused") showOverlay("paused");
    else if (mode === "gameover") showOverlay("gameover");
    else if (mode === "ready") showOverlay("ready");
    else if (mode === "levelup") showLevelUp();
    else if (mode === "classup") showClassChoice();
  });

resetGame();

showOverlay("ready");

updateSoundButton();

updateTerminalLanguage();

requestAnimationFrame(frame);
