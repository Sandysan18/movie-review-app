// TMDB API Configuration
// Uses TMDB v3 API - get your key at https://www.themoviedb.org/settings/api
const API_KEY ="1d8c90a754b58647faa640047df6d6be";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

const get = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  return res.json();
};

// ✅ KEY FIX: Search hits API with the search text directly
export const searchMovies = (query, page = 1) =>
  get("/search/movie", { query, page, include_adult: false });

export const getTrending = (page = 1) =>
  get("/trending/movie/week", { page });

export const getPopular = (page = 1) =>
  get("/movie/popular", { page });

export const getTopRated = (page = 1) =>
  get("/movie/top_rated", { page });

export const getMovieDetails = (id) =>
  get(`/movie/${id}`, { append_to_response: "credits,videos,similar" });

export const discoverMovies = (params = {}) =>
  get("/discover/movie", { sort_by: "popularity.desc", ...params });

export const getGenres = () =>
  get("/genre/movie/list");

export const posterUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export const backdropUrl = (path, size = "w1280") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;
