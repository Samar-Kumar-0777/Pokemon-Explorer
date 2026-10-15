import { getPokemonList } from "@/lib/api";
import HomeClient from "@/components/HomeClient";
import PokeballIcon from "@/components/PokeballIcon";

export default async function HomePage() {
  const pokemon = await getPokemonList(100);

  return (
    <main className="min-h-screen bg-dex-bg">
      <header className="border-b border-dex-line bg-dex-panel/60">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex items-center gap-3">
            <PokeballIcon className="h-8 w-8 text-dex-red" />
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-dex-text sm:text-3xl">
                Pokedex
              </h1>
              <p className="text-sm text-dex-muted">
                Explore the first {pokemon.length} Pokemon, powered by PokeAPI
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <HomeClient pokemon={pokemon} />
      </section>
    </main>
  );
}
