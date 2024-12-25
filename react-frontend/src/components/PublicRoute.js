import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('PublicRoute - token:', token); // Log token to check if it’s being set correctly
  }, [token]);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
