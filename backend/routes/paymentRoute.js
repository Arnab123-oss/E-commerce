import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middleware/auth.js";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";

router.route("/payment/process").get(isAuthenticated,processPayment);
router.route("/stripeapikey").get(isAuthenticated,sendStripeApiKey);



export default router;