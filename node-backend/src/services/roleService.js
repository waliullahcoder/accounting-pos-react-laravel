
const roleModel = require('../models/roleModel');


//Role Add
exports.addRole = async ({ user_id, name }) => {
    console.log("service try");
  return roleModel.createRole(user_id, name);
};

//Role List

exports.getRoleList = async () => {
  try {
    const role = await roleModel.getRoleList();
    return role;
  } catch (error) {
    throw new Error('Failed to retrieve role');
  }
};

// Edit Role
exports.editRole = async (id, name) => {
  try {
    const editRole = await roleModel.editRole(id, name);
    if (!editRole) {
      throw new Error('Role not found');
    }
    return editRole;
  } catch (error) {
    throw new Error(`Failed to editRole role: ${error.message}`);
  }
};

// Update Role
exports.updateRole = async (id, user_id, name) => {
  try {
    const updatedRole = await roleModel.updateRole(id, user_id, name);
    if (!updatedRole) {
      throw new Error('Role not found');
    }
    return updatedRole;
  } catch (error) {
    throw new Error(`Failed to update role: ${error.message}`);
  }
};


// Delete Role
exports.deleteRole = async (id) => {
  try {
    const result = await roleModel.deleteRole(id);
    if (!result) {
      throw new Error('Role not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Failed to delete role: ${error.message}`);
  }
};
