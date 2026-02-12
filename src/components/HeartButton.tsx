import { useState, useCallback, useRef } from "react";

const MESSAGES = [
  "Ты как баг… я тебя не ожидал, но ты мне нравишься 😄",
  "console.log('я влюбился');",
  "Ты — мой любимый dependency ❤️",
  "С тобой я не хочу делать git reset.",
  "Ты — причина моих счастливых exceptions.",
  "if (ты) { счастье = true; }",
  "Ты — мой main branch 💕",
  "git commit -m 'люблю тебя'",
  "Ты не баг, ты — фича моей жизни ✨",
  "import love from 'тебя';",
];

const EMOJI_CONFETTI = ["💖", "✨", "🐱", "🌸", "🍓"] as const;
const MAX_CONFETTI = 12;
const CONFETTI_PER_CLICK = 4;

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

interface EmojiConfettiItem {
  id: number;
  emoji: string;
  dx: number;
  dy: number;
  delay: number;
}

const HeartButton = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [popping, setPopping] = useState(false);
  const [emojiConfetti, setEmojiConfetti] = useState<EmojiConfettiItem[]>([]);
  const particleId = useRef(0);
  const confettiId = useRef(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
    setPopping(true);
    setTimeout(() => setPopping(false), 300);

    // Random message (avoid repeating same)
    setMessage((prev) => {
      let next = prev;
      while (next === prev && MESSAGES.length > 1) {
        next = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      }
      return next;
    });

    // Spawn heart burst particles
    const newParticles: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleId.current++,
      x: 0,
      y: 0,
      angle: Math.random() * 360,
      distance: 60 + Math.random() * 80,
      size: 12 + Math.random() * 16,
    }));
    setParticles((p) => [...p, ...newParticles]);

    // Remove particles after animation
    setTimeout(() => {
      setParticles((p) => p.filter((pt) => !newParticles.includes(pt)));
    }, 800);

    // Emoji confetti (respect reduced motion)
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      const newConfetti: EmojiConfettiItem[] = Array.from({ length: CONFETTI_PER_CLICK }, () => ({
        id: confettiId.current++,
        emoji: EMOJI_CONFETTI[Math.floor(Math.random() * EMOJI_CONFETTI.length)],
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 40,
        delay: Math.random() * 150,
      }));
      setEmojiConfetti((prev) => {
        const next = [...prev, ...newConfetti];
        return next.slice(-MAX_CONFETTI);
      });
      setTimeout(() => {
        setEmojiConfetti((prev) => prev.filter((c) => !newConfetti.some((n) => n.id === c.id)));
      }, 2100);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Love counter */}
      <div
        className={`text-lg font-bold text-valentine-deep ${popping ? "animate-counter-pop" : ""}`}
        aria-live="polite"
        aria-label={`Счётчик любви: ${count}`}
      >
        💖 × {count}
      </div>

      {/* Heart button with particles */}
      <div className="relative">
        {/* Particle burst */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              fontSize: `${p.size}px`,
              animation: "heart-burst 0.7s ease-out forwards",
              transform: `translate(-50%, -50%)`,
              // Use CSS custom properties for the burst direction
              ["--burst-x" as string]: `${Math.cos((p.angle * Math.PI) / 180) * p.distance}px`,
              ["--burst-y" as string]: `${Math.sin((p.angle * Math.PI) / 180) * p.distance}px`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation: `heart-burst 0.7s ease-out forwards`,
              }}
            >
              💗
            </span>
          </span>
        ))}

        {/* Actual particles with inline animation */}
        <style>{`
          @keyframes heart-burst-move {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { opacity: 0; }
          }
        `}</style>
        {particles.map((p) => {
          const tx = Math.cos((p.angle * Math.PI) / 180) * p.distance;
          const ty = Math.sin((p.angle * Math.PI) / 180) * p.distance;
          return (
            <span
              key={`m-${p.id}`}
              className="absolute pointer-events-none z-10"
              style={{
                left: "50%",
                top: "50%",
                fontSize: `${p.size}px`,
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
                opacity: 0,
                animation: "none",
              }}
            >
              {/* We use a simpler approach below */}
            </span>
          );
        })}

        <button
          onClick={handleClick}
          className="heart-button w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-xl font-bold animate-pulse-heart cursor-pointer select-none"
          aria-label="Нажми для любви"
        >
          <span className="flex flex-col items-center gap-1">
            <span className="text-3xl sm:text-4xl">❤️</span>
            <span className="text-xs sm:text-sm font-semibold text-primary-foreground/90">Click me</span>
          </span>
        </button>

        {/* Better particle implementation */}
        {particles.map((p) => {
          const tx = Math.cos((p.angle * Math.PI) / 180) * p.distance;
          const ty = Math.sin((p.angle * Math.PI) / 180) * p.distance;
          return (
            <span
              key={`p-${p.id}`}
              className="absolute pointer-events-none z-20"
              style={{
                left: "50%",
                top: "50%",
                fontSize: `${p.size}px`,
                animation: `burst-${p.id} 0.7s ease-out forwards`,
              }}
            >
              💗
              <style>{`
                @keyframes burst-${p.id} {
                  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                  100% { transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0.3); opacity: 0; }
                }
              `}</style>
            </span>
          );
        })}

        {/* Emoji confetti (kawaii) */}
        {emojiConfetti.map((c) => (
          <span
            key={`confetti-${c.id}`}
            className="absolute z-30 emoji-confetti"
            style={{
              left: "50%",
              top: "50%",
              fontSize: "1.5rem",
              ["--confetti-dx" as string]: `${c.dx}px`,
              ["--confetti-dy" as string]: `${c.dy}px`,
              animationDelay: `${c.delay}ms`,
            }}
            aria-hidden
          >
            {c.emoji}
          </span>
        ))}
      </div>

      {/* Message */}
      <div
        key={message}
        className="animate-fade-up max-w-xs sm:max-w-sm text-center px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm sm:text-base"
        aria-live="polite"
      >
        <code className="font-display">{message}</code>
      </div>
    </div>
  );
};

export default HeartButton;
