import React,{useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import {useUser} from '../utils/helpers';
import apis  from "../api/authApi";
import { useDispatch,useSelector } from "react-redux";
import {
  Table,
  AdminDashboard,
  AdminDashboardWithoutHome,
  CreateCategoryPage,
  CategoryListPage,
  CreateProductPage,
  ProductListPage,
  CreatePermissionPage,
  UserListPage,
  CreateRolePage,
  RoleListPage,
  PermissionListPage,
} from "../components/AdminComponents";

const AdminProtectedRoutes = ({ permissions }) => {
  const currentUser = useUser();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  //When browser tab will be closed then auto logout
  useEffect(() => {
    const handleTabClose = () => {
      const logoutUrl = "/api/logout"; // Replace with your API endpoint
      navigator.sendBeacon(logoutUrl, JSON.stringify({ logout: true }));
      // Remove from local storage (synchronous operation)
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [dispatch]);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
const isSuperAdmin= (currentUser?.email===apis.superadminemail) ? true : false;
  if (Object.keys(permissions).length === 0 && !isSuperAdmin) {
    return <div>Loading...</div>; // Show a loader or fallback UI
  }

console.log("WALI PROTECTED",apis.superadminemail,permissions,isSuperAdmin);
  return (
    <Routes>
         
        
         
         
      {permissions?.usersAllow || isSuperAdmin ? (
        <Route
         path="/"
         element={
           <PrivateMiddleware isAdmin={true}>
             <AdminDashboard />
           </PrivateMiddleware>
         }
       />
      ) :  (
        <Route
          path="/"
          element={<Navigate to="/admin/home" replace />}
        />
      )}

      
      {!permissions?.usersAllow || isSuperAdmin ? (
         <Route
         path="/home"
         element={
           <PrivateMiddleware isAdmin={true}>
             <AdminDashboardWithoutHome />
           </PrivateMiddleware>
         }
       />
      ) : (
        <Route
          path="/home"
          element={<Navigate to="/admin" replace />}
        />
      )}

      
      
      <Route
        path="table"
        element={
          <PrivateMiddleware isAdmin={true}>
            <Table />
          </PrivateMiddleware>
        }
      />
      {/* {permissions?.usersListing || isSuperAdmin ? ( */}
      {isSuperAdmin ? (
        <Route
         path="user/list"
         element={
           <PrivateMiddleware isAdmin={true}>
             <UserListPage />
           </PrivateMiddleware>
         }
       />
      ) : (
        <Route
          path="user/list"
          element={<Navigate to="/admin" replace />}
        />
      )}
      

      {/* Product Category Section */}
      {permissions?.categoriesCreate || isSuperAdmin ? (
        <Route
          path="product/category/create"
          element={
            <PrivateMiddleware isAdmin={true}>
              <CreateCategoryPage />
            </PrivateMiddleware>
          }
        />
      ) : (
        <Route
          path="product/category/create"
          element={<Navigate to="/admin" replace />}
        />
      )}

      
      {permissions?.categoriesListing || isSuperAdmin ? (
        <Route
          path="product/category/list"
          element={
            <PrivateMiddleware isAdmin={true}>
              <CategoryListPage />
            </PrivateMiddleware>
          }
        />
      ) : (
        <Route
          path="product/category/list"
          element={<Navigate to="/admin" replace />}
        />
      )}

       {permissions?.categoriesEdit || isSuperAdmin ? (
      <Route
        path="product/category/edit/:id"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreateCategoryPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="product/category/edit/:id"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {/* Product Section */}
      {permissions?.productsCreate || isSuperAdmin ? (
      <Route
        path="product/create"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreateProductPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="product/create"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {permissions?.productsCreate || isSuperAdmin ? (
      <Route
        path="product/list"
        element={
          <PrivateMiddleware isAdmin={true}>
            <ProductListPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="product/list"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {permissions?.productsEdit || isSuperAdmin ? (
      <Route
        path="product/edit/:id"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreateProductPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="product/edit/:id"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {/* Role Management */}
      {permissions?.rolesCreate || isSuperAdmin ? (
      <Route
        path="role/create"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreateRolePage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="role/create"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {permissions?.rolesEdit || isSuperAdmin ? (
      <Route
        path="role/edit/:id"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreateRolePage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="role/edit/:id"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {permissions?.rolesListing || isSuperAdmin ? (
      <Route
        path="role/list"
        element={
          <PrivateMiddleware isAdmin={true}>
            <RoleListPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="role/list"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {/* Permission Management */}

      {permissions?.permissionsCreate || isSuperAdmin ? (
      <Route
        path="permission/create"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreatePermissionPage />
          </PrivateMiddleware>
        }
      />
        ) : (
          <Route
            path="permission/create"
            element={<Navigate to="/admin" replace />}
          />
        )}
      {permissions?.permissionsEdit || isSuperAdmin ? (
      <Route
        path="permission/edit/:id"
        element={
          <PrivateMiddleware isAdmin={true}>
            <CreatePermissionPage />
          </PrivateMiddleware>
        }
      />
      ) : (
        <Route
          path="permission/edit/:id"
          element={<Navigate to="/admin" replace />}
        />
      )}

      {permissions?.permissionsListing || isSuperAdmin ? (
      <Route
        path="permission/list"
        element={
          <PrivateMiddleware isAdmin={true}>
            <PermissionListPage />
          </PrivateMiddleware>
        }
       />
        ) : (
          <Route
            path="permission/list"
            element={<Navigate to="/admin" replace />}
          />
        )}

    </Routes>
  );
};

export default AdminProtectedRoutes;
