import React, { useContext } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useParams } from "react-router-dom";
import useCurrentProduct from "../hooks/useCurrentProduct";
import { CartContext } from "../context/CartContext";
import showPrice from "../lib/showPrice";

const ProductDetail = () => {
  const ProductImage = styled("img")({
    width: "40%",
    objectFit: "contain",
    position: "sticky",
    top: "50px"
  });

  const { productId } = useParams()

  const currentProduct = useCurrentProduct(productId)

  const { handleAddCart } = useContext(CartContext)

  return (
    <Container
      sx={{ marginY: "1rem", display: "flex", justifyContent: "space-between", alignItems: "start", position: "relative" }}
    >
      <ProductImage src={currentProduct.image} />
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography variant="h3" fontWeight={800}>
          {currentProduct.name}
        </Typography>
        <Typography variant="h4" fontWeight={600} color="darkgoldenrod">
        {showPrice(currentProduct.price)} 
        </Typography>
        <Box>
          <Button variant="contained" size="large" color="success" onClick={() => handleAddCart(currentProduct)}>
            Buy
          </Button>
        </Box>
        <Typography variant="p" sx={{whiteSpace: "pre-line"}}>
          {currentProduct.description} 
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetail;
