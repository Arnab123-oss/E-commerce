import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailsReducer,
  productReducer,
} from "./Reducer/productReducer";
import { profileReducer, userReducer } from "./Reducer/userReducer";
import { cartReducer } from "./Reducer/cartReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile:profileReducer,
    cart:cartReducer
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
