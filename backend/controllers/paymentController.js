import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import Stripe from "stripe";
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = catchAsyncError(async (req, res, next) => {


  const myPayment = await stripeInstance.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ALFAGIZ",
    }
  },{
      'apiKey': `${process.env.STRIPE_SECRET_KEY}`,
    });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
