import { useState, useEffect, useCallback } from "react";
import {
  searchMovies,
  getTrending,
  discoverMovies,
  getGenres,
} from "./api/tmdb";
import { useDebounce } from "./hooks/useDebounce";
import { useRatings } from "./hooks/useRatings";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { MovieCard, MovieCardSkeleton } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";
import { Pagination } from "./components/Pagination";

const DEFAULT_FILTERS = {
  genre: "",
  year: "",
  sort: "popularity.desc",
  minRating: "",
  page: 1,
};

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");

  const { rateMovie, getUserRating } = useRatings();

  // CORE FIX: Debounce so we hit the API 400ms after typing stops
  const debouncedSearch = useDebounce(searchText, 400);
  const isSearchMode = debouncedSearch.trim().length > 0;

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres || []));
  }, []);

  // This effect fetches movies from the API whenever search/filters change
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (isSearchMode) {
          // KEY: Hit TMDB search API with the actual search text
          data = await searchMovies(debouncedSearch, filters.page);
        } else {
          switch (activeTab) {
            case "trending":
              data = await getTrending(filters.page);
              break;
            case "discover":
              data = await discoverMovies({
                with_genres: filters.genre,
                primary_release_year: filters.year,
                sort_by: filters.sort,
                "vote_average.gte": filters.minRating,
                "vote_count.gte": filters.minRating ? 100 : undefined,
                page: filters.page,
              });
              break;
            default:
              data = await getTrending(filters.page);
          }
        }
        if (!cancelled) {
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 0);
          setTotalResults(data.total_results || 0);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();
    return () => { cancelled = true; };
  }, [debouncedSearch, isSearchMode, activeTab, filters]);

  const handleSearchChange = useCallback((text) => {
    setSearchText(text);
    setFilters((f) => ({ ...f, page: 1 }));
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilters(DEFAULT_FILTERS);
    setSearchText("");
  };

  const handlePageChange = (newPage) => {
    setFilters((f) => ({ ...f, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageTitle = isSearchMode
    ? `Results for "${debouncedSearch}"`
    : activeTab === "trending"
    ? "Trending This Week"
    : "Discover Movies";

  const TABS = [
    { id: "trending", label: "Trending" },
    { id: "discover", label: "Discover" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header
        search={searchText}
        onSearchChange={handleSearchChange}
        isSearching={loading && isSearchMode}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {!isSearchMode && (
          <div className="flex gap-1 mb-6 bg-[#12121a] p-1 rounded-xl border border-[#1e1e2e] w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {!isSearchMode && activeTab === "discover" && (
          <div className="mb-5">
            <FilterBar
              genres={genres}
              filters={filters}
              onChange={(f) => setFilters(f)}
              isSearchMode={isSearchMode}
            />
          </div>
        )}

        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="font-display text-xl font-semibold text-white">{pageTitle}</h2>
            {totalResults > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">
                {totalResults.toLocaleString()} movies found
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <span className="text-sm text-gray-500">
              Page {filters.page} of {Math.min(totalPages, 500)}
            </span>
          )}
        </div>

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Something went wrong: {error}</p>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-gray-300 text-lg font-medium">No movies found</p>
            <p className="text-gray-500 text-sm mt-1">
              {isSearchMode ? `No results for "${debouncedSearch}"` : "Try different filters"}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 18 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  genres={genres}
                  onSelect={setSelectedMovie}
                  userRating={getUserRating(movie.id)}
                  onRate={rateMovie}
                />
              ))}
        </div>

        {!loading && (
          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          userRating={getUserRating(selectedMovie.id)}
          onRate={rateMovie}
        />
      )}
    </div>
  );
}
