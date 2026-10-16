// Pop-up shown when someone clicks a "Not available yet" button.
// The pop-up brings its own styles, so it looks right even if style.css is old or cached.
(function () {
  var TITLE = "Not available yet";
  var MESSAGE = "The e-book is not available for purchase at the moment. Thank you for your interest.";
  var FADE_MS = 250;

  var css = `
dialog.sale-dialog{
  box-sizing: border-box;
  width: calc(100% - 3rem);
  max-width: 28rem;
  margin: auto;
  padding: 2rem;
  border: 0;
  border-radius: 12px;
  background: var(--line, #ddd7cd);
  color: var(--ink, #27313c);
  text-align: center;
  box-shadow: 0 30px 60px -20px rgba(29, 39, 51, .5);
  opacity: 0;
  transform: translateY(12px) scale(.98);
  transition: opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease;
}

dialog.sale-dialog.is-open{
  opacity: 1;
  transform: none;
}

dialog.sale-dialog::backdrop{
  background: #ddd7cd;
  opacity: 0;
  transition: opacity ${FADE_MS}ms ease;
}

dialog.sale-dialog.is-open::backdrop{
  opacity: .55;
}

dialog.sale-dialog h2{
  margin: 0 0 .75rem;
  font-family: var(--serif, Georgia, serif);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.15;
}

dialog.sale-dialog p{
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

dialog.sale-dialog .sale-close{
  padding: .5rem 1.25rem;
  border: 0;
  border-radius: 20px;
  background: var(--brand, #27313c);
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

dialog.sale-dialog .sale-close:focus-visible{
  outline: 3px solid var(--ink, #27313c);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce){
  dialog.sale-dialog,
  dialog.sale-dialog::backdrop{
    transition: none;
  }
}
`;

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var dialog = document.createElement("dialog");
  dialog.className = "sale-dialog";
  dialog.setAttribute("aria-labelledby", "sale-title");
  dialog.innerHTML =
    '<h2 id="sale-title">' + TITLE + "</h2>" +
    "<p>" + MESSAGE + "</p>" +
    '<button type="button" class="sale-close">Close</button>';
  document.body.appendChild(dialog);

  function openDialog() {
    if (typeof dialog.showModal !== "function") {
      window.alert(MESSAGE);
      return;
    }
    dialog.showModal();
    void dialog.offsetWidth; // let the browser draw the hidden state first, so the fade plays
    dialog.classList.add("is-open");
  }

  function closeDialog() {
    if (!dialog.open) {
      return;
    }
    dialog.classList.remove("is-open");
    setTimeout(function () {
      dialog.close();
    }, FADE_MS);
  }

  dialog.querySelector(".sale-close").addEventListener("click", closeDialog);

  // Clicking outside the box closes it.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  // The Esc key fades out too, instead of vanishing.
  dialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    closeDialog();
  });

  document.querySelectorAll("[data-unavailable]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openDialog();
    });
  });
})();
