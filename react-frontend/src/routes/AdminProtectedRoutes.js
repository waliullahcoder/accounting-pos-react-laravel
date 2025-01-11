import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { Table, AdminDashboard, CreateCategoryPage, CategoryListPage } from "../components/AdminComponents";

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

  //Product Category Section
  <Route
    key="admin-product-category-create"
    path="/admin/product/category/create"
    element={
      <PrivateMiddleware isAdmin={true}>
        <CreateCategoryPage />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="admin-product-category-list"
    path="/admin/product/category/list"
    element={
      <PrivateMiddleware isAdmin={true}>
        <CategoryListPage />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="admin-product-category-create"
    path="/admin/product/category/edit/:id"
    element={
      <PrivateMiddleware isAdmin={true}>
        <CreateCategoryPage />
      </PrivateMiddleware>
    }
  />,
];

export default AdminProtectedRoutes;
