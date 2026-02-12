import FloatingHearts from "@/components/FloatingHearts";
import HeartButton from "@/components/HeartButton";
import ValentineGenerator from "@/components/ValentineGenerator";
import DarkModeToggle from "@/components/DarkModeToggle";

const Index = () => {
  return (
    <div className="valentine-bg min-h-screen flex flex-col items-center justify-start py-8 px-4 sm:px-6">
      <FloatingHearts />
      <DarkModeToggle />

      <main className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg mt-4 sm:mt-8">
        {/* Header card */}
        <header className="glass-card rounded-2xl p-6 sm:p-8 text-center w-full animate-fade-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Happy Valentine's Day 💘
          </h1>
          <p className="text-muted-foreground font-semibold text-base sm:text-lg">
            Made with <span className="text-valentine-pink">❤️</span> + JS
          </p>
        </header>

        {/* Heart interaction area */}
        <section
          className="glass-card rounded-2xl p-6 sm:p-8 w-full flex flex-col items-center"
          style={{ animationDelay: "0.15s" }}
          aria-label="Интерактивное сердце"
        >
          <HeartButton />
        </section>

        {/* Valentine generator */}
        <section
          className="glass-card rounded-2xl p-6 sm:p-8 w-full"
          style={{ animationDelay: "0.3s" }}
        >
          <ValentineGenerator />
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-6">
          <p>
            {'{ '}<span className="text-valentine-pink font-bold">love</span>{' }'}
            {' === '}
            <span className="text-valentine-warm font-bold">true</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
