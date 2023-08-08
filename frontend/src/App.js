import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Hader/Header";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home";
// import { useDispatch } from "react-redux";
import { Toaster } from 'react-hot-toast';
import WebFont from "webfontloader";
import { useEffect } from "react";
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"

function App() {
  // const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);



  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />

      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
