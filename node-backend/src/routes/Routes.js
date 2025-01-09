const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const customerController = require('../controllers/customerController');
const vendorController = require('../controllers/vendorController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads/products');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  

//Product Categories
router.post('/product/category/add', categoryController.productCategoryAdd);
router.get('/product/category/list', categoryController.getProductCategoryList);
router.put('/product/category/edit/:id', categoryController.editProductCategory);
router.put('/product/category/update/:id', categoryController.updateProductCategory);
router.delete('/product/category/delete/:id', categoryController.deleteProductCategory);

// Product Routes
router.post('/product/add', upload.single('image'), productController.addProduct);
router.get('/product/list', productController.getProductList);
router.put('/product/edit/:id', upload.single('image'), productController.editProduct);
router.put('/product/update/:id', productController.updateProduct);
router.delete('/product/delete/:id', productController.deleteProduct);

// Customer Routes
router.post('/customer/add', customerController.createCustomer);
router.get('/customer/list', customerController.getCustomerList);
router.put('/customer/edit/:id', customerController.editCustomer);
router.put('/customer/update/:id', customerController.updateCustomer);
router.delete('/customer/delete/:id', customerController.deleteCustomer);

// Vendor Routes
router.post('/vendor/add', vendorController.createVendor);
router.get('/vendor/list', vendorController.getVendorList);
router.put('/vendor/edit/:id', vendorController.editVendor);
router.put('/vendor/update/:id', vendorController.updateVendor);
router.delete('/vendor/delete/:id', vendorController.deleteVendor);


module.exports = router;
