import React from "react";
import ChekoutLinks from "../ChekoutLinks";
import Home from "../../pages/home/Home";
import CheckoutList from "../../pages/checkoutList/CheckoutList";
import CheckoutOfficial from "../../pages/checkoutOfficial/CheckoutOfficial";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="me-4" to="/checkout">
        {" "}
        فرم تسویه{" "}
      </Link>
      <Link className="me-4" to="/checkoutList">
        {" "}
        لیست تسویه{" "}
      </Link>
      <Link to="./overTime">فرم درخواست اضافه کار</Link>
    </nav>
  );
};

export default Header;
