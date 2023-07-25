import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/layout/Hader/Header";
import Header from "./component/layout/Footer/Footer.jsx";
import WebFont from "webfontloader";
import { useEffect } from "react";

function App() {
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
      <Footer />
    </Router>
  );
}

export default App;
