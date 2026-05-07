import { SearchBar } from "./SearchBar";

const FilmIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="17" y1="7" x2="22" y2="7" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="2" y1="17" x2="7" y2="17" />
  </svg>
);

export const Header = ({ search, onSearchChange, isSearching }) => (
  <header className="sticky top-0 z-40 border-b border-[#1e1e2e]" style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(12px)" }}>
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2 flex-shrink-0">
        <FilmIcon />
        <span className="font-display font-bold text-white text-lg tracking-tight">
          Cine<span className="text-yellow-400">Scope</span>
        </span>
      </div>
      <SearchBar value={search} onChange={onSearchChange} isSearching={isSearching} />
    </div>
  </header>
);
