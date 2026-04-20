export default function MovieCard({ movie, onSelect, userRating }) {
  return (
    <div 
      onClick={() => onSelect(movie)}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
    >
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-1 truncate">{movie.title}</h2>
        <div className="flex justify-between text-gray-500 text-sm mb-2">
          <span>{movie.year}</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{movie.genre}</span>
        </div>
        <div className="text-sm font-medium text-gray-700">
          User Rating: {userRating ? `${userRating} / 5` : "Not rated"}
        </div>
      </div>
    </div>
  );
}