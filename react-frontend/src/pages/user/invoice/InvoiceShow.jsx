
import React, { useEffect, useRef  } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invoiceShow } from "../../../slices/invoice/action";


const InvoiceShow = () => {
const invoiceRef = useRef();
  
const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
});
  const { id } = useParams();
  const dispatch = useDispatch();
  const { invoice, status, error } = useSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(invoiceShow(id));
  }, [dispatch, id]);
console.log("WALI ",id,invoice);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Invoice Details</h2>
      <p>Invoice ID: {invoice?.id}</p>
      <p>Customer ID: {invoice?.customer_id}</p>
      <p>Total Quantity: {invoice?.total_quantity}</p>
      <p>Net Amount: {invoice?.net_amount}</p>
      <p>Date: {invoice?.created_at}</p>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl p-6 shadow-lg bg-white" ref={invoiceRef}>
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <Typography variant="h5" className="font-bold">Invoice</Typography>
          <Typography className="text-gray-500">#INV-202401</Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" className="font-semibold">From:</Typography>
            <Typography className="text-gray-700">Your Company</Typography>
            <Typography className="text-gray-500">123 Business Street</Typography>
            <Typography className="text-gray-500">City, Country</Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-semibold">To:</Typography>
            <Typography className="text-gray-700">Client Name</Typography>
            <Typography className="text-gray-500">456 Client Street</Typography>
            <Typography className="text-gray-500">City, Country</Typography>
          </div>
        </div>

        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Service A</td>
              <td className="p-2 text-right">1</td>
              <td className="p-2 text-right">$100</td>
              <td className="p-2 text-right">$100</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Service B</td>
              <td className="p-2 text-right">2</td>
              <td className="p-2 text-right">$50</td>
              <td className="p-2 text-right">$100</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-4 border-t pt-4">
          <Typography variant="h6" className="font-semibold">Total: $200</Typography>
        </div>
      </Card>

      <Button className="mt-6" onClick={handlePrint} color="blue">
        Print / Save as PDF
      </Button>
    </div>
    </div>
  );
};

export default InvoiceShow;
