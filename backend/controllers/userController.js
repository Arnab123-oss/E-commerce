import { ErrorHandler } from "../utils/errorhandler.js";
import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { User } from "../model/User.js";
import { sendToken } from "../utils/sendToken.js";

//Register a user

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password)
    //|| !file
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  //upload file on cloudinary;

  // const fileUri = getDataUri(file);

  // const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "ProfilePicUrl",
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

//Log User

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
