import { createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchProducts, updateProduct, deleteProduct  } from './action';
import { initialProductState } from './state';

const defaultErrorMessage = 'An unexpected error occurred. Please try again.';

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: {
    resetProductState: () => initialProductState,
  },
  extraReducers: (builder) => {
    builder

    
      // Product Create
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
        state.error = { message: null }; // Reset error
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
        state.products = Array.isArray(state.products)
          ? [...state.products, action.payload]
          : [action.payload];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = { message: action.error.message || defaultErrorMessage };
      })


      // Product List
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = { message: null }; // Reset error
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
          state.status = 'succeeded';
        } else {
          state.status = 'failed';
          state.products = [];
          state.error = { message: 'Invalid data received.' };
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = { message: action.error.message || defaultErrorMessage };
      })


        // Find and update the Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedProduct = action.payload;
        const index = state.products.findIndex(Product => Product.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      
        // Remove the deleted Product from the state
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = state.products.filter(product => product.id !== action.payload.id);
      });
      
  },
});

export default productSlice.reducer;
