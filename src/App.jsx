import { useState, useMemo } from 'react';
import movieData from './data.json';
import MovieCard from './components/MovieCard';
import MovieDetailsModal from './components/MovieDetailsModal';

export default function App() {
  // --- State Management ---
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userRatings, setUserRatings] = useState({});

  // --- Derived Data (Filtering) ---
  // useMemo ensures we only recalculate the filter when search, genre, or movieData changes
  const filteredMovies = useMemo(() => {
    return movieData.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = genreFilter === "All" || movie.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, genreFilter]);

  // Extract unique genres for the dropdown
  const allGenres = ["All", ...new Set(movieData.map(movie => movie.genre))];

  // --- Handlers ---
  const handleRateMovie = (movieId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [movieId]: rating
    }));
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Controls */}
        <header className="mb-8 bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-blue-600">Captain's Movie Reviews</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
            />
            
            {/* Genre Filter */}
            <select 
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onSelect={setSelectedMovie}
                userRating={userRatings[movie.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-xl">
            No movies found matching your criteria.
          </div>
        )}

      </div>

      {/* Modal Overlay */}
      <MovieDetailsModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)}
        userRating={userRatings[selectedMovie?.id]}
        onRate={(rating) => handleRateMovie(selectedMovie.id, rating)}
      />
    </div>
  );
}