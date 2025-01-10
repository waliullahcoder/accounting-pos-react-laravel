const orderModel = require('../models/orderModel');

// Create Order with Details
exports.createOrderWithDetails = async (orderData, orderDetails) => {
  return await orderModel.createOrderWithDetails(orderData, orderDetails);
};

// Get Order by ID
exports.getOrderById = async (id) => {
  return await orderModel.getOrderById(id);
};

// List Orders
exports.listOrders = async (page, limit) => {
  return await orderModel.listOrders(page, limit);
};
