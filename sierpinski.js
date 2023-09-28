const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const slider = document.getElementById("slider");

const deg_to_rad = Math.PI / 180.0;

function drawSierpinski(x, y, size, depth) {
    if (depth === 0) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - size / 2, y - size * Math.sqrt(3) / 2);
        context.lineTo(x - size, y);
        context.closePath();
        context.lineWidth = 3;
        context.strokeStyle = "white";
        context.stroke();
        context.fill();
    } else {
        const x1 = x + size / 2;
        const y1 = y;
        const x2 = x;
        const y2 = y + size * Math.sqrt(3) / 2;
        const x3 = x + size;
        const y3 = y + size * Math.sqrt(3) / 2;

        drawSierpinski(x, y, size / 2, depth - 1);
        drawSierpinski(x - size / 2, y, size / 2, depth - 1);
        drawSierpinski(x - size / 4, y - size * Math.sqrt(3) / 4, size / 2, depth - 1);
        
    }
}

slider.addEventListener("change", function () {
  generateFractal(slider.value);
});

function generateFractal(n) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawSierpinski(570, 525, 450, n);
}
