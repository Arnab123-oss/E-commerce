import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";



const router = express.Router();

router.route("/products").get(getAllProducts); //isAuthenticated,

router
  .route("/admin/product/new")
  .post(isAuthenticated, authorizedAdmin,createProduct);

  router
  .route("/admin/products")
  .get(isAuthenticated, authorizedAdmin, getAdminProducts);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizedAdmin, updateProduct)
  .delete(isAuthenticated, authorizedAdmin, deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated,singleUpload, createProductReview);

router
  .route("/reviews")
  .get(getAllReviews)
  .delete(isAuthenticated, deleteReview);

export default router;
