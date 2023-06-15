import React, { useState }from 'react'

const ProductCard = ({addCart, product}) => {
  return (
    <div className='productcard' key={product.id}>
      <h1>{product.name}</h1>
      <img src={product.image} alt="video game"/>
      <h2>$ {product.price}</h2>
      <button onClick={addCart}> Add To Cart</button>
      {/* <h2>{product.detail}</h2> */}
      
    </div>
  )
}

export default ProductCard
