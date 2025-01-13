import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Typography, CardHeader, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../../slices/product/action";
import Modal from "react-modal";


const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = () => {
    if (productIdToDelete !== null) {
      dispatch(deleteProduct(productIdToDelete)).then(() => {
        dispatch(fetchProducts());
        closeModal();
      });
    }
  };

  const openModal = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  const filteredProducts = products?.filter((product) =>
    product && (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue-gray" className="mb-8 p-6">
          <div className="flex justify-between items-center">
            <Typography variant="h6" color="white">
              Product List
            </Typography>
            <Link to="/admin/product/create">
              <Button color="green">Create Product</Button>
            </Link>
          </div>
        </CardHeader>

        <CardHeader className="mb-8 p-6">
          <Input
            label="Search by Product Name"
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {currentProducts.length > 0 ? (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["#", "Name", "Model", "Code", "Category ID", "Quantity", "Sale Price", "Purchase Price", "Image", "Actions"].map((header) => (
                      <th
                        key={header}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {header}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                      {products?.map((product) => (
                        <tr key={product.id}>
                          <td className="border p-2">{product.id}</td>
                          <td className="border p-2">{product.name || "N/A"}</td>
                          <td className="border p-2">{product.model || "N/A"}</td>
                          <td className="border p-2">{product.code || "N/A"}</td>
                          <td className="border p-2">{product.category_id || "N/A"}</td>
                          <td className="border p-2">{product.quantity || 0}</td>
                          <td className="border p-2">
                            ${Number(product.sale_price).toFixed(2) || "0.00"}
                          </td>
                          <td className="border p-2">
                            ${Number(product.purchase_price).toFixed(2) || "0.00"}
                          </td>

                          <td className="border p-2">{product.image}
                            {product.image ? (
                             <img
                                src={product.image ? `http://localhost:5000${product.image}` : 'placeholder.jpg'} 
                                alt={product.name || "Product Image"}
                                className="w-16 h-16 object-cover"
                              />
                           
                            
                            ) : (
                              "No Image"
                            )}
                          </td>
                          <td className="border p-2">
                            <Link to={`/admin/product/edit/${product.id}`}>
                              <Button size="sm" color="blue" className="mr-2">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

              </table>
              <div className="flex justify-between items-center mt-4">
                <Button
                  color="blue"
                  variant="text"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Typography variant="small">
                  Page {currentPage} of {totalPages}
                </Typography>
                <Button
                  color="blue"
                  variant="text"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <Typography className="text-center p-5">No products found.</Typography>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-50"
        overlayClassName="fixed inset-0 bg-black opacity-50 flex justify-center items-center"
      >
        <div className="text-center">
          <Typography variant="h6" color="blue-gray">
            Are you sure you want to delete this product?
          </Typography>
          <div className="mt-6 flex justify-center gap-4">
            <Button color="red" onClick={handleDelete} className="w-32">
              Yes, Delete
            </Button>
            <Button color="gray" onClick={closeModal} className="w-32">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
