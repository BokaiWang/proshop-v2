import { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  rating: number;
  numReviews: number;
}

const STAR_NUMBER = 5;

const Rating: FC<Props> = ({ rating, numReviews }) => {
  const numFullStars = Math.floor(rating);
  const halfStar = rating % 1;
  const numEmtpyStars = Math.floor(STAR_NUMBER - rating);
  const stars: number[] = [];
  for (let index = 0; index < numFullStars; index++) {
    stars.push(1);
  }
  if (halfStar) {
    stars.push(0.5);
  }
  for (let index = 0; index < numEmtpyStars; index++) {
    stars.push(0);
  }

  return (
    <div className="rating">
      <span>
        {stars.map((star, index) =>
          star === 1 ? (
            <FaStar key={index} />
          ) : star === 0.5 ? (
            <FaStarHalfAlt key={index} />
          ) : (
            <FaRegStar key={index} />
          )
        )}
      </span>
      <span className="rating-text">
        {numReviews && `${numReviews} reviews`}
      </span>
    </div>
  );
};

export default Rating;
