import { createSlice } from '@reduxjs/toolkit';
import { createCustomer, fetchCustomers } from './action';
import { initialCustomerState } from './state';

const customerSlice = createSlice({
  name: 'customer',
  initialState: initialCustomerState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
