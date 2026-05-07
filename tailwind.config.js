/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        cinema: {
          bg: '#0a0a0f',
          card: '#12121a',
          border: '#1e1e2e',
          gold: '#f5c518',
          red: '#e50914',
          muted: '#6b7280',
          light: '#e2e8f0',
        }
      }
    },
  },
  plugins: [],
}
