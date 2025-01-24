const roleService = require('../services/roleService');

//Role Add
exports.roleAdd = async (req, res) => {
  try {
    
    const role = await roleService.addRole(req.body);
    console.log("cont try",req.body, role);
    res.status(201).json(role);
  } catch (error) { console.log("cont else");
    res.status(400).json({ error: error.message });
  }
};




//Role List
exports.getRoleList = async (req, res) => {
  try {
  
      const role = await roleService.getRoleList();
      res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Update Role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body; // Get role ID from params
    const { name } = req.body; // Get updated name from request body

    const updatedRole = await roleService.updateRole(id, user_id, name);
    if (!updatedRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    console.log("ROL CONTRO err");
    res.status(400).json({ error: error.message });
  }
};

// Delete Role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    await roleService.deleteRole(id);
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
