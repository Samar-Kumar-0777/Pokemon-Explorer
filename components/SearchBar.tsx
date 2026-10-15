"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="w-full">
      <label htmlFor="pokemon-search" className="sr-only">
        Search Pokemon by name
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dex-muted"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line
            x1="16.5"
            y1="16.5"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="pokemon-search"
          type="text"
          inputMode="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search a Pokemon by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-full border border-dex-line bg-dex-panel py-3.5 pl-12 pr-24 text-base text-dex-text placeholder:text-dex-muted focus:border-dex-yellow focus:outline-none sm:text-lg"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-dex-muted transition-colors hover:bg-dex-panel2 hover:text-dex-text"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 pl-2 font-mono text-xs text-dex-muted" aria-live="polite">
        {value
          ? `${resultCount} match${resultCount === 1 ? "" : "es"} for "${value}"`
          : `${resultCount} Pokemon loaded`}
      </p>
    </div>
  );
}
