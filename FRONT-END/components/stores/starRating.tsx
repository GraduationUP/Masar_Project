import React from "react";

interface StarRatingProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  starColor?: string;
  emptyStarColor?: string;
  starSize?: string | number;
}

const StarRating: React.FC<StarRatingProps> = ({
  score,
  setScore,
  starColor = "#ffc107",
  emptyStarColor = "#e4e5e9",
  starSize = "24px",
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const handleStarClick = (value: number) => {
    setScore(value);
  };

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= score ? starColor : emptyStarColor,
            fontSize: starSize,
          }}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
