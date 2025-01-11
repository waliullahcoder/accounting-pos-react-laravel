import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/auth/authSlice';
import invoiceReducer from '../../slices/invoice/invoiceSlice';
// import customerReducer from '../../slices/customer/customerSlice';
// import invoiceReducer from '../../slices/invoice/reducer';
import customerReducer from '../../slices/customer/reducer';
// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
  },
});

export default store;
