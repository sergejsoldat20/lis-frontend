import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = localStorage.getItem("jwt");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
