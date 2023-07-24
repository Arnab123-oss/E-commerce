import express from "express";
import { newOrder } from "../controllers/orderController";

import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

export default router;
