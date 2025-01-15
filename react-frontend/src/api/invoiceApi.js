// const baseurl = 'http://localhost:8000'; //laravel apis
const baseurl = 'http://localhost:5000'; //node apis

// Define your API endpoints
const createInvoiceApi = `${baseurl}/api/order/create`;
const invoiceListApi = `${baseurl}/api/order/list`;

// Export as named exports
export { createInvoiceApi, invoiceListApi };

// OR export them as a single object
const invoiceApi = {
createInvoiceApi,
invoiceListApi
};

export default invoiceApi; // Default export with all APIs
