import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { createProduct, updateProduct } from '../../../slices/product/action';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    model: '',
    code: '',
    category_id: '',
    quantity: '',
    sale_price: '',
    purchase_price: '',
    image: null,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Preview for the image
  const [existingImage, setExistingImage] = useState(null); // Existing image for edit mode

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const product = products.find((product) => product.id === parseInt(id));
      if (product) {
        setFormData({
          name: product.name || '',
          model: product.model || '',
          code: product.code || '',
          category_id: product.category_id || '',
          quantity: product.quantity || '',
          sale_price: product.sale_price || '',
          purchase_price: product.purchase_price || '',
          image: null, // New image to be uploaded
        });
        setExistingImage(product.image); // Set existing image for preview
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a local preview URL
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };

  const handleSubmit = () => {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        form.append(key, value); // Append image if it is a file
      } else {
        form.append(key, value || ''); // Append other fields
      }
    });

    if (isEdit) {
      dispatch(updateProduct({ id, data: form })).then(() => {
        navigate('/admin/product/list');
      });
    } else {
      dispatch(createProduct(form)).then(() => {
        navigate('/admin/product/list');
      });
    }
  };

  return (
    <div className="mt-12">
      <Card>
        <CardHeader color="blue-gray">
          <Typography variant="h6">{isEdit ? 'Edit Product' : 'Create Product'}</Typography>
        </CardHeader>
        <CardBody>
          <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Model" name="model" value={formData.model} onChange={handleChange} />
          <Input label="Code" name="code" value={formData.code} onChange={handleChange} />
          <Input label="Category ID" name="category_id" value={formData.category_id} onChange={handleChange} />
          <Input label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
          <Input label="Sale Price" name="sale_price" value={formData.sale_price} onChange={handleChange} />
          <Input label="Purchase Price" name="purchase_price" value={formData.purchase_price} onChange={handleChange} />

          <Input type="file" label="Upload Image" onChange={handleFileChange} />
          <div className="mt-4">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            ) : (
              existingImage && <img src={existingImage} alt="Existing" className="w-32 h-32 object-cover rounded" />
            )}
          </div>

          <Button className="mt-4" onClick={handleSubmit}>
            {isEdit ? 'Update Product' : 'Create Product'}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateProduct;
