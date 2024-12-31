// const baseurl = 'http://localhost:8000'; //laravel apis
const baseurl = 'http://localhost:5000'; //node apis

// Define your API endpoints
const loginapi = `${baseurl}/api/auth/login`;
const registerapi = `${baseurl}/api/auth/register`;
const logoutapi = `${baseurl}/api/auth/logout`;

// Export as named exports
export { loginapi, registerapi, logoutapi };

// OR export them as a single object
const apis = {
  loginapi,
  registerapi,
  logoutapi,
};

export default apis; // Default export with all APIs
