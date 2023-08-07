import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
// import Carousel from "react-material-ui-carousel";

import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProducts } from "../../Redux/action/product";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetails);
  const params = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselInfiniteScroll = () => {
    if (currentIndex === product.images.length - 1) {
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
              {product.images &&
                product.images.map((item, i) => (
                  <div
                    className="carousel-image"
                    style={{
                      transform: `translate(-${currentIndex * 100}%)`,
                    }}
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
              <h1 className="title">{product.name}</h1>
              <span className="colorCat">mint green</span>
              <div className="price">
                <span className="current">$ {product.price}</span>
                <span className="before">Stock | {product.Stock}</span>
              </div>
              <div className="rate">
                <a href="#!" className="active">
                  ★
                </a>
                <a href="#!" className="active">
                  ★
                </a>
                <a href="#!" className="active">
                  ★
                </a>
                <a href="#!">★</a>
                <a href="#!">★</a>
              </div>
            </header>
            <article>
              <h5>Description</h5>
              <p>
                {product.description}
              </p>
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
    </>

    // <div className="card">
    //   <div className="left">
    //     <Carousel className="btn" showArrows={true} pagination={false} verticalMode={false} isRTL={false}>
    //       {product.images &&
    //         product.images.map((item, i) => (
    //           <img key={i} src={item.url} alt={`${i} Slide`} />
    //         ))}
    //     </Carousel>

    //     <button className="arrow-left btn" onClick={prev}>
    //       <BsArrowLeftShort />
    //     </button>
    //     <button className="arrow-right btn" onClick={next}>
    //       <BsArrowRightShort />
    //     </button>

    //   </div>
    //   <div className="right">
    //     <div className="product-info">
    //       <div className="product-name">
    //         <h1>Airmax</h1>
    //       </div>
    //       <div className="details">
    //         <h3>{product.name}</h3>
    //         <h2>{product.description}</h2>
    //         <h4>
    //           <span className="fa fa-dollar" />$ {product.price}
    //         </h4>
    //         <h4 className="dis">
    //           <span className="fa fa-dollar" />
    //           Stock | {product.Stock}
    //         </h4>
    //       </div>
    //       <ReactStars {...options} />

    //       <ul>
    //         <li>COLOR</li>
    //         <li className="yellow" />
    //         <li className="black" />
    //         <li className="blue" />
    //       </ul>
    //       <span className="svg">
    //         <MdRateReview />
    //       </span>
    //       <span className="foot">Add Review</span>
    //       <span className="svg">
    //         <LiaOpencart />
    //       </span>
    //       <span className="foot">Add TO Cart</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductDetails;
