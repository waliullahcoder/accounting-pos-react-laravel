import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initialize the initial state with token from localStorage if available
const initialState = {
  token: localStorage.getItem('token') || null, // Check localStorage for token
  isSuperAdmin: false, // Default isSuperAdmin value
};

// Create a slice of the state to manage authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isSuperAdmin = action.payload.isSuperAdmin;
      // Save the token to localStorage for persistence
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isSuperAdmin = false;
      // Remove token from localStorage on logout
      localStorage.removeItem('token');
    },
  },
});

// Export the actions for login and logout
export const { login, logout } = authSlice.actions;

// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
