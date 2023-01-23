import React from "react";
import { Link } from "react-router-dom";
import App from "../App";
import Header from "./Header/Header";

const Home = () => {
  return (
    <>
      <Header />
      داشبورد
      <Link to="/dashboard"></Link>
    </>
  );
};

export default Home;
