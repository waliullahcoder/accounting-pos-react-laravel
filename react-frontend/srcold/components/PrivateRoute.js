import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin = false }) => {
  const { token, isSuperAdmin } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && !isSuperAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
