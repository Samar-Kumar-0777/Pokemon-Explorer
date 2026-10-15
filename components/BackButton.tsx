import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full border border-dex-line bg-dex-panel px-4 py-2 text-sm font-medium text-dex-text transition-colors hover:border-dex-yellow hover:text-dex-yellow"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back to Pokedex
    </Link>
  );
}
