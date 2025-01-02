import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { Dashboard } from "../components/UserComponents";

const UserProtectedRoutes = [
  <Route
    key="user-dashboard"
    path="/dashboard"
    element={
      <PrivateMiddleware>
        <Dashboard />
      </PrivateMiddleware>
    }
  />,
];

export default UserProtectedRoutes;
