import React, { useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProducts, newReview } from "../../Redux/action/product";
import { useParams } from "react-router-dom";
import { BsFillStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Header/MetaData";
import { addToCart } from "../../Redux/action/cart";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { singleProduct, loading } = useSelector(
    (state) => state.productDetails
  );
  const { message, error } = useSelector((state) => state.review);

  const params = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (singleProduct.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    const qty = quantity - 1;
    setQuantity(qty);

    if (quantity === 1) {
      setQuantity(1);
    }
  };

  const addCartHandler = () => {
    dispatch(addToCart(params.id, quantity));
    toast.success("Items Added To Cart");
  };

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
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, params.id, error, message]);
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

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", reviewRating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${singleProduct.name}--Ecommerce`} />

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
                        <a className="colors color-bdot1 active" />
                      </li>
                      <li>
                        <a className="colors color-bdot2" />
                      </li>
                      <li>
                        <a className="colors color-bdot3" />
                      </li>
                      <li>
                        <a className="colors color-bdot4" />
                      </li>
                      <li>
                        <a className="colors color-bdot5" />
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
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                  </div>
                </div>
                <div className="Product-footer">
                  <button
                    type="button"
                    disabled={singleProduct.Stock < 1 ? true : false}
                    onClick={addCartHandler}
                  >
                    <span>add to cart</span>
                  </button>
                  <button type="button" onClick={submitReviewToggle}>
                    <span>add Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h3 className="reviewsHeader">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setReviewRating(e.target.value)}
                value={reviewRating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
      )}
    </>
  );
};

export default ProductDetails;
