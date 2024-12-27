import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { token, isSuperAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("PublicRoute - token:", token, "isSuperAdmin:", isSuperAdmin);
  }, [token, isSuperAdmin]);

  // If authenticated, redirect to the appropriate dashboard based on role
  if (token) {
    return isSuperAdmin ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
};

export default PublicRoute;
