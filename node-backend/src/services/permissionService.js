const permissionModel = require('../models/permissionModel');

// Add Permission
exports.addPermission = async (role_id, modules) => {
  try {
    return await permissionModel.createPermission(role_id, modules);
  } catch (error) {
    throw new Error(`Failed to add permission: ${error.message}`);
  }
};

// Get Permission List
exports.getPermissionList = async () => {
  try {
    return await permissionModel.getPermissionList();
  } catch (error) {
    throw new Error('Failed to retrieve permissions');
  }
};

exports.permissionByRoleId = async (id) => {
  return await permissionModel.permissionByRoleId(id);
};

// Update Permission
exports.updatePermission = async (id, role_id, modules) => {
  try {
    return await permissionModel.updatePermission(id, role_id, modules);
  } catch (error) {
    throw new Error(`Failed to update permission: ${error.message}`);
  }
};

// Delete Permission
exports.deletePermission = async (id) => {
  try {
    return await permissionModel.deletePermission(id);
  } catch (error) {
    throw new Error(`Failed to delete permission: ${error.message}`);
  }
};
