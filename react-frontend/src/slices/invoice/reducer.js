import { createSlice } from '@reduxjs/toolkit';
import { initialInvoiceState } from './state';
import * as actions from './action';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialInvoiceState,
  reducers: {
    setCustomer: actions.setCustomer,
    // fetchInvoices: actions.fetchInvoices,
    addProduct: actions.addProduct,
    removeProduct: actions.removeProduct,
    updateQuantity: actions.updateQuantity,
    setDiscount: actions.setDiscount,
    setTax: actions.setTax,
    setSelectedProduct: actions.setSelectedProduct,
    setQuantity: actions.setQuantity,
  },
  // extraReducers: (builder) => {
  //   builder
  //   .addCase(fetchInvoices.fulfilled, (state, action) => {
  //     console.log('Fetched invoices:', action.payload); // Debug API response
  //     state.status = 'succeeded';
  //     state.invoices = action.payload;
  //   });
  // },
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
