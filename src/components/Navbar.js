import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { ShopContext } from './ShopContextProvider';
const Navbar = () => {
 const {numInCart} = useContext(ShopContext)
  return (
    <nav>
      <div className="nav-container">
        <h1> Game Central </h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li>
            <Link to="/Cart">Cart {numInCart > 0 && numInCart}</Link>
          </li>
        </ul>
      </div>
      
    </nav>
  )
}

export default Navbar
