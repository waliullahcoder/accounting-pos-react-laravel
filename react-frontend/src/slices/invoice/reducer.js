import { createSlice } from '@reduxjs/toolkit';
import { initialInvoiceState } from './state';
import * as actions from './action';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialInvoiceState,
  reducers: {
    setCustomer: actions.setCustomer,
    addProduct: actions.addProduct,
    removeProduct: actions.removeProduct,
    updateQuantity: actions.updateQuantity,
    setDiscount: actions.setDiscount,
    setTax: actions.setTax,
    setSelectedProduct: actions.setSelectedProduct,
    setQuantity: actions.setQuantity,
  },
});

export const {
  setCustomer,
  addProduct,
  removeProduct,
  updateQuantity,
  setDiscount,
  setTax,
  setSelectedProduct,
  setQuantity,
} = invoiceSlice.actions; // Export actions

export default invoiceSlice.reducer; // Export reducer
