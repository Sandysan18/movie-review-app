const YEARS = ["All Years", ...Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i))];
const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Top Rated", value: "vote_average.desc" },
  { label: "Newest", value: "release_date.desc" },
  { label: "Oldest", value: "release_date.asc" },
];

const SelectArrow = () => (
  <svg className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FilterSelect = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-[#12121a] border border-[#1e1e2e] text-sm text-white rounded-lg px-3 pr-8 py-2.5 focus:outline-none focus:border-yellow-400 cursor-pointer hover:border-gray-600 transition-colors"
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
    <SelectArrow />
  </div>
);

export const FilterBar = ({ genres, filters, onChange, isSearchMode }) => {
  if (isSearchMode) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 bg-[#12121a] border border-[#1e1e2e] px-3 py-2.5 rounded-lg">
          Filters disabled during search
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Genre filter */}
      <FilterSelect
        value={filters.genre}
        onChange={(v) => onChange({ ...filters, genre: v, page: 1 })}
        options={[
          { label: "All Genres", value: "" },
          ...genres.map((g) => ({ label: g.name, value: String(g.id) })),
        ]}
      />

      {/* Year filter */}
      <FilterSelect
        value={filters.year}
        onChange={(v) => onChange({ ...filters, year: v === "All Years" ? "" : v, page: 1 })}
        options={YEARS}
      />

      {/* Sort */}
      <FilterSelect
        value={filters.sort}
        onChange={(v) => onChange({ ...filters, sort: v, page: 1 })}
        options={SORT_OPTIONS}
      />

      {/* Rating filter */}
      <FilterSelect
        value={filters.minRating}
        onChange={(v) => onChange({ ...filters, minRating: v, page: 1 })}
        options={[
          { label: "Any Rating", value: "" },
          { label: "6+ Rating", value: "6" },
          { label: "7+ Rating", value: "7" },
          { label: "8+ Rating", value: "8" },
          { label: "9+ Rating", value: "9" },
        ]}
      />

      {/* Reset */}
      {(filters.genre || filters.year || filters.minRating || filters.sort !== "popularity.desc") && (
        <button
          onClick={() => onChange({ genre: "", year: "", sort: "popularity.desc", minRating: "", page: 1 })}
          className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors underline underline-offset-2"
        >
          Reset filters
        </button>
      )}
    </div>
  );
};
