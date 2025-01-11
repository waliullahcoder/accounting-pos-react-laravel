// import { createSlice } from '@reduxjs/toolkit';
// import { initialInvoiceState } from './state';
// import * as actions from './action';

// // Map actions correctly for use with createSlice
// const reducers = Object.entries(actions).reduce((acc, [key, reducer]) => {
//   acc[key] = (state, action) => reducer(state, action);
//   return acc;
// }, {});

// const invoiceSlice = createSlice({
//   name: 'invoice',
//   initialState: initialInvoiceState,
//   reducers,
// });

// export const {
//   setCustomer,
//   addProduct,
//   removeProduct,
//   updateQuantity,
//   setDiscount,
//   setTax,
//   setSelectedProduct,
//   setQuantity,
// } = invoiceSlice.actions;

// export default invoiceSlice.reducer;
