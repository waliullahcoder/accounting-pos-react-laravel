import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminProtectedRoutes from "./AdminProtectedRoutes";
import UserProtectedRoutes from "./UserProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => (
  <Routes>
    {/* Admin Routes */}
    {AdminProtectedRoutes}

    {/* User Routes */}
    {UserProtectedRoutes}

    {/* Public Routes */}
    {PublicRoutes}

    {/* Fallback for undefined routes */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
