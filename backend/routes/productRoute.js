import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts); //isAuthenticated,

router
  .route("/product/new")
  .post(isAuthenticated, authorizedAdmin, createProduct);

router
  .route("/product/:id")
  .put(isAuthenticated, authorizedAdmin, updateProduct)
  .delete(isAuthenticated, authorizedAdmin, deleteProduct)
  .get(getProductDetails);

export default router;
