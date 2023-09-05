import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import stripe from "stripe";


const { STRIPE_SECRET_KEY, STRIPE_API_KEY } = process.env;
const stripeInstance = stripe(STRIPE_SECRET_KEY);


export const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripeInstance.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ALFAGIZ",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: STRIPE_API_KEY });
});
