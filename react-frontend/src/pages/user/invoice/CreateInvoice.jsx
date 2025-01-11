import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@material-tailwind/react';
import Select from 'react-select'; // Import react-select for searchable dropdown
import { fetchCustomers } from "../../../slices/customer/action";
import {
  setCustomer,
  addProduct,
  removeProduct,
  updateQuantity,
  setDiscount,
  setTax,
  setSelectedProduct,
  setQuantity,
} from "../../../slices/invoice/reducer";

const CreateInvoice = () => {
  const dispatch = useDispatch();
  
  // Extracting state from Redux
  const { products, customer, discount, tax, selectedProduct, quantity } = useSelector(
    (state) => state.invoice
  );
  
  const { customers, loading, error } = useSelector((state) => state.customer); // Use customer data from Redux

  // Fetch customers when the component mounts
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  // Product List
  const productList = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];

  // Add Product Handler
  const handleAddProduct = () => {
    const product = productList.find((prod) => prod.id === selectedProduct?.value);
    if (product) {
      dispatch(addProduct({ id: product.id, name: product.name, price: product.price, quantity }));
    }
  };

  // Remove Product Handler
  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  // Quantity Change Handler
  const handleQuantityChange = (id, increment) => {
    dispatch(updateQuantity({ id, increment }));
  };

  // Calculate Totals
  const calculateTotals = () => {
    const subTotal = products.reduce((acc, product) => acc + product.total, 0);
    const discountAmount = (discount / 100) * subTotal;
    const taxAmount = (tax / 100) * (subTotal - discountAmount);
    const netTotal = subTotal - discountAmount + taxAmount;

    return { subTotal, discountAmount, taxAmount, netTotal };
  };

  const { subTotal, discountAmount, taxAmount, netTotal } = calculateTotals();

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>

      {/* Customer Selection */}
      <div className="mb-4">
        <Select
          placeholder="Select Customer"
          options={customers.map((cust) => ({
            value: cust.id,
            label: `${cust.first_name} ${cust.last_name} (Phone: ${cust.phone_number})`,
          }))}
          value={customers
            .map((cust) => ({ value: cust.id, label: `${cust.first_name} ${cust.last_name} (Phone: ${cust.phone_number})` }))
            .find((option) => option.value === customer) || null}
          onChange={(selectedOption) => dispatch(setCustomer(selectedOption.value))}
          isLoading={loading} // Show loading state while fetching customers
          isDisabled={loading} // Disable the select while loading
        />
      </div>

      {/* Product Selection */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <Select
            placeholder="Select Product"
            options={productList.map((prod) => ({
              value: prod.id,
              label: prod.name,
            }))}
            value={productList
              .map((prod) => ({ value: prod.id, label: prod.name }))
              .find((option) => option.value === selectedProduct?.value) || null}
            onChange={(selectedOption) => dispatch(setSelectedProduct(selectedOption))}
          />
        </div>
        <div className="w-1/4">
          <Input
            label="Quantity"
            type="number"
            value={quantity || ""}
            onChange={(e) => dispatch(setQuantity(Number(e.target.value)))}
          />
        </div>
        <Button color="blue" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      {/* Product List Table */}
      <div className="mb-4">
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <Button color="orange" onClick={() => handleQuantityChange(product.id, false)}>
                    -
                  </Button>
                  {product.quantity}
                  <Button color="green" onClick={() => handleQuantityChange(product.id, true)}>
                    +
                  </Button>
                </td>
                <td>{product.price}</td>
                <td>{product.total}</td>
                <td>
                  <Button color="red" onClick={() => handleRemoveProduct(product.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discount and Tax Inputs */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <Input
            label="Discount (%)"
            type="number"
            value={discount}
            onChange={(e) => dispatch(setDiscount(Number(e.target.value)))}
          />
        </div>
        <div className="w-1/2">
          <Input
            label="Tax (%)"
            type="number"
            value={tax}
            onChange={(e) => dispatch(setTax(Number(e.target.value)))}
          />
        </div>
      </div>

      {/* Totals */}
      <div>
        <div>Subtotal: {subTotal}</div>
        <div>Discount: {discountAmount}</div>
        <div>Tax: {taxAmount}</div>
        <div>Net Total: {netTotal}</div>
      </div>
    </div>
  );
};

export default CreateInvoice;
