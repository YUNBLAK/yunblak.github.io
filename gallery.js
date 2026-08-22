(function () {
  "use strict";

  const dialog = document.getElementById("gallery-lightbox");
  if (!dialog) return;

  const dialogImage = dialog.querySelector("img");
  const dialogCaption = dialog.querySelector("p");
  const closeButton = dialog.querySelector(".mag-lightbox-close");
  let activeTrigger = null;

  function closeLightbox() {
    if (dialog.open) dialog.close();
  }

  document.querySelectorAll(".mag-shot-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const thumbnail = button.querySelector("img");
      const figure = button.closest("figure");
      const caption = figure && figure.querySelector("figcaption");

      activeTrigger = button;
      dialogImage.src = button.dataset.full || thumbnail.src;
      dialogImage.alt = thumbnail.alt || "Gallery image";
      dialogCaption.textContent = caption ? caption.textContent : (button.dataset.caption || "");
      document.body.classList.add("lightbox-open");
      dialog.showModal();
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeLightbox();
  });
  dialog.addEventListener("close", function () {
    document.body.classList.remove("lightbox-open");
    dialogImage.removeAttribute("src");
    if (activeTrigger) activeTrigger.focus({ preventScroll: true });
  });
})();
