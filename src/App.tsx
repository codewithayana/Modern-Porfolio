const App = () => {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16">
        <span className="pill-accent">Modern Theme Ready</span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">New Portfolio 2k26</h1>
        <p className="max-w-2xl text-base text-text-secondary sm:text-lg">
          Dark theme is now your default with a clean light theme override available through the
          `.light` class on the root element whenever you are ready to add a toggle.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="surface-card">
            <h2 className="text-lg font-semibold">Fast Styling</h2>
            <p className="mt-2 text-sm text-text-secondary">Use classes directly in TSX.</p>
          </article>
          <article className="surface-card">
            <h2 className="text-lg font-semibold">Vite Plugin</h2>
            <p className="mt-2 text-sm text-text-secondary">Official Tailwind v4 integration.</p>
          </article>
          <article className="surface-card">
            <h2 className="text-lg font-semibold">Production Ready</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Shared design tokens keep the UI consistent.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
