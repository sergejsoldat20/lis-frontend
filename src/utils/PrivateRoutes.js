import React from "react";
import jwtDecode from "jwt-decode";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  return checkJwt() ? <Outlet /> : <Navigate to="/" />;
};

const checkJwt = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  console.log("USER JWT:" + jwt);
  if (jwt === null) return false;
  const decoded = jwtDecode(jwt);
  const expirationDate = decoded.exp;
  const currentTime = Date.now() / 1000;
  if (currentTime > expirationDate) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    navigate("/");
    return false;
  } else {
    return true;
  }
};

export default PrivateRoutes;
