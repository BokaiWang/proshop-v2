import React from "react";
import { useAppSelector } from "../hooks";
import { authSelector } from "../selectors/authSelector";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector(authSelector);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
