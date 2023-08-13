import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Hader/Header";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home";
import { useDispatch } from "react-redux";
import { Toaster,toast } from "react-hot-toast";
import WebFont from "webfontloader";
import { useEffect } from "react";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/User/LoginSignUp";
import { ProtectedRoute } from "protected-route-react";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated,error,message } = useSelector((state) => state.user);
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
  }, [dispatch, error, message]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />
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
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
