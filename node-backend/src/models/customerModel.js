const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Create Customer
const createCustomer = async ({ first_name, last_name, address, phone_number, email, zip_code }) => {
  const [result] = await pool.query(
    'INSERT INTO customers (first_name, last_name, address, phone_number, email, zip_code) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, address, phone_number, email, zip_code]
  );
  return { id: result.insertId, first_name, last_name, address, phone_number, email, zip_code };
};

// List Customers
const getCustomerList = async () => {
  const [rows] = await pool.query('SELECT * FROM customers ORDER BY id DESC');
  return rows;
};


// Get Customer by ID
const getCustomerById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
  return rows[0];
};

// Update Customer
const updateCustomer = async (id, { first_name, last_name, address, phone_number, email, zip_code }) => {
  const [result] = await pool.query(
    'UPDATE customers SET first_name = ?, last_name = ?, address = ?,phone_number = ?, email = ?, zip_code = ? WHERE id = ?',
    [first_name, last_name, address, phone_number, email, zip_code, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, first_name, last_name, address, phone_number, email, zip_code };
};

// Delete Customer
const deleteCustomer = async (id) => {
  const [result] = await pool.query('DELETE FROM customers WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  createCustomer,
  getCustomerList,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
