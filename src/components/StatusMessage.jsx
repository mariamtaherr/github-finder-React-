export default function StatusMessage({ type, text }) {
  const styles = {
    loading: "border-edge text-slate-300",
    error: "border-red-500/40 bg-red-500/10 text-red-300",
    empty: "border-edge border-dashed text-slate-500",
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`flex items-center justify-center gap-3 rounded-3xl border bg-panel px-6 py-8 text-center ${styles[type]}`}
    >
      {type === "loading" && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      )}
      <span>{text}</span>
    </div>
  );
}
