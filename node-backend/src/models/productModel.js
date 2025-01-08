const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

const pool = mysql.createPool(dbConfig);

// Create Product
const createProduct = async ({ name, category_id, stock, price, image }) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, category_id, stock, price, image) VALUES (?, ?, ?, ?, ?)',
    [name, category_id, stock, price, image]
  );
  return { id: result.insertId, name, category_id, stock, price, image };
};

// Get Product List
const getProductList = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

// Get Product by ID
const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

// Update Product
const updateProduct = async (id, { name, category_id, stock, price, image }) => {
  const [result] = await pool.query(
    'UPDATE products SET name = ?, category_id = ?, stock = ?, price = ?, image = ? WHERE id = ?',
    [name, category_id, stock, price, image, id]
  );

  return result.affectedRows > 0 ? { id, name, category_id, stock, price, image } : null;
};

// Delete Product
const deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  createProduct,
  getProductList,
  getProductById,
  updateProduct,
  deleteProduct,
};
