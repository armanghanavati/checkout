import React from "react";
import { Link } from "react-router-dom";

const ChekoutLinks = () => {
  return (
    <nav className="py-2 px-2 mx-2">
      <Link className="py-2 px-2 mx-2" to="/">
        خانه
      </Link>
      <Link className="py-2 px-2 mx-2" to="/checkout">
        تسویه اداری
      </Link>
      <Link className="py-2 px-2 mx-2" to="/checkoutList">
        لیست درخواست های تسویه
      </Link>
      <Link className="py-2 px-2 mx-2" to="/OverTimeTableList">
        لیست درخواست های تسویه
      </Link>
    </nav>
  );
};

export default ChekoutLinks;
