import React, { useEffect } from 'react'
import "./Products.css"
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/Hader/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/action/product";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";

const Products = () => {
    const dispatch = useDispatch();
    const { message, error, productCount, products, loading } = useSelector(
      (state) => state.product
    );
    useEffect(() => {
        dispatch(getAllProducts());
        if (error) {
          toast.error(error);
          dispatch({ type: "clearError" });
        }
    
        if (message) {
          toast.success(message);
          dispatch({ type: "clearMessage" });
        }
      }, [dispatch, error, message]);
  return (
    <>
    {
        loading?<Loader />:<></>
    }
    </>
  )
}

export default Products