import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/auth/authSlice';
import invoiceReducer from '../../slices/invoiceSlice';
// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
  },
});

export default store;
