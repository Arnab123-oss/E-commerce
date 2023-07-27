import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  { product: [] },
  {
    getAllProductRequest: (state) => {
      state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.products;
      state.productCount = action.payload.productCount;
    },
    getAllProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
        state.error = null;
      },
      clearMessage: state => {
        state.message = null;
      },
  }
);
