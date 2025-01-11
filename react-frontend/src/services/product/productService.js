import axios from 'axios';
import productApi from '../../api/productApi';

// Create Customer function
const createProductCategoryApiAxios = async ({ name }) => {
  try {
    const response = await axios.post(productApi.createProductCategoryApi, {
        name
    });
    return response; // Return the full response
  } catch (error) {
    console.error("Create Customer API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};


// Create Customer function
const productCategoryListApiAxios = async () => {
    try {
      const response = await axios.get(productApi.productCategoryListApi); // Correct API endpoint
      return response; // Return the full response
    } catch (error) {
      console.error("list Customer API Error:", error.message);
      throw error; // Rethrow the error for handling in calling code
    }
  };
  
  
  // Export all methods
  export { createProductCategoryApiAxios, productCategoryListApiAxios };
