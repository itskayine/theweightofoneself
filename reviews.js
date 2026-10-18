// ------------------------------------------------------------
// HOW TO ADD A REVIEW
//
// 1. Copy one whole block, from { to }, and paste it under the last one.
// 2. Change the name, role, age and text.
//    - role and age are optional: delete the line, or leave "" / remove age.
//    - stars is optional (1 to 5). If you leave it out, it shows 5 stars.
//    - Paste the review text between the two backticks ` `.
//      Leave an empty line between paragraphs.
//      Avoid using a backtick ` inside the text itself.
// ------------------------------------------------------------

const REVIEWS = [
  {
    stars: 5,
    name: "Ghita S.",
    role: "Student",
    age: 19,
    text: `I started this novel without knowing quite what to expect. I closed it destabilized, and I loved that.

From the very first words, I was drawn into Arthur's routine. The novel's greatest strength is its tone. The opening
 made me smile, even laugh. Then, slowly and without warning, unease crept in. I could never say exactly when the
  mood shifted, and that gradual descent kept captivating me.

What struck me most was the main character. I did not always like him, far from it. Still, I could never let him go.
 The author plays with that tension, and it held me until the final page.

One question kept turning over in my head : who are we when we obey? What remains of us, and who answers for it?
 No easy answer is offered, and I am glad. I kept thinking about it long after I finished which is obviously the sign of a good book.

I recommend this novel to anyone, regardless their likes or dislikes, because it is short enough to be read in a single
 sitting, yet each chapter is sharp, so the story unfolds almost effortlessly, carrying you from one chapter to the next.

It asks something of you, and it gives something back. You may argue with it, you may even resent it, but you will not forget it.`,
  },
  {
    stars: 5,
    name: "Elodie K.",
    role: "Student",
    age: 20,
    text: `A great novel, very well written and paced. I really enjoyed reading it and did so in one go !
    Good character development and astute depiction of self doubt. I loved how we discover the system through
     the narrator’s eyes making it almost natural. I sincerely recommend !`
  }
];

// ------------------------------------------------------------
// Below this line, nothing needs to be changed.
// ------------------------------------------------------------

const box = document.getElementById("reviews");

if (box) {
  if (REVIEWS.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No reviews yet. Be the first to share what you thought.";
    box.appendChild(empty);
  }

  REVIEWS.forEach(function (review) {
    const figure = document.createElement("figure");
    figure.className = "review";

    const rating = review.stars === undefined ? 5 : Math.round(Number(review.stars) * 2) / 2;
    const stars = Math.min(5, Math.max(0, isNaN(rating) ? 5 : rating));
    const starBox = document.createElement("div");
    starBox.className = "stars";
    starBox.setAttribute("role", "img");
    starBox.setAttribute("aria-label", stars + " out of 5 stars");
    for (let i = 1; i <= 5; i++) {
      // 100 = full star, 50 = half star, 0 = empty star
      const fill = Math.round(Math.min(1, Math.max(0, stars - (i - 1))) * 100);
      const star = document.createElement("span");
      star.textContent = "★";
      star.setAttribute("aria-hidden", "true");
      star.style.background = "linear-gradient(90deg, var(--lamp, #e3a04a) " + fill + "%, #cfc7b8 " + fill + "%)";
      star.style.webkitBackgroundClip = "text";
      star.style.backgroundClip = "text";
      star.style.webkitTextFillColor = "transparent";
      star.style.color = "transparent";
      starBox.appendChild(star);
    }
    figure.appendChild(starBox);

    const quote = document.createElement("blockquote");
    String(review.text || "")
      .split(/\n\s*\n/)
      .forEach(function (paragraph) {
        const clean = paragraph.trim();
        if (clean) {
          const p = document.createElement("p");
          p.textContent = clean;
          quote.appendChild(p);
        }
      });
    figure.appendChild(quote);

    const caption = document.createElement("figcaption");
    const name = document.createElement("span");
    name.className = "reviewer-name";
    name.textContent = review.name || "A reader";
    caption.appendChild(name);

    const details = [review.role, review.age].filter(Boolean).join(", ");
    if (details) {
      const role = document.createElement("span");
      role.className = "reviewer-role";
      role.textContent = details;
      caption.appendChild(role);
    }
    figure.appendChild(caption);

    box.appendChild(figure);
  });
}
