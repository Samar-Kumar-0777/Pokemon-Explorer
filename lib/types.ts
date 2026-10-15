export interface PokemonListItem {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  artworkImage: string;
  types: string[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: string[];
  heightM: number;
  weightKg: number;
}
