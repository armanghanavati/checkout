import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { handleLogin, handleUserInfoAllPage } from "../components/slices/mainSlices";
import Ticket from "../components/ticket/Ticket";
import Header from "./Header/Header";

const Layout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleLogin())
    dispatch(handleUserInfoAllPage());
  }, [dispatch]);

  return <div>
    <Fragment>
      <Header />
      {props.children}
      <Ticket />
    </Fragment>
  </div>;
};

export default Layout;
