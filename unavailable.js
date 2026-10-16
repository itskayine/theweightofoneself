// Pop-up shown when someone clicks a "Buy" button.
(function () {
  var dialog = document.createElement("dialog");
  dialog.className = "sale-dialog";
  dialog.setAttribute("aria-labelledby", "sale-title");
  dialog.innerHTML =
    '<h2 id="sale-title">Currently unavailable</h2>' +
    "<p>Due to the legal context of the author, the book cannot be sold at the moment.</p>" +
    '<button type="button" class="buy dark">Close</button>';
  document.body.appendChild(dialog);

  dialog.querySelector("button").addEventListener("click", function () {
    dialog.close();
  });

  // Clicking outside the box also closes it.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  document.querySelectorAll("[data-unavailable]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      dialog.showModal();
    });
  });
})();
