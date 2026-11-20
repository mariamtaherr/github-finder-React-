const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
  </svg>
);

function Stat({ value, label }) {
  return (
    <div className="rounded-xl bg-ink px-4 py-2.5 text-sm text-white transition hover:-translate-y-0.5 hover:bg-edge">
      <span className="font-bold text-accent">{value.toLocaleString()}</span> {label}
    </div>
  );
}

export default function ProfileCard({ user }) {
  const {
    avatar_url, name, login, bio, location, company,
    followers, following, public_repos, html_url,
  } = user;

  return (
    <article className="flex flex-col items-center gap-6 rounded-3xl border border-edge bg-panel p-6 text-center transition hover:border-slate-600 sm:flex-row sm:items-start sm:gap-8 sm:p-10 sm:text-left">
      <img
        src={avatar_url}
        alt={`${login}'s avatar`}
        className="h-32 w-32 shrink-0 rounded-full border-4 border-accent object-cover sm:h-36 sm:w-36"
      />

      <div className="min-w-0 flex-1">
        <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
          {name || login}
        </h2>
        <p className="mt-1 text-link">@{login}</p>

        <p className={`mt-3 ${bio ? "text-slate-300" : "text-slate-500"}`}>
          {bio || "No bio yet."}
        </p>

        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-400 sm:justify-start">
          <li className="flex items-center gap-1.5">
            <PinIcon /> {location || "Location not shared"}
          </li>
          <li className="flex items-center gap-1.5">
            <BuildingIcon /> {company || "No company listed"}
          </li>
        </ul>

        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Stat value={public_repos} label="repos" />
          <Stat value={followers} label="followers" />
          <Stat value={following} label="following" />
        </div>

        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-ink transition hover:brightness-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Visit GitHub profile
        </a>
      </div>
    </article>
  );
}
