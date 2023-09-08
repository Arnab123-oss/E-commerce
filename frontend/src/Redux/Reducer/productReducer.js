import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  { products: [] },
  {
    getAllProductRequest: (state) => {
      state.loading = true;
    },
    getAllProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    getAllProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const productDetailsReducer = createReducer(
  { singleProduct: { ratings: 0 } },
  {
    productDetailsRequest: (state) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.singleProduct = action.payload;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const productReviewReducer = createReducer(
  { singleProduct: { ratings: 0 } },
  {
    productReviewRequest: (state) => {
      state.loading = true;
    },
    productReviewSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    productReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
