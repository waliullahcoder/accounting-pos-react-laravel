const purchaseOrderModel = require('../models/purchaseOrderModel');

// Create purchaseOrder with Details
exports.createPurchaseOrderWithDetails = async (purchaseOrderData, purchaseOrderDetails) => {
  return await purchaseOrderModel.createPurchaseOrderWithDetails(purchaseOrderData, purchaseOrderDetails);
};

// Get purchaseOrder by ID
exports.getPurchaseOrderById = async (id) => {
  return await purchaseOrderModel.getPurchaseOrderById(id);
};

// List purchaseOrders
exports.listPurchaseOrders = async (page, limit) => {
  return await purchaseOrderModel.listPurchaseOrders(page, limit);
};
