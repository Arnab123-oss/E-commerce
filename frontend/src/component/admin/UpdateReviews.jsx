import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReviewList.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../layout/Header/MetaData";
import { AiOutlineDeleteColumn } from "react-icons/ai";
import SideBar from "./Sidebar";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAllReviews, deleteReviews } from "../../Redux/action/product";
import { BsFillStarFill } from "react-icons/bs";

const UpdateReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");

  const { loading, message, reviews, error } = useSelector(
    (state) => state.review
  );

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      navigate("/admin/reviews");
      dispatch({ type: "clearMessage" });
    }

   
  }, [dispatch, error, message,productId,navigate]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        const rating = params.row.rating;
        return rating >= "3" ? "greenColor" : "redColor";
      },
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
            <Button onClick={() => deleteReviewHandler(nameValue)}>
              <AiOutlineDeleteColumn />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCT REVIEWS </h1>

          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <BsFillStarFill />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateReviews;
