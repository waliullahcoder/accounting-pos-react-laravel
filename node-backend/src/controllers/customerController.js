const customerService = require('../services/customerService');

// Create Customer
exports.createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, address, phone_number, email, zip_code } = req.body;
    const customer = await customerService.createCustomer({ first_name, last_name, address, phone_number, email, zip_code });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Customers
exports.getCustomerList = async (req, res) => {
  try {
    const customers = await customerService.getCustomerList();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit Customer
exports.editCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, address, phone_number, email, zip_code } = req.body;

    const updatedCustomer = await customerService.updateCustomer(id, { first_name, last_name, address, phone_number, email, zip_code });

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);

    if (!result) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
