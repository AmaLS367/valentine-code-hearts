import { useState, useRef, useCallback } from "react";

const ValentineGenerator = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 600;
    const h = 400;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#fce4ec");
    grad.addColorStop(0.5, "#f8bbd0");
    grad.addColorStop(1, "#f48fb1");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, w, h, 20);
    ctx.fill();

    // Draw decorative hearts
    ctx.font = "28px serif";
    const hearts = ["💕", "💗", "💖", "❤️", "💘"];
    for (let i = 0; i < 12; i++) {
      ctx.globalAlpha = 0.2 + Math.random() * 0.15;
      ctx.fillText(
        hearts[Math.floor(Math.random() * hearts.length)],
        Math.random() * w,
        Math.random() * h
      );
    }
    ctx.globalAlpha = 1;

    // Title
    ctx.fillStyle = "#880e4f";
    ctx.font = "bold 32px 'Nunito', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Happy Valentine's Day 💘", w / 2, 70);

    // To / From
    ctx.font = "22px 'Nunito', system-ui, sans-serif";
    ctx.fillStyle = "#ad1457";
    ctx.fillText(`Для: ${to || "..."}`, w / 2, 140);
    ctx.fillText(`От: ${from || "..."}`, w / 2, 175);

    // Note
    ctx.font = "18px 'Nunito', system-ui, sans-serif";
    ctx.fillStyle = "#6a1b4d";

    // Word-wrap note
    const words = (note || "С любовью ❤️").split(" ");
    let line = "";
    let y = 240;
    const maxWidth = w - 80;

    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), w / 2, y);
        line = word + " ";
        y += 28;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), w / 2, y);

    // Footer
    ctx.font = "14px 'Nunito', system-ui, sans-serif";
    ctx.fillStyle = "#c2185b";
    ctx.globalAlpha = 0.6;
    ctx.fillText("Made with ❤️ + JS", w / 2, h - 25);
    ctx.globalAlpha = 1;

    // Download as PNG
    const link = document.createElement("a");
    link.download = `valentine-${to || "card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [to, from, note]);

  return (
    <section className="w-full max-w-md mx-auto" aria-label="Генератор валентинок">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-4">
        💌 Сгенерировать валентинку
      </h2>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="val-to" className="text-sm font-semibold text-muted-foreground mb-1 block">
            Кому
          </label>
          <input
            id="val-to"
            type="text"
            maxLength={40}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <div>
          <label htmlFor="val-from" className="text-sm font-semibold text-muted-foreground mb-1 block">
            От кого
          </label>
          <input
            id="val-from"
            type="text"
            maxLength={40}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <div>
          <label htmlFor="val-note" className="text-sm font-semibold text-muted-foreground mb-1 block">
            Записка
          </label>
          <textarea
            id="val-note"
            maxLength={200}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Короткая записка..."
            className="w-full px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
          />
        </div>

        <button
          onClick={generateCard}
          className="heart-button py-3 px-6 rounded-xl font-bold text-base animate-none hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Скачать открытку как PNG"
        >
          📥 Скачать открытку
        </button>
      </div>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </section>
  );
};

export default ValentineGenerator;
