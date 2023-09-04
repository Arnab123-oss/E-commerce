import { server } from "../store";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${server}/product/${id}`);
  await dispatch({
    type: "addToCartSuccess",
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });
  localStorage.setItem(
    "itemsInCart",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: "removeCartItem", payload: id });
  localStorage.setItem(
    "itemsInCart",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: "saveShippingInfo",
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
