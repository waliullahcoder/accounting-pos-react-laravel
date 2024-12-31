import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Table from "../pages/Table";
// import Logout from "../pages/Logout";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <PrivateRoute isAdmin={true}>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
     <Route
      path="/admin/table"
      element={
        <PrivateRoute isAdmin={true}>
          <Table />
        </PrivateRoute>
      }
    />
    {/* Allow /logout for both users and admins */}
    {/* <Route
      path="/logout"
      element={
        <PrivateRoute>
          <Logout />
        </PrivateRoute>
      }
    /> */}
    {/* Redirect to /login for unmatched routes */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
