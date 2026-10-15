# Pokedex — Pokemon Explorer

A Pokemon browser built with Next.js (App Router) and TypeScript. Search a
grid of the first 100 Pokemon and open any of them for a detailed page with
types, abilities, base stats, and moves — all live from
[PokeAPI](https://pokeapi.co/), nothing hardcoded.

## Tech stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- React 18
- PokeAPI (`https://pokeapi.co/api/v2`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page fetches
and renders live data from PokeAPI, so you'll need an internet connection.

Other useful commands:

```bash
npm run build   # production build (type-checked)
npm run start   # run the production build
npm run lint    # ESLint
```

## Project structure

```
pokemon-explorer/
├── app/
│   ├── layout.tsx              Root layout, fonts, global metadata
│   ├── page.tsx                Home page (server component, fetches list)
│   ├── loading.tsx             Skeleton grid shown while the list loads
│   ├── error.tsx                Error boundary for failed PokeAPI requests
│   ├── not-found.tsx            404 page (invalid routes / unknown Pokemon)
│   ├── globals.css              Tailwind directives + base styles
│   ├── icon.svg                 Favicon (pokeball mark)
│   └── pokemon/[name]/
│       ├── page.tsx             Pokemon detail page (server component)
│       └── loading.tsx          Skeleton shown while detail data loads
├── components/
│   ├── HomeClient.tsx           Client component: search state + grid
│   ├── SearchBar.tsx            Search input (case-insensitive, live filter)
│   ├── PokemonCard.tsx          Card used in the home grid
│   ├── TypeBadge.tsx            Color-coded type pill
│   ├── StatBar.tsx              Base stat bar used on the detail page
│   ├── BackButton.tsx           "Back to Pokedex" link
│   └── PokeballIcon.tsx         Inline SVG pokeball mark
├── lib/
│   ├── api.ts                   PokeAPI fetch + mapping functions
│   ├── types.ts                 Shared TypeScript types
│   ├── pokemonTypeColors.ts     Official type → color mapping
│   └── format.ts                Small string helpers
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

## Implementation notes

- **Data fetching**: `lib/api.ts` calls `GET /pokemon?limit=100` for the
  roster, then fetches each entry's detail endpoint in parallel
  (`Promise.allSettled`) to get real images and types for the cards — no
  Pokemon data is hardcoded anywhere. Requests are cached with Next's
  `fetch` + `revalidate` so repeat visits are fast.
- **Search**: implemented client-side in `HomeClient.tsx` with a simple,
  case-insensitive substring filter over the already-loaded list, so results
  update on every keystroke with no extra network calls. An empty-state
  message appears when nothing matches.
- **Detail route**: `app/pokemon/[name]/page.tsx` accepts either a Pokemon
  name or numeric ID (PokeAPI supports both), fetches
  `GET /pokemon/{name-or-id}`, and renders name, ID, image, types,
  abilities, base stats (as bars), and moves.
- **Error / edge cases**: `notFound()` is triggered for unknown Pokemon
  (handled by `app/not-found.tsx`); `app/error.tsx` catches PokeAPI request
  failures; `loading.tsx` files provide skeleton states for both the home
  grid and the detail page while data streams in.
- **Images**: uses `next/image` with the official artwork sprite from
  PokeAPI, with a small inline SVG fallback if artwork is ever missing.
- **Design**: a Pokedex-inspired dark theme with functional, per-type color
  coding (official Pokemon type colors) rather than a generic card kit —
  see `lib/pokemonTypeColors.ts`.
- **Accessibility & responsiveness**: visible keyboard focus states, a
  labelled search input, `aria-live` result count, and a responsive grid
  (2 → 3 → 4 → 5 columns) with no horizontal overflow from mobile to
  desktop.

## Requirements checklist

- [x] `npm install` works
- [x] `npm run dev` works
- [x] `npm run build` works (typed, strict TypeScript)
- [x] Home page loads and fetches from PokeAPI
- [x] Pokemon list loads (first 100, not hardcoded)
- [x] Images display correctly (with graceful fallback)
- [x] Search works, case-insensitive, live as you type
- [x] Empty search result state
- [x] Pokemon cards are clickable → detail page
- [x] Dynamic detail route `/pokemon/[name]`
- [x] Detail page: image, ID, types, abilities, stats, moves
- [x] Back navigation
- [x] Loading states (home + detail)
- [x] API errors handled (`error.tsx`)
- [x] Invalid Pokemon route handled (`not-found.tsx`)
- [x] Mobile / tablet / desktop responsive, no horizontal overflow
- [x] TypeScript strict, no `any` leaks in app code
- [x] Production build succeeds
- [x] README complete
