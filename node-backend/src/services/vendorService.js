const vendorModel = require('../models/vendorModel');

// Create vendor
exports.createVendor = async (vendorData) => {
  return await vendorModel.createVendor(vendorData);
};

// List vendors
exports.getVendorList = async () => {
  return await vendorModel.getVendorList();
};

// Get vendor by ID
exports.getVendorById = async (id) => {
  return await vendorModel.getVendorById(id);
};

// Update vendor
exports.updateVendor = async (id, vendorData) => {
  return await vendorModel.updateVendor(id, vendorData);
};

// Delete vendor
exports.deleteVendor = async (id) => {
  return await vendorModel.deleteVendor(id);
};
