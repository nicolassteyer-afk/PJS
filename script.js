const canvas = document.querySelector("#signal-field");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let nodes = [];
let pointer = { x: 0, y: 0, active: false };

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(36, Math.floor((width * height) / 26000));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    pulse: Math.random() * Math.PI * 2,
    type: index % 5 === 0 ? "hot" : "cool"
  }));
}

function drawGrid(time) {
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgba(145, 255, 218, 0.1)";
  ctx.lineWidth = 1;

  const offset = (time * 0.012) % 44;
  for (let x = -44 + offset; x < width + 44; x += 44) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + width * 0.16, height);
    ctx.stroke();
  }

  for (let y = -44 + offset; y < height + 44; y += 44) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y - height * 0.08);
    ctx.stroke();
  }
  ctx.restore();
}

function drawNodes(time) {
  nodes.forEach((node) => {
    node.x += node.vx;
    node.y += node.vy;
    node.pulse += 0.024;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;
  });

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 150) {
        const alpha = (1 - distance / 150) * 0.34;
        ctx.strokeStyle = `rgba(97, 255, 225, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  if (pointer.active) {
    nodes.forEach((node) => {
      const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      if (distance < 220) {
        ctx.strokeStyle = `rgba(203, 255, 71, ${(1 - distance / 220) * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      }
    });
  }

  nodes.forEach((node) => {
    const radius = 1.5 + Math.sin(node.pulse + time * 0.002) * 0.9;
    ctx.fillStyle = node.type === "hot" ? "rgba(203, 255, 71, 0.88)" : "rgba(97, 255, 225, 0.7)";
    ctx.beginPath();
    ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2);
    ctx.fill();
  });
}

function render(time = 0) {
  ctx.clearRect(0, 0, width, height);
  drawGrid(time);
  drawNodes(time);
  requestAnimationFrame(render);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

resize();
render();
