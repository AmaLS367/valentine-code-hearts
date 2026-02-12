import { useEffect, useRef } from "react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const hearts = useRef<FloatingHeart[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {hearts.current.map((h) => (
        <span
          key={h.id}
          className="absolute animate-float-heart text-valentine-pink"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: "infinite",
            opacity: h.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
