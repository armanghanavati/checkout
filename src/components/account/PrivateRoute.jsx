import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { handleLogin, selectLoginPage } from "../slices/mainSlices";

const PrivateRoute = () => {
  const loginPage = useSelector(selectLoginPage);

  const dispatch = useDispatch();
  let auth = { token: loginPage };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
