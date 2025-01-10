const purchaseOrderService = require('../services/purchaseOrderService');

// Create Order with Details
exports.createPurchaseOrderWithDetails = async (req, res) => {
  try {
    const { purchaseOrder, purchaseOrderDetails } = req.body;

    if (!purchaseOrder || !Array.isArray(purchaseOrderDetails) || purchaseOrderDetails.length === 0) {
      return res.status(400).json({ error: 'Invalid order or order details data' });
    }

    const createdPurchaseOrder = await purchaseOrderService.createPurchaseOrderWithDetails(purchaseOrder, purchaseOrderDetails);

    res.status(201).json({
      message: 'Purchase Order and order details created successfully',
      order: createdPurchaseOrder,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Order by ID
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const purchaseOrder = await purchaseOrderService.getPurchaseOrderById(id);

    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Orders
exports.listPurchaseOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const purchaseOrder = await purchaseOrderService.listPurchaseOrders(page, limit);

    res.status(200).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
