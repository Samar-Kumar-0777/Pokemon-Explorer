import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPokemonDetail } from "@/lib/api";
import { getTypeColor } from "@/lib/pokemonTypeColors";
import { capitalize, formatDashed } from "@/lib/format";
import TypeBadge from "@/components/TypeBadge";
import StatBar from "@/components/StatBar";
import BackButton from "@/components/BackButton";
import PokeballIcon from "@/components/PokeballIcon";

interface PageProps {
  params: { name: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pokemon = await getPokemonDetail(params.name);
  if (!pokemon) {
    return { title: "Pokemon not found | Pokedex" };
  }
  return {
    title: `${capitalize(pokemon.name)} | Pokedex`,
    description: `Types, abilities, base stats, and moves for ${capitalize(
      pokemon.name
    )}.`,
  };
}

const MAX_MOVES_SHOWN = 40;

export default async function PokemonDetailPage({ params }: PageProps) {
  const pokemonData = await getPokemonDetail(params.name);

  if (!pokemonData) {
    notFound();
  }

  const pokemon = pokemonData;
  const accent = getTypeColor(pokemon.types[0]);
  const dexNumber = String(pokemon.id).padStart(3, "0");
  const label = capitalize(pokemon.name);
  const visibleMoves = pokemon.moves.slice(0, MAX_MOVES_SHOWN);
  const hiddenMoveCount = pokemon.moves.length - visibleMoves.length;

  return (
    <main className="min-h-screen bg-dex-bg pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <BackButton />
      </div>

      <section className="mx-auto mt-6 max-w-4xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-dex-line p-6 sm:p-10"
          style={{
            background: `linear-gradient(155deg, ${accent}30, #1B1F2C 65%)`,
          }}
        >
          <PokeballIcon className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-dex-text opacity-[0.07]" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <span className="font-mono text-sm tracking-wide text-dex-muted">
                №&nbsp;{dexNumber}
              </span>
              <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-dex-text sm:text-4xl">
                {label}
              </h1>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} size="md" />
                ))}
              </div>
              <dl className="mt-5 flex justify-center gap-6 text-sm sm:justify-start">
                <div>
                  <dt className="text-dex-muted">Height</dt>
                  <dd className="font-mono text-dex-text">{pokemon.heightM} m</dd>
                </div>
                <div>
                  <dt className="text-dex-muted">Weight</dt>
                  <dd className="font-mono text-dex-text">{pokemon.weightKg} kg</dd>
                </div>
              </dl>
            </div>

            <div
              className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full sm:h-56 sm:w-56"
              style={{
                background: `radial-gradient(circle at 50% 35%, ${accent}45, transparent 70%)`,
              }}
            >
              <Image
                src={pokemon.artworkImage}
                alt={label}
                width={208}
                height={208}
                priority
                className="h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-4xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-dex-line bg-dex-panel p-6">
          <h2 className="font-display text-lg font-bold text-dex-text">
            Abilities
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {pokemon.abilities.map((ability) => (
              <li
                key={ability.name}
                className="flex items-center justify-between rounded-xl border border-dex-line bg-dex-panel2 px-4 py-2.5 text-sm"
              >
                <span className="text-dex-text">{formatDashed(ability.name)}</span>
                {ability.isHidden && (
                  <span className="rounded-full bg-dex-bg px-2.5 py-0.5 text-xs font-medium text-dex-muted">
                    Hidden
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-dex-line bg-dex-panel p-6">
          <h2 className="font-display text-lg font-bold text-dex-text">
            Base Stats
          </h2>
          <div className="mt-4 flex flex-col gap-3.5">
            {pokemon.stats.map((stat) => (
              <StatBar
                key={stat.name}
                name={stat.name}
                value={stat.value}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-dex-line bg-dex-panel p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-bold text-dex-text">
              Moves
            </h2>
            <span className="font-mono text-xs text-dex-muted">
              {pokemon.moves.length} total
            </span>
          </div>
          {pokemon.moves.length === 0 ? (
            <p className="mt-4 text-sm text-dex-muted">
              No move data available for this Pokemon.
            </p>
          ) : (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                {visibleMoves.map((move) => (
                  <span
                    key={move}
                    className="rounded-full border border-dex-line bg-dex-panel2 px-3 py-1 text-xs font-medium text-dex-text"
                  >
                    {formatDashed(move)}
                  </span>
                ))}
              </div>
              {hiddenMoveCount > 0 && (
                <p className="mt-3 text-xs text-dex-muted">
                  +{hiddenMoveCount} more move{hiddenMoveCount === 1 ? "" : "s"} not
                  shown
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
