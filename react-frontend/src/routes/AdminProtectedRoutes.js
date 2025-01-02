import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { Table, AdminDashboard } from "../components/AdminComponents";

const AdminProtectedRoutes = [
  <Route
    key="admin-dashboard"
    path="/admin"
    element={
      <PrivateMiddleware isAdmin={true}>
        <AdminDashboard />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="admin-table"
    path="/admin/table"
    element={
      <PrivateMiddleware isAdmin={true}>
        <Table />
      </PrivateMiddleware>
    }
  />,
];

export default AdminProtectedRoutes;
