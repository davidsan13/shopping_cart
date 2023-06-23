import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../pages/Products'
import RouteSwitch from './RouteSwitch'
const ShoppingCart = ({cartItems, increaseQty, decreaseQty, totalPrice, checkQty}) => {
  const cart = cartItems.map(item => (
  <div className="cart-item">
    <img src={item.item.image} alt="video game"/>
    <h1>{item.item.name}</h1>
    <h2>${item.item.price}</h2>
    <h2>Remove</h2>
    <div className='btn-container'>
      <button onClick={()=>decreaseQty(item.item.id)}>-</button>
      <h1>{item.quantity}</h1>
      <button onClick={()=>increaseQty(item.item.id)}>+</button>
    </div>
  </div>
  ))
 
  const qty = () => {
    const quantity = checkQty()
    return <div className="total">
      <h1>Subtotal </h1> 
      <h2>({quantity} {quantity > 1 ? 'items': 'item'}) ${totalPrice()}</h2>
    </div>
    
  }
  const tax = () => {
    return totalPrice() * .08
  }
  const estimateTotal = () => {
    return (Number(totalPrice()) + Number(tax())).toFixed(2)
  }
  return (
    <div className='shop-container'>
      <div className='shoppingcart'>
      {/* <h1>Shopping Cart</h1> */}
        {cart}
      </div>
      <div className='price-container'>
        {qty()}
        <div className="total taxes">
          <h1>Taxes </h1>
          <h2>${tax().toFixed(2)}</h2>
        </div>
        <div className='total estimate'>
          <h1>Estimated Total </h1>
          <h2>${estimateTotal()}</h2>
        </div>
      </div>
      
    </div>
    
  )
  
}

export default ShoppingCart