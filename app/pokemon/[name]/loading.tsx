export default function DetailLoading() {
  return (
    <main className="min-h-screen bg-dex-bg pb-16">
      <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <div className="h-9 w-36 animate-pulse-soft rounded-full border border-dex-line bg-dex-panel" />
      </div>

      <section className="mx-auto mt-6 max-w-4xl px-4 sm:px-6">
        <div className="h-64 animate-pulse-soft rounded-3xl border border-dex-line bg-dex-panel" />
      </section>

      <section className="mx-auto mt-6 grid max-w-4xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        <div className="h-56 animate-pulse-soft rounded-2xl border border-dex-line bg-dex-panel" />
        <div className="h-56 animate-pulse-soft rounded-2xl border border-dex-line bg-dex-panel" />
      </section>

      <section className="mx-auto mt-6 max-w-4xl px-4 sm:px-6">
        <div className="h-40 animate-pulse-soft rounded-2xl border border-dex-line bg-dex-panel" />
      </section>
    </main>
  );
}
