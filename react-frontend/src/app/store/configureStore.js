import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';

// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
