import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../pages/Products'
import RouteSwitch from './RouteSwitch'
const ShoppingCart = ({cartItems, increaseQty, decreaseQty}) => {
  const cart = cartItems.map(item => (<>
  <h1>{item.item.id}</h1>
  <button onClick={()=>increaseQty(item.item.id)}>+</button>
  </>
  ))
 
  return (
    <div className='shoppingcart'>
     <h1>Shopping Cart</h1>
     {cart}
    </div>
  )
  
}

export default ShoppingCart