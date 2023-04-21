import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AppBar } from "@mui/material";
import WebLayout from "./layouts/webLayout";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
