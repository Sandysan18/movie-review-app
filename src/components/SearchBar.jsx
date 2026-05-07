const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const SearchBar = ({ value, onChange, isSearching }) => (
  <div className="relative flex-1 max-w-xl">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {isSearching ? (
        <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      ) : (
        <SearchIcon />
      )}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies by title..."
      className="search-input w-full bg-[#12121a] border border-[#1e1e2e] rounded-xl pl-11 pr-10 py-3 text-white placeholder-gray-500 text-sm transition-all duration-200 focus:border-yellow-400"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
      >
        <XIcon />
      </button>
    )}
  </div>
);
