import { posterUrl } from "../api/tmdb";
import { DisplayStars, StarRating } from "./StarRating";

const FALLBACK = "https://placehold.co/300x450/12121a/6b7280?text=No+Poster";

export const MovieCard = ({ movie, onSelect, userRating, onRate, genres }) => {
  const poster = posterUrl(movie.poster_path, "w342") || FALLBACK;
  const year = movie.release_date?.split("-")[0] || "N/A";

  return (
    <div
      className="movie-card bg-[#12121a] rounded-xl overflow-hidden cursor-pointer border border-[#1e1e2e] fade-in"
      onClick={() => onSelect(movie)}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => (e.target.src = FALLBACK)}
        />
        <div className="poster-overlay absolute inset-0" />

        {/* Genre badge */}
        {movie.genre_ids?.length > 0 && genres && (
          <div className="absolute top-2 left-2">
            <span className="bg-[#e50914] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {genres.find(g => g.id === movie.genre_ids[0])?.name || "Movie"}
            </span>
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/60 text-gray-300 text-xs px-2 py-0.5 rounded-full">
            {year}
          </span>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-display font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <DisplayStars rating={movie.vote_average} count={movie.vote_count} size={12} />
        </div>
      </div>

      {/* User rating section */}
      <div
        className="p-3 border-t border-[#1e1e2e]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs text-gray-500 mb-1.5">Your Rating</p>
        <StarRating
          movieId={movie.id}
          currentRating={userRating}
          onRate={onRate}
          size={18}
        />
      </div>
    </div>
  );
};

// Skeleton loader card
export const MovieCardSkeleton = () => (
  <div className="bg-[#12121a] rounded-xl overflow-hidden border border-[#1e1e2e]">
    <div className="aspect-[2/3] shimmer" />
    <div className="p-3 space-y-2">
      <div className="h-3 shimmer rounded w-3/4" />
      <div className="h-3 shimmer rounded w-1/2" />
    </div>
  </div>
);
