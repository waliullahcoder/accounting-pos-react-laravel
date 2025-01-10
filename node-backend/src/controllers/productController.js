const productService = require('../services/productService');
const path = require('path');
const fs = require('fs');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, model, code, category_id, quantity, sale_price, purchase_price} = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;
    const product = await productService.addProduct({ name, model, code, category_id, quantity, sale_price, purchase_price, image });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Product List
exports.getProductList = async (req, res) => {
  try {
    const products = await productService.getProductList();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit Product
exports.editProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the existing product by ID
      const product = await productService.getProductById(id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Update Product
exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, model, code, category_id, quantity, sale_price, purchase_price } = req.body;
      const newImage = req.file ? `/uploads/products/${req.file.filename}` : null;
  
      // Fetch the existing product to delete the old image if a new one is uploaded
      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      if (newImage && existingProduct.image) {
        const oldImagePath = path.join(__dirname, '..', existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
  
      const updatedProduct = await productService.updateProduct(id, { 
        name, model, code, 
        category_id, 
        quantity, sale_price, purchase_price, 
        image: newImage || existingProduct.image 
      });
  
      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the product to delete its image
    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (existingProduct.image) {
      const imagePath = path.join(__dirname, '..', existingProduct.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } 

    await productService.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
