import { createReducer } from "@reduxjs/toolkit";

export const newOrderReducer = createReducer(
  { products: [], myOrders: [] },
  {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    myOrderRequest: (state) => {
      state.loading = true;
    },
    myOrderSuccess: (state, action) => {
      state.loading = false;
      state.myOrders = action.payload;
    },
    myOrderFail: (state, action) => {
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





export const myOrderReducer = createReducer(
    { orders: [] },
    {
      myOrderRequest: (state) => {
        state.loading = true;
      },
      myOrderSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      },
      myOrderFail: (state, action) => {
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
