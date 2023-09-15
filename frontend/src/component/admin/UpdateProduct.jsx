import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import { MdAccountTree } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { TiCloudStorage } from "react-icons/ti";
import { MdSpellcheck } from "react-icons/md";
import { TbCoinRupee } from "react-icons/tb";
import SideBar from "./Sidebar";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, getSingleProducts } from "../../Redux/action/product";
import axios from "axios";
import { server } from "../../Redux/store";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const {
    loading,
    error: updateError,
    message,
  } = useSelector((state) => state.product);

  const { singleProduct, error } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (singleProduct && singleProduct._id !== params.id) {
      dispatch(getSingleProducts(params.id));
    } else {
      setName(singleProduct.name);
      setDescription(singleProduct.description);
      setPrice(singleProduct.price);
      setCategory(singleProduct.category);
      setStock(singleProduct.Stock);
      setOldImages(singleProduct.images);
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      navigate("/admin/products");
      dispatch({ type: "clearMessage" });
    }
  }, [
    dispatch,
    error,
    message,
    singleProduct,
    singleProduct._id,
    navigate,
    params.id,
    updateError,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);
    // myForm.set("images", images);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    // myForm.set("imagesArray", imagesUrl);
    //name,price,description,category,stock,images
    dispatch(updateProduct(params.id, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);

    // setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Update Product</h1>
            <div>
              <MdSpellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <TbCoinRupee />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <MdOutlineDescription />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <MdAccountTree />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <TiCloudStorage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="product images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>
            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
