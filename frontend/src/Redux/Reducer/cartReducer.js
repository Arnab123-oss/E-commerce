import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("itemsInCart")
      ? JSON.parse(localStorage.getItem("itemsInCart"))
      : []
  };
  
  export const cartReducer = createReducer(initialState, {
    addToCartSuccess: (state, action) => {
      const item = action.payload;
  
      const isItemExist = state.cartItems.find((i) => i.product === item.product);
    
  
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    },
    removeCartItem:(state,action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    }
  });
  