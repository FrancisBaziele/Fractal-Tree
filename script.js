const button = document.querySelector(".generator-tree-button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
let curve = 7;

canvas.width = width;
canvas.height = height;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = "black";
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  //ctx.lineTo(0, -len);
  if (angle > 0) {
    ctx.bezierCurveTo(curve, -len / 2, curve, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(curve, -len / 2, -10, -curve / 2, 0, -len);
  }

  ctx.stroke();

  if (len < 5) {
    //Leaves
    ctx.beginPath();
    ctx.arc(0, -len, 15, 0, Math.PI / 2);
    ctx.fill();

    ctx.restore();
    return;
  }
  console.log(curve);
  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6);

  ctx.restore();
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min));
}

drawTree(width / 2, canvas.height - 80, 120, 0, 15, "brown", "pink");

function genRandomTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let centerX = width / 2;
  let len = random(0, 20) + 100;
  let angle = 0;
  let branch = random(0, 70) + 1;
  let colour1 = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
  let colour2 = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
  let curve = random(-10, 10) + 10;
  console.log(curve);
  button.style.backgroundColor = colour1;

  drawTree(centerX, canvas.height - 80, len, angle, branch, colour1, colour2);
}

button.addEventListener("click", genRandomTree);
window.onresize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  console.log("resized");
  genRandomTree();
};
