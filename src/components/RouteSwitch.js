import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ShoppingCart from "./ShoppingCart";

const RouteSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<ShoppingCart />} />
    </Routes>
  );
};

export default RouteSwitch;