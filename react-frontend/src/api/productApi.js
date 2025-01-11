// const baseurl = 'http://localhost:8000'; //laravel apis
const baseurl = 'http://localhost:5000'; //node apis

// Define your API endpoints
const createProductCategoryApi = `${baseurl}/api/product/category/add`;
const productCategoryListApi = `${baseurl}/api/product/category/list`;

// Export as named exports
export { createProductCategoryApi, productCategoryListApi };

// OR export them as a single object
const productApi = {
createProductCategoryApi,
productCategoryListApi
};

export default productApi; // Default export with all APIs
