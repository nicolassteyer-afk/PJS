const root = document.documentElement;
const hero = document.querySelector(".hero-track");

function updatePageMotion() {
  const maxScroll = Math.max(root.scrollHeight - window.innerHeight, 1);
  const progress = window.scrollY / maxScroll;
  root.style.setProperty("--progress", progress.toFixed(4));

  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  const travel = hero.offsetHeight - window.innerHeight;
  const local = Math.min(Math.max(-rect.top / Math.max(travel, 1), 0), 1);
  root.style.setProperty("--shift", Math.round(local * window.innerWidth * 1.25));
}

window.addEventListener("scroll", updatePageMotion, { passive: true });
window.addEventListener("resize", updatePageMotion);
updatePageMotion();
