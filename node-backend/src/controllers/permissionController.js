const permissionService = require('../services/permissionService');

// Add Permission
exports.permissionAdd = async (req, res) => {
  try {
    const { role_id, modules } = req.body;

    if (!role_id || !modules || !Array.isArray(modules)) {
      return res.status(400).json({ error: "Invalid request format" });
    }

    const result = await permissionService.addPermission(role_id, modules);
    res.status(201).json(result);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Permissions List
exports.getPermissionList = async (req, res) => {
  try {
    const permissions = await permissionService.getPermissionList();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Permission
exports.updatePermission = async (req, res) => {
    try {
        const { role_id, modules } = req.body;

        console.log("Received request body:", req.body);
        console.log("Type of modules:", typeof modules);
        console.log("Is modules an array?:", Array.isArray(modules));

        if (!Array.isArray(modules)) {
            return res.status(400).json({ error: "Invalid request: 'modules' should be an array" });
        }

        const updatedPermission = await permissionService.updatePermission(role_id, modules);
        res.status(200).json(updatedPermission);
    } catch (error) {
        console.error("Error in updatePermission controller:", error.message);
        res.status(400).json({ error: `Failed to update permission: ${error.message}` });
    }
};

exports.getPermissionSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await permissionService.permissionByUserId(id);
console.log("Controller");
    if (!permission) {
      return res.status(404).json({ error: 'permission not found' });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getPermissionByRoleId = async (req, res) => {
  try {
    const { id } = req.params;

    const permission = await permissionService.permissionByRoleId(id);
console.log("Controller");
    if (!permission) {
      return res.status(404).json({ error: 'permission not found' });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete Permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    await permissionService.deletePermission(id);
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
