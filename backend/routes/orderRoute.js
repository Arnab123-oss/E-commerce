import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getOrderDetails);

router.route("/orders/me").get(isAuthenticated, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizedAdmin, getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedAdmin, updateOrder)
  .delete(isAuthenticated, authorizedAdmin, deleteOrder);

export default router;
