"use client";

import { useEffect } from "react";
import PokeballIcon from "@/components/PokeballIcon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dex-bg px-4 text-center">
      <PokeballIcon className="h-14 w-14 text-dex-red" />
      <h1 className="mt-4 font-display text-2xl font-extrabold text-dex-text">
        The signal was lost
      </h1>
      <p className="mt-2 max-w-sm text-sm text-dex-muted">
        We couldn&apos;t reach PokeAPI. Check your connection and try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-dex-red px-6 py-2.5 font-medium text-white transition-colors hover:bg-dex-red-dark"
      >
        Try again
      </button>
    </main>
  );
}
