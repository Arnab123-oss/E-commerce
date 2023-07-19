import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts); //isAuthenticated,

router.route("/product/new").post(createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

export default router;
