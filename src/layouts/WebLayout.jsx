import * as React from "react";
import NavBar from "@/components/NavBar";

import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import useCurrentUser from "../hooks/useCurrentUser";

const WebLayout = () => {


  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebLayout;
