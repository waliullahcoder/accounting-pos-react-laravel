import React, { useEffect, useRef } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { invoiceShow } from "../../../slices/invoice/action";

import { numberToWords, defaultCurrency } from ".././../../utils/helpers";

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

  console.log("WALI ", defaultCurrency(), id, invoice, invoice?.orderDetails);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Card className="w-full max-w-3xl p-6 shadow-lg bg-white" ref={invoiceRef}>
        <div className="flex bg-gray-200 text-gray-700 justify-between items-center border-b pb-4 mb-4">
          <Typography variant="h5" className="font-bold">Invoice</Typography>
          <Typography className="text-gray-500">#INVOICENO{invoice?.id}</Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="h6" className="font-semibold">From:</Typography>
            <Typography className="text-gray-700">AccPost Software Co. Ltd.</Typography>
            <Typography className="text-gray-500">H#15, R#06, Block-E, Banasree, Dhaka</Typography>
            <Typography className="text-gray-500">Mobile: +8801575020231</Typography>
          </div>
          <div>
            <Typography variant="h6" className="font-semibold">To:</Typography>
            <Typography className="text-gray-700">Customer ID: {invoice?.customer_id}</Typography>
            <Typography className="text-gray-500">456 Client Street</Typography>
            <Typography className="text-gray-500">
              {invoice?.created_at ? new Intl.DateTimeFormat("en-US", options).format(new Date(invoice.created_at)) : "N/A"}
            </Typography>
          </div>
        </div>

        <table className="w-full mt-6 border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 text-left">S/L</th>
              <th className="p-2 text-right">Product ID</th>
              <th className="p-2 text-right">Product</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.orderDetails?.length > 0 ? (
              <>
                {invoice.orderDetails.map((orderd, index) => (
                  <tr className="border-t" key={orderd.id}>
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 text-right">{orderd.product_id}</td>
                    <td className="p-2 text-right">{orderd.product_name}</td>
                    <td className="p-2 text-right">{orderd.order_quantity}</td>
                    <td className="p-2 text-right">{defaultCurrency()}{orderd.order_amount}</td>
                  </tr>
                ))}
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Total Quantity</th>
                  <th className="p-2 text-right">{invoice?.total_quantity || 0}</th>
                  <th className="p-2 text-right"></th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Total Amount</th>
                  <th className="p-2 text-right">{defaultCurrency()} {invoice?.total_amount || 0} </th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Tax Amount (% {invoice?.tax_persantage || 0})</th>
                  <th className="p-2 text-right">{defaultCurrency()}{invoice?.tax_amount || 0}</th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Tax Included Amount</th>
                  <th className="p-2 text-right">{defaultCurrency()}{invoice?.tax_amount+invoice?.total_amount || 0}</th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Discount Amount (% {invoice?.discount_persantage || 0})</th>
                  <th className="p-2 text-right">{defaultCurrency()}{invoice?.discount_amount || 0}</th>
                </tr>
              
                <tr className="border-t">
                  <th className="p-2 text-left"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right"></th>
                  <th className="p-2 text-right">Net Amount</th>
                  <th className="p-2 text-right">{defaultCurrency()}{invoice?.net_amount || 0} </th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-center" colSpan={5}><br/>
                  In Word: {numberToWords(invoice?.net_amount)}<br/>
                  </th>
                </tr>
                <tr className="border-t">
                  <th className="p-2 text-center  bg-gray-200 text-gray-700" colSpan={5}><br/>
                    Note: This note and comment are about the invoice policy<br/><br/>
                  </th>
                </tr>

              </>
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan={5}>
                  No order details available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      <Button className="mt-6" onClick={handlePrint} color="blue">
        Print / Save as PDF
      </Button>
    </div>
  );
};

export default InvoiceShow;
