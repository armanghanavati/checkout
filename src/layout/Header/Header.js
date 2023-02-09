import React from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

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
        to="/overtimeTableList"
      >
        لیست اضافه کار
      </Link>
      <Link
        className="border border-secandry  rounded   text-primary navbar-brand p-2 mx-2"
        to="./expenseAccount"
      >
        فرم صورت هزینه
      </Link>
      <Link
        className="border border-secandry  rounded   text-primary navbar-brand p-2 mx-2"
        to="/expenseAccountTable"
      >
        لیست صورت هزینه
      </Link>
      <Link
        className="border border-secandry  rounded   text-primary navbar-brand p-2 mx-2"
        to="/filesCloud"
      >
        فرم ارسال فایل
      </Link>
      <Link
        className="border border-secandry  rounded   text-primary navbar-brand p-2 mx-2"
        to="/filesCloudList"
      >
        لیست ارسال فایل
      </Link>
    </nav >
  );
};

export default Header;
