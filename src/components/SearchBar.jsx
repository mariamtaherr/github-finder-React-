export default function SearchBar({ value, onChange, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // handles both Enter key and button click
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a GitHub username..."
        aria-label="GitHub username"
        autoComplete="off"
        spellCheck="false"
        className="w-full flex-1 rounded-xl border-2 border-edge bg-panel px-5 py-4 text-lg text-white placeholder-slate-500 outline-none transition focus:border-accent"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-accent px-8 py-4 text-lg font-bold text-ink transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Search
      </button>
    </form>
  );
}
