import { useState, useEffect, useMemo } from 'react';
import MovieCard from './components/MovieCard';
import MovieDetailsModal from './components/MovieDetailsModal';

// TMDB uses ID numbers for genres. This map converts them to readable text for our filter.
const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

export default function App() {
  // PASTE THE TMDB API KEY HERE
  const API_KEY = "1d8c90a754b58647faa640047df6d6be"; 

  // --- State Management ---
  const [movies, setMovies] = useState([]); // Now starts empty!
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userRatings, setUserRatings] = useState({});

  // --- Fetch Data from TMDB API ---
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetching the top 20 popular movies right now
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await response.json();
        
        // Map TMDB's data format to match our app's structure
        const formattedMovies = data.results.map((tmdbMovie) => ({
          id: tmdbMovie.id,
          title: tmdbMovie.title,
          year: tmdbMovie.release_date ? tmdbMovie.release_date.substring(0, 4) : "N/A",
          genre: tmdbMovie.genre_ids.length > 0 ? GENRE_MAP[tmdbMovie.genre_ids[0]] : "Unknown",
          image: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Cover',
          description: tmdbMovie.overview,
          cast: "Cast info requires a secondary TMDB API call." // Kept simple for the scope of the project
        }));

        setMovies(formattedMovies);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []); // The empty array ensures this only runs once when the app loads

  // --- Derived Data (Filtering) ---
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = genreFilter === "All" || movie.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, genreFilter, movies]);

  const allGenres = ["All", ...new Set(movies.map(movie => movie.genre))];

  // --- Handlers ---
  const handleRateMovie = (movieId, rating) => {
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
  };

  return (
    <div className="min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Controls */}
        <header className="mb-8 bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-extrabold text-blue-600">Captain's Movie Reviews</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search movies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
            />
            
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

        {/* Loading State or Movie Grid */}
        {isLoading ? (
          <div className="text-center text-gray-500 mt-20 text-2xl font-bold animate-pulse">
            Loading Live Data from TMDB...
          </div>
        ) : filteredMovies.length > 0 ? (
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