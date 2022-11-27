import "./App.css";
import Header from "./layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import CheckoutOfficial from "./pages/checkoutOfficial/CheckoutOfficial";
import CheckoutList from "./pages/checkoutList/CheckoutList";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./Login";
function App() {
  return (
    <Router>
      <Header />
      <>
        <div className="base_cont">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/Checkout" element={<CheckoutOfficial />} />
            <Route path="/CheckoutList" element={<CheckoutList />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
