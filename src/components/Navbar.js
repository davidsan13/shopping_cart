import React from 'react'
import { Link } from 'react-router-dom';
import RouteSwitch from "./RouteSwitch";
const Navbar = ({cart}) => {
 
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
            <Link to="/Cart">Cart {cart > 0 && cart}</Link>
          </li>
        </ul>
      </div>
      
    </nav>
  )
}

export default Navbar
