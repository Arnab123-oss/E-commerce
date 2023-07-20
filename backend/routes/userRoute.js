import express from "express";
import { forgetPassword, login, logout, register, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

export default router;
