const productModel = require('../models/productModel');

// Add Product
exports.addProduct = async (data) => {
  return productModel.createProduct(data);
};

// Get Product List
exports.getProductList = async () => {
  return productModel.getProductList();
};

// Get Product by ID
exports.getProductById = async (id) => {
  return productModel.getProductById(id);
};

// Update Product
exports.updateProduct = async (id, data) => {
  return productModel.updateProduct(id, data);
};

// Delete Product
exports.deleteProduct = async (id) => {
  return productModel.deleteProduct(id);
};
