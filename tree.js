const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const slider = document.getElementById("slider");

const deg_to_rad = Math.PI / 180.0;

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 2;
  context.strokeStyle = "white";
  context.stroke();
}
function drawTree(x1, y1, angle, depth) {
  if (depth !== 0) {
    var x2 = x1 + Math.cos(angle * deg_to_rad) * depth * 10.0;
    var y2 = y1 + Math.sin(angle * deg_to_rad) * depth * 10.0;
    drawLine(x1, y1, x2, y2, depth);
    drawTree(x2, y2, angle - 20, depth - 1);
    drawTree(x2, y2, angle + 20, depth - 1);
  }
}

slider.addEventListener("change", function () {
  generateFractal(slider.value);
});

function generateFractal(n) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(350, 600, -90, n);
}
