import { useState, useCallback } from "react";

const STORAGE_KEY = "movieapp_ratings";

const loadRatings = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveRatings = (ratings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
};

export const useRatings = () => {
  const [ratings, setRatings] = useState(loadRatings);

  const rateMovie = useCallback((movieId, stars) => {
    setRatings((prev) => {
      const updated = { ...prev, [movieId]: stars };
      saveRatings(updated);
      return updated;
    });
  }, []);

  const getUserRating = useCallback(
    (movieId) => ratings[movieId] || 0,
    [ratings]
  );

  return { ratings, rateMovie, getUserRating };
};
