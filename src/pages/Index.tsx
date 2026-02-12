import FloatingHearts from "@/components/FloatingHearts";
import HeartButton from "@/components/HeartButton";
import ValentineGenerator from "@/components/ValentineGenerator";
import DarkModeToggle from "@/components/DarkModeToggle";

const STEPS = [
  { icon: "💖", title: "Жми на сердце", text: "Поднимай настроение" },
  { icon: "✏️", title: "Заполни открытку", text: "Кому, от кого и записка" },
  { icon: "📥", title: "Скачай и отправь", text: "PNG на память" },
];

const HIGHLIGHTS = [
  { value: "💖", label: "Сердечко" },
  { value: "💌", label: "Открытка" },
  { value: "✨", label: "Валентинка" },
  { value: "❤️", label: "Любовь" },
];

const Index = () => {
  return (
    <div className="valentine-bg min-h-screen w-full flex flex-col">
      <FloatingHearts />
      <DarkModeToggle />

      {/* Секция: Hero — на всю ширину */}
      <header className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 border-b border-border/50">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground font-display drop-shadow-sm">
            Happy Valentine's Day 💘
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Создай открытку и нажми на сердце — станет теплее
          </p>
        </div>
      </header>

      {/* Секция: полоса с акцентами — заполняет ширину */}
      <section className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-6 bg-card/30 border-b border-border/40" aria-hidden>
        <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 py-2">
              <span className="text-2xl sm:text-3xl">{item.value}</span>
              <span className="text-sm sm:text-base font-semibold text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <main className="relative z-10 w-full flex-1 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
          {/* Секция: Как это работает — 3 карточки в ряд */}
          <section aria-label="Как это работает">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display mb-6">Как это работает</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="glass-card card-step rounded-xl p-6 sm:p-8 text-center flex flex-col items-center gap-3"
                >
                  <span
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 flex items-center justify-center text-3xl sm:text-4xl"
                    aria-hidden
                  >
                    {step.icon}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-foreground">{step.title}</span>
                  <span className="text-sm text-muted-foreground">{step.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Секция: основной контент — две колонки, заполняют всю ширину */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full items-stretch">
            <div
              className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center justify-center min-h-[320px] lg:min-h-[380px]"
              aria-label="Интерактивное сердце"
            >
              <HeartButton />
            </div>
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col min-h-[320px] lg:min-h-[380px]">
              <ValentineGenerator />
            </div>
          </section>

          {/* Секция: цитата — на всю ширину */}
          <blockquote className="quote-block text-left text-muted-foreground italic text-base sm:text-lg w-full py-6 px-6 sm:px-8">
            «Лучшая валентинка — та, что от души. Даже одна строчка значит много.»
          </blockquote>
        </div>
      </main>

      {/* Футер — на всю ширину */}
      <footer className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-8 border-t border-border/50 bg-card/20">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm sm:text-base text-muted-foreground">
            {'{ '}<span className="text-valentine-pink font-bold">love</span>{' }'}
            {' === '}
            <span className="text-valentine-warm font-bold">true</span>
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground opacity-90">Code Hearts · сделано с ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
