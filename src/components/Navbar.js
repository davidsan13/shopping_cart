import React from 'react'
import { Link } from 'react-router-dom';
import RouteSwitch from "./RouteSwitch";
const Navbar = () => {
  return (
    <div className='Header'>
      <nav>
        <ul>
         <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
        </ul>
      </nav>
    
    </div>
  )
}

export default Navbar
