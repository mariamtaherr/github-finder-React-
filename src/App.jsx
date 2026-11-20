import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import StatusMessage from "./components/StatusMessage.jsx";
import Repositories from "./components/Repositories.jsx";

const SUGGESTIONS = ["torvalds", "gaearon", "sindresorhus"];

export default function App() {
  const [input, setInput] = useState("");        // what the user is typing
  const [username, setUsername] = useState("");  // the submitted search
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [reposError, setReposError] = useState("");

  // Commit the typed value as the searched username
  const handleSearch = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUsername("");
      setUser(null);
      setError("Please enter a GitHub username.");
      return;
    }
    setError("");
    // Re-searching the same name still refreshes via a new fetch below
    setUsername(trimmed);
  };

  // Fetch whenever the searched username changes
  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();

    async function fetchUser() {
      setLoading(true);
      setError("");
      setUser(null);
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}`,
          { signal: controller.signal }
        );
        if (res.status === 404) {
          throw new Error(`No GitHub user found with the username "${username}".`);
        }
        if (res.status === 403) {
          throw new Error("GitHub's API rate limit was reached. Try again in a few minutes.");
        }
        if (!res.ok) throw new Error("Something went wrong. Please try again.");
        setUser(await res.json());
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Network error. Check your connection and try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchUser();
    return () => controller.abort();
  }, [username]);

  useEffect(() => {
    if (!user?.login) {
      setRepos([]);
      return;
    }

    const controller = new AbortController();

    async function fetchRepositories() {
      setReposLoading(true);
      setReposError("");
      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(user.login)}/repos?sort=updated&per_page=6`,
          { signal: controller.signal }
        );

        if (response.status === 403) {
          throw new Error("GitHub's API rate limit was reached. Try again shortly.");
        }
        if (!response.ok) {
          throw new Error("Could not load repositories.");
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setReposError(err.message || "Could not load repositories.");
      } finally {
        if (!controller.signal.aborted) setReposLoading(false);
      }
    }

    fetchRepositories();
    return () => controller.abort();
  }, [user?.login]);

  const pick = (name) => {
    setInput(name);
    handleSearch(name);
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
        GitHub Profile Finder
      </h1>
      <p className="mt-2 text-slate-400">
        Search any GitHub user to see their profile.
      </p>

      <SearchBar
        value={input}
        onChange={setInput}
        onSearch={() => handleSearch()}
        loading={loading}
      />

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <span>Try:</span>
        {SUGGESTIONS.map((name) => (
          <button
            key={name}
            onClick={() => pick(name)}
            className="rounded-full border border-edge bg-panel px-3.5 py-1.5 text-link transition hover:border-link hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-link"
          >
            {name}
          </button>
        ))}
      </div>

      <section className="mt-10" aria-live="polite">
        {loading && <StatusMessage type="loading" text="Fetching profile…" />}
        {!loading && error && <StatusMessage type="error" text={error} />}
        {!loading && !error && user && (
          <>
            <ProfileCard user={user} />
            <Repositories
              repos={repos}
              loading={reposLoading}
              error={reposError}
            />
          </>
        )}
        {!loading && !error && !user && (
          <StatusMessage
            type="empty"
            text="Enter a username above to see their profile."
          />
        )}
      </section>
    </main>
  );
}
