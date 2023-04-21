import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: "black",
        display: "grid",
        placeItems: "center",
      }}
    >
        <Typography variant="p" component="p" color="white">Copyrighted 2022-2023. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
