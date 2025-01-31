import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/auth/authSlice';
import invoiceReducer from '../../slices/invoice/reducer';
import customerReducer from '../../slices/customer/reducer';
import categoryReducer from '../../slices/category/reducer';
import productReducer from '../../slices/product/reducer';
import roleReducer from '../../slices/role/reducer';
import permissionReducer from '../../slices/permission/reducer';

// Function to load the state from sessionStorage
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

// Function to save the state to sessionStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

// Load persisted state
const preloadedState = loadState();

// Configure the Redux store
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
  preloadedState, // Load state on startup
});

// Save state changes to sessionStorage
store.subscribe(() => {
  saveState({
    auth: store.getState().auth, // Persist only auth state
  });
});

export default store;
