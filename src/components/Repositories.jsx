const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.43 1.08 6.27L12 17.14l-5.63 2.96 1.08-6.27L2.9 9.4l6.3-.9L12 2.8Z" />
  </svg>
);

const ForkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="5" r="2" />
    <circle cx="18" cy="19" r="2" />
    <circle cx="6" cy="19" r="2" />
    <path d="M6 7v10M18 17v-2a4 4 0 0 0-4-4H10a4 4 0 0 1-4-4" />
  </svg>
);

export default function Repositories({ repos, loading, error }) {
  return (
    <section className="mt-10" aria-label="Public repositories">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Explore the work</p>
          <h3 className="mt-1 text-2xl font-bold text-white">Repositories</h3>
        </div>
        <span className="rounded-full border border-edge bg-panel px-3 py-1 text-sm text-slate-400">
          {repos.length} shown
        </span>
      </div>

      {loading && (
        <p className="rounded-2xl border border-edge bg-panel p-5 text-sm text-slate-400">
          Loading repositories…
        </p>
      )}

      {!loading && error && (
        <p className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
          {error}
        </p>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="rounded-2xl border border-edge bg-panel p-5 text-sm text-slate-400">
          No public repositories found.
        </p>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-44 flex-col rounded-2xl border border-edge bg-panel p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/70 hover:bg-[#202b40] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="break-words font-bold text-link transition group-hover:text-accent">
                  {repo.name}
                </h4>
                <span className="shrink-0 rounded-full border border-edge px-2 py-0.5 text-xs text-slate-400">
                  {repo.private ? "Private" : "Public"}
                </span>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-slate-400">
                {repo.description || "No description provided."}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                {repo.language && (
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1.5"><StarIcon /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1.5"><ForkIcon /> {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
