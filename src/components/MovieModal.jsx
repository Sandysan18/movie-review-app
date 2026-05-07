import { useEffect, useState } from "react";
import { getMovieDetails, posterUrl, backdropUrl } from "../api/tmdb";
import { DisplayStars, StarRating } from "./StarRating";

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const MovieModal = ({ movie, onClose, userRating, onRate}) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movie.id)
      .then(setDetails)
      .finally(() => setLoading(false));
  }, [movie.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const data = details || movie;
  const poster = posterUrl(data.poster_path, "w500");
  const backdrop = backdropUrl(data.backdrop_path);
  const year = data.release_date?.split("-")[0];
  const runtime = details?.runtime;
  const director = details?.credits?.crew?.find((c) => c.job === "Director");
  const cast = details?.credits?.cast?.slice(0, 8) || [];
  const trailer = details?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const genres = details?.genres || [];
  const similar = details?.similar?.results?.slice(0, 4) || [];

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 pb-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", overflowY: "auto" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content bg-[#12121a] rounded-2xl w-full max-w-4xl border border-[#1e1e2e] overflow-hidden">
        {/* Backdrop hero */}
        <div className="relative h-56 md:h-72">
          {backdrop ? (
            <img src={backdrop} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#1e1e2e]" />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(18,18,26,1))" }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 -mt-16 relative">
          <div className="flex gap-5 flex-col sm:flex-row">
            {/* Poster */}
            {poster && (
              <div className="flex-shrink-0">
                <img
                  src={poster}
                  alt={data.title}
                  className="w-28 h-40 object-cover rounded-xl border-2 border-[#1e1e2e] shadow-2xl"
                />
              </div>
            )}

            {/* Main info */}
            <div className="flex-1 min-w-0 pt-4 sm:pt-10">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-1 leading-tight">
                {data.title}
              </h2>
              {data.tagline && (
                <p className="text-yellow-400/70 italic text-sm mb-2">{data.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 mb-3">
                {year && <span className="text-gray-400 text-sm">{year}</span>}
                {runtime && (
                  <span className="text-gray-400 text-sm">
                    {Math.floor(runtime / 60)}h {runtime % 60}m
                  </span>
                )}
                <DisplayStars rating={data.vote_average} count={data.vote_count} size={14} />
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {genres.map((g) => (
                    <span key={g.id} className="text-xs border border-[#e50914]/40 text-[#e50914] px-2 py-0.5 rounded-full">
                      {g.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Overview */}
          {data.overview && (
            <div className="mt-4">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Overview</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{data.overview}</p>
            </div>
          )}

          {/* Details row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 p-4 bg-[#0a0a0f] rounded-xl">
            {director && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Director</p>
                <p className="text-sm text-white font-medium">{director.name}</p>
              </div>
            )}
            {details?.budget > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Budget</p>
                <p className="text-sm text-white font-medium">${(details.budget / 1e6).toFixed(0)}M</p>
              </div>
            )}
            {details?.revenue > 0 && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Revenue</p>
                <p className="text-sm text-white font-medium">${(details.revenue / 1e6).toFixed(0)}M</p>
              </div>
            )}
            {details?.status && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Status</p>
                <p className="text-sm text-white font-medium">{details.status}</p>
              </div>
            )}
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Cast</h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 text-center w-16">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#1e1e2e] mx-auto mb-1">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg font-bold">
                          {actor.name[0]}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 leading-tight truncate">{actor.name}</p>
                    <p className="text-xs text-gray-600 leading-tight truncate">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User rating */}
          <div className="mt-5 p-4 bg-[#0a0a0f] rounded-xl">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Your Rating</h4>
            <StarRating
              movieId={movie.id}
              currentRating={userRating}
              onRate={onRate}
              size={26}
            />
            {userRating > 0 && (
              <p className="text-gray-400 text-sm mt-2">
                You rated this {userRating} out of 5 stars
              </p>
            )}
          </div>

          {/* Trailer link */}
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-[#e50914] hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <PlayIcon /> Watch Trailer
            </a>
          )}

          {loading && (
            <div className="mt-4 text-center text-gray-500 text-sm animate-pulse">
              Loading details...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
