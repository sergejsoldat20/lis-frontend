import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import CheckIfAdmin from "./CheckIfAdmin";
const AdminAuthorization = () => {
  return CheckIfAdmin() ? <Outlet /> : <Navigate to="/" />;
};
export default AdminAuthorization;
