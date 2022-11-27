import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let aute = { token: true };

  return <div>{aute.token ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoutes;
