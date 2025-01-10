import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { fetchCustomers } from "../../../slices/customer/customerSlice";

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, status, error } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <Typography variant="h4" className="mb-5 text-gray-800">
        Customer List
      </Typography>
      <Card className="shadow-lg">
        <CardBody>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b border-gray-300 p-3">#</th>
                <th className="border-b border-gray-300 p-3">First Name</th>
                <th className="border-b border-gray-300 p-3">Last Name</th>
                <th className="border-b border-gray-300 p-3">Email</th>
                <th className="border-b border-gray-300 p-3">Phone Number</th>
                <th className="border-b border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{customer.first_name}</td>
                    <td className="p-3">{customer.last_name}</td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{customer.phone_number}</td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        color="green"
                        className="mr-2"
                        onClick={() => handleEdit(customer.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-3">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

const handleEdit = (id) => {
  console.log("Edit customer with ID:", id);
};

const handleDelete = (id) => {
  console.log("Delete customer with ID:", id);
};

export default CustomerList;
