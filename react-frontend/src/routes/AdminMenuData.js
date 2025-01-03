export const AdminMenuData = [
  { title: "Admin Dashboard", icon: "HomeIcon", path: "/admin" },
    {
      title: "Admin",
      icon: "PresentationChartBarIcon",
      subMenu: [
        { title: "Table", path: "/admin/table" },
        { title: "Analytics", path: "/dashboard/analytics" },
        { title: "Reporting", path: "/dashboard/reporting" },
        { title: "Projects", path: "/dashboard/projects" },
      ],
    },
    {
      title: "E-Commerce",
      icon: "ShoppingBagIcon",
      subMenu: [
        { title: "Orders", path: "/ecommerce/orders" },
        { title: "Products", path: "/ecommerce/products" },
      ],
    },
   
    { title: "Settings", icon: "Cog6ToothIcon", path: "/settings" },
  ];
  