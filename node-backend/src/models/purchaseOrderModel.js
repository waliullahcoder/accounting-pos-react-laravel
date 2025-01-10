const mysql = require('mysql2/promise');
const dbConfig = require('../config').dbConfig;

const pool = mysql.createPool(dbConfig);

// Create purchaseOrder with Details
const createPurchaseOrderWithDetails = async (purchaseOrderData, purchaseOrderDetails) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Insert purchaseOrder
    const purchaseOrderSql = `
      INSERT INTO purchase_orders (
        vendor_id, total_quantity, total_amount, discount_persantage, discount_amount,
        tax_persantage, tax_amount, net_amount, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [purchaseOrderResult] = await connection.query(purchaseOrderSql, [
      purchaseOrderData.vendor_id,
      purchaseOrderData.total_quantity,
      purchaseOrderData.total_amount,
      purchaseOrderData.discount_persantage,
      purchaseOrderData.discount_amount,
      purchaseOrderData.tax_persantage,
      purchaseOrderData.tax_amount,
      purchaseOrderData.net_amount,
    ]);

    const purchaseOrderId = purchaseOrderResult.insertId;

    // Insert purchaseOrder Details
    const purchaseOrderDetailsSql = `
      INSERT INTO purchase_order_details (
        purchase_order_id, product_id, product_name, purchase_order_quantity, purchase_order_amount, created_at, updated_at
      ) VALUES ?
    `;

    const purchaseOrderDetailsValues = purchaseOrderDetails.map((detail) => [
      purchaseOrderId,
      detail.product_id,
      detail.product_name,
      detail.purchase_order_quantity,
      detail.purchase_order_amount,
      new Date(),
      new Date(),
    ]);

    await connection.query(purchaseOrderDetailsSql, [purchaseOrderDetailsValues]);

    // Update Product Quantities
    for (const detail of purchaseOrderDetails) {
      const updateProductSql = `
        UPDATE products 
        SET quantity = quantity + ? 
        WHERE id = ?
      `;

      await connection.query(updateProductSql, [detail.purchase_order_quantity, detail.product_id]);
    }

    await connection.commit();

    return { purchaseOrderId, ...purchaseOrderData, purchaseOrderDetails };
  } catch (error) {
    await connection.rollback();
    throw new Error('Error creating purchaseOrder and purchaseOrder details: ' + error.message);
  } finally {
    connection.release();
  }
};


// Get purchaseOrder by ID
const getPurchaseOrderById = async (id) => {
  const connection = await pool.getConnection();

  try {
    const purchaseOrderSql = `SELECT * FROM purchase_orders WHERE id = ?`;
    const [purchaseOrder] = await connection.query(purchaseOrderSql, [id]);

    if (!purchaseOrder.length) {
      return null; // Order not found
    }

    const purchaseOrderDetailsSql = `SELECT * FROM purchase_order_details WHERE purchase_order_id = ?`;
    const [purchaseOrderDetails] = await connection.query(purchaseOrderDetailsSql, [id]);

    // Debugging logs
    console.log("purchaseOrder Data:", purchaseOrder[0]);
    console.log("purchaseOrder Details Data:", purchaseOrderDetails);

    return { ...purchaseOrder[0], purchaseOrderDetails };
  } catch (error) {
    console.error("Error fetching purchaseOrder by ID:", error.message);
    throw new Error("Error fetching purchaseOrder by ID: " + error.message);
  } finally {
    connection.release();
  }
};



// List purchaseOrders
const listPurchaseOrders = async (page, limit) => {
  const connection = await pool.getConnection();

  try {
    const offset = (page - 1) * limit;

    const purchaseOrdersSql = `SELECT * FROM purchase_orders LIMIT ? OFFSET ?`;
    const [purchaseOrders] = await connection.query(purchaseOrdersSql, [parseInt(limit), offset]);

    if (!purchaseOrders.length) {
      return { purchaseOrders: [], total: 0 };
    }

    const totalSql = `SELECT COUNT(*) as total FROM purchase_orders`;
    const [totalResult] = await connection.query(totalSql);

    return { purchaseOrders, total: totalResult[0].total, page, limit };
  } catch (error) {
    throw new Error('Error listing purchaseOrders: ' + error.message);
  } finally {
    connection.release();
  }
};

module.exports = { createPurchaseOrderWithDetails, getPurchaseOrderById, listPurchaseOrders };
