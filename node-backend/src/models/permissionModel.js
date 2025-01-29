const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

const pool = mysql.createPool(dbConfig);

// Create Permission (Batch Insert)
const createPermission = async (role_id, modules) => {
    try {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const insertValues = modules.map(({ module_id, module_name, permissions }) => [
                role_id,
                module_id,
                module_name,
                permissions.create || false,
                permissions.listing || false,
                permissions.edit || false,
                permissions.view || false,
                permissions.delete || false,
                permissions.allow || false
            ]);

            const query = `
                INSERT INTO permissions 
                (\`role_id\`, \`module_id\`, \`module_name\`, \`create\`, \`listing\`, \`edit\`, \`view\`, \`delete\`, \`allow\`) 
                VALUES ?
            `;

            await connection.query(query, [insertValues]);

            await connection.commit();
            return { message: "Permissions added successfully" };
        } catch (error) {
            await connection.rollback();
            throw new Error(`Failed to add permission: ${error.message}`);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error adding permissions:", error.message);
        throw error;
    }
};

// Get All Permissions
const getPermissionList = async () => {

    try {
        const [rows] = await pool.query(`
          SELECT 
            permissions.id,
            permissions.role_id,
            permissions.module_id,
            permissions.module_name,
            permissions.create,
            permissions.listing,
            permissions.view,
            permissions.edit,
            permissions.delete,
            permissions.allow, 
            roles.name as role_name
        FROM 
            permissions
        JOIN
            roles
        ON
            permissions.role_id = roles.id 
        ORDER BY 
            permissions.id DESC
          `);
        return rows;

    } catch (error) {
        console.error("Error retrieving permissions:", error.message);
        throw error;
    }
};


// Edit Category
const permissionByRoleId = async (role_id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM permissions WHERE role_id = ?',[role_id]);
    return rows;
  } catch (error) {
    console.error("Error edit permissions:", error.message);
    throw error;
  }
};

// Update Permission (Delete existing, then insert new)
const updatePermission = async (role_id, modules) => {
    try {
        console.log("updatePermission called with:", { role_id, modules });

        // Validate modules
        if (!Array.isArray(modules)) {
            throw new Error("Invalid data: 'modules' should be an array");
        }

        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Delete existing permissions for the role_id
            await connection.query(`DELETE FROM permissions WHERE role_id = ?`, [role_id]);

            // Check if there are new permissions to insert
            if (modules.length > 0) {
                // Insert new permissions
                const insertValues = modules.map(({ module_id, module_name, permissions }) => [
                    role_id,
                    module_id,
                    module_name,
                    permissions.create || false,
                    permissions.listing || false,
                    permissions.edit || false,
                    permissions.view || false,
                    permissions.delete || false,
                    permissions.allow || false
                ]);

                const query = `
                    INSERT INTO permissions 
                    (\`role_id\`, \`module_id\`, \`module_name\`, \`create\`, \`listing\`, \`edit\`, \`view\`, \`delete\`, \`allow\`) 
                    VALUES ?
                `;

                await connection.query(query, [insertValues]);
            }

            await connection.commit();
            return { message: "Permissions updated successfully" };
        } catch (error) {
            await connection.rollback();
            throw new Error(`Failed to update permission: ${error.message}`);
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error("Error updating permissions:", error.message);
        throw error;
    }
};

// Delete Permissions for a Role
const deletePermission = async (role_id) => {
    try {
        const query = `DELETE FROM permissions WHERE role_id = ?`;
        await pool.query(query, [role_id]);
        return { message: "Permissions deleted successfully" };
    } catch (error) {
        console.error("Error deleting permissions:", error.message);
        throw error;
    }
};

module.exports = {
    createPermission,
    getPermissionList,
    permissionByRoleId,
    updatePermission,
    deletePermission,
};
