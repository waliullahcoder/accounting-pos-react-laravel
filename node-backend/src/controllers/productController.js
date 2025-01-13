const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productService = require('../services/productService');

// Set up multer storage options for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Use multer for handling file upload
const upload = multer({ storage: storage }).single('image'); // Expect a single 'image' field

exports.updateProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({ error: 'File upload failed', details: err.message });
    }

    try {
      const { id } = req.params;
      const { name, model, code, category_id, quantity, sale_price, purchase_price } = req.body;

      // Ensure req.file is correctly populated
      const newImage = req.file ? `/uploads/products/${req.file.filename}` : null;

      console.log('Image uploaded:', req.file);
      console.log('Request body:', req.body);

      // Check if product exists
      const existingProduct = await productService.getProductById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      console.log('Existing product:', existingProduct);

      // Delete old image if a new one is uploaded
      if (newImage && existingProduct.image) {
        const oldImagePath = path.join(__dirname, '..', existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('Old image deleted:', oldImagePath);
        }
      }
console.log("WALIUPDATE_IMAGE",newImage,existingProduct.image);

      // Update the product
      const updatedProduct = await productService.updateProduct(id, {
        name,
        model,
        code,
        category_id,
        quantity,
        sale_price,
        purchase_price,
        image: newImage || existingProduct.image, // Use new image if available, otherwise keep the old one
      });

      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error('Error updating product:', error.message);
      res.status(400).json({ error: 'An error occurred while updating the product', details: error.message });
    }
  });
};



// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, model, code, category_id, quantity, sale_price, purchase_price } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;
    console.log("WALIADD_IMAGE",image);
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

