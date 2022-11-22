import React from "react";
import { Link } from "react-router-dom";

const ChekoutLinks = () => {
  return (
    <>
      <nav>
        <Link to="/"> خانه </Link>
        <Link to="/checkout"> فرم تسویه </Link>
      </nav>
    </>
  );
};

export default ChekoutLinks;
