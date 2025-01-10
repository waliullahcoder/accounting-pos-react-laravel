const orderService = require('../services/orderService');

// Create Order with Details
exports.createOrderWithDetails = async (req, res) => {
  try {
    const { order, orderDetails } = req.body;

    if (!order || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).json({ error: 'Invalid order or order details data' });
    }

    const createdOrder = await orderService.createOrderWithDetails(order, orderDetails);

    res.status(201).json({
      message: 'Order and order details created successfully',
      order: createdOrder,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Orders
exports.listOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await orderService.listOrders(page, limit);

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
