import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import useProducts from "../hooks/useProducts";
import { CartContext } from "../context/CartContext";
import { connectStorageEmulator } from "firebase/storage";

const Home = () => {
  const products = useProducts();
  const [categoryList, setCategoryList] = useState(["All"]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterList, setFilterList] = useState([]);

  const handleChange = (e) => {
    setFilterCategory(e.target.value);
  };

  useEffect(() => {
    let newCategory = Array.from(
      new Set(products.map((product) => product.category))
    );

    setCategoryList([...categoryList, ...newCategory]);
  }, [products]);

  useEffect(() => {
    filterCategory === "All" && products
      ? setFilterList([...products])
      : setFilterList(
          products.filter((product) => product.category === filterCategory)
        );
  }, [filterCategory, products]);

  return (
    <Container
      sx={{
        marginY: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" component="h2">
          Our Products
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            value={filterCategory}
            defaultValue={filterCategory}
            onChange={handleChange}
          >
            {categoryList.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        {filterList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
