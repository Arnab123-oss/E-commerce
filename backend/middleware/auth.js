import { catchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorhandler.js";
import { User } from "../model/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) return next(new ErrorHandler("Not LOgged in", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();
});
