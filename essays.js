// ------------------------------------------------------------
// HOW TO ADD AN ESSAY
//
// 1. Copy one whole block, from { to }, and paste it ABOVE the others
//    (the newest essay goes first).
// 2. Change the title, date, summary and link.
//    - image is optional: upload the photo next to this file and write
//      its name, e.g. "my-photo.jpg". Without it, the card gets a color.
// ------------------------------------------------------------

const ESSAYS = [
  {
    title: "Should We Sometimes Disobey the Law?",
    date: "15/10/2026",
    summary: "From Antigone to Rawls: when does obeying the law stop being a virtue?",
    link: "https://kayine.substack.com/p/should-we-sometimes-disobey-the-law?r=994z5i&utm_campaign=post-expanded-share&utm_medium=web",
    image: "should_we_sometimes_disobey_the_law.jpg",
  },
];

// ------------------------------------------------------------
// Below this line, nothing needs to be changed.
// ------------------------------------------------------------

const AUTHOR = "Kayine";

const FALLBACK_COLORS = [
  "linear-gradient(160deg, #566574, #9fb0c0)",
  "linear-gradient(160deg, #9a5b0f, #e3a04a)",
  "linear-gradient(160deg, #7b8794, #d7c9b5)",
];

const essayBox = document.getElementById("essays");

if (essayBox) {
  if (ESSAYS.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "New essays are coming soon.";
    essayBox.appendChild(empty);
  }

  ESSAYS.forEach(function (essay, index) {
    const card = document.createElement("a");
    card.className = "card";
    card.href = essay.link;
    card.target = "_blank";
    card.rel = "noopener";
    card.style.setProperty(
      "--card-bg",
      essay.image
        ? 'url("' + essay.image + '")'
        : FALLBACK_COLORS[index % FALLBACK_COLORS.length]
    );

    const meta = document.createElement("span");
    meta.className = "card-meta";
    meta.textContent = [essay.date, AUTHOR].filter(Boolean).join(" · ");
    card.appendChild(meta);

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = essay.title;
    card.appendChild(title);

    if (essay.summary) {
      const summary = document.createElement("span");
      summary.className = "card-tags";
      summary.textContent = essay.summary;
      card.appendChild(summary);
    }

    essayBox.appendChild(card);
  });
}
