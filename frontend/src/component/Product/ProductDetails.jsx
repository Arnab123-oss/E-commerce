import React, { useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProducts } from "../../Redux/action/product";
import { useParams } from "react-router-dom";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import ReviewCard from "./ReviewCard.jsx"
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { singleProduct } = useSelector((state) => state.productDetails);
  const params = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselInfiniteScroll = () => {
    if (currentIndex === singleProduct.images.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => carouselInfiniteScroll(), 3000);

    // clean up function
    return () => clearInterval(interval);
  });

  useEffect(() => {
    dispatch(getSingleProducts(params.id));
  }, [dispatch, params.id]);
  const rating = singleProduct.ratings;
  const Star = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <a>
        {rating >= index + 1 ? (
          <BsFillStarFill />
        ) : rating >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </a>
    );
  });

  return (
    <>
      <div className="Product-body">
        <div className="Product-container">
          <div className="product-image">
            <img
              src="http://co0kie.github.io/codepen/nike-product-page/nikeLogo.png"
              alt=""
              className="product-logo"
            />
            <div className="carousel-container">
              {singleProduct.images &&
                singleProduct.images.map((item, i) => (
                  <div
                    className="carousel-image"
                    style={{
                      transform: `translate(-${currentIndex * 100}%)`,
                    }}
                    key={i}
                  >
                    <img key={i} src={item.url} alt={`${i} Slide`} />
                  </div>
                ))}
            </div>
            <div className="dots">
              <a href="#!" className="active">
                <i>1</i>
              </a>
              <a href="#!">
                <i>2</i>
              </a>
              <a href="#!">
                <i>3</i>
              </a>
              <a href="#!">
                <i>4</i>
              </a>
            </div>
          </div>
          <div className="product-details">
            <header>
              <h1 className="title">{singleProduct.name}</h1>
              <span className="colorCat">mint green</span>
              <div className="price">
                <span className="current">$ {singleProduct.price}</span>
                <span className="before">
                  Status |
                  <b className={singleProduct.Stock < 1 ? "fc-r" : "fc-g"}>
                    {singleProduct.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </span>
              </div>
              <div className="rate">
                {Star}
                <span className="reviewCount">
                  ({singleProduct.numOfReviews}Reviews)
                </span>
              </div>
            </header>
            <article>
              <h5>Description</h5>
              <p>{singleProduct.description}</p>
            </article>
            <div className="controls">
              <div className="color">
                <h5>color</h5>
                <ul>
                  <li>
                    <a href="#!" className="colors color-bdot1 active" />
                  </li>
                  <li>
                    <a href="#!" className="colors color-bdot2" />
                  </li>
                  <li>
                    <a href="#!" className="colors color-bdot3" />
                  </li>
                  <li>
                    <a href="#!" className="colors color-bdot4" />
                  </li>
                  <li>
                    <a href="#!" className="colors color-bdot5" />
                  </li>
                </ul>
              </div>
              <div className="size">
                <h5>size</h5>
                <a href="#!" className="option">
                  (UK 8)
                </a>
              </div>
              <div className="qty">
                <h5>qty</h5>
                <a href="#!" className="option">
                  (1)
                </a>
              </div>
            </div>
            <div className="Product-footer">
              <button type="button">
                <img
                  src="http://co0kie.github.io/codepen/nike-product-page/cart.png"
                  alt=""
                />
                <span>add to cart</span>
              </button>
              {/* <button type="button">
                <img
                  src="http://co0kie.github.io/codepen/nike-product-page/cart.png"
                  alt=""
                />
                <span>add</span>
              </button> */}
              {/* <a href="#!"><img src="http://co0kie.github.io/codepen/nike-product-page/share.png" alt=""/></a> */}
            </div>
          </div>
        </div>
      </div>
      <h3 className="reviewsHeader">REVIEWS</h3>
      {singleProduct.reviews && singleProduct.reviews[0] ? (
        <div className="reviews">
          {singleProduct.reviews &&
            singleProduct.reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
        </div>
      ) : (
        <p className="noReview">No Reviews Yet</p>
      )}
    </>
  );
};

export default ProductDetails;
