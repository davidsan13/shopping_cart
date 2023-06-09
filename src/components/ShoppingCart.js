import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Products from '../pages/Products'

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addCart = () => {
    // setCart((prevState) => {
    //   [...prevState, item]
    // })
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
      <h1>ShoppingCart</h1>
      <ProductCard addCart={addCart}/>
      <Products addCart={addCart} />
    </div>
  )
}

export default ShoppingCart