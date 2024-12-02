import React, { useState } from "react";
import { Table, Button, Modal, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const handleAddProduct = () => {
    setProducts([...products, { ...productForm, id: Date.now() }]);
    setOpenModal(false);
  };

  return (
    <div className="product-management">
      <div className="header">
        <h2>Product Management</h2>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Product
        </Button>
      </div>

      <Table>{}</Table>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="add-product-modal">
          <h3>Add New Product</h3>
          <TextField
            label="Product Name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={productForm.description}
            onChange={(e) =>
              setProductForm({ ...productForm, description: e.target.value })
            }
          />
          <input
            type="file"
            onChange={(e) =>
              setProductForm({ ...productForm, image: e.target.files[0] })
            }
          />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManagement;
