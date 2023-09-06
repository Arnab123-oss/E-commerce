import { server } from "../store";
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "createOrderRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.post(`${server}/order/new`, order, config);

    dispatch({ type: "createOrderSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};

// my Orders
export const myOrdersDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "myOrderRequest" });

    const config = {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.get(`${server}/orders/me`, config);

    dispatch({ type: "myOrderSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "myOrderFail",
      payload: error.response.data.message,
    });
  }
};