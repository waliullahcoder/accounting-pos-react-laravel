const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Create vendor
const createVendor = async ({ first_name, last_name, address, phone_number, email, zip_code }) => {
  const [result] = await pool.query(
    'INSERT INTO vendors (first_name, last_name, address, phone_number, email, zip_code) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, address, phone_number, email, zip_code]
  );
  return { id: result.insertId, first_name, last_name, address, phone_number, email, zip_code };
};

// List vendors
const getVendorList = async () => {
  const [rows] = await pool.query('SELECT * FROM vendors');
  return rows;
};

// Get vendor by ID
const getVendorById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM vendors WHERE id = ?', [id]);
  return rows[0];
};

// Update vendor
const updateVendor = async (id, { first_name, last_name, address, phone_number, email, zip_code }) => {
  const [result] = await pool.query(
    'UPDATE vendors SET first_name = ?, last_name = ?, address = ?,phone_number = ?, email = ?, zip_code = ? WHERE id = ?',
    [first_name, last_name, address, phone_number, email, zip_code, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, first_name, last_name, address, phone_number, email, zip_code };
};

// Delete vendor
const deleteVendor = async (id) => {
  const [result] = await pool.query('DELETE FROM vendors WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  createVendor,
  getVendorList,
  getVendorById,
  updateVendor,
  deleteVendor,
};
