import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';
import Logout from '../pages/Logout';

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
        <PrivateRoute isAdmin>
          <AdminDashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/logout"
      element={
        <PrivateRoute>
          <Logout />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
