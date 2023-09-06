import React from "react";
import {FiCheckCircle} from "react-icons/fi"
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <FiCheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/me">View Orders</Link>
    </div>
  );
};

export default OrderSuccess