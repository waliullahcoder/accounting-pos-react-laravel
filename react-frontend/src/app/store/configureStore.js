import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/auth/authSlice';
// import invoiceReducer from '../../slices/invoice/invoiceSlice';
// import customerReducer from '../../slices/customer/customerSlice';
import invoiceReducer from '../../slices/invoice/reducer';
import customerReducer from '../../slices/customer/reducer';
import categoryReducer from '../../slices/category/reducer';
import productReducer from '../../slices/product/reducer';
import roleReducer from '../../slices/role/reducer';
import permissionReducer from '../../slices/permission/reducer';
// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
    role: roleReducer,
    permission: permissionReducer,
  },
});

export default store;
