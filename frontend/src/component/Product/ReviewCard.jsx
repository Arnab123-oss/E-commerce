import React from "react";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const ReviewCard = ({ review }) => {
  const reviewRating = review.rating;
  const Star = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <a>
        {reviewRating >= index + 1 ? (
          <BsFillStarFill />
        ) : reviewRating >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </a>
    );
  });

  return (
    <div className="reviewCard">
      <img src={review.avatar} alt="User" />
      <p>{review.name}</p>
      <div className="rate">{Star}</div>

      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
