import React from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleProducts } from "../../Redux/action/product";
import { useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LiaOpencart } from "react-icons/lia";
import { BsArrowRightShort,BsArrowLeftShort } from "react-icons/bs";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const params = useParams();

  useEffect(() => {
    dispatch(getSingleProducts(params.id));
  }, [dispatch, params.id]);

  return (
    // <>
    //   <div className="ProductDetailsPage">
    //     <div>
    //       <Carousel>
    //         {product.images &&
    //           product.images.map((item, i) => (
    //             <img
    //               className="CarouselImage"
    //               key={i}
    //               src={item.url}
    //               alt={`${i} Slide`}
    //             />
    //           ))}
    //       </Carousel>
    //     </div>
    //   </div>
    // </>
    <div className="card">
      <div className="left">
   
          {product.images &&
            product.images.map((item, i) => (
              <img
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
           <BsArrowLeftShort className="arrow-left"/>
          <BsArrowRightShort className="arrow-right"/>
    
      </div>
      <div className="right">
        <div className="product-info">
          <div className="product-name">
            <h1>Airmax</h1>
          </div>
          <div className="details">
            <h3>Winter Collection</h3>
            <h2>Men Black Sneakers</h2>
            <h4>
              <span className="fa fa-dollar" />
              15000
            </h4>
            <h4 className="dis">
              <span className="fa fa-dollar" />
              20000
            </h4>
          </div>
          <ul>
            <li>SIZE</li>
            <li className="bg">7</li>
            <li className="bg">8</li>
            <li className="bg">9</li>
            <li className="bg">10</li>
            <li className="bg">11</li>
          </ul>
          <ul>
            <li>COLOR</li>
            <li className="yellow" />
            <li className="black" />
            <li className="blue" />
          </ul>
          <span className="svg">
            <HiOutlineShoppingBag />
          </span>
          <span className="foot">Buy Now</span>
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
