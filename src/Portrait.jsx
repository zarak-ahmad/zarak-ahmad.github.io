import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

function sampleBackground(data, width) {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const size = Math.max(3, Math.round(width * 0.12));
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * width + x) * 4;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n += 1;
    }
  }
  return [r / n, g / n, b / n];
}

function backgroundMask(data, width, height) {
  const [sr, sg, sb] = sampleBackground(data, width);
  const distance = (index) => {
    const dr = data[index] - sr;
    const dg = data[index + 1] - sg;
    const db = data[index + 2] - sb;
    return Math.hypot(dr, dg, db);
  };

  const mask = new Uint8Array(width * height);
  const seen = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    stack.push(p);
  };

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (distance(p * 4) > 34) continue;
    mask[p] = 1;
    const x = p % width;
    const y = Math.floor(p / width);
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  return mask;
}

function buildCells(image) {
  const cols = 86;
  const rows = Math.max(1, Math.round(cols * (image.height / image.width)));
  const offscreen = document.createElement("canvas");
  offscreen.width = cols;
  offscreen.height = rows;
  const offscreenContext = offscreen.getContext("2d", { willReadFrequently: true });
  offscreenContext.drawImage(image, 0, 0, cols, rows);
  const { data } = offscreenContext.getImageData(0, 0, cols, rows);
  const background = backgroundMask(data, cols, rows);
  const cells = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const p = y * cols + x;
      if (background[p]) continue;
      const i = p * 4;
      const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (lum < 18) continue;
      const depth = y / rows;
      const fade = depth > 0.78 ? 1 - (depth - 0.78) / 0.22 : 1;
      if (fade <= 0.04) continue;
      cells.push({
        x,
        y,
        lum: lum * fade,
        order: depth * 0.62 + Math.random() * 0.38,
        jx: (Math.random() - 0.5) * 0.45,
        jy: (Math.random() - 0.5) * 0.45,
      });
    }
  }

  return { cells, cols, rows };
}

const Portrait = forwardRef(function Portrait(_, ref) {
  const canvasRef = useRef(null);
  const specRef = useRef(null);
  const progressRef = useRef(0);

  const paint = () => {
    const canvas = canvasRef.current;
    const spec = specRef.current;
    if (!canvas || !spec) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    const progress = progressRef.current;
    if (progress <= 0) return;

    const cellW = width / spec.cols;
    const cellH = height / spec.rows;

    for (const cell of spec.cells) {
      const local = (progress - cell.order) / 0.2;
      if (local <= 0) continue;
      const alpha = Math.max(0, Math.min(1, local));
      const arriving = local < 1;
      const tone = cell.lum / 255;
      const boost = arriving ? 1.35 : 1;
      const red = Math.min(255, tone * 188 * boost);
      const green = Math.min(255, tone * 204 * boost);
      const blue = Math.min(255, tone * 232 * boost);
      const size = (arriving ? 0.42 : 0.72) * Math.min(cellW, cellH);
      const px = (cell.x + cell.jx) * cellW + (cellW - size) / 2;
      const py = (cell.y + cell.jy) * cellH + (cellH - size) / 2;
      context.globalAlpha = alpha;
      context.fillStyle = `rgb(${red | 0}, ${green | 0}, ${blue | 0})`;
      context.fillRect(px, py, size, size);
    }
    context.globalAlpha = 1;
  };

  useImperativeHandle(ref, () => ({
    setProgress(value) {
      progressRef.current = value;
      paint();
    },
  }));

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = "/portrait.png";
    image.onload = () => {
      if (cancelled) return;
      specRef.current = buildCells(image);
      paint();
    };

    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="portrait" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
});

export default Portrait;
