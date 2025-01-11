
//setCustomer
export const setCustomer = (state, action) => {
    console.log('setCustomer called with:', { state, action }); // Debugging log
    state.customer = action.payload; // Expecting the full customer object
  };
  
  

//addProduct 
export const addProduct = (state, action) => {
    const { id, name, price, quantity } = action.payload;
    const existingProduct = state.products.find((product) => product.id === id);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.total = existingProduct.price * existingProduct.quantity;
    } else {
      state.products.push({
        id,
        name,
        price,
        quantity,
        total: price * quantity,
      });
    }
  };

  //removeProduct
  export const removeProduct = (state, action) => {
    state.products = state.products.filter((product) => product.id !== action.payload);
  }

  //updateQuantity
  export const updateQuantity = (state, action) => {
    const { id, increment } = action.payload;
    state.products = state.products.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: increment ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
            total: product.price * (increment ? product.quantity + 1 : Math.max(product.quantity - 1, 1)),
          }
        : product
    );
  }

  //setDiscount
  export const setDiscount = (state, action) => {
    state.discount = action.payload;
  }

  //setTax
  export const setTax = (state, action) => {
    state.tax = action.payload;
  }

  //setSelectedProduct
  export const setSelectedProduct = (state, action) => {
    state.selectedProduct = action.payload;
  }

  //setQuantity
  export const setQuantity = (state, action) => {
    state.quantity = action.payload;
  }
  