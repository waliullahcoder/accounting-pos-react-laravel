// Define the base URL
const baseurl = 'http://localhost:5000'; // Node APIs

// Define your API endpoints with placeholders for dynamic parameters
const createProductCategoryApi = `${baseurl}/api/product/category/add`;
const productCategoryListApi = `${baseurl}/api/product/category/list`;
const getUpdateProductCategoryApi = `${baseurl}/api/product/category/update`;
const getDeleteProductCategoryApi = `${baseurl}/api/product/category/delete`;
// Export API endpoints with dynamic methods
export { 
  createProductCategoryApi, 
  productCategoryListApi, 
  getUpdateProductCategoryApi, 
  getDeleteProductCategoryApi 
};

// OR export them as a single object
const productApi = {
  createProductCategoryApi,
  productCategoryListApi,
  getUpdateProductCategoryApi,
  getDeleteProductCategoryApi
};

export default productApi; // Default export with all APIs
