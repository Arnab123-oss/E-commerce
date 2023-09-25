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

//Get All Orders Admin
export const adminOrdersDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "allOrderRequest" });

    const config = {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.get(`${server}/admin/orders`, config);

    dispatch({ type: "allOrderSuccess", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "allOrderFail",
      payload: error.response.data.message,
    });
  }
};

//update order
export const updateOrder = (id, order) => async (dispatch) => {
  // console.log(id,status);
  try {
    dispatch({ type: "updateOrderRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
        withCredential: true,
      },
    };
    const { data } = await axios.put(
      `${server}/admin/order/${id}`,
      order,
      config
    );
    console.log(data);
    dispatch({ type: "updateOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateOrderFail",
      payload: error.response.data.message,
    });
  }
};

//Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    };
    dispatch({ type: "deleteOrderRequest" });
    const { data } = await axios.delete(`${server}/admin/order/${id}`, config);
    dispatch({ type: "deleteOrderSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteOrderFail",
      payload: error.response.data.message,
    });
  }
};

// my Orders Details
export const getOrdersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "orderDetailsRequest" });

    const config = {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.get(`${server}/order/${id}`, config);

    dispatch({ type: "orderDetailsSuccess", payload: data.order });
  } catch (error) {
    dispatch({
      type: "orderDetailsFail",
      payload: error.response.data.message,
    });
  }
};
