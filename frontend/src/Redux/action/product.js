import { server } from "../store";
import axios from "axios";

export const getAllProducts =
  (keyword = "", currentPage = 1, price = [0, 25000]) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getAllProductRequest" });
      let link = `${server}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
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
    // console.log(data);
    dispatch({ type: "productDetailsSuccess", payload: data.product });
  } catch (error) {
    // console.log(error)
    dispatch({
      type: "productDetailsFail",
      payload: error.response.data.message,
    });
  }
};
