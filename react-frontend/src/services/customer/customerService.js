import axios from 'axios';
import userApi from '../../api/userApi';

// Create function

const createCustomerApiAxios = async ({ first_name, last_name, address, email, phone_number, zip_code }) => {
  try {
    const response = await axios.post(userApi.createCustomerApi, {
        first_name, last_name, address, email, phone_number, zip_code
    });
    return response; // Return the full response
  } catch (error) {
    console.error("Create Customer API Error:", error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

  
  // Export all methods
  export { createCustomerApiAxios };
