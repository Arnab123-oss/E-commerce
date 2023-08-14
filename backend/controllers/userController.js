import { ErrorHandler } from "../utils/errorhandler.js";
import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { User } from "../model/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import cloudinary from "cloudinary";
import crypto from "crypto";
import getDataUri from "../utils/dataUri.js";
//Register a user

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

 

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  //upload file on cloudinary;

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});


//LogIn User

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

//Logout User

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

//Forgot Password

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save({ validateBeforeSave: false });

  //send Token Via email
  const url = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const to = user.email;
  const from = process.env.SMTP_MAIL;
  const subject = "E-Commerce Password Recovery";
  const message = `Click on the link to reset your password ${url} ,If you have not requested
  then please ignore`;

  try {
    await sendEmail({ to, subject, message, from });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new ErrorHandler("Token is invalid or has been expired", 401));

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;

  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(res, user, `Welcome back ${user.name}`, 200);

  res.status(200).json({
    success: true,
    message: "Password Change Successfully",
  });
});

//Get User Details

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User Password

export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.comparePassword(req.body.oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

// Contact US

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, text } = req.body;

  if (!name || !email || !text)
    return next(new ErrorHandler("All fields are mandatory", 400));

  const to = process.env.SMTP_MAIL;
  const from = email;
  const subject = "Contact from Company name";
  const message = `I am ${name} and my Email is ${email}. \n${text}`;
  // console.log(from);

  await sendEmail({ to, subject, message, from });

  res.status(200).json({
    success: true,
    message: "Your message has been submitted successfully.",
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

//Get All Users --- Admin

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user

export const getSingleUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 400));

  res.status(200).json({
    success: true,
    user,
  });
});

//Update user role

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found"), 404);

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();
  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
});

//Delete USer

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found"), 404);

  // await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel Subscription

  // console.log(user);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "Deleted User Successfully",
  });
});
