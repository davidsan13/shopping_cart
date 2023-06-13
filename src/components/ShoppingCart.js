import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../pages/Products'
import RouteSwitch from './RouteSwitch'
const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addCart = (id) => {
  //  setCart((prevState) => {
  //     [...prevState, id]
  //   }) 
    console.log('add')
    console.log(cart)
  }

  const removeItem = (id) => {
    setCart((prevState) => {
      prevState.filter(item => item.id != id)
    })
  }
  return (
    <div className='shoppingcart'>
     <h1>Shopping Cart</h1>
    </div>
  )
  
}

export default ShoppingCart