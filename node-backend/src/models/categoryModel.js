const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

// Create a connection pool
const pool = mysql.createPool(dbConfig);


// Function to create a new Category
const createCategory = async (name) => {
  console.log("wali Model createCategory called with:", name);
  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    console.log("wali Model query successful, result:", result);
    return { id: result.insertId, name };
  } catch (error) {
    console.error("wali Model query error:", error.message);
    throw error; // Re-throw the error so it propagates back to the service and controller
  }
};


// Function to get all Category
const getCategoryList = async () => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories');
    return rows;
  } catch (error) {
    console.error("Error executing categories query:", error.message);
    throw error;
  }
};

// Edit Category
const editCategory = async (id) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories WHERE id = ?',[id]);
    return rows;
  } catch (error) {
    console.error("Error edit category:", error.message);
    throw error;
  }
};

// Update Category
const updateCategory = async (id, name) => {
  try {
    const [result] = await pool.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );

    if (result.affectedRows === 0) {
      return null; // No category found with the given ID
    }

    return { id, name };
  } catch (error) {
    console.error("Error updating category:", error.message);
    throw error;
  }
};

// Delete Category
const deleteCategory = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return null; // No category found with the given ID
    }

    return true;
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};

module.exports = {
  createCategory,
  getCategoryList,
  editCategory,
  updateCategory,
  deleteCategory,
};


