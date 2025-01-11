import axios from 'axios';
import productApi from '../../api/productApi';

// Create Product Category function
const createProductCategoryApiAxios = async ({ name }) => {
  try {
    const response = await axios.post(productApi.createProductCategoryApi, {
      name
    });
    return response; // Return the full response
  } catch (error) {
    console.error("Create Product Category API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Fetch Product Categories function
const productCategoryListApiAxios = async () => {
  try {
    const response = await axios.get(productApi.productCategoryListApi); // Correct API endpoint
    return response; // Return the full response
  } catch (error) {
    console.error("Fetch Product Categories API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Update Product Category function
const updateProductCategoryApiAxios = async (id, { name }) => {
  try {
    const response = await axios.put(`${productApi.getUpdateProductCategoryApi}/${id}`, {
      name
    });
    return response; // Return the full response
  } catch (error) {
    console.error("Update Product Category API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Delete Product Category function
const deleteProductCategoryApiAxios = async (id) => {
  try {
    const response = await axios.delete(`${productApi.getDeleteProductCategoryApi}/${id}`);
    return response; // Return the full response
  } catch (error) {
    console.error("Delete Product Category API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Export all methods
export { 
  createProductCategoryApiAxios, 
  productCategoryListApiAxios, 
  updateProductCategoryApiAxios,
  deleteProductCategoryApiAxios 
};
