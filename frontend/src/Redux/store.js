import { configureStore } from "@reduxjs/toolkit";
import {
  createProductReducer,
  productDetailsReducer,
  productReducer,
  productReviewReducer,
} from "./Reducer/productReducer";
import {
  adminUserActionReducer,
  profileReducer,
  userReducer,
} from "./Reducer/userReducer";
import { cartReducer } from "./Reducer/cartReducer";
import {
  adminOrderReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./Reducer/orderReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    order: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    review: productReviewReducer,
    createProduct: createProductReducer,
    adminOrders: adminOrderReducer,
    adminUserAction: adminUserActionReducer,
  },
});

export default store;

export const server = "http://localhost:4000/api/v1";
