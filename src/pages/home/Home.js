import React, { useEffect } from "react";
// import { Outlet, Link } from "react-router-dom";
import CheckoutOfficial from "../checkoutOfficial/CheckoutOfficial";
import { fetchAsyncMeliCode } from "../../components/checkoutOfficialSlice/CheckoutOfficialSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMeliCode());
  }, [dispatch]);

  return (
    <div>
      <CheckoutOfficial />
    </div>
  );
};

export default Home;
