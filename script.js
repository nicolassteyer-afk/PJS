const root = document.documentElement;
const hero = document.querySelector(".hero-track");
const body = document.body;
const cursorLarge = document.querySelector(".cursor-large");
const cursorSmall = document.querySelector(".cursor-small");
const floatingNext = document.querySelector(".floating-next");
const nextLabel = document.querySelector("[data-next-label]");

const routeMap = [
  { id: "start", label: "(Home)", href: "#home" },
  { id: "home", label: "(About)", href: "#about" },
  { id: "about", label: "(Works)", href: "#works" },
  { id: "works", label: "(Contact)", href: "#contact" },
  { id: "contact", label: "(Start)", href: "#start" }
];

document.querySelectorAll(".split-title").forEach(title => {
  const text = title.textContent;
  title.textContent = "";
  [...text].forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "char";
    span.style.setProperty("--i", index);
    span.innerHTML = letter === " " ? "&nbsp;" : letter;
    title.appendChild(span);
  });
});

const titleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle("is-seen", entry.isIntersecting));
}, { threshold: 0.24 });

document.querySelectorAll(".split-title").forEach(title => titleObserver.observe(title));

function updatePageMotion() {
  const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
  const progress = window.scrollY / maxScroll;
  root.style.setProperty("--progress", progress.toFixed(4));

  if (hero) {
    const rect = hero.getBoundingClientRect();
    const travel = hero.offsetHeight - window.innerHeight;
    const local = Math.min(Math.max(-rect.top / Math.max(travel, 1), 0), 1);
    root.style.setProperty("--shift", Math.round(local * window.innerWidth * 1.25));
  }

  let active = routeMap[0];
  routeMap.forEach(item => {
    const section = document.getElementById(item.id);
    if (section && section.getBoundingClientRect().top < window.innerHeight * 0.52) active = item;
  });

  if (floatingNext && nextLabel) {
    floatingNext.href = active.href;
    nextLabel.textContent = active.label;
  }
}

window.addEventListener("scroll", updatePageMotion, { passive: true });
window.addEventListener("resize", updatePageMotion);
updatePageMotion();

window.addEventListener("pointermove", event => {
  if (!cursorLarge || !cursorSmall) return;
  const x = `${event.clientX}px`;
  const y = `${event.clientY}px`;
  cursorSmall.style.left = x;
  cursorSmall.style.top = y;
  cursorLarge.animate({ left: x, top: y }, { duration: 420, fill: "forwards", easing: "cubic-bezier(.16,1,.3,1)" });
});

document.querySelectorAll("a, .work-row").forEach(item => {
  item.addEventListener("pointerenter", () => {
    body.classList.add("is-hovering");
    if (cursorLarge) cursorLarge.dataset.label = item.dataset.cursor || "open";
  });
  item.addEventListener("pointerleave", () => {
    body.classList.remove("is-hovering");
    if (cursorLarge) cursorLarge.dataset.label = "";
  });
});
