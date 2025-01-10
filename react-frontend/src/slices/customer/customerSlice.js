import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { createCustomerApiAxios, customerListApiAxios } from '../../services/customer/customerService';
// Async thunk for submitting customer data (simulating API call)







//Create CUstomer Async thunk for submitting
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


//Customer list Async thunk for getting data
export const fetchCustomers = createAsyncThunk(
    userApi.customerListApi, // This is just the action type
    async (_, { rejectWithValue }) => { // Add `_` as the first parameter for arguments
      try {
        const response = await customerListApiAxios();
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
    customers: [],
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
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload; // Update customers array
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
  
});

export default customerSlice.reducer;
