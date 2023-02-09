import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectLoginPage } from "../slices/mainSlices";

const PrivateRoute = () => {
    const loginPage = useSelector(selectLoginPage);

    console.log(loginPage);

    let auth = { token: loginPage };
    return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
