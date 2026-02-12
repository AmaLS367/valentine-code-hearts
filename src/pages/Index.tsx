import FloatingHearts from "@/components/FloatingHearts";
import HeartButton from "@/components/HeartButton";
import ValentineGenerator from "@/components/ValentineGenerator";
import DarkModeToggle from "@/components/DarkModeToggle";

const Index = () => {
  return (
    <div className="valentine-bg min-h-screen w-full flex flex-col items-center justify-start py-8 px-4 sm:px-6">
      <FloatingHearts />
      <DarkModeToggle />

      <main className="relative z-10 w-full max-w-6xl px-4 sm:px-6 mt-4 sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: header + heart / counter / messages */}
          <div className="flex flex-col gap-8">
            <header className="glass-card rounded-2xl p-6 sm:p-8 text-center w-full animate-fade-up">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
                Happy Valentine's Day 💘
              </h1>
              <p className="text-muted-foreground font-semibold text-base sm:text-lg">
                Made with <span className="text-valentine-pink">❤️</span> + JS
              </p>
            </header>

            <section
              className="glass-card rounded-2xl p-6 sm:p-8 w-full flex flex-col items-center"
              style={{ animationDelay: "0.15s" }}
              aria-label="Интерактивное сердце"
            >
              <HeartButton />
            </section>
          </div>

          {/* Right column: valentine generator / preview */}
          <section
            className="glass-card rounded-2xl p-6 sm:p-8 w-full"
            style={{ animationDelay: "0.3s" }}
          >
            <ValentineGenerator />
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8 pb-6">
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
