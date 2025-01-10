import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { createCustomerApiAxios } from '../../services/customer/customerService';
// Async thunk for submitting customer data (simulating API call)
export const createCustomer = createAsyncThunk(
    userApi.createCustomerApi,
  async (customerData, { rejectWithValue }) => {
    try {
        const response = await createCustomerApiAxios(customerData);
        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data || "Something went wrong. Please try again.";
        return rejectWithValue(errorMessage);
      }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customer: null,
    status: 'idle',
    error: null,
  },
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
      });
  },
});

export default customerSlice.reducer;
