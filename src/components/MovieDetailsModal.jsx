import StarRating from "./StarRating";

export default function MovieDetailsModal({ movie, onClose, userRating, onRate }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-red-600 z-10"
        >
          X
        </button>
        
        <div className="md:flex">
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full md:w-1/2 h-64 md:h-auto object-cover"
          />
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{movie.title} ({movie.year})</h2>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
                {movie.genre}
              </span>
              <p className="text-gray-700 mb-4">{movie.description}</p>
              <p className="text-sm text-gray-500 mb-4"><strong>Cast:</strong> {movie.cast}</p>
            </div>
            
            <div className="mt-auto border-t pt-4">
              <h3 className="font-semibold text-lg mb-2">Rate this movie:</h3>
              <StarRating rating={userRating} onRate={onRate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}