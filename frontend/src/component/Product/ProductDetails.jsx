import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProducts } from "../../Redux/action/product";
import { useParams } from "react-router-dom";
import { MdRateReview } from "react-icons/md";
import { LiaOpencart } from "react-icons/lia";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);
  const params = useParams();

  const [slideIndex, setSlideIndex] = useState(1);

  const next = () => {
    
    if (slideIndex !== product.images.length) {
      setSlideIndex(slideIndex+1);
    } else if (slideIndex === product.images.length) {
      setSlideIndex(1);
    }
    // console.log(slideIndex);
  };
  const prev = () => {
 
    console.log(slideIndex +"bg");
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex -1);
    } else if (slideIndex === 1) {
      setSlideIndex(product.images.length);
    }
    console.log(slideIndex);
  };

  useEffect(() => {
    dispatch(getSingleProducts(params.id));
  }, [dispatch, params.id]);

  const options = {
    edit: false,
    color: "rgba(242, 240, 240,0.5)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <div className="card">
      <div className="left">
        <Carousel showArrows={true} pagination={false}>
          {product.images &&
            product.images.map((item, i) => (
              <img key={i} src={item.url} alt={`${i} Slide`} />
            ))}
        </Carousel>
        {/* className="arrow-left"  */}
        <button className="arrow-left btn" onClick={prev}>
          {" "}
          <BsArrowLeftShort />
        </button>
        <button className="arrow-right btn" onClick={next}>
          {" "}
          <BsArrowRightShort />
        </button>
        {/* <BsArrowLeftShort className="arrow-left" />
        <BsArrowRightShort className="arrow-right" /> */}
      </div>
      <div className="right">
        <div className="product-info">
          <div className="product-name">
            <h1>Airmax</h1>
          </div>
          <div className="details">
            <h3>{product.name}</h3>
            <h2>{product.description}</h2>
            <h4>
              <span className="fa fa-dollar" />$ {product.price}
            </h4>
            <h4 className="dis">
              <span className="fa fa-dollar" />
              Stock | {product.Stock}
            </h4>
          </div>
          <ReactStars {...options} />

          <ul>
            <li>COLOR</li>
            <li className="yellow" />
            <li className="black" />
            <li className="blue" />
          </ul>
          <span className="svg">
            <MdRateReview />
          </span>
          <span className="foot">Add Review</span>
          <span className="svg">
            <LiaOpencart />
          </span>
          <span className="foot">Add TO Cart</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
