const categoryService = require('../services/categoryService');
const jwt = require('jsonwebtoken');
const config = require('../config');

//Category Add
exports.productCategoryAdd = async (req, res) => {
  try {
    console.log("cont try");
    const category = await categoryService.addCategory(req.body);
    res.status(201).json(category);
  } catch (error) { console.log("cont else");
    res.status(400).json({ error: error.message });
  }
};




//Category List
exports.getProductCategoryList = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ error: "Sorry, Unauthenticated" });
    }

    // Verify token
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      // If token is valid, fetch the users
      const category = await categoryService.getCategoryList();
      res.status(200).json(category);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Edit Category
exports.editProductCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await categoryService.editCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Category
exports.updateProductCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get category ID from params
    const { name } = req.body; // Get updated name from request body

    const updatedCategory = await categoryService.updateCategory(id, name);
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Category
exports.deleteProductCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryService.deleteCategory(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
