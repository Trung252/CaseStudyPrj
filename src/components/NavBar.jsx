import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { auth } from "../firebase/config";
import { CartContext } from "../context/CartContext";
import { styled } from "@mui/system";
import { Delete } from "@mui/icons-material";
import showPrice from "../lib/showPrice";

const NavBar = () => {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth/login");
  };

  const { cart, totalPrice, isOpenCart, setIsOpenCart, handleDeleteCartItem } =
    useContext(CartContext);

  const TotalPrice = styled("div")({
    position: "sticky",
    bottom: "0",
    left: "0",
    width: "100%",
    display: "flex",
    alignItems: "center",
  });

  const ProductImg = styled("img")({
    width: "100px",
    objectFit: "contain",
  });

  return (
    <Box sx={{ position: "sticky", top: "0", zIndex: "10" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: "1rem" }}>
          <Box variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ width: "fit-content", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Shopping Site
            </Typography>
          </Box>

          {currentUser?.displayName ? (
            <>
              <Typography variant="p">{currentUser.displayName}</Typography>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          )}
          <IconButton
            color="inherit"
            onClick={() => setIsOpenCart(!isOpenCart)}
          >
            <ShoppingCartIcon />
          </IconButton>
          {isOpenCart && (
            <Box
              variant="outlined"
              sx={{
                width: "500px",
                maxHeight: "300px",
                overflowY: "auto",
                position: "absolute",
                right: "1rem",
                top: "3rem",
                padding: "1rem",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "1rem",
                color: "black",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "fit-content",
                  position: "relative",
                }}
              >
                {cart?.map((item) => (
                  <Box
                    key={item.product.id}
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      borderTop: "1px solid black",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <ProductImg src={item.product.image} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="p" fontWeight={800}>
                        {item.product.name}
                      </Typography>
                      <Typography variant="p">x{item.cartQuantity}</Typography>
                      <Typography variant="p">{showPrice(item.cartPrice)}</Typography>
                    </Box>
                    <IconButton
                      sx={{ width: "3rem", height: "3rem" }}
                      onClick={() => handleDeleteCartItem(item.product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <TotalPrice>
                  <Box
                    sx={{
                      flexGrow: "1",
                      marginTop: "10px",
                      fontWeight: "800",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="subtitle2" fontStyle="italic">
                      Total price:
                    </Typography>
                    <Typography variant="p">{showPrice(totalPrice)}</Typography>
                  </Box>
                  <Button variant="outlined">Buy</Button>
                </TotalPrice>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
