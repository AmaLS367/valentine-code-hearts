import { useState, useRef, useCallback, useEffect } from "react";
import { renderValentineCard, type StickerStyle } from "@/lib/renderValentineCard";

const STICKER_OPTIONS: { value: StickerStyle; label: string }[] = [
  { value: "cat", label: "Котик" },
  { value: "hearts", label: "Сердечки" },
  { value: "sparkles", label: "Звёздочки" },
];

const ValentineGenerator = () => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [stickerStyle, setStickerStyle] = useState<StickerStyle>("cat");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data = { to, from, note };

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderValentineCard(canvas, data, 1, stickerStyle);
  }, [to, from, note, stickerStyle]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  const handleDownload = useCallback(() => {
    const off = document.createElement("canvas");
    renderValentineCard(off, data, 2, stickerStyle);
    const link = document.createElement("a");
    link.download = `valentine-${to?.trim() || "card"}.png`;
    link.href = off.toDataURL("image/png");
    link.click();
  }, [to, from, note, stickerStyle]);

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

        <div>
          <span className="text-sm font-semibold text-muted-foreground mb-2 block">Стикеры на открытке</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Выбор стикеров">
            {STICKER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStickerStyle(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  stickerStyle === opt.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview — matches downloaded PNG at 1x; download uses 2x for crisp PNG */}
        <div className="rounded-xl overflow-hidden border border-border bg-muted/30 flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full max-w-full h-auto"
            style={{ maxHeight: "320px", objectFit: "contain" }}
            aria-label="Предпросмотр открытки"
          />
        </div>

        <button
          onClick={handleDownload}
          className="heart-button py-3 px-6 rounded-xl font-bold text-base animate-none hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Скачать открытку как PNG"
        >
          📥 Скачать открытку
        </button>
      </div>
    </section>
  );
};

export default ValentineGenerator;
