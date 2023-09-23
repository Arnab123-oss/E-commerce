import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate,useParams } from "react-router-dom";
import { TbCoinRupee } from "react-icons/tb";
import SideBar from "./Sidebar";
import toast from "react-hot-toast";
import Loader from "../layout/Loader/Loader";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const dispatch = useDispatch;
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  // const subtotal = order.orderItems.reduce(
  //   (acc, item) => acc + item.quantity * item.price,
  //   0
  // );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error]);

  const proceedToPayment = () => {};

  return (
    <>
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage">
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/products/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ₹{item.price} =
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div>
                <div className="orderSummary">
                  <Typography>Order Summery</Typography>
                  <div>
                    <div>
                      <p>Subtotal:</p>
                      <span>₹{12542}</span>
                    </div>
                    <div>
                      <p>Shipping Charges:</p>
                      <span>₹{455221}</span>
                    </div>
                    <div>
                      <p>GST:</p>
                      <span>₹{455}</span>
                    </div>
                  </div>

                  <div className="orderSummaryTotal">
                    <p>
                      <b>Total:</b>
                    </p>
                    <span>₹{45632}</span>
                  </div>

                  <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
