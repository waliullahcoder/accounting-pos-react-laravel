// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   customer: null,
//   products: [],
//   discount: 0,
//   tax: 0,
//   selectedProduct: '',
//   quantity: 1,
// };

// const invoiceSlice = createSlice({
//   name: 'invoice',
//   initialState,
//   reducers: {
//     setCustomer: (state, action) => {
//       state.customer = action.payload;
//     },
//     addProduct: (state, action) => {
//       const { id, name, price, quantity } = action.payload;

//       // Check if the product already exists
//       const existingProduct = state.products.find((product) => product.id === id);

//       if (existingProduct) {
//         // Update quantity and total for existing product
//         existingProduct.quantity += quantity;
//         existingProduct.total = existingProduct.price * existingProduct.quantity;
//       } else {
//         // Add a new product
//         state.products.push({
//           id,
//           name,
//           price,
//           quantity,
//           total: price * quantity,
//         });
//       }
//     },
//     removeProduct: (state, action) => {
//       state.products = state.products.filter((product) => product.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {
//       const { id, increment } = action.payload;
//       state.products = state.products.map((product) =>
//         product.id === id
//           ? {
//               ...product,
//               quantity: increment ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
//               total: product.price * (increment ? product.quantity + 1 : Math.max(product.quantity - 1, 1)),
//             }
//           : product
//       );
//     },
//     setDiscount: (state, action) => {
//       state.discount = action.payload;
//     },
//     setTax: (state, action) => {
//       state.tax = action.payload;
//     },
//     setSelectedProduct: (state, action) => {
//       state.selectedProduct = action.payload;
//     },
//     setQuantity: (state, action) => {
//       state.quantity = action.payload;
//     },
//   },
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
