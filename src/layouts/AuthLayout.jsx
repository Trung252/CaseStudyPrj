import { styled } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const AuthContainer = styled("div")({
    width: "100%",
    height: "100vh",
    background: "rgb(1,25,235)",
    background:
      "linear-gradient(141deg, rgba(1,25,235,1) 21%, rgba(178,83,139,1) 94%)",
    display: "grid",
    placeItems: "center"
  });

  return <AuthContainer>
    <Outlet />
  </AuthContainer>;
};

export default AuthLayout;
