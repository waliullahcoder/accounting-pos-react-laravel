const customerModel = require('../models/customerModel');

// Create Customer
exports.createCustomer = async (customerData) => {
  return await customerModel.createCustomer(customerData);
};

// List Customers
exports.getCustomerList = async () => {
  return await customerModel.getCustomerList();
};

// Get Customer by ID
exports.getCustomerById = async (id) => {
  return await customerModel.getCustomerById(id);
};

// Update Customer
exports.updateCustomer = async (id, customerData) => {
  return await customerModel.updateCustomer(id, customerData);
};

// Delete Customer
exports.deleteCustomer = async (id) => {
  return await customerModel.deleteCustomer(id);
};
