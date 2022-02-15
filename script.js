const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  if (len < 10) {
    ctx.restore();
    return;
  }

  drawTree(0, -len, len * 0.75, angle + 85, branchWidth);
  drawTree(0, -len, len * 0.75, angle - 85, branchWidth);

  ctx.restore();
}

drawTree(width / 2, canvas.height - 80, 120, 0, 2, "brown", "green");
