import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useProducts from "../hooks/useProducts";
import { styled } from "@mui/system";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import DeleteIcon from "@mui/icons-material/Delete";
import slugify from "slugify";

const ProductImage = styled("img")({
  width: "100%",
  objectFit: "contain",
});

const ProductForm = styled("form")({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "1px solid black",
  borderRadius: "10px",
  padding: "1rem",
});

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Product name", width: 200 },
  { field: "price", headerName: "Price", type: "number", width: 100 },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    width: 70,
  },
  {
    field: "description",
    headerName: "Description",
    width: 500,
  },
  {
    field: "image",
    headerName: "Product image",
    width: 200,
    height: 200,
    renderCell: (params) => <ProductImage src={params.value} />,
  },
];

export default function DataTable() {
  const products = useProducts();
  const [deleteProducts, setDeleteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "products", slugify(product.name)), {
        ...product,
        description: product.description.replace(/\n\r?/g, "\n"),
        quantity: Number(product.quantity),
        price: Number(product.price)
    });
    location.reload()
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteProducts.forEach(async (delProduct) => {
        await deleteDoc(doc(db, "products", delProduct))
        location.reload()
    })
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
        paddingY: "2rem",
      }}
    >
      <ProductForm onSubmit={handleSubmit}>
        <Typography variant="h5">Add product</Typography>
        <TextField
          label="Product name"
          name="name"
          fullWidth
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          fullWidth
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="number"
            name="price"
            startAdornment={
              <InputAdornment position="start">VND</InputAdornment>
            }
            label="Price"
            onChange={handleChange}
          />
        </FormControl>
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          label="Category"
          name="category"
          fullWidth
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Add product
        </Button>
      </ProductForm>
      <ProductForm onSubmit={handleDelete}>
        <Button type="submit" variant="contained">
          <Typography>Delete Product(s)</Typography>
        </Button>
      </ProductForm>
      <DataGrid
        rows={products}
        rowHeight={200}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(id) => setDeleteProducts([...id])}
      />
    </Box>
  );
}
