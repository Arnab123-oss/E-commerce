import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDeleteColumn } from "react-icons/ai";
import SideBar from "./Sidebar";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAdminProduct } from "../../Redux/action/product";

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { error, products } = useSelector((state) => state.product);
  
    // const { error: deleteError, isDeleted } = useSelector(
    //   (state) => state.product
    // );
  
    // const deleteProductHandler = (id) => {
    //   dispatch(deleteProduct(id));
    // };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({type: "clearError"});
      }
  
    //   if (deleteError) {
    //     toast.error(deleteError);
    //     dispatch({type: "clearError"});
    //   }
  
    //   if (isDeleted) {
    //     toast.success("Product Deleted Successfully");
    //     navigate("/admin/dashboard");
    //     dispatch({ type: DELETE_PRODUCT_RESET });
    //   }
  
      dispatch(getAdminProduct());
    }, [dispatch, toast, error]);
  

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const nameValue = params.row.id;
        return (
          <>
            <Link to={`/admin/product/${nameValue}`}>
              <TiEdit />
            </Link>
            <Button
            //   onClick={() =>
            //     deleteProductHandler(nameValue)
            //   }
            >
              <AiOutlineDeleteColumn />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
