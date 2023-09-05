import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Hader/MetaData";
import { Typography } from "@material-ui/core";
import { toast } from "react-hot-toast";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import { HiOutlineCreditCard } from "react-icons/hi";
import { RiCalendarEventFill } from "react-icons/ri";
import { MdOutlineVpnKeyOff } from "react-icons/md";

const Payment = () => {
  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
    </>
  );
};

export default Payment;
