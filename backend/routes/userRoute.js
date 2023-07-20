import express from "express";
import {
  forgetPassword,
  getUserDetails,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

export default router;
