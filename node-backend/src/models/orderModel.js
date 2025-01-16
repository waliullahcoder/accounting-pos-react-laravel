const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

const pool = mysql.createPool(dbConfig);

// Create Order with Details
const createOrderWithDetails = async (orderData, orderDetails) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert Order
    const orderSql = `
      INSERT INTO orders (
        customer_id, total_quantity, total_amount, discount_persantage, discount_amount,
        tax_persantage, tax_amount, net_amount, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [orderResult] = await connection.query(orderSql, [
      orderData.customer_id,
      orderData.total_quantity,
      orderData.total_amount,
      orderData.discount_persantage,
      orderData.discount_amount,
      orderData.tax_persantage,
      orderData.tax_amount,
      orderData.net_amount,
    ]);

    const orderId = orderResult.insertId;

    // Insert Order Details
    const orderDetailsSql = `
      INSERT INTO order_details (
        order_id, product_id, product_name, order_quantity, order_amount, created_at, updated_at
      ) VALUES ?
    `;

    const orderDetailsValues = orderDetails.map((detail) => [
      orderId,
      detail.product_id,
      detail.product_name,
      detail.order_quantity,
      detail.order_amount,
      new Date(),
      new Date(),
    ]);

    await connection.query(orderDetailsSql, [orderDetailsValues]);

    // Update Product Quantities
    for (const detail of orderDetails) {
      const updateProductSql = `
        UPDATE products 
        SET quantity = quantity - ? 
        WHERE id = ?
      `;

      await connection.query(updateProductSql, [detail.order_quantity, detail.product_id]);
    }

    await connection.commit();

    return { orderId, ...orderData, orderDetails };
  } catch (error) {
    await connection.rollback();
    throw new Error('Error creating order and order details: ' + error.message);
  } finally {
    connection.release();
  }
};


// Get Order by ID
const getOrderById = async (id) => {
  const connection = await pool.getConnection();

  try {
    const orderSql = `SELECT * FROM orders WHERE id = ?`;
    const [order] = await connection.query(orderSql, [id]);

    if (!order.length) {
      return null; // Order not found
    }

    const orderDetailsSql = `SELECT * FROM order_details WHERE order_id = ?`;
    const [orderDetails] = await connection.query(orderDetailsSql, [id]);

    // Debugging logs
    console.log("Order Data:", order[0]);
    console.log("Order Details Data:", orderDetails);

    return { ...order[0], orderDetails };
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    throw new Error("Error fetching order by ID: " + error.message);
  } finally {
    connection.release();
  }
};


// List Orders
const listOrders = async (page, limit) => {
  const connection = await pool.getConnection();

  try {
    const offset = (page - 1) * limit;

    const ordersSql = `SELECT * FROM orders  ORDER BY id DESC LIMIT ? OFFSET ?`;
    const [orders] = await connection.query(ordersSql, [parseInt(limit), offset]);

    if (!orders.length) {
      return { orders: [], total: 0 };
    }

    const totalSql = `SELECT COUNT(*) as total FROM orders`;
    const [totalResult] = await connection.query(totalSql);

    return { orders, total: totalResult[0].total, page, limit };
  } catch (error) {
    throw new Error('Error listing orders: ' + error.message);
  } finally {
    connection.release();
  }
};

module.exports = { createOrderWithDetails, getOrderById, listOrders };
