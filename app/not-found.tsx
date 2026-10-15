import Link from "next/link";
import PokeballIcon from "@/components/PokeballIcon";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dex-bg px-4 text-center">
      <PokeballIcon className="h-14 w-14 text-dex-line" />
      <h1 className="mt-4 font-display text-2xl font-extrabold text-dex-text">
        It fled before scanning could finish
      </h1>
      <p className="mt-2 max-w-sm text-sm text-dex-muted">
        That page or Pokemon doesn&apos;t exist. Double-check the name or ID and
        try again.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-dex-red px-6 py-2.5 font-medium text-white transition-colors hover:bg-dex-red-dark"
      >
        Back to the Pokedex
      </Link>
    </main>
  );
}
