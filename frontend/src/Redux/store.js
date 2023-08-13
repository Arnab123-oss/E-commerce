import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailsReducer,
  productReducer,
} from "./Reducer/productReducer";
import { userReducer } from "./Reducer/userReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
