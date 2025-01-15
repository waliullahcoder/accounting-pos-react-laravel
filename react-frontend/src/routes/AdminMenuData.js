export const AdminMenuData = [
  { title: "Admin Dashboard", icon: "HomeIcon", path: "/admin" },
  { title: "Epamle Table", icon: "UserGroupIcon", path: "/admin/table" },
  { title: "Customers", icon: "UserGroupIcon", path: "/admin/customers" },
  { title: "Users", icon: "UserIcon", path: "/admin/users" },
  {
    title: "Products",
    icon: "ShoppingCartIcon",
    subMenu: [
      { title: "Category Create", path: "/admin/product/category/create" },
      { title: "Category List", path: "/admin/product/category/list" },
      { title: "Product Create", path: "/admin/product/create" },
      { title: "Product List", path: "/admin/product/list" },
      { title: "Manage", path: "/admin/products/manage" },
    ],
  },
  { title: "Sales", icon: "CreditCardIcon", path: "/admin/sales" },
  { title: "Purchase", icon: "ShoppingCartIcon", path: "/admin/purchase" },
  { title: "Debit/Credit", icon: "CreditCardIcon", path: "/admin/debit-credit" },
  {
    title: "Reports",
    icon: "CreditCardIcon",
    subMenu: [
      { title: "Utility Cost", path: "/admin/reports/utility-cost" },
      { title: "Salary Cost", path: "/admin/reports/salary-cost" },
      { title: "Material Cost", path: "/admin/reports/material-cost" },
      { title: "Other Expenditure", path: "/admin/reports/other-expenditure" },
      { title: "Profit/Loss Daily", path: "/admin/reports/profit-loss/daily" },
      { title: "Profit/Loss Monthly", path: "/admin/reports/profit-loss/monthly" },
      { title: "Profit/Loss Yearly", path: "/admin/reports/profit-loss/yearly" },
    ],
  },
  {
    title: "Configurations",
    icon: "CogIcon",
    subMenu: [
      { title: "Roles", path: "/admin/configurations/roles" },
      { title: "Permissions", path: "/admin/configurations/permissions" },
    ],
  },
  { title: "Settings", icon: "Cog6ToothIcon", path: "/settings" },
];
