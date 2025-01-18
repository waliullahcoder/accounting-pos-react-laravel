import React, { useState } from "react";
import { Button, Select, Option, Checkbox } from "@material-tailwind/react";

const roles = ["Manager", "Salesman", "Purchase-Man", "Accountant"];
const permissions = ["Create", "View", "Edit", "Delete"];
const modules = ["Product", "Invoice","Customer","Vendor"];

const CreatePermission = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [permissionsState, setPermissionsState] = useState({
    Product: {},
    Invoice: {},
    Customer: {},
    Vendor: {},
  });

  const handleSelectAllModule = (checked) => {
    const newPermissions = {};
    modules.forEach((module) => {
      newPermissions[module] = {};
      permissions.forEach((perm) => {
        newPermissions[module][perm] = checked;
      });
    });
    setPermissionsState(newPermissions);
  };

  const handleSelectAll = (module, checked) => {
    setPermissionsState((prev) => ({
      ...prev,
      [module]: permissions.reduce((acc, perm) => ({
        ...acc,
        [perm]: checked,
      }), {}),
    }));
  };

  const handleCheckboxChange = (module, permission) => {
    setPermissionsState((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission],
      },
    }));
  };

  return (
    <form className="w-full max-w-full mx-auto p-5 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Create Permission</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <Select value={selectedRole} onChange={(val) => setSelectedRole(val)}>
          {roles.map((role, index) => (
            <Option key={index} value={role}>{role}</Option>
          ))}
        </Select>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <Checkbox label="All Select (All Modules)" onChange={(e) => handleSelectAllModule(e.target.checked)} />
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        {modules.map((module) => (
          <div key={module} className="mb-2 border p-2 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 text-sm font-bold">{module} Permissions</label>
              <Checkbox  onChange={(e) => handleSelectAll(module, e.target.checked)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((perm, index) => (
                <Checkbox
                  key={index}
                  label={perm}
                  checked={permissionsState[module][perm] || false}
                  onChange={() => handleCheckboxChange(module, perm)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Button type="submit" color="blue" fullWidth>
        Save Permission
      </Button>
    </form>
  );
};

export default CreatePermission;
