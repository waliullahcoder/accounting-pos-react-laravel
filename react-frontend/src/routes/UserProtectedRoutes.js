import React from "react";
import { Route } from "react-router-dom";
import { PrivateMiddleware } from "../app/middleware/indexMiddleware";
import { Dashboard, UserTable, CreateInvoicePage, CreateCustomerPage, CustomerListPage} from "../components/UserComponents";

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



  //Customer Section
  <Route
    key="Customer"
    path="/customer/create"
    element={
      <PrivateMiddleware>
        <CreateCustomerPage />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="Customer"
    path="/customer/create"
    element={
      <PrivateMiddleware>
        <CreateCustomerPage />
      </PrivateMiddleware>
    }
  />,
  <Route
    key="Customer"
    path="/customer/list"
    element={
      <PrivateMiddleware>
        <CustomerListPage />
      </PrivateMiddleware>
    }
  />,





  //Invoice Section
  <Route
    key="Invoice"
    path="/invoice/create"
    element={
      <PrivateMiddleware>
        <CreateInvoicePage />
      </PrivateMiddleware>
    }
  />,
];

export default UserProtectedRoutes;
