import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { Dashboard, UserTable} from "../components/UserComponents";

const UserProtectedRoutes = [
  <Route
    key="dashboard"
    path="/dashboard"
    element={
      <PrivateMiddleware>
        <Dashboard />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="user-table"
    path="/dashboard/table"
    element={
      <PrivateMiddleware>
        <UserTable />
      </PrivateMiddleware>
    }
  />,
];

export default UserProtectedRoutes;
