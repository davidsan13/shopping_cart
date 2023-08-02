import React, { useState, useContext } from 'react'
import ProductCard from '../components/ProductCard'
import {data} from '../assets/products'
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../components/ShopContextProvider';

const Products = () => {
  const { addCart } = useContext(ShopContext)
  const { categoryId } = useParams()
  const [product, setProduct] = useState(data)

  const filterProduct = product.filter(item => {
    if(categoryId) {
      return (item.category === categoryId)
    } else return item
  })
 
  const productCards =  filterProduct.map(item => <ProductCard key={item.id} product={item} addCart={() => addCart(item)}/>)
  return (
    <div className="products-container">
      <aside>
        <ul>
          <li><Link to="/Products/PS5">Playstation 5</Link></li>
        </ul>
        <ul>
          <li><Link to="/Products/XboxX">Xbox X</Link></li>
        </ul>
        <ul>
          <li><Link to="/Products/NintendoSwitch">NintendoSwitch</Link></li>
        </ul>
      </aside>
      <div className="product-sec-1">
        {productCards}
      </div>
      
    </div>
  )
}

export default Products
