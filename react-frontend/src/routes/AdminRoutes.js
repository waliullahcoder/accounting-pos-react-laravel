import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table from "../pages/Table";
import DashboardAnalytics from "../pages/DashboardAnalytics";
import DashboardReporting from "../pages/DashboardReporting";
import DashboardProjects from "../pages/DashboardProjects";
import EcommerceOrders from "../pages/EcommerceOrders";
import EcommerceProducts from "../pages/EcommerceProducts";

// Map of paths to components
const routeComponents = {
  "/admin/table": Table,
  "/dashboard/analytics": DashboardAnalytics,
  "/dashboard/reporting": DashboardReporting,
  "/dashboard/projects": DashboardProjects,
  "/ecommerce/orders": EcommerceOrders,
  "/ecommerce/products": EcommerceProducts,
};

function AdminRoutes() {
  return (
    <Router>
      <Routes>
        {Object.entries(routeComponents).map(([path, Component]) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default AdminRoutes;
