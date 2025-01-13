const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productService = require('../services/productService');

// Set up multer storage options for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Use multer for handling file upload
const upload = multer({ storage: storage }).single('image'); // Expect a single 'image' field

exports.updateProduct = async (req, res) => {
  console.log("WALI BACK");

  // Use multer to handle file uploads
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    try {
      const { id } = req.params;
      const { name, model, code, category_id, quantity, sale_price, purchase_price } = req.body;
      const newImage = req.file ? `/uploads/products/${req.file.filename}` : null;  // Image from multer

      // Log received data for debugging
      console.log("Received data for update:", {
        id,
        name,
        model,
        code,
        category_id,
        quantity,
        sale_price,
        purchase_price,
        newImage,
      });

      // Find existing product
      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // If a new image is uploaded, remove the old image
      if (newImage && existingProduct.image) {
        const oldImagePath = path.join(__dirname, '..', existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Remove old image file
        }
      }

      // Update product details
      const updatedProduct = await productService.updateProduct(id, { 
        name, 
        model, 
        code, 
        category_id, 
        quantity, 
        sale_price, 
        purchase_price, 
        image: newImage || existingProduct.image  // Keep existing image if no new image is uploaded
      });

      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
      console.error("Error updating product:", error.message);
      res.status(400).json({ error: error.message });
    }
  });
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, model, code, category_id, quantity, sale_price, purchase_price } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;
    
    const product = await productService.addProduct({
      name, model, code, category_id, quantity, sale_price, purchase_price, image
    });
    
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

  

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await productService.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete image if exists
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

