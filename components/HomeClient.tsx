"use client";

import { useMemo, useState } from "react";
import type { PokemonListItem } from "@/lib/types";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";
import PokeballIcon from "./PokeballIcon";

interface HomeClientProps {
  pokemon: PokemonListItem[];
}

export default function HomeClient({ pokemon }: HomeClientProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;
    return pokemon.filter((p) => p.name.toLowerCase().includes(query));
  }, [pokemon, search]);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <SearchBar value={search} onChange={setSearch} resultCount={filtered.length} />
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-16 flex max-w-sm flex-col items-center gap-4 text-center">
          <PokeballIcon className="h-14 w-14 text-dex-line" />
          <div>
            <p className="font-display text-lg font-bold text-dex-text">
              No Pokemon found
            </p>
            <p className="mt-1 text-sm text-dex-muted">
              Nothing matches &ldquo;{search}&rdquo;. Try a different name, like
              &ldquo;pika&rdquo; or &ldquo;char&rdquo;.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  );
}
