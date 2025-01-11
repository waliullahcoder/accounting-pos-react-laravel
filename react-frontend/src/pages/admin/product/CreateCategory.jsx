import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@material-tailwind/react"; // Import Material Tailwind components
import { createProductCategory } from "../../../slices/category/action";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Category name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(createProductCategory(formData)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setSuccessMessage("Product Category created successfully!");
        }
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInsert = () => {
    setSuccessMessage("Please wait... Redirecting to Product Category List...");
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        navigate("/admin/product/category/list");
      }, 2000); // Redirect after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [successMessage, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-5 bg-white rounded-md shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Product Category or go to{" "}
        <Button color="green" onClick={handleInsert}>
          Product Category List
        </Button>
      </h2>

      {successMessage && (
        <div className="bg-green-500 text-white text-center py-2 mb-4 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <Input
          label="Product Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          className="mb-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <Button
        type="submit"
        color="blue"
        fullWidth
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Save Category"}
      </Button>

      {error?.message && (
        <p className="text-red-500 text-center mt-4">{error.message}</p>
      )}
    </form>
  );
};

export default CreateCategory;
