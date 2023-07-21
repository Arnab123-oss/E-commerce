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
  .route("admin/product/new")
  .post(isAuthenticated, authorizedAdmin, createProduct);

router
  .route("admin/product/:id")
  .put(isAuthenticated, authorizedAdmin, updateProduct)
  .delete(isAuthenticated, authorizedAdmin, deleteProduct)
 

  router.route("/product/:id").get(getProductDetails);

export default router;
