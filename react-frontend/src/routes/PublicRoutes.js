import React from "react";
import { Route } from "react-router-dom";
import { PublicMiddleware } from "../app/middleware/indexMiddleware";
import { Login } from "../components/PublicComponents";

const PublicRoutes = [
  <Route
    key="login"
    path="/login"
    element={
      <PublicMiddleware>
        <Login />
      </PublicMiddleware>
    }
  />,
];

export default PublicRoutes;
