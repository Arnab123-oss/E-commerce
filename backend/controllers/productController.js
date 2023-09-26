import { Product } from "../model/Product.js";
import { ErrorHandler } from "../utils/errorhandler.js";
import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { ApiFeatures } from "../utils/apifeatures.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

// create product -- Admin

export const createProduct = catchAsyncError(async (req, res, next) => {
  const images = req.files;
  // console.log(req.files);

  if (!images) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const img = getDataUri(images[i]);

    const result = await cloudinary.v2.uploader.upload(img.content);

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product Created SuccessFully",
    product,
  });
});

// export const uploadPhoto = catchAsyncError(async (req, res, next) => {
//   const file = req.files;
//   console.log(req);
//   if (!file) {
//     return next(new ErrorHandler("No file uploaded", 400));
//   }
//   const fileUri = getDataUri(file);

//   const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

//   const publicId = mycloud.public_id;
//   const url = mycloud.secure_url;

//   res.status(201).json({
//     publicId,
//     url,
//   });
// });

// let images = req.files
// console.log(images)

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   const imagesLinks = [];

//   for (let i = 0; i < images.length; i++) {

//     const img = getDataUri(images[i]);

//     const result = await cloudinary.v2.uploader.upload(img.content);

//     imagesLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }

//   req.body.images = imagesLinks;
//   req.body.user = req.user.id;

// Get All Product
export const getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apifeatures.query;
  let filteredProductsCount = products.length;
  apifeatures.pagination(resultPerPage);
  products = await apifeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});
//Update Product  -- Admin

export const updateProduct = catchAsyncError(async (req, res) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product is not found", 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    message: "Product Updated Successfully",
  });
});
// Delete Product

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found", 500));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Get Product Details

export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not fount", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Create a new review or Update the review

export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar.url
      ? req.user.avatar.url
      : "https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png",
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Reviews saved successfully",
  });
});

//Get all Reviews of a product

export const getAllReviews = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product is not found", 500));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message:"Review Deleted Successfully 😊"
  });
});

//Get All Products For Admin

export const getAdminProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
