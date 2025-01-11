import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';
import { createProductCategoryApiAxios, productCategoryListApiAxios } from '../../services/product/productService';

export const createProductCategory = createAsyncThunk(
  productApi.createProductCategoryApi,
  async (productCategoryData, { rejectWithValue }) => {
    try {
      const response = await createProductCategoryApiAxios(productCategoryData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Something went wrong. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchProductCategories = createAsyncThunk(
  productApi.productCategoryListApi,
  async (_, { rejectWithValue }) => {
    try {
      const response = await productCategoryListApiAxios();
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Something went wrong. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);
