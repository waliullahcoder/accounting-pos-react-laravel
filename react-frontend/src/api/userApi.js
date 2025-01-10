// const baseurl = 'http://localhost:8000'; //laravel apis
const baseurl = 'http://localhost:5000'; //node apis

// Define your API endpoints
const createCustomerApi = `${baseurl}/api/customer/add`;

// Export as named exports
export { createCustomerApi };

// OR export them as a single object
const userApi = {
createCustomerApi
};

export default userApi; // Default export with all APIs
