import React from 'react'
import { Link } from 'react-router-dom';
import RouteSwitch from "./RouteSwitch";
const Navbar = ({cart}) => {
  console.log(cart.length)
  return (
    <nav>
      <h1> Game Central </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Products">Products</Link>
        </li>
        <li>
          <Link to="/Cart">Cart {cart.length > 0 && cart.length }</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
