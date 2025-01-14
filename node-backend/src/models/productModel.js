const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

const pool = mysql.createPool(dbConfig);

// Create Product
const createProduct = async ({ name, model, code, category_id, quantity, sale_price, purchase_price, image }) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, model, code, category_id, quantity, sale_price, purchase_price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, model, code, category_id, quantity, sale_price, purchase_price, image]
  );
  return { id: result.insertId, name, model, code, category_id, quantity, sale_price, purchase_price, image };
};

// Get Product List
const getProductList = async () => {
  const [rows] = await pool.query(`
    SELECT 
      products.id,
      products.name,
      products.model,
      products.code,
      products.quantity,
      products.sale_price,
      products.purchase_price,
      products.image,
      categories.name AS category_name
    FROM 
      products
    JOIN 
      categories
    ON 
      products.category_id = categories.id
    ORDER BY 
      products.id DESC
  `);
  return rows;
};


// Get Product by ID
const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

// Update Product
const updateProduct = async (id, { name, model, code, category_id, quantity, sale_price, purchase_price, image }) => {
  const [result] = await pool.query(
    'UPDATE products SET name = ?, model = ?, code = ?, category_id = ?, quantity = ?, sale_price = ?, purchase_price = ?, image = ? WHERE id = ?',
    [name, model, code, category_id, quantity, sale_price, purchase_price, image, id]
  );

  return result.affectedRows > 0 ? { id, name, model, code, category_id, quantity, sale_price, purchase_price, image } : null;
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
