import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import {data} from '../assets/products'
const Products = ({addCart}) => {
  const [product, setProduct] = useState(data)
  
  const productCards =  product.map(item => <ProductCard key={item.id} product={item} addCart={() => addCart(item)}/>)
  return (
    <div className="products-container">
      {/* <h1>Products</h1> */}
      {productCards}
    </div>
  )
}

export default Products
