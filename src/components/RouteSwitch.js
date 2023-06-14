import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ShoppingCart from "./ShoppingCart";
import Navbar from './Navbar';
const RouteSwitch = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log(cart)
    // console.log(totalPrice())
  }, [cart])

  const addCart = (product) => {
    const itemInCart = cart.filter(item => item.id === item.id)
    setCart((prevState) => {
      if(itemInCart.length === 1) {
        const newItem = prevState.map(item => {
          if(item.item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        })
        return newItem
      } else {
          return [...prevState, {item: product, quantity: 1}]
      }
    })
     
  }

  const removeItem = (id) => {
    setCart((prevState) => {
      prevState.filter(item => item.id != id)
    })
  }
  
  const increaseQty = (id) => {
    setCart((prevState) => {
      const newItem = prevState.map(item => {
        console.log(item)
        if(item.item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      return newItem
    })
    console.log(id)
  }
  const decreaseQty = (id) => {
    setCart((prevState) => {
      const newItem = prevState.map(item => {
        if(item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      return newItem
    })
  }
  const totalPrice = () => {
    return cart.map(item => item.id.price * item.quantity).reduce((a,b)=> a+b, 0)
  }
  return (
    <>
      <Navbar cart={cart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addCart={addCart} />} />
        <Route path="/cart" element={<ShoppingCart cartItems={cart} 
        decreaseQty={decreaseQty} 
        increaseQty={increaseQty}/>} 
        />
      </Routes>
    </>
    
  );
};

export default RouteSwitch;