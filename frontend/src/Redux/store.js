import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Reducer/productReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
