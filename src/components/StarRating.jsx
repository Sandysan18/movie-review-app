import { useState } from "react";

const StarIcon = ({ filled, half, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "#f5c518" : half ? "url(#half)" : "none"}
    stroke={filled || half ? "#f5c518" : "#4b5563"}
    strokeWidth="1.5"
    xmlns="http://www.w3.org/2000/svg"
  >
    {half && (
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#f5c518" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
    )}
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Interactive star rating (for user to rate)
export const StarRating = ({ movieId, currentRating, onRate, size = 22 }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || currentRating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="star"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(movieId, star)}
          title={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <StarIcon filled={star <= display} size={size} />
        </span>
      ))}
      {currentRating > 0 && (
        <span className="text-xs text-yellow-400 ml-1 font-medium">
          {currentRating}/5
        </span>
      )}
    </div>
  );
};

// Display-only star rating (for TMDB score)
export const DisplayStars = ({ rating, maxRating = 10, count, size = 14 }) => {
  // Convert to 5-star scale
  const stars = (rating / maxRating) * 5;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <StarIcon
            key={s}
            filled={s <= fullStars}
            half={!s <= fullStars && s === fullStars + 1 && hasHalf}
            size={size}
          />
        ))}
      </div>
      <span className="text-yellow-400 font-semibold text-sm">
        {rating?.toFixed(1)}
      </span>
      {count && (
        <span className="text-gray-500 text-xs">({count.toLocaleString()})</span>
      )}
    </div>
  );
};
