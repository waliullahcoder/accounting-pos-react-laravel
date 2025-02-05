const mysql = require('mysql2/promise');
const {dbConfig,superadminmail} = require('../config');

// Create a connection pool
const pool = mysql.createPool(dbConfig);
// Function to create a new user
const createUser = async (first_name, last_name, phone_number, zip_code, is_superadmin, email, password) => {
  console.log("wali Model createUser called with:", first_name, last_name, phone_number, zip_code, is_superadmin, email, password);
  try {
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, phone_number, zip_code, is_superadmin, email, password) VALUES (?,?,?,?,?,?, ?)',
      [first_name, last_name, phone_number, zip_code, is_superadmin, email, password]
    );
    console.log("wali Model query successful, result:", result);
    return { id: result.insertId, email };
  } catch (error) {
    console.error("wali Model query error:", error.message);
    throw error; // Re-throw the error so it propagates back to the service and controller
  }
};


// Function to find a user by email
const findUserByemail = async (email) => {
  console.log("wali Model findUserByemail called with:", email);

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log("Query result:", rows);
    return rows[0]; // Should return the first matching user or undefined if no match
  } catch (error) {
    console.error("Error executing findUserByemail query:", error.message);
    throw error;
  }
};


// Function to get all users
const getUserList = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT id, first_name, last_name, email, phone_number, zip_code, is_superadmin FROM users WHERE email != ?",
      [superadminmail]
    );
    return rows;
  } catch (error) {
    console.error("Error executing getUserList query:", error.message);
    throw error;
  }
};


module.exports = {
  createUser,
  findUserByemail,
  getUserList, // Export the new method
};



