// Pop-up shown when someone clicks a "Notify me when it’s live" button.
// It sends people to your Substack to leave their email, and brings its own styles.
(function () {
  var TITLE = "Get notified when it’s live";
  var MESSAGE = "The e-book isn’t on sale yet. Subscribe to my Substack with your email and you’ll hear from me as soon as it is. You’ll also receive my new essays.";
  var SUBSTACK = "https://kayine.substack.com";
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

dialog.sale-dialog .sale-actions{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: .75rem;
}

dialog.sale-dialog .sale-cta,
dialog.sale-dialog .sale-cta:visited,
dialog.sale-dialog .sale-cta:hover,
dialog.sale-dialog .sale-close{
  display: inline-block;
  box-sizing: border-box;
  padding: .5rem 1.25rem;
  border: 2px solid var(--brand, #27313c);
  border-radius: 20px;
  background: var(--brand, #27313c);
  color: #fff;
  font: inherit;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  cursor: pointer;
}

dialog.sale-dialog .sale-close{
  background: transparent;
  color: var(--ink, #27313c);
  border-color: var(--ink, #27313c);
}

dialog.sale-dialog .sale-cta:focus-visible,
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
    '<div class="sale-actions">' +
    '<a class="sale-cta" href="' + SUBSTACK + '/subscribe" target="_blank" rel="noopener">Subscribe on Substack</a>' +
    '<button type="button" class="sale-close">Close</button>' +
    "</div>";
  document.body.appendChild(dialog);

  function openDialog() {
    if (typeof dialog.showModal !== "function") {
      window.open(SUBSTACK + "/subscribe", "_blank", "noopener");
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
