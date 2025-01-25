import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {ucfirst} from '../../../utils/helpers';
import { fetchRoles } from "../../../slices/role/action";
import Select from 'react-select';
const permissions = ["create", "listing", "view", "edit", "delete", "allow"];
const modules = [
  { id: "pdid01", name: "Product" },
  { id: "inv002", name: "Invoice" },
  { id: "cus003", name: "Customer" },
  { id: "ven004", name: "Vendor" },
];

const CreatePermission = () => {
  const dispatch = useDispatch();
  const { roles, status, error } = useSelector((state) => state.role);
  
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [permissionsState, setPermissionsState] = useState(
    modules.reduce((acc, module) => {
      acc[module.id] = {
        module_id: module.id,
        name: module.name,
        permissions: permissions.reduce((pAcc, perm) => {
          pAcc[perm] = false;
          return pAcc;
        }, {}),
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  console.log("WALI PERMISSION",roles, status, error);
  
  const handleSelectAllModule = (checked) => {
    const newPermissions = modules.reduce((acc, module) => {
      acc[module.id] = {
        module_id: module.id,
        name: module.name,
        permissions: permissions.reduce((pAcc, perm) => {
          pAcc[perm] = checked;
          return pAcc;
        }, {}),
      };
      return acc;
    }, {});
    setPermissionsState(newPermissions);
  };

  const handleSelectAll = (moduleId, checked) => {
    setPermissionsState((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        permissions: permissions.reduce((acc, perm) => {
          acc[perm] = checked;
          return acc;
        }, {}),
      },
    }));
  };

  const handleCheckboxChange = (moduleId, permission) => {
    setPermissionsState((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        permissions: {
          ...prev[moduleId].permissions,
          [permission]: !prev[moduleId].permissions[permission],
        },
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      role_id: selectedRole,
      modules: Object.values(permissionsState),
    };
    console.log("Submitting Data: ", formData);
    // Send formData to backend via API request
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full mx-auto p-5 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Create Permission</h2>

      {/* Role Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
        <Select
          options={roles.map((role) => ({ value: role.id, label: role.name }))}
          value={roles.find((role) => role.id === selectedRole)}
          onChange={(selectedOption) => setSelectedRole(selectedOption)}
          name="role_id"
        />

      </div>

      {/* Select All Modules */}
      <div className="flex items-center justify-center mb-4">
        <Checkbox label="All Select (All Modules)" onChange={(e) => handleSelectAllModule(e.target.checked)} />
      </div>

      {/* Modules & Permissions */}
      <div className="grid grid-cols-2 gap-8">
        {modules.map((module) => (
          <div key={module.id} className="mb-2 border p-2 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 text-sm font-bold">{module.name} Permissions</label>
              <Checkbox onChange={(e) => handleSelectAll(module.id, e.target.checked)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {permissions.map((perm, index) => (
                <Checkbox
                  key={index}
                  label={ucfirst(perm)}
                  checked={permissionsState[module.id].permissions[perm] || false}
                  onChange={() => handleCheckboxChange(module.id, perm)}
                  name={`permissions[${module.id}][${perm}]`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button type="submit" color="blue" fullWidth>
        Save Permission
      </Button>
    </form>

  );
};

export default CreatePermission;
