import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/Hader/MetaData";

const Home = () => {
  const product = {
    name: "FKUC T-Shirt",
    image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: 1254,
    _id: "fuckgirl",
  };
  return (
    <>
     <MetaData title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce!</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

      </div>
    </>
  );
};

export default Home;
