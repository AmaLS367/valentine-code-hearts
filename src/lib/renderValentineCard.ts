/**
 * Renders a pastel valentine card to a canvas.
 * Uses scale for crisp export (e.g. 2 = 2x resolution).
 * All drawing is in logical units; canvas size = base * scale.
 */

const BASE_W = 600;
const BASE_H = 400;

export interface ValentineCardData {
  to: string;
  from: string;
  note: string;
}

export type StickerStyle = "cat" | "hearts" | "sparkles";

/** Simple seeded RNG for deterministic texture */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function drawPastelBackground(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, BASE_W, BASE_H);
  g.addColorStop(0, "#fce4ec");   // pink
  g.addColorStop(0.4, "#ffecd2"); // peach
  g.addColorStop(0.7, "#f8e1f4"); // lavender-pink
  g.addColorStop(1, "#e8e0f0");   // lavender
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, BASE_W, BASE_H);
}

function drawPaperCard(ctx: CanvasRenderingContext2D) {
  const pad = 40;
  const x = pad;
  const y = pad;
  const w = BASE_W - pad * 2;
  const h = BASE_H - pad * 2;
  const r = 24;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.12)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "rgba(255, 252, 250, 0.98)";
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
  ctx.restore();
}

function drawNoiseTexture(ctx: CanvasRenderingContext2D) {
  const pad = 40;
  const x = pad;
  const y = pad;
  const w = BASE_W - pad * 2;
  const h = BASE_H - pad * 2;
  const rand = seededRandom(12345);
  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = "#c4a0a0";
  for (let i = 0; i < 800; i++) {
    const px = x + rand() * w;
    const py = y + rand() * h;
    ctx.beginPath();
    ctx.arc(px, py, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy + size * 0.35);
  ctx.bezierCurveTo(cx, cy, cx - size * 0.5, cy - size * 0.2, cx - size * 0.5, cy + size * 0.35);
  ctx.bezierCurveTo(cx - size * 0.5, cy + size * 0.7, cx, cy + size * 1.1, cx, cy + size * 1.1);
  ctx.bezierCurveTo(cx, cy + size * 1.1, cx + size * 0.5, cy + size * 0.7, cx + size * 0.5, cy + size * 0.35);
  ctx.bezierCurveTo(cx + size * 0.5, cy - size * 0.2, cx, cy, cx, cy + size * 0.35);
  ctx.fill();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1, size * 0.15);
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * size, cy + Math.sin(a) * size);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDecorations(ctx: CanvasRenderingContext2D, stickerStyle: StickerStyle) {
  const pad = 40;
  const colors = ["#e8a0b0", "#d88aa0", "#c97b9a"];
  const drawHearts = stickerStyle === "hearts" || stickerStyle === "cat";
  const drawSparkles = stickerStyle === "sparkles" || stickerStyle === "cat";

  if (drawHearts) {
    drawHeart(ctx, pad + 28, pad + 28, 14, colors[0]);
    drawHeart(ctx, BASE_W - pad - 28, pad + 28, 12, colors[1]);
    drawHeart(ctx, pad + 26, BASE_H - pad - 26, 10, colors[2]);
    drawHeart(ctx, BASE_W - pad - 24, BASE_H - pad - 24, 11, colors[0]);
    if (stickerStyle === "hearts") {
      drawHeart(ctx, BASE_W / 2 - 50, pad + 32, 10, colors[1]);
      drawHeart(ctx, BASE_W / 2 + 50, pad + 32, 10, colors[2]);
      drawHeart(ctx, pad + 50, BASE_H / 2 - 20, 9, colors[0]);
      drawHeart(ctx, BASE_W - pad - 50, BASE_H / 2 - 20, 9, colors[1]);
    }
  }
  if (drawSparkles) {
    drawSparkle(ctx, pad + 55, pad + 20, 8, "#e8c0d0");
    drawSparkle(ctx, BASE_W - pad - 50, pad + 22, 6, "#e8c0d0");
    drawSparkle(ctx, pad + 50, BASE_H - pad - 18, 6, "#e8c0d0");
    drawSparkle(ctx, BASE_W - pad - 55, BASE_H - pad - 22, 8, "#e8c0d0");
    if (stickerStyle === "sparkles") {
      drawSparkle(ctx, BASE_W / 2 - 60, pad + 24, 7, "#e8c0d0");
      drawSparkle(ctx, BASE_W / 2 + 55, pad + 26, 6, "#e8c0d0");
      drawSparkle(ctx, pad + 70, BASE_H / 2 - 24, 6, "#e8c0d0");
      drawSparkle(ctx, BASE_W - pad - 65, BASE_H / 2 - 22, 7, "#e8c0d0");
    }
  }
}

function drawCatSticker(ctx: CanvasRenderingContext2D, stickerStyle: StickerStyle) {
  if (stickerStyle !== "cat") return;
  const x = BASE_W - 52;
  const y = BASE_H - 52;
  ctx.save();
  // Head circle
  ctx.fillStyle = "#f5d0c8";
  ctx.strokeStyle = "#d4a89a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Ears
  ctx.fillStyle = "#f5d0c8";
  ctx.strokeStyle = "#d4a89a";
  ctx.beginPath();
  ctx.moveTo(x - 18, y - 8);
  ctx.lineTo(x - 10, y - 28);
  ctx.lineTo(x - 2, y - 10);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 2, y - 10);
  ctx.lineTo(x + 10, y - 28);
  ctx.lineTo(x + 18, y - 8);
  ctx.fill();
  ctx.stroke();
  // Eyes
  ctx.fillStyle = "#5c4a42";
  ctx.beginPath();
  ctx.arc(x - 7, y - 4, 3, 0, Math.PI * 2);
  ctx.arc(x + 7, y - 4, 3, 0, Math.PI * 2);
  ctx.fill();
  // Nose
  ctx.fillStyle = "#c49a8a";
  ctx.beginPath();
  ctx.moveTo(x, y + 2);
  ctx.lineTo(x - 4, y + 8);
  ctx.lineTo(x + 4, y + 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawTextContent(ctx: CanvasRenderingContext2D, data: ValentineCardData) {
  const pad = 40;
  const innerLeft = pad + 32;
  const innerRight = BASE_W - pad - 32;
  const innerTop = pad + 28;
  const maxTextWidth = innerRight - innerLeft;
  const lineHeight = 22;
  const noteLineHeight = 20;

  const toStr = data.to.trim() || "...";
  const fromStr = data.from.trim() || "...";
  const noteStr = data.note.trim() || "With love ❤️";

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Title
  ctx.fillStyle = "#8b2e5c";
  ctx.font = "bold 28px 'Nunito', system-ui, sans-serif";
  ctx.fillText("Happy Valentine's Day 💘", BASE_W / 2, innerTop);

  let y = innerTop + 44;

  // To
  ctx.fillStyle = "#a83d6b";
  ctx.font = "18px 'Nunito', system-ui, sans-serif";
  ctx.fillText(`To: ${toStr}`, BASE_W / 2, y);
  y += lineHeight + 8;

  // Note (word wrap)
  ctx.fillStyle = "#6b3a52";
  ctx.font = "16px 'Nunito', system-ui, sans-serif";
  const words = noteStr.split(/\s+/);
  let line = "";
  const lines: string[] = [];
  for (const word of words) {
    const test = line ? line + " " + word : word;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxTextWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const maxNoteLines = 5;
  const noteLines = lines.slice(0, maxNoteLines);
  for (const ln of noteLines) {
    ctx.fillText(ln, BASE_W / 2, y);
    y += noteLineHeight;
  }
  y += 12;

  // From
  ctx.fillStyle = "#a83d6b";
  ctx.font = "18px 'Nunito', system-ui, sans-serif";
  ctx.fillText(`From: ${fromStr}`, BASE_W / 2, y);
}

/**
 * Renders the valentine card onto the given canvas.
 * @param canvas - Target canvas element
 * @param data - To, From, Note strings
 * @param scale - 1 for preview, 2 for crisp export
 * @param stickerStyle - "cat" | "hearts" | "sparkles" for extra card decorations
 */
export function renderValentineCard(
  canvas: HTMLCanvasElement,
  data: ValentineCardData,
  scale: number = 1,
  stickerStyle: StickerStyle = "cat"
): void {
  const w = BASE_W * scale;
  const h = BASE_H * scale;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(scale, scale);

  drawPastelBackground(ctx);
  drawPaperCard(ctx);
  drawNoiseTexture(ctx);
  drawDecorations(ctx, stickerStyle);
  drawCatSticker(ctx, stickerStyle);
  drawTextContent(ctx, data);
}
