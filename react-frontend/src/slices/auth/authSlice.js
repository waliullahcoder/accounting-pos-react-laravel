import { createSlice } from "@reduxjs/toolkit";

// Initialize the initial state with token and isSuperAdmin from localStorage
const initialState = {
  token: localStorage.getItem("token") || null,
  isSuperAdmin: JSON.parse(localStorage.getItem("isSuperAdmin")) || false,
};

// Create a slice of the state to manage authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isSuperAdmin = action.payload.isSuperAdmin;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isSuperAdmin", JSON.stringify(action.payload.isSuperAdmin));
    },
    logout: (state) => {
      state.token = null;
      state.isSuperAdmin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isSuperAdmin");
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
