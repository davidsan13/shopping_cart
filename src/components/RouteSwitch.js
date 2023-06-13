import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ShoppingCart from "./ShoppingCart";
import Navbar from './Navbar';
const RouteSwitch = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart);
  }, [cart])
  const addCart = (id) => {
   setCart((prevState) => 
      [...prevState, id]
    ) 
  }

  const removeItem = (id) => {
    setCart((prevState) => {
      prevState.filter(item => item.id != id)
    })
  }
  return (
    <>
      <Navbar cart={cart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addCart={addCart} />} />
        <Route path="/cart" element={<ShoppingCart cartItems={cart}/>} />
      </Routes>
    </>
    
  );
};

export default RouteSwitch;