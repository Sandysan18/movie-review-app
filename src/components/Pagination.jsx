export const Pagination = ({ page, totalPages, onChange }) => {
  const maxPage = Math.min(totalPages, 500); // TMDB caps at 500
  if (maxPage <= 1) return null;

  const pages = [];
  const delta = 2;
  for (let i = Math.max(1, page - delta); i <= Math.min(maxPage, page + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-sm text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ← Prev
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onChange(1)} className="px-3 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-sm text-gray-400 hover:text-white transition-all">1</button>
          {pages[0] > 2 && <span className="text-gray-600">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-2 rounded-lg border text-sm transition-all ${
            p === page
              ? "bg-yellow-400 border-yellow-400 text-black font-bold"
              : "bg-[#12121a] border-[#1e1e2e] text-gray-400 hover:text-white hover:border-gray-600"
          }`}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < maxPage && (
        <>
          {pages[pages.length - 1] < maxPage - 1 && <span className="text-gray-600">…</span>}
          <button onClick={() => onChange(maxPage)} className="px-3 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-sm text-gray-400 hover:text-white transition-all">{maxPage}</button>
        </>
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= maxPage}
        className="px-3 py-2 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-sm text-gray-400 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next →
      </button>
    </div>
  );
};
