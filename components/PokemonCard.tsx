import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { PokemonListItem } from "@/lib/types";
import { getTypeColor } from "@/lib/pokemonTypeColors";
import TypeBadge from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const accent = getTypeColor(pokemon.types[0]);
  const dexNumber = String(pokemon.id).padStart(3, "0");
  const label = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-dex-line bg-dex-panel p-4 transition-all duration-200 hover:-translate-y-1 hover:border-transparent focus-visible:-translate-y-1"
      style={
        {
          "--accent": accent,
        } as CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          boxShadow: `0 16px 34px -14px ${accent}80, 0 0 0 1px ${accent}55 inset`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs tracking-wide text-dex-muted">
          №&nbsp;{dexNumber}
        </span>
        <svg
          viewBox="0 0 64 64"
          className="h-4 w-4 text-dex-line transition-colors duration-200 group-hover:text-[var(--accent)]"
          aria-hidden="true"
          fill="none"
        >
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" />
          <path d="M4 32a28 28 0 0 1 56 0" stroke="currentColor" strokeWidth="6" />
        </svg>
      </div>

      <div
        className="relative mx-auto my-3 flex h-28 w-28 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105 sm:h-32 sm:w-32"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${accent}33, transparent 70%)`,
        }}
      >
        <Image
          src={pokemon.image}
          alt={label}
          width={112}
          height={112}
          className="h-full w-full object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.45)]"
          unoptimized
        />
      </div>

      <h3 className="relative text-center font-display text-base font-bold leading-tight text-dex-text sm:text-lg">
        {label}
      </h3>

      <div className="relative mt-2.5 flex flex-wrap justify-center gap-1.5">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </Link>
  );
}
