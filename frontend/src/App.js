import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Hader/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/User/LoginSignUp";
import { ProtectedRoute } from "protected-route-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadUser } from "./Redux/action/user";
import UserOption from "./component/layout/Hader/UserOption";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, error, message, user } = useSelector(
    (state) => state.user
  );

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("authToken"),
      },
    };
    const { data } = await axios.get("/api/v1/stripeapikey", config);

    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    getStripeApiKey();
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="products/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              isAuthenticated={!isAuthenticated}
              redirect="/account"
            >
              <LoginSignUp />
            </ProtectedRoute>
          }
        />
        <Route path="/account" element={<Profile />} />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/Cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/process/payment"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Payment/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
