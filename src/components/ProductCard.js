import React, { useState }from 'react'

const ProductCard = ({addCart}) => {
  const [product, setProduct] = useState()

  return (
    <div className='productcard'>
      {/* <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <h2>{product.</h2> */}
      <button onClick={addCart}> AddCart</button>
    </div>
  )
}

export default ProductCard
