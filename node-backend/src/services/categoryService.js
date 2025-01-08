
const categoryModel = require('../models/categoryModel');


//Category Add
exports.addCategory = async ({ name }) => {
    console.log("service try");
  return categoryModel.createCategory(name);
};

//Category List

exports.getCategoryList = async () => {
  try {
    const category = await categoryModel.getCategoryList();
    return category;
  } catch (error) {
    throw new Error('Failed to retrieve category');
  }
};

// Edit Category
exports.editCategory = async (id, name) => {
  try {
    const editCategory = await categoryModel.editCategory(id, name);
    if (!editCategory) {
      throw new Error('Category not found');
    }
    return editCategory;
  } catch (error) {
    throw new Error(`Failed to editCategory category: ${error.message}`);
  }
};

// Update Category
exports.updateCategory = async (id, name) => {
  try {
    const updatedCategory = await categoryModel.updateCategory(id, name);
    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
};


// Delete Category
exports.deleteCategory = async (id) => {
  try {
    const result = await categoryModel.deleteCategory(id);
    if (!result) {
      throw new Error('Category not found');
    }
    return result;
  } catch (error) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
};
