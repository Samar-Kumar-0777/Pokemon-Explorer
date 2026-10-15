import PokeballIcon from "@/components/PokeballIcon";

export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-dex-bg">
      <header className="border-b border-dex-line bg-dex-panel/60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <PokeballIcon className="h-8 w-8 animate-spin text-dex-red [animation-duration:1.4s]" />
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-dex-text sm:text-3xl">
                Pokedex
              </h1>
              <p className="text-sm text-dex-muted">Loading Pokemon from PokeAPI...</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto h-14 max-w-xl animate-pulse-soft rounded-full border border-dex-line bg-dex-panel" />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex h-52 animate-pulse-soft flex-col rounded-2xl border border-dex-line bg-dex-panel p-4"
              style={{ animationDelay: `${(i % 5) * 80}ms` }}
            >
              <div className="h-3 w-10 rounded bg-dex-panel2" />
              <div className="mx-auto my-3 h-28 w-28 rounded-full bg-dex-panel2" />
              <div className="mx-auto h-4 w-20 rounded bg-dex-panel2" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
