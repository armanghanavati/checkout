import React from "react";
import ChekoutLinks from "../ChekoutLinks";
import Home from "../../pages/home/Home";
import CheckoutList from "../../pages/checkoutList/CheckoutList";
import CheckoutOfficial from "../../pages/checkoutOfficial/CheckoutOfficial";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/"> خانه </Link>
      <Link to="/checkout"> فرم تسویه </Link>
      <Link to="/checkoutList"> لیست تسویه </Link>
    </nav>
  );
};

export default Header;
