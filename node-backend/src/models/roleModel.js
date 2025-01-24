const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

// Create a connection pool
const pool = mysql.createPool(dbConfig);


// Function to create a new Role
const createRole = async (user_id, name) => {
    console.log("Model createRole called with:", user_id, name);
  
    // Ensure user_id is provided
    if (!user_id) {
      throw new Error("Missing user_id: A valid user_id is required.");
    }
  
    // Convert user_id to an integer
    const userIdInt = parseInt(user_id, 10);
    if (isNaN(userIdInt)) {
      throw new Error(`Invalid user_id: '${user_id}' is not a valid integer`);
    }
  
    // Trim and validate name
    const roleName = name?.trim();
    if (!roleName) {
      throw new Error("Invalid name: Role name cannot be empty.");
    }
  
    try {
      const [result] = await pool.query(
        "INSERT INTO roles (user_id, name) VALUES (?, ?)",
        [userIdInt, roleName]
      );
  
      return { id: result.insertId, user_id: userIdInt, name: roleName };
    } catch (error) {
      console.error("Model query error:", error.message);
      throw error; // Re-throw for higher-level handling
    }
  };

//   const createRole = async ({ user_id, name}) => {
//     console.log("MODEL",user_id, name);
    
//     const [result] = await pool.query(
//       'INSERT INTO roles (user_id, name) VALUES (?, ?)',
//       [user_id, name]
//     );
//     return { id: result.insertId, user_id, name };
//   };
  
  

// Function to get all Role
const getRoleList = async () => {
  try {
    const [rows] = await pool.query('SELECT id, user_id, name FROM roles ORDER BY id DESC');
    return rows;
  } catch (error) {
    console.error("Error executing roles query:", error.message);
    throw error;
  }
};



// Update Role
const updateRole = async (id, user_id, name) => {
    console.log("ROLE MODEL");
    
  try {
    const [result] = await pool.query(
      'UPDATE roles SET user_id = ?, name = ? WHERE id = ?',
      [user_id, name, id]
    );

    if (result.affectedRows === 0) {
      return null; // No Role found with the given ID
    }

    return { id, user_id, name };
  } catch (error) {
    console.error("Error updating Role:", error.message);
    throw error;
  }
};

// Delete Role
const deleteRole = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return null; // No Role found with the given ID
    }

    return true;
  } catch (error) {
    console.error("Error deleting Role:", error.message);
    throw error;
  }
};

module.exports = {
  createRole,
  getRoleList,
  updateRole,
  deleteRole,
};


