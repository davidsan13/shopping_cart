import React from 'react'

const Products = ({addCart}) => {
  return (
    <>
      <h1>Products</h1>
      <button onClick={addCart}> AddCart</button>
    </>
  )
}

export default Products
