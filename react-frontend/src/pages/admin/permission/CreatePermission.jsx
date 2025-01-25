import React, { useEffect, useState } from "react";
import { Button, Checkbox } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { ucfirst } from "../../../utils/helpers";
import { fetchRoles } from "../../../slices/role/action";
import { createPermission, updatePermission } from "../../../slices/permission/action";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const permissions = ["create", "listing", "view", "edit", "delete", "allow"];
const modules = [
  { id: "pdid01", name: "Product" },
  { id: "inv002", name: "Invoice" },
  { id: "cus003", name: "Customer" },
  { id: "ven004", name: "Vendor" },
];

const PermissionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { roles } = useSelector((state) => state.role);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissionsState, setPermissionsState] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      fetchRolePermissions(id);
    }
  }, [isEdit, id]);

  const fetchRolePermissions = async (roleId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/permissions/${roleId}`);
      const existingPermissions = response.data;

      const formattedPermissions = modules.reduce((acc, module) => {
        const found = existingPermissions.find((perm) => perm.module_id === module.id);
        acc[module.id] = {
          module_id: module.id,
          module_name: module.name,
          permissions: permissions.reduce((pAcc, perm) => {
            pAcc[perm] = found ? found[perm] : false;
            return pAcc;
          }, {}),
        };
        return acc;
      }, {});

      setPermissionsState(formattedPermissions);
      setSelectedRole(roles.find((role) => role.id === roleId));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      setLoading(false);
    }
  };

  const handleSelectAllModule = (checked) => {
    setPermissionsState(
      modules.reduce((acc, module) => {
        acc[module.id] = {
          module_id: module.id,
          module_name: module.name,
          permissions: permissions.reduce((pAcc, perm) => {
            pAcc[perm] = checked;
            return pAcc;
          }, {}),
        };
        return acc;
      }, {})
    );
  };

  const handleSelectAll = (moduleId, checked) => {
    setPermissionsState((prev) => ({
      ...prev,
      [moduleId]: {
        module_id: moduleId,  // Ensure module_id is always set
        module_name: modules.find((mod) => mod.id === moduleId)?.name || "", // Ensure module_name is set
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
        module_id: moduleId,  // Ensure module_id is always set
        module_name: modules.find((mod) => mod.id === moduleId)?.name || "", // Ensure module_name is set
        permissions: {
          ...(prev[moduleId]?.permissions || {}),
          [permission]: !prev[moduleId]?.permissions?.[permission] || false,
        },
      },
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const role_id = selectedRole?.value;
    const modulesData = Object.values(permissionsState);

    const payload = { role_id, modules: modulesData };

    try {
      if (isEdit) {
        await dispatch(updatePermission({ id, ...payload }));
        setSuccessMessage("Permission updated successfully!");
      } else {
        await dispatch(createPermission(payload));
        setSuccessMessage("Permission created successfully!");
      }
      setTimeout(() => navigate("/admin/permission/list"), 2000);
    } catch (error) {
      console.error("Error submitting permissions:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full mx-auto p-5 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        {isEdit ? "Edit Permissions" : "Create Permissions"}
      </h2>

      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Role</label>
        <Select
          options={roles.map((role) => ({ value: role.id, label: role.name }))}
          value={selectedRole}
          onChange={(selectedOption) => setSelectedRole(selectedOption)}
          name="role_id"
        />
      </div>

      <div className="flex items-center justify-center mb-4">
        <Checkbox label="Select All Modules" onChange={(e) => handleSelectAllModule(e.target.checked)} />
      </div>

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
                  checked={permissionsState[module.id]?.permissions?.[perm] || false}
                  onChange={() => handleCheckboxChange(module.id, perm)}
                  name={`permissions[${module.id}][${perm}]`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" color="blue" fullWidth disabled={loading}>
        {loading ? "Saving..." : "Save Permission"}
      </Button>
    </form>
  );
};

export default PermissionForm;
