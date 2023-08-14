import express from "express";
import {
  contact,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getSingleUserDetails,
  getUserDetails,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();
import singleUpload from "../middleware/multer.js";

router.route("/register").post(singleUpload,register);

router.route("/login").post(login);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/contact").post(contact);

router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authorizedAdmin, getSingleUserDetails)
  .put(isAuthenticated, authorizedAdmin, updateUserRole)
  .delete(isAuthenticated, authorizedAdmin,deleteUser);

export default router;
