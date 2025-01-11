import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { createCustomerApiAxios, customerListApiAxios } from '../../services/customer/customerService';

export const createCustomer = createAsyncThunk(
  userApi.createCustomerApi,
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await createCustomerApiAxios(customerData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Something went wrong. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCustomers = createAsyncThunk(
  userApi.customerListApi,
  async (_, { rejectWithValue }) => {
    try {
      const response = await customerListApiAxios();
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Something went wrong. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);
