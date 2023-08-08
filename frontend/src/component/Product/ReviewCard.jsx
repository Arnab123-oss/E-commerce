import React from "react";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const ReviewCard = ({ review }) => {
  const reviewRating = review.rating;
  const Star = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <>
        {reviewRating >= index + 1 ? (
          <BsFillStarFill />
        ) : reviewRating >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </>
    );
  });
  const profilePng= "https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png"
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      {Star}
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
