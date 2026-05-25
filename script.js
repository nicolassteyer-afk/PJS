const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d");
const speed = document.querySelector("[data-speed]");
const revealItems = [...document.querySelectorAll(".thought-stack article")];

let width = 0;
let height = 0;
let dots = [];
let scrollValue = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(60, Math.floor((width * height) / 9000));
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 2 + 1
  }));
}

function updateScroll() {
  const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  scrollValue = scrollY / max;
  if (speed) speed.textContent = (11 + scrollValue * 89).toFixed(1);
}

function setupReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
    { threshold: 0.28 }
  );
  revealItems.forEach(item => observer.observe(item));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(20,20,20,.7)";
  ctx.strokeStyle = "rgba(20,20,20,.12)";

  dots.forEach(dot => {
    dot.x += dot.vx + scrollValue * 0.45;
    dot.y += dot.vy;
    if (dot.x < 0) dot.x = width;
    if (dot.x > width) dot.x = 0;
    if (dot.y < 0) dot.y = height;
    if (dot.y > height) dot.y = 0;

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fill();
  });

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i];
      const b = dots[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.globalAlpha = 1 - d / 120;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

addEventListener("resize", resize);
addEventListener("scroll", updateScroll, { passive: true });

resize();
updateScroll();
setupReveal();
draw();
