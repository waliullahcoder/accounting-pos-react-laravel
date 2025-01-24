import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { 
  Table, 
  AdminDashboard, 
  CreateCategoryPage, 
  CategoryListPage, 
  CreateProductPage, 
  ProductListPage,
  CreatePermissionPage,
  UserListPage,
  CreateRolePage,
  RoleListPage

} from "../components/AdminComponents";

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
    // User List
      <Route
      key="admin-user-list"
      path="/admin/user/list"
      element={
        <PrivateMiddleware isAdmin={true}>
          <UserListPage />
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


   //Product Section

   <Route
   key="admin-product-create"
   path="/admin/product/create"
   element={
     <PrivateMiddleware isAdmin={true}>
       <CreateProductPage />
     </PrivateMiddleware>
   }
 />,
 <Route
   key="admin-product-list"
   path="/admin/product/list"
   element={
     <PrivateMiddleware isAdmin={true}>
       <ProductListPage />
     </PrivateMiddleware>
   }
 />,
 <Route
   key="admin-product-category-create"
   path="/admin/product/edit/:id"
   element={
     <PrivateMiddleware isAdmin={true}>
       <CreateProductPage />
     </PrivateMiddleware>
   }
   />,

   // Role 
      <Route
      key="admin-role-create"
      path="/admin/role/create"
      element={
        <PrivateMiddleware isAdmin={true}>
          <CreateRolePage />
        </PrivateMiddleware>
      }
    />,
    <Route
    key="admin-role-update"
    path="/admin/role/edit/:id"
    element={
      <PrivateMiddleware isAdmin={true}>
        <CreateRolePage />
      </PrivateMiddleware>
    }
  />,
    <Route
    key="admin-role-list"
    path="/admin/role/list"
    element={
      <PrivateMiddleware isAdmin={true}>
        <RoleListPage />
      </PrivateMiddleware>
    }
  />,

   //Configurations
   <Route
   key="admin-permission-create"
   path="/admin/permission/create"
   element={
     <PrivateMiddleware isAdmin={true}>
       <CreatePermissionPage />
     </PrivateMiddleware>
   }
 />,



];

export default AdminProtectedRoutes;
