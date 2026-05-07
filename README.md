# 🎬 CineScope - Movie Review App

A full-featured movie review application built with React JS and TMDB API.

## ✅ Features

- **Live API Search**: Every keystroke hits the TMDB API to fetch matching movies by title
- **Browse Modes**: Trending this week, Discover with filters
- **Filters**: Genre, Release Year, Sort (Popularity/Rating/Date), Minimum Rating
- **Movie Details**: Full info including cast, director, budget, trailer link
- **Star Ratings**: 1–5 star rating system, persisted in localStorage
- **Responsive Grid**: Works on mobile, tablet, and desktop
- **Shimmer Skeletons**: Loading states for smooth UX

## 🚀 Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd movie-review-app

# 2. Install dependencies
npm install

# 3. Add your TMDB API key
cp .env.example .env
# Edit .env and add: VITE_TMDB_API_KEY=your_key_here

# 4. Start dev server
npm run dev
```

## 🔑 Getting a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API
3. Copy your v3 API key
4. Paste it in your `.env` file

## 🛠 Tech Stack

- **React JS** with Hooks (useState, useEffect, useCallback)
- **Tailwind CSS** for styling
- **TMDB API** for movie data
- **Vite** as build tool

## 📦 Deploy to Netlify

```bash
# Build the app
npm run build

# Deploy the dist/ folder to Netlify
```

Or connect your GitHub repo to Netlify for auto-deployments.

> ⚠️ Set `VITE_TMDB_API_KEY` as an environment variable in your Netlify dashboard under Site Settings → Environment Variables.

## 📁 Project Structure

```
src/
├── api/
│   └── tmdb.js          # All TMDB API calls
├── components/
│   ├── Header.jsx        # Navbar with search
│   ├── SearchBar.jsx     # Search input
│   ├── FilterBar.jsx     # Genre/year/sort filters
│   ├── MovieCard.jsx     # Movie tile + user rating
│   ├── MovieModal.jsx    # Detailed movie view
│   ├── StarRating.jsx    # Interactive & display stars
│   └── Pagination.jsx    # Page navigation
├── hooks/
│   ├── useDebounce.js    # Debounce search input
│   └── useRatings.js     # localStorage ratings
├── App.jsx               # Main app logic
└── index.css             # Global styles + Tailwind
```
