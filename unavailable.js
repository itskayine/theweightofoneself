// Pop-up shown when someone clicks a "Notify me when it’s live" button.
// It shows the Brevo email signup form and brings its own styles.
(function () {
  var TITLE = "Get notified when it’s live";
  var MESSAGE = "The e-book is launching soon. Leave your email and you’ll be the first to know when it’s out.";

  // Brevo signup form. It only loads the first time the pop-up opens,
  // so visitors who never click don’t load anything from Brevo.
  var FORM_URL = "https://50f0f619.sibforms.com/v2/serve/MUIFAM9LFLyf9YdY6ShQHi297KiZgC2mukTtVShe5dsNX-pgj6TvIeMClEutMJZJgnE8d9HUlqzHOGqg6ck7S7A-TDO4GkjnYI4NaPRCdkO6DRBSJp_pOpK1OUPFeX_AFKlcdBdpa7ujqPdGnvqR_xwbtGmCRLJTY5ri4UG3zcM8mPHPd0wyIZR3eP7mCHoromWR1uz4j1SGKf-0Hw==";

  var FADE_MS = 250;

  var css = `
dialog.sale-dialog{
  box-sizing: border-box;
  width: calc(100% - 2rem);
  max-width: 34rem;
  max-height: calc(100% - 2rem);
  margin: auto;
  padding: 1.75rem 1.5rem 1.5rem;
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
  margin: 0 0 1.25rem;
  line-height: 1.6;
}

dialog.sale-dialog iframe.sale-form{
  display: block;
  width: 100%;
  height: 22rem;
  margin: 0 auto 1rem;
  border: 0;
  border-radius: 8px;
}

dialog.sale-dialog .sale-actions{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: .75rem;
}

dialog.sale-dialog .sale-close{
  display: inline-block;
  box-sizing: border-box;
  padding: .5rem 1.25rem;
  border: 2px solid var(--ink, #27313c);
  border-radius: 20px;
  background: transparent;
  color: var(--ink, #27313c);
  font: inherit;
  font-weight: 600;
  line-height: 1.4;
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
    '<iframe class="sale-form" title="Email signup form" scrolling="auto"></iframe>' +
    '<div class="sale-actions">' +
    '<button type="button" class="sale-close">Close</button>' +
    "</div>";
  document.body.appendChild(dialog);

  var frame = dialog.querySelector("iframe.sale-form");

  // Counts the click in GoatCounter (if it has loaded).
  function track(name) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({
          path: name + "-" + (location.pathname.split("/").pop() || "index"),
          title: name,
          event: true
        });
      }
    } catch (e) {}
  }

  function openDialog() {
    track("notify-click");
    if (!frame.getAttribute("src")) {
      frame.setAttribute("src", FORM_URL);
    }
    if (typeof dialog.showModal !== "function") {
      window.open(FORM_URL, "_blank", "noopener");
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
