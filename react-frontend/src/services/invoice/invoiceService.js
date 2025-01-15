import axios from 'axios';
import invoiceApi from '../../api/invoiceApi';

// Create Invoice function
const createInvoiceApiAxios = async (invoiceData) => {
  try {
    const response = await axios.post(invoiceApi.createInvoiceApi, invoiceData);
    return response; // Return the full response
  } catch (error) {
    console.error('Create Invoice API Error:', error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Fetch Invoice List function
const invoiceListApiAxios = async () => {
  try {
    const response = await axios.get(invoiceApi.invoiceListApi);
    return response; // Return the full response
  } catch (error) {
    console.error('Fetch Invoice List API Error:', error.message);
    throw error; // Rethrow the error for handling in calling code
  }
};

// Export all methods
export {
  createInvoiceApiAxios,
  invoiceListApiAxios,
};
