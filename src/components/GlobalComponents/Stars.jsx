import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="stars">
      {[...Array(full)].map((_, i) => (
        <FaStar key={`f${i}`} />
      ))}
      {half && <FaRegStarHalfStroke />}
      {[...Array(empty)].map((_, i) => (
        <FaRegStar key={`e${i}`} />
      ))}
    </div>
  );
}

export default Stars;