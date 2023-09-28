const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const offset = 50;
const slider = document.getElementById("slider");

let prev = [offset, offset],
  curr,
  N;

function hindex2xy(index, order) {
  let x = 0;
  let y = 0;
  let t = index;

  for (let s = 1; s < order; s *= 2) {
    const rx = 1 & (t >> 1);
    const ry = 1 & (t ^ rx);

    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      [x, y] = [y, x]; // Swap x and y
    }

    x += s * rx;
    y += s * ry;
    t >>= 2;
  }

  return [x, y];
}

function HSVtoHex(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return (
    "#" +
    componentToHex(Math.round(r * 255)) +
    componentToHex(Math.round(g * 255)) +
    componentToHex(Math.round(b * 255))
  );
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function draw(i, N) {
  context.fillStyle = HSVtoHex(i / (N * N), 1, 0.5);

  curr = hindex2xy(i, N);

  let size = 600 / (N - 1);
  let x1 = prev[0] * size;
  let y1 = prev[1] * size;
  let x2 = Math.abs(size * curr[0]);
  let y2 = Math.abs(size * curr[1]);
  context.fillRect(offset + x1, offset + y1, 5, 5);
  if (y1 == y2 && x2 > x1) {
    context.fillRect(offset + x1, offset + y1, x2 - x1, 5);
  }
  if (y1 == y2 && x2 < x1) {
    context.fillRect(offset + x2, offset + y2, x1 - x2, 5);
  }
  if (x1 == x2 && y1 > y2) {
    context.fillRect(offset + x2, offset + y2, 5, y1 - y2 + 5);
  }
  if (x1 == x2 && y1 < y2) {
    context.fillRect(offset + x2, offset + y2, 5, y1 - y2);
  }

  prev = curr;
}

slider.addEventListener("change", function () {
  generateFractal(slider.value);
});

function generateFractal(n) {
  N = Math.pow(2, n);

  context.clearRect(0, 0, canvas.width, canvas.height);

  prev = [offset, offset];

  for (var i = 0; i < N * N; i += 1) {
    draw(i, N);
  }
}
