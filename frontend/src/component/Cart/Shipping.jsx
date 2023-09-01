import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/Hader/MetaData";
import { MdOutlinePinDrop } from "react-icons/md";
import { BiHomeHeart } from "react-icons/bi";
import { MdLocationCity } from "react-icons/md";
import { MdPublic } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { MdTransferWithinAStation } from "react-icons/md";
import { Country, State } from "country-state-city";
import { toast } from "react-hot-toast";
const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  return <></>;
};

export default Shipping;
