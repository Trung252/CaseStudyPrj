import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import showPrice from "../lib/showPrice";

const ProductItem = ({ product }) => {
    const navigate = useNavigate()

  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
            }}
            image={product.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary">
            {showPrice(product.price)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductItem;
