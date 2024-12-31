import axios from 'axios';
import apis from './authApi';

// Function to log in
const loginauthapi = async (email, password) => {
  try {
    const response = await axios.post(apis.loginapi, { email, password });
    return response; // Return the response data
  } catch (error) {
    console.error("Login API Error:", error);
    throw error; // Rethrow the error to handle it where the function is called
  }
};
// Register function
const registerauthapi = async (email, password, username) => {
    try {
      const response = await axios.post(apis.registerapi, { email, password, username });
      return response; // Return the full response
    } catch (error) {
      console.error("Register API Error:", error);
      throw error;
    }
  };
  
  // Logout function
  const logoutauthapi = async (token) => {
    try {
      const response = await axios.post(
        apis.logoutapi,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response; // Return the full response
    } catch (error) {
      console.error("Logout API Error:", error);
      throw error;
    }
  };
  
  // Export all methods
  export { loginauthapi, registerauthapi, logoutauthapi };
