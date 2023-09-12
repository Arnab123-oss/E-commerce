import { server } from "../store";
import axios from "axios";

export const getAllProducts =
  (keyword = "", currentPage = 1, price = [0, 80000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductRequest" });
      let link = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
      // console.log(data);
      dispatch({ type: "getAllProductSuccess", payload: data });
    } catch (error) {
      // console.log(response.message)
      dispatch({
        type: "getAllProductFail",
        payload: error.response.data.message,
      });
    }
  };

export const getSingleProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "productDetailsRequest" });
    const { data } = await axios.get(`${server}/product/${id}`);

    dispatch({ type: "productDetailsSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "productDetailsFail",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "productReviewRequest" });
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.put(`${server}/review`, reviewData, config);
    dispatch({ type: "productReviewSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "productReviewFail",
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "getAdminProductRequest" });

    const config = {
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
    };

    const { data } = await axios.get(`${server}/admin/products`, config);

    dispatch({
      type: "getAdminProductSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAdminProductFail",
      payload: error.response.data.message,
    });
  }
};

//create a product
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });
    const config = {
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.post(`${server}/admin/product/new`, productData, config);
    dispatch({ type: "createProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.response.data.message,
    });
  }
};


