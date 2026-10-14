// To add a review, copy the line inside the list below, remove the // at the start, and edit the text and name.
const REVIEWS = [
  // { text: "Your review text here.", name: "Reader name" },
];

const box = document.getElementById("reviews");
if (box) {
  if (REVIEWS.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No reviews on the site yet. Be the first to share what you thought.";
    box.appendChild(p);
  }
  REVIEWS.forEach(function (r) {
    const b = document.createElement("blockquote");
    b.appendChild(document.createTextNode(r.text));
    const c = document.createElement("cite");
    c.textContent = r.name;
    b.appendChild(c);
    box.appendChild(b);
  });
}
