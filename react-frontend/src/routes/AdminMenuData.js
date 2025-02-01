export const AdminMenuData = (permissions = {}) => {
  const modulePermissions = permissions?.permissionSingle || [];

const hasCategoryListPermission = modulePermissions.some(
  (p) => p.module_id === "pdid01" && p.listing
);
const permissionPermissionList = modulePermissions.some(
  (p) => p.module_id === "cus003" && p.listing
);
console.log("WALI ADMIN MENU DATA",hasCategoryListPermission);

  return [
    { title: "Admin Dashboard", icon: "HomeIcon", path: "/admin" },
    { title: "Example Table", icon: "UserGroupIcon", path: "/admin/table" },
    { title: "Customers", icon: "UserGroupIcon", path: "/admin/customers" },
    { title: "Users", icon: "UserIcon", path: "/admin/user/list" },
    {
      title: "Products",
      icon: "ShoppingCartIcon",
      subMenu: [
        { title: "Category Create", path: "/admin/product/category/create" },
        ...(hasCategoryListPermission
          ? [{ title: "Category List", path: "/admin/product/category/list" }]
          : []),
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
        { title: "Role Create", path: "/admin/role/create" },
        ...(permissionPermissionList
          ? [{ title: "Role List", path: "/admin/role/list" }]
          : []),
        { title: "Create Permission", path: "/admin/permission/create" },
        { title: "Permission List", path: "/admin/permission/list" },
      ],
    },
    { title: "Settings", icon: "Cog6ToothIcon", path: "/settings" },
  ];
};
