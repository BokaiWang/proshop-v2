import React from "react";
import { useAppSelector } from "../hooks";
import { authSelector } from "../selectors/authSelector";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useAppSelector(authSelector);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
