import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, onRate }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1 my-2">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              onClick={() => onRate(ratingValue)}
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              size={24}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}