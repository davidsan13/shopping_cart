import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ShoppingCart from "./ShoppingCart";
import Navbar from './Navbar';
import Footer from "./Footer";
const RouteSwitch = () => {
  const [cart, setCart] = useState([]);
  const [numInCart, setnumInCart] = useState(0)

  useEffect(() => {
    console.log(cart)
    setnumInCart(checkQty())
    console.log(cart)
  }, [cart])

  const addCart = (product) => {
    const itemInCart = cart.filter(item => item.item.id === product.id)
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
      return prevState.filter(item => item.item.id !== id)
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
        if(item.item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      return newItem
    })
  }
  const totalPrice = () => {
    return cart.map(item => item.item.price * item.quantity).reduce((a,b)=> a+b, 0).toFixed(2)
  }

  const checkQty = () => {
    return cart.map(item => item.quantity).reduce((a,b) => a+b, 0)
  }
  return (
    <>
      <Navbar cart={numInCart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addCart={addCart} />} />
        <Route path="/products/:categoryId" element={<Products addCart={addCart} />} />

        <Route path="/cart" element={<ShoppingCart cartItems={cart} 
        decreaseQty={decreaseQty} 
        increaseQty={increaseQty}
        totalPrice={totalPrice}
        checkQty={checkQty}
        removeItem={removeItem}
        />} 
        />
      </Routes>
      <Footer/>
    </>
    
  );
};

export default RouteSwitch;