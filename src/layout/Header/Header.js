import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="mx-3 navbar navbar-expand-lg navbar-light bg-light">
      <Link
        className="border border-secandry  rounded p-2 text-primary me-4 navbar-brand"
        to="/checkout"
      >
        فرم تسویه
      </Link>
      <Link
        className="border border-secandry  rounded p-2 text-primary me-4 navbar-brand"
        to="/checkoutList"
      >
        لیست تسویه
      </Link>
      <Link
        className="border border-secandry  rounded p-2 text-primary navbar-brand"
        to="./overTime"
      >
        فرم درخواست اضافه کار
      </Link>
      <Link
        className="border border-secandry  rounded   text-primary navbar-brand p-2 mx-2"
        to="/OverTimeTableList"
      >
        لیست اضافه کار
      </Link>
    </nav>
  );
};

export default Header;
