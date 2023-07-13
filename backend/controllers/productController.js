import { Product } from "../model/Product.js";

// create product -- Admin

export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// Get All Product
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//Update Product  -- Admin

export const updateProduct = async (req, res) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// Delete Product

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found",
    });
  }

  await product.remove;

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
};

// Get Product Details

export const getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};
