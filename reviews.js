// To add a review, copy the line inside the list below, remove the // at the start, and edit the text and name.
// "stars" is optional (1 to 5). Once the list has at least one review, the example cards on the page are replaced.
const REVIEWS = [
  // { text: "Your review text here.", name: "Reader name", stars: 5 },
];

const box = document.getElementById("reviews");
if (box && REVIEWS.length > 0) {
  box.textContent = "";
  REVIEWS.forEach(function (r) {
    const f = document.createElement("figure");
    f.className = "review";
    if (r.stars) {
      const s = document.createElement("div");
      s.className = "stars";
      s.setAttribute("role", "img");
      s.setAttribute("aria-label", r.stars + " out of 5 stars");
      s.textContent = "★".repeat(r.stars);
      f.appendChild(s);
    }
    const b = document.createElement("blockquote");
    b.textContent = r.text;
    f.appendChild(b);
    const c = document.createElement("figcaption");
    c.textContent = r.name;
    f.appendChild(c);
    box.appendChild(f);
  });
}
