import type { PokemonDetail, PokemonListItem } from "./types";

const API_BASE = "https://pokeapi.co/api/v2";

// A small inline placeholder so the UI never breaks if PokeAPI is missing
// an artwork sprite for a particular entry.
export const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#242A3B" stroke="#313850" stroke-width="4"/>
      <path d="M10 100a90 90 0 0 1 180 0Z" fill="#313850"/>
      <circle cx="100" cy="100" r="22" fill="#12141C" stroke="#8B92A8" stroke-width="4"/>
    </svg>`
  );

interface RawNamedResource {
  name: string;
  url: string;
}

interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: { front_default: string | null };
    };
  };
  types: { type: RawNamedResource }[];
  abilities: { ability: RawNamedResource; is_hidden: boolean }[];
  stats: { stat: RawNamedResource; base_stat: number }[];
  moves: { move: RawNamedResource }[];
}

async function fetchJson<T>(url: string, revalidateSeconds = 3600): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) {
    throw new Error(`PokeAPI request failed (${res.status}) for ${url}`);
  }
  return res.json() as Promise<T>;
}

function pickImage(sprites: RawPokemon["sprites"]): string {
  return (
    sprites.other?.["official-artwork"]?.front_default ||
    sprites.front_default ||
    FALLBACK_IMAGE
  );
}

function mapListItem(data: RawPokemon): PokemonListItem {
  return {
    id: data.id,
    name: data.name,
    image: pickImage(data.sprites),
    types: data.types.map((t) => t.type.name),
  };
}

function mapDetail(data: RawPokemon): PokemonDetail {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default || pickImage(data.sprites),
    artworkImage: pickImage(data.sprites),
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    moves: data.moves.map((m) => m.move.name),
    heightM: data.height / 10,
    weightKg: data.weight / 10,
  };
}

/**
 * Fetches the first `limit` Pokémon along with the per-entry detail data
 * needed to render the grid (image + types), without hardcoding anything.
 */
export async function getPokemonList(limit = 100): Promise<PokemonListItem[]> {
  const listData = await fetchJson<{ results: RawNamedResource[] }>(
    `${API_BASE}/pokemon?limit=${limit}&offset=0`
  );

  const settled = await Promise.allSettled(
    listData.results.map((item) => fetchJson<RawPokemon>(item.url))
  );

  return settled
    .filter(
      (result): result is PromiseFulfilledResult<RawPokemon> =>
        result.status === "fulfilled"
    )
    .map((result) => mapListItem(result.value))
    .sort((a, b) => a.id - b.id);
}

export async function getPokemonDetail(
  nameOrId: string
): Promise<PokemonDetail | null> {
  const normalized = nameOrId.trim().toLowerCase();
  if (!normalized) return null;

  try {
    const data = await fetchJson<RawPokemon>(`${API_BASE}/pokemon/${normalized}`);
    return mapDetail(data);
  } catch {
    return null;
  }
}
