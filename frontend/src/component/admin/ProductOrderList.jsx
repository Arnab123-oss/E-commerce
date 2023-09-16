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
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminOrdersDetails, deleteOrder } from "../../Redux/action/order";

const ProductOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, message, error, orders } = useSelector(
    (state) => state.adminOrders
  );

  // const { error: deleteError, isDeleted } = useSelector(
  //   (state) => state.product
  // );

  const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

      if (message) {
        toast.success("Order Deleted Successfully");
        navigate("/admin/orders");
        dispatch({type: "clearMessage"});;
      }

    dispatch(adminOrdersDetails());
  }, [dispatch, error, message, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const statusValue = params.row.status;
        return statusValue === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
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
            <Link to={`/admin/order/${nameValue}`}>
              <TiEdit />
            </Link>
            <Button onClick={() => deleteOrderHandler(nameValue)}>
              <AiOutlineDeleteColumn />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default ProductOrderList;
